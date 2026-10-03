#!/usr/bin/env python3
"""Build the Smart Beauty Project migration handoff brief as a branded PDF."""

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

OUT = "/home/user/7band-financial/docs/SmartBeauty-Migration-Brief.pdf"
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
    c.drawString(MARGIN, PAGE_H - 0.64 * inch, "THE SMART BEAUTY PROJECT — MIGRATION BRIEF")
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
    title="The Smart Beauty Project — Migration Handoff Brief",
    author="7Band Financial Agency",
    subject="Moving thesmartbeautyproject.com off Manus onto GitHub Pages",
)
doc.addPageTemplates([
    PageTemplate(id="Cover", frames=[Frame(MARGIN, 0.7 * inch, PAGE_W - 2 * MARGIN,
                                           PAGE_H - 2.0 * inch, id="cv")], onPage=draw_cover),
    PageTemplate(id="Body", frames=[Frame(MARGIN, 0.9 * inch, PAGE_W - 2 * MARGIN,
                                          PAGE_H - 1.85 * inch, id="bd")], onPage=draw_page),
])


W = PAGE_W - 2 * MARGIN
story = []

def M(s):
    return f"<font face='Courier'>{s}</font>"


# ---------------- COVER ----------------
story.append(Spacer(1, 0.55 * inch))
story.append(Image(LOGO, width=1.5 * inch, height=1.5 * inch, hAlign="CENTER"))
story.append(Spacer(1, 0.3 * inch))
story.append(P("The Smart Beauty Project<br/>Migration Brief", "cover_title"))
gl = Table([[""]], colWidths=[2.0 * inch], rowHeights=[2]); gl.hAlign = "CENTER"
gl.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), GOLD)]))
story.append(gl)
story.append(Spacer(1, 0.2 * inch))
story.append(P("The last site to leave Manus. A one-page site whose three buttons<br/>"
               "all lead to placeholders.", "cover_sub"))
story.append(Spacer(1, 0.36 * inch))

facts = Table([
    [Paragraph("SITE", S["cell_head"]), Paragraph("www.thesmartbeautyproject.com", S["cell_b"])],
    [Paragraph("WHAT IT IS", S["cell_head"]), Paragraph("A program of 7Band Inc. (the nonprofit)", S["cell"])],
    [Paragraph("LIVES ON", S["cell_head"]), Paragraph("Manus (to be replaced)", S["cell"])],
    [Paragraph("CODE", S["cell_head"]), Paragraph("github.com/eastmalik/smart-beauty-project (PRIVATE)", S["cell"])],
    [Paragraph("DOMAIN", S["cell_head"]), Paragraph("Registrar to confirm — see Section 1", S["cell_b"])],
    [Paragraph("STATUS", S["cell_head"]), Paragraph("LIVE — must stay up throughout", S["cell_b"])],
    [Paragraph("BUTTONS", S["cell_head"]), Paragraph("ALL THREE ARE PLACEHOLDERS — see Section 2", S["cell_b"])],
    [Paragraph("TARGET", S["cell_head"]), Paragraph("GitHub Pages, auto-deploy on push", S["cell"])],
], colWidths=[1.5 * inch, 3.6 * inch])
facts.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (0, -1), NAVY), ("BACKGROUND", (1, 0), (1, -1), PANEL),
    ("GRID", (0, 0), (-1, -1), 0.4, RULE), ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ("LEFTPADDING", (0, 0), (-1, -1), 9),
    ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
]))
facts.hAlign = "CENTER"
story.append(facts)
story.append(Spacer(1, 0.26 * inch))
story.append(P("Companion to the 7Band Website Operations &amp; Recovery Manual<br/>"
               "and the 7Band Inc. migration brief.", "cover_sub"))

story.append(NextPageTemplate("Body"))
story.append(PageBreak())

# ---------------- 1. START HERE ----------------
story += chapter("1", "Start Here",
                 "The smallest site in the ecosystem: one page, six sections (hero, mission, "
                 "free resource, eBook, donate, footer). The hosting work is the Arise pattern "
                 "again. The real work is that nothing on the page leads anywhere yet.")

story.append(box("WHAT THE SCAN FOUND", [
    P("<b>1. Every button is a placeholder.</b> \"Get Free Access Now\" opens a Google Form "
      "address containing the word PLACEHOLDER. \"Purchase the eBook\" goes to "
      "<b>example.com</b>. \"Donate Now\" opens another PLACEHOLDER Google Form. Visitors who "
      "click any of them land on an error page.", "panel"),
    Spacer(1, 6),
    P("<b>2. A Google Form is not a donation.</b> The plan was a form asking for name, email, "
      "phone and amount. That records a pledge; no money moves. Donations should go through "
      "the same processor chosen for 7Band Inc., since this is its program.", "panel"),
    Spacer(1, 6),
    P("<b>3. The hero says \"501(c)(3) Nonprofit\".</b> The Smart Beauty Project is a "
      "<i>program</i> of 7Band Inc.; it is not itself a 501(c)(3). And the eBook carries a "
      "five-star \"Reader Approved\" badge with no reviews behind it. Section 3.", "panel"),
    Spacer(1, 6),
    P("<b>4. There is no way to contact anyone.</b> No email, phone or contact form anywhere "
      "on the page.", "panel"),
], bg=DANGER_BG, bar=DANGER, head="panel_head_d"))

