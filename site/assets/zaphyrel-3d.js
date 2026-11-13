/**
 * Zaphyrel WebGL 3D Engine (Three.js PBR + RoomEnvironment HDR Reflections)
 * 1) Hero: Exclusively Zaphyrel Sovereign Brand Emblem (Crystal + Obsidian + Wind + Split-Blade Z)
 * 2) Studio OS Showroom: Architectural 2-Story Real Estate Villa + Commercial POS Hardware Station
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

function createGradientTexture(stops, vertical = false) {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext('2d');
  const g = vertical ? ctx.createLinearGradient(0, 0, 0, 256) : ctx.createLinearGradient(0, 0, 256, 256);
  stops.forEach(([off, col]) => g.addColorStop(off, col));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createWoodTexture(base = '#7c5338', grain = '#593923') {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext('2d');
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 256, 256);
  ctx.strokeStyle = grain;
  for (let i = 0; i < 42; i++) {
    ctx.lineWidth = 1 + (i % 3);
    ctx.globalAlpha = 0.16 + (i % 4) * 0.05;
    ctx.beginPath();
    const y = (i / 42) * 256;
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(85, y + Math.sin(i) * 5, 170, y - Math.cos(i) * 5, 256, y);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function createSolarTexture() {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#0d1b36';
  ctx.fillRect(0, 0, 256, 256);
  ctx.strokeStyle = '#9ec9ff';
  ctx.lineWidth = 2;
  for (let i = 1; i < 6; i++) {
    const x = (256 / 6) * i;
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 256); ctx.stroke();
  }
  for (let j = 1; j < 8; j++) {
    const y = (256 / 8) * j;
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(256, y); ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createPosScreenTexture(mode = 'cashier') {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 320;
  const ctx = c.getContext('2d');
  if (mode === 'cashier') {
    ctx.fillStyle = '#0c101b';
    ctx.fillRect(0, 0, 512, 320);
    const hdr = ctx.createLinearGradient(0, 0, 512, 0);
    hdr.addColorStop(0, '#81BDF8'); hdr.addColorStop(0.5, '#D5BEFF'); hdr.addColorStop(1, '#FF9AFF');
    ctx.fillStyle = hdr;
    ctx.fillRect(0, 0, 512, 34);
    ctx.fillStyle = '#07090f';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('ZAPHYREL POS · MESA 04 · SUNAT B001-0842', 16, 23);
    // Product grid tiles
    const cards = [
      ['Ceviche Clásico', 'S/ 38', '#81BDF8'],
      ['Lomo Saltado', 'S/ 42', '#A9DCFF'],
      ['Causa Limeña', 'S/ 24', '#D5BEFF'],
      ['Chicha Morada', 'S/ 10', '#FFD5FF'],
      ['Pisco Sour', 'S/ 28', '#FF9AFF'],
      ['Arroz con Mariscos', 'S/ 46', '#81BDF8']
    ];
    cards.forEach(([title, price, col], idx) => {
      const x = 18 + (idx % 2) * 145;
      const y = 52 + Math.floor(idx / 2) * 82;
      ctx.fillStyle = '#151c2d';
      ctx.fillRect(x, y, 134, 70);
      ctx.fillStyle = col;
      ctx.fillRect(x, y, 5, 70);
      ctx.fillStyle = '#f2f5ff';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText(title, x + 12, y + 26);
      ctx.fillStyle = col;
      ctx.font = 'bold 16px monospace';
      ctx.fillText(price, x + 12, y + 52);
    });
    // Right ticket panel
    ctx.fillStyle = '#121826';
    ctx.fillRect(318, 52, 176, 248);
    ctx.fillStyle = '#9aa8c7';
    ctx.font = '12px monospace';
    ctx.fillText('RESUMEN TICKET', 332, 76);
    ctx.fillStyle = '#ffffff';
    ctx.font = '13px sans-serif';
    ctx.fillText('1x Lomo Saltado   S/42', 332, 108);
    ctx.fillText('1x Chicha Morada  S/10', 332, 132);
    ctx.fillText('1x Ceviche        S/38', 332, 156);
    ctx.fillStyle = '#81BDF8';
    ctx.fillRect(332, 180, 148, 1);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px monospace';
    ctx.fillText('TOTAL: S/ 90.00', 332, 212);
    ctx.fillStyle = hdr;
    ctx.fillRect(332, 236, 148, 42);
    ctx.fillStyle = '#07090f';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('EMITIR BOLETA', 352, 262);
  } else {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 512, 320);
    ctx.fillStyle = '#742384';
    ctx.fillRect(0, 0, 512, 48);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('PAGA CON YAPE / PLIN', 135, 31);
    // Stylized deterministic QR matrix
    ctx.fillStyle = '#090B10';
    const qx = 186, qy = 66, sz = 140, cell = 10;
    for (let r = 0; r < 14; r++) {
      for (let col = 0; col < 14; col++) {
        const corner = (r < 4 && col < 4) || (r < 4 && col > 9) || (r > 9 && col < 4);
        const bit = corner || ((r * 7 + col * 13) % 3 === 0);
        if (bit) ctx.fillRect(qx + col * cell, qy + r * cell, cell - 1, cell - 1);
      }
    }
    ctx.fillStyle = '#090B10';
    ctx.font = 'bold 24px monospace';
    ctx.fillText('TOTAL: S/ 90.00', 150, 245);
    ctx.fillStyle = '#55607a';
    ctx.font = '14px sans-serif';
    ctx.fillText('Zaphyrel Studio OS · Comprobante automático', 112, 278);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeShapeFromSvg(pts, scale = 0.044, cx = 60, cy = 60) {
  const s = new THREE.Shape();
  pts.forEach(([x, y], i) => {
    const px = (x - cx) * scale;
    const py = (cy - y) * scale; // Flip SVG Y-down to Three.js Y-up
    if (i === 0) s.moveTo(px, py);
    else s.lineTo(px, py);
  });
  s.closePath();
  return s;
}

function createRenderer(canvas) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  return renderer;
}

/* ============================================================================
   1) HERO 3D ENGINE: PURE ZAPHYREL BRAND SCULPTURE (SOVEREIGN EMBLEM)
============================================================================ */
export function initHeroEmblem3D(canvas, viewport, opts = {}) {
  let renderer;
  try {
    renderer = createRenderer(canvas);
  } catch (e) {
    return null;
  }

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.035).texture;
  scene.environmentIntensity = 0.92;

  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 60);
  camera.position.set(0.85, 0.45, 8.9);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.enablePan = false;
  controls.minDistance = 5.2;
  controls.maxDistance = 13.8;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.45;

  // Studio Three-Point + Pastel Rim Lights
  const hemiLight = new THREE.HemisphereLight(0xf6f9ff, 0x161b2e, 0.72);
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.85);
  keyLight.position.set(5, 7, 6);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1024, 1024);
  keyLight.shadow.bias = -0.0004;
  scene.add(keyLight);

  const skyLight = new THREE.PointLight(0x81BDF8, 5.2, 16);
  skyLight.position.set(-4.2, 2.4, 3.2);
  scene.add(skyLight);

  const orchidLight = new THREE.PointLight(0xFF9AFF, 5.0, 16);
  orchidLight.position.set(4.2, -1.8, 3.0);
  scene.add(orchidLight);

  const backRim = new THREE.DirectionalLight(0xD5BEFF, 1.45);
  backRim.position.set(-2.5, 3, -6);
  scene.add(backRim);

  // Root Emblem Group + Layer Groups for smooth axial explode
  const crestGroup = new THREE.Group();
  scene.add(crestGroup);

  const layers = {
    crown: new THREE.Group(),
    chassis: new THREE.Group(),
    wafer: new THREE.Group(),
    winds: new THREE.Group(),
    zFront: new THREE.Group(),
    zBack: new THREE.Group(),
    zBridge: new THREE.Group(),
    rings: new THREE.Group()
  };
  Object.values(layers).forEach(g => crestGroup.add(g));

  // Shared Materials (dynamically updated across 3 brand finishes)
  const prismTex = createGradientTexture([
    [0, '#81BDF8'], [0.28, '#A9DCFF'], [0.55, '#D5BEFF'], [0.80, '#FFD5FF'], [1, '#FF9AFF']
  ]);

  const facetPalette = [0x81BDF8, 0xFFFFFF, 0xD5BEFF, 0xFFD5FF, 0xFF9AFF, 0xD5BEFF, 0xA9DCFF];
  const facetMats = facetPalette.map(col => new THREE.MeshPhysicalMaterial({
    color: col,
    transmission: 0.48,
    transparent: true,
    opacity: 0.94,
    roughness: 0.08,
    metalness: 0.08,
    ior: 1.54,
    thickness: 0.65,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06
  }));

  const chassisMat = new THREE.MeshPhysicalMaterial({
    color: 0xf7f9ff,
    metalness: 0.25,
    roughness: 0.18,
    clearcoat: 0.95,
    clearcoatRoughness: 0.08
  });

  const waferMat = new THREE.MeshPhysicalMaterial({
    map: prismTex,
    emissive: 0xD5BEFF,
    emissiveMap: prismTex,
    emissiveIntensity: 0.22,
    transmission: 0.62,
    transparent: true,
    opacity: 0.72,
    roughness: 0.06,
    ior: 1.48,
    clearcoat: 1.0
  });

  const windMat = new THREE.MeshPhysicalMaterial({
    color: 0x81BDF8,
    emissive: 0x3b82f6,
    emissiveIntensity: 0.12,
    metalness: 0.72,
    roughness: 0.16,
    clearcoat: 0.9
  });

  const zTopMat = new THREE.MeshPhysicalMaterial({
    color: 0x0b0e18,
    metalness: 0.82,
    roughness: 0.14,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05
  });

  const zBotMat = new THREE.MeshPhysicalMaterial({
    color: 0xb7cffc,
    map: prismTex,
    emissiveMap: prismTex,
    emissive: 0x6ea8ff,
    emissiveIntensity: 0.24,
    metalness: 0.74,
    roughness: 0.16,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06
  });

  const zBarMat = new THREE.MeshPhysicalMaterial({
    color: 0xeaf4ff,
    metalness: 0.92,
    roughness: 0.10,
    clearcoat: 1.0
  });

  const edgeLineMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55 });

  function addBevelPart(parent, pts, depth, mat, zCenter = 0, bevel = 0.032, addEdges = true) {
    const shape = makeShapeFromSvg(pts);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel * 0.75,
      bevelSegments: 4,
      curveSegments: 8
    });
    geo.translate(0, 0, -depth / 2 + zCenter);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    if (addEdges) {
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo, 28), edgeLineMat);
      mesh.add(edges);
    }
    return mesh;
  }

  // Exact Sovereign Logo Coordinates (from logo/zaphyrel-symbol.svg)
  const fPts = [
    [[19,51],[57,13],[57.5,25.5],[25.5,57.5]],
    [[57,13],[63,13],[62.5,25.5],[57.5,25.5]],
    [[63,13],[107,57],[94.5,57.5],[62.5,25.5]],
    [[107,57],[107,63],[94.5,62.5],[94.5,57.5]],
    [[107,63],[63,107],[62.5,94.5],[94.5,62.5]],
    [[63,107],[57,107],[57.5,94.5],[62.5,94.5]],
    [[57,107],[40.5,90.5],[49,82],[57.5,94.5]]
  ];
  fPts.forEach((pts, i) => addBevelPart(layers.crown, pts, 0.34, facetMats[i], 0, 0.036, true));

  // Inner Octagonal Precision Chassis with Hollow Aperture (clean extruded frame)
  const outerOct = makeShapeFromSvg([[57.5,25.5],[62.5,25.5],[94.5,57.5],[94.5,62.5],[62.5,94.5],[57.5,94.5],[25.5,62.5],[25.5,57.5]]);
  const innerHole = makeShapeFromSvg([[58.4,30.5],[61.6,30.5],[89.5,58.4],[89.5,61.6],[61.6,89.5],[58.4,89.5],[30.5,61.6],[30.5,58.4]]);
  // Hole winding reversed safely via Path points in reverse order
  const holePath = new THREE.Path(innerHole.getPoints().reverse());
  outerOct.holes.push(holePath);
  const chassisGeo = new THREE.ExtrudeGeometry(outerOct, {
    depth: 0.42,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.025,
    bevelSegments: 4
  });
  chassisGeo.translate(0, 0, -0.21);
  const chassisMesh = new THREE.Mesh(chassisGeo, chassisMat);
  chassisMesh.castShadow = true;
  chassisMesh.receiveShadow = true;
  layers.chassis.add(chassisMesh);

  // Optical Holographic Wafer Core
  addBevelPart(layers.wafer, [[58.4,30.5],[61.6,30.5],[89.5,58.4],[89.5,61.6],[61.6,89.5],[58.4,89.5],[30.5,61.6],[30.5,58.4]], 0.14, waferMat, 0, 0.015, false);

  // Aerodynamic Side Blades
  const windPts = [
    [[10,52.5],[25.5,52.5],[22.4,55.6],[10,55.6]],
    [[4.5,59.4],[28,59.4],[24.2,63.2],[4.5,63.2]],
    [[11.5,66.8],[30.5,66.8],[27.1,70.1],[11.5,70.1]]
  ];
  windPts.forEach((pts, idx) => addBevelPart(layers.winds, pts, 0.24, windMat, (idx - 1) * 0.06, 0.022, true));

  // Front Split-Blade Z Monogram + Tension Bar
  const zA = [[41,37.5],[82.8,37.5],[61.7,58.6],[51.9,58.6],[67.5,43],[36.2,43]];
  const zB = [[79,82.5],[37.2,82.5],[58.3,61.4],[68.1,61.4],[52.5,77],[83.8,77]];
  const zBar = [[47.5,59.1],[72.5,59.1],[72.5,60.9],[47.5,60.9]];

  addBevelPart(layers.zFront, zA, 0.26, zTopMat, 0.34, 0.03, true);
  addBevelPart(layers.zFront, zB, 0.26, zBotMat, 0.37, 0.03, true);
  addBevelPart(layers.zBridge, zBar, 0.14, zBarMat, 0.56, 0.015, false);

  // Rear Mirrored Double-Sided Sovereign Z (rotated PI so readable cleanly from back)
  const backWrap = new THREE.Group();
  backWrap.rotation.y = Math.PI;
  addBevelPart(backWrap, zA, 0.26, zTopMat, 0.34, 0.03, true);
  addBevelPart(backWrap, zB, 0.26, zBotMat, 0.37, 0.03, true);
  addBevelPart(backWrap, zBar, 0.14, zBarMat, 0.56, 0.015, false);
  layers.zBack.add(backWrap);

  // Gyroscopic Calibration Rings + Floating Optical Shards
  const ringMat1 = new THREE.MeshStandardMaterial({ color: 0xa9dcff, metalness: 0.88, roughness: 0.18, transparent: true, opacity: 0.52 });
  const ringMat2 = new THREE.MeshStandardMaterial({ color: 0xff9aff, metalness: 0.88, roughness: 0.18, transparent: true, opacity: 0.42 });
  const gyro1 = new THREE.Mesh(new THREE.TorusGeometry(2.65, 0.014, 16, 128), ringMat1);
  gyro1.rotation.x = Math.PI * 0.42;
  gyro1.rotation.y = 0.25;
  layers.rings.add(gyro1);

  const gyro2 = new THREE.Mesh(new THREE.TorusGeometry(2.92, 0.011, 16, 128), ringMat2);
  gyro2.rotation.x = Math.PI * 0.58;
  gyro2.rotation.y = -0.32;
  layers.rings.add(gyro2);

  // Subtle plinth halo ring below crest
  const floorRing = new THREE.Mesh(
    new THREE.RingGeometry(1.1, 2.35, 64),
    new THREE.MeshBasicMaterial({ color: 0x81BDF8, side: THREE.DoubleSide, transparent: true, opacity: 0.16 })
  );
  floorRing.rotation.x = -Math.PI / 2;
  floorRing.position.y = -2.42;
  layers.rings.add(floorRing);

  // Orbiting micro optical octahedrons
  const shardGeo = new THREE.OctahedronGeometry(0.055, 0);
  const shardCols = [0x81BDF8, 0xD5BEFF, 0xFF9AFF, 0xA9DCFF];
  const shards = [];
  for (let i = 0; i < 16; i++) {
    const m = new THREE.Mesh(
      shardGeo,
      new THREE.MeshPhysicalMaterial({ color: shardCols[i % 4], roughness: 0.1, metalness: 0.2, transmission: 0.4, clearcoat: 1 })
    );
    const a = (i / 16) * Math.PI * 2;
    const rad = 2.55 + (i % 3) * 0.22;
    m.userData = { angle: a, rad, yOff: Math.sin(i * 1.3) * 0.65, speed: 0.22 + (i % 4) * 0.05 };
    layers.rings.add(m);
    shards.push(m);
  }

  // Interactive State
  let finishMode = 'prisma';
  let explodeTarget = 0, explodeCur = 0;
  let targetDist = 8.9;
  let vis = true;
  let raf = null;
  const clock = new THREE.Clock();

  function setFinish(mode) {
    finishMode = mode;
    if (mode === 'prisma') {
      facetMats.forEach((m, i) => {
        m.color.setHex(facetPalette[i]);
        m.transmission = 0.48; m.metalness = 0.08; m.roughness = 0.08;
      });
      chassisMat.color.setHex(0xf7f9ff);
      chassisMat.roughness = 0.18;
      zTopMat.color.setHex(0x0b0e18);
      zBotMat.emissiveIntensity = 0.18;
    } else if (mode === 'obsidian') {
      facetMats.forEach((m, i) => {
        m.color.setHex(i % 2 === 0 ? 0x161b2a : 0x262f48);
        m.transmission = 0.12; m.metalness = 0.85; m.roughness = 0.15;
      });
      chassisMat.color.setHex(0x111524);
      chassisMat.roughness = 0.12;
      zTopMat.color.setHex(0xf4f7ff);
      zBotMat.emissiveIntensity = 0.34;
    } else {
      facetMats.forEach((m, i) => {
        m.color.setHex(i === 1 ? 0xffffff : 0xeef4ff);
        m.transmission = 0.22; m.metalness = 0.12; m.roughness = 0.26;
      });
      chassisMat.color.setHex(0xffffff);
      chassisMat.roughness = 0.24;
      zTopMat.color.setHex(0x121622);
      zBotMat.emissiveIntensity = 0.14;
    }
  }

  function setExplode(pct) {
    explodeTarget = Math.max(0, Math.min(1, pct / 100));
  }

  function setTheme(isNight) {
    hemiLight.intensity = isNight ? 0.55 : 0.85;
    scene.environmentIntensity = isNight ? 1.05 : 0.92;
    floorRing.material.opacity = isNight ? 0.22 : 0.14;
    edgeLineMat.opacity = isNight ? 0.42 : 0.65;
  }

  function resize() {
    const r = viewport.getBoundingClientRect();
    if (r.width < 20 || r.height < 20) return;
    renderer.setSize(r.width, r.height, false);
    camera.aspect = r.width / r.height;
    camera.updateProjectionMatrix();
  }

  function renderFrame(dt = 0.016) {
    const t = clock.getElapsedTime();
    explodeCur += (explodeTarget - explodeCur) * Math.min(1, dt * 8);

    // Axial anatomical separation of Zaphyrel Emblem
    const e = explodeCur;
    layers.zBack.position.z = -1.15 * e;
    layers.crown.position.z = 0;
    layers.chassis.position.z = 0.42 * e;
    layers.wafer.position.z = 0.85 * e;
    layers.winds.position.x = -0.55 * e;
    layers.winds.position.z = 1.05 * e;
    layers.zFront.position.z = 1.48 * e;
    layers.zBridge.position.z = 1.85 * e;

    // Gentle floating levitation & ring choreography
    crestGroup.position.y = Math.sin(t * 1.15) * 0.08;
    gyro1.rotation.z = t * 0.18;
    gyro2.rotation.z = -t * 0.14;
    shards.forEach(s => {
      const a = s.userData.angle + t * s.userData.speed;
      s.position.set(Math.cos(a) * s.userData.rad, s.userData.yOff + Math.sin(a * 2) * 0.14, Math.sin(a) * s.userData.rad);
      s.rotation.x = t * 0.9;
      s.rotation.y = t * 1.1;
    });

    // Smooth camera zoom easing
    const curDist = camera.position.distanceTo(controls.target);
    if (Math.abs(curDist - targetDist) > 0.02) {
      const dir = camera.position.clone().sub(controls.target).normalize();
      camera.position.copy(controls.target).addScaledVector(dir, curDist + (targetDist - curDist) * 0.12);
    }

    controls.update();
    renderer.render(scene, camera);
  }

  let lastTime = performance.now();
  function loop(now) {
    raf = null;
    if (!vis || document.hidden) return;
    const dt = Math.min(0.05, (now - lastTime) / 1000);
    lastTime = now;
    renderFrame(dt);
    raf = requestAnimationFrame(loop);
  }
  function wake() {
    if (!raf && vis && !document.hidden) {
      lastTime = performance.now();
      raf = requestAnimationFrame(loop);
    }
  }

  new ResizeObserver(() => { resize(); renderFrame(0.016); }).observe(viewport);
  new IntersectionObserver(es => { vis = es[0].isIntersecting; if (vis) wake(); }, { threshold: 0.05 }).observe(viewport);
  document.addEventListener('visibilitychange', wake);

  // Keep user drag responsive & notify zoom readout
  controls.addEventListener('change', () => {
    targetDist = camera.position.distanceTo(controls.target);
    if (opts.onZoom) opts.onZoom(Math.round((8.9 / Math.max(5.2, Math.min(13.8, targetDist))) * 100));
  });

  resize();
  setTheme(document.documentElement.dataset.theme === 'night');
  wake();

  return {
    setFinish,
    setExplode,
    setTheme,
    setOrbit(enabled) { controls.autoRotate = enabled; },
    zoomBy(factor) {
      targetDist = Math.max(5.2, Math.min(13.8, targetDist * factor));
      wake();
      return Math.round((8.9 / targetDist) * 100);
    },
    resetView() {
      targetDist = 8.9;
      camera.position.set(0.85, 0.45, 8.9);
      controls.target.set(0, 0, 0);
      controls.update();
      return 100;
    },
    capturePng() {
      renderFrame(0.001);
      return canvas.toDataURL('image/png');
    },
    resize
  };
}

