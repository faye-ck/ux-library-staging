---
product: biz
feature: components
status: stable
last_updated: 2026-05-01
confirms_needed: 0
---

# Biz — Components

> MUI-based and custom components for the Biz User Portal (web). Source: Figma library `-Library- Biz User Portal v2` (key `Br4iJ26Yaj0Qn8RHz0mSht`).

For Figma plugin import keys, prop names with `#uid` suffixes, code snippets, and icon catalog → see `_figma-api.md`.

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

**Figma components:**
- **Alert** — desktop/web. 12 variants: State × Size.
- **Alert mobile** — mobile layout. 12 variants: State × Size (full-width, stacked).

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

MUI `Button`. Sizes: Small / Medium. States: Default / Hover / Disabled / Loading.

**Figma component variants:**
| Figma name | MUI equivalent | Color | Typical use |
|---|---|---|---|
| Primary | `contained` | `primary` | New booking, confirm, primary CTA |
| Secondary | `outlined` | `secondary` | Secondary action |
| Outlined | `outlined` | `primary` | Cancel, secondary |
| Outlined Primary | `outlined` | `primary` | Alternate outlined style |
| Outlined Error | `outlined` | `error` | Destructive secondary |
| Transparent | `text` | `primary` | Tertiary action, nav links ("My Bookings") |
| Icon Transparent | `text` icon-only | `primary` | Icon-only toolbar action |
| Icon Outlined | `outlined` icon-only | `primary` | Icon-only outlined action |
| Icon Vertical | `text` icon + label stacked | — | Bottom-tab style actions |
| Transparent with Badge | `text` + badge overlay | — | Nav actions with count indicator |

FAB documented separately below.

`loadingIndicator` used for async submit states (built-in MUI v5+).

---

### Checkbox

MUI `Checkbox` + `FormControlLabel`.

States: Unchecked / Checked / Indeterminate / Disabled / Active-disabled.

