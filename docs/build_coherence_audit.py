#!/usr/bin/env python3
"""Build the Sales-tree coherence audit as a branded PDF."""

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

OUT = "/home/user/7band-financial/docs/Sales-Tree-Coherence-Audit.pdf"
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
                        "7BAND — INTERNAL AUDIT")
    c.restoreState()


def draw_page(c, d):
    c.saveState()
    c.setStrokeColor(RULE); c.setLineWidth(0.5)
    c.line(MARGIN, PAGE_H - 0.72 * inch, PAGE_W - MARGIN, PAGE_H - 0.72 * inch)
    c.setFont("Helvetica", 8); c.setFillColor(GREY)
    c.drawString(MARGIN, PAGE_H - 0.64 * inch, "SALES TREE — COHERENCE AUDIT")
    c.drawRightString(PAGE_W - MARGIN, PAGE_H - 0.64 * inch, "October 2026")
    c.line(MARGIN, 0.68 * inch, PAGE_W - MARGIN, 0.68 * inch)
    c.setFont("Helvetica", 8); c.setFillColor(GREY)
    c.drawString(MARGIN, 0.5 * inch, "7Band Financial Agency")
    c.setFillColor(GOLD); c.setFont("Helvetica-Bold", 9)
    c.drawRightString(PAGE_W - MARGIN, 0.5 * inch, str(c.getPageNumber() - 1))
    c.restoreState()


doc = BaseDocTemplate(
    OUT, pagesize=letter, leftMargin=MARGIN, rightMargin=MARGIN,
    topMargin=1.0 * inch, bottomMargin=0.95 * inch,
    title="7Band Sales Tree — Coherence Audit",
    author="7Band Financial Agency",
    subject="Do the four sales sites tell the same story as The Flow?",
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


S["tag_fix"] = style("tf", fontName="Helvetica-Bold", fontSize=8.4, leading=11, textColor=DANGER)
S["tag_pre"] = style("tp", fontName="Helvetica-Bold", fontSize=8.4, leading=11, textColor=GOLD)
S["tag_ok"] = style("to", fontName="Helvetica-Bold", fontSize=8.4, leading=11, textColor=colors.HexColor("#2E7D4F"))


def issues(rows):
    """rows: (tag, what, fix). tag in FIX NOW / BEFORE GHL / POLISH / ALIGNED."""
    st = {"FIX NOW": "tag_fix", "BEFORE GHL": "tag_pre", "POLISH": "tag_pre", "ALIGNED": "tag_ok"}
    data = [[Paragraph(h, S["cell_head"]) for h in ("", "What the site says or does", "Fix")]]
    for tag, what, fix in rows:
        data.append([Paragraph(tag, S[st[tag]]), Paragraph(what, S["cell"]), Paragraph(fix, S["cell"])])
    t = Table(data, colWidths=[0.95 * inch, 3.15 * inch, 2.6 * inch], repeatRows=1)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, PANEL]),
        ("GRID", (0, 0), (-1, -1), 0.4, RULE), ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 7), ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    return t


# ---------------- COVER ----------------
story.append(Spacer(1, 0.55 * inch))
story.append(Image(LOGO, width=1.5 * inch, height=1.5 * inch, hAlign="CENTER"))
story.append(Spacer(1, 0.3 * inch))
story.append(P("The Sales Tree<br/>Coherence Audit", "cover_title"))
gl = Table([[""]], colWidths=[2.0 * inch], rowHeights=[2]); gl.hAlign = "CENTER"
gl.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), GOLD)]))
story.append(gl)
story.append(Spacer(1, 0.2 * inch))
story.append(P("Four sites, one story. What each site says today, measured against<br/>"
               "The Flow webinar and the Offer Architecture.", "cover_sub"))
story.append(Spacer(1, 0.36 * inch))
facts = Table([
    [Paragraph("THE FLOW", S["cell_head"]), Paragraph("theflow.7bandfinancialagency.com", S["cell"])],
    [Paragraph("THE HUB", S["cell_head"]), Paragraph("www.7bandfinancialagency.com", S["cell"])],
    [Paragraph("LEVEL 1", S["cell_head"]), Paragraph("www.arisecreditpro.com", S["cell"])],
    [Paragraph("LEVELS 2–3", S["cell_head"]), Paragraph("www.eastconsultingllc.com", S["cell"])],
    [Paragraph("SCANNED", S["cell_head"]), Paragraph("Latest main branch of each repository, 3 October 2026", S["cell"])],
    [Paragraph("OUT OF SCOPE", S["cell_head"]), Paragraph("7Band Inc. and Smart Beauty (the separate mission side)", S["cell"])],
], colWidths=[1.5 * inch, 3.6 * inch])
facts.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (0, -1), NAVY), ("BACKGROUND", (1, 0), (1, -1), PANEL),
    ("GRID", (0, 0), (-1, -1), 0.4, RULE), ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ("LEFTPADDING", (0, 0), (-1, -1), 9),
    ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
]))
facts.hAlign = "CENTER"
story.append(facts)
story.append(NextPageTemplate("Body"))
story.append(PageBreak())

