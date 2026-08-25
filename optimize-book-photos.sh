#!/bin/bash

find "public/fotos web" -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) -print0 |
while IFS= read -r -d '' f; do
  echo ""
  echo "========================================"
  echo "OPTIMIZANDO: $f"
  echo "========================================"

  out="${f%.*}.webp"

  magick "$f" \
    -auto-orient \
    -resize '1920x1920>' \
    -strip \
    -quality 84 \
    "$out"

  if [ $? -eq 0 ] && [ -s "$out" ]; then
    echo "LISTO: $out"
  else
    echo "ERROR: $f"
    rm -f "$out"
  fi
done

echo ""
echo "========================================"
echo "OPTIMIZACION DE FOTOS TERMINADA"
echo "========================================"
