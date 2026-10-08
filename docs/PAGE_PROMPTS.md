# Page & Section Prompt Templates

Copy a template, fill the `[brackets]`, delete lines you don't need, and paste your content.
Anything left out is handled with the existing Oriana theme and patterns.

---

## 1. Create a new page

```text
NEW PAGE

URL: /[about/our-team]
Page title (browser tab): [Our Team | ORIANA]
Menu: [add under "About Us" in header + footer as "Our Team"] / [don't add to menu]
Reference page for look & feel: [/about] / [/about/brand-story] / [/support]
Data: static for now, CMS later

HERO
Eyebrow: [About ORIANA]
Headline: [...]
Short line: [...]
Button 1: [label] → [/link or #section]
Button 2: [label] → [/link]   (optional)
Image: [your URL] / [pick a suitable one]

STICKY SECTION MENU (like /about and /support): [yes] / [no]

SECTIONS (repeat this block for each section, in order)
---
Section: [01] [Who We Are]
Layout idea: [text + image] / [cards grid] / [steps 1→2→3] / [timeline] / [dark band with quote] / [you decide]
Headline: [...]
Text:
[paste paragraphs]
Points / cards (one per line, "Title — description"):
- [...]
- [...]
Closing line: [...]   (optional)
Image: [URL] / [pick one] / [none]
---

FINAL CTA (optional)
Headline: [...]
Button: [label] → [/link]
```

---

## 2. Update an existing section

```text
UPDATE SECTION

Page: [/about]
Section: [03 Manufacturing]   (name, number or the heading you see)
What to change: [replace text] / [new layout] / [add items] / [remove] / [change image] / [move it]

New content (only fill what changes):
Headline: [...]
Text:
[...]
Points / cards:
- [Title — description]
Image: [URL] / [pick a better one]

Keep as is: [layout / image / everything else]
Screenshot: [attach if it's about how it looks]
```

---

## 3. Add a new section to an existing page

```text
ADD SECTION

Page: [/about]
Position: [after "04 Quality"] / [before footer CTA]
Add to sticky menu: [yes, as "07 Awards"] / [no]
Layout idea: [text + image] / [cards] / [steps] / [stats] / [you decide]

Headline: [...]
Text: [...]
Points / cards:
- [Title — description]
Image: [URL] / [pick one] / [none]
Button: [label] → [/link]   (optional)
```

---

## 4. Quick one-liners (small changes)

```text
On [/about], change the [Quality] headline to "[...]".
On [/about], replace the [Who We Are] image with [URL / a factory floor photo].
On [/support], remove the [Global presence] section and its menu item.
On [/about/brand-story], add a milestone: [2027] — [title] — [one line].
Move [Why ORIANA] above [Our Vision] on [/about].
On [/about], the [Technology] cards look crowded on mobile — fix spacing.
```

---

## Tips

- **Paste content exactly as you want it shown.** It won't be reworded unless you ask (e.g. "tighten the copy").
- **One block per section, in page order.** Unsure about layout? Paste the raw text and let the layout be picked.
- **Images:** a URL, a short description ("solar panels at sunset"), or "pick one" all work.
- **Screenshots** help most for "make it look like X" or "this looks wrong" requests.
- **Moving to the CMS later:** say "move [/about] to the CMS (Payload)". Fields are created with the current content as defaults, so nothing changes visually.
