---
product: biz
feature: custom-assets-management
platform: user-portal
status: draft
last_updated: 2026-04-30
confirms_needed: 4
---

# Custom Assets Management — Feature (User Portal)

> Allows users to upload, rename, and remove 3D model assets (.GLB) and their 2D thumbnail icons (.PNG/.JPG) for use on the Office Map. Accessible via Office Map > Custom Assets tab in the Biz User Portal.

---

## Overview

Custom assets are non-functional map objects (decorative/custom 3D models) placed on the Office Map by users. They are created and managed entirely within the Office Map section of the User Portal — not via a separate admin flow. This page is the sole creation and management point for custom assets.

INFERRED: Feature is accessible only within the "Seat" module context (left nav state shows Seat as active when on this page).

---

## Navigation path

Office Map (top nav) → Custom Assets (tab)

Left nav active item: Seat
Tab group location: Under Office Map top-nav item, alongside Pages and Access Links tabs.

---

## Core flows

### Flow 1 — Upload a 3D model asset

1. User navigates to Manage Custom Assets (empty or populated list).
2. User clicks **Upload New** (outlined button, top right).
3. File picker opens — accepts `.GLB` only. Single file at a time.
4. File uploads with loading/skeleton state shown on card.
5. On success: new AssetCard appears; snackbar shows "Upload successful".
6. Default asset name = filename minus `.GLB` extension (e.g., `TV.GLB` → "TV").
7. If name already exists: suffix appended automatically (TV → TV 2 → TV 3…).

### Flow 2 — Upload a 2D icon (thumbnail) for an existing asset

1. User hovers over an existing AssetCard.
2. Upload icon button appears on the thumbnail area.
3. File picker opens — accepts `.PNG` or `.JPG` only.
4. On success: thumbnail updates on the card; 2D Icon size shown in details row.
5. CONFIRM: Exact size limit for 2D Icon — alert text says 500KB but error spec says 50KB.

### Flow 3 — Rename an asset

1. User hovers over an AssetCard — pencil icon appears next to asset name.
2. User clicks pencil → inline rename field activates.
3. User edits name and confirms.
4. If new name collides with existing asset: suffix appended (XXXX 2, XXXX 3…).

### Flow 4 — Remove an asset

1. User hovers over AssetCard → **Remove Asset** button appears (outlined error style).
2. User clicks Remove Asset.
3. Confirmation dialog shown (modal overlay, dark backdrop).
4. User confirms → asset removed; list refreshes.
5. MISSING: Exact dialog copy for remove confirmation not captured.

### Flow 5 — Remove a 2D icon (thumbnail)

1. User hovers over AssetCard thumbnail area → remove/clear icon appears.
2. User confirms removal.
3. 2D Icon field on card updates to "NA".

---

## States

### Empty state

Shown when no custom assets have been uploaded.
Copy: "No custom assets here."
No action button in the empty body — Upload New is always accessible in Section Header.

### Loading state

INFERRED: Skeleton placeholder shown on the AssetCard during model upload (uploading progress implied by flow). Exact skeleton shape matches AssetCard dimensions.

### Error states

All errors surface as Snackbars. Some appear before upload begins (validation), some after (upload failed).

| Error | Trigger | Message (EN) | Message (JA) | Action |
|-------|---------|--------------|--------------|--------|
| Model file too large | `.GLB` file > 5MB | File exceeds size limit (5MB) | MISSING | Snackbar auto-dismisses; user re-selects |
| Icon file too large | `.PNG`/`.JPG` > 50KB | File exceeds size limit (50KB) | MISSING | Snackbar auto-dismisses |
| Corrupt/unreadable file | Invalid file binary | Corrupt or unreadable file | MISSING | Snackbar auto-dismisses |
| Unsupported model format | Non-.GLB file selected | Unsupported format GLB | MISSING | Snackbar auto-dismisses |
| Unsupported icon format | Non-.PNG/.JPG file selected | Unsupported image format (PNG/JPG) | MISSING | Snackbar auto-dismisses |
| Upload failed | Network timeout / server error | Upload failed | MISSING | Snackbar auto-dismisses |

