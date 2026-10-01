#!/usr/bin/env python3
"""Build the 7Band Offer Architecture reference as a branded PDF."""

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

OUT = "/home/user/7band-financial/docs/7Band-Offer-Architecture.pdf"
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
GOOD_BG = colors.HexColor("#F1F6F0")
GOOD = colors.HexColor("#2F6B3A")

PAGE_W, PAGE_H = letter
MARGIN = 0.9 * inch
W = PAGE_W - 2 * MARGIN
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
    "flabel": style("fl", fontName="Helvetica-Bold", fontSize=8.2, leading=11,
                    textColor=GOLD, spaceBefore=11, spaceAfter=3),
    "body": style("b", fontName="Helvetica", fontSize=10, leading=15,
                  textColor=INK, spaceAfter=8),
    "lede": style("ld", fontName="Helvetica-Bold", fontSize=11, leading=16,
                  textColor=NAVY, spaceAfter=9),
    "quote": style("q", fontName="Helvetica-Oblique", fontSize=10.4, leading=15.6,
                   textColor=NAVY, spaceAfter=6, leftIndent=10),
    "bullet": style("bu", fontName="Helvetica", fontSize=10, leading=14.8,
                    textColor=INK, spaceAfter=5),
    "panel": style("p", fontName="Helvetica", fontSize=9.6, leading=14.2, textColor=INK),
    "panel_head": style("ph", fontName="Helvetica-Bold", fontSize=9.6, leading=13.5,
                        textColor=NAVY, spaceAfter=4),
    "panel_head_d": style("phd", fontName="Helvetica-Bold", fontSize=9.6, leading=13.5,
                          textColor=DANGER, spaceAfter=4),
    "panel_head_g": style("phg", fontName="Helvetica-Bold", fontSize=9.6, leading=13.5,
                          textColor=GOOD, spaceAfter=4),
    "disc": style("ds", fontName="Helvetica", fontSize=9.3, leading=14, textColor=INK,
                  spaceAfter=7),
    "cell": style("c", fontName="Helvetica", fontSize=9.2, leading=12.8, textColor=INK),
    "cell_b": style("cb", fontName="Helvetica-Bold", fontSize=9.2, leading=12.8, textColor=NAVY),
    "cell_head": style("ch", fontName="Helvetica-Bold", fontSize=9.2, leading=12.8,
                       textColor=colors.white),
    "panel_head_w": style("phw", fontName="Helvetica-Bold", fontSize=10.5, leading=15,
                          textColor=GOLD_LIGHT, spaceAfter=4),
    "panel_w": style("pw", fontName="Helvetica", fontSize=9.6, leading=14.2,
                     textColor=colors.white),
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
    t = Table([[inner]], colWidths=[W])
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


def warn(title, flows):
    return box(title, flows, bg=DANGER_BG, head="panel_head_d", bar=DANGER)


def good(title, flows):
    return box(title, flows, bg=GOOD_BG, head="panel_head_g", bar=GOOD)


def note(title, flows):
    return box(title, flows, bg=ALERT_BG, bar=GOLD)


def data_table(header, rows, widths, bold_col=None):
    data = [[Paragraph(h, S["cell_head"]) for h in header]]
    for r in rows:
        data.append([Paragraph(c, S["cell_b"] if bold_col == i else S["cell"])
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


def features(rows, total):
    data = [[Paragraph("FEATURE", S["cell_head"]), Paragraph("STANDALONE VALUE", S["cell_head"])]]
    for name, val in rows:
        data.append([Paragraph(name, S["cell"]), Paragraph(val, S["cell"])])
    data.append([Paragraph("Stacked value", S["cell_b"]), Paragraph(total, S["cell_b"])])
    t = Table(data, colWidths=[W - 1.9 * inch, 1.9 * inch], repeatRows=1)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("ROWBACKGROUNDS", (0, 1), (-1, -2), [colors.white, PANEL]),
        ("BACKGROUND", (0, -1), (-1, -1), ALERT_BG),
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


def F(label, *flows):
    """A worksheet field: gold label, then its content."""
    out = [P(label.upper(), "flabel")]
    for f in flows:
        out.append(P(f, "body") if isinstance(f, str) else f)
    return out


def tier_header(tier, name, price):
    data = [[Paragraph(tier.upper(), S["cell_head"]),
             Paragraph(f"<b>{name}</b>", S["panel_head"]),
             Paragraph(f"<b>{price}</b>", S["cell_b"])]]
    t = Table(data, colWidths=[1.15 * inch, W - 3.0 * inch, 1.85 * inch])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, 0), NAVY),
        ("BACKGROUND", (1, 0), (-1, 0), ALERT_BG),
        ("BOX", (0, 0), (-1, -1), 0.6, RULE),
        ("LINEBEFORE", (2, 0), (2, 0), 0.4, RULE),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("ALIGN", (2, 0), (2, 0), "RIGHT"),
        ("LEFTPADDING", (0, 0), (-1, -1), 9), ("RIGHTPADDING", (0, 0), (-1, -1), 9),
        ("TOPPADDING", (0, 0), (-1, -1), 8), ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    return t


def draw_cover(c, d):
    c.saveState()
    c.setFillColor(NAVY); c.rect(0, PAGE_H - 1.1 * inch, PAGE_W, 1.1 * inch, stroke=0, fill=1)
    c.setFillColor(GOLD); c.rect(0, PAGE_H - 1.16 * inch, PAGE_W, 0.06 * inch, stroke=0, fill=1)
    c.setFillColor(NAVY); c.rect(0, 0, PAGE_W, 0.5 * inch, stroke=0, fill=1)
    c.setFillColor(colors.white); c.setFont("Helvetica", 8.5)
    c.drawCentredString(PAGE_W / 2, 0.2 * inch, "7BAND — INTERNAL OFFER REFERENCE")
    c.restoreState()


