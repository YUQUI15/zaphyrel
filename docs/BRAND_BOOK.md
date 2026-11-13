# Manual Maestro de Identidad de Marca — ZAPHYREL

> **Eslogan Oficial Principal (Verificado Sin Saturación):** `ARQUITECTURA QUE ENLAZA`  
> **Dónde Explorar y Elegir Todo Visualmente:**  
> - **En tu web online:** `https://zaphyrel-site.vercel.app/marca/` *(con visor 3D WebGL 360° interactivo en vivo + descargas)*  
> - **En tu PC (local):** `brand-kit/CATALOGO_MARCA.html` *(doble clic para abrir en Chrome o Edge)*

---

## 1. Filosofía y Por Qué Cambiamos de Eslogan

Tras realizar una auditoría real de mercado y registrabilidad ante **INDECOPI (Perú)**:
- Frases comunes como **`"ECOSISTEMAS DIGITALES"`** o **`"DEL MOSTRADOR A LA GERENCIA"`** resultaron **saturadas** por múltiples agencias y software existentes (`ecosistemasglobal.com`, `foxsystem.pe`, entre otros) y además son consideradas términos técnicos genéricos sin exclusividad legal.
- **`ARQUITECTURA QUE ENLAZA`** proyecta elegancia, ingeniería propia, diferencia inmediata frente al mercado común y **registrabilidad sólida** tanto como parte de la **Marca Mixta** como en figura de **Lema Comercial** ante INDECOPI.

---

## 2. Arquitectura del Isotipo (`Z` Split-Blade & Corona Octogonal)

El emblema oficial está trazado sobre una retícula vectorial estricta de **`120 × 120` unidades** (`viewBox="0 0 120 120"`), y se esculpe tridimensionalmente en el motor WebGL (`site/assets/zaphyrel-3d.js`):

| Elemento Constructivo | Geometría & Medida Exacta | Significado Funcional |
| :--- | :--- | :--- |
| **Marco Octogonal Exterior** | Ochavado simétrico a **`45°`** (`46→114 u` en eje X/Y) | Estructura modular cerrada y protección operativa |
| **Bisel Interior Octogonal** | Anillo interno de **`1.5 u`** concéntrico a `45°` | Precisión de alta relojería y profundidad dimensional |
| **Corona Abierta Superior** | Apertura cenital prismática a `45°` en 7 facetas | Escalabilidad e integración continua entre módulos |
| **Alas `Z` Split-Blade** | Dos planos diagonales paralelos a **`45°`** sin serifas | Enlace directo entre cara pública y backoffice |
| **Canal Ecuatorial (`y = 60`)** | Ranura horizontal limpia entre `y = 58` y `y = 62` (`4 u` de luz) | Flujo bidireccional de datos entre áreas y personal |
| **3 Barras de Impulso** | Tres trazos izquierdos escalonados (`10→30.5 u`) | Sincronización multinivel: dirección, equipo y operación |

### Reglas de Uso, Área de Respeto y Tamaños Mínimos

- **Área de Respeto (Clear Space):** **`0.25X`** alrededor de todo el isotipo o lockup (`30 u` en matriz `120 u`).
- **Mínimo Digital:** Isotipo **`24 × 24 px`** (`16 × 16 px` favicon `site/assets/favicon.svg`); Lockup horizontal **`180 px` ancho**.
- **Mínimo Impreso:** Isotipo **`12 mm`** alto; Lockup completo **`38 mm`** ancho.

---

## 3. Los 3 Acabados 3D PBR Reales en Órbita 360° (`brand-kit/07-emblema-3d-sovereign-pbr/`)

Renderizados directamente desde el motor WebGL Three.js oficial del sitio (`PRISMA CRISTAL`, `OBSIDIANA TITANIO` y `PORCELANA STUDIO`) en **3 ángulos** (`Órbita 360°`, `Vista Frontal` y `Despiece Axial 50%`) y **4 formatos por pose** (`-transparente.png`, `-fondo-noche.png`, `-fondo-dia.png`, `.jpg`):

