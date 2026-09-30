import json
from pathlib import Path

from PIL import Image as PILImage
from PIL import ImageDraw, ImageOps
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Flowable, Image as RLImage, KeepTogether, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


ROOT = Path(__file__).resolve().parents[1]
PROFILE_IMAGE = ROOT / "public" / "images" / "profile.jpg"
TMP_AVATAR = ROOT / "output" / "pdf" / "profile-avatar.png"
PORTFOLIO_DATA_FILE = ROOT / "src" / "data" / "portfolio-data.json"

OUTPUTS = {
    locale: {
        "designed_public": ROOT / "public" / "cv" / f"angjel-spasovski-cv-{locale}.pdf",
        "designed_copy": ROOT / "output" / "pdf" / f"angjel-spasovski-cv-{locale}.pdf",
        "ats_public": ROOT / "public" / "cv" / f"angjel-spasovski-ats-cv-{locale}.pdf",
        "ats_copy": ROOT / "output" / "pdf" / f"angjel-spasovski-ats-cv-{locale}.pdf",
    }
    for locale in ("en", "mk")
}


def register_document_fonts():
    candidates = [
        (Path("C:/Windows/Fonts/arial.ttf"), Path("C:/Windows/Fonts/arialbd.ttf"), Path("C:/Windows/Fonts/ariali.ttf")),
        (Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"), Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"), Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Oblique.ttf")),
        (Path("/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf"), Path("/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf"), Path("/usr/share/fonts/truetype/liberation2/LiberationSans-Italic.ttf")),
    ]
    for regular, bold, italic in candidates:
        if regular.exists() and bold.exists() and italic.exists():
            pdfmetrics.registerFont(TTFont("PortfolioSans", str(regular)))
            pdfmetrics.registerFont(TTFont("PortfolioSans-Bold", str(bold)))
            pdfmetrics.registerFont(TTFont("PortfolioSans-Italic", str(italic)))
            return "PortfolioSans", "PortfolioSans-Bold", "PortfolioSans-Italic"
    raise RuntimeError("A Unicode TrueType font is required to generate the localized CV files.")


FONT_REGULAR, FONT_BOLD, FONT_ITALIC = register_document_fonts()


BLUE = colors.HexColor("#5b7cfa")
INK = colors.HexColor("#101216")
MUTED = colors.HexColor("#5e6673")
LINE = colors.HexColor("#d9dee8")
SOFT = colors.HexColor("#f3f5f9")
CARD = colors.HexColor("#ffffff")
CHIP_BG = colors.HexColor("#eef2ff")
CHIP_LINE = colors.HexColor("#c7d2fe")

COPY = {
    "en": {
        "name": "ANGJEL SPASOVSKI",
        "role": "Software Engineer",
        "hero_summary": "Software Engineer with 10+ years of experience in web application development, frontend engineering, enterprise software products, and reliable user interfaces for complex business workflows.",
        "location": "Skopje, Macedonia",
        "page": "Page",
        "profile": "Profile",
        "experience": "Experience",
        "technical_stack": "Technical Stack",
        "projects": "Selected Projects",
        "certifications": "Certifications",
        "education_languages": "Education & Languages",
        "professional_summary": "Professional Summary",
        "technical_skills": "Technical Skills",
        "professional_experience": "Professional Experience",
        "education": "Education",
        "languages": "Languages",
        "skills": "Skills",
        "contribution": "Contribution",
        "outcome": "Outcome",
        "technologies": "Technologies",
        "education_line": "<b>BSc Computer Science</b>, UKIM | <b>Languages:</b> English, Macedonian",
        "education_ats": "BSc Computer Science | UKIM",
        "languages_ats": "English, Macedonian",
    },
    "mk": {
        "name": "АНЃЕЛ СПАСОВСКИ",
        "role": "Софтверски инженер",
        "hero_summary": "Софтверски инженер со 10+ години искуство во развој на веб-апликации, frontend инженеринг, enterprise производи и стабилни кориснички интерфејси за сложени деловни процеси.",
        "location": "Скопје, Македонија",
        "page": "Страница",
        "profile": "Профил",
        "experience": "Работно искуство",
        "technical_stack": "Технички стек",
        "projects": "Избрани проекти",
        "certifications": "Сертификати",
        "education_languages": "Образование и јазици",
        "professional_summary": "Професионален профил",
        "technical_skills": "Технички вештини",
        "professional_experience": "Работно искуство",
        "education": "Образование",
        "languages": "Јазици",
        "skills": "Вештини",
        "contribution": "Придонес",
        "outcome": "Резултат",
        "technologies": "Технологии",
        "education_line": "<b>Дипломиран инженер по информатика</b>, УКИМ | <b>Јазици:</b> англиски, македонски",
        "education_ats": "Дипломиран инженер по информатика | УКИМ",
        "languages_ats": "Англиски, македонски",
    },
}


