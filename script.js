const MY_SITE = {
    siteName: "little blue planet",
    name: "sophel",
    intro: "just a mini intro page i made",
    about: "tibetan american, i like coding(sometimes)",
    musicInterest: "i loveee jane remover, wisp, and deftones! i also love listening to lucy bedroque, julie, and mymp!",
    hobbyInterest: "i love watching (horror) game playthroughs from youtubers like coryxkenshin and antonychenn! i also like dance ^^",
    favoritesInterest: "i looooovvvveeeee resident evil, silent hill, soul eater omniscient reader's viewpoint, wuthering waves, got dropped in a ghost story still gotta work, milky subway, anime, and webtoons. currently trying to cosplay maka albarn!",
    obsessionInterest: "currently obsessed with meow man on webtoon and this shoujo manga glasses with a chance of delinquent!",
    listening: "flash in the pan - jane remover",
    craving: "chesters hot fries",
    mood: "sophomore slump is real",
    doing: "making this site rn :p",
    diary: [
        { date: "october 18, 2026", title: "hello, world!", text: "wowow first entry on this new site :33 happy browsing~"},
        { date: "a little while ago", title: "currently loving...", text: "glasses with a chance of delinquent is sooo peak! luv shoujo manga"}
    ],
    links: [
        { label: "📷 instagram", url: "https://www.instagram.com/sophdlu?dlrf=MXdkdnF2Y2hhZ2c1dg%3D%3D&utm_source=qr" },
        { label: "📌 pinterest", url: "https://pin.it/2AKNBpEp3" },
        { label: "💻 github", url: "https://github.com/sopheldalulu" },
        { label: "🏷️ slack", url: "https://hackclub.enterprise.slack.com/team/U0AR2L81TEH" }
    ],
    songs: [
    { name: "sakura - devon hendryx", path: "assets/sakura.mp3" },
    { name: "angles in camo - jane remover", path: "assets/angelsincamo.mp3" },
    { name: "serpentine - wisp", path: "assets/serpentine.mp3" },
    { name: "swerve city - deftones", path: "assets/swervecity.mp3" }
  ],
  bubbleCursor: true
};

document.querySelectorAll('[data-edit]').forEach(element => {
  const value = MY_SITE[element.dataset.edit];
  if (typeof value === 'string') element.textContent = value;
});
document.title = `${MY_SITE.siteName} ✿ my little corner of the internet`;
document.getElementById('year').textContent = new Date().getFullYear();

const diaryRoot = document.getElementById('diary-entries');
MY_SITE.diary.forEach(entry => {
  const article = document.createElement('article');
  article.className = 'diary-entry';
  const date = document.createElement('div'); date.className = 'diary-date'; date.textContent = `✧ ${entry.date}`;
  const heading = document.createElement('h3'); heading.textContent = entry.title;
  const paragraph = document.createElement('p'); paragraph.textContent = entry.text;
  article.append(date, heading, paragraph);
  diaryRoot.append(article);
});
const socialRoot = document.getElementById('social-links');
MY_SITE.links.forEach(link => {
  const a = document.createElement('a');
  a.textContent = link.label;
  a.href = link.url;
  if (/^https?:\/\//i.test(link.url)) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
  socialRoot.append(a);
});


let watering = 0;
document.getElementById('grow-btn').addEventListener('click', () => {
  const messages = ['the flowers say thank you! 🌱', 'a tiny butterfly visits! 🦋', 'the garden is extra happy! 🌷', 'you made the world bloom! ✿'];
  document.getElementById('garden-message').textContent = messages[watering % messages.length];
  watering++;
});


const audio = document.getElementById('audio');
const trackName = document.getElementById('track-name');
const playButton = document.getElementById('play-pause');
const seek = document.getElementById('seek');
const timeCurrent = document.getElementById('current-time');
const timeTotal = document.getElementById('total-time');
let trackIndex = 0;
const songs = MY_SITE.songs.filter(s => s.path && s.name);
const formatTime = (seconds) => Number.isFinite(seconds) ? `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}` : '0:00';
function loadTrack(index) {
  if (!songs.length) { trackName.textContent = 'add a song in script.js ♫'; return; }
  trackIndex = (index + songs.length) % songs.length;
  audio.src = songs[trackIndex].path;
  audio.load();
  trackName.textContent = `${trackIndex + 1}/${songs.length} ${songs[trackIndex].name}`;
  seek.value = 0;
  timeCurrent.textContent = '0:00';
  timeTotal.textContent = '0:00';
  playButton.textContent = '▶';
  playButton.setAttribute('aria-label', 'Play');
}
async function playCurrent() {
  if (!songs.length) return;
  try { await audio.play(); }
  catch (err) { trackName.textContent = 'could not play this file ♡'; console.warn('Audio failed:', err); }
}
playButton.addEventListener('click', () => audio.paused ? playCurrent() : audio.pause());
document.getElementById('previous').addEventListener('click', () => { loadTrack(trackIndex - 1); playCurrent(); });
document.getElementById('next').addEventListener('click', () => { loadTrack(trackIndex + 1); playCurrent(); });
audio.addEventListener('play', () => { playButton.textContent = '❚❚'; playButton.setAttribute('aria-label', 'Pause'); });
audio.addEventListener('pause', () => { playButton.textContent = '▶'; playButton.setAttribute('aria-label', 'Play'); });
audio.addEventListener('ended', () => { loadTrack(trackIndex + 1); playCurrent(); });
audio.addEventListener('loadedmetadata', () => { timeTotal.textContent = formatTime(audio.duration); });
audio.addEventListener('timeupdate', () => {
  timeCurrent.textContent = formatTime(audio.currentTime);
  seek.value = Number.isFinite(audio.duration) && audio.duration > 0 ? Math.round(audio.currentTime / audio.duration * 100) : 0;
});
seek.addEventListener('input', () => { if (Number.isFinite(audio.duration) && audio.duration > 0) audio.currentTime = audio.duration * Number(seek.value) / 100; });
loadTrack(0); 


const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(pointer: fine)');
const bubbleLayer = document.getElementById('cursor-bubbles');
let lastBubble = 0;
window.addEventListener('pointermove', event => {
  if (!MY_SITE.bubbleCursor || reducedMotion.matches || !finePointer.matches) return;
  if (Date.now() - lastBubble < 32 || bubbleLayer.childElementCount > 65) return;
  lastBubble = Date.now();
  const bubble = document.createElement('span');
  bubble.className = 'cursor-bubble';
  const size = 4 + Math.random() * 9;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${event.clientX}px`;
  bubble.style.top = `${event.clientY}px`;
  bubble.style.setProperty('--dx', `${Math.random() * 44 - 22}px`);
  bubbleLayer.append(bubble);
  bubble.addEventListener('animationend', () => bubble.remove(), { once: true });
});
