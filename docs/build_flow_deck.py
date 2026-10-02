#!/usr/bin/env python3
"""Build THE FLOW webinar deck as an editable, Quest-styled PowerPoint.

Slide wording comes from the script below; speaker notes are pulled from
docs/The-Flow-Webinar-Script.md (the "Say" and "Do" lines for each slide),
so the deck and the script stay in sync. Import the .pptx into Canva.
"""

import io
import random
import re
from pathlib import Path

from lxml import etree
from PIL import Image
from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_CONNECTOR, MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.oxml.ns import qn
from pptx.util import Emu, Inches, Pt

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"
ASSETS = ROOT / "client" / "public" / "manus-storage"
SCRIPT = DOCS / "The-Flow-Webinar-Script.md"
OUT = DOCS / "The-Flow-Webinar.pptx"

# ---- palette ---------------------------------------------------------------
GOLD = "C9A84C"
GOLD_HI = "F0D58A"
GOLD_DEEP = "8A6A2A"
EMBER = "E8963A"
CREAM = "EFE3C6"
MUTED = "B9A57A"
INK = "050400"
PANEL = "120E07"
WARN = "D9654A"

HEAD = "Cinzel"
BODY = "Montserrat"

W, H = 13.333, 7.5
SECTIONS = ["I · THE RESET", "II · THE SECRETS", "III · THE PROOF", "IV · THE NEXT STEP"]

prs = Presentation()
prs.slide_width = Inches(W)
prs.slide_height = Inches(H)
BLANK = prs.slide_layouts[6]


# ---- low-level helpers -----------------------------------------------------
def _strip_style(shape):
    st = shape._element.find(qn("p:style"))
    if st is not None:
        shape._element.remove(st)


def _alpha(clr_el, opacity):
    if opacity is not None and opacity < 1:
        a = etree.SubElement(clr_el, qn("a:alpha"))
        a.set("val", str(int(opacity * 100000)))


BLEND_BG = "0C0906"


def blend(hex_, opacity, bg=BLEND_BG):
    """Mix a colour over the dark background. Canva drops shape transparency
    on import, so translucent fills and lines are baked to solid colours."""
    if opacity is None or opacity >= 1:
        return hex_
    a = [int(hex_[i:i + 2], 16) for i in (0, 2, 4)]
    b = [int(bg[i:i + 2], 16) for i in (0, 2, 4)]
    return "".join(f"{round(x * opacity + y * (1 - opacity)):02X}" for x, y in zip(a, b))


def fill(shape, hex_, opacity=None):
    shape.fill.solid()
    shape.fill.fore_color.rgb = RGBColor.from_string(blend(hex_, opacity))


def no_fill(shape):
    shape.fill.background()


def line(shape, hex_=None, width=1.0, opacity=None, dash=None):
    if hex_ is None:
        shape.line.fill.background()
        return
    shape.line.color.rgb = RGBColor.from_string(blend(hex_, opacity))
    shape.line.width = Pt(width)
    ln = shape._element.spPr.find(qn("a:ln"))
    if dash:
        d = etree.SubElement(ln, qn("a:prstDash"))
        d.set("val", dash)


def gradient(shape, stops, radial=True, center=(50, 45), angle=90):
    """stops: [(pos 0-100, hex, opacity)]"""
    spPr = shape._element.spPr
    for tag in ("a:solidFill", "a:noFill", "a:gradFill"):
        for el in spPr.findall(qn(tag)):
            spPr.remove(el)
    g = etree.Element(qn("a:gradFill"))
    g.set("rotWithShape", "1")
    lst = etree.SubElement(g, qn("a:gsLst"))
    for pos, hex_, op in stops:
        gs = etree.SubElement(lst, qn("a:gs"))
        gs.set("pos", str(int(pos * 1000)))
        c = etree.SubElement(gs, qn("a:srgbClr"))
        c.set("val", hex_)
        _alpha(c, op)
    if radial:
        p = etree.SubElement(g, qn("a:path"))
        p.set("path", "circle")
        r = etree.SubElement(p, qn("a:fillToRect"))
        cx, cy = center
        r.set("l", str(cx * 1000)); r.set("t", str(cy * 1000))
        r.set("r", str((100 - cx) * 1000)); r.set("b", str((100 - cy) * 1000))
    else:
        lin = etree.SubElement(g, qn("a:lin"))
        lin.set("ang", str(angle * 60000)); lin.set("scaled", "0")
    geom = spPr.find(qn("a:prstGeom"))
    geom.addnext(g)


def shape(slide, kind, x, y, w, h, fill_hex=None, opacity=None, line_hex=None,
          lw=1.0, line_op=None, dash=None, rot=0):
    s = slide.shapes.add_shape(kind, Inches(x), Inches(y), Inches(w), Inches(h))
    _strip_style(s)
    if fill_hex:
        fill(s, fill_hex, opacity)
    else:
        no_fill(s)
    line(s, line_hex, lw, line_op, dash)
    if rot:
        s.rotation = rot
    s.text_frame.text = ""
    return s


def hline(slide, x1, y, x2, hex_=GOLD, width=1.0, opacity=None):
    c = slide.shapes.add_connector(MSO_CONNECTOR.STRAIGHT, Inches(x1), Inches(y),
                                   Inches(x2), Inches(y))
    line(c, hex_, width, opacity)
    return c


def text(slide, x, y, w, h, runs, align="center", anchor="top", inset=0.0):
    """runs: list of paragraphs; each paragraph = dict(t, font, size, color,
    bold, italic, spc, space_after, line)."""
    tb = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    tf = tb.text_frame
    tf.word_wrap = True
    for m in ("margin_left", "margin_right", "margin_top", "margin_bottom"):
        setattr(tf, m, Inches(inset))
    tf.vertical_anchor = {"top": MSO_ANCHOR.TOP, "middle": MSO_ANCHOR.MIDDLE,
                          "bottom": MSO_ANCHOR.BOTTOM}[anchor]
    # A "\n" inside a run renders as a justified break in some apps; make each
    # line its own paragraph instead.
    runs = [dict(p, t=ln) for p in runs for ln in p["t"].split("\n")]
    for i, p in enumerate(runs):
        para = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        para.alignment = {"center": PP_ALIGN.CENTER, "left": PP_ALIGN.LEFT,
                          "right": PP_ALIGN.RIGHT}[p.get("align", align)]
        if p.get("line"):
            para.line_spacing = p["line"]
        if p.get("space_after") is not None:
            para.space_after = Pt(p["space_after"])
        r = para.add_run()
        r.text = p["t"]
        f = r.font
        f.name = p.get("font", BODY)
        f.size = Pt(p.get("size", 20))
        f.bold = p.get("bold", False)
        f.italic = p.get("italic", False)
        f.color.rgb = RGBColor.from_string(p.get("color", CREAM))
        if p.get("spc"):
            r._r.get_or_add_rPr().set("spc", str(int(p["spc"] * 100)))
    return tb


