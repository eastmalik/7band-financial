#!/usr/bin/env python3
"""Build the 7Band Financial website operations manual as a branded PDF."""

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    BaseDocTemplate, Frame, Image, KeepTogether, ListFlowable, ListItem,
    NextPageTemplate, PageBreak, PageTemplate, Paragraph, Spacer, Table,
    TableStyle,
)

OUT = "/home/user/7band-financial/docs/7Band-Website-Operations-Manual.pdf"
LOGO = "/home/user/7band-financial/client/public/manus-storage/7band-logo-clean_7b539e21.png"

# --- Brand palette -----------------------------------------------------------
GOLD = colors.HexColor("#B8860B")
GOLD_LIGHT = colors.HexColor("#D4AF37")
NAVY = colors.HexColor("#0B1F3A")
INK = colors.HexColor("#1A1A1A")
GREY = colors.HexColor("#5A5A5A")
RULE = colors.HexColor("#D8D2C4")
PANEL = colors.HexColor("#FAF7F0")
ALERT_BG = colors.HexColor("#FDF4E7")

PAGE_W, PAGE_H = letter
MARGIN = 0.9 * inch

# --- Styles ------------------------------------------------------------------
ss = getSampleStyleSheet()

def style(name, **kw):
    base = kw.pop("parent", ss["Normal"])
    return ParagraphStyle(name, parent=base, **kw)

S = {
    "cover_title": style("cover_title", fontName="Helvetica-Bold", fontSize=30,
                         leading=35, textColor=NAVY, alignment=TA_CENTER,
                         spaceAfter=10),
    "cover_sub": style("cover_sub", fontName="Helvetica", fontSize=13.5,
                       leading=19, textColor=GREY, alignment=TA_CENTER),
    "cover_meta": style("cover_meta", fontName="Helvetica", fontSize=10,
                        leading=15, textColor=GREY, alignment=TA_CENTER),
    "h1": style("h1", fontName="Helvetica-Bold", fontSize=19, leading=23,
                textColor=NAVY, spaceBefore=6, spaceAfter=4),
    "h1num": style("h1num", fontName="Helvetica-Bold", fontSize=10.5,
                   leading=13, textColor=GOLD, spaceAfter=2),
    "h2": style("h2", fontName="Helvetica-Bold", fontSize=13, leading=17,
                textColor=NAVY, spaceBefore=16, spaceAfter=6),
    "h3": style("h3", fontName="Helvetica-Bold", fontSize=11, leading=14,
                textColor=INK, spaceBefore=12, spaceAfter=4),
    "body": style("body", fontName="Helvetica", fontSize=10.2, leading=15.4,
                  textColor=INK, spaceAfter=9),
    "body_tight": style("body_tight", fontName="Helvetica", fontSize=10.2,
                        leading=15.4, textColor=INK, spaceAfter=3),
    "bullet": style("bullet", fontName="Helvetica", fontSize=10.2, leading=15.2,
                    textColor=INK, spaceAfter=5),
    "panel": style("panel", fontName="Helvetica", fontSize=9.8, leading=14.6,
                   textColor=INK),
    "panel_head": style("panel_head", fontName="Helvetica-Bold", fontSize=9.8,
                        leading=14, textColor=NAVY, spaceAfter=4),
    "mono": style("mono", fontName="Courier-Bold", fontSize=9.4, leading=13.5,
                  textColor=NAVY),
    "mono_body": style("mono_body", fontName="Courier", fontSize=8.9,
                       leading=12.6, textColor=INK),
    "cell": style("cell", fontName="Helvetica", fontSize=9.3, leading=13,
                  textColor=INK),
    "cell_b": style("cell_b", fontName="Helvetica-Bold", fontSize=9.3,
                    leading=13, textColor=NAVY),
    "cell_head": style("cell_head", fontName="Helvetica-Bold", fontSize=9.3,
                       leading=13, textColor=colors.white),
    "cell_mono": style("cell_mono", fontName="Courier", fontSize=8.2,
                       leading=12.4, textColor=INK),
    "caption": style("caption", fontName="Helvetica-Oblique", fontSize=9,
                     leading=13, textColor=GREY, alignment=TA_CENTER,
                     spaceBefore=4),
    "toc": style("toc", fontName="Helvetica", fontSize=10.5, leading=20,
                 textColor=INK),
}


def P(text, s="body"):
    return Paragraph(text, S[s])


def bullets(items, style_name="bullet", bullet="•"):
    return ListFlowable(
        [ListItem(P(t, style_name), leftIndent=16) for t in items],
        bulletType="bullet", start=bullet, leftIndent=16,
        bulletFontSize=9, bulletColor=GOLD, spaceAfter=8,
    )


def numbered(items, style_name="bullet"):
    return ListFlowable(
        [ListItem(P(t, style_name), leftIndent=20) for t in items],
        bulletType="1", leftIndent=20, bulletFontName="Helvetica-Bold",
        bulletFontSize=10, bulletColor=GOLD, spaceAfter=8,
    )


def panel(title, body_flowables, bg=PANEL, edge=RULE):
    """A soft callout box."""
    inner = []
    if title:
        inner.append(P(title, "panel_head"))
    inner.extend(body_flowables)
    t = Table([[inner]], colWidths=[PAGE_W - 2 * MARGIN])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), bg),
        ("BOX", (0, 0), (-1, -1), 0.6, edge),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    return t


def alert(title, body_flowables):
    inner = []
    if title:
        inner.append(P(title, "panel_head"))
    inner.extend(body_flowables)
    t = Table([[inner]], colWidths=[PAGE_W - 2 * MARGIN])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), ALERT_BG),
        ("LINEBEFORE", (0, 0), (0, -1), 3, GOLD),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    return t


