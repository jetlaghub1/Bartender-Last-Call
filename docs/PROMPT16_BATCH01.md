# Prompt 16 — Production Art Batch 01

Version 0.7.0 establishes the first eight production assets from the approved art manifest. This is a visual-only release: scoring, decks, AI, PvP, tutorial behavior, switch-token rules, and balance values are unchanged.

## Approved assets

1. Primary `Bartender: Last Call` wordmark
2. Circular `B` coaster mark
3. Main bar atmosphere background
4. Match-table atmosphere background
5. Core drink-card frame
6. Core bartender-card frame
7. Core customer-card frame
8. Switch-token icon

Every asset is delivered separately under `assets/art/` with the exact filename recorded in `art/asset-manifest.json`. Working background sources and reproducible frame/icon build tools remain in `art/` for the GitHub source archive.

## Review result

- The two environments share the approved midnight, brass, burgundy, and cyan palette while serving different jobs.
- Both backgrounds leave calm negative space for game information and contain no readable labels, real brands, watermarks, cards, or baked UI.
- The frame interiors remain transparent, keeping names, Appeal, traits, and prices as live accessible HTML.
- The three frame silhouettes are deliberately different so future drink, bartender, and customer art stays recognizable at a glance.
- The switch token is recognizable at 64 px and retains its arrows-and-star silhouette at 16 px.
- No asset adds animation or novelty that would slow down repeated decisions.

The generated backgrounds are stored at 1672×941 and cropped down—not enlarged—to 1664×936 WebP runtime files. This protects source quality while preserving a clean 16:9 display ratio.

## Integration

- The main menu uses the main bar and approved wordmark.
- Match screens switch to the tactical table background.
- Drink and bartender cards use their Core frame overlays.
- The bartender-switch prompt uses the new switch-token icon with a separate live count badge.
- The customer frame is approved and staged for customer portrait integration in a later production batch.

Prompt 16 is repeatable. Batch 01 is complete; the next execution begins at manifest order 9 and must contain no more than eight additional assets.
