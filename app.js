# Validation report

Validation date: 2026-07-15

- JavaScript syntax: PASS (`data.js`, `rules.js`, `app.js`, and test file)
- Appeal calculation (Love +3, Like +2, specialty +1): PASS
- Winner and loser payout examples: PASS
- Multiple switch thresholds crossed at once: PASS
- 29-card deck rejection: PASS
- Four-copy deck rejection: PASS
- Browser asset references: PASS by repository inspection
- Prompt 4.1 UI contract checks: PASS (distinct player colors, focus visibility, reduced motion, touch-target sizing, Lock In guidance, and winner highlighting)
- Prompt 5 syntax checks: PASS (`ai.js`, updated `app.js`, and AI tests)
- Difficulty availability: PASS (Easy, Normal, and Hard)
- Normal and Hard customer-aware drink choice: PASS
- Bartender switch legality and zero-token handling: PASS
- Hard future-token conservation behavior: PASS
- Hidden-player-state isolation contract: PASS
- Prompt 6 Player 1 setup handoff: PASS
- Prompt 6 Player 1-to-Player 2 private drink handoff: PASS
- Prompt 6 bartender phase does not repeat after drink lock: PASS
- Prompt 6 both-locked confirmation and explicit reveal: PASS
- Prompt 6 confirmation exposes no hand or selected drink: PASS
- Prompt 7 eight-lesson curriculum: PASS
- Prompt 7 Appeal and payout examples match shared rules: PASS
- Prompt 7 exactly-three and 30-card gates: PASS
- Prompt 7 first-visit, skip, completion, replay, and Easy practice contracts: PASS
- Prompt 7 deck lesson selectable-card interaction: PASS
- Prompt 7 live copy counts, three-copy blocking, full-deck blocking, and reset controls: PASS
- Prompt 7 customer and bartender context on selection/service lessons: PASS
- Prompt 7 service lesson uses the player's actual selected cards: PASS
- Prompt 7 displayed practice Appeal values come from shared rules and are uniquely ranked: PASS
- Prompt 7 switch lesson exposes three replacement bartenders with unique specialties: PASS
- Prompt 7 switch lesson requires save or replacement selection before continuing: PASS
- Prompt 7 token cost, new specialty, and cancel-to-save behavior: PASS
- Prompt 8 complete content schema audit: PASS (0 errors)
- Prompt 8 drink ID/name/mechanical-profile uniqueness: PASS
- Prompt 8 drink Spirit/Style/price/contradiction rules: PASS
- Prompt 8 customer Love/Like/Dislike uniqueness: PASS
- Prompt 8 bartender specialty and standardized +1 passive: PASS
- Prompt 8 invalid-fixture rejection tests: PASS
- Prompt 9 numbered drink/customer variants removed: PASS
- Prompt 9 42 unique profiles and stable `d1`–`d42` IDs: PASS
- Prompt 9 six drinks and one focused card per Spirit: PASS
- Prompt 9 Style distribution range 4–8: PASS
- Prompt 9 unique customer preference profiles: PASS
- Prompt 9 curated starter deck legality and all-Spirit coverage: PASS

The automated in-app browser could not open a local `file://` URL because of its security policy, so no claim of automated visual browser completion is made. The application deliberately has no external dependencies and is designed to launch by opening `index.html` directly.
