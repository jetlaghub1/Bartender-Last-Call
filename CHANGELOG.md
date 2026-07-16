# Bartender: Last Call — Production Art Bible

Art Bible version: 1.0  
Project release: v0.6.1-prompt15  
Owner: JetLagHub  
Status: Approved direction for Prompt 16 asset production

## 1. North star: replayability first

The purpose of the art is to help make **Bartender: Last Call a fun, replayable strategy game**. Art is successful when it helps players recognize options quickly, understand why a choice matters, remember cards and characters, and stay excited to see the next customer or hand.

Every asset must pass these gameplay questions:

1. Can a returning player recognize it at card size without rereading the name?
2. Is its Spirit, personality, or role visually distinct from nearby options?
3. Does it preserve space for live rules, Appeal, traits, and price?
4. Does it make repeated matches feel varied without introducing visual confusion?
5. Does it reinforce the player's decision instead of competing with it?

If an illustration is beautiful but slows card comparison, hides information, or looks interchangeable with other content, it fails.

## 2. Core experience

The game takes place during the final, competitive hours of an elegant neighborhood cocktail bar. It should feel sophisticated, warm, energetic, slightly theatrical, and welcoming—not grimy, chaotic, or photorealistically corporate.

Approved visual phrase:

> Art-deco warmth meets a modern late-night strategy table.

Keywords: tactile, brass, midnight, burgundy, glass, velvet, focused, charismatic, readable, celebratory.  
Avoid: casino excess, generic fantasy tavern, nightclub neon overload, branded liquor advertising, photorealistic celebrity likenesses, childish drinking imagery.

## 3. Color system

### Interface foundation

| Token | Hex | Use |
|---|---:|---|
| Midnight | `#090E18` | Page and deepest shadow |
| Midnight Soft | `#101827` | Recessed panels |
| Bar Surface | `#151F30` | Primary panel surface |
| Raised Surface | `#1C293C` | Cards and elevated controls |
| Ivory Paper | `#FFF8E8` | Primary readable text |
| Muted Slate | `#AAB6C9` | Secondary text |
| Brass | `#E9B85A` | Brand, money, primary action, winner |
| Brass Light | `#FFD985` | Highlight and hover |
| Brass Dark | `#8D6327` | Dividers and restrained outline |
| Burgundy | `#613946` | Atmospheric fill |
| Player One | `#55D6A1` | Player 1 state only |
| Player Two | `#FF7D86` | Player 2 state only |
| Focus Blue | `#A5DCFF` | Keyboard focus and neutral attention |

Brass cannot become the default border for every object. It remains valuable by appearing on money, decisive actions, brand moments, and winners.

### Spirit accents

| Spirit | Hex | Visual materials |
|---|---:|---|
| Beer | `#D49A3A` | Amber, grain, foam, pub glass |
| Vodka | `#A9DDF5` | Ice, clear glass, chrome, precision |
| Whiskey | `#C8783E` | Copper, oak, smoke, cut crystal |
| Rum | `#E66C5C` | Cane, coral, tropical warmth, dark sugar |
| Gin | `#68C6A3` | Botanicals, herbs, juniper, garden green |
| Tequila | `#D7C64B` | Agave, desert gold, mineral texture |
| Wine | `#B75A79` | Berry, velvet, cellar wood, stained glass |

Spirit color is a secondary cue. The Spirit name and icon always remain visible so color is never the only identifier.

## 4. Typography

### Production families

- Display: **Cormorant Garamond**, weights 600 and 700, including italic.
- Interface: **Inter**, weights 500, 600, 700, 800, and 900.
- Fallbacks: Georgia for display; system UI sans-serif for interface.
- Numbers: Inter with tabular numerals for Appeal, prices, tips, progress, and counts.

Before commercial distribution, include the exact font license files with source assets and the shipped build. Do not rasterize normal UI copy into art.

### Hierarchy

- Game title: display 700 with italic “Last Call.”
- Screen title/customer name: display 700.
- Card name: display 700; never below 14px in final UI.
- Eyebrow/section label: interface 800, uppercase, 0.16–0.22em tracking.
- Body/rules: interface 500–600.
- Numeric value: interface 800–900 or display 700 when celebratory.

## 5. Logo system

### Primary wordmark

- Text: `Bartender: Last Call` with the colon retained.
- “Bartender:” uses upright display type; “Last Call” uses italic display type in brass.
- A thin art-deco rule may frame the wordmark, but it must not reduce legibility.
- Master: `2400×1200` transparent PNG plus editable SVG.
- Runtime preview: `1200×600` WebP.
- Minimum width: 160px digital.
- Clear space: at least half the height of the capital B on every side.

