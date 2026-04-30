---
product: Workflows
feature: approval-flow
platform: Template Creation (Admin)
status: draft
last_updated: 2026-04-30
confirms_needed: 19
---

# Approval Flow — Template Creation Spec

> Step 2 of 3 in the Template Creation wizard (Layout → Approvals → Preview). Template creators configure whether approval is required for a workflow template and which approval flow to use. They can select from existing approval flow templates or create a new custom one via an overlay modal.

Source Figma frames:
- Section "Default approval flow" — node-id=3089:76836
  - Default view (approval ON, no selection): `node-id=1831:117960`
  - Using existing AF template (dropdown open): `node-id=3008:191258`
  - Approval not required (toggle OFF): `node-id=2305:46095`
- Section "Create approval flow modal" — node-id=3008:179177
  - Change approver type: `node-id=2921:188647`
  - Add approval step (step 2 active): `node-id=2936:198369`
  - Add approval step (step 1 settings open): `node-id=2921:188647`

---

## Context Note

This feature is accessed by **template creators** (admin role) from the "Create New Template" flow. It is NOT the submitter-facing approval flow panel shown when filling out a workflow. Platform label: CONFIRM: — Figma breadcrumb shows "Create New Template / Approval Flow Setup", indicating admin context within the Workflows user portal.

---

## Layout

**Page layout (Approval Flow Setup step):**
- Full-page layout: 1600px wide total
- Left panel "AF Right panel": 330px fixed, white bg, right border `border/light`
  - Horizontal stepper: 3 steps, 40px height, bottom border
  - "Default approval flow" section below stepper
- Right section: 1270px
  - Top bar: 56px, white bg, bottom border; breadcrumb left + action footer right
  - Bottom section below top bar:
    - Starting canvas (940px): centred content area, max-width 960px, 24px padding
    - Right panel (330px): left border; condition empty state

**Top bar action footer:**
- Cancel (text link), Save as Draft (primary filled, 128px wide), Publish (disabled state initially)
- Action footer aligned right, 540px container

**Responsive:** MISSING — no responsive frames found.

---

## Core Flows

**Flow 1 — Approval required: select existing approval flow**
1. Template creator lands on step 2 "Approvals" (stepper shows Layout ✓, Approvals active, Preview pending)
2. Left panel shows "Default approval flow" section, toggle "Approval required" is ON by default
3. Creator clicks "Select approval flow" dropdown → list opens showing:
   - "Value" option (highlighted bg `secondary/background`)
   - Named templates: "Approval flow template 1", "Approval flow template 2", "Approval flow template 3", "Finance department", "Finance dept. + CEO"
4. Creator selects a template → dropdown closes, selected name shown in field
5. Pencil/edit icon next to dropdown becomes actionable (INFERRED: leads to edit flow)
6. Creator clicks "Save as Draft" or "Publish" to proceed

**Flow 2 — Approval not required**
1. Creator toggles "Approval required" switch to OFF
2. Left panel clears the dropdown; empty state text appears: "This workflow will simply collect responses"
3. Publish button state: CONFIRM: (likely becomes enabled)

**Flow 3 — Create new approval flow**
1. Creator clicks the pencil/edit icon next to the "Select approval flow" dropdown
2. Overlay dims the background; "Create approval flow" modal opens (1400px × ~996px)
3. Modal breadcrumb: "Create New Template / Create approval flow"
4. Title* field pre-filled with "New approval flow N" (auto-numbered)
5. Creator optionally fills Description field
6. Creator optionally unchecks "Allow self-approval" (checked by default)
7. Creator configures Step 1:
   - Step type dropdown (default: "Approver"; options include "Final approver")
   - Right panel "Step 1" settings panel loads: Fixed/Dynamic tabs, Required approvals (1), If rejected dropdown, Allow submitters to select approvers checkbox, Approvers section
   - Creator selects approver type: User / Department / Assigned group (radio)
   - Creator searches and adds approvers via "Add by name or email" field
   - Added approvers appear in list: avatar + name + email + × remove
8. Creator clicks "Add approval step" → Step 2 row appears; step type defaults to "Final approver"
9. Creator configures Step 2 using the same Step settings right panel
10. Creator clicks "Save" (or dropdown variant) → modal closes, new AF saved and auto-selected in main dropdown

**Flow 4 — Change approver type on existing step**
1. Creator clicks the step type dropdown on an existing step (e.g., "Approver ▼")
2. Dropdown opens with type options (CONFIRM: full list — at minimum "Approver", "Final approver")
3. Creator selects a different type → step row updates; step settings panel refreshes

