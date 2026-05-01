---
product: biz
feature: analytics
platform: admin-portal
status: draft
last_updated: 2026-05-01
confirms_needed: 0
---

> Admin only — no user portal version. Dashboard and reporting patterns.

Figma: [CKBiz-Admin](https://www.figma.com/design/6vHvjRlNRZeCjZfgx4h8M1/CKBiz-Admin)
ClickUp source: [Seat/Space Analytics Dashboard (doc 8cgr555-9038)](https://app.clickup.com/9010156709/docs/8cgr555-9038/8cgr555-31838)

---

## 1 — Seat/Space Analytics Dashboard

**Background:** Current Seat Analytics is limited; aggregation calculations inaccurate. Customers need historical data analysis for workspace optimization.

**Objectives:**
- Visualize % of reservations utilized vs. no-shows, by area
- Compare actual usage against operating hours
- Compare current vs. previous time periods
- CSV export for all data views
- Improve UI consistency across dashboards

**Nice-to-have (future):** Usage by user type / group / department · Map heatmap · AI summary/tips for admin

---

## Layout

### 1.1 Main Menu

Analytics has its own menu item in the left main menu, placed after Locker.

### 1.2 Global Filter and Title

1. **Time period dropdown** (in order): This week (default) · Last week · This month · Last month · This quarter · Last quarter · This year · Last year · Next week · Next month · Custom range
   - Custom range: date range picker; Apply enabled only when dates selected; available period up to 5 months (1 month advance + current + 3 back); max 31 days selectable.

2. **Location dropdown:** All area groups (default) · Area group → drill down to Office map.

3. **Apply button** — Disabled by default or when no changes from loaded state.

4. **"Reset to default" link** — Shown when any global filter changes applied.

5. **Title** — Shows selected date range.

### 1.3 Sub-menu

Collapsible menu listing available dashboards. Phase 1 includes:
1. Space Utilization
2. Seat Utilization
3. Check-in by Department (existing)

### 1.4 Dimension Dropdown, Toggle, and Export

1. **Time dimension toggle** — Options vary by selected time period (see table below). Excludes holidays and non-working days (tooltip shows "Non-working day" or holiday title). Excludes data outside business hours (spaces) or time slots (seats).
2. **Export to PDF** — Available for Space Utilization dashboard.

**Time Dimension by Period:**

| Period | Available Dimensions | Data Granularity |
|---|---|---|
| This/Last week | Hour · Day · Day of Week | Hour: working hours (aggregated); Day: 7 dates; DoW: Mon–Sun |
| This/Last month | Hour · Day · Day of Week · Week · Month | Day: 28–31 dates; Week: W1–W4; Month: 1 |
| This/Last quarter | Hour · Day of Week · Week · Month · Quarter | Week: W1–W12; Month: 3; Quarter: 1 |
| This/Last year | Hour · Day of Week · Week · Month · Quarter · Year | Week: W1–W52; Month: 12; Quarter: 4; Year: 1 |

---

## 2 — Dashboard: Space Utilization

Figma: [CKBiz-Admin](https://www.figma.com/design/6vHvjRlNRZeCjZfgx4h8M1/CKBiz-Admin?node-id=740-37700)

### 2.1 Space Utilization Rate

**Filter:** Searchable, multi-selectable dropdown of individual spaces, categorized by area group → office map. Filtered by global filter. Affects graph, data table, PDF/CSV exports.

**Summary metrics:**

| # | Metric | Unit |
|---|---|---|
| 1 | Utilization rate | % |
| 2 | Total meeting time / Total available time | Hours |
| 3 | Total no-show / Total reservation | Count |
| 4 | No-show rate | % |

Info icon: "No-show includes auto-cancelled reservations and reservations where no one starts the event if auto-cancellation is disabled."

**Graph:** Stacked bar. Statuses: Utilized (actual usage) · No-show (reserved, auto-cancelled) · Not utilized. Legend below graph.

**Comparison checkbox:** Enabled → double x-axis (Previous period left, Current right).

### 2.2 Data Table

Columns: Space · Location (dynamic, see table) · Utilization rate (sorted desc) · Total meeting time · Total reservation · Total no-show · No-show rate.

**Location column by filter:**

| Filter | Column |
|---|---|
| All area groups | Area group |
| Specific area group | Office map |
| Specific map | Area |

Pagination: 10 (default) / 25 / 50 rows. Export CSV button.

### 2.3 PDF Export

A4 printable format. Reflects all applied filters.

**Page header:** Area group filter + selected spaces as subtitle. Date range as main title. Repeated on all pages.

**Body:** Chart titles include selected dimension ("by day", "by week", etc.). When comparison enabled: "Compared with [previous date range]". Includes summary metrics, charts, and table. Table header repeated on all pages.

**Footer:** [current page / total pages], right-aligned.

---

## 3 — Dashboard: Seat Utilization

Figma: [CKBiz-Admin](https://www.figma.com/design/6vHvjRlNRZeCjZfgx4h8M1/CKBiz-Admin?node-id=740-38123)

### 3.1 Seat Utilization Rate

**Summary metrics:**

| # | Metric | Unit |
|---|---|---|
| 1 | Utilization rate | % |
| 2 | Total occupied hours / Total available seat-hours | Hours |
| 3 | Total no-show / Total reservation | Count |
| 4 | No-show rate | % |

**Graph:** Stacked bar. Statuses: Utilized · No-show · Not utilized. Hover tooltip: statuses + percentages.

### 3.2 Data Table

Columns: Location (dynamic) · Total seat-hours · Utilization rate (sorted desc) · Total occupied hours · Total reservation · Total no-show · No-show rate.

Location column logic same as 2.2. Pagination: 10/25/50. Export CSV.

### 3.3 Time Utilization Breakdown

**Title:** "Time Utilization Breakdown". Info: "This table always displays hourly data aggregated by day."

**Graph:** Grid table (day × hour). Utilization rate = Total occupied seats ÷ bookable seats in that hour. Overlapping slots distribute data across overlap.

**Rate and color breakdown:**

| Rate | Color |
|---|---|
| 0–10% | #FCFCFC |
| 11–30% | #F1EBEB |
| 31–60% | #F1D4D3 |
| 61–90% | #E68284 |
| 91–100% | #DD342F |

Selecting a time slot highlights relevant hours; dims others.

### 3.4 Group Seats with Unlimited Capacity

**Title:** "Group Seats with Unlimited Capacity". Info: "Shows utilization of group seats with unlimited capacity, measured by total usage count instead of seat-hours. Remote and holiday seat types excluded."

**Summary metrics:**

| # | Metric | Unit |
|---|---|---|
| 1 | Total seat-spaces with unlimited capacity | Count |
| 2 | Total seat usage count | Count |
| 3 | Average usage count by period | Count |
| 4 | Total no-show / Total reservation | Count |
| 5 | No-show rate | % |

**Graph:** Line + stacked area. Lines: Seat usage count (line) · Utilized reservation (area) · No-show (area stacked). Hover tooltip: statuses + percentages.

---

## 4 — Admin Portal: Business Hours Setting

Figma: [CKBiz-Office-Map](https://www.figma.com/design/lg9evsvra9krY43wOtev6W/CKBiz-Office-Map?node-id=17922-356749)

**Location:** Administration → Settings → General Settings → Business Hours (after Store Time Zone).

- Toggle (on/off). Default: Disabled.
- Info: "Enable this to set business hours. This will define space availability in reports but doesn't restrict actual usage."
- When enabled: Start Time and End Time fields appear (required, default 09:00–18:00).
- Affects Space Utilization dashboard calculations once saved. No effect on other Space/Seat settings in Phase 1.

---

## 5 — Check-in by Department (Existing)

Figma: [CKBiz-Admin](https://www.figma.com/design/6vHvjRlNRZeCjZfgx4h8M1/CKBiz-Admin?node-id=740-38124)

### 5.1 Menu

Moved to Analytics sub-menu. Retitled: "Check-in by Department".

### 5.2 Filters

"Select Period" replaced by global filter. Added periods: Latest 3 months · This year · Last year. New dimensions per Table 1.4.1. "Display Department" filter placed next to time dimension.

Default (unfiltered): shows company-level data.

### 5.3 Graphs and Tables

UI updated to match new dashboard style.
