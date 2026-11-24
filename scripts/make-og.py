"""Render the social preview images (Open Graph / Twitter cards), 1200x630.

Usage: python scripts/make-og.py [card_name...]

Inspired by Rasa Website, adapted for INSIGHT Research Club.
Each card is scripts/og/card.html filled with parameters and rendered at 1200x630 with
headless Chrome/Edge, then saved as public/og/<name>.jpg (and public/brand/og-default.jpg).
"""
import shutil
import subprocess
import sys
import tempfile
import time
from pathlib import Path
from urllib.parse import urlencode

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
TEMPLATE = ROOT / "scripts" / "og" / "card.html"
OUT = ROOT / "public" / "og"

CARDS = {
    "default": dict(
        title="INSIGHT Research Club",
        eyebrow="ESTIN Béjaïa · Season 2026/27",
        line="Where curiosity meets clarity. A student-led scientific research community.",
        img="public/brand/insight-logo.png",
        fit="contain",
        stat="4",
        statLabel="Research Poles",
    ),
    "about": dict(
        title="About INSIGHT",
        eyebrow="Club Charter & Vision",
        line="We read, question and contribute to science. Free and open to every student.",
        img="public/events/welcome-day-2026/live.webp",
        stat="7",
        statLabel="Departments",
    ),
    "research": dict(
        title="Research Poles",
        eyebrow="Scientific Fleet · 2026/27",
        line="Where questions become discoveries. Four specialized research poles.",
        img="public/brand/insight-logo.png",
        fit="contain",
        stat="4",
        statLabel="Research Poles",
    ),
    "research-ai": dict(
        title="Artificial Intelligence",
        eyebrow="Research Pole 01",
        line="Trustworthy AI, adversarial robustness, model interpretability, and LLM safety.",
        img="public/crew/kaouche-malek.webp",
        stat="01",
        statLabel="AI Pole",
    ),
    "research-security": dict(
        title="Cybersecurity Systems",
        eyebrow="Research Pole 02",
        line="Cryptographic foundations, secure protocol design, and vulnerability analysis.",
        img="public/crew/belaloui-taha-abderrahmane.webp",
        stat="02",
        statLabel="Security Pole",
    ),
    "research-software": dict(
        title="Software Systems",
        eyebrow="Research Pole 03",
        line="Distributed architectures, high-performance computing, and formal verification.",
        img="public/crew/koua-mohamed-anis.webp",
        stat="03",
        statLabel="Software Pole",
    ),
    "research-networks": dict(
        title="Networks & Systems",
        eyebrow="Research Pole 04",
        line="Protocols, distributed consensus algorithms, edge resilience, and cloud networks.",
        img="public/brand/insight-logo.png",
        fit="contain",
        stat="04",
        statLabel="Networks Pole",
    ),
    "training": dict(
        title="Training Path",
        eyebrow="Rookie to Captain",
        line="Paper reading, scientific methodology, academic writing and technical workshops.",
        img="public/crew/sakhri-mohammed-firas.webp",
        stat="4",
        statLabel="Voyage Stages",
    ),
    "network": dict(
        title="Research Network",
        eyebrow="Global Scientific Network",
        line="Connecting our crew with international researchers, laboratories, and keynote speakers.",
        img="public/researchers/pin-yu-chen.png",
        stat="IBM",
        statLabel="Research Keynote",
    ),
    "crew": dict(
        title="Crew & Helm",
        eyebrow="Leadership · 2026/27",
        line="The Helm sets the course. Seven departments sail the ship.",
        img="public/crew/faci-souhaib-abdelouakil.webp",
        stat="25+",
        statLabel="Crew Members",
    ),
    "collaborate": dict(
        title="Collaborate With Us",
        eyebrow="Partnerships & Outreach",
        line="Five ways for researchers, professors, and laboratories to work with our crew.",
        img="public/crew/madaoui-sara.webp",
        stat="5",
        statLabel="Ways to Collaborate",
    ),
    "contact": dict(
        title="Contact INSIGHT",
        eyebrow="Direct Channels",
        line="Questions, guest talks, collaborations: write directly to the right department.",
        stat="48h",
        statLabel="Reply Time",
    ),
    "events": dict(
        title="Events & Keynotes",
        eyebrow="Logbook Archive",
        line="Scientific keynotes, workshops, paper readings, and competitions at ESTIN.",
        img="public/events/welcome-day-2026/cover.webp",
        stat="2026",
        statLabel="Season",
    ),
    "spark": dict(
        title="SPARK 2026",
        eyebrow="Research Foundations",
        line="Five hands-on modules: targeted paper selection, triage, reading, and scientific synthesis.",
        img="public/events/spark-2026/cover.webp",
        stat="5",
        statLabel="Workshops",
    ),
}

CANDIDATES = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "google-chrome",
    "chromium",
]


def get_browser() -> str:
    for c in CANDIDATES:
        if Path(c).exists() or shutil.which(c):
            return c
    sys.exit("No Chrome/Edge found. Install one or edit CANDIDATES.")


def render_card(name: str, params: dict, browser_bin: str) -> None:
    url = TEMPLATE.as_uri() + "?" + urlencode(params)
    with tempfile.TemporaryDirectory() as tmp:
        png = Path(tmp) / "card.png"
        subprocess.run(
            [
                browser_bin,
                "--headless=new",
                "--disable-gpu",
                f"--user-data-dir={Path(tmp) / 'profile'}",
                "--hide-scrollbars",
                "--force-device-scale-factor=1",
                "--window-size=1200,630",
                "--virtual-time-budget=8000",
                "--allow-file-access-from-files",
                f"--screenshot={png}",
                url,
            ],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            timeout=120,
        )
        for _ in range(60):
            if png.exists() and png.stat().st_size > 0:
                time.sleep(0.3)
                break
            time.sleep(0.5)

        dest = OUT / f"{name}.jpg"
        img_obj = Image.open(png).convert("RGB")
        img_obj.save(dest, "JPEG", quality=88, optimize=True, progressive=True)

        if name == "default":
            brand_dest = ROOT / "public" / "brand" / "og-default.jpg"
            brand_dest.parent.mkdir(parents=True, exist_ok=True)
            img_obj.save(brand_dest, "JPEG", quality=88, optimize=True, progressive=True)

    print(f"Generated: {dest.relative_to(ROOT)} ({dest.stat().st_size // 1024} KB)")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    browser_bin = get_browser()
    print(f"Using browser: {browser_bin}")
    only = set(sys.argv[1:])

    for name, params in CARDS.items():
        if not only or name in only:
            render_card(name, params, browser_bin)

    print("All OG images successfully generated.")


if __name__ == "__main__":
    main()
