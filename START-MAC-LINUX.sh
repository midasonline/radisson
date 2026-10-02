#!/usr/bin/env sh
set -eu
cd "$(dirname "$0")"
command -v node >/dev/null 2>&1 || { echo 'Install Node.js 22 or newer first.'; exit 1; }
if [ ! -d node_modules/next ]; then npm ci; fi
printf 'Open http://localhost:3000 once the server says Ready.\n'
npm run dev
