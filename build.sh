#!/bin/bash
# build.sh -- Build production CSS with Tailwind CLI
# Downloads the standalone CLI binary if not present, then builds minified CSS.
#
# Usage: ./build.sh [--help]
#
# Downloads Tailwind CSS standalone CLI (macOS ARM) on first run,
# then compiles css/input.css to css/output.css with minification.
set -euo pipefail

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  echo "build.sh -- Build production CSS with Tailwind CLI"
  echo ""
  echo "Usage: ./build.sh"
  echo ""
  echo "Downloads Tailwind CSS standalone CLI (macOS ARM64) on first run."
  echo "Compiles css/input.css -> css/output.css with minification."
  echo ""
  echo "The binary and output CSS are gitignored."
  echo ""
  echo "To switch from CDN to production CSS in index.html:"
  echo "  1. Remove the Tailwind CDN <script> tag"
  echo "  2. Remove the <style type=\"text/tailwindcss\"> block"
  echo "  3. Add: <link href=\"css/output.css\" rel=\"stylesheet\">"
  exit 0
fi

BINARY="./tailwindcss-macos-arm64"
VERSION="v4.2.2"

if [ ! -f "$BINARY" ]; then
  echo "Downloading Tailwind CSS standalone CLI $VERSION..."
  curl -sLO "https://github.com/tailwindlabs/tailwindcss/releases/download/$VERSION/tailwindcss-macos-arm64"
  chmod +x "$BINARY"
  echo "Downloaded: $BINARY"
fi

echo "Building production CSS..."
$BINARY -i css/input.css -o css/output.css --minify

echo "Production CSS built: css/output.css ($(wc -c < css/output.css | tr -d ' ') bytes)"
echo ""
echo "To switch from CDN to production CSS in index.html:"
echo "  1. Remove the Tailwind CDN <script> tag"
echo "  2. Remove the <style type=\"text/tailwindcss\"> block"
echo "  3. Add: <link href=\"css/output.css\" rel=\"stylesheet\">"
