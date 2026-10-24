#!/usr/bin/env bash
# Lance les tests e2e en tenant le verrou de build partagé (scripts/build-verrou.sh) :
# aucun autre agent ne peut reconstruire dist/ pendant que Playwright le sert.
# Usage : bash tests/e2e-verrou.sh [--build] [arguments playwright…]
LOCK="/c/tmp/forma-roblox-build.lock"
cd "$(dirname "$0")/.." || exit 1
mkdir -p /c/tmp
for i in $(seq 1 360); do
  if mkdir "$LOCK" 2>/dev/null; then
    trap 'rmdir "$LOCK" 2>/dev/null' EXIT
    if [ "$1" = "--build" ]; then
      shift
      npm run build > /c/tmp/forma-build-tests-$$.log 2>&1 || { tail -n 60 /c/tmp/forma-build-tests-$$.log; echo "Build en échec"; exit 1; }
      rm -f /c/tmp/forma-build-tests-$$.log
    fi
    npx playwright test "$@"
    exit $?
  fi
  if [ -n "$(find "$LOCK" -maxdepth 0 -mmin +15 2>/dev/null)" ]; then rmdir "$LOCK" 2>/dev/null; fi
  sleep 5
done
echo "Impossible d'obtenir le verrou de build (30 min)"; exit 1
