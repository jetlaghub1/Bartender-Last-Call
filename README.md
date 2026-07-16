# Bartender: Last Call

A playable browser prototype of JetLagHub's competitive bartender strategy card game. This repository contains the real game source, deterministic simulation engine, complete Prompt 11–13 balance history, the Prompt 14 commercial interface, the approved Prompt 15 production art bible, and two reviewed Prompt 16 production-art batches.

## Play locally

Open `index.html` in Chrome, Edge, Firefox, or Safari. No installation or network connection is required.

## Current features

- Player vs AI and private local hotseat PvP with protected handoffs and shared reveal
- Easy, Normal, and Hard AI difficulty modes
- First-visit interactive tutorial with skip, completion tracking, and replay
- Runtime-validated content: 42 drinks, 28 customers, and 7 bartenders
- Official v0.5 Appeal, payout, switch-token, deck, and victory rules
- Legal saved 30-card deck with a three-copy limit
- Verified deck persistence with visible success, invalid-deck guidance, and an honest session fallback when browser storage is blocked
- Commercial bar-themed interface with a clear match HUD, customer dossier, readable drink cards, and polished round results
- Exact live Appeal breakdowns on every drink card, visible switch-token status, and persistent selection guidance
- Responsive phone layout, mobile-sized controls, high contrast, keyboard focus states, and reduced-motion support
- Seeded AI-vs-AI simulation with random, starter, and heuristic legal decks
- Batch analysis and all 49 ordered bartender matchups
- Reproducible 100,000-game baseline reports in `reports/prompt11/`
- Paired 100,000-game before/after patch reports in `reports/prompt12/`
- Final 100,000-game convergence study in `reports/prompt13/`
- Production art bible, visual reference sheet, exact asset dimensions, and a validated 89-asset manifest for Prompt 16
- Sixteen integrated production assets: brand marks, bar environments, Core frames, five gameplay icons, and four bartender portraits

## Repository map

- `index.html` — browser entry point
- `css/` — responsive presentation
- `js/` — shared content, rules, AI, tutorial, and browser game flow
- `simulation/` — deterministic standalone simulator and command-line runner
- `reports/prompt11/` — readable report, raw JSON, and seven focused CSV reports
- `reports/prompt12/` — patch rationale, paired raw results, and comparison CSVs
- `reports/prompt13/` — final target status, paired convergence results, and watch lists
- `tests/` — zero-dependency rules, UI, AI, content, simulator, and art-specification tests
- `docs/` — official rules, roadmap, art bible, design notes, validation, and release history
- `art/` — approved reference sheet, style tokens, filename manifest, and production guidance
- `assets/art/` — separate optimized runtime art used directly by the browser game

## Tests

With Node.js installed, run each test file:

```text
node tests/rules.test.js
node tests/ui-contract.test.js
node tests/ai.test.js
node tests/pvp.test.js
node tests/tutorial.test.js
node tests/content.test.js
node tests/content-quality.test.js
node tests/simulation.test.js
node tests/baseline.test.js
node tests/balance-patch.test.js
node tests/comparison.test.js
node tests/convergence.test.js
node tests/convergence-report.test.js
node tests/final-balance.test.js
node tests/art-bible.test.js
node tests/art-assets.test.js
node tests/storage.test.js
```

## Run simulations

```text
node simulation/run.js --games 1000 --seed first-study --deck random --difficulty hard
node simulation/run.js --matchups --games-per-matchup 100 --seed matchup-study
node simulation/run-baseline.js --games 100000 --random-games 50000
```

The runner prints a JSON report. See `docs/SIMULATION_ENGINE.md` for configuration and metric definitions.

## GitHub upload

Extract the GitHub ZIP and upload its contents, not the enclosing folder, so this README appears at the repository root.

## Status

Prompt 16 batch 02 is complete in v0.7.1. The art now establishes the game’s brand, environments, evaluation icons, and the first four bartender identities without changing gameplay or the converged v0.5.12 balance values. Prompt 16 remains the active repeatable milestone until all manifest assets are produced; the next batch begins with order 17. See `docs/ROADMAP.md`.
