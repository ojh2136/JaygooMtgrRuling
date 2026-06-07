# Stackwise

Stackwise is a first prototype for learning Magic: The Gathering rules through card interactions.

Open `index.html` directly in a browser, or serve this folder locally. The app includes:

- A card interaction lab with preset rules scenarios.
- Live card lookup and autocomplete suggestions through Scryfall's public API.
- Card-name autocomplete inside board-state questions.
- An Oracle-text interaction engine that classifies selected cards and builds a likely resolution path.
- A rules map for core Comprehensive Rules topics.
- A live-board builder with separate player boards and a cast slot that explains how the cast card interacts with current permanents.
- An opponent response slot for stack interactions such as counterspells cast after a spell and its cast triggers.
- Judge-context controls for casting player, whether mana was spent, and timing.
- Confidence labels and missing-info prompts for ambiguous live rulings.
- Static board-state explanations for continuous effects such as Blood Moon affecting nonbasic lands.

The built-in rule summaries are educational references, not tournament authority. For official calls, verify against the current Wizards of the Coast Comprehensive Rules, Magic Tournament Rules, Infraction Procedure Guide, and Oracle card text.
