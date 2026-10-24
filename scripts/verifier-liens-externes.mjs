#!/usr/bin/env node
/**
 * Vérifie tous les liens externes du site.
 *
 *   node scripts/verifier-liens-externes.mjs [--json rapport.json] [--concurrence 6] [--sans-dist]
 *
 * Sources des liens :
 *  - les fichiers MDX des leçons (liens Markdown [texte](url), <Sources> comme texte courant) et YAML des examens ;
 *  - les pages construites (dist/**.html, balises <a href="http…">) si dist/ existe : pages Astro, pied de page, etc.
 *
 * Pour chaque URL (sans l'ancre) : GET avec un User-Agent de navigateur, redirections suivies À LA MAIN
 * (pour repérer les redirections permanentes 301/308), 2 essais, concurrence limitée, délai de 25 s.
 * Les pages create.roblox.com/docs qui répondent mal aux outils (5xx, 403, 429, délai dépassé) sont confirmées
 * via la version Markdown/YAML officielle : https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/<chemin>.md|.yaml
 *
 * Code de sortie : 1 si au moins un lien est mort (404 / 410 confirmés), 0 sinon.
 */
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const RACINE = fileURLToPath(new URL('../', import.meta.url));
const args = process.argv.slice(2);
const option = (nom, defaut) => {
  const i = args.indexOf(nom);
  return i >= 0 ? args[i + 1] : defaut;
};
const CONCURRENCE = Number(option('--concurrence', 6));
const FICHIER_JSON = option('--json');
const SANS_DIST = args.includes('--sans-dist');
const DELAI_MS = 25_000;
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36';
const ENTETES = {
  'User-Agent': UA,
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8',
};
const SITE_PROPRE = /^https?:\/\/(forma-roblox\.vercel\.app|localhost|127\.0\.0\.1)/;

/* ------------------------------------------------------------------ */
/* Extraction                                                          */
/* ------------------------------------------------------------------ */

/** url (sans ancre) → { ancres:Set, ou:Set<"fichier" | "/page/"> } */
const liens = new Map();
function ajouter(url, ou) {
  url = url.replace(/&amp;/g, '&').replace(/[.,;:!?»’'"]+$/, '');
  if (SITE_PROPRE.test(url)) return;
  const [base, ancre] = url.split('#');
  if (!liens.has(base)) liens.set(base, { ancres: new Set(), ou: new Set() });
  const e = liens.get(base);
  if (ancre) e.ancres.add(ancre);
  e.ou.add(ou);
}

function fichiers(dossier, filtre) {
  const res = [];
  for (const nom of readdirSync(dossier)) {
    const chemin = join(dossier, nom);
    if (statSync(chemin).isDirectory()) res.push(...fichiers(chemin, filtre));
    else if (filtre(nom)) res.push(chemin);
  }
  return res;
}

const rel = (chemin) => relative(RACINE, chemin).split(sep).join('/');

// 1. Contenu : liens Markdown [texte](url) et URL nues dans le texte (hors blocs de code et code inline,
//    où une URL est un exemple de code, pas un lien).
const sources = fichiers(join(RACINE, 'src', 'content'), (n) => /\.(mdx?|ya?ml)$/.test(n));
for (const f of sources) {
  const texte = readFileSync(f, 'utf8')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/^\s*code: \|[\s\S]*?(?=^\s*(?:options|explication):)/gm, '')
    .replace(/`[^`\n]*`/g, '');
  for (const m of texte.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)) ajouter(m[1], rel(f));
  for (const m of texte.matchAll(/(?<![(\w])(https?:\/\/[^\s)<>"'`\]]+)/g)) ajouter(m[1], rel(f));
}

