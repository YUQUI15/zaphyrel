# Zaphyrel

> **Esencia que permanece e innovación que fluye**

Identidad de marca completa y experiencia web interactiva para un estudio de sistemas, plataformas y aplicaciones a medida.

## Qué incluye este repositorio

- **`site/`** — Landing interactiva lista para abrir o publicar en GitHub Pages (`site/index.html`):
  - Emblema facetado con animación de trazo, inclinación 3D, halo orbital y anatomía interactiva del símbolo.
  - **Laboratorio en vivo con 8 sistemas funcionales**: Restaurante (`Table`), Gimnasio (`Fit`), Inventario (`Stock`), Hotel (`Stay`), Clínica y citas (`Care`), Instituto / Biblioteca (`Lib`), Catálogo web (`Shop`) y Cuentas (`Ledger`).
  - **Marca blanca instantánea** (nombre y color del negocio en tiempo real) + selector de vista **Escritorio / Móvil**.
  - **Configurador de proyecto a medida**: arma módulos y flujos automáticos para cualquier rubro.
  - Comparador **Antes y después**, modo **Día / Noche**, paleta de comandos (`Ctrl + K`) e identidad sonora activable.
- **`logo/`** — Símbolo facetado en SVG (`color`, `monocromático`, `sobre oscuro` y `lockup` completo).
- **`mockups/`** — Tarjeta de presentación con relieve seco, portada/avatar de redes y hoja membretada A4.
- **`tokens/`** — Variables CSS de color, tipografía, espaciado y movimiento (`zaphyrel.tokens.css`).
- **`scripts/`** — Script en Python (solo biblioteca estándar) para regenerar los audios WAV de la marca (`make_sound.py`).
- **`docs/`** — Libro de marca con guía de uso, paleta, tipografía y arquitectura (`BRAND_BOOK.md`).

## Vista local

```bash
python -m http.server 8765
```

Luego abre `http://localhost:8765/site/`.

## Publicar en GitHub Pages

1. Ve a **Settings → Pages** en el repositorio.
2. En **Source**, elige **Deploy from a branch**, selecciona `main` y la carpeta `/ (root)`.
3. El archivo `index.html` de la raíz redirige automáticamente a `site/`.

---

*Nota: los datos de ejemplo y la dirección `hola@zaphyrel.com` son ilustrativos y deben reemplazarse por los datos de contacto reales antes de publicar comercialmente.*
