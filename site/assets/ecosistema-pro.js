/* ============================================================================
   ZAPHYREL ECOSISTEMA PRO — Live Event Bus Simulator, Offline Queue & RBAC
   ============================================================================ */
(() => {
  'use strict';

  const shell = () => window.__zaphyrelShell || {};
  const ping = (v = 0.06) => { try { shell().ping?.(v); } catch (_) {} };
  const esc = (s) => shell().esc?.(s) ?? String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* --------------------------------------------------------------------------
     1. Live Event Bus Scenarios (8 Core Verticals + Automation)
     -------------------------------------------------------------------------- */
  const FLOW_SCENARIOS = {
    retail: {
      label: 'Retail Multi-Sede',
      txId: 'EVT-RT-8402',
      nodes: [
        { k: '01 · SUPERFICIE WEB', t: 'E-commerce & Stock', s: 'Cliente paga recojo express', lat: '+00 ms', screen: 'Web Checkout + Stock Sede Central', lock: 'Bloqueo atómico de SKU por 15 min', db: 'UPDATE stock_sedes SET reservado = reservado + 1 WHERE sku="ZPH-901"' },
        { k: '02 · FISCAL & PAGOS', t: 'Yape / OSE SUNAT', s: 'Validación + Boleta XML', lat: '+42 ms', screen: 'Webhook Pasarela + Motor OSE Background', lock: 'Firma digital X.509 & correlativo B001-04819', db: 'INSERT INTO comprobantes (serie, ubl, estado) VALUES ("B001", "UBL2.1", "ACEPTADO")' },
        { k: '03 · PISO Y CAJA', t: 'Alerta a Vendedor', s: 'Alistamiento para entrega', lat: '+88 ms', screen: 'Terminal POS Caja #02 & Tablet Tienda', lock: 'Asignación PIN vendedor turno tarde', db: 'INSERT INTO despacho_picking (estado, sede) VALUES ("ARMADO", "SEDE_CENTRAL")' },
        { k: '04 · ALMACÉN', t: 'Descuento Kardex', s: 'Salida valorizada FIFO', lat: '+132 ms', screen: 'Kardex Central Multi-Sucursal', lock: 'Costo promedio ponderado recalculado', db: 'INSERT INTO kardex_movs (tipo, cant, saldo) VALUES ("SALIDA_VTA", -1, 14)' },
        { k: '05 · DIRECCIÓN', t: 'Utilidad Neta', s: 'Margen consolidado vivo', lat: '+174 ms', screen: 'Tablero Ejecutivo Gerencia General', lock: 'Agregación read-only multi-tienda', db: 'REFRESH VIEW v_margen_sku_diario -- Δ +S/ 84.50 neto' }
      ],
      json: {
        event_id: 'EVT-RT-8402',
        canal: 'WEB_RECOJO_TIENDA',
        comprobante: 'B001-04819 · UBL 2.1',
        pago: { metodo: 'YAPE_QR', monto_pen: 249.00, verificado: true },
        mutaciones: ['stock_sedes:-1', 'kardex_fifo:commit', 'utilidad_neta:+84.50']
      },
      offlineMsg: 'Cola local IndexedDB (Ticket #TMP-904 · SHA-256) asegurada en Caja #02. Boleta XML y actualización en nube quedan listas para auto-sincronía.'
    },
    club: {
      label: 'Discotecas & Boxes',
      txId: 'EVT-QR-5119',
      nodes: [
        { k: '01 · PREVENTA WEB', t: 'Box & Ticket QR', s: 'Generación hash único', lat: '+00 ms', screen: 'Boletería Web Mobile-First + Wallet', lock: 'Hash HMAC-SHA256 irrepetible ligado al DNI', db: 'INSERT INTO tickets_qr (hash, aforo_zona, usado) VALUES ("9f8c...e2", "BOX_VIP", false)' },
        { k: '02 · PUERTA QR', t: 'Escáner 0.4 seg', s: 'Frena capturas duplicadas', lat: '+35 ms', screen: 'App Puerta PDA Láser / NFC', lock: 'Estado marcado CONSUMIDO al primer barrido', db: 'UPDATE tickets_qr SET usado=true, puerta_ts=NOW() WHERE hash="9f8c...e2" AND usado=false' },
        { k: '03 · SALÓN VIP', t: 'Comanda Box #04', s: 'Mozo envía a Barra Sur', lat: '+79 ms', screen: 'Tablet Mozo VIP + Monitor Barman LED', lock: 'Validación consumo mínimo incluido en box', db: 'INSERT INTO comandas_barra (box, items) VALUES ("BOX-04", ["BOT_WHISKY_12Y"])' },
        { k: '04 · BARRA & STOCK', t: 'Inventario Botellas', s: 'Descuento por botella/onza', lat: '+126 ms', screen: 'Control Inventario Barra Nocturna', lock: 'Botella numerada asignada al box', db: 'UPDATE botellas_barra SET saldo_oz = saldo_oz - 25 WHERE lote="BL-19"' },
        { k: '05 · GERENCIA NOCHE', t: 'Arqueo en Vivo', s: 'Puerta + Boxes + Barras', lat: '+165 ms', screen: 'Consola Promotores & Dirección', lock: 'Comparativa real tragos servidos vs cobrados', db: 'REFRESH VIEW v_arqueo_evento -- Aforo: 312/400 · Varianza: 0%' }
      ],
      json: {
        event_id: 'EVT-QR-5119',
        zona: 'BOX_VIP_04',
        validacion_puerta: { latencia_ms: 35, anti_reventa: 'PASS_SINGLE_USE' },
        barra: { estacion: 'BARRA_SUR', consumo: '1x Botella + 4x RedBull' },
        arqueo_sync: true
      },
      offlineMsg: 'Modo Evento Sin Señal: PDA Puerta valida QR contra caché criptográfico local y comandas VIP salen directo vía router LAN interno.'
    },
    taller: {
      label: 'Talleres & Servicio 360°',
      txId: 'EVT-TAL-2088',
      nodes: [
        { k: '01 · RECEPCIÓN MÓVIL', t: 'Checklist + Fotos 360°', s: 'Ingreso con evidencia inviolable', lat: '+00 ms', screen: 'Tablet Recepción Patio + Firma Cliente', lock: 'Fotos obligatorias pre-taller selladas con hora', db: 'INSERT INTO ordenes_taller (ot, placa, estado) VALUES ("OT-884", "V9X-412", "DIAGNOSTICO")' },
        { k: '02 · PORTAL QR CLIENTE', t: 'Tracking Vivo Web', s: 'Aprobación 1-clic WhatsApp', lat: '+46 ms', screen: 'Link QR Público del Propietario + Bot WA', lock: 'Presupuesto de adicionales firmado con marca temporal', db: 'UPDATE presupuestos_ot SET aprobado_cliente=true WHERE ot="OT-884"' },
        { k: '03 · BAHÍAS / MECÁNICOS', t: 'Tablero Monitor Taller', s: 'Timer real y solicitud piezas', lat: '+98 ms', screen: 'Monitor TV Bahías + App Técnico', lock: 'Cálculo exacto horas hombre cobrables por técnico', db: 'UPDATE bahias_estado SET tecnico_id=12, fase="REPARACION" WHERE ot="OT-884"' },
        { k: '04 · ALMACÉN REPUESTOS', t: 'Imputación Kardex OT', s: 'Filtros y repuestos a la orden', lat: '+144 ms', screen: 'Bodega Repuestos Códigos OEM', lock: 'Descuento exacto vinculado a placa sin fugas', db: 'INSERT INTO salidas_ot (ot, sku_oem, cant) VALUES ("OT-884", "FIL-902", 1)' },
        { k: '05 · CAJA & POSTVENTA', t: 'Factura + Retorno Km', s: 'Aviso futuro cada 5,000 km', lat: '+186 ms', screen: 'POS OSE SUNAT + Motor Retorno n8n', lock: 'Programa recordatorio automático futuro por placa', db: 'INSERT INTO postventa_jobs (placa, prox_aviso) VALUES ("V9X-412", "150_DIAS")' }
      ],
      json: {
        event_id: 'EVT-TAL-2088',
        orden_trabajo: 'OT-884',
        aprobacion_whatsapp: { validada: true, canal: 'LINK_QR' },
        repuestos_imputados: ['FIL-902', 'ACE-5W30'],
        recordatorio_auto: '5000km_o_150dias'
      },
      offlineMsg: 'Zona de elevadores sin Wi-Fi: Técnico toma fotos de falla y solicita repuesto localmente; sincroniza apenas cruza recepción.'
    },
    rest: {
      label: 'Restaurantes KDS',
      txId: 'EVT-KDS-3094',
      nodes: [
        { k: '01 · SALÓN / QR MESA', t: 'Carta Digital Directa', s: 'Pedido con modificadores', lat: '+00 ms', screen: 'Carta Web QR Mesa 07 / Tablet Mozo', lock: 'Bloqueo de platos agotados en carta al instante', db: 'INSERT INTO pedidos_mesa (mesa, pax, estado) VALUES ("M07", 4, "ENVIADO")' },
        { k: '02 · CAJA & CUENTA', t: 'Pre-cuenta Dividida', s: 'Yape / Plin / RUC 10 o 20', lat: '+39 ms', screen: 'Terminal POS Touch + Cobro QR Dinámico', lock: 'División exacta por comensal sin re-digitar', db: 'INSERT INTO comprobantes (tipo, ruc, monto) VALUES ("FACTURA", "2060...", 186.00)' },
        { k: '03 · COCINA & BARRA', t: 'Ruteo Inteligente KDS', s: 'Caliente vs Fríos vs Barra', lat: '+84 ms', screen: 'Monitores KDS 15-24" por Estación', lock: 'Semáforo de cronómetro por tiempo objetivo de plato', db: 'INSERT INTO kds_tickets (estacion, plato, objetivo_s) VALUES ("CALIENTE", "Lomo Saltado", 420)' },
        { k: '04 · ECONOMATO', t: 'Descarga por Receta', s: 'Gramos de carne, aceite y arroz', lat: '+138 ms', screen: 'Módulo Recetas Escandallo & Stock Insumos', lock: 'Descuento exacto de materia prima por porción', db: 'UPDATE insumos SET stock_g = stock_g - 220 WHERE cod="LOMO_FINO"' },
        { k: '05 · GERENCIA', t: 'Costo Real / Plato', s: 'Margen diario y propinas', lat: '+172 ms', screen: 'Dashboard Rentabilidad & Merma', lock: 'Comparativa costo receta teórica vs consumo real', db: 'REFRESH VIEW v_margen_platos -- Food Cost: 28.4%' }
      ],
      json: {
        event_id: 'EVT-KDS-3094',
        mesa: 'M07',
        ruteo_kds: ['COCINA_CALIENTE', 'BARRA_COCTELES'],
        insumos_descargados: [{ sku: 'LOMO_FINO', g: 220 }, { sku: 'PAPA_AMARILLA', g: 180 }],
        comision_terceros_pen: 0
      },
      offlineMsg: 'Corte en salón: la comanda se imprime localmente vía IP LAN directo en impresoras ESC/POS 80mm de cocina y la boleta espera en IndexedDB.'
    },
    clinica: {
      label: 'Clínicas & Farma',
      txId: 'EVT-MED-1147',
      nodes: [
        { k: '01 · PORTAL PACIENTE', t: 'Agenda Multi-Sede', s: 'Cita sin cruce de horario', lat: '+00 ms', screen: 'Portal Citas Web + Recordatorio WhatsApp', lock: 'Validación real de agenda médico + consultorio', db: 'INSERT INTO citas (paciente_id, medico_id, consultorio) VALUES (892, 14, "C-204")' },
        { k: '02 · ADMISIÓN & QR', t: 'Check-In & Copago', s: 'Boleta SUNAT & triaje', lat: '+44 ms', screen: 'Ventanilla Admisión + Estación Enfermería', lock: 'Signos vitales obligatorios antes de pase a médico', db: 'INSERT INTO atenciones (cita_id, triaje_ok) VALUES (4410, true)' },
        { k: '03 · CONSULTORIO HCE', t: 'Historia & Receta', s: 'Prescripción digital CIE-10', lat: '+91 ms', screen: 'Monitor Médico HCE + Firmador Digital', lock: 'Alerta automática de alergias e interacciones', db: 'INSERT INTO recetas_digitales (atencion_id, cie10) VALUES (4410, "J06.9")' },
        { k: '04 · FARMACIA FEFO', t: 'Dispensación por Lote', s: 'Control estricto vencimiento', lat: '+136 ms', screen: 'Módulo Dispensación Farmacia Clínica', lock: 'Selección automática FEFO (próximo a vencer primero)', db: 'UPDATE lotes_farma SET cant = cant - 1 WHERE lote="L26-09B" AND vence > NOW()' },
        { k: '05 · DIRECCIÓN MÉDICA', t: 'Honorarios & Stock', s: 'Liquidación por doctor viva', lat: '+178 ms', screen: 'Consola Dirección Clínica & Seguros', lock: 'Cruce exacto atenciones realizadas vs cobradas', db: 'REFRESH VIEW v_honorarios_medicos -- Liquidación actualizada' }
      ],
      json: {
        event_id: 'EVT-MED-1147',
        consultorio: 'C-204',
        cie10: 'J06.9',
        farmacia_lote: 'L26-09B · FEFO_VERIFICADO',
        honorario_calculado: true
      },
      offlineMsg: 'Contingencia en sede: Enfermería y Farmacia continúan registrando atenciones y lotes localmente sin interrumpir consulta médica.'
    },
    edu: {
      label: 'Educación & Bib QR',
      txId: 'EVT-EDU-3310',
      nodes: [
        { k: '01 · PORTAL FAMILIA', t: 'Matrícula & Pensión', s: 'Pago web + aviso WhatsApp', lat: '+00 ms', screen: 'Portal Alumno / Apoderado + Checkout', lock: 'Conciliación instantánea sin enviar captura manual', db: 'INSERT INTO pensiones_pagadas (alumno_id, cuota) VALUES (408, "MAY-2026")' },
        { k: '02 · CARNÉ QR PUERTA', t: 'Check-In + Aviso Padre', s: 'Torno libera y notifica WA', lat: '+40 ms', screen: 'Molinete Campus QR + Webhook WhatsApp', lock: 'Anti-passback y alerta instantánea de asistencia', db: 'INSERT INTO asistencias_qr (alumno_id, hora) VALUES (408, NOW())' },
        { k: '03 · BIBLIOTECA HÍBRIDA', t: 'Préstamo + OpenAlex', s: 'Físico QR + Repo Digital', lat: '+89 ms', screen: 'Módulo Biblioteca Excel/QR + Metadatos OpenAlex', lock: 'Separación de estante físico y fuentes abiertas seguras', db: 'UPDATE libros SET prestados = prestados + 1 WHERE qr_lomo="LIB-042"' },
        { k: '04 · CERTIFICACIÓN', t: 'Diploma QR Verificable', s: 'Anti-adulteración en portal', lat: '+135 ms', screen: 'Generador Constancias Hash Público', lock: 'Verificación pública para empleadores en 1 segundo', db: 'INSERT INTO certificados_hash (alumno_id, folio) VALUES (408, "CERT-ZPH-26")' },
        { k: '05 · PROMOTORÍA', t: 'Deserción & Caja', s: 'Radar mora y egresados', lat: '+175 ms', screen: 'Consola Dirección Académica', lock: 'Alertas tempranas por ausentismo consecutivo', db: 'REFRESH VIEW v_morosidad_ciclo -- Regularidad al día' }
      ],
      json: {
        event_id: 'EVT-EDU-3310',
        estudiante: 'ALUM-408',
        puerta_qr: { autorizado: true, aviso_apoderado_wa: 'ENVIADO' },
        biblioteca: { tipo: 'HIBRIDA_QR_OPENALEX' }
      },
      offlineMsg: 'Campus sin fibra: Lector de puerta y módulo de préstamo bibliotecario validan carné QR desde caché local y envían alertas WhatsApp al reconectar.'
    },
    logistica: {
      label: 'Logística & Ruta POD',
      txId: 'EVT-LOG-6405',
      nodes: [
        { k: '01 · WMS RACK QR', t: 'Picking Guiado', s: 'Armado bultos por pasillo', lat: '+00 ms', screen: 'App Handheld Bodega + Etiquetadora 4×6', lock: 'Verificación física SKU + rack cero cruces', db: 'UPDATE pallets_wms SET estado="CARGADO", ruta="SUR-04"' },
        { k: '02 · SUNAT GRE', t: 'Guía Electrónica', s: 'Remitente & Transportista', lat: '+48 ms', screen: 'Motor Tráfico + SUNAT OSE', lock: 'Validación placa, brevete, SOAT y peso bruto total', db: 'INSERT INTO gre_electronicas (serie, placa) VALUES ("EG01-942", "F4M-819")' },
        { k: '03 · APP CHOFER POD', t: 'Entrega Offline GPS', s: 'Firma + foto guía sellada', lat: '+96 ms', screen: 'App Ruta Conductor Offline', lock: 'Cierre bloqueado si falta GPS en punto o fotografía', db: 'INSERT INTO entregas_pod (gre, lat, lng, foto_ok) VALUES ("EG01-942", -17.19, -70.93, true)' },
        { k: '04 · COMBUSTIBLE OCR', t: 'Audita Odómetro', s: 'Cruce km vs galones grifo', lat: '+140 ms', screen: 'Módulo Control Flota & Peajes', lock: 'Alerta automática ante caída anómala de rendimiento', db: 'INSERT INTO cargas_comb (placa, km, gal) VALUES ("F4M-819", 142800, 38.4)' },
        { k: '05 · PORTAL CLIENTE B2B', t: 'Cargo Vivo & Margen', s: 'Utilidad neta por viaje', lat: '+180 ms', screen: 'Portal Descarga Cargos + BI Flotas', lock: 'Cliente descarga su guía firmada en tiempo real', db: 'REFRESH VIEW v_margen_viajes -- Rentabilidad ruta OK' }
      ],
      json: {
        event_id: 'EVT-LOG-6405',
        guia: 'EG01-942',
        pod_gps_foto: true,
        flota_valida_soat_citv: true,
        km_por_galon: 'EN_RANGO'
      },
      offlineMsg: 'Tramo de sierra o campamento sin cobertura celular: App de ruta sella entrega con coordenadas GPS + foto en caché local y sincroniza en base.'
    },
    inmo3d: {
      label: 'Inmobiliaria 3D & QR',
      txId: 'EVT-3D-7720',
      nodes: [
        { k: '01 · SHOWROOM WEBGL', t: 'Maqueta 3D Viva', s: 'Cliente separa Dpto 804', lat: '+00 ms', screen: 'Visor WebGL 3D por Pisos & Vistas', lock: 'Bloqueo instantáneo de unidad para doble venta 0%', db: 'UPDATE unidades_torre SET estado="SEPARADO", lead_id=9104 WHERE cod="T2-804"' },
        { k: '02 · PASARELA / QR', t: 'Abono & Contrato', s: 'Pago separación & cronograma', lat: '+48 ms', screen: 'Checkout Pasarela Bancaria / Yape Empresa', lock: 'Recibo numerado + bloqueo automático 7 días', db: 'INSERT INTO separaciones (unidad, monto_usd) VALUES ("T2-804", 1500)' },
        { k: '03 · CRM VENDEDOR', t: 'Ficha Asesor 3D', s: 'Alertas en sala de ventas', lat: '+96 ms', screen: 'CRM Vendedor Desktop + Tótem Sala Ventas', lock: 'Asesor visualiza unidad reservada en rojo vivo', db: 'INSERT INTO pipeline_crm (unidad, etapa) VALUES ("T2-804", "MINUTA_EN_CURSO")' },
        { k: '04 · COBRANZA / QR', t: 'Cuotas & Torniquete', s: 'Acceso socio/mora auto', lat: '+140 ms', screen: 'Motor Cuotas + Torniquete QR (en Clubes/Edu)', lock: 'Generación cronograma cuotas o habilitación carnet', db: 'UPDATE membresias SET estado="ACTIVO", qr_vigente=true WHERE socio_id=9104' },
        { k: '05 · DIRECTORIO', t: 'Curva Absorción', s: 'Velocidad ventas por torre', lat: '+182 ms', screen: 'Tablero Gerencia Inmobiliaria & Flujo', lock: 'Proyección inmediata de ingresos futuros por torre', db: 'REFRESH VIEW v_absorcion_proyecto -- Torre B: 74% vendida' }
      ],
      json: {
        event_id: 'EVT-3D-7720',
        unidad: 'TORRE-2 · DPTO 804',
        visor_webgl_sync: 'INMEDIATO_MULTI_TÓTEM',
        separacion_usd: 1500,
        duplicidad_imposible: true
      },
      offlineMsg: 'En obra o sala de ventas sin fibra estable: asesor separa unidad en caché local y el sistema resuelve prioridad por timestamp criptográfico.'
    }
  };

  /* --------------------------------------------------------------------------
     2. RBAC Security Profiles & Live Action Guard
     -------------------------------------------------------------------------- */
  const RBAC_ROLES = [
    {
      id: 'cliente',
      name: 'Cliente Web / Apoderado / B2B',
      tag: 'Superficie Pública · Lectura Acotada',
      token: 'Sesión JWT / Verificador QR Público',
      desc: 'Interactúa con disponibilidad real, cartas, maquetas WebGL 3D, tracker de taller, reservas y seguimiento QR sin acceder jamás a costos o márgenes internos.',
      allowed: [
        'Consultar stock, mesas, habitaciones, turnos o unidades 3D reales en vivo',
        'Pagar checkout con Yape / Plin / Tarjeta o aprobar presupuestos de taller',
        'Descargar comprobante XML/PDF, certificado o tracking con código QR'
      ],
      blocked: [
        'Costos de compra, márgenes por producto o utilidades del negocio',
        'Datos de otros clientes, planilla interna o movimientos de almacén',
        'Edición directa de precios, inventarios o registros de auditoría'
      ],
      rule: 'Aislamiento estricto por API Gateway público con rate-limiting, firma HMAC en enlaces QR y consultas parametrizadas de solo lectura sobre vistas públicas.',
      tests: [
        { label: 'Validar autenticidad de QR / Boleta', pass: true, msg: 'APROBADO [PÚBLICO]: Token HMAC verificado. Solo expone estado del pedido/boleta #B001-4819 sin datos internos de empresa.' },
        { label: 'Intentar consultar costo de compra del producto', pass: false, msg: 'BLOQUEADO [HTTP 403]: Campo costo_unitario excluido físicamente del DTO público en capa de API.' }
      ]
    },
    {
      id: 'cajero',
      name: 'Cajero / Puerta QR / Mozo',
      tag: 'Nivel 01 · Operación en Piso',
      token: 'PIN Operativo Personal + Sesiones de Turno',
      desc: 'Ejecución de ultra-velocidad en punto de venta, barra, salón o puerta de discoteca. Opera cero configuraciones sensibles y entrega arqueo ciego al terminar.',
      allowed: [
        'Escanear barras/QR, tomar pedidos y cobrar según medio (Yape/Efectivo/POS)',
        'Emitir boletas y facturas RUC hacia SUNAT / OSE en 1 clic',
        'Imprimir comandas 80mm locales e ingresar gastos menores con motivo'
      ],
      blocked: [
        'Anular comprobantes emitidos o borrar historial sin PIN de supervisor',
        'Ver utilidad neta global, arqueo esperado antes del cierre o cambiar precios',
        'Modificar stock físico manual en Kardex sin registro auditado'
      ],
      rule: 'Control de Arqueo Ciego obligatorio al cierre + elevación temporal por PIN supervisor para descuentos mayores, devoluciones o notas de crédito.',
      tests: [
        { label: 'Registrar cobro mixto Yape + Efectivo', pass: true, msg: 'APROBADO [NIVEL 01]: Movimiento ligado al Turno #T-402 del cajero. Boleta generada y caja discriminada por medio de pago.' },
        { label: 'Intentar anular venta o modificar precio manual', pass: false, msg: 'ALTO · REQUIERE PIN SUPERVISOR: Acción congelada. Notifica y registra intento #AUD-912 hasta autorización biométrica/PIN de Jefatura.' }
      ]
    },
    {
      id: 'operador',
      name: 'Cocina KDS / Bodega / Técnico / Ruta',
      tag: 'Nivel 02 · Ejecución Interna y Campo',
      token: 'Dispositivo Vinculado + Bitácora por Puesto',
      desc: 'Pantallas dedicadas y apps móviles offline para cocina, bodega WMS, mecánicos de bahía, médicos o choferes en reparto sin distracciones contables.',
      allowed: [
        'Marcar estados de comandas KDS por estación o preparar picking WMS',
        'Registrar ingresos de mercadería (o foto OCR), transferencias y lotes FEFO',
        'Capturar fotos de ingreso de taller o firma POD GPS de reparto en ruta sin señal'
      ],
      blocked: [
        'Acceso a flujos de caja, montos recaudados del día o emisión fiscal',
        'Eliminación retroactiva de transferencias o recetas estandarizadas',
        'Visualización de honorarios médicos o planilla administrativa'
      ],
      rule: 'Sincronización determinística mediante eventos idempotentes: cada toque deja marca de usuario, reloj local, coordenadas (en campo) y variación de inventario.',
      tests: [
        { label: 'Aprobar recepción de lote + traspaso a Tienda 2', pass: true, msg: 'APROBADO [KARDEX]: Acta de traslado #TR-119 emitida. Stock suma en tránsito hasta confirmación en sede destino.' },
        { label: 'Intentar consultar caja total en efectivo del turno', pass: false, msg: 'BLOQUEADO [RBAC DENY]: Módulo de Tesorería oculto del perfil Bodega/KDS.' }
      ]
    },
    {
      id: 'supervisor',
      name: 'Jefe de Piso / Subgerencia',
      tag: 'Nivel 03 · Auditoría y Desbloqueo',
      token: 'Sesión JWT + PIN Dinámico de Autorización',
      desc: 'Controla el cumplimiento diario de su sede, autoriza excepciones operativas en tiempo real y recibe alertas tempranas antes de que existan mermas o demoras.',
      allowed: [
        'Aprobar notas de crédito, cortesías VIP y descuentos con registro en bitácora',
        'Revisar diferencias exactas entre arqueo declarado por cajero vs sistema',
        'Monitorear semáforos SLA de cocina/expedientes y alertas de quiebre o caducidad'
      ],
      blocked: [
        'Borrar registros de bitácora inmutable de auditoría o manipular XML firmado',
        'Reasignar propiedad fiscal de la empresa o credenciales maestras OSE',
        'Acceder a cuentas bancarias consolidados de sedes ajenas a su alcance'
      ],
      rule: 'Toda elevación por PIN firma un log inmutable (autorizador + solicitante + motivo + timestamp). Las diferencias de arqueo disparan alerta automática a gerencia.',
      tests: [
        { label: 'Autorizar Nota de Crédito con PIN de Sede', pass: true, msg: 'APROBADO [AUDITADO]: PIN validado. Nota de Crédito NC01-0112 emitida a OSE; evento trazado en bitácora inmutable.' },
        { label: 'Intentar eliminar historial de auditoría del día', pass: false, msg: 'INMUTABLE [APPEND-ONLY]: Los logs de auditoría son solo escritura/lectura; eliminación bloqueada incluso para Jefatura.' }
      ]
    },
    {
      id: 'gerencia',
      name: 'Gerencia General / Directorio',
      tag: 'Nivel 04 · Dirección Total Multi-Sede',
      token: 'MFA + Llave Maestra de Consolidado Ejecutivo',
      desc: 'Visión panorámica en tiempo real de todas las sedes, utilidad neta descontando costos reales, flujo de caja consolidado y alertas antifraude sin esperar reportes manuales.',
      allowed: [
        'Auditar rentabilidad neta por producto, plato, médico o proyecto inmobiliario',
        'Consultar trazabilidad completa de anulaciones, mermas, SLA y bitácora RBAC',
        'Exportar libros electrónicos contables, configurar reglas de precios y permisos'
      ],
      blocked: [
        'Ninguna restricción de consulta ejecutiva; cambios estructurales quedan firmados por auditoría',
        'Integridad histórica: inclusive gerencia preserva el rastro fiscal XML ante SUNAT'
      ],
      rule: 'Acceso consolidado multi-sede con exportación automatizada contable y trazabilidad forense de extremo a extremo sobre cada operación.',
      tests: [
        { label: 'Consultar P&L neto consolidado de 4 sedes en vivo', pass: true, msg: 'APROBADO [EJECUTIVO]: Tablero multi-sede compilado en tiempo real descontando costo Kardex/Recetas, IGV y comisiones pasarela.' },
        { label: 'Auditar reporte de anomalías y PINs usados hoy', pass: true, msg: 'APROBADO [FORENSE]: 100% de acciones de excepción con motivo, usuario y delta de inventario exportados en CSV/PDF.' }
      ]
    }
  ];

  /* --------------------------------------------------------------------------
     3. Before / After Domains
     -------------------------------------------------------------------------- */
  const BA_DOMAINS = [
    {
      id: 'stock',
      tab: 'Stock Online vs Tienda',
      legacyTitle: 'Catálogo web desfasado y ventas fantasma',
      legacyDesc: 'El e-commerce muestra unidades ya vendidas en tienda física. El equipo descubre el quiebre al día siguiente y debe cancelar pedidos por WhatsApp.',
      legacyStat: '⚠ Error frecuente: 8% a 14% de pedidos con cruce manual',
      zaphyTitle: 'Inventario único bloqueado atómicamente',
      zaphyDesc: 'Cada compra web o cobro en POS bloquea el SKU en < 180 ms y actualiza simultáneamente tienda física, bodega y vitrina pública.',
      zaphyStat: '✓ Garantía operativa: 0% sobreventa entre web y caja física'
    },
    {
      id: 'caja',
      tab: 'Cierre de Caja & Fugas',
      legacyTitle: 'Cuadres manuales en Excel al final del turno',
      legacyDesc: 'El cajero conoce de antemano cuánto debería haber vendido y ajusta faltantes o anulaciones verbales sin registro de quién autorizó.',
      legacyStat: '⚠ Fuga invisible: +45 min diarios por turno cuadrando tickets',
      zaphyTitle: 'Arqueo Ciego + Bitácora por PIN',
      zaphyDesc: 'Cajero declara lo contado por medio de pago (Efectivo/Yape/POS) sin ver el teórico; toda anulación o descuento requiere PIN supervisor auditado.',
      zaphyStat: '✓ Cierre en 3 min · 100% de excepciones auditadas'
    },
    {
      id: 'cocina',
      tab: 'Cocina / Barra & Insumos',
      legacyTitle: 'Comandas perdidas y merma de licor o carne sin explicar',
      legacyDesc: 'Pedidos cantados a gritos o papelitos en cocina; al fin de mes faltan botellas o insumos clave pero nadie sabe qué estación falló.',
      legacyStat: '⚠ Desperdicio no rastreado: 6% a 11% sobre costo real',
      zaphyTitle: 'KDS por Estación + Descarga Automática por Receta',
      zaphyDesc: 'Cada plato o trago se rutea con cronómetro a su estación (Caliente/Fríos/Barra) y descuenta gramos o mililitros exactos del economato al cobrarse.',
      zaphyStat: '✓ Trazabilidad exacta receta vs consumo físico'
    },
    {
      id: 'auditoria',
      tab: 'Fiscal, Ruta & Offline',
      legacyTitle: 'Digitación doble SUNAT, entregas sin prueba y caídas de red',
      legacyDesc: 'Boletas pasadas a mano al portal al cierre del día, choferes enviando fotos sueltas al WhatsApp personal y ventas detenidas si cae la fibra.',
      legacyStat: '⚠ Demora tributaria, reclamos sin sustento y colas congeladas',
      zaphyTitle: 'SUNAT UBL 2.1 nativo + POD GPS + Cola Offline IndexedDB',
      zaphyDesc: 'Comprobantes XML y Guías Electrónicas firmadas al instante, app de reparto con foto/firma geolocalizada y operación local ininterrumpida ante cortes.',
      zaphyStat: '✓ Continuidad 100% ante cortes · Evidencia GPS & XML'
    },
    {
      id: 'bots',
      tab: 'Bots WhatsApp, n8n & OCR',
      legacyTitle: 'Horas digitando facturas en Excel y cobros olvidados a mano',
      legacyDesc: 'Asistentes tipeando factura por factura del mayorista, pacientes plantando citas médicas y renovaciones vencidas porque nadie escribió a tiempo.',
      legacyStat: '⚠ Horas operativas perdidas y fuga silenciosa de clientes',
      zaphyTitle: 'Lectura OCR de Facturas + Flujos n8n & WhatsApp 24/7',
      zaphyDesc: 'Foto de factura convierte ítems directo a borrador de Kardex; bots recuerdan citas, vacunas, mantenimientos o cuotas y rellenan huecos vacíos.',
      zaphyStat: '✓ Sistema autónomo trabajando 24/7 con alertas al dueño'
    },
    {
      id: 'acceso',
      tab: 'Torniquetes, Taller & Clientes 24/7',
      legacyTitle: 'Socios debiendo en molinete o clientes llamando por estado',
      legacyDesc: 'Recepción frenando manualmente socios en mora, clientes llamando cada 2 horas al taller o estudio contable pidiendo estados de cuenta por chat.',
      legacyStat: '⚠ Fricción en recepción y saturación de llamadas urgentes',
      zaphyTitle: 'Validación QR Instantánea + Portal Auto-Servicio en Vivo',
      zaphyDesc: 'El torniquete valida vigencia en 120 ms, y clientes ven su vehículo en taller, sus PDT/boletas o su entrega en ruta por un enlace QR seguro.',
      zaphyStat: '✓ Cero colas repetitivas · Confianza en tiempo real'
    }
  ];

  /* --------------------------------------------------------------------------
     State & Event Bus Logic
     -------------------------------------------------------------------------- */
  let curFlow = 'retail';
  let netMode = 'online'; // 'online' | 'offline' | 'sync'
  let offlineQueue = [];
  let selectedNodeIdx = 0;
  let inspTab = 'human'; // 'human' | 'json' | 'db'
  let runTimer = null;
  let autoCycleTimer = null;
  let bpAutoTimer = null;
  let curRbacId = 'cajero';
  let syncCounts = { sales: 148, kardex: 412, ose: 148 };

  function renderFlowStage() {
    const s = FLOW_SCENARIOS[curFlow] || FLOW_SCENARIOS.retail;
    const pipe = $('#flowPipeline');
    if (!pipe) return;

    pipe.innerHTML = s.nodes.map((n, i) => {
      const nodeHtml = `
        <button type="button" class="eco-fnode ${i === selectedNodeIdx ? 'selected' : ''}" id="fn${i + 1}" data-node-idx="${i}">
          <div class="eco-fn-top">
            <small>${esc(n.k)}</small>
            <span class="eco-fn-lat">${esc(n.lat)}</span>
          </div>
          <b>${esc(n.t)}</b>
          <span>${esc(n.s)}</span>
          <div class="eco-fn-state">
            <i class="eco-fn-dot" aria-hidden="true"></i>
            <em data-node-status>${netMode === 'offline' ? 'Cola local lista' : 'En espera'}</em>
          </div>
        </button>`;
      const conduitHtml = i < s.nodes.length - 1 ? `
        <div class="eco-conduit" id="fc${i + 1}" aria-hidden="true">
          <svg viewBox="0 0 28 18">
            <defs>
              <linearGradient id="ecoBeamGrad${i}" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#81BDF8"/>
                <stop offset="50%" stop-color="#D5BEFF"/>
                <stop offset="100%" stop-color="#FF9AFF"/>
              </linearGradient>
            </defs>
            <line class="eco-conduit-base" x1="1" y1="9" x2="27" y2="9"/>
            <line class="eco-conduit-flow" x1="1" y1="9" x2="27" y2="9" stroke="url(#ecoBeamGrad${i})"/>
          </svg>
        </div>` : '';
      return nodeHtml + conduitHtml;
    }).join('');
  }

  function renderInspector() {
    const body = $('#ecoInspectorBody');
    if (!body) return;
    const s = FLOW_SCENARIOS[curFlow] || FLOW_SCENARIOS.retail;
    const n = s.nodes[selectedNodeIdx] || s.nodes[0];

    if (inspTab === 'human') {
      body.innerHTML = `
        <div class="eco-insp-grid">
          <div class="eco-insp-box">
            <small>SUPERFICIE / PANTALLA ACTIVA</small>
            <b>${esc(n.screen)}</b>
          </div>
          <div class="eco-insp-box">
            <small>CANDADO / REGLA ATÓMICA</small>
            <b>${esc(n.lock)}</b>
          </div>
        </div>
        <div class="eco-insp-box" style="margin-top:8px">
          <small>ESTADO DE RED SELECCIONADO</small>
          <span>${netMode === 'offline'
            ? 'Corte LAN/Internet simulado: transacciones firmadas se almacenan en IndexedDB local hasta recuperar enlace.'
            : netMode === 'sync'
              ? 'Reconexión activa: reconciliando paquetes diferidos y emitiendo comprobantes pendientes hacia OSE.'
              : 'Conectividad simétrica en tiempo real: WebSocket + persistencia ACID entre todas las áreas.'}</span>
        </div>`;
    } else if (inspTab === 'json') {
      const payload = {
        ...s.json,
        modo_red: netMode.toUpperCase(),
        cola_local_pendiente: offlineQueue.length,
        nodo_enfocado: n.k
      };
      body.innerHTML = `<pre class="eco-json">${esc(JSON.stringify(payload, null, 2))}</pre>`;
    } else {
      body.innerHTML = `
        <div class="eco-insp-box">
          <small>SENTENCIA TRANSACCIONAL EN NODO (${esc(n.k)})</small>
          <pre class="eco-json" style="margin-top:6px">BEGIN ISOLATION LEVEL SERIALIZABLE;\n${esc(n.db)};\nCOMMIT; -- ${esc(n.lat)}</pre>
        </div>`;
    }
  }

  function appendTrace(timeStr, title, detail) {
    const list = $('#flowTraceList');
    if (!list) return;
    const li = document.createElement('li');
    li.className = 'eco-trace-item';
    li.innerHTML = `<time>${esc(timeStr)}</time><div><b>${esc(title)}</b><span>${esc(detail)}</span></div>`;
    list.prepend(li);
    while (list.children.length > 8) list.removeChild(list.lastElementChild);
  }

  function updateQueueBadge() {
    const pill = $('#ecoQueuePill');
    if (!pill) return;
    pill.textContent = `Cola Offline: ${offlineQueue.length} txn`;
    pill.classList.toggle('has-q', offlineQueue.length > 0);
  }

  function runEventSimulation(silent = false) {
    clearInterval(runTimer);
    renderFlowStage();
    const s = FLOW_SCENARIOS[curFlow] || FLOW_SCENARIOS.retail;
    const trace = $('#flowTraceList');
    if (trace) trace.innerHTML = '';

    // Handle offline vs sync behavior cleanly
    if (netMode === 'offline') {
      offlineQueue.push({ id: s.txId, at: new Date().toLocaleTimeString('es-PE', { hour12: false }) });
      updateQueueBadge();
    }

    let step = 0;
    const latBadge = $('#ecoLatencyBadge');
    if (latBadge) {
      latBadge.textContent = netMode === 'offline' ? 'Modo Local (0 ms LAN)' : 'Trazando salto 1/5…';
    }

    const advance = () => {
      if (step >= 5) {
        clearInterval(runTimer);
        if (netMode === 'sync' && offlineQueue.length > 0) {
          const drained = offlineQueue.length;
          offlineQueue = [];
          updateQueueBadge();
          appendTrace('+210 ms', `Sincronía Completa (${drained} cola)`, 'Paquetes IndexedDB reconciliados en nube y validados ante SUNAT OSE sin colisiones.');
        } else if (netMode === 'offline') {
          appendTrace('LOCAL', `${s.txId} Encolado`, s.offlineMsg);
        }
        if (latBadge) {
          latBadge.textContent = netMode === 'offline' ? `Cola Offline: ${offlineQueue.length} txn` : `Completado · ${s.nodes[4].lat.replace('+', '')}`;
        }
        return;
      }

      const idx = step;
      selectedNodeIdx = idx;
      const fn = $(`#fn${idx + 1}`);
      const fc = $(`#fc${idx}`);
      $$('#flowPipeline .eco-fnode').forEach((n, i) => n.classList.toggle('selected', i === idx));

      if (fc) fc.classList.add('active');
      if (fn) {
        const isQueuedCloud = netMode === 'offline' && (idx === 1 || idx === 4);
        fn.classList.add(isQueuedCloud ? 'offline-queued' : 'lit');
        const st = fn.querySelector('[data-node-status]');
        if (st) st.textContent = isQueuedCloud ? 'En cola IndexedDB' : 'Sincronizado ✓';
      }

      const n = s.nodes[idx];
      appendTrace(n.lat, n.t, n.screen);
      renderInspector();
      step++;
    };

    advance();
    runTimer = setInterval(advance, 240);
    if (!silent) ping(0.08);
  }

  /* --------------------------------------------------------------------------
     4. RBAC Renderer & Live Guard Test
     -------------------------------------------------------------------------- */
  function renderRbacRail() {
    const rail = $('#rbacRoleRail');
    if (!rail) return;
    rail.innerHTML = `<div class="atlas-rail-hd" style="font:600 9.5px/1 var(--mono);letter-spacing:0.14em;color:var(--ink-soft);padding:4px 8px 8px;border-bottom:1px solid var(--line);margin-bottom:2px;display:flex;justify-content:space-between"><span>PERFILES RBAC</span><span>5 NIVELES</span></div>` +
      RBAC_ROLES.map(r => `
        <button type="button" class="eco-rbac-btn" data-role-id="${r.id}" role="tab" aria-selected="${r.id === curRbacId ? 'true' : 'false'}">
          <span>
            <strong>${esc(r.name)}</strong>
            <small>${esc(r.tag.split('·')[0].trim())}</small>
          </span>
          <span style="font:600 10px/1 var(--mono);opacity:0.7">→</span>
        </button>
      `).join('');
  }

  function renderRbacStage(animate = true) {
    const stage = $('#rbacStage');
    if (!stage) return;
    const r = RBAC_ROLES.find(x => x.id === curRbacId) || RBAC_ROLES[0];
    if (animate) {
      stage.classList.remove('anim');
      void stage.offsetWidth;
      stage.classList.add('anim');
    }

    stage.innerHTML = `
      <div class="rbac-stage-hd">
        <div>
          <span class="badge ok" style="margin-bottom:6px;display:inline-block">${esc(r.tag)}</span>
          <h3>${esc(r.name)}</h3>
          <p>${esc(r.desc)}</p>
        </div>
        <span class="eco-fn-lat" style="padding:6px 11px;font-size:10.5px">${esc(r.token)}</span>
      </div>

      <div class="rbac-cols">
        <div class="rbac-card">
          <h4>PANTALLAS Y ACCIONES HABILITADAS</h4>
          <ul class="rbac-list ok">${r.allowed.map(a => `<li><span>${esc(a)}</span></li>`).join('')}</ul>
        </div>
        <div class="rbac-card">
          <h4>RESTRICCIONES ESTRICTAS (CERO ACCESO)</h4>
          <ul class="rbac-list deny">${r.blocked.map(b => `<li><span>${esc(b)}</span></li>`).join('')}</ul>
        </div>
        <div class="rbac-card">
          <h4>MECANISMO CRIPTOGRÁFICO Y CONTROL</h4>
          <p style="font-size:12.8px;line-height:1.5;color:var(--ink)">${esc(r.rule)}</p>
        </div>
      </div>

      <div class="rbac-test-box">
        <span style="font:600 9.5px/1 var(--mono);letter-spacing:0.13em;text-transform:uppercase;color:var(--ink-soft)">BANCO DE PRUEBA ANTIFRAUDE EN VIVO</span>
        <div class="rbac-test-btns">
          ${r.tests.map((t, ti) => `<button type="button" class="btn sm ${ti === 0 ? 'pri' : ''}" data-rbac-test="${ti}">${esc(t.label)}</button>`).join('')}
        </div>
        <div class="rbac-test-result" id="rbacTestResult" aria-live="polite">Selecciona una acción de prueba arriba para validar cómo responde la política de seguridad del perfil ${esc(r.name)}.</div>
      </div>`;
  }

  /* --------------------------------------------------------------------------
     5. Isometric Blueprint Auto-Tour & Before/After Switcher
     -------------------------------------------------------------------------- */
  const BP_PROTOS = {
    all: ['PostgreSQL ACID', 'WebSocket Pub/Sub', 'SUNAT UBL 2.1', 'IndexedDB Cola Local'],
    l4: ['WebGL 3D Browser', 'E-commerce Checkout', 'Portal Cliente & QR 24/7', 'QR Wallet Pass'],
    l3: ['ESC/POS 80mm LAN', 'Lector USB / PDA 2D', 'Cocina KDS WebSocket', 'Arqueo Ciego PIN'],
    l2: ['Kardex FIFO / FEFO', 'Escandallo Recetas', 'Actas Campo GPS', 'Inventarios Tragos'],
    l1: ['OSE Certificado X.509', 'Conciliación Yape/POS', 'P&L Multi-Sede', 'Bitácora Append-Only']
  };

  function setBpFocus(layer) {
    const bp = $('#blueprint');
    const pills = $('#bpProtocols');
    if (!bp) return;
    bp.dataset.focus = layer;
    $$('#pillarList .pillar').forEach(p => p.classList.toggle('active', p.dataset.layer === layer));
    if (layer !== 'all') {
      bp.classList.add('exploded');
      if ($('#bpExplode')) $('#bpExplode').textContent = 'Compactar capas';
    }
    const activeP = layer === 'all' ? null : $(`#pillarList .pillar[data-layer="${layer}"]`);
    if ($('#bpCap')) {
      $('#bpCap').textContent = activeP ? activeP.dataset.cap : 'Todas las capas operan sincronizadas sobre un núcleo único con cola Offline-First.';
    }
    if (pills) {
      const list = BP_PROTOS[layer] || BP_PROTOS.all;
      pills.innerHTML = list.map(t => `<span class="bp-proto-pill">${esc(t)}</span>`).join('');
    }
  }

  function renderBeforeAfter(id) {
    const tabs = $('#baTabs');
    const stage = $('#baCompareGrid');
    const d = BA_DOMAINS.find(x => x.id === id) || BA_DOMAINS[0];
    if (tabs) {
      $$('#baTabs button[data-ba]').forEach(b => b.classList.toggle('on', b.dataset.ba === d.id));
    }
    if (stage) {
      stage.innerHTML = `
        <article class="ba-panel legacy">
          <small>MODELO TRADICIONAL FRAGMENTADO</small>
          <h3>${esc(d.legacyTitle)}</h3>
          <p>${esc(d.legacyDesc)}</p>
          <div class="ba-metric-bar">${esc(d.legacyStat)}</div>
        </article>
        <article class="ba-panel zaphyrel">
          <small>ARQUITECTURA UNIFICADA ZAPHYREL</small>
          <h3>${esc(d.zaphyTitle)}</h3>
          <p>${esc(d.zaphyDesc)}</p>
          <div class="ba-metric-bar">${esc(d.zaphyStat)}</div>
        </article>`;
    }
  }

  /* --------------------------------------------------------------------------
     6. Init & Event Bindings
     -------------------------------------------------------------------------- */
  function init() {
    renderFlowStage();
    renderInspector();
    updateQueueBadge();
    renderRbacRail();
    renderRbacStage(false);
    setBpFocus('l4');

    const baTabs = $('#baTabs');
    if (baTabs) {
      baTabs.innerHTML = BA_DOMAINS.map((d, i) => `<button class="chip ${i === 0 ? 'on' : ''}" type="button" data-ba="${d.id}">${esc(d.tab)}</button>`).join('');
      renderBeforeAfter(BA_DOMAINS[0].id);
      baTabs.addEventListener('click', (e) => {
        const b = e.target.closest('button[data-ba]');
        if (!b) return;
        renderBeforeAfter(b.dataset.ba);
        ping(0.05);
      });
    }

    // Event Bus vertical tabs
    $('#flowTabs')?.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-flow]');
      if (!b) return;
      clearInterval(runTimer);
      clearInterval(autoCycleTimer);
      if ($('#flowAutoBtn')) {
        $('#flowAutoBtn').setAttribute('aria-pressed', 'false');
        $('#flowAutoBtn').textContent = '▶ Auto-simular';
      }
      $$('#flowTabs button').forEach(x => x.classList.toggle('on', x === b));
      curFlow = b.dataset.flow;
      selectedNodeIdx = 0;
      renderFlowStage();
      renderInspector();
      if ($('#flowTraceList')) {
        $('#flowTraceList').innerHTML = '<li class="eco-trace-item"><time>LISTO</time><div><b>Escenario cargado</b><span>Presiona Disparar Evento para trazar los 5 saltos entre áreas.</span></div></li>';
      }
      ping(0.06);
    });

    // Network Mode 3-way switch
    $('#netModeSwitch')?.addEventListener('click', (e) => {
      const b = e.target.closest('.eco-net-btn[data-net]');
      if (!b) return;
      netMode = b.dataset.net;
      $$('#netModeSwitch .eco-net-btn').forEach(x => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
      renderFlowStage();
      renderInspector();
      if (netMode === 'sync' && offlineQueue.length > 0) {
        runEventSimulation();
      }
      ping(0.07);
    });

    // Clickable nodes for inspection
    $('#flowPipeline')?.addEventListener('click', (e) => {
      const fn = e.target.closest('.eco-fnode[data-node-idx]');
      if (!fn) return;
      selectedNodeIdx = Number(fn.dataset.nodeIdx) || 0;
      $$('#flowPipeline .eco-fnode').forEach((x, i) => x.classList.toggle('selected', i === selectedNodeIdx));
      renderInspector();
      ping(0.045);
    });

    // Inspector mode tabs
    $('#inspectorModeTabs')?.addEventListener('click', (e) => {
      const b = e.target.closest('.eco-insp-tab[data-imode]');
      if (!b) return;
      inspTab = b.dataset.imode;
      $$('#inspectorModeTabs .eco-insp-tab').forEach(x => x.setAttribute('aria-selected', x === b ? 'true' : 'false'));
      renderInspector();
      ping(0.045);
    });

    $('#flowRunBtn')?.addEventListener('click', () => runEventSimulation(false));

    $('#flowAutoBtn')?.addEventListener('click', (e) => {
      const btn = e.currentTarget;
      if (autoCycleTimer) {
        clearInterval(autoCycleTimer);
        autoCycleTimer = null;
        btn.setAttribute('aria-pressed', 'false');
        btn.textContent = '▶ Auto-simular';
      } else {
        btn.setAttribute('aria-pressed', 'true');
        btn.textContent = '❚❚ Pausar ciclo';
        runEventSimulation(true);
        const keys = Object.keys(FLOW_SCENARIOS);
        autoCycleTimer = setInterval(() => {
          const next = keys[(keys.indexOf(curFlow) + 1) % keys.length];
          curFlow = next;
          $$('#flowTabs button').forEach(x => x.classList.toggle('on', x.dataset.flow === next));
          runEventSimulation(true);
        }, 3200);
      }
      ping(0.06);
    });

    // RBAC switcher & Guard test
    $('#rbacRoleRail')?.addEventListener('click', (e) => {
      const b = e.target.closest('.eco-rbac-btn[data-role-id]');
      if (!b) return;
      curRbacId = b.dataset.roleId;
      $$('#rbacRoleRail .eco-rbac-btn').forEach(x => x.setAttribute('aria-selected', x === b ? 'true' : 'false'));
      renderRbacStage(true);
      ping(0.06);
    });

    $('#rbacStage')?.addEventListener('click', (e) => {
      const tb = e.target.closest('[data-rbac-test]');
      if (!tb) return;
      const r = RBAC_ROLES.find(x => x.id === curRbacId);
      const item = r?.tests[Number(tb.dataset.rbacTest)];
      const res = $('#rbacTestResult');
      if (item && res) {
        res.className = `rbac-test-result ${item.pass ? 'pass' : 'block'}`;
        res.textContent = item.msg;
        ping(item.pass ? 0.06 : 0.09);
      }
    });

    // Blueprint controls
    $('#bpExplode')?.addEventListener('click', () => {
      const bp = $('#blueprint');
      if (!bp) return;
      const exp = bp.classList.toggle('exploded');
      $('#bpExplode').textContent = exp ? 'Compactar capas' : 'Despiezar capas';
      ping(0.07);
    });

    $('#bpFocusReset')?.addEventListener('click', () => {
      clearInterval(bpAutoTimer);
      bpAutoTimer = null;
      if ($('#bpAutoBtn')) $('#bpAutoBtn').setAttribute('aria-pressed', 'false');
      setBpFocus('all');
      ping(0.05);
    });

    $('#bpAutoBtn')?.addEventListener('click', (e) => {
      const btn = e.currentTarget;
      const order = ['l4', 'l3', 'l2', 'l1'];
      if (bpAutoTimer) {
        clearInterval(bpAutoTimer);
        bpAutoTimer = null;
        btn.setAttribute('aria-pressed', 'false');
        btn.textContent = '▶ Recorrer';
      } else {
        let i = 0;
        btn.setAttribute('aria-pressed', 'true');
        btn.textContent = '❚❚ Pausar';
        setBpFocus(order[0]);
        bpAutoTimer = setInterval(() => {
          i = (i + 1) % order.length;
          setBpFocus(order[i]);
        }, 2000);
      }
      ping(0.06);
    });

    $('#pillarList')?.addEventListener('click', (e) => {
      const p = e.target.closest('.pillar[data-layer]');
      if (!p) return;
      clearInterval(bpAutoTimer);
      bpAutoTimer = null;
      if ($('#bpAutoBtn')) {
        $('#bpAutoBtn').setAttribute('aria-pressed', 'false');
        $('#bpAutoBtn').textContent = '▶ Recorrer';
      }
      setBpFocus(p.dataset.layer);
      ping(0.06);
    });

    // Upgraded Dept Sync Bar
    $('#syncFireBtn')?.addEventListener('click', () => {
      const bar = $('#syncBar');
      const nodes = [$('#sn1'), $('#sn2'), $('#sn3')];
      if (!bar) return;
      nodes.forEach(n => n?.classList.remove('lit'));
      bar.classList.add('firing');
      syncCounts.sales += 1;
      syncCounts.kardex += 2;
      syncCounts.ose += 1;

      nodes.forEach((n, i) => {
        setTimeout(() => {
          n?.classList.add('lit');
          if (i === 0 && $('#scSales')) $('#scSales').textContent = `${syncCounts.sales} txns (+S/ 240)`;
          if (i === 1 && $('#scKardex')) $('#scKardex').textContent = `${syncCounts.kardex} movs (-2 unid)`;
          if (i === 2 && $('#scOse')) $('#scOse').textContent = `${syncCounts.ose} XML OSE OK`;
        }, i * 210);
      });
      setTimeout(() => {
        bar.classList.remove('firing');
        nodes.forEach(n => n?.classList.remove('lit'));
      }, 2100);
      ping(0.08);
    });

    // Run one crisp silent initial event wave subtly on load
    setTimeout(() => runEventSimulation(true), 360);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