class Rule(Flowable):
    def __init__(self, color=LINE, width=1):
        super().__init__()
        self.color = color
        self.width = width
        self.height = 1

    def draw(self):
        self.canv.setStrokeColor(self.color)
        self.canv.setLineWidth(self.width)
        self.canv.line(0, 0, self._availableWidth, 0)

    def wrap(self, available_width, available_height):
        self._availableWidth = available_width
        return available_width, self.height


class ContactChips(Flowable):
    def __init__(self, rows):
        super().__init__()
        self.rows = rows
        self.row_height = 7.4 * mm
        self.row_gap = 2.1 * mm

    def wrap(self, available_width, available_height):
        self.width = available_width
        self.height = len(self.rows) * self.row_height + (len(self.rows) - 1) * self.row_gap
        return self.width, self.height

    def draw(self):
        y = self.height - self.row_height
        self.canv.setFont(FONT_BOLD, 7.6)
        for row in self.rows:
            x = 0
            for text, width, url in row:
                self.canv.setFillColor(CHIP_BG)
                self.canv.setStrokeColor(CHIP_LINE)
                self.canv.setLineWidth(0.7)
                self.canv.roundRect(x, y, width, self.row_height, 3.4 * mm, stroke=1, fill=1)
                self.canv.setFillColor(BLUE)
                self.canv.drawString(x + 2.8 * mm, y + 2.45 * mm, text)
                self.canv.linkURL(url, (x, y, x + width, y + self.row_height), relative=1)
                x += width + 2.4 * mm
            y -= self.row_height + self.row_gap


def paragraph(text, style):
    return Paragraph(text, style)


def section(title):
    return [
        Spacer(1, 2.5 * mm),
        paragraph(title.upper(), STYLES["section_label"]),
        Spacer(1, 1 * mm),
        Rule(),
        Spacer(1, 1.5 * mm),
    ]


def tag_table(items):
    return paragraph(" / ".join(items), STYLES["tags"])


def build_avatar():
    TMP_AVATAR.parent.mkdir(parents=True, exist_ok=True)
    with PILImage.open(PROFILE_IMAGE) as image:
        image = ImageOps.exif_transpose(image).convert("RGB")
        width, height = image.size
        side = min(width, height)
        left = (width - side) // 2
        top = int((height - side) * 0.18)
        image = image.crop((left, top, left + side, top + side))
        image = image.resize((360, 360), PILImage.Resampling.LANCZOS)
        mask = PILImage.new("L", image.size, 0)
        draw = ImageDraw.Draw(mask)
        draw.ellipse((0, 0, image.size[0] - 1, image.size[1] - 1), fill=255)
        output = PILImage.new("RGBA", image.size, (255, 255, 255, 0))
        output.paste(image, (0, 0), mask)
        background = PILImage.new("RGB", output.size, "white")
        background.paste(output, mask=output.split()[3])
        background.save(TMP_AVATAR, optimize=True, quality=82)
    return TMP_AVATAR