CONFIRM: Alert info box shows "maximum size of 500KB" for thumbnails; error annotation shows 50KB. Actual enforced limit needs design decision.

Note from error annotation: Dimension errors (too small / too large) are handled by auto-fit to 32×32 — no error shown. Network timeout and server error collapse to generic "Upload failed" message.

### Success / confirmation

- Upload model: Snackbar — "Upload successful"
- Upload icon: Snackbar — "Upload successful" (INFERRED: consistent pattern)
- Rename: Inline update (no snackbar)
- Remove asset: Asset card disappears; list count updates

### Edge cases

- Name collision on upload or rename: auto-suffix added (XXXX 2, XXXX 3…). No error shown.
- 2D Icon not yet uploaded: details row shows "2D Icon: NA".
- Total upload limit: 50MB per space (from alert guidance text).

---

## Components used

| Component | Source | Notes |
|-----------|--------|-------|
| AppBar + Toolbar (Biz shell) | biz/config/_components.md | Top bar: user email + Manual link + help icon |
| Drawer (permanent, 280px) | biz/config/_components.md | Left nav: Seat module context |
| Top Menu tab bar | biz/config/_components.md | Search / Create / Reports / Office Map / Status & Booking |
| Tab filter strip | defined here | Pages \| Access Links \| Custom Assets — bordered button style, NOT standard MUI Tabs underline |
| Alert (info/guidance) | global/components/ | `severity="info"` variant, light secondary background |
| AssetCard | defined here | Custom compound: thumbnail + name + details row + hover controls. Promote if reused across other features. |
| Button (outlined) | global/components/ | "Upload New" — `variant="outlined"`, default color |
| Button (outlined error) | global/components/ | "Remove Asset" — `variant="outlined"` `color="error"` |
| Snackbar + Alert (error) | global/components/ | Error notifications; anchor bottom-center; `severity="error"` |
| Pagination | biz/config/_components.md | "Items per page: [N] · x–y of z" with prev/next chevrons |
| Dialog | global/components/ | Remove confirmation; `maxWidth="sm"`; Cancel + Confirm (error) |
| IconButton (pencil) | global/components/ | Inline rename trigger; appears on hover |
| IconButton (trash) | global/components/ | Inline delete; hidden by default; appears on hover |
| IconButton (upload) | global/components/ | Thumbnail upload trigger on card hover |

---

## Guidelines applied

| Guideline | Source file |
|-----------|-------------|
| Single upload at a time | INFERRED from Figma annotation "Single uploads at once" |
| Errors surface as Snackbar, not inline | INFERRED from Figma annotation on Snackbar |
| Show limitations upfront (Alert guidance) | INFERRED from Figma annotation on Alert |
| Hover reveals controls | Figma annotation: "Controls on Hover" on AssetCards |
| Default name = filename (strip extension) | Figma annotation: "Default asset name will be Filename (remove .GLB)" |
| Name collision auto-suffix | Figma annotation: "Name becomes XXXX 2 XXXX 3… if it is multiplied" |

---

## Copy patterns

| Element | EN | JA |
|---------|----|----|
| Page / section title | Manage Custom Assets | MISSING |
| Tab label | Custom Assets | MISSING |
| Other tab labels | Pages · Access Links | MISSING |
| Upload button | Upload New | MISSING |
| Remove button | Remove Asset | MISSING |
| Guidance alert | You can upload .GLB models that are up to 5MB in size, and .JPG or .PNG thumbnail images with a maximum size of 500KB. The total upload limit is 50MB. | MISSING |
| Empty state | No custom assets here. | MISSING |
| Success snackbar | Upload successful | MISSING |
| Error — model too large | File exceeds size limit (5MB) | MISSING |
| Error — icon too large | File exceeds size limit (50KB) | MISSING |
| Error — corrupt file | Corrupt or unreadable file | MISSING |
| Error — bad model format | Unsupported format GLB | MISSING |
| Error — bad icon format | Unsupported image format (PNG/JPG) | MISSING |
| Error — upload failed | Upload failed | MISSING |
| Pagination label | Items per page: | MISSING |
| Asset details row format | [filename].GLB · Model Size: [N]KB · 2D Icon: [N]KB | MISSING |
| Asset details — no icon | 2D Icon: NA | MISSING |

