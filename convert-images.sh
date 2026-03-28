#!/bin/bash
# convert-images.sh -- Convert HEIC photos to web formats
# Requires: ImageMagick 7+ (brew install imagemagick)
#
# Usage: ./convert-images.sh [--help]
#
# Converts all HEIC files from bilder-landshut-asis/ to WebP, JPEG, and AVIF
# in assets/images/. Strips EXIF/GPS data and converts to sRGB color space.
set -euo pipefail

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  echo "convert-images.sh -- Convert HEIC photos to web formats"
  echo ""
  echo "Usage: ./convert-images.sh"
  echo ""
  echo "Converts all HEIC files from bilder-landshut-asis/ to:"
  echo "  - WebP (quality 80, primary web format)"
  echo "  - JPEG (quality 85, fallback)"
  echo "  - AVIF (quality 60, progressive enhancement)"
  echo ""
  echo "Output: assets/images/"
  echo "All files are resized to max 1920x1920, EXIF/GPS stripped, sRGB color space."
  echo ""
  echo "Requires: ImageMagick 7+ (brew install imagemagick)"
  exit 0
fi

SRC="bilder-landshut-asis"
DEST="assets/images"
mkdir -p "$DEST"

for f in "$SRC"/*.HEIC; do
  # Handle filenames with spaces
  base=$(basename "${f%.*}" | tr ' ' '-' | tr '[:upper:]' '[:lower:]')

  # WebP (primary format, quality 80)
  magick "$f" -colorspace sRGB -strip -quality 80 -resize "1920x1920>" \
    "$DEST/${base}.webp"

  # JPEG fallback (quality 85)
  magick "$f" -colorspace sRGB -strip -quality 85 -resize "1920x1920>" \
    "$DEST/${base}.jpg"

  # AVIF (quality 60, for hero candidates)
  magick "$f" -colorspace sRGB -strip -quality 60 -resize "1920x1920>" \
    "$DEST/${base}.avif"

  echo "Converted: $base (.webp, .jpg, .avif)"
done

echo ""
echo "All images converted to: $DEST/"
echo "EXIF/GPS data stripped. Color space: sRGB."
