# Deterministic Simulation Engine

Prompt 10 adds a standalone Node.js simulator in `simulation/` without creating a second version of the game rules. Both the browser game and simulator import `js/rules.js`, `js/ai.js`, and `js/data.js`.

Prompt 11 adds a memory-safe study runner, report generation, and the checked-in 100,000-game baseline under `reports/prompt11/`.

## Reproducibility

Every simulated game has a string seed. The seed controls bartender assignment, deck construction, shuffle order, customers, AI mistakes, equal-price ties, and bartender decisions. Repeating a configuration with the same seed returns an identical game record.

## Supported studies

- AI versus AI at Easy, Normal, or Hard difficulty
- A specified bartender pair or a seeded random pair
- Starter, random legal, or heuristic legal decks
- All 49 ordered matchups across the seven bartenders, including mirror matches
- Batch studies with one aggregate report
- Custom legal 30-card decks through the simulator API

Random decks sample from three available copies of every drink and are validated by the shared deck rule. Heuristic decks select the ten drinks with the strongest average Appeal and price tiebreak value for their bartender, then use three copies of each.

## Shared rule path

The simulator calls the same functions as the browser game for:

- Appeal and best served drink
- Appeal and price comparison, including seeded random final ties
- Winner and loser payouts
- Switch-token thresholds
- Match victory at $50
- Deck legality

Automated tests fail if the browser game or simulator stops using the shared round comparison, payout, or match-victory functions.

## Metrics

Game records include rounds, winner, final tips, score history, initial and final bartenders, switches, deck lists, selected and served cards, customer results, Appeal ties, price ties, comeback status, and maximum winning-player deficit.

Aggregate reports include:

- First-player win rate
- Average, median, and 90th-percentile game length
- Appeal-tie and price-tie rates per round
- Comeback rate, defined as winning after trailing by at least $10
- Average switches per game
- Average combined tips earned per round
- Bartender games and wins
- Card selection, service, and round-win counts
- Customer outcomes and winning bartenders

These are raw measurements, not balance conclusions. Prompt 11 runs the formal 100,000-game baseline and turns these measurements into a human-readable study.

## Commands

```text
node simulation/run.js --games 1000 --seed first-study --deck random --difficulty hard
node simulation/run.js --matchups --games-per-matchup 100 --seed matchup-study
node simulation/run-baseline.js --games 100000 --random-games 50000
```

Available deck values are `starter`, `random`, and `heuristic`. Available difficulty values are `easy`, `normal`, and `hard`. The runner writes JSON to standard output, so it can be redirected to a report file when desired.

## Scope and limitations

The engine simulates the current deterministic AI heuristics, not human psychology or an optimal game-theory player. It is suitable for reproducible regression tests and broad balance signals. Real playtest feedback remains necessary before commercial balance decisions.
