#!/usr/bin/env bash
#
# Switch the website between the Vercel CMS and the self-hosted exe.dev standby.
#
#   ./scripts/switch-cms.sh exe                 # roll back to the old server
#   ./scripts/switch-cms.sh vercel              # return to Vercel
#   ./scripts/switch-cms.sh exe --check         # health-check only
#   ./scripts/switch-cms.sh custom https://...  # any Payload origin
#
# The only website setting that changes is CMS_URL. `next.config.ts` already
# allow-lists the Vercel, exe.dev and Blob origins, so no code edit is needed.
set -euo pipefail

cd "$(dirname "$0")/.."

usage() {
  cat <<'EOF'
Usage: ./scripts/switch-cms.sh <target> [options]

Targets:
  vercel            https://cms.houseofkani.com
  exe | legacy      https://house-of-kani.exe.xyz   (rollback)
  custom <url>      any Payload CMS origin

Options:
  --check           only check /api/health, do not change anything
  -y, --yes         skip the confirmation prompt
  -h, --help        show this help
EOF
}

TARGET=""
ORIGIN=""
CHECK_ONLY=0
ASSUME_YES=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    vercel)
      TARGET="vercel"
      ORIGIN="https://cms.houseofkani.com"
      shift
      ;;
    exe | legacy)
      TARGET="exe"
      ORIGIN="https://house-of-kani.exe.xyz"
      shift
      ;;
    custom)
      TARGET="custom"
      ORIGIN="${2:-}"
      if [[ -z "$ORIGIN" ]]; then
        echo "error: 'custom' needs a URL, e.g. custom https://cms.example.com" >&2
        exit 1
      fi
      shift 2
      ;;
    --check)
      CHECK_ONLY=1
      shift
      ;;
    -y | --yes)
      ASSUME_YES=1
      shift
      ;;
    -h | --help)
      usage
      exit 0
      ;;
    *)
      echo "error: unknown argument '$1'" >&2
      usage >&2
      exit 1
      ;;
  esac
done

if [[ -z "$ORIGIN" ]]; then
  usage >&2
  exit 1
fi

echo "CMS target: $TARGET"
echo "Origin:     $ORIGIN"
echo "Checking $ORIGIN/api/health ..."
if ! curl -fsS --max-time 20 "$ORIGIN/api/health" >/dev/null; then
  echo "error: $ORIGIN/api/health did not respond successfully." >&2
  echo "The website was not changed." >&2
  exit 1
fi
echo "Health check passed."

if [[ "$CHECK_ONLY" == "1" ]]; then
  exit 0
fi

if [[ ! -f .vercel/project.json ]]; then
  echo "error: .vercel/project.json not found." >&2
  echo "Run 'vercel link --yes --project website' from website/ first." >&2
  exit 1
fi

if [[ "$ASSUME_YES" != "1" ]]; then
  read -r -p "Point the website's CMS_URL at $ORIGIN and deploy? [y/N] " reply
  if [[ ! "$reply" =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 1
  fi
fi

VCLI=(npx -y vercel@65.10.0)

for environment in production preview development; do
  "${VCLI[@]}" env add CMS_URL \
    --value "$ORIGIN" \
    --environment "$environment" \
    --force \
    --yes >/dev/null
  echo "Updated CMS_URL for $environment."
done

echo "Deploying the website to production ..."
"${VCLI[@]}" deploy --prod 2>&1 | tail -20

echo
echo "Done. The website now reads the Journal from $ORIGIN."
echo "To check the other origin without changing anything:"
echo "  ./scripts/switch-cms.sh vercel --check"
echo "  ./scripts/switch-cms.sh exe --check"
