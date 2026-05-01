---
product: biz
feature: locker
platform: admin-portal
status: draft
last_updated: 2026-05-01
confirms_needed: 0
---

# Locker — Admin Portal

Sources:
- ClickUp doc `8cgr555-35898`, page `8cgr555-73698` — Admin portal: Administration
- ClickUp doc `8cgr555-35898`, page `8cgr555-73718` — Admin portal: Map editor
- ClickUp doc `8cgr555-35898`, page `8cgr555-72558` — Admin portal: Locker (create, manage, CSV, search, reports)
- Figma: https://www.figma.com/design/QLihniCb5uRhbCwE4ufLrO/Locker-2026

---

## Settings

**Location:** Reception → Settings (or relevant admin settings section)

### User Portal Settings

| Setting | Default | Notes |
|---|---|---|
| Locker Transfers and Bookings | Enabled | Disabling hides "Make a Transfer" and "Book Locker" buttons in user portal |
| Allow locker booking during seat booking | Disabled | Shows locker booking checkbox in seat booking flow when enabled |

### Locker Sizes (read-only)

| Size | Dimensions |
|---|---|
| S | 1×1 |
| M | 1×2 or 2×1 |
| L | 2×2 |
| XL | 2×3 or 3×2 |
| XXL | 3×3 |

Sizes are determined by cell merging in the locker group grid.

### Email Notifications

7 toggles (each can be enabled/disabled):

| Notification | Notes |
|---|---|
| Booking confirmation | Sent on booking |
| On the day booking reminder | 15 min before locker start time |
| Return locker reminder | Configurable per locker group (see Create Locker Group) |
| Transfer confirmation (sender) | Sent to sender on transfer |
| New pick-up notification (receiver) | Sent to receiver on transfer |
| Confirm pick-up notification (sender) | Sent to sender when receiver confirms |
| Overdue pick-up notification | Add button · up to 5 intervals configurable |

---

## Create Locker Group

Figma: https://www.figma.com/design/QLihniCb5uRhbCwE4ufLrO/Locker-2026?node-id=100-30386

### 1.1 General Settings

| Field | Type | Validation / Notes |
|---|---|---|
| Locker Group Name | Text | Required · Max 50 chars · Must be unique · Errors: "Title is required…", "Title must not exceed 50 characters", "This title is already in use" |
| Area | Dropdown | Optional |
| Auto Start Time for Bookings | Time picker | Default: 08:00 · Locker booking starts automatically at this time unless started earlier manually · Tooltip: "Automatically starts locker booking at the set time. Users checking in before this time can start early; users checking in after will receive locker details automatically." |
| Return Time for Bookings | Time picker + radio | Radio: "Same day" (default 21:00) / "Next day" (default 07:00) · Switching preserves last entered value · Same day: must be later than Start Time · Next day: must be ≤ Start Time · Tooltip: "This setting applies only to lockers with the Bookings usage type" |
| Return reminder notifications | Dropdown | Options: 10 (default) / 15 / 30 / 60 / 90 / 120 minutes before Return Time |
| Access Method | Dropdown | Pin code (currently only option) · When selected: numeric field "# digits (max: 12)" · Default: 4 · Range: 1–12 (clamped) |
| Locker Usage Type | Dropdown | Transfers and Bookings (default) / Transfers only / Bookings only · Helper: "You can change the usage type for individual lockers or assign dedicated lockers after creation" |

### 1.2 Layout Setup

**Locker Naming Pattern:**
- Prefix: text, max 10 chars.
- Suffix: text, max 10 chars.
- "Use leading zeros" toggle (default off). Leading zero count scales with largest number (e.g. largest=60 → 1 leading zero; largest=100 → 1–2 leading zeros).
- Font size scales with locker name length: first 13 chars fit in grid; 14th char+ wraps to second line.
- Prefix/suffix/leading-zeros reflected immediately in grid preview.

