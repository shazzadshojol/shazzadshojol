# Portfolio artwork

The hero is preserved from the original profile design. `build_portfolio.mjs` does not read or rewrite the hero.

App icons and screenshots are original assets, embedded in code-native SVG layouts without retouching. GROC, KLOD and ReadLens artwork came from their official Apple App Store metadata; exact source URLs are recorded in `assets/sources.json`. DENSY uses its configured launcher icon and local release-preparation screenshots. Its launch status remains pending.

The showcase layouts use a four-second loop with gentle floating screenshots. Section titles have a traveling accent, the workflow highlights successive steps, and the contact panel has a breathing arrow. Text stays visible throughout. These are image animations compatible with GitHub README rendering, not JavaScript interactions.

Each app also has a full-resolution PNG preview. README alt text describes the artwork and normal links remain available below every card.

To rebuild: run `node tools/build_portfolio.mjs` with Sharp available, followed by `python3 tools/pack_motion.py` with Pillow installed. SVG frame renders use a temporary directory outside the repository. Source assets, layout SVGs, static PNGs, and final GIFs are committed so no external image service is needed at display time.
