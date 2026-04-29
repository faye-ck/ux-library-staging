---
name: add-platform-delta
description: Document a platform delta for the ux-library by comparing a baseline platform and a delta platform, and writing only what differs. Use this skill whenever a designer says "add a platform delta", "document mobile differences", "how does this differ on mobile", "write a delta for", or provides URLs for the same feature on different platforms. Also triggers when asked to create or populate a mobile-web.html, mobile-app.html, admin-portal.html, room-signage.html, or email.html file in the UX library. Requires Figma MCP to be connected.
---

# Add Platform Delta

Generates a platform delta `.md` (AI-facing) and `.html` (designer-facing) for the ux-library by comparing a baseline platform against a delta platform, writing only what differs. Primary source for each platform is a Figma frame; ClickUp or other spec URLs can be provided as supplementary context. If no meaningful differences exist, reports that no delta file is needed. See `CLAUDE.md` at the library root for format rules.

## Inputs required

Before starting, confirm you have:
- **Product** — one of: biz, workflows, ckid, intra, files, updates, goals
- **Feature name** — e.g. "Office Map", "Reception", "Submit"
- **Baseline platform** — the already-documented platform (e.g. User Portal)
- **Baseline URL(s)** — Figma frame link for the baseline *(primary)*; ClickUp or other spec URL *(supplementary, optional)*
- **Delta platform** — the new platform to document (e.g. Mobile Web, Mobile App, Room Signage, Email, Admin Portal, Receptionist Portal)
- **Delta URL(s)** — Figma frame link for the delta platform *(primary)*; ClickUp or other spec URL *(supplementary, optional)*

A Figma URL is strongly recommended for each platform. ClickUp or other URLs are treated as supplementary context only.

If any required inputs are missing, ask for them before proceeding.

Also check: does the baseline spec already exist at `/[product]/[feature-slug]/feature.md`?
- If yes: read it in Step 2
- If no: warn the designer and suggest running `/document-feature-spec` first. You can still proceed but note the spec was not available for reference.

---

## Step 1 — Process provided URLs for both platforms

**Load the `figma-use` skill before any Figma MCP call.** It is a mandatory prerequisite. Also load `mui-design` to map fills/styles to MUI tokens during extraction.

**Run `figma-generate-library` Section 11a (ux-library Documentation Mode — Discovery Only) on the delta platform Figma URL.** This produces a structured MUI component inventory and token mapping for the delta frame. Use the output when writing the delta's "Components Used" and "Color Tokens Used" sections — only documenting components and tokens that differ from the baseline. Do not run Section 11a again on the baseline URL if the baseline spec already exists and was generated using this workflow.

For each platform (baseline and delta), handle each provided URL by type:

**Figma URLs (primary):**

Follow this sequence for each Figma URL (baseline and delta independently). Do not skip steps:

1. **Inspect first with `get_metadata`.** Call `get_metadata` before anything else. Read the node hierarchy — identify named screens, count frames, note structure. Never call `get_design_context` on a large frame without understanding its structure first.

2. **Target specific nodes with `get_design_context`.** Based on the metadata, call `get_design_context` on individual screens — not the root frame. For large or multi-screen frames, call separately per section to avoid truncation.

3. **Always call `get_screenshot` on both frames.** Screenshots are essential for delta work — use them to visually compare:
   - Overall layout structure and reflow patterns
   - Navigation patterns and hierarchy differences
   - Component sizing, density, and touch target changes
   - Elements that appear, disappear, or change prominence
   - Any designer annotations specific to that platform

4. **Work incrementally.** If `get_design_context` is truncated on either frame, note which screens were missed and call again on the specific nodes. List still-missing screens in Open Items.

Note for each frame: all screens, copy, components, interactions, and any designer annotations.

**ClickUp or other URLs (supplementary):**

Fetch the content of each URL. Use it as additional context for that platform:
- Platform-specific requirements or constraints
- Behaviour differences noted in writing outside Figma
- Edge cases or business rules that may not be visible in the design

Where a supplementary URL and Figma disagree, note the discrepancy in Open Items under "Decisions needed".

If no Figma URL was provided for a platform, note this in Open Items under "Missing states or flows" — visual comparison for that platform will be limited.

---

## Step 2 — Read the baseline spec and config files

If the baseline spec exists, read `/[product]/[feature-slug]/feature.md`.

Read these config files:
```
/[product]/config/_theme.md        ← color tokens (for delta-specific token notes)
/[product]/config/_glossary.md     ← verify any copy differences use approved terms
/[product]/config/_guidelines.md   ← check for platform-specific rules
/global/_guidelines.md             ← check for platform-specific rules
```

---

## Step 3 — Diff the two platforms

Compare baseline vs delta across these dimensions:

### Layout changes
- How does the page structure change? (e.g. stacked vs side-by-side, collapsed nav, bottom bar)
- Responsive breakpoints or reflow patterns
- Changes to information hierarchy or visual prominence

### Hidden or added functionality
- Features present in baseline but absent on delta (and why — constraints vs intentional)
- Features present on delta but absent in baseline (delta-specific additions)
- Actions that are read-only on delta but editable in baseline

### Interaction changes
- Touch targets vs click targets
- Gesture-based navigation (swipe, pull-to-refresh, long press)
- Hover → tap equivalents
- Keyboard navigation differences
- Auto-refresh or passive update behavior (relevant for Room Signage)

### Copy changes
- Any labels, CTAs, or messages that differ between platforms
- Verify against `_glossary.md` — flag any unapproved terms

