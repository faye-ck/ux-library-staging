---
name: add-platform-delta
description: Document a platform delta for the Colorkrew UX Library by comparing two Figma frames — a baseline platform and a delta platform — and writing only what differs. Use this skill whenever a designer says "add a platform delta", "document mobile differences", "how does this differ on mobile", "write a delta for", or provides two Figma URLs for the same feature on different platforms. Also triggers when asked to create or populate a mobile-web.html, mobile-app.html, admin-portal.html, room-signage.html, or email.html file in the UX library. Requires Figma MCP to be connected.
---

# Add Platform Delta

Generates a platform delta `.md` (AI-facing) and `.html` (designer-facing) for the Colorkrew UX Library by comparing a baseline Figma frame against a delta platform frame, writing only what differs. If no meaningful differences exist, reports that no delta file is needed. See `CLAUDE.md` at the library root for format rules.

## Inputs required

Before starting, confirm you have:
- **Product** — one of: biz, workflows, ckid, intra, files, updates, goals
- **Feature name** — e.g. "Office Map", "Reception", "Submit"
- **Baseline platform** — the already-documented platform (e.g. User Portal)
- **Baseline Figma URL** — Figma frame link for the baseline
- **Delta platform** — the new platform to document (e.g. Mobile Web, Mobile App, Room Signage, Email, Admin Portal, Receptionist Portal)
- **Delta Figma URL** — Figma frame link for the delta platform

If any are missing, ask for them before proceeding.

Also check: does the baseline spec already exist at `/[product]/[feature-slug]/feature.md`?
- If yes: read it in Step 2
- If no: warn the designer and suggest running `/document-feature-spec` first. You can still proceed but note the spec was not available for reference.

---

## Step 1 — Extract design context from both frames

Call `get_design_context` on both Figma URLs independently.

Use `get_metadata` first if either frame is large, then target specific nodes.

Call `get_screenshot` on both frames to enable visual comparison of:
- Overall layout structure
- Navigation and hierarchy
- Component sizing and density
- Visible/hidden elements

Note for each frame: all screens, copy, components, interactions, and any designer annotations.

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

## Output

- `/[product]/[feature-slug]/[delta-platform-slug].md` — AI-facing delta (if differences found)
- `/[product]/[feature-slug]/[delta-platform-slug].html` — designer-facing delta (if differences found)
- Updated coverage table in `/[product]/_index.md` and `_index.html`
- Summary in the conversation: differences found per dimension, open items count, whether files were written or the platforms were identical

---

## Notes

- The delta file must not duplicate baseline content — if a section is unchanged, omit it entirely
- For Biz Admin Portal: the admin portal has its own theme tokens — reference the admin portal section of `/biz/config/_theme.md` for any color tokens used
- For Room Signage: this is usually a full spec (not a delta) because the context is entirely different — kiosk display, no user login, auto-refresh. If that's the case, treat it like `feature.md` / `feature.html` rather than a delta
- For Email: document rendering constraints explicitly — what CSS is supported, whether images are used, plain-text fallback
- If `get_design_context` is truncated on either frame, note which screens were missed and list them in Open Items
