/* ============================================================================
   ZAPHYREL HOME — Interactive Architecture, Switchboard, Live Flow & Filters
   ============================================================================ */
(() => {
  'use strict';

  const shell = () => window.__zaphyrelShell || {};
  const ping = (vol = 0.06) => {
    try { shell().ping?.(vol); } catch (_) {}
  };

  /* 1. Cursor Spotlight Tracking on Hero */
  const hero = document.querySelector('.hero');
  if (hero && window.matchMedia('(pointer:fine)').matches) {
    let rafId = 0;
    let nx = 50;
    let ny = 24;
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      if (!r.width || !r.height) return;
      nx = Math.max(5, Math.min(95, ((e.clientX - r.left) / r.width) * 100));
      ny = Math.max(5, Math.min(95, ((e.clientY - r.top) / r.height) * 100));
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          document.body.style.setProperty('--hx', nx.toFixed(1) + '%');
          document.body.style.setProperty('--hy', ny.toFixed(1) + '%');
          rafId = 0;
        });
      }
    }, { passive: true });
  }

  /* 2. Live Prism Spectrum Switcher (Hero Dock + Custom CSS Sync) */
  const swRow = document.getElementById('heroSwRow');
  if (swRow) {
    const fallbackPalettes = [
      { key: 'prism', label: 'Prisma Original', stops: ['#81BDF8', '#A9DCFF', '#D5BEFF', '#FFD5FF', '#FF9AFF'] },
      { key: 'cobalt', label: 'Zafiro Ejecutivo', stops: ['#60A5FA', '#93C5FD', '#818CF8', '#C084FC', '#E879F9'] },
      { key: 'aurora', label: 'Aurora Boreal', stops: ['#38BDF8', '#67E8F9', '#A7F3D0', '#C4B5FD', '#F0ABFC'] },
      { key: 'solar', label: 'Champagne & Oro', stops: ['#93C5FD', '#FDE68A', '#FDBA74', '#F9A8D4', '#E9D5FF'] }
    ];

    const shellPals = shell().palettes;
    let list = fallbackPalettes;
    if (shellPals && typeof shellPals === 'object') {
      const parsed = Object.entries(shellPals).map(([key, val]) => {
        const stops = Array.isArray(val)
          ? val
          : (val?.stops || val?.c || val?.colors || [val?.sky, val?.ice, val?.lav, val?.rose, val?.orc].filter(Boolean));
        if (stops && stops.length >= 3) {
          return { key, label: val?.name || val?.label || key, stops };
        }
        return null;
      }).filter(Boolean);
      if (parsed.length) list = parsed;
    }

    const applySpectrum = (item) => {
      const s = item.stops;
      const c0 = s[0], c1 = s[1] || s[0], c2 = s[2] || s[1] || s[0], c3 = s[3] || s[2] || s[0], c4 = s[4] || s[s.length - 1];
      const root = document.documentElement;
      root.style.setProperty('--c-sky', c0);
      root.style.setProperty('--c-ice', c1);
      root.style.setProperty('--c-lav', c2);
      root.style.setProperty('--c-rose', c3);
      root.style.setProperty('--c-orc', c4);
      root.style.setProperty('--prism', `linear-gradient(135deg,${c0},${c1},${c2},${c3},${c4})`);
      root.style.setProperty('--prism-h', `linear-gradient(90deg,${c0},${c1},${c2},${c3},${c4})`);
      const existingSync = document.querySelector(`.sw-sync button[data-pal="${item.key}"]`);
      if (existingSync) existingSync.click();
      try {
        window.__zaphyrelHero3D?.setCustomPalette?.(s);
      } catch (_) {}
      swRow.querySelectorAll('.hero-sw-btn').forEach(b => {
        b.setAttribute('aria-pressed', b.dataset.sp === item.key ? 'true' : 'false');
      });
    };

    swRow.innerHTML = '';
    list.slice(0, 5).forEach((item, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'hero-sw-btn';
      btn.dataset.sp = item.key;
      btn.setAttribute('aria-label', `Activar espectro ${item.label}`);
      btn.title = item.label;
      btn.setAttribute('aria-pressed', idx === 0 ? 'true' : 'false');
      btn.style.background = `linear-gradient(135deg, ${item.stops[0]}, ${item.stops[2] || item.stops[1]}, ${item.stops[item.stops.length - 1]})`;
      btn.addEventListener('click', () => {
        applySpectrum(item);
        ping(0.06);
      });
      swRow.appendChild(btn);
    });
  }

  /* 3. Hero Architectural Switchboard */
  const hsTabs = document.querySelectorAll('.hs-tab[data-mode]');
  const hsMain = document.getElementById('hsMain');
  const hsTag = document.getElementById('hsTag');
  const MODES = {
    front: {
      text: 'Vitrinas WebGL 3D/360°, catálogos dinámicos y reservas con validación QR instantánea.',
      tag: 'CAPA COMERCIAL · < 40MS',
      explode: 0
    },
    ops: {
      text: 'Punto de venta en tiempo real, descuento automático de kardex y operación offline-first.',
      tag: 'CORE INTERNO · MULTI-ROL',
      explode: 55
    },
    gov: {
      text: 'Comprobantes electrónicos SUNAT OSE, auditoría jerárquica y márgenes consolidados por sede.',
      tag: 'GOBIERNO · SUNAT + QR',
      explode: 24
    }
  };

  hsTabs.forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.mode;
      const cfg = MODES[key];
      if (!cfg) return;
      hsTabs.forEach(t => t.setAttribute('aria-selected', t === btn ? 'true' : 'false'));
      if (hsMain) hsMain.textContent = cfg.text;
      if (hsTag) hsTag.textContent = cfg.tag;
      const range = document.getElementById('explodeRange');
      const val = document.getElementById('explodeVal');
      if (window.__zaphyrelHero3D?.setExplode) {
        window.__zaphyrelHero3D.setExplode(cfg.explode);
        if (range) range.value = String(cfg.explode);
        if (val) val.textContent = cfg.explode + '%';
      }
      ping(0.06);
    });
  });

  /* 4. Chamber 3D Pose Dock Bindings */
  const poseBtns = document.querySelectorAll('.ch-pose-btn[data-pose]');
  let zStyle = 'split';
  poseBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const p = btn.dataset.pose;
      const api = window.__zaphyrelHero3D;
      const range = document.getElementById('explodeRange');
      const val = document.getElementById('explodeVal');
      const orbitBtn = document.getElementById('orbitBtn');
      if (!api) return;

      if (p === 'zstyle') {
        zStyle = zStyle === 'split' ? 'continua' : 'split';
        api.setZStyle?.(zStyle);
        btn.textContent = zStyle === 'continua' ? 'Z Continua' : 'Z Split';
        btn.setAttribute('aria-pressed', zStyle === 'continua' ? 'true' : 'false');
        ping(0.07);
        return;
      }

      poseBtns.forEach(b => {
        if (b.dataset.pose !== 'zstyle') b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });

      if (p === 'front') {
        api.setAngle?.(0, 4);
        api.setExplode?.(0);
        if (range) range.value = '0';
        if (val) val.textContent = '0%';
        api.setOrbit?.(true);
        if (orbitBtn) { orbitBtn.setAttribute('aria-pressed', 'true'); orbitBtn.textContent = 'Órbita 360°: Activa'; }
      } else if (p === 'iso') {
        api.setAngle?.(38, 18);
        api.setExplode?.(18);
        if (range) range.value = '18';
        if (val) val.textContent = '18%';
        api.setOrbit?.(false);
        if (orbitBtn) { orbitBtn.setAttribute('aria-pressed', 'false'); orbitBtn.textContent = 'Órbita 360°: Pausa'; }
      } else if (p === 'explode') {
        api.setAngle?.(46, 22);
        api.setExplode?.(82);
        if (range) range.value = '82';
        if (val) val.textContent = '82%';
        api.setOrbit?.(true);
        if (orbitBtn) { orbitBtn.setAttribute('aria-pressed', 'true'); orbitBtn.textContent = 'Órbita 360°: Activa'; }
      }
      ping(0.06);
    });
  });

  /* 5. Bloque 01 — Interactive Live Signal Flow Simulator */
  const flowPanel = document.getElementById('homeFlowPanel');
  if (flowPanel) {
    const SCENARIOS = {
      venta: [
        { k: '01 · SUPERFICIE EXTERNA', t: 'Pedido confirmado online', s: 'Pago validado · carrito cerrado' },
        { k: '02 · NÚCLEO TRANSACCIONAL', t: 'Descuento atómico de kardex', s: 'Stock multi-almacén + orden pickup' },
        { k: '03 · DIRECCIÓN & AUDITORÍA', t: 'Margen e ingreso consolidados', s: 'Asiento automático en tablero ejecutivo' }
      ],
      qr: [
        { k: '01 · EXPERIENCIA PÚBLICA', t: 'Pase digital con hash único', s: 'Emitido en wallet o correo' },
        { k: '02 · CONTROL EN PUERTA', t: 'Escaneo < 150ms offline-ready', s: 'Aforo actualizado y anulación de reuso' },
        { k: '03 · MONITOR OPERATIVO', t: 'Cortesía y rotación de zonas', s: 'Trazabilidad nominal por operador' }
      ],
      sunat: [
        { k: '01 · PUNTO DE VENTA', t: 'Cierre de cuenta en caja', s: 'Selección RUC/DNI consultada en vivo' },
        { k: '02 · MOTOR TRIBUTARIO', t: 'XML firmado + envío OSE', s: 'CDR aceptado + representación QR' },
        { k: '03 · REGISTRO CONTABLE', t: 'Libro electrónico sincronizado', s: 'Respaldo inmutable por comprobante' }
      ],
      offline: [
        { k: '01 · CONTINGENCIA DE RED', t: 'Corte de enlace detectado', s: 'Operación local continúa sin bloqueo' },
        { k: '02 · COLA CRIPTOGRÁFICA', t: 'Tickets sellados en IndexedDB', s: 'Integridad secuencial garantizada' },
        { k: '03 · RECONCILIACIÓN CLOUD', t: 'Sincronización al retorno', s: 'Resolución cero conflictos en servidor' }
      ]
    };

    const trigs = flowPanel.querySelectorAll('.hf-trig[data-flow]');
    const pipe = document.getElementById('hfPipeline');
    const nodes = [
      document.getElementById('hfN1'),
      document.getElementById('hfN2'),
      document.getElementById('hfN3')
    ];

    let timers = [];
    const runScenario = (key) => {
      timers.forEach(clearTimeout);
      timers = [];
      const steps = SCENARIOS[key];
      if (!steps || !pipe) return;
      trigs.forEach(b => b.setAttribute('aria-pressed', b.dataset.flow === key ? 'true' : 'false'));
      pipe.classList.add('firing');
      nodes.forEach((el, idx) => {
        if (!el || !steps[idx]) return;
        el.classList.remove('lit');
        const sm = el.querySelector('small');
        const b = el.querySelector('b');
        const sp = el.querySelector('span');
        if (sm) sm.textContent = steps[idx].k;
        if (b) b.textContent = steps[idx].t;
        if (sp) sp.textContent = steps[idx].s;
        timers.push(setTimeout(() => {
          el.classList.add('lit');
        }, 90 + idx * 190));
      });
    };

    trigs.forEach(btn => {
      btn.addEventListener('click', () => {
        runScenario(btn.dataset.flow);
        ping(0.06);
      });
    });

    runScenario('venta');
  }

  /* 6. Bloque 02 — Vertical Sector Category Filter */
  const filterBtns = document.querySelectorAll('.sf-btn[data-filter]');
  const qCards = document.querySelectorAll('.quick-nav-grid .qnav-card[data-group]');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      filterBtns.forEach(b => b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'));
      qCards.forEach((card) => {
        const match = f === 'all' || (card.dataset.group || '').split(' ').includes(f);
        card.classList.toggle('is-dimmed', !match);
      });
      ping(0.06);
    });
  });

  /* 7. Progressive Scroll Choreography with Safe Fallback */
  const reveals = Array.from(document.querySelectorAll('.zy-reveal'));
  if (reveals.length) {
    const showAll = () => reveals.forEach(el => el.classList.add('in'));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      showAll();
    } else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.06, rootMargin: '0px 0px -24px 0px' });

      reveals.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.96) {
          el.classList.add('in');
        } else {
          io.observe(el);
        }
      });

      // Guarantees clean visibility even during instant jump-links or automated captures
      setTimeout(showAll, 1600);
    }
  }
})();
