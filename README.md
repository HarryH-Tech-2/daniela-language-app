# ¡Dale, Dani!

Daniela's English app: from B1 to C1, built around Barranquilla, dancing, cooking, law, dogs and her friends.
Plain HTML, CSS and JavaScript, with no build step. It works offline once it has been opened once, and it can be added
to the home screen on iPhone and Android.

## Run it

```
python -m http.server 8650
```

Then open http://localhost:8650. Offline support needs http(s), so opening `index.html` straight from disk works but skips it.

## Deploy

It's a static folder, so any static host works. Upload the whole folder (HTTPS is required for offline use):

- **Netlify:** drag the folder onto app.netlify.com/drop.
- **Cloudflare Pages / Vercel / GitHub Pages:** point them at the repo root. There's no build command and the output directory is `/`.

On her phone, open the URL once with internet, then:
- iPhone (Safari): Share → Add to Home Screen.
- Android (Chrome): ⋮ → Install app.

Installed to the home screen, the app keeps its data (iOS may clear storage for sites that are only bookmarked).
Progress lives only on her phone. Me → Backup downloads a file she can restore on a new phone.

## What's in it

- **22 lessons** (`data/units/*.js`) in four levels: B1+, B2, B2+ and C1. Each lesson has six steps:
  - **Words:** 10 words, read aloud, with Spanish revealed on tap.
  - **Story:** a reading where you tap a word to see its meaning, and record yourself reading it.
  - **Grammar:** the point, examples and a tip about the mistakes Spanish speakers usually make.
  - **Practice:** 12-14 exercises of seven kinds. Mistakes come back at the end, and the score gives stars.
  - **Speak:** questions to answer out loud and record.
  - **Write:** a short task, saved to the journal.
- **Review** (`js/screens.js`): spaced repetition for every word she has met. Words come back after 1, 3, 7, 14 and 30 days.
- **9 games** (`js/games.js`, data in `data/games.js`):
  - Falsos amigos
  - Correct or not? (classic Colombian mistakes)
  - Speed round
  - Save the puppy (hangman with balloons)
  - Ship or sheep? (minimal pairs, read aloud)
  - Idioms
  - Phrasal match
  - Memory
  - Dictation
- **Journal:** her writing from each lesson, plus free writing with a prompt of the day.
- **Me:** her estimated CEFR level, XP and levels, daily goal, streak (with streak freezes), badges, voice, speed and sound settings, and backup/restore.
- Read-aloud uses the phone's own voices (British if there is one), so it works offline. Recording uses the microphone and stays on the phone.

## Personal touch

Edit `data/profile.js` and set `note` and `from` to leave her a message on the home screen. It shows until she closes it.

## Changing content

- The format is in `CONTENT.md`. British English throughout.
- After editing content, run `node test/content.test.js`.
- A new unit file also needs a `<script>` tag in `index.html` and an entry in `sw.js`. `node test/files.test.js` checks this.
- After changing any file, bump `VERSION` in `sw.js` so installed copies update.

Nothing leaves the phone. There are no accounts, no analytics and no server.
