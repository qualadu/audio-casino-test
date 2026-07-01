# 🎰 Audio-Casino

Repository dient dem Betrieb eines Audio-Casinos. Dabei wird eine Slotmaschine nachgestellt und mit jedem Drehen wird ein "random" Sound abgespielt. Jeder Sound hat sein eigenes Emoji um es auch an der Anzeige her zu erkennen. Die restlichen Plätze an der Slotmaschine werden mit 6 7 Emojis gefüllt.

## Bedienung

Sehr sehr einfach. Lautstärke auf Maximum stellen, und am hebel ziehen.

## Projektstruktur

```
.
├── index.html            Seite mit Hebel, Walzen und Anzeigefeld
├── css/
│   └── style.css         Vintage-Automaten-Design
├── js/
│   └── script.js         Hebel-Logik, Walzen-Animation, Zufallsauswahl
├── audio/                Hier eigene Sounds einfügen (Audiodateien, welche in diesem Ordner sind, dürfen nicht von dritten verwendet wenden)
├── ├──testlib/           Testbibliotheck mit Testsounds  
│   │   ├── jackpot.wav
│   │   ├── muenzregen.wav
│   │   ├── glocke.wav
│   │   ├── applaus.wav
│   │   └── niete.wav
└── README.md
```

Die mitgelieferten `.wav`-Dateien sind einfache, synthetisch erzeugte
Platzhaltersounds (Sinustöne/Rauschen), damit das Repository sofort
funktioniert. Sie lassen sich problemlos durch eigene Sounds ersetzen.

## Eigene Sounds hinzufügen

1. Audiodatei (z. B. `.mp3` oder `.wav`) in den Ordner `audio/` legen. (Wichtig die mp3-Dateien, welche in diesem Order sind, dürfen nur vom Ersteller verwendet werden)
2. In `js/script.js` das Array `SOUND_LIBRARY` erweitern:

   ```js
   const SOUND_LIBRARY = [
     { file: "audio/jackpot.wav",  label: "Jackpot!",  symbol: "🎉" },
     { file: "audio/mein-sound.mp3", label: "Mein Sound", symbol: "🎵" },
     // weitere Einträge …
   ];
   ```

   - `file` – Pfad zur Datei relativ zu `index.html`
   - `label` – Text, der im Anzeigefeld nach dem Stopp erscheint
   - `symbol` – Emoji/Zeichen, das auf der mittleren Walze angezeigt wird

3. Speichern, fertig – der Automat wählt jetzt auch diesen Sound zufällig aus.

Einträge aus der Liste entfernen funktioniert genauso einfach: den
entsprechenden Objekt-Eintrag löschen und die zugehörige Datei bei Bedarf aus
`audio/` entfernen.

## Lizenz

Ich stelle alles, </b> ausser die mp3-Dateien im Ordner audio </b> zur freien Verfügung.
