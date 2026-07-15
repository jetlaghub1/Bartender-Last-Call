# Bartender: Last Call

A playable browser prototype of JetLagHub's competitive bartender strategy card game. This repository contains the real game source, deterministic simulation engine, Prompt 11 baseline, and Prompt 12 price-only balance patch.

## Play locally

Open `index.html` in Chrome, Edge, Firefox, or Safari. No installation or network connection is required.

## Current features

- Player vs AI and private local hotseat PvP with protected handoffs and shared reveal
- Easy, Normal, and Hard AI difficulty modes
- First-visit interactive tutorial with skip, completion tracking, and replay
- Runtime-validated content: 42 drinks, 28 customers, and 7 bartenders
- Official v0.5 Appeal, payout, switch-token, deck, and victory rules
- Legal saved 30-card deck with a three-copy limit
- Responsive, high-contrast selection UI and keyboard focus states
- Seeded AI-vs-AI simulation with random, starter, and heuristic legal decks
- Batch analysis and all 49 ordered bartender matchups
- Reproducible 100,000-game baseline reports in `reports/prompt11/`
- Paired 100,000-game before/after patch reports in `reports/prompt12/`

## Repository map

- `index.html` — browser entry point
- `css/` — responsive presentation
- `js/` — shared content, rules, AI, tutorial, and browser game flow
- `simulation/` — deterministic standalone simulator and command-line runner
- `reports/prompt11/` — readable report, raw JSON, and seven focused CSV reports
- `reports/prompt12/` — patch rationale, paired raw results, and comparison CSVs
- `tests/` — zero-dependency rules, UI, AI, content, and simulator tests
- `docs/` — official rules, roadmap, design notes, validation, and release history

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

Prompt 12 is complete in v0.5.11. Six drink prices changed; six of seven starting bartenders now meet the 48–52% target in the paired 100,000-game comparison. Rae remains at 53.25% for Prompt 13. See `docs/ROADMAP.md`.
