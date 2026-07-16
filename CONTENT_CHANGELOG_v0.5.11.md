# Content audit — v0.5.7

## Audited inventory

- 42 drink cards
- 28 customers
- 7 bartenders
- 7 allowed Spirits
- 12 allowed Style traits

These are the actual current totals. Earlier planning references to 120 drinks, 50 customers, and 16 bartenders do not describe this source project and are not claimed here.

## Release-blocking results

**PASS — 0 errors.**

- Every drink has one allowed Spirit, two unique allowed Styles, and one positive price.
- No drink combines the contradictory Premium and Cheap traits.
- Drink IDs, names, and complete mechanical profiles are unique.
- Every customer has exactly one allowed Love, one Like, and one Dislike.
- No customer repeats the same trait across Love, Like, and Dislike.
- Every bartender has one allowed specialty and the standardized `<Specialty> drinks gain +1 Appeal.` passive.
- Bartender names are unique.

## Distribution

Each Spirit appears on exactly 6 drinks: Beer, Vodka, Whiskey, Rum, Gin, Tequila, and Wine.

Style appearances range from 6 to 8:

- Fruity: 8
- Premium, Cheap, Strong, Sweet, Bitter, Fresh, Sour, Creamy, Clean, and Savory: 7 each
- Spicy: 6

Prices range from $8 to $22 in $2 steps:

- $8 and $10: 6 drinks each
- $12, $14, $16, $18, $20, and $22: 5 drinks each

All seven bartenders cover one Spirit specialty each. Customer Love/Like/Dislike records collectively cover every allowed trait.

## Prompt 9 warnings

These are valid data but weak content design:

1. 21 drink names are numbered variants.
2. All 28 customer names end in numbers and reuse seven base archetype labels.
3. Every drink has exactly two Styles; no one-Style drinks exist.
4. Bartenders cover all Spirit specialties but none of the 12 Style specialties.

Prompt 9 should decide which variants deserve distinct identities, which should be removed, and whether the content set needs style-specialist bartenders or one-Style drinks. Those design changes were deliberately not mixed into this schema audit.
