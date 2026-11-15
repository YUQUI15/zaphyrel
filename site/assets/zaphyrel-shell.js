(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.body?.dataset?.root || './';
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* Sonido opcional */
  let soundOn = false;
  const sig = $('#sig'), chime = $('#chime');
  function ping(v = 0.16) {
    if (!soundOn || !chime) return;
    chime.currentTime = 0;
    chime.volume = v;
    chime.play().catch(() => {});
  }
  function toggleSound() {
    soundOn = !soundOn;
    const sBtn = $('#sound');
    if (sBtn) {
      sBtn.setAttribute('aria-pressed', soundOn);
      sBtn.textContent = soundOn ? '♪ Activo' : '♪ Audio';
    }
    if (soundOn && sig) {
      sig.currentTime = 0;
      sig.volume = 0.4;
      sig.play().catch(() => {});
    }
  }
  $('#sound')?.addEventListener('click', toggleSound);
  $('#mobSoundBtn')?.addEventListener('click', () => { toggleSound(); closeMobDrawer(); });

  /* Menú Móvil Único */
  const mobBtn = $('#mobMenuBtn'), mobDrawer = $('#mobDrawer');
  function closeMobDrawer() {
    if (!mobDrawer || !mobBtn) return;
    mobDrawer.classList.remove('open');
    mobBtn.setAttribute('aria-expanded', 'false');
    mobDrawer.setAttribute('aria-hidden', 'true');
  }
  mobBtn?.addEventListener('click', () => {
    const o = !mobDrawer.classList.contains('open');
    mobDrawer.classList.toggle('open', o);
    mobBtn.setAttribute('aria-expanded', o);
    mobDrawer.setAttribute('aria-hidden', !o);
  });
  if (mobDrawer) $$('a', mobDrawer).forEach(a => a.addEventListener('click', closeMobDrawer));
  addEventListener('resize', () => { if (innerWidth > 1080) closeMobDrawer(); }, { passive: true });

  /* Marcar enlace activo en navbar según data-nav del body */
  const activeNav = document.body?.dataset?.nav;
  if (activeNav) {
    $$('#mainNavLinks a').forEach(a => a.classList.toggle('on', a.dataset.nav === activeNav));
  }

  /* Espectro Zaphyrel */
  const palettes = [
    { id: 'prism', name: 'Prisma Lumínico (5 Pasteles)', swatch: 'linear-gradient(135deg,#81BDF8,#D5BEFF,#FF9AFF)', day: '#81BDF8', dayPale: '#DFF0FF', night: '#A9DCFF', nightPale: 'rgba(169,220,255,.26)', rgb: '129,189,248', rgb2: '213,190,255', prism: 'linear-gradient(135deg,#81BDF8,#A9DCFF 24%,#D5BEFF 50%,#FFD5FF 76%,#FF9AFF)', prismH: 'linear-gradient(90deg,#81BDF8,#A9DCFF 24%,#D5BEFF 50%,#FFD5FF 76%,#FF9AFF)' },
    { id: 'sky', name: 'Zafiro Celeste', swatch: '#81BDF8', day: '#81BDF8', dayPale: '#D9EDFF', night: '#81BDF8', nightPale: 'rgba(129,189,248,.28)', rgb: '129,189,248', rgb2: '169,220,255', prism: 'linear-gradient(135deg,#81BDF8,#A9DCFF)', prismH: 'linear-gradient(90deg,#81BDF8,#A9DCFF)' },
    { id: 'lav', name: 'Lavanda Etérea', swatch: '#D5BEFF', day: '#A683F0', dayPale: '#ECE3FF', night: '#D5BEFF', nightPale: 'rgba(213,190,255,.28)', rgb: '166,131,240', rgb2: '213,190,255', prism: 'linear-gradient(135deg,#A9DCFF,#D5BEFF)', prismH: 'linear-gradient(90deg,#A9DCFF,#D5BEFF)' },
    { id: 'orc', name: 'Orquídea Seda', swatch: '#FF9AFF', day: '#E06AD2', dayPale: '#FFE2FF', night: '#FF9AFF', nightPale: 'rgba(255,154,255,.28)', rgb: '224,106,210', rgb2: '255,213,255', prism: 'linear-gradient(135deg,#D5BEFF,#FFD5FF,#FF9AFF)', prismH: 'linear-gradient(90deg,#D5BEFF,#FFD5FF,#FF9AFF)' },
    { id: 'noir', name: 'Obsidiana, Gris & Blanco', swatch: 'linear-gradient(135deg,#FFFFFF 50%,#090B10 50%)', day: '#4B5263', dayPale: '#E6E9F0', night: '#D5DAE5', nightPale: 'rgba(213,218,229,.22)', rgb: '75,82,99', rgb2: '155,163,180', prism: 'linear-gradient(135deg,#8E95A5,#DDE1EA)', prismH: 'linear-gradient(90deg,#5A6171,#B8BFC9,#E6E8EE)' }
  ];
  let activePal = 0;
  function applyPalette(idx, chimeOn = true) {
    activePal = idx;
    const p = palettes[idx], n = document.documentElement.dataset.theme === 'night', rs = document.documentElement.style;
    rs.setProperty('--accent', n ? p.night : p.day);
    rs.setProperty('--accent-pale', n ? p.nightPale : p.dayPale);
    rs.setProperty('--accent-soft', `rgba(${p.rgb},.22)`);
    rs.setProperty('--accent-ring', `rgba(${p.rgb2},.62)`);
    rs.setProperty('--tint', `rgba(${p.rgb},${n ? '.14' : '.16'})`);
    rs.setProperty('--prism', p.prism);
    rs.setProperty('--prism-h', p.prismH);
    $$('.sw-sync').forEach(box => $$('button', box).forEach((b, k) => b.setAttribute('aria-pressed', k === idx)));
    if (chimeOn) ping(0.1);
  }
  $$('.sw-sync').forEach(box => {
    palettes.forEach((p, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.style.background = p.swatch;
      b.title = p.name;
      b.setAttribute('aria-label', 'Espectro ' + p.name);
      b.setAttribute('aria-pressed', i === 0);
      b.onclick = () => applyPalette(i, true);
      box.append(b);
    });
  });

  function syncThemeBtn() {
    const n = document.documentElement.dataset.theme === 'night';
    const b = $('#night');
    if (b) {
      b.setAttribute('aria-pressed', n);
      b.textContent = n ? '☀ Día' : '☾ Noche';
    }
    const meta = $('#metaTheme');
    if (meta) meta.content = n ? '#05060A' : '#FFFFFF';
    applyPalette(activePal, false);
    window.dispatchEvent(new CustomEvent('zaphyrel:theme', { detail: { night: n } }));
  }
  $('#night')?.addEventListener('click', () => {
    const n = document.documentElement.dataset.theme !== 'night';
    document.documentElement.dataset.theme = n ? 'night' : 'day';
    try { localStorage.setItem('zy-theme', n ? 'night' : 'day'); } catch (e) {}
    syncThemeBtn();
    ping();
  });
  syncThemeBtn();

  /* Campo atmosférico 3D prismático interactivo (ondas aurora + poliedros 3D + constelación + cursor) */
  (function () {
    const cv = $('#prismField');
    if (!cv || reduce) return;
    const ctx = cv.getContext('2d');
    let W = innerWidth, H = innerHeight, t = 0, raf = null, lastMs = 0;
    let mx = -9999, my = -9999, smoothScroll = scrollY;
    const cols = ['129,189,248', '169,220,255', '213,190,255', '255,213,255', '255,154,255'];
    const dayCols = ['37,99,235', '79,70,229', '147,51,234', '219,39,119', '14,165,233'];

    const isMob = () => W < 680;
    const MAX_PTS = 44;
    const pts = Array.from({ length: MAX_PTS }, (_, i) => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: (i % 5 === 0 ? 3.8 : i % 3 === 0 ? 2.5 : 1.5) + Math.random() * 1.9,
      vx: (Math.random() - 0.5) * 0.36,
      vy: -0.14 - Math.random() * 0.28,
      idx: i,
      shard: i % 4 === 0,
      halo: i % 9 === 0,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.022,
      ph: Math.random() * 6.28
    }));

    // 3 lightweight 3D wireframe octahedrons rotating cleanly in parallax space
    const OCT_VERTS = [[0, 1, 0], [1, 0, 0], [0, 0, 1], [-1, 0, 0], [0, 0, -1], [0, -1, 0]];
    const OCT_EDGES = [[0,1],[0,2],[0,3],[0,4],[5,1],[5,2],[5,3],[5,4],[1,2],[2,3],[3,4],[4,1]];
    const OCT_FACES = [[0,1,2],[0,2,3],[5,2,1],[5,3,4]];
    const prisms = [
      { rx: 0.84, ry: 0.25, scale: 62, sp: 0.72, pScroll: 0.14, colIdx: 0 },
      { rx: 0.13, ry: 0.62, scale: 46, sp: -0.92, pScroll: 0.09, colIdx: 4 },
      { rx: 0.56, ry: 0.82, scale: 38, sp: 0.54, pScroll: 0.19, colIdx: 2 }
    ];

    function fit() { W = cv.width = innerWidth; H = cv.height = innerHeight; }
    fit();
    addEventListener('resize', fit, { passive: true });
    if (matchMedia('(pointer:fine)').matches) {
      addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
    }

    function drawAuroraWaves(n, sy) {
      const waves = [
        { yBase: H * 0.28, amp: 44, freq: 0.0022, speed: 1.0, c1: n ? 'rgba(56,189,248,0.13)' : 'rgba(59,130,246,0.12)', c2: n ? 'rgba(167,139,250,0.08)' : 'rgba(147,51,234,0.08)' },
        { yBase: H * 0.56, amp: 56, freq: 0.0018, speed: -0.78, c1: n ? 'rgba(213,190,255,0.12)' : 'rgba(124,58,237,0.10)', c2: n ? 'rgba(244,114,182,0.09)' : 'rgba(219,39,119,0.09)' },
        { yBase: H * 0.80, amp: 38, freq: 0.0025, speed: 0.62, c1: n ? 'rgba(129,189,248,0.10)' : 'rgba(14,165,233,0.10)', c2: n ? 'rgba(255,154,255,0.11)' : 'rgba(236,72,153,0.08)' }
      ];
      const step = Math.max(48, Math.floor(W / 18));
      waves.forEach((w, wi) => {
        const yOff = ((sy * (0.04 + wi * 0.02)) % (H * 0.45));
        const g = ctx.createLinearGradient(0, w.yBase - w.amp, W, w.yBase + w.amp);
        g.addColorStop(0, w.c1);
        g.addColorStop(0.55, w.c2);
        g.addColorStop(1, 'transparent');

        ctx.beginPath();
        for (let x = 0; x <= W + step; x += step) {
          const y = w.yBase - yOff * 0.25 + Math.sin(x * w.freq + t * 2.1 * w.speed + wi * 1.7) * w.amp + Math.cos(x * 0.0011 - t * 1.3) * 18;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = g;
        ctx.lineWidth = isMob() ? 1.5 : 2.1;
        ctx.stroke();

        // Soft glowing ribbon fill underneath wave edge
        ctx.lineTo(W + step, H + 40);
        ctx.lineTo(0, H + 40);
        ctx.closePath();
        const fillGrad = ctx.createLinearGradient(0, w.yBase - w.amp, 0, w.yBase + 160);
        fillGrad.addColorStop(0, w.c1.replace(/0\.[0-9]+/, n ? '0.055' : '0.045'));
        fillGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = fillGrad;
        ctx.fill();
      });
    }

    function draw3DPrism(pr, n, pal, sy) {
      const cx = W * pr.rx;
      const cyRaw = (H * pr.ry - (sy * pr.pScroll) % (H + 200));
      const cy = cyRaw < -120 ? cyRaw + H + 200 : cyRaw;
      const ay = t * 1.45 * pr.sp + pr.colIdx;
      const ax = Math.sin(t * 0.8 + pr.colIdx) * 0.48 + 0.35;
      const cosY = Math.cos(ay), sinY = Math.sin(ay);
      const cosX = Math.cos(ax), sinX = Math.sin(ax);
      const scale = isMob() ? pr.scale * 0.72 : pr.scale;
      const cStr = pal[pr.colIdx % pal.length];

      const proj = OCT_VERTS.map(([vx, vy, vz]) => {
        const x1 = vx * cosY - vz * sinY;
        const z1 = vx * sinY + vz * cosY;
        const y2 = vy * cosX - z1 * sinX;
        const z2 = vy * sinX + z1 * cosX;
        const p = 3.6 / (3.6 - z2);
        return [cx + x1 * scale * p, cy + y2 * scale * p];
      });

      OCT_FACES.forEach((f, fi) => {
        ctx.beginPath();
        ctx.moveTo(proj[f[0]][0], proj[f[0]][1]);
        ctx.lineTo(proj[f[1]][0], proj[f[1]][1]);
        ctx.lineTo(proj[f[2]][0], proj[f[2]][1]);
        ctx.closePath();
        ctx.fillStyle = `rgba(${cStr},${(n ? 0.045 : 0.055) + fi * 0.008})`;
        ctx.fill();
      });

      ctx.strokeStyle = `rgba(${cStr},${n ? 0.24 : 0.20})`;
      ctx.lineWidth = 1.05;
      ctx.beginPath();
      OCT_EDGES.forEach(([a, b]) => {
        ctx.moveTo(proj[a][0], proj[a][1]);
        ctx.lineTo(proj[b][0], proj[b][1]);
      });
      ctx.stroke();

      ctx.fillStyle = `rgba(${cStr},${n ? 0.55 : 0.45})`;
      proj.forEach(([px, py]) => {
        ctx.beginPath();
        ctx.arc(px, py, 1.9, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function shouldRun() { return !document.hidden; }
    function tick(ms) {
      raf = null;
      if (!shouldRun()) return;
      raf = requestAnimationFrame(tick);
      const minGap = isMob() ? 46 : 33;
      if (ms - lastMs < minGap) return;
      lastMs = ms;
      smoothScroll += (scrollY - smoothScroll) * 0.14;
      ctx.clearRect(0, 0, W, H);
      t += 0.0052;
      const n = document.documentElement.dataset.theme === 'night';
      const pal = n ? cols : dayCols;
      const parallaxY = (smoothScroll * 0.09) % Math.max(H, 600);

      // 1) Silk Aurora Waveforms
      drawAuroraWaves(n, smoothScroll);

      // 2) Dual orbital telemetry rings with luminous arcs
      ctx.save();
      ctx.lineWidth = 1.15;
      ctx.strokeStyle = n ? 'rgba(169,220,255,0.16)' : 'rgba(59,130,246,0.18)';
      ctx.beginPath();
      ctx.arc(W * 0.78, H * 0.34 - parallaxY * 0.16, Math.min(W, H) * 0.32, t, t + Math.PI * 1.25);
      ctx.stroke();
      ctx.strokeStyle = n ? 'rgba(255,154,255,0.14)' : 'rgba(147,51,234,0.15)';
      ctx.beginPath();
      ctx.arc(W * 0.20, H * 0.68 + parallaxY * 0.11, Math.min(W, H) * 0.25, -t * 1.2, -t * 1.2 + Math.PI * 1.05);
      ctx.stroke();
      ctx.restore();

      // 3) Projected 3D Wireframe Prisms
      const activePrisms = isMob() ? prisms.slice(0, 2) : prisms;
      activePrisms.forEach(pr => draw3DPrism(pr, n, pal, smoothScroll));

      // 4) Pointer radial magnetic lens halo
      if (!isMob() && mx > -100) {
        const rg = ctx.createRadialGradient(mx, my, 4, mx, my, 170);
        rg.addColorStop(0, n ? 'rgba(169,220,255,0.12)' : 'rgba(59,130,246,0.08)');
        rg.addColorStop(0.55, n ? 'rgba(213,190,255,0.05)' : 'rgba(147,51,234,0.04)');
        rg.addColorStop(1, 'transparent');
        ctx.fillStyle = rg;
        ctx.beginPath();
        ctx.arc(mx, my, 170, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5) Update particles & draw faceted nodes + constellation
      const count = isMob() ? 18 : pts.length;
      const linkDist2 = isMob() ? 16000 : 28500;
      for (let i = 0; i < count; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy; p.ph += 0.024; p.rot += p.vr;
        if (p.y < -20) { p.y = H + 20; p.x = Math.random() * W; }
        if (p.x < -20) p.x = W + 20;
        if (p.x > W + 20) p.x = -20;

        const cStr = pal[p.idx % pal.length];
        const a = (n ? 0.50 : 0.42) * (0.55 + 0.45 * Math.sin(p.ph));

        for (let j = i + 1; j < count; j++) {
          const q = pts[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkDist2) {
            const la = (1 - d2 / linkDist2) * (n ? 0.22 : 0.14);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${cStr},${la.toFixed(3)})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        if (!isMob() && mx > -100) {
          const cdx = p.x - mx, cdy = p.y - my;
          const cd2 = cdx * cdx + cdy * cdy;
          if (cd2 < 40000) {
            const ca = (1 - cd2 / 40000) * (n ? 0.36 : 0.24);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mx, my);
            ctx.strokeStyle = `rgba(${cStr},${ca.toFixed(3)})`;
            ctx.lineWidth = 1.05;
            ctx.stroke();
          }
        }

        if (p.halo) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 2.9, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${cStr},${(a * 0.36).toFixed(3)})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }

        if (p.shard) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.beginPath();
          const s = p.r * 1.55;
          ctx.moveTo(0, -s); ctx.lineTo(s * 0.72, 0); ctx.lineTo(0, s); ctx.lineTo(-s * 0.72, 0);
          ctx.closePath();
          ctx.fillStyle = `rgba(${cStr},${(a * 0.95).toFixed(3)})`;
          ctx.fill();
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${cStr},${a.toFixed(3)})`;
          ctx.fill();
        }
      }
    }
    function wake() { if (!raf && shouldRun()) raf = requestAnimationFrame(tick); }
    addEventListener('resize', wake, { passive: true });
    document.addEventListener('visibilitychange', wake);
    wake();
  })();

  /* Progreso de lectura + Scroll reveal */
  const prog = $('#progress');
  function revealVisible() {
    $$('.rv').forEach(el => { if (el.getBoundingClientRect().top < innerHeight * 1.08) el.classList.add('in'); });
  }
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.05 });
  $$('.rv').forEach(el => io.observe(el));
  function onScroll() {
    const h = document.documentElement;
    if (prog) prog.style.transform = `scaleX(${h.scrollTop / (h.scrollHeight - h.clientHeight || 1)})`;
    revealVisible();
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  revealVisible();

  /* Cursor sutil + Efecto 3D en tarjetas */
  const dot = $('#dot'), ring = $('#ring');
  let mx = 0, my = 0, rx = 0, ry = 0, curRaf = null, lastTc = null;
  function tickCursor() {
    if (!ring) { curRaf = null; return; }
    rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
    ring.style.transform = `translate(${rx}px,${ry}px)`;
    if (Math.hypot(mx - rx, my - ry) > 0.25) curRaf = requestAnimationFrame(tickCursor);
    else curRaf = null;
  }
  addEventListener('pointermove', e => {
    if (e.pointerType === 'touch' || reduce) return;
    if (dot && ring) {
      document.body.classList.add('has-cursor');
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px,${my}px)`;
      ring.classList.toggle('big', !!e.target.closest('a,button,input,select,.tab,.pillar,.room'));
      if (!curRaf) curRaf = requestAnimationFrame(tickCursor);
    }
    const tc = e.target.closest('.tilt-card');
    if (lastTc && lastTc !== tc) { lastTc.style.setProperty('--rx', '0deg'); lastTc.style.setProperty('--ry', '0deg'); }
    lastTc = tc;
    if (tc) {
      const r = tc.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
      tc.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      tc.style.setProperty('--my', (e.clientY - r.top) + 'px');
      tc.style.setProperty('--rx', (-py * 2.4).toFixed(2) + 'deg');
      tc.style.setProperty('--ry', (px * 2.4).toFixed(2) + 'deg');
    }
  }, { passive: true });

  /* FAQs */
  $$('.faq button').forEach(b => b.addEventListener('click', () => {
    const f = b.parentElement, open = f.getAttribute('aria-expanded') === 'true';
    f.setAttribute('aria-expanded', !open);
    ping(0.08);
  }));

  /* Paleta de Comandos Global Ctrl+K (Navegación multi-página real + demos Studio OS) */
  const cmd = $('#cmd'), cin = $('#cmdIn'), cl = $('#cmdList');
  if (cmd && cin && cl) {
    const navGo = rel => { location.href = root + rel; };
    const acts = [
      ['Inicio · Portada Zaphyrel & Emblema 3D', () => navGo('')],
      ['Rubros y Cobertura Total (Tiendas, Discotecas, Municipalidades…)', () => navGo('sectores/')],
      ['Web + Operación Interna (Entrelazamiento entre áreas)', () => navGo('ecosistema/')],
      ['Studio OS · Probar Tienda & Retail + Códigos de Barra', () => navGo('studio/?mod=retail')],
      ['Studio OS · Probar Discoteca, Puerta QR & Barra', () => navGo('studio/?mod=club')],
      ['Studio OS · Probar Municipalidad & Expedientes QR', () => navGo('studio/?mod=muni')],
      ['Studio OS · Probar Restaurante POS + SUNAT + Cocina', () => navGo('studio/?mod=table')],
      ['Studio OS · Probar Showroom WebGL 3D / 360° (Inmueble & POS)', () => navGo('studio/?mod=show3d')],
      ['Studio OS · Probar Hotel PMS & Tour 360°', () => navGo('studio/?mod=stay')],
      ['Studio OS · Inventario Kardex & Cuentas Globales', () => navGo('studio/?mod=stock')],
      ['Casos Implementados (Antes vs. Después)', () => navGo('casos/')],
      ['Cotizar Proyecto y Configurar Alcance por Áreas', () => navGo('cotizar/')],
      ['Marca · Emblema 3D PBR, Catálogo, Kit Social e INDECOPI', () => navGo('marca/')],
      ['Alternar modo Claro / Oscuro', () => $('#night')?.click()]
    ];
    let sel = 0, shown = acts;
    function drawCmd() {
      cl.innerHTML = shown.map((a, i) => `<li class="${i === sel ? 'sel' : ''}" data-i="${i}">${a[0]}<span>ir</span></li>`).join('');
    }
    function openCmd() {
      cmd.classList.add('on');
      cin.value = '';
      shown = acts;
      sel = 0;
      drawCmd();
      setTimeout(() => cin.focus(), 30);
      ping(0.08);
    }
    function closeCmd() { cmd.classList.remove('on'); }
    function run(a) { closeCmd(); a[1](); }
    $('#cmdBtn')?.addEventListener('click', openCmd);
    cin.addEventListener('input', () => {
      const q = cin.value.toLowerCase();
      shown = acts.filter(a => a[0].toLowerCase().includes(q));
      sel = 0;
      drawCmd();
    });
    cl.addEventListener('mousemove', e => {
      const li = e.target.closest('li');
      if (!li) return;
      const i = +li.dataset.i;
      if (i !== sel) {
        sel = i;
        $$('li', cl).forEach((x, k) => x.classList.toggle('sel', k === sel));
      }
    });
    cl.addEventListener('click', e => {
      const li = e.target.closest('li');
      if (li && shown[+li.dataset.i]) run(shown[+li.dataset.i]);
    });
    cmd.addEventListener('click', e => { if (e.target === cmd) closeCmd(); });
    addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        cmd.classList.contains('on') ? closeCmd() : openCmd();
        return;
      }
      if (e.key === 'Escape' && $('#chamberBox')?.classList.contains('rv-full')) { $('#rvExpandBtn')?.click(); return; }
      if (e.key === 'Escape' && $('#srWrap')?.classList.contains('sr-full')) { $('#srExpandBtn')?.click(); return; }
      if (!cmd.classList.contains('on')) return;
      if (e.key === 'Escape') closeCmd();
      if (e.key === 'ArrowDown') { sel = Math.min(shown.length - 1, sel + 1); drawCmd(); e.preventDefault(); }
      if (e.key === 'ArrowUp') { sel = Math.max(0, sel - 1); drawCmd(); e.preventDefault(); }
      if (e.key === 'Enter' && shown[sel]) run(shown[sel]);
    });
  }

  /* Insignia Universal de Autoría Inferior Izquierda ("by ZAPHYREL") */
  if (!window.__zaphyrelBadgeLoaded && !document.querySelector('script[src*="zaphyrel-badge.js"]')) {
    const bs = document.createElement('script');
    bs.src = root + 'assets/zaphyrel-badge.js';
    bs.defer = true;
    document.head.appendChild(bs);
  }

  window.__zaphyrelShell = {
    ping,
    esc,
    palettes,
    getActivePalette: () => palettes[activePal]
  };
})();
