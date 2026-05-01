---
product: biz
feature: locker
platform: mobile-web
status: draft
last_updated: 2026-05-01
confirms_needed: 0
---

# Locker — Mobile (Dashboard and QR Scanning)

Source:
- ClickUp doc `8cgr555-35898`, page `8cgr555-73998` — Mobile: Dashboard and QR scanning
- Figma: https://www.figma.com/design/QLihniCb5uRhbCwE4ufLrO/Locker-2026

---

## Mobile Dashboard

Figma: https://www.figma.com/design/QLihniCb5uRhbCwE4ufLrO/Locker-2026?node-id=167-60295

### 1.1 Booked Locker — Auto/Manual Start and Return

- When a booking exists: dashboard shows "Booked / [Locker name]" record.
- Locker booked in advance starts automatically on the booked day.

**Check-in before locker start time** → reminder shown immediately on check-in:
> "You have a locker booking today in [locker group name] [locker name]. Please return before [return time]."
> [Close] [Start Now]

**Check-in after locker has started** → reminder shown immediately on check-in:
> "You have a locker booking today in [locker group name] [locker name]. Please return before [return time]."
> [Close]

- Once started: dashboard shows "In use" row with locker name and return time.
- Tapping "In use" row → booking details + Return button.
- On return: dashboard shows "Returned / [Locker name]".

**Check-out with in-use locker** → return reminder shown:
> "You have a locker booking today in [locker group name] [locker name]. Please return before [return time]."
> [Close] [Return now]

- Reminder also sent [#] minutes before return time (configured in locker group settings).

### 1.2 Receiving a Transfer — Pick-up

- When there's a pick-up: dashboard shows "Received / [Locker name]" record.
- Tapping → transfer details + Confirm pick-up button.
- After confirming: dashboard shows "Picked-up / [Locker name]".

**Overdue pick-up reminder notification:**
> "You have an overdue delivery in [locker group name] [locker name]. Please confirm after pick-up."
> [Close] [View Pin]

---

## QR Code Scanning

Figma: https://www.figma.com/design/QLihniCb5uRhbCwE4ufLrO/Locker-2026?node-id=167-60296

### 2.1 Scanning Locker Group QR

Displays:
- Locker group name, map name, total lockers count.
- Available (with breakdown by type) or "No lockers available" · In use count · Dedicated count.
- Only non-zero statuses shown.

Actions (disabled if no eligible lockers):
- **Transfer** — disabled if no Transfer-type lockers available.
- **Book Locker** — disabled if no Bookings-type lockers available, or if there's already an existing locker booking for the day.

### 2.2 Transfer Flow

1. Locker group info header.
2. Select size (hidden if only 1 size; default smallest available; disabled if fully booked).
3. Recipient selection screen:
   - Full user list (same company, alphabetical).
   - Search by name or email.
   - Multiple users selectable; shown as avatar/name/role/remove icon.
   - Min 1 required.
4. Full form (after selection): selected size, recipient list (with Edit button), optional message, pin code (required; placeholder asterisks = digit count; helper "[#] characters are required").
5. Transfer button enabled when all required fields filled.

Confirmation screen: "Transfer Confirmed", group name, map name, locker name + coordinate, sender avatar + "Sent by You" + date/time, message (if any), recipients, pin code.

### 2.3 Book a Locker Flow

1. Locker info header.
2. Select size (skipped if only 1 size; default smallest available; disabled if fully booked).
3. Confirm.

Confirmation screen: "Booking Confirmed", group name, map name, locker name + coordinate, return time.
- Dashboard shows "Booked / [Locker name]" and "In use" row with return time.
- Warning if already active locker: "You already have an active locker. Please return it before booking a new one."

### 2.4 Scanning Dedicated Locker QR

- Locker group info header.
- Recipient prefilled (dedicated user/dept; no remove icon).
- Optional message textarea.
- Transfer button.

Confirmation: "Transfer Confirmed", group name, map name, locker name + coordinate, sender avatar + "Sent by You" + date/time, message (if any), recipients.
