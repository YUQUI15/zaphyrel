/* ============================================================================
   ZAPHYREL SECTORES PRO — Vertical Atlas Engine, Matrix, Search & All-8 Hier
   ============================================================================ */
(() => {
  'use strict';

  const shell = () => window.__zaphyrelShell || {};
  const ping = (v = 0.06) => { try { shell().ping?.(v); } catch (_) {} };
  const esc = (s) => shell().esc?.(s) ?? String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));

  const ICONS = {
    tiendas: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
    discotecas: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    municipalidades: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M4 18h16M6 18V9M10 18V9M14 18V9M18 18V9M2 9l10-6 10 6z"/></svg>',
    restaurantes: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>',
    hoteles: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14"/><path d="M2 14h20"/><path d="M7 10h.01M12 10h.01M17 10h.01"/></svg>',
    clinicas: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M12 8v8M8 12h8"/></svg>',
    almacenes: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
    inmobiliaria3d: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><line x1="12" y1="22" x2="12" y2="15.5"/><polyline points="22 8.5 12 15.5 2 8.5"/></svg>'
  };

  const SECTORS = [
    {
      id: 'tiendas',
      num: '01',
      cat: 'comercio',
      catLabel: 'Comercio & Consumo',
      name: 'Tiendas & Cadenas Retail',
      shortName: 'Tiendas Retail',
      badge: 'Retail · Multi-Caja',
      badgeOk: true,
      mod: 'retail',
      ficha: '../soluciones/tiendas/',
      bizParam: 'Tienda Retail',
      thesis: 'Unifica catálogo online, punto de venta veloz por código de barras, reposición móvil y kardex consolidado por sucursal.',
      kpis: [
        { k: 'SINCRONÍA STOCK', v: '< 900 ms' },
        { k: 'NORMATIVA XML', v: 'SUNAT UBL 2.1' },
        { k: 'CIERRE DE CAJA', v: 'Arqueo Ciego' }
      ],
      hardware: ['Lector USB / BT EAN-13', 'Impresora 80mm', 'Yape / Plin / Izipay', 'Gaveta Dinero RJ11'],
      layers: [
        {
          short: '01 Web',
          tag: '01 · SUPERFICIE COMERCIAL',
          title: 'Catálogo Vivo y Compra Directa',
          desc: 'Stock publicado por sede en tiempo real, recojo en tienda en el día, reservas pagadas y seguimiento transparente para el comprador.',
          devices: 'Web Ecommerce Responsive + WhatsApp Order Bridge',
          protocols: 'Bloqueo atómico de SKU en carrito · Cálculo de tarifas envío',
          roles: 'Cliente Final · Asesor Digital'
        },
        {
          short: '02 Piso',
          tag: '02 · OPERACIÓN EN PISO Y CAJA',
          title: 'POS Alta Velocidad & Turnos',
          desc: 'Escaneo continuo de tallas y lotes con pistola de barras, atajos de teclado para despacho veloz y reposición directa desde smartphone.',
          devices: 'Terminal Caja Touch / PC + App Móvil Bodeguero',
          protocols: 'Cola offline IndexedDB ante caídas · Arqueo ciego por turno PIN',
          roles: 'Cajero · Vendedor · Almacenero'
        },
        {
          short: '03 Fiscal',
          tag: '03 · CONTROL TRIBUTARIO Y KARDEX',
          title: 'Emisión OSE, Guías & Auditoría',
          desc: 'Boleta o factura enviada a SUNAT con RUC/DNI consultado automáticamente, actas de traspaso entre locales y alertas de quiebre.',
          devices: 'Motor Fiscal Background + Módulo Kardex Multi-Almacén',
          protocols: 'UBL 2.1 + Firma Digital + Guías de Remisión Elect.',
          roles: 'Supervisor Tienda · Contador'
        },
        {
          short: '04 Gerencia',
          tag: '04 · GOBIERNO MULTI-SUCURSAL',
          title: 'Rentabilidad Neta por SKU y Sede',
          desc: 'Utilidad descontando costo real ponderado, ranking de rotación, desempeño de vendedores y detección temprana de mermas.',
          devices: 'Consola Directiva Ejecutiva (Desktop / Tablet)',
          protocols: 'Consolidado Multi-Sede · Exportación Contable Automatizada',
          roles: 'Gerente General · Director Comercial'
        }
      ],
      hier: {
        out: 'Cero quiebres ficticios entre vitrina online y tienda física',
        outDesc: 'Cada unidad cobrada en caja o ecommerce descuenta simultáneamente el inventario disponible en ambas superficies.',
        tiers: [
          ['NIVEL 01 · BODEGA', 'Almacenero y Reposición', 'Ingreso por código de barras, transferencias entre locales y conteos cíclicos.', 'App Inventario', ''],
          ['NIVEL 02 · PISO / WEB', 'Vendedores, Cajeros y E-commerce', 'Cobro ágil Yape/Plin/POS, emisión SUNAT 1 clic y picking de pedidos web.', 'POS + Ecommerce', 'ok'],
          ['NIVEL 03 · SUPERVISIÓN', 'Jefe de Tienda / Auditoría', 'Notas de crédito por PIN, arqueo ciego y alertas de reposición sugerida.', 'Control Diario', ''],
          ['NIVEL 04 · DIRECCIÓN', 'Gerencia Multi-Sucursal', 'Margen neto por SKU, flujo de caja y rotación comparada entre sedes.', 'Tablero Ejecutivo', 'ok']
        ]
      }
    },
    {
      id: 'discotecas',
      num: '02',
      cat: 'ocio',
      catLabel: 'Ocio & Eventos',
      name: 'Discotecas, Bares & Eventos',
      shortName: 'Discotecas & QR',
      badge: 'Puerta + Box + Barra',
      badgeOk: false,
      mod: 'club',
      ficha: '../soluciones/discotecas/',
      bizParam: 'Discoteca y Eventos',
      thesis: 'Preventa nominada con pases QR anti-reventa, comandas en boxes VIP directo a barra y arqueo nocturno sin fugas de licor.',
      kpis: [
        { k: 'ESCANEO PUERTA', v: '0.4 seg Offline' },
        { k: 'SEGURIDAD QR', v: 'Hash Irrepetible' },
        { k: 'AUDITORÍA BARRA', v: 'Onzas & Botellas' }
      ],
      hardware: ['Escáner Cámara / 2D PDA', 'Pantallas Barra LED', 'Impresora Tickets', 'Pulseras / QR'],
      layers: [
        {
          short: '01 Web',
          tag: '01 · PREVENTA & ZONAS VIP',
          title: 'Mapa de Boxes & Tickets Nominados',
          desc: 'Venta directa de entradas generales y reserva de boxes con consumo mínimo, generando pases digitales firmados al correo o wallet.',
          devices: 'Ticketera Propia Web Mobile-First + Link Promotores',
          protocols: 'Token criptográfico irrepetible · Comisiones por promotor',
          roles: 'Asistente · Promotor Autorizado'
        },
        {
          short: '02 Puerta/Bar',
          tag: '02 · PUERTA, MOZOS Y BARRAS',
          title: 'Check-In Instantáneo & Comandas Box',
          desc: 'Anfitriones validan entradas en 0.4 s incluso sin internet; mozos envían consumos de zona VIP directo a cola de barra con PIN.',
          devices: 'Móvil Puerta NFC/QR + Tablet Mozo + Monitor Barman',
          protocols: 'Sincronización Peer-Edge local si cae cobertura 4G',
          roles: 'Anfitrión Puerta · Mozo Box · Barman'
        },
        {
          short: '03 Control',
          tag: '03 · TRAZABILIDAD ANTI-MERMA',
          title: 'Aforo en Vivo & Inventario por Trago',
          desc: 'Bloqueo inmediato ante intento de reuso de pase QR; descuento exacto por botella cerrada u onza servida con bitácora de cortesías.',
          devices: 'Controles de Aforo & Sub-Almacén de Licor',
          protocols: 'Registro nominal de autorizaciones VIP + Conteo Botellas',
          roles: 'Jefe de Seguridad · Jefe de Barras'
        },
        {
          short: '04 Cierre',
          tag: '04 · ARQUEO NOCTURNO UNIFICADO',
          title: 'Conciliación Taquilla, Boxes y Barras',
          desc: 'Liquidación inmediata al amanecer cruzando boletería, botellas descontadas, Yape/POS y liquidación neta de promotores.',
          devices: 'Reporte Ejecutivo de Cierre Automatizado',
          protocols: 'Auditoría de diferencias por barra y método de cobro',
          roles: 'Promotora · Dueño / Administrador'
        }
      ],
      hier: {
        out: 'Cada entrada validada y cada onza despachada auditadas por turno',
        outDesc: 'Puerta, boxes VIP, barras y gerencia operan sobre el mismo registro antifraude incluso durante picos sin señal móvil.',
        tiers: [
          ['NIVEL 01 · PUERTA', 'Anfitrión & Control QR', 'Validación en 0.4s con bloqueo instantáneo de capturas duplicadas y medición de aforo.', 'Escáner Puerta', ''],
          ['NIVEL 02 · SALÓN / BARRA', 'Mozos de Box & Barmen', 'Pedidos directos de zona VIP a pantalla de barra con cobro anticipado o consumo mínimo.', 'Mozos + Barra', 'ok'],
          ['NIVEL 03 · SUPERVISIÓN', 'Jefe de Barras y Boletería', 'Control de cortesías autorizadas y cuadre físico de botellas abiertas al cierre.', 'Anti-Merma', ''],
          ['NIVEL 04 · PROMOTORA', 'Dueño / Cierre Nocturno', 'Resumen instantáneo: taquilla, boxes, barra general, Yape/Plin y comisiones.', 'Cierre Ejecutivo', 'ok']
        ]
      }
    },
    {
      id: 'municipalidades',
      num: '03',
      cat: 'publico',
      catLabel: 'Sector Público',
      name: 'Municipalidades & Entidades',
      shortName: 'Municipalidades',
      badge: 'Trazabilidad + QR',
      badgeOk: true,
      mod: 'muni',
      ficha: '../soluciones/municipalidades/',
      bizParam: 'Municipalidad Distrital',
      thesis: 'Mesa de partes digital 24/7, derivación trazable por SLA entre subgerencias, inspectores georreferenciados y control patrimonial.',
      kpis: [
        { k: 'TRÁMITE DIGITAL', v: 'Ventanilla 24/7' },
        { k: 'FISCALIZACIÓN', v: 'QR + GPS Campo' },
        { k: 'CONTROL SLA', v: 'Semáforo por Área' }
      ],
      hardware: ['Tablet Campo GPS', 'Lector QR Ciudadano', 'Impresora Constancias', 'Archivo Digital'],
      layers: [
        {
          short: '01 Portal',
          tag: '01 · CARA CIUDADANA DIGITAL',
          title: 'Mesa de Partes & Arbitrios 24/7',
          desc: 'Recepción de expedientes web con requisitos validados, emisión de constancia verificable e historial público de licencias.',
          devices: 'Portal Ciudadano Web + Kiosko Ventanilla Única',
          protocols: 'Cargo con HASH verificable · Consulta de estado por DNI/RUC',
          roles: 'Ciudadano · Empresa Solicitante'
        },
        {
          short: '02 Campo',
          tag: '02 · FISCALIZACIÓN & INSPECTORES',
          title: 'Verificación Móvil con Georreferencia',
          desc: 'Inspectores en vía pública escanean el código QR de licencias comerciales, adjuntan fotografía y emiten actas georreferenciadas.',
          devices: 'App Móvil Inspector Offline-Capable + Cámara GPS',
          protocols: 'Sello de coordenadas y hora inalterable en acta digital',
          roles: 'Inspector Municipal · Fiscalizador'
        },
        {
          short: '03 Áreas',
          tag: '03 · DERIVACIÓN INTERNA CON SLA',
          title: 'Flujo entre Subgerencias & Almacén',
          desc: 'Pase ordenado de expedientes y requerimientos logísticos entre Obras, Rentas y Abastecimiento con cronómetro de plazos.',
          devices: 'Bandeja Operativa de Trámite Documentario',
          protocols: 'Alertas automáticas ante vencimiento de TUPA / SLA',
          roles: 'Especialista Subgerencia · Almacén Central'
        },
        {
          short: '04 Alcaldía',
          tag: '04 · TRANSPARENCIA & GOBIERNO',
          title: 'Tablero Ejecutivo Institucional',
          desc: 'Detección visual de cuellos de botella por gerencia, ejecución presupuestal en bienes, cumplimiento de plazos y recaudación.',
          devices: 'Monitor Estratégico de Gestión Pública',
          protocols: 'Auditoría integral de derivaciones y eficiencia operativa',
          roles: 'Gerencia Municipal · Alcaldía'
        }
      ],
      hier: {
        out: 'Trazabilidad documental inviolable desde ventanilla hasta gerencia',
        outDesc: 'Ningún expediente ni requerimiento se extravía entre escritorios gracias al seguimiento con marca de tiempo y SLA.',
        tiers: [
          ['NIVEL 01 · CAMPO', 'Inspectores & Fiscalización', 'Validación QR de licencias en locales comerciales con actas fotográficas georreferenciadas.', 'App Campo QR', ''],
          ['NIVEL 02 · VENTANILLA', 'Mesa de Partes Web / Física', 'Recepción ordenada de trámites con requisitos validados y constancia digital.', 'Ventanilla Web', 'ok'],
          ['NIVEL 03 · SUBGERENCIAS', 'Rentas, Obras, Logística y Almacén', 'Derivación con cronómetro TUPA/SLA e inventario de bienes municipales.', 'Trazabilidad Interna', ''],
          ['NIVEL 04 · ALCALDÍA', 'Gerencia Municipal y Dirección', 'Visibilidad en vivo de cuellos de botella, ejecución logística y recaudación.', 'Tablero Gerencial', 'ok']
        ]
      }
    },
    {
      id: 'restaurantes',
      num: '04',
      cat: 'comercio',
      catLabel: 'Comercio & Consumo',
      name: 'Restaurantes & Franquicias',
      shortName: 'Restaurantes KDS',
      badge: 'KDS + Recetas',
      badgeOk: false,
      mod: 'table',
      ficha: '../soluciones/restaurantes/',
      bizParam: 'Restaurante',
      thesis: 'Carta digital directa sin comisiones de terceros, ruteo inteligente hacia pantallas de cocina KDS e inventario descontado por receta.',
      kpis: [
        { k: 'AHORRO CANALES', v: '0% Comisión Apps' },
        { k: 'RUTEO COCINA', v: 'Multi-Estación KDS' },
        { k: 'ESCANDALLO', v: 'Gramaje Automático' }
      ],
      hardware: ['Tablet Salón Meseros', 'Monitor KDS 15-24"', 'Ticketera 80mm LAN', 'Balanzas / Caja'],
      layers: [
        {
          short: '01 Carta',
          tag: '01 · PEDIDOS DIRECTOS SIN COMISIÓN',
          title: 'Carta QR en Mesa & Delivery Propio',
          desc: 'Comensales ordenan con modificadores desde su mesa o solicitan reparto propio pagando con Yape o tarjeta sin ceder margen.',
          devices: 'Carta Web QR Responsive + Motor Delivery Propio',
          protocols: 'Zonas de reparto geolocalizadas · Validación automática pago',
          roles: 'Comensal en Salón · Cliente Delivery'
        },
        {
          short: '02 KDS/Salón',
          tag: '02 · MOZOS & PANTALLAS DE COCINA',
          title: 'Despacho Sincronizado por Estación',
          desc: 'La comanda separa automáticamente entradas a cocina fría, fondos a parrilla y cocteles a barra con cronómetro de prioridad.',
          devices: 'App Tablet Mozo + Pantallas KDS Cocina/Barra',
          protocols: 'Notificación al mesero en cuanto cocina marca plato listo',
          roles: 'Mozo · Chef de Estación · Barman'
        },
        {
          short: '03 Insumos',
          tag: '03 · 80MM, SUNAT Y RECETARIO',
          title: 'Pre-Cuentas, RUC & Descarga de Gramaje',
          desc: 'División flexible de cuenta por comensal, emisión tributaria instantánea y descuento exacto de insumos según receta estándar.',
          devices: 'Ticketeras LAN 80mm + Motor Recetario & OSE',
          protocols: 'Actualización real de costo de plato vivo por insumo',
          roles: 'Cajero · Encargado de Economato'
        },
        {
          short: '04 Gerencia',
          tag: '04 · CONTROL MULTI-LOCAL',
          title: 'Rotación, Propinas & Auditoría',
          desc: 'Rentabilidad por plato de la carta, velocidad promedio de cocina, propinas por mozo y control de anulaciones autorizadas.',
          devices: 'Panel Gerencial Gastronómico Unificado',
          protocols: 'Ranking de platos estrella vs merma declarada',
          roles: 'Administrador · Gerente Franquicia'
        }
      ],
      hier: {
        out: 'Servicio más rápido en salón con rentabilidad exacta por receta',
        outDesc: 'Cada pedido ruteado por KDS reduce tiempos de espera en cocina mientras el economato descarga insumos reales.',
        tiers: [
          ['NIVEL 01 · PRODUCCIÓN', 'Cocineros y Barman en KDS', 'Pantallas separadas por partida caliente/fría/bar con cronómetro y aviso a salón.', 'Cocina KDS', ''],
          ['NIVEL 02 · SALÓN / WEB', 'Mozos, Cajeros y Carta Directa', 'División de cuentas, propinas, pagos Yape/Plin y comprobante SUNAT instantáneo.', 'Salón + Carta QR', 'ok'],
          ['NIVEL 03 · ECONOMATO', 'Recetario, Compras e Insumos', 'Descuento de gramaje por plato vendido y alertas mínimas de reposición.', 'Almacén / Costos', ''],
          ['NIVEL 04 · DIRECCIÓN', 'Gerencia Gastronómica Multi-Local', 'Ticket promedio por mesero, margen real del menú y arqueos consolidados.', 'Control Gerencial', 'ok']
        ]
      }
    },
    {
      id: 'hoteles',
      num: '05',
      cat: 'hospitalidad',
      catLabel: 'Hospitalidad & Salud',
      name: 'Hoteles, Lodges & Resorts 360°',
      shortName: 'Hoteles 360°',
      badge: 'PMS + 360° + Limpieza',
      badgeOk: false,
      mod: 'stay',
      ficha: '../soluciones/hoteles/',
      bizParam: 'Hotel y Turismo',
      thesis: 'Motor de reserva directa con tours virtuales 360° por categoría de suite, PMS de recepción y coordinación móvil de housekeeping.',
      kpis: [
        { k: 'CANAL DIRECTO', v: 'Recorrido 360°' },
        { k: 'HOUSEKEEPING', v: 'Sync Check-Out' },
        { k: 'MÉTRICA CLAVE', v: 'RevPAR & ADR Vivo' }
      ],
      hardware: ['Tablet Recepción', 'Móvil Mucamas', 'Cerradura / Llave QR', 'Visor 360° Web'],
      layers: [
        {
          short: '01 Web 360°',
          tag: '01 · RESERVAS SIN INTERMEDIARIOS',
          title: 'Vitrina 360° & Upselling Directo',
          desc: 'Huéspedes inspeccionan suites reales en 360° antes de reservar sin pagar comisiones OTA, sumando traslados o experiencias.',
          devices: 'Motor Web Reservas + Visor Equirectangular 360°',
          protocols: 'Disponibilidad sincronizada por fechas y bloqueo automático',
          roles: 'Huésped · Reservas Web'
        },
        {
          short: '02 PMS/Pisos',
          tag: '02 · RECEPCIÓN Y MUCAMAS',
          title: 'Check-In Ágil & App Housekeeping',
          desc: 'Al registrar salida en recepción, el equipo de pisos recibe prioridad de limpieza en celular con reporte fotográfico de minibar.',
          devices: 'PMS Escritorio Recepción + App Móvil Pisos',
          protocols: 'Estados en vivo: Sucia / En Limpieza / Inspeccionada / Lista',
          roles: 'Recepcionista · Ama de Llaves · Mantenimiento'
        },
        {
          short: '03 Huésped',
          tag: '03 · REGISTRO Y CARGOS INTERNOS',
          title: 'DNI/Pasaporte, Spa & Llave Digital',
          desc: 'Control documentario para reporte policial/migratorio, pase de consumos de restaurante a habitación y pases QR temporales.',
          devices: 'Lector Documentos + Pasarela Cargos Folios',
          protocols: 'Caducidad automática de credenciales digitales al check-out',
          roles: 'Conserje · Restaurante · Caja'
        },
        {
          short: '04 Dirección',
          tag: '04 · INTELIGENCIA HOTELERA',
          title: 'Ocupación, RevPAR & Mantenimiento',
          desc: 'Tarifa diaria promedio por temporada, inventario bloqueado por reparaciones y consolidado de ingresos por fuente de reserva.',
          devices: 'Consola Dirección & Revenue Management',
          protocols: 'Comparativo Reserva Directa vs OTAs + Libro SUNAT',
          roles: 'Gerente Hotelero · Propietario'
        }
      ],
      hier: {
        out: 'Mayor conversión directa y habitaciones habilitadas sin demoras',
        outDesc: 'Recepción y housekeeping trabajan acoplados para liberar suites limpias en tiempo récord y elevar el margen directo.',
        tiers: [
          ['NIVEL 01 · PISOS', 'Mucamas y Mantenimiento', 'Lista móvil priorizada de cuartos por preparar, checklist minibar y reportes con foto.', 'App Limpieza', ''],
          ['NIVEL 02 · FRONT DESK', 'Recepción PMS & Motor 360°', 'Asignación ágil de suites, check-in digital y reservas directas desde web inmersiva.', 'PMS + Web 360°', 'ok'],
          ['NIVEL 03 · SERVICIOS', 'Room Service, Restaurante y Spa', 'Cargos directos al folio de habitación sin cupones extraviados hasta la salida.', 'Cuenta Única', ''],
          ['NIVEL 04 · GERENCIA', 'Dirección Hotelera & Revenue', 'Indicadores RevPAR, ocupación proyectada, mantenimiento y balance tributario.', 'Tablero PMS', 'ok']
        ]
      }
    },
    {
      id: 'clinicas',
      num: '06',
      cat: 'hospitalidad',
      catLabel: 'Hospitalidad & Salud',
      name: 'Clínicas & Centros Médicos',
      shortName: 'Clínicas HCE',
      badge: 'Agenda + HCE + Farma',
      badgeOk: true,
      mod: 'care',
      ficha: null,
      bizParam: 'Clínica Médica',
      thesis: 'Agenda online sin cruces horarios, cola activa admisión-triaje, historia clínica electrónica, farmacia por lotes y liquidación médica.',
      kpis: [
        { k: 'AGENDA ONLINE', v: 'Cero Traslapes' },
        { k: 'FARMACIA SEGURA', v: 'Control Lote / Venc.' },
        { k: 'LIQUIDACIÓN', v: 'Honorarios Auto' }
      ],
      hardware: ['Monitor Sala Espera', 'Impresora Brazaletes/QR', 'PC Consultorio', 'Lector Farma'],
      layers: [
        {
          short: '01 Citas',
          tag: '01 · CAPTACIÓN DE PACIENTES',
          title: 'Agenda Web por Sede & Especialidad',
          desc: 'Pacientes reservan horarios disponibles en segundos con confirmación digital y recordatorios automáticos reduciendo inasistencias.',
          devices: 'Portal Paciente Web + Notificaciones WhatsApp/Email',
          protocols: 'Bloqueo de disponibilidad por consultorio y médico titular',
          roles: 'Paciente · Call Center / Admisión'
        },
        {
          short: '02 Consulta',
          tag: '02 · ADMISIÓN, TRIAJE Y CONSULTORIO',
          title: 'Flujo Clínico & Historia Digital',
          desc: 'Enfermería carga funciones vitales previas y el médico visualiza antecedentes para emitir diagnóstico CIE-10 y receta digital.',
          devices: 'Estación Enfermería + Monitor HCE Médico',
          protocols: 'Adjunto de exámenes y órdenes internas derivadas a laboratorio',
          roles: 'Admisionista · Enfermería · Médico Especialista'
        },
        {
          short: '03 Farma/Lab',
          tag: '03 · FARMACIA Y RESULTADOS',
          title: 'Dispensación por Lote & Entrega QR',
          desc: 'Farmacia surte únicamente stock con vigencia verificada FIFO; laboratorio entrega informes PDF firmados verificables con QR.',
          devices: 'Terminal Farmacia + Generador Informes QR',
          protocols: 'Alerta temprana de caducidad farmacéutica + Emisión OSE',
          roles: 'Químico Farmacéutico · Tecnólogo Lab'
        },
        {
          short: '04 Dirección',
          tag: '04 · GERENCIA MÉDICA',
          title: 'Producción & Honorarios Médicos',
          desc: 'Liquidación automatizada de comisiones por acto médico o convenio, ocupación de consultorios y margen por especialidad.',
          devices: 'Dashboard Dirección Médica y Tesorería',
          protocols: 'Reglas variables de porcentaje por médico y aseguradora',
          roles: 'Director Médico · Administración'
        }
      ],
      hier: {
        out: 'Atención puntual sin papeles y trazabilidad completa del tratamiento',
        outDesc: 'La receta firmada en consulta fluye instantáneamente hacia farmacia, laboratorio y caja con control por lote.',
        tiers: [
          ['NIVEL 01 · ADMISIÓN', 'Recepción & Triaje Enfermería', 'Registro de llegada, control de cola de espera y captura inicial de signos vitales.', 'Cola Activa', ''],
          ['NIVEL 02 · CONSULTA', 'Médicos & Agenda Paciente', 'Historia clínica HCE estructurada, diagnóstico CIE-10 y receta digital instantánea.', 'HCE + Citas', 'ok'],
          ['NIVEL 03 · SOPORTE', 'Farmacia por Lotes & Laboratorio', 'Validación estricta de vencimientos, informes PDF verificables y boleta/factura.', 'Farmacia + OSE', ''],
          ['NIVEL 04 · DIRECCIÓN', 'Gerencia Médica & Honorarios', 'Cálculo automático de liquidaciones médicas, convenios y rendimiento por sala.', 'Gerencia Salud', 'ok']
        ]
      }
    },
    {
      id: 'almacenes',
      num: '07',
      cat: 'logistica',
      catLabel: 'Logística, Educación & 3D',
      name: 'Almacenes, Flota & Logística',
      shortName: 'Logística & Flota',
      badge: 'Kardex + Reparto',
      badgeOk: false,
      mod: 'stock',
      ficha: null,
      bizParam: 'Almacén y Logística',
      thesis: 'Portal B2B mayorista, picking por código de barras y series en bodega, guías de remisión electrónicas y conformidad de entrega móvil.',
      kpis: [
        { k: 'PICKING GUÍA', v: 'Series & Lotes' },
        { k: 'DOCUMENTOS', v: 'GRE Remitente' },
        { k: 'ÚLTIMA MILLA', v: 'Firma + Foto GPS' }
      ],
      hardware: ['Handheld Zebra / PDA', 'Impresora Etiquetas', 'Móvil Repartidor', 'GPS Flota'],
      layers: [
        {
          short: '01 Portal B2B',
          tag: '01 · CARA MAYORISTA Y CLIENTES',
          title: 'Pedidos B2B & Rastreo en Línea',
          desc: 'Clientes corporativos cotizan y reponen inventario según su lista de precios acordada, consultando el avance real de su despacho.',
          devices: 'Portal Clientes Corporativos Web',
          protocols: 'Crédito habilitado por cliente + Tracking de guía en vivo',
          roles: 'Comprador B2B · Ejecutivo Cuentas'
        },
        {
          short: '02 Bodega/Ruta',
          tag: '02 · PICKING MÓVIL Y CHOFERES',
          title: 'Alistamiento por Lote & Entrega Firmada',
          desc: 'Operadores preparan bultos validando código/serie; choferes cierran entrega en ruta registrando firma táctil, foto y punto GPS.',
          devices: 'Colector Datos Bodega + App Chofer Ruta Offline',
          protocols: 'Sincronización instantánea de conformidad de entrega POD',
          roles: 'Operario Picking · Chofer Repartidor'
        },
        {
          short: '03 Tributario',
          tag: '03 · GUÍAS Y VALORACIÓN KARDEX',
          title: 'GRE SUNAT & Control Multi-Bodega',
          desc: 'Emisión directa de Guía de Remisión Remitente y Transportista, trazabilidad por ubicación de pasillo/rack y valoración FIFO.',
          devices: 'Motor Documentario GRE + Kardex Valorizado',
          protocols: 'Cumplimiento integral normativa SUNAT transporte carga',
          roles: 'Auxiliar Despacho · Contabilidad Costos'
        },
        {
          short: '04 Jefatura',
          tag: '04 · ABASTECIMIENTO INTELIGENTE',
          title: 'Reposición & Control de Mermas',
          desc: 'Generación automática de órdenes hacia proveedores al cruzar umbrales de seguridad y detección de stock inmovilizado.',
          devices: 'Tablero Jefe Operaciones & Compras',
          protocols: 'Cálculo de días de inventario y alertas de caducidad',
          roles: 'Jefe Logístico · Gerente Operaciones'
        }
      ],
      hier: {
        out: 'Inventario valorizado al centavo y entregas certificadas sin extravíos',
        outDesc: 'Desde el pedido mayorista hasta la firma digital en destino, cada movimiento actualiza el kardex y genera guía electrónica.',
        tiers: [
          ['NIVEL 01 · BODEGA', 'Almaceneros & Repartidores', 'Picking guiado por ubicación/serie y cierre de entrega en ruta con foto y firma.', 'App PDA + Ruta', ''],
          ['NIVEL 02 · DESPACHO', 'Portal B2B & Coordinación Flota', 'Recepción de pedidos mayoristas y consolidación de rutas por zona geográfica.', 'Portal B2B', 'ok'],
          ['NIVEL 03 · NORMATIVA', 'Guías Electrónicas GRE & Kardex', 'Emisión fiscal de guías de traslado y registro FIFO / promedio ponderado.', 'GRE SUNAT', ''],
          ['NIVEL 04 · JEFATURA', 'Gerencia Logística & Compras', 'Alertas automáticas de reorden, mermas y productividad por unidad móvil.', 'Control Flota', 'ok']
        ]
      }
    },
    {
      id: 'inmobiliaria3d',
      num: '08',
      cat: 'logistica',
      catLabel: 'Logística, Educación & 3D',
      name: 'Inmobiliaria 3D, Gimnasios & Centros',
      shortName: 'Inmobiliaria 3D & QR',
      badge: 'WebGL 3D + QR + Campus',
      badgeOk: true,
      mod: 'show3d',
      ficha: '../soluciones/3d-web/',
      bizParam: 'Inmobiliaria y Showroom 3D',
      thesis: 'Maquetas arquitectónicas WebGL 3D interactivas por niveles, torniquetes QR con control de morosidad para gimnasios y campus académicos.',
      kpis: [
        { k: 'MOTOR ESPACIAL', v: 'WebGL 60 FPS' },
        { k: 'ACCESOS QR', v: 'Bloqueo Cuotas' },
        { k: 'CONVERSIÓN', v: 'Configurador 3D' }
      ],
      hardware: ['Visor WebGL 3D Browser', 'Torniquete / Escáner QR', 'Pantallas Tótems Sala', 'Pasarela Recurrente'],
      layers: [
        {
          short: '01 WebGL 3D',
          tag: '01 · VITRINA ESPACIAL / MATRÍCULA',
          title: 'Maqueta 3D Seccionable & Admisión Web',
          desc: 'Visitantes navegan edificios en 3D con corte por pisos y acabados configurables, o reservan suscripciones y matrículas en línea.',
          devices: 'Browser WebGL Nativo Desktop/Mobile + Tótem Sala Ventas',
          protocols: 'Sin plugins ni descargas · Estado en vivo por unidad o plan',
          roles: 'Comprador / Alumno / Socio'
        },
        {
          short: '02 CRM/Puerta',
          tag: '02 · ASESORES 3D Y CHECK-IN QR',
          title: 'Separación en Vivo & Control Acceso',
          desc: 'Asesores bloquean departamentos directamente desde el modelo 3D; recepción o torniquete validan pase QR de socio o préstamo.',
          devices: 'CRM Vendedor 3D + Torniquete / Móvil Recepción',
          protocols: 'Sincronización instantánea de unidad separada o asistencia',
          roles: 'Asesor Comercial · Recepcionista · Bibliotecario'
        },
        {
          short: '03 Cobranza',
          tag: '03 · CUOTAS, SEPARACIONES Y MORA',
          title: 'Cronogramas & Bloqueo Automático',
          desc: 'Recordatorios automatizados de vencimiento, bloqueo preventivo en puerta ante membresías vencidas y emisión de constancias.',
          devices: 'Motor Recurrente de Cuotas & Notificaciones',
          protocols: 'Conciliación automatizada con comprobantes y carnets',
          roles: 'Cobranzas · Administración Campus'
        },
        {
          short: '04 Dirección',
          tag: '04 · DIRECTORIO & FLUJO PROYECTADO',
          title: 'Absorción, Aforo & Proyección Caja',
          desc: 'Unidades disponibles vs separadas/vendidas por torre, métricas de deserción en clubes/academias y flujo financiero futuro.',
          devices: 'Consola Directiva de Portafolio',
          protocols: 'Reportes gerenciales de velocidad de ventas y ocupación',
          roles: 'Gerente Proyecto · Director Académico'
        }
      ],
      hier: {
        out: 'Impacto visual 3D conectado directamente a CRM, torniquetes y cobranza',
        outDesc: 'Lo que el cliente separa en el visor 3D o paga en membresía actualiza disponibilidad, acceso QR y caja sin fricción.',
        tiers: [
          ['NIVEL 01 · ACCESO / SALA', 'Recepción, Torniquetes y Préstamo', 'Escaneo instantáneo de QR socio/alumno con bloqueo por mora y préstamos de recursos.', 'Check-In QR', ''],
          ['NIVEL 02 · SHOWROOM 3D', 'Asesores Comerciales & WebGL', 'Navegación interactiva por niveles del proyecto con separación en tiempo real.', 'Showroom 3D + CRM', 'ok'],
          ['NIVEL 03 · TESORERÍA', 'Membresías, Cronogramas y OSE', 'Control de cuotas periódicas, renovaciones web y emisión electrónica automática.', 'Cobranza Auto', ''],
          ['NIVEL 04 · DIRECTORIO', 'Gerencia Inmobiliaria / Académica', 'Velocidad de absorción por etapa, curvas de aforo y flujo financiero proyectado.', 'Tablero Portafolio', 'ok']
        ]
      }
    }
  ];

  let activeSectorId = 'tiendas';
  let activeLayerIdx = 0;
  let activeCat = 'all';
  let searchTerm = '';
  let viewMode = 'bento'; // 'bento' | 'matrix'
  let autoPlayTimer = null;

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* --------------------------------------------------------------------------
     1. Atlas Render & Layer Control
     -------------------------------------------------------------------------- */
  function renderAtlasRail() {
    const rail = $('#atlasRail');
    if (!rail) return;
    rail.innerHTML = `<div class="atlas-rail-hd"><span>EXPLORADOR DE RUBROS</span><span>8 SECTORES</span></div>` +
      SECTORS.map(s => `
        <button type="button" class="atlas-nav-btn" data-atlas-id="${s.id}" role="tab" aria-selected="${s.id === activeSectorId ? 'true' : 'false'}">
          <span class="atlas-nav-ico" aria-hidden="true">${ICONS[s.id]}</span>
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

    const hwHtml = s.hardware.map(h => `<span class="hw-pill">${esc(h)}</span>`).join('');
    const fichaBtn = s.ficha ? `<a class="btn sm" href="${s.ficha}">Ver ficha técnica</a>` : '';

    stage.innerHTML = `
      <div class="atlas-top">
        <div class="atlas-title-wrap">
          <small>${s.num} · ${esc(s.catLabel)} · <span class="badge ${s.badgeOk ? 'ok' : ''}">${esc(s.badge)}</span></small>
          <h2>${esc(s.name)}</h2>
          <p>${esc(s.thesis)}</p>
        </div>
        <div class="atlas-kpis" aria-label="Indicadores de desempeño del rubro">${kpisHtml}</div>
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
     2. Compact Bento Grid & Side-by-Side Comparative Matrix
     -------------------------------------------------------------------------- */
  function renderBentoCards() {
    const grid = $('#sectorGrid');
    if (!grid) return;
    grid.innerHTML = SECTORS.map(s => {
      const ly0 = s.layers[0];
      const mtabs = s.layers.map((ly, i) => `
        <button type="button" class="sc-mtab" data-card-tab="${i}" aria-selected="${i === 0 ? 'true' : 'false'}">${esc(ly.short)}</button>
      `).join('');
      const hwPills = s.hardware.slice(0, 3).map(h => `<span class="sc-metric-pill">${esc(h)}</span>`).join('');
      const fichaBtn = s.ficha ? `<a class="btn sm" href="${s.ficha}">Ficha</a>` : '';
      return `
        <article class="sector-card tilt-card" id="${s.id}" data-cat="${s.cat}">
          <div class="sc-top">
            <div class="sc-id-cluster">
              <span class="sc-ico" aria-hidden="true">${ICONS[s.id]}</span>
              <div>
                <span class="sc-code">${s.num} · ${esc(s.catLabel)}</span>
                <h3>${esc(s.name)}</h3>
              </div>
            </div>
            <span class="badge ${s.badgeOk ? 'ok' : ''}">${esc(s.badge)}</span>
          </div>
          <p class="sc-thesis">${esc(s.thesis)}</p>
          <div class="sc-mini-tabs" role="tablist" aria-label="Planos de ${esc(s.name)}">${mtabs}</div>
          <div class="sc-mini-panel" data-card-panel>
            <b>${esc(ly0.title)}</b>
            <p>${esc(ly0.desc)}</p>
          </div>
          <div class="sc-metrics-row">${hwPills}</div>
          <div class="sc-actions">
            <div class="sc-act-l">
              <a class="btn sm pri" href="../studio/?mod=${encodeURIComponent(s.mod)}">Studio OS →</a>
              ${fichaBtn}
              <a class="btn sm" href="../cotizar/?mod=${encodeURIComponent(s.mod)}&amp;biz=${encodeURIComponent(s.bizParam)}">Cotizar</a>
            </div>
            <div class="sc-act-r">
              <button type="button" class="btn xs" data-inspect-id="${s.id}">Inspeccionar ↑</button>
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
        <td><strong>${s.num} · ${esc(s.name)}</strong><small>${esc(s.badge)}</small></td>
        <td>${esc(s.layers[0].title)}<small>${esc(s.layers[0].devices)}</small></td>
        <td>${esc(s.layers[1].title)}<small>${esc(s.layers[1].devices)}</small></td>
        <td>${esc(s.layers[2].title)}<small>${esc(s.layers[2].protocols)}</small></td>
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
        ...s.hardware,
        ...s.kpis.map(k => `${k.k} ${k.v}`),
        ...s.layers.map(l => `${l.title} ${l.desc} ${l.devices} ${l.protocols} ${l.roles}`)
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
     3. Full 8-Industry Organizational Hierarchy (#hierTabs)
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
    // Support inbound hash from Home links (#tiendas, #restaurantes, etc.)
    const hashId = (location.hash || '').replace('#', '').trim();
    if (hashId && SECTORS.some(s => s.id === hashId)) {
      activeSectorId = hashId;
    }

    // Sync chip counters from SECTORS truth
    $$('#sectorFilter button[data-cat]').forEach(btn => {
      const cat = btn.dataset.cat;
      const badge = btn.querySelector('.chip-ct');
      if (badge) {
        badge.textContent = cat === 'all' ? SECTORS.length : SECTORS.filter(s => s.cat === cat).length;
      }
    });

    renderAtlasRail();
    renderAtlasStage(false);
    renderBentoCards();
    renderHierTabs();
    renderHierContent(activeSectorId);
    applyFilters();

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

    // Bento Card mini-tabs + "Inspeccionar ↑" delegation
    $('#sectorGrid')?.addEventListener('click', (e) => {
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

    // Mode switch (Atlas+Bento vs Comparative Matrix)
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