**Flow 5 — Reorder / remove steps**
1. Each step row has: duplicate icon, delete (trash) icon, collapse chevron
2. Creator clicks delete → step removed (INFERRED: confirmation if steps below would become orphaned)
3. Creator clicks duplicate → step cloned below current step (INFERRED)
4. Creator clicks collapse chevron → step row collapses, showing only step number + type label

---

## States

### Default (Approval Required ON, no selection)
- Toggle: ON (blue)
- "Select approval flow" dropdown shows placeholder text
- Pencil icon visible next to dropdown
- Empty state in condition panel: "No condition set" (italic, muted)
- Starting canvas: "Start condition flow" button centered (outlined, 36px height)
- Publish button: INFERRED disabled until approval flow selected

### Dropdown Open (Select Approval Flow)
- Dropdown expands below input, 282px wide, drop shadow `List Menu Shadow: 0px 4px 10px rgba(0,0,0,0.15)`
- First item ("Value") shown with `secondary/background` highlight
- Remaining items in white bg list rows
- Arrow indicator (rotated 30°) appears next to selected dropdown area

### Approval Not Required (Toggle OFF)
- Toggle: OFF (grey)
- "Select approval flow" dropdown and pencil icon hidden
- Empty state text: "This workflow will simply collect responses" (italic, 12px, `text/placeholder` color)
- Canvas area: unchanged (Start condition flow button still present INFERRED)

### Create Approval Flow Modal — Initial (1 step)
- Title* field: filled with "New approval flow 1" (editable)
- Description field: empty (placeholder shown)
- "Allow self-approval" checkbox: checked (default ON)
- Step 1 row: "Step 1 Approver ▼ / 1 approval required" (expanded); approvers listed
- Right panel: "Step 1" settings open — Fixed tab active, Required approvals = 1, If rejected = "Let approver choose at point of rejection"
- "Add approval step" button: enabled
- Save button: enabled (primary blue); dropdown arrow attached

### Create Approval Flow Modal — Multi-step (2+ steps)
- Step 2 row highlighted in blue (active/selected) — bg light blue, border primary
- Step 2 header: "Step 2 Final approver ▼ / 1 approval required"
- Right panel updates to "Step 2" settings
- Step 1 remains collapsed/visible above

### Error States
MISSING — no error states found in Figma.

| Error | Trigger | EN | JA | Action |
|---|---|---|---|---|
| Title required | Save without title in modal | CONFIRM: | CONFIRM: | Highlight field |
| No approvers added | Save step with empty approver list | CONFIRM: | CONFIRM: | Highlight section |
| Save failure | API error on Save | CONFIRM: | CONFIRM: | Retry |
| Draft save failure | API error on Save as Draft | CONFIRM: | CONFIRM: | Retry |

### Edge Cases
- **Auto-numbered title**: New approval flows auto-name as "New approval flow N" — confirm increment logic
- **"Start condition flow"**: Button in canvas; tapping behavior MISSING — not shown in Figma
- **Single step delete**: Confirm if deleting the only step is blocked or allowed
- **Dynamic tab**: Fixed/Dynamic tabs shown in step settings; "Dynamic" content MISSING — not shown in any frame

---

## Components Used

| Component | Source | Notes |
|---|---|---|
| Horizontal Stepper | `global/components/` CONFIRM: | 3-step horizontal: Layout → Approvals → Preview; step 1 completed (check icon), step 2 active |
| Switch | `global/components/switch.md` | "Approval required" toggle; 27.2px × 16px; ON = primary blue |
| Select dropdown | `global/components/select.md` | "Select approval flow", 282px wide; placeholder style; dropdown arrow icon |
| Text Field | `global/components/text-field.md` | Title* (required), Description (textarea with placeholder) in create modal |
| Checkbox | `global/components/checkbox.md` | "Allow self-approval", "Allow submitters to select approvers" |
| Radio Group | `global/components/radio-group.md` | Approver type: User / Department / Assigned group |
| Tabs | `global/components/tabs.md` | Fixed / Dynamic step settings tabs |
| Avatar | `global/components/avatar.md` | Approver avatars in step rows and step settings list |
| AF Right panel | defined in workflows | 330px fixed left panel; contains stepper + approval flow section; collapsible section header |
| Horizontal stepper bar | defined in workflows | 3-step progress indicator at top of AF right panel |
| Approval flow select row | defined in workflows | Inline row: Select dropdown (282px) + pencil/edit icon |
| Starting canvas | defined in workflows | 940px centred area; "Start condition flow" outlined button; CONFIRM: promote if reused |
| Condition right panel | defined in workflows | 330px; "No condition set" empty state |
| Create approval flow modal | defined here | 1400px overlay; breadcrumb header + Cancel/Save actions |
| AF content header | defined in workflows | Modal header area with title + description + Allow self-approval checkbox |
| Step row | defined in workflows | Numbered step row: type dropdown + count label + avatars + duplicate/delete/collapse icons |
| Step settings panel | defined here | 500px right panel: Fixed/Dynamic tabs, Required approvals, If rejected, Approvers config |
| Action footer (top bar) | `global/components/` CONFIRM: | Cancel + Save as Draft + Publish; right-aligned in top bar |

