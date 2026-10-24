// Analyse statique de tous les extraits Luau d'un module (leçons MDX + quiz + examen)
// avec luau-lsp et les définitions de types Roblox.
// Usage : node scripts/verifier-luau.mjs 03        (module 03)
//         node scripts/verifier-luau.mjs           (tous les modules)
// Prérequis : C:/tmp/luau-tools/luau-lsp.exe et globalTypes.d.luau (voir RAPPORT_FINAL.md).
// Les avertissements « LocalUnused », « UnknownGlobal » sur des extraits partiels sont à juger au cas par cas :
// seul un humain peut dire si une erreur vient du code ou du fait que l'extrait est volontairement incomplet.
import { readFileSync, readdirSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { parse } from "yaml";

const OUTILS = "C:/tmp/luau-tools";
const module = process.argv[2];
const racine = fileURLToPath(new URL("..", import.meta.url));
const tmp = join(OUTILS, "extraits", module ?? "tous");
rmSync(tmp, { recursive: true, force: true });
mkdirSync(tmp, { recursive: true });

const extraits = [];
const dossierLecons = join(racine, "src/content/lecons");
for (const dossier of readdirSync(dossierLecons)) {
  if (module && dossier !== `module-${module}`) continue;
  for (const f of readdirSync(join(dossierLecons, dossier))) {
    if (!f.endsWith(".mdx")) continue;
    const texte = readFileSync(join(dossierLecons, dossier, f), "utf8");
    let i = 0;
    for (const m of texte.matchAll(/```luau[^\n]*\n([\s\S]*?)```/g)) extraits.push([`${dossier}/${f}#bloc${++i}`, m[1]]);
    const fm = texte.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (fm) {
      (parse(fm[1]).quiz ?? []).forEach((q, n) => q.code && extraits.push([`${dossier}/${f}#quiz${n + 1}`, q.code]));
    }
  }
}
const dossierExamens = join(racine, "src/content/examens");
for (const f of readdirSync(dossierExamens)) {
  if (module && f !== `module-${module}.yaml`) continue;
  const ex = parse(readFileSync(join(dossierExamens, f), "utf8"));
  (ex.questions ?? []).forEach((q, n) => q.code && extraits.push([`examens/${f}#q${n + 1}`, q.code]));
}

let problemes = 0;
for (const [nom, code] of extraits) {
  const fichier = join(tmp, nom.replace(/[\/#]/g, "__") + ".luau");
  writeFileSync(fichier, code);
  try {
    execFileSync(join(OUTILS, "luau-lsp.exe"), ["analyze", `--definitions=@roblox=${join(OUTILS, "globalTypes.d.luau")}`, fichier], { stdio: "pipe" });
  } catch (e) {
    const sortie = String(e.stdout ?? "") + String(e.stderr ?? "");
    const lignes = sortie.split("\n").filter((l) => /\(\d+,\d+\)/.test(l)).map((l) => l.replace(/^.*\.luau/, "  "));
    if (lignes.length) {
      problemes++;
      console.log(`\n${nom}`);
      console.log(lignes.join("\n"));
    }
  }
}
console.log(`\n${extraits.length} extraits analysés, ${problemes} avec diagnostics.`);
