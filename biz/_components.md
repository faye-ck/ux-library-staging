---
product: biz
feature: components
status: reviewed
last_updated: 2026-05-01
confirms_needed: 2
---

# Biz — Components

> MUI-based and custom components for the Biz User Portal (web). Source: Figma library `-Library- Biz User Portal v2`.

---

## MUI Components

All MUI components inherit the Biz theme from `_theme.md`. Only Biz-specific overrides and variant details are documented here.

---

### Accordion

MUI `Accordion`. Border `--border/main` (#b9c0cc). `borderRadius: 8px`.

States: `Collapsed` / `Text` / `User list`.

No visual override beyond theme. Use `disableGutters` for tight layouts.

---

### Alert

MUI `Alert`. 6 severities × 2 sizes.

**Severities:** Info / Success / Warning / Error / Secondary / Invert

**Sizes:** Medium / Small

**Props:** `icon` (bool), `title` (optional heading row), `actionButtons` (optional CTA row), `closeButton` (optional dismiss X)

**Invert variant:** dark background (`--text/primary` #1c1c1c) with white text — used for dark-surface alerts.

**Token mapping:**
| Severity | Background token | Icon / text color |
|---|---|---|
| Info | `--_components/alert/info/background` (#e3f2fd) | `--info/main` (#1e88e5) |
| Success | `--_components/alert/success/background` (#eefaf2) | `--success/main` (#39a86b) |
| Warning | `--_components/alert/warning/background` (#faf2df) | `--warning/main` (#e2b243) |
| Error | `--_components/alert/error/background` (#fef1f0) | `--error/main` (#e24f4b) |
| Secondary | `--secondary/light` (#f5f7fa) | `--text/secondary` (#676c74) |
| Invert | `--text/primary` (#1c1c1c) | `--text/invert` (#ffffff) |

Mobile responsive variant: full-width, stacked layout (title above body, actions below).

---

### Badge

Two distinct badge use-cases: Tab/Menu badges and Active state badges.

**Tab / Menu badge:**
- Height: 20px, min-width: 20px
- Shape: pill (borderRadius 100px)
- Default state: bg `--secondary/light` (#f5f7fa), text `--text/tertiary*` (#7b828b)
- Active state: bg `--primary/light` (#e8f8f8), text `--primary/textandicon*` (#00a9a1)
- Contains numeric count or dot indicator

**Active badge:**
- Same dimensions and pill shape
- Used for status indicators on list items and drawer items

---

### Button

MUI `Button`. Sizes: Small / Medium / Large.

**Variants used in Biz:**
| Variant | MUI | Color | Typical use |
|---|---|---|---|
| Primary | `contained` | `primary` | New booking, confirm, primary CTA |
| Secondary | `outlined` | `primary` | Secondary action, cancel |
| Transparent | `text` | `primary` | Tertiary action, nav links (e.g. "My Bookings") |
| Destructive | `contained` | `error` | Delete, remove |

FAB documented separately below.

`loadingIndicator` used for async submit states (built-in MUI v5+).

---

### Checkbox

MUI `Checkbox` + `FormControlLabel`.

States: Unchecked / Checked / Indeterminate / Disabled (each).

Color: `--primary/main` (#01c5c1) for checked/indeterminate.

---

### Chip

MUI `Chip`. Two shape variants: Round (pill) and Square (borderRadius 4px).

**Sizes:**
| Size | Height |
|---|---|
| Medium | 32px |
| Small | 24px |
| X-Small | INFERRED: ~18px |

**Color variants:** Primary / Secondary / Info / Success / Warning / Error / Highlight / Workflows

**Filled Info Chips:** read-only informational chips (non-interactive). Use `--_components/alert/info/background` bg + `--info/main` text.

Highlight variant uses `--highlight*/main` (#9c72ed).

Workflows variant: CONFIRM: exact color token needed.

---

### Date Picker

MUI X `DatePicker`. Standard MUI X behavior. Calendar popover uses `borderRadius: 8px`.

Biz-specific overrides: INFERRED: uses `--primary/main` for selected date fill. No additional documented overrides.

---

### FAB (Floating Action Button)

MUI `Fab`.

**Sizes:**
| Size | Dimensions |
|---|---|
| Small | 32×32px |
| Medium | 40×40px |
| Large | 48×48px |

**States:** Default / Hover / Disabled / Loading

**Tokens:**
| State | Background | Text/icon |
|---|---|---|
| Default | `--primary/main` (#01c5c1) | `--text/invert` (#ffffff) |
| Hover | `--primary/mainhover*` (#0bb7b4) | `--text/invert` (#ffffff) |
| Disabled | `--secondary/light` (#f5f7fa) | `--text/placeholder*` (#a4adb9) |

Shadow: `drop-shadow(0px 4.4px 11.1px rgba(0,0,0,0.3))` — see `_theme.md` FAB Shadow.

---

### File Upload

Custom-styled MUI file input. States: Default / Hover / Uploading / Complete / Error.

INFERRED: drag-and-drop zone with dashed `--border/main` border, `borderRadius: 8px`.

---

### List Menu (Menu / MenuItem)

MUI `Menu` + `MenuItem`. Used for contextual action dropdowns.

Shadow: `drop-shadow(0px 3px 12px rgba(0,0,0,0.2))` — see `_theme.md` List Menu Shadow.

`borderRadius: 8px` on menu paper. Item height: INFERRED 40px (standard `dense` false).

---

### Modal (Dialog)

MUI `Dialog`. Two documented variants:

**Basic modal:**
- Simple content area, no fixed header/footer
- `maxWidth` INFERRED: `sm` for confirmations, `md` for forms

**Modal with header / footer + scrolling content:**
- Fixed `DialogTitle` header
- Scrollable `DialogContent` body
- Fixed `DialogActions` footer with Cancel + Confirm buttons
- Destructive confirm: `color="error" variant="contained"`

`onClose` handles backdrop + Escape key (MUI v5+ pattern).

---

### Progress

MUI `CircularProgress`. Labeled and unlabeled variants.

**Sizes:**
| Size | Diameter |
|---|---|
| Small | 16px |
| Medium | 20px |
| Large | 24px |

Color: `--primary/main` (#01c5c1). Optional text label below spinner (body2).

MUI `LinearProgress` not documented in Figma library — use only if Biz feature requires it.

---

### Radio

MUI `RadioGroup` + `Radio` + `FormControlLabel`.

States: Unselected / Selected / Disabled (each).

Color: `--primary/main` (#01c5c1) for selected state.

---

### Select

MUI `Select` + `FormControl`. Four Biz-specific configurations:

| Configuration | Height | Notes |
|---|---|---|
| Standard (with label) | 40px | Label above input, helper text below |
| Select without Label | 24px | Compact; used in toolbars and map controls |
| Select with Chips | Variable | Multi-select; selected values shown as chips inside field |
| Transparent Select | Variable | No visible border; used in map overlays and scheduler |

---

### Snackbar

MUI `Snackbar` + `Alert`. Four states.

**States:** Default / Success / Error / Warning

**Default state:** inverted — dark bg (`--text/primary` #1c1c1c) with white text (`--text/invert`). Not a severity Alert inside; standalone dark toast.

**Success / Error / Warning states:** use Alert severity tokens (same as Alert component above).

**Props:** icon (bool), closeButton (bool), undo action (bool).

Shadow: `drop-shadow(0px 3px 6px rgba(0,0,0,0.2))`.

Anchor: `bottom-right` (MUI default).

`autoHideDuration`: INFERRED 6000ms unless action is present.

---

### Switch

MUI `Switch` + `FormControlLabel`.

Dimensions: 27.2×16px (thumb + track).

States: Off / On / Disabled.

Optional front and back text labels (custom Biz extension of standard switch).

Color: `--primary/main` (#01c5c1) for On state track.

---

### Table Pagination

MUI `TablePagination`. Rows-per-page selector + page navigation arrows.

Standard MUI behavior. INFERRED: `rowsPerPageOptions={[10, 25, 50]}`.

---

### Tab

MUI `Tabs` + `Tab`.

**Heights:**
| Variant | Height |
|---|---|
| Regular | 40px |
| Large | 56px |

Active indicator: 2px bottom border, color `--primary/textandicon*` (#00a9a1).

Active tab text: `--primary/textandicon*` (#00a9a1).

Inactive tab text: `--text/secondary` (#676c74).

Tab badges: see Badge section above.

---

### Text Field

MUI `TextField`. Default variant: `outlined`.

States: Default / Hover / Focused / Error / Disabled.

Border color: `--border/main` (#b9c0cc).

Focused border: `--primary/main` (#01c5c1).

Placeholder: `--text/placeholder*` (#a4adb9).

Height: 40px (medium size, standard).

Search field variant: 335px wide (used in Top Bar).

---

### Toggle Buttons

MUI `ToggleButtonGroup` + `ToggleButton`.

States: Unselected / Selected / Disabled.

Selected bg: `--primary/light` (#e8f8f8), selected text/icon: `--primary/textandicon*` (#00a9a1).

Used for view-mode switching (e.g. list vs grid, day vs week).

---

## Custom Components (Biz Only)

---

### Custom Icons

Biz-specific icon set beyond standard MUI icons (Tabler / Material). SVG icons only.

Icons documented in Figma: office-map, space-list, seat-list, scheduler, inventory, locker, analytics, manual (sidebar menu icons).

CONFIRM: Full icon catalog and naming convention for implementation.

---

### Empty State

Two variants:

**Illustration variant:**
- Width: 300px
- Custom SVG illustration (context-specific)
- Optional title (`h5` or `h6`)
- Description text (overline style — uppercase, `--text/tertiary*`)

**Text-only variant:**
- Width: 200px
- Single body2 italic text line
- No illustration

---

### Map Date Navigation

Custom component for the Office Map feature. Allows day-by-day navigation with prev/next arrows.

Uses on-map button shadow: `drop-shadow(0px 4px 20px rgba(0,0,0,0.15))`.

INFERRED: arrows are MUI `IconButton`, date label is `body1`.

---

### Month Year Navigation

Custom month/year picker navigation. Prev/next arrow buttons flanking a month+year label.

Used in Scheduler and Date Picker header context.

INFERRED: MUI `IconButton` arrows + `body1` or `h6` label.

---

### Profile Card

User profile card. Contains: avatar (32×32px or larger), name (`body1`), status/role (`caption`).

Used in Top Bar and potentially in user list contexts.

---

### Timeline Picker

Custom timeline / time-range selection component for Scheduler.

INFERRED: horizontal scrollable timeline with draggable start/end handles.

CONFIRM: full anatomy and token usage — not standard MUI.

---

## Open Items

1. CONFIRM: Workflows chip color token (`--highlight*/main` or separate?).
2. CONFIRM: Full custom icon catalog and implementation naming convention.