def draw_page(c, d):
    c.saveState()
    c.setStrokeColor(RULE); c.setLineWidth(0.5)
    c.line(MARGIN, PAGE_H - 0.72 * inch, PAGE_W - MARGIN, PAGE_H - 0.72 * inch)
    c.setFont("Helvetica", 8); c.setFillColor(GREY)
    c.drawString(MARGIN, PAGE_H - 0.64 * inch, "7BAND ECOSYSTEM — OFFER ARCHITECTURE")
    c.drawRightString(PAGE_W - MARGIN, PAGE_H - 0.64 * inch, "Internal — not for distribution")
    c.line(MARGIN, 0.68 * inch, PAGE_W - MARGIN, 0.68 * inch)
    c.setFont("Helvetica", 8); c.setFillColor(GREY)
    c.drawString(MARGIN, 0.5 * inch, "7Band Financial Agency · Arise Credit Pro")
    c.setFillColor(GOLD); c.setFont("Helvetica-Bold", 9)
    c.drawRightString(PAGE_W - MARGIN, 0.5 * inch, str(c.getPageNumber() - 1))
    c.restoreState()


doc = BaseDocTemplate(
    OUT, pagesize=letter, leftMargin=MARGIN, rightMargin=MARGIN,
    topMargin=1.0 * inch, bottomMargin=0.95 * inch,
    title="7Band Ecosystem — Offer Architecture",
    author="7Band Financial Agency",
    subject="The four-tier offer ladder, pricing logic and required disclosures",
)
doc.addPageTemplates([
    PageTemplate(id="Cover", frames=[Frame(MARGIN, 0.7 * inch, W,
                                           PAGE_H - 2.0 * inch, id="cv")], onPage=draw_cover),
    PageTemplate(id="Body", frames=[Frame(MARGIN, 0.9 * inch, W,
                                          PAGE_H - 1.85 * inch, id="bd")], onPage=draw_page),
])

story = []

# ---------------- COVER ----------------
story.append(Spacer(1, 0.55 * inch))
story.append(Image(LOGO, width=1.5 * inch, height=1.5 * inch, hAlign="CENTER"))
story.append(Spacer(1, 0.3 * inch))
story.append(P("Offer Architecture", "cover_title"))
gl = Table([[""]], colWidths=[2.0 * inch], rowHeights=[2]); gl.hAlign = "CENTER"
gl.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), GOLD)]))
story.append(gl)
story.append(Spacer(1, 0.2 * inch))
story.append(P("The four-tier ladder, the pricing logic behind it,<br/>"
               "and the disclosure copy each tier requires.", "cover_sub"))
story.append(Spacer(1, 0.36 * inch))

facts = Table([
    [Paragraph("LOW", S["cell_head"]), Paragraph("Fix Your File", S["cell_b"]),
     Paragraph("$27 one-time", S["cell"])],
    [Paragraph("OTO", S["cell_head"]), Paragraph("The Dispute Engine", S["cell_b"]),
     Paragraph("$67 one-time", S["cell"])],
    [Paragraph("MID", S["cell_head"]), Paragraph("The Restoration Program", S["cell_b"]),
     Paragraph("$152.60 / month", S["cell"])],
    [Paragraph("HIGH", S["cell_head"]), Paragraph("The Capital Architecture Program", S["cell_b"]),
     Paragraph("$2,997 staged", S["cell"])],
    [Paragraph("—", S["cell_head"]), Paragraph("The insurance conversation", S["cell_b"]),
     Paragraph("Free · carrier-paid", S["cell"])],
], colWidths=[0.8 * inch, 2.9 * inch, 1.6 * inch])
facts.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (0, -1), NAVY), ("BACKGROUND", (1, 0), (-1, -1), PANEL),
    ("GRID", (0, 0), (-1, -1), 0.4, RULE), ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ("LEFTPADDING", (0, 0), (-1, -1), 9),
    ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
]))
facts.hAlign = "CENTER"
story.append(facts)
story.append(Spacer(1, 0.26 * inch))
story.append(P("Companion to the 7Band Website Operations &amp; Recovery Manual.<br/>"
               "Internal working document — compliance items in Section 8 are unresolved.",
               "cover_sub"))

story.append(NextPageTemplate("Body"))
story.append(PageBreak())

# ---------------- 1. THE GOVERNING PRINCIPLE ----------------
story += chapter("1", "The Governing Principle",
                 "Every price in this document follows from one sentence. If a future offer "
                 "cannot be built to fit it, the offer is wrong — not the sentence.")

story.append(box("THE SENTENCE", [
    P("You charge for <b>education and preparation</b>. You never charge for the insurance, "
      "and you never touch premium money.", "lede"),
    P("Three consequences fall out of it automatically: no client premium funds ever sit in a "
      "7Band account; no advisory fee is ever stacked on top of a commission earned from the "
      "same client; and the credit-side billing stands on its own without depending on an "
      "insurance sale to be profitable.", "panel"),
], bar=GOLD, bg=ALERT_BG))

story.append(Spacer(1, 14))
story.append(P("Why it is worth the revenue it costs", "h2"))
story.append(P("The American Money Tree spends ten chapters arguing that this industry hides "
               "its mechanics from the people paying for them. That argument is the brand, and "
               "it is a genuinely rare one. An offer ladder that quietly contradicts it would "
               "cost more than the money it earns — the first competitor or regulator to "
               "point at the contradiction gets to define the business.", "body"))
story.append(P("The compensation story that comes out the other side is one almost nobody else "
               "in this market can tell:", "body"))
story.append(P("“Everything I charge for is education and preparation. The policy itself "
               "costs you nothing extra — the carrier pays me, and I’ll tell you "
               "exactly how much and why the design I recommend pays me less.”", "quote"))

story.append(Spacer(1, 16))
ladder = []
ladder.append(P("The ladder", "h2"))
ladder.append(data_table(
    ["TIER", "OFFER", "CLIENT PAYS", "WHY IT IS CLEAN"],
    [["Low", "Fix Your File", "$27 one-time",
      "Education. No service obligation, so it can be sold upfront."],
     ["OTO", "The Dispute Engine", "$67 one-time",
      "Education, delivered instantly. No subscription required."],
     ["Mid", "The Restoration Program", "$152.60/mo",
      "Service billed <b>after</b> each month’s work. No advance fee."],
     ["High", "Capital Architecture Program", "$2,997",
      "Consulting and education, paid in stages as each phase is delivered."],
     ["—", "The insurance conversation", "Free",
      "Carrier-compensated, disclosed out loud. Never a condition of anything."]],
    [0.6 * inch, 1.75 * inch, 1.0 * inch, W - 3.35 * inch], bold_col=1))

