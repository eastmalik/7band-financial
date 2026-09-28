#!/usr/bin/env python3
"""Build the consulting-site migration handoff brief as a branded PDF."""

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    BaseDocTemplate, Frame, Image, KeepTogether, ListFlowable, ListItem,
    NextPageTemplate, PageBreak, PageTemplate, Paragraph, Spacer, Table,
    TableStyle,
)

OUT = "/home/user/7band-financial/docs/Consulting-Site-Migration-Brief.pdf"
LOGO = "/home/user/7band-financial/client/public/manus-storage/7band-logo-clean_7b539e21.png"

GOLD = colors.HexColor("#B8860B")
GOLD_LIGHT = colors.HexColor("#D4AF37")
NAVY = colors.HexColor("#0B1F3A")
INK = colors.HexColor("#1A1A1A")
GREY = colors.HexColor("#5A5A5A")
RULE = colors.HexColor("#D8D2C4")
PANEL = colors.HexColor("#FAF7F0")
ALERT_BG = colors.HexColor("#FDF4E7")
DANGER_BG = colors.HexColor("#FDEEEA")
DANGER = colors.HexColor("#A33B2A")

PAGE_W, PAGE_H = letter
MARGIN = 0.9 * inch
ss = getSampleStyleSheet()


def style(name, **kw):
    base = kw.pop("parent", ss["Normal"])
    return ParagraphStyle(name, parent=base, **kw)


S = {
    "cover_title": style("ct", fontName="Helvetica-Bold", fontSize=26, leading=31,
                         textColor=NAVY, alignment=TA_CENTER, spaceAfter=10),
    "cover_sub": style("cs", fontName="Helvetica", fontSize=12.5, leading=18,
                       textColor=GREY, alignment=TA_CENTER),
    "h1": style("h1", fontName="Helvetica-Bold", fontSize=17, leading=21,
                textColor=NAVY, spaceBefore=4, spaceAfter=4),
    "h1num": style("h1n", fontName="Helvetica-Bold", fontSize=10, leading=13,
                   textColor=GOLD, spaceAfter=2),
    "h2": style("h2", fontName="Helvetica-Bold", fontSize=12.5, leading=16,
                textColor=NAVY, spaceBefore=15, spaceAfter=6),
    "body": style("b", fontName="Helvetica", fontSize=10, leading=15,
                  textColor=INK, spaceAfter=8),
    "bullet": style("bu", fontName="Helvetica", fontSize=10, leading=14.8,
                    textColor=INK, spaceAfter=5),
    "panel": style("p", fontName="Helvetica", fontSize=9.6, leading=14.2, textColor=INK),
    "panel_head": style("ph", fontName="Helvetica-Bold", fontSize=9.6, leading=13.5,
                        textColor=NAVY, spaceAfter=4),
    "panel_head_d": style("phd", fontName="Helvetica-Bold", fontSize=9.6, leading=13.5,
                          textColor=DANGER, spaceAfter=4),
    "mono_body": style("mb", fontName="Courier", fontSize=8.6, leading=12.4, textColor=INK),
    "cell": style("c", fontName="Helvetica", fontSize=9.2, leading=12.8, textColor=INK),
    "cell_b": style("cb", fontName="Helvetica-Bold", fontSize=9.2, leading=12.8, textColor=NAVY),
    "cell_head": style("ch", fontName="Helvetica-Bold", fontSize=9.2, leading=12.8,
                       textColor=colors.white),
    "cell_mono": style("cm", fontName="Courier", fontSize=8.3, leading=12, textColor=INK),
}


def P(t, s="body"):
    return Paragraph(t, S[s])


def bullets(items, s="bullet"):
    return ListFlowable([ListItem(P(t, s), leftIndent=16) for t in items],
                        bulletType="bullet", start="•", leftIndent=16,
                        bulletFontSize=9, bulletColor=GOLD, spaceAfter=8)


def numbered(items, s="bullet"):
    return ListFlowable([ListItem(P(t, s), leftIndent=20) for t in items],
                        bulletType="1", leftIndent=20, bulletFontName="Helvetica-Bold",
                        bulletFontSize=10, bulletColor=GOLD, spaceAfter=8)