/* ============================================================================
   2) STUDIO OS SHOWROOM 3D / 360° PRO:
      - Model A ('villa'): Full 2-Story Real Estate Residence (Doors, Windows,
        Stairs, Balcony, Garage + 3D Car, Interiors w/ Furniture, Roof + Solar + HVAC)
      - Model B ('pos'): Detailed Commercial POS Desk & Hardware 360°
============================================================================ */
export function initShowroom3D(canvas, viewport, callbacks = {}) {
  let renderer;
  try {
    renderer = createRenderer(canvas);
  } catch (e) {
    return null;
  }

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.82;

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 120);
  camera.position.set(14.5, 9.2, 15.2);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.minDistance = 4.2;
  controls.maxDistance = 28;
  controls.maxPolarAngle = Math.PI * 0.485;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.65;
  controls.target.set(0, 1.8, 0);

  // Realistic Architectural Daylight Lighting
  const hemi = new THREE.HemisphereLight(0xf6f9ff, 0x3b4252, 0.65);
  scene.add(hemi);

  const sun = new THREE.DirectionalLight(0xfffaf2, 2.05);
  sun.position.set(14, 22, 13);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.near = 2;
  sun.shadow.camera.far = 52;
  const d = 12;
  sun.shadow.camera.left = -d;
  sun.shadow.camera.right = d;
  sun.shadow.camera.top = d;
  sun.shadow.camera.bottom = -d;
  sun.shadow.bias = -0.0005;
  scene.add(sun);

  const fillLight = new THREE.DirectionalLight(0xA9DCFF, 0.55);
  fillLight.position.set(-12, 8, -10);
  scene.add(fillLight);

  // Reusable Textures & Materials
  const woodTex = createWoodTexture('#8a5c3c', '#5e3c24');
  const darkWoodTex = createWoodTexture('#4a3222', '#2b1b11');
  const solarTex = createSolarTexture();
  const posUiTex = createPosScreenTexture('cashier');
  const qrTex = createPosScreenTexture('qr');

  const mat = {
    concrete: new THREE.MeshStandardMaterial({ color: 0xe9ecf2, roughness: 0.72, metalness: 0.04 }),
    wallExt: new THREE.MeshStandardMaterial({ color: 0xf4f6fb, roughness: 0.68, metalness: 0.03 }),
    wallAccent: new THREE.MeshStandardMaterial({ color: 0x32394a, roughness: 0.55, metalness: 0.15 }),
    darkMetal: new THREE.MeshStandardMaterial({ color: 0x171b24, roughness: 0.28, metalness: 0.78 }),
    steel: new THREE.MeshStandardMaterial({ color: 0xd8e0ec, roughness: 0.18, metalness: 0.92 }),
    wood: new THREE.MeshStandardMaterial({ map: woodTex, roughness: 0.55, metalness: 0.05 }),
    darkWood: new THREE.MeshStandardMaterial({ map: darkWoodTex, roughness: 0.48, metalness: 0.08 }),
    glass: new THREE.MeshPhysicalMaterial({
      color: 0x7bc4fa,
      transparent: true,
      opacity: 0.48,
      roughness: 0.04,
      metalness: 0.18,
      ior: 1.5,
      clearcoat: 1.0
    }),
    water: new THREE.MeshPhysicalMaterial({
      color: 0x56cfe1,
      transparent: true,
      opacity: 0.78,
      roughness: 0.06,
      metalness: 0.08,
      clearcoat: 1.0
    }),
    grass: new THREE.MeshStandardMaterial({ color: 0x6f9e6b, roughness: 0.94, metalness: 0.0 }),
    sofa: new THREE.MeshStandardMaterial({ color: 0xd9dce6, roughness: 0.86, metalness: 0.0 }),
    bedFabric: new THREE.MeshStandardMaterial({ color: 0xd5beff, roughness: 0.85, metalness: 0.0 }),
    linen: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.82 }),
    warmLamp: new THREE.MeshStandardMaterial({ color: 0xfff3d1, emissive: 0xffd08a, emissiveIntensity: 1.4 }),
    solar: new THREE.MeshPhysicalMaterial({ map: solarTex, roughness: 0.14, metalness: 0.35, clearcoat: 0.9 }),
    carPaint: new THREE.MeshPhysicalMaterial({ color: 0x2563eb, metalness: 0.65, roughness: 0.14, clearcoat: 1.0, clearcoatRoughness: 0.05 }),
    tire: new THREE.MeshStandardMaterial({ color: 0x111318, roughness: 0.88 })
  };

  function box(w, h, d, material, x = 0, y = 0, z = 0, radius = 0.03, seg = 2) {
    const g = radius > 0 ? new RoundedBoxGeometry(w, h, d, seg, radius) : new THREE.BoxGeometry(w, h, d);
    const m = new THREE.Mesh(g, material);
    m.position.set(x, y, z);
    m.castShadow = true;
    m.receiveShadow = true;
    return m;
  }

  /* ---------- MODEL A: 2-STORY ARCHITECTURAL VILLA ("CASA ZAPHYREL 360°") ---------- */
  const shadowPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30),
    new THREE.ShadowMaterial({ opacity: 0.14 })
  );
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = -0.33;
  shadowPlane.receiveShadow = true;
  scene.add(shadowPlane);

  const villaGroup = new THREE.Group();
  scene.add(villaGroup);

  const groundGroup = new THREE.Group();
  const floor1Group = new THREE.Group();
  const floor2Group = new THREE.Group();
  const roofGroup = new THREE.Group();
  villaGroup.add(groundGroup, floor1Group, floor2Group, roofGroup);

  let hvacFanRotor = null;

  // 1. Site Plot, Driveway, Garden, Walkway & Pool
  groundGroup.add(box(14.6, 0.32, 11.4, mat.concrete, 0, -0.16, 0, 0.04));
  // Front/right lawn
  groundGroup.add(box(5.6, 0.06, 11.0, mat.grass, -4.3, 0.03, 0, 0.02));
  groundGroup.add(box(8.8, 0.06, 2.5, mat.grass, 2.7, 0.03, 4.3, 0.02));
  // Concrete stepping stones to front door
  for (let i = 0; i < 4; i++) {
    groundGroup.add(box(1.15, 0.05, 0.65, mat.wallExt, -0.8, 0.04, 3.3 + i * 0.9, 0.02));
  }
  // Pool Deck & Swimming Pool (Rear left / patio)
  groundGroup.add(box(4.4, 0.09, 4.2, mat.wood, -4.2, 0.05, -2.5, 0.02));
  groundGroup.add(box(3.4, 0.08, 2.6, mat.wallExt, -4.2, 0.08, -2.6, 0.02)); // Pool coping border
  groundGroup.add(box(2.9, 0.07, 2.1, new THREE.MeshStandardMaterial({ color: 0x168aad, roughness: 0.3 }), -4.2, 0.085, -2.6, 0.0));
  const poolWater = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.05, 2.1), mat.water);
  poolWater.position.set(-4.2, 0.115, -2.6);
  groundGroup.add(poolWater);
  // Two poolside lounge chairs
  [-4.9, -3.5].forEach(lx => {
    groundGroup.add(box(0.62, 0.10, 1.55, mat.darkMetal, lx, 0.16, -0.75, 0.02));
    groundGroup.add(box(0.56, 0.08, 1.45, mat.linen, lx, 0.24, -0.75, 0.02));
    const back = box(0.56, 0.08, 0.52, mat.linen, lx, 0.42, -0.15, 0.02);
    back.rotation.x = -0.58;
    groundGroup.add(back);
  });

  // Two layered architectural trees
  function addTree(tx, tz, s = 1) {
    const tg = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.11 * s, 0.16 * s, 1.6 * s, 10), mat.darkWood);
    trunk.position.y = 0.8 * s;
    trunk.castShadow = true;
    tg.add(trunk);
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x52804e, roughness: 0.88 });
    [[0, 2.0, 0, 0.72], [-0.35, 1.75, 0.25, 0.52], [0.35, 1.82, -0.22, 0.54]].forEach(([x, y, z, r]) => {
      const c = new THREE.Mesh(new THREE.IcosahedronGeometry(r * s, 1), leafMat);
      c.position.set(x * s, y * s, z * s);
      c.castShadow = true;
      tg.add(c);
    });
    tg.position.set(tx, 0.03, tz);
    groundGroup.add(tg);
  }
  addTree(-5.8, 3.6, 1.05);
  addTree(5.8, -4.2, 0.85);

  // Exterior walkway LED bollards
  [-1.55, -0.05].forEach(bx => {
    groundGroup.add(box(0.10, 0.55, 0.10, mat.darkMetal, bx, 0.30, 4.5, 0.01));
    groundGroup.add(box(0.08, 0.08, 0.08, mat.warmLamp, bx, 0.55, 4.5, 0.01));
  });

  // 2. Garage + Car inside (Right Wing)
  groundGroup.add(box(3.8, 0.08, 5.2, new THREE.MeshStandardMaterial({ color: 0xadb5c4, roughness: 0.78 }), 4.3, 0.04, 1.0, 0.02));
  // Garage exterior side wall, rear wall, front piers & concrete lintel header
  floor1Group.add(box(0.22, 2.74, 5.2, mat.wallExt, 6.1, 1.40, 1.0, 0.02));
  floor1Group.add(box(3.8, 2.74, 0.22, mat.wallExt, 4.3, 1.40, -1.5, 0.02));
  floor1Group.add(box(0.24, 2.74, 0.24, mat.wallAccent, 2.5, 1.40, 3.45, 0.02));
  floor1Group.add(box(0.24, 2.74, 0.24, mat.wallAccent, 6.1, 1.40, 3.45, 0.02));
  floor1Group.add(box(3.84, 0.38, 0.26, mat.wallAccent, 4.3, 2.66, 3.45, 0.02));
  // Semi-raised ribbed garage sectional door recessed beneath lintel header
  for (let i = 0; i < 3; i++) {
    floor1Group.add(box(3.38, 0.22, 0.06, mat.darkMetal, 4.3, 2.38 - i * 0.24, 3.38, 0.01));
  }
  // Wall EV Charger inside garage
  floor1Group.add(box(0.12, 0.45, 0.32, mat.darkMetal, 5.95, 1.35, 1.2, 0.02));
  floor1Group.add(box(0.04, 0.14, 0.08, new THREE.MeshStandardMaterial({ color: 0x81BDF8, emissive: 0x81BDF8, emissiveIntensity: 1.5 }), 5.88, 1.42, 1.2));

  // Detailed 3D Car inside Garage!
  const carGroup = new THREE.Group();
  const carShape = new THREE.Shape();
  carShape.moveTo(-1.45, 0.22);
  carShape.lineTo(-1.42, 0.62);
  carShape.lineTo(-0.82, 0.68);
  carShape.lineTo(-0.35, 1.04);
  carShape.lineTo(0.68, 1.04);
  carShape.lineTo(1.22, 0.66);
  carShape.lineTo(1.48, 0.48);
  carShape.lineTo(1.48, 0.22);
  carShape.closePath();
  const carGeo = new THREE.ExtrudeGeometry(carShape, { depth: 1.46, bevelEnabled: true, bevelThickness: 0.07, bevelSize: 0.05, bevelSegments: 3 });
  carGeo.translate(0, 0, -0.73);
  const carBody = new THREE.Mesh(carGeo, mat.carPaint);
  carBody.castShadow = true;
  carGroup.add(carBody);
  // Tinted Cabin Windshield + Side Windows
  const cabinGeo = new THREE.BoxGeometry(1.48, 0.34, 1.32);
  const cabin = new THREE.Mesh(cabinGeo, new THREE.MeshPhysicalMaterial({ color: 0x121826, roughness: 0.05, metalness: 0.35, clearcoat: 1 }));
  cabin.position.set(0.12, 0.84, 0);
  carGroup.add(cabin);
  // 4 Wheels (Rubber tire + silver rim)
  [[-0.92, -0.74], [-0.92, 0.74], [0.92, -0.74], [0.92, 0.74]].forEach(([wx, wz]) => {
    const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.20, 20), mat.tire);
    tire.rotation.x = Math.PI / 2;
    tire.position.set(wx, 0.28, wz);
    tire.castShadow = true;
    carGroup.add(tire);
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.22, 12), mat.steel);
    rim.rotation.x = Math.PI / 2;
    rim.position.set(wx, 0.28, wz);
    carGroup.add(rim);
  });
  // Headlights & Taillights
  [-0.50, 0.50].forEach(lz => {
    carGroup.add(box(0.06, 0.11, 0.28, mat.warmLamp, 1.50, 0.44, lz, 0.01));
    carGroup.add(box(0.06, 0.10, 0.30, new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 1.2 }), -1.46, 0.52, lz, 0.01));
  });
  carGroup.rotation.y = Math.PI / 2; // Facing out of garage (+Z)
  carGroup.position.set(4.35, 0.06, 0.95);
  carGroup.scale.setScalar(0.95);
  floor1Group.add(carGroup);

  // 3. Main Floor 1 Architectural Shell (Slab + Framed Doors & Windows — NO solid blind block!)
  floor1Group.add(box(7.8, 0.12, 6.4, mat.linen, -0.6, 0.14, -0.2, 0.02)); // Porcelain indoor floor
  // Rear wall split around terrace sliding glass door
  floor1Group.add(box(2.2, 2.68, 0.22, mat.wallExt, -3.4, 1.40, -3.3, 0.02));
  floor1Group.add(box(1.9, 2.68, 0.22, mat.wallExt, 2.35, 1.40, -3.3, 0.02));
  floor1Group.add(box(3.7, 0.48, 0.22, mat.wallExt, -0.45, 2.50, -3.3, 0.02)); // Top lintel above sliding door
  // Sliding glass patio doors toward terrace/pool (2 framed panels + track)
  floor1Group.add(box(3.7, 0.08, 0.12, mat.darkMetal, -0.45, 2.24, -3.3, 0));
  [-1.35, 0.45].forEach((px, idx) => {
    floor1Group.add(box(1.85, 2.04, 0.05, mat.glass, px, 1.22, -3.3 + (idx ? 0.04 : -0.04), 0));
    floor1Group.add(box(0.06, 2.06, 0.08, mat.darkMetal, px - 0.9, 1.22, -3.3, 0));
    floor1Group.add(box(0.06, 2.06, 0.08, mat.darkMetal, px + 0.9, 1.22, -3.3, 0));
  });
  // Side Left Panoramic Curtain Window Wall
  floor1Group.add(box(0.22, 2.68, 1.4, mat.wallExt, -4.4, 1.40, -2.6, 0.02));
  floor1Group.add(box(0.22, 2.68, 1.4, mat.wallExt, -4.4, 1.40, 2.3, 0.02));
  floor1Group.add(box(0.22, 0.45, 3.6, mat.wallExt, -4.4, 2.52, -0.15, 0.02));
  floor1Group.add(box(0.22, 0.35, 3.6, mat.wallExt, -4.4, 0.32, -0.15, 0.02));
  floor1Group.add(box(0.05, 1.85, 3.55, mat.glass, -4.4, 1.40, -0.15, 0));
  [-1.95, -0.15, 1.65].forEach(wz => floor1Group.add(box(0.10, 1.85, 0.06, mat.darkMetal, -4.4, 1.40, wz, 0)));

  // Front Facade Piso 1: Left Window + Main Pivot Wood Door + Partition to Garage
  floor1Group.add(box(0.45, 2.68, 0.22, mat.wallExt, -4.2, 1.40, 2.9, 0.02));
  floor1Group.add(box(2.3, 0.42, 0.22, mat.wallExt, -2.85, 2.52, 2.9, 0.02));
  floor1Group.add(box(2.3, 0.48, 0.22, mat.wallExt, -2.85, 0.40, 2.9, 0.02));
  floor1Group.add(box(2.25, 1.66, 0.05, mat.glass, -2.85, 1.48, 2.9, 0));
  floor1Group.add(box(0.06, 1.68, 0.08, mat.darkMetal, -2.85, 1.48, 2.9, 0));
  // Center pillar & Main Entry Pivot Wood Door + proper aluminum jambs & stainless steel handle
  floor1Group.add(box(0.55, 2.72, 0.24, mat.wallAccent, -1.45, 1.40, 2.9, 0.02));
  floor1Group.add(box(1.12, 2.24, 0.09, mat.wood, -0.60, 1.30, 2.9, 0.01)); // Main Wood Door Leaf
  floor1Group.add(box(1.24, 0.08, 0.16, mat.darkMetal, -0.60, 2.44, 2.9, 0.01)); // Door top frame header
  floor1Group.add(box(0.06, 2.26, 0.16, mat.darkMetal, -1.19, 1.31, 2.9, 0.01)); // Left jamb
  floor1Group.add(box(0.06, 2.26, 0.16, mat.darkMetal, -0.01, 1.31, 2.9, 0.01)); // Right jamb
  floor1Group.add(box(0.04, 1.10, 0.14, mat.steel, -1.02, 1.28, 2.96, 0.01)); // Stainless steel door handle!
  floor1Group.add(box(1.15, 0.34, 0.22, mat.wallExt, -0.60, 2.60, 2.9, 0.02));
  // Right wall connecting to Garage with interior door to garage
  floor1Group.add(box(2.5, 2.68, 0.22, mat.wallExt, 1.20, 1.40, 2.9, 0.02));
  floor1Group.add(box(0.22, 2.68, 6.4, mat.wallExt, 2.40, 1.40, -0.2, 0.02));
  floor1Group.add(box(0.10, 2.08, 0.92, mat.darkWood, 2.40, 1.24, 1.5, 0.01)); // Interior garage access door
  floor1Group.add(box(0.16, 0.04, 0.12, mat.steel, 2.38, 1.15, 1.85, 0.01)); // Handle

  // 4. Floor 1 Detailed Furniture: Living Room, Dining Set, Kitchen Island
  // Living Room Sofa (L-shaped) + cushions + rug + coffee table + TV wall unit
  floor1Group.add(box(2.6, 0.03, 2.0, new THREE.MeshStandardMaterial({ color: 0xc2c8d8, roughness: 0.95 }), -2.6, 0.21, 0.65, 0.01));
  floor1Group.add(box(2.2, 0.34, 0.85, mat.sofa, -2.7, 0.39, 1.25, 0.06)); // Sofa main
  floor1Group.add(box(0.85, 0.34, 1.55, mat.sofa, -3.38, 0.39, 0.52, 0.06)); // Sofa chaise
  floor1Group.add(box(2.2, 0.38, 0.18, mat.sofa, -2.7, 0.66, 1.60, 0.05)); // Backrest
  floor1Group.add(box(0.32, 0.28, 0.14, new THREE.MeshStandardMaterial({ color: 0x81BDF8, roughness: 0.8 }), -2.2, 0.66, 1.44, 0.04)); // Cushion
  floor1Group.add(box(0.32, 0.28, 0.14, new THREE.MeshStandardMaterial({ color: 0xFF9AFF, roughness: 0.8 }), -3.0, 0.66, 1.44, 0.04));
  // Coffee Table
  floor1Group.add(box(1.05, 0.05, 0.62, mat.darkWood, -2.4, 0.46, 0.20, 0.02));
  [[-2.85, -0.05], [-1.95, -0.05], [-2.85, 0.45], [-1.95, 0.45]].forEach(([lx, lz]) => floor1Group.add(box(0.05, 0.24, 0.05, mat.darkMetal, lx, 0.32, lz, 0)));
  // Wall TV Cabinet & Flat Smart TV
  floor1Group.add(box(0.38, 0.36, 1.85, mat.darkWood, -4.12, 0.39, 0.45, 0.02));
  floor1Group.add(box(0.05, 0.72, 1.32, mat.darkMetal, -4.22, 1.15, 0.45, 0.01));
  floor1Group.add(box(0.02, 0.64, 1.24, new THREE.MeshStandardMaterial({ color: 0x1e293b, emissive: 0x81BDF8, emissiveIntensity: 0.25 }), -4.19, 1.15, 0.45, 0));

  // Dining Table + 4 Detailed Chairs + Pendant Lamp
  floor1Group.add(box(1.65, 0.06, 0.92, mat.wood, -1.65, 0.92, -1.85, 0.02));
  [[-2.35, -2.2], [-0.95, -2.2], [-2.35, -1.5], [-0.95, -1.5]].forEach(([lx, lz]) => floor1Group.add(box(0.06, 0.72, 0.06, mat.darkMetal, lx, 0.56, lz, 0.01)));
  [[-2.05, -2.55, 0], [-1.25, -2.55, 0], [-2.05, -1.15, Math.PI], [-1.25, -1.15, Math.PI]].forEach(([cx, cz, rotY]) => {
    const ch = new THREE.Group();
    ch.add(box(0.38, 0.05, 0.38, mat.sofa, 0, 0.46, 0, 0.02));
    ch.add(box(0.38, 0.42, 0.05, mat.wood, 0, 0.68, -0.17, 0.02));
    [[-0.15, -0.15], [0.15, -0.15], [-0.15, 0.15], [0.15, 0.15]].forEach(([px, pz]) => ch.add(box(0.04, 0.44, 0.04, mat.darkMetal, px, 0.22, pz, 0)));
    ch.position.set(cx, 0.20, cz);
    ch.rotation.y = rotY;
    floor1Group.add(ch);
  });
  // Kitchen Counter + Island + 3 Barstools + Faucet
  floor1Group.add(box(1.95, 0.88, 0.65, mat.wallAccent, 1.35, 0.64, -2.85, 0.02)); // Back cabinets
  floor1Group.add(box(1.98, 0.06, 0.68, mat.linen, 1.35, 1.10, -2.85, 0.01)); // Quartz counter
  floor1Group.add(box(0.65, 2.05, 0.68, mat.steel, 2.02, 1.22, -2.15, 0.03)); // Stainless Fridge!
  floor1Group.add(box(1.55, 0.88, 0.72, mat.linen, 1.15, 0.64, -1.45, 0.02)); // Kitchen Island
  floor1Group.add(box(0.04, 0.25, 0.04, mat.steel, 1.15, 1.20, -1.45, 0.01)); // Faucet
  [0.65, 1.15, 1.65].forEach(sx => {
    floor1Group.add(box(0.32, 0.05, 0.32, mat.wood, sx, 0.78, -0.82, 0.04));
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.56, 8), mat.darkMetal);
    pole.position.set(sx, 0.48, -0.82);
    floor1Group.add(pole);
  });

  // 5. Real Architectural Floating Staircase (10 Treads + Steel Stringer + Glass Rail)
  const stairSteps = 10;
  for (let i = 0; i < stairSteps; i++) {
    const sy = 0.38 + i * 0.25;
    const sz = 1.65 - i * 0.28;
    floor1Group.add(box(0.95, 0.07, 0.27, mat.wood, 1.72, sy, sz, 0.01));
  }
  const stringer = box(0.10, 0.14, 3.65, mat.darkMetal, 1.72, 1.50, 0.35, 0.01);
  stringer.rotation.x = 0.72;
  floor1Group.add(stringer);
  const stairRail = box(0.04, 0.85, 3.1, mat.glass, 1.22, 1.92, 0.35, 0);
  stairRail.rotation.x = 0.72;
  floor1Group.add(stairRail);

  // 6. Floor 2 Slab (with clean Stairwell Opening), Rooms, Balcony & Windows
  floor2Group.add(box(5.6, 0.22, 6.4, mat.concrete, -1.7, 2.86, -0.2, 0.02)); // Left main F2 slab (x=-4.5..1.1)
  floor2Group.add(box(4.8, 0.22, 2.2, mat.concrete, 3.6, 2.86, -2.2, 0.02));  // Rear F2 bridge
  floor2Group.add(box(1.3, 0.22, 1.4, mat.concrete, 1.75, 2.86, 2.3, 0.02));  // Front stairwell landing bridge
  floor2Group.add(box(3.8, 0.22, 5.2, mat.concrete, 4.3, 2.86, 1.0, 0.02));   // Over garage (Master Balcony / Terrace!)

  // Floor 2 Rooms, Architectural Sill, Corner Piers & Glass Curtain Walls
  floor2Group.add(box(5.5, 2.48, 0.20, mat.wallExt, -1.7, 4.21, -3.3, 0.02)); // Rear wall F2
  floor2Group.add(box(0.20, 2.48, 6.4, mat.wallExt, -4.4, 4.21, -0.2, 0.02)); // Left wall F2
  // Interior room divider between Suite & Home Office + Interior Door
  floor2Group.add(box(0.14, 2.48, 3.4, mat.wallExt, -1.2, 4.21, -1.6, 0.02));
  floor2Group.add(box(0.16, 2.02, 0.88, mat.wood, -1.2, 3.98, 0.85, 0.01));
  // Front F2 Solid Corner Piers, Concrete Sill, Header & Panoramic Ribbon Window
  floor2Group.add(box(0.32, 2.52, 0.22, mat.wallExt, -4.34, 4.22, 2.9, 0.02)); // Front-left corner pier
  floor2Group.add(box(1.42, 2.52, 0.22, mat.wallExt, 1.69, 4.22, 2.9, 0.02));  // Front-right bedroom pier closing corner
  floor2Group.add(box(5.2, 0.72, 0.22, mat.wallExt, -1.60, 3.33, 2.9, 0.02));  // Bottom sill wall
  floor2Group.add(box(5.2, 0.36, 0.22, mat.wallExt, -1.60, 5.28, 2.9, 0.02));  // Top lintel header
  floor2Group.add(box(5.16, 1.42, 0.06, mat.glass, -1.60, 4.40, 2.9, 0));     // Ribbon glass window
  [-3.2, -1.6, 0.0].forEach(mx => floor2Group.add(box(0.07, 1.44, 0.10, mat.darkMetal, mx, 4.40, 2.9, 0)));
  // Side glass door from Master Bedroom out onto 2nd Floor Balcony over Garage
  floor2Group.add(box(0.20, 2.48, 1.6, mat.wallExt, 2.3, 4.21, -2.5, 0.02));
  floor2Group.add(box(0.20, 2.48, 1.8, mat.wallExt, 2.3, 4.21, 2.05, 0.02));
  floor2Group.add(box(0.20, 0.35, 2.6, mat.wallExt, 2.3, 5.28, -0.2, 0.02));
  floor2Group.add(box(0.05, 2.15, 2.6, mat.glass, 2.3, 4.05, -0.2, 0));
  floor2Group.add(box(0.08, 2.15, 0.08, mat.darkMetal, 2.3, 4.05, -0.2, 0));

  // Floor 2 Balcony over Garage (Wood Deck, Glass Railing & Lounge Chairs)
  floor2Group.add(box(3.55, 0.06, 4.9, mat.wood, 4.28, 2.99, 1.0, 0.02));
  // Tempered glass balcony railing on 3 sides + dark aluminum top handrail
  floor2Group.add(box(3.65, 0.92, 0.05, mat.glass, 4.30, 3.48, 3.45, 0)); // Front rail glass
  floor2Group.add(box(3.72, 0.06, 0.08, mat.darkMetal, 4.30, 3.95, 3.45, 0.01)); // Top handrail
  floor2Group.add(box(0.05, 0.92, 4.95, mat.glass, 6.08, 3.48, 1.0, 0));  // Side rail glass
  floor2Group.add(box(0.08, 0.06, 5.02, mat.darkMetal, 6.08, 3.95, 1.0, 0.01));
  // Balcony outdoor chairs + side table
  [[3.6, 1.8], [4.9, 1.8]].forEach(([bx, bz]) => {
    floor2Group.add(box(0.65, 0.34, 0.65, mat.wallAccent, bx, 3.20, bz, 0.04));
    floor2Group.add(box(0.58, 0.14, 0.56, mat.linen, bx, 3.42, bz, 0.03));
  });
  const balconyTable = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.42, 16), mat.darkWood);
  balconyTable.position.set(4.25, 3.22, 1.85);
  balconyTable.castShadow = true;
  floor2Group.add(balconyTable);

  // Floor 2 Interior Furniture: Master Bed, Nightstands + Glowing Lamps, Closet, Home Office Desk
  // Master Bed (Right Suite)
  floor2Group.add(box(2.05, 0.22, 2.15, mat.darkWood, 0.35, 3.09, -1.9, 0.02)); // Bed frame
  floor2Group.add(box(1.92, 0.24, 2.02, mat.linen, 0.35, 3.31, -1.88, 0.04));   // Mattress
  floor2Group.add(box(1.94, 0.18, 1.38, mat.bedFabric, 0.35, 3.36, -1.55, 0.04)); // Orchid-lavender duvet
  floor2Group.add(box(2.35, 1.05, 0.12, mat.darkWood, 0.35, 3.55, -2.95, 0.03)); // Headboard
  [-0.08, 0.78].forEach(px => floor2Group.add(box(0.62, 0.12, 0.38, mat.linen, px, 3.48, -2.62, 0.04))); // Pillows
  // 2 Nightstands + Glowing Lamps
  [-0.95, 1.65].forEach(nx => {
    floor2Group.add(box(0.42, 0.45, 0.40, mat.wood, nx, 3.20, -2.75, 0.02));
    const lamp = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.14, 0.24, 12), mat.warmLamp);
    lamp.position.set(nx, 3.58, -2.75);
    floor2Group.add(lamp);
  });
  // Built-in Wardrobe Closet
  floor2Group.add(box(0.55, 2.15, 2.1, mat.linen, -0.92, 4.05, -1.2, 0.02));
  // Home Office Desk + Monitor + Chair (Left Bedroom)
  floor2Group.add(box(1.65, 0.06, 0.72, mat.wood, -2.85, 3.74, -2.7, 0.02));
  floor2Group.add(box(0.75, 0.42, 0.04, mat.darkMetal, -2.85, 4.08, -2.88, 0.01));
  floor2Group.add(box(0.46, 0.55, 0.46, mat.wallAccent, -2.85, 3.42, -2.05, 0.04));

  // 7. Roof, Skylight, Pergola & Rooftop Machinery (Solar Panels, Spinning HVAC, Tank)
  roofGroup.add(box(8.8, 0.24, 7.2, mat.wallExt, -0.6, 5.56, -0.2, 0.03)); // Main F2 Roof Overhang Slab
  roofGroup.add(box(9.0, 0.14, 7.4, mat.darkMetal, -0.6, 5.66, -0.2, 0.02)); // Dark perimeter fascia trim
  // Skylight on roof
  roofGroup.add(box(1.9, 0.18, 1.9, mat.darkMetal, 1.6, 5.78, 0.3, 0.02));
  roofGroup.add(box(1.65, 0.06, 1.65, mat.glass, 1.6, 5.87, 0.3, 0));
  // Terrace Pergola over 2nd floor balcony with grounded steel support columns
  roofGroup.add(box(3.8, 0.18, 0.18, mat.darkMetal, 4.3, 5.52, 3.35, 0.01));
  [2.45, 6.08].forEach(px => roofGroup.add(box(0.12, 2.58, 0.12, mat.darkMetal, px, 4.24, 3.35, 0.01)));
  for (let p = 0; p < 6; p++) {
    roofGroup.add(box(3.7, 0.09, 0.11, mat.darkWood, 4.3, 5.54, -1.2 + p * 0.85, 0.01));
  }
  // Rear terrace lower pergola grounded completely on Floor 1
  [-5.6, -2.8].forEach(px => floor1Group.add(box(0.14, 2.65, 0.14, mat.darkMetal, px, 1.38, -4.2, 0.01)));
  floor1Group.add(box(3.4, 0.12, 1.4, mat.darkWood, -4.2, 2.75, -3.6, 0.01));

  // Rooftop Machinery & Solar Equipment!
  // 4 Tilted Photovoltaic Solar Panels on aluminum racks
  for (let s = 0; s < 4; s++) {
    const sx = -3.4 + s * 1.45;
    const panel = box(1.28, 0.05, 1.85, mat.solar, sx, 6.02, -1.55, 0.01);
    panel.rotation.x = 0.35;
    roofGroup.add(panel);
    roofGroup.add(box(0.08, 0.45, 0.08, mat.steel, sx, 5.82, -2.2, 0));
  }
  // Rooftop Industrial HVAC Condenser Unit with spinning blades!
  const hvacGroup = new THREE.Group();
  hvacGroup.position.set(2.55, 6.12, -2.25);
  hvacGroup.add(box(1.15, 0.82, 0.62, new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.4, metalness: 0.5 }), 0, 0, 0, 0.03));
  const fanHousing = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.08, 24), mat.darkMetal);
  fanHousing.rotation.x = Math.PI / 2;
  fanHousing.position.set(-0.18, 0.02, 0.30);
  hvacGroup.add(fanHousing);
  hvacFanRotor = new THREE.Group();
  hvacFanRotor.position.set(-0.18, 0.02, 0.32);
  for (let b = 0; b < 3; b++) {
    const blade = box(0.08, 0.46, 0.02, mat.steel, 0, 0, 0, 0.01);
    blade.rotation.z = (b / 3) * Math.PI * 2;
    hvacFanRotor.add(blade);
  }
  hvacGroup.add(hvacFanRotor);
  roofGroup.add(hvacGroup);

  // Cylindrical Pressurized Hydro-Pneumatic Water Tank + Pipes on roof utility pad
  const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 1.25, 24), mat.steel);
  tank.rotation.z = Math.PI / 2;
  tank.position.set(-2.5, 6.12, 1.65);
  tank.castShadow = true;
  roofGroup.add(tank);
  roofGroup.add(box(0.95, 0.35, 0.55, mat.darkMetal, -2.5, 5.82, 1.65, 0.01));

  /* ---------- MODEL B: COMMERCIAL POS HARDWARE DESK PRO ("ESTACIÓN POS 360°") ---------- */
  const posGroup = new THREE.Group();
  posGroup.visible = false;
  scene.add(posGroup);

  // Commercial Architectural Counter
  posGroup.add(box(5.6, 0.14, 3.2, mat.linen, 0, 0.07, 0, 0.02));
  posGroup.add(box(4.4, 1.45, 1.8, mat.darkWood, 0, 0.85, 0, 0.04));
  posGroup.add(box(4.65, 0.12, 2.05, mat.linen, 0, 1.62, 0, 0.03)); // Quartz countertop
  posGroup.add(box(4.44, 0.05, 1.84, new THREE.MeshStandardMaterial({ color: 0x81BDF8, emissive: 0xD5BEFF, emissiveIntensity: 0.9 }), 0, 1.54, 0, 0));

  // Dual-Screen All-in-One POS Terminal (Live CanvasTexture Screen + Yape QR Back Screen)
  posGroup.add(box(0.58, 0.04, 0.45, mat.darkMetal, -0.35, 1.70, 0.05, 0.02)); // Stand base
  const arm = box(0.18, 0.55, 0.12, mat.darkMetal, -0.35, 1.98, 0.08, 0.02);
  arm.rotation.x = -0.25;
  posGroup.add(arm);
  const screenPivot = new THREE.Group();
  screenPivot.position.set(-0.35, 2.38, 0.0);
  screenPivot.rotation.x = -0.28;
  screenPivot.add(box(1.55, 0.98, 0.08, mat.darkMetal, 0, 0, 0, 0.03)); // Monitor housing
  screenPivot.add(box(1.44, 0.88, 0.02, new THREE.MeshBasicMaterial({ map: posUiTex }), 0, 0, 0.045, 0)); // Cashier Live UI
  // Rear Customer Yape QR Screen!
  screenPivot.add(box(0.88, 0.58, 0.04, mat.darkMetal, 0, -0.05, -0.07, 0.02));
  screenPivot.add(box(0.80, 0.50, 0.02, new THREE.MeshBasicMaterial({ map: qrTex }), 0, -0.05, -0.095, 0));
  posGroup.add(screenPivot);

  // Cash Drawer under terminal
  posGroup.add(box(1.65, 0.24, 1.25, mat.darkMetal, -0.35, 1.76, -0.1, 0.02));
  posGroup.add(box(0.08, 0.08, 0.04, mat.steel, -0.35, 1.76, 0.54, 0.01));

  // 80mm Thermal Printer + Emerging Boleta Paper Receipt!
  posGroup.add(box(0.56, 0.44, 0.68, mat.darkMetal, 0.95, 1.90, 0.15, 0.05));
  posGroup.add(box(0.05, 0.05, 0.05, new THREE.MeshStandardMaterial({ color: 0x22c55e, emissive: 0x22c55e, emissiveIntensity: 1.5 }), 1.15, 2.13, 0.35, 0.01));
  const receipt = box(0.32, 0.42, 0.02, mat.linen, 0.95, 2.28, 0.22, 0);
  receipt.rotation.x = 0.35;
  posGroup.add(receipt);

  // Barcode Laser Scanner on Pedestal + Card Terminal (Izipay/Niubiz)
  posGroup.add(box(0.28, 0.04, 0.28, mat.darkMetal, -1.55, 1.70, 0.30, 0.02));
  const scanPole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 0.52, 12), mat.darkMetal);
  scanPole.position.set(-1.55, 1.96, 0.30);
  scanPole.castShadow = true;
  posGroup.add(scanPole);
  const scanHead = box(0.18, 0.16, 0.38, mat.darkMetal, -1.55, 2.22, 0.22, 0.03);
  scanHead.rotation.x = 0.42;
  posGroup.add(scanHead);
  posGroup.add(box(0.12, 0.04, 0.02, new THREE.MeshBasicMaterial({ color: 0xff3b3b }), -1.55, 2.15, 0.04, 0));

  // Wireless Card POS Terminal on Dock
  const cardTerminal = box(0.28, 0.46, 0.14, mat.darkMetal, 1.65, 1.94, 0.25, 0.03);
  cardTerminal.rotation.x = -0.45;
  posGroup.add(cardTerminal);
  const cardScreen = box(0.22, 0.20, 0.02, new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.7 }), 1.65, 2.02, 0.29, 0.01);
  cardScreen.rotation.x = -0.45;
  posGroup.add(cardScreen);

  /* ---------- Interactive View States & Floor Cutaways ---------- */
  let activeModel = 'villa';
  let activeView = 'ext'; // 'ext', 'p2', 'p1', 'roof'
  let targetCamPos = new THREE.Vector3(14.5, 9.2, 15.2);
  let targetLookAt = new THREE.Vector3(0, 1.8, 0);
  let lerpCam = false;
  let vis = true;
  let raf = null;

  let roofTargetY = 0, f2TargetY = 0;

  function setModel(modelId) {
    activeModel = modelId;
    villaGroup.visible = modelId === 'villa';
    posGroup.visible = modelId === 'pos';
    if (modelId === 'villa') {
      setView('ext');
    } else {
      targetCamPos.set(4.8, 3.6, 5.2);
      targetLookAt.set(0, 1.9, 0);
      lerpCam = true;
    }
    wake();
  }

  function setView(viewId) {
    activeView = viewId;
    if (viewId === 'ext') {
      roofTargetY = 0; f2TargetY = 0;
      targetCamPos.set(14.5, 9.2, 15.2); targetLookAt.set(0, 1.8, 0);
    } else if (viewId === 'p2') {
      roofTargetY = 6.2; f2TargetY = 0;
      targetCamPos.set(8.5, 11.4, 9.5); targetLookAt.set(0.2, 3.2, -0.2);
    } else if (viewId === 'p1') {
      roofTargetY = 9.5; f2TargetY = 7.2;
      targetCamPos.set(8.2, 8.8, 9.8); targetLookAt.set(-0.2, 1.2, -0.3);
    } else if (viewId === 'roof') {
      roofTargetY = 0; f2TargetY = 0;
      targetCamPos.set(7.5, 10.6, -7.2); targetLookAt.set(0, 5.6, -1.0);
    }
    lerpCam = true;
    wake();
  }

  function setFinish(preset) {
    if (preset === 'walnut') {
      mat.wallExt.color.setHex(0xf4f6fb);
      mat.wallAccent.color.setHex(0x32394a);
      mat.carPaint.color.setHex(0x2563eb);
    } else if (preset === 'obsidian') {
      mat.wallExt.color.setHex(0x252a36);
      mat.wallAccent.color.setHex(0x0f131c);
      mat.carPaint.color.setHex(0xd5beff);
    } else {
      mat.wallExt.color.setHex(0xf6efe6);
      mat.wallAccent.color.setHex(0x6d5c4d);
      mat.carPaint.color.setHex(0x81bdf8);
    }
    wake();
  }

  function resize() {
    const r = viewport.getBoundingClientRect();
    if (r.width < 30 || r.height < 30) return;
    renderer.setSize(r.width, r.height, false);
    camera.aspect = r.width / r.height;
    camera.updateProjectionMatrix();
  }

  function frame() {
    if (hvacFanRotor && villaGroup.visible) hvacFanRotor.rotation.z += 0.14;
    if (lerpCam) {
      camera.position.lerp(targetCamPos, 0.08);
      controls.target.lerp(targetLookAt, 0.08);
      if (camera.position.distanceTo(targetCamPos) < 0.05) lerpCam = false;
    }
    roofGroup.position.y += (roofTargetY - roofGroup.position.y) * 0.14;
    floor2Group.position.y += (f2TargetY - floor2Group.position.y) * 0.14;
    roofGroup.visible = roofGroup.position.y < 5.0;
    floor2Group.visible = floor2Group.position.y < 5.0;
    controls.update();
    renderer.render(scene, camera);
  }

  function loop() {
    raf = null;
    const isActiveTab = document.getElementById('p-show3d')?.classList.contains('on');
    if (!vis || document.hidden || !isActiveTab) return;
    frame();
    raf = requestAnimationFrame(loop);
  }

  function wake() {
    const isActiveTab = document.getElementById('p-show3d')?.classList.contains('on');
    if (!raf && vis && !document.hidden && isActiveTab) raf = requestAnimationFrame(loop);
  }

  controls.addEventListener('start', () => { lerpCam = false; });
  new ResizeObserver(() => { resize(); frame(); }).observe(viewport);
  new IntersectionObserver(es => { vis = es[0].isIntersecting; if (vis) wake(); }, { threshold: 0.05 }).observe(viewport);
  document.addEventListener('visibilitychange', wake);

  resize();

  return {
    setModel,
    setView,
    setFinish,
    setOrbit(on) { controls.autoRotate = on; },
    reset() {
      if (activeModel === 'villa') setView(activeView);
      else setModel('pos');
    },
    capturePng() {
      frame();
      return canvas.toDataURL('image/png');
    },
    wake() { resize(); wake(); frame(); },
    resize
  };
}