ladder.append(Spacer(1, 14))
ladder.append(note("THE RULE THAT KEEPS THE TIERS SEPARATE", [
    P("<b>Personal credit work lives only in the mid tier.</b> The high tier handles the "
      "business entity and business credit, and says so explicitly. Letting the two blur on a "
      "sales page is what would let a $2,997 consulting engagement be argued as a credit repair "
      "service collecting an advance fee. Keep the line visible in the copy, not just in your "
      "head.", "panel"),
]))
story.append(KeepTogether(ladder))

story.append(PageBreak())

# ---------------- 2. LOW TICKET ----------------
story += chapter("2", "Low Ticket — Fix Your File",
                 "The entry point. Its job is not profit; its job is to make you the person "
                 "who told them the truth for $27.")

story.append(tier_header("Low", "Fix Your File — The Plain-Language Credit Owner’s Manual",
                         "$27"))

story += F("Delivery method", "Instant digital download (PDF) plus a 5-day email walkthrough.")

story += F("Tagline / one-liner")
story.append(P("Understand what’s actually on your credit report, what you can dispute, "
               "and what nobody can legally remove — before you pay anyone to fix it.",
               "quote"))

story += F("Structure / what’s included",
           "A self-paced digital guide that walks you through pulling all three bureau reports, "
           "reading them properly, identifying genuine errors, and filing disputes yourself. "
           "Includes dispute letter templates, a report-review checklist, and a 5-day email "
           "sequence that paces you through it. For people who want to try it themselves first "
           "— and who want to be able to tell a real credit service from a scam if they "
           "decide to hire one.")

story += F("Key benefits")
story.append(numbered([
    "Read your own credit report and know exactly what’s hurting your score and why.",
    "File your own disputes correctly, using letters that follow the proper process.",
    "Know what’s actually removable versus what you’ll simply have to outlast — "
    "so nobody can sell you a fantasy.",
]))

story += F("Features")
story.append(features([
    ("The Fix Your File guide (plain-language, no jargon)", "$47"),
    ("Dispute letter template pack — all three bureaus", "$37"),
    ("The Report Review Checklist — what to look for, line by line", "$27"),
    ("5-day email walkthrough", "$37"),
], "$148"))

story += F("Price · $27, one-time",
           "At $27 it’s an impulse decision, not a deliberation — low enough that "
           "someone frustrated with their credit will just buy it, high enough to filter out "
           "people who’ll never act. It is an educational product, so it carries none of "
           "the regulatory weight of a service. And it does the real job: it makes you the "
           "person who told them the truth for $27, which is who they call when they decide "
           "they’d rather have it done for them.")

story += F("Guarantee",
           "30-day money-back guarantee. Read it, use it, and if it doesn’t help you "
           "understand your report, ask for a refund.")

story += F("Urgency / scarcity",
           "Buyers in the first 48 hours get a seat on the next live Q&amp;A.")

story.append(Spacer(1, 6))
story.append(warn("ONLY IF IT IS REAL", [
    P("That Q&amp;A has to be a thing you actually run, or the mechanic comes out. Fake "
      "countdown timers are the exact posture the book argues against — and this is the "
      "first thing a new buyer ever sees you do.", "panel"),
]))

story.append(Spacer(1, 12))
story.append(good("THE LINE THAT MAKES THIS TIER WORK", [
    P("“You can pull all three reports free at annualcreditreport.com — that’s "
      "federal law, and nobody needs to sell it to you. Paid monitoring is optional for doing "
      "this yourself.”", "panel"),
    Spacer(1, 5),
    P("True, useful, and slightly costly to say. Which is exactly why it earns the trust that "
      "sells the tier above it.", "panel"),
]))

story.append(PageBreak())

# ---------------- 3. OTO ----------------
story += chapter("3", "One-Time Offer — The Dispute Engine",
                 "Shown once, on the page immediately after the $27 purchase. Not a new "
                 "decision — a “make this easier” upgrade.")

story.append(tier_header("OTO", "The Dispute Engine", "$67"))

story += F("Delivery method",
           "Instant digital access, added to the same login as Fix Your File.")

story += F("Tagline / one-liner")
story.append(P("Watch the whole process over my shoulder — then run it yourself in half "
               "the time.", "quote"))

story += F("Structure / what’s included",
           "The execution layer for people who’ve read the guide and want to move faster. "
           "Screen-recorded walkthroughs of pulling reports, spotting genuine errors, and "
           "filing a dispute correctly the first time. Plus the tracker that keeps every item, "
           "date and bureau response organized, and the escalation sequence for what to do when "
           "a bureau comes back “verified” — which is where most people quit.")

story += F("Key benefits")
story.append(numbered([
    "Cut the guesswork — see each step performed rather than described.",
    "Track every dispute, deadline and response in one place instead of losing the thread.",
    "Know exactly what to do when a bureau pushes back, instead of stopping there.",
]))

story += F("Features")
story.append(features([
    ("Over-the-shoulder video walkthroughs (pull, read, dispute)", "$97"),
    ("The Dispute Tracker — items, dates, bureau responses", "$47"),
    ("Escalation letter sequence for “verified” responses", "$67"),
    ("Rent &amp; mortgage reporting setup guide", "$37"),
], "$248"))

story += F("Price · $67, one-time",
           "They have just spent $27 and are already committed to doing this themselves. $67 is "
           "small next to what a bad credit profile costs them every month in retail interest, "
           "and it is the natural upgrade rather than a new decision. It also self-selects: "
           "someone who buys the execution layer intends to act — which makes them the "
           "right person for the Restoration Program later.")

story += F("Guarantee",
           "30-day money-back guarantee, same as the guide. Use it, and if it doesn’t save "
           "you time, ask for a refund.")

story += F("Urgency / scarcity",
           "This price is available on this page only — it isn’t offered again later.")

