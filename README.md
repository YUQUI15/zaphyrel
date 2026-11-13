# Zaphyrel

Estudio de ingeniería de software operativo (**POS, ERP, CRM & PMS a medida**) y visualización interactiva **3D / 360°** para empresas en Perú y Latinoamérica.

## Modelo Híbrido Acelerado (v11)

- **Aceleradores Verticales + Personalización 100%**: Partimos de **9 núcleos operativos probados** (*Table POS, Stay PMS 360°, Showroom 3D, Care Clínica, Stock Kardex, Fit QR, Shop Web, Cuentas Globales y Lib*) adaptados bajo tu marca, reglas y dominio propio en **3 a 6 semanas**.
- **Operación Real Perú & LatAm**: Facturación electrónica **SUNAT / OSE** (Boletas B001, Facturas F001, IGV 18%), conciliación **Yape / Plin / Izipay / Niubiz**, impresoras térmicas `80mm` (ESC/POS), lectores de barras y arquitectura **Offline-First**.

## Arquitectura del Sitio (`site/`)

- **`site/index.html`**:
  - **Visor 3D Hero con 3 modelos de negocio**: conmutador en vivo entre *Producto 3D Comercial*, *Planta Hotel 3D* y *Núcleo Zaphyrel*, con rotación 360°, despiece por capas y captura PNG.
  - **Arquitectura de Producto en 4 Capas (`#esencia`)**: disección interactiva desde la capa visual 3D hasta el núcleo financiero SUNAT y Offline.
  - **Zaphyrel Studio OS (`#lab`)**: 9 sistemas con datos pre-cargados en vivo, widget permanente de **Caja Global en Vivo**, simulador **Offline-First (corte Wi-Fi)** y personalización *White-Label* (*Espectro Prisma Lumínico / Acabados*).
  - **Casos Reales, Configurador & Formulario Pre-llenado (`#casos`, `#arquitecto`, `#contacto`)**.
  - **Rendimiento GPU & Accesibilidad**: pausa automática de animaciones `requestAnimationFrame` vía `IntersectionObserver` y etiquetas WAI-ARIA completas.
- **Rutas SEO Dedicadas**:
  - `site/soluciones/restaurantes/` — POS Restaurantes + SUNAT + Cocina KDS
  - `site/soluciones/hoteles/` — PMS Hoteles + Llave QR + Tour 360°
  - `site/soluciones/3d-web/` — Showrooms WebGL 3D & Configuradores E-Commerce
  - `site/sitemap.xml` & `site/robots.txt`

## Vista local

```bash
python -m http.server 8769 --directory site
```
