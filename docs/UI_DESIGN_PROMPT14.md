# Prompt 14 Interface Design

Version: v0.6.0  
Scope: presentation and usability only

## Visual direction

Bartender: Last Call now uses a late-night cocktail-bar identity: midnight blue surfaces, burgundy atmosphere, warm brass highlights, ivory typography, and restrained neon player accents. Serif display type supplies character while the system sans-serif keeps rules and values readable.

All temporary character and drink motifs are built from text and CSS. No single promotional collage or shared bitmap is repeated across cards. Prompt 15 now defines the approved production-art specification; Prompt 16 creates and reviews the final assets in batches of no more than eight.

## Information hierarchy

1. The match HUD keeps tips, progress to $50, bartender, switch tokens, and round number visible.
2. The customer dossier states Love +3, Like +2, and Dislike −2 before any card decision.
3. Each drink card shows its identity, traits, exact Appeal total, contributing modifiers, and price in separate regions.
4. The decision bar reports the exact selected count and explains the Lock In state.
5. Results compare both served drinks and emphasize the winner and both payouts.

## Responsive behavior

- Seven columns on wide desktop, four below 1050px, three below 780px, two below 560px, and one below 370px.
- The score HUD condenses into a round strip plus two compact player panels on phones.
- Customer preferences stack into full-width rows on phones.
- Deck controls remain at least 44×44px and the action area remains sticky.
- Layouts were checked at 1280×720 and 390×844 with no horizontal overflow.

## Accessibility

- Near-white primary text and muted blue-gray secondary text on dark surfaces.
- Visible keyboard focus outlines and clear enabled, disabled, selected, and winner states.
- Semantic buttons, progress bars, ARIA labels for card summaries, and live selected-card/deck counts.
- Reduced-motion preferences disable non-essential transitions and animation.

## Gameplay preservation

Prompt 14 does not change rules, prices, content, AI decisions, payout formulas, deck legality, switch-token thresholds, or the $50 victory target. It presents the converged v0.5.12 system more clearly.