story.append(Spacer(1, 6))
story.append(warn("HONOR IT OR DROP IT", [
    P("That is the standard OTO mechanic and it is honest <b>as long as you actually hold the "
      "line</b>. If someone emails next month asking for it at $67 and you say yes, the "
      "scarcity was a lie. Pick one and stick to it.", "panel"),
]))

story.append(Spacer(1, 12))
story.append(note("BOTH DIGITAL TIERS ARE SUBSCRIPTION-FREE", [
    P("Neither the $27 guide nor the $67 upgrade requires IdentityIQ or any monitoring product. "
      "Say so on both pages. It is the cleanest possible contrast with the service tiers, where "
      "monitoring <i>is</i> required — and it means these two products carry no "
      "negative-option disclosure burden at all.", "panel"),
]))

story.append(PageBreak())

# ---------------- 4. MID TICKET ----------------
story += chapter("4", "Mid Ticket — The Restoration Program",
                 "The done-for-you service. This is the existing $120/month plan, restructured "
                 "so the billing and the disclosure both sit where they belong.")

story.append(tier_header("Mid", "The Restoration Program", "$152.60 / mo"))

story += F("Delivery method",
           "Done-for-you service plus client portal and monthly reporting. Disputes drafted and "
           "submitted by Arise Credit Pro; client gets a monitoring dashboard, a monthly "
           "progress report, and standing access to the Financial Literacy Academy (Skool) for "
           "the life of the engagement. No calls required, but a monthly 15-minute check-in is "
           "available.")

story += F("Tagline / one-liner")
story.append(P("I work your file every month, and you only pay for the month I worked.", "quote"))
story.append(P("<i>Secondary:</i> Done-for-you disputes, a clear monthly report, and an "
               "education you keep — billed after the work, never before.", "body"))

story += F("Structure / what’s included")
story.append(data_table(
    ["WHEN", "WHAT HAPPENS"],
    [["Month 1",
      "Full tri-bureau report pull and line-by-line audit. Every item classified: verifiable, "
      "unverifiable, inaccurate, or accurate-and-staying. You get a written map of your file. "
      "First dispute round drafted and submitted."],
     ["Every month after",
      "New dispute round based on what came back. Bureau responses reviewed and explained. "
      "Report updated. You see exactly what moved and what didn’t."],
     ["Throughout",
      "Financial Literacy Academy access — utilization mechanics, how the scoring models "
      "actually weight things, how to not re-break the file, what lenders look at beyond the "
      "score."],
     ["Ongoing",
      "Up to 30 dispute items per cycle across all three bureaus. Professional letters, "
      "submissions and follow-up handled for you."],
     ["Billing",
      "$152.60/month, charged at the <b>end</b> of each service month, after that month’s "
      "work is performed. Cancel any time, no contract, no termination fee."],
     ["Not included",
      "Rent/mortgage tradeline reporting, LLC structuring, funding access. Those live in the "
      "Capital Architecture Program."]],
    [1.3 * inch, W - 1.3 * inch], bold_col=0))

story += F("Key benefits")
story.append(numbered([
    "<b>You stop guessing what’s on your file.</b> Most people have never had anyone read "
    "their credit report to them. You get a plain-English audit of every line — including "
    "which items are accurate and are going to stay, so you stop paying someone to chase them.",
    "<b>The work happens whether or not you have time.</b> Letters, submissions, bureau "
    "follow-up, response review — handled. You’re not learning a system; you’re "
    "hiring one.",
    "<b>You keep the education after you leave.</b> The Academy isn’t a bonus, it’s "
    "the exit plan. The goal is that you don’t need a credit repair company again.",
]))

story.append(Spacer(1, 4))
story += F("Features")
story.append(features([
    ("Tri-bureau file audit, every item classified in writing", "$150 one-time"),
    ("Monthly dispute rounds, up to 30 items, all three bureaus, drafted and submitted for you",
     "$100 / mo"),
    ("Credit monitoring, daily tri-bureau updates (IdentityIQ) — pass-through, not marked up",
     "$32.60 / mo"),
    ("Financial Literacy Academy (Skool) — ongoing", "$29 / mo"),
], "$311 first month · $161.60/mo after"))

story.append(Spacer(1, 10))
story.append(warn("DO NOT INFLATE THE STACK", [
    P("A $311 stack against a $152.60 price is a <b>credible</b> 2x. A “$2,000 value” "
      "against $152.60 reads like every other credit repair funnel and it undercuts the one "
      "thing that makes this business different. Keep it honest and let the math be modest.",
      "panel"),
]))

story.append(PageBreak())

story += F("Price · $152.60 / month, all-in, billed in arrears")
story.append(data_table(
    ["COMPONENT", "AMOUNT", "BILLED BY"],
    [["Arise Credit Pro service fee", "$120.00", "Arise Credit Pro, at month end"],
     ["IdentityIQ credit monitoring — <b>required</b>", "$32.60", "IdentityIQ, directly"],
     ["<b>Total monthly cost to the client</b>", "<b>$152.60</b>", ""]],
    [W - 2.9 * inch, 0.9 * inch, 2.0 * inch]))
story.append(Spacer(1, 8))
story.append(P("<b>Show the $152.60 number first, then break it down.</b> Do not advertise $120 "
               "and reveal $32.60 on the thank-you page. That is the single biggest fix in this "
               "tier.", "body"))

story += F("Payment options")
story.append(bullets([
    "Month-to-month only. Charged at the close of each service month.",
    "No setup fee. No advance payment. No contract term. Cancel any time before the next cycle "
    "and nothing further is owed.",
    "IdentityIQ is billed separately by IdentityIQ — 7-day free trial, then $32.60/month, "
    "cancelled directly with them.",
]))

story.append(Spacer(1, 4))
story.append(warn("RETIRE THE PREPAID PACKAGES AT THIS TIER", [
    P("The current <b>$350 for 3 months</b> and <b>$600 for 6 months</b> options collect "
      "payment for months 2–6 before months 2–6 have been worked. That is the exact "
      "structure the Credit Repair Organizations Act’s advance-fee provision exists to "
      "prohibit, and it is the most-enforced provision in that law.", "panel"),
    Spacer(1, 5),
    P("If a multi-month commitment is wanted, structure it as a <b>discounted monthly rate</b> "
      "for clients who stay — still billed monthly, still after the work. Same revenue, "
      "no exposure.", "panel"),
]))

