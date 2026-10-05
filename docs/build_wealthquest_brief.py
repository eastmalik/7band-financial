#!/usr/bin/env python3
"""Build the WealthQuest webinar-site migration handoff brief as a branded PDF."""

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

OUT = "/home/user/7band-financial/docs/WealthQuest-Migration-Brief.pdf"
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
    c.drawString(MARGIN, PAGE_H - 0.64 * inch, "WEALTHQUEST WEBINAR SITE — MIGRATION BRIEF")
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
    title="WealthQuest Webinar Site — Migration Handoff Brief",
    author="7Band Financial Agency",
    subject="Moving the WealthQuest webinar site off Manus to theflow.7bandfinancialagency.com",
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
story.append(P("WealthQuest Webinar Site<br/>Migration Brief", "cover_title"))
gl = Table([[""]], colWidths=[2.0 * inch], rowHeights=[2]); gl.hAlign = "CENTER"
gl.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), GOLD)]))
story.append(gl)
story.append(Spacer(1, 0.2 * inch))
story.append(P("Moving the webinar registration page off Manus to<br/>"
               "theflow.7bandfinancialagency.com, and fixing what it gets wrong on the way.",
               "cover_sub"))
story.append(Spacer(1, 0.36 * inch))

facts = Table([
    [Paragraph("SITE", S["cell_head"]), Paragraph("WealthQuest webinar registration page", S["cell_b"])],
    [Paragraph("LIVES ON", S["cell_head"]), Paragraph("wealthquest-rdwda2zi.manus.space (to be replaced)", S["cell"])],
    [Paragraph("CODE", S["cell_head"]), Paragraph("github.com/eastmalik/wealth-quest-webinar", S["cell"])],
    [Paragraph("NEW ADDRESS", S["cell_head"]), Paragraph("theflow.7bandfinancialagency.com", S["cell_b"])],
    [Paragraph("DOMAIN", S["cell_head"]), Paragraph("Hostinger (subdomain of the 7Band domain)", S["cell"])],
    [Paragraph("FORMS", S["cell_head"]), Paragraph("NOT CONNECTED — see Section 2", S["cell_b"])],
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
story.append(P("Companion to the 7Band Website Operations &amp; Recovery Manual,<br/>"
               "the Offer Architecture and The Flow webinar script.", "cover_sub"))

story.append(NextPageTemplate("Body"))
story.append(PageBreak())

# ---------------- 1. START HERE ----------------
story += chapter("1", "Start Here",
                 "This is the last site in the ecosystem to leave Manus. The hosting part is "
                 "the same proven pattern as the other three. The difference is that this page "
                 "has real problems on it right now, and they matter more than the move.")

story.append(box("WHAT IS WRONG ON THE LIVE PAGE TODAY", [
    P("<b>1. Registrations are probably going nowhere.</b> The form saves to the visitor's own "
      "browser and shows a success message unless a registration endpoint is configured. Manus's "
      "own notes say that endpoint was deferred until a webhook URL was supplied. Unless one was "
      "added later, everyone who registered was told they were in and never reached the CRM.",
      "panel"),
    Spacer(1, 6),
    P("<b>2. It says the webinar is live right now.</b> The event date is hardcoded to "
      "Saturday 19 September 2026, 7 PM CT. That date has passed, so the countdown reached zero "
      "and the hero now shows <i>&gt;&gt;&gt; THE WEBINAR IS LIVE NOW &lt;&lt;&lt;</i> to every visitor.",
      "panel"),
    Spacer(1, 6),
    P("<b>3. The 7Band site depends on it.</b> The <b>Event</b> button on "
      "7bandfinancialagency.com (Player 1, Simple View and the lessons) points at the manus.space "
      "address. Close Manus before repointing it and that button breaks.", "panel"),
    Spacer(1, 6),
    P("<b>4. The copy has drifted from the webinar.</b> The page promises things the finished "
      "deck deliberately does not say, and uses a different title. Section 5 lists each one.",
      "panel"),
], bg=DANGER_BG, bar=DANGER, head="panel_head_d"))

story.append(P("Work already done once, in the wrong chat", "h2"))
story.append(P(
    "A first pass was made in the main 7Band session and then deliberately abandoned so this "
    "could run in its own chat. <b>None of it was committed or pushed.</b> Redo it here. It "
    "is small, and it is known to work: after these steps the typecheck was clean and all 15 "
    "tests passed."))
story.append(bullets([
    "Delete the Manus-only files: <font face='Courier'>client/src/components/Map.tsx</font>, "
    "<font face='Courier'>ManusDialog.tsx</font>, <font face='Courier'>client/src/const.ts</font>, "
    "<font face='Courier'>client/public/__manus__/</font>.",
    "Replace <font face='Courier'>vite.config.ts</font> with the clean one from the 7band-financial "
    "repo (React + Tailwind, aliases @, @shared, @assets, root client, output dist/public).",
    "Copy <font face='Courier'>.github/workflows/deploy.yml</font> from 7band-financial.",
    "Add <font face='Courier'>client/public/CNAME</font> containing "
    "<font face='Courier'>theflow.7bandfinancialagency.com</font>.",
    "Copy the favicons. In <font face='Courier'>client/index.html</font>, remove the Manus comment "
    "block and the umami analytics script, and add the favicon links.",
]))

story.append(PageBreak())

# ---------------- 2. REGISTRATIONS ----------------
story += chapter("2", "Registrations: Fix This First",
                 "A webinar page exists to collect registrations. Until a signup reaches "
                 "GoHighLevel and triggers the reminder sequence, the page is decoration.")

story.append(P("What the code does", "h2"))
story.append(P(
    "<font face='Courier'>client/src/lib/registration.ts</font> reads "
    "<font face='Courier'>VITE_REGISTRATION_ENDPOINT</font>. If it is empty, the form writes the "
    "signup into the visitor's browser storage (key <font face='Courier'>gwq_registrations</font>) "
    "and reports success. That storage lives on the visitor's device, so those signups cannot be "
    "recovered by anyone."))

story.append(P("Before anything else", "h2"))
story.append(bullets([
    "Check the Manus project settings for a registration endpoint or form URL. If one exists, "
    "find where it sends and whether anything arrived.",
    "Check GoHighLevel for contacts tagged from this page. If there are none, assume every "
    "registration so far was lost and tell Malik plainly. Do not soften it.",
]))

story.append(P("The fix", "h2"))
story.append(bullets([
    "Send registrations to GoHighLevel: either a GoHighLevel inbound-webhook URL that the form "
    "posts to, or GoHighLevel's own embedded form in place of the custom one. Choose with Malik; "
    "the webhook keeps the current design, the embed is simpler to maintain.",
    "Remove the silent browser-storage fallback. If the endpoint is missing or the request fails, "
    "the visitor must see an error, not a success message.",
    "Carry the SMS consent checkbox through to GoHighLevel, together with the exact consent "
    "wording shown. Texting reminders without recorded consent is a carrier and legal problem.",
    "Submit a test registration and confirm the contact, the tag and the first reminder in "
    "GoHighLevel before calling this done.",
]))

story.append(Spacer(1, 6))
story.append(box("SECURITY: NEVER PASTE KEYS INTO THE CHAT", [
    P("Malik should never paste a GoHighLevel API key, token or password into a Claude chat. "
      "An inbound-webhook URL is fine to share, because it ends up in the public page anyway; "
      "an API key is not. Anything this site needs must work from the browser without a secret, "
      "because GitHub Pages serves static files and every value in the build is public.",
      "panel"),
], bg=ALERT_BG, bar=GOLD))

story.append(PageBreak())

# ---------------- 3. SCHEDULE & ASSETS ----------------
story += chapter("3", "The Schedule",
                 "One fixed date means the page breaks again the day after every webinar.")
story.append(bullets([
    "Replace the single date in <font face='Courier'>client/src/lib/event.ts</font> "
    "(<font face='Courier'>FALLBACK_EVENT_DATE</font>, the hardcoded "
    "<font face='Courier'>EVENT_DATE_LABEL</font> \"SAT • SEP 19 • 7PM CT\") with a recurring "
    "weekly schedule. The page should always count down to the next session.",
    "<b>Confirm the day and time with Malik.</b> The old page used Saturday 7 PM Central. Do not "
    "assume it is still right.",
    "Compute the time in America/Chicago so daylight-saving changes do not shift it by an hour.",
    "Show \"live now\" only during the session window (say, start to start + 90 minutes), then "
    "roll forward to next week.",
    "Update the tests that pin the old date: "
    "<font face='Courier'>content.test.ts</font> expects the sentence \"Saturday, September 19 at "
    "7:00 PM CT\". Add tests for the roll-forward and the DST boundary.",
]))

story.append(Spacer(1, 4))
story += chapter("4", "Media Still on Manus",
                 "Four files load from Manus's storage and are not in the repository. When Manus "
                 "closes, they disappear.")
story.append(data_table(
    ["File", "Used by"],
    [["malik-east-portrait_0b0a7323.webp", "HostSection: host portrait"],
     ["hero-live-feed_61bd8494.mp4", "HeroSection: hero video"],
     ["hero-live-feed-poster_3ea209b3.jpg", "HeroSection: video poster"],
     ["arena-bg_aebd8084.png", "HeroSection: arena background"]],
    [3.3 * inch, 3.4 * inch], mono=(0,)))
story.append(Spacer(1, 8))
story.append(bullets([
    "Download all four from the Manus project while the account is still active. Malik has to "
    "do this; the Claude environment cannot reach Manus.",
    "Commit them under <font face='Courier'>client/public/</font> and change the "
    "<font face='Courier'>/manus-storage/</font> paths. Keep the video small (aim for under "
    "about 8 MB) and keep the poster fallback so slow phones still show something.",
    "The 7band-financial repository already holds a portrait and the logo, which can stand in if "
    "the originals are lost.",
]))

story.append(PageBreak())

# ---------------- 5. COPY ----------------
story += chapter("5", "Make the Page Match the Webinar",
                 "The finished deck (The Flow, 55 slides) and its script were written to avoid "
                 "the claims below. A registration page that promises more than the webinar "
                 "delivers loses trust at the door and creates compliance exposure. Raise each "
                 "with Malik; don't rewrite his copy silently.")
story.append(data_table(
    ["On the page now", "Problem", "Direction"],
    [["Title: \"The Great Generational Wealth Journey\"",
      "Deck and new address both say THE FLOW.", "Align on one name; THE FLOW fits the domain."],
     ["\"&gt;&gt;&gt; THE WEBINAR IS LIVE NOW &lt;&lt;&lt;\"", "False since 19 Sep.", "Fixed by Section 3."],
     ["Ticker: \"LIMITED SLOTS\"", "Implied scarcity on an online webinar.",
      "Remove unless there is a real cap."],
     ["\"banks quietly siphon 86% of your mortgage payment\"", "Unsourced; depends on rate and term.",
      "Use a worked example with stated rate and term, or cut."],
     ["PROOF_STAT \"$205.7 BILLION\" (BOLI)", "No source or date shown.",
      "Cite source and year on the page, or remove."],
     ["Level 4 \"IUL / Lifetime LOC\", \"Lifetime Line of Credit that compounds safely\"",
      "Policy loans are not a guaranteed credit line; \"safely\" implies a guarantee.",
      "Describe policy loans plainly; carrier advertising review."],
     ["\"transfer wealth 100% tax-free\"", "Absolute; ignores estate tax and policy structure.",
      "\"generally income-tax-free death benefit\" or similar; carrier review."],
     ["\"bypass probate\"", "True only with a named beneficiary.", "Qualify it."],
     ["\"Restore your credit profile so banks start saying yes\"",
      "Reads as a promised result; CROA bars misleading claims.", "Describe the process, not an outcome."],
     ["\"Live IUL Illustration\" card", "Illustrations belong in one-to-one meetings, not a webinar.",
      "Remove; the deck already moved this to the call."],
     ["\"Asset Protection Specialist\" caption", "A title a regulator or carrier may question.",
      "Use the licensed title Malik actually holds."]],
    [2.15 * inch, 2.25 * inch, 2.3 * inch]))
story.append(Spacer(1, 8))
story.append(P(
    "<b>Also confirm the host bio with Malik</b> before shipping: licensed since 2020, the B.S. "
    "from Alcorn State (2019), and the saxophone story and quote. They came from an earlier "
    "session; he should confirm they are accurate as written."))
story.append(box("A COMPLIANCE NOTE, NOT LEGAL ADVICE", [
    P("Insurance marketing is subject to state rules and carrier advertising approval; credit "
      "repair marketing falls under the Credit Repair Organizations Act. This list flags "
      "obvious risks. It is not a sign-off, and the carrier and qualified counsel have the final "
      "word.", "panel"),
]))

# ---------------- 6. ORDER ----------------
story.append(Spacer(1, 18))
story += chapter("6", "Order of Operations")
story.append(P("Why a subdomain", "h2"))
story.append(P(
    "theflow.7bandfinancialagency.com puts the webinar under the main brand without touching "
    "the main site. It is a separate GitHub repository with its own Pages deployment; the only "
    "DNS change is one new <b>CNAME</b> record named <b>theflow</b>. The apex and www records "
    "that serve 7bandfinancialagency.com are not touched. Nothing lives at the new address yet, "
    "so there is no live site there to take down."))

story.append(P("Phase 1: build it right, nothing switched", "h2"))
story.append(numbered([
    "Clone eastmalik/wealth-quest-webinar, run <font face='Courier'>pnpm install</font>, "
    "<font face='Courier'>pnpm check</font> and the tests, and confirm a clean start.",
    "Redo the cleanup listed in Section 1.",
    "Fix registrations (Section 2), the schedule (Section 3) and the media (Section 4).",
    "Go through the copy list (Section 5) with Malik.",
]))
story.append(P("Phase 2: go live on the subdomain", "h2"))
story.append(numbered([
    "In the repository: <b>Settings → Pages → Source: GitHub Actions</b>. Merge to main and "
    "let the deploy run. The first activation has to be done by hand in that screen.",
    "In <b>Settings → Pages</b>, enter the custom domain "
    "<b>theflow.7bandfinancialagency.com</b> and save.",
    "At Hostinger, <b>add</b> one record: type <b>CNAME</b>, name <b>theflow</b>, target "
    "<b>eastmalik.github.io</b>. Do not edit the existing @ or www records.",
    "Wait for the DNS check and the HTTPS certificate, then tick <b>Enforce HTTPS</b>.",
    "Register from the live address and confirm it arrives in GoHighLevel.",
]))
story.append(P("Phase 3: repoint and retire", "h2"))
story.append(numbered([
    "In the 7band-financial repository, change <font face='Courier'>EVENT_URL</font> in "
    "<font face='Courier'>client/src/lib/links.ts</font> from the manus.space address to "
    "<font face='Courier'>https://theflow.7bandfinancialagency.com</font>. That one value feeds "
    "every Event button on the main site.",
    "Update any GoHighLevel emails, texts, social bios and ads that still link to manus.space.",
    "Leave the Manus page up for at least a week, then retire it.",
]))

story.append(Spacer(1, 6))
story.append(P("Verify before declaring done", "h2"))
story.append(data_table(
    ["Check", "What good looks like"],
    [["<b>Registration delivers</b>", "A real test signup appears in GoHighLevel with consent recorded and the reminder triggered."],
     ["<b>Failure is visible</b>", "With the endpoint broken, the form shows an error, not success."],
     ["Countdown", "Counts to the next real session; shows live only inside the window."],
     ["Media", "Portrait, video, poster and background load from the repository, with no requests to Manus."],
     ["Event button", "Every Event link on 7bandfinancialagency.com opens the new page."],
     ["Mobile and console", "No sideways scrolling and no JavaScript errors."],
     ["HTTPS", "Padlock present; Enforce HTTPS ticked."]],
    [1.75 * inch, 4.95 * inch]))

story.append(Spacer(1, 14))
S["panel_head_w"] = style("phw2", fontName="Helvetica-Bold", fontSize=10.5, leading=15,
                          textColor=GOLD_LIGHT, spaceAfter=4)
S["panel_w"] = style("pw2", fontName="Helvetica", fontSize=9.6, leading=14.2,
                     textColor=colors.white)
close = Table([[[P("How to use this brief", "panel_head_w"), Spacer(1, 4),
                 P("Upload this to the new Claude Code session at the start, together with the "
                   "7Band Website Operations &amp; Recovery Manual. Point it at "
                   "eastmalik/wealth-quest-webinar. Fix Section 2 before anything cosmetic.",
                   "panel_w")]]], colWidths=[W])
close.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, -1), NAVY),
    ("LEFTPADDING", (0, 0), (-1, -1), 16), ("RIGHTPADDING", (0, 0), (-1, -1), 16),
    ("TOPPADDING", (0, 0), (-1, -1), 14), ("BOTTOMPADDING", (0, 0), (-1, -1), 14),
]))
story.append(close)

doc.build(story)
print("built:", OUT)