1. **`01 · Prisma Cristal PBR`:** Facetas vítreas traslúcidas (`transmission: 0.48`, `IOR 1.54`, `roughness: 0.08`, `clearcoat: 1.0`), chasis marfil perlado, ala inferior con textura luminosa prismática, doble cara Z posterior, 2 anillos giroscópicos y 16 octaedros ópticos en órbita.
2. **`02 · Obsidiana Titanio PBR`:** Facetas metálicas cepilladas oscuras (`metalness: 0.85`, `roughness: 0.15`), chasis carbono profundo (`#111524`), ala superior `Z` blanco polar (`#F4F7FF`) y alta emisión cromática nocturna.
3. **`03 · Porcelana Studio PBR`:** Material cerámico satinado claro (`roughness: 0.24–0.26`, chasis `#FFFFFF` puro, `#121622` en ala superior `Z`), diseñado para portadas claras, papelería corporativa de lujo y presentaciones de día.

---

## 4. Los 6 Acabados Vectoriales 2D (`brand-kit/01-isotipos-y-estilos/`)

Entregados en **SVG**, **PNG transparente**, **PNG con fondo sólido** y **JPG alta resolución**:
1. `01-prisma-dia` (blanco marfil)
2. `02-prisma-noche` (obsidiana `#06070B`)
3. `03-relieve-cristal-glass` (bisel 2.5D vectorial)
4. `04-metalico-titanio-relieve` (acero/titanio 2D cepillado)
5. `05-monocromo-negro-sello` (`#000000` pleno sin degradados — obligatorio **INDECOPI**, sellos, láser)
6. `06-monocromo-blanco-negativo` (`#FFFFFF` puro — marcas de agua, uniformes oscuros, fotografía)

---

## 5. Opciones de Tipografía (3) y Eslogan Verificado (5)

### Tipografías (`03-opciones-tipografia-y-eslogan/`)
- **Opción 1 (Oficial Lujo):** `Cormorant Garamond` (`300/400`, tracking `0.24em–0.28em`).
- **Opción 2 (Tech / SaaS):** `Space Grotesk` (`500`, tracking `0.18em–0.22em`).
- **Opción 3 (Monumental / Corporativa):** `Cinzel` (`500`, tracking `0.24em–0.30em`).
- **Soporte:** `Outfit` (títulos/UI) + `JetBrains Mono` (códigos, precios y especificaciones).

### 5 Eslóganes Propios Verificados (Cero Clichés Comunes)
1. **`ARQUITECTURA QUE ENLAZA`** *(Oficial principal — elegancia y diferencia clara frente a agencias genéricas).*
2. `EL PULSO EXACTO DE TU EMPRESA` *(Alta gama para portadas y videos de marca).*
3. `ESTRUCTURA VIVA · CONTROL REAL` *(Dualidad entre orden estructural interno y flujo operativo en tiempo real).*
4. `DONDE CADA ÁREA ENCAJA` *(Comunica directamente el enlace de empleados, almacén, caja y dirección).*
5. `INGENIERÍA DE ORDEN VIVO` *(Sobria y diferenciada para municipalidades, clínicas y corporativos).*

---

## 6. Espectro Cromático, Relieves y Texturas

| Nombre Técnico | HEX | RGB | CMYK Aprox. | Pantone Sugerido |
| :--- | :--- | :--- | :--- | :--- |
| **Zafiro Cielo** | `#81BDF8` | `129, 189, 248` | `48 / 24 / 0 / 3` | `278 C` |
| **Hielo Etéreo** | `#A9DCFF` | `169, 220, 255` | `34 / 14 / 0 / 0` | `290 C` |
| **Lavanda Prisma** | `#D5BEFF` | `213, 190, 255` | `16 / 25 / 0 / 0` | `264 C` |
| **Rosa Seda** | `#FFD5FF` | `255, 213, 255` | `0 / 16 / 0 / 0` | `706 C` |
| **Orquídea Seda** | `#FF9AFF` | `255, 154, 255` | `0 / 40 / 0 / 0` | `2375 C` |

- **Neutros:** Blanco Puro `#FFFFFF` · Blanco Perla `#F8FAFF` · Gris Niebla `#EAEEF8` · Gris Acero `#8890A2` · Gris Mineral `#434B5E` · Obsidiana `#090B10` · Negro Abisal `#06070B`.
- **Relieves & Texturas:** `--rim-top` (luz cenital en bisel `1px`), `--recess` (`inset 0 2px 6px rgba(0,0,0,0.65)`), `--depth-1` / `--depth-2` y micro-texturas `--grain-op`: **Cristal (`0.012`)**, **Satín (`0.028`)** y **Obsidiana (`0.042`)**.
