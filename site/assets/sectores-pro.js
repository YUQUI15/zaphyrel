/* ============================================================================
   ZAPHYREL SECTORES PRO — 16+ Industrias, Multi-Plataforma & Capacidades Únicas
   ============================================================================ */
(() => {
  'use strict';

  const shell = () => window.__zaphyrelShell || {};
  const ping = (v = 0.06) => { try { shell().ping?.(v); } catch (_) {} };
  const esc = (s) => shell().esc?.(s) ?? String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));

  const ICONS = {
    tiendas: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
    farmacias: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M12 8v8M8 12h8"/></svg>',
    ferreterias: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    moda: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></svg>',
    restaurantes: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>',
    discotecas: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    gimnasios: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 6.5h11v11h-11z"/><path d="M3 9v6M21 9v6M6.5 12h11"/></svg>',
    clinicas: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
    veterinarias: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/></svg>',
    hoteles: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14"/><path d="M2 14h20"/><path d="M7 10h.01M12 10h.01M17 10h.01"/></svg>',
    educacion: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
    inmobiliaria3d: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><line x1="12" y1="22" x2="12" y2="15.5"/><polyline points="22 8.5 12 15.5 2 8.5"/></svg>',
    talleres: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.6.79 1.02 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    almacenes: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
    manufactura: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/></svg>',
    estudios: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>'
  };

  /* --------------------------------------------------------------------------
     6 Multi-Surface Platform Engines (Not Generic Brochure Websites)
     -------------------------------------------------------------------------- */
  const PLATFORM_STACKS = [
    {
      id: 'web3d',
      code: '01 · SUPERFICIE',
      name: 'Web Pública, Portales B2B & Visores 3D',
      headline: 'Presencia comercial cinemática conectada al stock y agendas reales',
      desc: 'No hacemos landing pages estáticas desconectadas del negocio. Tu web consulta stock vivo por sede, cotiza a medida, toma reservas con abono inmediato y despliega gemelos espaciales WebGL 3D/360° directo en navegador.',
      tags: ['Ecommerce Live-Stock', 'Portal Cliente / Socio', 'WebGL 3D / 360°', 'Pasarelas + Yape QR'],
      bullets: [
        ['Reserva atómica anti-doble venta', 'Cuando un cliente aparta una mesa, habitación, hora clínica o departamento 3D en línea, el núcleo bloquea el cupo al instante para todo el personal.'],
        ['Portales autoservicio por cliente/empresa', 'Tus compradores B2B o apoderados descargan comprobantes SUNAT, estado de cuenta, tracking de pedido o seguimiento de taller sin saturar tu WhatsApp.'],
        ['Configuradores 3D interactivos sin apps externas', 'Cambio en tiempo real de acabados, pisos, iluminación solar o despiece de maquinaria conectado a cotización instantánea.']
      ]
    },
    {
      id: 'desktop',
      code: '02 · ESCRITORIO',
      name: 'Sistemas Local-First & POS de Alta Velocidad',
      headline: 'Terminales de caja, recepción o despacho que operan con o sin internet',
      desc: 'Diseñados para turnos intensivos donde cada segundo cuesta clientes: interfaz manejable 100% por atajos de teclado, impresión térmica directa sin cuadros de diálogo del navegador y cola offline local cifrada.',
      tags: ['POS Touch / Teclado', 'Impresión Directa ESC/POS', 'IndexedDB / SQLite Offline', 'Multi-Caja por Sede'],
      bullets: [
        ['Continuidad total ante caídas de red', 'Si se corta el internet en hora pico, sigues emitiendo tickets, guardando comandas y escaneando códigos; todo sincroniza en orden cronológico al volver la señal.'],
        ['Lectores de barras y balanzas sin retardos', 'Soporte nativo para pistolas USB/Bluetooth, cajones RJ11, visores de cliente duales y básculas digitales en tiempo real.'],
        ['Arqueo ciego de caja anti-descuadre', 'El cajero declara su conteo físico antes de ver el teórico del sistema; la diferencia exacta por método de pago sube a gerencia.']
      ]
    },
    {
      id: 'mobile',
      code: '03 · APPS MÓVILES',
      name: 'Apps Móviles de Piso, Ruta, Campo & Técnicos',
      headline: 'Tu personal trabaja en la calle, bodega o salón con telemetría en tiempo real',
      desc: 'Reemplaza los grupos caóticos de fotos en WhatsApp y cuadernos de reparto. Cada colaborador en campo recibe rutas, checklists obligatorios, escáner QR por cámara y captura de evidencia geolocalizada.',
      tags: ['PWA / Android Offline', 'Firma & Foto Prueba', 'Checklist Con Fotos', 'Escáner QR Cámara'],
      bullets: [
        ['Recepción visual con evidencia inviolable', 'En talleres, flotas o logística, el técnico captura fotos obligatorias del vehículo o carga antes de tocarlo; queda timestamped para el cliente.'],
        ['Picking e inventarios cíclicos sin cerrar tienda', 'Recorre pasillos con el celular leyendo códigos de barras para contar estantes, reponer vitrina o detectar vencimientos próximos.'],
        ['Reparto con verificación de entrega QR', 'El repartidor cobra saldo Yape/Plin en destino, toma foto del cargo y actualiza automáticamente el estado del pedido web.']
      ]
    },
    {
      id: 'bots',
      code: '04 · AUTOMATIZACIÓN & IA',
      name: 'Bots WhatsApp, Flujos n8n, OCR & Alertas Directivas',
      headline: 'Tu sistema trabaja de madrugada leyendo boletas, cobrando y vigilando anomalías',
      desc: 'Integramos flujos autónomos con WhatsApp Business API, n8n y modelos de visión/IA para eliminar el tipeo repetitivo, evitar olvidos humanos y avisarte al celular cuando algo no cuadra en caja o almacén.',
      tags: ['WhatsApp API + Bot', 'OCR Facturas Foto→Stock', 'Workflows n8n 24/7', 'Alertas Telegram/WA'],
      bullets: [
        ['Ingesta automática de facturas por foto (OCR)', 'Toma foto a la factura del proveedor y el motor extrae RUC, ítems, cantidades y costos unitarios para pre-cargar el Kardex sin digitar filas.'],
        ['Recordatorios inteligentes que sí cobran', 'Aviso automático con enlace de pago o QR días antes del vencimiento de membresías, vacunas de mascotas, mantenimientos vehiculares o pensiones.'],
        ['Centinela anti-anomalías en tiempo real', 'Si un usuario anula 3 tickets seguidos, vende bajo costo o abre la gaveta sin venta, el dueño recibe una alerta instantánea con detalle del turno.']
      ]
    },
    {
      id: 'hardware',
      code: '05 · HARDWARE & IOT',
      name: 'Puertas QR, Torniquetes, KDS Cocina & Sensores',
      headline: 'Código que gobierna dispositivos físicos dentro de tu local o almacén',
      desc: 'Conectamos la capa web y administrativa directamente con puertas de acceso, pantallas industriales en cocina, impresoras remotas por área (bar vs parrilla) y básculas por puerto serial.',
      tags: ['Torniquetes QR / RFID', 'Pantallas KDS Táctiles', 'Impresoras IP por Zona', 'Básculas Serial / USB'],
      bullets: [
        ['Bloqueo automático en puerta por mora o aforo', 'En clubes, gimnasios o institutos, el torniquete valida membresía vigente o entrada QR cifrada anti-captura de pantalla en 120 ms.'],
        ['Enrutamiento inteligente a cocina y barras', 'Los tragos imprimen en barra, entradas en cocina fría y carnes en parrilla con temporizador de demora visible para el chef.'],
        ['Pesaje conectado sin error humano', 'En minimarkets o plantas, el peso de la balanza viaja directo al monto del POS eliminando errores de digitación en productos a granel.']
      ]
    },
    {
      id: 'fiscal',
      code: '06 · NÚCLEO & BI',
      name: 'Kardex Real, SUNAT UBL 2.1 & Tableros Ejecutivos',
      headline: 'Saber cuánto ganaste hoy realmente, descontando merma, insumos y comisiones',
      desc: 'Deja de adivinar rentabilidad mirando solo los ingresos del día. Nuestro núcleo consolida costo promedio ponderado, recetas, cuentas por cobrar/pagar y auditoría por rol.',
      tags: ['SUNAT / OSE UBL 2.1', 'Costo Receta / Escandallo', 'Comisiones por Rol', 'Auditoría Inmutable'],
      bullets: [
        ['Utilidad neta real minuto a minuto', 'Cada venta descuenta automáticamente insumos (gramos de receta o repuestos), comisión de vendedor y métodos de pago para mostrarte utilidad limpia.'],
        ['Trazabilidad absoluta de quién hizo qué', 'Cada cambio de precio, nota de crédito o ajuste manual exige motivo y PIN de supervisor, quedando registrado en bitácora inalterable.'],
        ['Reportes listos para tu estudio contable', 'Exportación estructurada de registros de ventas, compras, detracciones y kardex valorizado en 1 clic.']
      ]
    }
  ];

  /* --------------------------------------------------------------------------
     16 Vertically Engineered Rubros + 4 Non-Obvious High-Impact Innovations Each
     -------------------------------------------------------------------------- */
  const SECTORS = [
    {
      id: 'tiendas', num: '01', cat: 'comercio', catLabel: 'Comercio & Retail',
      name: 'Tiendas, Minimarkets & Cadenas Retail', shortName: 'Tiendas Retail',
      badge: 'Retail · Multi-Caja + Web', badgeOk: true, mod: 'retail', ficha: '../soluciones/tiendas/', bizParam: 'Tienda Retail',
      platforms: ['Web Live-Stock', 'POS Desktop Offline', 'App Conteo Móvil', 'Bot Alertas'],
      thesis: 'Conecta e-commerce con stock real por sede, caja relámpago con código de barras, app móvil de reposición y kardex consolidado sin quiebres ficticios.',
      kpis: [{ k: 'SINCRONÍA STOCK', v: '< 900 ms' }, { k: 'NORMATIVA XML', v: 'SUNAT UBL 2.1' }, { k: 'CIERRE DE CAJA', v: 'Arqueo Ciego' }],
      hardware: ['Lector USB / BT EAN-13', 'Impresora 80mm / Gaveta RJ11', 'Balanza Serial Granel', 'Yape / Plin / Izipay'],
      layers: [
        { short: '01 Web', tag: '01 · SUPERFICIE COMERCIAL', title: 'Catálogo Vivo, Recojo en Tienda & Express', desc: 'Stock publicado por sucursal en tiempo real, compra con bloqueo atómico del carrito y aviso automático cuando el pedido está listo en mostrador.', devices: 'Tienda Web Responsive + Seguimiento por WhatsApp', protocols: 'Reserva atómica SKU · Cálculo dinámico de envío', roles: 'Cliente Final · Despachador Web' },
        { short: '02 Piso', tag: '02 · OPERACIÓN EN PISO Y CAJA', title: 'POS Relámpago + Conteo Móvil Sin Internet', desc: 'Escaneo continuo de productos, pesaje automático desde balanza, atajos 100% teclado para colas rápidas y cola offline IndexedDB si falla el Wi-Fi.', devices: 'POS Touch / PC + App Android Reposición', protocols: 'Cola local sin internet · Cajero PIN con arqueo ciego', roles: 'Cajero · Reponedor · Almacenero' },
        { short: '03 Fiscal', tag: '03 · CONTROL FISCAL Y PROVEEDORES', title: 'SUNAT OSE, Guías y Reposición Inteligente', desc: 'Boletas/facturas automáticas con consulta RUC/DNI, guías de remisión entre tiendas y alertas automáticas cuando un producto cae bajo su punto de reorden.', devices: 'Motor Fiscal Background + Kardex Multi-Almacén', protocols: 'UBL 2.1 · Firma XML · Transferencia Inter-Sede QR', roles: 'Supervisor Tienda · Contador' },
        { short: '04 Gerencia', tag: '04 · DIRECCIÓN MULTI-SUCURSAL', title: 'Margen Neto por SKU, Rotación & Anti-Robo', desc: 'Rentabilidad descontando costo real promedio, detección de inventario estancado (capital dormido) y comparación en vivo entre sedes.', devices: 'Consola Directiva Ejecutiva (PC / Tablet)', protocols: 'Auditoría de mermas · Exportación PLE / Excel', roles: 'Gerente General · Compras' }
      ],
      innovations: [
        { tag: 'IA · COMPRA SIN TIPEAR', title: 'Ingesta de facturas de proveedor por foto (OCR)', detail: 'Fotografías la factura impresa del mayorista y el sistema extrae ítems, cantidades y costos nuevos para actualizar stock y márgenes en segundos.' },
        { tag: 'ANTI-MERMA · AUDITORÍA', title: 'Detector silencioso de robo hormiga y anulaciones', detail: 'Alerta automática al dueño por WhatsApp si una caja tiene picos anómalos de devoluciones, ventas en cero o aperturas de gaveta sin ticket.' },
        { tag: 'VENTAS · RECOMENDADOR', title: 'Aviso de vencimiento cercano + promo relámpago web', detail: 'Detecta lotes a 20 días de vencer y sugiere/publica paquetes promocionales automáticos en web y caja para recuperar el capital antes de perderlo.' },
        { tag: 'HARDWARE · GRANEL', title: 'Lectura directa de balanza serial al ticket POS', detail: 'El peso exacto de frutas, embutidos o granos cae directo al carrito de caja sin que el cajero tenga que teclear gramos ni errar decimales.' }
      ],
      hier: {
        out: 'Cero quiebres ficticios entre vitrina online y tienda física',
        outDesc: 'Cada unidad vendida en tienda o web descuenta el stock real y recalcula utilidad neta y punto de reposición al segundo.',
        tiers: [
          ['NIVEL 01 · BODEGA', 'Almacenero y Reposición', 'Ingreso OCR de facturas, traslado entre tiendas por QR y conteo cíclico desde smartphone.', 'App Inventario', ''],
          ['NIVEL 02 · PISO / WEB', 'Cajeros, Vendedores y Ecommerce', 'Cobro ultra-rápido por barras + balanza + Yape/Plin y despacho pickup desde pedidos web.', 'POS + Web', 'ok'],
          ['NIVEL 03 · SUPERVISIÓN', 'Jefe de Tienda / Auditoría', 'Autorización por PIN de notas de crédito, arqueo ciego por turno y alerta de mermas.', 'Control Diario', ''],
          ['NIVEL 04 · DIRECCIÓN', 'Gerencia Multi-Sucursal', 'Capital invertido por estante, SKU más rentables y alertas preventivas en el celular.', 'Tablero Ejecutivo', 'ok']
        ]
      }
    },
    {
      id: 'farmacias', num: '02', cat: 'comercio', catLabel: 'Comercio & Retail',
      name: 'Farmacias, Boticas & Ópticas', shortName: 'Farmacias & Ópticas',
      badge: 'Lotes FEFO · Recetas · DIGEMID', badgeOk: true, mod: 'retail', ficha: '', bizParam: 'Farmacia / Botica',
      platforms: ['POS FEFO', 'Web + Receta WhatsApp', 'Monitor Vencimientos', 'SUNAT OSE'],
      thesis: 'Control estricto por lote, registro sanitario y fecha de vencimiento (FEFO), venta fraccionada por blíster/unidad y equivalencias de principios activos al instante.',
      kpis: [{ k: 'ROTACIÓN FEFO', v: 'Lote Próximo Auto' }, { k: 'FRACCIONAMIENTO', v: 'Caja / Blíster / Und' }, { k: 'EXPIRACIONES', v: 'Alerta 90/60/30d' }],
      hardware: ['Lector 2D Datamatrix / QR', 'Impresora Etiquetas Térmicas', 'Termohigrómetro Digital', 'POS + Ticketera 80mm'],
      layers: [
        { short: '01 Web', tag: '01 · PEDIDO CON RECETA Y DELIVERY', title: 'Carga de Receta + Confirmación Químico-Farmacéutica', desc: 'El paciente sube foto de su receta desde web o WhatsApp, el químico valida stock por principio activo y despacha el delivery rastreado.', devices: 'Portal Web + Bridge Receta WhatsApp', protocols: 'Validación farmacéutica · Estado de envío en vivo', roles: 'Paciente · Químico en Turno' },
        { short: '02 Piso', tag: '02 · MOSTRADOR CON ASISTENTE CLÍNICO', title: 'Equivalentes Genéricos & Venta Fraccionada', desc: 'En 1 clic ves stock por unidad o caja, marcas equivalentes con mismo principio activo y alertas automáticas de contraindicación o receta retenida.', devices: 'Terminal POS Farmacéutico Desktop', protocols: 'Selección obligatoria de lote más próximo a vencer', roles: 'Técnico en Farmacia · Químico' },
        { short: '03 Fiscal', tag: '03 · TRAZABILIDAD SANITARIA Y LIBROS', title: 'Control de Lotes, Psicotrópicos & Canjes', desc: 'Bitácora auditable de lotes ingresados y vendidos para inspecciones sanitarias, reporte automático de canjes a laboratorio por vencimiento.', devices: 'Módulo Sanitario + SUNAT UBL 2.1', protocols: 'FEFO estricto · Registro histórico por cliente/CMP', roles: 'Químico Regente · Almacén' },
        { short: '04 Gerencia', tag: '04 · RENTABILIDAD POR PRINCIPIO ACTIVO', title: 'Comisiones Éticas, Margen por Línea & Quiebres', desc: 'Diferencia margen entre productos éticos, genéricos y perfumería; controla bonificaciones por receta médica u óptica sin planillas manuales.', devices: 'Tablero Comercial & Gerencia', protocols: 'Matriz de comisiones · Reporte mermas vencidas', roles: 'Dueño de Cadena · Compras' }
      ],
      innovations: [
        { tag: 'BOT CLIENTE · FIDELIZACIÓN', title: 'Recordatorio automático de recompra en tratamientos crónicos', detail: 'Si un paciente compra pastillas para 30 días, el bot le escribe al día 26 por WhatsApp preguntando si desea repetir su pedido con envío directo.' },
        { tag: 'MOSTRADOR · SUSTITUCIÓN IA', title: 'Sugeridor instantáneo de equivalentes e interacciones', detail: 'Cuando un producto comercial se agota o el cliente pide alternativa accesible, muestra al instante opciones con igual principio activo y dosis.' },
        { tag: 'CUMPLIMIENTO · CANJES', title: 'Semáforo FEFO y lista automática de devolución al proveedor', detail: 'Separa 60 días antes los lotes por vencer para impulsar su salida o generar automáticamente la guía de devolución/canje con el distribuidor.' },
        { tag: 'ÓPTICAS · LABORATORIO', title: 'Tracker de lunas y monturas en taller óptico', detail: 'El cliente ve en línea si sus lentes están en biselado, tratamiento antirreflejo o listos en tienda, con aviso automático por WhatsApp.' }
      ],
      hier: {
        out: 'Cero pérdidas por medicamentos vencidos y atención experta en mostrador',
        outDesc: 'Cada dosis despachada sigue regla FEFO real y dispara recompra recurrente automatizada sin esfuerzo del personal.',
        tiers: [
          ['NIVEL 01 · ALMACÉN FEFO', 'Recepción de Droguerías', 'Alta por escáner 2D guardando lote, registro sanitario y caducidad por caja o blíster.', 'Kardex Sanitario', ''],
          ['NIVEL 02 · BOTICA / WEB', 'Técnicos y Químicos', 'Venta fraccionada con equivalentes al instante y validación de recetas digitales.', 'POS Clínico', 'ok'],
          ['NIVEL 03 · REGENCIA', 'Químico Regente', 'Balance de controlados, historial térmico y expedientes listos ante auditoría DIGEMID.', 'Cumplimiento', ''],
          ['NIVEL 04 · GERENCIA', 'Dirección y Compras', 'Compras exactas según demanda crónica, ranking de rentabilidad y reposición automática.', 'BI Farmacia', 'ok']
        ]
      }
    },
    {
      id: 'ferreterias', num: '03', cat: 'comercio', catLabel: 'Comercio & Retail',
      name: 'Ferreterías, Repuestos & Mayoristas B2B', shortName: 'Ferreterías & Repuestos',
      badge: 'Multi-Medida · OEM · Crédito B2B', badgeOk: false, mod: 'retail', ficha: '', bizParam: 'Ferretería / Repuestos',
      platforms: ['Portal Mayorista B2B', 'POS Multi-Unidad', 'App Cotizador Obra', 'Kardex OEM'],
      thesis: 'Vende un mismo producto por rollo, metro, caja, kilo o unidad sin desarmar el inventario; gestiona equivalencias de códigos OEM, líneas de crédito y despachos a obra.',
      kpis: [{ k: 'CONVERSIÓN MEDIDA', v: 'Rollo ↔ Metro ↔ Und' }, { k: 'CRUCE CÓDIGOS', v: 'OEM / Alternos' }, { k: 'CRÉDITO B2B', v: 'Línea + Letras' }],
      hardware: ['Lector Industrial Cable/BT', 'Impresora Etiquetas Sacks/Tornillos', 'Ticketera 80mm / Matricial A4', 'App Chofer Despacho'],
      layers: [
        { short: '01 Web B2B', tag: '01 · PORTAL CONTRATISTAS & MAESTROS', title: 'Cotizador Rápido por Obra + Precios por Volumen', desc: 'Maestros y constructoras arman listas de materiales 24/7 con su tarifa pactada y verifican stock real en almacén central antes de ir a recoger.', devices: 'Portal Web B2B + Cotizador PDF/Link', protocols: 'Listas de precios por segmento · Aprobación crédito', roles: 'Contratista · Asesor B2B' },
        { short: '02 Piso', tag: '02 · MOSTRADOR DE ALTA COMPLEJIDAD', title: 'Búsqueda por Compatibilidad, Medida o Código Cruzado', desc: 'Encuentra un rodamiento o pastilla de freno buscando por marca/año de máquina o código equivalente en 300 ms, y despacha cortes exactos.', devices: 'POS Escritorio Veloz + Etiquetadora', protocols: 'Conversión automática metro/kg/varilla sin merma falsa', roles: 'Vendedor Técnico · Despacho' },
        { short: '03 Fiscal', tag: '03 · GUÍAS DE REMISIÓN, CRÉDITOS & DETRACCIÓN', title: 'Crédito Controlado, Letras & Guías Electrónicas', desc: 'Bloquea despachos si un cliente excede línea de crédito o tiene facturas vencidas, y emite Guía de Remisión Remitente/Transportista directa a SUNAT.', devices: 'Módulo Cuentas por Cobrar + OSE', protocols: 'GRE SUNAT · Alertas de cobranza y vencimiento', roles: 'Créditos y Cobranzas · Despacho' },
        { short: '04 Gerencia', tag: '04 · COMPRAS POR IMPORTACIÓN Y REPOSICIÓN', title: 'Costeo en Dólares/Soles & Stock en Tránsito', desc: 'Prorratea flete y aduana al costo real del lote, visibiliza mercadería en camino y compara rentabilidad por marca importada o nacional.', devices: 'Consola Finanzas & Importaciones', protocols: 'Multimoneda PEN/USD · Rotación de repuesto lento', roles: 'Gerencia · Importaciones' }
      ],
      innovations: [
        { tag: 'COTIZADOR IA · OBRA', title: 'Convierte listas en foto o Excel de obra en cotización en 15s', detail: 'Si el cliente envía por WhatsApp una foto escrita a mano o un Excel desordenado de materiales, el asistente empareja SKUs y arma el presupuesto con stock.' },
        { tag: 'CORTE EXACTO · CERO MERMA', title: 'Gestor de retazos útiles en cables, planchas y tubos', detail: 'Cuando cortas 4m de un tubo o cable, el sistema registra los retazos sobrantes como sub-lotes vendibles antes de abrir un rollo o plancha nueva.' },
        { tag: 'REPUESTOS · EQUIVALENCIA', title: 'Motor de códigos OEM cruzados y compatibilidad', detail: 'Busca una pieza por número original y te muestra al instante qué marcas alternativas en tu estante encajan físicamente y con qué margen.' },
        { tag: 'COBRANZA · AUTÓNOMA', title: 'Semáforo de línea de crédito + récord por WhatsApp', detail: 'Envía estado de cuenta automático cada viernes a clientes mayoristas con link de pago o cuenta corriente y bloquea nuevos fiados en mora automáticamente.' }
      ],
      hier: {
        out: 'Adiós al caos de rollos cortados, códigos repetidos y cuentas fiadas sin control',
        outDesc: 'Toda cotización aprobada reserva lote, genera guía electrónica y actualiza línea de crédito en un mismo hilo.',
        tiers: [
          ['NIVEL 01 · ALMACÉN PESADO', 'Despacho & Recepción', 'Conteo por bulto/metro, gestión de retazos y carga con guía verificada por foto.', 'WMS Patio', ''],
          ['NIVEL 02 · MOSTRADOR / WEB B2B', 'Asesores Técnicos', 'Búsqueda por código cruzado/vehículo y emisión ágil de boletas, facturas y GRE.', 'POS B2B', 'ok'],
          ['NIVEL 03 · CRÉDITOS', 'Finanzas & Cobranza', 'Control estricto de topes de crédito, letras y recordatorios automáticos de pago.', 'Cartera Viva', ''],
          ['NIVEL 04 · DIRECCIÓN', 'Gerencia Importación', 'Utilidad real en USD/PEN considerando tipo de cambio, flete y hueso de inventario.', 'BI Mayorista', 'ok']
        ]
      }
    },
    {
      id: 'moda', num: '04', cat: 'comercio', catLabel: 'Comercio & Retail',
      name: 'Moda, Calzado & Tiendas Especializadas', shortName: 'Moda & Calzado',
      badge: 'Talla × Color · Cambios · VIP', badgeOk: false, mod: 'retail', ficha: '', bizParam: 'Boutique / Calzado',
      platforms: ['Tienda Web Lookbook', 'POS Matriz Tallas', 'App Vendedor Piso', 'CRM Clientes VIP'],
      thesis: 'Gobierna matrices complejas de talla, color y temporada en segundos, coordina pedidos de otras sucursales desde el probador y controla cambios o devoluciones sin desarmar caja.',
      kpis: [{ k: 'MATRIZ SKU', v: 'Talla × Color × Sede' }, { k: 'CAMBIOS TALLA', v: 'Nota Crédito 1-Clic' }, { k: 'REPOSICIÓN', v: 'Traslado Sugerido' }],
      hardware: ['Impresora Etiquetas Hangtag', 'Lector Inalámbrico BT', 'POS + Ticketera Regalo', 'Tablet Vendedor Piso'],
      layers: [
        { short: '01 Web', tag: '01 · LOOKBOOK INTERACTIVO CON STOCK REAL', title: 'Ecommerce Editorial por Talla Disponible', desc: 'Solo muestra tallas disponibles en tienda o centro de distribución, permite reserva rápida para recoger o envío el mismo día.', devices: 'Storefront Web Editorial + Guía Tallas', protocols: 'Reserva de talla 30 min · Ticket regalo sin precio', roles: 'Compradora · Ecommerce' },
        { short: '02 Piso', tag: '02 · ASISTENTE DE PISO & CAJA', title: 'Consulta Instantánea de Talla en Otras Sedes', desc: 'Desde su celular o tablet en tienda, el asesor revisa si la talla faltante está en otra sucursal y pide traslado o reserva en un toque.', devices: 'App Vendedor Piso + POS Caja', protocols: 'Cambio directo de talla con nota de crédito SUNAT', roles: 'Asesor Moda · Cajero' },
        { short: '03 Fiscal', tag: '03 · CAMBIOS, VALES & ETIQUETADO', title: 'Generador Automático de Etiquetas & Vales QR', desc: 'Imprime hangtags con código de barras al recibir mercadería y emite vales electrónicos QR canjeables en cualquier sede sin perder contabilidad.', devices: 'Motor Vales QR + Impresora Etiquetas', protocols: 'Trazabilidad cambio talla · Nota crédito automática', roles: 'Almacén · Supervisión' },
        { short: '04 Gerencia', tag: '04 · TEMPORADAS Y LIQUIDACIÓN', title: 'Curva de Tallas Muertas & Liquidación Estratégica', desc: 'Identifica en qué modelos quedaron solo tallas extremas para lanzar descuentos focalizados en web sin rebajar lo que se vende a precio lleno.', devices: 'Tablero Colecciones & Márgenes', protocols: 'Sell-through por colección · Margen por marca', roles: 'Director Moda · Compras' }
      ],
      innovations: [
        { tag: 'PROBADOR INTELIGENTE', title: 'Rebalanceo automático de curvas entre tiendas', detail: 'Cada domingo el sistema analiza dónde sobran tallas M y faltan en otro local, creando automáticamente la guía de traslado para nivelar vitrinas.' },
        { tag: 'POSTVENTA · FIDELIZACIÓN', title: 'Ticket regalo QR + cambio ágil sin boleta física', detail: 'El destinatario de un regalo escanea el QR de cambio, ve disponibilidad de tallas y hace el trueque sin trámites tediosos en caja.' },
        { tag: 'CRM · VIP CLIENTELING', title: 'Alerta al asesor cuando vuelve un cliente VIP o su talla', detail: 'Registra preferencias de talla/estilo y notifica por WhatsApp a tus mejores compradoras apenas ingresa nueva colección en su medida exacta.' },
        { tag: 'OMNICANAL · VENTA PASILLO', title: 'Cobra en el probador aunque no haya talla en esa sede', detail: 'Cierras la venta en caja hoy usando stock de otra tienda o bodega central y el sistema agenda automáticamente el courier a su casa.' }
      ],
      hier: {
        out: 'Ninguna venta perdida por talla faltante ni liquidaciones a ciegas',
        outDesc: 'Cada etiqueta y talla está viva entre todas tus sucursales, probadores y tienda web.',
        tiers: [
          ['NIVEL 01 · RECEPCIÓN', 'Bodega & Etiquetado', 'Generación masiva de códigos de barras por modelo-talla-color al desembalar.', 'Hangtags QR', ''],
          ['NIVEL 02 · PISO / WEB', 'Asesores & Boutique Online', 'Consulta móvil entre sedes, venta omnicanal y cambio ágil por regalo o talla.', 'Clienteling', 'ok'],
          ['NIVEL 03 · SUPERVISIÓN', 'Visual & Jefatura Tienda', 'Vales de consumo auditados, notas de crédito SUNAT y traslados inter-locales.', 'Control Stock', ''],
          ['NIVEL 04 · DIRECCIÓN', 'Merchandising & Gerencia', 'Sell-through semanal por colección y liquidación quirúrgica de tallas colgadas.', 'BI Colección', 'ok']
        ]
      }
    },
    {
      id: 'restaurantes', num: '05', cat: 'ocio', catLabel: 'Gastronomía & Clubes',
      name: 'Restaurantes, Cafés & Dark Kitchens', shortName: 'Restaurantes POS',
      badge: 'KDS · Recetas · SUNAT Offline', badgeOk: true, mod: 'table', ficha: '../soluciones/restaurantes/', bizParam: 'Restaurante POS Perú',
      platforms: ['Carta QR + Pedido Mesa', 'POS Touch + Impresoras IP', 'Pantallas KDS Cocina', 'Motor Escandallo'],
      thesis: 'Elimina errores entre salón y cocina: carta QR interactiva, comanderas múltiples por estación, división de cuenta instantánea y descuento por gramos de receta.',
      kpis: [{ k: 'SALÓN A COCINA', v: '< 1.2 s' }, { k: 'SPLIT DE CUENTA', v: 'En 1 Toque' }, { k: 'MODO OFFLINE', v: 'Red Local TCP/IP' }],
      hardware: ['Ticketeras Térmicas IP (Bar/Parrilla)', 'Pantalla Táctil KDS Cocina', 'Tablets Mozos', 'Gaveta + Yape/Plin/Izipay'],
      layers: [
        { short: '01 Web', tag: '01 · CARTA DIGITAL, DELIVERY & RESERVAS', title: 'Carta Viva por Hora + Reservas & Pedidos Propios', desc: 'Cero comisiones abusivas de terceros: el comensal pide para delivery propio o escanea QR en mesa para pedir extras sin esperar mozo.', devices: 'Carta Web Mobile + Checkout Yape/Plin', protocols: 'Oculta platos sin insumo en vivo · Tracking cocción', roles: 'Comensal · Delivery Propio' },
        { short: '02 Piso', tag: '02 · SALÓN Y COCINA SINCRONIZADOS', title: 'Plano de Mesas, KDS Semáforo & Enrutamiento', desc: 'Bebidas salen directo a impresora de barra y fondos a cocina caliente/KDS con alerta de color si un plato excede los minutos pactados.', devices: 'App Mozos + Pantallas KDS + Impresoras Red', protocols: 'Impresión local directa sin internet · Dividir cuentas', roles: 'Mozo · Barman · Jefe Cocina' },
        { short: '03 Fiscal', tag: '03 · CAJA VELOZ, PROPINAS Y ESCANDALLO', title: 'Facturación Multi-Pagador & Control de Insumos', desc: 'Emite boletas separadas por cada comensal de una mesa, calcula propinas por mesero y descuenta carne/licor por onzas o gramos según ficha técnica.', devices: 'POS Caja Touch + SUNAT OSE UBL 2.1', protocols: 'Recetas multinivel · Auditoría platos anulados PIN', roles: 'Cajero · Almacenero Cocina' },
        { short: '04 Gerencia', tag: '04 · INGENIERÍA DE MENÚ & MERMAS', title: 'Food Cost Real, Platos Estrella & Turnos', desc: 'Cruza cuánto alimento entró vs cuánto debió salir según las recetas vendidas, detectando fugas en cocina o bar antes del cierre mensual.', devices: 'Consola Gastronómica Gerencial', protocols: 'Food-cost diario · Rentabilidad por hora/salón', roles: 'Chef Ejecutivo · Dueño' }
      ],
      innovations: [
        { tag: 'COMENSAL · SPLIT PAY', title: 'Escanea el QR de la mesa y divide la cuenta sin llamar al cajero', detail: 'En mesas grandes, cada persona marca desde su celular lo que consumió (o parte iguales), paga por Yape/tarjeta y descarga su boleta/RUC solo.' },
        { tag: 'COCINA · ESCANDALLO VIVO', title: 'Oculta platos en la web/mozos si falta un insumo crítico', detail: 'Si el almacén se queda sin salmón o lomo fino para 2 platos más, el sistema bloquea automáticamente ese plato en la carta antes de prometerlo.' },
        { tag: 'MOTORIZADO · RUTA PROPIA', title: 'Panel de despacho propio para olvidarte del 28% de apps', detail: 'Envía link en tiempo real al cliente para ver por dónde viene su pedido con tu repartidor propio y recompra con cupón directo WhatsApp.' },
        { tag: 'ANTI-MERMA · COCINA', title: 'Comparativo teórico vs físico por ingrediente clave', detail: 'Contrasta exactamente cuántas botellas o kilos debieron consumirse según tickets emitidos vs el conteo nocturno de barra y cámara fría.' }
      ],
      hier: {
        out: 'Rotación más veloz en hora punta y food-cost auditado cada noche',
        outDesc: 'Salón, cocina, barra y delivery propio operan sin gritos ni papeles perdidos incluso si cae el internet.',
        tiers: [
          ['NIVEL 01 · PRODUCCIÓN', 'Cocina, Parrilla & Barra', 'Pantallas KDS con orden de salida, alertas de retraso y descuento de insumos por receta.', 'KDS + Recetas', ''],
          ['NIVEL 02 · SALÓN / DELIVERY', 'Mozos, Motorizados & Web', 'Toma rápida de modificadores, cobro dividido en mesa y pedidos web propios sin comisiones.', 'App Salón + Web', 'ok'],
          ['NIVEL 03 · CAJA & CONTROL', 'Cajeros & Supervisor', 'Emisión UBL 2.1 instantánea, propinas por colaborador y bloqueo de anulaciones sin PIN.', 'POS Blindado', ''],
          ['NIVEL 04 · GERENCIA', 'Chef & Propietario', 'Control de merma por ingrediente, horarios pico y platos con mayor margen real.', 'BI Gastronómico', 'ok']
        ]
      }
    },
    {
      id: 'discotecas', num: '06', cat: 'ocio', catLabel: 'Gastronomía & Clubes',
      name: 'Discotecas, Bares & Promotoras de Eventos', shortName: 'Discotecas & Clubes',
      badge: 'QR Cifrado · Cashless · Anti-Merma', badgeOk: true, mod: 'club', ficha: '../soluciones/discotecas/', bizParam: 'Discoteca / Club QR',
      platforms: ['Ticketera QR Dinámico', 'App Puerta Offline', 'Barra Dosificadora', 'Panel Promotores'],
      thesis: 'Preventas web con QR dinámico anti-clonación que se validan sin cobertura en puerta, boxes VIP con mozos en piso y control exacto de licores hasta el amanecer.',
      kpis: [{ k: 'VALIDACIÓN QR', v: '< 0.25 s' }, { k: 'DOBLE INGRESO', v: '0% Clonado' }, { k: 'CIERRE MADRUGADA', v: '< 5 min' }],
      hardware: ['Pistolas 2D / Cámaras Móviles', 'Lectores Brazalete NFC/QR', 'Ticketeras Alta Velocidad', 'Dosificadores / Balanza Licores'],
      layers: [
        { short: '01 Web', tag: '01 · PREVENTA, LISTAS & MAPA DE BOXES 3D', title: 'Compra de Entradas, Reserva Box & Enlace Promotor', desc: 'El asistente elige su box o mesa en plano interactivo, paga online y recibe su entrada QR criptográfica con enlace asignado al promotor.', devices: 'Ticketera Web Mobile + Enlaces Afiliados', protocols: 'Token QR rotativo/cifrado · Liquidación automática promotor', roles: 'Asistente · Promotor · Relaciones Públicas' },
        { short: '02 Puerta', tag: '02 · CONTROL DE INGRESO Y LISTAS SIN INTERNET', title: 'Escáner Ultra-Rápido + Brazaletes Cashless', desc: 'Lista local pre-sincronizada en smartphones/tablets de anfitriones: si intentan pasar dos veces el mismo QR o una captura de WhatsApp, bloquea en rojo.', devices: 'App Puerta Offline + Impresora Manillas', protocols: 'Sync delta multi-puerta · Aforo exacto en vivo', roles: 'Seguridad Puerta · Anfitriona · Taquilla' },
        { short: '03 Barra', tag: '03 · BARRAS & BOXES ANTI-MERMA', title: 'Botellas Seriadas, Consumo por Shot & Coctelería', desc: 'Cada combo VIP asigna código único de botella entregada al mozo; el despacho en barra descuenta onzas exactas para cruzar con peso al cierre.', devices: 'POS Barra Oscuro (Modo Noche) + Tablets Boxes', protocols: 'Control de cortesías por PIN gerente · Alertas fuga', roles: 'Barman · Mozo VIP · Encargado Almacén' },
        { short: '04 Cierre', tag: '04 · ARQUEO TOTAL DE MADRUGADA', title: 'Cruce Puerta + Boxes + Barra + Promotores en 5 Min', desc: 'Consolida taquilla física, preventa web, consumos en box, comisiones por cada promotor y merma exacta de licores al instante de cerrar.', devices: 'Consola Nocturna Dueños', protocols: 'Rendición individual promotor · Margen evento/DJ', roles: 'Promotor General · Socios' }
      ],
      innovations: [
        { tag: 'PUERTA · ANTI-CAPTURA', title: 'QR dinámico anti-reventa fraudulenta y listas offline', detail: 'Incluso en sótanos sin señal 4G, las puertas comparten validación local para rechazar en rojo cualquier screenshot duplicado de WhatsApp.' },
        { tag: 'VIP · CONSUMO CASHLESS', title: 'Saldo prepagado en QR/pulsera para agilizar barras al x3', detail: 'Evita colas manejando efectivo bajo luces bajas: el cliente recarga crédito por Yape web o caja y canjea tragos en barra en 2 segundos.' },
        { tag: 'LICORES · PESO REAL', title: 'Control nocturno por peso de botella (Anti-aguado / fuga)', detail: 'Escanea cada botella abierta al cerrar en balanza de bolsillo: detecta al mililitro si las onzas servidas coinciden con lo cobrado en barra.' },
        { tag: 'MARKETING · PROMOTORES', title: 'Links únicos por promotor con comisión liquidada automática', detail: 'Se acabaron las discusiones de lista a las 6am: cada promotor ve en vivo cuántos invitados realmente cruzaron puerta y cuánto le corresponde.' }
      ],
      hier: {
        out: 'Puertas veloces sin reventa clonada y cierre de madrugada transparente en 5 minutos',
        outDesc: 'El promotor cobra exacto por QR validados en puerta y la barra concilia mililitro por mililitro.',
        tiers: [
          ['NIVEL 01 · ACCESO', 'Taquilla & Seguridad', 'Escaneo veloz offline/local de entradas web, listas VIP y pases de cortesía.', 'Puerta QR', ''],
          ['NIVEL 02 · PISO / VIP', 'Mozos & Barras', 'Despacho de botellas, pedidos desde boxes y canje instantáneo con QR o pulsera.', 'POS Nocturno', 'ok'],
          ['NIVEL 03 · SUPERVISIÓN', 'Jefe Barra & Operaciones', 'Auditoria en tiempo real de botellas abiertas, tragos anulados y cortesías autorizadas.', 'Control Barra', ''],
          ['NIVEL 04 · DIRECCIÓN', 'Socios & Promotora', 'Liquidación automática de DJ/promotores, utilidad limpia del evento y retención.', 'Cierre Total', 'ok']
        ]
      }
    },
    {
      id: 'gimnasios', num: '07', cat: 'ocio', catLabel: 'Gastronomía & Clubes',
      name: 'Gimnasios, Clubes Deportivos & Spas', shortName: 'Gimnasios & Clubes',
      badge: 'Torniquetes · Clases · Mora Auto', badgeOk: false, mod: 'fit', ficha: '', bizParam: 'Gimnasio / Club',
      platforms: ['App Socio + Reservas', 'Torniquete Biométrico/QR', 'Control Evaluaciones', 'Cobranza Auto'],
      thesis: 'Controla accesos en molinete sin recepcionistas vigilando deudas, gestiona cupos de clases o canchas sintéticas y fideliza socios con métricas físicas reales.',
      kpis: [{ k: 'MOLINETE', v: '< 150 ms Paso' }, { k: 'RENOVACIÓN', v: 'Bot WhatsApp Auto' }, { k: 'CONGELAMIENTO', v: 'Reglas Activas' }],
      hardware: ['Torniquete RFID / QR / Huella', 'Lector Barra / QR Mostrador', 'Balanza Bioimpedancia', 'Impresora Térmica 80mm'],
      layers: [
        { short: '01 Web/App', tag: '01 · PORTAL SOCIO & RESERVA DE CUPOS', title: 'Inscripción Online, Reserva de Clases y Canchas', desc: 'El socio renueva membresía desde su celular, separa bicicleta en spinning o alquila cancha sintética por horas evitando cruces telefónicos.', devices: 'Web App Socio PWA + Calendario Vivo', protocols: 'Waitlist automático en clases llenas · Pago Yape QR', roles: 'Socio · Cliente Canchas' },
        { short: '02 Acceso', tag: '02 · RECEPCIÓN INTELIGENTE Y TORNIQUETES', title: 'Validación Automática al Molinete + Venta Rápida', desc: 'Al escanear QR dinámico o huella, valida plan, horario permitido (ej. plan mañana) y deudas; vende agua/suplementos y toallas en recepción.', devices: 'Controller Torniquete + POS Mostrador', protocols: 'Anti-passback (no prestar QR a terceros)', roles: 'Recepción · Seguridad' },
        { short: '03 Seguimiento', tag: '03 · COACHES, SPA & FICHAS FÍSICAS', title: 'Rutinas, Antropometría & Liquidación Terapistas/Coach', desc: 'Registra peso, medidas y evolución del socio con fotos comparativas y liquida automáticamente sesiones personalizadas o masajes por comisión.', devices: 'Tablet Evaluador / Spa + Bot Asistencia', protocols: 'Historial lesiones · Alerta riesgo de abandono', roles: 'Entrenador · Nutricionista · Masoterapeuta' },
        { short: '04 Gerencia', tag: '04 · RETENCIÓN & RENTABILIDAD POR HORA', title: 'Radar de Deserción & Ingresos Recurrentes', desc: 'Detecta socios que dejaron de asistir hace 10 días para activarlos antes de que pierdan la membresía y mide ocupación real por franja horaria.', devices: 'Tablero Recurrencia & Flujo Caja', protocols: 'Forecast de renovaciones · MRR mensual', roles: 'Gerente Club · Finanzas' }
      ],
      innovations: [
        { tag: 'CHURN AI · RETENCIÓN', title: 'Alerta temprana de socios con riesgo de abandono', detail: 'Cuando un miembro activo reduce súbitamente sus asistencias en 10 días, dispara un mensaje cálido personalizado por WhatsApp o clase gratuita.' },
        { tag: 'SEGURIDAD · ANTI-PASSBACK', title: 'Bloqueo de QR compartido & horario por tarifa', detail: 'Quien paga horario valle no entra en hora punta y nadie puede pasar dos veces seguidas con el mismo código QR para colar a un amigo.' },
        { tag: 'CANCHAS · LUCES & PAGOS', title: 'Reserva online de canchas/sauna con adelanto anti-plantón', detail: 'Se acabaron las horas vacías por reservas falsas: la cancha solo queda bloqueada tras confirmar el adelanto Yape/tarjeta en el calendario vivo.' },
        { tag: 'SUPLENTOS · CARGO A CUENTA', title: 'Toma batido hoy y liquida todo en tu app o salida', detail: 'El socio escanea su pulsera en el juice-bar sin cargar billetera mientras entrena y abona su consumo junto con su plan o al salir.' }
      ],
      hier: {
        out: 'Recepción sin colas, cobros recurrentes automáticos y menos deserción mensual',
        outDesc: 'Cada paso en puerta, reserva de clase y botella vendida alimenta automáticamente comisiones y caja.',
        tiers: [
          ['NIVEL 01 · TORNIQUETE', 'Acceso Físico QR / Huella', 'Control de paso 100% automatizado por plan, saldo y vigencia sin confrontación manual.', 'Hardware Acceso', ''],
          ['NIVEL 02 · PISO / CANCHAS', 'Coaches, Spa & Recepción', 'Check-in de evaluaciones, agenda de clases grupales, alquiler de canchas y juice-bar.', 'Operación Viva', 'ok'],
          ['NIVEL 03 · COBRANZA BOT', 'Retención Automática', 'Recordatorios amigables pre-vencimiento por WhatsApp + links de renovación instantánea.', 'Cobro Auto', ''],
          ['NIVEL 04 · DIRECCIÓN', 'Gerencia & Socios', 'Proyección real de renovaciones, horas saturadas y retorno exacto por m² o cancha.', 'BI Membresías', 'ok']
        ]
      }
    },
    {
      id: 'clinicas', num: '08', cat: 'salud', catLabel: 'Salud & Estética',
      name: 'Clínicas, Policlínicos, Dentales & Estética', shortName: 'Clínicas & Salud',
      badge: 'HCE · Agendas · Comisiones', badgeOk: true, mod: 'care', ficha: '', bizParam: 'Clínica / Policlínico',
      platforms: ['Agendamiento Web 24/7', 'Historia Clínica Digital', 'Bot Confirmación WA', 'Caja + Lab + Farmacia'],
      thesis: 'Del agendamiento web con confirmación por WhatsApp a la historia clínica (HCE/odontograma), derivación a laboratorio o farmacia interna y liquidación médica limpia.',
      kpis: [{ k: 'AUSENTISMO', v: 'Confirmación WA 24h' }, { k: 'EXPEDIENTE', v: 'HCE + Odontograma' }, { k: 'PRIVACIDAD', v: 'RBAC por Médico' }],
      hardware: ['Lectores DNI / QR Cita', 'Pantallas Sala Espera', 'Impresora Brazaletes / Pulseras', 'Pos + Ticketera 80mm'],
      layers: [
        { short: '01 Web', tag: '01 · PORTAL PACIENTES & TELEORIENTACIÓN', title: 'Agenda Online Real + Resultados Descargables QR', desc: 'El paciente selecciona especialidad, doctor y horario real sin esperar recepción, y luego descarga recetas o análisis de laboratorio con código PIN.', devices: 'Portal Paciente Responsive + Enlace Pago', protocols: 'Validación cita instantánea · Cero doble reserva', roles: 'Paciente · Call Center' },
        { short: '02 Piso', tag: '02 · ADMISIÓN, TRIAJE & CONSULTORIO', title: 'Llamado a Sala + HCE Digital + Odontograma/Evolución', desc: 'Admisión confirma signos vitales en triaje; el especialista abre la ficha exacta y al terminar deriva órdenes hacia rayos X, farmacia o caja.', devices: 'Estación Triaje + Tablet/PC Consultorio', protocols: 'Plantillas especialidad · Odontograma & Fotos Pre/Post', roles: 'Enfermería · Médico · Esteticista' },
        { short: '03 Caja/Lab', tag: '03 · DERIVACIÓN INTERNA & LIQUIDACIÓN MÉDICA', title: 'Órdenes Encadenadas + Producción por Especialista', desc: 'Lo recetado en consulta pasa a presupuesto de caja/farmacia en 1 clic; separa automáticamente honorario del doctor, porcentaje de insumos y clínica.', devices: 'Caja Clínica + Kardex Insumos Médicos', protocols: 'SUNAT UBL 2.1 · Control kits odontológicos/botox', roles: 'Caja · Farmacia Clínica · Contabilidad' },
        { short: '04 Gerencia', tag: '04 · OCUPACIÓN DE SILLONES & RETORNO', title: 'Rentabilidad por Consultorio, Doctor y Tratamiento', desc: 'Visualiza horas muertas por médico, tasa de pacientes recurrentes y control estricto de insumos médicos costosos por procedimiento.', devices: 'Consola Dirección Médica', protocols: 'Auditoría clínica por rol · Reportes EPS/Soat', roles: 'Director Médico · Gerencia' }
      ],
      innovations: [
        { tag: 'BOT ANTI-PLANTÓN', title: 'Confirmación 2-tap por WhatsApp + relleno automático de huecos', detail: 'Si un paciente cancela por WhatsApp 4 horas antes, el bot ofrece automáticamente ese horario libre a los primeros pacientes en lista de espera.' },
        { tag: 'ESTÉTICA & DENTAL · VISUAL', title: 'Antes/Después sincronizado + firma de consentimiento en tablet', detail: 'Captura fotos clínicas estandarizadas ligadas al paciente y hazle firmar su consentimiento informado legal directo en pantalla antes del procedimiento.' },
        { tag: 'INSUMOS · KIT AUTOMÁTICO', title: 'Descuento por procedimiento (jeringas, resina, ácido hialurónico)', detail: 'Cada sesión de botox, endodoncia o ecografía descuenta su kit de materiales de bodega clínica para conocer tu margen limpio real.' },
        { tag: 'COMISIONES · CERO EXCEL', title: 'Liquidación exacta por médico descontando tarjeta e insumos', detail: 'Se acabaron los viernes peleando hojas de cálculo: cada especialista ve su producción neta aprobada lista para recibo por honorarios.' }
      ],
      hier: {
        out: 'Consultorios llenos sin cruces de agenda, expedientes privados y liquidación médica transparente',
        outDesc: 'Desde el primer WhatsApp del paciente hasta sus análisis finales, la historia y finanzas viajan juntas.',
        tiers: [
          ['NIVEL 01 · ADMISIÓN & TRIAGE', 'Recepción & Enfermería', 'Check-in por DNI/QR, sala de espera por turno y carga de signos vitales previa.', 'Flujo Espera', ''],
          ['NIVEL 02 · CONSULTORIO / LAB', 'Especialistas & Laboratorio', 'HCE cifrada por rol, derivaciones directas a exámenes/farmacia y firma consentimientos.', 'HCE Privada', 'ok'],
          ['NIVEL 03 · FARMACIA & CAJA', 'Tesorería & Insumos', 'Cobro unificado consulta+procedimiento+farmacia y descuento automático de kits médicos.', 'Caja + Kits', ''],
          ['NIVEL 04 · DIRECCIÓN MÉDICA', 'Gerencia Clínica', 'Horas ociosas por consultorio, honorarios netos calculados y tasa de reconsulta.', 'BI Clínico', 'ok']
        ]
      }
    },
    {
      id: 'veterinarias', num: '09', cat: 'salud', catLabel: 'Salud & Estética',
      name: 'Veterinarias, Grooming & Pet Shops', shortName: 'Veterinarias & Pet',
      badge: 'Carnet QR · Baños · Pet Shop', badgeOk: false, mod: 'care', ficha: '', bizParam: 'Veterinaria / Pet Shop',
      platforms: ['Carnet QR Mascota', 'Bot Vacunas WhatsApp', 'Agenda Grooming', 'POS Pet Shop + Clínica'],
      thesis: 'Une historial clínico por mascota, agenda por turnos de baño y corte, hospitalización con fotos al dueño y venta cruzada de alimentos y antiparasitarios.',
      kpis: [{ k: 'CARNET MASCOTA', v: 'QR Escaneable' }, { k: 'VACUNAS', v: 'Aviso Automático WA' }, { k: 'UNIFICACIÓN', v: 'Baño + Clínica + Shop' }],
      hardware: ['Lector Microchip RFID / QR', 'Impresora Collares / Carnet', 'Lector EAN-13 Alimento/Pet', 'POS + Ticketera 80mm'],
      layers: [
        { short: '01 Web/QR', tag: '01 · CARNET DIGITAL DEL DUEÑO & RESERVAS', title: 'Historial de Vacunas QR + Reserva Baño/Consulta', desc: 'El dueño escanea el collar o tarjeta QR de su mascota para ver vacunas al día, peso histórico y separar horario exacto de grooming.', devices: 'Perfil QR Mascota + Web Citas', protocols: 'Enlace rápido placa collar · Ficha alergias', roles: 'Dueño Mascota · Recepción' },
        { short: '02 Piso', tag: '02 · CONSULTORIO, CIRUGÍA & GROOMING', title: 'Checklist Peluquería, Hospitalización & Dosaje por Peso', desc: 'El sistema calcula dosis exactas según último peso registrado y el peluquero marca estado (en baño, secado, listo) avisando al dueño al instante.', devices: 'PC Veterinaria + Tablet Grooming', protocols: 'Fotos de avance · Consentimiento anestesia digital', roles: 'Veterinario · Groomer · Auxiliar' },
        { short: '03 Shop/Caja', tag: '03 · PET SHOP FRACCIONADO & HOSPITALIZACIÓN', title: 'Kardex Alimento al Kilo/Saco + Cuenta Abierta Clínica', desc: 'Vende bolsas selladas o comida pesada por kilo sin desordenar inventario, sumando todo junto a consultas, baños e internamiento.', devices: 'POS Unificado + Lector Barras Pet Shop', protocols: 'Stock FEFO vacunas · Cuentas por cobrar hotel pet', roles: 'Cajero · Encargado Pet Shop' },
        { short: '04 Gerencia', tag: '04 · RECOMPRA AUTOMÁTICA & RENTABILIDAD', title: 'Planes Anuales + Ingreso Recurrente Pet', desc: 'Convierte clientes ocasionales en suscriptores con planes preventivos, sabiendo qué área genera mayor margen (baño, farmacia o pet shop).', devices: 'Tablero Veterinario Gerencial', protocols: 'MRR planes mascota · Alerta caída frecuencia', roles: 'Director Médico · Propietario' }
      ],
      innovations: [
        { tag: 'BOT CLIENTE · CUIDADO', title: 'Aviso WhatsApp automático de vacuna, baño y saco por acabarse', detail: 'Si el dueño compró un saco de 15 kg que dura ~38 días, el bot le ofrece reponerlo el día 34 por WhatsApp con un clic junto a su recordatorio de desparasitación.' },
        { tag: 'GROOMING · TELEMETRÍA DUEÑO', title: 'Estado "Tu mascota está lista" con foto antes de recoger', detail: 'Apenas el groomer marca "Terminado" y toma la foto final, el cliente recibe mensaje automático con cuenta exacta y pago QR anticipado.' },
        { tag: 'PLACA QR · EXTRAVÍOS', title: 'Collar inteligente vinculado a tu clínica', detail: 'Si una mascota atendida contigo se pierde, quien escanee su placa QR ve datos seguros de contacto o alerta directa a tu recepción para recuperarla.' },
        { tag: 'CLÍNICA · HOSPEDAJE CAMAS', title: 'Control visual de caniles, medicación por hora y dieta especial', detail: 'Tablero tipo semáforo en internamiento que avisa al turno de noche qué paciente requiere antibiótico o gotero a cada hora exacta.' }
      ],
      hier: {
        out: 'Pacientes fieles todo el año y cero olvidos en vacunas, alimentos o dosificación clínica',
        outDesc: 'Clínica, peluquería, hospedaje y tienda operan en una sola cuenta por familia y mascota.',
        tiers: [
          ['NIVEL 01 · RECEPCIÓN & GROOMING', 'Citas & Estética Pet', 'Registro rápido con alergias, turnos de baño con notificaciones en vivo al dueño.', 'Agenda Pet', ''],
          ['NIVEL 02 · CONSULTA & CANIL', 'Veterinarios & Internamiento', 'Historia clínica unificada, dosificación automática por peso y horarios de medicación nocturna.', 'HCE Pet', 'ok'],
          ['NIVEL 03 · PET SHOP & CAJA', 'Tienda + Farmacia Vet', 'Venta por saco o kilo, lotes FEFO en vacunas/antipulgas y cobranza completa SUNAT.', 'POS Mixto', ''],
          ['NIVEL 04 · DIRECCIÓN', 'Socio & Automatización', 'Flujo automático de recordatorios WhatsApp de recompra y rendimiento real por especialidad.', 'BI Veterinario', 'ok']
        ]
      }
    },
    {
      id: 'hoteles', num: '10', cat: 'servicios', catLabel: 'Turismo, Edu & 3D',
      name: 'Hoteles Boutique, Resorts & Alojamientos', shortName: 'Hoteles 360°',
      badge: 'Motor 360° · PMS · Housekeeping', badgeOk: true, mod: 'stay', ficha: '../soluciones/hoteles/', bizParam: 'Hotel Boutique / PMS',
      platforms: ['Reserva Directa 360°', 'PMS Rack Gráfico', 'App Limpieza Móvil', 'Llaves QR / Check-In'],
      thesis: 'Reduce la dependencia de OTAs ofreciendo recorridos 360° de tus suites reales, check-in digital previo, app móvil de limpieza y cuenta unificada con restaurante y spa.',
      kpis: [{ k: 'CHECK-IN', v: 'QR Previo < 45s' }, { k: 'LIMPIEZA', v: 'Sync Piso Real' }, { k: 'RESERVA DIRECTA', v: 'Cero Comisión OTA' }],
      hardware: ['Cerraduras / Llaves QR Temporales', 'Lectores Pasaporte / DNI OCR', 'Impresora Térmica Voucher', 'Tablets Housekeeping'],
      layers: [
        { short: '01 Web 360°', tag: '01 · RESERVA DIRECTA INMERSIVA', title: 'Tour 360° de Suites Reales & Tarifas Dinámicas', desc: 'El huésped explora la vista y detalles exactos de cada suite en su navegador antes de pagar directo con adelanto sin intermediarios.', devices: 'Booking Engine 360° + Multi-Moneda PEN/USD', protocols: 'Reserva directa 0% comisión · Bloques OTA sync', roles: 'Huésped · Reservas' },
        { short: '02 Recepción', tag: '02 · RACK VISUAL & CHECK-IN EXPRESS', title: 'Escaneo OCR Pasaporte + Llaves QR Temporales', desc: 'El huésped pre-llena sus datos desde casa o recepción escanea su documento en segundos generando llave QR que expira a las 12:00 del check-out.', devices: 'PMS Rack Drag & Drop + Generador QR', protocols: 'Cargos en línea desde restaurante/bar a habitación', roles: 'Recepcionista · Concierge' },
        { short: '03 Piso', tag: '03 · HOUSEKEEPING & MANTENIMIENTO MÓVIL', title: 'Lista de Habitaciones en Vivo + Control Minibar', desc: 'Al marcar check-out en recepción, la camarera recibe alerta en celular, reporta consumo de minibar/daños con foto y habilita la suite al finalizar.', devices: 'App Móvil Housekeeping + Checklist UV/Fotos', protocols: 'Cero cruces entre recepción y mucamas', roles: 'Gobernanta · Camarera · Mantenimiento' },
        { short: '04 Dirección', tag: '04 · REVENUE MANAGEMENT & EXPORTACIÓN', title: 'RevPAR, Ocupación Proyectada & Exoneración Turista', desc: 'Control estricto de documentos migratorios para exoneración IGV exportación de servicios (Decreto Leg. 919) y optimización tarifaria por temporada.', devices: 'Consola Dirección Hotelera', protocols: 'Registro TAM/Pasaporte automático SUNAT', roles: 'Gerente Hotel · Contabilidad' }
      ],
      innovations: [
        { tag: 'HUÉSPED · PRE-CHECKIN', title: 'Bot WhatsApp de bienvenida, upsell y llave digital antes de aterrizar', detail: 'Dos días antes de llegar, el huésped confirma hora de vuelo, compra upgrade de suite o transfer desde aeropuerto por WhatsApp y evita colas al llegar.' },
        { tag: 'MANTENIMIENTO · PREDICTIVO', title: 'Reporte móvil en 1 toque sin perder tickets ni bloquear habitaciones por olvido', detail: 'Si la camarera ve un foco fundido o falla de terma, toma foto en la app y crea orden inmediata para mantenimiento sin retrasar el próximo check-in.' },
        { tag: 'EXPERIENCIA · CARGOS VIVOS', title: 'Room-service, lavandería y tours cargados al instante a la folio', detail: 'Todo lo que el huésped consume en restaurante o boutique del hotel sube directo a su cuenta de habitación con firma táctil para un cierre sin errores.' },
        { tag: 'TÁCTICA · OVERBOOKING', title: 'Tarifación dinámica según ocupación real restante', detail: 'Ajusta automáticamente promociones de último minuto o sube tarifa en web cuando tu ocupación para el fin de semana supera el 80%.' }
      ],
      hier: {
        out: 'Más huéspedes reservando directo contigo y piso de habitaciones coordinado al minuto',
        outDesc: 'Front desk, limpieza, restaurante y dirección ven exactamente la misma disponibilidad en cada segundo.',
        tiers: [
          ['NIVEL 01 · HOUSEKEEPING', 'Mucamas & Mantenimiento', 'App móvil por habitación prioritaria, checklist fotográfico y carga rápida de minibar.', 'App Piso', ''],
          ['NIVEL 02 · FRONT & WEB 360°', 'Recepción & Motor Reservas', 'Tours 360° en web, check-in digital ágil y generación automática de llaves temporales.', 'PMS + Web 360°', 'ok'],
          ['NIVEL 03 · FOLIO & FISCAL', 'Restaurante, Spa & SUNAT', 'Unificación automática de cargos extras y sustento migratorio para IGV exportación.', 'Folio Única', ''],
          ['NIVEL 04 · DIRECCIÓN', 'Revenue & Gerencia', 'ADR, RevPAR diario, ocupación a 90 días y trazabilidad neta de canales propios vs OTA.', 'BI Hotelero', 'ok']
        ]
      }
    },
    {
      id: 'educacion', num: '11', cat: 'servicios', catLabel: 'Turismo, Edu & 3D',
      name: 'Institutos, Academias, Colegios & Bibliotecas', shortName: 'Educación & Bibliotecas',
      badge: 'Matrícula ·QR · Biblioteca', badgeOk: true, mod: 'lib', ficha: '', bizParam: 'Instituto / Academia',
      platforms: ['Portal Estudiante/Padre', 'Control Carné QR', 'Biblioteca Híbrida QR', 'Motor Pensiones + SUNAT'],
      thesis: 'Matrícula online, portal de notas y pensiones, bloqueo inteligente de carné QR en puerta por mora, emisión de certificados verificables y biblioteca física + digital integrada.',
      kpis: [{ k: 'CATÁLOGO VIVO', v: 'Físico + OpenAlex' }, { k: 'PENSIONES', v: 'Bot + Facturación' }, { k: 'VERIFICACIÓN', v: 'QR Anti-Fraude' }],
      hardware: ['Lector Carnet Estudiantil QR', 'Molinete Acceso Campus', 'Impresora Etiquetas Lomo Libro', 'Escáner Documentos'],
      layers: [
        { short: '01 Portal', tag: '01 · ADMISIÓN, PORTAL ALUMNO & PADRES', title: 'Matrícula Online, Horarios, Notas & Pagos Directos', desc: 'Estudiantes y apoderados descargan boletas, consultan récord académico en tiempo real y abonan mensualidades por Yape/pasarela sin hacer fila en secretaría.', devices: 'Portal Web Responsive Estudiante/Padre', protocols: 'Validación instantánea de voucher · Horarios', roles: 'Alumno · Apoderado · Admisión' },
        { short: '02 Campus', tag: '02 · ASISTENCIA QR, BIBLIOTECA & AULAS', title: 'Check-In QR Campus + Gestión Híbrida de Biblioteca', desc: 'Controla ingreso al campus y préstamos físicos por código de barras/QR con alertas de mora, combinado con búsqueda digital segura vía metadatos OpenAlex.', devices: 'Control Puerta QR + Módulo Bibliotecario', protocols: 'Separación física/digital · Devolución con sanción auto', roles: 'Vigilancia · Bibliotecario · Docente' },
        { short: '03 Tesorería', tag: '03 · PENSIONES, MORAS & FACTURACIÓN MASIVA', title: 'Cronogramas, Becas & Emisión Automática SUNAT', desc: 'Genera automáticamente cuotas de todo el ciclo, aplica descuentos por pronto pago o becas y emite comprobantes al detectar transferencias.', devices: 'Núcleo Tesorería Educativa + OSE', protocols: 'Conciliación bancaria · Recordatorios WhatsApp', roles: 'Tesorería · Secretaría Académica' },
        { short: '04 Dirección', tag: '04 · DESERCIÓN, CERTIFICACIÓN & AUDITORÍA', title: 'Certificados con QR Verificable & Retención Escolar', desc: 'Emite diplomas y constancias con QR verificable en web contra falsificaciones y detecta alumnos con inasistencias seguidas antes del retiro.', devices: 'Consola Dirección Académica', protocols: 'Validación pública certificados · Radar abandono', roles: 'Director · Coordinación Académica' }
      ],
      innovations: [
        { tag: 'EDTECH · CERTIFICADOS QR', title: 'Títulos y constancias imposibles de adulterar con verificación web pública', detail: 'Cualquier empleador escanea el QR impreso del certificado y confirma nombre, notas y fecha real directo en tu portal oficial en 1 segundo.' },
        { tag: 'BIBLIOTECA · HÍBRIDA ZERO-COPYRIGHT', title: 'Inventario Excel + QR de estantes unido a repositorio OpenAlex abierto', detail: 'Separa los libros físicos catalogados de tu sede del buscador académico de artículos abiertos verificados, sin alojar PDFs ilegales en tu servidor.' },
        { tag: 'PADRES · TRANSPARENCIA VIVO', title: 'Aviso WhatsApp instantáneo al padre al cruzar puerta o faltar a clase', detail: 'En academias y colegios, apenas el alumno registra su QR en torno o el docente toma lista en 1 clic, el apoderado recibe confirmación al instante.' },
        { tag: 'COBRANZA · SUAVE Y EFECTIVA', title: 'Escalera automática de cobranza + beca pronto pago', detail: 'Envía links de pago 3 días antes del vencimiento evitando llamadas incómodas en secretaría, y habilita automáticamente examen o biblioteca al pagar.' }
      ],
      hier: {
        out: 'Campus ordenado, cobranza automatizada y biblioteca/academia en un solo ecosistema',
        outDesc: 'Cada pago, asistencia y préstamo sincroniza con acceso al campus, notas y dirección.',
        tiers: [
          ['NIVEL 01 · CAMPUS & BIBLIOTECA', 'Puerta, Aulas & Estantes', 'Check-in estudiantil QR, préstamo ágil de ejemplares y aviso en tiempo real a apoderados.', 'Control QR', ''],
          ['NIVEL 02 · PORTAL & DOCENTES', 'Alumnos, Padres & Profesores', 'Asistencia en 1 clic, subida de notas y matrículas digitales sin papeleo manual.', 'Campus Web', 'ok'],
          ['NIVEL 03 · TESORERÍA AUTO', 'Cobranzas & Secretaría', 'Conciliación Yape/BCP automática, cronogramas flexibles y emisión SUNAT masiva.', 'Finanzas Edu', ''],
          ['NIVEL 04 · DIRECCIÓN', 'Promotoría & Rectorado', 'Deserción por ciclo, morosidad comparada y verificación antifraude de egresados.', 'BI Académico', 'ok']
        ]
      }
    },
    {
      id: 'inmobiliaria3d', num: '12', cat: 'servicios', catLabel: 'Turismo, Edu & 3D',
      name: 'Inmobiliarias, Constructoras & Showrooms 3D', shortName: 'Inmobiliaria & 3D',
      badge: 'WebGL 3D · 360° · CRM', badgeOk: true, mod: 'show3d', ficha: '../soluciones/3d-web/', bizParam: 'Inmobiliaria / 3D',
      platforms: ['Gemelo WebGL 3D', 'Tours 360° Acabados', 'CRM Cotizador Cuotas', 'Bóveda Separación'],
      thesis: 'Vende proyectos antes de que termine la obra con gemelos espaciales WebGL 3D interactivos por piso, selector de acabados en vivo y separación financiera directa.',
      kpis: [{ k: 'VISOR NATIVO', v: 'WebGL 60 fps' }, { k: 'RESERVA ONLINE', v: 'Bloqueo 15 min' }, { k: 'CERO APPS', v: '100% Navegador' }],
      hardware: ['Tablet Showroom Sala Ventas', 'Pantallas 4K Caseta Obra', 'Proyección Mirror TV/LED', 'Link Web Universal'],
      layers: [
        { short: '01 WebGL 3D', tag: '01 · TORRE, LOTE O RESIDENCIA EN TIEMPO REAL', title: 'Maqueta Orbital 3D + Asoleamiento + Vistas por Piso', desc: 'El comprador rota el edificio completo, filtra departamentos libres por metraje y entra al recorrido interior en navegador incluso desde celular.', devices: 'Web Browser Desktop/Mobile + Pantalla Caseta', protocols: 'Estado real Libre/Separado/Vendido al instante', roles: 'Comprador · Inversionista' },
        { short: '02 Piso Venta', tag: '02 · SALA DE VENTAS & SIMULADOR FINANCIERO', title: 'Cotizador Bancario Vivo + Selector de Acabados', desc: 'En la caseta de obra, el asesor muestra en tablet cómo cambia el interior con piso porcelanato vs madera y calcula cuota inicial, bono y cronograma.', devices: 'Tablet Asesor + CRM Inmobiliario', protocols: 'Envío proforma WhatsApp con link 3D exacto del depa', roles: 'Asesor Inmobiliario · Supervisor' },
        { short: '03 Finanzas', tag: '03 · SEPARACIONES, ARRAS & CUOTAS', title: 'Bloqueo Anti-Doble Venta & Cronograma Cobranzas', desc: 'Una vez abonada la separación, ninguna otra caseta ni asesor puede prometer esa unidad; gestiona arras, minutas e hitos de avance de obra.', devices: 'Módulo Tesorería & Legal Inmobiliario', protocols: 'Validación abono cuenta · Bóveda minuta digital', roles: 'Finanzas · Área Legal' },
        { short: '04 Directorio', tag: '04 · ABSORCIÓN & AVANCE FINANCIERO', title: 'Mapa Térmico de Venta por Piso, Orientación & Precio', desc: 'Detecta al instante qué tipologías vuelan y cuáles quedan rezagadas para ajustar listas de precio sin depender de reportes mensuales tardíos.', devices: 'Consola Promotores e Inversionistas', protocols: 'Curva de liquidez · Proyección entregas', roles: 'Director Proyecto · Socios' }
      ],
      innovations: [
        { tag: 'WEBGL 3D · ASOLEAMIENTO', title: 'Simulador solar por hora del día desde tu ventana real', detail: 'El cliente desliza un dial horario y ve exactamente cómo entra la luz a las 8:00 AM o 4:00 PM en el piso 12 antes que exista el edificio.' },
        { tag: 'ACABADOS · CONFIGURADOR', title: 'Personalización de interiores con presupuesto recalibrado en vivo', detail: 'Cambia color de reposteros, mármol o grifería dentro del modelo 3D y actualiza automáticamente el monto adicional en la proforma final.' },
        { tag: 'POSTVENTA · GARANTÍAS', title: 'Portal propietario con entrega fotográfica y tickets de post-entrega', detail: 'Tras entregar llaves, el propietario reporta cualquier observación con foto y código del departamento teniendo historial auditado de solución.' },
        { tag: 'VENTA CRUZADA · RETAIL', title: 'Aplicable también a maquinaria pesada, muebles o autos', detail: 'No es solo inmuebles: configuramos cualquier producto físico complejo (cocinas modulares, remolques, equipamiento médico) en 3D conectado a stock.' }
      ],
      hier: {
        out: 'Tus proyectos se exploran, cotizan y separan en 3D sin depender de PDFs fríos ni doble venta',
        outDesc: 'Cada clic sobre un lote o departamento en el visor sincroniza precio, disponibilidad y abonos reales.',
        tiers: [
          ['NIVEL 01 · VISOR 3D VIVO', 'Web Pública & Caseta', 'Maqueta WebGL 3D conectada en directo al estado real (libre, separado, vendido) por unidad.', 'WebGL Live', ''],
          ['NIVEL 02 · ASESOR CRM', 'Equipo Comercial', 'Proformas personalizadas con link 3D directo, seguimiento WhatsApp y reserva al instante.', 'CRM + Simulador', 'ok'],
          ['NIVEL 03 · LEGAL & ARRAS', 'Finanzas & Contratos', 'Control de cuotas iniciales, penalidades, minutas firmadas y cronogramas de cobranza.', 'Bóveda Legal', ''],
          ['NIVEL 04 · DIRECTORIO', 'Promotora & Inversionistas', 'Absorción exacta por tipología, pisos de mayor demanda y flujo de caja de obra.', 'BI Inmobiliario', 'ok']
        ]
      }
    },
    {
      id: 'talleres', num: '13', cat: 'industria', catLabel: 'Talleres & Flotas',
      name: 'Talleres Automotrices, Maestranzas & Servicio Técnico', shortName: 'Talleres & Servicio',
      badge: 'Fotos 360° · Bahías · Tracker QR', badgeOk: true, mod: 'taller', ficha: '', bizParam: 'Taller / Servicio Técnico',
      platforms: ['App Recepción Fotos', 'Tablero de Bahías', 'Portal Cliente Seguimiento', 'Stock Repuestos OSE'],
      thesis: 'Recepción digital sin papel con fotos de ingreso contra reclamos, tablero visual de elevadores o técnicos asignados y link en vivo para que el cliente apruebe presupuestos desde su celular.',
      kpis: [{ k: 'RECEPCIÓN FOTO', v: 'Evidencia Inviolable' }, { k: 'APROBACIÓN', v: '1-Clic Cliente WA' }, { k: 'SEGUIMIENTO', v: 'Link QR Vivo' }],
      hardware: ['Tablet Uso Rudo Taller', 'Escáner OBD / VIN QR', 'Impresora Etiquetas Repuesto', 'POS + SUNAT OSE'],
      layers: [
        { short: '01 Portal', tag: '01 · TRANSPARENCIA ABSOLUTA AL CLIENTE', title: 'Link QR de Estado en Vivo + Aprobación de Extras', desc: 'El cliente ve en qué fase está su auto, laptop o maquinaria, mira las fotos de la pieza dañada y aprueba el presupuesto adicional por WhatsApp sin llamadas.', devices: 'Portal Seguimiento Cliente + Link WA', protocols: 'Aprobación digital grabada con fecha/hora', roles: 'Propietario Vehículo/Equipo · Asesor Servicio' },
        { short: '02 Piso', tag: '02 · RECEPCIÓN MÓVIL & TABLERO DE BAHÍAS', title: 'Checklist 360° de Ingreso + Asignación por Mecánico', desc: 'Al recibir el equipo, la tablet exige fotos de rayaduras/nivel combustible y firma en pantalla; la orden entra a cola de bahías o mesa técnica con timer.', devices: 'App Tablet Recepción + Monitor Taller TV', protocols: 'Evidencia inviolable anti-reclamos · Tiempos estándar', roles: 'Recepcionista · Jefe Taller · Técnico' },
        { short: '03 Repuestos', tag: '03 · KARDEX LIGADO A ORDEN & CAJA', title: 'Salida de Repuestos por Orden + Facturación Completa', desc: 'Cada filtro, rodaje o batería sale del almacén amarrado exactamente a la Orden de Trabajo (#OT); al cerrar consolida mano de obra, repuestos y factura SUNAT.', devices: 'Almacén Repuestos QR + Caja Taller', protocols: 'Margen neto de mano de obra vs pieza · Garantia', roles: 'Almacenero · Cajero · Proveedores' },
        { short: '04 Gerencia', tag: '04 · PRODUCTIVIDAD & MANTENIMIENTO PREVENTIVO', title: 'Eficiencia por Técnico, Órdenes Estancadas & Flotas', desc: 'Mide horas cobrables vs trabajadas de cada técnico, vehículos parados esperando pieza y contratos mensuales de flotas corporativas.', devices: 'Consola Dirección Taller', protocols: 'Historial por placa/serie · Retorno automático', roles: 'Gerente Servicio · Jefe Operaciones' }
      ],
      innovations: [
        { tag: 'CONFIANZA · EVIDENCIA IA', title: 'Fotos de pieza gastada vs nueva en el reporte de entrega', detail: 'El cliente recibe un expediente digital con foto real del repuesto cambiado y diagnóstico claro, disparando confianza para recomendar y volver.' },
        { tag: 'BOT POSTVENTA · RETORNO', title: 'Recordatorio predictivo cada 5,000 km o 6 meses de mantenimiento', detail: 'Estima kilometraje promedio por vehículo/equipo y avisa automático por WhatsApp antes que su cliente piense en buscar otro taller.' },
        { tag: 'FLOTAS B2B · PORTAL', title: 'Acceso exclusivo para empresas clientes con 50+ unidades', detail: 'Las empresas con flotas aprueban presupuestos múltiples, revisan costo acumulado por placa y descargan facturas agrupadas cada fin de mes.' },
        { tag: 'TIEMPOS · SEÑALIZACIÓN TV', title: 'Pantalla gigante en taller tipo aeropuerto para bahías activas', detail: 'Todo el equipo técnico ve en un monitor qué unidad tiene prioridad urgente, cuál espera repuesto y qué bahía está por liberarse.' }
      ],
      hier: {
        out: 'Cero discusiones por daños previos, clientes tranquilos viéndolo todo y repuestos bajo llave',
        outDesc: 'Toda fotografía, pieza solicitada y minuto técnico queda vinculado a la orden hasta el cobro final.',
        tiers: [
          ['NIVEL 01 · RECEPCIÓN & FOTOS', 'Asesor de Patio', 'Checklist táctil con cámara obligatoria, inventario de accesorios y firma digital del cliente.', 'App Recepción', ''],
          ['NIVEL 02 · BAHÍAS & TÉCNICOS', 'Mecánicos / Especialistas', 'Control visual en tablero, solicitud directa de piezas al almacén y reporte fotográfico de fallas.', 'Piso Vivo', 'ok'],
          ['NIVEL 03 · ALMACÉN & CAJA', 'Repuestos & Facturación', 'Imputación exacta de repuestos a cada placa/serie, aprobaciones WhatsApp y cobro SUNAT.', 'Kardex OT', ''],
          ['NIVEL 04 · DIRECCIÓN', 'Gerencia Taller & Flotas', 'Productividad por técnico, tiempo promedio en rampa y re-agenda preventiva automática.', 'BI Servicio', 'ok']
        ]
      }
    },
    {
      id: 'almacenes', num: '14', cat: 'industria', catLabel: 'Talleres & Flotas',
      name: 'Almacenes, Logística & Transporte de Flotas', shortName: 'Logística & Flotas',
      badge: 'WMS QR · POD Ruta · GPS', badgeOk: true, mod: 'stock', ficha: '', bizParam: 'Logística / Flota / WMS',
      platforms: ['WMS Rack / Pallet QR', 'App Chofer Offline POD', 'Portal Clientes B2B', 'GRE Transportista'],
      thesis: 'Control exacto de ubicaciones por pasillo y pallet QR, picking sin errores en depósito, app móvil de reparto con prueba de entrega (POD) y liquidación de viajes, peajes y combustible.',
      kpis: [{ k: 'UBICACIÓN', v: 'Pasillo · Rack · Nivel' }, { k: 'PRUEBA ENTREGA', v: 'Foto + Firma + GPS' }, { k: 'SUNAT', v: 'GRE Transportista' }],
      hardware: ['HandHelds / Android Ruggerizado', 'Impresora Etiquetas Pallet 4×6', 'Lector Largo Alcance QR', 'Sensores / Combustible / Odómetro'],
      layers: [
        { short: '01 Portal', tag: '01 · VISIBILIDAD B2B EN VIVO PARA TUS CLIENTES', title: 'Tracking de Despacho + Descarga Instantánea de Cargos', desc: 'Cada cliente corporativo ve por internet dónde viene su mercadería, verifica firma/foto de recepción apenas descarga el camión y baja su guía firmada.', devices: 'Portal Cliente Tracking B2B', protocols: 'Notificación de llegada automática · Enlace público tracking', roles: 'Cliente Corporativo · Despacho' },
        { short: '02 Bodega WMS', tag: '02 · PICKING POR RUTA Y UBICACIÓN QR', title: 'Ingreso, Acomodo & Alistamiento Guiado por Cámara', desc: 'El operario recibe en pantalla el orden óptimo de pasillos sin caminar en círculos; escanea etiqueta del rack y del producto garantizando cero cruces.', devices: 'Handheld Android / Celular + Etiquetadora', protocols: 'Conteo ciego recepción · Control bultos/cajas', roles: 'Jefe Almacén · Picker · Verificador' },
        { short: '03 Ruta POD', tag: '03 · APP CHOFER OFFLINE & LIQUIDACIÓN DE RUTA', title: 'Prueba de Entrega GPS + Viáticos + GRE Automática', desc: 'Funciona en carreteras sin señal: guarda firma del receptor, fotos de guías selladas, tickets de peaje/grifo y sincroniza todo al reconectar.', devices: 'App Ruta Offline + Motor GRE Transportista', protocols: 'Validación GPS geocerca · Descuento en ruta', roles: 'Conductor · Copiloto · Tráfico' },
        { short: '04 Gerencia', tag: '04 · RENTABILIDAD POR CAMIÓN, RUTA & CLIENTE', title: 'Costo por Kilómetro, Rendimiento Galón & Mantenimiento', desc: 'Calcula utilidad real por viaje descontando combustible, peajes, chofer y mantenimientos; alerta revisiones SOAT, brevete y cambio de llantas.', devices: 'Consola Dirección Flotas & WMS', protocols: 'Vencimientos documentarios flota · KM/galón', roles: 'Gerente Logístico · Finanzas' }
      ],
      innovations: [
        { tag: 'RUTA · ANTI-DEVOLUCIÓN', title: 'Evidencia GPS + foto obligatoria antes de marcar "Entregado"', detail: 'Impide cierres falsos desde lejos: la app exige foto clara de la guía sellada y registra coordenadas exactas de dónde ocurrió la entrega.' },
        { tag: 'FLOTA · ALERTA PREVENTIVA', title: 'Bloqueo preventivo antes que venza SOAT, CITV o licencia', detail: 'Avisa 20 días antes por WhatsApp y bloquea asignar un camión en ruta si tiene revisión técnica o permiso del conductor vencido.' },
        { tag: 'COMBUSTIBLE · AUDITORÍA', title: 'Cruce odómetro vs litros cargados para detectar ordeños', detail: 'Foto obligatoria del tablero de kilómetros en cada grifo; si el rendimiento por kilómetro cae abruptamente en un turno, salta alerta inmediata.' },
        { tag: 'WMS · CUBICAJE RÁPIDO', title: 'Sugeridor inteligente de carga para llenar camiones sin exceso de peso', detail: 'Agrupa pedidos por zona geográfica y calcula automáticamente volumen y peso total antes de emitir la guía para aprovechar cada viaje.' }
      ],
      hier: {
        out: 'Mercadería ubicada al centímetro, rutas con prueba fotográfica real y camiones rentables',
        outDesc: 'Cada caja escaneada en bodega viaja rastreada hasta la foto sellada del destinatario.',
        tiers: [
          ['NIVEL 01 · ALMACÉN WMS', 'Operarios & Pickers', 'Recepción por código QR, ubicación exacta por rack/nivel y alistamiento guiado sin errores.', 'WMS Móvil', ''],
          ['NIVEL 02 · RUTA & PORTAL', 'Conductores & Tracking Web', 'App offline con firma/foto POD en destino, peajes y link vivo para clientes.', 'App Ruta POD', 'ok'],
          ['NIVEL 03 · TRÁFICO & GRE', 'Coordinación & OSE', 'Emisión veloz de Guías Electrónicas Remitente/Transportista y control doc vehicular.', 'Tráfico SUNAT', ''],
          ['NIVEL 04 · GERENCIA', 'Dirección Operaciones', 'Margen limpio por viaje/camión, anomalías de combustible y ocupación de bodega.', 'BI Flota + WMS', 'ok']
        ]
      }
    },
    {
      id: 'manufactura', num: '15', cat: 'b2b', catLabel: 'Plantas & B2B',
      name: 'Plantas, Panificadoras & Manufactura a Medida', shortName: 'Plantas & Producción',
      badge: 'BOM · Costos · Trazabilidad', badgeOk: false, mod: 'stock', ficha: '', bizParam: 'Planta / Manufactura',
      platforms: ['Órdenes Producción', 'BOM / Fórmulas Secreta', 'Control Calidad Piso', 'Kardex Lotes MP↔PT'],
      thesis: 'Convierte materia prima en producto terminado rastreado por lote, calcula el costo real exacto por tanda incluyendo merma y mano de obra, y cotiza fabricaciones a medida.',
      kpis: [{ k: 'FÓRMULAS', v: 'BOM Multi-Nivel' }, { k: 'TRAZABILIDAD', v: 'Insumo → Lote PT' }, { k: 'COSTO TANDA', v: 'Real + Merma' }],
      hardware: ['Balanzas Industriales Serial', 'Etiquetadora Lote Térmica', 'Tablets Líneas Producción', 'Lector Escáner Bodega'],
      layers: [
        { short: '01 Portal B2B', tag: '01 · PEDIDOS A MEDIDA & MUESTRAS', title: 'Configurador Técnico de Producción + Fechas Entrega', desc: 'Distribuidores o clientes corporativos cargan pedidos según especificaciones técnicas viendo capacidad real de planta y fecha comprometida.', devices: 'Portal Pedidos B2B + Cotizador Costos', protocols: 'Reserva capacidad máquina · Tracking lotes en curso', roles: 'Cliente Industrial · Ventas B2B' },
        { short: '02 Planta', tag: '02 · PISO DE PRODUCCIÓN & FORMULACIÓN', title: 'Órdenes de Trabajo, Dosificación Exacta & Merma', desc: 'Cada operario escanea insumos asignados a la orden; el sistema descuenta materia prima, registra mermas de proceso e imprime etiqueta con lote final.', devices: 'Terminales Touch Planta + Balanza Conectada', protocols: 'Protección de fórmula secreta (porciones sin mostrar costo)', roles: 'Jefe Planta · Operario Máquina · Calidad' },
        { short: '03 Bodega MP/PT', tag: '03 · TRAZABILIDAD BIDIRECCIONAL DE LOTES', title: 'Kardex Doble: Materia Prima vs Producto Terminado', desc: 'Si un lote de harina o químico falla en calidad, encuentras en 2 clics qué tandas lo usaron y a qué clientes se despachó cada paquete.', devices: 'Módulo Calidad + Kardex Valorizado SUNAT', protocols: 'Cuarentena lotes · Recall trazable inmediato', roles: 'Control Calidad · Almacén MP/PT' },
        { short: '04 Dirección', tag: '04 · COSTEO REAL DE FABRICACIÓN', title: 'Variación Teórica vs Real por Orden Producida', desc: 'Compara el costo planificado de tu producto vs lo que realmente costó fabricar cada lote contando desperdicios, horas extra y fallas.', devices: 'Consola Costos & Gerencia Planta', protocols: 'Margen real B2B · Eficiencia por línea/turno', roles: 'Gerente Operaciones · Finanzas' }
      ],
      innovations: [
        { tag: 'PRODUCCIÓN · MRP PROACTIVO', title: 'Explosión automática de materiales antes de aceptar un pedido', detail: 'Calcula en segundos cuánta materia prima falta comprar antes de comprometer una gran producción B2B sin quedarte parado a mitad de lote.' },
        { tag: 'CALIDAD · CUARENTENA AUTO', title: 'Bloqueo de despacho hasta aprobar checklist de calidad en tablet', detail: 'Ningún almacenero ni chofer puede despachar ni facturar un lote recién producido hasta que Calidad marque los parámetros dentro de rango.' },
        { tag: 'SECRETOS · FÓRMULAS BLINDADAS', title: 'Dosificación por código sin revelar fórmula ni precios a piso', detail: 'El operario recibe pesos/proporciones exactas en pantalla por código de mezcla manteniendo reservada la propiedad intelectual del negocio.' },
        { tag: 'COSTEO · ENERGÍA & MERMA', title: 'Costo unitario real dinámico según tamaño de corrida', detail: 'Descubre con datos exactos desde cuántas unidades o kilos un pedido personalizado realmente deja dinero en lugar de absorber tu margen.' }
      ],
      hier: {
        out: 'Saber exactamente cuánto cuesta fabricar cada lote y en qué paso se escapa la rentabilidad',
        outDesc: 'La fórmula, los gramos pesados, la inspección y la factura final viven en un hilo único.',
        tiers: [
          ['NIVEL 01 · PISO & BALANZA', 'Operarios & Líneas', 'Registro ágil de insumos pesados, tiempo de corrida y mermas por tanda con etiquetas lote.', 'Terminal Planta', ''],
          ['NIVEL 02 · CALIDAD & ALMACÉN', 'QA & Bodega MP/PT', 'Aprobación obligatoria de lote y explosión previa de insumos disponibles antes de arrancar.', 'Trazabilidad Lot', 'ok'],
          ['NIVEL 03 · COMERCIAL B2B', 'Ventas Industriales', 'Cotización guiada por margen real de planta y fechas reales de despacho.', 'Portal B2B', ''],
          ['NIVEL 04 · GERENCIA COSTOS', 'Dirección Industrial', 'Desviación de costos reales vs receta estándar, eficiencia de turno y KPI de planta.', 'BI Planta', 'ok']
        ]
      }
    },
    {
      id: 'estudios', num: '16', cat: 'b2b', catLabel: 'Plantas & B2B',
      name: 'Estudios Contables, Legales & Consultoras B2B', shortName: 'Estudios & Consultoras',
      badge: 'Bóveda · Plazos · Rentabilidad', badgeOk: false, mod: 'ledger', ficha: '', bizParam: 'Estudio Contable / Legal',
      platforms: ['Bóveda Cliente 24/7', 'Motor Vencimientos SUNAT', 'Tracker Horas Rentable', 'Bot Cobranza Honorarios'],
      thesis: 'Deja atrás carpetas sueltas de Drive y correos perdidos: cada empresa cliente accede a su bóveda tributaria o judicial con QR, mientras tú controlas plazos fatales y rentabilidad por iguala.',
      kpis: [{ k: 'PLAZOS FATALES', v: 'Semaforo SUNAT/PJ' }, { k: 'RENTABILIDAD', v: 'Horas vs Iguala' }, { k: 'BÓVEDA PDF', v: 'Acceso Cliente 24/7' }],
      hardware: ['Escáner Alta Velocidad OCR', 'Token / Firma Digital', 'Monitor Control Vencimientos', 'Sincronía Web + Desktop'],
      layers: [
        { short: '01 Bóveda Cliente', tag: '01 · PORTAL EMPRESARIAL PROPIO', title: 'Estados Financieros, Contratos & Declaraciones en 1 Lugar', desc: 'Tu cliente entra con su clave y descarga instantáneamente sus declaraciones mensuales, constancias o escritos judiciales sin molestarte por WhatsApp a las 10pm.', devices: 'Portal Web B2B Blanco/Privado', protocols: 'Log de quién descargó cada documento · Firma PDF', roles: 'Gerente Cliente · Asistente Contable' },
        { short: '02 Equipo', tag: '02 · GESTOR DE TRÁMITES, PLAZOS & TIMESHEET', title: 'Cronogramas RUC / Expedientes + Medición de Esfuerzo', desc: 'Organiza tareas obligatorias por último dígito de RUC o fecha judicial; el equipo marca avance simple permitiendo medir horas invertidas por cada empresa.', devices: 'Tablero Estudio + Cronómetro Sencillo', protocols: 'Plantillas mensuales tributarias · Historial pasos', roles: 'Contador Junior · Abogado Asociado' },
        { short: '03 Bots/SUNAT', tag: '03 · COBRANZA RECURRENTE & NOTIFICACIONES', title: 'Recordatorios de Impuestos al Cliente + Honorarios Auto', desc: 'Avisa automático por WhatsApp al cliente cuánto vence pagar de IGV/Renta este mes y dispara tus propias facturas de honorarios recurrentes.', devices: 'Bot WhatsApp + Facturador Iguala Mensual', protocols: 'Suspensión cortesía portal por mora · OSE directo', roles: 'Administración Estudio · Socio' },
        { short: '04 Socios', tag: '04 · RENTABILIDAD OCULTA POR CLIENTE', title: 'Clientes Rentables vs "Come-Horas" + Carga Laboral', desc: 'Descubre qué cliente te paga S/ 600 al mes pero consume 40 horas de tu mejor contador, permitiendo renegociar igualas con datos irrefutables.', devices: 'Consola Socios Dirección', protocols: 'Costo real hora/socio · Margen neto por cuenta', roles: 'Socio Principal · Finanzas' }
      ],
      innovations: [
        { tag: 'BOT CLIENTE · CERO FASTIDIO', title: 'Bot autónomo que responde al cliente enviando su ficha RUC o PDC en 3 seg', detail: 'Cuando tu cliente necesita urgentes sus PDT o vigencias en un banco un sábado, los solicita al portal o bot con seguridad sin llamar al estudio.' },
        { tag: 'RENTABILIDAD · RADAR OCULTO', title: 'Detector automático de clientes con iguala subvaluada', detail: 'Compara automáticamente horas invertidas vs monto facturado alertando qué cuentas están drenando la capacidad productiva del equipo.' },
        { tag: 'VENCIMIENTOS · ESCALONADA', title: 'Escalamiento de alertas rojas ante silencio de cliente o equipo', detail: 'Si faltan 48h para vencimiento RUC o audiencia y falta firma/sustento, escala automáticamente la alerta amarilla/roja directo al socio encargado.' },
        { tag: 'AUDITORÍA · TRAZA DESCARGA', title: 'Certificado exacto de cuándo el cliente recibió su reporte', detail: 'Registra día, hora e IP exacta en que cada cliente recibió o abrió sus liquidaciones de impuestos o avisos legales para respaldo total.' }
      ],
      hier: {
        out: 'Ningún vencimiento olvidado, clientes atendidos 24/7 sin llamadas urgentes y márgenes claros',
        outDesc: 'Cada declaración, archivo judicial, hora trabajada y recibo de honorarios vive organizado por empresa.',
        tiers: [
          ['NIVEL 01 · OPERATIVO CONTABLE/LEGAL', 'Analistas & Asociados', 'Checklist ordenado por vencimiento RUC/proceso y carga rápida sin carpetas duplicadas.', 'Flujo Plazos', ''],
          ['NIVEL 02 · BÓVEDA CLIENTES', 'Portal Auto-Servicio', 'Entrega estructurada de declaraciones, escritos, boletas y actas con historial de lectura.', 'Portal 24/7', 'ok'],
          ['NIVEL 03 · HONORARIOS AUTO', 'Cobranza Estudio', 'Emisión puntual de igualas mensuales, seguimiento automático de cobro y caja estudio.', 'Facturación Auto', ''],
          ['NIVEL 04 · SOCIOS', 'Dirección Firma', 'Análisis real de esfuerzo vs tarifa por cuenta, carga semanal por analista y expansión.', 'BI Firma', 'ok']
        ]
      }
    }
  ];

  let activePlatId = 'web3d';
  let activeSectorId = 'tiendas';
  let activeLayerIdx = 0;
  let activeCat = 'all';
  let searchTerm = '';
  let viewMode = 'bento';
  let autoPlayTimer = null;
  const cardInnoIdx = {};

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* --------------------------------------------------------------------------
     0. Multi-Surface Platform Switcher (#plataformas)
     -------------------------------------------------------------------------- */
  function renderPlatTabs() {
    const tabs = $('#platTabs');
    if (!tabs) return;
    tabs.innerHTML = PLATFORM_STACKS.map(p => `
      <button type="button" class="plat-tab-btn" data-plat-id="${p.id}" role="tab" aria-selected="${p.id === activePlatId ? 'true' : 'false'}">
        <small>${esc(p.code.split('·')[0].trim())}</small>
        <span>${esc(p.name.split(',')[0])}</span>
      </button>
    `).join('');
  }

  function renderPlatStage(animate = true) {
    const stage = $('#platStage');
    if (!stage) return;
    const p = PLATFORM_STACKS.find(x => x.id === activePlatId) || PLATFORM_STACKS[0];
    if (animate) {
      stage.classList.remove('anim');
      void stage.offsetWidth;
      stage.classList.add('anim');
    }
    const tagsHtml = p.tags.map(t => `<span>${esc(t)}</span>`).join('');
    const bulletsHtml = p.bullets.map(([t, d]) => `
      <div class="plat-bullet-item">
        <b>${esc(t)}</b>
        <span>${esc(d)}</span>
      </div>
    `).join('');

    stage.innerHTML = `
      <div class="plat-copy">
        <small>${esc(p.code)}</small>
        <h3>${esc(p.headline)}</h3>
        <p>${esc(p.desc)}</p>
        <div class="plat-stack-pills">${tagsHtml}</div>
      </div>
      <div class="plat-bullets">${bulletsHtml}</div>
    `;
  }

  /* --------------------------------------------------------------------------
     1. Atlas Render & Layer Control + Non-Obvious Innovations
     -------------------------------------------------------------------------- */
  function renderAtlasRail() {
    const rail = $('#atlasRail');
    if (!rail) return;
    rail.innerHTML = `<div class="atlas-rail-hd"><span>EXPLORADOR DE RUBROS</span><span>${SECTORS.length} RUBROS</span></div>` +
      SECTORS.map(s => `
        <button type="button" class="atlas-nav-btn" data-atlas-id="${s.id}" role="tab" aria-selected="${s.id === activeSectorId ? 'true' : 'false'}">
          <span class="atlas-nav-ico" aria-hidden="true">${ICONS[s.id] || ICONS.tiendas}</span>
          <span class="atlas-nav-meta">
            <strong>${esc(s.shortName)}</strong>
            <small>${esc(s.badge)}</small>
          </span>
          <span class="atlas-nav-num">${s.num}</span>
        </button>
      `).join('');
  }

  function renderAtlasStage(animate = true) {
    const stage = $('#atlasStage');
    if (!stage) return;
    const s = SECTORS.find(x => x.id === activeSectorId) || SECTORS[0];
    const layer = s.layers[activeLayerIdx] || s.layers[0];

    if (animate) {
      stage.classList.remove('anim');
      void stage.offsetWidth;
      stage.classList.add('anim');
    }

    const kpisHtml = s.kpis.map(kp => `
      <div class="atlas-kpi">
        <span>${esc(kp.k)}</span>
        <b>${esc(kp.v)}</b>
      </div>
    `).join('');

    const stepsHtml = s.layers.map((ly, i) => `
      <button type="button" class="atlas-step" data-atlas-step="${i}" role="tab" aria-selected="${i === activeLayerIdx ? 'true' : 'false'}">
        <small>${esc(ly.tag.split('·')[0].trim())}</small>
        <b>${esc(ly.title)}</b>
      </button>
    `).join('');

    const platHtml = (s.platforms || []).map(pl => `<span class="plat-badge">${esc(pl)}</span>`).join('');
    const innoHtml = (s.innovations || []).map(ino => `
      <article class="atlas-inno-card">
        <small>${esc(ino.tag)}</small>
        <b>${esc(ino.title)}</b>
        <span>${esc(ino.detail)}</span>
      </article>
    `).join('');

    const hwHtml = s.hardware.map(h => `<span class="hw-pill">${esc(h)}</span>`).join('');
    const fichaBtn = s.ficha ? `<a class="btn sm" href="${s.ficha}">Ver ficha técnica</a>` : '';

    stage.innerHTML = `
      <div class="atlas-top">
        <div class="atlas-title-wrap">
          <small>${s.num} · ${esc(s.catLabel)} · <span class="badge ${s.badgeOk ? 'ok' : ''}">${esc(s.badge)}</span></small>
          <h2>${esc(s.name)}</h2>
          <p>${esc(s.thesis)}</p>
        </div>
        <div class="atlas-kpis" aria-label="Estándares operativos del rubro">${kpisHtml}</div>
      </div>

      <div class="atlas-pipe-head">
        <span class="atlas-pipe-lbl">ARQUITECTURA EN 4 PLANOS INTERCONECTADOS</span>
        <button type="button" class="atlas-play-btn" id="atlasPlayBtn" aria-pressed="${autoPlayTimer ? 'true' : 'false'}">
          ${autoPlayTimer ? '❚❚ Pausar recorrido' : '▶ Auto-recorrer 4 capas'}
        </button>
      </div>

      <div class="atlas-pipeline" role="tablist" aria-label="Planos arquitectónicos">${stepsHtml}</div>

      <div class="atlas-detail-card" aria-live="polite">
        <div class="atlas-detail-copy">
          <small>${esc(layer.tag)}</small>
          <h3>${esc(layer.title)}</h3>
          <p>${esc(layer.desc)}</p>
        </div>
        <ul class="atlas-specs-list">
          <li><span>Superficies y Dispositivos</span>${esc(layer.devices)}</li>
          <li><span>Protocolos y Entregables</span>${esc(layer.protocols)}</li>
          <li><span>Roles Conectados</span>${esc(layer.roles)}</li>
        </ul>
      </div>

      <div class="atlas-inno-block">
        <div class="atlas-inno-head">
          <small>LO QUE NO SABÍAS QUE PODÍAMOS CONSTRUIR EN ESTE RUBRO (ACCIONES NO OBVIAS)</small>
          <div class="atlas-plat-tags">${platHtml}</div>
        </div>
        <div class="atlas-inno-grid">${innoHtml}</div>
      </div>

      <div class="atlas-footer-bar">
        <div class="atlas-hw-row" aria-label="Hardware e integraciones compatibles">
          <span class="atlas-pipe-lbl" style="margin-right:4px">HARDWARE:</span>
          ${hwHtml}
        </div>
        <div class="atlas-actions">
          <a class="btn sm pri" href="../studio/?mod=${encodeURIComponent(s.mod)}">Probar en Studio OS →</a>
          ${fichaBtn}
          <a class="btn sm" href="../cotizar/?mod=${encodeURIComponent(s.mod)}&amp;biz=${encodeURIComponent(s.bizParam)}">Cotizar rubro</a>
        </div>
      </div>
    `;
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  function toggleAutoPlay() {
    if (autoPlayTimer) {
      stopAutoPlay();
      renderAtlasStage(false);
    } else {
      autoPlayTimer = setInterval(() => {
        activeLayerIdx = (activeLayerIdx + 1) % 4;
        renderAtlasStage(false);
      }, 2100);
      renderAtlasStage(false);
    }
    ping(0.06);
  }

  function selectSector(id, scrollToAtlas = false) {
    if (!SECTORS.some(s => s.id === id)) return;
    activeSectorId = id;
    activeLayerIdx = 0;
    $$('#atlasRail .atlas-nav-btn').forEach(btn => {
      btn.setAttribute('aria-selected', btn.dataset.atlasId === id ? 'true' : 'false');
    });
    renderAtlasStage(true);
    if (scrollToAtlas) {
      document.getElementById('verticalAtlas')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /* --------------------------------------------------------------------------
     2. Compact Bento Grid (with Cycling Wow Actions) & Side-by-Side Matrix
     -------------------------------------------------------------------------- */
  function renderBentoCards() {
    const grid = $('#sectorGrid');
    if (!grid) return;
    grid.innerHTML = SECTORS.map(s => {
      const ly0 = s.layers[0];
      const inno0 = s.innovations[0];
      cardInnoIdx[s.id] = 0;
      const mtabs = s.layers.map((ly, i) => `
        <button type="button" class="sc-mtab" data-card-tab="${i}" aria-selected="${i === 0 ? 'true' : 'false'}">${esc(ly.short)}</button>
      `).join('');
      const platPills = (s.platforms || []).slice(0, 3).map(pl => `<span class="plat-badge">${esc(pl)}</span>`).join('');
      const hwPills = s.hardware.slice(0, 2).map(h => `<span class="sc-metric-pill">${esc(h)}</span>`).join('');
      const fichaBtn = s.ficha ? `<a class="btn sm" href="${s.ficha}">Ficha</a>` : '';
      return `
        <article class="sector-card tilt-card" id="${s.id}" data-cat="${s.cat}">
          <div class="sc-top">
            <div class="sc-id-cluster">
              <span class="sc-ico" aria-hidden="true">${ICONS[s.id] || ICONS.tiendas}</span>
              <div>
                <span class="sc-code">${s.num} · ${esc(s.catLabel)}</span>
                <h3>${esc(s.name)}</h3>
              </div>
            </div>
            <span class="badge ${s.badgeOk ? 'ok' : ''}">${esc(s.badge)}</span>
          </div>
          <div class="sc-plat-row">${platPills}</div>
          <p class="sc-thesis">${esc(s.thesis)}</p>
          <div class="sc-mini-tabs" role="tablist" aria-label="Planos de ${esc(s.name)}">${mtabs}</div>
          <div class="sc-mini-panel" data-card-panel>
            <b>${esc(ly0.title)}</b>
            <p>${esc(ly0.desc)}</p>
          </div>
          <div class="sc-inno-strip" data-inno-box="${s.id}">
            <div class="sc-inno-strip-hd">
              <span data-inno-tag>ACCIÓN NO OBVIA 1/${s.innovations.length} · ${esc(inno0.tag)}</span>
              <button type="button" class="sc-inno-next" data-inno-next="${s.id}">Otra idea →</button>
            </div>
            <b data-inno-title>${esc(inno0.title)}</b>
            <span data-inno-detail>${esc(inno0.detail)}</span>
          </div>
          <div class="sc-metrics-row">${hwPills}</div>
          <div class="sc-actions">
            <div class="sc-act-l">
              <a class="btn sm pri" href="../studio/?mod=${encodeURIComponent(s.mod)}">Studio OS →</a>
              ${fichaBtn}
              <a class="btn sm" href="../cotizar/?mod=${encodeURIComponent(s.mod)}&amp;biz=${encodeURIComponent(s.bizParam)}">Cotizar</a>
            </div>
            <div class="sc-act-r">
              <button type="button" class="btn xs" data-inspect-id="${s.id}">Ver las 4 ideas ↑</button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  function renderMatrixTable(list) {
    const body = $('#sectorMatrixBody');
    if (!body) return;
    body.innerHTML = list.map(s => `
      <tr data-matrix-id="${s.id}">
        <td><strong>${s.num} · ${esc(s.name)}</strong><small>${esc((s.platforms || []).join(' · '))}</small></td>
        <td>${esc(s.layers[0].title)}<small>${esc(s.layers[0].devices)}</small></td>
        <td>${esc(s.layers[1].title)}<small>${esc(s.layers[1].devices)}</small></td>
        <td>${esc(s.innovations[0].title)}<small>+3 automaciones exclusivas</small></td>
        <td>${esc(s.kpis[0].v)} · ${esc(s.kpis[1].v)}</td>
        <td>
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <button type="button" class="btn xs" data-inspect-id="${s.id}">Atlas ↑</button>
            <a class="btn xs pri" href="../studio/?mod=${encodeURIComponent(s.mod)}">Studio</a>
          </div>
        </td>
      </tr>
    `).join('');
  }

  function applyFilters() {
    const q = searchTerm.trim().toLowerCase();
    const matched = SECTORS.filter(s => {
      const catOk = activeCat === 'all' || s.cat === activeCat;
      if (!catOk) return false;
      if (!q) return true;
      const haystack = [
        s.name, s.badge, s.thesis, s.catLabel,
        ...(s.platforms || []),
        ...s.hardware,
        ...s.kpis.map(k => `${k.k} ${k.v}`),
        ...s.layers.map(l => `${l.title} ${l.desc} ${l.devices} ${l.protocols} ${l.roles}`),
        ...(s.innovations || []).map(i => `${i.tag} ${i.title} ${i.detail}`)
      ].join(' ').toLowerCase();
      return haystack.includes(q);
    });

    const matchIds = new Set(matched.map(m => m.id));
    $$('#sectorGrid .sector-card').forEach(card => {
      card.classList.toggle('is-hidden', !matchIds.has(card.id));
    });

    renderMatrixTable(matched);

    const badge = $('#secMatchBadge');
    if (badge) badge.textContent = `${matched.length} de ${SECTORS.length} rubros`;

    const empty = $('#secEmptyState');
    if (empty) empty.classList.toggle('show', matched.length === 0 && viewMode === 'bento');

    const gridEl = $('#sectorGrid');
    const matrixEl = $('#sectorMatrixWrap');
    if (gridEl && matrixEl) {
      gridEl.style.display = viewMode === 'bento' ? 'grid' : 'none';
      matrixEl.classList.toggle('show', viewMode === 'matrix');
    }
  }

  /* --------------------------------------------------------------------------
     3. Full 16-Industry Organizational Hierarchy (#hierTabs)
     -------------------------------------------------------------------------- */
  function renderHierTabs() {
    const container = $('#hierTabs');
    if (!container) return;
    container.innerHTML = SECTORS.map((s, idx) => `
      <button class="chip ${idx === 0 ? 'on' : ''}" type="button" data-hier="${s.id}">${esc(s.shortName)}</button>
    `).join('');
  }

  function renderHierContent(id) {
    const s = SECTORS.find(x => x.id === id) || SECTORS[0];
    $$('#hierTabs button').forEach(b => b.classList.toggle('on', b.dataset.hier === s.id));
    if ($('#hierTitle')) $('#hierTitle').textContent = s.name;
    if ($('#hierLead')) $('#hierLead').textContent = s.thesis;
    if ($('#hierOutcome')) $('#hierOutcome').textContent = s.hier.out;
    if ($('#hierOutcomeDesc')) $('#hierOutcomeDesc').textContent = s.hier.outDesc;
    if ($('#hierStudioLink')) $('#hierStudioLink').href = `../studio/?mod=${encodeURIComponent(s.mod)}`;
    if ($('#hierQuoteLink')) $('#hierQuoteLink').href = `../cotizar/?mod=${encodeURIComponent(s.mod)}&biz=${encodeURIComponent(s.bizParam)}`;

    const stack = $('#hierStack');
    if (stack) {
      stack.innerHTML = s.hier.tiers.map(([lvl, role, desc, badge, ok], idx) => `
        <div class="hier-tier anim ${idx === 3 ? 'lvl-top' : ''}" style="animation-delay:${idx * 55}ms">
          <span class="h-lvl">${esc(lvl)}</span>
          <div>
            <div class="h-role">${esc(role)}</div>
            <div class="h-desc">${esc(desc)}</div>
          </div>
          <span class="badge ${esc(ok)}">${esc(badge)}</span>
        </div>
      `).join('');
    }
  }

  /* --------------------------------------------------------------------------
     4. Event Listeners & Init
     -------------------------------------------------------------------------- */
  function init() {
    const hashId = (location.hash || '').replace('#', '').trim();
    if (hashId && SECTORS.some(s => s.id === hashId)) {
      activeSectorId = hashId;
    }

    $$('#sectorFilter button[data-cat]').forEach(btn => {
      const cat = btn.dataset.cat;
      const badge = btn.querySelector('.chip-ct');
      if (badge) {
        badge.textContent = cat === 'all' ? SECTORS.length : SECTORS.filter(s => s.cat === cat).length;
      }
    });

    renderPlatTabs();
    renderPlatStage(false);
    renderAtlasRail();
    renderAtlasStage(false);
    renderBentoCards();
    renderHierTabs();
    renderHierContent(activeSectorId);
    applyFilters();

    // Multi-Surface Platform tab switch
    $('#platTabs')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.plat-tab-btn[data-plat-id]');
      if (!btn) return;
      activePlatId = btn.dataset.platId;
      $$('#platTabs .plat-tab-btn').forEach(b => b.setAttribute('aria-selected', b === btn ? 'true' : 'false'));
      renderPlatStage(true);
      ping(0.055);
    });

    // Rail selection
    $('#atlasRail')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.atlas-nav-btn[data-atlas-id]');
      if (!btn) return;
      stopAutoPlay();
      selectSector(btn.dataset.atlasId, false);
      renderHierContent(btn.dataset.atlasId);
      ping(0.06);
    });

    // Atlas pipeline step & autoplay delegation
    $('#atlasStage')?.addEventListener('click', (e) => {
      const stepBtn = e.target.closest('.atlas-step[data-atlas-step]');
      if (stepBtn) {
        stopAutoPlay();
        activeLayerIdx = Number(stepBtn.dataset.atlasStep) || 0;
        renderAtlasStage(false);
        ping(0.05);
        return;
      }
      if (e.target.closest('#atlasPlayBtn')) {
        toggleAutoPlay();
      }
    });

    // Bento Card mini-tabs, "Otra idea →" cycle, & "Ver las 4 ideas ↑"
    $('#sectorGrid')?.addEventListener('click', (e) => {
      const innoBtn = e.target.closest('[data-inno-next]');
      if (innoBtn) {
        const sid = innoBtn.dataset.innoNext;
        const s = SECTORS.find(x => x.id === sid);
        const box = innoBtn.closest('.sc-inno-strip');
        if (s && box && s.innovations?.length) {
          const next = ((cardInnoIdx[sid] || 0) + 1) % s.innovations.length;
          cardInnoIdx[sid] = next;
          const item = s.innovations[next];
          const tagEl = box.querySelector('[data-inno-tag]');
          const titleEl = box.querySelector('[data-inno-title]');
          const detailEl = box.querySelector('[data-inno-detail]');
          if (tagEl) tagEl.textContent = `ACCIÓN NO OBVIA ${next + 1}/${s.innovations.length} · ${item.tag}`;
          if (titleEl) titleEl.textContent = item.title;
          if (detailEl) detailEl.textContent = item.detail;
          ping(0.05);
        }
        return;
      }

      const tabBtn = e.target.closest('.sc-mtab[data-card-tab]');
      if (tabBtn) {
        const card = tabBtn.closest('.sector-card');
        if (!card) return;
        const s = SECTORS.find(x => x.id === card.id);
        const idx = Number(tabBtn.dataset.cardTab) || 0;
        const ly = s?.layers[idx];
        if (!ly) return;
        $$('.sc-mtab', card).forEach(t => t.setAttribute('aria-selected', t === tabBtn ? 'true' : 'false'));
        const panel = card.querySelector('[data-card-panel]');
        if (panel) {
          panel.innerHTML = `<b>${esc(ly.title)}</b><p>${esc(ly.desc)}</p>`;
        }
        ping(0.045);
        return;
      }

      const insp = e.target.closest('[data-inspect-id]');
      if (insp) {
        stopAutoPlay();
        selectSector(insp.dataset.inspectId, true);
        renderHierContent(insp.dataset.inspectId);
        ping(0.065);
      }
    });

    // Matrix inspect buttons
    $('#sectorMatrixBody')?.addEventListener('click', (e) => {
      const insp = e.target.closest('[data-inspect-id]');
      if (!insp) return;
      stopAutoPlay();
      selectSector(insp.dataset.inspectId, true);
      renderHierContent(insp.dataset.inspectId);
      ping(0.065);
    });

    // Category filters
    $('#sectorFilter')?.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-cat]');
      if (!b) return;
      $$('#sectorFilter button').forEach(x => x.classList.toggle('on', x === b));
      activeCat = b.dataset.cat || 'all';
      applyFilters();
      ping(0.06);
    });

    // Live Search
    const searchIn = $('#sectorSearchIn');
    const clearBtn = $('#sectorSearchClear');
    searchIn?.addEventListener('input', () => {
      searchTerm = searchIn.value;
      clearBtn?.classList.toggle('show', searchTerm.length > 0);
      applyFilters();
    });
    clearBtn?.addEventListener('click', () => {
      if (searchIn) searchIn.value = '';
      searchTerm = '';
      clearBtn.classList.remove('show');
      applyFilters();
      ping(0.04);
    });
    $('#secEmptyReset')?.addEventListener('click', () => {
      if (searchIn) searchIn.value = '';
      searchTerm = '';
      clearBtn?.classList.remove('show');
      activeCat = 'all';
      $$('#sectorFilter button').forEach(x => x.classList.toggle('on', x.dataset.cat === 'all'));
      applyFilters();
      ping(0.06);
    });

    // Mode switch
    $('#secModeSwitch')?.addEventListener('click', (e) => {
      const b = e.target.closest('.sec-mode-btn[data-mode]');
      if (!b) return;
      viewMode = b.dataset.mode;
      $$('#secModeSwitch .sec-mode-btn').forEach(x => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
      applyFilters();
      ping(0.06);
    });

    // Organizational Hierarchy tabs
    $('#hierTabs')?.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-hier]');
      if (!b) return;
      renderHierContent(b.dataset.hier);
      ping(0.07);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
