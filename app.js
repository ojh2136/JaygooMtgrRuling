const rules = [
  {
    id: "priority",
    title: "Priority and the Stack",
    refs: "CR 117, CR 405, CR 608",
    summary: "Players need priority to cast most spells or activate abilities. Objects on the stack resolve one at a time after all players pass.",
    details:
      "After a spell or ability is put on the stack, players get chances to respond. The top object resolves first. When it resolves, you follow its instructions as much as possible, then players get priority again.",
    tags: ["stack", "instant", "respond", "resolution"],
    example: "If Lightning Bolt is on the stack, a player can cast Counterspell before Bolt resolves. If everyone passes, Counterspell resolves first."
  },
  {
    id: "targets",
    title: "Targets",
    refs: "CR 115, CR 608.2b",
    summary: "Targets are chosen as a spell or ability is put on the stack. A spell checks target legality again as it resolves.",
    details:
      "If every target of a spell or ability is illegal when it tries to resolve, it does not resolve and none of its effects happen. If at least one target is still legal, it resolves and affects the legal targets it can.",
    tags: ["target", "hexproof", "ward", "protection"],
    example: "If the only target of Murder gains hexproof before Murder resolves, Murder does not resolve."
  },
  {
    id: "triggered",
    title: "Triggered Abilities",
    refs: "CR 603",
    summary: "Triggered abilities begin with when, whenever, or at. They trigger automatically and are put on the stack the next time a player would receive priority.",
    details:
      "Triggered abilities are not cast. Once triggered, removing the source usually does not remove the ability from the stack unless the ability needs information it no longer has.",
    tags: ["when", "whenever", "at", "ETB", "dies"],
    example: "A creature with 'When this enters, draw a card' still gives the draw trigger even if the creature is destroyed in response."
  },
  {
    id: "replacement",
    title: "Replacement Effects",
    refs: "CR 614, CR 616",
    summary: "Replacement effects use words like instead, with, as, skip, or enters tapped. They modify events before those events happen.",
    details:
      "Replacement effects do not use the stack. If multiple replacement effects try to change the same event, the affected player or controller of the affected object often chooses the order to apply them.",
    tags: ["instead", "as", "enters", "skip", "replacement"],
    example: "Rest in Peace changes a card going to a graveyard into exile. No one can respond after the card has 'started' going to the graveyard."
  },
  {
    id: "sba",
    title: "State-Based Actions",
    refs: "CR 704",
    summary: "The game constantly cleans up impossible or losing states before players get priority.",
    details:
      "State-based actions destroy creatures with lethal damage, put creatures with 0 or less toughness into graveyards, make players lose for 0 or less life, clean up duplicate legendary permanents, and more.",
    tags: ["lethal", "legend", "0 toughness", "poison"],
    example: "A 2/2 creature with 2 damage marked is destroyed before any player can cast another spell."
  },
  {
    id: "combat",
    title: "Combat Damage",
    refs: "CR 506-510, CR 702",
    summary: "Combat follows ordered steps. First strike and double strike create an extra combat damage step.",
    details:
      "Attacks are declared, then blocks are declared, then damage is assigned and dealt. Trample, deathtouch, first strike, and protection can change what legal or useful damage assignment looks like.",
    tags: ["attack", "block", "trample", "deathtouch", "first strike"],
    example: "With deathtouch and trample, assigning 1 damage to each blocking creature can be lethal, letting the rest trample over."
  },
  {
    id: "layers",
    title: "Continuous Effects and Layers",
    refs: "CR 613",
    summary: "Continuous effects are applied in a structured layer system, then by dependency and timestamp when needed.",
    details:
      "Layer questions usually matter when effects change text, types, colors, abilities, power, or toughness. Type-changing effects like Blood Moon are evaluated before ability-adding or removing effects in later layers.",
    tags: ["layers", "timestamp", "dependency", "Blood Moon"],
    example: "Blood Moon makes nonbasic lands Mountains in layer 4. Effects that depend on land types may change after that effect applies."
  },
  {
    id: "copy",
    title: "Copy Effects",
    refs: "CR 707",
    summary: "A copy uses the copiable values of the object, usually what is printed plus other copy effects.",
    details:
      "Counters, Auras, Equipment, most continuous buffs, and damage are not copied. Copy effects can copy choices stated by the copying effect, depending on the wording.",
    tags: ["copy", "clone", "token"],
    example: "Clone copying a 2/2 creature with a +1/+1 counter enters as the printed creature, not with the counter."
  }
];

const scenarios = [
  {
    id: "ward",
    title: "Targeting Ward",
    short: "Lightning Bolt targets a creature with ward 2.",
    cards: ["Lightning Bolt", "Coppercoat Vanguard"],
    ruleIds: ["priority", "targets", "triggered"],
    steps: [
      "You cast Lightning Bolt and choose the ward creature as the target.",
      "Ward sees that the permanent became the target of a spell an opponent controls, so ward triggers.",
      "The ward trigger goes on the stack above Lightning Bolt.",
      "When the ward trigger resolves, the Bolt's controller must pay the ward cost. If they do not, Lightning Bolt is countered.",
      "If the cost is paid, Lightning Bolt stays on the stack. Players may respond again before it resolves."
    ]
  },
  {
    id: "hexproof",
    title: "Target Becomes Illegal",
    short: "A targeted creature gains hexproof before the spell resolves.",
    cards: ["Murder", "Snakeskin Veil"],
    ruleIds: ["priority", "targets"],
    steps: [
      "A spell with a target is cast and placed on the stack.",
      "Before it resolves, the target gains hexproof from the spell's controller.",
      "As the spell tries to resolve, the game checks whether its targets are still legal.",
      "If its only target is now illegal, the spell does not resolve and none of its instructions happen.",
      "If the spell has multiple targets and at least one is still legal, it resolves for the legal targets."
    ]
  },
  {
    id: "torpor",
    title: "Enter-the-Battlefield Lockout",
    short: "Torpor Orb changes whether ETB abilities trigger.",
    cards: ["Torpor Orb", "Mulldrifter"],
    ruleIds: ["triggered", "replacement"],
    steps: [
      "A creature enters the battlefield while Torpor Orb is already on the battlefield.",
      "The game checks whether any triggered abilities should trigger from that event.",
      "Torpor Orb says creatures entering do not cause abilities to trigger.",
      "The ETB ability never triggers, so it is never put on the stack.",
      "Removing Torpor Orb afterward does not recreate a trigger that was stopped."
    ]
  },
  {
    id: "bloodmoon",
    title: "Blood Moon and Land Types",
    short: "Type-changing effects can erase land abilities.",
    cards: ["Blood Moon", "Urborg, Tomb of Yawgmoth"],
    ruleIds: ["layers"],
    steps: [
      "Continuous effects are applied using the layer system.",
      "Blood Moon's type-changing effect applies to nonbasic lands in layer 4.",
      "A nonbasic land that becomes a Mountain has the Mountain subtype and the intrinsic mana ability for Mountains.",
      "Changing a land to a basic land type removes its old rules text unless another effect says otherwise.",
      "Layer dependency can matter when another land effect changes what Blood Moon applies to."
    ]
  },
  {
    id: "trample",
    title: "Deathtouch Plus Trample",
    short: "A trampler with deathtouch is blocked.",
    cards: ["Questing Beast", "Typhoid Rats"],
    ruleIds: ["combat", "sba"],
    steps: [
      "During combat damage assignment, the attacking creature must assign lethal damage to each blocker before assigning excess to the defending player.",
      "Deathtouch makes any nonzero amount of damage from that source lethal for assignment purposes.",
      "The attacker can assign 1 damage to a blocker, then assign the remaining damage to the defending player or planeswalker being attacked.",
      "Damage is dealt at the same time in that combat damage step.",
      "State-based actions then destroy creatures that have lethal damage."
    ]
  },
  {
    id: "copycounter",
    title: "Copying a Modified Creature",
    short: "A Clone copies a creature with counters and Auras.",
    cards: ["Clone", "Grizzly Bears"],
    ruleIds: ["copy", "layers"],
    steps: [
      "A copy effect looks at the copied object's copiable values.",
      "Copiable values include the printed characteristics plus other copy effects that changed them.",
      "Counters, damage, Auras, Equipment, and most temporary buffs are not copied.",
      "The copying object enters as the copied card's base characteristics.",
      "After it exists, other continuous effects can apply to the copy normally."
    ]
  }
];