def data_table(header, rows, col_widths, mono_cols=()):
    data = [[Paragraph(h, S["cell_head"]) for h in header]]
    for r in rows:
        data.append([
            Paragraph(c, S["cell_mono"] if i in mono_cols else S["cell"])
            for i, c in enumerate(r)
        ])
    t = Table(data, colWidths=col_widths, repeatRows=1)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, PANEL]),
        ("GRID", (0, 0), (-1, -1), 0.4, RULE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    return t


def chapter(number, title, subtitle=None):
    out = [P(f"SECTION {number}", "h1num"), P(title, "h1")]
    bar = Table([[""]], colWidths=[1.5 * inch], rowHeights=[2.5])
    bar.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), GOLD)]))
    out.append(bar)
    out.append(Spacer(1, 12))
    if subtitle:
        out.append(P(subtitle, "body"))
    return out


# --- Page furniture ----------------------------------------------------------
def draw_cover(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(NAVY)
    canvas.rect(0, PAGE_H - 1.1 * inch, PAGE_W, 1.1 * inch, stroke=0, fill=1)
    canvas.setFillColor(GOLD)
    canvas.rect(0, PAGE_H - 1.16 * inch, PAGE_W, 0.06 * inch, stroke=0, fill=1)
    canvas.setFillColor(NAVY)
    canvas.rect(0, 0, PAGE_W, 0.5 * inch, stroke=0, fill=1)
    canvas.setFillColor(colors.white)
    canvas.setFont("Helvetica", 8.5)
    canvas.drawCentredString(PAGE_W / 2, 0.2 * inch,
                             "7BAND FINANCIAL AGENCY  ·  CONFIDENTIAL OPERATIONS DOCUMENT")
    canvas.restoreState()


def draw_page(canvas, doc):
    canvas.saveState()
    # header rule
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.5)
    canvas.line(MARGIN, PAGE_H - 0.72 * inch, PAGE_W - MARGIN, PAGE_H - 0.72 * inch)
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(GREY)
    canvas.drawString(MARGIN, PAGE_H - 0.64 * inch, "7BAND FINANCIAL AGENCY")
    canvas.drawRightString(PAGE_W - MARGIN, PAGE_H - 0.64 * inch,
                           "Website Operations & Recovery Manual")
    # footer
    canvas.setStrokeColor(RULE)
    canvas.line(MARGIN, 0.68 * inch, PAGE_W - MARGIN, 0.68 * inch)
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(GREY)
    canvas.drawString(MARGIN, 0.5 * inch, "www.7bandfinancialagency.com")
    canvas.setFillColor(GOLD)
    canvas.setFont("Helvetica-Bold", 9)
    canvas.drawRightString(PAGE_W - MARGIN, 0.5 * inch, str(canvas.getPageNumber() - 1))
    canvas.restoreState()


# --- Document ----------------------------------------------------------------
doc = BaseDocTemplate(
    OUT, pagesize=letter,
    leftMargin=MARGIN, rightMargin=MARGIN,
    topMargin=1.0 * inch, bottomMargin=0.95 * inch,
    title="7Band Financial Agency — Website Operations & Recovery Manual",
    author="7Band Financial Agency",
    subject="Website hosting, deployment, backup and disaster recovery",
)

cover_frame = Frame(MARGIN, 0.7 * inch, PAGE_W - 2 * MARGIN,
                    PAGE_H - 2.0 * inch, id="cover")
body_frame = Frame(MARGIN, 0.9 * inch, PAGE_W - 2 * MARGIN,
                   PAGE_H - 1.85 * inch, id="body")

doc.addPageTemplates([
    PageTemplate(id="Cover", frames=[cover_frame], onPage=draw_cover),
    PageTemplate(id="Body", frames=[body_frame], onPage=draw_page),
])

W = PAGE_W - 2 * MARGIN
story = []

# ============================ COVER ==========================================
story.append(Spacer(1, 0.5 * inch))
story.append(Image(LOGO, width=2.0 * inch, height=2.0 * inch, hAlign="CENTER"))
story.append(Spacer(1, 0.3 * inch))
story.append(P("Website Operations<br/>&amp; Recovery Manual", "cover_title"))
story.append(Spacer(1, 0.1 * inch))

goldline = Table([[""]], colWidths=[2.2 * inch], rowHeights=[2])
goldline.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), GOLD)]))
goldline.hAlign = "CENTER"
story.append(goldline)
story.append(Spacer(1, 0.22 * inch))

story.append(P(
    "How the 7Band Financial Agency website is hosted, how to change it,<br/>"
    "and exactly what to do if it ever goes down again.", "cover_sub"))
story.append(Spacer(1, 0.5 * inch))

cover_facts = Table([
    [Paragraph("PROPERTY", S["cell_head"]), Paragraph("www.7bandfinancialagency.com", S["cell_b"])],
    [Paragraph("HOSTING", S["cell_head"]), Paragraph("GitHub Pages (free)", S["cell"])],
    [Paragraph("SOURCE OF TRUTH", S["cell_head"]), Paragraph("github.com/eastmalik/7band-financial", S["cell"])],
    [Paragraph("DOMAIN REGISTRAR", S["cell_head"]), Paragraph("Hostinger", S["cell"])],
    [Paragraph("DOCUMENT DATE", S["cell_head"]), Paragraph("August 2026", S["cell"])],
], colWidths=[1.7 * inch, 3.4 * inch])
cover_facts.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (0, -1), NAVY),
    ("BACKGROUND", (1, 0), (1, -1), PANEL),
    ("GRID", (0, 0), (-1, -1), 0.4, RULE),
    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ("LEFTPADDING", (0, 0), (-1, -1), 9),
    ("TOPPADDING", (0, 0), (-1, -1), 7),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
]))
cover_facts.hAlign = "CENTER"
story.append(cover_facts)

