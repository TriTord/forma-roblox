// Consolide les rapports de vérification dans VERIFICATION.md :
// phase 1 (verification/module-XX-passe-N.md) et phase IA (verification/phase-ia/<lot>-passe-N.md).
// Usage : node scripts/consolider-verification.mjs
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const racine = fileURLToPath(new URL("..", import.meta.url));
const dossier = join(racine, "verification");
const fichiers = readdirSync(dossier).filter((f) => /^module-\d\d-passe-\d+\.md$/.test(f)).sort();

// Renvoie le contenu d'une section « ## titre » (jusqu'à la section suivante de même niveau).
function section(texte, debutTitre) {
  const lignes = texte.split(/\r?\n/);
  const i = lignes.findIndex((l) => l.startsWith("## ") && l.slice(3).trim().toLowerCase().startsWith(debutTitre));
  if (i < 0) return "";
  const fin = lignes.findIndex((l, j) => j > i && l.startsWith("## "));
  return lignes.slice(i + 1, fin < 0 ? undefined : fin).join("\n").trim();
}

// Compte les verdicts dans les lignes de tableau de la section Détail.
function verdicts(texte) {
  const compte = { OK: 0, "CORRIGÉ": 0, "SUPPRIMÉ": 0, "REFORMULÉ": 0 };
  for (const l of texte.split(/\r?\n/)) {
    if (!l.startsWith("|") || /^\|\s*-/.test(l)) continue;
    for (const v of Object.keys(compte)) if (new RegExp(`\\|\\s*\\**${v}\\**\\s*[|(—-]`, "i").test(l)) { compte[v]++; break; }
  }
  return compte;
}

const parModule = new Map();
for (const f of fichiers) {
  const [, module, passe] = f.match(/^module-(\d\d)-passe-(\d+)\.md$/);
  const texte = readFileSync(join(dossier, f), "utf8");
  if (!parModule.has(module)) parModule.set(module, []);
  parModule.get(module).push({
    passe: Number(passe),
    fichier: f,
    resume: section(texte, "résumé"),
    restantes: section(texte, "erreurs restantes"),
    desaccords: section(texte, "désaccords"),
    verdicts: verdicts(section(texte, "détail") || texte),
  });
}

const total = { OK: 0, "CORRIGÉ": 0, "SUPPRIMÉ": 0, "REFORMULÉ": 0 };
let tableau = "| Module | Passe | Lignes OK | Corrigées | Reformulées | Supprimées | Rapport |\n|---|---|---|---|---|---|---|\n";
for (const [module, passes] of parModule) {
  for (const p of passes) {
    for (const k of Object.keys(total)) total[k] += p.verdicts[k];
    tableau += `| ${module} | ${p.passe} | ${p.verdicts.OK} | ${p.verdicts["CORRIGÉ"]} | ${p.verdicts["REFORMULÉ"]} | ${p.verdicts["SUPPRIMÉ"]} | [${p.fichier}](verification/${p.fichier}) |\n`;
  }
}

let corps = "";
for (const [module, passes] of parModule) {
  corps += `\n## Module ${module}\n`;
  for (const p of passes) {
    corps += `\n### Passe ${p.passe} — [rapport détaillé](verification/${p.fichier})\n\n${p.resume}\n`;
    if (p.desaccords) corps += `\n**Désaccords avec la passe précédente (tranchés par la passe ${p.passe}) :**\n\n${p.desaccords}\n`;
    corps += `\n**Erreurs restantes non corrigées :**\n\n${p.restantes || "_(section absente)_"}\n`;
  }
}

// Phase IA : un rapport par lot et par passe (verification/phase-ia/<lot>-passe-N.md).
const dossierIA = join(dossier, "phase-ia");
const fichiersIA = readdirSync(dossierIA).filter((f) => /-passe-\d+\.md$/.test(f)).sort();
const totalIA = { OK: 0, "CORRIGÉ": 0, "SUPPRIMÉ": 0, "REFORMULÉ": 0 };
let tableauIA = "| Lot | Passe | Lignes OK | Corrigées | Reformulées | Supprimées | Rapport |\n|---|---|---|---|---|---|---|\n";
let corpsIA = "";
for (const f of fichiersIA) {
  const [, lot, passe] = f.match(/^(.*)-passe-(\d+)\.md$/);
  const texte = readFileSync(join(dossierIA, f), "utf8");
  const v = verdicts(section(texte, "détail") || texte);
  for (const k of Object.keys(totalIA)) totalIA[k] += v[k];
  tableauIA += `| ${lot} | ${passe} | ${v.OK} | ${v["CORRIGÉ"]} | ${v["REFORMULÉ"]} | ${v["SUPPRIMÉ"]} | [${f}](verification/phase-ia/${f}) |
`;
  corpsIA += `
### ${lot} — passe ${passe} ([rapport détaillé](verification/phase-ia/${f}))

${section(texte, "résumé")}
`;
  const desaccords = section(texte, "désaccords");
  if (desaccords) corpsIA += `
**Désaccords avec la passe précédente :**

${desaccords}
`;
  corpsIA += `
**Erreurs restantes non corrigées :**

${section(texte, "erreurs restantes") || "_(section absente)_"}
`;
}
const introIA = readFileSync(join(racine, "scripts", "verification-phase-ia.md"), "utf8");

const annexes = readdirSync(dossier).filter((f) => /^(coherence|relecture|qa)-.*.md$/.test(f)).sort();
const intro = readFileSync(join(racine, "scripts", "verification-intro.md"), "utf8");
const suivi = readFileSync(join(racine, "scripts", "verification-suivi.md"), "utf8");

writeFileSync(
  join(racine, "VERIFICATION.md"),
  `${intro.trim()}

## Tableau de bord

Comptage automatique des lignes des tableaux « Détail » de chaque rapport (une ligne = un élément vérifié : affirmation, question de quiz, extrait de code ou source).

${tableau.trimEnd()}
| **Total** | | **${total.OK}** | **${total["CORRIGÉ"]}** | **${total["REFORMULÉ"]}** | **${total["SUPPRIMÉ"]}** | |

${suivi.trim()}

${annexes.length ? `Rapports transverses : ${annexes.map((f) => `[${f}](verification/${f})`).join(", ")}.\n` : ""}
${introIA.trim()}

### Tableau de bord de la phase IA

${tableauIA.trimEnd()}
| **Total phase IA** | | **${totalIA.OK}** | **${totalIA["CORRIGÉ"]}** | **${totalIA["REFORMULÉ"]}** | **${totalIA["SUPPRIMÉ"]}** | |

## Résumés des rapports de la phase IA
${corpsIA}
# Résumés par module (phase 1)

Les rapports de la phase 1 ont été écrits avant l'insertion du module 02 : à l'intérieur, l'ancien module N (N ≥ 2) correspond au nouveau module N + 1.
${corps}`,
);
console.log(`VERIFICATION.md écrit : ${fichiers.length} rapports (phase 1), total`, total, `; ${fichiersIA.length} rapports (phase IA), total`, totalIA);