story += F("Price rationale",
           "Credit repair in this market runs $89–$149/month plus a $99–$199 "
           "“setup” or “first work” fee, and almost all of it is prepaid. At "
           "$152.60 all-in with no setup fee and nothing collected in advance, a client who "
           "stays six months pays $915.60 — versus roughly $1,000–$1,100 at a "
           "competitor who charged them before doing anything.")
story.append(P("The price is also deliberately not the cheapest. The cheap end of this industry "
               "is cheap because it sends identical letters to everyone and bills the card until "
               "someone cancels. What is priced in here is the audit, the monthly judgment call "
               "about what to dispute next, the honest conversation about what is not coming "
               "off, and an education that makes the service temporary.", "body"))

story += F("Guarantee",
           "<b>The Work Guarantee.</b> Every month you are billed, you get a dispute round "
           "submitted and a written report. If a month passes and the work wasn’t done, "
           "that month is free — automatically, without having to ask.")
story.append(P("And the standing one: <b>you can leave any time.</b> Never locked in, never "
               "prepaid, never charged for a month that wasn’t worked.", "body"))

story.append(Spacer(1, 4))
story.append(warn("WHAT MUST NOT BE GUARANTEED", [
    P("No money-back guarantee tied to score movement, item removal, or a timeline. Nobody "
      "controls what a bureau or furnisher does with a dispute, and <b>accurate negative "
      "information cannot be legally removed at all</b>. A results guarantee also walks "
      "straight into CROA’s misrepresentation provisions.", "panel"),
    Spacer(1, 5),
    P("The process guarantee is the stronger one anyway, because it is the only guarantee in "
      "this industry that is actually true — and that can be said out loud.", "panel"),
]))

story += F("Urgency / scarcity",
           "Real, not manufactured: <b>capacity</b>. Every active file gets a monthly audit and "
           "a judgment call about the next round, and that is finite. Pick the number that can "
           "genuinely be served — say 25 active files — publish it, and when full, say "
           "so and open a waitlist.")
story.append(P("“I keep 25 active files at a time because every one gets read by me each "
               "month. When I’m at 25, you go on the waitlist. I’d rather tell you to "
               "wait than take your money and send you a template.”", "quote"))
story.append(P("<b>What not to use:</b> countdown timers, “price goes up Friday,” or "
               "“3 spots left” when it isn’t true. With no setup fee and no "
               "prepay, every reason to rush has already been removed. Fake urgency on a "
               "month-to-month cancel-anytime offer makes no sense, and it is the one note that "
               "would sound false in an otherwise straight pitch.", "body"))

story.append(PageBreak())

# ---------------- 5. HIGH TICKET ----------------
story += chapter("5", "High Ticket — The Capital Architecture Program",
                 "Twelve weeks of done-with-you consulting. Built from Game Map Levels 2–7 "
                 "and the unbundled pieces of the old $1,500 package — with the three "
                 "parts that could not stay removed.")

story.append(tier_header("High", "The Capital Architecture Program", "$2,997"))

story += F("Delivery method",
           "12-week done-with-you consulting engagement. Four phases, each with a working "
           "session and a deliverable the client keeps. Private workspace for documents, "
           "Financial Literacy Academy included, direct access between sessions. Delivered "
           "remotely.")

story += F("Tagline / one-liner")
story.append(P("Build the structure first. The money follows the structure.", "quote"))
story.append(P("<i>Secondary:</i> Twelve weeks to a business entity, a business credit profile, "
               "and a lender-ready file — built with you, not sold to you.", "body"))

story += F("Structure — four phases, twelve weeks")
story.append(KeepTogether(data_table(
    ["PHASE", "WEEKS", "WHAT HAPPENS", "DELIVERABLE"],
    [["1 — The Audit &amp; Blueprint", "1–2",
      "Full review of where the client actually stands: personal file, business entity status "
      "(or lack of one), revenue documentation, banking, existing debt. The sequence is built "
      "for <i>their</i> situation, not the generic one.",
      "Written Capital Architecture Blueprint — the 12-week sequence and what each step "
      "requires"],
     ["2 — The Entity Build", "3–5",
      "Entity formation done with them, start to finish: state filing, EIN, registered agent, "
      "operating agreement template, business bank account, business address and phone, the "
      "compliance basics people skip.",
      "A live, properly documented business entity with clean separation from the owner "
      "personally"],
     ["3 — Capital Readiness", "6–10",
      "The business credit profile built in order: D&amp;B, Experian Business and Equifax "
      "Business listings, net-30 vendor tier, tier progression, and the documentation package "
      "lenders and underwriters ask for. Plus how underwriting actually reads a file.",
      "Lender-Ready File — a complete, organized package that can be submitted anywhere"],
     ["4 — The Long Game", "11–12",
      "How business owners use permanent life insurance as a capital tool, what it does and "
      "doesn’t do, where the real costs are, and how it fits next to the entity just "
      "built. Plus what belongs in front of an estate attorney and a CPA, and what to ask them.",
      "Professional Handoff Brief — the questions and documents to take to an attorney and "
      "CPA"]],
    [1.25 * inch, 0.72 * inch, W - 3.87 * inch, 1.9 * inch], bold_col=0)))
story.append(Spacer(1, 8))
story.append(P("<b>Included throughout:</b> Financial Literacy Academy access, document "
               "templates, and direct messaging access for the full twelve weeks.", "body"))

story += F("Key benefits")
story.append(numbered([
    "<b>You stop building in the wrong order.</b> Almost everyone tries to get funding before "
    "they have an entity, or an entity before they have a clean file. The sequence is the "
    "product — doing step four before step two is why most people get declined and never "
    "find out why.",
    "<b>You end with an actual asset, not a folder of advice.</b> A documented entity and an "
    "organized lender-ready file exist whether or not the client ever works with you again. "
    "They are theirs.",
    "<b>You learn what the professionals around you are for.</b> By week twelve the client knows "
    "which questions go to an attorney, which go to a CPA, which go to a licensed insurance "
    "agent, and which they can answer themselves. That is most of what separates owners who get "
    "built from owners who get sold to.",
]))

