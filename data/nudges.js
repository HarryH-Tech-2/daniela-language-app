// Scroll reminders: the facts that go in the notifications sent while she's on TikTok or
// Instagram (api/nudge.mjs), and on the page they open (#/nudge, js/nudge.js).
// Every fact must be true and say where it comes from. `short` goes in the notification
// (keep it under ~110 characters); `long` is shown on the page with the source link.
// {mins} in `short` becomes how long she has been scrolling this time.
window.NUDGE_FACTS = [
  {
    id: 'tiktok-95',
    short: 'People spend about 95 minutes a day on TikTok. That’s 24 whole days a year.',
    long: 'In 2022 the average TikTok user around the world spent about 95 minutes a day in the app, more than on any other social media app (YouTube was 74 minutes, Instagram 51). 95 minutes a day adds up to about 580 hours a year: 24 full days.',
    source: 'Sensor Tower, “TikTok power user curve” (Q2 2022)',
    url: 'https://sensortower.com/blog/tiktok-power-user-curve'
  },
  {
    id: 'instagram-51',
    short: 'The average person spends 51 minutes a day on Instagram: over 300 hours a year.',
    long: 'In 2022 people around the world spent an average of 51 minutes a day on Instagram. That is about 310 hours a year: almost 13 full days.',
    source: 'Sensor Tower data, via Statista (Q2 2022)',
    url: 'https://www.statista.com/statistics/1322876/social-media-apps-time-spent-global/'
  },
  {
    id: 'attention-47',
    short: 'Our attention on a screen now lasts 47 seconds on average. In 2004 it was 2½ minutes.',
    long: 'Gloria Mark, a psychologist at the University of California, Irvine, has measured how long people stay on one screen before switching. In 2004 it was about two and a half minutes. In studies from 2016 to 2020 the average was 47 seconds. Short videos train us to switch even faster.',
    source: 'Gloria Mark, “Attention Span” (2023), University of California',
    url: 'https://www.universityofcalifornia.edu/news/how-sharpen-your-attention-and-meet-your-goals-2024'
  },
  {
    id: 'fomo-30',
    short: 'Students who cut social media to 30 min a day for 3 weeks felt less lonely and less depressed.',
    long: 'At the University of Pennsylvania, 143 students were split into two groups. One group limited Facebook, Instagram and Snapchat to 10 minutes each a day; the other carried on as normal. After three weeks the limited group felt significantly less lonely and less depressed, especially those who had felt worst at the start.',
    source: 'Hunt et al., “No More FOMO”, Journal of Social and Clinical Psychology (2018)',
    url: 'https://doi.org/10.1521/jscp.2018.37.10.751'
  },
  {
    id: 'facebook-colleges',
    short: 'When Facebook arrived at US universities, students’ depression symptoms went up.',
    long: 'Economists compared US universities before and after Facebook arrived at each one in the 2000s. Its arrival made students’ mental health worse, especially depression, and more students said poor mental health was hurting their studies. The likely reason: comparing yourself with other people’s perfect lives.',
    source: 'Braghieri, Levy and Makarin, “Social Media and Mental Health”, American Economic Review (2022)',
    url: 'https://www.openicpsr.org/openicpsr/project/175582'
  },
  {
    id: 'deactivate',
    short: 'People paid to quit Facebook for 4 weeks felt happier and spent more time with family and friends.',
    long: 'In a study of 2,844 Americans, some were paid to switch off Facebook for four weeks. They ended up a little happier, spent more time with family and friends, and used Facebook much less afterwards, even when they could go back.',
    source: 'Allcott, Braghieri, Eichmeyer and Gentzkow, “The Welfare Effects of Social Media”, American Economic Review (2020)',
    url: 'https://www.nber.org/papers/w25514'
  },
  {
    id: 'brain-drain',
    short: 'Just having your phone on the table makes you less clever, even when it’s switched off.',
    long: 'In experiments with nearly 800 people, those whose phone was on the desk did worse on memory and thinking tests than those whose phone was in another room. It didn’t matter if the phone was on or off, face up or face down: part of your brain is busy not checking it.',
    source: 'Ward et al., “Brain Drain”, Journal of the Association for Consumer Research (2017)',
    url: 'https://news.utexas.edu/2017/06/26/the-mere-presence-of-your-smartphone-reduces-brain-power/'
  },
  {
    id: 'teen-girls',
    short: 'Instagram’s own research: 32% of teen girls who felt bad about their bodies said it made them feel worse.',
    long: 'Instagram’s internal research, revealed by The Wall Street Journal in 2021, found that 32% of teenage girls said that when they felt bad about their bodies, Instagram made them feel worse. The company knew, and the feed stayed the same.',
    source: 'The Wall Street Journal, “The Facebook Files” (2021)',
    url: 'https://www.wsj.com/articles/facebook-knows-instagram-is-toxic-for-teen-girls-company-documents-show-11631620739'
  },
  {
    id: 'english-10',
    short: '{mins} minutes here. Half an hour of English a day for a year is enough to go up a whole level.',
    long: 'Cambridge English estimates that going up one level (B1 to B2, or B2 to C1) takes roughly 200 hours of guided learning. Half an hour a day is about 180 hours a year: less time than the average person spends on TikTok, Instagram and YouTube together.',
    source: 'Cambridge English, “Guided learning hours”; 30 min × 365 days ≈ 183 hours',
    url: ''
  },
  {
    id: 'words-session',
    short: '{mins} minutes of scrolling. In that time you could have learnt a whole lesson of new words.',
    long: 'The Words step of a lesson in this app has 10 new words and takes about 10 minutes. A word you learn stays with you; a video you scrolled past is gone.',
    source: '',
    url: ''
  }
];