def est_lines(t, size, width, em=0.57):
    """Rough line count for wrapped text (em = average glyph width / size)."""
    per = max(1, int(width / (size * em / 72)))
    n = 0
    for para in t.split("\n"):
        cur = 0
        n += 1
        for w in para.split():
            if cur and cur + 1 + len(w) > per:
                n += 1
                cur = len(w)
            else:
                cur += (1 if cur else 0) + len(w)
    return n


def text_h(t, size, width, em=0.57, line=1.2):
    return est_lines(t, size, width, em) * size * line / 72


def H1(t, size=44, color=GOLD_HI, **kw):
    return dict(t=t, font=HEAD, size=size, color=color, bold=True, line=1.05, **kw)


def P(t, size=22, color=CREAM, **kw):
    return dict(t=t, font=BODY, size=size, color=color, line=1.2, **kw)


def LBL(t, size=13, color=GOLD, spc=4, **kw):
    return dict(t=t, font=BODY, size=size, color=color, bold=True, spc=spc, **kw)


# ---- decorative system -----------------------------------------------------
_CACHE = {}
TMP = None


def _radial_mask(size, power=1.0, scale=255):
    from PIL import ImageOps
    rg = ImageOps.invert(Image.radial_gradient("L"))          # 255 centre -> 0 edge
    rg = rg.point(lambda v: int(((v / 255) ** power) * scale))
    return rg.resize(size, Image.BICUBIC)


def bg_image(center):
    key = ("bg", center)
    if key not in _CACHE:
        px_w, px_h = 1920, 1080
        im = Image.new("RGB", (px_w, px_h), "#030302")
        cx, cy = int(px_w * center[0] / 100), int(px_h * center[1] / 100)
        for col, rad, pw in [("#0C0905", 1500, 0.8), ("#1A1309", 1000, 1.2),
                             ("#23190B", 560, 1.6)]:
            layer = Image.new("RGB", (2 * rad, 2 * rad), col)
            mask = _radial_mask((2 * rad, 2 * rad), pw)
            im.paste(layer, (cx - rad, cy - rad), mask)
        path = TMP / f"bg_{center[0]}_{center[1]}.jpg"
        im.save(path, quality=90)
        _CACHE[key] = path
    return _CACHE[key]


def glow_image(opacity):
    key = ("glow", round(opacity, 2))
    if key not in _CACHE:
        n = 600
        im = Image.new("RGBA", (n, n), "#" + GOLD)
        im.putalpha(_radial_mask((n, n), 1.7, int(255 * opacity)))
        path = TMP / f"glow_{int(opacity * 100)}.png"
        im.save(path)
        _CACHE[key] = path
    return _CACHE[key]


def background(slide, seed, glow=(50, 42)):
    slide.shapes.add_picture(str(bg_image(glow)), 0, 0, Inches(W), Inches(H))
    rnd = random.Random(seed)
    for _ in range(26):
        sz = rnd.choice([0.03, 0.04, 0.05, 0.06, 0.08])
        x, y = rnd.uniform(0.4, W - 0.4), rnd.uniform(0.4, H - 0.6)
        shape(slide, MSO_SHAPE.OVAL, x, y, sz, sz,
              rnd.choice([GOLD_HI, EMBER, GOLD]), rnd.uniform(0.25, 0.8))


def frame(slide):
    m = 0.28
    shape(slide, MSO_SHAPE.RECTANGLE, m, m, W - 2 * m, H - 2 * m,
          line_hex=GOLD, lw=1.25, line_op=0.55)
    m2 = 0.38
    shape(slide, MSO_SHAPE.RECTANGLE, m2, m2, W - 2 * m2, H - 2 * m2,
          line_hex=GOLD, lw=0.5, line_op=0.3)
    L = 0.55
    for cx, cy, sx, sy in [(m, m, 1, 1), (W - m, m, -1, 1),
                           (m, H - m, 1, -1), (W - m, H - m, -1, -1)]:
        hline(slide, cx, cy, cx + sx * L, GOLD_HI, 3)
        c = slide.shapes.add_connector(MSO_CONNECTOR.STRAIGHT, Inches(cx), Inches(cy),
                                       Inches(cx), Inches(cy + sy * L))
        line(c, GOLD_HI, 3)
        d = 0.16
        shape(slide, MSO_SHAPE.DIAMOND, cx - d / 2 + sx * 0.1, cy - d / 2 + sy * 0.1,
              d, d, GOLD_HI)


def hud(slide, sec):
    y = H - 0.62
    text(slide, 0.62, y - 0.02, 4.5, 0.3,
         [dict(t="THE FLOW  ·  MALIK EAST", font=HEAD, size=10, color=MUTED, spc=2)],
         align="left")
    seg_w, gap = 0.42, 0.07
    x0 = W - 0.62 - (4 * seg_w + 3 * gap)
    text(slide, x0 - 3.2, y - 0.02, 3.1, 0.3,
         [dict(t=SECTIONS[sec], font=BODY, size=9.5, color=MUTED, bold=True, spc=2)],
         align="right")
    for i in range(4):
        x = x0 + i * (seg_w + gap)
        if i < sec:
            shape(slide, MSO_SHAPE.RECTANGLE, x, y + 0.08, seg_w, 0.07, GOLD, 0.6)
        elif i == sec:
            shape(slide, MSO_SHAPE.RECTANGLE, x, y + 0.08, seg_w, 0.07, GOLD_HI)
        else:
            shape(slide, MSO_SHAPE.RECTANGLE, x, y + 0.08, seg_w, 0.07,
                  line_hex=GOLD, lw=0.75, line_op=0.5)


def label(slide, t, y=0.72, color=GOLD, warn=False, cx=None, rule=1.35):
    """Small-caps label flanked by gold rules and diamonds."""
    col = WARN if warn else color
    tw = max(2.0, 0.155 * len(t) + 0.6)
    x = (cx if cx is not None else W / 2) - tw / 2
    text(slide, x, y, tw, 0.36, [LBL(t, color=col)], anchor="middle")
    for side in (-1, 1):
        x1 = x - 0.15 if side < 0 else x + tw + 0.15
        x2 = x1 + side * rule
        hline(slide, min(x1, x2), y + 0.18, max(x1, x2), col, 1, 0.7)
        d = 0.11
        shape(slide, MSO_SHAPE.DIAMOND, x2 - d / 2, y + 0.18 - d / 2, d, d, col)


