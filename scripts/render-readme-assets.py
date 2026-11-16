"""Render INSIGHT README images with headless Edge/Chrome.

Usage:
    python scripts/render-readme-assets.py

Steps:
1. Starts a temporary local HTTP server on port 5522 serving dist/ and .github/assets/src/.
2. Captures screenshots into .github/assets/src/shots/:
   - Desktop homepage (1440x900 at 2x)
   - Mobile Welcome Day gallery (390x844 at 2x)
3. Renders .github/assets/src/{banner,stats,preview}.html at 2x with transparent background.
4. Generates optimized WebP assets in .github/assets/:
   - banner.webp (1760px wide)
   - stats.webp (1760px wide)
   - preview.webp (1760px wide)
"""
import http.server
import os
import shutil
import socketserver
import subprocess
import sys
import tempfile
import threading
import time
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / ".github" / "assets" / "src"
OUT = ROOT / ".github" / "assets"
DIST = ROOT / "dist"
PORT = 5522
SITE = f"http://127.0.0.1:{PORT}"

CANDIDATES = [
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "google-chrome",
    "chromium",
]


def find_browser() -> str:
    for c in CANDIDATES:
        if Path(c).exists() or shutil.which(c):
            return c
    sys.exit("No Chrome or Edge binary found.")


class DualHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path: str) -> str:
        # Strip query and fragments
        clean = path.split("?", 1)[0].split("#", 1)[0]
        if clean.startswith("/.github/assets/src/"):
            rel = clean[len("/.github/assets/src/"):]
            return str(SRC / rel)
        # Default: serve from dist/
        rel = clean.lstrip("/")
        target = DIST / rel
        if target.is_dir():
            target = target / "index.html"
        return str(target)

    def log_message(self, format, *args):
        pass  # Quiet logging


def start_server() -> socketserver.TCPServer:
    socketserver.TCPServer.allow_reuse_address = True
    httpd = socketserver.TCPServer(("127.0.0.1", PORT), DualHandler)
    server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    server_thread.start()
    return httpd


def shoot(url: str, out: Path, width: int, height: int, transparent: bool = False, mobile: bool = False, delay_ms: int = 5000) -> None:
    with tempfile.TemporaryDirectory() as profile:
        args = [
            find_browser(),
            "--headless=new",
            f"--user-data-dir={profile}",
            "--hide-scrollbars",
            "--force-device-scale-factor=2",
            f"--window-size={width},{height}",
            f"--virtual-time-budget={delay_ms}",
            f"--screenshot={out}",
        ]
        if transparent:
            args.append("--default-background-color=00000000")
        if mobile:
            args.append(
                "--user-agent=Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) "
                "AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
            )
        args.append(url)
        subprocess.run(args, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=120)
    print(f"  [+] Captured: {out.name} ({width}x{height})")


def to_webp(png: Path, name: str, width: int = 1760) -> None:
    img = Image.open(png).convert("RGBA")
    aspect = img.height / img.width
    new_h = round(width * aspect)
    img = img.resize((width, new_h), Image.LANCZOS)
    dest = OUT / name
    img.save(dest, "WEBP", quality=90, method=6)
    size_kb = dest.stat().st_size // 1024
    print(f"  [✓] Built WebP: {dest.relative_to(ROOT)} ({img.width}x{img.height}, {size_kb} KB)")


def main() -> None:
    print("[1/4] Starting local preview server...")
    httpd = start_server()
    time.sleep(1)

    shots_dir = SRC / "shots"
    shots_dir.mkdir(parents=True, exist_ok=True)
    OUT.mkdir(parents=True, exist_ok=True)

    try:
        print("[2/4] Capturing high-resolution website screenshots...")
        # 1. Desktop Homepage
        desktop_shot = shots_dir / "desktop-home.png"
        shoot(f"{SITE}/", desktop_shot, 1440, 900, delay_ms=5000)

        # 2. Mobile Research Compass
        mobile_shot = shots_dir / "mobile-gallery.png"
        shoot(
            f"{SITE}/.github/assets/src/shot-frame.html?u=/research/&w=390&h=844",
            mobile_shot,
            500,
            844,
            mobile=True,
            delay_ms=6000,
        )
        # Crop to the exact 390x844 frame (at 2x scale: 780x1688)
        img = Image.open(mobile_shot)
        img.crop((0, 0, 390 * 2, 844 * 2)).save(mobile_shot)
        print(f"  [✓] Cropped mobile frame: {mobile_shot.name} (780x1688)")

        print("[3/4] Rendering showcase stages at 2x...")
        with tempfile.TemporaryDirectory() as tmp:
            tmp_path = Path(tmp)
            stages = {
                "banner": (1280, 440),
                "stats": (1280, 300),
                "preview": (1280, 740),
            }
            for name, (w, h) in stages.items():
                stage_html = SRC / f"{name}.html"
                png_out = tmp_path / f"{name}.png"
                print(f"  Rendering {name}.html ({w}x{h})...")
                shoot(stage_html.as_uri(), png_out, w, h, transparent=True, delay_ms=4000)
                to_webp(png_out, f"{name}.webp", width=1760)

        print("[4/4] Asset generation complete! All assets saved to .github/assets/")

    finally:
        httpd.shutdown()


if __name__ == "__main__":
    main()