# ---------------- 1. SUMMARY ----------------
story += chapter("1", "The Short Version",
                 "The Flow site now tells the story well. The other three were written "
                 "before the webinar existed, and it shows: Arise sells a different deal than "
                 "the one the webinar offers, the hub makes the insurance promises the webinar "
                 "was rebuilt to avoid, and East Consulting doesn't link to anything else in "
                 "the family.")
story.append(box("FOUR THINGS TO FIX BEFORE GOHIGHLEVEL", [
    P("<b>1. Nobody can register for the webinar.</b> The code was fixed to send signups to "
      "GoHighLevel and show an error if it can't. But the build never receives the GoHighLevel "
      "address, so on the live site every registration shows an error. This is the front door. "
      "Section 3.", "panel"),
    Spacer(1, 6),
    P("<b>2. Arise sells a different deal from the one the webinar offers.</b> The webinar says "
      "nothing is charged today, you are billed at month end, and IdentityIQ is $32.60 a month, "
      "billed separately. Arise's store charges $120 at checkout, still sells the $350 and $600 "
      "prepaid packages, and lists monitoring as included. A viewer who clicks through finds "
      "different terms from the ones they were just promised.", "panel"),
    Spacer(1, 6),
    P("<b>3. The hub contradicts the webinar on insurance.</b> \"Guaranteed to grow\", \"you never "
      "lose principal\", \"passes tax-free\", \"no lawsuit, no creditor can reach\", and a Game Map "
      "that funds Level 4 with Level 3 credit lines. The webinar teaches the costs, the loans "
      "and the MEC trap; the agency's own site says the opposite. It was the \"do first\" item in "
      "the Offer Architecture.", "panel"),
    Spacer(1, 6),
    P("<b>4. The names don't match.</b> The seven levels go by two sets of names. \"The Flow\" means "
      "the webinar, Malik (\"known as TheFlow\") and a Skool group called The Real Ethical "
      "Agents. Arise and East Consulting each describe their own journey, with no link back to "
      "the map.", "panel"),
], bg=DANGER_BG, bar=DANGER, head="panel_head_d"))
story.append(Spacer(1, 10))
story.append(P(
    "<b>What is already consistent:</b> Malik's facts (licensed since 2020, B.S. Alcorn State) "
    "match everywhere. The webinar site's copy matches the deck. East Consulting's content is a "
    "clean fit for Levels 2–3. And every site now runs on GitHub, so each fix is a small, "
    "reviewable change."))

story.append(PageBreak())

# ---------------- 2. THE ONE STORY ----------------
story += chapter("2", "The One Story",
                 "The source of truth is The Flow deck and the Offer Architecture. Every site "
                 "should match this table. Where a row says DECIDE, Malik picks once and every "
                 "site follows.")