story.append(NextPageTemplate("Body"))
story.append(PageBreak())

# ============================ CONTENTS =======================================
story += chapter("", "Contents")
toc_rows = [
    ["1", "How Your Website Works Now", "The four pieces, and who controls each one"],
    ["2", "What Went Wrong — and Why", "The Manus failure, in plain language"],
    ["3", "The Migration, Step by Step", "Exactly what was done, with your real values"],
    ["4", "Emergency Playbook", "The site is down. Start here."],
    ["5", "Backup & Protection Strategy", "Making this unrepeatable"],
    ["6", "Making Changes to Your Site", "How to get edits done, with or without Claude"],
    ["7", "Security Posture", "What was audited, what protects you, what to watch"],
    ["A", "Appendix: Reference Card", "Every value, link and login location in one place"],
]
tt = Table(
    [[Paragraph(f"<font color='#B8860B'><b>{n}</b></font>", S["toc"]),
      Paragraph(f"<b>{t}</b>", S["toc"]),
      Paragraph(f"<font color='#5A5A5A'>{d}</font>", S["cell"])]
     for n, t, d in toc_rows],
    colWidths=[0.4 * inch, 2.5 * inch, 3.8 * inch])
tt.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ("LINEBELOW", (0, 0), (-1, -2), 0.4, RULE),
    ("TOPPADDING", (0, 0), (-1, -1), 8),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ("LEFTPADDING", (0, 0), (0, -1), 0),
]))
story.append(tt)

story.append(Spacer(1, 24))
story.append(alert("READ THIS FIRST", [
    P("If your website is down right now, go straight to <b>Section 4 — Emergency "
      "Playbook</b> on page 8. It is written to be followed under pressure, in order, "
      "without reading anything else in this manual.", "panel"),
]))

story.append(PageBreak())

# ============================ SECTION 1 ======================================
story += chapter("1", "How Your Website Works Now",
                 "Your website is not one thing. It is four separate services, each "
                 "doing one job. Understanding which service does what is the "
                 "difference between a five-minute fix and a day of downtime.")

story.append(P("The four pieces", "h2"))

story.append(data_table(
    ["Piece", "Who provides it", "What it does", "If it fails"],
    [
        ["<b>The domain name</b>", "Hostinger",
         "Owns and registers <i>7bandfinancialagency.com</i> in your name.",
         "Nobody can reach your site by name. Renew on time."],
        ["<b>DNS records</b>", "Hostinger",
         "The address book that tells browsers which server holds your site.",
         "Visitors go nowhere, or to the wrong server."],
        ["<b>The files</b>", "GitHub (repository)",
         "Every page, image and setting your website is made of.",
         "Nothing — this is version-controlled and recoverable."],
        ["<b>The hosting</b>", "GitHub Pages",
         "The server that actually shows your site to visitors.",
         "Site is down until hosting is restored."],
    ],
    [1.15 * inch, 1.15 * inch, 2.35 * inch, 2.05 * inch]))

story.append(Spacer(1, 14))
story.append(P("How a visitor reaches your site", "h2"))

flow = Table([[
    Paragraph("<b>Visitor types</b><br/>www.7bandfinancial<br/>agency.com", S["cell"]),
    Paragraph("<font color='#B8860B' size='13'><b>&#8594;</b></font>", S["cell"]),
    Paragraph("<b>Hostinger DNS</b><br/>points the name at<br/>GitHub's servers", S["cell"]),
    Paragraph("<font color='#B8860B' size='13'><b>&#8594;</b></font>", S["cell"]),
    Paragraph("<b>GitHub Pages</b><br/>serves the built<br/>website files", S["cell"]),
    Paragraph("<font color='#B8860B' size='13'><b>&#8594;</b></font>", S["cell"]),
    Paragraph("<b>Site loads</b><br/>over secure<br/>HTTPS", S["cell"]),
]], colWidths=[1.35 * inch, 0.3 * inch, 1.4 * inch, 0.3 * inch, 1.4 * inch, 0.3 * inch, 1.15 * inch])
flow.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (0, 0), PANEL),
    ("BACKGROUND", (2, 0), (2, 0), PANEL),
    ("BACKGROUND", (4, 0), (4, 0), PANEL),
    ("BACKGROUND", (6, 0), (6, 0), PANEL),
    ("BOX", (0, 0), (0, 0), 0.5, RULE),
    ("BOX", (2, 0), (2, 0), 0.5, RULE),
    ("BOX", (4, 0), (4, 0), 0.5, RULE),
    ("BOX", (6, 0), (6, 0), 0.5, RULE),
    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ("ALIGN", (1, 0), (1, 0), "CENTER"),
    ("ALIGN", (3, 0), (3, 0), "CENTER"),
    ("ALIGN", (5, 0), (5, 0), "CENTER"),
    ("TOPPADDING", (0, 0), (-1, -1), 10),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
    ("LEFTPADDING", (0, 0), (-1, -1), 7),
]))
story.append(flow)

story.append(Spacer(1, 16))
story.append(P("How a change reaches your site", "h2"))
story.append(P(
    "This is the part that makes your setup self-maintaining. You never upload files "
    "to a server by hand. Instead:", "body"))
story.append(numbered([
    "A change is committed to the <b>main</b> branch of your GitHub repository.",
    "GitHub Actions automatically notices the change and runs the build.",
    "The built site is published to GitHub Pages.",
    "The live site updates — typically within two minutes.",
]))
story.append(P(
    "The instructions for this live in your repository at "
    "<font face='Courier'>.github/workflows/deploy.yml</font>. As long as that file "
    "exists and the repository is public (or on a paid GitHub plan), deployment is "
    "automatic and requires no action from you.", "body"))