**Numbering Order dropdown:**
1. Left to right, left to right (default)
2. Left to right, right to left
3. Top to bottom, top to bottom
4. Top to bottom, bottom to top

Reflected immediately in grid preview.

**Locker Group Size:** Rows × Columns
- Default: 4×4 · Range: 1–25 (clamped) · Reflected immediately in grid preview.

### 1.3 Grid Preview

- Figma: https://www.figma.com/design/QLihniCb5uRhbCwE4ufLrO/Locker-2026?node-id=100-30386
- Header: total cell count.
- Left column: grid preview. Columns labelled A–Y; rows labelled 1–25. Each cell: 96×64px.
- Right column: selected cell's settings (default: first cell selected).

**Cell settings:**
- Coordinate: readonly. Format: `[Col][Row]`. Merged cells: `[TopLeft]:[BottomRight]`.
- Size (max 3×3): default 1×1. Merging starts top-left. Errors: "Exceeding the grid layout" / "Overlapping with another merged cells". Merged cell cannot combine with another merged cell even if total is within 3×3. Errors block grid update. Trying to reduce Locker Group size that would affect merged cells: error "Unable to update locker group size. Please remove or resize any affected merged lockers first." (grid not updated until resolved). Total locker count updates when merged cells reduce count.
- "Mark as non-locker" checkbox (default unchecked): shows dropdown — Empty (default) / Touch panel / Rack / Utility / Other. Non-lockers excluded from total locker count; shown as e.g. "14 Total (1 non-locker)".

Note shown at bottom: "Please note that once created, the locker group layout can no longer be modified."

After creation: Locker Group's details page loads.

---

## Locker Group Details Page

Figma: https://www.figma.com/design/QLihniCb5uRhbCwE4ufLrO/Locker-2026?node-id=116-28120

### 2.1 Group Info

- Heading: "Locker Group: [name]"
- QR code (top right), Group ID (UUID), Group Name, Area, Return Time (time + same/next day), Return reminder, Access Method, Created at (YYYY/MM/DD hh:mm).

**Actions:**
- Edit Group: editable fields = Name, Area, Start Time, Return Time, Return reminder, Access Method.
- Print Group QR Code.
- Print All Locker Cards (QR code included for dedicated lockers).
- Delete Group: confirmation prompt required.

### 2.2 Locker Details Panel

Links: View locker list (filters search by group UUID) · Export to CSV · Update by CSV.

Header: total locker count + total non-lockers (if any). Status counts: `[#] Available` · `[#] In use` · `[#] Dedicated`.

Same grid as creation. First cell selected by default. Grid shows "In use" label and QR icon (dedicated locker).

Selected locker details:
- Coordinate · Status (Available/In use/Dedicated) · Locker ID (UUID) · Locker Name.
- Locker Usage Type: Public (Transfers and Bookings / Transfers only / Bookings only) or Dedicated User/Department.
- Locker Pin by Admin: "No pin" if blank.
- Print Locker Card button.

Non-locker details: coordinate + label (Empty/Touch Panel/Rack/Utility/Other).

Edit button → edit mode.

### 2.3 Edit Locker Details

Editable fields:
- Locker Name: text field.
- Locker Usage Type: Radio Public/Dedicated.
  - Public: dropdown (Transfers and Bookings / Transfers only / Bookings only).
  - Dedicated: dropdown (User / Department / User Group [next phase]). Multiple selectable; shown as chips. Grid shows QR icon for dedicated. NOT editable if locker status is "In use".
- Locker Pin by Admin: alphanumeric only. Placeholder asterisks = required char count. Helper: "Leave blank for no pin. If set, [#] characters are required." Error highlight if wrong length.

Non-lockers: dropdown to change label.

Changed cells highlighted in yellow. Footer shows "[#] changes made".

Footer actions: Cancel (confirmation prompt to discard) · Save Changes (enabled only when changes exist).

---

## CSV

Figma: https://www.figma.com/design/QLihniCb5uRhbCwE4ufLrO/Locker-2026?node-id=110-28106

