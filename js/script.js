/**
 * Auswahl der Audiodateien.
 * Neue Sounds hinzufügen: Datei in den Ordner "audio/" legen
 * und hier einen weiteren Eintrag ergänzen.
 */
const SOUND_LIBRARY = [
  { file: "https://www.fahrschule-alfonso.ch/wp-content/uploads/2026/07/bruahh_brrrh.mp3", label: "🫧🫧🫧🫧", symbol: "🫧", coins: 20 },
  { file: "https://www.fahrschule-alfonso.ch/wp-content/uploads/2026/07/bruahhh.mp3", label: "🦴🦴🦴🦴", symbol: "🦴", coins: 10 },
  { file: "https://www.fahrschule-alfonso.ch/wp-content/uploads/2026/07/chuhhp.mp3", label: "🐽🐽🐽🐽", symbol: "🐽", coins: 5 },
  { file: "https://www.fahrschule-alfonso.ch/wp-content/uploads/2026/07/huachp.mp3", label: "😼😼😼😼", symbol: "😼", coins: 0 },
  { file: "https://www.fahrschule-alfonso.ch/wp-content/uploads/2026/07/luuhhp.mp3", label: "👣👣👣👣", symbol: "👣", coins: 15 },
  { file: "https://www.fahrschule-alfonso.ch/wp-content/uploads/2026/07/phuph.mp3", label: "💨💨💨💨", symbol: "💨", coins: 0 },
];

// === Coins System ===
let balance = 100;

function getBalanceElement() {
  return document.getElementById("balance");
}

function updateBalanceDisplay() {
  const el = document.getElementById("balance");
  if (el) el.textContent = `${balance} 🪙`;
  updateCostIndicator();
  updateLeverState();
}

function updateCostIndicator() {
  const indicator = document.getElementById("costIndicator");
  if (!indicator) return;
  if (balance < 5) {
    indicator.classList.add("low-coins");
    indicator.querySelector(".cost-text").innerHTML = `Nicht genug Coins! <strong>5 🪙</strong> benötigt`;
  } else {
    indicator.classList.remove("low-coins");
    indicator.querySelector(".cost-text").innerHTML = `Spin kostet <strong>5 🪙</strong>`;
  }
}

function updateLeverState() {
  const lever = document.getElementById("leverBtn");
  if (lever) {
    lever.classList.toggle("disabled", balance < 5);
    lever.disabled = balance < 5;
  }
}

function deductSpinCost() {
  balance -= 5;
  updateBalanceDisplay();
}

function addWinCoins(sound) {
  balance += sound.coins || 0;
  updateBalanceDisplay();
  
  const readout = document.getElementById("readout");
  readout.style.transition = "color 0.3s";
  readout.style.color = "#ffd700";
  setTimeout(() => {
    readout.style.color = "var(--accent)";
  }, 1200);
}

// === DOM Elemente ===
const leverBtn   = document.getElementById("leverBtn");
const readout    = document.getElementById("readout");
const reels      = [
  document.getElementById("reel1"),
  document.getElementById("reel2"),
  document.getElementById("reel3"),
];

const START_COMBINATION = ["6️⃣", "7️⃣", "⁶🤷‍♂️⁷"];

// === Reel Funktionen ===
function reelSymbolPool() {
  return SOUND_LIBRARY.map((s) => s.symbol).concat(["6️⃣", "⚅", "7️⃣", "⁶🤷‍♂️⁷"]);
}

function initReels() {
  reels.forEach((reel, idx) => {
    const strip = reel.querySelector(".reel-strip");
    const itemHeight = reel.clientHeight;
    strip.innerHTML = "";
    const span = document.createElement("span");
    span.style.height = itemHeight + "px";
    span.textContent = START_COMBINATION[idx];
    strip.appendChild(span);
    strip.style.transition = "none";
    strip.style.transform = "translateY(0px)";
  });
}

function spinReel(reel, finalSymbol, duration) {
  const strip = reel.querySelector(".reel-strip");
  const itemHeight = reel.clientHeight;
  const pool = reelSymbolPool();
  const fillerCount = 22;

  strip.style.transition = "none";
  strip.style.transform = "translateY(0px)";
  strip.innerHTML = "";

  const frag = document.createDocumentFragment();
  for (let i = 0; i < fillerCount; i++) {
    const span = document.createElement("span");
    span.style.height = itemHeight + "px";
    span.textContent = pool[Math.floor(Math.random() * pool.length)];
    frag.appendChild(span);
  }
  const finalSpan = document.createElement("span");
  finalSpan.style.height = itemHeight + "px";
  finalSpan.textContent = finalSymbol;
  frag.appendChild(finalSpan);
  strip.appendChild(frag);

  const totalItems = fillerCount + 1;
  const targetY = -(itemHeight * (totalItems - 1));

  strip.offsetHeight;
  requestAnimationFrame(() => {
    strip.style.transition = `transform ${duration}ms cubic-bezier(0.15, 0.85, 0.32, 1)`;
    strip.style.transform = `translateY(${targetY}px)`;
  });
}

