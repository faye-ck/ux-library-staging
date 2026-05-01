---
product: biz
feature: locker
platform: feature
status: draft
last_updated: 2026-05-01
confirms_needed: 0
---

# Locker — Feature (User Portal)

Sources:
- ClickUp doc `8cgr555-35898`, page `8cgr555-73978` — User portal: Locker's dashboard
- ClickUp doc `8cgr555-35898`, page `8cgr555-72598` — User portal: Office map, Seat booking, My Bookings
- Figma: https://www.figma.com/design/QLihniCb5uRhbCwE4ufLrO/Locker-2026

---

## Locker Dashboard

Dedicated Locker screen in user portal. Shows all locker-related activity in summary grids.

### 1.1 Summary Grids

**In use** — shown if there's an active locker for the day.
- Shows locker name. Click → booking details + Return Locker button.

**Pick-ups** — shown if there are unconfirmed pick-ups (receiver).
- List: sender avatar, locker name, locker group name, sent date/time, sender's name, Confirm pick-up button.
- Clicking row → details + pin code.
- On confirm → toast: "Pick-up has been confirmed".

**Bookings** — shown if there are future locker bookings.
- List: locker name, locker group name, map name, booking date and return time, Cancel booking button.
- Clicking row → details.
- Cancel → confirmation prompt → toast: "Booking has been cancelled".

**Transferred** — shown if there are unconfirmed transfers (sender side).
- List: receiver avatar, locker name, locker group name, sent date/time, recipient name.
- No action from sender side; record disappears once receiver confirms pick-up.

### 1.2 Locker Groups

- Map list dropdown: all maps selected by default.
- Grid of locker groups, each showing: group name, map name, total lockers count, In use / Dedicated / Available counts (only non-zero statuses shown; if all available, show "No lockers available" when 0).
- Selecting a grid → right panel shows group details.

Right panel details, transfer flow, and booking flow: same as Office Map spec (sections 1.4–1.6 below).

---

## Office Map Integration

### 2.1 Search by Keywords

Searchable from office map: locker group name · locker name · dedicated user · dedicated department.

Results shown under new **Lockers** tab. Priority order:

1. **Dedicated Lockers** (divider: `[#] Dedicated Lockers`)
   - User: avatar, user name, locker name, locker group name (clickable), coordinate. Action: Make a Transfer.
   - Department: dept icon, dept name, locker name, locker group name (clickable), coordinate. Action: Make a Transfer.
   - Clicking group name → opens grid preview on map + highlights locker; right panel shows dedicated locker details (1.4.2).

2. **Public Lockers** (divider: `[#] Public Lockers`)
   - By group name: group name, map name, total lockers, Show/Hide locker list. Clicking group → grid preview, no highlight; right panel shows group details (1.4.1).
   - By locker name: same as above but only searched locker shown in list.

Results may span multiple maps (same area group). Clicking a map name auto-loads that map.

### 2.2 Direct Click on Map

Click locker group's 3D object → opens grid preview + right panel with group details and actions.

### 2.3 Locker Group Grid Preview

- Header: locker group name.
- Left: total lockers count.
- Right: `[#] Available | [#] In use | [#] Dedicated`.
- Grid cells show: locker name, QR icon (dedicated), "In use" label if unavailable.
- Column labels: A–Y. Row labels: 1–25.

### 2.4 Right Panel — Public Locker Group Details (1.4.1)

- Locker group name, map name, total lockers count, QR code.
- Statuses: Available count (with breakdown by locker types) or "No lockers available" · In use count · Dedicated count.
- Only non-zero statuses shown.

### 2.5 Right Panel — Dedicated Locker Details (1.4.2)

- Label: "Dedicated locker".
- QR code top right.
- Avatar/dept icon, locker name, user/dept name, user role, coordinate.

### 2.6 Action Buttons

- **Make a Transfer** — disabled if no Transfer-type lockers available.
- **Book Locker** — disabled if no Bookings-type lockers available; not shown for dedicated lockers.

### 2.7 Make a Transfer Flow

1. Show locker group info header.
2. Select size (hidden if only 1 size; default smallest available; disabled if fully booked).
3. Recipients search: by name or email · multiple users · avatar/name/role/remove icon · min 1 required.
4. Add message (optional).
5. Pin code (required): placeholder asterisks reflect required digit count; helper: "[#] characters are required".
6. Confirm enabled when all required fields filled.

Dedicated locker variant: no size / user search / pin code; prefilled recipient (no remove icon); message only.

Confirmation screen shows: "Transfer Confirmed", group name, map name, assigned locker name + coordinate, sent date/time, recipients, message (if any), pin code.
- Assigned locker highlighted in grid preview.

### 2.8 Book a Locker Flow

1. Show locker info header.
2. Select size (skipped if only 1 size; default smallest available; disabled if fully booked).
3. Confirm.

Confirmation screen shows: "Booking Confirmed", group name, map name, locker name + coordinate, return time, status (In use), booking date, started date/time.
- Assigned locker highlighted in grid preview.
- Warning if already has active locker: "You already have an active locker. Please return it before booking a new one."

---

## Locker Booking During Seat Booking

Enabled via admin setting "Allow locker booking during seat booking". See `admin-portal.md` → Settings.

### Flow

1. Seat booking form shows checkbox "Add locker bookings for selected dates" (unchecked by default).
2. Existing locker bookings on selected dates shown:
   - "You already have locker bookings on: [YYYY/MM/DD - Locker name]"
   - If all dates already have bookings → checkbox disabled.
3. If checked: Locker Group dropdown appears. Auto-assigned by priority:
   1. Same dept restriction + same area + same map.
   2. Same dept restriction + different area, same map.
   3. Same area, same map.
   4. Different area, same map.
   - If all lockers on same map fully booked: field not auto-assigned, user selects from other maps.
4. Return time for selected locker group shown.
5. User can change locker group; fully booked groups disabled.
6. If updated dates all have existing bookings → checkbox auto-unchecked, dropdown hidden.

### Confirmation

Seat booking confirmation shows: booked date, return time, locker name, locker group name.

### Fully Booked Handling

If selected locker group is fully booked for one or more dates: extra screen shown before seat confirmation (seat/locker NOT created yet).
- Description: "Lockers are fully booked on the following dates. Please select another locker group."
- Affected dates listed with locker group dropdown (empty by default; fully booked groups disabled).
- Return time shown after selection.
- Confirming here creates both seat and locker bookings, then shows seat booking confirmation.

---

## My Bookings — Locker Tab

New "Locker" tab appears if there are in-use or future bookings.

### List View

- "In use" section first (if any), then "[#] bookings" section.
- Each item: locker name, locker group name, map name, booking date, return date/time.
- Actions: In use → Return icon; Booking → Cancel booking icon.

### Details Page

- Locker group name, map name.
- Locker name, coordinate, return time.
- Status: In use / Booked.
- Booking date, return time.
- Started at date/time (for in use): either auto-started by system or manually started mid-day.
- Action buttons.

On return → "Return Confirmation" screen with Returned at date/time.
On cancel → confirmation dialog before cancelling.
