#!/usr/bin/env python3
"""Build the 7Band Inc. nonprofit-site migration handoff brief as a branded PDF."""

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

OUT = "/home/user/7band-financial/docs/7BandInc-Migration-Brief.pdf"
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
    c.drawString(MARGIN, PAGE_H - 0.64 * inch, "7BAND INC. — MIGRATION BRIEF")
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
    title="7Band Inc. — Migration Handoff Brief",
    author="7Band Financial Agency",
    subject="Moving 7bandinc.org off Manus onto GitHub Pages",
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
story.append(P("7Band Inc.<br/>Migration Brief", "cover_title"))
gl = Table([[""]], colWidths=[2.0 * inch], rowHeights=[2]); gl.hAlign = "CENTER"
gl.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), GOLD)]))
story.append(gl)
story.append(Spacer(1, 0.2 * inch))
story.append(P("Moving the nonprofit's site, 7bandinc.org, off Manus without taking it offline,<br/>"
               "and making its forms and its Donate button actually work.", "cover_sub"))
story.append(Spacer(1, 0.36 * inch))

facts = Table([
    [Paragraph("SITE", S["cell_head"]), Paragraph("www.7bandinc.org (7Band Inc., nonprofit)", S["cell_b"])],
    [Paragraph("LIVES ON", S["cell_head"]), Paragraph("Manus (to be replaced)", S["cell"])],
    [Paragraph("CODE", S["cell_head"]), Paragraph("github.com/eastmalik/7band-inc (public)", S["cell"])],
    [Paragraph("DOMAIN", S["cell_head"]), Paragraph("Hostinger", S["cell"])],
    [Paragraph("STATUS", S["cell_head"]), Paragraph("LIVE — must stay up throughout", S["cell_b"])],
    [Paragraph("FORMS", S["cell_head"]), Paragraph("NONE WORK, including Donate — see Section 2", S["cell_b"])],
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
               "and the Arise Credit Pro migration brief.", "cover_sub"))

story.append(NextPageTemplate("Body"))
story.append(PageBreak())

# ---------------- 1. START HERE ----------------
story += chapter("1", "Start Here",
                 "This is the fifth site to leave Manus. The hosting work follows the Arise "
                 "pattern exactly: a live site, so the new hosting is built and checked before "
                 "any DNS record changes. What makes this one different is what a scan of the "
                 "code found.")

story.append(box("WHAT THE SCAN FOUND", [
    P("<b>1. The Donate button collects no money.</b> It shows \"Thank you for your generosity! "
      "You'll be redirected to our secure payment processor\", and then nothing happens. There "
      "is no payment processor connected anywhere in the code.", "panel"),
    Spacer(1, 6),
    P("<b>2. Every form on the site is fake.</b> Contact, Volunteer, Partners and both "
      "newsletter sign-ups show a success message, or nothing at all, and send the information "
      "nowhere. Anyone who used them has heard nothing back.", "panel"),
    Spacer(1, 6),
    P("<b>3. The site makes claims a charity has to be able to back up.</b> It says 7Band Inc. "
      "is a 501(c)(3), shows \"500+ Community Members Served\" and \"20+ Volunteer Educators\", "
      "and has a news item about \"50 Graduates\". Donors rely on these. Section 3.", "panel"),
    Spacer(1, 6),
    P("<b>4. The nonprofit sends visitors to the founder's for-profit agency.</b> The code "
      "itself describes the Services and Academy pages as a bridge from \"free nonprofit "
      "education\" to \"7Band Financial Agency's paid services.\" For a 501(c)(3), that "
      "needs a professional opinion. Section 4.", "panel"),
], bg=DANGER_BG, bar=DANGER, head="panel_head_d"))

story.append(P("Before touching any code", "h2"))
story.append(bullets([
    "<b>Re-sync from Manus.</b> The newest code on GitHub is dated <b>3 August 2026</b>. If the "
    "site was edited in Manus after that, push from Manus to GitHub again first, or the "
    "migration will quietly roll the site back.",
    "<b>Write down the email records.</b> The site shows info@7bandinc.org. At Hostinger, note "
    "the MX and TXT records for 7bandinc.org and do not change them. Send a test email to that "
    "address now, so you know whether it worked before the move.",
    "Confirm the phone number shown (678-775-9800) is the one Malik wants on a public charity site.",
]))

story.append(PageBreak())

# ---------------- 2. FORMS ----------------
story += chapter("2", "Forms and Donations",
                 "Fix these before anything cosmetic. A nonprofit site that cannot take a "
                 "donation or answer a volunteer is not doing its one job.")