---

## Guidelines Applied

| Guideline | Source |
|---|---|
| Never use raw hex — always token names | `global/foundations/color-system.md` |
| Inter (EN) / Noto Sans JP (JA via lang attr) | `global/foundations/typography.md` |
| Tabler Icons; one style per product | `global/foundations/iconography.md` |
| WCAG 2.1 AA; 44×44px touch targets | `global/foundations/accessibility.md` |
| MUI transition tokens; prefers-reduced-motion | `global/foundations/motion.md` |
| theme.spacing() — never hardcode px | `global/foundations/spacing.md` CONFIRM: |
| Max content width 960px | Figma annotation: "Max width: 960px" node on starting canvas |
| Approval required toggle defaults to ON | Figma: default view shows toggle ON |
| Allow self-approval checkbox defaults to checked | Figma: checkbox shown checked in create modal |
| Step type defaults to "Approver" for new steps; last step defaults to "Final approver" | Figma: step 2 shows "Final approver" as default type |

---

## Copy Patterns

| Element | EN | JA |
|---|---|---|
| Page step 2 label | "Approvals" | CONFIRM: |
| Page step 1 label | "Layout" | CONFIRM: |
| Page step 3 label | "Preview" | CONFIRM: |
| Top bar breadcrumb part 1 | "Create New Template" | CONFIRM: |
| Top bar breadcrumb part 2 | "Approval Flow Setup" | CONFIRM: |
| Left panel section title | "Default approval flow" | CONFIRM: |
| Toggle label | "Approval required" | CONFIRM: |
| Dropdown placeholder | "Select approval flow" | CONFIRM: |
| Empty state — no approval | "This workflow will simply collect responses" | CONFIRM: |
| Empty state — condition panel | "No condition set" | CONFIRM: |
| Canvas button | "Start condition flow" | CONFIRM: |
| Action: Cancel | "Cancel" | CONFIRM: |
| Action: Save as Draft | "Save as Draft" | CONFIRM: |
| Action: Publish | "Publish" | CONFIRM: |
| Modal breadcrumb part 2 | "Create approval flow" | CONFIRM: |
| Modal field: Title | "Title*" | CONFIRM: |
| Modal field: Description | "Description" | CONFIRM: |
| Modal field description placeholder | "e.g. For approving budget allocation request" | CONFIRM: |
| Modal checkbox: self-approval | "Allow self-approval" | CONFIRM: |
| Auto-generated AF title | "New approval flow N" | CONFIRM: |
| Step type: regular | "Approver" | CONFIRM: |
| Step type: final | "Final approver" | CONFIRM: |
| Step count label | "N approval required" | CONFIRM: |
| Add step button | "Add approval step" | CONFIRM: |
| Step settings: Fixed tab | "Fixed" | CONFIRM: |
| Step settings: Dynamic tab | "Dynamic" | CONFIRM: |
| Step settings: Required approvals label | "Required approvals" | CONFIRM: |
| Step settings: If rejected label | "If rejected" | CONFIRM: |
| Step settings: If rejected value | "Let approver choose at point of rejection" | CONFIRM: |
| Step settings: Allow submitters checkbox | "Allow submitters to select approvers" | CONFIRM: |
| Step settings: Approvers section | "Approvers" | CONFIRM: |
| Step settings: Radio: User | "User" | CONFIRM: |
| Step settings: Radio: Department | "Department" | CONFIRM: |
| Step settings: Radio: Assigned group | "Assigned group" | CONFIRM: |
| Step settings: Search placeholder | "Add by name or email" | CONFIRM: |
| Modal actions: Cancel | "Cancel" | CONFIRM: |
| Modal actions: Save | "Save" | CONFIRM: |

