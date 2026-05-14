# Pabreetzio.com — Agent Notes

Notes and TODOs for AI agents working on this project.

---

## TODO: Re-enable hidden sections

The following items are hidden with `display: none` pending content/completion. Remove the hide when ready.

### Nav — Media link
**File:** `src/components/Nav.astro`
**What:** The "Media" nav link is hidden (`hidden: true` on the navLinks entry).
**When to restore:** When the `/media` page has real content.

### Home page — Gaming section (recently played + gamer stats)
**File:** `src/pages/index.astro`
**What:** `<GamingSection />` is wrapped in `<div style="display:none">`. This includes the recently played games grid and the gamer stats/genre donut chart on the left, and the Links/Hangouts grid on the right.
**When to restore:** When game data is real/live and the Links/Hangouts destinations are built out.