### Platform-specific constraints
- Offline behavior (Mobile App)
- Reduced permissions or role limitations on this platform
- Email rendering constraints (no JS, limited CSS, plain-text fallback)
- Kiosk/display context (Room Signage — touch-only, auto-reset, minimal interaction)
- Screen size or orientation assumptions

---

## Step 3.5 — Capture platform-specific design rules

Run `figma-create-design-system-rules` in **ux-library Mode** on the delta platform Figma frames.

Identify design patterns in the delta that either:
- Override a global or product-wide rule specifically for this platform
- Introduce constraints or adaptations unique to this platform (touch targets, email rendering, kiosk context, etc.)
- Use MUI component variants or token values that differ from the baseline

For each custom pattern found:

- **Platform-wide rules** (e.g. "on Mobile Web, all Buttons use `size="large"` for touch targets") → write to `/[product]/config/_guidelines.md` using the rule format:
  ```
  ## [Component or Pattern] — [YYYY-MM-DD]
  Context: [product] [delta-platform]
  - [Actionable rule referencing MUI token/component names]
    Figma source: [Figma component or frame name]
  ```
- **Feature + platform rules** (scoped to this feature on this platform only) → append a "Platform Design Rules" section to `[platform-slug].md` and `[platform-slug].html`.
- **Already documented globally or in baseline** → no output needed.

If no platform-specific rules are found, note "No platform-specific design rules found" in the conversation summary.

---

## Step 4 — Decide: delta file or no file needed

**Write a delta file if** there are meaningful differences in at least one of the five dimensions above.

**Do not write a delta file if** the platforms are functionally and visually identical. In this case:
- Report the finding in the conversation
- Update the coverage table in `/[product]/_index.md` and `_index.html` — mark the delta platform column as `identical`
- Stop here

---

## Step 5 — Generate the delta files

Write both to `/[product]/[feature-slug]/`:

Platform slug mapping:
- Mobile Web → `mobile-web`
- Mobile App → `mobile-app`
- Admin Portal → `admin-portal`
- Room Signage → `room-signage`
- Email → `email`
- Receptionist Portal → `receptionist-portal`

**Delta files contain only what changes.** Do not repeat content from the baseline spec. Both files open with:

```
Base spec: /[product]/[feature-slug]/feature.md
Platform: [Delta platform name]

Delta only — anything not listed here is identical to the base spec.
```

**`[platform-slug].md`** — AI-facing. Frontmatter with `product`, `feature`, `platform`, `status: draft`, `last_updated`. Inline flags (`CONFIRM:`, `INFERRED:`, `MISSING:`). Only sections where differences were found.

**`[platform-slug].html`** — Human-facing. Visual layout with flags rendered as banners/badges. Only sections where differences were found.

For Admin Portal (Biz only): note at the top whether this is a `delta` (admin is additive on a separate platform) or `full spec` (admin portal is substantially different). If it's a full spec, cover all sections as you would in `feature.md` / `feature.html`.

---

## Step 6 — Open Items section

Append an "Open Items" section even if empty.

**Inconsistencies with config files**
- Copy differences that use unapproved terms
- Delta-specific colors not mapped to tokens

**Missing states or flows**
- States shown in baseline but not accounted for in the delta frames
- Platform-specific states expected but not shown (e.g. offline state on mobile app)

**Decisions needed**
- Ambiguous behaviors where the delta Figma is unclear
- Features absent from delta — unclear if intentional or missing from the design
- Anything requiring designer confirmation

---

## Step 7 — Update the coverage table

Open `/[product]/_index.md` and update the platform coverage table:
- Mark the delta platform column for this feature as `delta`
- If no file was created, mark as `identical`

Then update `/[product]/_index.html` to match.

---

## Step 8 — Update changelog and sitemap

### `/[product]/changelog.html`

Add an Added entry to the current version block:
- **If a delta file was written:** `"[Feature Name] — [Delta Platform] delta documented."`
- **If platforms were identical (no file written):** `"[Feature Name] — [Delta Platform] confirmed identical to baseline, no delta file needed."`

### `sitemap.html`

Find the feature folder block for `/[product-slug]/[feature-slug]/` under the [Product Name] section:
- **If a delta file was written:** add rows for `[delta-platform-slug].md` and `[delta-platform-slug].html` inside the existing feature folder block.
- **If platforms were identical:** no sitemap change needed.
- **If the feature folder block is missing entirely:** add it first following the format of an existing feature block, then add the delta rows.

> **Cost tip:** Read only the relevant product section of `sitemap.html`, not the entire file, to locate the correct insertion point.

---

## Output

- `/[product]/[feature-slug]/[delta-platform-slug].md` — AI-facing delta (if differences found)
- `/[product]/[feature-slug]/[delta-platform-slug].html` — designer-facing delta (if differences found)
- Updated coverage table in `/[product]/_index.md` and `_index.html`
- Updated `/[product]/changelog.html` — entry added
- Updated `sitemap.html` — delta file rows added (if file was written)
- Summary in the conversation: differences found per dimension, open items count, whether files were written or the platforms were identical

---

## Notes

- The delta file must not duplicate baseline content — if a section is unchanged, omit it entirely
- For Biz Admin Portal: the admin portal has its own theme tokens — reference the admin portal section of `/biz/config/_theme.md` for any color tokens used
- For Room Signage: this is usually a full spec (not a delta) because the context is entirely different — kiosk display, no user login, auto-refresh. If that's the case, treat it like `feature.md` / `feature.html` rather than a delta
- For Email: document rendering constraints explicitly — what CSS is supported, whether images are used, plain-text fallback
- If `get_design_context` is truncated on either frame, note which screens were missed and list them in Open Items