def hero_block(locale):
    copy = COPY[locale]
    avatar_path = build_avatar()
    text_content = [
        paragraph(copy["name"], STYLES["name"]),
        Spacer(1, 3.2 * mm),
        paragraph(copy["role"], STYLES["role"]),
        Spacer(1, 3 * mm),
        paragraph(copy["hero_summary"], STYLES["summary"]),
    ]
    avatar = RLImage(str(avatar_path), width=24 * mm, height=24 * mm)
    layout = Table([[text_content, avatar]], colWidths=[129 * mm, 25 * mm])
    layout.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
                ("ALIGN", (1, 0), (1, 0), "RIGHT"),
            ]
        )
    )
    return [
        layout,
        Spacer(1, 4 * mm),
        ContactChips(
            [
                [
                    ("angjel.spasovski@gmail.com", 49 * mm, "mailto:angjel.spasovski@gmail.com"),
                    ("github.com/AngjelSpasovski", 52 * mm, "https://github.com/AngjelSpasovski"),
                    ("linkedin.com/in/angjel-spasovski", 56 * mm, "https://www.linkedin.com/in/angjel-spasovski/"),
                ],
            ]
        ),
        Spacer(1, 5 * mm),
    ]


def experience_card(item):
    header = Table(
        [
            [
                paragraph(f"<b>{item['role']}</b><br/><font color='#5b7cfa'>{item['company']}</font>", STYLES["body"]),
                paragraph(
                    f"<b>{item['period']}</b><br/>"
                    f"{item['employment_type'] + '<br/>' if item['employment_type'] else ''}"
                    f"{item['location']}",
                    STYLES["meta_right"],
                ),
            ]
        ],
        colWidths=[105 * mm, 49 * mm],
    )
    header.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    content = [
        header,
        Spacer(1, 1.2 * mm),
        paragraph(item["summary"], STYLES["body_muted"]),
        Spacer(1, 1.2 * mm),
        tag_table(item["tags"]),
    ]
    card = Table([[content]], colWidths=[162 * mm])
    card.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), CARD),
                ("LINEBELOW", (0, 0), (-1, -1), 0.5, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 1.4 * mm),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1.8 * mm),
            ]
        )
    )
    return KeepTogether([card, Spacer(1, 1 * mm)])


def project_card(item):
    link = (
        f"<br/><link href='{item['href']}' color='#5b7cfa'>{item['href']}</link>"
        if item.get("href")
        else ""
    )
    content = [
        paragraph(f"<b>{item['title']}</b> - {item['type']}{link}", STYLES["body"]),
        Spacer(1, 1 * mm),
        paragraph(item["description"], STYLES["body_muted"]),
        Spacer(1, 1 * mm),
        tag_table(item["stack"]),
    ]
    card = Table([[content]], colWidths=[162 * mm])
    card.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), SOFT),
                ("BOX", (0, 0), (-1, -1), 0.5, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 3.5 * mm),
                ("RIGHTPADDING", (0, 0), (-1, -1), 3.5 * mm),
                ("TOPPADDING", (0, 0), (-1, -1), 2 * mm),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 2 * mm),
            ]
        )
    )
    return KeepTogether([card, Spacer(1, 1 * mm)])


def make_header(locale):
    copy = COPY[locale]

    def header(canvas, doc):
        canvas.saveState()
        canvas.setFillColor(INK)
        canvas.setFont(FONT_BOLD, 9)
        canvas.drawString(24 * mm, 282 * mm, "Angjel Spasovski")
        canvas.setFillColor(CHIP_BG)
        canvas.setStrokeColor(CHIP_LINE)
        canvas.setLineWidth(0.7)
        canvas.roundRect(56 * mm, 279.2 * mm, 39 * mm, 7.2 * mm, 3.2 * mm, stroke=1, fill=1)
        canvas.setFillColor(BLUE)
        canvas.setFont(FONT_BOLD, 7.2)
        canvas.drawString(59 * mm, 281.55 * mm, copy["location"])
        canvas.setFillColor(MUTED)
        canvas.setFont(FONT_REGULAR, 8)
        canvas.drawRightString(186 * mm, 282 * mm, f"{copy['page']} {doc.page}")
        canvas.setStrokeColor(LINE)
        canvas.line(24 * mm, 278 * mm, 186 * mm, 278 * mm)
        canvas.restoreState()

    return header


