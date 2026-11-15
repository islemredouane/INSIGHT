// SPARK 2026 · The Music Case — public settings and card content.
// The Supabase URL and publishable key below are meant to be public: every write and
// every secret (mission question, trail clue, hints, key paper, mentor notes) is gated
// by database functions, never by keeping this key hidden. See spark-2026/supabase/migration.sql
// (not in this repo — spark-2026/ is gitignored) for the server side.

export const sparkSupabase = {
  url: 'https://joalrhkyxzbilbsmjsin.supabase.co',
  anonKey: 'sb_publishable_3fOj0JFbL5U8tww5GYs8hQ_OomI6vbP',
} as const;

/** Shown to every team from the start, on every step — no mentor reveal action needed. */
export const sparkMissionQuestion =
  'Do students understand and remember less of what they study when they listen to background music than when they study in silence?';

export type CardId = 'C1' | 'C2' | 'C3' | 'C4' | 'C5' | 'C6' | 'C7' | 'C8';
export type CardChoice = 'keep' | 'maybe' | 'not_for_us';

export interface SparkCard {
  id: CardId;
  title: string;
  authors: string;
  year: number;
  journal: string;
  summary: string;
  officialLink: string;
  freeCopyLink?: string;
}

/** Fixed display order from the Paper Cards PDF: C5, C1, C8, C3, C7, C2, C4, C6. */
export const sparkCards: SparkCard[] = [
  {
    id: 'C5',
    title: 'Arousal, mood, and the Mozart effect',
    authors: 'Thompson, W. F., Schellenberg, E. G., & Husain, G.',
    year: 2001,
    journal: 'Psychological Science, 12(3), 248–251',
    summary:
      '24 students did a paper-folding puzzle test after 10 minutes of a lively Mozart piece, a slow sad piece by Albinoni, or silence. They did better only after Mozart. Mozart also put them in a better mood and gave them more energy. When the researchers took mood and energy into account, the "Mozart effect" disappeared.',
    officialLink: 'https://doi.org/10.1111/1467-9280.00345',
    freeCopyLink: 'https://sites.utm.utoronto.ca/sites/sites.utm.utoronto.ca.glenn_website/files/download/Thompson2001.pdf',
  },
  {
    id: 'C1',
    title: 'Effects of background music on phonological short-term memory',
    authors: 'Salamé, P., & Baddeley, A. D.',
    year: 1989,
    journal: 'The Quarterly Journal of Experimental Psychology, Section A, 41(1), 107–122',
    summary:
      'Students saw lists of 9 digits and had to write them down in the right order. They did this in silence, with instrumental music, or with music with singing playing in the background. Both kinds of music made them remember fewer digits than silence, and music with singing was the most disturbing.',
    officialLink: 'https://doi.org/10.1080/14640748908402355',
  },
  {
    id: 'C8',
    title: 'The influence of in-store music on wine selections',
    authors: 'North, A. C., Hargreaves, D. J., & McKendrick, J.',
    year: 1999,
    journal: 'Journal of Applied Psychology, 84(2), 271–276',
    summary:
      'For two weeks, a UK supermarket played French music on some days and German music on others, next to a shelf of French and German wines. On French-music days, more French wine was sold; on German-music days, more German wine. Most shoppers didn’t think the music had changed their choice.',
    officialLink: 'https://doi.org/10.1037/0021-9010.84.2.271',
  },
  {
    id: 'C3',
    title: 'The impact of background music on adult listeners: A meta-analysis',
    authors: 'Kämpfe, J., Sedlmeier, P., & Renkewitz, F.',
    year: 2011,
    journal: 'Psychology of Music, 39(4), 424–448',
    summary:
      'This paper combines the results of 97 studies on background music. Overall, music had almost no effect when all activities were mixed together. But looking closer, background music made reading comprehension worse and memory slightly worse, while it slightly improved mood and sports performance.',
    officialLink: 'https://doi.org/10.1177/0305735610376261',
  },
  {
    id: 'C7',
    title: 'Music lessons enhance IQ',
    authors: 'Schellenberg, E. G.',
    year: 2004,
    journal: 'Psychological Science, 15(8), 511–514',
    summary:
      '144 six-year-old children were put into 4 groups for one school year (36 weeks): keyboard lessons, singing lessons, drama lessons, or no lessons. Children who took music lessons had slightly bigger IQ gains than the others.',
    officialLink: 'https://doi.org/10.1111/j.0956-7976.2004.00711.x',
    freeCopyLink: 'https://sites.utm.utoronto.ca/sites/sites.utm.utoronto.ca.glenn_website/files/download/SchellenbergPS2004.pdf',
  },
  {
    id: 'C2',
    title: 'Disliked music can be better for performance than liked music',
    authors: 'Perham, N., & Sykora, M.',
    year: 2012,
    journal: 'Applied Cognitive Psychology, 26(4), 550–555',
    summary:
      '25 university students heard strings of 8 letters and repeated them in order. They did this in quiet, with a pop song they liked, or with a heavy metal song they disliked. They remembered best in quiet. Surprisingly, the song they liked disturbed them more than the one they disliked — and they didn’t notice it.',
    officialLink: 'https://doi.org/10.1002/acp.2826',
  },
  {
    id: 'C4',
    title: 'Music and spatial task performance',
    authors: 'Rauscher, F. H., Shaw, G. L., & Ky, K. N.',
    year: 1993,
    journal: 'Nature, 365, 611',
    summary:
      '36 college students listened for 10 minutes to Mozart, to relaxation instructions, or to silence. Then they did spatial puzzles, like imagining how a folded and cut paper looks when opened. After Mozart they did a little better, but the effect lasted only about 10–15 minutes. This became famous as the "Mozart effect".',
    officialLink: 'https://doi.org/10.1038/365611a0',
  },
  {
    id: 'C6',
    title: 'Mozart effect–Shmozart effect: A meta-analysis',
    authors: 'Pietschnig, J., Voracek, M., & Formann, A. K.',
    year: 2010,
    journal: 'Intelligence, 38(3), 314–323',
    summary:
      'This paper combines about 40 studies on the "Mozart effect", with more than 3,000 people in total. It finds little or no evidence that listening to Mozart improves spatial skills.',
    officialLink: 'https://doi.org/10.1016/j.intell.2010.03.001',
  },
];

