# 🎰 Audio Casino

An interactive slot machine that plays a random audio clip every time you pull the lever.

Each sound is represented by its own unique emoji, making it easy to identify the selected audio on the display. The remaining reels are filled with six - seven emojis (just for the giggles.

## Usage

Using the Audio Casino couldn't be easier:

1. Turn your speakers or headphones up to the full volume.
2. Pull the lever.
3. Enjoy the randomly selected sound!

## Project Structure

```text
.
├── index.html            Main page containing the slot machine, lever, reels, and display
├── css/
│   └── style.css         Style of the slot machine, ect.
├── js/
│   └── script.js         Slot logic, reel animations, and random sound selection
├── audio/                Add your own audio files here
│   └── testlib/          Test library containing placeholder sounds
│       ├── jackpot.wav
│       ├── coin-rain.wav
│       ├── bell.wav
│       ├── applause.wav
│       └── miss.wav
└── README.md
```

The included `.wav` files are simple synthetic placeholder sounds (sine waves and noise) so the project works immediately after cloning. They are intended for testing and can easily be replaced with your own audio files.

## Adding Your Own Sounds

1. Copy your audio file (for example, `.mp3` or `.wav`) into the `audio/` directory.

   > **Important:** Audio files placed in this folder are subject to copyright. Make sure you have the rights to use them. The bundled custom MP3 files are intended for use by their creator only and must not be redistributed or used by third parties.

2. Add a new entry to the `SOUND_LIBRARY` array in `js/script.js`:

```javascript
const SOUND_LIBRARY = [
  { file: "audio/jackpot.wav", label: "Jackpot!", symbol: "🎉" },
  { file: "audio/my-sound.mp3", label: "My Sound", symbol: "🎵" },
  // Additional entries...
];
```

Each entry consists of:

* **`file`** – Path to the audio file relative to `index.html`
* **`label`** – Text displayed after the reels stop spinning
* **`symbol`** – Emoji or character shown on the center reel

3. Save the file. Your new sound will now be included in the random selection.

To remove a sound, simply delete its entry from `SOUND_LIBRARY` and optionally remove the corresponding audio file from the `audio/` directory.

## License

The source code may be freely used, modified, and incorporated into your own projects.

Please note that the audio files (all mp3-files / linked files from the web) referenced in the `SOUND_LIBRARY` (especially custom audio files provided by the repository owner) are **not** covered by this permission and may **not** be used, redistributed, or included in third-party projects without explicit permission from their respective copyright holder.
