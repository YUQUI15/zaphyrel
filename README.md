# Zaphyrel

> **Esencia que permanece e innovación que fluye**

Atelier de arquitectura digital, entornos interactivos 3D / 360° y sistemas operativos a medida.

## Paleta Oficial y Sistema Visual v7

- **Base Arquitectónica**: Negro Obsidiana (`#07080D`), Blanco Cristal (`#FFFFFF`), Perla (`#F2F4F9`) y Grises Neutros (`#E6E9F2`, `#8890A2`, `#485062`) con grano táctil anodizado y biseles de relieve reales.
- **Espectro Pastel Coolors**: `#FF9AFF` · `#FFD5FF` · `#D5BEFF` · `#A9DCFF` · `#81BDF8`.
- **Emblema Octogonal Escultórico (`v7`)**: silueta abierta a 45°, doble anillo octogonal interior, estelas Zéfiro biseladas y nuevo **monograma `Z` cincelado en tres planos** con sombra sólida y arista prismática.
- **Tipografía Editorial Futurista**: `Syne` (Display escultórico) + `Cormorant Garamond` (Énfasis editorial en cursiva) + `Plus Jakarta Sans` (Interfaz) + `JetBrains Mono` (Telemetría).

## Qué incluye este repositorio

- **`site/`** — Plataforma espacial v7 lista para Vercel o GitHub Pages (`site/index.html`):
  - **Cámara Espacial 3D / 360° / HiDPI 4K / RV**: motor 3D extruido en tiempo real (arrastrable en 360°, con *Despiece Axial*, selector de materiales *Cristal Coolors / Obsidiana Noir / Titanio Satinado* y *Modo Horizonte Esférico RV* expandible a pantalla completa).
  - **Estructura Espacial No Genérica**: HUD minimalista superior + **Dock Espacial Flotante inferior**, superficies con micro-grano SVG (`feTurbulence`) y reflejo especular 3D interactivo.
  - **Ingeniería Dimensional (`#esencia`)**: disección axial de los 4 estratos del emblema v7 y telemetría de sincronía atómica.
  - **Zaphyrel Studio OS (`#lab`)**: 8 núcleos funcionales en vivo (*Restaurante, Gimnasio, Inventario, Hotel, Clínica, Instituto/Biblioteca, Catálogo web y Cuentas*) con vista **Escritorio / Móvil (`390px`)**.
  - **Topología Isométrica 3D (`#arquitecto`)**, **Comparador Estructural (`#antes`)**, modo **Día / Noche**, paleta de comandos (`Ctrl + K`) e identidad sonora WebAudio.
- **`logo/`** — Emblema v7 en SVG (`color`, `sobre oscuro`, `monocromático` y `lockup` en `Syne`).
- **`mockups/`** — Tarjetas de presentación, banner social y membrete actualizados a v7.
- **`tokens/`** — Variables CSS listas para modo Día y Noche (`zaphyrel.tokens.css`).
- **`scripts/`** — Generador Python de identidad sonora (`make_sound.py`).
- **`docs/`** — Manual de identidad de marca v7 (`BRAND_BOOK.md`).

## Vista local

```bash
python -m http.server 8766
```

Luego abre `http://localhost:8766/site/`.

---

*Nota: los escenarios demostrativos y la dirección `hola@zaphyrel.com` son ilustrativos para vista previa.*