### New / Changed Columns

| Column | Notes |
|---|---|
| Coordinate | Format `[col][row]`; after Locker ID; readonly |
| Row Span | 1–3; after Coordinate; readonly |
| Col Span | 1–3; after Row Span; readonly |
| Access Method | Pin code; after Group Name; readonly |
| Pin Code Digit | 1–12; after Access Method; error if out of range or mixed values across rows |
| Locker Name | Max now 23 chars (was 4) |
| Locker Pin Type | Now auto-sets to "Set by Admin" when pin entered; blank = "None" |
| Locker Usage Type | New values: "Transfers and Bookings" / "Transfers only" / "Bookings only" (was "Only Transfers" / "Only Bookings") |
| Dedicated IDs | Now supports both user UUIDs and department UUIDs |
| Dedicated Users | Now supports both user email and department name |
| Locker Status | Values: "Available" / "In use" / "Reserved" (was "Used") |

---

## Search

Figma: https://www.figma.com/design/QLihniCb5uRhbCwE4ufLrO/Locker-2026?node-id=169-78261

MUI table; sortable by column header; default sorted by first column. Pagination: 100 rows/page default; `[#]–[#] of [Total]`.

### Locker Groups Table

| Column | Notes |
|---|---|
| Group Name | |
| Area | |
| Return Time | `[time] ([same day/next day])` |
| Access Method | `Pin code: [#] digits` |
| Total Lockers | Sum of Available + In Use + Dedicated; right-aligned |
| Total Available | Right-aligned |
| Total In Use | Right-aligned |
| Total Dedicated | Right-aligned |
| Locker List | Arrow icon → Search Lockers filtered by group UUID |
| View Group | Arrow icon → Group details page |

### Lockers Table

| Column | Notes |
|---|---|
| Coordinate | `[col][row]` |
| Locker Name | |
| Locker Size | S/M/L/XL/XXL `([col-span]×[row-span])` · Sort order: S(1×1), M(1×2), M(2×1), L(2×2), XL(2×3), XL(3×2), XXL(3×3) |
| Usage Type | Transfers and Bookings / Transfers only / Bookings only / Dedicated locker |
| Dedicated To | User or department names |
| Status | Available / In use / Reserved |
| Pin Code | None / Set by Admin |
| Locker Group | |
| View Locker | Arrow icon → Group details page with locker selected in grid |

---

## In Use Lockers (Reports)

Figma: https://www.figma.com/design/QLihniCb5uRhbCwE4ufLrO/Locker-2026?node-id=169-84974

Location: Reports → new tabs "Locker Usage Report" and "In Use Lockers". Locker Usage Report unchanged.

In Use Lockers: search field + MUI table.

| Column | Notes |
|---|---|
| Start Date | YYYY/MM/DD hh:mm |
| Name | Current user |
| Coordinate | |
| Locker Name | |
| Usage | Booking / Transfer Received |
| Locker Group | |
| Return/Pick-up Due | YYYY/MM/DD hh:mm · Booking: return time from group settings · Transfer: based on admin setting |
| Status | In use (active, not overdue) / Late return (booked, past due) / Overdue (pick-up, past due) |
| Return Reminder | "Send" button → prompt "Send Reminder" with optional custom message textarea → email to current user |
| Force Return | Button → prompt "Force Return" with optional custom message → email to current user → locker status → Available |

---

## Map Editor — Locker Group Placement

Figma: https://www.figma.com/design/QLihniCb5uRhbCwE4ufLrO/Locker-2026 (map editor nodes)

When a map area is assigned, a Locker section appears in the right panel showing:
- Locker Group Name
- Column × Row dimensions

Drag and drop a locker group object onto the map. The placed object shows the column count with a facing arrow.

**Object toolbar:**

| Property | Default |
|---|---|
| Width | 45 |
| Height | 30 |
| Depth | 45 |
| Design | Type 1 |
| Angle | Adjustable |
| Remove | — |
| Close | — |
