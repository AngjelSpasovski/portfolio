import json
from pathlib import Path

from PIL import Image as PILImage
from PIL import ImageDraw, ImageOps
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import Flowable, Image as RLImage, KeepTogether, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_PUBLIC = ROOT / "public" / "cv" / "angjel-spasovski-cv.pdf"
OUTPUT_COPY = ROOT / "output" / "pdf" / "angjel-spasovski-cv.pdf"
PROFILE_IMAGE = ROOT / "public" / "images" / "profile.jpg"
TMP_AVATAR = ROOT / "output" / "pdf" / "profile-avatar.png"
PORTFOLIO_DATA_FILE = ROOT / "src" / "data" / "portfolio-data.json"


BLUE = colors.HexColor("#5b7cfa")
INK = colors.HexColor("#101216")
MUTED = colors.HexColor("#5e6673")
LINE = colors.HexColor("#d9dee8")
SOFT = colors.HexColor("#f3f5f9")
CARD = colors.HexColor("#ffffff")
CHIP_BG = colors.HexColor("#eef2ff")
CHIP_LINE = colors.HexColor("#c7d2fe")


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
        self.canv.setFont("Helvetica-Bold", 7.6)
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
        Spacer(1, 5 * mm),
        paragraph(title.upper(), STYLES["section_label"]),
        Spacer(1, 1.5 * mm),
        Rule(),
        Spacer(1, 2.5 * mm),
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


def hero_block():
    avatar_path = build_avatar()
    text_content = [
        paragraph("ANGJEL SPASOVSKI", STYLES["name"]),
        Spacer(1, 3.2 * mm),
        paragraph("Software Engineer", STYLES["role"]),
        Spacer(1, 3 * mm),
        paragraph(
            "Software Engineer with 10+ years of experience in web application development, frontend engineering, enterprise software products, and reliable user interfaces for complex business workflows.",
            STYLES["summary"],
        ),
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
                paragraph(f"<b>{item['period']}</b><br/>{item['location']}", STYLES["meta_right"]),
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
                ("TOPPADDING", (0, 0), (-1, -1), 1.8 * mm),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 2.2 * mm),
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
        Spacer(1, 1.5 * mm),
        paragraph(item["description"], STYLES["body_muted"]),
        Spacer(1, 1.5 * mm),
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
                ("TOPPADDING", (0, 0), (-1, -1), 3 * mm),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3 * mm),
            ]
        )
    )
    return KeepTogether([card, Spacer(1, 2 * mm)])


def header(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(INK)
    canvas.setFont("Helvetica-Bold", 9)
    canvas.drawString(24 * mm, 282 * mm, "Angjel Spasovski")
    canvas.setFillColor(CHIP_BG)
    canvas.setStrokeColor(CHIP_LINE)
    canvas.setLineWidth(0.7)
    canvas.roundRect(56 * mm, 279.2 * mm, 36 * mm, 7.2 * mm, 3.2 * mm, stroke=1, fill=1)
    canvas.setFillColor(BLUE)
    canvas.setFont("Helvetica-Bold", 7.2)
    canvas.drawString(59 * mm, 281.55 * mm, "Skopje, Macedonia")
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 8)
    canvas.drawRightString(186 * mm, 282 * mm, f"Page {doc.page}")
    canvas.setStrokeColor(LINE)
    canvas.line(24 * mm, 278 * mm, 186 * mm, 278 * mm)
    canvas.restoreState()


def build():
    OUTPUT_PUBLIC.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_COPY.parent.mkdir(parents=True, exist_ok=True)

    doc = SimpleDocTemplate(
        str(OUTPUT_PUBLIC),
        pagesize=A4,
        rightMargin=24 * mm,
        leftMargin=24 * mm,
        topMargin=22 * mm,
        bottomMargin=15 * mm,
        title="Angjel Spasovski CV",
        author="Angjel Spasovski",
    )

    story = []
    story.extend(hero_block())

    story.extend(section("Profile"))
    story.append(
        paragraph(
            "Recent work has focused on Opera MES, a Manufacturing Execution System for manufacturing operations, with contributions across frontend development, software design, product maintenance, usability, performance, and complex production workflows.",
            STYLES["body_muted"],
        )
    )
    story.append(Spacer(1, 1.5 * mm))
    story.append(
        paragraph(
            "Previous product work includes ArkCase and Move One, with hands-on experience in JavaScript interfaces, CSS, forms, modals, UI maintenance, bug fixing, and long-running enterprise applications.",
            STYLES["body_muted"],
        )
    )

    story.extend(section("Experience"))
    for item in EXPERIENCE:
        story.append(experience_card(item))

    story.extend(section("Technical Stack"))
    for group, items in SKILLS:
        story.append(paragraph(f"<b>{group}</b>", STYLES["body"]))
        story.append(Spacer(1, 0.8 * mm))
        story.append(tag_table(items))
        story.append(Spacer(1, 1.8 * mm))

    story.extend(section("Selected Projects"))
    for item in PROJECTS:
        story.append(project_card(item))

    story.extend(section("Certifications"))
    for cert in CERTIFICATIONS:
        story.append(paragraph(f"<b>{cert['title']}</b> - {cert['issuer']} ({cert['date']})", STYLES["body_muted"]))
        story.append(Spacer(1, 0.8 * mm))

    story.extend(section("Education & Languages"))
    story.append(paragraph("<b>BSc Computer Science</b>, UKIM", STYLES["body_muted"]))
    story.append(Spacer(1, 1.5 * mm))
    story.append(paragraph("<b>Languages:</b> English, Macedonian", STYLES["body_muted"]))

    doc.build(story, onFirstPage=header, onLaterPages=header)
    OUTPUT_COPY.write_bytes(OUTPUT_PUBLIC.read_bytes())
    TMP_AVATAR.unlink(missing_ok=True)
    print(OUTPUT_PUBLIC)
    print(OUTPUT_COPY)