story.append(Spacer(1, 6))
story.append(panel("THE KEY PRINCIPLE", [
    P("<b>You own every layer of this stack.</b> The domain is registered to you. "
      "The files are in your GitHub account. The hosting is your GitHub account. No "
      "outside company holds a piece that they could switch off. That is the specific "
      "problem this migration was designed to solve — and it is why the failure you "
      "experienced cannot happen the same way twice.", "panel"),
]))

story.append(PageBreak())

# ============================ SECTION 2 ======================================
story += chapter("2", "What Went Wrong — and Why",
                 "Understanding the failure is what prevents the next one. The short "
                 "version: your website was built on a platform that held both the "
                 "hosting and the images, and when that account was deleted, both "
                 "disappeared at the same moment.")

story.append(P("The sequence of events", "h2"))
story.append(numbered([
    "The website was originally built on <b>Manus</b>, an AI website-building platform.",
    "Manus hosted the live site. Your DNS pointed at their server "
    "(<font face='Courier'>cname.manus.space</font>).",
    "Manus also hosted your images on their private storage, which the site loaded "
    "from a special address (<font face='Courier'>/manus-storage/...</font>).",
    "Your <i>code</i> was correctly backed up to GitHub — that part was done right.",
    "The Manus account was deleted. The hosting stopped answering, and the images "
    "stopped existing.",
    "Your DNS was still pointing at a server that no longer served anything. The site "
    "went dark, and stayed dark.",
]))

story.append(Spacer(1, 8))
story.append(alert("THE ROOT CAUSE, IN ONE SENTENCE", [
    P("Having your code on GitHub is <b>not</b> the same as having your website on "
      "GitHub — the code was safe, but the hosting and the images lived in someone "
      "else's account, and that is what took the business offline.", "panel"),
]))

story.append(Spacer(1, 12))
story.append(P("The three lessons", "h2"))

story.append(P("Lesson one — code backup is not site backup", "h3"))
story.append(P(
    "A repository full of source code cannot serve a website by itself. Something has "
    "to build and host it. Ask of any platform: <i>if this company disappeared "
    "tonight, would my site still be up tomorrow?</i> If the answer is no, you are "
    "renting your uptime from a stranger.", "body"))

story.append(P("Lesson two — never let assets live off-repository", "h3"))
story.append(P(
    "Your logo, portrait and background images were stored on Manus's cloud rather "
    "than inside your own project. When the account went, they went. Images, PDFs, "
    "videos and any file your site displays should be committed into the repository "
    "itself, where they are versioned, backed up and portable. This has now been done "
    "for your logo and portrait.", "body"))

story.append(P("Lesson three — know your DNS before you need it", "h3"))
story.append(P(
    "Recovery was blocked not by anything technical but by uncertainty over which DNS "
    "records to change. Two records were pointing at the dead platform; everything "
    "else — your email, in particular — had to be left untouched. Section 7 of this "
    "manual records exactly which records matter, so that decision never has to be "
    "made under pressure again.", "body"))

story.append(Spacer(1, 8))
story.append(panel("WHAT WAS PERMANENTLY LOST", [
    P("Two background images could not be recovered: the homepage hero background and "
      "the \"victory tree\" section background. The site was reviewed without them and "
      "the design holds up — the deep black and gold treatment reads as intentional. "
      "They can be replaced at any time by adding files named "
      "<font face='Courier'>7band-hero-bg-v2_c2aa05ef.jpg</font> and "
      "<font face='Courier'>7band-victory-tree_5ae0c46c.jpg</font> to the image folder.",
      "panel"),
]))

story.append(PageBreak())

# ============================ SECTION 3 ======================================
story += chapter("3", "The Migration, Step by Step",
                 "This is the complete record of what was done to bring the site back "
                 "online, using your real values. If this ever has to be repeated — "
                 "for this site or a different one — this section is the recipe.")

story.append(P("Stage 1 — Strip out the dead platform", "h2"))
story.append(P(
    "The project contained code that only functioned inside Manus's environment: a "
    "runtime plugin, a debug log collector, a storage proxy, and an analytics tracker "
    "injected into every page. None of it could work any more, and the analytics tag "
    "was actively broken. All of it was removed, and the build configuration was "
    "reduced to what the site genuinely needs.", "body"))

story.append(P("Stage 2 — Set up automatic hosting on GitHub Pages", "h2"))
story.append(P(
    "A deployment workflow was added at "
    "<font face='Courier'>.github/workflows/deploy.yml</font>. On every change to the "
    "<b>main</b> branch it installs dependencies, builds the site, adds a fallback page "
    "so that direct links to interior pages work correctly, and publishes the result to "
    "GitHub Pages.", "body"))

story.append(P("Stage 3 — Point the domain at GitHub", "h2"))
story.append(P(
    "Two files and two DNS records were involved. In the repository, a "
    "<font face='Courier'>CNAME</font> file was added containing the domain name, which "
    "is how GitHub Pages knows which custom domain to answer for. At Hostinger, two "
    "records that still pointed at Manus were repointed:", "body"))

story.append(data_table(
    ["Record type", "Name", "Old value (dead)", "New value (correct)"],
    [
        ["CNAME", "www", "cname.manus.space", "eastmalik.github.io"],
        ["ALIAS", "@", "cname.manus.space", "eastmalik.github.io"],
    ],
    [0.95 * inch, 0.65 * inch, 1.85 * inch, 3.25 * inch],
    mono_cols=(2, 3)))

story.append(Spacer(1, 10))
story.append(alert("IMPORTANT — DO NOT ADD GITHUB'S IP ADDRESSES", [
    P("Standard GitHub Pages instructions tell you to create four <b>A records</b> "
      "pointing at IP addresses (185.199.108.153 and similar). <b>Do not do this on "
      "your domain.</b> Hostinger provides an <b>ALIAS</b> record instead, which does "
      "the same job and automatically follows GitHub if they ever change those "
      "addresses. Adding A records alongside the existing ALIAS record would create a "
      "conflict. Your DNS is correct as it stands.", "panel"),
]))