// 2. Pages construites (pages Astro, en-tête, pied de page… et leçons rendues) : <a href="http…">.
const DIST = join(RACINE, 'dist');
if (!SANS_DIST && existsSync(DIST)) {
  for (const f of fichiers(DIST, (n) => n.endsWith('.html'))) {
    if (f.includes(`${sep}pagefind${sep}`)) continue;
    const html = readFileSync(f, 'utf8');
    const page = '/' + rel(f).replace(/^dist\//, '').replace(/index\.html$/, '');
    for (const m of html.matchAll(/<a\b[^>]*\bhref="(https?:\/\/[^"]+)"/g)) ajouter(m[1], page);
  }
}

/* ------------------------------------------------------------------ */
/* Vérification                                                        */
/* ------------------------------------------------------------------ */

const attendre = (ms) => new Promise((r) => setTimeout(r, ms));

/** Une requête GET sans suivre les redirections. */
async function requete(url) {
  const ctrl = new AbortController();
  const minuteur = setTimeout(() => ctrl.abort(), DELAI_MS);
  try {
    const r = await fetch(url, { method: 'GET', redirect: 'manual', headers: ENTETES, signal: ctrl.signal });
    // On ne lit qu'un peu du corps (libère la connexion).
    try {
      await r.body?.cancel();
    } catch {
      /* ignoré */
    }
    return { statut: r.status, location: r.headers.get('location') };
  } catch (e) {
    return { statut: 0, erreur: e.name === 'AbortError' ? 'délai dépassé' : String(e.cause?.code ?? e.message) };
  } finally {
    clearTimeout(minuteur);
  }
}

/** Suit la chaîne de redirections (10 sauts max). */
async function suivre(url) {
  const chaine = [];
  let courante = url;
  for (let saut = 0; saut < 10; saut++) {
    const r = await requete(courante);
    if (r.statut >= 300 && r.statut < 400 && r.location) {
      const suivante = new URL(r.location, courante).href;
      chaine.push({ de: courante, statut: r.statut, vers: suivante });
      courante = suivante;
      continue;
    }
    return { ...r, finale: courante, chaine };
  }
  return { statut: 0, erreur: 'trop de redirections', finale: courante, chaine };
}

/** Candidats Markdown/YAML officiels pour une page create.roblox.com/docs. */
function versionsBrutes(url) {
  const u = new URL(url);
  if (u.hostname !== 'create.roblox.com' || !u.pathname.startsWith('/docs')) return [];
  let chemin = u.pathname.replace(/^\/docs\/?/, '').replace(/\/$/, '');
  chemin = chemin.replace(/^(fr-fr|en-us|de-de|es-es|ja-jp|ko-kr|pt-br|zh-cn|zh-tw)\//, '');
  const base = 'https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/';
  if (!chemin) return [`${base}index.md`];
  if (chemin.startsWith('reference/')) return [`${base}${chemin}.yaml`, `${base}${chemin}.md`, `${base}${chemin}/index.md`];
  return [`${base}${chemin}.md`, `${base}${chemin}/index.md`, `${base}${chemin}.yaml`];
}

const EST_MORT = (s) => s === 404 || s === 410;
const EST_OK = (s) => s >= 200 && s < 300;

async function verifier(url) {
  let r;
  for (let essai = 1; essai <= 2; essai++) {
    r = await suivre(url);
    r.essais = essai;
    if (EST_OK(r.statut) || EST_MORT(r.statut)) break;
    await attendre(1500 * essai);
  }
  const resultat = { url, statut: r.statut, erreur: r.erreur, finale: r.finale, chaine: r.chaine, essais: r.essais };

  if (EST_OK(r.statut)) resultat.etat = 'ok';
  else if (EST_MORT(r.statut)) resultat.etat = 'mort';
  else resultat.etat = 'non-verifiable';

  // Repli docs Roblox : la page Markdown officielle existe-t-elle ?
  const brutes = versionsBrutes(r.finale ?? url);
  if (resultat.etat !== 'ok' && brutes.length) {
    for (const brute of brutes) {
      const b = await suivre(brute);
      if (EST_OK(b.statut)) {
        resultat.confirmeeParSource = brute;
        // Une page de la doc qui renvoie 404 alors que sa source existe : on la considère vivante (rendu en panne).
        resultat.etat = 'ok-source';
        break;
      }
    }
    if (!resultat.confirmeeParSource) resultat.sourcesEssayees = brutes;
  }

  // Repli centres d'aide Zendesk (en.help.roblox.com, support.discord.com) protégés par un défi Cloudflare (403) :
  // l'API publique /api/v2/help_center/<langue>/articles/<id>.json confirme l'existence de l'article et donne son URL canonique.
  const zendesk = /^https:\/\/([^/]+)\/hc\/(?:([a-z]{2}(?:-[a-z]{2})?)\/)?articles\/(\d+)/i.exec(r.finale ?? url) ?? /^https:\/\/([^/]+)\/hc\/(?:([a-z]{2}(?:-[a-z]{2})?)\/)?articles\/(\d+)/i.exec(url);
  if (resultat.etat === 'non-verifiable' && zendesk) {
    const [, hote, langue = 'en-us', id] = zendesk;
    const api = `https://${hote}/api/v2/help_center/${langue.toLowerCase()}/articles/${id}.json`;
    const brut = await texteDe(api);
    if (brut) {
      try {
        const { article } = JSON.parse(brut);
        resultat.etat = 'ok-source';
        resultat.confirmeeParSource = `${api} (« ${article.title} »)`;
        if (article.html_url && article.html_url !== url) resultat.urlCanonique = article.html_url;
      } catch {
        /* réponse inattendue : reste non vérifiable */
      }
    } else if (EST_MORT((await requete(api)).statut)) {
      resultat.etat = 'mort';
      resultat.sourcesEssayees = [api];
    }
  }

  // Redirections permanentes : 301 / 308 dans la chaîne.
  const permanentes = (r.chaine ?? []).filter((c) => c.statut === 301 || c.statut === 308);
  if (permanentes.length && r.finale && r.finale !== url) resultat.redirectionPermanente = r.finale;
  else if ((r.chaine ?? []).length && r.finale !== url) resultat.redirectionTemporaire = r.finale;
  return resultat;
}

/** Texte d'une URL (pour lire les sources officielles). */
async function texteDe(url) {
  const ctrl = new AbortController();
  const minuteur = setTimeout(() => ctrl.abort(), DELAI_MS);
  try {
    const r = await fetch(url, { headers: { 'User-Agent': UA }, signal: ctrl.signal });
    return r.ok ? await r.text() : undefined;
  } catch {
    return undefined;
  } finally {
    clearTimeout(minuteur);
  }
}

const slugTitre = (t) =>
  t
    .toLowerCase()
    .replace(/`/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-');

/**
 * Ancres des pages create.roblox.com/docs, vérifiées dans la source officielle :
 * membre d'API (« name: Classe.Membre » / « Classe:Membre ») ou titre Markdown (« ## Instance attributes » → instance-attributes).
 */
async function verifierAncres(r) {
  if (!r.ancres.length || !r.etat.startsWith('ok')) return;
  const brutes = versionsBrutes(r.finale ?? r.url);
  if (!brutes.length) return;
  let source;
  for (const b of brutes) if ((source = await texteDe(b))) break;
  if (!source) {
    r.ancresNonVerifiees = r.ancres;
    return;
  }
  const titres = new Set([...source.matchAll(/^#{1,6}\s+(.+)$/gm)].map((m) => slugTitre(m[1])));
  const membres = new Set([...source.matchAll(/^\s*-?\s*name:\s*[\w]+[.:](\w+)\s*$/gm)].map((m) => m[1]));
  r.ancresMortes = r.ancres.filter((a) => !titres.has(a.toLowerCase()) && !membres.has(a));
}

async function enParallele(elements, n, fn) {
  const resultats = new Array(elements.length);
  let i = 0;
  let faits = 0;
  await Promise.all(
    Array.from({ length: Math.min(n, elements.length) }, async () => {
      while (i < elements.length) {
        const j = i++;
        resultats[j] = await fn(elements[j]);
        faits++;
        if (process.stderr.isTTY) process.stderr.write(`\r${faits} / ${elements.length}`);
      }
    }),
  );
  if (process.stderr.isTTY) process.stderr.write('\n');
  return resultats;
}

const urls = [...liens.keys()].sort();
console.log(`${urls.length} URL externes distinctes (sans ancre) trouvées dans ${sources.length} fichiers sources${!SANS_DIST && existsSync(DIST) ? ' et dist/' : ''}.`);
const resultats = await enParallele(urls, CONCURRENCE, verifier);
for (const r of resultats) {
  const e = liens.get(r.url);
  r.ou = [...e.ou].sort();
  r.ancres = [...e.ancres].sort();
}
await enParallele(resultats.filter((r) => r.ancres.length), CONCURRENCE, verifierAncres);
const ancresMortes = resultats.filter((r) => r.ancresMortes?.length);

const parEtat = (etat) => resultats.filter((r) => r.etat === etat);
const morts = parEtat('mort');
const nonVerifiables = parEtat('non-verifiable');
const viaSource = parEtat('ok-source');
const permanentes = resultats.filter((r) => r.redirectionPermanente);

const afficher = (titre, liste, detail) => {
  console.log(`\n## ${titre} (${liste.length})`);
  for (const r of liste) console.log(`- ${r.url}\n    ${detail(r)}\n    dans : ${r.ou.join(', ')}`);
};
const nbAncres = resultats.reduce((n, r) => n + r.ancres.length, 0);
console.log(
  `\nOK : ${parEtat('ok').length} · OK via source officielle : ${viaSource.length} · morts : ${morts.length} · non vérifiables : ${nonVerifiables.length} · redirections permanentes : ${permanentes.length} · ancres vérifiées : ${nbAncres - ancresMortes.reduce((n, r) => n + r.ancresMortes.length, 0)} / ${nbAncres}`,
);
afficher('Liens morts (404/410)', morts, (r) => `HTTP ${r.statut}${r.sourcesEssayees ? ` ; sources essayées : ${r.sourcesEssayees.join(' | ')}` : ''}`);
afficher('Non vérifiables', nonVerifiables, (r) => `HTTP ${r.statut} ${r.erreur ?? ''}`);
afficher('Confirmés via la source Markdown officielle', viaSource, (r) => `HTTP ${r.statut} → ${r.confirmeeParSource}${r.urlCanonique ? `\n    URL canonique : ${r.urlCanonique}` : ''}`);
afficher('Ancres introuvables dans la source officielle', ancresMortes, (r) => `#${r.ancresMortes.join(', #')}`);
afficher('Redirections temporaires (pour information)', resultats.filter((r) => r.redirectionTemporaire), (r) => `→ ${r.redirectionTemporaire}`);
afficher('Redirections permanentes', permanentes, (r) => `→ ${r.redirectionPermanente} (${r.chaine.map((c) => c.statut).join(' → ')})`);

if (FICHIER_JSON) {
  writeFileSync(FICHIER_JSON, JSON.stringify({ date: new Date().toISOString(), total: urls.length, resultats }, null, 2));
  console.log(`\nRapport JSON : ${FICHIER_JSON}`);
}
process.exitCode = morts.length ? 1 : 0;
