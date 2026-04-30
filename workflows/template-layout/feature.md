---
product: Workflows
feature: template-layout
platform: User Portal
status: draft
last_updated: 2026-04-30
confirms_needed: 10
---

# Template Layout — Feature

> Step 1 of a 3-step template creation wizard (Layout → Approvals → Preview). Admin drags sections and form elements onto a canvas to define the form structure for a workflow template.

---

## Layout

- Total frame: 1600px
- Left panel (fixed): 330px — stepper + form picker + layout tiles + element palette
- Main canvas: 940px (scrollable) — subject fields + section/element canvas
- Right settings panel (fixed): 330px — element settings, empty by default
- Top bar: 1270px — breadcrumbs (left) + action footer (right)
- Max content width inside canvas: 960px (24px padding each side)

---

## Core Flows

1. **Start layout from scratch** — Admin lands on Layout step. Canvas shows "Drag and drop a layout section from the left panel to get started". Left panel shows Form select, Layout tiles, Form Elements palette. Action bar: Cancel | Save as Draft | Publish (disabled).

2. **Select form type** — Admin picks a form from the "Form" select dropdown in the left panel (e.g. "Custom form"). `INFERRED:` this gates which element types are available.

3. **Add subject fields** — Admin clicks "Add subject fields" (Select with Chips) at top of canvas. Hint: "Select up to 3 fields, with at least 1 required field". `CONFIRM:` max 3 is a hard limit or UI suggestion?

4. **Add a Section** — Admin drags "Section" tile from left panel to canvas. Section appears with: "Enter section title*" input, "Enter description (optional)" input, and empty drop zone "Drag and drop to add element here". Section header shows: drag handle (⠿) | title | description | 🔔 | 🗑 | ∧.

5. **Add a Multi-entry Section** — Same as Flow 4 but shows additional "Max. entries: 10 ↓" control in the header. `CONFIRM:` Is 10 a fixed default, or configurable at template level?

6. **Add form element to section** — Admin drags element tile from palette to section drop zone. Element renders in 2-col grid inside section. Element is auto-selected; right panel opens with that element's settings.

7. **Configure element settings (Dropdown example)** — Right panel shows:
   - Title: element type name + X close
   - "Required field" Switch
   - "Label title*" Text Field (placeholder: "e.g. Select categories")
   - "Allow multiple selections" Checkbox (Dropdown-specific)
   - "Options (Min. 2)" — draggable list: [⠿ | Option* text field | + | 🗑], "Add option" button, "All fields are required" error, divider
   - Footer: "Remove element" (destructive link, `--status/error`)

8. **Reorder elements via drag-and-drop** — 5 snapping zones:
   - Snapping in between rows: element snaps to a new row between two existing rows
   - Snapping left: element snaps to left column of an existing row
   - Snapping right: element snaps to right column of an existing row
   - Snapping left side of an element: element splits with existing element, placed left
   - Snapping right side of an element: element splits with existing element, placed right

9. **Collapse / expand section** — Admin clicks ∧ icon. Section collapses to show title + description truncated to 1 sentence with ellipsis. Elements hidden.

10. **Delete section** — Admin clicks 🗑. Dialog: "Delete section?" — "All elements inside will be permanently deleted. This action cannot be undone." → [No, keep section] | [Yes, delete section].

11. **Save as Draft** — Admin clicks "Save as Draft". Status badge "Draft" appears in action bar. Buttons: Cancel | Save Changes | Publish.

12. **Edit saved draft (unsaved changes)** — Admin edits after saving. Action bar updates: "Unsaved changes · Draft ·" | Cancel | Save Changes (primary) | Publish.

13. **Exit with unsaved changes** — Admin clicks Cancel or navigates away. Dialog: "Exit without saving?" — "You have unsaved changes. Leaving now will discard them permanently." → [No, keep editing] | [Yes, discard changes].

14. **Validation on Publish** — Admin clicks Publish with incomplete data. Required field labels highlight "Missing input*" in `--status/error`. Empty section drop zone shows red dashed border + "At least 1 element is required."

---

## States

### Empty State
Main canvas: "Drag and drop a layout section from the left panel to get started" (center, muted).
Right panel: "Select a form element to view and edit its settings here" (italic, `--text/placeholder`).

### Loading State
`MISSING:` No loading frame in Figma. Expected: skeleton or spinner. `CONFIRM:` with designer.

### Error States

| Error | Trigger | EN | JA | Action |
|---|---|---|---|---|
| Empty section | Section has no elements when Publish is attempted | "At least 1 element is required." | MISSING | Inline under drop zone, red dashed border |
| Missing required input | Field label is empty when Publish attempted | "Missing input*" | MISSING | Inline — field label turns red |
| Options incomplete | Dropdown/Single/Multiple options left empty in settings panel | "All fields are required" | MISSING | Inline in settings panel, red caption |
| Empty canvas | Publish attempted with no sections | `MISSING:` no dedicated frame | — | `CONFIRM:` with designer |