story.append(data_table(
    ["Where", "What it does today", "Fix"],
    [["<b>Donate</b> (/donate)", "Amount picker, then a fake \"redirecting\" message. No payment.",
      "Link to a hosted donation page (below). No card details ever touch this site."],
     ["Contact (/contact)", "Fake \"Message sent!\" toast.", "GoHighLevel form or webhook."],
     ["Volunteer (/volunteer)", "Fake \"Application submitted!\" toast.", "GoHighLevel form or webhook."],
     ["Partners (/partners)", "Submit does nothing.", "GoHighLevel form or webhook."],
     ["Home newsletter", "Submit does nothing.", "GoHighLevel, or remove."],
     ["News page newsletter", "Fake \"Subscribed!\" toast. The page is not even routed.",
      "Route the page or delete it."]],
    [1.5 * inch, 2.55 * inch, 2.65 * inch]))

story.append(P("Choosing a donation processor", "h2"))
story.append(P(
    "Malik decides; the site only links to it. Common choices for small nonprofits are "
    "<b>Zeffy</b> (no platform fee, donor-tip model), <b>Givebutter</b>, <b>PayPal</b> "
    "(Giving Fund or a donate button) and a <b>Stripe Payment Link</b>. Several of them check "
    "nonprofit status before paying out, which ties into Section 3. They all produce the "
    "donor receipt, so the site does not have to."))

story.append(P("Where form submissions go", "h2"))
story.append(bullets([
    "Use GoHighLevel, as on the other sites, but tag these contacts <b>7Band Inc.</b> and keep "
    "them out of the agency's sales pipelines. Someone who signs up to volunteer for a charity "
    "has not asked to be sold insurance.",
    "Remove every fake success message. If a send fails, the visitor must see an error.",
    "Test each form end to end before the switch, and again from the live domain after it.",
    "Ask Malik whether anyone has told him they donated or applied through the site. If "
    "they did, they are waiting on a reply.",
]))
story.append(Spacer(1, 4))
story.append(box("SECURITY: NEVER PASTE KEYS INTO THE CHAT", [
    P("Malik should never paste a GoHighLevel API key, a payment-processor secret key, a token "
      "or a password into a Claude chat. Webhook URLs and public donation-page links are fine. "
      "GitHub Pages serves static files, so every value in the build is public anyway.", "panel"),
], bg=ALERT_BG, bar=GOLD))

story.append(PageBreak())

# ---------------- 3. CHARITY BASICS ----------------
story += chapter("3", "What a Charity Site Has to Get Right",
                 "Not legal advice. These are the points to confirm with Malik, and where "
                 "noted with a CPA or attorney who works with nonprofits, before the new site "
                 "asks anyone for money.")
story.append(data_table(
    ["On the site", "Why it matters", "What to do"],
    [["\"7Band Inc. is a 501(c)(3) nonprofit. Your donation may be tax-deductible.\"",
      "True only with an IRS determination letter. Donors deduct on the strength of it.",
      "Confirm the letter exists. If status is pending, say so instead."],
     ["\"500+ Community Members Served\", \"20+ Volunteer Educators\"",
      "Donors rely on impact figures; misleading solicitations are what state regulators act on.",
      "Confirm with real records or remove."],
     ["News items: \"Cohort Celebrates 50 Graduates\" (July 2026) and two others",
      "Look like real announcements.", "Confirm they happened or remove."],
     ["Footer: \"Financial Transparency\", \"Annual Reports\"",
      "Both link to sections of the About page that do not exist.",
      "Add real content (the Form 990 is a start) or remove the links."],
     ["Footer: Privacy Policy, Terms of Use, Accessibility",
      "All three pages do not exist and show the 404 page.",
      "Write a privacy policy before forms go live; it is needed once data is collected."],
     ["Donate button", "Many states, Georgia included, require charities to register before "
      "soliciting donations, with exemptions for small organizations.",
      "Malik checks his registration status before turning donations on."]],
    [2.1 * inch, 2.4 * inch, 2.2 * inch]))

story.append(PageBreak())

# ---------------- 4. NONPROFIT & AGENCY ----------------
story += chapter("4", "The Nonprofit and the Agency",
                 "This is the biggest judgment call in the brief. It is Malik's decision with "
                 "his advisor, not the migration's, so don't rewrite it silently. Raise it, "
                 "migrate the site, and change the content once he has decided.")
