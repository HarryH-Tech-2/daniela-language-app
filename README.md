# ¡Dale, Dani!

Daniela's English app: from B1 to C1, built around Barranquilla, dancing, cooking, law, dogs and her friends.
Plain HTML, CSS and JavaScript, with no build step. It works offline once it has been opened once, and it can be added
to the home screen on iPhone and Android.

## Run it

```
python -m http.server 8650
```

Then open http://localhost:8650. Offline support needs http(s), so opening `index.html` straight from disk works but skips it.

## Deploy (Vercel)

The site itself is static. The server parts are `api/talk.mjs`, the AI conversation partner, and `api/progress.mjs`, the cloud save.

1. Push the repo to GitHub and import it at vercel.com/new. Framework preset: **Other**. Leave the build command empty and the output directory at the repo root.
2. In Project → Settings → Environment Variables, add:
   - `ANTHROPIC_API_KEY`: your key from console.anthropic.com.
   - `APP_PASSCODE`: any word you choose. The app asks for it the first time she uses the AI partner, so strangers who find the URL can't spend your credits.
3. For cloud save: Project → Storage → Create Database → **Upstash for Redis** (the free plan is plenty) and connect it to this project. That adds `KV_REST_API_URL` and `KV_REST_API_TOKEN` for you. Cloud save also needs `APP_PASSCODE`.
4. Redeploy so the variables take effect.

She never logs in to Vercel. The app keeps one copy of her progress in Redis, behind the passcode. It saves 15 seconds after a change and when she leaves the app. On a new phone: Me → Cloud save → type the passcode → Restore from cloud. An automatic save never replaces a cloud copy that has more XP; only "Save now" can.

Or use the CLI: `npx vercel` and then `npx vercel --prod`.

The AI partner uses Claude Opus 5.5 at low effort (fast replies) with structured JSON output. A conversation costs roughly 1-3 US cents. Without a key, or offline, conversations automatically switch to the practice scripts.

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
- **10 games** (`js/games.js`, data in `data/games.js`):
  - Picture this
  - Falsos amigos
  - Correct or not? (classic Colombian mistakes)
  - Speed round
  - Save the puppy (hangman with balloons)
  - Ship or sheep? (minimal pairs, read aloud)
  - Idioms
  - Phrasal match
  - Memory
  - Dictation
- **Talk** (`js/talk.js`, `data/talks.js`, `api/talk.mjs`): 14 spoken role-plays from B1+ to C1, such as a London café, the vet with Lola, a paralegal interview, a housing solicitor, a law conference and a Carnaval podcast. She taps 🎙️ and speaks; voice typing uses the browser's speech recognition (Chrome and Safari), otherwise the keyboard's dictation button. The partner answers out loud.
  - With the AI partner, the conversation is free-flowing and she gets one gentle correction per turn and "How did I do?" feedback at the end.
  - Without it, she gets a scripted conversation that suggests better answers.
- **Pictures** (`img/`, made by `tools/images.py`): 22 story scenes and 96 word pictures (2.2 MB, WebP). They're cached for offline use after the first visit. They appear on word cards, stories, flashcards, the word of the day, the tap-a-word pop-up and the "Picture this" game. To add one, put a prompt in `tools/images.py`, generate `img/raw/<id>.png`, then run `python tools/images.py build`.
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

Progress stays on the phone. There are no accounts and no analytics. The only thing sent anywhere is the text of AI conversations, which goes to your Vercel function and on to the Anthropic API.