let selectedCards = [];
let activeRuleId = "priority";
let cardSuggestionNames = [];
let activeSuggestionIndex = -1;
let suggestionRequestId = 0;
let suggestionTimer;
let boardSuggestionNames = [];
let activeBoardSuggestionIndex = -1;
let boardSuggestionRequestId = 0;
let boardSuggestionTimer;
let boardSuggestionRange = null;
let liveBoard = {
  mine: [],
  opponent: [],
  cast: null,
  response: null,
  castController: "mine",
  manaMode: "paid",
  turnPhase: "main"
};
let liveAutocomplete = {
  inputId: "",
  suggestionsId: "",
  names: [],
  activeIndex: -1,
  requestId: 0,
  timer: null
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setStatus(text) {
  $("#statusPill").textContent = text;
}

function matchingRules(text) {
  const value = text.toLowerCase();
  return rules.filter((rule) => {
    const haystack = [rule.title, rule.summary, rule.details, rule.refs, ...rule.tags].join(" ").toLowerCase();
    return haystack.includes(value);
  });
}

function renderFocus(ruleIds = ["priority", "targets", "triggered"]) {
  $("#focusChips").innerHTML = ruleIds
    .map((id) => rules.find((rule) => rule.id === id))
    .filter(Boolean)
    .map((rule) => `<span class="chip">${rule.title}</span>`)
    .join("");
}

function renderSelectedCards() {
  const container = $("#selectedCards");
  if (!selectedCards.length) {
    container.innerHTML = `<div class="empty-state">Search for cards or choose a scenario to see Oracle text, likely rules, and a resolution path.</div>`;
    return;
  }

  container.innerHTML = selectedCards
    .map((card) => {
      const img = card.image || "";
      return `
        <article class="card-row">
          ${img ? `<img src="${img}" alt="${card.name} card image" />` : `<div class="brand-mark" aria-hidden="true">${card.name.slice(0, 1)}</div>`}
          <div>
            <h3>${card.name}</h3>
            <p>${card.text || "No Oracle text available."}</p>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderScenarios() {
  $("#scenarioStrip").innerHTML = scenarios
    .map(
      (scenario) => `
        <button class="scenario-button" data-scenario="${scenario.id}">
          <strong>${scenario.title}</strong>
          <span>${scenario.short}</span>
        </button>
      `
    )
    .join("");
}

function renderAnswer(title, steps, ruleIds, engine = null) {
  $("#answerTitle").textContent = title;
  $("#answerSteps").innerHTML = steps.map((step) => `<li>${step}</li>`).join("");
  if (engine) {
    $("#engineSummary").classList.add("active");
    $("#engineSummary").innerHTML = `
      <h3>${escapeHtml(engine.title)}</h3>
      <p>${escapeHtml(engine.summary)}</p>
      <div class="engine-facts">
        ${engine.facts.map((fact) => `<span class="engine-fact">${escapeHtml(fact)}</span>`).join("")}
      </div>
    `;
  } else {
    $("#engineSummary").classList.remove("active");
    $("#engineSummary").innerHTML = "";
  }
  $("#relatedRules").innerHTML = ruleIds
    .map((id) => rules.find((rule) => rule.id === id))
    .filter(Boolean)
    .map(
      (rule) => `
        <button class="mini-rule" data-open-rule="${rule.id}">
          <strong>${rule.refs}</strong>
          <p>${rule.summary}</p>
        </button>
      `
    )
    .join("");
  renderFocus(ruleIds);
}

function renderRulesList(filter = "") {
  const visibleRules = filter ? matchingRules(filter) : rules;
  $("#ruleList").innerHTML = visibleRules
    .map(
      (rule) => `
        <button class="rule-card ${rule.id === activeRuleId ? "active" : ""}" data-rule="${rule.id}">
          <h3>${rule.title}</h3>
          <p>${rule.summary}</p>
        </button>
      `
    )
    .join("");
  if (!visibleRules.find((rule) => rule.id === activeRuleId) && visibleRules[0]) {
    activeRuleId = visibleRules[0].id;
  }
  renderRuleDetail(activeRuleId);
}

function renderRuleDetail(ruleId) {
  const rule = rules.find((item) => item.id === ruleId) || rules[0];
  activeRuleId = rule.id;
  $$(".rule-card").forEach((button) => button.classList.toggle("active", button.dataset.rule === rule.id));
  $("#ruleDetail").innerHTML = `
    <p class="eyebrow">${rule.refs}</p>
    <h2>${rule.title}</h2>
    <div class="tag-row">${rule.tags.map((tag) => `<span class="chip">${tag}</span>`).join("")}</div>
    <p>${rule.details}</p>
    <div class="example-box">
      <h3>Table Example</h3>
      <p>${rule.example}</p>
    </div>
  `;
  renderFocus([rule.id]);
}

function switchView(viewId) {
  $$(".view").forEach((view) => view.classList.toggle("active", view.id === viewId));
  $$(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.view === viewId));
}

async function fetchCard(name) {
  setStatus("Searching cards");
  const response = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(name)}`);
  if (!response.ok) throw new Error("Card not found");
  const card = await response.json();
  const image = card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.normal || "";
  const text = card.oracle_text || card.card_faces?.map((face) => `${face.name}: ${face.oracle_text || ""}`).join(" // ");
  return {
    name: card.name,
    text,
    image,
    typeLine: card.type_line || card.card_faces?.map((face) => face.type_line).filter(Boolean).join(" // ") || "",
    keywords: card.keywords || []
  };
}

async function fetchCardSuggestions(query) {
  const response = await fetch(`https://api.scryfall.com/cards/autocomplete?q=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error("Suggestions unavailable");
  const payload = await response.json();
  return (payload.data || []).slice(0, 10);
}

function setSuggestionsExpanded(isExpanded) {
  $("#cardSearch").setAttribute("aria-expanded", String(isExpanded));
  $("#cardSuggestions").classList.toggle("open", isExpanded);
}

function renderCardSuggestions(names, stateText = "") {
  const container = $("#cardSuggestions");
  cardSuggestionNames = names;
  activeSuggestionIndex = names.length ? 0 : -1;

  if (stateText) {
    container.innerHTML = `<div class="suggestion-state">${escapeHtml(stateText)}</div>`;
    setSuggestionsExpanded(true);
    return;
  }

  if (!names.length) {
    container.innerHTML = "";
    setSuggestionsExpanded(false);
    return;
  }

  container.innerHTML = names
    .map(
      (name, index) => `
        <button
          class="suggestion-item ${index === activeSuggestionIndex ? "active" : ""}"
          type="button"
          role="option"
          aria-selected="${index === activeSuggestionIndex}"
          data-card-suggestion="${escapeHtml(name)}"
        >
          <span>${escapeHtml(name)}</span>
          <span class="suggestion-type">Card</span>
        </button>
      `
    )
    .join("");
  setSuggestionsExpanded(true);
}

function highlightSuggestion(index) {
  if (!cardSuggestionNames.length) return;
  activeSuggestionIndex = (index + cardSuggestionNames.length) % cardSuggestionNames.length;
  $$(".suggestion-item").forEach((item, itemIndex) => {
    const isActive = itemIndex === activeSuggestionIndex;
    item.classList.toggle("active", isActive);
    item.setAttribute("aria-selected", String(isActive));
    if (isActive) item.scrollIntoView({ block: "nearest" });
  });
}

function hideCardSuggestions() {
  cardSuggestionNames = [];
  activeSuggestionIndex = -1;
  $("#cardSuggestions").innerHTML = "";
  setSuggestionsExpanded(false);
}

async function updateCardSuggestions(query) {
  const value = query.trim();
  clearTimeout(suggestionTimer);

  if (value.length < 2) {
    hideCardSuggestions();
    return;
  }

  const requestId = ++suggestionRequestId;
  renderCardSuggestions([], "Looking for cards...");

  try {
    const names = await fetchCardSuggestions(value);
    if (requestId !== suggestionRequestId) return;
    renderCardSuggestions(names, names.length ? "" : "No matching cards found.");
  } catch {
    if (requestId !== suggestionRequestId) return;
    renderCardSuggestions([], "Suggestions are unavailable.");
  }
}

function setBoardSuggestionsExpanded(isExpanded) {
  $("#boardQuestion").setAttribute("aria-expanded", String(isExpanded));
  $("#boardSuggestions").classList.toggle("open", isExpanded);
}

function getBoardSuggestionQuery() {
  const input = $("#boardQuestion");
  const cursor = input.selectionStart || 0;
  const beforeCursor = input.value.slice(0, cursor);
  const match = beforeCursor.match(/[A-Za-z0-9,' -]{2,}$/);
  if (!match) return null;

  const fragment = match[0];
  const words = fragment.trim().split(/\s+/).filter(Boolean);
  const stopWords = new Set(["i", "cast", "casts", "target", "targeting", "with", "and", "my", "their", "a", "an", "the", "on", "to", "using", "activate", "activated", "then"]);
  while (words.length > 1 && stopWords.has(words[0].toLowerCase())) {
    words.shift();
  }

  const queryWords = words.slice(-3);
  const query = queryWords.join(" ").trim();
  if (query.length < 2) return null;

  const queryOffset = fragment.lastIndexOf(query);
  return {
    query,
    start: cursor - fragment.length + queryOffset,
    end: cursor
  };
}

function renderBoardSuggestions(names, stateText = "") {
  const container = $("#boardSuggestions");
  boardSuggestionNames = names;
  activeBoardSuggestionIndex = names.length ? 0 : -1;

  if (stateText) {
    container.innerHTML = `<div class="suggestion-state">${escapeHtml(stateText)}</div>`;
    setBoardSuggestionsExpanded(true);
    return;
  }

  if (!names.length) {
    container.innerHTML = "";
    setBoardSuggestionsExpanded(false);
    return;
  }

  container.innerHTML = names
    .map(
      (name, index) => `
        <button
          class="suggestion-item ${index === activeBoardSuggestionIndex ? "active" : ""}"
          type="button"
          role="option"
          aria-selected="${index === activeBoardSuggestionIndex}"
          data-board-suggestion="${escapeHtml(name)}"
        >
          <span>${escapeHtml(name)}</span>
          <span class="suggestion-type">Insert</span>
        </button>
      `
    )
    .join("");
  setBoardSuggestionsExpanded(true);
}

function highlightBoardSuggestion(index) {
  if (!boardSuggestionNames.length) return;
  activeBoardSuggestionIndex = (index + boardSuggestionNames.length) % boardSuggestionNames.length;
  $$("#boardSuggestions .suggestion-item").forEach((item, itemIndex) => {
    const isActive = itemIndex === activeBoardSuggestionIndex;
    item.classList.toggle("active", isActive);
    item.setAttribute("aria-selected", String(isActive));
    if (isActive) item.scrollIntoView({ block: "nearest" });
  });
}

function hideBoardSuggestions() {
  boardSuggestionNames = [];
  activeBoardSuggestionIndex = -1;
  boardSuggestionRange = null;
  $("#boardSuggestions").innerHTML = "";
  setBoardSuggestionsExpanded(false);
}

async function updateBoardSuggestions() {
  const match = getBoardSuggestionQuery();
  clearTimeout(boardSuggestionTimer);

  if (!match) {
    hideBoardSuggestions();
    return;
  }

  boardSuggestionRange = match;
  const requestId = ++boardSuggestionRequestId;
  renderBoardSuggestions([], "Looking for cards...");

  try {
    const names = await fetchCardSuggestions(match.query);
    if (requestId !== boardSuggestionRequestId) return;
    renderBoardSuggestions(names, names.length ? "" : "No matching cards found.");
  } catch {
    if (requestId !== boardSuggestionRequestId) return;
    renderBoardSuggestions([], "Suggestions are unavailable.");
  }
}

function insertBoardSuggestion(name) {
  const input = $("#boardQuestion");
  const range = boardSuggestionRange || getBoardSuggestionQuery();
  if (!range) return;

  const before = input.value.slice(0, range.start);
  const after = input.value.slice(range.end);
  const needsTrailingSpace = after.length === 0 || !/^\s|[.,!?;:)]/.test(after);
  const inserted = `${name}${needsTrailingSpace ? " " : ""}`;
  input.value = `${before}${inserted}${after}`;
  const cursor = before.length + inserted.length;
  input.focus();
  input.setSelectionRange(cursor, cursor);
  hideBoardSuggestions();
}

function liveZoneLabel(zone) {
  if (zone === "mine") return "My Board";
  if (zone === "opponent") return "Opponent Board";
  if (zone === "response") return "Opponent Response";
  return "Cast";
}

function liveZoneInputId(zone) {
  return zone === "mine" ? "myBoardSearch" : zone === "opponent" ? "opponentBoardSearch" : zone === "response" ? "responseSearch" : "castSearch";
}

function liveZoneSuggestionsId(zone) {
  return zone === "mine" ? "myBoardSuggestions" : zone === "opponent" ? "opponentBoardSuggestions" : zone === "response" ? "responseSuggestions" : "castSuggestions";
}

function cardBrief(card) {
  return card.typeLine || card.text || "Card loaded";
}

function renderLiveZone(zone) {
  const targetId = zone === "mine" ? "myBoardCards" : zone === "opponent" ? "opponentBoardCards" : zone === "response" ? "responseCardSlot" : "castCardSlot";
  const cards = zone === "cast" || zone === "response" ? (liveBoard[zone] ? [liveBoard[zone]] : []) : liveBoard[zone];
  const container = $(`#${targetId}`);
  if (!container) return;

  if (!cards.length) {
    container.innerHTML = `<div class="empty-state">${zone === "cast" ? "No spell selected." : zone === "response" ? "No response selected." : "No permanents added."}</div>`;
    return;
  }

  container.innerHTML = cards
    .map(
      (card, index) => `
        <article class="live-card-pill">
          <div>
            <strong>${escapeHtml(card.name)}</strong>
            <span>${escapeHtml(cardBrief(card))}</span>
          </div>
          <button class="remove-card" data-remove-zone="${zone}" data-remove-index="${index}" aria-label="Remove ${escapeHtml(card.name)}">X</button>
        </article>
      `
    )
    .join("");
}

function renderLiveBoard() {
  renderLiveZone("mine");
  renderLiveZone("opponent");
  renderLiveZone("cast");
  renderLiveZone("response");
}

function hideLiveSuggestions() {
  if (liveAutocomplete.suggestionsId) {
    const list = $(`#${liveAutocomplete.suggestionsId}`);
    if (list) {
      list.innerHTML = "";
      list.classList.remove("open");
    }
  }
  if (liveAutocomplete.inputId) {
    const input = $(`#${liveAutocomplete.inputId}`);
    if (input) input.setAttribute("aria-expanded", "false");
  }
  liveAutocomplete.names = [];
  liveAutocomplete.activeIndex = -1;
}

function renderLiveSuggestions(inputId, suggestionsId, names, stateText = "") {
  const input = $(`#${inputId}`);
  const list = $(`#${suggestionsId}`);
  if (!input || !list) return;

  liveAutocomplete.inputId = inputId;
  liveAutocomplete.suggestionsId = suggestionsId;
  liveAutocomplete.names = names;
  liveAutocomplete.activeIndex = names.length ? 0 : -1;

  if (stateText) {
    list.innerHTML = `<div class="suggestion-state">${escapeHtml(stateText)}</div>`;
    list.classList.add("open");
    input.setAttribute("aria-expanded", "true");
    return;
  }

  if (!names.length) {
    hideLiveSuggestions();
    return;
  }

  list.innerHTML = names
    .map(
      (name, index) => `
        <button
          class="suggestion-item ${index === liveAutocomplete.activeIndex ? "active" : ""}"
          type="button"
          role="option"
          aria-selected="${index === liveAutocomplete.activeIndex}"
          data-live-suggestion="${escapeHtml(name)}"
        >
          <span>${escapeHtml(name)}</span>
          <span class="suggestion-type">Card</span>
        </button>
      `
    )
    .join("");
  list.classList.add("open");
  input.setAttribute("aria-expanded", "true");
}

function highlightLiveSuggestion(index) {
  if (!liveAutocomplete.names.length) return;
  liveAutocomplete.activeIndex = (index + liveAutocomplete.names.length) % liveAutocomplete.names.length;
  $$(`#${liveAutocomplete.suggestionsId} .suggestion-item`).forEach((item, itemIndex) => {
    const isActive = itemIndex === liveAutocomplete.activeIndex;
    item.classList.toggle("active", isActive);
    item.setAttribute("aria-selected", String(isActive));
    if (isActive) item.scrollIntoView({ block: "nearest" });
  });
}

async function updateLiveSuggestions(zone) {
  const inputId = liveZoneInputId(zone);
  const suggestionsId = liveZoneSuggestionsId(zone);
  const input = $(`#${inputId}`);
  if (!input) return;

  const value = input.value.trim();
  clearTimeout(liveAutocomplete.timer);

  if (value.length < 2) {
    hideLiveSuggestions();
    return;
  }

  const requestId = ++liveAutocomplete.requestId;
  renderLiveSuggestions(inputId, suggestionsId, [], "Looking for cards...");

  try {
    const names = await fetchCardSuggestions(value);
    if (requestId !== liveAutocomplete.requestId) return;
    renderLiveSuggestions(inputId, suggestionsId, names, names.length ? "" : "No matching cards found.");
  } catch {
    if (requestId !== liveAutocomplete.requestId) return;
    renderLiveSuggestions(inputId, suggestionsId, [], "Suggestions are unavailable.");
  }
}

async function addLiveCard(zone, query) {
  const value = query.trim();
  if (!value) return;

  let card;
  try {
    hideLiveSuggestions();
    card = await fetchCard(value);
  } catch {
    setStatus("Card not found");
    return;
  }

  if (zone === "cast" || zone === "response") {
    liveBoard[zone] = card;
  } else {
    liveBoard[zone] = [...liveBoard[zone].filter((item) => item.name !== card.name), card].slice(-8);
  }

  const input = $(`#${liveZoneInputId(zone)}`);
  if (input) input.value = "";
  renderLiveBoard();
  analyzeLiveBoard();
  setStatus(`${liveZoneLabel(zone)} updated`);
}

function removeLiveCard(zone, index) {
  if (zone === "cast" || zone === "response") {
    liveBoard[zone] = null;
  } else {
    liveBoard[zone].splice(index, 1);
  }
  renderLiveBoard();
  analyzeLiveBoard();
}

function boardNames(cards) {
  return cards.length ? cards.map((card) => card.name).join(", ") : "none";
}

function controllerLabel(value = liveBoard.castController) {
  return value === "opponent" ? "Opponent" : "Me";
}

function manaModeLabel(value = liveBoard.manaMode) {
  if (value === "free") return "No mana was spent";
  if (value === "unknown") return "Not sure";
  return "Mana was spent";
}

function phaseLabel(value = liveBoard.turnPhase) {
  if (value === "combat") return "Combat";
  if (value === "end") return "End step";
  if (value === "unknown") return "Not sure";
  return "Main phase";
}

function buildBoardStateSummary() {
  return `
    <div class="board-state-summary">
      <div>
        <h3>Cast</h3>
        <p>${escapeHtml(liveBoard.cast ? liveBoard.cast.name : "No cast card selected")}</p>
        <p>${escapeHtml(controllerLabel())} casting, ${escapeHtml(manaModeLabel())}, ${escapeHtml(phaseLabel())}</p>
      </div>
      <div>
        <h3>Opponent Response</h3>
        <p>${escapeHtml(liveBoard.response ? liveBoard.response.name : "none")}</p>
      </div>
      <div>
        <h3>My Board</h3>
        <p>${escapeHtml(boardNames(liveBoard.mine))}</p>
      </div>
      <div>
        <h3>Opponent Board</h3>
        <p>${escapeHtml(boardNames(liveBoard.opponent))}</p>
      </div>
    </div>
  `;
}

function targetKindFor(card) {
  const text = `${card.text || ""}`.toLowerCase();
  if (text.includes("any target")) return "any target";
  if (text.includes("target creature")) return "target creature";
  if (text.includes("target artifact")) return "target artifact";
  if (text.includes("target enchantment")) return "target enchantment";
  if (text.includes("target nonland permanent")) return "target nonland permanent";
  if (text.includes("target permanent")) return "target permanent";
  if (text.includes("target spell")) return "target spell";
  if (text.includes("target player")) return "target player";
  return "target";
}

function permanentMatchesTarget(card, targetKind) {
  const typeLine = `${card.typeLine || ""}`.toLowerCase();
  if (targetKind === "any target") return true;
  if (targetKind === "target permanent") return true;
  if (targetKind === "target nonland permanent") return !typeLine.includes("land");
  if (targetKind === "target creature") return typeLine.includes("creature");
  if (targetKind === "target artifact") return typeLine.includes("artifact");
  if (targetKind === "target enchantment") return typeLine.includes("enchantment");
  return !targetKind.includes("spell") && !targetKind.includes("player");
}

function describeBoardCard(card, side) {
  return `${card.name} (${side})`;
}

function landSubtypeSummary(card) {
  const typeLine = `${card.typeLine || ""}`;
  const subtypes = typeLine.split("—")[1]?.trim();
  return subtypes || "no printed basic land subtype";
}

function buildStaticBoardEngine() {
  const myCards = liveBoard.mine.map((card) => ({ ...card, side: "my board" }));
  const opponentCards = liveBoard.opponent.map((card) => ({ ...card, side: "opponent board" }));
  const allCards = [...myCards, ...opponentCards];
  const analyzed = allCards.map((card) => classifyCard(card));
  const bloodMoon = analyzed.find((card) => card.features.bloodMoonEffect);
  const nonbasicLands = analyzed.filter((card) => card !== bloodMoon && card.features.nonbasicLand);
  const ruleIds = ["priority"];
  const steps = [];
  const facts = [...new Set(analyzed.flatMap((card) => card.facts || []))];

  if (bloodMoon && nonbasicLands.length) {
    addRule(ruleIds, "layers");
    steps.push(`${bloodMoon.name} creates a continuous effect that applies to nonbasic lands on the battlefield.`);
    steps.push(`${nonbasicLands.map((card) => describeBoardCard(card, card.side)).join(", ")} ${nonbasicLands.length === 1 ? "is" : "are"} nonbasic land${nonbasicLands.length === 1 ? "" : "s"}, so ${bloodMoon.name} applies.`);
    nonbasicLands.forEach((land) => {
      steps.push(`${land.name} becomes a Mountain. It has the Mountain subtype and the intrinsic mana ability "{T}: Add {R}."`);
      steps.push(`${land.name} loses its printed rules text and other land types it had before, unless another effect is adding something back.`);
    });
    steps.push("This does not make the land basic. It remains nonbasic, but its land type and abilities are changed by the continuous effect.");
    steps.push("This effect does not use the stack. It applies as soon as the land is on the battlefield while Blood Moon is active.");
    return {
      title: "Blood Moon and nonbasic lands",
      steps,
      ruleIds,
      engine: {
        title: "Continuous effect and layers",
        summary: `${bloodMoon.name} changes each nonbasic land into a Mountain while its effect applies.`,
        facts: ["Clear ruling", ...facts]
      }
    };
  }

  const fallback = buildInteractionEngine([...liveBoard.mine, ...liveBoard.opponent]);
  return {
    ...fallback,
    engine: {
      ...fallback.engine,
      facts: ["Likely ruling", ...fallback.engine.facts]
    }
  };
}

function buildCastInteractionEngine() {
  const castCard = liveBoard.cast;
  if (!castCard) {
    return {
      result: null,
      boardCards: [],
      castAnalysis: null
    };
  }

  const myCards = liveBoard.mine.map((card) => ({ ...card, side: "my board" }));
  const opponentCards = liveBoard.opponent.map((card) => ({ ...card, side: "opponent board" }));
  const boardCards = [...myCards, ...opponentCards];
  const responseCard = liveBoard.response ? { ...liveBoard.response, side: "opponent response" } : null;
  const castAnalysis = classifyCard(castCard);
  const analyzedBoard = boardCards.map((card) => classifyCard(card));
  const responseAnalysis = responseCard ? classifyCard(responseCard) : null;
  const cardsForFallback = [castCard, ...liveBoard.mine, ...liveBoard.opponent];
  const fallback = buildInteractionEngine(cardsForFallback);
  const ruleIds = ["priority"];
  const steps = [];
  const facts = [...new Set([...(castAnalysis.facts || []), ...(responseAnalysis?.facts || []), ...analyzedBoard.flatMap((card) => card.facts || [])])];
  let title = `${castCard.name} vs live board`;
  let summary = `${castCard.name} is being evaluated against the current permanents on both boards.`;
  let confidence = "Clear ruling";
  const noManaCounterCards = analyzedBoard.filter((card) => card.features.noManaCounterTrigger);
  const uncounterableCards = analyzedBoard.filter((card) => card.features.makesYourSpellsUncounterable && card.side === "my board");
  const instantSorceryCastTriggers = analyzedBoard.filter((card) => card.side === "my board" && card.features.instantSorceryCastTrigger);
  const krarkTriggers = analyzedBoard.filter((card) => card.side === "my board" && card.features.krarkStyleTrigger);
  const bloodMoonEffects = analyzedBoard.filter((card) => card.features.bloodMoonEffect);
  let originalCounteredByResponse = false;
  const castControllerText = liveBoard.castController === "opponent" ? "opponent" : "you";
  const castControllerPossessive = liveBoard.castController === "opponent" ? "opponent's" : "your";
  const castWasFree = liveBoard.manaMode === "free";
  const castManaUnknown = liveBoard.manaMode === "unknown";

  if (!boardCards.length) {
    addRule(ruleIds, "priority");
    steps.push(`${castCard.name} is cast and put on the stack.`);
    if (castAnalysis.features.targeter) {
      addRule(ruleIds, "targets");
      steps.push(`${castCard.name} needs a legal ${targetKindFor(castCard)} when it is cast.`);
    }
    steps.push("With no permanents added to either board, the live board does not add any permanent-based interaction.");
    steps.push("Players can still respond with spells or abilities from hidden zones, but those are not represented in this board state.");
    return {
      result: {
        title: castCard.name,
        steps,
        ruleIds,
        engine: {
          title,
          summary,
          facts: facts.length ? facts : ["cast", "stack"]
        }
      },
      boardCards,
      castAnalysis
    };
  }

  if (castAnalysis.features.land) {
    steps.push(`${castCard.name} is a land, so it is played, not cast. It does not use the stack and it cannot be countered as a spell.`);
  } else {
    steps.push(`${castCard.name} is the object being cast by ${castControllerText}, so it starts on the stack before it affects the battlefield.`);
  }

  if (castAnalysis.features.nonbasicLand && bloodMoonEffects.length) {
    addRule(ruleIds, "layers");
    title = `${castCard.name} under Blood Moon`;
    summary = `${bloodMoonEffects.map((card) => card.name).join(", ")} applies immediately to ${castCard.name} as a nonbasic land.`;
    steps.push(`${bloodMoonEffects.map((card) => describeBoardCard(card, card.side)).join(", ")} applies to nonbasic lands as a continuous effect.`);
    steps.push(`As ${castCard.name} enters the battlefield, it is a nonbasic land, so it becomes a Mountain.`);
    steps.push(`${castCard.name} keeps being nonbasic, but it has the Mountain subtype and "{T}: Add {R}."`);
    steps.push(`${castCard.name} loses its printed rules text and other land types while Blood Moon's effect applies, unless another effect adds something back.`);
    steps.push("No player can respond to Blood Moon changing the land after it enters; the effect is continuous and does not use the stack.");
  }

  if (instantSorceryCastTriggers.length && includesAny(castAnalysis.text, ["instant", "sorcery"])) {
    addRule(ruleIds, "triggered");
    steps.push(`${instantSorceryCastTriggers.map((card) => card.name).join(", ")} triggers when you finish casting ${castCard.name}. That trigger is put on the stack above ${castCard.name} before any player can respond.`);
  }

  if (responseAnalysis?.features.counterspell) {
    addRule(ruleIds, "targets");
    originalCounteredByResponse = true;
    steps.push(`Opponent response: ${responseCard.name} is cast after ${castCard.name} and any cast triggers are already on the stack. If it targets ${castCard.name}, it goes on top of the stack and resolves before those lower objects.`);
    steps.push(`If ${responseCard.name} resolves first, it counters ${castCard.name}; ${castCard.name} leaves the stack and will not resolve.`);
  }

  if (krarkTriggers.length && responseAnalysis?.features.counterspell && includesAny(castAnalysis.text, ["instant", "sorcery"])) {
    addRule(ruleIds, "triggered");
    addRule(ruleIds, "copy");
    title = `${castCard.name}, Krark trigger, and counter response`;
    summary = `The opponent's counterspell can resolve before the Krark trigger, but the Krark trigger still resolves afterward.`;
    steps.push(`Then ${krarkTriggers.map((card) => card.name).join(", ")}'s trigger resolves even though ${castCard.name} is no longer on the stack.`);
    steps.push(`If you lose the coin flip, ${castCard.name} cannot be returned to your hand because it is no longer on the stack. It stays wherever the counterspell put it, usually the graveyard.`);
    steps.push(`If you win the coin flip, Krark still creates a copy of ${castCard.name} even though the original was countered. The copy is created on the stack and can resolve if no one counters it.`);
  }

  if (castManaUnknown) {
    confidence = "Needs one choice";
    steps.push(`Missing info: whether mana was spent to cast ${castCard.name} matters for effects that care about spells cast for no mana.`);
  }

  if (noManaCounterCards.length) {
    addRule(ruleIds, "triggered");
    addRule(ruleIds, "targets");
    const baubleNames = noManaCounterCards.map((card) => describeBoardCard(card, card.side)).join(", ");
    steps.push(`${baubleNames} watches for spells cast with no mana spent to cast them. It counters spells, not triggered abilities.`);
    if (castWasFree) {
      steps.push(`Because the cast setting says no mana was spent, ${baubleNames} triggers for ${castCard.name} itself as it is cast.`);
      if (liveBoard.castController === "mine" && uncounterableCards.length) {
        steps.push(`${uncounterableCards.map((card) => describeBoardCard(card, card.side)).join(", ")} says spells you control can't be countered, so that trigger cannot counter ${castCard.name}.`);
      } else {
        steps.push(`If nothing says ${castControllerPossessive} spells can't be countered, that trigger can counter ${castCard.name}.`);
      }
    } else if (!castManaUnknown) {
      steps.push(`Because the cast setting says mana was spent to cast ${castCard.name}, ${baubleNames} does not trigger for ${castCard.name} itself.`);
    }
    if (liveBoard.castController === "mine" && uncounterableCards.length) {
      steps.push(`${uncounterableCards.map((card) => describeBoardCard(card, card.side)).join(", ")} says spells you control can't be countered, so counter effects can still trigger but they fail to counter your spells while that effect applies.`);
    }
  }

  if (castAnalysis.features.etbTrigger) {
    addRule(ruleIds, "triggered");
    if (noManaCounterCards.length) {
      steps.push(`Bottom line: ${noManaCounterCards.map((card) => card.name).join(", ")} does not counter ${castCard.name}'s ETB ability, because that ability is a triggered ability, not a spell being cast.`);
    }
    steps.push(`${castCard.name} entering the battlefield creates a triggered ability. That ETB ability is not a spell, so effects that say "counter that spell" do not counter the ETB ability itself.`);
  }

  if (castAnalysis.features.castsWithoutPaying) {
    addRule(ruleIds, "triggered");
    addRule(ruleIds, "priority");
    title = `${castCard.name} ETB vs live board`;
    summary = `${castCard.name}'s ETB ability is checked separately from the spells it may let you cast without paying mana.`;
    steps.push(`When ${castCard.name}'s ETB ability resolves, it can let you cast exiled nonland cards without paying their mana costs.`);
    if (noManaCounterCards.length) {
      steps.push(`Each spell you cast this way has no mana spent to cast it, so ${noManaCounterCards.map((card) => card.name).join(", ")} will trigger for each of those spells.`);
      if (uncounterableCards.length) {
        steps.push(`Because ${uncounterableCards.map((card) => card.name).join(", ")} says your spells can't be countered, those triggered abilities cannot actually counter the spells you control while that effect remains true.`);
      } else if (liveBoard.castController === "opponent") {
        steps.push(`Hexing-style protection on your board protects your spells, not the opponent's spells. If the opponent controls the free spells, your "spells you control can't be countered" effect will not protect them.`);
      } else {
        steps.push(`Without an effect saying your spells can't be countered, those no-mana counter triggers can counter the free spells cast from ${castCard.name}'s ETB ability.`);
      }
    }
  }

  if (castAnalysis.features.targeter) {
    addRule(ruleIds, "targets");
    const targetKind = targetKindFor(castCard);
    const possibleTargets = boardCards.filter((card) => permanentMatchesTarget(card, targetKind));
    if (possibleTargets.length) {
      steps.push(`${castCard.name} asks for ${targetKind}. On this board, likely permanent targets include ${possibleTargets.map((card) => describeBoardCard(card, card.side)).join(", ")}.`);
    } else {
      steps.push(`${castCard.name} asks for ${targetKind}, and no current battlefield permanent clearly matches that target requirement.`);
    }

    possibleTargets.forEach((card) => {
      const analyzed = classifyCard(card);
      if (analyzed.features.wardSelf) {
        addRule(ruleIds, "triggered");
        steps.push(`If ${castCard.name} targets ${card.name}, ${card.name}'s ward ability triggers and goes on the stack above ${castCard.name}.`);
        steps.push(`When that ward trigger resolves, ${castCard.name}'s controller must pay the ward cost or ${castCard.name} is countered.`);
      }
    });
  } else {
    steps.push(`${castCard.name} does not appear to use the word "target", so it does not choose specific targets as it is cast unless another effect changes how it is cast.`);
  }

  analyzedBoard.forEach((card) => {
    if (card.features.wardGranter && castAnalysis.features.targeter) {
      addRule(ruleIds, "triggered");
      steps.push(`${card.name} grants ward to a subset of permanents. Before choosing a target for ${castCard.name}, check whether the chosen permanent is one of the objects ${card.name} protects.`);
    }

    if (card.features.triggerStopper && castAnalysis.features.etbTrigger) {
      addRule(ruleIds, "triggered");
      steps.push(`${card.name} stops relevant enter-the-battlefield abilities from triggering. If ${castCard.name} enters as a creature, its ETB ability may never go on the stack.`);
    }

    if (card.features.graveyardReplacement && (castAnalysis.features.damage || castAnalysis.features.destroy || castAnalysis.features.exile)) {
      addRule(ruleIds, "replacement");
      addRule(ruleIds, "sba");
      steps.push(`${card.name} can replace where cards go after ${castCard.name} deals damage, destroys something, or causes a graveyard event.`);
    }

    if (card.features.typeChanger || card.features.nonbasicLandRule) {
      addRule(ruleIds, "layers");
      steps.push(`${card.name} has a continuous effect. Apply it before deciding the final characteristics of any affected permanents while ${castCard.name} is resolving.`);
    }
  });

  if (originalCounteredByResponse && krarkTriggers.length) {
    addRule(ruleIds, "sba");
    steps.push(`The original ${castCard.name} will not resolve after being countered. Only a copy created by the Krark trigger can resolve from this sequence.`);
    steps.push("After any surviving copy resolves, apply its effects, then check state-based actions before any player gets priority again.");
  } else if (originalCounteredByResponse) {
    steps.push(`Because ${castCard.name} was countered by ${responseCard.name}, the original spell will not resolve.`);
  } else if (castAnalysis.features.land) {
    steps.push(`After ${castCard.name} is played, the game continues with ${castCard.name} affected by any applicable continuous effects.`);
  } else if (castAnalysis.features.damage || castAnalysis.features.destroy || castAnalysis.features.exile) {
    addRule(ruleIds, "sba");
    steps.push(`After ${castCard.name} resolves, apply its damage, destroy, or exile instructions as much as possible.`);
    steps.push("Then state-based actions are checked before any player gets priority again.");
  } else {
    steps.push(`When ${castCard.name} resolves, follow its Oracle text as much as possible, then check state-based actions.`);
  }

  if (steps.length <= 3) {
    fallback.ruleIds.forEach((id) => addRule(ruleIds, id));
    fallback.steps.forEach((step) => steps.push(step));
    title = fallback.engine.title;
    summary = fallback.engine.summary;
  }

  return {
    result: {
      title: castCard.name,
      steps: [...new Set(steps)],
      ruleIds,
      engine: {
        title,
        summary,
        facts: facts.length ? [confidence, ...facts] : [confidence, ...fallback.engine.facts]
      }
    },
    boardCards,
    castAnalysis
  };
}

function analyzeLiveBoard() {
  if (!liveBoard.cast && !liveBoard.mine.length && !liveBoard.opponent.length) {
    $("#questionTitle").textContent = "Waiting for a cast";
    $("#questionAnswer").innerHTML = `<p>Add cards to either board, then choose a card to cast with the current board state.</p>`;
    renderFocus(["priority"]);
    return;
  }

  if (!liveBoard.cast) {
    const boardOnly = buildStaticBoardEngine();
    const related = boardOnly.ruleIds.map((id) => rules.find((rule) => rule.id === id)).filter(Boolean);
    $("#questionTitle").textContent = boardOnly.engine.facts.includes("Clear ruling") ? "Current board ruling" : "Choose a card to cast";
    $("#questionAnswer").innerHTML = `
      ${buildBoardStateSummary()}
      <div class="engine-summary active">
        <h3>${escapeHtml(boardOnly.engine.title)}</h3>
        <p>${escapeHtml(boardOnly.engine.summary)}</p>
        <div class="engine-facts">${boardOnly.engine.facts.map((fact) => `<span class="engine-fact">${escapeHtml(fact)}</span>`).join("")}</div>
      </div>
      <ol class="steps">${boardOnly.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
      ${related
        .map(
          (rule) => `
            <div class="mini-rule">
              <strong>${rule.refs}</strong>
              <p>${rule.summary}</p>
            </div>
          `
        )
        .join("")}
      <p>Set a cast or played card if you want to test a new object entering this board state.</p>
    `;
    renderFocus(boardOnly.ruleIds);
    return;
  }

  const castEngine = buildCastInteractionEngine();
  const result = castEngine.result;
  const related = result.ruleIds.map((id) => rules.find((rule) => rule.id === id)).filter(Boolean);
  $("#questionTitle").textContent = liveBoard.cast ? `Casting ${liveBoard.cast.name}` : "Current board";
  $("#questionAnswer").innerHTML = `
    ${buildBoardStateSummary()}
    <div class="engine-summary active">
      <h3>${escapeHtml(result.engine.title)}</h3>
      <p>${escapeHtml(result.engine.summary)}</p>
      <div class="engine-facts">${result.engine.facts.map((fact) => `<span class="engine-fact">${escapeHtml(fact)}</span>`).join("")}</div>
    </div>
    <ol class="steps">${result.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
    ${related
      .map(
        (rule) => `
          <div class="mini-rule">
            <strong>${rule.refs}</strong>
            <p>${rule.summary}</p>
          </div>
        `
      )
      .join("")}
  `;
  renderFocus(result.ruleIds);
}

async function addCardFromQuery(query) {
  const value = query.trim();
  if (!value) return;

  let card;
  try {
    hideCardSuggestions();
    card = await fetchCard(value);
  } catch {
    setStatus("Card not found");
    return;
  }

  selectedCards = [...selectedCards.filter((item) => item.name !== card.name), card].slice(-4);
  $("#cardSearch").value = "";
  renderSelectedCards();

  try {
    explainSelectedCards();
    setStatus("Card loaded");
  } catch (error) {
    console.error(error);
    setStatus("Engine error");
  }
}

function includesAny(text, words) {
  return words.some((word) => text.includes(word));
}

function classifyCard(card) {
  const text = `${card.name || ""} ${card.typeLine || ""} ${card.text || ""} ${(card.keywords || []).join(" ")}`.toLowerCase();
  const typeText = `${card.typeLine || ""}`.toLowerCase();
  const isLand = typeText.includes("land");
  const isBasicLand = typeText.includes("basic land");
  const isPermanent = includesAny(text, ["creature", "artifact", "enchantment", "planeswalker", "battle", "land"]);
  const hasEtbTrigger = /(when|whenever) .* enters/.test(text) || text.includes("when this creature enters");
  const grantsWard = text.includes("has ward") || text.includes("have ward") || text.includes("gain ward");
  const makesYourSpellsUncounterable = text.includes("spells you control can't be countered");
  const noManaCounterTrigger = text.includes("if no mana was spent to cast it") && text.includes("counter that spell");
  const castsWithoutPaying = text.includes("cast") && text.includes("without paying") && text.includes("mana cost");
  const instantSorceryCastTrigger = text.includes("whenever you cast an instant or sorcery spell");
  const krarkStyleTrigger = instantSorceryCastTrigger && text.includes("flip a coin") && text.includes("return that spell") && text.includes("copy that spell");
  const features = {
    targeter: /\btarget\b/.test(text),
    counterspell: text.includes("counter target") || text.includes("counter up to one target"),
    ward: text.includes("ward"),
    wardSelf: text.includes("ward") && !grantsWard,
    wardGranter: grantsWard,
    hexproof: text.includes("hexproof"),
    grantsHexproof: text.includes("gains hexproof") || text.includes("hexproof until") || text.includes("have hexproof"),
    protection: text.includes("protection from"),
    etbTrigger: hasEtbTrigger,
    triggerStopper: text.includes("entering") && text.includes("don't cause abilities to trigger"),
    noManaCounterTrigger,
    makesYourSpellsUncounterable,
    selfUncounterable: text.includes("this spell can't be countered") || text.includes("can't be countered"),
    castsWithoutPaying,
    instantSorceryCastTrigger,
    krarkStyleTrigger,
    replacement: includesAny(text, [" instead", "as this enters", "as it enters", "enters the battlefield with", "skip "]),
    graveyardReplacement: text.includes("would be put into a graveyard") || (text.includes("graveyard") && text.includes("exile") && text.includes("instead")),
    damage: /deals? \d+ damage/.test(text) || text.includes("deals damage"),
    destroy: text.includes("destroy target") || text.includes("destroy all"),
    exile: text.includes("exile target") || text.includes("exile all"),
    trample: text.includes("trample"),
    deathtouch: text.includes("deathtouch"),
    firstStrike: text.includes("first strike") || text.includes("double strike"),
    copy: text.includes("copy") || text.includes("becomes a copy"),
    counters: text.includes("counter") && !text.includes("counter target"),
    auraEquipment: includesAny(text, ["enchant ", "equip ", "equipped creature", "enchanted creature"]),
    typeChanger:
      includesAny(text, ["are mountains", "are swamps", "loses all abilities", "base power and toughness"]) ||
      (text.includes("becomes") && !text.includes("becomes the target")),
    nonbasicLandRule: text.includes("nonbasic lands") || text.includes("each land is"),
    bloodMoonEffect: text.includes("nonbasic lands are mountains"),
    land: isLand,
    nonbasicLand: isLand && !isBasicLand,
    spell: includesAny(text, ["instant", "sorcery"]),
    permanent: isPermanent
  };

  const facts = [];
  if (features.targeter) facts.push("targets");
  if (features.counterspell) facts.push("counters spells");
  if (features.noManaCounterTrigger) facts.push("counters free spells");
  if (features.makesYourSpellsUncounterable) facts.push("your spells can't be countered");
  if (features.castsWithoutPaying) facts.push("casts spells for free");
  if (features.instantSorceryCastTrigger) facts.push("instant/sorcery cast trigger");
  if (features.krarkStyleTrigger) facts.push("coin-flip cast trigger");
  if (features.wardSelf) facts.push("ward");
  if (features.wardGranter) facts.push("grants ward");
  if (features.hexproof || features.grantsHexproof) facts.push("hexproof");
  if (features.etbTrigger) facts.push("ETB trigger");
  if (features.triggerStopper) facts.push("stops ETB triggers");
  if (features.replacement) facts.push("replacement effect");
  if (features.graveyardReplacement) facts.push("graveyard replacement");
  if (features.trample) facts.push("trample");
  if (features.deathtouch) facts.push("deathtouch");
  if (features.copy) facts.push("copy effect");
  if (features.typeChanger || features.nonbasicLandRule) facts.push("continuous effect");
  if (features.bloodMoonEffect) facts.push("Blood Moon effect");
  if (features.nonbasicLand) facts.push("nonbasic land");

  return { ...card, text, features, facts };
}

function addRule(ruleIds, id) {
  if (!ruleIds.includes(id)) ruleIds.push(id);
}

function findCard(cards, predicate) {
  return cards.find((card) => predicate(card.features, card));
}

function buildInteractionEngine(cards) {
  const analyzed = cards.map(classifyCard);
  const names = analyzed.map((card) => card.name).join(" + ");
  const ruleIds = ["priority"];
  const steps = [];
  const facts = [...new Set(analyzed.flatMap((card) => card.facts))];
  let title = "Oracle-based interaction";
  let summary = "The engine found the rules concepts in the selected Oracle text and built a likely resolution path.";

  const targeter = findCard(analyzed, (features) => features.targeter && !features.counterspell);
  const counterspell = findCard(analyzed, (features) => features.counterspell);
  const wardPermanent = findCard(analyzed, (features) => features.wardSelf);
  const wardGranter = findCard(analyzed, (features) => features.wardGranter);
  const hexproofCard = findCard(analyzed, (features) => features.grantsHexproof || features.hexproof || features.protection);
  const etbCard = findCard(analyzed, (features) => features.etbTrigger);
  const triggerStopper = findCard(analyzed, (features) => features.triggerStopper);
  const graveyardReplacement = findCard(analyzed, (features) => features.graveyardReplacement);
  const destroyOrDamage = findCard(analyzed, (features) => features.destroy || features.damage || features.exile);
  const typeChanger = findCard(analyzed, (features) => features.typeChanger || features.nonbasicLandRule);
  const copyCard = findCard(analyzed, (features) => features.copy);
  const modifiedCard = findCard(analyzed, (features, card) => card !== copyCard && (features.counters || features.auraEquipment || features.typeChanger));
  const trampler = findCard(analyzed, (features) => features.trample);
  const deathtoucher = findCard(analyzed, (features) => features.deathtouch);

  if (counterspell && analyzed.length > 1) {
    addRule(ruleIds, "targets");
    title = "Counterspell check";
    summary = `${counterspell.name} can interact only with an object that is still a legal target on the stack.`;
    steps.push(`${counterspell.name} is cast targeting a spell on the stack, not a permanent already on the battlefield.`);
    steps.push("Players get priority to respond before the counterspell resolves.");
    steps.push(`When ${counterspell.name} resolves, it checks whether its target spell is still legal.`);
    steps.push("If the target is legal, that spell is countered and put into its owner's graveyard unless another effect changes where it goes.");
    steps.push("If the target became illegal or is no longer on the stack, the counterspell does not resolve.");
  }

  if (targeter && wardPermanent && targeter !== wardPermanent) {
    addRule(ruleIds, "targets");
    addRule(ruleIds, "triggered");
    title = "Targeting a ward permanent";
    summary = `${targeter.name} appears to target ${wardPermanent.name}, and ward creates a triggered ability above the original spell or ability.`;
    steps.push(`${targeter.name} is put on the stack and chooses ${wardPermanent.name} as a target if it is a legal target.`);
    steps.push(`${wardPermanent.name}'s ward ability triggers because it became the target of a spell or ability an opponent controls.`);
    steps.push("The ward trigger is put on the stack above the original object.");
    steps.push(`When the ward trigger resolves, ${targeter.name}'s controller must pay the ward cost or ${targeter.name} is countered.`);
    steps.push(`If the cost is paid, ${targeter.name} remains on the stack and can resolve later if its target is still legal.`);
  }

  if (targeter && wardGranter && targeter !== wardGranter && !steps.length) {
    addRule(ruleIds, "targets");
    addRule(ruleIds, "triggered");
    title = "Granted ward check";
    summary = `${wardGranter.name} appears to grant ward to other eligible permanents, so the protected object matters.`;
    steps.push(`${targeter.name} chooses its target as it is put on the stack.`);
    steps.push(`${wardGranter.name} does not automatically mean every permanent has ward. Check exactly which objects its text grants ward to.`);
    steps.push(`If ${targeter.name} targets a permanent currently granted ward by ${wardGranter.name}, that ward ability triggers and goes on the stack above ${targeter.name}.`);
    steps.push(`When the ward trigger resolves, ${targeter.name}'s controller must pay the ward cost or ${targeter.name} is countered.`);
    steps.push(`If ${targeter.name} targets ${wardGranter.name} itself and ${wardGranter.name} only grants ward to other objects, no ward trigger happens from that grant.`);
  }

  if (targeter && hexproofCard && targeter !== hexproofCard) {
    addRule(ruleIds, "targets");
    title = "Target legality can change";
    summary = `${hexproofCard.name} can affect whether ${targeter.name}'s target remains legal before resolution.`;
    steps.push(`${targeter.name} chooses its target as it is put on the stack.`);
    steps.push(`${hexproofCard.name} can be used before ${targeter.name} resolves if its timing allows it.`);
    steps.push(`If the target gains hexproof or relevant protection from ${targeter.name}'s controller, the game checks that target again on resolution.`);
    steps.push(`If all of ${targeter.name}'s targets are illegal then, ${targeter.name} does not resolve and none of its effects happen.`);
    steps.push("If at least one target is still legal, the spell or ability resolves and affects only the legal targets it can.");
  }

  if (triggerStopper && etbCard && triggerStopper !== etbCard) {
    addRule(ruleIds, "triggered");
    title = "ETB trigger suppression";
    summary = `${triggerStopper.name} stops the enter-the-battlefield ability on ${etbCard.name} from triggering.`;
    steps.push(`${triggerStopper.name} must already apply at the moment ${etbCard.name} enters the battlefield.`);
    steps.push(`${etbCard.name} enters the battlefield, then the game checks whether any abilities trigger from that event.`);
    steps.push(`${triggerStopper.name}'s effect says that event does not cause the relevant abilities to trigger.`);
    steps.push(`${etbCard.name}'s enter-the-battlefield ability is never put on the stack.`);
    steps.push(`Removing ${triggerStopper.name} afterward does not recreate a trigger that was prevented from triggering.`);
  }

  if (graveyardReplacement && destroyOrDamage && graveyardReplacement !== destroyOrDamage) {
    addRule(ruleIds, "replacement");
    addRule(ruleIds, "sba");
    title = "Graveyard event replacement";
    summary = `${graveyardReplacement.name} can replace where cards go after ${destroyOrDamage.name} destroys, damages, or exiles objects.`;
    steps.push(`${destroyOrDamage.name} resolves or damage is dealt, then the game determines what would go to the graveyard.`);
    steps.push(`${graveyardReplacement.name}'s replacement effect changes that event before it happens.`);
    steps.push("Because replacement effects do not use the stack, players cannot wait for the card to start going to the graveyard and then respond.");
    steps.push("If multiple replacement effects apply to the same object, the affected object's controller or affected player usually chooses the order.");
  }

  if (typeChanger && !steps.length) {
    addRule(ruleIds, "layers");
    title = "Continuous effect and layers";
    summary = `${typeChanger.name} changes characteristics continuously, so the layer system decides the final result.`;
    steps.push(`${typeChanger.name}'s continuous effect is active as long as its stated condition is true.`);
    steps.push("Apply continuous effects in layer order before deciding the object's final text, type, abilities, power, or toughness.");
    steps.push("Type-changing effects are applied before ability-adding or ability-removing effects in later layers.");
    steps.push("If two effects depend on one another, dependency can change the order; otherwise timestamp order often breaks ties within a layer.");
    if (typeChanger.features.nonbasicLandRule) {
      steps.push("If a nonbasic land becomes a basic land type, it gains the intrinsic mana ability for that type and usually loses its printed rules text unless another effect says otherwise.");
    }
  }

  if (copyCard) {
    addRule(ruleIds, "copy");
    if (modifiedCard) addRule(ruleIds, "layers");
    title = "Copy values check";
    summary = `${copyCard.name} uses copiable values, so counters, Auras, Equipment, and many temporary changes are treated separately.`;
    steps.push(`${copyCard.name}'s copy effect looks for the object's copiable values.`);
    steps.push("Copiable values usually mean printed characteristics plus other copy effects that already changed those values.");
    if (modifiedCard) {
      steps.push(`${modifiedCard.name}'s counters, Auras, Equipment, damage, and most non-copy continuous effects are not copied.`);
    }
    steps.push(`${copyCard.name} becomes or enters as the copied object using those copiable values.`);
    steps.push("After the copy exists, other continuous effects, counters, and attachments can apply to it normally.");
  }

  if (trampler && deathtoucher) {
    addRule(ruleIds, "combat");
    addRule(ruleIds, "sba");
    title = "Combat damage shortcut";
    summary = `${trampler.name === deathtoucher.name ? trampler.name : `${trampler.name} and ${deathtoucher.name}`} creates a trample/deathtouch-style damage question.`;
    steps.push("During combat damage assignment, an attacking creature with trample must assign lethal damage to blockers before assigning excess damage to the defending player or planeswalker.");
    steps.push("Deathtouch makes any nonzero combat damage from that source lethal for damage assignment.");
    steps.push("That means 1 damage can usually be assigned to each blocker, with the rest assigned as trample damage.");
    steps.push("Damage is dealt simultaneously in the relevant combat damage step.");
    steps.push("State-based actions then destroy creatures that have lethal damage.");
  }

  if (!steps.length) {
    analyzed.forEach((card) => {
      if (card.features.targeter) {
        addRule(ruleIds, "targets");
        steps.push(`${card.name} uses the word "target", so its targets are chosen as it is put on the stack and checked again as it resolves.`);
      }
      if (card.features.etbTrigger) {
        addRule(ruleIds, "triggered");
        steps.push(`${card.name} has an enter-the-battlefield triggered ability, so it triggers after the event and then goes on the stack.`);
      }
      if (card.features.replacement) {
        addRule(ruleIds, "replacement");
        steps.push(`${card.name} appears to use a replacement effect, which modifies an event before it happens and does not use the stack.`);
      }
    });
  }

  if (!steps.length) {
    steps.push("The engine did not find a high-confidence card-to-card rule collision yet.");
    steps.push("Start by asking which object is on the stack, what it targets, and whether either card creates a triggered, replacement, or continuous effect.");
    steps.push("After each spell or ability resolves, check state-based actions before any player gets priority.");
    addRule(ruleIds, "targets");
  }

  return {
    title: names || "Selected cards",
    steps: [...new Set(steps)],
    ruleIds,
    engine: {
      title,
      summary,
      facts: facts.length ? facts : ["priority", "stack check", "Oracle text scan"]
    }
  };
}

function inferRuleIdsFromCards(cards) {
  return buildInteractionEngine(cards).ruleIds;
}

function explainSelectedCards() {
  const result = buildInteractionEngine(selectedCards);
  renderAnswer(result.title, result.steps, result.ruleIds, result.engine);
}

function analyzeQuestion() {
  hideLiveSuggestions();
  analyzeLiveBoard();
}

function bindEvents() {
  $$(".nav-item").forEach((button) => button.addEventListener("click", () => switchView(button.dataset.view)));

  $("#scenarioStrip").addEventListener("click", async (event) => {
    const button = event.target.closest("[data-scenario]");
    if (!button) return;
    const scenario = scenarios.find((item) => item.id === button.dataset.scenario);
    renderAnswer(scenario.title, scenario.steps, scenario.ruleIds);
    selectedCards = scenario.cards.map((name) => ({ name, text: "Load this card with search to view current Oracle text.", image: "" }));
    renderSelectedCards();
  });

  $("#ruleList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-rule]");
    if (!button) return;
    renderRuleDetail(button.dataset.rule);
  });

  $("#relatedRules").addEventListener("click", (event) => {
    const button = event.target.closest("[data-open-rule]");
    if (!button) return;
    switchView("rules");
    renderRulesList($("#globalSearch").value.trim());
    renderRuleDetail(button.dataset.openRule);
  });

  $("#addCard").addEventListener("click", async () => {
    await addCardFromQuery($("#cardSearch").value);
  });

  $("#cardSearch").addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      highlightSuggestion(activeSuggestionIndex + 1);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      highlightSuggestion(activeSuggestionIndex - 1);
      return;
    }

    if (event.key === "Escape") {
      hideCardSuggestions();
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const pickedName = cardSuggestionNames[activeSuggestionIndex];
      addCardFromQuery(pickedName || $("#cardSearch").value);
    }
  });

  $("#cardSearch").addEventListener("input", (event) => {
    clearTimeout(suggestionTimer);
    suggestionTimer = setTimeout(() => updateCardSuggestions(event.target.value), 180);
  });

  $("#cardSuggestions").addEventListener("mousedown", (event) => {
    event.preventDefault();
  });

  $("#cardSuggestions").addEventListener("click", (event) => {
    const button = event.target.closest("[data-card-suggestion]");
    if (!button) return;
    $("#cardSearch").value = button.dataset.cardSuggestion;
    addCardFromQuery(button.dataset.cardSuggestion);
  });

  [
    ["mine", "myBoardSearch"],
    ["opponent", "opponentBoardSearch"],
    ["cast", "castSearch"],
    ["response", "responseSearch"]
  ].forEach(([zone, inputId]) => {
    const input = $(`#${inputId}`);
    if (!input) return;

    input.addEventListener("input", () => {
      clearTimeout(liveAutocomplete.timer);
      liveAutocomplete.timer = setTimeout(() => updateLiveSuggestions(zone), 180);
    });

    input.addEventListener("keydown", (event) => {
      const suggestionsOpen = liveAutocomplete.inputId === inputId && $(`#${liveZoneSuggestionsId(zone)}`).classList.contains("open");

      if (event.key === "ArrowDown" && suggestionsOpen) {
        event.preventDefault();
        highlightLiveSuggestion(liveAutocomplete.activeIndex + 1);
        return;
      }

      if (event.key === "ArrowUp" && suggestionsOpen) {
        event.preventDefault();
        highlightLiveSuggestion(liveAutocomplete.activeIndex - 1);
        return;
      }

      if (event.key === "Escape" && suggestionsOpen) {
        event.preventDefault();
        hideLiveSuggestions();
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        const pickedName = suggestionsOpen ? liveAutocomplete.names[liveAutocomplete.activeIndex] : "";
        addLiveCard(zone, pickedName || input.value);
      }
    });
  });

  $$("#myBoardSuggestions, #opponentBoardSuggestions, #castSuggestions, #responseSuggestions").forEach((list) => {
    list.addEventListener("mousedown", (event) => {
      event.preventDefault();
    });

    list.addEventListener("click", (event) => {
      const button = event.target.closest("[data-live-suggestion]");
      if (!button) return;
      const zone = list.id === "myBoardSuggestions" ? "mine" : list.id === "opponentBoardSuggestions" ? "opponent" : list.id === "responseSuggestions" ? "response" : "cast";
      addLiveCard(zone, button.dataset.liveSuggestion);
    });
  });

  $$("[data-add-zone]").forEach((button) => {
    button.addEventListener("click", () => {
      const zone = button.dataset.addZone;
      addLiveCard(zone, $(`#${liveZoneInputId(zone)}`).value);
    });
  });

  $("#setCastCard").addEventListener("click", () => {
    addLiveCard("cast", $("#castSearch").value);
  });

  $("#setResponseCard").addEventListener("click", () => {
    addLiveCard("response", $("#responseSearch").value);
  });

  $("#clearLiveBoard").addEventListener("click", () => {
    liveBoard = { mine: [], opponent: [], cast: null, response: null, castController: "mine", manaMode: "paid", turnPhase: "main" };
    ["myBoardSearch", "opponentBoardSearch", "castSearch", "responseSearch"].forEach((id) => {
      const input = $(`#${id}`);
      if (input) input.value = "";
    });
    $("#castController").value = liveBoard.castController;
    $("#castManaMode").value = liveBoard.manaMode;
    $("#turnPhase").value = liveBoard.turnPhase;
    hideLiveSuggestions();
    renderLiveBoard();
    analyzeLiveBoard();
    setStatus("Table reset");
  });

  $("#castController").addEventListener("change", (event) => {
    liveBoard.castController = event.target.value;
    analyzeLiveBoard();
  });

  $("#castManaMode").addEventListener("change", (event) => {
    liveBoard.manaMode = event.target.value;
    analyzeLiveBoard();
  });

  $("#turnPhase").addEventListener("change", (event) => {
    liveBoard.turnPhase = event.target.value;
    analyzeLiveBoard();
  });

  $$("[data-clear-zone]").forEach((button) => {
    button.addEventListener("click", () => {
      liveBoard[button.dataset.clearZone] = [];
      renderLiveBoard();
      analyzeLiveBoard();
    });
  });

  $("#judge").addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-remove-zone]");
    if (!removeButton) return;
    removeLiveCard(removeButton.dataset.removeZone, Number(removeButton.dataset.removeIndex));
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".card-search-field")) hideCardSuggestions();
    if (!event.target.closest(".live-search-field")) hideLiveSuggestions();
  });

  $("#clearCards").addEventListener("click", () => {
    selectedCards = [];
    renderSelectedCards();
    renderAnswer("Choose a scenario", ["Select a preset interaction or add cards to build a rules path."], ["priority"]);
  });

  $("#copyAnswer").addEventListener("click", async () => {
    const text = [$("#answerTitle").textContent, ...$$(".steps li").map((item, index) => `${index + 1}. ${item.textContent}`)].join("\n");
    await navigator.clipboard.writeText(text);
    setStatus("Copied");
  });

  $("#globalSearch").addEventListener("input", (event) => {
    const value = event.target.value.trim();
    renderRulesList(value);
    if (value) {
      const found = matchingRules(value);
      if (found.length) renderFocus(found.slice(0, 3).map((rule) => rule.id));
    }
  });

  $("#analyzeQuestion").addEventListener("click", analyzeQuestion);
}

renderScenarios();
renderSelectedCards();
renderRulesList();
renderAnswer(scenarios[0].title, scenarios[0].steps, scenarios[0].ruleIds);
renderLiveBoard();
bindEvents();