story.append(Spacer(1, 10))
story.append(P("Stage 4 — Activate GitHub Pages and HTTPS", "h2"))
story.append(P(
    "In the repository's <b>Settings → Pages</b> screen, the source was set to "
    "<b>GitHub Actions</b> and the custom domain entered. GitHub then ran its own DNS "
    "check and issued a free security certificate. Note that the very first activation "
    "must be done by hand in that settings screen — an automated workflow cannot create "
    "a Pages site from nothing.", "body"))

story.append(P("Stage 5 — Restore the images", "h2"))
story.append(P(
    "The company logo and portrait were uploaded directly into the repository at "
    "<font face='Courier'>client/public/manus-storage/</font> and renamed to the exact "
    "filenames the site expects. A favicon set was generated from the logo so the gold "
    "mark appears in browser tabs, bookmarks and phone home screens.", "body"))

story.append(Spacer(1, 6))
story.append(panel("REQUIRED IMAGE FILENAMES", [
    P("The site looks for these exact names inside "
      "<font face='Courier'>client/public/manus-storage/</font>:", "panel"),
    Spacer(1, 6),
    P("7band-logo-clean_7b539e21.png &nbsp;&nbsp;— company logo <b>(restored)</b><br/>"
      "malik-east-portrait_1eb03c6e.jpeg — About page portrait <b>(restored)</b><br/>"
      "7band-hero-bg-v2_c2aa05ef.jpg &nbsp;&nbsp;— homepage hero background <i>(not recovered)</i><br/>"
      "7band-victory-tree_5ae0c46c.jpg — victory section background <i>(not recovered)</i>",
      "mono_body"),
]))

story.append(PageBreak())

# ============================ SECTION 4 ======================================
story += chapter("4", "Emergency Playbook",
                 "The site is down. Work through these checks in order and stop as "
                 "soon as one of them explains the problem. Most outages are answered "
                 "within the first three checks.")

story.append(alert("BEFORE YOU DO ANYTHING", [
    P("<b>Confirm the site is actually down.</b> Open it in a private/incognito window, "
      "and on a phone using mobile data rather than your office wi-fi. Browsers cache "
      "pages aggressively, and more than one \"outage\" has turned out to be one stale "
      "browser tab. If it loads anywhere, the site is up.", "panel"),
]))

story.append(Spacer(1, 14))

checks = [
    ("CHECK 1", "Is the deployment failing?",
     "Open <b>github.com/eastmalik/7band-financial/actions</b>. Look at the most recent "
     "run. A green check means the site was published successfully and the problem is "
     "elsewhere — move to Check 2. A red X means the build failed: click into it, read "
     "the error, and the previous working version is still live in the meantime."),
    ("CHECK 2", "Is GitHub Pages itself switched on?",
     "Open <b>Settings → Pages</b> in the repository. Source must read <b>GitHub "
     "Actions</b> and the custom domain must read <b>www.7bandfinancialagency.com</b>. "
     "If the custom domain field has been emptied — this can happen after certain "
     "repository changes — retype it and save."),
    ("CHECK 3", "Is DNS still pointing at GitHub?",
     "In Hostinger, open <b>Domains → DNS / Nameservers</b>. The <b>www</b> CNAME record "
     "and the <b>@</b> ALIAS record must both read <b>eastmalik.github.io</b>. If either "
     "has changed or been deleted, restore it. Allow up to a few hours for the change "
     "to spread worldwide."),
    ("CHECK 4", "Has the domain expired?",
     "In Hostinger, check the domain's renewal date. An expired domain takes down the "
     "website and the email at the same time — if email is also dead, check this "
     "first. Renewal restores service within hours."),
    ("CHECK 5", "Is GitHub having an outage?",
     "Open <b>githubstatus.com</b>. If GitHub Pages is reported as degraded, nothing on "
     "your side is broken and nothing you change will help. Wait it out, and tell "
     "customers you are aware of a hosting provider issue."),
]

for tag, title, body in checks:
    story.append(KeepTogether([
        Table([[
            Paragraph(f"<font color='white'><b>{tag}</b></font>", S["cell"]),
            Paragraph(f"<b>{title}</b>", S["cell_b"]),
        ]], colWidths=[0.85 * inch, W - 0.85 * inch], style=TableStyle([
            ("BACKGROUND", (0, 0), (0, 0), GOLD),
            ("BACKGROUND", (1, 0), (1, 0), PANEL),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("ALIGN", (0, 0), (0, 0), "CENTER"),
            ("TOPPADDING", (0, 0), (-1, -1), 7),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ("LEFTPADDING", (1, 0), (1, 0), 10),
        ])),
        Spacer(1, 5),
        P(body, "body"),
        Spacer(1, 8),
    ]))

story.append(Spacer(1, 4))
story.append(P("If the site is up but something looks wrong", "h2"))

story.append(data_table(
    ["Symptom", "Most likely cause", "What to do"],
    [
        ["A broken-image icon where a picture should be",
         "The image file is missing from the repository, or its filename does not match "
         "what the page asks for.",
         "Upload the file to client/public/manus-storage/ with the exact expected name."],
        ["Your change did not appear",
         "The deployment is still running, or your browser is showing a cached copy.",
         "Wait two minutes, then hard-refresh (Ctrl+Shift+R). Check the Actions tab."],
        ["Browser shows a security warning",
         "The HTTPS certificate is still being issued, or the domain was recently changed.",
         "Wait — it resolves itself. Confirm Enforce HTTPS is ticked in Settings → Pages."],
        ["An interior page 404s when opened directly",
         "The SPA fallback file was not created during the build.",
         "Confirm the 'Add SPA fallback' step still exists in deploy.yml."],
        ["Old browser tab icon still showing",
         "Favicons are cached harder than anything else on the web.",
         "Close the tab completely and reopen, or check on a different device."],
    ],
    [1.75 * inch, 2.2 * inch, 2.75 * inch]))

