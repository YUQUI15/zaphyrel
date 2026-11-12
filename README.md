# Zaphyrel

> **Esencia que permanece e innovación que fluye**

Estudio de ingeniería de software, visualización interactiva 3D / 360° y sistemas operativos digitales a medida.

## Identidad y Arquitectura v9

- **Base Arquitectónica**: Negro Obsidiana (`#06070B`), Blanco Puro (`#FFFFFF`), Perla (`#F3F4F9`) y Grises Minerales (`#E6E9F2`, `#485062`) con grano micro-anodizado, superficies cóncavas y biseles especulares.
- **Espectro Pastel Coolors**: `#FF9AFF` · `#FFD5FF` · `#D5BEFF` · `#A9DCFF` · `#81BDF8`.
- **Monograma `Z` Didot Fluido (`v9`)**: silueta octogonal abierta a 45° con anillo interior relojero, estelas Zéfiro y una **`Z` caligráfica tipo Didot** de brazos ondulados, cintura orgánica afilada y barra transversal luminosa Coolors (sin trazos rectos rígidos ni estrellas de 4 puntas).
- **Tipografía Fina y Protagonismo de Marca**: `Cormorant Garamond` (Light 300 / Regular 400 con amplio tracking editorial para `ZAPHYREL`) + `Outfit` (300/400/500 para lectura y controles) + `JetBrains Mono` (coordenadas y telemetría).

## Estructura del Proyecto

- **`site/index.html`** — Experiencia interactiva v9 lista para Vercel:
  - **Cámara Espacial `Z-360°` / 4K HiDPI / RV**: motor 3D extruido en Tiempo Real con la geometría curva de 41 puntos del monograma `Z` Didot + barra luminosa, rotación 360°, despiece axial, cambio de material (*Cristal Coolors / Obsidiana Noir / Titanio Satinado*) y *Horizonte Esférico RV*.
  - **Anatomía del Sello (`#esencia`)**: despiece de 4 planos constructivos en 3D con lectura de coordenadas y sincronía de pulso.
  - **Studio OS en Vivo (`#lab`)**: cabina operativa con riel vertical y 8 sistemas reales ejecutables (*Restaurante, Gimnasio, Inventario, Hotel, Clínica, Instituto/Biblioteca, Boutique web y Cuentas/Tesorería*) en vista Escritorio y Móvil `390px`.
  - **Arquitectura & Comparador (`#arquitecto` + `#antes`)**: diagrama isométrico interactivo de 3 capas, tarjetas con inclinación 3D al cursor y comparador antes/después.
  - **Proceso (`#metodo`), Contacto (`#contacto`) y Pie de página arquitectónico** en 3 columnas con acceso directo.
- **`logo/`** — Emblemas v9 en SVG (`color`, `sobre oscuro`, `monocromático` y `lockup` en `Cormorant Garamond 300`).
- **`mockups/`** — Tarjeta, portada social y membrete actualizados a v9.
- **`tokens/`**, **`scripts/`**, **`docs/`** — Tokens CSS, audio WebAudio/WAV y manual v9.

## Vista local

```bash
python -m http.server 8767 --directory site
```

Abre `http://localhost:8767/`.