story.append(P("Before touching any code", "h2"))
story.append(bullets([
    "<b>The repository is private.</b> Free GitHub Pages needs it public (Settings → General → "
    "Change visibility), as was done for 7band-inc, or a GitHub Pro plan. Check the code for "
    "secrets before flipping it; the scan found none.",
    "<b>Re-sync from Manus.</b> The newest code on GitHub is dated <b>3 August 2026</b>. If "
    "the site changed in Manus after that, push from Manus to GitHub first.",
    "<b>Find out where thesmartbeautyproject.com is registered.</b> If it is in Hostinger, the "
    "switch is two DNS records, as for 7bandinc.org. If it was bought through Manus or "
    "elsewhere, sort out the domain before anything else, and do not cancel Manus until it is "
    "safe. Note any MX records (email) and leave them alone.",
    "<b>Do 7Band Inc. first.</b> This site depends on decisions made there: the donation "
    "processor, the 501(c)(3) answer and the GoHighLevel tagging.",
]))

story.append(PageBreak())

# ---------------- 2. BUTTONS ----------------
story += chapter("2", "Make the Three Buttons Real",
                 "Each one needs something real at the other end before code can point at it. "
                 "Malik supplies the destination; the site only links to it.")
story.append(data_table(
    ["Button", "Points at today", "Needs"],
    [["<b>Get Free Access Now</b>",
      "A Google Form address containing <b>PLACEHOLDER</b>",
      "The toolkit itself (does it exist yet?), delivered after an email opt-in: a GoHighLevel "
      "form and automation that sends the download, tagged Smart Beauty."],
     ["<b>Purchase the eBook</b> (\"from $9.99\")", M("https://example.com/ebook"),
      "A real checkout: Stripe Payment Link, Gumroad, Payhip or a GoHighLevel order form. Paid "
      "into 7Band Inc.'s account, not a personal one."],
     ["<b>Donate Now</b>",
      "A Google Form address containing <b>PLACEHOLDER_FORM_ID</b>",
      "The 7Band Inc. donation page, designated for Smart Beauty if the processor allows it."]],
    [1.6 * inch, 2.3 * inch, 2.8 * inch]))
story.append(Spacer(1, 10))
story.append(bullets([
    "The amount buttons ($10, $25, $50, $100, $250, Custom) do nothing today. Either pass the "
    "amount to the donation page, if the processor supports it, or remove them and let the "
    "processor's page ask.",
    "Constants to change: " + M("FREE_RESOURCE_URL") + " in FreeResourceSection.tsx, " +
    M("EBOOK_PURCHASE_URL") + " in EbookSection.tsx, " + M("GOOGLE_FORM_URL") +
    " in DonateSection.tsx.",
    "Until a destination exists, hide that button or show \"Coming soon\". A button that "
    "opens an error page costs more trust than no button.",
    "Add a contact line in the footer: an email address that actually receives mail.",
]))
story.append(Spacer(1, 4))
story.append(box("SECURITY: NEVER PASTE KEYS INTO THE CHAT", [
    P("Malik should never paste a GoHighLevel API key, a Stripe secret key, a token or a "
      "password into a Claude chat. Payment links, form links and webhook URLs are fine; they "
      "are public anyway.", "panel"),
], bg=ALERT_BG, bar=GOLD))

story.append(PageBreak())

# ---------------- 3. CLAIMS ----------------
story += chapter("3", "Claims on the Page",
                 "Not legal advice. Points to confirm with Malik before the new site goes "
                 "live, following whatever he decided for 7Band Inc.")
story.append(data_table(
    ["On the page", "Problem", "Direction"],
    [["Hero stat: \"501(c)(3) Nonprofit\"",
      "The project is a program, not a separate charity. And 7Band Inc.'s own status needs "
      "confirming (7Band Inc. brief, Section 3).",
      "\"A program of 7Band Inc., a 501(c)(3) nonprofit\", once the IRS letter is confirmed."],
     ["eBook: five stars and \"Reader Approved\"",
      "Implies reviews that are not shown and may not exist. The FTC's 2024 rule on fake "
      "reviews covers ratings shown without real reviews behind them.",
      "Remove until there are real reviews to show."],
     ["\"Empowering Black women since 2022\", \"Operating since 2022\"",
      "Fine if true; check it matches 7Band Inc.'s founding and the project's actual start.",
      "Confirm."],
     ["\"Your donation directly funds free educational resources ... across the country\"",
      "A specific promise about how donations are used.",
      "Keep only if that is how the money is used."],
     ["\"100% Mission-Driven\"", "Reads as a statistic; it isn't one.", "Fine as a slogan; or cut."]],
    [1.9 * inch, 2.6 * inch, 2.2 * inch]))
story.append(Spacer(1, 10))
story.append(P(
    "<b>The hero photo has text in it.</b> The code layers three separate masks over the right "
    "side of the hero image \"to hide any image text\". That usually means a generated image "
    "with stray lettering. Replacing it with a clean photo would let the masks go."))

