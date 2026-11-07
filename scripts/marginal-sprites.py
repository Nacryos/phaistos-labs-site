"""Sprite sheets for the three marginal creatures (wing beats; the dragon's fire), from the animations made of these very
cutouts in the alvin-site creatures lab (~/Projects/alvin-site/lab/creatures/anim/<slug>/: frame-NN.png + anim.json, every
frame checked: the still body identical in all frames, only wings, tail, legs and fire move).
Writes apps/v2/public/media/marginalia/<name>-frames.webp (all frames in one row; -frames-sm.webp at half size for phones)
and prints the timing for main.js.
usage: python3 scripts/marginal-sprites.py [LAB_ANIM_DIR]
"""
import json, sys, pathlib
from PIL import Image

LAB = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else pathlib.Path.home() / 'Projects/alvin-site/lab/creatures/anim')
OUT = pathlib.Path(__file__).resolve().parents[1] / 'apps/v2/public/media/marginalia'
for name, slug in (('butterfly', 'butterfly'), ('dragon', 'dragon'), ('bird', 'phaistos-bird')):
    a = json.loads((LAB / slug / 'anim.json').read_text())
    fw, fh = a['frame']
    frames = [Image.open(LAB / slug / f'frame-{i:02d}.png').convert('RGBA') for i in range(a['count'])]
    assert all(f.size == (fw, fh) for f in frames), slug
    # trimmed to what any frame reaches (the frame then starts at x0, y0 of the lab's frame)
    boxes = [f.getchannel('A').point(lambda v: 255 if v > 6 else 0).getbbox() for f in frames]
    x0, y0 = min(b[0] for b in boxes), min(b[1] for b in boxes); x1, y1 = max(b[2] for b in boxes), max(b[3] for b in boxes)
    frames = [f.crop((x0, y0, x1, y1)) for f in frames]; fw, fh = x1 - x0, y1 - y0
    sheet = Image.new('RGBA', (fw * len(frames), fh))
    for i, f in enumerate(frames): sheet.paste(f, (i * fw, 0))
    sheet.save(OUT / f'{name}-frames.webp', quality=74, alpha_quality=85, method=6)
    # phones (drawn ~70 css px wide): half size, smoother than letting the browser shrink the full sheet, a quarter the bytes
    small = Image.new('RGBA', (round(fw / 2) * len(frames), round(fh / 2)))
    for i, f in enumerate(frames): small.paste(f.resize((round(fw / 2), round(fh / 2)), Image.LANCZOS), (i * round(fw / 2), 0))
    small.save(OUT / f'{name}-frames-sm.webp', quality=78, alpha_quality=88, method=6)
    seqs = {k: v if isinstance(v, list) else list(range(v)) for k, v in a['sequences'].items()}
    ox, oy = a['offset'][0] - x0, a['offset'][1] - y0   # where the still cutout sits in a trimmed frame
    meta = {'frame': [fw, fh], 'count': len(frames), 'fps': a['fps'], 'offset': [ox, oy], 'size': a['size'], 'seq': seqs, 'play': a['play']}
    kb = lambda f: (OUT / f).stat().st_size // 1024
    print(name, f"{kb(f'{name}-frames.webp')} KB, phones {kb(f'{name}-frames-sm.webp')} KB", json.dumps(meta, separators=(',', ':')))
