---
product: workflows
feature: dashboard
platform: web
status: draft
last_updated: 2026-04-30
confirms_needed: 14
---

# Dashboard — Web Spec

> Home page for Colorkrew Workflows. Entry point for all submitters and approvers to view, filter, and act on workflows. Also the landing surface for the workflow details modal.

Source Figma frames:
- Home desktop: `node-id=70-15685` (section with multiple states)
- Home responsive spec: `node-id=70-9164`
- Details modal: `node-id=94-15478`
- Right panel detail: `node-id=82-12032` (timed out — spec based on screenshots + section metadata)

---

## Layout

Global shell (all breakpoints ≥520px):
- Left menu: 260px fixed
- Top bar: 56px, spans full right section width
- Main content: max-width 960px, centered with `spacing(3)` (24px) horizontal padding; `spacing(2)` (16px) on XS
- Right panel: 330px fixed (collapses to 68px icon strip at ≤919px; hidden at ≤519px)

Responsive breakpoints (from responsive spec annotation):
| Breakpoint | Width | Behavior |
|---|---|---|
| XL | ≥1320px | Full layout, right panel visible |
| L | 1180–1319px | Right panel floats (not in fixed column) |
| M-L | 920–1179px | Right panel floats |
| M | 664–919px | No right panel column; 3-col card grid → 2-col at 849px |
| S | 520–663px | 1-col card grid; min table width 550px (horizontal scroll below) |
| XS | 360–519px | Mobile menu + floating create button; grid only; 16px margin |

---

## Core Flows

**Flow 1 — Submitter reviews own submissions**
1. User lands on Dashboard (Home tab active in left nav)
2. Page greets user: "Welcome back [First Name]!" with summary count
3. Default tab shown is "To approve" (or last-visited tab — INFERRED)
4. User reads table/card list; can sort by column header (table view)
5. User clicks row or card → Details modal opens

**Flow 2 — Approver acts on pending approval**
1. User lands on Dashboard; sees "To approve [N]" tab with count badge
2. User scans list; clicks a workflow row/card
3. Details modal opens showing left section (form) + right section (Approval timeline)
4. User clicks "Approve" (green) or "Reject" (red dropdown) in Action Footer
5. Item transitions out of "To approve" tab → appears in "Recently actioned"

**Flow 3 — User filters by tab**
1. User clicks any tab (To approve, Recently actioned, Need revision, Pending, On hold, Approved, Draft)
2. List refreshes to show workflows matching that status
3. Active tab has underline indicator; count badge updates

**Flow 4 — View toggle (table ↔ card)**
1. User clicks view toggle icons (top-right of content area, two icon buttons)
2. Table view: MUI Data table, sortable columns, pagination (rows per page selector)
3. Card view: Grid of cards, infinite scroll (20–30 initial, loads next on scroll-to-bottom)
4. Card view only on XS (≤519px); toggle hidden

**Flow 5 — Open workflow details**
1. User clicks a table row or card
2. Details modal opens with overlay on top of Dashboard
3. Breadcrumb in modal header: Home / [tab name] / [Ref. No.]
4. User reviews form sections, approval timeline, comments
5. User closes modal (X button) → returns to Dashboard; scroll position preserved (INFERRED)

**Flow 6 — Manage mentions in right panel**
1. Right panel shows "Mentioned [N]" badge
2. List items show: avatar, "[User] mentioned you:", message preview, timestamp
3. Unread items shown bold with red dot indicator
4. On hover: "clear" icon button overlaps right side → click removes item from list (not deleted)
5. "Mark all as read" link → marks all items as read
6. "Clear list" text link → clears all items from panel
7. Clicking item body → navigates to referenced workflow

