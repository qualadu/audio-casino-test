/**
 * Auswahl der Audiodateien.
 * Neue Sounds hinzufügen: Datei in den Ordner "audio/" legen
 * und hier einen weiteren Eintrag ergänzen.
 *   file  -> Pfad relativ zu index.html
 *   label -> Text, der im Anzeigefeld erscheint
 *   symbol -> Emoji/Zeichen für die Walzen
 */
const SOUND_LIBRARY = [
  /* ##Testlibrary
  { file: "audio/testlib/jackpot.wav",    label: "Jackpot!",        symbol: "⚡" },
  { file: "audio/testlib/muenzregen.wav", label: "Münzregen",       symbol: "🥤" },
  { file: "audio/testlib/glocke.wav",     label: "Glocke",          symbol: "🧊" },
  { file: "audio/testlib/applaus.wav",    label: "Applaus",         symbol: "❄️" },
  { file: "audio/testlib/niete.wav",      label: "Nochmal!",        symbol: "🔋" },
  */
  { file: "https://www.fahrschule-alfonso.ch/wp-content/uploads/2026/07/bruahh_brrrh.mp3",      label: "🫧🫧🫧🫧",        symbol: "🫧" },
  { file: "https://www.fahrschule-alfonso.ch/wp-content/uploads/2026/07/bruahhh.mp3",           label: "🦴🦴🦴🦴",        symbol: "🦴" },
  { file: "https://www.fahrschule-alfonso.ch/wp-content/uploads/2026/07/chuhhp.mp3",            label: "🐽🐽🐽🐽",        symbol: "🐽" },
  { file: "https://www.fahrschule-alfonso.ch/wp-content/uploads/2026/07/huachp.mp3",            label: "😼😼😼😼",        symbol: "😼" },
  { file: "https://www.fahrschule-alfonso.ch/wp-content/uploads/2026/07/luuhhp.mp3",            label: "👣👣👣👣",        symbol: "👣" },
  { file: "https://www.fahrschule-alfonso.ch/wp-content/uploads/2026/07/phuph.mp3",             label: "💨💨💨💨",        symbol: "💨" },
];

const leverBtn   = document.getElementById("leverBtn");
const leverArm   = document.getElementById("leverArm");
const readout    = document.getElementById("readout");
const reels      = [
  document.getElementById("reel1"),
  document.getElementById("reel2"),
  document.getElementById("reel3"),
];
const bulbRow = document.getElementById("bulbRow");

// Lichterkette erzeugen
const BULB_COUNT = 16;
const bulbs = [];
for (let i = 0; i < BULB_COUNT; i++) {
  const b = document.createElement("span");
  b.className = "bulb";
  bulbRow.appendChild(b);
  bulbs.push(b);
}

let isSpinning = false;
let bulbTimer = null;

function randomSound() {
  const i = Math.floor(Math.random() * SOUND_LIBRARY.length);
  return SOUND_LIBRARY[i];
}

function randomSymbolExcept() {
  const pool = ["6️⃣", "⚅", "6️", "7️", "7️⃣"];
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
  if (isSpinning) return;
  isSpinning = true;

  const chosen = randomSound();

  leverBtn.classList.add("pulled");
  reels.forEach((r) => r.classList.add("spinning"));
  chaseLights(true);
  readout.textContent = "Dreht …";

  // Hebel geht nach kurzer Zeit wieder in Ruheposition zurueck
  setTimeout(() => leverBtn.classList.remove("pulled"), 380);

  // Walzen laufen lassen, dann auf dem gewaehlten Symbol stoppen
  const spinDuration = 1100;
  const stopDelays = [spinDuration, spinDuration + 220, spinDuration + 440];

  reels.forEach((reel, idx) => {
    setTimeout(() => {
      reel.classList.remove("spinning");
      const span = reel.querySelector("span");
      span.textContent = idx === 1 ? chosen.symbol : randomSymbolExcept();
    }, stopDelays[idx]);
  });

  setTimeout(() => {
    chaseLights(false);
    stopLightsSettled();
    readout.textContent = chosen.label;

    const audio = new Audio(chosen.file);
    audio.play().catch(() => {
      readout.textContent = chosen.label + " (Audio blockiert – bitte Seite anklicken)";
    });

    isSpinning = false;
  }, stopDelays[2] + 150);
}

leverBtn.addEventListener("click", pullLever);
leverBtn.addEventListener("keydown", (e) => {
  if (e.key === " " || e.key === "Enter") {
    e.preventDefault();
    pullLever();
  }
});
