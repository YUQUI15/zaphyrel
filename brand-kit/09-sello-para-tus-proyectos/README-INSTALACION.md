# Insignia Oficial para Proyectos — `by ZAPHYREL` (Inferior Izquierda)

Sello compacto, fino y elegante con el emblema 3D PBR oficial (**2 aros átomo + 3 líneas cian + Prisma Cristal**), diseñado para firmar en la **esquina inferior izquierda** todos tus sistemas web, SaaS, Next.js, POS, paneles administrativos y portales.

## Características
- **Auto-adaptación real a Modo Oscuro y Modo Claro**: detecta automáticamente `class="dark"`, `class="light"`, `data-theme="dark|light|day|night"`, `data-bs-theme`, luminancia real del `body` y `prefers-color-scheme`.
- **Cero conflictos CSS**: encapsulado en Shadow DOM (no rompe estilos de Tailwind, Bootstrap, MUI o CSS personalizados).
- **100% autocontenido y offline-safe**: el ícono PBR 3D está embebido directamente en WebP lossless (`192×192`), funciona sin conexión externa adicional si copias `zaphyrel-badge.js` en tu carpeta local.
- **Anti-solapamiento inteligente**: detecta barras inferiores móviles (`bottom-nav`) o menús laterales fijos en desktop y ajusta su margen automáticamente; oculto en impresión (`@media print`).

## Instalación rápida

### 1. Cualquier Web / HTML / PHP / Astro / Vite (1 línea)
```html
<script src="https://zaphyrel-site.vercel.app/assets/zaphyrel-badge.js" defer></script>
```
*(O copia `zaphyrel-badge.js` en tu carpeta `/assets/` o `/js/` y cárgala localmente).*

### 2. React / Next.js (`ZaphyrelBadge.tsx`)
Copia `ZaphyrelBadge.tsx` en `src/components/brand/ZaphyrelBadge.tsx` e inclúyelo dentro de `layout.tsx` o `App.tsx`:
```tsx
import ZaphyrelBadge from "@/components/brand/ZaphyrelBadge";
// ...
<ZaphyrelBadge />
```
