---
name: add-platform-delta
description: Document a platform delta for the Colorkrew UX Library by comparing two Figma frames — a baseline surface and a delta surface — and writing only what differs. Use this skill whenever a designer says "add a platform delta", "document mobile differences", "how does this differ on mobile", "write a delta for", or provides two Figma URLs for the same feature on different platforms. Also triggers when asked to create or populate a mobile-web.html, mobile-app.html, admin-portal.html, room-signage.html, or email.html file in the UX library. Requires Figma MCP to be connected.
---

# Add Platform Delta

Generates a platform delta file for the Colorkrew UX Library by comparing a baseline Figma frame against a delta surface frame, writing only what differs. If no meaningful differences exist, reports that no delta file is needed.

## Inputs required

Before starting, confirm you have:
- **Product** — one of: biz, workflows, ckid, intra, files, updates, goals
- **Feature name** — e.g. "Office Map", "Reception", "Submit"
- **Baseline surface** — the already-documented surface (e.g. User Portal)
- **Baseline Figma URL** — Figma frame link for the baseline
- **Delta surface** — the new surface to document (e.g. Mobile Web, Mobile App, Room Signage, Email, Admin Portal, Receptionist Portal)
- **Delta Figma URL** — Figma frame link for the delta surface

If any are missing, ask for them before proceeding.

Also check: does the baseline spec already exist at `/[product]/[feature-slug]/feature.html`?
- If yes: read it in Step 2
- If no: warn the designer and suggest running `/document-feature-spec` first. You can still proceed but note the spec was not available for reference.

> **Cost tip:** Confirm inputs are complete before calling any Figma tools. A single missing URL means two wasted `get_design_context` calls if you have to restart.

---

## Step 1 — Extract design context from both frames

Call `get_metadata` on both frames first to get node hierarchies and identify the smallest useful child nodes.

Then call `get_design_context` on those specific child nodes — never on the full file or page. Process one frame at a time.

Call `get_screenshot` on both frames to enable visual comparison of:
- Overall layout structure
- Navigation and hierarchy
- Component sizing and density
- Visible/hidden elements

> **Cost tip:** `get_screenshot` is cheaper than `get_design_context` for layout comparison. If you only need to confirm structural differences (not copy or component names), use `get_screenshot` first and only call `get_design_context` on the delta frame if differences are confirmed.

Note for each frame: all screens, copy, components, interactions, and any designer annotations.

---

## Step 2 — Read the baseline spec and config files

If the baseline spec exists, read `/[product]/[feature-slug]/feature.html`.

> **Cost tip:** Reading the baseline spec is cheap and prevents writing duplicate content into the delta file. Always do this before writing.

Read these config files:
```
/[product]/_theme.html         ← color tokens (for delta-specific token notes)
/[product]/_glossary.html      ← verify copy differences use approved terms
/[product]/_guidelines.html    ← check for platform-specific rules
/global/_guidelines.html       ← check for platform-specific rules
```

> **Cost tip:** If you already read these config files in the same session (e.g. after running `/document-feature-spec` for this feature), skip re-reading them and use the values already in context.

---

## Step 3 — Diff the two surfaces

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
- Any labels, CTAs, or messages that differ between surfaces
- Verify against `_glossary.html` — flag any unapproved terms

### Platform-specific constraints
- Offline behavior (Mobile App)
- Reduced permissions or role limitations on this surface
- Email rendering constraints (no JS, limited CSS, plain-text fallback)
- Kiosk/display context (Room Signage — touch-only, auto-reset, minimal interaction)
- Screen size or orientation assumptions

---

## Step 4 — Decide: delta file or no file needed

**Write a delta file if** there are meaningful differences in at least one of the five dimensions above.

**Do not write a delta file if** the surfaces are functionally and visually identical. In this case:
- Report the finding in the conversation
- Update the coverage table in `/[product]/_index.html` — mark the delta surface column as `identical`
- Stop here

> **Cost tip:** Make this decision before writing anything. A quick mental diff from the screenshots and metadata is enough to decide. Don't start writing the file and abandon it halfway.

---

## Step 5 — Generate the delta file

Write to `/[product]/[feature-slug]/[delta-surface-slug].html`.

Surface slug mapping:
- Mobile Web → `mobile-web`
- Mobile App → `mobile-app`
- Admin Portal → `admin-portal`
- Room Signage → `room-signage`
- Email → `email`
- Receptionist Portal → `receptionist-portal`

**Delta files contain only what changes.** Do not repeat content from the baseline spec. Open with:

```
Base spec: /[product]/[feature-slug]/feature.html
Platform: [Delta surface name]

Delta only — anything not listed here is identical to the base spec.
```

Then include only the sections where differences were found. Omit sections with no differences.

For Admin Portal (Biz only): note at the top whether this is a `delta` (admin is additive on a separate surface) or `full spec` (admin portal is substantially different). If it's a full spec, cover all sections as you would in `feature.html`.

---

## Step 6 — Open Items section

Append an "Open Items" section even if empty.

**Inconsistencies with config files**
- Copy differences that use unapproved terms
- Delta-specific colors not mapped to tokens from `_theme.html`

**Missing states or flows**
- States shown in baseline but not accounted for in the delta frames
- Platform-specific states expected but not shown (e.g. offline state on Mobile App)
- Screens not captured due to `get_design_context` truncation

**Decisions needed**
- Ambiguous behaviors where the delta Figma is unclear
- Features absent from delta — unclear if intentional or missing from the design
- Anything requiring designer confirmation

---

## Step 7 — Update the coverage table

Open `/[product]/_index.html` and update the platform coverage table:
- Mark the delta surface column for this feature as `delta`
- If no file was created (surfaces identical), mark as `identical`

---

## Output

- `/[product]/[feature-slug]/[delta-surface-slug].html` — the delta file (if differences found)
- Updated coverage table in `/[product]/_index.html`
- Summary in the conversation: differences found per dimension, open items count, whether a file was written or the surfaces were identical

---

## Rules

- The delta file must not duplicate baseline content — if a section is unchanged, omit it entirely
- For Biz Admin Portal: the admin portal may have its own theme tokens — reference the admin portal section of `/biz/_theme.html` for any color tokens used
- For Room Signage: this is usually a full spec (not a delta) because the context is entirely different — kiosk display, no user login, auto-refresh. If that's the case, treat it like `feature.html` rather than a delta
- For Email: document rendering constraints explicitly — what CSS is supported, whether images are used, plain-text fallback
- If `get_design_context` is truncated on either frame, note which screens were missed and list them in Open Items — do not silently omit them