def divider(slide, y, width=3.2):
    x = (W - width) / 2
    hline(slide, x, y, x + width / 2 - 0.15, GOLD, 1, 0.8)
    hline(slide, x + width / 2 + 0.15, y, x + width, GOLD, 1, 0.8)
    d = 0.14
    shape(slide, MSO_SHAPE.DIAMOND, W / 2 - d / 2, y - d / 2, d, d, GOLD_HI)


def glow(slide, cx, cy, r, opacity=0.35):
    slide.shapes.add_picture(str(glow_image(opacity)), Inches(cx - r), Inches(cy - r),
                             Inches(2 * r), Inches(2 * r))


def ring(slide, cx, cy, r, nodes=7, node_r=0.16, op=0.55, labels=None):
    import math
    shape(slide, MSO_SHAPE.OVAL, cx - r, cy - r, 2 * r, 2 * r,
          line_hex=GOLD, lw=1.5, line_op=op)
    shape(slide, MSO_SHAPE.OVAL, cx - r - 0.09, cy - r - 0.09, 2 * r + 0.18,
          2 * r + 0.18, line_hex=GOLD, lw=0.5, line_op=op * 0.5)
    for i in range(nodes):
        a = -math.pi / 2 + 2 * math.pi * i / nodes
        nx, ny = cx + r * math.cos(a), cy + r * math.sin(a)
        shape(slide, MSO_SHAPE.OVAL, nx - node_r, ny - node_r, 2 * node_r, 2 * node_r,
              "1A1309", line_hex=GOLD_HI, lw=1.5)
        if labels:
            text(slide, nx - node_r, ny - node_r, 2 * node_r, 2 * node_r,
                 [dict(t=labels[i], font=HEAD, size=12, color=GOLD_HI, bold=True)],
                 anchor="middle")


def medallion(slide, cx, cy, r, t, size=22):
    shape(slide, MSO_SHAPE.OVAL, cx - r, cy - r, 2 * r, 2 * r, "1A1309",
          line_hex=GOLD_HI, lw=2)
    shape(slide, MSO_SHAPE.OVAL, cx - r + 0.06, cy - r + 0.06, 2 * r - 0.12,
          2 * r - 0.12, line_hex=GOLD, lw=0.75, line_op=0.6)
    text(slide, cx - r, cy - r, 2 * r, 2 * r,
         [dict(t=t, font=HEAD, size=size, color=GOLD_HI, bold=True)], anchor="middle")


def panel(slide, x, y, w, h, op=0.72, edge=GOLD, edge_op=0.65, dash=None):
    p = shape(slide, MSO_SHAPE.ROUNDED_RECTANGLE, x, y, w, h, PANEL, op,
              line_hex=edge, lw=1.25, line_op=edge_op, dash=dash)
    p.adjustments[0] = 0.06
    return p


def bullet_heights(items, size, width, pad=0.22):
    return [text_h(t, size, width) + pad for t in items]


def bullets(slide, x, y, w, items, size=22, gap=None, color=CREAM, marker=GOLD_HI):
    """Diamond bullets; each row is as tall as its wrapped text."""
    hs = bullet_heights(items, size, w - 0.35)
    if gap:
        hs = [max(h, gap) for h in hs]
    yy = y
    for it, h in zip(items, hs):
        d = 0.15
        shape(slide, MSO_SHAPE.DIAMOND, x, yy + size / 72 * 0.42, d, d, marker)
        text(slide, x + 0.35, yy, w - 0.35, h, [P(it, size, color)], align="left")
        yy += h
    return yy - y


def image(slide, path, x, y, w=None, h=None):
    kw = {}
    if w:
        kw["width"] = Inches(w)
    if h:
        kw["height"] = Inches(h)
    return slide.shapes.add_picture(str(path), Inches(x), Inches(y), **kw)


# ---- slide templates -------------------------------------------------------
def base(sec, seed, glow_at=(50, 42)):
    s = prs.slides.add_slide(BLANK)
    background(s, seed, glow_at)
    frame(s)
    hud(s, sec)
    return s


def statement(sec, lab, head, subs=(), head_size=50, warn=False, extra=None,
              extra_h=0.0):
    s = base(sec, len(prs.slides._sldIdLst) + 7)
    glow(s, W / 2, 3.3, 3.2, 0.22)
    hw = W - 2.6
    hh = text_h(head, head_size, hw, em=0.72, line=1.05)
    sub_w = W - 3.0
    sizes = [24 if i == 0 else 20 for i in range(len(subs))]
    sh = sum(text_h(t, z, sub_w) + 0.12 for t, z in zip(subs, sizes))
    block = hh + 0.45 + sh + (extra_h + 0.3 if extra_h else 0)
    top = max(1.55, 1.6 + (5.0 - block) / 2)
    label(s, lab, y=top - 0.62, warn=warn)
    text(s, 1.3, top, hw, hh + 0.1, [H1(head, head_size)], anchor="bottom")
    y = top + hh + 0.3
    divider(s, y)
    if subs:
        text(s, 1.5, y + 0.2, sub_w, sh + 0.2,
             [P(t, z, CREAM if i == 0 else MUTED, space_after=8)
              for i, (t, z) in enumerate(zip(subs, sizes))])
    if extra:
        extra(s, y + 0.2 + sh + 0.35)
    return s


def section(sec, lab, numeral, head, sub):
    s = base(sec, len(prs.slides._sldIdLst) + 11, glow_at=(50, 40))
    glow(s, W / 2, 2.55, 2.4, 0.4)
    ring(s, W / 2, 2.55, 1.15, nodes=7, node_r=0.09, op=0.7)
    medallion(s, W / 2, 2.55, 0.72, numeral, 40)
    label(s, lab, y=4.05)
    text(s, 1.0, 4.45, W - 2.0, 1.2, [H1(head, 60)], anchor="middle")
    text(s, 1.5, 5.65, W - 3.0, 0.6, [P(sub, 22, MUTED, italic=True)])
    return s


def title_h(title, title_size):
    return text_h(title, title_size, W - 2.0, em=0.72, line=1.05)


def centered_top(title, title_size, body_h):
    """Top y for the label so label + title + body sit centred in the frame."""
    total = 0.43 + title_h(title, title_size) + 0.3 + body_h
    return 0.72 + max(0.0, (5.75 - total) / 2)


def title_block(s, lab, title, title_size, warn=False, y0=0.72):
    label(s, lab, y=y0, warn=warn)
    hh = title_h(title, title_size)
    text(s, 1.0, y0 + 0.43, W - 2.0, hh + 0.1, [H1(title, title_size)], anchor="middle")
    return y0 + 0.43 + hh + 0.3