### Success / Confirmation
- Save as Draft → Action bar status changes to "Draft ·"
- Unsaved changes → Action bar status changes to "Unsaved changes · Draft ·"
- Delete section confirmed → Section removed from canvas; `MISSING:` no toast or undo
- `MISSING:` Publish success state — no frame shown

### Edge Cases
- Section with collapsed state: title shown, description truncated to 1 sentence + ellipsis
- Multi-entry section: "Max. entries: 10 ↓" visible in section header
- "Edit after published" action bar state: `INFERRED:` "Published ·" status badge — no dedicated screenshot captured
- "Biz Inventory Form" example visible in Figma annotation — `INFERRED:` reference sample, not a separate flow

---

## Components Used

| Component | Source | Notes |
|---|---|---|
| Horizontal Stepper | `global/components/` | 3 steps: Layout (active), Approvals, Preview |
| Select | `global/components/` | Form type picker in left panel; "Add subject fields" |
| Breadcrumbs | `global/components/` | "Create New Template / Layout Setup" |
| Switch | `global/components/` | "Required field" toggle in settings panel |
| Checkbox | `global/components/` | "Allow multiple selections" in Dropdown settings |
| Text Field | `global/components/` | Label title, option inputs in settings panel |
| Basic Dialog | `global/components/` | Delete section dialog; Exit without saving dialog |
| Icon Button | `global/components/` | 🔔 pin, 🗑 delete, ∧ collapse in section header; X in settings panel |
| Select with Chips | defined here — promote if reused | Subject fields multi-select at canvas top |
| Form Elements Palette (Icon Vertical) | defined here — promote if reused | 2-col draggable tile grid in left panel; grip icon top-left |
| Layout Tiles (Icon Vertical) | defined here — promote if reused | Section tile, Multi-entry tile in left panel |
| Section container | defined here — promote if reused | Expandable/collapsible section with drag handle, header controls, 2-col inner grid |
| Multi-entry Section | defined here — promote if reused | Section variant with Max. entries control |
| Section Element (2-col row) | defined here — promote if reused | Form element rendered inside section; 2-col responsive layout |
| Action Footer | defined here — promote if reused | Top bar right: status badge + Cancel/Save/Publish buttons; 3 states |
| Right Panel Settings | defined here — promote if reused | Per-element config panel: title, settings fields, Remove element footer |
| Dropdown Option Row | defined here — promote if reused | ⠿ drag handle + text field + + icon + 🗑 delete; used in Dropdown/Single/Multiple settings |

---

## Guidelines Applied

| Guideline | Source |
|---|---|
| Required fields marked with * | `INFERRED:` — `global/_guidelines.md` (stub) |
| Validation runs on Publish, not on Save as Draft | `INFERRED:` — `workflows/_guidelines.md` (stub) |
| Destructive actions require a confirmation dialog | `INFERRED:` — `global/_guidelines.md` (stub) |
| Unsaved changes prompt shown before navigation away | `INFERRED:` — `global/_guidelines.md` (stub) |
| 2-col element grid within sections | `INFERRED:` — `workflows/_guidelines.md` (stub) |
| 5 drag-and-drop snapping zones | `INFERRED:` — `workflows/_guidelines.md` (stub) |
| Section description truncated to 1 sentence in collapsed state | `INFERRED:` — `workflows/_guidelines.md` (stub) |

---

## Copy Patterns