story.append(P("What the site does now", "h2"))
story.append(bullets([
    "The <b>Services</b> page features 7Band Financial Agency's insurance products (IUL, Whole "
    "Life, Term, Medicare Supplement, Long-Term Care), links to the agency, and books calls on "
    "Malik's agency Calendly. A comment in the code calls it the bridge \"to 7Band Financial "
    "Agency's paid services via The Flow.\"",
    "The <b>Academy</b> page is described in its own code as the \"bridge between free nonprofit "
    "education and paid Flow services\".",
    "The <b>Resources</b> page hosts IUL infographics: \"grow tax-free\", \"market-proof "
    "growth\", \"protect your principal\".",
    "The <b>Events</b> page calls the weekly Flow webinar \"Purely educational — no sales "
    "pressure.\" The finished Flow webinar ends with a paid offer.",
]))
story.append(P("Why it matters", "h2"))
story.append(P(
    "A 501(c)(3) must operate for charitable purposes, and its resources (including its "
    "website, its name and its donors' goodwill) must not serve the private interests of the "
    "people who run it. A charity whose site directs its audience to its president's insurance "
    "business is the kind of arrangement that can put tax-exempt status at risk. It may be "
    "fixable with structure and disclosure, but that is a question for a nonprofit CPA or "
    "attorney."))
story.append(P("Options to put to Malik", "h2"))
story.append(bullets([
    "<b>Separate them:</b> the nonprofit teaches; the agency sells. Remove the product cards, "
    "agency Calendly and IUL marketing from 7bandinc.org. At most, add one plainly disclosed "
    "line that the founder also runs a licensed agency.",
    "<b>Keep a link, with advice:</b> only after his advisor approves the arrangement, with "
    "clear disclosure on the page.",
    "<b>Either way, fix the Events wording.</b> A webinar that ends with a paid offer cannot be "
    "described as \"no sales pressure\" on a charity site. Either the nonprofit runs its own "
    "no-offer session, or it stops promoting The Flow.",
]))

story.append(PageBreak())

# ---------------- 5. LINKS & MEDIA ----------------
story += chapter("5", "Links and Media")
story.append(P("Media still on Manus", "h2"))
story.append(P("Nine files load from Manus's storage and are not in the repository. Download them "
               "from the Manus project while the account is active (Malik has to; Claude cannot "
               "reach Manus), commit them under " + "<font face='Courier'>client/public/</font>" +
               " and update the paths."))
story.append(data_table(
    ["File", "Used on"],
    [["logo-7band_52529872.png", "Footer logo"],
     ["hero-community_2f44b0cc.jpg", "Home hero"],
     ["about-mission_6e198f1f.jpg", "Home, About"],
     ["programs-hero_ce0d26ec.jpg", "Home, Programs, Partners"],
     ["volunteer-hero_8eb4b506.jpg", "Volunteer"],
     ["academy-hero_65336d13.jpg", "Academy"],
     ["Indexed_Universal_Life_Policy_Guide_8de18451.webp", "Resources (see Section 4)"],
     ["Cash_Value_Life_Insurance_Benefits_dbe91094.webp", "Resources (see Section 4)"],
     ["IUL_Insurance_Pros_and_Cons_37e887ac.webp", "Resources (see Section 4)"]],
    [3.9 * inch, 2.8 * inch], mono=(0,)))

story.append(P("Broken or placeholder links", "h2"))
story.append(data_table(
    ["Link", "Problem", "Fix"],
    [["zoom.us/webinar/register (Events ×3, Services ×1)", "A placeholder, not a real webinar.",
      "Point at theflow.7bandfinancialagency.com once it is live, or remove (Section 4)."],
     ["7bandfinancialagency.com/retirement-strategies and four similar pages",
      "Those pages no longer exist on the rebuilt agency site. Visitors land on its 404 page.",
      "Remove, or link to the agency home page (Section 4)."],
     ["/privacy, /terms, /accessibility; /about#transparency, #reports",
      "No such pages or sections.", "Section 3."],
     ["thesmartbeautyproject.com (4 links)", "Fine. That site migrates next and keeps its address.",
      "No change."]],
    [2.3 * inch, 2.3 * inch, 2.1 * inch]))

story.append(Spacer(1, 18))

# ---------------- 6. ORDER ----------------
story += chapter("6", "Order of Operations",
                 "The Arise sequence, unchanged. DNS changes last, only once the new hosting is "
                 "confirmed working.")