def list_slide(sec, lab, title, items, size=24, title_size=40, footer=None,
               numbered=False, warn=False, highlight=None, sub=None):
    s = base(sec, len(prs.slides._sldIdLst) + 3)
    pw = 10.0
    px = (W - pw) / 2
    inner_x = px + (1.1 if numbered else 0.55)
    inner_w = pw - (inner_x - px) - 0.4
    hs = bullet_heights(items, size, inner_w if numbered else inner_w - 0.35)
    hl_h = text_h(highlight, 20, pw - 0.8) + 0.2 if highlight else 0
    ph = sum(hs) + 0.45 + hl_h
    body = ph + (0.45 if sub else 0) + (text_h(footer, 19, W - 2.4) + 0.2 if footer else 0)
    top = title_block(s, lab, title, title_size, warn,
                      y0=centered_top(title, title_size, body))
    if sub:
        text(s, 1.5, top - 0.1, W - 3.0, 0.5, [P(sub, 20, MUTED, italic=True)])
        top += 0.45
    panel(s, px, top, pw, ph, edge=WARN if warn else GOLD)
    if numbered:
        yy = top + 0.22
        for i, (it, h) in enumerate(zip(items, hs)):
            medallion(s, px + 0.6, yy + size / 72 * 0.62, 0.24, str(i + 1), 14)
            text(s, inner_x, yy, inner_w, h, [P(it, size)], align="left")
            yy += h
    else:
        bullets(s, inner_x, top + 0.22, inner_w, items, size)
    if highlight:
        text(s, px + 0.4, top + 0.2 + sum(hs), pw - 0.8, hl_h,
             [P(highlight, 20, GOLD_HI, bold=True, italic=True)], anchor="middle")
    if footer:
        text(s, 1.2, top + ph + 0.15, W - 2.4, 0.7, [P(footer, 19, GOLD_HI, italic=True)])
    return s


def cards(sec, lab, title, items, footer=None, numerals=None, title_size=40,
          body_size=18, dashed=False, head_size=None):
    """items: [(heading, body)] or [(heading, [lines])]; heights are measured."""
    s = base(sec, len(prs.slides._sldIdLst) + 5)
    n = len(items)
    gap = 0.35
    cw = (W - 2.0 - gap * (n - 1)) / n
    hsz = head_size or (21 if n <= 3 else 17)
    med = 0.95 if numerals else 0.0
    heads = [text_h(hd, hsz, cw - 0.4, em=0.75, line=1.05) for hd, _ in items]
    bodies = []
    for _, body in items:
        lines = body if isinstance(body, list) else [body]
        bodies.append(sum(text_h(t, body_size, cw - 0.5) + 0.08 for t in lines))
    hh = max(heads)
    card_h = 0.25 + med + hh + 0.2 + max(bodies) + 0.4
    body = card_h + (text_h(footer, 19, W - 2.4) + 0.2 if footer else 0)
    top = title_block(s, lab, title, title_size,
                      y0=centered_top(title, title_size, body))
    for i, (hd, body) in enumerate(items):
        x = 1.0 + i * (cw + gap)
        panel(s, x, top, cw, card_h, dash="dash" if dashed else None)
        y = top + 0.25
        if numerals:
            medallion(s, x + cw / 2, y + 0.36, 0.34, numerals[i], 19)
            y += med
        text(s, x + 0.2, y, cw - 0.4, hh,
             [dict(t=hd, font=HEAD, size=hsz, color=GOLD_HI, bold=True, line=1.05)],
             anchor="middle")
        lines = body if isinstance(body, list) else [body]
        text(s, x + 0.25, y + hh + 0.2, cw - 0.5, max(bodies),
             [P(t, body_size, CREAM, space_after=6) for t in lines])
    if footer:
        text(s, 1.2, top + card_h + 0.2, W - 2.4, 0.7, [P(footer, 19, GOLD_HI, italic=True)])
    return s


