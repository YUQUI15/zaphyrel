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

  /* Partículas atmosféricas suaves solo arriba */
  (function () {
    const cv = $('#prismField');
    if (!cv || reduce) return;
    const ctx = cv.getContext('2d');
    let W = innerWidth, H = innerHeight, t = 0, raf = null, lastMs = 0;
    const cols = ['129,189,248', '169,220,255', '213,190,255', '255,213,255', '255,154,255'];
    const pts = Array.from({ length: 20 }, (_, i) => ({
      x: Math.random() * W, y: Math.random() * H, r: 2 + Math.random() * 3.4,
      vx: (Math.random() - 0.5) * 0.22, vy: -0.10 - Math.random() * 0.16,
      c: cols[i % cols.length], ph: Math.random() * 6.28
    }));
    function fit() { W = cv.width = innerWidth; H = cv.height = innerHeight; }
    fit();
    addEventListener('resize', fit, { passive: true });
    function shouldRun() { return !document.hidden && scrollY < H * 1.3; }
    function tick(ms) {
      raf = null;
      if (!shouldRun()) return;
      raf = requestAnimationFrame(tick);
      if (ms - lastMs < 32) return;
      lastMs = ms;
      ctx.clearRect(0, 0, W, H);
      t += 0.005;
      const n = document.documentElement.dataset.theme === 'night';
      ctx.save();
      ctx.strokeStyle = n ? 'rgba(169,220,255,0.08)' : 'rgba(129,189,248,0.14)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(W * 0.74, H * 0.42, Math.min(W, H) * 0.32, t, t + Math.PI * 1.3);
      ctx.stroke();
      ctx.restore();
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy; p.ph += 0.02;
        if (p.y < -16) { p.y = H + 16; p.x = Math.random() * W; }
        if (p.x < -16) p.x = W + 16;
        if (p.x > W + 16) p.x = -16;
        const a = (n ? 0.32 : 0.42) * (0.55 + 0.45 * Math.sin(p.ph));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},${a.toFixed(3)})`;
        ctx.fill();
      }
    }
    function wake() { if (!raf && shouldRun()) raf = requestAnimationFrame(tick); }
    addEventListener('scroll', wake, { passive: true });
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

  window.__zaphyrelShell = {
    ping,
    esc,
    palettes,
    getActivePalette: () => palettes[activePal]
  };
})();