def box(title, flows, bg=PANEL, edge=RULE, head="panel_head", bar=None):
    inner = ([P(title, head)] if title else []) + flows
    t = Table([[inner]], colWidths=[PAGE_W - 2 * MARGIN])
    st = [("BACKGROUND", (0, 0), (-1, -1), bg),
          ("LEFTPADDING", (0, 0), (-1, -1), 12), ("RIGHTPADDING", (0, 0), (-1, -1), 12),
          ("TOPPADDING", (0, 0), (-1, -1), 10), ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
          ("VALIGN", (0, 0), (-1, -1), "TOP")]
    if bar:
        st.append(("LINEBEFORE", (0, 0), (0, -1), 3, bar))
    else:
        st.append(("BOX", (0, 0), (-1, -1), 0.6, edge))
    t.setStyle(TableStyle(st))
    return t


def data_table(header, rows, widths, mono=()):
    data = [[Paragraph(h, S["cell_head"]) for h in header]]
    for r in rows:
        data.append([Paragraph(c, S["cell_mono"] if i in mono else S["cell"])
                     for i, c in enumerate(r)])
    t = Table(data, colWidths=widths, repeatRows=1)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, PANEL]),
        ("GRID", (0, 0), (-1, -1), 0.4, RULE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 7), ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    return t


def chapter(num, title, sub=None):
    out = [P(f"SECTION {num}", "h1num"), P(title, "h1")]
    bar = Table([[""]], colWidths=[1.4 * inch], rowHeights=[2.5])
    bar.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), GOLD)]))
    out += [bar, Spacer(1, 11)]
    if sub:
        out.append(P(sub, "body"))
    return out


def draw_cover(c, d):
    c.saveState()
    c.setFillColor(NAVY); c.rect(0, PAGE_H - 1.1 * inch, PAGE_W, 1.1 * inch, stroke=0, fill=1)
    c.setFillColor(GOLD); c.rect(0, PAGE_H - 1.16 * inch, PAGE_W, 0.06 * inch, stroke=0, fill=1)
    c.setFillColor(NAVY); c.rect(0, 0, PAGE_W, 0.5 * inch, stroke=0, fill=1)
    c.setFillColor(colors.white); c.setFont("Helvetica", 8.5)
    c.drawCentredString(PAGE_W / 2, 0.2 * inch,
                        "7BAND — INTERNAL HANDOFF BRIEF")
    c.restoreState()


def draw_page(c, d):
    c.saveState()
    c.setStrokeColor(RULE); c.setLineWidth(0.5)
    c.line(MARGIN, PAGE_H - 0.72 * inch, PAGE_W - MARGIN, PAGE_H - 0.72 * inch)
    c.setFont("Helvetica", 8); c.setFillColor(GREY)
    c.drawString(MARGIN, PAGE_H - 0.64 * inch, "CONSULTING SITE — MIGRATION BRIEF")
    c.drawRightString(PAGE_W - MARGIN, PAGE_H - 0.64 * inch, "Hand to the new Claude Code session")
    c.line(MARGIN, 0.68 * inch, PAGE_W - MARGIN, 0.68 * inch)
    c.setFont("Helvetica", 8); c.setFillColor(GREY)
    c.drawString(MARGIN, 0.5 * inch, "7Band Financial Agency")
    c.setFillColor(GOLD); c.setFont("Helvetica-Bold", 9)
    c.drawRightString(PAGE_W - MARGIN, 0.5 * inch, str(c.getPageNumber() - 1))
    c.restoreState()


doc = BaseDocTemplate(
    OUT, pagesize=letter, leftMargin=MARGIN, rightMargin=MARGIN,
    topMargin=1.0 * inch, bottomMargin=0.95 * inch,
    title="Consulting Site — Migration Handoff Brief",
    author="7Band Financial Agency",
    subject="Moving the consulting website off Manus onto GitHub Pages",
)
doc.addPageTemplates([
    PageTemplate(id="Cover", frames=[Frame(MARGIN, 0.7 * inch, PAGE_W - 2 * MARGIN,
                                           PAGE_H - 2.0 * inch, id="cv")], onPage=draw_cover),
    PageTemplate(id="Body", frames=[Frame(MARGIN, 0.9 * inch, PAGE_W - 2 * MARGIN,
                                          PAGE_H - 1.85 * inch, id="bd")], onPage=draw_page),
])

