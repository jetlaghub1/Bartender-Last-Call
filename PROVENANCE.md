# Changelog

## v0.5.3 — GitHub baseline

- Reconstructed a playable source repository from the documented v0.5.2a state.
- Added official rules as a reusable testable module.
- Included AI and local hotseat modes, bartender switching, scoring, payouts, deck validation, deck persistence, and a starter deck.
- Applied Prompt 4.1 contrast, selected states, responsive layout, clearer Lock In feedback, and visible keyboard focus.
- Added repository documentation and zero-dependency rules tests.

## v0.5.3-prompt4.1 — Selection UI corrective pass

- Added distinct green Player 1 and red Player 2 selected-card states.
- Added bartender portrait icons, clearer specialty text, and selected-state accessibility.
- Improved enabled and disabled Lock In feedback, including remaining-card guidance.
- Strengthened mobile touch targets, stacking, contrast, focus outlines, and reduced-motion support.
- Added clearer gold winner treatment and larger tip payouts on round results.

## v0.5.3a-prompt4.1 — itch.io packaging hotfix

- Rebuilt the browser release with standards-compliant forward-slash ZIP paths so itch.io can resolve the CSS and JavaScript files.
- Kept `index.html` at the ZIP root and verified every local asset reference against the exact archive.

## v0.5.3b-prompt4.1 — card price layout hotfix

- Replaced the absolutely positioned card price with a flexible footer below the card text.
- Added spacing and a divider so names, traits, and prices cannot overlap on desktop or mobile.

## v0.5.3c-prompt4.1 — duplicate-selection hotfix

- Gave every physical copy of a drink card a unique instance identity.
- Fixed duplicate drink copies appearing selected together while only counting as one selection.
- Preserved the official token-based bartender switching rule.

## v0.5.3d-prompt4.1 — conditional bartender prompt

- The bartender selection phase now appears only when that player owns a switch token.
- Local PvP skips the bartender pass-device screen when Player 2 has no token.
- The Keep button now clearly explains that the token will be saved.

## v0.5.4-prompt5 — AI difficulty system

- Added Easy, Normal, and Hard difficulty selection before AI matches.
- Moved AI behavior into a reusable, deterministic engine.
- Added customer-aware Appeal evaluation and price-tiebreaker logic.
- Added deck-aware bartender switching and Hard token conservation.
- Kept human hands and locked selections outside every AI decision input.
- Added automated AI behavior and privacy contract tests.

## v0.5.5-prompt6 — private local PvP

- Fixed the post-lock handoff that incorrectly reopened Player 2 bartender selection.
- Added privacy screens before Player 1 and Player 2 hands are rendered.
- Added a pass-back step after Player 2 bartender setup.
- Added a neutral both-locked screen with an explicit shared Reveal Drinks action.
- Ensured the confirmation screen exposes neither hand nor selected drink.
- Added local PvP flow and privacy contract tests.

## v0.5.6-prompt7 — interactive tutorial

- Added an optional first-visit tutorial welcome with Skip for Now.
- Added eight short interactive lessons covering every locked tutorial topic.
- Added progress tracking, immediate answer feedback, and gated lesson advancement.
- Saved tutorial completion locally and added replay controls to the menu and rules screen.
- Added an Easy AI practice option after completion.
- Added deterministic tutorial logic and UI contract tests.

## v0.5.6a-prompt7 — deck lesson hotfix

- Replaced the tutorial's generic Add Card counter with selectable drink cards.
- Added visible copy counts, disabled three-copy-limit cards, remaining deck slots, and Reset Choices.
- Added rule tests for copy limits and full-deck blocking.

## v0.5.6b-prompt7 — customer context hotfix

- Added the customer preferences and bartender specialty to the three-drink selection lesson.
- Made the highest-Appeal lesson use the exact three drinks selected in the previous step.
- Calculated every displayed Appeal score from the shared rules engine.

## v0.5.6c-prompt7 — bartender choice hotfix

- Made Switch Bartender open a real three-bartender selection inside lesson 6.
- Requires choosing a replacement before continuing and displays the resulting specialty and token cost.
- Added Cancel Switch and Save Token so both legal strategic choices remain available.

## v0.5.7-prompt8 — content audit

- Added a reusable content schema and audit engine loaded by the browser game.
- Converted the data source into a browser/Node-compatible validated module.
- Verified all 42 drinks, 28 customers, and 7 bartenders with zero schema errors.
- Added duplicate profile, contradiction, preference, price, and passive validation.
- Documented exact distributions and four honest content-variety warnings for Prompt 9.
- Added automated valid-data and invalid-fixture content tests.
