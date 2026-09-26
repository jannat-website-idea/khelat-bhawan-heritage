from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.platypus import (
    BaseDocTemplate,
    CondPageBreak,
    Frame,
    HRFlowable,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[2]
OUTPUT = ROOT / "output" / "pdf" / "Khelat_Bhawan_Official_Website_Compendium.pdf"
PUBLIC = ROOT / "public" / "Khelat_Bhawan_Heritage_eBook.pdf"
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

PAGE_W, PAGE_H = A4
BURGUNDY = colors.HexColor("#48151D")
BURGUNDY_DARK = colors.HexColor("#281015")
BURGUNDY_LIGHT = colors.HexColor("#F1E3E2")
GOLD = colors.HexColor("#C69B43")
GOLD_LIGHT = colors.HexColor("#E7D2A2")
IVORY = colors.HexColor("#F8F4E9")
PAPER = colors.HexColor("#FFFDF7")
INK = colors.HexColor("#31191A")
MUTED = colors.HexColor("#765F58")
LINE = colors.HexColor("#D9CDB9")

SOURCE_URLS = [
    "https://www.khelatbhawan.com/",
    "https://www.khelatbhawan.com/about",
    "https://www.khelatbhawan.com/trusts",
    "https://www.khelatbhawan.com/heritage-rental",
    "https://www.khelatbhawan.com/gallery",
    "https://www.khelatbhawan.com/events",
    "https://www.khelatbhawan.com/feedback",
    "https://www.khelatbhawan.com/contact",
]

SOURCE_DETAILS = [
    ("HOME", "Identity, founding date, cultural role, headline milestones and visitor orientation."),
    ("ABOUT", "Origin story, founder, mission, architecture, spiritual heritage and seven-generation lineage."),
    ("TRUSTS", "Trust names, purposes, activities, achievements and custodial continuity."),
    ("HERITAGE RENTAL", "Venue uses, published rates, amenities, booking conditions and operating window."),
    ("GALLERY", "The website’s architectural, devotional and cultural visual categories."),
    ("EVENTS", "General description of year-round religious, cultural and educational programming; dated event listings are excluded."),
    ("FEEDBACK", "Published engagement figures and summarized visitor perspectives."),
    ("CONTACT", "Address, visiting hours, directions, phone numbers and email contact."),
]


def _page(canvas, doc):
    canvas.saveState()
    page = doc.page
    if page == 1:
        canvas.setFillColor(BURGUNDY_DARK)
        canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
        canvas.setFillColor(BURGUNDY)
        canvas.circle(PAGE_W * .82, PAGE_H * .18, 94 * mm, fill=1, stroke=0)
        canvas.setStrokeColor(GOLD)
        canvas.setLineWidth(.7)
        canvas.rect(14 * mm, 14 * mm, PAGE_W - 28 * mm, PAGE_H - 28 * mm, fill=0, stroke=1)
        for inset in (20, 24):
            canvas.setStrokeColor(colors.Color(0.78, 0.61, 0.26, alpha=.35))
            canvas.rect(inset * mm, inset * mm, PAGE_W - 2 * inset * mm, PAGE_H - 2 * inset * mm, fill=0, stroke=1)
    else:
        canvas.setFillColor(IVORY)
        canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
        canvas.setFillColor(BURGUNDY)
        canvas.rect(0, PAGE_H - 11 * mm, PAGE_W, 11 * mm, fill=1, stroke=0)
        canvas.setFillColor(GOLD)
        canvas.rect(0, PAGE_H - 11.8 * mm, PAGE_W, .8 * mm, fill=1, stroke=0)
        canvas.setFont("Helvetica", 6.5)
        canvas.setFillColor(colors.HexColor("#F4E8CD"))
        canvas.drawString(18 * mm, PAGE_H - 7.2 * mm, "KHELAT BHAWAN  ·  PATHURIA GHATA  ·  EST. 1845")
        canvas.setStrokeColor(LINE)
        canvas.line(18 * mm, 14 * mm, PAGE_W - 18 * mm, 14 * mm)
        canvas.setFont("Helvetica", 6.4)
        canvas.setFillColor(MUTED)
        canvas.drawString(18 * mm, 9.5 * mm, "CURATED FROM THE ORIGINAL KHELAT BHAWAN WEBSITE · ACCESSED 26 SEPTEMBER 2026")
        canvas.drawRightString(PAGE_W - 18 * mm, 9.5 * mm, f"{page:02d}")
    canvas.restoreState()


class HeritageDocTemplate(BaseDocTemplate):
    def __init__(self, filename):
        super().__init__(
            filename,
            pagesize=A4,
            leftMargin=19 * mm,
            rightMargin=19 * mm,
            topMargin=21 * mm,
            bottomMargin=20 * mm,
            title="Khelat Bhawan — Original Website Heritage Compendium",
            author="Khelat Bhawan",
            subject="A curated record of information published on the original Khelat Bhawan website",
        )
        frame = Frame(self.leftMargin, self.bottomMargin, self.width, self.height, id="content")
        self.addPageTemplates(PageTemplate(id="heritage", frames=frame, onPage=_page))


styles = getSampleStyleSheet()
styles.add(ParagraphStyle(
    "CoverKicker", parent=styles["Normal"], fontName="Helvetica", fontSize=8.5,
    leading=11, textColor=GOLD_LIGHT, tracking=3, alignment=TA_CENTER, spaceAfter=11 * mm,
))
styles.add(ParagraphStyle(
    "CoverTitle", parent=styles["Title"], fontName="Times-Roman", fontSize=39,
    leading=42, textColor=IVORY, alignment=TA_CENTER, spaceAfter=5 * mm,
))
styles.add(ParagraphStyle(
    "CoverSub", parent=styles["Normal"], fontName="Times-Italic", fontSize=15,
    leading=21, textColor=GOLD_LIGHT, alignment=TA_CENTER, spaceAfter=7 * mm,
))
styles.add(ParagraphStyle(
    "CoverNote", parent=styles["Normal"], fontName="Helvetica", fontSize=8.3,
    leading=13, textColor=colors.HexColor("#E8DCD0"), alignment=TA_CENTER,
))
styles.add(ParagraphStyle(
    "SectionKicker", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=7.5,
    leading=10, textColor=GOLD, tracking=2.4, spaceAfter=3 * mm,
))
styles.add(ParagraphStyle(
    "H1Royal", parent=styles["Heading1"], fontName="Times-Roman", fontSize=28,
    leading=32, textColor=INK, spaceAfter=5 * mm,
))
styles.add(ParagraphStyle(
    "H2Royal", parent=styles["Heading2"], fontName="Times-Roman", fontSize=18,
    leading=22, textColor=BURGUNDY, spaceBefore=3 * mm, spaceAfter=2.5 * mm,
))
styles.add(ParagraphStyle(
    "H3Royal", parent=styles["Heading3"], fontName="Helvetica-Bold", fontSize=9,
    leading=12, textColor=INK, tracking=.6, spaceBefore=1.5 * mm, spaceAfter=1.5 * mm,
))
styles.add(ParagraphStyle(
    "BodyRoyal", parent=styles["BodyText"], fontName="Helvetica", fontSize=9.1,
    leading=14.2, textColor=MUTED, spaceAfter=2.6 * mm,
))
styles.add(ParagraphStyle(
    "BodySmall", parent=styles["BodyText"], fontName="Helvetica", fontSize=7.7,
    leading=11.5, textColor=MUTED, spaceAfter=1.5 * mm,
))
styles.add(ParagraphStyle(
    "BulletRoyal", parent=styles["BodyText"], fontName="Helvetica", fontSize=8.6,
    leading=13.2, leftIndent=5 * mm, firstLineIndent=-3.2 * mm, bulletIndent=0,
    textColor=MUTED, spaceAfter=1.4 * mm,
))
styles.add(ParagraphStyle(
    "QuoteRoyal", parent=styles["BodyText"], fontName="Times-Italic", fontSize=13,
    leading=19, textColor=BURGUNDY, leftIndent=8 * mm, rightIndent=8 * mm,
    spaceBefore=3 * mm, spaceAfter=4 * mm,
))
styles.add(ParagraphStyle(
    "TableHead", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=7,
    leading=9, textColor=IVORY,
))
styles.add(ParagraphStyle(
    "TableBody", parent=styles["Normal"], fontName="Helvetica", fontSize=7.4,
    leading=10.5, textColor=MUTED,
))
styles.add(ParagraphStyle(
    "Source", parent=styles["Normal"], fontName="Helvetica", fontSize=7,
    leading=10.5, textColor=MUTED,
))


def p(text, style="BodyRoyal"):
    return Paragraph(text, styles[style])


def bullet(text):
    return Paragraph(f"•&nbsp;&nbsp;{text}", styles["BulletRoyal"])


def section(kicker, title, intro=None):
    out = [p(kicker.upper(), "SectionKicker"), p(title, "H1Royal"), HRFlowable(width="100%", thickness=.6, color=GOLD_LIGHT, spaceAfter=5 * mm)]
    if intro:
        out.append(p(intro))
    return out


def section_break():
    # Keep sections flowing whenever there is room for a heading and opening
    # paragraph. This avoids the large empty lower halves caused by forcing
    # every chapter onto a fresh page.
    return [Spacer(1, 5 * mm), CondPageBreak(30 * mm)]


def card(title, body, accent=BURGUNDY_LIGHT):
    table = Table([[p(title, "H3Royal"), p(body, "BodySmall")]], colWidths=[45 * mm, 116 * mm])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, 0), accent),
        ("BACKGROUND", (1, 0), (1, 0), PAPER),
        ("BOX", (0, 0), (-1, -1), .5, LINE),
        ("LINEAFTER", (0, 0), (0, 0), .5, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    return table


story = []

# Cover
story += [
    Spacer(1, 35 * mm),
    p("A LIVING LEGACY SINCE 1845", "CoverKicker"),
    p("Khelat Bhawan", "CoverTitle"),
    p("Heritage Compendium", "CoverSub"),
    HRFlowable(width=58 * mm, thickness=.8, color=GOLD, hAlign="CENTER", spaceBefore=1 * mm, spaceAfter=8 * mm),
    p("A curated record of the history, traditions, cultural stewardship, trusts, visitor information and services published on the original Khelat Bhawan website.", "CoverNote"),
    Spacer(1, 56 * mm),
    p("PATHURIA GHATA  ·  KOLKATA", "CoverKicker"),
    p("Source reviewed 26 September 2026", "CoverNote"),
    PageBreak(),
]

# Editorial note + contents
story += section("About this document", "Editorial Note", "This compendium curates the substantive information available across the original Khelat Bhawan website. It is intentionally limited to material published there: historical claims, family lineage, trust activities, venue information, event listings, gallery descriptors, visitor feedback summaries and contact details.")
story += [
    p("Repeated menus, form fields, technical interface text and visibly duplicated gallery entries are not reproduced. Visitor comments are summarized rather than republished at length. Time-sensitive listings and prices are identified as information shown on the source website and should be reconfirmed directly before planning a visit or booking."),
    p("Contents", "H2Royal"),
]
for label in [
    "01  Khelat Bhawan at a glance", "02  Story, mission and spiritual heritage",
    "03  Historical milestones", "04  Seven generations of custodianship",
    "05  The three cultural trusts", "06  Heritage venue and booking information",
    "07  Visitor perspectives", "08  Visit and contact directory",
    "09  Source register",
]:
    story.append(card(label[:2], label[4:]))
    story.append(Spacer(1, 1.6 * mm))
story += section_break()

# At a glance
story += section("01 · Identity", "Khelat Bhawan at a Glance", "Khelat Bhawan—also presented on the website as Pathuria Ghata Ghosh Bari—is described as a living centre of Bengali culture, music and devotion established in 1845.")
story += [
    card("ESTABLISHED", "1845, at 47 Pathuria Ghata Street in North Kolkata."), Spacer(1, 3 * mm),
    card("CULTURAL ROLE", "A family heritage house associated with religious observance, classical music, cultural activity, social service and community gathering."), Spacer(1, 3 * mm),
    card("LIVING TRADITION", "The website presents an unbroken Durga Puja tradition beginning in 1855, alongside Jagadhatri Puja and daily devotional service."), Spacer(1, 3 * mm),
    card("SPIRITUAL MEMORY", "Sri Ramakrishna Paramhansa is stated to have visited the house in 1881, a moment central to its spiritual history."), Spacer(1, 3 * mm),
    card("CONTEMPORARY USE", "The property is presented as an active cultural venue available for ceremonies, performances, photography, filming, workshops and selected corporate events."),
    p("“This house isn’t bricks and walls – it is Bengal’s cultural soul.”", "QuoteRoyal"),
    *section_break(),
]

# Story and mission
story += section("02 · Story & purpose", "A House of Culture, Devotion and Community", "The website describes Khelat Bhawan as a cultural and religious heart of Kolkata whose family custodians have continued its traditions across generations.")
story += [
    p("The property is presented as a place where architecture, ritual, music and community life remain intertwined. Its historic courtyards and interiors support sacred observances, family traditions, artistic gatherings and contemporary heritage experiences."),
    p("Founder", "H2Royal"),
    p("Khelat Ghosh is identified as the founder and visionary associated with the establishment of Khelat Bhawan. The website credits the founding generation with creating the cultural estate and beginning a lineage of patronage and stewardship."),
    p("Mission", "H2Royal"),
    bullet("Preserve Bengali cultural and spiritual traditions."),
    bullet("Support classical music, performing arts and cultural learning."),
    bullet("Maintain the house, its architecture and its sacred practices for future generations."),
    bullet("Serve the community through education, cultural participation and social welfare."),
    p("Architectural character", "H2Royal"),
    p("Across the original website, the mansion is associated with traditional Bengali courtyards, heritage interiors, carved woodwork, marble spaces, columns, railings and period architectural details. These features are presented both as cultural inheritance and as settings for worship, performance, ceremonies and visual documentation."),
    *section_break(),
]

# Timeline
story += section("03 · Chronology", "Historical Milestones", "The following chronology consolidates the dated milestones shown on the original Home and About pages.")
timeline = [
    ("1845", "Khelat Bhawan is established; the Ghosh family mansion begins its life as a cultural estate."),
    ("1855", "The first formal Durga Puja is held, beginning the continuing annual tradition described by the website."),
    ("1881", "Sri Ramakrishna Paramhansa visits Khelat Bhawan."),
    ("1920", "The first formal trust structure is established to support continuity and preservation."),
    ("1947", "The house and its custodians adapt cultural activity to the post-Independence era."),
    ("1975", "A major architectural restoration and conservation phase is recorded."),
    ("1985", "The Artist Nectar Council of Culture is formed."),
    ("2005", "A digital archives initiative begins."),
    ("2015", "Heritage tourism and curated access are introduced."),
    ("2020", "Virtual and digital heritage experiences are developed."),
    ("2023", "A future-vision initiative is recorded for continued preservation and engagement."),
    ("Present", "The site presents Khelat Bhawan as an active cultural hub, religious centre and heritage venue."),
]
data = [[p("YEAR", "TableHead"), p("MILESTONE PUBLISHED ON THE ORIGINAL WEBSITE", "TableHead")]]
for year, detail in timeline:
    data.append([p(year, "H3Royal"), p(detail, "TableBody")])
t = Table(data, colWidths=[25 * mm, 136 * mm], repeatRows=1)
t.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, 0), BURGUNDY),
    ("BACKGROUND", (0, 1), (-1, -1), PAPER),
    ("GRID", (0, 0), (-1, -1), .35, LINE),
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 7),
    ("RIGHTPADDING", (0, 0), (-1, -1), 7),
    ("TOPPADDING", (0, 0), (-1, -1), 6),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
]))
story += [t, *section_break()]

