# Bartender: Last Call — Prompt 12 Balance Patch Report

**Patch category: drink prices only.** No traits, customers, bartenders, rules, payouts, switch thresholds, deck rules, or victory values changed.

## Changes and evidence

| Drink | Spirit | Before | After | Reason |
|---|---|---:|---:|---|
| Spiced Saison | Beer | $14 | $20 | Raise Ace from the weak Beer starting-bartender result using the most-selected Beer specialist card. |
| Market Mule | Vodka | $14 | $20 | Raise Mara from the weakest starting-bartender result using the most-selected Vodka specialist card. |
| Smoked Manhattan | Whiskey | $22 | $20 | Reduce Theo using the high-price Whiskey anchor without changing Whiskey traits or Appeal. |
| Pepper Negroni | Gin | $18 | $16 | Reduce Nico with a one-payout-step change to a frequently selected Gin card. |
| Platinum Añejo | Tequila | $22 | $21 | Reduce Sol by one winner-payout step while preserving this card as the premium Tequila tiebreaker. |
| Velvet Merlot | Wine | $16 | $12 | Reduce Rae using the high-selection, high-served-win Wine card identified by the baseline. |

Each changed price crosses only the payout or tiebreak steps needed by its target. June received no direct change because the Prompt 11 baseline placed June inside the target range.

## Same-seed before versus after

Both studies contain 100,000 games using the same seed, 50/50 deck split, Hard AI, and ordered-matchup schedule.

| Metric | Before | After | Change |
|---|---:|---:|---:|
| first player win rate | 49.93% | 50.33% | 0.40 pp |
| average rounds | 11.19 | 11.17 | -0.03 |
| median rounds | 11.00 | 11.00 | 0.00 |
| p90 rounds | 13.00 | 12.00 | -1.00 |
| appeal tie rate | 30.09% | 30.40% | 0.31 pp |
| price tie rate | 14.85% | 14.75% | -0.11 pp |
| comeback rate | 17.81% | 17.46% | -0.35 pp |
| average tips per round | 8.09 | 8.16 | 0.07 |
| average switches per game | 2.91 | 2.93 | 0.02 |
| starting bartender spread points | 12.48 | 4.69 | -7.79 |
| bartenders in 48 to 52 target | 1.00 | 6.00 | 5.00 |

## Starting bartender win rates

| Bartender | Specialty | Before | After | Change | Target? |
|---|---|---:|---:|---:|---|
| Rae | Wine | 54.22% | 53.25% | -0.97 pp | No |
| Sol | Tequila | 52.66% | 50.15% | -2.51 pp | Yes |
| Nico | Gin | 52.80% | 50.09% | -2.71 pp | Yes |
| Theo | Whiskey | 53.90% | 49.51% | -4.38 pp | Yes |
| June | Rum | 50.04% | 49.34% | -0.70 pp | Yes |
| Ace | Beer | 44.65% | 49.11% | 4.46 pp | Yes |
| Mara | Vodka | 41.74% | 48.55% | 6.81 pp | Yes |

The starting-bartender spread moved from **12.48** to **4.69 percentage points**. 6 of 7 bartenders are now inside 48–52%.

Remaining outside target: Rae (53.25%). This is the only Prompt 13 candidate, rather than a reason to add untested Prompt 12 changes.

## Card and system checks

- Card flags after the patch: 0 never selected, 3 underused, 4 dominant by selection share.
- First-player win rate moved from 49.93% to 50.33%.
- Average length moved from 11.19 to 11.17 rounds.
- Average combined tips per round moved from $8.09 to $8.16.

## Interpretation

This is the first evidence-based patch, not the final balance claim. The comparison uses the exact same seeds, but AI simulation still needs confirmation from real players. Prompt 13 should address only remaining target failures and preserve this report as the comparison baseline.