def build_designed_cv(locale):
    copy = COPY[locale]
    data = document_data(locale)
    output_public = OUTPUTS[locale]["designed_public"]
    output_copy = OUTPUTS[locale]["designed_copy"]
    output_public.parent.mkdir(parents=True, exist_ok=True)
    output_copy.parent.mkdir(parents=True, exist_ok=True)

    doc = SimpleDocTemplate(
        str(output_public),
        pagesize=A4,
        rightMargin=24 * mm,
        leftMargin=24 * mm,
        topMargin=22 * mm,
        bottomMargin=12 * mm,
        title=f"Angjel Spasovski CV ({locale.upper()})",
        author="Angjel Spasovski",
    )

    story = []
    story.extend(hero_block(locale))

    story.extend(section(copy["profile"]))
    for index, profile_paragraph in enumerate(data["profile"]):
        story.append(paragraph(profile_paragraph, STYLES["body_muted"]))
        if index < len(data["profile"]) - 1:
            story.append(Spacer(1, 1.5 * mm))

    story.extend(section(copy["experience"]))
    for item in data["experience"]:
        story.append(experience_card(item))

    story.extend(section(copy["technical_stack"]))
    for group, items in data["skills"]:
        story.append(paragraph(f"<b>{group}</b>", STYLES["body"]))
        story.append(Spacer(1, 0.5 * mm))
        story.append(tag_table(items))
        story.append(Spacer(1, 1.2 * mm))

    story.extend(section(copy["projects"]))
    for item in data["projects"]:
        story.append(project_card(item))

    story.extend(section(copy["certifications"]))
    for cert in data["certifications"]:
        story.append(paragraph(f"<b>{cert['title']}</b> - {cert['issuer']} ({cert['date']})", STYLES["body_muted"]))
        story.append(Spacer(1, 0.8 * mm))

    story.extend(section(copy["education_languages"]))
    story.append(
        paragraph(
            copy["education_line"],
            STYLES["body_muted"],
        )
    )

    header = make_header(locale)
    doc.build(story, onFirstPage=header, onLaterPages=header)
    output_copy.write_bytes(output_public.read_bytes())
    print(output_public)
    print(output_copy)


def ats_section(story, title):
    story.append(Spacer(1, 3.5 * mm))
    story.append(paragraph(title.upper(), ATS_STYLES["section"]))
    story.append(Rule(color=INK, width=0.8))
    story.append(Spacer(1, 2 * mm))


def make_ats_footer(locale):
    copy = COPY[locale]

    def ats_footer(canvas, doc):
        canvas.saveState()
        canvas.setFillColor(MUTED)
        canvas.setFont(FONT_REGULAR, 7.5)
        canvas.drawRightString(190 * mm, 8 * mm, f"Angjel Spasovski | {copy['page']} {doc.page}")
        canvas.restoreState()

    return ats_footer