# Generations
story += section("04 · Lineage", "Seven Generations of Custodianship", "The About page presents a seven-generation family narrative from the founder to the present and future-facing custodians.")
generations = [
    ("First · 1775–1845", "Khelat Ghosh", "Founder and initiating figure of the cultural estate."),
    ("Second · 1810–1880", "Second-generation custodians", "Inherited the estate and carried forward the Durga Puja tradition."),
    ("Third · 1845–1915", "Spiritual custodians", "Associated with the 1881 visit of Sri Ramakrishna."),
    ("Fourth · 1880–1950", "Cultural guardians", "Linked to the formalization of trusts and institutional continuity."),
    ("Fifth · 1915–1985", "Modernizing generation", "Adapted stewardship to changing social and cultural conditions."),
    ("Sixth · 1950–Present", "Contemporary custodians", "Continue religious, cultural and community activities."),
    ("Seventh · 1985–Present", "Future vision", "Represents the next phase of heritage stewardship and public engagement."),
]
for period, name, role in generations:
    story += [KeepTogether([p(period.upper(), "SectionKicker"), p(name, "H2Royal"), p(role)]), Spacer(1, 2 * mm)]
story += section_break()

# Trust 1
story += section("05 · Trusts", "Three Pillars of Cultural Stewardship", "The original website identifies three trusts with distinct religious, cultural and social missions.")
story += [
    p("Lakshmi Narayan Gopal Radha Krishna Jew Trust", "H2Royal"),
    p("Presented as the religious and spiritual trust, established in 1855 and dedicated to sustaining worship, rituals and devotional continuity."),
    p("Activities", "H3Royal"),
    bullet("Durga Puja, described as continuing since 1855."),
    bullet("Jagadhatri Puja and other sacred observances."),
    bullet("Daily Nitya Seva for the deities."),
    bullet("Spiritual discourses, devotional music and community participation."),
    bullet("Festival organization and preservation of ritual practice."),
    p("Published achievements", "H3Royal"),
    bullet("More than 170 years of traditional Durga Puja."),
    bullet("The house’s association with Sri Ramakrishna’s 1881 visit."),
    bullet("Continuing rituals and community spiritual guidance."),
    p("Trust continuity", "H2Royal"),
    p("The Trusts page also presents a custodial sequence: First Trustee (1920–1945), Second Trustee (1945–1970), Third Trustee (1970–1995), Fourth Trustee (1995–2020), and Current Trustees (2020–Present)."),
    *section_break(),
]