story.append(PageBreak())

story += F("Features")
story.append(features([
    ("Entity formation done-with-you: filing, EIN, operating agreement, banking, compliance basics",
     "$800"),
    ("Business credit profile build: bureau listings, vendor tiers, tier progression", "$1,200"),
    ("Lender-Ready File — the complete documentation package, organized", "$600"),
    ("Four working sessions, twelve weeks of direct access, Academy included", "$900"),
], "$3,500"))
story.append(Spacer(1, 8))
story.append(P("Same note as the mid tier, and it matters more here: a $3,500 stack against "
               "$2,997 is a believable 1.2x, and at this price point believable beats "
               "impressive. Every “$25,000 value, yours for $2,997” page in this "
               "industry is run by someone selling a PDF. Don’t stand next to them.", "body"))

story += F("Price · $2,997, in four milestone payments of $749.25",
           "Each payment is charged when that phase’s deliverable is in the client’s "
           "hands. Not a deposit and a drip — Phase 2 is paid after Phase 1’s "
           "Blueprint is delivered, and so on. A client who stops after Phase 2 has paid for "
           "Phases 1 and 2 and keeps the entity.")
story.append(P("<b>State filing fees, registered agent and bank minimums are paid by the client "
               "directly to those providers and are not included.</b> Put the dollar range on "
               "the page. People who find out at week three never recover their trust in the "
               "engagement.", "body"))

story += F("Payment options")
story.append(bullets([
    "<b>4 × $749.25</b>, billed at each phase completion. This is the default — lead "
    "with it.",
    "<b>$2,997 paid in full at enrollment — 5% off ($2,847)</b> for people who want it "
    "handled in one transaction.",
    "No long-term contract. Stop between phases and nothing further is charged.",
]))

story.append(Spacer(1, 4))
story.append(note("WHY MILESTONE BILLING AND NOT A 3-MONTH PAYMENT PLAN", [
    P("Three things sit under this offer that make prepayment a bad idea. Collecting money "
      "before the work is the structure regulators look at hardest in this industry. A "
      "phase-gated program is also <b>easier to sell</b>, because the buyer’s risk at any "
      "moment is $749, not $2,997. And if someone drops after Phase 2, you have been paid for "
      "what you did and you keep a clean record. You give up nothing but the float.", "panel"),
]))

story += F("Price rationale",
           "A business attorney charges $350–$600/hour and will form the entity but not "
           "build the credit profile. A business credit consultant charges $1,500–$3,000 "
           "and won’t touch the entity or the documentation. A CPA will structure the books "
           "and won’t do either. Buying these separately runs $3,000–$5,000 and leaves "
           "the client to be the project manager connecting them — which is the job they "
           "were trying to hire out. $2,997 buys the sequence, twelve weeks of someone running "
           "it, and two deliverables that outlive the engagement.")

story += F("Guarantee",
           "<b>The Deliverable Guarantee.</b> Every phase has a named, written deliverable. If a "
           "phase closes without it, that phase isn’t paid for. If 7Band is the reason a "
           "phase is late, the next one is free.")
story.append(P("<b>The Phase-One Guarantee.</b> If the Blueprint in Phase 1 doesn’t give "
               "the client a clearer picture of their own situation than they had going in, the "
               "$749.25 comes back. That is the one phase whose value is entirely professional "
               "judgment, so it is the one worth putting in writing.", "body"))

story.append(Spacer(1, 4))
story.append(warn("WHAT GOES NOWHERE NEAR THIS PAGE", [
    P("No guarantee of funding, approval, credit limit, lender, or dollar amount. Not "
      "“$50K in business credit.” Not “funding guaranteed.” And "
      "specifically <b>not</b> the <b>“Access to American Express — "
      "Guaranteed”</b> line from the Miro deck — that one has to come out before any "
      "version of this offer is shown to anybody.", "panel"),
    Spacer(1, 5),
    P("No one can promise an underwriting outcome, and promising funding in exchange for an "
      "upfront fee is the exact pattern the FTC’s advance-fee rules and most state "
      "loan-broker statutes were written for. The deliverable is a lender-ready file. What a "
      "lender does with it is a lender’s decision — and saying so plainly is a "
      "selling point with anyone who has been burned before, which is most of this market.",
      "panel"),
]))

story += F("Urgency / scarcity",
           "<b>Cohorts of six, quarterly.</b> Twelve weeks of phase-gated work with four live "
           "sessions and open messaging access is genuinely capacity-limited, and a cohort gives "
           "a real enrollment window instead of a fake one.")
story.append(P("“Six seats a quarter. Twelve weeks each, and I’m in the room for all "
               "of it. When the six are gone the next window is [month].”", "quote"))
story.append(P("The deadline is true, the limit is true, and the reason is obvious to the "
               "buyer. Nothing else is needed here.", "body"))

story.append(PageBreak())

story += chapter("5B", "What Was Removed From the Old $1,500 Package",
                 "The Miro offer was never promoted, which is lucky — four things in it "
                 "had to come out, and three of them are structural rather than cosmetic.")

story.append(data_table(
    ["WHAT WAS IN IT", "WHY IT CAME OUT", "WHAT REPLACED IT"],
    [["“Access to American Express — Guaranteed”",
      "No one can guarantee an underwriting decision. An upfront fee attached to a promise of "
      "credit access is the advance-fee pattern.",
      "Phase 3 delivers a lender-ready file. Outcomes are never promised."],
     ["Holding client premium funds — $750 plus $62.50/month",
      "Taking premium money into a business account raises trust-fund and commingling exposure "
      "that no marketing upside justifies.",
      "Premiums go from the client to the carrier directly, always. 7Band never holds them."],
     ["A consulting fee stacked on top of the commission earned from the same client",
      "Being paid twice for one relationship is the thing Chapter 10 of the book tells readers "
      "to look out for.",
      "The $2,997 is consulting only. The insurance conversation is free and carrier-paid."],
     ["A succession and estate “blueprint”",
      "Delivering an estate structure reads as legal and tax advice, which requires a licence "
      "this business does not hold.",
      "Phase 4 produces a Professional Handoff Brief — the questions to take to an "
      "attorney and a CPA."]],
    [1.75 * inch, (W - 1.75 * inch) / 2, (W - 1.75 * inch) / 2], bold_col=0))

