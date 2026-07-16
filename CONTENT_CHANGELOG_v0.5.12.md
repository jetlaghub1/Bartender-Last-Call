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

## v0.5.8-prompt9 — meaningful content pass

- Replaced every numbered drink and customer variant with an explicit identity.
- Kept 42 mechanically distinct drinks: six per Spirit and seven focused one-Style cards.
- Balanced Style representation to 4–8 cards per Style.
- Preserved `d1`–`d42` so saved decks remain compatible.
- Added unique customer-profile and bartender-specialty validation.
- Added a curated legal starter deck covering every Spirit.
- Documented why Style-specialist bartenders are deferred until after simulation.
- Added automated content-quality, starter coverage, and saved-ID tests.

## v0.5.9-prompt10 — deterministic simulation engine

- Moved round comparison, round payouts, and match-victory resolution into shared browser/simulator rules.
- Added seeded random generation and exact replay of complete AI-versus-AI matches.
- Added starter, random legal, heuristic legal, and custom legal deck support.
- Added switching decisions, all 49 ordered bartender matchups, and batch aggregation.
- Added game length, first-player, tie, comeback, tips, switch, bartender, card, and customer metrics.
- Added deterministic replay, legal-deck, shared-rule, batch, and matchup tests.
- Fixed deck-cycle refills so each player keeps their own original deck instead of loading Player 1's saved deck.
- Documented simulator configuration, metric definitions, and limitations.

## v0.5.10-prompt11 — 100,000-game baseline study

- Added memory-safe aggregation so large studies do not retain every detailed game record.
- Added drawn-card, deck-inclusion, final-bartender, token, and switch-opportunity metrics.
- Ran 100,000 seeded Hard-AI games: 50,000 random legal decks and 50,000 heuristic decks.
- Distributed each deck group almost equally across all 49 ordered bartender matchups.
- Produced raw JSON plus CSV reports for summary metrics, bartenders, drinks, customers, matchups, game length, and switch usage.
- Produced a human-readable baseline report with definitions, limitations, and evidence flags.
- Verified game, round, winner, matchup, card-event, customer-event, and token-conservation totals.
- Made no gameplay or balance-value changes.

## v0.5.11-prompt12 — first evidence-based balance patch

- Changed only six drink prices, one targeted card for each Prompt 11 outlier bartender.
- Preserved all drink traits, customers, bartender abilities, rules, payouts, thresholds, deck rules, and victory values.
- Reran the exact same 100,000 seeds, Hard AI, 50/50 deck split, and ordered matchup schedule.
- Reduced the starting-bartender spread from 12.48 to 4.69 percentage points.
- Increased target compliance from one of seven to six of seven starting bartenders.
- Preserved first-player balance at 50.33% and average length at 11.17 rounds.
- Recorded Rae at 53.25% as the sole remaining Prompt 13 bartender target.
- Added raw before/after JSON, focused comparison CSVs, and a readable patch report.

## v0.5.12-prompt13 — simulation convergence

- Changed Cellar Select from $20 to $16 as the only follow-up gameplay adjustment.
- Reran the same 100,000 seeds, Hard AI, 50/50 deck split, and ordered matchup schedule.
- Brought all seven starting bartenders into the 48–52% target, ranging from 49.23% to 50.94%.
- Reduced the starting-bartender spread from 4.69 to 1.71 percentage points.
- Verified 50.20% first-player win rate and 0.20 percentage-point advantage.
- Verified 11.22-round average and 88.81% of games finishing in 8–12 rounds.
- Verified zero never-selected cards and three underused cards, which is not a large unplayable group.
- Recorded three deterministic-heuristic staples as a deck-diversity warning for human playtesting.
- Added final target status, paired raw JSON, comparison CSVs, and convergence documentation.
