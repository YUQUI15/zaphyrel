(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const shell = window.__zaphyrelShell || { ping: () => {}, esc: s => String(s) };
  const ping = v => shell.ping(v);
  const esc = s => shell.esc(s);

  const toast = m => {
    const t = $('#toast');
    if (!t) return;
    t.textContent = m;
    t.classList.add('show');
    clearTimeout(toast.k);
    toast.k = setTimeout(() => t.classList.remove('show'), 2700);
    ping(0.15);
  };

  const modLabels = {
    table: 'Restaurante POS',
    retail: 'Tiendas & Cadenas Retail',
    club: 'Discotecas, Puerta QR & Barra',
    muni: 'Municipalidades & Ventanilla QR',
    show3d: 'Showroom 3D / 360°',
    shop: 'Catálogo Web & WhatsApp',
    stay: 'Hotel PMS & 360°',
    care: 'Clínica y Citas',
    fit: 'Gimnasio QR',
    stock: 'Inventario Kardex',
    ledger: 'Cuentas Globales',
    lib: 'Instituto / Biblioteca'
  };

  let activeMod = 'table', simOffline = false;
  const offlineQueue = [];

  function switchTab(id) {
    if (!$('#p-' + id)) return;
    activeMod = id;
    $$('.tab').forEach(x => x.setAttribute('aria-selected', x.dataset.t === id));
    $$('.panel-demo').forEach(p => p.classList.toggle('on', p.id === 'p-' + id));
    const nm = $('#osCurrentModName');
    if (nm) nm.textContent = modLabels[id] || id;
    if (id === 'show3d' && window.__wakeShowroom) window.__wakeShowroom();
  }

  $$('.tab').forEach(b => b.addEventListener('click', () => { switchTab(b.dataset.t); ping(0.1); }));
  $('#globalCashPill')?.addEventListener('click', () => { switchTab('ledger'); ping(0.12); });

  $('#osToContactBtn')?.addEventListener('click', () => {
    const biz = $('#bizName')?.value.trim() || '';
    const q = new URLSearchParams({ mod: activeMod, ...(biz ? { biz } : {}) });
    location.href = '../cotizar/?' + q.toString();
  });

  $('#railFilter')?.addEventListener('input', e => {
    const q = e.target.value.trim().toLowerCase();
    $$('.tabs .tab').forEach(t => { t.style.display = t.textContent.toLowerCase().includes(q) ? 'flex' : 'none'; });
  });

  $('#vpDesk')?.addEventListener('click', () => {
    $('#pWrap').classList.remove('mobile');
    $('#vpDesk').setAttribute('aria-pressed', 'true');
    $('#vpMob').setAttribute('aria-pressed', 'false');
    ping(0.08);
  });
  $('#vpMob')?.addEventListener('click', () => {
    $('#pWrap').classList.add('mobile');
    $('#vpDesk').setAttribute('aria-pressed', 'false');
    $('#vpMob').setAttribute('aria-pressed', 'true');
    ping(0.08);
  });

  $('#bizName')?.addEventListener('input', e => {
    const v = e.target.value.trim() || 'Tu negocio';
    $$('.biz').forEach(el => { el.textContent = v; });
  });

  $$('[data-fin]').forEach(btn => btn.addEventListener('click', () => {
    document.documentElement.dataset.finish = btn.dataset.fin;
    $$('[data-fin]').forEach(x => x.classList.toggle('on', x === btn));
    ping(0.08);
  }));

  /* Simulador Offline-First + Ledger Global */
  function updateOfflineUI() {
    $('#offlineSimBtn')?.setAttribute('aria-pressed', simOffline);
    if ($('#netStatusDot')) $('#netStatusDot').textContent = simOffline ? '🟠 Sin Wi-Fi (Offline)' : '🟢 Red Local: Online';
    if ($('#offlineQCount')) $('#offlineQCount').textContent = `${offlineQueue.length} en cola`;
  }
  $('#offlineSimBtn')?.addEventListener('click', () => {
    simOffline = !simOffline;
    updateOfflineUI();
    if (!simOffline && offlineQueue.length) {
      const n = offlineQueue.length;
      while (offlineQueue.length) { const q = offlineQueue.shift(); applyRevenue(q.c, q.a); }
      updateOfflineUI();
      toast(`Red restablecida: ${n} operaciones sincronizadas sin duplicados`);
    } else {
      toast(simOffline ? 'Modo Offline simulado: las operaciones se guardan en cola local' : 'Modo Online activo');
    }
  });

  let sales = 1420, costs = 285, crossCount = 5, lastBal = '', bi = 0;
  const moves = [
    { t: 'in', c: 'Hotel · Suite 301 (Tour 360°)', a: 480 },
    { t: 'in', c: 'Tienda Retail · Ticket Boleta B001', a: 185 },
    { t: 'in', c: 'Discoteca · Box VIP + Botella', a: 340 },
    { t: 'in', c: 'Gimnasio · Renovación trimestral', a: 240 },
    { t: 'in', c: 'Restaurante · Mesa 4 (Yape)', a: 100 },
    { t: 'in', c: 'Muni · Derecho Licencia QR', a: 75 },
    { t: 'out', c: 'Compra insumos (Kardex)', a: 285 }
  ];

  const bars = [];
  if ($('#chart')) {
    for (let i = 0; i < 14; i++) {
      const b = document.createElement('i');
      if (i === 3 || i === 9) b.className = 'exp';
      b.style.height = (32 + ((i * 17) % 58)) + '%';
      $('#chart').append(b);
      bars.push(b);
    }
  }
  function pushBar(pct, isExp = false) {
    if (!bars.length) return;
    const b = bars[bi % 14];
    b.className = isExp ? 'exp' : '';
    b.style.height = Math.min(100, Math.max(14, Math.round(pct))) + '%';
    bi++;
  }

  function applyRevenue(concept, amt) {
    const v = Math.round(amt);
    crossCount++;
    sales += v;
    moves.unshift({ t: 'in', c: concept, a: v });
    pushBar(Math.min(100, Math.max(22, v / 3)), false);
    drawLedger();
    if ($('#cntSyncBadge')) $('#cntSyncBadge').textContent = `${crossCount} movs`;
    if ($('#globalCashVal')) $('#globalCashVal').textContent = `S/ ${sales.toLocaleString('es-PE')}.00`;
    if ($('#globalCashDelta')) $('#globalCashDelta').textContent = `[+S/ ${v} · ${concept.split(' · ')[0]}]`;
    const pill = $('#globalCashPill');
    if (pill) {
      pill.classList.add('flash');
      setTimeout(() => pill.classList.remove('flash'), 900);
    }
  }
  function pushCrossLedger(concept, amt) {
    if (simOffline) {
      offlineQueue.push({ c: concept, a: amt });
      updateOfflineUI();
      toast(`Sin Wi-Fi: ${concept} (+S/ ${Math.round(amt)}) guardado en cola local`);
      return;
    }
    applyRevenue(concept, amt);
  }

  /* ---------- 1. RESTAURANTE POS ---------- */
  const dishes = [
    { n: 'Ceviche clásico', c: 'Entrada', p: 38 },
    { n: 'Lomo saltado', c: 'Fondo', p: 42 },
    { n: 'Causa limeña', c: 'Entrada', p: 24 },
    { n: 'Chicha morada', c: 'Bebida', p: 10 }
  ];
  let order = [{ i: 1, q: 1, note: '' }, { i: 3, q: 1, note: '' }], mesa = 'Mesa 2', split = 2, tipPct = 0, tk = 1;
  let lastTicket = { id: 1, m: 'Mesa 4', items: '1× Ceviche · 1× Lomo · 2× Chicha', tot: 100, pay: 'Yape / Plin' };
  const activeTickets = [{ sec: 74, done: false, st: 1 }];
  if ($('#kitchen')) {
    $('#kitchen').innerHTML = `<div class="ticket"><div class="th"><span>#001 · MESA 4 · YAPE</span><span style="display:flex;gap:8px;align-items:center"><span class="tm-live" id="initTkTm">01:14</span><span class="st cook" id="initTkSt" title="Toca para avanzar estado">Preparando</span></span></div><div class="it"><span>1× Ceviche clásico · 1× Lomo saltado · 2× Chicha</span><b>S/ 100.00</b></div></div>`;
    activeTickets[0].tmEl = $('#initTkTm');
    const st = $('#initTkSt');
    if (st) st.onclick = () => { st.textContent = 'Listo'; st.className = 'st done'; activeTickets[0].done = true; refreshTkCount(); };
  }
  function refreshTkCount() { if ($('#tkCount')) $('#tkCount').textContent = `${activeTickets.filter(x => !x.done).length} activos`; }
  $('#mesaChips')?.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    mesa = b.dataset.m;
    $('#mesaTag').textContent = `${mesa} (Salón 3D)`;
    $$('#mesaChips .chip').forEach(c => c.classList.toggle('on', c === b));
    ping(0.08);
  });
  if ($('#menu')) {
    $('#menu').innerHTML = dishes.map((d, i) => `<button class="btn" type="button" data-i="${i}"><span class="item-meta"><span>${d.n}</span><span class="item-sub">${d.c}</span></span><small>S/ ${d.p}</small></button>`).join('');
  }
  function drawOrder() {
    if (!$('#order')) return;
    const sub = order.reduce((a, x) => a + dishes[x.i].p * x.q, 0), tot = sub * (1 + tipPct);
    $('#order').innerHTML = order.length ? order.map((x, k) => `<li><span class="li-main"><i class="li-dot" aria-hidden="true"></i><span>${dishes[x.i].n}${x.note ? ` <small style="color:var(--ink-soft)">(${esc(x.note)})</small>` : ''}</span></span><span class="li-acts"><span class="qpill"><button type="button" data-act="dec" data-k="${k}" aria-label="Restar unidad">−</button>${x.q}<button type="button" data-act="inc" data-k="${k}" aria-label="Sumar unidad">+</button></span><span style="font:500 12px var(--mono)">S/ ${(dishes[x.i].p * x.q).toFixed(2)}</span></span></li>`).join('') : '<li class="empty">Toca un plato para armar el siguiente pedido</li>';
    $('#tot').textContent = 'S/ ' + tot.toFixed(2);
    $('#splitV').textContent = 'S/ ' + (tot / split).toFixed(2);
    $('#send').disabled = !order.length;
  }
  drawOrder();
  $('#menu')?.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const idx = +b.dataset.i, nt = $('#dishNote').value.trim(); $('#dishNote').value = '';
    const f = order.find(x => x.i === idx && x.note === nt);
    if (f) f.q++; else order.push({ i: idx, q: 1, note: nt });
    drawOrder(); ping(0.08);
  });
  $('#order')?.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const k = +b.dataset.k, x = order[k];
    if (b.dataset.act === 'inc') x.q++; else if (--x.q <= 0) order.splice(k, 1);
    drawOrder(); ping(0.08);
  });
  $('#tipBtn')?.addEventListener('click', () => { tipPct = tipPct === 0 ? 0.10 : 0; $('#tipBtn').textContent = tipPct ? '10%' : '0%'; drawOrder(); ping(0.08); });
  $('#splitDec')?.addEventListener('click', () => { split = Math.max(1, split - 1); $('#splitN').textContent = split; drawOrder(); ping(0.08); });
  $('#splitInc')?.addEventListener('click', () => { split = Math.min(8, split + 1); $('#splitN').textContent = split; drawOrder(); ping(0.08); });
  setInterval(() => {
    if (!$('#p-table')?.classList.contains('on') || document.hidden) return;
    activeTickets.forEach(t => {
      if (!t.done) {
        t.sec++;
        const s = String(Math.floor(t.sec / 60)).padStart(2, '0') + ':' + String(t.sec % 60).padStart(2, '0');
        if (t.tmEl) t.tmEl.textContent = s;
      }
    });
  }, 1000);
  $('#send')?.addEventListener('click', () => {
    const k = $('#kitchen'), pay = $('#payMethod').value;
    const id = ++tk, m = mesa, itemsStr = order.map(x => `${x.q}× ${dishes[x.i].n}${x.note ? ` [${x.note}]` : ''}`).join(' · '), sub = order.reduce((a, x) => a + dishes[x.i].p * x.q, 0), tot = sub * (1 + tipPct);
    lastTicket = { id, m, items: itemsStr, tot, pay }; order = []; drawOrder(); $('#boletaBtn').disabled = false;
    const el = document.createElement('div'); el.className = 'ticket';
    el.innerHTML = `<div class="th"><span>#${String(id).padStart(3, '0')} · ${esc(m.toUpperCase())} · ${esc(pay.toUpperCase())}</span><span style="display:flex;gap:8px;align-items:center"><span class="tm-live">00:00</span><span class="st" title="Toca para avanzar">Recibido</span></span></div><div class="it"><span>${esc(itemsStr)}</span><b>S/ ${tot.toFixed(2)}</b></div>`;
    k.prepend(el);
    const rec = { sec: 0, done: false, tmEl: $('.tm-live', el), st: 0 }; activeTickets.push(rec); refreshTkCount();
    pushCrossLedger(`Restaurante · ${m} (${pay})`, tot);
    const st = $('.st', el), steps = [['Recibido', ''], ['Preparando', 'cook'], ['Listo', 'done']];
    const setSt = idx => { rec.st = idx; st.textContent = steps[idx][0]; st.className = 'st ' + steps[idx][1]; if (idx === 2) { rec.done = true; refreshTkCount(); } };
    st.onclick = () => setSt((rec.st + 1) % 3);
    setTimeout(() => { if (rec.st === 0) setSt(1); }, 2200);
    setTimeout(() => { if (rec.st < 2) setSt(2); }, 5600);
  });
  function showReceipt() {
    if (!lastTicket || !$('#boletaOut')) return;
    const biz = esc($('#bizName')?.value.trim() || 'Tu negocio'), ruc = $('#rucIn')?.value.trim() || '', base = lastTicket.tot / 1.18, igv = lastTicket.tot - base;
    $('#boletaOut').innerHTML = `<div class="boleta"><b>${ruc ? 'FACTURA ELECTRÓNICA F001' : 'BOLETA ELECTRÓNICA B001'}-${String(lastTicket.id).padStart(5, '0')} · SUNAT / OSE</b><br>${biz}${ruc ? ` · RUC ${esc(ruc)}` : ''} · Pago: ${esc(lastTicket.pay)}<br>Op. Gravada: S/ ${base.toFixed(2)} · IGV (18%): S/ ${igv.toFixed(2)} · <b>Total: S/ ${lastTicket.tot.toFixed(2)}</b></div>`;
  }
  showReceipt();
  $('#boletaBtn')?.addEventListener('click', () => { showReceipt(); toast('Comprobante SUNAT XML/PDF emitido'); ping(0.1); });

  /* ---------- 10. NUEVO: TIENDAS, MINIMARKETS & RETAIL PRO ---------- */
  const retailCatalog = [
    { cod: '77501201', n: 'Pack Café 500g + Filtro', c: 'Gourmet', p: 58, stock: 18 },
    { cod: '77501202', n: 'Audífonos BT Studio', c: 'Tecnología', p: 135, stock: 9 },
    { cod: '77501203', n: 'Termo Acero 750ml', c: 'Hogar', p: 49, stock: 24 },
    { cod: '77501204', n: 'Aceite Oliva Extra 500ml', c: 'Abarrotes', p: 36, stock: 15 }
  ];
  let rtCart = [{ item: retailCatalog[0], q: 1 }], rtScanIdx = 1;
  function drawRetail() {
    if (!$('#rtGrid')) return;
    const q = ($('#rtSearch')?.value || '').trim().toLowerCase();
    const list = retailCatalog.filter(x => !q || x.n.toLowerCase().includes(q) || x.cod.includes(q));
    $('#rtGrid').innerHTML = list.map(x => `<button class="btn" type="button" data-cod="${x.cod}" ${x.stock ? '' : 'disabled'}><span class="item-meta"><span>${esc(x.n)}</span><span class="item-sub">${x.cod} · ${x.stock} u.</span></span><small>S/ ${x.p}</small></button>`).join('');
    const tot = rtCart.reduce((a, x) => a + x.item.p * x.q, 0);
    $('#rtCart').innerHTML = rtCart.length ? rtCart.map((x, i) => `<li><span class="li-main"><i class="li-dot ok"></i><span>${esc(x.item.n)}</span></span><span class="li-acts"><span class="qpill"><button type="button" data-act="dec" data-i="${i}">−</button>${x.q}<button type="button" data-act="inc" data-i="${i}">+</button></span><span style="font:500 12px var(--mono)">S/ ${(x.item.p * x.q).toFixed(2)}</span></span></li>`).join('') : '<li class="empty">Escanea código de barras o toca un producto</li>';
    $('#rtTot').textContent = 'S/ ' + tot.toFixed(2);
    $('#rtPayBtn').disabled = !rtCart.length;
  }
  drawRetail();
  $('#rtSearch')?.addEventListener('input', drawRetail);
  $('#rtScanBtn')?.addEventListener('click', () => {
    const it = retailCatalog[rtScanIdx++ % retailCatalog.length];
    if (it.stock <= 0) { toast(`Sin stock para ${it.cod}`); return; }
    it.stock--;
    const f = rtCart.find(x => x.item === it);
    if (f) f.q++; else rtCart.push({ item: it, q: 1 });
    drawRetail();
    toast(`Escaneado [${it.cod}] ${it.n} · stock actualizado`);
  });
  $('#rtGrid')?.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const it = retailCatalog.find(x => x.cod === b.dataset.cod);
    if (!it || !it.stock) return;
    it.stock--;
    const f = rtCart.find(x => x.item === it);
    if (f) f.q++; else rtCart.push({ item: it, q: 1 });
    drawRetail(); ping(0.08);
  });
  $('#rtCart')?.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const x = rtCart[+b.dataset.i];
    if (b.dataset.act === 'inc' && x.item.stock > 0) { x.item.stock--; x.q++; }
    else if (b.dataset.act === 'dec') { x.item.stock++; if (--x.q <= 0) rtCart.splice(+b.dataset.i, 1); }
    drawRetail(); ping(0.08);
  });
  $('#rtPayBtn')?.addEventListener('click', () => {
    const tot = rtCart.reduce((a, x) => a + x.item.p * x.q, 0);
    const pay = $('#rtPayMethod')?.value || 'Yape / Plin';
    const units = rtCart.reduce((a, x) => a + x.q, 0);
    const fol = 'B001-' + String(Math.floor(4000 + Math.random() * 5000));
    $('#rtOut').innerHTML = `<div class="boleta"><b>VENTA RETAIL ${fol} · SUNAT OSE</b><br>${units} ítems · Pago: ${esc(pay)} · <b>Total: S/ ${tot.toFixed(2)}</b><br>✓ Stock descontado en Almacén y reflejado en Cuentas.</div>`;
    rtCart = [];
    drawRetail();
    pushCrossLedger(`Tienda Retail · ${pay}`, tot);
  });

  /* ---------- 11. NUEVO: DISCOTECAS, BARES & EVENTOS (PUERTA QR + BARRA ANTI-MERMA) ---------- */
  const passes = [
    { qr: 'VIP-8841', guest: 'Valeria Rojas (+3)', zone: 'Zona Box VIP', used: false },
    { qr: 'GEN-2109', guest: 'Mateo Díaz', zone: 'General Pista', used: false },
    { qr: 'VIP-7730', guest: 'Camila Paredes', zone: 'Mesa Terraza', used: true }
  ];
  const barDrinks = [
    { n: 'Botella Whisky 12A', z: 'Box VIP', p: 320, left: 14 },
    { n: 'Combo Ron + 2 Gaseosas', z: 'General', p: 180, left: 22 },
    { n: 'Gin Tonic Craft', z: 'Barra Principal', p: 34, left: 60 },
    { n: 'Pulsera Ingreso VIP', z: 'Puerta QR', p: 90, left: 45 }
  ];
  let clubAforo = 186, clubCap = 260, clubPassCursor = 0;
  function drawClub() {
    if (!$('#clubDoorList')) return;
    $('#clubAforo').textContent = `${clubAforo} / ${clubCap}`;
    $('#clubPct').textContent = Math.round((clubAforo / clubCap) * 100) + '%';
    $('#clubDoorList').innerHTML = passes.map((p, i) => `<li><span class="li-main"><i class="li-dot ${p.used ? 'warn' : 'ok'}"></i><span><b>${esc(p.qr)}</b> · ${esc(p.guest)}<div style="font-size:11px;color:var(--ink-soft)">${esc(p.zone)}</div></span></span><span class="badge ${p.used ? 'warn' : 'ok'}">${p.used ? 'Ya ingresó' : 'Válido'}</span></li>`).join('');
    $('#clubBarBtns').innerHTML = barDrinks.map((d, i) => `<button class="btn" type="button" data-i="${i}"><span class="item-meta"><span>${esc(d.n)}</span><span class="item-sub">${esc(d.z)} · ${d.left} stock</span></span><small>S/ ${d.p}</small></button>`).join('');
  }
  drawClub();
  $('#clubScanBtn')?.addEventListener('click', () => {
    const p = passes[clubPassCursor++ % passes.length];
    if (p.used) {
      $('#clubDoorAlert').innerHTML = `<div class="boleta" style="border-color:var(--c-orc)"><b>⚠ ALERTA ANTI-DUPLICADO</b><br>El QR <b>${esc(p.qr)}</b> (${esc(p.guest)}) ya fue validado en puerta. Bloqueado.</div>`;
      toast(`QR duplicado detectado: ${p.qr}`);
    } else {
      p.used = true;
      clubAforo = Math.min(clubCap, clubAforo + 1);
      $('#clubDoorAlert').innerHTML = `<div class="boleta"><b>✓ INGRESO VALIDADO · ${esc(p.zone)}</b><br>${esc(p.guest)} (${esc(p.qr)}) · Aforo sincronizado.</div>`;
      toast(`Pase ${p.qr} validado`);
    }
    drawClub();
  });
  $('#clubBarBtns')?.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const d = barDrinks[+b.dataset.i];
    if (d.left <= 0) return;
    d.left--;
    drawClub();
    pushCrossLedger(`Discoteca · ${d.n}`, d.p);
    toast(`Barra: ${d.n} (+S/ ${d.p}) · Kardex barra actualizado`);
  });

  /* ---------- 12. NUEVO: MUNICIPALIDADES & GESTIÓN PÚBLICA ---------- */
  const muniDocs = [
    { exp: 'EXP-2026-0418', title: 'Licencia Funcionamiento Comercial', area: 'Desarrollo Económico', st: 'En revisión técnica', fee: 145 },
    { exp: 'EXP-2026-0419', title: 'Inspección ITSE Defensa Civil', area: 'Fiscalización Campo', st: 'Inspector en ruta QR', fee: 190 },
    { exp: 'EXP-2026-0415', title: 'Conformidad Obra Menor', area: 'Obras Privadas', st: 'Aprobado · QR emitido', fee: 220 }
  ];
  const muniFlowSteps = ['Mesa de Partes', 'En revisión técnica', 'Inspector en ruta QR', 'Aprobado · QR emitido'];
  function drawMuni() {
    if (!$('#muniList')) return;
    $('#muniList').innerHTML = muniDocs.map((d, i) => `<div class="ticket" style="cursor:pointer" data-i="${i}" role="button" tabindex="0"><div class="th"><span>${d.exp} · ${esc(d.area.toUpperCase())}</span><span class="st ${d.st.startsWith('Aprobado') ? 'done' : 'cook'}">${esc(d.st)}</span></div><div class="it"><span>${esc(d.title)}</span><span style="font-size:11px">Avanzar etapa →</span></div></div>`).join('');
  }
  drawMuni();
  $('#muniForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const title = $('#muniTitle')?.value.trim() || 'Licencia Comercial / TUPA';
    const area = $('#muniArea')?.value || 'Fiscalización Campo';
    const fee = area === 'Obras Privadas' ? 220 : area === 'Fiscalización Campo' ? 190 : 120;
    const exp = 'EXP-2026-' + String(Math.floor(420 + Math.random() * 500)).padStart(4, '0');
    muniDocs.unshift({ exp, title, area, st: 'Mesa de Partes', fee });
    if ($('#muniTitle')) $('#muniTitle').value = '';
    drawMuni();
    pushCrossLedger(`Muni · ${exp} (${area})`, fee);
    $('#muniQrOut').innerHTML = `<div class="boleta"><b>CARGO ELECTRÓNICO ${exp}</b><br>Trámite: ${esc(title)} · Derivado a: <b>${esc(area)}</b> · QR verificable activo para ciudadano e inspector.</div>`;
    toast(`Expediente ${exp} radicado y derivado`);
  });
  $('#muniList')?.addEventListener('click', e => {
    const t = e.target.closest('[data-i]'); if (!t) return;
    const d = muniDocs[+t.dataset.i];
    const nxt = (muniFlowSteps.indexOf(d.st) + 1) % muniFlowSteps.length;
    d.st = muniFlowSteps[nxt];
    drawMuni();
    $('#muniQrOut').innerHTML = `<div class="boleta"><b>VERIFICACIÓN QR · ${d.exp}</b><br>Área: ${esc(d.area)} · Estado actual: <b>${esc(d.st)}</b></div>`;
    toast(`${d.exp} → ${d.st}`);
  });

  /* ---------- 2. GIMNASIO QR ---------- */
  const members = [{ n: 'Ana R.', p: 'Plan anual · vigente', ok: true }, { n: 'Carla P.', p: 'Plan mensual · vencido hace 2 días', ok: false }, { n: 'Luis M.', p: 'Plan mensual · vigente', ok: true }, { n: 'Diego T.', p: 'Pase diario · vigente', ok: true }];
  let mi = 1, aforo = 21, lastExp = null;
  function syncAforo() {
    if (!$('#aforo')) return;
    const pct = Math.min(100, Math.round(aforo / 60 * 100));
    $('#aforo').textContent = aforo; $('#aforoPct').textContent = pct + '%'; $('#aforoBar').style.width = pct + '%';
    $('#aforoTag').textContent = pct > 80 ? 'Lleno' : pct > 50 ? 'Moderado' : 'Óptimo';
  }
  syncAforo();
  function renderMemberCard(m) {
    if (!$('#member')) return;
    lastExp = m.ok ? null : m;
    $('#member').innerHTML = `<div class="member"><div class="avatar">${esc(m.n[0])}</div><div><b>${esc(m.n)}</b><div style="font-size:12.5px;color:var(--ink-soft)">${esc(m.p)}</div></div><span class="badge ${m.ok ? 'ok' : 'warn'}" style="margin-left:auto">${m.ok ? 'Vigente' : 'Vencido'}</span></div>`;
    $('#renewBox').style.display = m.ok ? 'none' : 'block';
  }
  renderMemberCard(members[0]);
  if ($('#log')) {
    $('#log').innerHTML = `<li><span class="li-main"><i class="li-dot ok"></i><span>Ana R. · Plan anual</span></span><span class="badge ok">✓ 14:18</span></li><li><span class="li-main"><i class="li-dot ok"></i><span>Luis M. · QR Puerta 1</span></span><span class="badge ok">✓ 14:12</span></li><li><span class="li-main"><i class="li-dot warn"></i><span>Carla P. · Vencido</span></span><span class="badge warn">⚠ 14:04</span></li>`;
  }
  function showMem(m) {
    renderMemberCard(m);
    const now = new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
    $('#log')?.insertAdjacentHTML('afterbegin', `<li><span class="li-main"><i class="li-dot ${m.ok ? 'ok' : 'warn'}"></i><span>${esc(m.n)}</span></span><span class="badge ${m.ok ? 'ok' : 'warn'}">${m.ok ? '✓ ' + now : '⚠ ' + now}</span></li>`);
    if (m.ok) { aforo = Math.min(60, aforo + 1); syncAforo(); }
  }
  $('#scan')?.addEventListener('click', () => { const m = members[mi++ % members.length]; showMem(m); toast(m.ok ? `Ingreso: ${m.n}` : `${m.n}: membresía vencida`); });
  $('#renewBtn')?.addEventListener('click', () => { if (!lastExp) return; const trm = $('#renewTerm').value; lastExp.ok = true; lastExp.p = `Renovado hoy · vigente ${trm}`; showMem(lastExp); pushCrossLedger(`Gimnasio · ${lastExp.n}`, 120); toast(`${lastExp.n} renovada (+S/ 120)`); lastExp = null; });
  $('#fitAddToggle')?.addEventListener('click', () => { const f = $('#fitForm'); f.style.display = f.style.display === 'none' ? 'grid' : 'none'; });
  $('#fitForm')?.addEventListener('submit', e => { e.preventDefault(); const n = $('#fitNew').value.trim(); if (!n) return; const m = { n, p: `Plan ${$('#fitPlan').value.toLowerCase()} · vigente`, ok: true }; members.unshift(m); $('#fitNew').value = ''; $('#fitForm').style.display = 'none'; showMem(m); toast(`Socio ${n} registrado`); });
  function filterFit() { const q = ($('#fitQ')?.value || '').trim().toLowerCase(), f = $('#fitFilt')?.value || 'all'; const m = members.find(x => (!q || x.n.toLowerCase().includes(q)) && (f === 'all' || (f === 'ok' && x.ok) || (f === 'exp' && !x.ok))); if (m) renderMemberCard(m); else if ($('#member')) $('#member').innerHTML = '<p class="empty">Sin coincidencias</p>'; }
  $('#fitQ')?.addEventListener('input', filterFit);
  $('#fitFilt')?.addEventListener('change', filterFit);

  /* ---------- 3. INVENTARIO KARDEX ---------- */
  const items = [
    { sku: 'CAF-01', n: 'Café especialidad (saco 25kg)', q: 32, min: 12, u: 'sacos', c: 650, pv: 980 },
    { sku: 'EMP-04', n: 'Envases térmicos 12oz', q: 4, min: 10, u: 'cajas', c: 280, pv: 410 },
    { sku: 'ACE-09', n: 'Aceite vegetal bidón 20L', q: 90, min: 25, u: 'bidones', c: 290, pv: 390 }
  ];
  let po = [], kHist = ['[14:10] EMP-04 salida −6 cajas → alerta bajo mínimo', '[13:55] CAF-01 ingreso +10 sacos (Factura F002-188)'], onlyLow = false;
  function renderKardex() { if ($('#kardexLog')) $('#kardexLog').innerHTML = kHist.slice(0, 6).map(x => esc(x)).join('<br>'); }
  renderKardex();
  function addKardex(msg) { const tm = new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }); kHist.unshift(`[${tm}] ${msg}`); renderKardex(); }
  function drawStock() {
    if (!$('#stockRows')) return;
    let val = 0; po = [];
    const vis = items.filter(it => !onlyLow || it.q <= it.min);
    items.forEach(it => { val += it.q * it.c; if (it.q <= it.min) po.push(it); });
    $('#stockRows').innerHTML = vis.map(it => {
      const idx = items.indexOf(it), mrg = Math.round((it.pv - it.c) / it.pv * 100);
      return `<div class="row"><div><b>${esc(it.n)}</b> <small style="font:400 10.5px var(--mono);color:var(--ink-soft)">${it.sku} · margen ${mrg}%</small><div class="meter"><i class="${it.q <= it.min ? 'low' : ''}" style="width:${Math.min(100, it.q)}%"></i></div></div><div class="li-acts"><button class="btn xs" type="button" data-i="${idx}" data-d="-1">−1</button><button class="btn xs pri" type="button" data-i="${idx}" data-d="5">+5</button></div><span class="b">${it.q} ${esc(it.u)}</span></div>`;
    }).join('') || '<p class="empty">Sin SKUs bajo mínimo</p>';
    $('#stockVal').textContent = 'Valor: S/ ' + Math.round(val).toLocaleString('es-PE');
    $('#po').innerHTML = po.length ? po.map(x => `<li><span class="li-main"><i class="li-dot warn"></i><span>${esc(x.n)}</span></span><span class="badge warn">pedir ${Math.max(12, 25 - x.q)} ${esc(x.u)}</span></li>`).join('') : '<li class="empty">Todo el inventario sobre mínimo.</li>';
    $('#recv').disabled = !po.length; $('#copyPo').disabled = !po.length;
  }
  drawStock();
  $('#stAll')?.addEventListener('click', () => { onlyLow = false; $('#stAll').classList.add('on'); $('#stLow').classList.remove('on'); drawStock(); });
  $('#stLow')?.addEventListener('click', () => { onlyLow = true; $('#stLow').classList.add('on'); $('#stAll').classList.remove('on'); drawStock(); });
  $('#stockRows')?.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; const it = items[+b.dataset.i], d = +b.dataset.d; it.q = Math.max(0, it.q + d); addKardex(`${it.sku} ${d > 0 ? '+' + d : d} ${it.u} → saldo ${it.q}`); drawStock(); ping(0.08); });
  $('#stockForm')?.addEventListener('submit', e => { e.preventDefault(); const n = $('#stName').value.trim(), q = Math.max(1, +$('#stQty').value || 25), c = Math.max(1, +$('#stCost').value || 35); if (!n) return; const sku = 'SKU-0' + (items.length + 1); items.push({ sku, n, q, min: 8, u: 'und', c, pv: Math.round(c * 1.55) }); $('#stName').value = ''; addKardex(`Alta ${sku}: ${n} (${q} und @ S/${c})`); drawStock(); toast(`SKU ${n} ingresado`); });
  $('#recv')?.addEventListener('click', () => { po.forEach(it => { it.q = 25; addKardex(`Reposición ${it.sku} → saldo 25 ${it.u}`); }); drawStock(); toast('Mercadería recibida y Kardex actualizado'); });
  $('#copyPo')?.addEventListener('click', () => { const txt = 'Orden de compra Zaphyrel Stock:\n' + po.map(x => `- ${x.n}: ${Math.max(12, 25 - x.q)} ${x.u}`).join('\n'); navigator.clipboard?.writeText(txt).catch(() => {}); toast('Orden copiada'); });

  /* ---------- 4. HOTEL PMS ---------- */
  const roomData = [{ id: '201', s: 'occ', t: 'Ocupada', r: 210 }, { id: '202', s: 'fre', t: 'Libre', r: 190 }, { id: '203', s: 'cln', t: 'Limpieza', r: 190 }, { id: '204', s: 'fre', t: 'Libre', r: 190 }, { id: '301', s: 'occ', t: 'Suite 360°', r: 240 }, { id: '302', s: 'occ', t: 'Ocupada', r: 240 }, { id: '303', s: 'fre', t: 'Libre', r: 260 }, { id: '304', s: 'occ', t: 'Suite 360°', r: 240 }];
  function drawRooms() {
    if (!$('#rooms')) return;
    $('#rooms').innerHTML = roomData.map((r, i) => `<button class="room ${r.s}" type="button" data-i="${i}"><b>${r.id}</b>${r.t}<small>S/ ${r.r}</small></button>`).join('');
    const occ = roomData.filter(r => r.s === 'occ');
    $('#occ').textContent = Math.round(occ.length / roomData.length * 100) + '%'; $('#avl').textContent = roomData.filter(r => r.s === 'fre').length;
    $('#stayRev').textContent = 'S/ ' + occ.reduce((a, r) => a + r.r, 0);
  }
  drawRooms();
  $('#rooms')?.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; const r = roomData[+b.dataset.i], ord = [['fre', 'Libre'], ['occ', 'Ocupada'], ['cln', 'Limpieza'], ['mnt', 'Mantto']], nxt = ord[(ord.findIndex(x => x[0] === r.s) + 1) % 4]; r.s = nxt[0]; r.t = nxt[1]; drawRooms(); toast(`Habitación ${r.id} → ${r.t}`); });
  let stayBusy = false;
  $('#checkin')?.addEventListener('click', () => {
    if (stayBusy) return; stayBusy = true;
    const li = $$('#stayS li'), g = $('#stayGuest').value.trim() || 'Andrés Silva', nch = +$('#stayNights').value || 2;
    li.forEach(l => l.classList.remove('on'));
    li.forEach((l, i) => setTimeout(() => {
      l.classList.add('on'); ping(0.08);
      if (i === 3) {
        const free = roomData.find(r => r.s === 'fre'), code = 'ZPH-' + (1000 + Math.floor(Math.random() * 9000));
        if (free) {
          free.s = 'occ'; free.t = 'Ocupada'; drawRooms();
          const totH = free.r * nch;
          $('#keyOut').innerHTML = `<div class="boleta"><b>LLAVE DIGITAL ${code}</b><br>Huésped: ${esc(g)} · Hab. ${free.id} (${nch} noches · S/ ${totH})</div>`;
          pushCrossLedger(`Hotel · Hab. ${free.id}`, totH);
        } else toast('No hay habitaciones libres');
        stayBusy = false;
      }
    }, i * 420));
  });

  /* ---------- 5. CLÍNICA ---------- */
  let careSlot = '10:00', careSpec = 'Medicina · Dra. Paredes';
  const appts = [{ p: 'Mateo Quispe', h: '09:30', sp: 'Medicina · Dra. Paredes', s: 'En consulta' }, { p: 'Sofía Paredes', h: '09:45', sp: 'Odontología · Dr. Salas', s: 'En espera' }];
  const stFlow = ['En espera', 'En consulta', 'Atendido · receta lista'];
  function drawCare() {
    if (!$('#careList')) return;
    $$('#slotChips button').forEach(b => b.classList.toggle('busy', appts.some(a => a.h === b.dataset.h)));
    $('#careList').innerHTML = appts.map((a, i) => `<div class="ticket" style="cursor:pointer" data-i="${i}" role="button" tabindex="0"><div class="th"><span>${a.h} · ${esc(a.p)}</span><span class="st ${a.s === 'En consulta' ? 'cook' : a.s.startsWith('Atendido') ? 'done' : ''}">${a.s}</span></div><div class="it"><span>${esc(a.sp)}</span><span style="font-size:11px">Avanzar →</span></div></div>`).join('');
  }
  drawCare();
  $('#specChips')?.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; careSpec = b.dataset.s; $$('#specChips .chip').forEach(c => c.classList.toggle('on', c === b)); ping(0.08); });
  $('#slotChips')?.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; careSlot = b.dataset.h; $$('#slotChips .chip').forEach(c => c.classList.toggle('on', c === b)); ping(0.08); });
  $('#bookBtn')?.addEventListener('click', () => {
    const p = $('#carePat').value.trim() || 'Lucía Vega';
    if (appts.some(a => a.h === careSlot)) { toast(`Horario ${careSlot} ocupado`); return; }
    appts.push({ p, h: careSlot, sp: careSpec, s: 'En espera' }); $('#carePat').value = ''; drawCare();
    pushCrossLedger(`Clínica · Consulta ${p}`, 90);
    toast(`Cita confirmada: ${p} (+S/ 90)`);
  });
  $('#careList')?.addEventListener('click', e => {
    const t = e.target.closest('[data-i]'); if (!t) return;
    const a = appts[+t.dataset.i];
    a.s = stFlow[(stFlow.indexOf(a.s) + 1) % stFlow.length]; drawCare(); toast(`${a.p} → ${a.s}`);
    $('#rxOut').innerHTML = a.s.startsWith('Atendido') ? `<div class="boleta"><b>RECETA DIGITAL · ${esc(a.sp)}</b><br>Paciente: ${esc(a.p)}<br><input class="field-in" value="Paracetamol 500mg c/8h · Control 7 días" style="margin-top:6px"></div>` : '';
  });

  /* ---------- 6. INSTITUTO / BIBLIOTECA ---------- */
  const books = [{ cod: 'RED-04', sh: 'Estante A2', t: 'Redes y Cisco CCNA', a: 'A. Tanenbaum', av: 2, tot: 2 }, { cod: 'ARQ-08', sh: 'Estante C4', t: 'Arquitectura Limpia', a: 'R. Martin', av: 0, tot: 1 }, { cod: 'SQL-15', sh: 'Estante A1', t: 'Bases de Datos SQL', a: 'C. Date', av: 3, tot: 3 }];
  const loans = [{ t: 'Arquitectura Limpia', u: 'Alumno #2041', due: 'vence mañana', late: false }, { t: 'Ingeniería Hidráulica', u: 'Alumno #1984', due: 'atraso 2 días', late: true }];
  function drawLib() {
    if (!$('#libRes')) return;
    const q = ($('#libQ')?.value || '').toLowerCase();
    const list = books.filter(b => b.t.toLowerCase().includes(q) || b.a.toLowerCase().includes(q) || b.cod.toLowerCase().includes(q));
    $('#libRes').innerHTML = list.map(b => `<div class="row"><div><b>${esc(b.t)}</b> <small style="font:400 10.5px var(--mono);color:var(--ink-soft)">${b.cod} · ${b.sh}</small><div style="font-size:11.5px;color:var(--ink-soft)">${esc(b.a)} · ${b.av}/${b.tot} disp.</div></div><button class="btn sm ${b.av ? 'pri' : ''}" type="button" data-i="${books.indexOf(b)}" ${b.av ? '' : 'disabled'}>${b.av ? 'Prestar' : 'Agotado'}</button><span class="b">${b.av ? 'Libre' : '0 disp.'}</span></div>`).join('') || '<p class="empty">Sin coincidencias</p>';
    $('#libLoans').innerHTML = loans.map((l, i) => `<li><span class="li-main"><i class="li-dot ${l.late ? 'warn' : 'ok'}"></i><span><b>${esc(l.t)}</b><div style="font-size:11px;color:var(--ink-soft)">${esc(l.u)} · ${esc(l.due)}</div></span></span><span class="li-acts"><button class="btn xs" type="button" data-ren="${i}">+3d</button><button class="btn xs pri" type="button" data-ret="${i}">Devolver</button></span></li>`).join('') || '<li class="empty">Sin préstamos pendientes</li>';
    const lates = loans.filter(x => x.late).length;
    $('#libLateBadge').textContent = `${lates} vencido${lates === 1 ? '' : 's'}`;
  }
  drawLib();
  $('#libQ')?.addEventListener('input', drawLib);
  $('#libRes')?.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; const bk = books[+b.dataset.i], stu = $('#libStu').value.trim() || 'Alumno #2108'; if (bk.av > 0) bk.av--; loans.unshift({ t: bk.t, u: stu, due: 'retornar en 7 días', late: false }); drawLib(); toast(`Préstamo registrado: ${bk.t}`); });
  $('#libLoans')?.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; if (b.dataset.ren !== undefined) { const l = loans[+b.dataset.ren]; l.late = false; l.due = 'renovado (+3 días)'; drawLib(); toast('Renovación aplicada'); return; } if (b.dataset.ret !== undefined) { const rm = loans.splice(+b.dataset.ret, 1)[0]; const bk = books.find(x => x.t === rm.t); if (bk && bk.av < bk.tot) bk.av++; drawLib(); toast(`Devolución recibida: ${rm.t}`); } });

  /* ---------- 7. CATÁLOGO WEB ---------- */
  const prods = [{ n: 'Pack Esencial', c: 'Inicio', p: 45, s: 6 }, { n: 'Plan Mensual', c: 'Servicio', p: 89, s: 4 }, { n: 'Kit Profesional', c: 'Completo', p: 140, s: 3 }, { n: 'Asesoría 1:1', c: 'Sesión', p: 60, s: 8 }];
  let cart = [{ p: prods[0], q: 1 }], promoOff = 0, shipCost = 0;
  function drawShop() {
    if (!$('#shopGrid')) return;
    $('#shopGrid').innerHTML = prods.map((p, i) => `<button class="btn" type="button" data-i="${i}" ${p.s ? '' : 'disabled'}><span class="item-meta"><span>${p.n}</span><span class="item-sub">${p.c} · ${p.s} disp.</span></span><small>S/ ${p.p}</small></button>`).join('');
    const sub = cart.reduce((a, x) => a + x.p.p * x.q, 0), tot = cart.length ? (sub * (1 - promoOff) + shipCost) : 0;
    $('#shopCart').innerHTML = cart.length ? cart.map((x, k) => `<li><span class="li-main"><i class="li-dot"></i><span>${x.p.n}</span></span><span class="li-acts"><span class="qpill"><button type="button" data-act="dec" data-k="${k}">−</button>${x.q}<button type="button" data-act="inc" data-k="${k}">+</button></span><span style="font:500 12px var(--mono)">S/ ${(x.p.p * x.q).toFixed(2)}</span></span></li>`).join('') : '<li class="empty">Agrega productos para armar pedido</li>';
    $('#promoTag').textContent = (promoOff ? '−10% ' : '') + (shipCost && cart.length ? '+ Envío' : '');
    $('#shopTot').textContent = 'S/ ' + tot.toFixed(2); $('#shopSend').disabled = !cart.length; $('#shopWa').disabled = !cart.length;
  }
  drawShop();
  $('#shopGrid')?.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; const p = prods[+b.dataset.i]; if (!p.s) return; p.s--; const f = cart.find(x => x.p === p); if (f) f.q++; else cart.push({ p, q: 1 }); drawShop(); ping(0.08); });
  $('#shopCart')?.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; const k = +b.dataset.k, x = cart[k]; if (b.dataset.act === 'inc' && x.p.s > 0) { x.p.s--; x.q++; } else if (b.dataset.act === 'dec') { x.p.s++; if (--x.q <= 0) cart.splice(k, 1); } drawShop(); ping(0.08); });
  $('#shipChips')?.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; shipCost = +b.dataset.s; $$('#shipChips .chip').forEach(c => c.classList.toggle('on', c === b)); drawShop(); ping(0.08); });
  $('#applyPromo')?.addEventListener('click', () => { if ($('#shopPromo').value.trim().toUpperCase() === 'ZAPHY10') { promoOff = 0.10; toast('Cupón ZAPHY10 (-10%) aplicado'); } else { promoOff = 0; toast('Prueba el cupón: ZAPHY10'); } drawShop(); });
  $('#shopWa')?.addEventListener('click', () => { if (!cart.length) return; const biz = $('#bizName').value.trim() || 'Tu negocio', sub = cart.reduce((a, x) => a + x.p.p * x.q, 0), tot = sub * (1 - promoOff) + shipCost, det = cart.map(x => `• ${x.q}× ${x.p.n}`).join('\n'); navigator.clipboard?.writeText(`Hola ${biz}, te envío mi pedido:\n${det}\nTotal: S/ ${tot.toFixed(2)}`).catch(() => {}); toast('Resumen copiado para WhatsApp'); });
  $('#shopSend')?.addEventListener('click', () => { const biz = $('#bizName').value.trim() || 'Tu negocio', sub = cart.reduce((a, x) => a + x.p.p * x.q, 0), tot = sub * (1 - promoOff) + shipCost, res = cart.map(x => `${x.q}× ${x.p.n}`).join(', '); cart = []; drawShop(); $('#shopMsg').textContent = `Confirmado para ${biz}: ${res} · S/ ${tot.toFixed(2)}`; pushCrossLedger('Catálogo Web', tot); });

  /* ---------- 8. CUENTAS GLOBALES ---------- */
  function drawLedger() {
    if (!$('#sales')) return;
    $('#sales').textContent = 'S/ ' + sales.toLocaleString('es-PE');
    const m = sales > 0 ? Math.max(0, Math.round((sales - costs) / sales * 100)) : 0;
    $('#marginBadge').textContent = `Margen: ${m}%`;
    $('#ledMoves').innerHTML = moves.slice(0, 6).map((mv, i) => `<li><span class="li-main"><i class="li-dot ${mv.t === 'in' ? 'ok' : 'warn'}"></i><span>${esc(mv.c)}</span></span><span class="li-acts"><span style="font:500 11.5px var(--mono)">${mv.t === 'in' ? '+' : '−'} S/ ${mv.a}</span><button class="btn xs" type="button" data-del="${i}">×</button></span></li>`).join('') || '<li class="empty">Sin movimientos</li>';
  }
  drawLedger();
  $('#addSale')?.addEventListener('click', () => { pushCrossLedger('Venta rápida Yape', 120); toast('Ingreso Yape S/ 120 abonado'); });
  $('#addExp')?.addEventListener('click', () => { costs += 45; moves.unshift({ t: 'out', c: 'Gasto operativo', a: 45 }); pushBar(42, true); drawLedger(); toast('Gasto S/ 45 anotado'); });
  $('#ledForm')?.addEventListener('submit', e => { e.preventDefault(); const t = $('#ledType').value, c = $('#ledConcept').value.trim() || (t === 'in' ? 'Ingreso' : 'Gasto'), a = Math.max(1, +$('#ledAmt').value || 85); if (t === 'in') pushCrossLedger(c, a); else { costs += a; moves.unshift({ t, c, a }); pushBar(Math.min(100, a / 2), true); drawLedger(); } $('#ledConcept').value = ''; });
  $('#ledMoves')?.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; const mv = moves.splice(+b.dataset.del, 1)[0]; if (mv.t === 'in') { sales = Math.max(0, sales - mv.a); $('#globalCashVal').textContent = `S/ ${sales.toLocaleString('es-PE')}.00`; } else costs = Math.max(0, costs - mv.a); drawLedger(); toast(`Movimiento revertido: ${mv.c}`); });
  $('#report')?.addEventListener('click', () => { const inc = sales * 30, cost = costs * 30, net = inc - cost, igv = Math.round(inc * 0.18); lastBal = `Cierre Zaphyrel Ledger — Ingresos: S/ ${inc.toLocaleString('es-PE')} | Costos: S/ ${cost.toLocaleString('es-PE')} | Utilidad: S/ ${net.toLocaleString('es-PE')} | IGV 18%: S/ ${igv.toLocaleString('es-PE')}`; $('#rep').innerHTML = `<div class="kpis"><div class="kpi">Ingresos proy.<b>S/ ${inc.toLocaleString('es-PE')}</b></div><div class="kpi">Utilidad neta<b>S/ ${net.toLocaleString('es-PE')}</b></div><div class="kpi">IGV 18% est.<b>S/ ${igv.toLocaleString('es-PE')}</b></div></div>`; $('#copyRep').disabled = false; toast('Cierre mensual con IGV calculado'); });
  $('#copyRep')?.addEventListener('click', () => { if (!lastBal) return; navigator.clipboard?.writeText(lastBal).catch(() => {}); toast('Reporte copiado'); });

  window.__zaphyrelBridge = { pushCrossLedger, toast, ping };

  /* Deep-link ?mod=<id> */
  try {
    const mod = new URLSearchParams(location.search).get('mod');
    if (mod && $('#p-' + mod)) switchTab(mod);
  } catch (e) {}
})();