story.append(Spacer(1, 14))
story.append(good("WHAT THE UNBUNDLING ACTUALLY BOUGHT", [
    P("The $1,500 package was one transaction that mixed consulting, insurance compensation and "
      "client premium funds together. The ladder replaces it with four clean transactions and "
      "one free conversation — and it earns more, because $27 and $67 buyers who never "
      "would have bought a $1,500 package now enter the ecosystem at the top of the funnel "
      "instead of never appearing at all.", "panel"),
]))

story.append(PageBreak())

# ---------------- 6. THE INSURANCE CONVERSATION ----------------
story += chapter("6", "The Insurance Conversation — Free",
                 "It sits outside the ladder on purpose. It is not a tier, it is not an upsell, "
                 "and it is never a condition of anything above it.")

story.append(box("WHY IT IS FREE", [
    P("The carrier already pays for this conversation. Charging the client as well would mean "
      "being paid twice for one relationship — and the book’s whole argument is that "
      "a reader cannot evaluate advice without knowing how the person giving it is compensated. "
      "Free, with the commission disclosed out loud, is the only version of this that stays "
      "consistent with the brand.", "panel"),
], bar=GOLD, bg=ALERT_BG))

story.append(Spacer(1, 14))
story.append(P("The three rules", "h2"))
story.append(numbered([
    "<b>No part of any 7Band fee ever goes toward a policy.</b> Consulting money is consulting "
    "money. Premium is premium.",
    "<b>7Band never holds, forwards or handles premium funds.</b> The client pays the carrier "
    "directly, every time, with no exception worth making.",
    "<b>Buying a policy is never required to complete any program.</b> This is the line that "
    "removes the tying problem entirely — say it in writing on the high-ticket page.",
]))

story.append(Spacer(1, 10))
story.append(P("The sentence to say out loud", "h2"))
story.append(P("“Everything I charge for is education and preparation. The policy itself "
               "costs you nothing extra — the carrier pays me, and I’ll tell you "
               "exactly how much and why the design I recommend pays me less.”", "quote"))
story.append(P("That last clause is the whole brand in nine words. A design that pays the agent "
               "less is usually the design that serves the client better, and almost nobody in "
               "this market will say so on the record. Said plainly, it does more selling than "
               "any scarcity mechanic in this document.", "body"))

story.append(PageBreak())

# ---------------- 7. DISCLOSURE LIBRARY ----------------
story += chapter("7", "Disclosure Copy Library",
                 "Ready to paste. Each block goes above the buy button on its tier — not "
                 "in a footer, not on the thank-you page, not behind a link.")

story.append(P("Mid tier — above the checkout button", "h2"))
story.append(box(None, [
    P("<b>Total monthly cost: $152.60.</b> That’s $120.00 to Arise Credit Pro for dispute "
      "work, plus $32.60 to IdentityIQ for credit monitoring. Monitoring is <b>required</b> "
      "— we can’t work your file without live tri-bureau access. IdentityIQ bills you "
      "directly (7-day free trial, then $32.60/month) and <b>we earn a commission when you "
      "enroll.</b> You can cancel either one at any time.", "disc"),
    P("You are charged by Arise Credit Pro at the <b>end</b> of each service month, after that "
      "month’s work is performed. No setup fee, no prepayment, no contract.", "disc"),
    P("We cannot and do not promise any specific score increase, outcome, or timeline. Accurate "
      "negative information cannot be legally removed from your credit report, and any company "
      "that tells you otherwise is lying to you. What we promise is that your file gets read, "
      "disputed, and reported on every month you pay for.", "disc"),
], bar=GOLD))
story.append(Spacer(1, 8))
story.append(P("That last paragraph is a competitive advantage printed as a legal disclosure. "
               "Most of this industry buries it. Lead with it.", "body"))

story.append(Spacer(1, 16))
story.append(P("High tier — four blocks, all above the first payment", "h2"))

story.append(box("WHAT THIS PROGRAM IS AND ISN’T", [
    P("This is business consulting and education. I am not an attorney, a CPA, or a financial "
      "advisor, and nothing here is legal, tax, or investment advice. Entity structure, trusts, "
      "estate planning, and tax treatment get handed to your attorney and CPA — Phase 4 "
      "prepares you for those conversations and tells you what to ask.", "disc"),
], bar=GOLD))
story.append(Spacer(1, 9))
story.append(box("ON INSURANCE", [
    P("I’m a licensed life insurance agent (NPN 19744094). If a policy is right for you, "
      "the carrier pays me a commission and I’ll tell you what it is and why I recommend "
      "the design I recommend. <b>Buying a policy is not part of this program and is not "
      "required to complete it.</b> Your $2,997 covers consulting only — none of it goes "
      "toward a policy, and I never hold or handle premium money. Premiums go from you to the "
      "carrier, directly, always.", "disc"),
], bar=GOLD))
story.append(Spacer(1, 9))
story.append(box("ON FUNDING", [
    P("This program prepares your business to apply for capital. It does not promise, broker, "
      "arrange, or guarantee funding, credit limits, approval, or any specific lender. Approval "
      "decisions belong to lenders and underwriters, and I have no control over them.", "disc"),
], bar=GOLD))
story.append(Spacer(1, 9))
story.append(box("ON CREDIT", [
    P("Phase 3 builds a <b>business</b> credit profile for your entity. Personal credit "
      "restoration is a separate service with its own terms — it is not part of this "
      "program.", "disc"),
], bar=GOLD))
story.append(Spacer(1, 10))
story.append(note("THAT LAST LINE IS DOING QUIET LEGAL WORK", [
    P("Keeping personal dispute work out of the high tier is what prevents a $2,997 "
      "consulting engagement from being argued as a credit repair service collecting an advance "
      "fee. Mid tier handles personal files, billed monthly in arrears. High tier handles the "
      "business. Do not let them blur on the sales page.", "panel"),
]))

