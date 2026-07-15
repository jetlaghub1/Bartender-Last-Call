# Bartender: Last Call

A playable browser prototype of JetLagHub's competitive bartender strategy card game. This repository is reconstructed from the latest documented working state (v0.5.2a) and includes the Prompt 4.1 readability improvements. It contains real gameplay source, not placeholder-only files.

## Play locally

Open `index.html` in Chrome, Edge, Firefox, or Safari. No installation or network connection is required.

## Current features

- Player vs AI and private local hotseat PvP with protected handoffs and shared reveal
- Easy, Normal, and Hard AI difficulty modes
- Official v0.5 Appeal, payout, switch-token, and victory rules
- Legal 30-card saved deck with a three-copy limit
- Deck builder, automatic starter deck, and safe storage fallback
- Responsive, high-contrast selection UI and keyboard focus states

## Repository map

- `index.html` — browser entry point
- `css/` — responsive presentation
- `js/data.js` — drinks, customers, and bartenders
- `js/rules.js` — reusable rules engine
- `js/app.js` — game flow and interface
- `tests/` — zero-dependency rules tests
- `docs/` — official rules, roadmap, provenance, and release notes

## Tests

With Node.js installed, run:

- `node tests/rules.test.js`
- `node tests/ui-contract.test.js`
- `node tests/ai.test.js`
- `node tests/pvp.test.js`

## GitHub upload

Extract the ZIP and upload the contents, not the enclosing folder, so this README appears at the repository root.

## Status

Prompt 6 is included in this package. The next locked milestone is Prompt 7: interactive tutorial. See `docs/ROADMAP.md`.
