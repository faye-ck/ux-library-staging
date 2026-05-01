---
product: biz
feature: inventory
platform: feature
status: draft
last_updated: 2026-05-01
confirms_needed: 0
---

> User portal baseline for inventory requests and borrowing.

Figma: [Inventory](https://www.figma.com/design/S9jGdASdyEr6wTMiwuDk1j/Inventory)
ClickUp source: [Bulk Booking/Borrowing (doc 8cgr555-31158)](https://app.clickup.com/9010156709/v/dc/8cgr555-31158/8cgr555-66918)

---

## Bulk Booking/Borrowing

**Overview:**
- Allow multiple items to be selected during booking/borrowing.
- Reflect bulk booking/borrowing/returning under My Bookings.
- Handle items with different configurations (borrowable/bookable, evidence mode, Workflows approval, different max durations).
- Support bulk flow across grid, list, timeline, and mobile views.

Figma Phase 1: [node-id=11205-247344](https://www.figma.com/design/S9jGdASdyEr6wTMiwuDk1j/Inventory?node-id=11205-247344)
Figma Phase 2: [node-id=11277-344842](https://www.figma.com/design/S9jGdASdyEr6wTMiwuDk1j/Inventory?node-id=11277-344842)

---

## 1 — Switching from Single to Bulk Booking/Borrowing

1. From the booking form, click:
   - New Booking → "Bulk Booking" button
   - Borrow Now → "Bulk Borrowing" button

**Right panel changes:**
- Title changes to "Bulk Booking" or "Bulk Borrowing".
- Item-specific info removed (e.g. max booking time, lease duration).
- Item list section appears (after Add Remark button):
  - Total selected items count.
  - First selected item shown first; items sorted by add time.
  - Remove item with "x" icon.
  - Empty list → "No item selected"; Confirm button disabled.
- Return date field available for Bulk Borrowing.

**Left section changes (grid/list/timeline):**
- Multi-selectable; checkboxes on grid/list; timeline slots act as checkboxes (slots outside selected date range disabled).
- Only available items are selectable. Eligibility checks:

| # | Bulk Booking | Bulk Borrowing |
|---|---|---|
| 1 | Is item bookable without approval? | Is item borrowable? |
| 2 | Is item available during selected date/time range? | Is item available from now until selected return date/time? |
| 3 | Is item's max booking duration within selected range? | Is item's max borrowing duration within selected range? |
| 4 | If item has lease duration, is it available within range? | If item has lease duration, is it available within range? |

**Mobile:**
- Clicking Bulk Booking/Borrowing → booking panel closes; shows grid or timeline view.
- Floating back button opens booking panel.
- Back button in panel no longer goes to item detail; goes to grid/timeline instead.

**Max duration:** User can only bulk book/borrow up to 30 days.

**Date/time update:** If dates/times updated after items selected:
- Unavailable items highlighted in red.
- Error alert: "x items are no longer available for the updated date. Please remove them to continue." + "Remove all unavailable items" button.
- Removing clears items from list and unchecks from left section.
- Confirm button disabled until resolved.

**Confirmation screen:** Item list displayed instead of item title; sorted alphabetically.

---

## 2 — When Evidence is Required

1. When evidence required for any selected item → message: "Evidence is required for some items".
2. Additional icon before "x" icon:
   - Camera icon (camera mode only) → activates camera instantly.
   - Upload icon (file upload enabled) → user selects take photo or choose file.
3. After upload:
   - Photo: thumbnail shown.
   - File: truncated filename shown.
4. Confirm disabled until all evidence uploaded (required field).

---

## 3 — Timeline View

1. When multiple dates involved: clicking any slot of the same item across dates selects all slots of that item simultaneously (booking is about the item, not the date slot).
2. If booking/borrowing dates exceed the 7-day view (or 3-day mobile view), start date auto-displayed as first column.

---

## 4 — My Bookings

### Bulk Booking

1. Title: "Bulk booking (#)" where # = total items.
   - On click: bulk booking details (same as confirmation screen).
   - Action icons/buttons by status:
     - Edit Booking: before start borrowing.
     - Borrow Now: when ready to borrow.
     - Cancel Booking: before start borrowing.
2. "+ Show items" / "Hide" to expand/collapse item list. Items sorted alphabetically. Click item → item's booking details (title = item name).
3. Edit booking → same flow as booking creation (#1).
4. Cancel booking → confirmation prompt before cancelling.

### Bulk Borrowing/Returning

1. Title: "Bulk borrowing (#)".
   - On click: bulk borrowing details + "Return All Items" button.
2. "+ Show items" / "Hide" to toggle item list. Items sorted alphabetically. Each item: Return icon + checkbox.
3. "Return (#)" link appears when items checked for multi-return.
4. Click item → item's borrowing details with "Take Inventory" and "Return Item" buttons.
5. When returning item: remaining time info shown (same as current spec).
6. Evidence required: same flow as #2.

---

## Phase 2 — Workflows Integration

### During Bulk Booking

1. Items requiring permission are bookable, but cannot be mixed with permission-free items in same bulk booking.
2. Only items with the same Workflows template can be booked together.
   - Items with non-matching Workflows template are not selectable once first item chosen.
   - Only one Workflow is created for the booking.
3. Message shown: "Approval is required before booking confirmation. The booking will be cancelled if approval isn't obtained by the start time."

### My Bookings — Workflows

1. Workflows status shown before "+ Show items" link.
2. Workflows status, link, and cancellation message shown on all detail pages.
3. When editing a booking with Workflows: "Editing this booking will withdraw the current workflow, create a new one, and reset the approval process. Any existing approvals will not be retained."

### Filter

- Additional filter for Workflow templates.
- Multi-selectable.
