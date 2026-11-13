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

The site itself is static. The server parts are `api/talk.mjs`, the AI conversation partner, `api/review.mjs`, which checks journal entries for mistakes, and `api/progress.mjs`, the cloud save.

1. Push the repo to GitHub and import it at vercel.com/new. Framework preset: **Other**. Leave the build command empty and the output directory at the repo root.
2. In Project → Settings → Environment Variables, add:
   - `ANTHROPIC_API_KEY`: your key from console.anthropic.com.
   - `APP_PASSCODE`: any word you choose. The app asks for it the first time she uses the AI partner, so strangers who find the URL can't spend your credits.
3. For cloud save: Project → Storage → Create Database → **Upstash for Redis** (the free plan is plenty) and connect it to this project. That adds `KV_REST_API_URL` and `KV_REST_API_TOKEN` for you. Cloud save also needs `APP_PASSCODE`.
4. For scroll reminders (below), add three more variables:
   - `VAPID_PUBLIC_KEY` and `VAPID_PRIVATE_KEY`: run `npx web-push generate-vapid-keys` once and paste the two keys. Never change them afterwards, or her phone stops getting reminders until she turns them on again.
   - `CRON_SECRET`: any long random string. Vercel sends it with the cron call so nobody else can trigger reminders.
   - Optional: `VAPID_SUBJECT`, a contact for Apple's and Google's push services (`mailto:you@…`). Without it the site's address is used.
   The every-minute cron job in `vercel.json` needs Vercel Pro (Hobby only runs crons once a day).
5. Redeploy so the variables take effect.

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
- **Review** (`js/screens.js`, engine in `js/core.js`): spaced repetition for every lesson word and the reading words.
  - Four answers: Again, Hard, Good and Easy. Each button shows when the word will come back (1, 3, 7, 14, 30, 60 or 120 days).
  - A word she misses comes round again later in the same session until she gets it.
  - New words come in at most 10 a day (Me → New words a day: 5-20), with today's 3 words first, instead of all 300 at once.
  - "✍️ Type it" asks her to write the English word from the Spanish and the meaning.
  - The deck at a glance: new, learning, known and mastered, and how many words come back each day this week.
- **Today's 3 words** (`js/daily.js`, picked by `js/daily-pick.js`): three words a day on the home page. The new reading words come first, then every other word in a fixed order. At #/daily she sees each word with its pronunciation, says it out loud, then does a 10-question quiz: meaning, Spanish to English, fill the gap, and listen and spell. The first quiz of the day grades the 3 words in Review.
  - **3 words a day notifications** (Me → 3 words a day): one at 9:00, 14:00 and 19:00 (or earlier or later), each with one of today's words and how to say it; the last opens the quiz. They use the same push setup and cron as the scroll reminders but need no Shortcuts. A reminder more than 2 hours late is skipped.
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
- **Songs** (`data/songs.js`, `js/songs.js`, `js/music.js`): six original C1 songs, two calm, two samba and two salsa, at #/songs. The music is synthesised live with Web Audio (no audio files, works offline). Karaoke lyrics light up line by line over a visualiser that dances to the beat; a voice can read each line as it comes, and there's a slower tempo. Tap an underlined expression for its meaning; each song lists its key expressions and grammar, and has a fill-the-gap quiz (also in Games → Song quiz).
- **Sung songs** (`audio/songs/`, made by `tools/songs.mjs`): four B2 songs, two salsa and two bossa nova, really sung, each built around 7-8 new words, with karaoke lyrics, a visualiser that reacts to the recording, a slower speed, and the same word cards, grammar notes and quiz. They need the internet the first time they're played.
- **B2 word list** (`data/wordlist.js`, `js/words.js`): 118 words and phrases at #/words: linking words like “beyond”, verbs, describing words, useful phrases, and two groups of words from her reading. Each can be added to Review, and each group has a quiz (also in Games → B2 words).
  - Every word has its British IPA (/ˈwɪzdəm/) and an easy respelling (WIZ-dum), a 🐢 slow button and a 🎙️ “Say it” check that listens and tells her whether it heard the word (+2 XP the first time).
- **Explanations** (`data/explain.js`, `js/explain.js`): seven “but why?” answers at #/explain, such as why “to” comes after a verb, make vs do and for/since/ago, each with right and wrong examples, a tip for Spanish speakers and a quick check.
- **Pictures** (`img/`, made by `tools/images.py`): 22 story scenes and 96 word pictures (2.2 MB, WebP). They're cached for offline use after the first visit. They appear on word cards, stories, flashcards, the word of the day, the tap-a-word pop-up and the "Picture this" game. To add one, put a prompt in `tools/images.py`, generate `img/raw/<id>.png`, then run `python tools/images.py build`.
- **Journal:** her writing from each lesson, plus free writing with a prompt of the day. "✨ Check my English" on any entry (`js/review.js`, `api/review.mjs`) crosses out each mistake, shows the fix beside it with a short reason, and gives a corrected version; the result is saved with the entry.
- **Scroll reminders** (`js/nudge.js`, `api/nudge.mjs`, `api/nudge-tick.mjs`, facts in `data/nudges.js`): while she's on TikTok or Instagram, a notification every 5 minutes with a word from the lessons or the B2 list and a sourced fact about social media. Tapping it opens #/nudge: the word (with Add to Review and +5 XP), the full fact with its source, and a way into Review or the next lesson.
  - The app can't see other apps, so two iPhone Shortcuts automations (TikTok/Instagram "Is Opened" and "Is Closed", each running "Get Contents of URL") tell the server. Me → Scroll reminders turns notifications on and shows the steps and both links.
  - Vercel Cron calls `api/nudge-tick` every minute and sends whatever is due (scroll reminders and the 3 words a day). Leaving the app for under 3 minutes doesn't restart the count; a session with no "closed" call ends after 3 hours.
  - Needs iOS 16.4+ and the app opened from the home screen (iPhone only allows web notifications there). `node test/nudge.test.mjs` checks the server logic.
- **Me:** her estimated CEFR level, XP and levels, daily goal, streak (with streak freezes), badges, voice, speed and sound settings, and backup/restore.
- Read-aloud uses the phone's own voices (British if there is one), so it works offline. Recording uses the microphone and stays on the phone.

## Personal touch

Edit `data/profile.js` and set `note` and `from` to leave her a message on the home screen. It shows until she closes it.

## Changing content

- The format is in `CONTENT.md`. British English throughout.
- After editing content, run `node test/content.test.js`.
- A new unit file also needs a `<script>` tag in `index.html` and an entry in `sw.js`. `node test/files.test.js` checks this.
- After changing any file, bump `VERSION` in `sw.js` so installed copies update.

Progress stays on the phone. There are no accounts and no analytics. What's sent anywhere: the text of AI conversations (to your Vercel function and on to the Anthropic API) and, with scroll reminders on, when TikTok/Instagram are opened and closed (to your Vercel function and Redis, kept for 3 days).
