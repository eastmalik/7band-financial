#!/usr/bin/env python3
"""Build the Arise Credit Pro migration handoff brief as a branded PDF."""

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

OUT = "/home/user/7band-financial/docs/AriseCreditPro-Migration-Brief.pdf"
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
    c.drawString(MARGIN, PAGE_H - 0.64 * inch, "ARISE CREDIT PRO — MIGRATION BRIEF")
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
    title="Arise Credit Pro — Migration Handoff Brief",
    author="7Band Financial Agency",
    subject="Moving arisecreditpro.com off Manus onto GitHub Pages",
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
story.append(P("Arise Credit Pro<br/>Migration Brief", "cover_title"))
gl = Table([[""]], colWidths=[2.0 * inch], rowHeights=[2]); gl.hAlign = "CENTER"
gl.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), GOLD)]))
story.append(gl)
story.append(Spacer(1, 0.2 * inch))
story.append(P("Moving arisecreditpro.com off Manus without taking it offline<br/>"
               "and without losing a single lead.", "cover_sub"))
story.append(Spacer(1, 0.36 * inch))

facts = Table([
    [Paragraph("SITE", S["cell_head"]), Paragraph("arisecreditpro.com", S["cell_b"])],
    [Paragraph("LIVES ON", S["cell_head"]), Paragraph("Manus (to be replaced)", S["cell"])],
    [Paragraph("CODE", S["cell_head"]), Paragraph("Already mirrored to GitHub", S["cell"])],
    [Paragraph("DOMAIN", S["cell_head"]), Paragraph("Hostinger", S["cell"])],
    [Paragraph("STATUS", S["cell_head"]), Paragraph("LIVE — must stay up throughout", S["cell_b"])],
    [Paragraph("FORMS", S["cell_head"]), Paragraph("Connected to GoHighLevel CRM", S["cell_b"])],
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
story.append(P("Companion to the 7Band Website Operations &amp; Recovery Manual.", "cover_sub"))

story.append(NextPageTemplate("Body"))
story.append(PageBreak())

# ---------------- 1. START HERE ----------------
story += chapter("1", "Start Here",
                 "This is the third site in the 7Band ecosystem to move off Manus onto "
                 "GitHub Pages. The pattern is proven — 7Band Financial Agency has been "
                 "running on it since August.")

story.append(box("TWO THINGS MAKE THIS SITE DIFFERENT", [
    P("<b>1. It is live.</b> The first migration began with the site already down, so DNS "
      "was repointed immediately. Here the new hosting must be built and fully verified "
      "<b>before</b> any DNS record changes. Done in that order, visitors never see an outage.",
      "panel"),
    Spacer(1, 6),
    P("<b>2. It captures leads.</b> The other two sites collect nothing — every button sends "
      "people out to an external booking page. This site has forms wired to GoHighLevel. "
      "Those forms are the business, and Section 2 exists entirely because of them.", "panel"),
], bg=ALERT_BG, bar=GOLD))

story.append(Spacer(1, 12))
story.append(P("Why the site is being moved", "h2"))
story.append(P(
    "Manus hosted the 7Band Financial Agency site. When that account was deleted, the "
    "hosting and every image stored there vanished together and the business site was down "
    "for days. The code was safely on GitHub, which was not enough — code backup is not site "
    "backup. This migration removes the same single point of failure here before it can fail.",
    "body"))

story.append(P("What the target setup looks like", "h2"))
story.append(data_table(
    ["Piece", "Provider", "Job"],
    [["Domain", "Hostinger", "Registration only."],
     ["DNS", "Hostinger", "Points the name at GitHub."],
     ["Files", "GitHub repo", "The site's source, version-controlled."],
     ["Hosting", "GitHub Pages", "Serves the site. Free."],
     ["Deployment", "GitHub Actions", "Rebuilds and republishes on every push to main."],
     ["Lead capture", "GoHighLevel", "Unchanged — forms keep posting to the CRM."]],
    [1.25 * inch, 1.45 * inch, 4.0 * inch]))

story.append(PageBreak())

# ---------------- 2. THE FORMS ----------------
story += chapter("2", "The Forms Come First",
                 "Everything else in this migration is recoverable. A form that silently "
                 "stops delivering leads is not — the leads simply never arrive, and nobody "
                 "finds out for weeks. Settle this before anything else moves.")

story.append(box("THE QUESTION TO ANSWER BEFORE YOU TOUCH ANYTHING", [
    P("<b>Are the forms GoHighLevel's own, or are they Manus forms that forward to "
      "GoHighLevel?</b> The distinction decides whether they survive the move.", "panel"),
    Spacer(1, 7),
    P("<b>A GoHighLevel embed or hosted form survives.</b> The form is served and processed by "
      "GoHighLevel; the website only holds the embed code. Move the site anywhere and it keeps "
      "working. Look for an iframe or script pointing at a leadconnectorhq.com address.", "panel"),
    Spacer(1, 6),
    P("<b>A Manus-built form does not survive.</b> If the page collects the fields itself and "
      "submits them to Manus, which then relays them to GoHighLevel, that path dies with the "
      "Manus hosting. GitHub Pages serves static files and cannot process a form submission. "
      "It would have to be rebuilt as a GoHighLevel form before the switch.", "panel"),
], bg=DANGER_BG, bar=DANGER, head="panel_head_d"))

story.append(Spacer(1, 12))
story.append(P("How to check", "h2"))
story.append(numbered([
    "Open the live site, right-click a form and choose Inspect, or view the page source.",
    "Look at where the form lives. An iframe or script whose address contains "
    "<b>leadconnectorhq.com</b> means GoHighLevel is hosting it — good news, nothing to do.",
    "If instead you find a plain &lt;form&gt; with an action pointing at a Manus address, or a "
    "script posting to one, the form is Manus-native and must be replaced before the switch.",
    "Either way, search the repository for the form markup so you know every page it appears on.",
]))

story.append(Spacer(1, 6))
story.append(box("TEST WITH A REAL SUBMISSION — TWICE", [
    P("Submit a genuine test lead through every form on the site <b>before</b> the migration, "
      "and confirm it lands in GoHighLevel. Do it again <b>after</b> the DNS change. Use a "
      "recognisable name so the test entries are easy to find and delete.", "panel"),
    Spacer(1, 5),
    P("A form that looks right on the page but no longer delivers is the single most expensive "
      "failure available in this migration, and the only way to catch it is to actually send "
      "one through.", "panel"),
]))

story.append(Spacer(1, 12))
story.append(P("A note on what the forms collect", "h2"))
story.append(P(
    "Confirmed: these forms do not ask for Social Security numbers, dates of birth, or full "
    "credit details. Keep it that way on the new hosting. If a future form ever needs "
    "sensitive information of that kind, it must be collected inside GoHighLevel rather than "
    "on a page served from public static hosting, and it deserves its own conversation before "
    "it is built.", "body"))

story.append(PageBreak())

# ---------------- 3. HARD-WON RULES ----------------
story += chapter("3", "Rules Learned the Hard Way",
                 "Each of these cost real time on the first migration.")

story.append(box("DO NOT ADD GITHUB'S IP ADDRESSES AT HOSTINGER", [
    P("Standard GitHub Pages instructions say to create four <b>A records</b> pointing at "
      "185.199.108.153 and similar. <b>Hostinger does not need them.</b> Hostinger offers an "
      "<b>ALIAS</b> record, which does the same job and follows GitHub automatically if their "
      "addresses change. Adding A records alongside an ALIAS record creates a conflict.", "panel"),
    Spacer(1, 5),
    P("The working shape, as used on 7bandfinancialagency.com:", "panel"),
    Spacer(1, 4),
    P("CNAME   www   ->  &lt;github-username&gt;.github.io<br/>"
      "ALIAS   @     ->  &lt;github-username&gt;.github.io", "mono_body"),
], bg=ALERT_BG, bar=GOLD))

story.append(Spacer(1, 10))
story.append(box("DO NOT TOUCH THE EMAIL DNS RECORDS", [
    P("Every MX record, and every entry mentioning hostingermail, mailgun, leadconnectorhq, "
      "DKIM, SPF or DMARC, keeps business email working. They have nothing to do with the "
      "website. Changing one breaks mail delivery, and the failure is silent until somebody "
      "notices messages are missing.", "panel"),
], bg=DANGER_BG, bar=DANGER, head="panel_head_d"))

story.append(Spacer(1, 12))
story.append(P("The rest of the list", "h2"))
story.append(bullets([
    "<b>Pull every image off Manus into the repository first.</b> This caused the worst damage "
    "last time: four images lived on Manus cloud storage rather than in the project, and two "
    "were never recovered. Inventory every image the site loads and commit the files.",
    "<b>GitHub Pages must be switched on by hand the first time.</b> A workflow cannot create a "
    "Pages site from nothing. In the repo: <b>Settings → Pages → Source: GitHub Actions</b>.",
    "<b>Free GitHub Pages requires a public repository.</b> Private needs GitHub Pro (about "
    "$4/month). Making a repo private on a free plan takes the site offline instantly.",
    "<b>A CNAME file goes in the published folder</b>, containing the domain, so Pages knows "
    "which custom domain to answer for.",
    "<b>Strip the platform's own code.</b> The first site carried Manus build plugins, a debug "
    "collector, a storage proxy and an analytics tag that could never work again. Search the "
    "project for the platform's name and remove what it finds.",
    "<b>Add an SPA fallback</b> if the site is a single-page app, or direct links to interior "
    "pages will 404.",
    "<b>7bandfinancialagency.com links to this site.</b> The address does not change, so that "
    "link keeps working — but confirm it after the switch anyway.",
]))

story.append(PageBreak())

# ---------------- 4. ORDER OF OPERATIONS ----------------
story += chapter("4", "Order of Operations",
                 "Follow this sequence and the site never goes down. DNS changes last, only "
                 "once the new hosting is confirmed working.")

story.append(P("Phase 1 — Prepare, with nothing switched over", "h2"))
story.append(numbered([
    "Settle the forms question from Section 2. If the forms are Manus-native, rebuilding them "
    "as GoHighLevel forms is the first task, not an afterthought.",
    "Clone the repo and get the site building locally. Confirm a clean build before changing "
    "anything.",
    "Inventory every image and asset the live site loads. Anything served from a Manus address "
    "must be downloaded and committed into the repository.",
    "Remove the platform's build plugins, analytics and runtime code.",
    "Add the GitHub Actions deploy workflow and the CNAME file.",
]))

story.append(P("Phase 2 — Stand the new hosting up alongside the old", "h2"))
story.append(numbered([
    "In the repo: <b>Settings → Pages → Source: GitHub Actions</b>. Leave the custom domain "
    "field empty for now — filling it in early can disturb the live site.",
    "Push to main and let the deploy run.",
    "Open the temporary address — <b>&lt;username&gt;.github.io/&lt;repo&gt;</b> — and review "
    "the site thoroughly. Styling may look wrong at this address if the site is built for a "
    "domain root; judge content and structure, not layout.",
    "Submit a test lead through the form at that temporary address and confirm it reaches "
    "GoHighLevel.",
    "Fix and redeploy until it is right. The live site is untouched throughout this phase.",
]))

story.append(P("Phase 3 — The switch", "h2"))
story.append(numbered([
    "<b>Write down the current values of the www and @ records before changing them.</b> That "
    "is the entire rollback plan and it takes ten seconds.",
    "Enter the custom domain in <b>Settings → Pages</b> and save.",
    "At Hostinger, change the <b>www</b> CNAME and the <b>@</b> ALIAS from the Manus target to "
    "<b>&lt;username&gt;.github.io</b>. Change nothing else.",
    "Wait for GitHub's DNS check to pass, then for the HTTPS certificate. Minutes to a couple "
    "of hours; a browser security warning meanwhile is normal and clears itself.",
    "Tick <b>Enforce HTTPS</b> once available.",
    "Submit another test lead from the live domain and confirm it reaches GoHighLevel.",
]))

story.append(PageBreak())

# ---------------- 5. VERIFY ----------------
story += chapter("5", "Verify Before Declaring Done",
                 "Built from the bugs actually found on the first site. Run all of them.")

story.append(data_table(
    ["Check", "What good looks like"],
    [["<b>Forms deliver</b>", "A real test submission arrives in GoHighLevel. Check every form, on every page."],
     ["Every page loads", "In the live domain and a private window. No 404s."],
     ["No broken images", "No broken-image icons anywhere — check every page, not just the homepage."],
     ["Every link works", "Especially menu links. A dead nav link sat live for weeks on the first site."],
     ["Contact details", "One consistent email address sitewide. The first site had two, one on a domain not owned."],
     ["Mobile", "No sideways scrolling; tap targets big enough; text readable."],
     ["Browser console", "No JavaScript errors on any page."],
     ["HTTPS", "Padlock present, Enforce HTTPS ticked."],
     ["Email still working", "Send a test message to and from the business address after the DNS change."],
     ["Inbound link", "The Arise link on 7bandfinancialagency.com still resolves."]],
    [1.75 * inch, 4.95 * inch]))

story.append(Spacer(1, 14))
story.append(box("A COMPLIANCE NOTE, NOT LEGAL ADVICE", [
    P("Credit repair services in the United States fall under the Credit Repair Organizations "
      "Act and various state rules, which reach marketing copy as well as contracts — covering "
      "claims about results, required disclosures, and when fees may be charged.", "panel"),
    Spacer(1, 5),
    P("While working in this site, flag anything that reads as a guarantee of results or of "
      "specific score improvements rather than quietly leaving it. Raising it costs a sentence; "
      "leaving it can cost far more. Confirm the actual requirements with qualified counsel.",
      "panel"),
]))

story.append(Spacer(1, 12))
story.append(P("Once it is live", "h2"))
story.append(bullets([
    "Do not delete the Manus account until this site has run clean for at least a week and "
    "leads are confirmed arriving.",
    "Keep auto-renew on for the domain. An expired domain takes down the site and the email together.",
    "Keep two-factor authentication on GitHub, Hostinger and email. Those accounts now hold the "
    "whole ecosystem.",
    "Every image the site uses belongs in the repository. No exceptions.",
]))

story.append(Spacer(1, 16))
S["panel_head_w"] = style("phw2", fontName="Helvetica-Bold", fontSize=10.5, leading=15,
                          textColor=GOLD_LIGHT, spaceAfter=4)
S["panel_w"] = style("pw2", fontName="Helvetica", fontSize=9.6, leading=14.2,
                     textColor=colors.white)
close = Table([[[P("How to use this brief", "panel_head_w"), Spacer(1, 4),
                 P("Hand this to the new Claude Code session at the start, together with the "
                   "7Band Website Operations &amp; Recovery Manual. Between them they carry the "
                   "setup, the conventions and the mistakes already paid for — so this "
                   "migration starts where the last one finished.", "panel_w")]]], colWidths=[W])
close.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, -1), NAVY),
    ("LEFTPADDING", (0, 0), (-1, -1), 16), ("RIGHTPADDING", (0, 0), (-1, -1), 16),
    ("TOPPADDING", (0, 0), (-1, -1), 14), ("BOTTOMPADDING", (0, 0), (-1, -1), 14),
]))
story.append(close)

doc.build(story)
print("built:", OUT)