Color: `--primary/main` (#01c5c1) for checked/indeterminate.

**Group fieldsets:**
- **Checklist Fieldset Vertical** — vertical checkbox group. States: Default / Error / Disabled.
- **Checklist Fieldset Horizontal** — horizontal checkbox group. States: Default / Error / Disabled.

---

### Chip

MUI `Chip`. Three shape / type variants.

**Round Chips** (pill, `borderRadius: 100px`): interactive filter chips.
- States: Default / Hover / Active / Active Hover / Error / Disabled
- Sizes: Medium (32px) / Small (24px)

**Square Chips** (`borderRadius: 4px`): same state/size set as Round Chips.

**Filled Info Chips**: read-only informational chips (non-interactive). 32 variants — Size × State × Mode (Light/Dark).
- States: Primary / Secondary / Info / Success / Warning / Error / Highlight / Workflows
- Sizes: Medium / Small
- Info bg: `--_components/alert/info/background` (#e3f2fd) + `--info/main` (#1e88e5) text
- Highlight variant uses `--highlight*/main` (#9c72ed)
- Workflows variant: teal (`--primary/main`) token family

---

### Date Picker

MUI X `DatePicker`. Calendar popover uses `borderRadius: 8px`. `--primary/main` (#01c5c1) for selected date fill.

**Figma components:**
- **Basic Date Picker** — standalone calendar component. Inner day states: Default / Today / Selected / Weekend / Disabled / Empty.
- **Date Range** — standalone. Two-date range selection calendar.
- **Single Day Cell** — 8 variants (State). Sub-component used inside Date Picker.
- **Range Cell** — 20 variants (State × Selected). Sub-component for date range picker.

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

Custom-styled MUI file input. Dashed `--border/main` border, `borderRadius: 8px`.

**Figma components:**
- **Uploaded File** — file attachment chip. States: Default / Hover.
- **File Upload** — upload drop zone. States: Default / Hover / Error (3 variants).
- **File Upload Fieldset** — full upload field with label. States: Default / Hover / Error (3 variants).

---

### List Menu (Menu / MenuItem)

MUI `Menu` + `MenuItem`. Used for contextual action dropdowns.

Shadow: `drop-shadow(0px 3px 12px rgba(0,0,0,0.2))` — see `_theme.md` List Menu Shadow.

`borderRadius: 8px` on menu paper. Item height: INFERRED 40px (standard `dense` false).

---

### Modal (Dialog)

MUI `Dialog`. Two Figma variants:

**Basic Dialog** — simple content area. No fixed header/footer. `maxWidth: sm` for confirmations, `md` for forms.

**Scrolling Long Dialog** — fixed `DialogTitle` header, scrollable `DialogContent` body, fixed `DialogActions` footer with Cancel + Confirm buttons. Destructive confirm: `color="error" variant="contained"`.

`onClose` handles backdrop + Escape key (MUI v5+ pattern).

**Action Footer** (companion component, 3 types: Custom / Confirmation / Close dialog):
- **Action Footer** — desktop portal footer. Types: Custom / Confirmation / Close dialog.
- **Action Footer mobile** — mobile-adapted layout. Same 3 types.
- **Cancel Action** — standalone cancel button component.

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

States: Unchecked / Checked / Disabled / Checked disabled.

Color: `--primary/main` (#01c5c1) for selected state.

**Group fieldsets:**
- **Radio Fieldset Vertical** — vertical radio group. States: Default / Error / Disabled.
- **Radio Fieldset Horizontal** — horizontal radio group. States: Default / Error / Disabled.

---

### Select

MUI `Select` + `FormControl`. Six Biz-specific configurations:

| Figma name | Height | Variants | Notes |
|---|---|---|---|
| Select | 40px | State × Size (12 variants) | Standard with label, helper text |
| Select without Label | 24px | State (7 variants) | Compact; toolbars and map controls |
| Select with Chips | Variable | State (6 variants) | Multi-select; selected values as chips |
| Filter Select | — | State × Size (14 variants) | Filter/search context |
| Filter Select Transparent | — | State × Size (14 variants) | Transparent filter style |
| Transparent Select | — | State × Size (18 variants) | No border; map overlays, scheduler |

---

### Snackbar

MUI `Snackbar` + `Alert`. Four states.

**States:** Default / Success / Error / Warning

**Default state:** inverted — dark bg (`snackbar.fill` #323232) with white text. Not a severity Alert; standalone dark toast.

**Success / Error / Warning states:** use Alert severity tokens (same as Alert component above).

**Props:** icon (bool), closeButton (bool), undo action (bool).

Shadow: `drop-shadow(0px 3px 6px rgba(0,0,0,0.2))`.

Anchor: `bottom-right` (MUI default). `autoHideDuration`: 6000ms unless action is present.

---

### Switch

MUI `Switch` + `FormControlLabel`.

Dimensions: 27.2×16px (thumb + track).

States: Off / On / Disabled.

Optional front and back text labels (custom Biz extension of standard switch).

Color: `--primary/main` (#01c5c1) for On state track.

---

### Table Pagination

MUI `TablePagination`. Rows-per-page selector + page navigation arrows. `rowsPerPageOptions={[10, 25, 50]}` typical.

---

### Tab

MUI `Tabs` + `Tab`.

**Figma components:**
- **Tab Menu** — single tab item. 6 variants: State (Default·Hover·Active) × Size (Regular·Large).
- **Tab Menu Group** — prebuilt tab bar. Standalone, no variants.

**Heights:**
| Size | Height |
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

**Figma components:**
- **Toggle Button (Standalone)** — single toggle. States: Default/Hover/Active/Active Hover/Disabled × Size: Medium/Small.
- **Toggle Button Transparent (Standalone)** — transparent style. Same 10 variants.
- **Filled Group Toggle** — segment tabs / grouped button bar. Stacking × Size (4 variants). Use this for tab bars, not Standalone.
- **Outlined Group Toggle** — bordered style. 2 variants (Stacking: First on top · Last on top). Up to 7 buttons.
- **Icon Group Toggle** — icon-only. 2 variants. Up to 5 buttons.

States: Unselected / Selected / Disabled.

Selected bg: `--primary/light` (#e8f8f8), selected text/icon: `--primary/textandicon*` (#00a9a1).

Used for view-mode switching (e.g. list vs grid, day vs week).

---

## Custom Components (Biz Only)

---

### Custom Icons

Biz-specific icon set beyond standard MUI icons (Tabler / Material). SVG icons only.

Five categories — all standalone SVG components in the icon library frame (node `38826:11293`). Search via `search_design_system("icon keyword", "Br4iJ26Yaj0Qn8RHz0mSht")`.

**Menu** (left sidebar): menu · office-map · space-list · seat-list · scheduler · inventory · locker · postal · analytics · manual

**Properties**: user · user-group · reservation · home · building · space · briefcase · break

**Action**: exit · extend-time · borrow · return · confirm-inventory · map-2d · map-3d · open-map

**Text Editor**: bold · italic · underline · strike · align-left · align-center · align-right · align-justify · bullet-list · ordered-list · link · unlink · blockquote · highlight · clear-format · more

**Small & Filters**: status · category · tag · asset · user · user-group · location · area-group · area · work · calendar · calendar-hidden · calendar-restore · calendar-restore-recurrence · calendar-remove · calendar-remove-recurrence · all-filter

**Inventory Categories**: devices · computer · monitor · phone · accessory · projector · printer · folder · box · book · stationery · card · camera · wifi · tool · firstaid · safety · key · vehicle · machinery · furniture · consumable · clothes · other

For full node IDs and import keys → `_figma-api.md` → Custom Icon Catalog.

---

### Empty State

Two variants:

**Illustration variant:**
- Width: 300px
- Custom SVG illustration — 10 context-specific illustrations available: Time-logs, Seat, User-list, User-group, Empty, Completion, Seat-booking, Space-booking, Inventory, Locker
- Optional title (`h5` or `h6`)
- Description text (overline style — uppercase, `--text/tertiary*`)

**Text-only variant:**
- Width: 200px
- Single body2 italic text line
- No illustration

For illustration import keys → `_figma-api.md` → Empty State Illustrations.

---

### Date Navigation

Custom prev/next navigation components.

**Single Date Navigation** — day-by-day navigation for Office Map. Uses on-map button shadow `drop-shadow(0px 4px 20px rgba(0,0,0,0.15))`. MUI `IconButton` arrows + `body1` date label. No variants.

**Month Navigation** — month/year picker navigation for Scheduler and Date Picker header. Prev/next arrows + month+year label (`body1` or `h6`). No variants.

---

### Profile Card

User profile card. Contains: avatar (32×32px or larger), name (`body1`), status/role (`caption`).

**Figma components:**
- **Profile** — 3 variants (Type). Used in Top Bar and user list contexts.
- **User List** — person row, 4 variants (State × Size). Rich user list item with name, role, company, action slots.
- **List Select All Header** — select-all row for user list tables. Standalone.

---

### Timeline Picker

Custom horizontal time-slot selection component for Scheduler and Space Booking.

**Timeline Picker** — full component showing 5 configurable slots. No variants. Used in Space Booking - Space details.

**Timeline Slot** — sub-component. 6 variants (Type). Each slot can represent a selectable time block in the timeline.

Not standard MUI — custom implementation.

---

### Avatar

MUI `Avatar`. **Avatar Wrapper** component set: 5 size variants (16 · 21 · 24 · 32 · 48px). Fill: `avatar.fill` (#b9c0cc) for icon/letter fallback.

**Standalone avatar assets** (INSTANCE_SWAP targets):
- **Photo avatars** — 27 named person avatars (Ohta Momo, Taro Yamada, etc.)
- **Letter avatars** — Large / Medium / Small initials
- **Icon avatars** — User / Location / Department

For keys → `_figma-api.md` → Component Set Keys → Data Display.

---

## Open Items

1. Confirm whether `--primary/dark` and `--primary/textandicon*` are both `#00a9a1` or slightly different values.
2. Confirm MUI semantic token mapping for `--highlight*/main` (#9c72ed) — likely not a standard palette key.