W = PAGE_W - 2 * MARGIN
story = []

# ---------------- COVER ----------------
story.append(Spacer(1, 0.55 * inch))
story.append(Image(LOGO, width=1.5 * inch, height=1.5 * inch, hAlign="CENTER"))
story.append(Spacer(1, 0.3 * inch))
story.append(P("Consulting Website<br/>Migration Brief", "cover_title"))
gl = Table([[""]], colWidths=[2.0 * inch], rowHeights=[2]); gl.hAlign = "CENTER"
gl.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), GOLD)]))
story.append(gl)
story.append(Spacer(1, 0.2 * inch))
story.append(P("Everything a new Claude Code session needs to move this site<br/>"
               "off Manus without taking it offline.", "cover_sub"))
story.append(Spacer(1, 0.4 * inch))

facts = Table([
    [Paragraph("SITE", S["cell_head"]), Paragraph("The consulting website", S["cell_b"])],
    [Paragraph("LIVES ON", S["cell_head"]), Paragraph("Manus (to be replaced)", S["cell"])],
    [Paragraph("CODE", S["cell_head"]), Paragraph("Already on GitHub", S["cell"])],
    [Paragraph("DOMAIN", S["cell_head"]), Paragraph("Registered at Hostinger", S["cell"])],
    [Paragraph("STATUS", S["cell_head"]), Paragraph("LIVE — must stay up throughout", S["cell_b"])],
    [Paragraph("TARGET", S["cell_head"]), Paragraph("GitHub Pages, auto-deploy on push", S["cell"])],
], colWidths=[1.5 * inch, 3.6 * inch])
facts.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (0, -1), NAVY), ("BACKGROUND", (1, 0), (1, -1), PANEL),
    ("GRID", (0, 0), (-1, -1), 0.4, RULE), ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ("LEFTPADDING", (0, 0), (-1, -1), 9),
    ("TOPPADDING", (0, 0), (-1, -1), 7), ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
]))
facts.hAlign = "CENTER"
story.append(facts)
story.append(Spacer(1, 0.3 * inch))
story.append(P("Companion document to the 7Band Website Operations &amp; Recovery Manual.",
               "cover_sub"))

story.append(NextPageTemplate("Body"))
story.append(PageBreak())

# ---------------- 1. THE SITUATION ----------------
story += chapter("1", "Start Here",
                 "This site is the second migration off Manus. The first one — 7Band "
                 "Financial Agency — is already done and running on this exact setup, "
                 "so the pattern is proven.")

story.append(box("THE ONE DIFFERENCE THAT CHANGES EVERYTHING", [
    P("<b>The first site was already down when it was migrated.</b> There was nothing to "
      "protect, so DNS was repointed immediately.", "panel"),
    Spacer(1, 5),
    P("<b>This site is live and serving customers.</b> That reverses the order of "
      "operations: the new hosting must be built and fully verified <b>before</b> a single "
      "DNS record is touched. Done in that order, visitors never see an outage.", "panel"),
], bg=ALERT_BG, bar=GOLD))

story.append(Spacer(1, 12))
story.append(P("Why the site is being moved", "h2"))
story.append(P(
    "Manus hosted the first 7Band site. When that account was deleted, the hosting and "
    "every image hosted there vanished at the same moment and the business site was down "
    "for days. The code was safely on GitHub, which turned out not to be enough — code "
    "backup is not site backup. This migration removes the same single point of failure "
    "from the consulting site before it can fail.", "body"))

story.append(P("What the target setup looks like", "h2"))
story.append(data_table(
    ["Piece", "Provider", "Job"],
    [["Domain", "Hostinger", "Registration only."],
     ["DNS", "Hostinger", "Points the name at GitHub."],
     ["Files", "GitHub repo", "The site's source, version-controlled."],
     ["Hosting", "GitHub Pages", "Serves the site. Free."],
     ["Deployment", "GitHub Actions", "Rebuilds and republishes on every push to main."]],
    [1.2 * inch, 1.5 * inch, 4.0 * inch]))

