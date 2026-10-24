// Consolide les rapports de vérification (verification/module-XX-passe-N.md) dans VERIFICATION.md.
// Usage : node scripts/consolider-verification.mjs
import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
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

const annexes = ["coherence-inter-modules.md", "relecture-finale.md"].filter((f) => existsSync(join(dossier, f)));
const intro = readFileSync(join(racine, "scripts", "verification-intro.md"), "utf8");

writeFileSync(
  join(racine, "VERIFICATION.md"),
  `${intro.trim()}

## Tableau de bord

Comptage automatique des lignes des tableaux « Détail » de chaque rapport (une ligne = un élément vérifié : affirmation, question de quiz, extrait de code ou source).

${tableau.trimEnd()}
| **Total** | | **${total.OK}** | **${total["CORRIGÉ"]}** | **${total["REFORMULÉ"]}** | **${total["SUPPRIMÉ"]}** | |

${annexes.length ? `Rapports transverses : ${annexes.map((f) => `[${f}](verification/${f})`).join(", ")}.\n` : ""}
# Résumés par module
${corps}`,
);
console.log(`VERIFICATION.md écrit : ${fichiers.length} rapports, total`, total);
