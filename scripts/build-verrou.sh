#!/usr/bin/env bash
# Lance `npm run build` avec un verrou : plusieurs agents peuvent l'appeler en même temps
# sans que deux builds Astro s'exécutent simultanément dans le même dossier.
# Usage : bash scripts/build-verrou.sh            (affiche les 80 dernières lignes)
LOCK="/c/tmp/forma-roblox-build.lock"
cd "$(dirname "$0")/.." || exit 1
mkdir -p /c/tmp
for i in $(seq 1 360); do
  if mkdir "$LOCK" 2>/dev/null; then
    trap 'rmdir "$LOCK" 2>/dev/null' EXIT
    npm run build > /c/tmp/forma-build-$$.log 2>&1
    code=$?
    tail -n 80 /c/tmp/forma-build-$$.log
    rm -f /c/tmp/forma-build-$$.log
    echo "== code de sortie du build : $code =="
    exit $code
  fi
  # verrou abandonné depuis plus de 15 minutes : on le supprime
  if [ -n "$(find "$LOCK" -maxdepth 0 -mmin +15 2>/dev/null)" ]; then rmdir "$LOCK" 2>/dev/null; fi
  sleep 5
done
echo "Impossible d'obtenir le verrou de build (30 min)"; exit 1