export const sparkCardById = Object.fromEntries(sparkCards.map((c) => [c.id, c])) as Record<CardId, SparkCard>;

/** Step 0 story (Section 8.1 of the brief). */
export const sparkStory = `Yacine is a first-year student. Every evening, he studies with his headphones on and his favourite songs playing. “Music helps me focus,” he says.

His sister doesn’t agree. “Your grades went down since you started doing that. The music is distracting you.”

They argue every night. Nobody knows who is right.

Your team has been asked to find out — like real researchers. Over the next 5 sessions, you will find the papers, read them, write about them, and give Yacine an answer based on evidence, not opinions.`;

export const sparkQuestionExamples = [
  { label: 'Weak', text: 'Is music good?', hint: 'Good for what? For whom?' },
  { label: 'Better', text: 'Does music affect studying?', hint: 'Compared to what? How do we measure it?' },
  {
    label: 'Strong',
    text: 'Do students remember less of what they read when they study with songs than in silence?',
    hint: 'It answers all 4 parts of the checklist.',
  },
];

export const sparkKeywordIdeas = {
  music: 'background music, songs, lyrics, instrumental, headphones',
  studying: 'reading, learning, revision, homework',
  silence: 'quiet, no music',
  remembering: 'memory, recall, understanding, comprehension, test',
};

export const sparkHomework =
  'Before the next session: open the key paper and read only the title and the abstract. As a team, write down 2 questions you hope the paper answers.';

export const sparkNextSessionPaper = {
  citation: 'Perham, N., & Currie, H. (2014). Does listening to preferred music improve reading comprehension performance? Applied Cognitive Psychology, 28(2), 279–284.',
  doiLink: 'https://doi.org/10.1002/acp.2994',
  cardId: 'KEY' as const,
};