story.append(PageBreak())

story.append(P("Low tier and OTO — one line each", "h2"))
story.append(box(None, [
    P("This is an educational guide. It is not credit repair, and no outcome, score change, or "
      "timeline is promised. You can pull all three of your credit reports free at "
      "annualcreditreport.com — that’s federal law. No monitoring subscription is "
      "required to use this guide.", "disc"),
], bar=GOLD))

story.append(Spacer(1, 16))
story.append(P("Where each disclosure has to appear", "h2"))
story.append(data_table(
    ["TIER", "PLACEMENT", "CURRENT STATE"],
    [["$27 guide", "Product page, above the buy button", "To be added"],
     ["$67 OTO", "OTO page, above the buy button", "To be added"],
     ["Mid — service", "Pricing page <b>and</b> checkout, above the button",
      "<b>Currently on the thank-you page — must move upstream</b>"],
     ["High — consulting", "Sales page, above the first payment", "Offer not yet published"],
     ["Insurance", "Spoken at the start of every policy conversation, and in writing before "
      "any application", "To be confirmed"]],
    [1.3 * inch, 2.5 * inch, W - 3.8 * inch], bold_col=0))

story.append(Spacer(1, 14))
story.append(warn("THE ONE ITEM THAT IS LIVE AND WRONG TODAY", [
    P("Right now a client pays, <i>then</i> learns on the thank-you page that they also need a "
      "$32.60/month subscription to receive what they bought. A required recurring cost of "
      "getting the service has to be disclosed <b>before</b> payment, and the free-trial-then-"
      "auto-bill structure is a negative option with its own disclosure rules. The commission "
      "is a material connection and belongs at the point of recommendation.", "panel"),
    Spacer(1, 5),
    P("Nothing about this is exotic. It just needs to move upstream of checkout, and it is a "
      "small edit to the Arise pricing page.", "panel"),
]))

story.append(PageBreak())

# ---------------- 8. OPEN ITEMS ----------------
story += chapter("8", "Open Items — Professional Review Required",
                 "None of what follows is legal advice, and none of it is resolved. Each item "
                 "names who resolves it. Marketing volume multiplies whatever the underlying "
                 "exposure is, so these come before the funnel, not after it.")

story.append(data_table(
    ["#", "ITEM", "WHO RESOLVES IT", "STATUS"],
    [["1", "The $350 / 3-month and $600 / 6-month prepaid packages collect payment before the "
      "work is performed — CROA advance-fee exposure.",
      "Consumer-finance attorney", "<b>Open</b>"],
     ["2", "CROA also requires a written contract with specific disclosures, the "
      "“Consumer Credit File Rights” statement, and a three-day right to cancel. "
      "Confirm the checkout flow delivers all of it.",
      "Consumer-finance attorney", "<b>Open</b>"],
     ["3", "IdentityIQ total-cost and commission disclosure currently appears after payment, "
      "on the thank-you page. Copy is written (Section 7); the page edit is pending.",
      "7Band — site edit", "<b>Open</b>"],
     ["4", "State loan-broker / finance-broker licensing. Phase 3 as written is education and "
      "document preparation, which is generally fine — but submitting applications on a "
      "client’s behalf or matching them to specific lenders for a fee may cross a "
      "licensing line, and the rules vary by state.",
      "Business attorney in your state", "<b>Open</b>"],
     ["5", "Carrier advertising review for Phase 4 and for any page referencing permanent life "
      "insurance. The “capital tool” framing is exactly what compliance departments "
      "want to see first.",
      "Carrier compliance", "<b>Open</b>"],
     ["6", "Game Map level copy on the 7Band Financial site still contradicts the book: "
      "“tax-free … no estate tax exposure,” “untouchable by creditors and "
      "lawsuits,” “compound uninterrupted,” and a Level 3→4 path that "
      "directs people to borrow from credit lines to fund insurance premiums.",
      "7Band — copy rewrite", "<b>Open</b>"],
     ["7", "“Up to 30 Dispute Items” and “AI Dispute Automation System” "
      "— volume-based automated disputing draws regulatory attention. Worth knowing where "
      "it sits before scaling it.",
      "Consumer-finance attorney", "<b>Open</b>"]],
    [0.33 * inch, W - 3.18 * inch, 1.95 * inch, 0.9 * inch]))

story.append(Spacer(1, 16))
story.append(P("Item 6 is the one to do first", "h2"))
story.append(P("It costs nothing, needs no professional, and it is the only item on this list "
               "that a potential client can read today. A 72-page book arguing that this "
               "industry hides its mechanics, sitting one click from a Game Map that makes four "
               "claims the book itself disputes, is the single most quotable inconsistency in "
               "the ecosystem. Rewriting that copy to the book’s own standard is an "
               "afternoon of work.", "body"))

story.append(Spacer(1, 18))
close = Table([[[P("How to use this document", "panel_head_w"), Spacer(1, 4),
                 P("The worksheet fields in Sections 2–5 are written to be pasted straight "
                   "into a sales page, a funnel builder, or a webinar script — the prose is "
                   "final, not notes. Section 7 is the copy that has to appear beside each buy "
                   "button. Section 8 is the list that has to shrink before marketing volume "
                   "goes into any of it.", "panel_w"), Spacer(1, 8),
                 P("Nothing here is legal, tax or compliance advice. The regulatory concerns "
                   "named throughout are flagged so a qualified professional can rule on them, "
                   "not resolved.", "panel_w")]]], colWidths=[W])
close.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, -1), NAVY),
    ("LEFTPADDING", (0, 0), (-1, -1), 16), ("RIGHTPADDING", (0, 0), (-1, -1), 16),
    ("TOPPADDING", (0, 0), (-1, -1), 14), ("BOTTOMPADDING", (0, 0), (-1, -1), 14),
]))
story.append(close)

doc.build(story)
print("built:", OUT)
