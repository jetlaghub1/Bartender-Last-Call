# Content data changelog — v0.5.7

- Converted `data.js` into a browser/Node-compatible source module.
- Added schema version `0.5.7`.
- Added automatic validation during data loading; invalid content now stops the build instead of silently entering gameplay.
- Added validation for allowed vocabularies, trait counts, contradictory traits, prices, duplicate IDs/names/profiles, customer preference uniqueness, bartender specialties, and standardized passives.
- Confirmed that the existing 42 drinks, 28 customers, and 7 bartenders required no record-level corrections.
- Recorded four non-blocking variety warnings for Prompt 9 rather than disguising generated variants as finished unique content.