# ---- the deck ----------------------------------------------------------------
def build(assets):
    cover, portrait, logo = assets
    R, S, PR, N = 0, 1, 2, 3

    # 1 — title
    s = base(R, 1, glow_at=(50, 48))
    glow(s, W / 2, 3.55, 3.4, 0.4)
    ring(s, W / 2, 3.55, 2.85, nodes=7, node_r=0.2, op=0.6,
         labels=["1", "2", "3", "4", "5", "6", "7"])
    image(s, logo, W / 2 - 0.4, 1.05, w=0.8)
    text(s, 3.9, 2.0, W - 7.8, 0.4, [LBL("THE GENERATIONAL WEALTH QUEST", 13, GOLD_HI)])
    text(s, 3.6, 2.4, W - 7.2, 1.3, [H1("THE FLOW", 80)], anchor="middle")
    divider(s, 3.85, 3.4)
    text(s, 4.1, 4.0, W - 8.2, 0.9,
         [P("The 7 levels every family needs —", 19, CREAM, italic=True),
          P("in the order that actually works", 19, CREAM, italic=True)])
    text(s, 3.4, 4.95, W - 6.8, 1.1,
         [dict(t="MALIK EAST", font=HEAD, size=19, color=GOLD_HI, bold=True, spc=3),
          P("Licensed Life Insurance Agent", 13, MUTED),
          P("Founder, 7Band Financial Agency & Arise Credit Pro", 13, MUTED)])

    # 2–6
    statement(R, "LEVEL 0 · CLEARED", "You showed up.",
              ["Most people only think about changing their money.",
               "You're here. That's Level 0 — and you've already cleared it."], 64)
    list_slide(R, "BEFORE WE BEGIN", "Rules of the Quest",
               ["Grab a pen and paper", "Stay to the end — there's a gift",
                "Use the chat — this is interactive",
                "This is education, not personal advice"], numbered=True)

    def scale(s, y):
        for i in range(10):
            x = 2.8 + i * 0.86
            medallion(s, x, y + 0.3, 0.28, str(i + 1), 15)
    statement(R, "PLAYER CHECK-IN",
              "How confident are you in your financial plan right now?",
              ["Type a number from 1 to 10 in the chat."], 42, extra=scale,
              extra_h=0.6)
    list_slide(R, "PLAYER CHECK-IN", "Where are you on the map?",
               ["I don't really track my money", "My credit is holding me back",
                "I have a business but no structure",
                "I'm stable, but my money isn't growing",
                "I want to leave something behind"],
               numbered=True, size=22, sub="Type your number in the chat")
    cards(R, "THE PROBLEM", "You work hard. True wealth stays locked. Why?",
          [("No budgeting system", "You don't know where it goes"),
           ("No strong credit profile", "Every loan costs you more"),
           ("No business structure", "Business risk lands on you personally"),
           ("No generational plan", "What you build ends with you")],
          numerals=["1", "2", "3", "4"], title_size=36)

    # 7–11 belief resets + fit
    statement(R, "BELIEF RESET #1", "You're not bad with money.",
              ["Nobody handed you the map.",
               "Wealthy families pass down a sequence — not just money."], 58)
    statement(R, "BELIEF RESET #2", "Your credit report is not a verdict.",
              ["It's a file — and files have rules.",
               "What's wrong can be challenged. What's accurate ages off. "
               "Nobody can legally delete the truth."], 52)
    statement(R, "BELIEF RESET #3", "Wealth is not a product.",
              ["It's an order of operations.",
               "Most people fail because they start in the middle."], 58)
    list_slide(R, "WHO THIS IS FOR",
               "The Flow is for the ones who don't have it all together.",
               ["First in your family to build",
                "You want to understand before you sign anything",
                "You're thinking about what you'll leave behind"], title_size=36)
    list_slide(R, "WHO THIS IS NOT FOR", "This is not for you if…",
               ["You want a get-rich-quick shortcut",
                "You want someone to “delete everything”",
                "You're not willing to look at your own numbers"],
               footer="The Flow starts with honesty.")

    # 12 — the guide
    s = base(R, 12)
    glow(s, 3.6, 3.6, 2.6, 0.3)
    shape(s, MSO_SHAPE.RECTANGLE, 1.55, 1.05, 4.1, 4.9, line_hex=GOLD_HI, lw=2)
    image(s, portrait, 1.7, 1.2, h=4.6)
    label(s, "THE GUIDE", y=1.25, cx=9.3, rule=0.9)
    text(s, 6.3, 1.85, 6.0, 1.1, [H1("Malik East", 54)], anchor="middle")
    bullets(s, 6.35, 3.15, 6.2,
            ["Licensed Life Insurance Agent",
             "Founder, 7Band Financial Agency",
             "Founder, Arise Credit Pro",
             "Author, The American Money Tree (coming soon)"], 22, 0.62)

    # 13 — get yo mind right
    statement(R, "THE WHY", "“Get yo mind right.”",
              ["— Dr. Renaldo Murry, Band Director",
               "A deep why is what keeps you going when you get tested."], 66)
    list_slide(R, "WHAT CHANGED MY MIND", "The books that opened the door",
               ["Money. Wealth. Life Insurance.", "The LASER Fund", "Cash in Motion",
                "Unshakeable", "Becoming Your Own Banker"], size=22,
               footer="…and the parable of the talents.")
    statement(R, "WHY I'M HERE",
              "The principles that built wealth for generations aren't secret anymore.",
              ["I'm here to hand you the map — including the parts most people leave "
               "out: the costs, the risks, and who it isn't for."], 40)
    statement(R, "THE ONLY QUESTION TONIGHT", "Can this work for someone like me?",
              ["If the honest answer for you is “not yet,” I'll tell you that too."], 56)
    statement(R, "PERMISSION", "Can I ask you something?",
              ["If I help you tonight — can I take a few minutes at the end to show "
               "you how to get more help, for those who want it?",
               "Type YES in the chat."], 54)

    statement(R, "STAY TO THE END", "Your free gift: The Ultimate Budget Guide",
              ["Track your income and expenses every month — the first step of the Tutorial."],
              44)
    cards(R, "TONIGHT'S QUEST", "Three secrets",
          [("The Order", "Why most people start in the middle"),
           ("The Foundation", "How your credit file actually works"),
           ("The Engine", "How protection and growth work — and when they don't fit")],
          numerals=["I", "II", "III"])

    # 20–23 Secret 1
    section(S, "SECRET #1", "I", "The Order", "Why most people start in the middle")
    cards(S, "THE TUTORIAL", "Pre-quest readiness",
          [("Mindset", "Your why — the reason you keep going when you get tested"),
           ("Cash Flow", "Track your income and expenses. Stop the leaks."),
           ("Risk Audit", "Earn the right to take calculated risks — don't skip to them")],
          numerals=["◈", "◈", "◈"])

    # 22 — quest map
    s = base(S, 22)
    label(s, "THE QUEST MAP")
    text(s, 1.0, 1.15, W - 2.0, 1.0, [H1("7 levels to a family legacy", 40)],
         anchor="middle")
    levels = [("1", "The Credit\nShield"), ("2", "The Business\nFirewall"),
              ("3", "Capital\nReadiness"), ("4", "The\nEngine"), ("5", "The\nFortress"),
              ("6", "The\nTransfer"), ("7", "The Generational\nTree")]
    xs = [1.35 + i * 1.77 for i in range(7)]
    y = 3.75
    hline(s, xs[0], y, xs[-1], GOLD, 2, 0.7)
    for (n, name), x in zip(levels, xs):
        glow(s, x, y, 0.75, 0.25)
        medallion(s, x, y, 0.42, n, 22)
        text(s, x - 0.86, y + 0.55, 1.72, 0.9,
             [dict(t=name, font=HEAD, size=13, color=CREAM, bold=True, line=1.0)])
    for (a, b, nm) in [(0, 2, "THE FOUNDATION"), (3, 3, "THE ACCELERATION"),
                       (4, 6, "THE LEGACY")]:
        x1, x2 = xs[a] - 0.72, xs[b] + 0.72
        hline(s, x1 + 0.05, 2.75, x2 - 0.05, GOLD_HI, 1.25, 0.8)
        mid = (x1 + x2) / 2
        text(s, mid - 1.4, 2.3, 2.8, 0.35, [LBL(nm, 11, GOLD_HI, spc=2)])
    text(s, 1.0, 5.65, W - 2.0, 0.5,
         [P("Screenshot this. This is the whole Flow on one page.", 18, MUTED, italic=True)])

    list_slide(S, "WHY THE ORDER MATTERS",
               "Most people don't fail at wealth. They fail at sequence.",
               ["A policy you can't keep funding",
                "A loan on a business with no structure",
                "A trust with nothing in it"], title_size=36,
               footer="So where does everybody start? Level 1.")

    # 24–28 Secret 2
    section(S, "SECRET #2", "II", "The Foundation", "How your credit file actually works")
    cards(S, "SECRET #2 · THE FOUNDATION", "What's actually in your file",
          [("Personal info", "Names, addresses, employers"),
           ("Accounts", "Every card and loan — and how you've paid"),
           ("Public records", "Such as bankruptcies"),
           ("Inquiries", "Who has pulled your credit")],
          footer="Three bureaus — Equifax, Experian, TransUnion — and they don't always match.")
    cards(S, "YOUR RIGHTS", "What the law lets you challenge",
          [("Inaccurate", "Information that's wrong"),
           ("Incomplete", "Information that's missing pieces"),
           ("Unverifiable", "Information that can't be confirmed")],
          footer="The bureau has to investigate — and fix or remove what can't be verified.", numerals=["1", "2", "3"])
    list_slide(S, "THE HARD TRUTH", "What nobody can remove",
               ["Accurate negative information",
                "It ages off on a schedule — most items 7 years, some bankruptcies 10",
                "What rebuilds it: on-time payments, lower balances, time"], size=22,
               highlight="Anyone who promises to delete everything is lying to you.")
    list_slide(S, "WHY LEVEL 1 COMES FIRST", "What a weak file costs you",
               ["Higher interest on cars, cards and homes", "Bigger deposits",
                "Denied applications", "Fewer options when you need them most"])

    # 29–36 Secret 3
    section(S, "SECRET #3", "III", "The Engine",
            "How protection and growth work — and when they don't fit")

    # 30 — pyramid
    s = base(S, 30)
    label(s, "SECRET #3 · THE ENGINE")
    text(s, 1.0, 1.15, W - 2.0, 1.0, [H1("The wealth pyramid", 40)], anchor="middle")
    layers = [("Risk & opportunity", "Only with money you can afford to lose", 0.55),
              ("Growth & cash flow", "Real estate, business", 0.75),
              ("Protection & certainty", "Guarantees, liquid cash, insurance", 1.0)]
    cx, top, lh = 3.9, 2.6, 1.15
    for i, (nm, desc, op) in enumerate(layers):
        wt = 1.2 + i * 1.75
        wb = wt + 1.75
        y = top + i * (lh + 0.08)
        tr = shape(s, MSO_SHAPE.TRAPEZOID, cx - wb / 2, y, wb, lh, GOLD, op * 0.55,
                   line_hex=GOLD_HI, lw=1.25)
        tr.adjustments[0] = (wb - wt) / 2 / lh * 0.5 if lh else 0.25
        text(s, 6.9, y + 0.05, 5.6, lh,
             [dict(t=nm, font=HEAD, size=22, color=GOLD_HI, bold=True),
              P(desc, 18, CREAM)], align="left", anchor="middle")
    text(s, 1.0, 1.95, W - 2.0, 0.45, [P("Build from the bottom.", 20, GOLD_HI, italic=True)])

    list_slide(S, "LEVEL 3 · CAPITAL READINESS",
               "Borrow to build assets. Never borrow to cover your bills.",
               ["A fundable business — credit strong, structure in place",
                "A plan for every dollar borrowed"], title_size=36,
               footer="Using credit to get to the end of the month? The answer is Level 1 — not more credit.")

    # 32 — the engine
    s = base(S, 32)
    label(s, "LEVEL 4 · THE ENGINE")
    text(s, 1.0, 1.15, W - 2.0, 1.0, [H1("The Engine", 44)], anchor="middle")
    panel(s, 1.0, 2.45, 5.3, 3.5)
    text(s, 1.35, 2.7, 4.6, 3.0,
         [P("A properly designed, overfunded permanent life insurance policy can "
            "build cash value you can borrow against — and it carries a death "
            "benefit for your family.", 22, CREAM)], align="left", anchor="middle")
    panel(s, 6.65, 2.45, 5.65, 3.5, edge=GOLD_HI, edge_op=0.9)
    text(s, 6.95, 2.6, 5.0, 0.5, [LBL("THE TRUTH", 14, GOLD_HI)], align="left")
    bullets(s, 7.0, 3.15, 5.1,
            ["It has real costs inside it", "Loans accrue interest",
             "Underfunding can lapse a policy",
             "Only for people who want the insurance"], 19)

    cards(S, "CHOOSE YOUR ENGINE", "Whole Life vs. Indexed Universal Life",
          [("Whole Life · The Paladin",
            ["Guarantees", "Fixed premium", "Dividends with a long track record",
             "Contractual growth floor", "An engine that never surprises you."]),
           ("IUL · The Rogue",
            ["Market-linked upside", "Capped gains", "Floor under index losses",
             "Flexible premiums", "Trades rigidity for potential."])],
          footer="Neither is the winner. The situation and the design decide.",
          title_size=34, body_size=18)
    list_slide(S, "WARNING", "The MEC trap",
               ["Fund too much, too fast in the first 7 years and the policy "
                "becomes a Modified Endowment Contract",
                "Loans and withdrawals get taxed differently — and can be penalized"],
               size=21, warn=True,
               highlight="A great concept with a bad design still fails.")
    cards(S, "LEVELS 5–7", "The Legacy",
          [("The Fortress", "Holding company and trust — drafted by an attorney"),
           ("The Transfer", "Beneficiaries chosen on purpose, not by default"),
           ("The Generational Tree", "The next generation starts ahead")],
          numerals=["5", "6", "7"],
          footer="A revocable living trust avoids probate for what's in it — it doesn't shield you from creditors.")
    statement(S, "FULL DISCLOSURE", "How I get paid",
              ["Everything I charge for is education and preparation.",
               "If a policy is right for you, the carrier pays me a commission — "
               "and I'll tell you how much."], 56)

    # 37–43 Proof
    section(PR, "THE PROOF", "✦", "Proof is the truth",
            "Don't take my word for it. Let's do it right now.")
    list_slide(PR, "QUICK WIN · LIVE", "Check your file right now",
               ["Personal information you don't recognize",
                "Accounts you don't recognize — or that appear twice",
                "Late payments or balances that are wrong"],
               numbered=True, sub="annualcreditreport.com — free reports from all three bureaus",
               footer="Found one? Type FOUND ONE in the chat — not your details.")

    # 39 — demo
    s = base(PR, 39)
    label(s, "LIVE DEMO · SAMPLE REPORT")
    text(s, 1.0, 1.15, W - 2.0, 1.0, [H1("How I read a file", 40)], anchor="middle")
    panel(s, 1.0, 2.35, 6.4, 3.75, edge=GOLD, dash="dash")
    text(s, 1.3, 2.6, 5.8, 3.2,
         [LBL("INSERT SAMPLE OR FULLY REDACTED REPORT", 14, GOLD_HI),
          P("Never a real person's file on a public webinar.", 16, MUTED, italic=True)],
         anchor="middle")
    text(s, 7.8, 2.35, 4.6, 0.5, [P("Every item gets one label:", 20, MUTED)], align="left")
    for i, t in enumerate(["Verifiable", "Unverifiable", "Inaccurate", "Accurate — and staying"]):
        y = 2.95 + i * 0.8
        panel(s, 7.8, y, 4.5, 0.62, edge=GOLD_HI if i == 3 else GOLD,
              edge_op=0.95 if i == 3 else 0.6)
        text(s, 8.0, y, 4.1, 0.62,
             [dict(t=t, font=HEAD, size=20, color=GOLD_HI, bold=True)],
             align="left", anchor="middle")

    cards(PR, "THE PROCESS", "What working your file looks like",
          [("Month 1", "Full tri-bureau audit, a written map of your file, first dispute round"),
           ("Every month after", "New round, every response explained, report updated"),
           ("Throughout", "The Financial Literacy Academy — so you don't re-break it")],
          numerals=["1", "2", "∞"])
    cards(PR, "WHAT CLIENTS SAY", "In their words",
          [("ADD A REAL CLIENT QUOTE",
            ["About the process — being explained to, being told the truth.",
             "Written permission required.", "— First name, City"])] * 3,
          dashed=True, body_size=16)

    # 42 — book
    s = base(PR, 42)
    glow(s, 3.5, 3.6, 2.6, 0.35)
    image(s, cover, 1.9, 1.0, h=5.2)
    label(s, "THE BOOK", y=1.2, cx=9.1, rule=0.9)
    text(s, 5.8, 1.75, 6.6, 1.5, [H1("The American Money Tree", 46)], align="left",
         anchor="middle")
    text(s, 5.85, 3.3, 6.4, 2.6,
         [P("A Plain-Language Owner's Manual for Indexed Universal Life Insurance",
            20, GOLD_HI, italic=True, space_after=14),
          P("What this industry leaves out: what it costs, how agents get paid, and "
            "when not to buy.", 20, CREAM, space_after=14),
          dict(t="BY MALIK EAST  ·  COMING SOON", font=BODY, size=14, color=MUTED,
               bold=True, spc=3)], align="left")

    cards(PR, "BE HONEST WITH YOURSELF", "Is this for you?",
          [("Good fit", ["You want your file worked every month",
                         "You want every step explained",
                         "You're willing to do your part"]),
           ("Not a fit", ["You want “everything deleted”",
                          "You want a guaranteed score",
                          "You won't look at your own numbers"])], body_size=19)

    # 44–55 Next step
    section(N, "THE NEXT STEP", "◆", "Gift, not grift",
            "No pressure. No timer. Just the next step for those who want it.")
    cards(N, "THE NEXT STEP", "Two paths",
          [("Path 1 · Do it yourself",
            ["Free reports at annualcreditreport.com",
             "The Fix Your File guide — $27 — if you want the templates"]),
           ("Path 2 · Done with you", ["The Restoration Program"])],
          footer="Both are honorable. Doing nothing is the only wrong one.", body_size=20)

    # 46 — program
    s = base(N, 46)
    label(s, "THE RESTORATION PROGRAM")
    text(s, 1.0, 1.1, W - 2.0, 1.0, [H1("The Restoration Program", 44)], anchor="middle")
    text(s, 1.0, 2.05, W - 2.0, 0.6,
         [P("I work your file every month — and you only pay for the month I worked.",
            19, GOLD_HI, italic=True)])
    panel(s, 1.0, 2.8, W - 2.0, 3.3)
    bullets(s, 1.5, 3.1, 5.2,
            ["Full tri-bureau audit", "Monthly dispute rounds — up to 30 items, all 3 bureaus",
             "Monitoring dashboard"], 20, 0.9)
    bullets(s, 7.0, 3.1, 5.0,
            ["Monthly written report", "Financial Literacy Academy",
             "Optional monthly 15-minute check-in"], 20, 0.9)

    # 47 — value
    s = base(N, 47)
    label(s, "WHAT IT'S WORTH")
    text(s, 1.0, 1.15, W - 2.0, 1.0, [H1("If you bought it separately", 40)],
         anchor="middle")
    rows = [("File audit, every item labelled", "$150"),
            ("Monthly dispute work", "$100 / mo"),
            ("Credit monitoring", "$32.60 / mo"),
            ("Financial Literacy Academy", "$29 / mo")]
    panel(s, 2.4, 2.45, 8.5, 3.55)
    for i, (k, v) in enumerate(rows):
        y = 2.7 + i * 0.62
        text(s, 2.8, y, 5.8, 0.55, [P(k, 21)], align="left", anchor="middle")
        text(s, 8.2, y, 2.3, 0.55, [P(v, 21, GOLD_HI, bold=True)], align="right",
             anchor="middle")
        hline(s, 2.8, y + 0.6, 10.5, GOLD, 0.5, 0.35)
    text(s, 2.8, 5.25, 7.7, 0.6,
         [dict(t="Stacked: $311 first month  ·  $161.60 / mo after", font=HEAD, size=21,
               color=GOLD_HI, bold=True)], anchor="middle")

    # 48 — total cost
    s = base(N, 48)
    label(s, "YOUR TOTAL COST")
    glow(s, W / 2, 2.2, 2.4, 0.3)
    text(s, 1.0, 1.2, W - 2.0, 1.5,
         [dict(t="$152.60 / month", font=HEAD, size=72, color=GOLD_HI, bold=True)],
         anchor="middle")
    panel(s, 2.4, 2.95, 8.5, 2.0)
    for i, (v, k) in enumerate([("$120.00", "Arise Credit Pro — for the dispute work"),
                                ("$32.60", "IdentityIQ credit monitoring — required")]):
        y = 3.2 + i * 0.8
        text(s, 2.8, y, 1.9, 0.6, [P(v, 24, GOLD_HI, bold=True)], align="left",
             anchor="middle")
        text(s, 4.7, y, 6.0, 0.6, [P(k, 21)], align="left", anchor="middle")
    text(s, 1.5, 5.15, W - 3.0, 1.0,
         [P("IdentityIQ bills you directly  ·  7-day free trial  ·  "
            "I earn a commission when you enroll", 18, MUTED, italic=True)])

    # 49 — nothing charged today
    def terms(s, y):
        items = ["No setup fee", "No contract", "Cancel anytime"]
        for i, t in enumerate(items):
            x = 2.2 + i * 3.1
            panel(s, x, y, 2.8, 0.6)
            text(s, x, y, 2.8, 0.6, [dict(t=t, font=HEAD, size=17, color=GOLD_HI,
                                           bold=True)], anchor="middle")
    statement(N, "HOW BILLING WORKS", "Nothing is charged today.",
              ["You're billed at the end of each month — after the work is done.",
               "Written agreement + 3-business-day right to cancel before any work starts."],
              56, extra=terms, extra_h=0.6)

    # 50 — guarantee
    s = base(N, 50)
    label(s, "THE WORK GUARANTEE")
    text(s, 1.3, 1.2, W - 2.6, 2.0,
         [H1("Every month you're billed, you get a dispute round and a written "
             "report — or that month is free.", 34)], anchor="middle")
    divider(s, 3.5)
    panel(s, 2.4, 3.85, 8.5, 2.3, edge=WARN, edge_op=0.8)
    text(s, 2.4, 4.0, 8.5, 0.5, [LBL("WHAT I WILL NOT PROMISE", 14, WARN)])
    for i, t in enumerate(["A score", "A timeline", "Deleting accurate information"]):
        x = 2.75 + i * 2.75
        text(s, x, 4.65, 2.6, 1.2, [dict(t=t, font=HEAD, size=21, color=CREAM,
                                          bold=True, line=1.05)], anchor="middle")

    statement(N, "CAPACITY", "Why only [25] files",
              ["Every file gets read by me, every month.",
               "When I'm full, you go on the waitlist."], 60)

    def book_cta(s, y):
        panel(s, 3.2, y, W - 6.4, 0.65, edge=GOLD_HI, edge_op=0.95)
        text(s, 3.2, y, W - 6.4, 0.65,
             [dict(t="Book your free call  ·  7bandfinancialagency.com", font=HEAD,
                   size=18, color=GOLD_HI, bold=True)], anchor="middle")
    statement(N, "ALREADY PAST LEVEL 1?", "Your next step is a free conversation.",
              ["If your credit is already strong, let's talk about Levels 2–7."], 48,
              extra=book_cta, extra_h=0.65)

    def enroll(s, y=5.7):
        b = shape(s, MSO_SHAPE.ROUNDED_RECTANGLE, 3.1, y, W - 6.2, 0.8, GOLD_HI,
                  line_hex=GOLD_DEEP, lw=2)
        b.adjustments[0] = 0.3
        text(s, 3.1, y, W - 6.2, 0.8,
             [dict(t="ENROLL  ·  arisecreditpro.com  ·  link in the chat", font=HEAD,
                   size=19, color=INK, bold=True)], anchor="middle")

    # 53 — next step
    s = base(N, 53)
    glow(s, W / 2, 2.9, 3.0, 0.35)
    label(s, "YOUR NEXT STEP")
    text(s, 1.0, 1.15, W - 2.0, 1.0, [H1("The Restoration Program", 50)], anchor="middle")
    text(s, 1.0, 2.15, W - 2.0, 0.9,
         [dict(t="Nothing charged today.", font=HEAD, size=32, color=CREAM, bold=True)],
         anchor="middle")
    for i, t in enumerate(["The Order", "The Foundation", "The Engine"]):
        x = 2.2 + i * 3.1
        medallion(s, x + 1.4, 3.75, 0.36, ["I", "II", "III"][i], 18)
        text(s, x, 4.2, 2.8, 0.5, [dict(t=t, font=HEAD, size=19, color=GOLD_HI,
                                         bold=True)])
    text(s, 1.0, 4.85, W - 2.0, 0.6,
         [P("Level 1 starts tonight.", 22, CREAM, italic=True)])
    enroll(s)

    # 54 — Q&A
    s = base(N, 54)
    glow(s, W / 2, 2.8, 3.0, 0.35)
    label(s, "Q & A")
    text(s, 1.0, 1.5, W - 2.0, 1.8, [H1("Questions?", 80)], anchor="middle")
    text(s, 1.0, 3.5, W - 2.0, 1.2,
         [P("The Restoration Program  ·  Nothing charged today", 24, CREAM)],
         anchor="middle")
    enroll(s, 5.0)

    # 55 — thank you
    s = base(N, 55, glow_at=(50, 48))
    glow(s, W / 2, 3.55, 3.4, 0.4)
    ring(s, W / 2, 3.55, 2.85, nodes=7, node_r=0.2, op=0.6,
         labels=["1", "2", "3", "4", "5", "6", "7"])
    image(s, logo, W / 2 - 0.4, 1.05, w=0.8)
    text(s, 3.6, 2.15, W - 7.2, 1.1, [H1("THE FLOW", 64)], anchor="middle")
    text(s, 3.9, 3.25, W - 7.8, 0.4, [LBL("WHERE VISION BECOMES LEGACY", 12, GOLD_HI)])
    divider(s, 3.8, 3.4)
    text(s, 4.0, 3.95, W - 8.0, 1.2,
         [P("Your free gift:", 18, MUTED, bold=True),
          P("The Ultimate Budget Guide", 22, CREAM, bold=True),
          P("Link in the chat now.", 17, MUTED, italic=True)])
    text(s, 3.4, 5.35, W - 6.8, 0.5,
         [dict(t="MALIK EAST", font=HEAD, size=19, color=GOLD_HI, bold=True, spc=3)])