story.append(PageBreak())

# ============================ SECTION 5 ======================================
story += chapter("5", "Backup & Protection Strategy",
                 "The migration restored your site. This section is about making the "
                 "outage unrepeatable — and closing the one gap that remains.")

story.append(P("Where you stand today", "h2"))
story.append(data_table(
    ["Asset", "Protection status"],
    [
        ["Website code", "<b>Protected.</b> Full version history in GitHub; every past version recoverable."],
        ["Logo and portrait", "<b>Protected.</b> Now committed into the repository, not an outside cloud."],
        ["Hosting", "<b>Protected.</b> Runs in your own GitHub account; no third-party platform involved."],
        ["Domain name", "<b>Protected</b> while renewal is current. Enable auto-renew at Hostinger."],
        ["Business email", "<b>Unchanged.</b> Still handled by Hostinger and Mailgun; untouched by this migration."],
        ["Repository privacy", "<b>Open gap.</b> The repository is public — see below."],
    ],
    [1.6 * inch, 5.1 * inch]))

story.append(Spacer(1, 14))
story.append(P("Closing the privacy gap", "h2"))
story.append(P(
    "Free GitHub Pages hosting requires a <b>public</b> repository. Your website is "
    "currently public, which means the source code can be browsed by anyone who finds "
    "it. In practical terms this exposes the same text, images and links that any "
    "visitor already sees on the site — but the preference for privacy is legitimate, "
    "and there are two ways to satisfy it.", "body"))

opt = Table([[
    [P("<b>Option A — GitHub Pro</b>", "panel_head"),
     P("<b>Approximately $4 per month.</b>", "panel"),
     Spacer(1, 5),
     P("Makes the repository private while the website stays publicly visible. Nobody "
       "can browse your code; customers see the site normally. Nothing about your "
       "deployment changes.", "panel"),
     Spacer(1, 5),
     P("<i>Recommended.</i> For a business of your size this is the obvious choice — "
       "it removes the gap entirely for the price of a coffee.", "panel")],
    [P("<b>Option B — Private mirror</b>", "panel_head"),
     P("<b>Free.</b>", "panel"),
     Spacer(1, 5),
     P("The deployment repository stays public, and a second private repository holds "
       "a synchronised backup copy. Your code remains publicly visible in the first "
       "one.", "panel"),
     Spacer(1, 5),
     P("<i>Fallback only.</i> This adds a backup, but it does not deliver the privacy "
       "you asked for.", "panel")],
]], colWidths=[W / 2 - 6, W / 2 - 6])
opt.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (0, 0), PANEL),
    ("BACKGROUND", (1, 0), (1, 0), colors.white),
    ("BOX", (0, 0), (0, 0), 1.2, GOLD),
    ("BOX", (1, 0), (1, 0), 0.5, RULE),
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 11),
    ("RIGHTPADDING", (0, 0), (-1, -1), 11),
    ("TOPPADDING", (0, 0), (-1, -1), 11),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 11),
]))
story.append(opt)

story.append(Spacer(1, 16))
story.append(P("Standing rules to operate by", "h2"))
story.append(bullets([
    "<b>Every image the site uses belongs in the repository.</b> Never link a live page "
    "to an image hosted inside another company's platform. This single rule would have "
    "prevented most of what you lost.",
    "<b>Turn on auto-renew for the domain.</b> An expired domain takes down the website "
    "and the email together, and recovery is slower than you would expect.",
    "<b>Keep two-factor authentication on the GitHub account.</b> It is now the account "
    "your website's existence depends on. Store the recovery codes somewhere physical.",
    "<b>Never delete an account that hosts anything live.</b> Move the service first, "
    "confirm the replacement works for several days, then close the old account.",
    "<b>Before any provider change, ask one question:</b> if this company vanished "
    "tonight, what breaks? Write the answer down before you proceed.",
]))

story.append(Spacer(1, 6))
story.append(panel("A NOTE ON RECOVERY TIME", [
    P("Every past version of your website is stored permanently in GitHub's history. "
      "If a future change breaks something, the site can be restored to any earlier "
      "state in minutes, not hours. This is the practical benefit of the setup you now "
      "have, and it did not exist before this migration.", "panel"),
]))

story.append(PageBreak())

# ============================ SECTION 6 ======================================
story += chapter("6", "Making Changes to Your Site",
                 "Your website is now edited by describing what you want in plain "
                 "English. No software to install, nothing to upload, no server to log "
                 "into.")

story.append(P("How the workflow actually runs", "h2"))
story.append(numbered([
    "You describe the change you want — in ordinary words, not technical instructions.",
    "The change is made in the code and verified before anything goes live.",
    "It is committed to the <b>main</b> branch of your repository.",
    "GitHub automatically builds and publishes it.",
    "The live site reflects the change, typically within two minutes.",
]))

story.append(Spacer(1, 6))
story.append(P("What can be changed this way", "h2"))
story.append(bullets([
    "Any text on any page — headlines, body copy, button labels, contact details",
    "Links, including booking and calendar destinations",
    "Images: replacing, adding or removing them",
    "Colours, fonts, spacing and layout",
    "Whole new pages, or removing pages you no longer offer",
    "Page titles and search-engine descriptions",
    "Navigation menus and their ordering",
]))

