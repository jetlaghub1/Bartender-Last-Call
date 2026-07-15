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