def build_ats_cv(locale):
    copy = COPY[locale]
    data = document_data(locale)
    output_public = OUTPUTS[locale]["ats_public"]
    output_copy = OUTPUTS[locale]["ats_copy"]
    output_public.parent.mkdir(parents=True, exist_ok=True)
    output_copy.parent.mkdir(parents=True, exist_ok=True)

    doc = SimpleDocTemplate(
        str(output_public),
        pagesize=A4,
        rightMargin=20 * mm,
        leftMargin=20 * mm,
        topMargin=16 * mm,
        bottomMargin=15 * mm,
        title=f"Angjel Spasovski ATS CV ({locale.upper()})",
        author="Angjel Spasovski",
        subject="Software Engineer CV",
    )

    story = [
        paragraph(copy["name"], ATS_STYLES["name"]),
        paragraph(copy["role"], ATS_STYLES["role"]),
        Spacer(1, 2 * mm),
        paragraph(
            f"{copy['location']} | angjel.spasovski@gmail.com | "
            "<link href='https://github.com/AngjelSpasovski'>github.com/AngjelSpasovski</link> | "
            "<link href='https://www.linkedin.com/in/angjel-spasovski/'>linkedin.com/in/angjel-spasovski</link>",
            ATS_STYLES["contact"],
        ),
    ]

    ats_section(story, copy["professional_summary"])
    for profile_paragraph in data["profile"]:
        story.append(paragraph(profile_paragraph, ATS_STYLES["body"]))
        story.append(Spacer(1, 1 * mm))

    ats_section(story, copy["technical_skills"])
    for group, items in data["skills"]:
        story.append(paragraph(f"<b>{group}:</b> {', '.join(items)}", ATS_STYLES["body"]))
        story.append(Spacer(1, 1 * mm))

    ats_section(story, copy["professional_experience"])
    for item in data["experience"]:
        employment_type = f" | {item['employment_type']}" if item["employment_type"] else ""
        story.append(KeepTogether([
            paragraph(f"<b>{item['role']} | {item['company']}</b>", ATS_STYLES["heading"]),
            paragraph(f"{item['period']}{employment_type} | {item['location']}", ATS_STYLES["meta"]),
            paragraph(item["summary"], ATS_STYLES["body"]),
            paragraph(f"<b>{copy['skills']}:</b> {', '.join(item['tags'])}", ATS_STYLES["body"]),
            Spacer(1, 2.5 * mm),
        ]))

    ats_section(story, copy["projects"])
    for item in data["projects"]:
        link = f" | <link href='{item['href']}'>{item['href']}</link>" if item.get("href") else ""
        story.append(KeepTogether([
            paragraph(f"<b>{item['title']}</b> | {item['type']}{link}", ATS_STYLES["heading"]),
            paragraph(item["description"], ATS_STYLES["body"]),
            paragraph(f"<b>{copy['contribution']}:</b> {item['contribution']}", ATS_STYLES["body"]),
            paragraph(f"<b>{copy['outcome']}:</b> {item['outcome']}", ATS_STYLES["body"]),
            paragraph(f"<b>{copy['technologies']}:</b> {', '.join(item['ats_stack'])}", ATS_STYLES["body"]),
            Spacer(1, 2.5 * mm),
        ]))

    ats_section(story, copy["education"])
    story.append(paragraph(copy["education_ats"], ATS_STYLES["body"]))

    ats_section(story, copy["certifications"])
    for cert in data["certifications"]:
        story.append(paragraph(f"{cert['title']} | {cert['issuer']} | {cert['date']}", ATS_STYLES["body"]))

    ats_section(story, copy["languages"])
    story.append(paragraph(copy["languages_ats"], ATS_STYLES["body"]))

    ats_footer = make_ats_footer(locale)
    doc.build(story, onFirstPage=ats_footer, onLaterPages=ats_footer)
    output_copy.write_bytes(output_public.read_bytes())
    print(output_public)
    print(output_copy)


BASE_STYLES = getSampleStyleSheet()
STYLES = {
    "name": ParagraphStyle(
        "name",
        parent=BASE_STYLES["Title"],
        fontName=FONT_BOLD,
        fontSize=27,
        leading=30,
        textColor=INK,
        spaceAfter=2,
        alignment=0,
    ),
    "role": ParagraphStyle(
        "role",
        parent=BASE_STYLES["Normal"],
        fontName=FONT_BOLD,
        fontSize=12,
        leading=16,
        textColor=BLUE,
    ),
    "summary": ParagraphStyle(
        "summary",
        parent=BASE_STYLES["Normal"],
        fontName=FONT_REGULAR,
        fontSize=10.5,
        leading=16,
        textColor=INK,
    ),
    "contact": ParagraphStyle(
        "contact",
        parent=BASE_STYLES["Normal"],
        fontName=FONT_BOLD,
        fontSize=8.5,
        leading=12,
        textColor=MUTED,
    ),
    "section_label": ParagraphStyle(
        "section_label",
        parent=BASE_STYLES["Normal"],
        fontName=FONT_BOLD,
        fontSize=8.5,
        leading=11,
        textColor=BLUE,
        charSpace=2,
    ),
    "body": ParagraphStyle(
        "body",
        parent=BASE_STYLES["Normal"],
        fontName=FONT_REGULAR,
        fontSize=9,
        leading=12.2,
        textColor=INK,
    ),
    "body_muted": ParagraphStyle(
        "body_muted",
        parent=BASE_STYLES["Normal"],
        fontName=FONT_REGULAR,
        fontSize=8.8,
        leading=12,
        textColor=MUTED,
    ),
    "meta_right": ParagraphStyle(
        "meta_right",
        parent=BASE_STYLES["Normal"],
        fontName=FONT_REGULAR,
        fontSize=8.2,
        leading=11,
        alignment=2,
        textColor=MUTED,
    ),
    "tags": ParagraphStyle(
        "tags",
        parent=BASE_STYLES["Normal"],
        fontName=FONT_BOLD,
        fontSize=7.4,
        leading=9.4,
        textColor=BLUE,
    ),
}