def load_notes():
    s = SCRIPT.read_text()
    parts = re.split(r"\n## Slide (\d+) — ", s)
    notes = {}
    for i in range(1, len(parts), 2):
        n = int(parts[i])
        body = re.split(r"\n---|\n# ", parts[i + 1])[0]
        say = re.search(r"\*\*Say:\*\* (.*?)(?=\n\n\*\*Do:|\Z)", body, re.S)
        do = re.search(r"\*\*Do:\*\* (.*?)(?=\n\n|\Z)", body, re.S)
        t = say.group(1).strip() if say else ""
        if do:
            t += "\n\nDO: " + do.group(1).strip()
        notes[n] = t.replace("**", "").replace("*", "")
    return notes


def prepare_assets(tmp):
    tmp.mkdir(parents=True, exist_ok=True)
    cover = tmp / "cover.jpg"
    im = Image.open(ASSETS / "american-money-tree-cover.png").convert("RGB")
    im.thumbnail((900, 1350)); im.save(cover, quality=85)
    portrait = tmp / "portrait.jpg"
    im = Image.open(ASSETS / "malik-east-portrait_1eb03c6e.jpeg").convert("RGB")
    im.thumbnail((900, 1100)); im.save(portrait, quality=85)
    return cover, portrait, ASSETS / "7band-logo-clean_7b539e21.png"


if __name__ == "__main__":
    import tempfile
    TMP = Path(tempfile.mkdtemp())
    build(prepare_assets(TMP))
    notes = load_notes()
    assert len(prs.slides) == len(notes) == 55, (len(prs.slides), len(notes))
    for i, slide in enumerate(prs.slides, 1):
        slide.notes_slide.notes_text_frame.text = notes[i]
    prs.save(OUT)
    print("built:", OUT, len(prs.slides), "slides")
