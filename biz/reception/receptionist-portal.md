---
product: biz
feature: reception
platform: receptionist-portal
status: draft
last_updated: 2026-05-01
confirms_needed: 0
---

> Separate platform, full spec — dedicated receptionist workflows.

Figma: [Receptionist-Portal-2026](https://www.figma.com/design/5t1fGT90z9qtxhXH70fUvX/Receptionist-Portal-2026)
ClickUp source: [Security card management (doc 8cgr555-36978)](https://app.clickup.com/9010156709/v/dc/8cgr555-36978/8cgr555-76138)

---

## Security Card Management — Receptionist Portal

For admin portal setup (enable/disable, card creation, card management), see [admin-portal.md](./admin-portal.md).

The receptionist portal inherits Sections 3.1–3.4 from admin-portal (Unpaired/Paired card management and search), plus the check-in/out guest flows below.

---

## 4 — Check-in/out Guest and Skip Card Feature

Figma: [node-id=2108-79319](https://www.figma.com/design/5t1fGT90z9qtxhXH70fUvX/Receptionist-Portal-2026?node-id=2108-79319)

### 4.1 Check-in Guests

1. Card reader activates for scanning during check-in.
2. If card assigned successfully: check-in time and card assign time recorded simultaneously.
3. On error: receptionist can Try Again or Skip Card (refer to Table 3.3 in admin-portal.md).
4. **Skip Card flow:**
   - Skip card dialog shown; reason required before "Continue without card" enabled.
   - Reason recorded under Status Remark column with prefix "In:" (indicates check-in remark).
   - After skipping: receptionist can "Scan card" later → different card assign time recorded.
5. Bulk check-in: same flow; queue item labelled "Skipped" when skipped.

### 4.2 Check-out Guests

1. Card reader activates during check-out only if "Also activate during check-out" is enabled in admin settings.
2. If card returned successfully: check-out time and return card time recorded simultaneously.
3. On error: Try Again or Skip Card.
4. **Skip Card flow:**
   - Dialog shown; reason selection required before "Continue without card" enabled.
   - **If "Report card as lost" selected:**
     - Assigned status frozen (no return time).
     - Card status → Lost.
     - Card deactivated.
     - Guest checked out with check-out time.
   - **If "Report card as damaged" selected:**
     - Assigned status frozen (no return time).
     - Card status → Damaged.
     - Card deactivated.
     - Guest checked out with check-out time.
   - **If "Other reason" selected:**
     - Reason text required before "Continue without card" enabled.
     - Reason recorded under Status Remark with prefix "Out:".
     - Card status remains Assigned (no return time).
     - Guest checked out with check-out time.
   - After skipping: "Return card" can be done manually later → different return time.
   - If Lost/Damaged: card must be reactivated (reverted to Assigned) before card can be returned.
5. If both "In:" and "Out:" remarks exist: separated by "/" in the same Status Remark column. If >3 lines: truncated with ellipsis; tooltip shows full text.
6. If guest has no assigned card: card reader not activated during check-out.
7. **Bulk check-out with mixed guests:** Guests without cards checked out immediately; guests with cards queued for card scanning/return.
