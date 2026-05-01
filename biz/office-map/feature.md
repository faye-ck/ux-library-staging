---
product: biz
feature: office-map
platform: feature
status: draft
last_updated: 2026-05-01
confirms_needed: 0
---

> User portal baseline. Role sections inside for different permission levels.

Figma: [CKBiz-Seat-Graphic](https://www.figma.com/design/lg9evsvra9krY43wOtev6W/CKBiz-Seat-Graphic)
ClickUp source: [Office Map specs (doc 8cgr555-9038)](https://app.clickup.com/9010156709/docs/8cgr555-9038)

---

## F01 — Seat Map Navigation

**Objective:** Group relevant actions together in the UI.

**Screen areas:** I. Header navigation · II. Map navigation · III. Left menu navigation

### I. Header Navigation

**1. Company Logo** — On click: refresh current page.

**2. Search and filter** — Refer to F08 Search and filter from map.

### II. Map Navigation

**1. Add New button** — Dropdown options:
- Space booking → F02 Space booking
- Seat booking → F03 Seat booking
- Bulk seat booking → F04 Bulk seat booking

**2. My Bookings** — On click: refer to F10 My bookings.

**3. User Profile button**
- Content: Avatar · Name · Current clock-in status
- On click: User's panel with tabs:
  - Time Logs → F05 Time logs
  - My Status → F06 Custom status
  - Proxied Users → F07 Proxy user management (only shown if proxied users exist)
- In mobile: panel becomes full-width.

### III. Left Menu Navigation

**1. Expand/collapse icon** — Menu closed by default; click to toggle.

**2. Menu list (in order):** Seat Map · Users · Space · Scheduler · Inventory · Locker · Analytics · Manual

---

## F02 — Space Booking

**Objective:** Allow user to book a space within 48-hours, or consecutive full days.

**Screen flow:** I. Space details → II. Booking screen → III. Confirmed booking screen · II. Space details → IV. Booking details

### I. Space Details

**1. Space details** — Content: Space picture · Space name · Description (if provided) · Type: Space · Capacity.

**2. Timeline picker**
- Start time: 0:00 · End time: Next day's last available slot within 48 hours, max. 23:59+1
- Slot interval: 15 mins
- User can click or hold-drag on available time slots → pre-fills booking screen.

**3. New Booking button** — Opens booking screen.

### II. Booking Screen

**1. Selected space** — Show space details. User can reselect from map. If no space selected: placeholder "Select space from map". Map filtered to spaces only.

**2. Booking type toggle**
- By time: Timeline picker + time picker (2-way sync, filtered to available time only).
- By days (calendar picker):
  - Both partially and fully booked dates disabled. No default selection.
  - First click = 1 full-day booking. Selecting non-consecutive day resets. Second click creates range.
  - Max 7 consecutive days. Selectable up to 6 rolling months. Confirmed booking reserves 0:00–23:59.

**3. Add participants** — Refer to UC04 Participants list. Action dropdown: Set as organizer · Set as participant · Remove from list. Organizer (creator) checkbox disabled. Guests cannot be set as organizer.

**4. Add title and remark** — Optional toggle. Title: pre-filled with space name, max 100 chars. Remark: max 320 chars.

**5. Private booking checkbox** — When checked: lock icon in booking slots. Non-participants see "Private booking" title, hidden participant count, non-clickable. Participants see all details.

**6. Buttons** — Cancel (discard) · Confirm Booking (creates booking, triggers "New Booking" email to all participants).

### III. Confirmed Booking Screen

Content: Confirmed illustration · Space name · Details · Date · Time · Title.

**Participants list** sorted: Organizers (Creator) → Organizers → Participants → Guests. When exceeding capacity: warning message.

**Remark** — Only shown if present. Text URLs become clickable links.

**Buttons:** Edit booking (triggers "Updated Booking" email) · Duplicate booking (duplicates all except date/time) · Make another new booking.

### IV. Booking Details

**Buttons:** Back to previous (left) · Close (right).

**Actions (own booking):**
- Before start: Edit booking · Duplicate booking · Cancel booking (confirmation prompt).
- 10 mins before start: Start Event · Cancel Booking.
- After started: Extend Time (dropdown — refer to Space Booking Time Extension) · Exit Space (confirmation prompt).

---

## F02-EXT — Space Booking Time Extension

**Background:** Consistent UX across user portal, mobile app, and space signage.

**Extension options (all platforms):**
1. 15 mins
2. 30 mins
3. 60 mins — options not shown if less than extendable duration; button hidden if none available
4. Until next event (xx mins) — "xx" shows balance until next booking; max from admin's Max Extension Duration setting; if actual exceeds max, show "max. [N] mins"; include "max." prefix when actual > restricted
5. Custom — text field for custom minutes, shows available/max duration, restricts input to indicated max

**Dependent requirements:** If space booking restricted to business hours, end time of business hours is factored into max extendable duration.

Figma: [CKBiz-Seat-Graphic](https://www.figma.com/design/lg9evsvra9krY43wOtev6W/CKBiz-Seat-Graphic?node-id=8790-382254)

---

## F03 — Seat Booking

**Objective:** Allow user to book a seat for single or multiple dates.

**Screen flow:** I. Seat details → II. Booking screen → III. Confirmed booking screen · I. Seat details → IV. User profile

### I. Seat Details

**1. Seat details** — Content: Seat name · Description · Type (Individual / Group) · Capacity.

**2. Date selector** — Full localized date. Calendar picker on click. Previous/next day toggles. 2-way sync with map's calendar.

**3. Users list** — Avatar · Name · Department · Time slots · Status (Clocked-in / Booked).
Sorted: Full-day clocked-in → Partial-day clocked-in (earliest first) → Full-day booked → Partial-day booked.
On click: show user profile. Empty state: illustration + "No seated user yet".

**4. Buttons** — Clock-in (when clocked-out) · Change Seat (when clocked-in or seated) · Clock-out (when seated on that seat) · New Booking (always shown).

### II. Booking Screen

**1. Seat details** — If no seat selected: placeholder "Select seat from map". Map filtered to seats only.

**2. Calendar picker** — Multi-single day selection. Max 15 days.

**3. Date and time slot picker** — Date inputs reflect calendar selections; remove icon shown when >1 selection. Time slots reflect admin portal settings (refer to A01 Dynamic time slot settings); auto-selects when only 1 slot.

**4. Add remark** — Optional toggle. Max unspecified.

**5. Buttons** — Cancel · Confirm Booking (triggers "New Booking" email).

### III. Confirmed Booking Screen

Content: Confirmed illustration · Seat name · Details · Date/time slot list in two columns (tooltip on hover).

**Buttons:** Edit booking (triggers "Updated Booking" email) · Make another new booking.

### IV. User Profile

**Buttons:** Back (left) · Close (right).

**User info:** Avatar · Name · Role · Department · Personal number (if provided) · Clock-in status · Space participation status · Email icon (opens email client) · Teams icon (opens Teams chat).

**Custom status** — Messages · Custom link · Last updated timestamp · Edit icon (if own profile).

**Timeline view** — 0:00–23:59, 15 min slots. On click: opens booking details.

---

## F04 — Bulk Seat Booking

**Objective:** Allow user to book multiple seats for multiple users within the same day and time slot.

**Screen flow:** I. Bulk seat booking screen → II. Confirmed booking screen

### I. Bulk Seat Booking Screen

**1. Title** — "Bulk Seat Booking".

**2. Calendar picker** — UC03 Calendar picker.

**3. Date and time slot picker** — Reflects calendar selections. Time slots from admin settings (A01).

**4. Add participants** — UC04 Participants list. Action: Remove from list only. Pre-fills existing seat bookings. First unassigned user auto-selected. Next unassigned auto-selected after each seat assignment.
Validation: Unassigned user → "There's an unassigned user. Please assign seat." · Duplicate individual seat → "Individual seats are duplicated. Please reassign seats."

**5. Add remark** — Optional toggle.

**6. Buttons** — Cancel · Confirm Booking (triggers "New Booking" email to all participants).

### II. Confirmed Booking Screen

Content: Confirmed illustration · "Bulk Seat Booking" title · Date · Time slot.

**Participants list** sorted by seat name alphabetically.

**Buttons:** Edit booking (triggers "Updated Booking" email) · Duplicate booking (all details except date/time) · Make another new booking.

---

## F06 — Custom Status

**Objective:** Allow user to set custom status messages, external link, and auto-clear timer under user profile.

**Screen areas:** I. User profile · II. Custom messages · III. Auto clear · IV. External link · V. Buttons

Figma: [CKBiz-Seat-Graphic](https://www.figma.com/design/lg9evsvra9krY43wOtev6W/CKBiz-Seat-Graphic?node-id=1924-748515)

### I. User Profile

**Avatar** — Shows initials as default. Click: upload .jpg/.png; auto-crop to 1:1, compress to max 2MB.

**User info** — Full name · Logged-in email.

### II. Custom Messages

**Textarea** — Placeholder: "Enter custom status here". Max 280 characters. Live character count bottom-right.

### III. Auto Clear Options

**Clear status after dropdown:**
- Never (default) · Today (after 23:59) · 1 hour · 4 hours · This week (Sat 23:59) · Custom

**Custom:** Date picker (past dates unavailable) + time picker.

### IV. External Link

**Link title** — Placeholder: "Link title". Max 65 chars.

**External link** — Placeholder: "https://". No char limit. Error: "Please enter a valid url link".

### V. Buttons

**Clear Status** — Clears textarea, resets dropdown to Never.

**Save Status** — Updates custom status in profile, updates last-updated timestamp.

---

## F07 — Proxy User Management

**Objective:** Additional profile panel tab to manage clock-in status of proxied users.

**Screen flow:** I. Proxied user list → II. Seat assignment screen → III. Confirmed assignment screen

Figma: [CKBiz-Seat-Graphic](https://www.figma.com/design/lg9evsvra9krY43wOtev6W/CKBiz-Seat-Graphic?node-id=1419-238105)

### I. Proxied User List

**Participants list (UC04)** — Bulk and individual action dropdown:
- Clock-in and select seat → seat assignment screen
- Clock-in without seat → status "In the office"
- Working remotely
- Working offsite
- Clock-out

Current selected status filtered from individual dropdown. Repeated status from bulk action ignored in time logs. All status changes update time logs; users receive "Status updated" email.

### II. Seat Assignment Screen

**Title:** "Proxied User Seat Assignment"

**Participants** — UC04 Participants list. Action: Remove from list. Pre-fills already clocked-in seats. First clocked-out user auto-selected; next auto-selected after each assignment.
Validation: Unassigned user → error · Duplicate individual seat → error.

**Add remark** — Optional.

**Buttons** — Cancel · Confirm Status (updates status + time logs; triggers "Status updated" email).

### III. Confirmed Assignment Screen

Content: Confirmed illustration · "Proxied User Seat Assignment" · Participants list sorted by seat name · Remark (if any).

---

## F08 — Search and Filter from Map

**Objective:** Allow user to search, filter, and locate users from the map.

**Screen flow:** I. Search and filter → II. Results screen → III. User profile

Figma: [CKBiz-Seat-Graphic](https://www.figma.com/design/lg9evsvra9krY43wOtev6W/CKBiz-Seat-Graphic?node-id=1141-36)

### I. Search and Filter

**Search text field** — Placeholder: "Search name, email address, space or seat".

**"All" pill dropdown** — Click: filter by Department or Custom Group. Only one option at a time. Selected option replaces "All" label.

**Department / Group dropdown** — Toggle between Department and Group. Search list field with live filtering. Clear filter link when selection active.

### II. Results Screen

**Title:** "Search Results" + Clear all button (right).

**Tabs of result types** — Shown when 2+ result types exist.

**Listing** — Empty state: illustration + "No results". Shows total count. Content: Avatar · Name · Role · Department · Personal number (if provided) · Clock-in status · Second status (Space participation OR Custom status; participation takes priority).

Contact buttons: Email · Teams/Google (whichever synced).

**Mobile/full-width:** Panel floats at 50% height at bottom. Drag header up to 90%, down back to 50%.

**Map** — Highlights search results by selected type.

### III. User Profile

Refer to F03 Seat booking — IV. User profile. Map highlights selected user.

---

## F09 — Custom Group

**Objective:** Allow user to create custom groups for reuse in search, bookings, etc.

**Screen flow:** I. Custom Group dropdown → II. Custom Group list → III. Create group · II. Group list → IV. Edit group · II. Group list → V. Group details

Figma: [CKBiz-Seat-Graphic](https://www.figma.com/design/lg9evsvra9krY43wOtev6W/CKBiz-Seat-Graphic?node-id=2337-897028)

### I. Custom Group Dropdown

Edit button available from any custom group dropdown. Empty state: "No group created yet".

### II. Custom Group List

**Title:** "Custom Group" + Close button (right).

**Listing** — Empty state: illustration + "No group being created yet". Shows total group count. Content: Group title · Members count (hover: tooltip with names) · Action button (context-dependent) · Edit · Delete (confirmation prompt).

**Context-dependent action buttons:**

| Feature | Button | Action |
|---|---|---|
| Seat Map | Pin icon | Locate in map (F08) |
| Scheduler | Swap icon | Replace to calendar |

On click: show group details.

**New Group button** — Opens create group screen.

### III. Create Group Screen

**Title:** "New Group". **Group title field:** Required.

**Search field** — UC04 Participants list search.

**Members list** — Empty: "Start adding members". Shows total count. Content: Drag handle · Order number (auto-updates on drag or manual input) · Avatar · Name · Department · Remove button. Drag-and-drop reordering.

**Buttons** — Cancel (discard) · Create Group (disabled if title or member list empty).

### IV. Edit Group Screen

Same as III with pre-filled data. Button: Save Changes.

### V. Group Details

**Header:** Back button + Group title.

**Members list** — Total count. Content: Avatar · Name · Clock-in status · Custom status (if any) · Contact buttons (Phone if provided, Email, Teams/Google).

**Buttons** — Context action (see table in II) · Edit · Delete (confirmation prompt).

---

## F10 — My Bookings

**Objective:** Allow users to manage upcoming bookings.

**Screen areas:** I. Title & tab navigation · II. Empty state · III. Space bookings · IV. Seat bookings · V. Inventory bookings

Figma: [CKBiz-Seat-Graphic](https://www.figma.com/design/lg9evsvra9krY43wOtev6W/CKBiz-Seat-Graphic?node-id=4262-477557)

### I. Title & Tab Navigation

Title: "My Bookings". Close panel button (right). Tabs: Space · Seat · Inventory (in order). Badge shows total bookings per tab; hidden when empty.

### II. Empty State

Illustration + "No bookings yet" when all tabs empty.

### III. Space Bookings

**Divider:** "XX Bookings" (hidden if empty).

**Booking details:** Space name · Date/time. On click: booking details (F02 IV).

**Action buttons:** Duplicate · Edit · Cancel (confirmation prompt).

**Ongoing:** Divider "Ongoing". Actions: Extend Time (F02-EXT) · End Meeting (confirmation prompt).

**Starting Soon:** Divider "Starting Soon". Actions: Start Event · Cancel Booking (confirmation prompt).

**Sorting:** Ongoing by closest end date · Starting Soon by closest start date · Bookings by closest start date.

### IV. Seat Bookings

**Divider:** "XX Bookings" (hidden if empty).

**Booking details:** Seat name · Booking date · Booking slots (comma-separated).

**Action buttons:** Edit · Cancel (confirmation prompt).

**Sorting:** Closest start date.

### V. Inventory Bookings

**Borrowing ("XX Borrowing"):** Item name · Date/time (format: yyyy/mm/dd HH:mm - mm/dd HH:mm). Actions: Take inventory · Edit booking · Return item.

**Bookings ("XX Bookings"):** Item name · Date/time. Actions: Borrow (shown when start time reached) · Edit booking · Cancel (confirmation prompt).

**Dedicated items:** Separated by divider. Not counted in tab badge. Actions: Take inventory · Return item.

**Sorting:** Borrowing by closest end date · Bookings by closest start date · Dedicated items by closest start date.