---

## Color Tokens Used

Token format: `palette.<role>.<variant>` per `global/foundations/color-system.md`.
CONFIRM: All mappings inferred — `_theme.md` is a stub. Raw hex values from Figma recorded for reference.

| Visual element | Raw hex (Figma) | MUI palette token |
|---|---|---|
| Primary blue — toggle ON, step completed badge, Save button | `#057aff` | `palette.primary.main` CONFIRM: |
| Page background | `#ffffff` | `palette.background.paper` CONFIRM: |
| Left panel bg | `#ffffff` (white) | `palette.background.paper` CONFIRM: |
| Border — light dividers | `#edeef2` | `palette.divider` CONFIRM: |
| Border — mid (input default) | `#d4d9e1` | `palette.action.focus` or custom CONFIRM: |
| Border — mid-hover (input hover) | `#b9c0cc` | `palette.action.active` CONFIRM: |
| Border — input open/active | `#99a5b8` | `palette.action.selected` CONFIRM: |
| Text — high (primary text) | `#1c1c1c` | `palette.text.primary` CONFIRM: |
| Text — mid (secondary / breadcrumb) | `#535d6e` | `palette.text.secondary` CONFIRM: |
| Text — low (completed step label) | `#728096` | `palette.text.disabled` CONFIRM: |
| Text — placeholder / muted | `#a4adb9` | `palette.text.disabled` CONFIRM: |
| Disabled button bg | `#edeef2` | `palette.action.disabledBackground` CONFIRM: |
| Dropdown list highlight (selected row bg) | `#f5f7fa` (secondary/background) | `palette.action.hover` CONFIRM: |
| Dropdown shadow | `rgba(0,0,0,0.15)` 0px 4px 5px | `shadows[2]` CONFIRM: |
| Step 2 active row bg (tinted blue) | INFERRED light primary | `palette.primary.light` CONFIRM: |
| Step 2 active row border | INFERRED primary | `palette.primary.main` CONFIRM: |
| Empty state italic text | `#a4adb9` | `palette.text.disabled` CONFIRM: |
| Overlay backdrop | INFERRED semi-transparent dark | `palette.action.disabledBackground` or custom CONFIRM: |

---

## Open Items

### Inconsistencies with config files
1. `_theme.md` is a stub — all hex values in design are unresolved to tokens; every color mapping flagged CONFIRM.
2. `_glossary.md` is a stub — all 36 EN copy strings unverified; JA translations absent.
3. `workflows/_guidelines.md` and `global/_guidelines.md` are stubs — layout rules inferred from Figma only.
4. `global/components/` stubs: Horizontal Stepper, Switch, Action Footer — component contracts unverifiable.

### Missing states or flows
5. "Start condition flow" button behavior — tapping it MISSING; the canvas/condition area is not documented in any frame shown. This may be a separate feature (Conditional Flow).
6. "Dynamic" step settings tab content — MISSING; no frame shows the Dynamic variant of step settings.
7. Split Save button dropdown — Save button has a dropdown arrow (▼); options MISSING.
8. Error states for the create modal (title required, no approvers, save failure) — MISSING.
9. Empty state for step settings when no approver is added yet — partially visible but not fully documented.
10. Dropdown open animation / placement when near bottom of panel — MISSING.
11. What happens after clicking "Publish" — success state / transition to Preview MISSING.
12. "Change approver type" dropdown — full list of step type options MISSING (only "Approver" and "Final approver" observed).
13. No responsive / mobile frames — MISSING.

### Decisions needed
14. CONFIRM: Platform classification — Figma shows "Create New Template" breadcrumb, indicating admin/template-creator role. Confirm whether this feature belongs under admin-portal spec or user-portal.
15. CONFIRM: "Start condition flow" — is this a separate Conditional Flow feature or part of Approval Flow Setup?
16. CONFIRM: Pencil/edit icon behavior — does it open the "Create approval flow" modal, or an "Edit" variant of the same modal?
17. CONFIRM: Publish button enabled/disabled logic — when does it become enabled? After approval flow selected? After any configuration?
18. CONFIRM: Auto-increment logic for "New approval flow N" — confirm N starts at 1 and increments per session or globally.
19. CONFIRM: "Allow self-approval" and "Allow submitters to select approvers" — exact help/tooltip text for the info icons not visible in frames.
