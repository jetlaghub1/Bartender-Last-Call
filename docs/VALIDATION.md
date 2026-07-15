# Validation report

Validation date: 2026-07-15

- JavaScript syntax: PASS (`data.js`, `rules.js`, `app.js`, and test file)
- Appeal calculation (Love +3, Like +2, specialty +1): PASS
- Winner and loser payout examples: PASS
- Multiple switch thresholds crossed at once: PASS
- 29-card deck rejection: PASS
- Four-copy deck rejection: PASS
- Browser asset references: PASS by repository inspection

The automated in-app browser could not open a local `file://` URL because of its security policy, so no claim of automated visual browser completion is made. The application deliberately has no external dependencies and is designed to launch by opening `index.html` directly.