ATS_STYLES = {
    "name": ParagraphStyle(
        "ats_name",
        parent=BASE_STYLES["Title"],
        fontName=FONT_BOLD,
        fontSize=22,
        leading=25,
        textColor=INK,
        alignment=0,
        spaceAfter=2,
    ),
    "role": ParagraphStyle(
        "ats_role",
        parent=BASE_STYLES["Normal"],
        fontName=FONT_BOLD,
        fontSize=12,
        leading=15,
        textColor=INK,
    ),
    "contact": ParagraphStyle(
        "ats_contact",
        parent=BASE_STYLES["Normal"],
        fontName=FONT_REGULAR,
        fontSize=8.5,
        leading=12,
        textColor=INK,
    ),
    "section": ParagraphStyle(
        "ats_section",
        parent=BASE_STYLES["Normal"],
        fontName=FONT_BOLD,
        fontSize=10,
        leading=13,
        textColor=INK,
        spaceAfter=1.2 * mm,
    ),
    "heading": ParagraphStyle(
        "ats_heading",
        parent=BASE_STYLES["Normal"],
        fontName=FONT_BOLD,
        fontSize=9.5,
        leading=12.5,
        textColor=INK,
    ),
    "meta": ParagraphStyle(
        "ats_meta",
        parent=BASE_STYLES["Normal"],
        fontName=FONT_ITALIC,
        fontSize=8.5,
        leading=11,
        textColor=MUTED,
        spaceAfter=0.8 * mm,
    ),
    "body": ParagraphStyle(
        "ats_body",
        parent=BASE_STYLES["Normal"],
        fontName=FONT_REGULAR,
        fontSize=8.7,
        leading=11.6,
        textColor=INK,
    ),
}


with PORTFOLIO_DATA_FILE.open(encoding="utf-8") as data_file:
    PORTFOLIO_DATA = json.load(data_file)

def document_data(locale):
    date_prefix = "Issued " if locale == "en" else "Издадено "
    return {
        "profile": PORTFOLIO_DATA["profile"]["summary"][locale],
        "experience": [
            {
                "role": item["role"][locale],
                "company": item["company"],
                "current": item["current"],
                "employment_type": item.get("employmentType", {}).get(locale),
                "period": item["period"][locale],
                "location": item["location"][locale],
                "summary": item["summary"][locale],
                "tags": item["tags"],
            }
            for item in PORTFOLIO_DATA["experience"]
        ],
        "skills": [
            (group["title"][locale], group["items"][locale])
            for group in PORTFOLIO_DATA["skills"]
        ],
        "projects": [
            {
                "title": item["title"],
                "type": item["type"][locale],
                "href": item.get("links", {}).get("live") or item.get("links", {}).get("repository"),
                "description": item["summary"][locale],
                "contribution": item["caseStudy"]["contribution"][locale],
                "outcome": item["caseStudy"]["outcome"][locale],
                "stack": item["featuredTechnologies"],
                "ats_stack": item.get("cvTechnologies", item["featuredTechnologies"]),
            }
            for item in sorted(
                PORTFOLIO_DATA["projects"],
                key=lambda project: (not project["current"], project["sortOrder"]),
            )
            if item["status"] == "published" and item["featured"]
        ],
        "certifications": [
            {
                "title": item["title"],
                "issuer": item["issuer"],
                "date": item["date"][locale].removeprefix(date_prefix),
            }
            for item in sorted(
                PORTFOLIO_DATA["certifications"],
                key=lambda certification: certification["issuedYear"],
                reverse=True,
            )[:5]
        ],
    }


if __name__ == "__main__":
    for locale in ("en", "mk"):
        build_designed_cv(locale)
        build_ats_cv(locale)
    TMP_AVATAR.unlink(missing_ok=True)