---

## Color tokens used

All tokens observed from Figma CSS variables. Mapped to MUI palette equivalents; formal token names pending `biz/config/_theme.md` completion.

| Figma CSS var | Hex observed | MUI mapping |
|---------------|-------------|-------------|
| `--primary/main` | #00a9a1 | `palette.primary.main` |
| `--primary/light` | #f0fafa | `palette.primary.light` |
| `--secondary/main` | #edeef2 | `palette.secondary.main` |
| `--secondary/light` | #f5f7fa | `palette.background.default` |
| `--text/primary` | #303640 / #1c1c1c | `palette.text.primary` |
| `--text/secondary` | #535353 / #676c74 | `palette.text.secondary` |
| `--text/low` | #909292 | `palette.text.disabled` |
| `--text/link` | #409aa2 | INFERRED: active tab link, no direct MUI mapping |
| `--error/main` | #e24f4b | `palette.error.main` |
| `--border/divider` | #d4d9e1 | `palette.divider` |
| `--border/low` | #909292 | INFERRED: inactive border |
| `--border/highlight` | #409aa2 | INFERRED: active tab border |
| `--divider` | #bcc3cc | `palette.divider` |
| `--border` | #e7e7e7 | `palette.divider` |
| `--_components/alert/error/background` | #fef1f0 | `palette.error.light` (custom) |

---

## Design rules

### AssetCard — hover-reveal controls — 2026-04-30
Context: custom-assets-management
- Controls (rename pencil, remove button, thumbnail upload icon) are hidden by default; revealed only on card hover.
- Thumbnail area shows upload overlay icon (semi-transparent dark circle) on hover when no 2D icon is set; shows edit/delete overlay when icon exists.
- Remove Asset button uses `variant="outlined"` `color="error"` style at 32px height (smaller than standard 40px button).
  Figma source: AssetCards component, "Controls on Hover" annotation.

### Tab filter strip — non-MUI Tabs style — 2026-04-30
Context: custom-assets-management (INFERRED: also used in Office Map other sub-pages)
- The Pages / Access Links / Custom Assets filter uses bordered pill-style buttons (3px rounded corners, 40px height), NOT the standard MUI underline Tabs.
- Active tab: border-color `--border/highlight` (#409aa2), text-color `--text/link` (#409aa2).
- Inactive tab: border-color `--border/low` (#909292), text-color `--text/low` (#909292).
  Figma source: Status Indicators frame, Tabs instances.

---

## Open items

**Inconsistencies with config files**
1. Alert guidance text states "maximum size of 500KB" for thumbnail images; error annotation and snackbar copy use "50KB". CONFIRM which limit is enforced.
2. All `biz/config/` files are stubs — `_theme.md`, `_glossary.md`, `_guidelines.md` need to be populated before token and copy validation can be completed.
3. Two CSS variable variants for `--text/primary` observed (#303640 and #1c1c1c) — likely a theme inconsistency. CONFIRM canonical value.

**Missing states or flows**
4. Exact copy for the Remove Asset confirmation dialog not captured in Figma. MISSING.
5. Upload loading/progress state not fully visible in Figma — skeleton shape inferred from AssetCard dimensions.
6. No JA translations available in glossary (stub) — all EN copy is unvalidated against approved terms.
7. Thumbnail-only removal flow (remove 2D icon without removing model) not fully documented — seen in flow group "Remove Thumbnail" but copy not captured.

**Decisions needed**
8. Confirm whether Map Editor flows (animation settings, BG color settings) in the same Figma section are in scope for this feature spec or belong to a separate editor spec.
9. Confirm access control: who can access the Custom Assets tab — all users with Seat module access, or a specific role?
10. AssetCard and Tab filter strip components should be reviewed for promotion to `biz/config/_components.md` given likely reuse across Office Map sub-pages.
