// Makes the sung songs with ElevenLabs, then times every lyric line for the karaoke.
//
//   node tools/songs.mjs                  make any song in data/songs.js with `audio` whose mp3 is missing
//   node tools/songs.mjs --force <id>     make that song again (a new take)
//   node tools/songs.mjs --align <id>     only redo the line timings for that song
//
// Needs ELEVENLABS_API_KEY in .env (a paid plan: the Music API isn't on the free one).
// Writes audio/songs/<id>.mp3 and data/song-times.js.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const API = 'https://api.elevenlabs.io/v1';

const env = fs.existsSync(path.join(root, '.env')) ? fs.readFileSync(path.join(root, '.env'), 'utf8') : '';
const KEY = process.env.ELEVENLABS_API_KEY || (env.match(/^ELEVENLABS_API_KEY=(.+)$/m) || [])[1]?.trim();
if (!KEY) { console.error('No ELEVENLABS_API_KEY in .env'); process.exit(1); }

function load(file) {
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(root, file), 'utf8'), sandbox);
  return sandbox.window;
}
const SONGS = load('data/songs.js').SONGS.filter((s) => s.audio);
const timesFile = path.join(root, 'data/song-times.js');
const TIMES = fs.existsSync(timesFile) ? load('data/song-times.js').SONG_TIMES || {} : {};

const args = process.argv.slice(2);
const force = args[0] === '--force' ? args[1] : null;
const alignOnly = args[0] === '--align' ? args[1] : null;

const INTRO_MS = 8000, OUTRO_MS = 8000;
const LOCAL = {
  Chorus: ['full band', 'catchy, memorable chorus', 'backing vocals'],
  Bridge: ['softer and stripped back', 'more intimate'],
  'Verse 1': ['the singer comes in clearly'],
  'Verse 2': ['same groove as verse 1']
};

function plan(song) {
  const sections = [{ section_name: 'Intro', positive_local_styles: ['instrumental intro', 'no vocals'], negative_local_styles: ['vocals'], duration_ms: INTRO_MS, lines: [] }];
  song.parts.forEach((p) => sections.push({
    section_name: p.part,
    positive_local_styles: LOCAL[p.part] || [],
    negative_local_styles: [],
    duration_ms: Math.max(3000, Math.round(p.lines.length * song.lineSec * 1000)),
    lines: p.lines
  }));
  sections.push({ section_name: 'Outro', positive_local_styles: ['instrumental outro', 'gentle fade out', 'no vocals'], negative_local_styles: ['vocals'], duration_ms: OUTRO_MS, lines: [] });
  return {
    positive_global_styles: song.sound,
    negative_global_styles: ['rap', 'spoken word', 'autotune', 'heavy distortion', 'electronic dance music', 'mumbled lyrics', 'Spanish lyrics'],
    sections
  };
}

async function compose(song) {
  const composition_plan = plan(song);
  const ms = composition_plan.sections.reduce((n, s) => n + s.duration_ms, 0);
  console.log(`♪ composing ${song.id} (${Math.round(ms / 1000)} s)…`);
  const res = await fetch(`${API}/music?output_format=mp3_44100_128`, {
    method: 'POST',
    headers: { 'xi-api-key': KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ composition_plan, model_id: 'music_v1', respect_sections_durations: true })
  });
  if (!res.ok) throw new Error(`compose ${song.id}: ${res.status} ${(await res.text()).slice(0, 1500)}`);
  const out = path.join(root, song.audio);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, Buffer.from(await res.arrayBuffer()));
  console.log(`  saved ${song.audio} (${(fs.statSync(out).size / 1e6).toFixed(1)} MB)`);
  return ms / 1000;
}

const norm = (w) => w.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]/g, '');

async function align(song, dur) {
  console.log(`⏱  timing ${song.id}…`);
  const lines = song.parts.flatMap((p) => p.lines);
  const form = new FormData();
  form.append('file', new Blob([fs.readFileSync(path.join(root, song.audio))], { type: 'audio/mpeg' }), song.id + '.mp3');
  form.append('text', lines.join('\n'));
  const res = await fetch(`${API}/forced-alignment`, { method: 'POST', headers: { 'xi-api-key': KEY }, body: form });
  if (!res.ok) throw new Error(`align ${song.id}: ${res.status} ${(await res.text()).slice(0, 800)}`);
  const json = await res.json();
  const got = json.words.map((w) => ({ t: norm(w.text), start: w.start, end: w.end })).filter((w) => w.t);

  // walk through the lyrics word by word, matching each to the next aligned word
  let k = 0;
  const out = lines.map((line) => {
    const mine = line.split(/\s+/).map(norm).filter(Boolean);
    let start = null, end = null;
    mine.forEach((m) => {
      let j = k;
      while (j < got.length && j < k + 4 && got[j].t !== m) j++;
      if (j >= got.length || j >= k + 4) j = k; // no match nearby: assume it's the next one
      if (got[j]) { if (start === null) start = got[j].start; end = got[j].end; k = j + 1; }
    });
    return [+(start ?? 0).toFixed(2), +(end ?? start ?? 0).toFixed(2)];
  });
  const prev = TIMES[song.id] || {};
  TIMES[song.id] = { dur: dur || prev.dur || Math.ceil(got.at(-1)?.end + 8), loss: +json.loss.toFixed(3), lines: out };
  console.log(`  ${out.length} lines, first at ${out[0][0]} s, last ends ${out.at(-1)[1]} s, loss ${json.loss.toFixed(3)}`);
}

function save() {
  const body = Object.keys(TIMES).sort().map((id) => {
    const t = TIMES[id];
    return `  '${id}': { dur: ${t.dur}, loss: ${t.loss}, lines: [\n${t.lines.map((l) => `    [${l[0]}, ${l[1]}]`).join(',\n')}\n  ] }`;
  }).join(',\n');
  fs.writeFileSync(timesFile,
    '// When each lyric line of the sung songs starts and ends, in seconds. Made by\n' +
    '// tools/songs.mjs (ElevenLabs forced alignment); do not edit by hand.\n' +
    'window.SONG_TIMES = {\n' + body + '\n};\n');
}

let failed = 0;
for (const song of SONGS) {
  const file = path.join(root, song.audio);
  try {
    if (alignOnly) { if (song.id === alignOnly) { await align(song); save(); } continue; }
    let dur = null;
    if (!fs.existsSync(file) || force === song.id) dur = await compose(song);
    if (dur || !TIMES[song.id]) { await align(song, dur); save(); }
  } catch (e) { failed++; console.error('✗ ' + e.message); }
}
console.log(failed ? `${failed} song(s) failed.` : 'Done.');
process.exit(failed ? 1 : 0);