story.append(data_table(
    ["Element", "Canonical version"],
    [["The webinar", "<b>THE FLOW</b> — tagline \"The Generational Wealth Quest\". Free, every "
      "Saturday, 10:30 AM CT (as the webinar site now says; confirm)."],
     ["The map", "Level 0 / the Tutorial. <b>The Foundation:</b> 1 The Credit Shield · 2 The "
      "Business Firewall · 3 Capital Readiness. <b>The Acceleration:</b> 4 The Engine. "
      "<b>The Legacy:</b> 5 The Fortress · 6 The Transfer · 7 The Generational Tree."],
     ["Who owns each level", "Level 1 → <b>Arise Credit Pro</b>. Levels 2–3 → <b>East Consulting "
      "LLC</b>. Level 4 → <b>7Band Financial Agency</b> (licensed). Levels 5–7 → education; trusts "
      "drafted by an attorney; beneficiaries through the agency."],
     ["The offers", "$27 Fix Your File · $67 The Dispute Engine · <b>The Restoration Program</b>: "
      "$120/mo to Arise, billed at month end after the work, plus $32.60/mo IdentityIQ billed "
      "by IdentityIQ = $152.60 · <b>Capital Architecture Program</b> $2,997, by booked call."],
     ["DECIDE: who sells the $2,997", "It is Levels 2–3 consulting, so East Consulting LLC is "
      "the natural home, and it keeps that program outside the credit-repair rules that cover "
      "Arise. Confirm with an attorney."],
     ["DECIDE: one booking calendar", "Three exist: the hub's GoHighLevel calendar, East "
      "Consulting's, and Arise's consultation form. The deck's slide 52 (\"Already past Level "
      "1?\") needs one. Each source should still tag the lead."],
     ["DECIDE: what \"The Flow\" means", "Recommended: the webinar and the method, nothing else. "
      "Malik is Malik (or the stage persona you choose); the Skool group keeps its own name."],
     ["Lines every site holds", "No score or timeline promised. Real costs of permanent life "
      "insurance shown. Borrow to build assets, never to cover bills. Commission disclosed. "
      "Nothing that reads as guaranteed growth or guaranteed protection."]],
    [1.6 * inch, 5.1 * inch]))

story.append(PageBreak())

# ---------------- 3. SITE BY SITE ----------------
story += chapter("3", "Site by Site",
                 "FIX NOW: wrong today and costing leads or creating exposure. BEFORE GHL: needed "
                 "for the automation to make sense. POLISH: worth doing, not urgent.")

story.append(P("The Flow — theflow.7bandfinancialagency.com", "h2"))
story.append(issues([
    ("FIX NOW", "Registration posts to " + M("VITE_REGISTRATION_ENDPOINT") + ", but the deploy "
     "workflow never passes it to the build and no env file exists. Every live registration "
     "shows an error.",
     "Create a GoHighLevel inbound webhook. Store it as a repository <b>variable</b> (Settings → "
     "Secrets and variables → Actions) and pass it in the build step's " + M("env") + ". Then "
     "register yourself as a test."),
    ("ALIGNED", "Quest Map, boss cards, takeaways and host bio match the deck. The countdown is "
     "weekly and the stale \"LIVE NOW\" is gone.", "Nothing."),
    ("POLISH", "The footer links to the hub and Arise, not East Consulting.",
     "Add East Consulting (Section 4)."),
]))

story.append(P("7Band Financial Agency — the hub", "h2"))
story.append(issues([
    ("FIX NOW", "Lifetime LOC page: \"guaranteed to grow, guaranteed to be there, and guaranteed to "
     "pass to the next generation\". Lessons 1 and 4 and the LOC page: \"0% floor, you never lose "
     "principal\" (fees and charges can still reduce cash value).",
     "Rewrite to match deck slides 32–34: what it can do, the real costs, loans accrue interest, "
     "lapse risk, MEC. Carrier advertising review."),
    ("FIX NOW", "Home: \"Wealth passes tax-free\", \"no lawsuit, no creditor, no circumstance can "
     "reach what you built\".", "Use the deck's Level 5 wording: what each trust does and doesn't do."),
    ("FIX NOW", "Game Map Level 3 unlocks \"high-limit funding lines\" and \"the capital required to "
     "fund the core engine at Level 4\": borrowing to pay premiums.",
     "Level 3 copy from the deck: borrow to build assets; Level 4 funded from cash flow."),
    ("BEFORE GHL", "Level names: Restore Your Shield · Build Your Base · Gather Resources · Unlock "
     "the Engine · Construct the Fortress · Design the Transfer · The Generational Tree.",
     "Use the canonical names (Section 2)."),
    ("BEFORE GHL", "\"Malik East, known as TheFlow\"; footer \"The Flow — Skool\" links to The Real "
     "Ethical Agents; Event button says \"WealthQuest session\".",
     "One meaning for The Flow. Event button: \"THE FLOW — free, every Saturday\"."),
    ("POLISH", "Ecosystem links: Arise, Skool, 7Band Inc. No East Consulting. The nonprofit is "
     "listed beside the businesses.",
     "The family footer from Section 4. Move 7Band Inc. out, or label it \"a separate charity "
     "Malik founded\"."),
]))