# Trust 2 and 3
story += section("05 · Trusts continued", "Music, Performing Arts and Social Service")
story += [
    p("Khelat Ghosh Memorial Trust", "H2Royal"),
    p("The website describes this trust as a guardian of classical arts and cultural patronage, with roots in the 1950s."),
    bullet("Classical music concerts and recitals."),
    bullet("Support and welfare for traditional musicians."),
    bullet("Cultural programs, music education, awards and mentoring."),
    bullet("Preservation of Bengali musical traditions."),
    p("Published achievements include support for 100+ classical musicians and 500+ cultural programs."),
    Spacer(1, 3 * mm),
    p("Artist Nectar Council of Culture", "H2Royal"),
    p("Presented as a performing-arts and social-welfare organization established in the modern era, with the About page recording its formation in 1985 and other pages using the broader label “2000+”."),
    bullet("Workshops, performances and cultural programming."),
    bullet("Educational support for underprivileged children."),
    bullet("Healthcare awareness and community service."),
    bullet("Heritage arts documentation and preservation."),
    p("Published achievements include education support for 200+ children, 50+ health camps and 300+ cultural performances."),
    p("The website invites participation through cultural programs, volunteering and support for its heritage mission."),
    *section_break(),
]

# Rental
story += section("06 · Heritage venue", "Experiences, Rentals and Booking Information", "The Heritage Rental page presents Khelat Bhawan as a bookable historic setting. All prices below are those displayed on the source website and should be reconfirmed directly.")
services = [
    ("Wedding ceremonies", "Contact for pricing", "Mandap arrangements, heritage photography locations, catering coordination and priest coordination."),
    ("Photography & film shoots", "INR 15,000/day", "Multiple locations, period architecture, lighting support and equipment access."),
    ("Cultural events & performances", "INR 10,000/event", "Sound, stage, seating and heritage ambience."),
    ("Corporate events", "INR 20,000/day", "Event amenities, heritage backdrop, catering and audio-visual support."),
]
for name, price, detail in services:
    story += [card(name.upper(), f"<b>{price}</b><br/>{detail}"), Spacer(1, 2.2 * mm)]
