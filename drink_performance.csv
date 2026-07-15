# Bartender: Last Call — Prompt 11 Baseline Balance Report

**Status: baseline only. No card, bartender, customer, payout, or rules values were changed.**

## Study design

- 100,000 seeded Hard-AI games
- 50,000 random-legal-deck games and 50,000 heuristic-deck games
- All 49 ordered bartender matchups scheduled almost equally within both deck groups
- Seed: `bartender-last-call-prompt11-v0.5.9`
- Exact v0.5 browser rules, AI, and content modules shared with the simulator

## Executive findings

- First-player win rate: **49.93%** (0.07 percentage points from even).
- Game length: **11.19 rounds average**, median 11, 90th percentile 13; 87.69% finished in the 8–12 round target.
- Starting-bartender spread: **12.48 percentage points** from highest to lowest.
- Card flags: 0 never selected, 3 underused, 3 dominant by selection share, and 4 above 70% overall deck inclusion.
- Switches: 2.91 per game; 15.55% of token-holding round decisions resulted in a switch; 40.98% of earned tokens were spent.
- Average combined tips earned per round: **$8.09**.
- Appeal ties occurred in 30.09% of rounds; exact price ties occurred in 14.85%.
- Comebacks from at least $10 behind occurred in 17.81% of games.

## Overall and deck-stratum comparison

| Scope | Games | P1 win | Avg rounds | 8–12 rounds | Appeal ties | Comebacks | Switches/game | Tips/round |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| overall | 100,000 | 49.93% | 11.19 | 87.69% | 30.09% | 17.81% | 2.91 | $8.09 |
| random | 50,000 | 49.97% | 11.19 | 88.23% | 26.54% | 17.72% | 4.71 | $8.11 |
| heuristic | 50,000 | 49.89% | 11.19 | 87.15% | 33.64% | 17.90% | 1.12 | $8.07 |

## Starting bartender results

| Bartender | Specialty | Games | Wins | Win rate |
|---|---|---:|---:|---:|
| Rae | Wine | 28,564 | 15,487 | 54.22% |
| Theo | Whiskey | 28,578 | 15,403 | 53.90% |
| Nico | Gin | 28,566 | 15,083 | 52.80% |
| Sol | Tequila | 28,566 | 15,042 | 52.66% |
| June | Rum | 28,566 | 14,295 | 50.04% |
| Ace | Beer | 28,580 | 12,760 | 44.65% |
| Mara | Vodka | 28,580 | 11,930 | 41.74% |

Because the AI can switch, “starting bartender” is the controlled matchup measurement. Final-bartender results are included in the CSV for context but are influenced by switching selection.

## Highest selection shares

| Drink | Spirit | Selection share | Picked when drawn | Served win rate | Deck inclusion | Flags |
|---|---|---:|---:|---:|---:|---|
| Crystal Gin Fizz | Gin | 6.38% | 44.15% | 55.44% | 78.12% | dominant-selection|high-inclusion |
| City Spritz | Wine | 5.47% | 37.86% | 47.22% | 78.04% | dominant-selection|high-inclusion |
| Spiced Saison | Beer | 5.30% | 36.67% | 43.88% | 78.16% | dominant-selection|high-inclusion |
| Spiced Ranch Water | Tequila | 4.20% | 29.03% | 55.95% | 78.18% | high-inclusion |
| Velvet Merlot | Wine | 3.80% | 40.18% | 57.25% | 56.66% | — |
| Cellar Reserve Ale | Beer | 2.92% | 65.03% | 38.17% | 35.27% | — |
| Diamond Vodka Tonic | Vodka | 2.88% | 64.51% | 49.49% | 35.30% | — |
| Admiral's Reserve | Rum | 2.87% | 64.66% | 51.70% | 35.10% | — |
| Platinum Añejo | Tequila | 2.79% | 62.71% | 49.01% | 35.20% | — |
| Cellar Select | Wine | 2.66% | 59.80% | 59.96% | 35.24% | — |

## Lowest selection shares

| Drink | Spirit | Selection share | Picked when drawn | Served win rate | Deck inclusion | Flags |
|---|---|---:|---:|---:|---:|---|
| Pepper Lemon Drop | Vodka | 0.98% | 21.97% | 57.58% | 35.23% | underused |
| Golden Lager | Beer | 1.03% | 22.94% | 54.15% | 35.37% | underused |
| Tropical Fizz | Rum | 1.15% | 25.97% | 56.32% | 34.94% | underused |
| Golden Sangria | Wine | 1.36% | 30.62% | 64.66% | 35.12% | — |
| Citrus Shandy | Beer | 1.49% | 33.11% | 60.10% | 35.20% | — |
| Sunset Paloma | Tequila | 1.50% | 33.84% | 43.43% | 35.13% | — |
| Garden Gimlet | Gin | 1.51% | 34.21% | 46.50% | 35.09% | — |
| Neon Cosmo | Vodka | 1.54% | 34.56% | 55.01% | 35.08% | — |
| Coconut Cream Punch | Rum | 1.58% | 35.45% | 65.83% | 35.33% | — |
| Agave Cream Flip | Tequila | 1.61% | 36.30% | 52.04% | 35.12% | — |

“Selected-side win rate” and “served win rate” are correlations, not proof that a card caused the win. Prompt 12 should use these alongside deck inclusion, draw rate, and matchup context.

## Customers with the strongest bartender concentration

| Customer | Love / Like / Dislike | Rounds | Top winning bartender | Share | Above equal share | P1 win |
|---|---|---:|---|---:|---:|---:|
| Whiskey Collector | Whiskey / Premium / Cheap | 40,248 | Theo | 25.03% | 10.74 pp | 49.66% |
| Bookshop Owner | Wine / Bitter / Strong | 39,639 | Rae | 25.01% | 10.72 pp | 49.99% |
| Garden Club Host | Gin / Fresh / Creamy | 40,322 | Nico | 24.56% | 10.28 pp | 50.33% |
| Dance Floor DJ | Vodka / Strong / Bitter | 39,806 | Mara | 24.41% | 10.12 pp | 50.06% |
| Agave Hunter | Tequila / Strong / Sweet | 40,259 | Sol | 23.36% | 9.07 pp | 49.94% |
| Wine Critic | Wine / Savory / Cheap | 40,227 | Rae | 23.30% | 9.02 pp | 50.17% |
| Beach Traveler | Rum / Fruity / Bitter | 39,914 | June | 23.19% | 8.90 pp | 49.95% |
| Island Local | Rum / Sweet / Savory | 39,980 | June | 23.06% | 8.78 pp | 50.18% |
| Rooftop Regular | Gin / Premium / Cheap | 40,105 | Nico | 22.36% | 8.08 pp | 49.80% |
| Brunch Organizer | Fruity / Wine / Strong | 39,872 | Rae | 22.04% | 7.76 pp | 49.99% |

## Interpretation limits

- Hard AI is deterministic and customer-aware, but it is not a perfect player or a substitute for human playtesting.
- Random-deck results measure broad content exposure; heuristic-deck results measure the current deck evaluator, not a solved competitive metagame.
- Statistical association does not prove causation. Prompt 12 should make the smallest changes and rerun the same seeds for comparison.

## Next step

Prompt 12 may use this report to propose the smallest evidence-based balance patch. No such patch is included here.