story.append(P("Arise Credit Pro — Level 1", "h2"))
story.append(issues([
    ("FIX NOW", "Store: \"Get Started — $120/mo\" goes straight to an Authorize.net checkout, so "
     "payment is taken before any work. The webinar promises nothing charged today and billing "
     "at month end.",
     "Enrollment collects the agreement and card on file, and charges at month end, as the deck "
     "and the Offer Architecture describe."),
    ("FIX NOW", "$350 / 3 months and $600 / 6 months, paid in advance.",
     "Retire them. Prepaying for credit repair is the CROA advance-fee problem the Offer "
     "Architecture flagged."),
    ("FIX NOW", "\"Credit Monitoring App\" listed as included.",
     "IdentityIQ: $32.60/mo, required, billed by IdentityIQ, commission disclosed before payment."),
    ("FIX NOW", "Stats: \"120 pts Avg Score Increase\" and \"98% Client Satisfaction\".",
     "Remove. The webinar's own guarantee says no score is promised."),
    ("BEFORE GHL", "The $600 tier bundles \"LLC Structure Step by Step\" and \"Business &amp; "
     "Personal Funding Access\".",
     "That is East Consulting's Levels 2–3. Hand off instead of bundling it into a "
     "credit-repair contract."),
    ("BEFORE GHL", "Journey: Free Consultation → Credit Repair → Funding Success → Wealth "
     "Building. \"We connect you with lenders.\"",
     "Show Level 1 of the map, with the next step pointing to East Consulting. Lender matching "
     "raises the broker-licensing question."),
    ("POLISH", "No link to The Flow, the hub or East Consulting.", "The family footer."),
]))

story.append(KeepTogether([P("East Consulting LLC — Levels 2–3", "h2"), issues([
    ("ALIGNED", "Entity formation, EIN, banking, presence, bookkeeping, funding readiness: a "
     "clean fit for the Business Firewall and Capital Readiness. No overclaims found.",
     "Nothing."),
    ("BEFORE GHL", "No mention of The Flow, the map, Malik, Arise or the hub. It is the only "
     "branch with no way back to the tree.",
     "Say which levels it covers, add the family footer, and invite visitors to The Flow."),
    ("BEFORE GHL", "Its own GoHighLevel calendar and chat widget.",
     "Fine to keep, as long as leads are tagged East Consulting in the shared account."),
])]))

story.append(PageBreak())

# ---------------- 4. CONNECTIONS ----------------
story += chapter("4", "How the Sites Should Connect",
                 "Every sales site carries the same small family footer, and each one has a "
                 "single main next step.")
story.append(box("THE FAMILY FOOTER — SAME ON ALL FOUR", [
    P("<b>Part of the 7Band family</b> · THE FLOW — free weekly webinar · 7Band Financial "
      "Agency — life insurance · Arise Credit Pro — credit · East Consulting LLC — business "
      "structure", "panel"),
]))
story.append(Spacer(1, 10))
story.append(data_table(
    ["Site", "Main next step", "Also offers"],
    [["The Flow", "Register for Saturday", "After the webinar: Restoration Program enrollment "
      "(Level 1) or a booked call (Levels 2–7)"],
     ["7Band Financial Agency", "Join THE FLOW", "Book a call about Level 4"],
     ["Arise Credit Pro", "Enroll in the Restoration Program, or the $27 guide",
      "\"Credit already strong? Join THE FLOW\""],
     ["East Consulting", "Book a consultation", "\"See the whole map: join THE FLOW\""]],
    [1.6 * inch, 2.2 * inch, 2.9 * inch]))
story.append(Spacer(1, 10))
story.append(P(
    "The webinar sits in the middle: every site sends people to it, and it sends them on to "
    "the branch that fits. That is also the shape the GoHighLevel automation will take: one "
    "registration list, tagged by where people came from and which level they are at."))

story.append(P("Order of work", "h2"))
story.append(numbered([
    "<b>Webinar registration</b> (Section 3). It needs one GoHighLevel webhook, which makes it "
    "the first GoHighLevel task as well.",
    "<b>Arise checkout and claims.</b> Show the checkout flow and the prepaid packages to a "
    "consumer-finance attorney.",
    "<b>Hub insurance copy.</b> Rewrite from the deck, then carrier review.",
    "<b>Names.</b> One set of level names, one meaning for The Flow, across all four sites.",
    "<b>The family footer and main next steps</b> on all four.",
    "<b>Then GoHighLevel:</b> pipelines and tags built on the map above.",
]))
story.append(Spacer(1, 6))
story.append(P(
    "<b>Note:</b> the Offer Architecture, the webinar script, the deck and the migration briefs "
    "are on the branch " + M("claude/website-github-migration-teom6p") + " of 7band-financial, "
    "not on main. A new chat looking at main will not find them."))

doc.build(story)
print("built:", OUT)