story.append(P("Phase 1 — Prepare, with nothing switched over", "h2"))
story.append(numbered([
    "Re-sync from Manus, then clone eastmalik/7band-inc. Run " + "<font face='Courier'>pnpm install</font>" +
    " and " + "<font face='Courier'>pnpm check</font>" + "; confirm a clean build first.",
    "Remove the Manus pieces: " + "<font face='Courier'>Map.tsx</font>" + ", " +
    "<font face='Courier'>ManusDialog.tsx</font>" + ", " + "<font face='Courier'>const.ts</font>" +
    ", " + "<font face='Courier'>client/public/__manus__/</font>" + ", the Manus plugins in " +
    "<font face='Courier'>vite.config.ts</font>" + " (copy the clean one from 7band-financial), "
    "and the umami analytics script in " + "<font face='Courier'>index.html</font>" + ". The "
    "Express server is not needed on GitHub Pages.",
    "Add the deploy workflow from 7band-financial, a " + "<font face='Courier'>CNAME</font>" +
    " file containing " + "<font face='Courier'>www.7bandinc.org</font>" + ", and the 404 fallback.",
    "Bring the nine images into the repository (Section 5).",
    "Wire the forms and the Donate link (Section 2).",
]))
story.append(P("Phase 2 — Stand the new hosting up alongside the old", "h2"))
story.append(numbered([
    "<b>Settings → Pages → Source: GitHub Actions.</b> Leave the custom domain empty for now.",
    "Merge to main, let it deploy, and review the site at eastmalik.github.io/7band-inc. "
    "Judge content, not layout; styles may look wrong at that address.",
    "Fix and redeploy until it is right. The live site is untouched throughout.",
]))
story.append(P("Phase 3 — The switch", "h2"))
story.append(numbered([
    "<b>Write down the current @ and www records before changing them.</b> That is the "
    "rollback plan.",
    "Enter <b>www.7bandinc.org</b> as the custom domain in Settings → Pages.",
    "At Hostinger, point <b>www</b> (CNAME) and <b>@</b> (ALIAS, as on 7bandfinancialagency.com) "
    "to <b>eastmalik.github.io</b>. Do not touch MX or TXT records.",
    "Wait for the DNS check and the certificate, then tick <b>Enforce HTTPS</b>.",
    "Test every form and the Donate link from the live domain; send an email to info@ again.",
    "Leave Manus running for at least a week before cancelling.",
]))

story.append(Spacer(1, 6))
story.append(KeepTogether([P("Verify before declaring done", "h2"), data_table(
    ["Check", "What good looks like"],
    [["<b>Donate works</b>", "The button opens the real donation page and a small test gift goes through and is receipted."],
     ["<b>Forms deliver</b>", "Contact, Volunteer and Partners each arrive in GoHighLevel, tagged 7Band Inc."],
     ["No fake success", "With the endpoint broken, the form shows an error."],
     ["Claims", "Every number and the 501(c)(3) line confirmed by Malik, or removed."],
     ["No 404s", "Every nav and footer link, on every page, in a private window."],
     ["No Manus requests", "All images load from the repository."],
     ["Email", "info@7bandinc.org sends and receives after the DNS change."],
     ["HTTPS", "Padlock present; Enforce HTTPS ticked; both 7bandinc.org and www work."]],
    [1.75 * inch, 4.95 * inch])]))

story.append(Spacer(1, 14))
S["panel_head_w"] = style("phw2", fontName="Helvetica-Bold", fontSize=10.5, leading=15,
                          textColor=GOLD_LIGHT, spaceAfter=4)
S["panel_w"] = style("pw2", fontName="Helvetica", fontSize=9.6, leading=14.2,
                     textColor=colors.white)
close = Table([[[P("How to use this brief", "panel_head_w"), Spacer(1, 4),
                 P("Upload this to the new Claude Code session at the start, together with the "
                   "7Band Website Operations &amp; Recovery Manual and the Arise brief. Point it at "
                   "eastmalik/7band-inc. Sections 2 to 4 need Malik's answers; ask him "
                   "early so the hosting work doesn't wait on them.", "panel_w")]]], colWidths=[W])
close.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, -1), NAVY),
    ("LEFTPADDING", (0, 0), (-1, -1), 16), ("RIGHTPADDING", (0, 0), (-1, -1), 16),
    ("TOPPADDING", (0, 0), (-1, -1), 14), ("BOTTOMPADDING", (0, 0), (-1, -1), 14),
]))
story.append(close)

doc.build(story)
print("built:", OUT)
