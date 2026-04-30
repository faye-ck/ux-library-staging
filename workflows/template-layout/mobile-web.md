---
product: Workflows
feature: template-layout
platform: Mobile Web
status: draft
last_updated: 2026-04-30
confirms_needed: 3
---

Base spec: /workflows/template-layout/feature.md
Platform: Mobile Web

Delta only — anything not listed here is identical to the base spec.

---

> **INFERRED:** The Figma frame provided (node 1911:200130, "Responsive spec") does NOT contain a dedicated mobile phone design. It shows the desktop User Portal at two additional viewport breakpoints: **1320px** and **2558px (1920+)**. No phone-specific UI (single-column layout, bottom navigation, hamburger menu, touch-optimised tap targets) is present.
>
> This delta documents the **responsive layout behaviour** of the User Portal across three breakpoints. A true mobile web design (≤ 768px) appears to be absent from the Figma file.
>
> `CONFIRM:` Is a phone-specific mobile web design planned? If not, mark this platform as out of scope.

---

## Layout Changes

The 3-panel structure (left panel · main canvas · right panel) is preserved across all breakpoints. Only the **main canvas** flexes; left and right panels remain at 330px fixed.

| Breakpoint | Total width | Left panel | Main canvas | Right panel |
|---|---|---|---|---|
| 1320px | 1320px | 330px (fixed) | 660px | 330px (fixed) |
| **1600px (baseline)** | **1600px** | **330px** | **940px** | **330px** |
| 1920+ | 2558px | 330px (fixed) | 1898px | 330px (fixed) |

### At 1320px
- Main canvas compresses to 660px. Form element 2-col grid is preserved but narrower per column (~300px per column vs ~440px at baseline).
- The 960px max-width constraint in the canvas no longer applies (660px < 960px) — content fills the full 660px.
- Section headers (title, description, icons) reflow tightly.
- Date Range and Date/Time Range fields remain side-by-side but compressed.

### At 1920+ (2558px)
- Main canvas expands to 1898px. `INFERRED:` the 960px max-width constraint applies — content is centred at 960px within the wider canvas rather than expanding to fill 1898px.
- Visual appearance is identical to baseline at readable widths; the extra canvas space adds padding.

---

## Open Items

### Inconsistencies with config files
None beyond those already flagged in the base spec.

### Missing states or flows
1. **Phone-specific Mobile Web design** — No mobile (≤ 768px) layout is present in the Figma file. A drag-and-drop layout editor on a phone-width screen requires significant redesign (collapsed panels, touch targets, modal-based settings). `CONFIRM:` is this a planned deliverable?

### Decisions needed
2. **Max-width behaviour at 1920+** — `INFERRED:` content centres at 960px within a 1898px canvas. Confirm this is intentional or if the canvas content should reflow to use wider space.
3. **Breakpoint definition** — The Figma frames show 1320px and 2558px. Confirm whether additional breakpoints (e.g. 768px tablet, 1024px) are needed for the template editor.