story.append(PageBreak())

# ---------------- 2. HARD-WON RULES ----------------
story += chapter("2", "Rules Learned the Hard Way",
                 "Each of these cost real time on the first migration. Read them before "
                 "touching anything.")

story.append(box("DO NOT ADD GITHUB'S IP ADDRESSES AT HOSTINGER", [
    P("Standard GitHub Pages instructions say to create four <b>A records</b> pointing at "
      "185.199.108.153 and friends. <b>Hostinger does not need them.</b> Hostinger offers an "
      "<b>ALIAS</b> record, which does the same job and follows GitHub automatically if their "
      "addresses ever change. Adding A records alongside an ALIAS record creates a conflict.",
      "panel"),
    Spacer(1, 5),
    P("Correct records on the first site — use the same shape here:", "panel"),
    Spacer(1, 5),
    P("CNAME   www   ->  &lt;github-username&gt;.github.io<br/>"
      "ALIAS   @     ->  &lt;github-username&gt;.github.io", "mono_body"),
], bg=ALERT_BG, bar=GOLD))

story.append(Spacer(1, 10))
story.append(box("DO NOT TOUCH THE EMAIL DNS RECORDS", [
    P("Every MX record, and every entry mentioning hostingermail, mailgun, leadconnectorhq, "
      "DKIM, SPF or DMARC, exists to keep business email working. They have nothing to do "
      "with the website. Changing or deleting one breaks email delivery, and that failure is "
      "silent until someone notices mail is missing.", "panel"),
], bg=DANGER_BG, bar=DANGER, head="panel_head_d"))

story.append(Spacer(1, 12))
story.append(P("The rest of the list", "h2"))
story.append(bullets([
    "<b>Pull every image off Manus into the repository first.</b> This is what caused the "
    "worst damage last time — the logo, a portrait and two backgrounds were stored on Manus "
    "cloud rather than in the project, and two were never recovered. Before anything else, "
    "inventory every image the site loads and commit the files into the repo.",
    "<b>GitHub Pages must be switched on by hand the first time.</b> A workflow cannot create "
    "a Pages site from nothing. In the repo: <b>Settings → Pages → Source: GitHub Actions</b>. "
    "The first automated deploy fails until this is done.",
    "<b>Free GitHub Pages requires a public repository.</b> A private repo needs GitHub Pro "
    "(about $4/month). Making a repo private on a free plan takes the site offline instantly.",
    "<b>A CNAME file goes in the published folder</b> containing the domain, so Pages knows "
    "which custom domain to answer for.",
    "<b>Strip the platform's own code.</b> The first site carried Manus build plugins, a "
    "debug collector, a storage proxy and an analytics tag that could never work again. "
    "Search the project for the platform's name and remove what it finds.",
    "<b>Add an SPA fallback</b> if the site is a single-page app, or direct links to interior "
    "pages will 404.",
]))

story.append(PageBreak())

# ---------------- 3. ORDER OF OPERATIONS ----------------
story += chapter("3", "Order of Operations",
                 "Follow this sequence and the site never goes down. The DNS change is last, "
                 "and only after the new hosting is confirmed working.")

story.append(P("Phase 1 — Prepare, with nothing switched over", "h2"))
story.append(numbered([
    "Clone the repo and get the site building locally. Confirm it builds clean before "
    "changing anything.",
    "Inventory every image and asset the live site loads. Anything served from a Manus "
    "address must be downloaded and committed into the repository.",
    "Remove the platform's build plugins, analytics and runtime code.",
    "Add the GitHub Actions deploy workflow and the CNAME file.",
]))