### Emblem

- A capital B inside a circular coaster/glass-rim motif.
- Master: `2048×2048` transparent PNG plus editable SVG.
- Runtime: `512×512` PNG.
- Minimum size: 32px digital.
- It must remain recognizable in one color.

Do not tilt, stretch, recolor individual letters, add unrelated cocktail clip art, or place the mark over a busy portrait.

## 6. Lighting and atmosphere

All character and drink art shares one lighting grammar:

- Warm 3200K key light from upper left, approximately 10 o'clock.
- Cool cyan-blue rim from camera right.
- Soft burgundy reflected fill from below or behind.
- Deep navy shadows retain detail; black should not swallow the silhouette.
- Backgrounds use restrained bar bokeh, shelving, glass, wood, velvet, and brass.
- One clear focal subject; secondary props support identity without crowding.
- No readable background labels, real alcohol brands, watermarks, or signatures.

The main bar background master is `2560×1440`; runtime export is `1920×1080` WebP at quality 82–88.

## 7. Drink illustrations

### Composition

- Master: `1536×1024` PNG, 3:2 landscape.
- Runtime: `768×512` WebP, quality 82–88.
- One finished drink as the dominant subject, generally three-quarter view.
- Glass rim, garnish, and core liquid silhouette stay inside the central 80% safe zone.
- Counter surface may be present; human hands are normally excluded.
- Use the Spirit accent in light, liquid, prop, or background—not as a flat full-frame wash.
- Each drink needs one memorable silhouette or prop tied to its name and traits.

### Trait storytelling

- Premium: cut crystal, refined garnish, restrained brass, immaculate presentation.
- Cheap: straightforward glassware, paper coaster, simple garnish; never dirty or insulting.
- Strong: dense color, low glass, confident shadow, heavy base.
- Sweet: rounded shapes, syrup sheen, dessert garnish.
- Bitter: angular botanical elements, dark peel, restrained palette.
- Fruity: distinct fresh fruit shapes, saturated but controlled accents.
- Fresh: condensation, herbs, bright surface highlights.
- Sour: citrus wedge/peel and sharp diagonal composition.
- Creamy: opaque texture, soft gradients, rounded glass shape.
- Clean: spare composition, clear glass, precise geometry.
- Savory: herbs, spice, smoke, or culinary garnish without resembling a meal.
- Spicy: pepper, warm ember accent, or energetic diagonal; never literal fire engulfing the glass.

No generated text, logos, prices, frame borders, or rules may appear in the illustration.

## 8. Bartender portraits

### Composition

- Master: `1536×2048` PNG, 3:4 portrait.
- Runtime: `768×1024` WebP.
- Waist-up or chest-up, three-quarter stance, eyes visible, confident working posture.
- Face and hands must remain inside the central 80% safe zone.
- Shared wardrobe family: midnight vest/jacket, ivory or dark shirt, small brass detail.
- Every bartender gets a unique silhouette, face shape, hairstyle, posture, and specialty prop.
- Cast must be varied in age, body type, skin tone, hair, and presentation while remaining visually cohesive.
- All portrayed people are fictional adults aged 21 or older.

### Specialty direction

| Bartender | Specialty | Signature cue |
|---|---|---|
| Ace | Beer | amber tap handle, rolled sleeves, sturdy silhouette |
| Mara | Vodka | ice-clear shaker, crisp geometry, cool rim light |
| Theo | Whiskey | copper jigger, oak/smoke cue, composed posture |
| June | Rum | cane/coral accent, energetic posture, warm reflected light |
| Nico | Gin | botanical garnish, green pocket detail, precise hands |
| Sol | Tequila | agave geometry, desert-gold accent, bold stance |
| Rae | Wine | tasting glass, burgundy velvet cue, attentive posture |

Do not make bartenders look intoxicated, unsafe, sloppy, or modeled on celebrities.

## 9. Customer portraits

- Master: `1536×1536` PNG, square.
- Runtime: `768×768` WebP.
- Bust or seated waist-up composition facing slightly toward the bartender.
- Use gesture, wardrobe, and one or two props to communicate the customer identity instantly.
- Keep the face and identifying prop inside the central 80% safe zone.
- Background is a simplified portion of the same bar, with different seating zones and color accents for variety.
- Create varied ages, appearances, styles, moods, and social energy without stereotyping or mocking occupations.
- Expressions should suggest preference and personality, not announce the scoring answer.

The 28 portraits must remain distinguishable when shown as 72px circular thumbnails.

## 10. Card frames

### Source and runtime

