---
product: biz
feature: office-map
platform: admin-portal
status: draft
last_updated: 2026-05-01
confirms_needed: 0
---

> Admin portal delta — differences from user portal baseline.

Figma: [CKBiz-Seat-Graphic](https://www.figma.com/design/lg9evsvra9krY43wOtev6W/CKBiz-Seat-Graphic) · [CKBiz-3D-2D-Map](https://www.figma.com/design/znKAh2hxYjrfjc5bGRMJGm/CKBiz-3D-2D-Map)
ClickUp source: [Office Map specs (doc 8cgr555-9038)](https://app.clickup.com/9010156709/docs/8cgr555-9038)

---

## A01 — Dynamic Time Slot Settings

**Objective:** Allow admin to customize time slot configuration for seat bookings.

**Screen areas:** I. Booking Time Settings · II. With time slots · III. Full-day only

Figma: [CKBiz-Seat-Graphic](https://www.figma.com/design/lg9evsvra9krY43wOtev6W/CKBiz-Seat-Graphic?node-id=1971-835823)

### I. Booking Time Settings

Radio options:
- With time slots → shows Timeslots Setup
- Full-day only → shows Full-day only Setup

### II. With Time Slots

**Timeslots Setup fields:**

| # | Label | Field | Notes |
|---|---|---|---|
| 1 | On the Day Booking | Enabled/Disabled | |
| 2 | Seat Booking Automatic Cancellation | Enabled/Disabled | |
| 3 | Allow multiple selection | On/off toggle | When enabled: "Time slots cannot overlap when multiple selection is enabled. Please adjust the start and end times." |
| 4.1 | Active (per row) | On/off toggle | Up to 5 rows total |
| 4.2 | Label (default language) | Text field | |
| 4.3 | Start Time | Time picker | |
| 4.4 | End Time | Time picker | |
| 4.5 | Booking Due | Dropdown (up to 24 hours) | |
| 4.6 | Auto Cancel | Dropdown (up to 24 hours) | |
| 4.7 | Default | Radio or checkbox | |
| 5 | Selection Type | Radio options | Toggle / Dropdown / Dropdown with time information |
| 6 | Preview section | Refer to AC01 Preview section | |
| 7 | Except Departments from Automatic Cancellation | Dropdown (department list) | |

**Selection type × multiple selection preview combinations:**

| # | Selection Type | Multiple Selection | Result |
|---|---|---|---|
| 1 | Toggle | Off | Single toggle |
| 2 | Dropdown | Off | Single dropdown |
| 3 | Dropdown with time info | Off | Single dropdown with time |
| 4 | Toggle | On | Multi-toggle |
| 5 | Dropdown | On | Multi-dropdown |
| 6 | Dropdown with time info | On | Multi-dropdown with time |

### III. Full-Day Only

**Full-day only setup fields:**

| # | Label | Field |
|---|---|---|
| 1 | Start Time | Time picker |
| 2 | End Time | Time picker |
| 3 | On the Day Booking | Enabled/Disabled |
| 4 | Due time | Dropdown (up to 24 hours) — shown under On the Day Booking |
| 5 | Seat Booking Automatic Cancellation | Enabled/Disabled |
| 6 | Cancel time | Dropdown (up to 24 hours) — shown under Seat Booking Automatic Cancellation |
| 7 | Except Departments from Automatic Cancellation | Dropdown (department list) |

**Flow:** On the Day Booking due time and Auto Cancellation time work together; see ClickUp spec for flow chart.

---

## 3 — Map Editor Improvements

**Background:** Current map editor limited to pin-point icons for spaces; creation flow feels disconnected. Goal: improve spatial accuracy and user experience.

Figma: [CKBiz-3D-2D-Map](https://www.figma.com/design/znKAh2hxYjrfjc5bGRMJGm/CKBiz-3D-2D-Map?node-id=22534-36217)

### Objectives

- **Improve spatial accuracy** — Replace pin-point icon with tools to define actual area/dimensions.
- **Enhance UX** — More intuitive creation flow; less effort, more confidence.

---

### Phase 1 — Implemented

#### 1. Onboarding

4-step onboarding shown on first entry to map editor, introducing new changes. (Note: Only 3 steps implemented in dev — space polygon not done yet.)

#### 2. Space Creation

- Assets organized in accordion sections; Space section contains pin icon and polygon icon.
- Polygon icon → drawing toolbar (replaces Create button) to draw space shape. *(Phase 1: polygon icon not included)*
- Pin icon → places pin-point directly.
- After space placed: layer changes to inactive state.
- Multi-select space layers and drag to map.
- Alignment toolbar appears when 2+ objects selected.
- Anchor point editor tool for editing polygon points.
- Space color determined by status (not user-selectable).
- Warning shown when selected assets have different settings.

#### 3. Seat Creation

- Drag seat layer onto map to place.
- Seat configuration toolbar appears after placement:
  - Adjust seat count (horizontal/vertical)
  - Seat margin *(dev: not implemented yet)*
  - Rotation angle (arrow on seat shows facing direction)
  - Seat color (default: #808080, 100% opacity; opacity fixed)
- Multi-select → alignment toolbar with left/center/right/top/middle/bottom options + distributed alignment.
- Seat label shows only on hover or when selected *(dev: currently always showing)*.
- Toggle label visibility via checkbox in toolbar.

#### 4. Map Area Creation

Map Area enables heatmap and analytics views by zone.

- Click (+) → "Create Map Area" → drawing toolbar for polygon shape.
- Fill floor area info in sidebar after drawing.
- Saved map area appears in sidebar layer list.
- Default color: #C8F7F5 at 50% opacity.
- Delete confirmation prompt shown. *(Dev note: deletion no longer affects DB directly; dialog removed)*

#### 5. Saving and Closing

- Toast notification on successful save.
- Save button disabled when no changes.
- Confirmation modal on close if unsaved changes exist.

#### 6. Settings

- Upload background image → auto-generates map dimensions (aspect ratio fixed).
- Upload Excel (.xls) for asset auto-generation. *(Dev: not implemented yet)*

---

### Next Phase (Not Started)

#### Admin Portal Improvements

- Move "Office Map" tab next to registration page (same function: layout management).
- Move "Create map" button to top of page (currently below the fold).

#### Map Editor Phase 2

- Create Map option: new map or copy existing, guided setup flow.
- Add object via (+) button → toolbar with all available objects including custom objects.
- Locker area shape creation.
- Free label movement.
- 3D view with layer hide/show toggle.
- Settings: snap to grid, label font size.

---

### Specification Details

#### Create Button

| State | Behavior |
|---|---|
| Default | (+) create button |
| Expanded | Changes to × button; shows "Add object" and "Draw floor area" submenus |

#### Toolbar Types

| # | Toolbar | Trigger |
|---|---|---|
| 1 | Drawing toolbar | Drawing space, locker, floor area, depository |
| 2 | Alignment toolbar | 2+ items selected |
| 3 | Seat toolbar | Seat selected — edit seat count/margin |
| 4 | Object toolbar | Add object to map *(Phase 2)* |

#### Keyboard Shortcuts

| # | Function | Shortcut |
|---|---|---|
| 1 | Undo | Ctrl/Cmd + Z |
| 2 | Redo | Ctrl/Cmd + Y |
| 3 | Selection tool | V |
| 4 | Shape tool | R |
| 5 | Delete | Delete key |
| 6 | Re-center | Ctrl/Cmd + 0 |
| 7 | Save | Ctrl/Cmd + S |
| 8 | Toggle 3D/2D | Ctrl/Cmd + 3 *(dev: 3D→2D not working yet)* |
| 9 | Close toolbar | Esc |

#### Grid — Snap to Grid *(Phase 2)*

- Default: enabled. User can toggle in settings.
- Each grid unit = 8px = 5cm real-world.
- Example: 4×6m room → 80×120 grid units. Grid size constant regardless of background dimensions.
