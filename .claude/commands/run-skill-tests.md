---
name: run-skill-tests
description: Run an interactive QA test session for Colorkrew UX Library skills. Use this skill whenever someone says "run skill tests", "test the skills", "QA the library skills", "run the test lab", or "run-skill-tests". Opens the test lab and walks through each scenario.
---

# Run Skill Tests

Runs a structured QA session for the three core UX Library skills — `setup-product`, `document-feature-spec`, and `add-platform-delta`. The tester picks a scenario, runs the corresponding skill in a sandbox product, and scores the output against a quality checklist. Results are logged to the relevant product changelog with a `[Test]` badge.

## What this skill does

1. Presents the four test scenarios and asks the tester which to run
2. Collects test variables (product name, features, Figma URLs)
3. Runs the target skill in a sandbox context
4. Walks through the quality checklist for that scenario
5. Logs results to changelog with a `[Test]` badge
6. Points to `/test/index.html` for visual results tracking

---

## Step 1 — Present scenarios and collect inputs

Show the tester this menu:

```
UX Library Skill Test Lab
─────────────────────────
1. Setup Product          → tests /setup-product
2. Document Feature Spec  → tests /document-feature-spec
3. Add Platform Delta     → tests /add-platform-delta
4. Audit for Inconsistencies → tests /document-feature-spec (with intentional mismatches)

Which test would you like to run? (1–4, or "all" to run all four)
```

Then ask for the test variables needed for the chosen scenario:

- **All scenarios:** Product name (use a unique sandbox name like "TestCo" — never reuse a real product)
- **Scenarios 2, 3, 4:** Feature name, Figma URL for the baseline frame
- **Scenario 3:** Delta platform name, Figma URL for the delta frame
- **Scenario 4:** Second feature name, second Figma URL (use a frame with intentional hex/glossary mismatches)

> **Safety note:** Always use a unique sandbox product name that doesn't exist in the library. This prevents overwriting real specs.

---

## Step 2 — Run the target skill

Run the skill(s) for the chosen scenario using the collected variables as inputs.

**Scenario 1 — Setup Product:**
Run `/setup-product` with the provided product name, feature list, platforms, and brand color.

**Scenario 2 — Document Feature Spec:**
Run `/document-feature-spec` with product, feature, platform, and Figma URL.

**Scenario 3 — Add Platform Delta:**
Run `/add-platform-delta` with both baseline and delta platform/URL pairs.

**Scenario 4 — Audit for Inconsistencies:**
Run `/document-feature-spec` with the second Figma URL. The frame should contain hex values and copy that intentionally don't match the product's `_theme.md` and `_glossary.md`, to verify the skill flags them correctly.

---

## Step 3 — Evaluate against quality checklist

After the skill completes, go through the checklist for the scenario:

### Scenario 1 — Setup Product
- [ ] Created `_index.md` and `_index.html`
- [ ] Created `config/_theme` with color tokens mapped to global tokens
- [ ] Created feature stub folders (one per feature)
- [ ] Updated `sitemap.html` with the new product section
- [ ] Summary shown in plain language
- [ ] `CONFIRM:` flags present on any uncertain token mappings

### Scenario 2 — Document Feature Spec
- [ ] Called `get_design_context` on the Figma URL
- [ ] Read config files (`_theme`, `_glossary`, `_guidelines`)
- [ ] Wrote `feature.md` with correct frontmatter (`product`, `feature`, `platform`, `status: draft`)
- [ ] Wrote `feature.html` with visual layout
- [ ] Open Items section is present (even if empty)
- [ ] No raw hex values appear anywhere in the spec — only token names
- [ ] All copy uses approved terms from `_glossary.md`
- [ ] Updated `_index.html` coverage table

### Scenario 3 — Add Platform Delta
- [ ] Called `get_design_context` on both baseline and delta URLs
- [ ] Delta file contains ONLY differences — no baseline content repeated
- [ ] Opens with "Base spec: / ... Delta only — anything not listed here is identical"
- [ ] Open Items section present
- [ ] Coverage table updated to `delta`
- [ ] Changelog updated with delta entry

### Scenario 4 — Audit for Inconsistencies
- [ ] Flagged hex values in Figma that don't match `_theme.md` — listed in Open Items
- [ ] Flagged copy that doesn't match `_glossary.md` terms
- [ ] Missing states listed in Open Items under "Missing states or flows"
- [ ] `INFERRED:` labels used for content assumed but not shown in Figma
- [ ] `MISSING:` flags where expected states are absent
- [ ] No silent guesses — every uncertain item has a flag

---

## Step 4 — Score the run

Ask the tester for:

1. **Checklist count** — how many items passed (e.g. "5/6")
2. **Quality rating** — 1–5 stars (Poor / Okay / Good / Great / Perfect)
3. **Notes** — anything the skill missed, did unexpectedly well, or that should be improved
4. **Token efficiency** — did the skill read more files than necessary? (e.g. entire `sitemap.html` when only one section was needed)

---

## Step 5 — Log results to changelog with [Test] badge

Write a changelog entry to the sandbox product's changelog (or `global/changelog.html` if no product changelog exists for the sandbox).

**Entry format** — append inside the current `cl-card` block in the product's `changelog.html`:
```html
<div class="cl-entry">
  <span class="cl-entry-type cl-type-test">Test</span>
  <div>
    <div class="cl-entry-title">[Scenario name] — skill QA run. Checklist: [X/Y] · Rating: [N]★</div>
    <div class="cl-entry-desc">[Notes from tester, if any. Token efficiency observations if notable.]</div>
  </div>
</div>
```

The `cl-type-test` class is defined in `styles.css` — amber/yellow badge. It signals that this entry was generated from a test run, not a real documentation update. If the changelog's inline `<style>` block doesn't include `cl-type-test`, it will fall back gracefully to unstyled text; the global `styles.css` definition will apply when served.

If the sandbox product folder doesn't exist yet (e.g. test run 1 failed before creating it), log to a scratch note in the conversation instead and note the path that would have been used.

---

## Step 6 — Clean up sandbox (optional)

If the skill run created real files under the sandbox product slug, offer to delete the sandbox folder:

> "The sandbox folder `/[product-slug]/` was created during this test. Would you like me to delete it now to keep the library clean?"

Only delete if the tester confirms. Never auto-delete.

---

## Step 7 — Point to visual tracker

Remind the tester:

> "You can track results visually at `/test/index.html` in the UX Library. Copy your test variables and checklist scores there to compare across runs."

---

## Output

- Quality checklist results shown in conversation
- Changelog entry written with `[Test]` badge
- Summary: scenario tested, checklist score, rating, key findings
- Optional: sandbox cleanup prompt

---

## Notes

- Always use a unique sandbox product name — never an existing product slug
- If running "all" scenarios, run them sequentially and aggregate results into one summary
- The `[Test]` badge is for changelog display only — no code or library structure changes should be marked as `[Test]`
- Token efficiency observations are especially valuable — note them even if the skill output looks correct