story += [
    p("Amenities listed", "H2Royal"),
    p("Heritage architecture and interiors; courtyards; vintage furniture and décor; lighting; sound; parking; and kitchen facilities."),
    p("Booking conditions", "H2Royal"),
    bullet("Advance booking at least 15 days before the event."),
    bullet("A security deposit is required."),
    bullet("No smoking or alcohol; the sanctity of the premises must be respected."),
    bullet("Professional photography requires permission."),
    bullet("Published operating window: 6:00 AM–10:00 PM."),
    bullet("Approved vendors and heritage-safe decoration practices are required."),
    *section_break(),
]

# Feedback
story += section("07 · Community", "Visitor Perspectives", "The Feedback page presents community responses alongside site-wide engagement statistics.")
stats = Table([
    [p("500+", "H2Royal"), p("4.8", "H2Royal"), p("10,000+", "H2Royal"), p("1,200+", "H2Royal")],
    [p("TOTAL REVIEWS", "TableBody"), p("AVERAGE RATING", "TableBody"), p("HAPPY VISITORS", "TableBody"), p("EVENTS HOSTED", "TableBody")],
], colWidths=[40.25 * mm] * 4)
stats.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, -1), PAPER),
    ("BOX", (0, 0), (-1, -1), .5, LINE),
    ("INNERGRID", (0, 0), (-1, -1), .35, LINE),
    ("ALIGN", (0, 0), (-1, -1), "CENTER"),
    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ("TOPPADDING", (0, 0), (-1, -1), 9),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
]))
story += [stats, Spacer(1, 5 * mm)]
perspectives = [
    ("Durga Puja", "A Kolkata visitor describes the rituals, decoration and community atmosphere as a deeply spiritual expression of Bengali culture."),
    ("Wedding ceremony", "A Mumbai visitor praises the architecture as a wedding backdrop and the staff’s support for Bengali traditions."),
    ("Classical music", "A Delhi cultural researcher highlights the heritage preservation, concert quality and venue acoustics."),
    ("Photography workshop", "A Kolkata participant values the instruction and the opportunity to study authentic heritage architecture."),
    ("Jagadhatri Puja", "A Bangalore visitor describes the rituals and community devotion as moving and evocative of childhood memories of Bengal."),
]
for title, body in perspectives:
    story += [card(title.upper(), body), Spacer(1, 2 * mm)]
