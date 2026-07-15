# Prompt 5 AI design

The AI engine is isolated in `js/ai.js` and receives only information the AI is legally allowed to know.

## Difficulty levels

- **Easy:** chooses three legal cards with relaxed, randomized play and rarely changes bartenders.
- **Normal:** evaluates public customer preferences, Appeal, and price tiebreakers. It changes bartender when its remaining deck clearly supports another specialty.
- **Hard:** makes exact drink choices and applies a token-conservation threshold based on current tokens, remaining deck support, tips, and distance to the next $15/$30/$45 switch award.

## Hidden information

Drink decisions receive only the AI hand, public customer, current bartender, selected difficulty, and randomness source. Bartender decisions happen before the customer and hands are revealed and receive only the AI bartender, AI deck composition, AI token count, AI tips, and the available bartender list. The human hand and selections are never inputs.

## Determinism

Both AI decisions accept an optional random-number function. Tests inject fixed values, making behavior reproducible without changing browser play.
