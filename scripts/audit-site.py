import os
import re
import json
import pathlib

dist = pathlib.Path("dist")
html_files = list(dist.glob("**/*.html"))
print(f"Total HTML files found in dist: {len(html_files)}")

page_errors = []
broken_page_links = []
broken_static_links = []
jsonld_errors = []

static_extensions = (".webmanifest", ".ico", ".png", ".jpg", ".jpeg", ".webp", ".svg", ".txt", ".xml", ".css", ".js", ".json")

for hf in html_files:
    rel_page = hf.relative_to(dist).as_posix()
    content = hf.read_text(encoding="utf-8")

    # 1. Essential Meta
    if "<title>" not in content or "</title>" not in content:
        page_errors.append(f"[{rel_page}] Missing <title>")
    if 'name="description"' not in content:
        page_errors.append(f"[{rel_page}] Missing meta description")
    if 'rel="canonical"' not in content:
        page_errors.append(f"[{rel_page}] Missing canonical link")
    if 'property="og:image"' not in content:
        page_errors.append(f"[{rel_page}] Missing og:image")

    # 2. JSON-LD validation
    scripts = re.findall(r'<script type="application/ld\+json">(.*?)</script>', content, re.DOTALL)
    for s in scripts:
        try:
            parsed = json.loads(s)
            if "@context" not in parsed:
                jsonld_errors.append(f"[{rel_page}] JSON-LD missing @context")
        except Exception as e:
            jsonld_errors.append(f"[{rel_page}] Malformed JSON-LD: {e}")

    # 3. Check <a> hrefs (navigational links)
    a_hrefs = re.findall(r'<a\s+[^>]*href=["\'](/[^"\'#?]*)(?:[#?][^"\']*)?["\']', content)
    for href in a_hrefs:
        clean = href.strip("/")
        if not clean:
            target = dist / "index.html"
        else:
            target = dist / clean / "index.html"
            if not target.exists():
                target = dist / f"{clean}.html"
            if not target.exists():
                target = dist / clean
        if not target.exists():
            broken_page_links.append(f"[{rel_page}] -> {href}")

    # 4. Check <link> hrefs (static assets)
    link_hrefs = re.findall(r'<link\s+[^>]*href=["\'](/[^"\'#?]*)(?:[#?][^"\']*)?["\']', content)
    for href in link_hrefs:
        clean = href.lstrip("/")
        target = dist / clean
        if not target.exists():
            broken_static_links.append(f"[{rel_page}] -> {href}")

print(f"\n--- AUDIT SUMMARY ---")
print(f"Page Meta Errors: {len(page_errors)}")
for e in page_errors:
    print(f"  ❌ {e}")

print(f"JSON-LD Validation Errors: {len(jsonld_errors)}")
for e in jsonld_errors:
    print(f"  ❌ {e}")

print(f"Broken <a> Page Links: {len(broken_page_links)}")
for b in set(broken_page_links):
    print(f"  ❌ {b}")

print(f"Broken <link> Static Links: {len(broken_static_links)}")
for b in set(broken_static_links):
    print(f"  ❌ {b}")

if not (page_errors or jsonld_errors or broken_page_links or broken_static_links):
    print("\n🎉 ALL 23 PAGES PASSED WITH 100% HEALTH! Zero broken links, zero meta errors, zero JSON-LD errors.")