- Master frame: `1800×2520` transparent PNG, 5:7 ratio.
- Runtime frame: `900×1260` transparent PNG.
- Frame contains ornament, art-window mask, dividers, and material texture only.
- Names, rules, Appeal, traits, prices, selection marks, and winner states remain live UI.
- Art window safe zone: 10% inset on every side.
- Minimum inner contrast behind text: WCAG AA for normal text when composited.

Create separate Core frames for drink, bartender, and customer layouts. Selection, disabled, Player 1, Player 2, and winner treatments remain CSS layers so the same asset works in every state.

## 11. Icon language

- Master: `256×256` editable SVG plus transparent PNG.
- Runtime: `64×64` PNG.
- Two-weight geometric line style with rounded internal corners and one strong silhouette.
- Must remain identifiable at 16px and in one color.
- No letters inside trait icons.

| Meaning | Shape direction |
|---|---|
| Premium | cut gem |
| Cheap | clipped ticket |
| Strong | rising flame/triangle |
| Sweet | syrup drop |
| Bitter | split leaf |
| Fruity | citrus wheel |
| Fresh | herb sprig |
| Sour | citrus wedge |
| Creamy | soft swirl |
| Clean | four-point sparkle |
| Savory | cloche arc |
| Spicy | pepper spark |
| Switch token | circular arrows around bartender star |
| Appeal | three-ray star inside a glass rim |

Love, Like, and Dislike keep heart, dot, and downward triangle silhouettes respectively, paired with their written labels and numeric values.

## 12. Rarity treatment

Rarity is cosmetic only. Current v1 content has no rarity assignments, so every card ships with **Core** treatment until explicit metadata is approved.

Future treatments:

- `● Core`: smoked-steel line.
- `◆ Select`: botanical-teal line.
- `✦ Reserve`: brass line.
- `★ Signature`: burgundy-rose line with restrained foil glint.

Every rarity uses a written label and shape. Never communicate rarity by color alone, never hide rules behind foil, and never imply that rarity equals competitive strength.

## 13. Naming and directory standard

Runtime root: `assets/art/`

```text
assets/art/
  brand/
  backgrounds/
  frames/
  icons/
  bartenders/
  customers/
  drinks/
```

Rules:

- Lowercase ASCII only.
- Words separated by hyphens; type and stable ID separated by underscores.
- No spaces, parentheses, version words, or artist initials in runtime filenames.
- Preserve stable drink IDs (`d01`–`d42`) even if display names change.
- Customer IDs are stable art IDs (`c01`–`c28`) based on current data order.
- Source masters add `_master` before the extension and live outside the runtime build.

Examples:

```text
drinks/drink_d01_golden-lager.webp
bartenders/bartender_ace_beer.webp
customers/customer_c01_college-regular.webp
icons/icon_switch-token.png
```

The exact approved list is `art/asset-manifest.json`.

## 14. Export and production record

For every generated asset retain:

- Approved prompt and negative constraints.
- Generation date and tool/model identifier.
- Source/master file.
- Runtime export.
- Crop notes and revision number.
- Human review status.

Runtime WebP uses quality 82–88, sRGB, metadata stripped, and no upscaling beyond the master. Transparent line assets use optimized PNG or SVG. Avoid JPEG for transparent assets.

## 15. Prompt 16 generation template

Generate at most eight related assets per batch. A production prompt must include:

1. The asset IDs and exact filenames from the manifest.
2. The approved visual phrase and shared lighting recipe.
3. The composition and safe-zone rules for that asset type.
4. The Spirit/personality-specific direction for each asset.
5. “No text, logos, watermarks, signatures, or UI.”
6. “Fictional adult characters only; no celebrity likeness.” for character batches.
7. Exact master dimensions and separate-file requirement.

Do not generate multiple final assets as a single collage. Each target must be delivered and reviewed separately.

## 16. Review gate

An asset passes only when all applicable items are true:

- Recognizable at intended runtime size and at small thumbnail size.
- Distinct from every previously approved asset of its type.
- Correct safe zone, aspect ratio, lighting direction, and Spirit palette.
- No malformed face, hands, glassware, garnish, duplicate object, or broken perspective.
- No text, real logo, watermark, signature, or protected brand.
- No baked-in UI, border, price, Appeal, trait label, or rarity assignment.
- Sufficient dark/light separation for the live interface overlay.
- Supports fast game decisions and repeated-play recognition.
- Filename, format, and dimensions exactly match the manifest.

Rejected assets are revised within their original batch before the next batch begins.

## 17. Approval

This art bible freezes the production direction for Prompt 16. Changes require a documented art-bible revision; individual batches must not silently change style, lighting, framing, or typography.