**Flow 7 — Admin view**
1. Admin lands on Dashboard; CTA shows "+ Create / Manage" instead of "+ Create"
2. Extra tab "To update" appears when proxy user assignment is pending
3. Admin card view shows summary cards in grid (different from regular user's workflow list)

**Flow 8 — Mobile web (XS)**
1. User opens Workflows on mobile (360–519px)
2. No sidebar; hamburger opens nav drawer
3. Grid view only; no table toggle
4. Tabs become sticky-on-scroll (float above content as user scrolls down)
5. Floating "+ Create" button appears bottom-right
6. Right panel collapsed to icon; "Left sidebar" icon changes to "burger menu" icon

---

## States

### Empty State
- Component: `Empty State` (instance in "Frame 17" container)
- Shown when selected tab has no workflows (e.g., "Approved" tab with no items)
- Present in frames: `163:20614` (Home - Default - Empty state), `164:21862`
- Title: "You don't have any workflows yet"
- Subtitle: "You'll see them listed once there's something to submit or review"
- Two visible instances suggest per-section empty states exist (INFERRED: two tabs simultaneously empty)

### Loading State
MISSING: No loading/skeleton state visible in any Figma frame. Expected behavior: skeleton rows or spinner in content area while data fetches.

### Error States
MISSING: No error states shown. Expected states to define:

| Error | Trigger | EN | JA | Action |
|---|---|---|---|---|
| Load failure | API timeout or error | CONFIRM: | CONFIRM: | Retry button |
| Submit failure | Action (Approve/Reject) fails | CONFIRM: | CONFIRM: | Retry / contact support |

### Success / Confirmation
- After Approve/Reject: INFERRED — workflow row transitions out of active tab, appears in "Recently actioned". No explicit toast or confirmation dialog shown for basic approve.
- Proxy approver selection: "Select proxy approvers" dialog (Basic Dialog component) appears → user selects approvers → confirmed via "Action Footer" in dialog.

### Edge Cases
- **Infinite scroll end**: "Show last message" indicator displayed below last card when all items loaded
- **Infinite scroll mid-load**: Next batch loads automatically when user scrolls to bottom
- **Sorting reset**: Changing sort column resets list to start
- **Table horizontal scroll**: At <550px wide, table scrolls horizontally (min-width enforced)
- **Long subject titles**: Truncated with ellipsis after 2 rows (annotation: "Grid height is fixed for 2 rows")
- **Long remarks**: Multi-line support in modal (annotation: "Here's a long remark that supports break line as well")
- **Hover on right panel item**: Clear icon overlaps on right; clicking removes from list, not deleted permanently

---

## Components Used

| Component | Source | Notes |
|---|---|---|
| Left menu | `global/components/nav-shell.md` | 260px fixed; "Home" active; Inbox badge |
| Top bar | `global/components/nav-shell.md` | Hamburger toggle, Search, User avatar |
| Title | defined here | Greeting + subtitle, max-width 960px |
| Tabs | `global/components/` (CONFIRM:) | Count badges, active underline, sticky on mobile scroll |
| Table header | `global/components/table.md` | Sortable columns; no "Sort by" dropdown |
| Table body | `global/components/table.md` | 48px row height; "Submitter" col hidden on "my" tabs |
| Table pagination | `global/components/pagination.md` | MUI-style; rows per page selector; "1–X of Y" label |
| Card | defined in workflows (CONFIRM: promote if reused) | 107px height; workflow summary |
| Workflow section | defined in workflows (CONFIRM: promote if reused) | Section header + Card grid |
| Empty State | `global/components/` (CONFIRM:) | Centered, 254px height component |
| Right panel (Mentioned) | defined here | 330px; collapsible; mention feed |
| Details modal | defined here | Overlay; 1400px default; full screen variant |
| Details header | defined here | 56px; breadcrumb + link/expand/close icons |
| Left section (modal) | defined here | 1070px; scrollable content + sticky action footer |
| Right section (modal) | defined here | 330px; Approval/History/Comments tabs |
| Action Footer | `global/components/` (CONFIRM:) | 60px; sticky bottom of modal left section |
| Alert | `global/components/` (CONFIRM:) | Inline banners in modal left section |
| Basic Dialog | `global/components/modal.md` | 550px; used for proxy approver selection |
| Dropdown | defined here | 200px; context menu on right panel items + table rows |
| Load more | defined here | 48px strip at bottom of infinite scroll card list |

---

## Guidelines Applied

| Guideline | Source |
|---|---|
| Max content width 960px; `spacing(3)` padding (XS: `spacing(2)`) | `workflows/_guidelines.md` |
| Never use raw hex values — always MUI palette tokens | `global/foundations/color-system.md` |
| Use `theme.spacing()` — never hardcode px for padding/margin | `global/foundations/spacing.md` |
| Tabler Icons; one style and stroke width per product | `global/foundations/iconography.md` |
| MUI transition tokens; respect `prefers-reduced-motion` | `global/foundations/motion.md` |
| WCAG 2.1 AA; 44×44px touch targets | `global/foundations/accessibility.md` |
| Inter for EN; Noto Sans JP scoped to JA content via `lang` | `global/foundations/typography.md` |
| Sortable table — no standalone "Sort by" dropdown | Figma annotation |
| "Submitter" column hidden on personal tabs | Figma annotation: "not required for my submissions, pending, on hold and draft" |
| Infinite scroll: 20–30 initial batch, load next on scroll-to-bottom | Figma annotation node 70:9945 |
| Grid height fixed for 2 rows (card title truncation) | Figma annotation |
| Timeline panel collapsed by default at ≤919px | Figma annotation node 83:18486 |
| At ≤519px: mobile menu, floating CTA, grid only, 16px margin | Figma annotation |
| Tabs sticky-on-scroll on mobile | Figma annotation |
| Min table width 550px (horizontal scroll below) | Figma annotation |

---

## Typography

Token format: `typography.<variant>` per `global/foundations/typography.md`. Font assignments (Inter / Noto Sans JP) confirmed from `workflows/_theme.md`. MUI variant assignments below are inferred — confirm once product theme overrides are defined.

| Element | MUI variant | Font | Notes |
|---|---|---|---|
| Page title "Welcome back…" | `typography.h6` (CONFIRM:) | Inter | Personalized greeting |
| Page subtitle (count summary) | `typography.body2` (CONFIRM:) | Inter | Muted style |
| Tab labels | `typography.button` (CONFIRM:) | Inter | May be overridden to sentence case |
| Table column headers | `typography.overline` (CONFIRM:) | Inter | Uppercase, letter-spaced |
| Table body rows | `typography.body2` (CONFIRM:) | Inter | |
| Pagination label | `typography.caption` (CONFIRM:) | Inter | |
| Right panel header "Mentioned" | `typography.subtitle2` (CONFIRM:) | Inter | |
| Mention item — unread | `typography.body2` bold (CONFIRM:) | Inter | Bold + red dot |
| Mention item — read | `typography.body2` (CONFIRM:) | Inter | |
| Modal workflow title | `typography.h5` or `typography.h6` (CONFIRM:) | Inter | Subject line |
| Modal section headers | `typography.subtitle2` (CONFIRM:) | Inter | Collapsible section labels |
| Modal form field labels | `typography.caption` (CONFIRM:) | Inter | Muted |
| Modal form field values | `typography.body2` (CONFIRM:) | Inter | |
| Action Footer buttons | `typography.button` (CONFIRM:) | Inter | |
| All JA text strings | corresponding variant | Noto Sans JP | Apply via `lang="ja"` wrapper |

---

## Iconography

Library: **Tabler Icons** per `global/foundations/iconography.md` and `workflows/_theme.md`. Icon sizes confirmed from `_theme.md`. Style (outline/filled) and stroke width: CONFIRM: — verify against `global/foundations/iconography.md`.

| Usage | Size | Notes |
|---|---|---|
| Left nav items | 24px | Home, Inbox, Lookup, Templates, Master list, Settings |
| Top bar actions | 20px | Hamburger/sidebar toggle |
| Table view toggle | 20px | Grid view / list view icons |
| Modal header actions | 20px | Link, expand, close icons |
| Right panel clear icon (hover) | 16px | Appears on hover over mention item |
| Empty state illustration | 32px | Centered in Empty State component |

All icon-only interactive buttons (modal close, view toggle, mention clear) must have `aria-label`.
Decorative icons must have `aria-hidden="true"`.

---

## Motion

Tokens per `global/foundations/motion.md`. All animations must include `@media (prefers-reduced-motion: reduce)` override.

| Interaction | Duration token | Easing token |
|---|---|---|
| Details modal open | `enteringScreen` 225ms | `easeOut` |
| Details modal close | `leavingScreen` 195ms | `easeIn` |
| Right panel collapse | `leavingScreen` 195ms | `sharp` |
| Right panel expand | `enteringScreen` 225ms | `easeOut` |
| Table row hover | `shortest` 150ms | `easeInOut` |
| Tab switch | `shorter` 200ms | `easeInOut` |
| Mention item hover | `shortest` 150ms | `easeInOut` |
| Loading skeleton pulse (MISSING state) | `complex` 375ms | `easeInOut` |

Rule: use `transform` and `opacity` only — never animate `width`, `height`, `top`, or `left`.

---

## Accessibility

Target: **WCAG 2.1 Level AA** per `global/foundations/accessibility.md`.

**Touch targets**
- Floating "+ Create" button (XS): min 44×44px
- Nav icons: CONFIRM: — metadata shows 40×40px icon wrappers; verify against 44px recommended
- Table rows: 48px height ✓

**Focus management**
- Modal open: move focus to first interactive element (close button or subject title)
- Modal close: return focus to the row/card that triggered it
- Focus trapped inside modal while open
- `Escape` closes modal, drawers, and popovers

**Keyboard navigation**
- Table: `Tab` to row; `Enter` to open workflow detail
- Tabs component: `Arrow` keys to switch tabs
- Modal right panel tabs: `Arrow` keys
- Dropdown menus (Reject chevron, row context): `Enter`/`Space` to open; `Arrow` to navigate; `Escape` to close

**Screen reader**
- Icon-only buttons: must have `aria-label` (modal close, link copy, expand, view toggle, mention clear)
- Decorative icons: `aria-hidden="true"`
- `lang="ja"` on all Japanese text; `lang="en"` on `<html>`
- `aria-live` region for dynamic count updates (tab badges, inbox count) — CONFIRM:

---

## Copy Patterns

JA translations sourced from `workflows/_glossary.md` (extracted from stg-app.colorkrew-workflows.com). Remaining CONFIRM flags need localisation input.

| Element | EN | JA |
|---|---|---|
| Page title | "Welcome back [First Name]!" | お帰りなさい {name}さん |
| Page subtitle | "You have [N] actionable items and [N] pending submissions" | CONFIRM: |
| CTA button (regular) | "+ Create" | + 作成 |
| CTA button (admin) | "+ Create / Manage" | CONFIRM: |
| Tab: to approve | "To approve [N]" | CONFIRM: (possibly 承認待ち) |
| Tab: recently actioned | "Recently actioned [N]" | CONFIRM: |
| Tab: need revision | "Need revision [N]" | CONFIRM: |
| Tab: pending | "Pending [N]" | CONFIRM: |
| Tab: on hold | "On hold [N]" | CONFIRM: |
| Tab: approved | "Approved [N]" | CONFIRM: (possibly 承認済み) |
| Tab: draft | "Draft [N]" | CONFIRM: |
| Tab: to update (admin) | "To update [N]" | CONFIRM: |
| Column: last updated | "Last updated" | 最終更新日 |
| Column: submitter | "Submitter" | 提出者 |
| Column: subject | "Subject" | 件名 |
| Column: template | "Template" | テンプレート |
| Column: category | "Category" | カテゴリー |
| Column: ref no | "Ref. No." | 申請番号 |
| Column: step | "Step" | 承認ステップ |
| Column: status | "Status" | ステータス |
| Pagination | "Rows per page: [N] ▼" · "[X]–[Y] of [Z]" | ページごとの行数: [N] ▼ · CONFIRM format |
| Right panel header | "Mentioned [N]" | メンションされたコメント |
| Right panel action: read | "Mark all as read" | CONFIRM: |
| Right panel action: clear | "Clear list" | CONFIRM: |
| Mention text | "[User] mentioned you:" | CONFIRM: |
| Infinite scroll end | INFERRED: "No more items" or similar | CONFIRM: |
| Modal breadcrumb | "Home / [Tab name] / [Ref. No.]" | CONFIRM: |
| Modal footer: withdraw | "Withdraw workflow" | CONFIRM: |
| Modal footer: reject | "Reject" | CONFIRM: |
| Modal footer: approve | "Approve" | 承認 |
| Step indicator | "Step [N]/[total]" | ステップ [N]/[total] (CONFIRM format) |
| Left nav: home | "Home" | ホーム |
| Left nav: inbox | "Inbox" | CONFIRM: |
| Left nav: lookup | "Lookup" | CONFIRM: |
| Left nav: templates | "Templates" | テンプレート |
| Left nav: master list | "Master list" | CONFIRM: |
| Left nav: settings | "Settings" | 設定 |
| Proxy dialog title | "Select proxy approvers" | CONFIRM: |
| Proxy dialog body | "Select one or more users as proxy approvers to review this specific application. The application will be returned to the applicant if rejected by a proxy approver." | CONFIRM: |
| Proxy: no approver | "No approver assigned yet" | まだ承認者が割り当てられていません |
| Empty state title | "You don't have any workflows yet" | まだ申請がありません。 |
| Empty state subtitle | "You'll see them listed once there's something to submit or review" | 申請もしくは承認が必要なものがあれば表示されます。 |
| Right panel empty | "No mentions yet" | まだメンションされていません。 |
| Right panel empty sub | "When someone mentions you, it will show up here" | あなたがメンションされた際、ここに表示されます。 |

---

## Color Tokens Used

Token format: `palette.<role>.<variant>` per `global/foundations/color-system.md`. Hex values and token names now available in `workflows/_theme.md`. Token-to-element assignments below are still inferred from visual appearance — confirm with engineering.

| Visual element | MUI palette token |
|---|---|
| CTA "+ Create" button fill | `palette.primary.main` (CONFIRM: or `palette.brand.main` if brand token defined) |
| Active tab underline | `palette.primary.main` (CONFIRM:) |
| Approve button fill | `palette.success.main` (CONFIRM:) |
| Reject button fill | `palette.error.main` (CONFIRM:) |
| Inbox badge fill | `palette.error.main` (CONFIRM:) |
| Mention unread dot | `palette.error.main` (CONFIRM:) |
| Modal overlay | `palette.action.disabledBackground` or custom — CONFIRM: |
| Breadcrumb active link | `palette.primary.main` (CONFIRM:) |
| "Withdraw workflow" text link | `palette.error.main` (CONFIRM:) |
| Alert banner (info) | `palette.info.main` (CONFIRM:) |
| Alert banner (warning) | `palette.warning.main` (CONFIRM:) |
| Alert banner (error) | `palette.error.main` (CONFIRM:) |

---

## Open Items

### Resolved (2026-04-30)
1. ✅ `_theme.md` populated — palette tokens and hex values now at `workflows/_theme.md`.
2. ✅ `_glossary.md` populated — confirmed JA for navigation, column headers, status values, and common copy strings now at `workflows/_glossary.md`.
3. ✅ `workflows/_guidelines.md` populated — max-width, padding, and layout rules confirmed.

### Still open — Config
4. Global component stubs: Tabs, Empty State, Action Footer, Alert, Nav Shell, Modal, Table, Pagination — component contracts unverifiable until populated.
5. Typography MUI variant assignments are inferred — verify once product theme overrides are defined in `_theme.md`.
6. Icon style (outline vs filled) and stroke width unconfirmed — verify against `global/foundations/iconography.md`.
7. Nav icon wrappers are 40×40px in Figma metadata — below the 44px recommended touch target per `global/foundations/accessibility.md`. Confirm whether intentional.

### Missing states or flows
8. No loading/skeleton state in any Figma frame — required before production.
9. No explicit error states for API failure or action failure — error table in spec is a placeholder; needs designer input.
10. Right panel empty state documented from screenshot only (cactus + "No mentions yet") — frame not independently indexed in Figma.
11. No explicit success feedback after Approve/Reject — toast, redirect, or inline confirmation not shown in Figma.
12. Table row hover state referenced in Figma annotations (nodes 310:63790, 310:63831) but not fully captured — context menu/dropdown behavior unclear.
13. Details modal right panel (node 82:12032) timed out during extraction — Approval/History/Comments tab content documented from screenshot only.

### Decisions needed
14. JA translations outstanding: page subtitle, CTA admin, all tab labels (except approvals), right panel actions (mark read / clear list), modal breadcrumb, modal footer Withdraw/Reject, proxy dialog, left nav Inbox/Lookup/Master list.
15. Step indicator: Figma shows "Step 0/5" in "Just created" state — confirm whether 0 is correct or should show 1.
16. Card component definition — not formally defined in `_components.md`. Define fields and variants before production.
17. Workflow section component — card group with section header. Define in product config or promote to global.
18. Right panel on XS (≤519px) — confirm: slide-in drawer or entirely absent?
19. "To update" admin tab — exact trigger condition for proxy assignment pending; clarify with product.
20. `aria-live` region for dynamic badge counts (tab badges, inbox count) — confirm implementation approach with engineering.