| Element | EN | JA |
|---|---|---|
| Stepper step 1 | Layout | MISSING |
| Stepper step 2 | Approvals | MISSING |
| Stepper step 3 | Preview | MISSING |
| Breadcrumb | Create New Template / Layout Setup | MISSING |
| Left panel label | Form | MISSING |
| Left panel label | Layout | MISSING |
| Left panel label | Form Elements | MISSING |
| Layout tile | Section | MISSING |
| Layout tile | Multi-entry | MISSING |
| Element tile | Short Text | MISSING |
| Element tile | Text Area | MISSING |
| Element tile | Email | MISSING |
| Element tile | URL | MISSING |
| Element tile | Number | MISSING |
| Element tile | Currency | MISSING |
| Element tile | Date | MISSING |
| Element tile | Time | MISSING |
| Element tile | Dropdown | MISSING |
| Element tile | Single Choice | MISSING |
| Element tile | Multiple Choice | MISSING |
| Element tile | Yes/No Check | MISSING |
| Element tile | File Upload | MISSING |
| Subject fields hint | Select up to 3 fields, with at least 1 required field | MISSING |
| Section title placeholder | Enter section title* | MISSING |
| Section description placeholder | Enter description (optional) | MISSING |
| Drop zone — empty section | Drag and drop to add element here | MISSING |
| Drop zone — empty canvas | Drag and drop a layout section from the left panel to get started | MISSING |
| Right panel empty state | Select a form element to view and edit its settings here | MISSING |
| Max entries label | Max. entries | MISSING |
| Action | Cancel | MISSING |
| Action | Save as Draft | MISSING |
| Action | Save Changes | MISSING |
| Action | Publish | MISSING |
| Status badge | Draft | MISSING |
| Status badge | Unsaved changes | MISSING |
| Settings: Required field | Required field | MISSING |
| Settings: Label title | Label title | MISSING |
| Settings: Allow multiple | Allow multiple selections | MISSING |
| Settings: Options label | Options (Min. 2) | MISSING |
| Settings: Option placeholder | Option* | MISSING |
| Settings: Add option | Add option | MISSING |
| Settings: Remove element | Remove element | MISSING |
| Settings: Error | All fields are required | MISSING |
| Validation error | Missing input* | MISSING |
| Validation error | At least 1 element is required. | MISSING |
| File upload CTA | Drop files here or browse to upload | MISSING |
| File upload spec | Documents, compressed, images, audio, video up to 25MB | MISSING |
| Dialog title | Delete section? | MISSING |
| Dialog body | All elements inside will be permanently deleted. This action cannot be undone. | MISSING |
| Dialog cancel | No, keep section | MISSING |
| Dialog confirm | Yes, delete section | MISSING |
| Dialog title | Exit without saving? | MISSING |
| Dialog body | You have unsaved changes. Leaving now will discard them permanently. | MISSING |
| Dialog cancel | No, keep editing | MISSING |
| Dialog confirm | Yes, discard changes | MISSING |

---

## Color Tokens Used

Extracted from Figma CSS variables (raw values — needs mapping in `workflows/_theme.md`):

- `--secondary/white` (#ffffff) — panel backgrounds
- `--border/default-mid-hover` (#b9c0cc) — element tile borders, section borders
- `--border/mid-light-hover` (#d4d9e1) — form input borders in settings panel
- `--border/light` (#edeef2) — left panel right border, right panel left border
- `--text/high-default` (#1c1c1c) — primary text: section titles, element labels, settings titles
- `--text/low` (#728096) — secondary text: stepper inactive steps, left panel section labels, settings field labels
- `--text/placeholder` (#a4adb9) — placeholder text, right panel empty state
- `--status/error` (#e24f4b) — validation errors, required field *, "Remove element" link, option errors
- `INFERRED:` primary blue token — "Save as Draft", "Save Changes", "Yes, delete section" buttons; stepper active underline

---

## Open Items

### Inconsistencies with config files
1. `_theme.md` is a stub — all 9 tokens above need to be defined there before implementation.
2. `_glossary.md` is a stub — all EN copy strings above need JA translations.
3. `_guidelines.md` (Workflows) is a stub — drag-and-drop snapping rules, 2-col grid rules, multi-entry Max.entries behavior, and validation trigger rules (Publish only, not Draft) need to be documented.
4. `global/_guidelines.md` is a stub — dialog confirmation pattern, unsaved-changes prompt, and empty-state patterns need cross-product documentation.

### Missing states or flows
5. **Loading state** — no skeleton or spinner frame found in Figma. Confirm with designer.
6. **Publish success state** — what happens after Publish completes? No frame captured.
7. **"Edit after published" top bar state** — only a screenshot exists (same buttons as Draft), no dedicated annotated frame. No "Published" badge confirmed.
8. **Element settings for all types** — only Dropdown settings are fully shown. Short Text, Text Area, Email, URL, Number, Currency, Date, Time, Single Choice, Multiple Choice, Yes/No Check, File Upload settings panels need separate documentation.
9. **Drag ghost/placeholder visual** — active drag state (element being dragged, drop zone highlight) not shown in a dedicated frame.
10. **Empty canvas Publish validation** — no frame for attempting Publish with zero sections.

### Decisions needed
10. **Role access** — `INFERRED:` Admin-only. Confirm: can Submitters/Approvers reach this screen?
11. **Subject fields max** — "Select up to 3 fields, with at least 1 required field" — confirm 3 is a hard limit.
12. **Multi-entry default Max entries** — shown as 10 in design; confirm if this is user-configurable or fixed.
13. **File upload limit** — "up to 25MB" — confirm this is production-accurate.
14. **Select with Chips** component not in `global/components/` or `workflows/_components.md` — needs to be promoted or defined as a Workflows component.
15. **Action Footer** component not in `workflows/_components.md` — likely reused in Approvals (step 2) and Preview (step 3); should be promoted.
16. **Delete section vs. Remove element** — two different destructive flows; confirm whether "Remove element" also requires a confirmation dialog or is immediate.
17. **"Biz Inventory Form" annotated example** in Figma — is this a reference sample only, or does it represent a real use case that affects the spec?
