# 🎰 Zufallsautomat

Eine kleine Webseite, die einen Spielautomaten nachbildet: Man zieht am Hebel,
die Walzen drehen sich kurz und anschließend spielt der Automat eine
zufällige Audiodatei aus einer festgelegten Auswahl ab.

Reines HTML/CSS/JS ohne Build-Schritt und ohne Backend – läuft direkt über
**GitHub Pages**.

## Live-Demo einrichten (GitHub Pages)

1. Repository auf GitHub erstellen und diese Dateien hochladen (siehe unten).
2. In den Repo-Einstellungen zu **Settings → Pages** gehen.
3. Unter **Branch** den Branch `main` und den Ordner `/ (root)` auswählen,
   speichern.
4. Nach kurzer Zeit ist die Seite unter
   `https://<dein-username>.github.io/<repo-name>/` erreichbar.

## Lokal hochladen

```bash
git init
git add .
git commit -m "Zufallsautomat"
git branch -M main
git remote add origin https://github.com/<dein-username>/<repo-name>.git
git push -u origin main
```

## Projektstruktur

```
.
├── index.html          Seite mit Hebel, Walzen und Anzeigefeld
├── css/
│   └── style.css        Vintage-Automaten-Design
├── js/
│   └── script.js         Hebel-Logik, Walzen-Animation, Zufallsauswahl
├── audio/
│   ├── jackpot.wav
│   ├── muenzregen.wav
│   ├── glocke.wav
│   ├── applaus.wav
│   └── niete.wav
└── README.md
```

Die mitgelieferten `.wav`-Dateien sind einfache, synthetisch erzeugte
Platzhaltersounds (Sinustöne/Rauschen), damit das Repository sofort
funktioniert. Sie lassen sich problemlos durch eigene Sounds ersetzen.

## Eigene Sounds hinzufügen

1. Audiodatei (z. B. `.mp3` oder `.wav`) in den Ordner `audio/` legen.
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

## Bedienung

- Mit der Maus/dem Finger auf den Hebel klicken bzw. tippen.
- Per Tastatur: Hebel fokussieren (Tab) und `Leertaste` oder `Enter` drücken.
- Browser blockieren Audiowiedergabe teils, bevor die Seite einmal angeklickt
  wurde – ein zweiter Hebelzug reicht dann in der Regel.

## Lizenz

Nutze den Code frei für eigene Projekte.

## Experiment

Dieses repository wurde komplett von Claude erstellt mit folgendem Prompt:
Ich würde gerne mit html eine Webseite bauen, bei welcher man wie im Casino an einem Automaten einen hebel zieht und dann eine random audiodatei abspielt. Die Audiodateien, sollen aus einer Auswahl stammen und das ganze soll als repository auf github funktionieren. Kannst du mir den Code dafür schreiben.
