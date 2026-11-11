"""Genera la identidad sonora de Zaphyrel (firma de marca y chime de UI). Solo biblioteca estandar."""
import math, random, struct, wave, os

SR = 44100
OUT = os.path.join(os.path.dirname(__file__), "..", "site", "assets")
os.makedirs(OUT, exist_ok=True)
random.seed(7)


def bell(freq, dur, amp=1.0, decay=2.4):
    """Campana cristalina: parciales casi armonicos con decaimiento exponencial (zafiro)."""
    n = int(SR * dur)
    parts = [(1.0, 1.0), (2.0, 0.42), (2.76, 0.22), (4.07, 0.10), (5.4, 0.05)]
    buf = []
    for i in range(n):
        t = i / SR
        attack = min(1.0, t / 0.004)
        s = 0.0
        for k, (m, a) in enumerate(parts):
            s += a * math.sin(2 * math.pi * freq * m * t) * math.exp(-t * decay * (1 + 0.55 * k))
        buf.append(amp * attack * s)
    return buf


def air(dur, amp=0.5):
    """Barrido de aire (zefiro): ruido filtrado cuyo brillo sube y se disipa."""
    n = int(SR * dur)
    buf, lp1, lp2 = [], 0.0, 0.0
    for i in range(n):
        t = i / n
        env = math.sin(math.pi * t) ** 2 * (1 - t * 0.35)
        cutoff = 0.02 + 0.30 * t  # coeficiente del filtro: sube con el tiempo
        x = random.uniform(-1, 1)
        lp1 += cutoff * (x - lp1)
        lp2 += cutoff * (lp1 - lp2)
        buf.append(amp * env * (lp1 - lp2) * 6.0)
    return buf


def mix(dst, src, start):
    s0 = int(SR * start)
    need = s0 + len(src) - len(dst)
    if need > 0:
        dst.extend([0.0] * need)
    for i, v in enumerate(src):
        dst[s0 + i] += v


def finish(buf, path, fade=0.35, peak=0.82):
    m = max(abs(v) for v in buf) or 1.0
    n = len(buf)
    fn = int(SR * fade)
    with wave.open(path, "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        frames = bytearray()
        for i, v in enumerate(buf):
            g = 1.0 if i < n - fn else (n - i) / fn
            frames += struct.pack("<h", int(max(-1, min(1, v / m * peak * g)) * 32767))
        w.writeframes(bytes(frames))


# Firma de marca: nota de campana (Mi6) + quinta grave suave + barrido de aire
sig = []
mix(sig, air(1.9, 0.55), 0.05)
mix(sig, bell(1318.51, 2.2, 1.0, 2.2), 0.00)
mix(sig, bell(1975.53, 1.8, 0.45, 2.8), 0.22)   # Si6, brillo
mix(sig, bell(659.25, 2.0, 0.35, 2.0), 0.00)    # Mi5, cuerpo
finish(sig, os.path.join(OUT, "zaphyrel-signature.wav"))

# Chime de UI: accion completada
ui = []
mix(ui, bell(1567.98, 0.7, 0.8, 5.0), 0.0)
mix(ui, bell(2093.00, 0.7, 0.6, 5.5), 0.09)
finish(ui, os.path.join(OUT, "zaphyrel-chime.wav"), fade=0.12)
print("ok")
