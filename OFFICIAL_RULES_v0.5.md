# Content quality pass — v0.5.8

## Decision

Keep **42 drinks**, **28 customers**, and **7 bartenders**.

The 42-card drink pool is large enough to support a legal 30-card deck and meaningful trait coverage without pretending that renamed numerical variants are finished content. The IDs `d1` through `d42` were preserved so existing browser-saved decks remain valid.

## Drinks

All 21 numbered drink variants were replaced with unique names and deliberate profiles. The final structure is:

- 6 drinks for each of the 7 Spirits
- 7 focused one-Style drinks, one per Spirit
- 35 two-Style bridge drinks
- 0 duplicate names
- 0 duplicate mechanical profiles
- 0 Premium/Cheap contradictions
- Style coverage between 4 and 8 drinks per Style
- Prices from $8 to $22

The focused cards create narrow customer matches. The bridge cards connect two preferences. Lower-price cards support safe/budget choices; $20–$22 cards offer stronger payout and price-tiebreaker upside without adding Appeal directly.

## Customers

All 28 numbered customers were replaced with distinct identities such as **Whiskey Collector**, **Night Shift Nurse**, **Food Truck Cook**, and **Quiet Celebrant**.

- Every customer has a unique Love/Like/Dislike profile.
- Every allowed Spirit and Style appears in the customer preference pool.
- No customer repeats a trait across Love, Like, and Dislike.

## Bartenders

The seven existing Spirit specialists remain unchanged. Adding twelve Style specialists now would inflate the roster before the simulation phase and create new balance work without solving a core gameplay problem. Style-specialist bartenders remain a possible later expansion after the current roster is measured.

## Starter deck

The former “first ten cards” starter logic was replaced with a curated 10-card pool covering all seven Spirits. Three copies of each card create a legal 30-card deck while preserving broad customer coverage.

## Remaining work

Content is now structurally meaningful, but numerical balance has not yet been proven. Prompts 10–13 will measure card use, customer bias, bartender win rates, and starter-deck performance before further content changes.