// === Lichterkette ===
const bulbRow = document.getElementById("bulbRow");
const bulbs = [];
const BULB_SIZE = 10;
const BULB_MIN_GAP = 6;

function calcBulbCount(width) {
  return Math.floor(width / (BULB_SIZE + BULB_MIN_GAP));
}

function buildBulbs() {
  const width = bulbRow.getBoundingClientRect().width;
  const count = Math.max(8, calcBulbCount(width));
  bulbRow.innerHTML = "";
  bulbs.length = 0;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const b = document.createElement("span");
    b.className = "bulb";
    frag.appendChild(b);
    bulbs.push(b);
  }
  bulbRow.appendChild(frag);
}

buildBulbs();

const resizeObserver = new ResizeObserver(() => buildBulbs());
resizeObserver.observe(document.body);

window.addEventListener("resize", () => {
  buildBulbs();
  if (!isSpinning) initReels();
});

let isSpinning = false;
let bulbTimer = null;

// === Gewichtete Zufallsauswahl ===
function randomSound() {
  if (SOUND_LIBRARY.length === 0) return SOUND_LIBRARY[0];

  const groups = {
    zero: SOUND_LIBRARY.filter(s => s.coins === 0),
    low: SOUND_LIBRARY.filter(s => s.coins >= 1 && s.coins <= 10),
    medium: SOUND_LIBRARY.filter(s => s.coins >= 11 && s.coins <= 15),
    high: SOUND_LIBRARY.filter(s => s.coins >= 16)
  };

  const rand = Math.random() * 100;

  let selectedGroup;
  if (rand < 40) selectedGroup = groups.zero;
  else if (rand < 70) selectedGroup = groups.low;
  else if (rand < 90) selectedGroup = groups.medium;
  else selectedGroup = groups.high;

  if (selectedGroup.length === 0) selectedGroup = SOUND_LIBRARY;

  return selectedGroup[Math.floor(Math.random() * selectedGroup.length)];
}

function randomSymbolExcept() {
  const pool = ["6️⃣", "⚅", "6️", "7️", "7️⃣", "⁶🤷‍♂️⁷"];
  return pool[Math.floor(Math.random() * pool.length)];
}

function chaseLights(active) {
  if (bulbTimer) clearInterval(bulbTimer);
  if (!active) {
    bulbs.forEach((b) => b.classList.remove("lit"));
    return;
  }
  let step = 0;
  bulbTimer = setInterval(() => {
    bulbs.forEach((b, idx) => {
      b.classList.toggle("lit", idx % 4 === step % 4);
    });
    step++;
  }, 90);
}

function stopLightsSettled() {
  if (bulbTimer) clearInterval(bulbTimer);
  bulbs.forEach((b) => b.classList.add("lit"));
  setTimeout(() => bulbs.forEach((b) => b.classList.remove("lit")), 700);
}

function pullLever() {
  if (isSpinning || balance < 5) return;

  isSpinning = true;
  deductSpinCost();

  const chosen = randomSound();

  leverBtn.classList.add("pulled");
  chaseLights(true);
  readout.textContent = "Dreht …";

  setTimeout(() => leverBtn.classList.remove("pulled"), 380);

  const spinDuration = 1100;
  const stopDelays = [spinDuration, spinDuration + 220, spinDuration + 440];

  reels.forEach((reel, idx) => {
    const finalSymbol = idx === 1 ? chosen.symbol : randomSymbolExcept();
    reel.classList.add("spinning");
    reel.classList.remove("bounce");
    spinReel(reel, finalSymbol, stopDelays[idx]);

    setTimeout(() => {
      reel.classList.remove("spinning");
      reel.classList.add("bounce");
      setTimeout(() => reel.classList.remove("bounce"), 280);
    }, stopDelays[idx]);
  });

  setTimeout(() => {
    chaseLights(false);
    stopLightsSettled();
    readout.textContent = chosen.label;

    const audio = new Audio(chosen.file);
    audio.play().catch(() => {
      readout.textContent = chosen.label + " (Audio blockiert)";
    });

    addWinCoins(chosen);
    isSpinning = false;
  }, stopDelays[2] + 150);
}

// Event Listener
leverBtn.addEventListener("click", pullLever);
leverBtn.addEventListener("keydown", (e) => {
  if (e.key === " " || e.key === "Enter") {
    e.preventDefault();
    pullLever();
  }
});

window.addEventListener("DOMContentLoaded", () => {
  initReels();
  updateBalanceDisplay();
});