story.append(P("Phase 2 — Stand up the new hosting alongside the old", "h2"))
story.append(numbered([
    "In the repo, set <b>Settings → Pages → Source: GitHub Actions</b>. Leave the custom "
    "domain field empty for now — filling it in early can disturb the live site.",
    "Push to main and let the deploy run.",
    "Open the temporary address — <b>&lt;username&gt;.github.io/&lt;repo&gt;</b> — and check "
    "the site thoroughly. Expect styling to look wrong at this address if the site is built "
    "for a domain root; judge content and structure, not layout.",
    "Fix anything broken and redeploy until it is right. The live site is untouched "
    "throughout this phase.",
]))

story.append(P("Phase 3 — The switch", "h2"))
story.append(numbered([
    "Enter the custom domain in <b>Settings → Pages</b> and save.",
    "At Hostinger, change the <b>www</b> CNAME and the <b>@</b> ALIAS from the Manus target "
    "to <b>&lt;username&gt;.github.io</b>. Change nothing else.",
    "Wait for GitHub's DNS check to pass, then for the HTTPS certificate to be issued. "
    "Minutes to a couple of hours; a browser security warning in the meantime is normal and "
    "clears itself.",
    "Tick <b>Enforce HTTPS</b> once it becomes available.",
    "Test the live domain in a private window and on a phone using mobile data.",
]))

story.append(Spacer(1, 8))
story.append(box("ROLLBACK", [
    P("If anything goes wrong after the DNS change, the old Manus target can be put back in "
      "those two records and the site returns to its previous host. <b>Record the exact "
      "original values before changing them</b> — that is the entire rollback plan, and it "
      "takes ten seconds to save.", "panel"),
]))

story.append(PageBreak())

# ---------------- 4. VERIFY ----------------
story += chapter("4", "Verify Before Declaring Done",
                 "The first migration shipped several bugs that a proper check would have "
                 "caught. Run all of these.")

story.append(data_table(
    ["Check", "What good looks like"],
    [["Every page loads", "In both the live domain and a private window. No 404s."],
     ["No broken images", "No broken-image icons. Check every page, not just the homepage."],
     ["Every link works", "Especially menu links. One dead nav link sat live for weeks on the first site."],
     ["Booking / contact links", "Open them and confirm the destination actually loads."],
     ["Contact details", "One consistent email address across the whole site. The first site had two, one of them a domain that was not owned."],
     ["Mobile", "No sideways scrolling; tap targets big enough; text readable."],
     ["Browser console", "No JavaScript errors on any page."],
     ["HTTPS", "Padlock present, Enforce HTTPS ticked."],
     ["Email still working", "Send a test message to and from the business address after the DNS change."]],
    [1.75 * inch, 4.95 * inch]))

story.append(Spacer(1, 14))
story.append(P("Once it is live", "h2"))
story.append(bullets([
    "Turn on auto-renew for the domain. An expired domain takes down the site and the email together.",
    "Keep two-factor authentication on GitHub, Hostinger and email. Those three accounts are "
    "the whole business now.",
    "Do not delete the Manus account until the new site has run clean for at least a week.",
    "Every image the site uses belongs in the repository. No exceptions. That single rule "
    "would have prevented most of what was lost the first time.",
]))

story.append(Spacer(1, 16))

S["panel_head_w"] = style("phw", fontName="Helvetica-Bold", fontSize=10.5, leading=15,
                          textColor=GOLD_LIGHT, spaceAfter=4)
S["panel_w"] = style("pw", fontName="Helvetica", fontSize=9.6, leading=14.2,
                     textColor=colors.white)

close = Table([[[P("How to use this brief", "panel_head_w"), Spacer(1, 4),
                 P("Hand this document to the new Claude Code session at the start, along "
                   "with the 7Band Website Operations &amp; Recovery Manual. Between them "
                   "they carry the full setup, the conventions, and the mistakes already "
                   "paid for — so the second migration starts where the first one finished.",
                   "panel_w")]]], colWidths=[W])
close.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, -1), NAVY),
    ("LEFTPADDING", (0, 0), (-1, -1), 16), ("RIGHTPADDING", (0, 0), (-1, -1), 16),
    ("TOPPADDING", (0, 0), (-1, -1), 14), ("BOTTOMPADDING", (0, 0), (-1, -1), 14),
]))
story.append(close)

doc.build(story)
print("built:", OUT)