BASE_STYLES = getSampleStyleSheet()
STYLES = {
    "name": ParagraphStyle(
        "name",
        parent=BASE_STYLES["Title"],
        fontName="Helvetica-Bold",
        fontSize=27,
        leading=30,
        textColor=INK,
        spaceAfter=2,
        alignment=0,
    ),
    "role": ParagraphStyle(
        "role",
        parent=BASE_STYLES["Normal"],
        fontName="Helvetica-Bold",
        fontSize=12,
        leading=16,
        textColor=BLUE,
    ),
    "summary": ParagraphStyle(
        "summary",
        parent=BASE_STYLES["Normal"],
        fontName="Helvetica",
        fontSize=10.5,
        leading=16,
        textColor=INK,
    ),
    "contact": ParagraphStyle(
        "contact",
        parent=BASE_STYLES["Normal"],
        fontName="Helvetica-Bold",
        fontSize=8.5,
        leading=12,
        textColor=MUTED,
    ),
    "section_label": ParagraphStyle(
        "section_label",
        parent=BASE_STYLES["Normal"],
        fontName="Helvetica-Bold",
        fontSize=8.5,
        leading=11,
        textColor=BLUE,
        charSpace=2,
    ),
    "body": ParagraphStyle(
        "body",
        parent=BASE_STYLES["Normal"],
        fontName="Helvetica",
        fontSize=9,
        leading=12.2,
        textColor=INK,
    ),
    "body_muted": ParagraphStyle(
        "body_muted",
        parent=BASE_STYLES["Normal"],
        fontName="Helvetica",
        fontSize=8.8,
        leading=12,
        textColor=MUTED,
    ),
    "meta_right": ParagraphStyle(
        "meta_right",
        parent=BASE_STYLES["Normal"],
        fontName="Helvetica",
        fontSize=8.2,
        leading=11,
        alignment=2,
        textColor=MUTED,
    ),
    "tags": ParagraphStyle(
        "tags",
        parent=BASE_STYLES["Normal"],
        fontName="Helvetica-Bold",
        fontSize=7.4,
        leading=9.4,
        textColor=BLUE,
    ),
}


with PORTFOLIO_DATA_FILE.open(encoding="utf-8") as data_file:
    PORTFOLIO_DATA = json.load(data_file)

EXPERIENCE = [
    {
        "role": item["role"]["en"],
        "company": item["company"],
        "period": item["period"]["en"],
        "location": item["location"]["en"],
        "summary": item["summary"]["en"],
        "tags": item["tags"],
    }
    for item in PORTFOLIO_DATA["experience"]
]

SKILLS = [
    (group["title"]["en"], group["items"]["en"])
    for group in PORTFOLIO_DATA["skills"]
]

PROJECTS = [
    {
        "title": item["title"],
        "type": item["type"]["en"],
        "href": item.get("links", {}).get("live") or item.get("links", {}).get("repository"),
        "description": item["summary"]["en"],
        "stack": item["featuredTechnologies"],
    }
    for item in sorted(PORTFOLIO_DATA["projects"], key=lambda project: project["sortOrder"])
    if item["status"] == "published" and item["featured"]
]

CERTIFICATIONS = [
    {
        "title": item["title"],
        "issuer": item["issuer"],
        "date": item["date"]["en"].removeprefix("Issued "),
    }
    for item in PORTFOLIO_DATA["certifications"]
    if item["featured"]
]


if __name__ == "__main__":
    build()