story += [p("The website invites visitors to submit ratings, written feedback and optional photographs, subject to permission for promotional use."), *section_break()]

# Visit / contact
story += section("08 · Plan a visit", "Visitor Information & Contact Directory", "Contact details below reproduce the information displayed on the original Contact page.")
story += [
    p("Address", "H2Royal"), p("47, Pathuria Ghata Street<br/>Kolkata – 700006<br/>West Bengal, India"),
    p("Visiting hours", "H2Royal"), p("Daily, 6:00 AM–10:00 PM. The website notes that festival hours may be extended, group visits are welcome, and prior appointments are recommended. Heritage and guided tours are available by appointment."),
    p("Getting there", "H2Royal"), p("Near Sovabazar Metro Station. The Home page describes the property as approximately a five-minute walk from the metro and accessible by bus and car; parking is listed among available facilities."),
    p("Main contact", "H2Royal"),
    bullet("Email: councilofculture.ghoshbari47@gmail.com"),
    bullet("WhatsApp / Heritage Rental & Events: +91 98310 93021"),
    bullet("Cultural Programs: +91 99031 34231"),
    bullet("Religious Services: +91 62895 80889"),
    bullet("General inquiries: +91 98300 12950"),
    p("Additional phone numbers shown on the Contact page: +91 70038 56187 and +91 94328 93006. The page also identifies +91 99031 34231 for emergency assistance."),
    *section_break(),
]