story.append(Spacer(1, 6))
story.append(P("Asking for changes effectively", "h2"))
story.append(P(
    "You do not need technical vocabulary. Describe the outcome you want and, where it "
    "helps, say where on the site you mean.", "body"))

ex = Table([
    [Paragraph("<b>Instead of worrying about</b>", S["cell_head"]),
     Paragraph("<b>Just say</b>", S["cell_head"])],
    [Paragraph("Which file, which component, what the code is called", S["cell"]),
     Paragraph("\"Change the phone number in the footer to 555-0142\"", S["cell_b"])],
    [Paragraph("How images are referenced and sized", S["cell"]),
     Paragraph("\"Swap the photo on the About page for the new one I uploaded\"", S["cell_b"])],
    [Paragraph("Routing, navigation and page structure", S["cell"]),
     Paragraph("\"Add a Services page with these three offerings\"", S["cell_b"])],
    [Paragraph("Styling systems and colour values", S["cell"]),
     Paragraph("\"Make the Begin Your Quest button larger and easier to see\"", S["cell_b"])],
], colWidths=[3.0 * inch, 3.7 * inch])
ex.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, 0), NAVY),
    ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, PANEL]),
    ("GRID", (0, 0), (-1, -1), 0.4, RULE),
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 8),
    ("TOPPADDING", (0, 0), (-1, -1), 7),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
]))
story.append(ex)

story.append(Spacer(1, 14))
story.append(P("Adding image files", "h2"))
story.append(P(
    "The most reliable way to get an image into the site is to upload it directly to "
    "GitHub, which also guarantees it is backed up from the moment it arrives:", "body"))
story.append(numbered([
    "Go to your repository and open the folder "
    "<font face='Courier'>client/public/manus-storage/</font>.",
    "Choose <b>Add file → Upload files</b> and drag the image in.",
    "Click <b>Commit changes</b>.",
    "Say which image is which and where it should appear — filenames do not need to be "
    "correct, they can be renamed afterwards.",
]))

story.append(Spacer(1, 8))
story.append(panel("IF YOU ARE WORKING WITH A DIFFERENT ASSISTANT", [
    P("Any capable developer or AI assistant can maintain this site, but they will need "
      "the context that this manual contains. Give them three facts: the site is a "
      "<b>React and Vite</b> application, it deploys automatically to <b>GitHub Pages</b> "
      "from the <b>main</b> branch via the workflow in "
      "<font face='Courier'>.github/workflows/deploy.yml</font>, and images live in "
      "<font face='Courier'>client/public/manus-storage/</font>. Those three facts plus "
      "the appendix opposite are enough for anyone competent to work safely.", "panel"),
]))

story.append(PageBreak())

# ============================ APPENDIX =======================================

# ============================ SECTION 7 ======================================
story += chapter("7", "Security Posture",
                 "A full security audit of the website was carried out in "
                 "September 2026. This section records what was checked, what "
                 "makes the site hard to attack, and where the real risk "
                 "actually sits.")

story.append(P("Why this site is a hard target", "h2"))
story.append(P(
    "The website has <b>no forms, no logins, no database, and no user input of "
    "any kind</b>. It is a set of static files served by GitHub. That single "
    "fact removes most categories of website attack outright:", "body"))
story.append(bullets([
    "<b>Database attacks</b> — impossible; there is no database.",
    "<b>Password and login attacks</b> — impossible; there is nothing to log into.",
    "<b>Form spam and injection</b> — impossible; the site has no forms.",
    "<b>Server compromise</b> — there is no server to compromise; GitHub serves flat files.",
    "<b>Malicious file upload</b> — impossible; nothing accepts uploads.",
]))
story.append(P(
    "The migration away from Manus happened to produce one of the most secure "
    "architectures a business website can have.", "body"))

story.append(Spacer(1, 8))
story.append(P("What the audit checked", "h2"))
story.append(data_table(
    ["Check", "Result"],
    [
        ["Secrets or API keys in the code", "None found, across the full commit history — not just current files."],
        ["Secrets leaking into public JavaScript", "None."],
        ["Credential or key files ever committed", "None."],
        ["Cross-site scripting (XSS) patterns", "None on any live page."],
        ["Malicious link hijacking (tabnabbing)", "Protected — every external link is correctly secured."],
        ["Source maps exposing internal code", "Not published."],
        ["Deployment pipeline permissions", "Correctly minimal: read-only except for publishing."],
        ["Data stored on visitors' devices", "View preference and theme only. No personal data."],
        ["Web address parameter handling", "Safe — validated against a fixed list, never inserted into the page."],
        ["Dependency vulnerabilities", "128 advisories, all in build tooling. None reach visitors."],
    ],
    [2.5 * inch, 4.2 * inch]))

story.append(Spacer(1, 12))
story.append(P("Hardening that was applied", "h2"))
story.append(bullets([
    "<b>Clickjacking protection.</b> GitHub Pages cannot send the security "
    "headers that normally stop a site being wrapped inside someone else's "
    "page, so a guard script was added instead. If anyone embeds this site in "
    "a frame, the wrapper is replaced by the real site. Verified working.",
    "<b>Strict referrer policy</b>, so the site does not leak full page "
    "addresses to third parties.",
    "<b>Dead Manus code removed.</b> An unused component read an API key from "
    "a build variable. Nothing was ever set there, but had it been, the value "
    "would have been compiled into the public JavaScript for anyone to read. "
    "That trap is now gone, along with unused components still pointing at "
    "retired Calendly booking links.",
]))