story.append(PageBreak())
story += chapter("4", "Media Still on Manus",
                 "Four files load from Manus's storage. Malik downloads them from the Manus "
                 "project; they go into " + "<font face='Courier'>client/public/</font>" + ".")
story.append(data_table(
    ["File", "Used on"],
    [["logo-icon_caa36e32.png", "Navbar and footer"],
     ["hero-main_1ea35f32.jpg", "Hero (see the note above)"],
     ["ebook-cover_3f11228b.jpg", "eBook section"],
     ["community-section_7e8141ae.jpg", "Donate section background"]],
    [3.4 * inch, 3.3 * inch], mono=(0,)))

story.append(Spacer(1, 16))

# ---------------- 5. ORDER ----------------
story += chapter("5", "Order of Operations",
                 "The same sequence as 7Band Inc. DNS changes last.")
story.append(P("Phase 1 — Prepare, with nothing switched over", "h2"))
story.append(numbered([
    "Make the repository public (or go Pro), re-sync from Manus, clone, " + M("pnpm install") +
    ", " + M("pnpm check") + "; confirm a clean build.",
    "Remove the Manus pieces: " + M("Map.tsx") + " (it points at a Manus maps proxy), " +
    M("ManusDialog.tsx") + ", " + M("const.ts") + ", " + M("client/public/__manus__/") +
    ", the Manus plugins in " + M("vite.config.ts") + " (copy the clean one from "
    "7band-financial) and the umami script in " + M("index.html") + ". The Express server is "
    "not needed.",
    "Add the deploy workflow, a " + M("CNAME") + " file with " +
    M("www.thesmartbeautyproject.com") + ", the 404 fallback and favicons.",
    "Bring the four images in. Wire the three buttons, or hide the ones without a destination.",
    "Fix the claims in Section 3 and add a contact line.",
]))
story.append(P("Phase 2 — Stand the new hosting up alongside the old", "h2"))
story.append(numbered([
    "<b>Settings → Pages → Source: GitHub Actions.</b> Leave the custom domain empty for now.",
    "Merge to main and review at eastmalik.github.io/smart-beauty-project. Click every button.",
]))
story.append(KeepTogether([P("Phase 3 — The switch", "h2"), numbered([
    "<b>Write down the current @ and www records</b> wherever the domain lives. That is the "
    "rollback plan.",
    "Enter <b>www.thesmartbeautyproject.com</b> as the custom domain in Settings → Pages.",
    "Point <b>www</b> (CNAME) and <b>@</b> (ALIAS, or GitHub's four A records if the registrar "
    "has no ALIAS) at <b>eastmalik.github.io</b>. Leave MX and TXT alone.",
    "Wait for the certificate, tick <b>Enforce HTTPS</b>, and test every button from the live domain.",
    "Confirm the four Smart Beauty links on 7bandinc.org still open the site.",
    "Leave Manus running a week. This is the last site, so after that Manus can be cancelled, "
    "once every brief's \"once it is live\" checks have passed.",
])]))

story.append(Spacer(1, 6))
story.append(KeepTogether([P("Verify before declaring done", "h2"), data_table(
    ["Check", "What good looks like"],
    [["<b>Free resource</b>", "Opt in with a test email; the toolkit arrives and the contact is in GoHighLevel, tagged Smart Beauty."],
     ["<b>eBook</b>", "Checkout opens, a test purchase completes and delivers the file, and the money lands in 7Band Inc.'s account."],
     ["<b>Donate</b>", "Opens the real donation page; a small test gift is receipted."],
     ["No placeholders", "No PLACEHOLDER or example.com anywhere in the code."],
     ["Claims", "501(c)(3) wording and the star rating fixed as agreed."],
     ["No Manus requests", "All images load from the repository."],
     ["HTTPS", "Both thesmartbeautyproject.com and www load with a padlock."]],
    [1.75 * inch, 4.95 * inch])]))

story.append(Spacer(1, 14))
S["panel_head_w"] = style("phw2", fontName="Helvetica-Bold", fontSize=10.5, leading=15,
                          textColor=GOLD_LIGHT, spaceAfter=4)
S["panel_w"] = style("pw2", fontName="Helvetica", fontSize=9.6, leading=14.2,
                     textColor=colors.white)
close = Table([[[P("How to use this brief", "panel_head_w"), Spacer(1, 4),
                 P("Upload this to the new Claude Code session together with the Operations "
                   "Manual and the 7Band Inc. brief. Point it at eastmalik/smart-beauty-project. "
                   "Ask Malik for the three destinations (toolkit, eBook checkout, donation page) "
                   "first; the rest is quick.", "panel_w")]]], colWidths=[W])
close.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, -1), NAVY),
    ("LEFTPADDING", (0, 0), (-1, -1), 16), ("RIGHTPADDING", (0, 0), (-1, -1), 16),
    ("TOPPADDING", (0, 0), (-1, -1), 14), ("BOTTOMPADDING", (0, 0), (-1, -1), 14),
]))
story.append(close)

doc.build(story)
print("built:", OUT)