# Sources
story += section("09 · Provenance", "Source Register", "Every factual statement in this compendium was curated from the following pages of the original Khelat Bhawan website, reviewed on 26 September 2026.")
for idx, (url, (label, detail)) in enumerate(zip(SOURCE_URLS, SOURCE_DETAILS), start=1):
    story += [card(f"{idx:02d} · {label}", f"{detail}<br/><font size='6.5'>{url}</font>"), Spacer(1, 1.2 * mm)]
story += [
    Spacer(1, 2 * mm),
    p("Accuracy & scope note", "H2Royal"),
    p("The original site contains a few inconsistencies between pages—for example, the Artist Nectar Council is dated 1985 on the About page while elsewhere it is labelled “2000+”. This compendium preserves that distinction rather than resolving it with outside information. Event dates, prices, visitor metrics and availability are reproduced as website-published information and may no longer be current. This is an editorially curated record, not an independent historical verification; no external historical sources, third-party articles or facts from the redesigned website were used to expand its claims."),
    Spacer(1, 5 * mm),
    HRFlowable(width=60 * mm, thickness=.8, color=GOLD, hAlign="CENTER", spaceAfter=4 * mm),
    p("KHELAT BHAWAN", "CoverKicker"),
    p("Preserving Bengali culture, music and devotion since 1845.", "QuoteRoyal"),
]


doc = HeritageDocTemplate(str(OUTPUT))
doc.build(story)
PUBLIC.write_bytes(OUTPUT.read_bytes())
print(OUTPUT)
print(PUBLIC)
