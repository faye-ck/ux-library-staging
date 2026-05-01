---
product: biz
feature: reception
platform: admin-portal
status: draft
last_updated: 2026-05-01
confirms_needed: 0
---

> Admin portal delta.

Figma: [Receptionist-Portal-2026](https://www.figma.com/design/5t1fGT90z9qtxhXH70fUvX/Receptionist-Portal-2026)
ClickUp source: [Security card management (doc 8cgr555-36978)](https://app.clickup.com/9010156709/v/dc/8cgr555-36978/8cgr555-76138)

---

## Security Card Management

**Overview:**
- Admin portal: Enable feature; create/manage security cards via UI and CSV.
- Both Admin and Receptionist portals: Pair items with physical cards; manage/search/export card statuses.
- Receptionist portal: Assign/return card during guest check-in/out (see [receptionist-portal.md](./receptionist-portal.md)).

---

## 1 — Enable/Disable in Admin Portal

Figma: [node-id=2099-37668](https://www.figma.com/design/5t1fGT90z9qtxhXH70fUvX/Receptionist-Portal-2026?node-id=2099-37668)

**Location:** Reception → Settings → Receptionist Settings → Security card reader

1. Toggle to enable Security Card tab. Default: Disabled. Info: "Activates the card reader during guest check-in."
2. When enabled, "Also activate during check-out" toggle appears.
   - Default: Enabled. Info: "Activates the card reader during guest check-out as well."
   - When enabled: card reader activates during check-out; both card return and check-out time recorded simultaneously unless receptionist skips.
   - When disabled: card reader not activated at check-out; return time and check-out time recorded separately.
3. Hit Save for settings to take effect.
4. Once saved, these become available:
   - Admin portal → Reception → Security Cards
   - Admin portal → Reception → Create → Security Card
   - Receptionist portal → Security Cards
   - Receptionist portal → Guest Info: additional "Status Remark" column
5. If disabling "Security card reader" when data exists → confirmation dialog on Save:
   - Title: "Disable security card reader"
   - Description: "Disabling this feature will hide the Security Card tab and revert back to manual entry of card numbers. Existing data will not be deleted and will be available if the feature is enabled again."

---

## 2 — Create/Edit Security Cards in Admin Portal

Figma: [node-id=2083-5436](https://www.figma.com/design/5t1fGT90z9qtxhXH70fUvX/Receptionist-Portal-2026?node-id=2083-5436)

### 2.1 Fields

| Field | Type | Validation |
|---|---|---|
| Item Name | Text field | Required · Non-unique · Max 50 chars |
| Item ID | Text field | Required · Non-unique · Max 50 chars |
| Access | Dropdown | Optional · Options from Access management field · Blank = "Not assigned" · Hidden if Access management disabled |

Access field behaviour: If Access management is disabled after data exists, input values hidden (not deleted), validation disabled. Re-enabling restores values and validation.

### 2.2 CSV Bulk Update

Download and upload CSV template. Columns:

| Column | Notes |
|---|---|
| UUID | Blank = create; existing UUID = update; error if no match |
| Inventory Item Name | Error if empty or over char limit |
| Inventory Item ID | Error if empty or over char limit |
| Access | Must match configured options or blank; error if no match |
| Card Status | Read-only (system generated): Unpaired · Available · Assigned · Lost · Damaged |

**Upload flow:**
1. Show preview (does not update DB yet).
2. If errors → alert: "The uploaded CSV file contains [#] rows with errors. Please fix the errors and upload the file again." Submit disabled.
3. Error types: UUID doesn't exist · Item Name too long or empty · Item ID too long or empty · Access value doesn't exist.
4. No errors → "No errors found. All [#] rows are ready, click Submit to update." Submit enabled.
5. After submit → "CSV uploaded successfully. [#] items created, [#] items updated." Result column shows: Created or Updated. Submit disabled again.
6. Upload fail (file size / wrong format / server) → "CSV upload failed. Please check and try uploading the file again." Submit disabled.

### 2.3 After Creation

- Created items listed under Reception → Security Cards → Unpaired cards (admin) and Security Cards tab (receptionist).
- Single item created via UI → navigates to item details page. UUID generated. Card status: Unpaired with Pair card action button.

**Note:** If card status is "Assigned": Update Card ID, Edit Details, and Delete Card buttons disabled; CSV edits for assigned cards ignored.

---

## 3 — Manage Security Cards (Both Portals)

Both Admin and Receptionist portals share the Security Cards management screens. Unpaired and Paired tabs show respective totals.

### 3.1 Unpaired Cards Tab

After creation, card status = Unpaired; listed here.

**Table columns:** Item UUID · Item Name · Item ID · Access · Pair card (action link) · Details (action link; admin only).

**Single card pairing:**
- Click "Pair card" → "Start pairing..." dialog.
- Success → "Card paired successfully" auto-closes after 3s countdown.
- Errors: see Table 3.3.

**Bulk card pairing (via checkboxes):**
- Bulk pair button appears with selected count.
- Items queued; scan cards continuously in list order.
- Current item: "Waiting for card.."; others: "Queued".
- Success → "Paired" status; auto-advances to next.
- Error → Try Again or Skip (records as "Failed").
- Progress shown: [completed] / [total queued]. Completed = successful or failed.
- When all done: summary "# paired # failed".
- Cancel anytime; completed items still updated; queued items cancelled.
- Max 100 items per queue; checkbox for 101st disabled once 100 selected.

Once paired: card status becomes "Available"; moved to Paired cards immediately on cancel or close.

### 3.2 Paired Cards Tab

After pairing, card status = Available.

**Additional columns:** Card Status · Assigned To · Host (main host + event reservation #; click → dialog with contact/role info and other hosts) · Actions.

**Return card:** Activates card reader for unqueued scanning. Only successfully returned listed as completed (no item to match against). Statuses updated immediately after. Close anytime.

**Checkboxes → bulk action button:**
- Only Assigned cards counted/queued for Return card bulk action.
- Only Available cards counted/queued for Update card ID bulk action.

**Lost and Damaged:** No bulk action; one-by-one via table actions.

**Export:** Entire table exportable to CSV.

### Table 3.3 — Card Status, Actions, and Errors

| Card Status | Behavior | Actions (scan) | Possible Errors |
|---|---|---|---|
| Unpaired | Not assignable to guests | Pair card | 1.1 Card already paired (any status after pairing) · 1.2 Read failed/timeout |
| Available | Update card ID = swap physical card (must be unpaired card). Guest selection required to go from Available → Assigned | Update card ID · Report as lost · Report as damaged | Update ID: 1.1 Card already paired · 1.2 Read failed/timeout. Assign: 1.3 Card already assigned · 1.4 Card access mismatch · 1.5 Read failed/timeout |
| Assigned | Return can be done anytime without selecting guest | Return card · Report as lost · Report as damaged | With guest/item selected: 1.1 Card mismatch · 1.2 Card inactive (show details) · 1.3 Read failed/timeout. Without selection: 1.1 Card already returned · 1.2 Card inactive (with details) · 1.3 Read failed/timeout |
| Lost | Status frozen until reactivated; scanning does not update status | Reactivate card · Report as damaged | — |
| Damaged | Status frozen until reactivated; scanning does not update status | Reactivate card · Report as lost | — |

**During scanning:** Cancel to exit; Try Again to restart scanning (back to scanning dialog) on error.

### 3.4 Keyword or Scan to Search

**Keyword search** — Non-case-sensitive, matches any of: Item UUID · Item Name · Item ID · Access · Card Status · Assigned To · Host.

**Tables** — MUI table with column sort and resize.

**Scan to search** — Click "Scan to search" → activates card reader → filter table to scanned result.

Possible scan error: "Read failed/timeout" (could be unpaired or damaged card).