story.append(Spacer(1, 6))
story.append(alert("WHERE THE REAL RISK SITS — READ THIS PART", [
    P("Nobody is going to hack the web pages. An attacker would go after the "
      "<b>accounts that control them</b>:", "panel"),
    Spacer(1, 6),
    P("<b>1. The GitHub account.</b> Whoever controls it controls the website. "
      "This is now the single most critical login in the business.<br/>"
      "<b>2. The Hostinger account.</b> Controls the domain, the DNS, and the "
      "business email. Access here could redirect the entire domain.<br/>"
      "<b>3. The email inbox.</b> It is the password-reset path to everything else.",
      "panel"),
    Spacer(1, 6),
    P("Strong unique passwords plus two-factor authentication on those three "
      "accounts handles the overwhelming majority of genuine risk to this "
      "business. No amount of work on the website itself substitutes for it.",
      "panel"),
]))

story.append(Spacer(1, 12))
story.append(P("Ongoing habits", "h2"))
story.append(bullets([
    "Keep two-factor authentication switched on for GitHub, Hostinger and email, "
    "and store the recovery codes somewhere physical.",
    "Never paste an API key, token or password into a chat window — including "
    "with an AI assistant. Credentials belong in a password manager.",
    "Treat any email asking you to \u201cverify\u201d a GitHub or Hostinger login as "
    "hostile until proven otherwise. Type the address in yourself rather than "
    "clicking the link.",
    "If a change to the site ever looks wrong or unfamiliar, the full version "
    "history is in GitHub and any earlier version can be restored in minutes.",
    "Re-run this audit after any major change to how the site is built or hosted.",
]))

story.append(PageBreak())

story += chapter("A", "Appendix: Reference Card",
                 "Every value someone would need in an emergency, in one place. Print "
                 "this page and keep it somewhere that does not depend on your website "
                 "being up.")

story.append(P("Live addresses", "h2"))
story.append(data_table(
    ["What", "Where"],
    [
        ["Live website", "https://www.7bandfinancialagency.com"],
        ["Code repository", "https://github.com/eastmalik/7band-financial"],
        ["Deployment history", "https://github.com/eastmalik/7band-financial/actions"],
        ["Hosting settings", "https://github.com/eastmalik/7band-financial/settings/pages"],
        ["Image upload folder", "github.com/eastmalik/7band-financial → client/public/manus-storage"],
        ["Domain &amp; DNS control", "Hostinger → Domains → DNS / Nameservers"],
        ["GitHub service status", "https://githubstatus.com"],
    ],
    [1.75 * inch, 4.95 * inch], mono_cols=(1,)))

story.append(Spacer(1, 14))
story.append(P("DNS records that must not change", "h2"))
story.append(data_table(
    ["Type", "Name", "Value", "Purpose"],
    [
        ["CNAME", "www", "eastmalik.github.io", "Points www at the website"],
        ["ALIAS", "@", "eastmalik.github.io", "Points the bare domain at the website"],
    ],
    [0.8 * inch, 0.7 * inch, 2.2 * inch, 3.0 * inch], mono_cols=(2,)))

story.append(Spacer(1, 8))
story.append(alert("DO NOT TOUCH THE EMAIL RECORDS", [
    P("Every other record in your Hostinger DNS — the MX records, the hostingermail "
      "entries, the mailgun and leadconnectorhq entries, the DKIM, SPF and DMARC text "
      "records — exists to keep your business email working. They have nothing to do "
      "with the website. Changing or deleting them will break email delivery.", "panel"),
]))

story.append(Spacer(1, 14))
story.append(P("Key files in the repository", "h2"))
story.append(data_table(
    ["Path", "What it controls"],
    [
        [".github/workflows/deploy.yml", "The automatic build-and-publish process. Without this, changes never go live."],
        ["client/public/CNAME", "Tells GitHub Pages which custom domain to answer for."],
        ["client/index.html", "Page title, search description, and the browser-tab icon."],
        ["client/src/pages/", "One file per page of the website."],
        ["client/public/manus-storage/", "Site images. The folder name is historical; it is now just a folder."],
        ["client/public/favicon.ico", "The browser-tab icon, generated from the company logo."],
    ],
    [2.55 * inch, 4.15 * inch], mono_cols=(0,)))

story.append(Spacer(1, 14))
story.append(P("Accounts this website depends on", "h2"))
story.append(P(
    "Record where each of these logins is stored — a password manager, a safe, wherever "
    "your practice is. Do not write the passwords themselves on this page.", "body"))
story.append(data_table(
    ["Account", "Controls", "Login stored"],
    [
        ["GitHub (eastmalik)", "Website files and hosting. The critical one.", "&nbsp;"],
        ["Hostinger", "Domain registration, DNS, business email.", "&nbsp;"],
        ["Mailgun / LeadConnector", "Email delivery, referenced in your DNS.", "&nbsp;"],
    ],
    [1.7 * inch, 3.2 * inch, 1.8 * inch]))

story.append(Spacer(1, 20))

S["panel_head_w"] = style("panel_head_w", fontName="Helvetica-Bold", fontSize=10.5,
                          leading=15, textColor=GOLD_LIGHT, spaceAfter=4)
S["panel_w"] = style("panel_w", fontName="Helvetica", fontSize=9.8, leading=14.6,
                     textColor=colors.white)

closing = Table([[
    [P("The one thing to remember", "panel_head_w"),
     Spacer(1, 4),
     P("Your website's files and its hosting now live in the same account — an account "
       "you own and control. No outside company can switch it off. Keep the domain "
       "renewed, keep the GitHub account secure, and keep every image inside the "
       "repository, and this site stays up.", "panel_w")]
]], colWidths=[W])
closing.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, -1), NAVY),
    ("LEFTPADDING", (0, 0), (-1, -1), 16),
    ("RIGHTPADDING", (0, 0), (-1, -1), 16),
    ("TOPPADDING", (0, 0), (-1, -1), 14),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 14),
]))
story.append(closing)

doc.build(story)
print("built:", OUT)
