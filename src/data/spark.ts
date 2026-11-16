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


/* =========================================================================
   SPARK 2026 · SESSION 2: THE MUSIC CASE (PART 2)
   Deep Reading, Empirical Predictions, Reading Card & Case File #2
   ========================================================================= */

export interface SparkSession2Condition {
  id: 'quiet' | 'no_lyrics' | 'liked' | 'disliked';
  title: string;
  icon: string;
  shortDesc: string;
  conditionDetail: string;
  realRank: 1 | 3;
  realRankLabel: string;
  meanScore: string;
  distractionRating: number;
  perceivedPerformance: number;
  explanation: string;
}

export interface SparkGlossaryTerm {
  term: string;
  category: 'method' | 'stats' | 'concept';
  definition: string;
  pageHint: string;
  isKey?: boolean;
}

export const sparkSession2 = {
  title: 'The Music Case — Part 2: Open the Key Paper',
  subtitle: 'Perham & Currie (2014) · 60 minutes · Evidence-based investigation',
  paper: {
    title: 'Does listening to preferred music improve reading comprehension performance?',
    authors: 'Perham, N., & Currie, H.',
    year: 2014,
    journal: 'Applied Cognitive Psychology, 28(2), 279–284',
    citation: 'Perham, N., & Currie, H. (2014). Does listening to preferred music improve reading comprehension performance? Applied Cognitive Psychology, 28(2), 279–284.',
    doiLink: 'https://doi.org/10.1002/acp.2994',
    pdfPath: '/events/spark-2026/Perham_Currie_2014_SPARK_Student_Copy.pdf',
  },
  mentorCue: 'Today you open the paper and check if it answers your questions.',
  storyRecap: `Yacine is a first-year student. Every evening, he studies with his headphones on and his favourite songs playing. “Music helps me focus,” he says.

His sister doesn’t agree: “Your grades went down since you started doing that. The music is distracting you.”

In Session 1, your team triaged paper cards, followed the citation trail, and uncovered the landmark paper: Perham & Currie (2014). Today, you open the paper to uncover what science actually found.`,
  sampleHomeworkQuestions: [
    'Did the researchers test songs that students actually like, or only music they disliked?',
    'Did they test real studying material (like reading texts) rather than just memorising letters?',
    'Does music without lyrics have the same effect as songs with words?',
  ],
  paperParts: [
    {
      id: 'intro',
      name: '1. Introduction',
      description: 'What is known, the research gap ("However, little is known..."), and the 2 competing predictions.',
      validPages: [1, 2, 279],
      expectedPageDisplay: 'Page 1 (or p. 279 in original)',
    },
    {
      id: 'method',
      name: '2. Method',
      description: 'Participants, study design, materials (SAT passages, music tracks, pilot study), and procedure.',
      validPages: [2, 3, 5, 280],
      expectedPageDisplay: 'Page 5 (or p. 2 in easy copy, p. 280 in original)',
    },
    {
      id: 'results',
      name: '3. Results',
      description: 'Reading comprehension scores, students’ ratings of distraction, and Table 1.',
      validPages: [3, 8, 281],
      expectedPageDisplay: 'Page 8 (or p. 3 in easy copy, p. 281 in original)',
    },
    {
      id: 'discussion',
      name: '4. Discussion',
      description: 'What the findings mean, cognitive explanation of lyric interference, study limits, and take-home message.',
      validPages: [3, 4, 10, 282],
      expectedPageDisplay: 'Page 10 (or p. 3–4 in easy copy, p. 282 in original)',
    },
    {
      id: 'references',
      name: '5. References',
      description: 'Bibliographic citations of prior works (including cards C2, C4, and C5 from Session 1).',
      validPages: [4, 15, 283, 284],
      expectedPageDisplay: 'Page 15 (or p. 4 in easy copy, p. 283–284 in original)',
    },
  ],
  fourPartTrick: {
    who: {
      label: 'Who?',
      expected: '30 university students (one university in Wales, UK; aged 19–65; about half men and half women).',
      keywords: ['student', 'university', 'wales', '30', 'adult', 'participant'],
      placeholder: 'e.g. 30 university students in Wales',
    },
    what: {
      label: 'What are they testing?',
      expected: 'Listening to music while reading: liked songs with lyrics, disliked songs with lyrics, and music without lyrics.',
      keywords: ['music', 'song', 'lyric', 'sound', 'liked', 'disliked', 'instrumental'],
      placeholder: 'e.g. Reading while listening to 3 kinds of music (liked songs, disliked songs, instrumental)',
    },
    comparedTo: {
      label: 'Compared to what?',
      expected: 'Reading in quiet / silence (and the music conditions compared with each other).',
      keywords: ['quiet', 'silence', 'each other', 'silent'],
      placeholder: 'e.g. Reading in silence / quiet',
    },
    measuredHow: {
      label: 'Measured how?',
      expected: 'A reading comprehension test: 4 SAT texts with 6 multiple-choice questions each (score 0–6) + post-test questionnaire.',
      keywords: ['reading', 'comprehension', 'sat', 'test', 'question', 'score', 'mcq', 'rating'],
      placeholder: 'e.g. Reading comprehension score on 4 SAT texts (6 MCQs each)',
    },
  },
  highlighterGuide: {
    yellow: {
      color: '🟡 Yellow',
      label: 'What they did (Method)',
      desc: 'Who, how many participants, which tasks, and what conditions were tested.',
      rule: 'Ask yourself: Could the researchers know this before running the experiment? If yes, it belongs in yellow.',
      acceptedFacts: [
        '30 university students from one university in Wales, aged 19 to 65, about half men and half women',
        'Fans of thrash metal were screened out and excluded from participating',
        'Every student completed all 4 conditions (within-subjects design), counterbalanced across orders',
        'Participants read 4 real SAT reading comprehension texts (~70 lines each) with 6 multiple-choice questions each (0-6 score)',
        'Liked music: each student brought their own favourite songs with lyrics',
        'Disliked music and music without lyrics: both thrash metal tracks by the band Death Angel',
        'A pilot study with 10 people verified ~75% of the thrash metal lyrics were intelligible',
        'Music was played through headphones at 65–75 dB with instructions to ignore the sound',
        'After testing, students rated likeability, familiarity, distractibility, and estimated performance (0–100)',
        'No strict time limit: students spent about 10–15 minutes per passage',
      ],
    },
    blue: {
      color: '🔵 Blue',
      label: 'What they found (Results)',
      desc: 'Comprehension scores, condition comparisons, statistical significance, and subjective student ratings.',
      rule: 'Ask yourself: Could anyone know this before looking at the test sheets? If no, it belongs in blue.',
      acceptedFacts: [
        'Reading comprehension was highest in quiet and in music without lyrics (virtually identical scores)',
        'Reading comprehension was lowest in liked songs with lyrics and disliked songs with lyrics',
        'No significant difference between quiet and music without lyrics (thrash metal without vocals)',
        'No significant difference between liked songs and disliked songs: loved songs hurt performance just as much',
        'The sound condition had a statistically significant, large effect on reading scores (F(3, 87) = 8.16, η² = .22)',
        'Students rated both lyrical music conditions as the most distracting (~75–79 / 100)',
        'Students accurately perceived that they performed worst with lyrical music (~36 / 100)',
      ],
    },
  },
  wordJar: [
    {
      term: 'Within design',
      category: 'method',
      isKey: true,
      definition: 'Every participant tests in all 4 conditions. Each student is compared with themself, reducing noise from individual differences.',
      pageHint: 'Method (p. 2 / p. 5)',
    },
    {
      term: 'Significant (p < .05)',
      category: 'stats',
      isKey: true,
      definition: 'The probability that this difference occurred by random chance is less than 5%. In science, "significant" means reliable/real, not necessarily "huge".',
      pageHint: 'Results (p. 3 / p. 9)',
    },
    {
      term: 'Effect size (η² = .22)',
      category: 'stats',
      isKey: false,
      definition: 'A measure of magnitude: background sound accounted for 22% of all variance in comprehension scores. In psychology, this is considered a large effect.',
      pageHint: 'Results (p. 3 / p. 9)',
    },
    {
      term: 'Independent variable',
      category: 'method',
      isKey: false,
      definition: 'The factor manipulated by researchers: here, the 4 background sound conditions (Quiet, Liked songs, Disliked songs, Music without lyrics).',
      pageHint: 'Method (p. 2 / p. 6)',
    },
    {
      term: 'Dependent variable',
      category: 'method',
      isKey: false,
      definition: 'The outcome measured by researchers: here, the reading comprehension score (0–6 correct answers per passage).',
      pageHint: 'Method (p. 2 / p. 6)',
    },
    {
      term: 'Counterbalanced',
      category: 'method',
      isKey: false,
      definition: 'Rotating condition order across participants so fatigue, practice, or boredom cannot explain the experimental results.',
      pageHint: 'Method (p. 2 / p. 6)',
    },
    {
      term: 'Pilot study',
      category: 'method',
      isKey: false,
      definition: 'A preliminary trial run with 10 people to verify that the lyrics were actually audible and intelligible before the main experiment.',
      pageHint: 'Method (p. 2 / p. 7)',
    },
    {
      term: 'Likert scale',
      category: 'method',
      isKey: false,
      definition: 'A standardized rating scale; in this study, a continuous scale ranging from 0 (not at all) to 100 (extremely).',
      pageHint: 'Method (p. 2 / p. 8)',
    },
    {
      term: 'One-way ANOVA',
      category: 'stats',
      isKey: false,
      definition: 'Analysis of Variance: a statistical test comparing the average scores across 3 or more experimental conditions.',
      pageHint: 'Results (p. 3 / p. 9)',
    },
    {
      term: 'Semantic processing',
      category: 'concept',
      isKey: false,
      definition: 'The mental decoding of linguistic meaning. Because words in songs carry semantic content, they directly collide with reading comprehension.',
      pageHint: 'Discussion (p. 4 / p. 11)',
    },
    {
      term: 'Irrelevant sound effect',
      category: 'concept',
      isKey: false,
      definition: 'The involuntary disruption of cognitive tasks caused by background auditory stimuli that a person is trying to ignore.',
      pageHint: 'Intro / Discussion (p. 1 / p. 3)',
    },
    {
      term: 'Decibels (dB)',
      category: 'method',
      isKey: false,
      definition: 'Logarithmic unit of sound pressure level; 65–75 dB represents normal conversational to moderate television volume.',
      pageHint: 'Method (p. 2 / p. 8)',
    },
  ] as SparkGlossaryTerm[],
  conditions: [
    {
      id: 'quiet',
      title: 'Quiet (Silence)',
      icon: '🤫',
      shortDesc: 'Silent laboratory room, no background audio playing',
      conditionDetail: 'Ambient room silence (baseline control)',
      realRank: 1,
      realRankLabel: 'Tied 1st Place',
      meanScore: '3.67 / 6 (61.1%)',
      distractionRating: 10.4,
      perceivedPerformance: 67.3,
      explanation: 'Optimal reading condition. Zero auditory words competing for phonological or semantic attention.',
    },
    {
      id: 'no_lyrics',
      title: 'Music without lyrics',
      icon: '🎸',
      shortDesc: 'Instrumental thrash metal ("The Ultra Violence" by Death Angel)',
      conditionDetail: 'Loud, intense heavy metal without any spoken or sung words',
      realRank: 1,
      realRankLabel: 'Tied 1st Place',
      meanScore: '3.60 / 6 (60.0%)',
      distractionRating: 46.4,
      perceivedPerformance: 52.8,
      explanation: 'Statistically indistinguishable from quiet! Proves that musical complexity, tempo, or genre does NOT impair reading comprehension—words do.',
    },
    {
      id: 'liked',
      title: 'Liked songs with lyrics',
      icon: '❤️',
      shortDesc: "Each student's own favourite music with lyrics brought from home",
      conditionDetail: 'Self-selected favourite pop, rock, rap, or acoustic vocal tracks',
      realRank: 3,
      realRankLabel: 'Tied 3rd Place (Worst)',
      meanScore: '2.27 / 6 (37.8%)',
      distractionRating: 75.3,
      perceivedPerformance: 35.7,
      explanation: 'Severe ~38% drop in reading comprehension! Enjoying the song or knowing the lyrics does NOT prevent interference.',
    },
    {
      id: 'disliked',
      title: 'Disliked songs with lyrics',
      icon: '💔',
      shortDesc: 'Thrash metal with lyrics by Death Angel (disliked by all participants)',
      conditionDetail: 'Vocal thrash metal track with screamed and sung lyrics',
      realRank: 3,
      realRankLabel: 'Tied 3rd Place (Worst)',
      meanScore: '2.20 / 6 (36.7%)',
      distractionRating: 78.7,
      perceivedPerformance: 35.8,
      explanation: 'Virtually identical damage to liked songs. Lyrics hijack semantic processing channels regardless of musical preference.',
    },
  ] as SparkSession2Condition[],
  readingCardBoxes: [
    {
      id: 'reference',
      title: '1. Reference',
      prompt: 'Standard APA reference for the study.',
      defaultValue: 'Perham, N., & Currie, H. (2014). Does listening to preferred music improve reading comprehension performance? Applied Cognitive Psychology, 28(2), 279–284.',
      placeholder: 'Author, Year, Title, Journal, Volume, Pages',
    },
    {
      id: 'question',
      title: '2. Question',
      prompt: 'What core research question did this study set out to answer?',
      placeholder: 'e.g. Does music you like help or hurt reading comprehension compared to quiet and music without words?',
    },
    {
      id: 'who',
      title: '3. Who',
      prompt: 'Who were the participants? (Sample size, age, background)',
      placeholder: 'e.g. 30 undergraduate university students in Wales (aged 19–65, balanced gender).',
    },
    {
      id: 'what_done',
      title: '4. What they did',
      prompt: 'Experimental task, conditions, and procedure.',
      placeholder: 'e.g. Each student read 4 SAT passages and answered 6 MCQs under 4 conditions: quiet, favourite songs, disliked metal, and metal without lyrics.',
    },
    {
      id: 'main_result',
      title: '5. Main result',
      prompt: 'What were the actual empirical findings? (Which conditions did best/worst?)',
      placeholder: 'e.g. Quiet and music without lyrics scored highest (tied). Songs with lyrics scored lowest (tied), regardless of whether students liked them.',
    },
    {
      id: 'explanation',
      title: '6. Explanation (Why?)',
      prompt: 'How do the authors explain why lyrics caused this impairment?',
      placeholder: 'e.g. Both text and song lyrics require semantic linguistic processing. The brain must work to filter lyrics, reducing capacity to understand text.',
    },
    {
      id: 'limits',
      title: '7. Limits',
      prompt: 'What limitations does the paper have or should a careful reader note?',
      placeholder: 'e.g. Small sample of 30 students; artificial lab SAT test, not multi-hour study session; non-lyrical music was only thrash metal; no long-term retention test.',
    },
    {
      id: 'our_questions',
      title: '8. Our questions',
      prompt: 'What follow-up questions does your team still have for future research?',
      placeholder: 'e.g. Would calm instrumental music or lofi produce higher scores? Does listening to songs in a foreign language you don’t speak also distract?',
    },
  ],
  caseFile2Questions: {
    homeworkCheck: {
      prompt: 'Did the paper answer your team’s homework questions?',
      options: ['Yes', 'Partly', 'No'],
      explanationPlaceholder: 'Explain in one line how the paper did or did not answer your questions...',
    },
    sentenceForYacine: {
      prompt: 'What would you tell Yacine now? (One sentence, based on the paper)',
      placeholder: 'e.g. If you need to read and understand what you study, turn off songs with lyrics—even your favourites—and study in silence or with instrumental music.',
      tip: 'Name the specific kind of music (songs with lyrics vs instrumental) rather than claiming all music is bad.',
    },
    reasonToBeCareful: {
      prompt: 'One reason to be careful before applying this study everywhere:',
      placeholder: 'e.g. This was a single lab experiment with 30 students and short SAT passages, not real multi-hour revision, and one paper is never the final word.',
      examples: [
        'Small sample size: only 30 participants from one university in Wales.',
        'Lab condition: short SAT reading tests, not real-world multi-hour study sessions.',
        'Instrumental music tested was thrash metal, not classical, lofi, or ambient.',
        'Immediate test only: did not measure long-term exam retention weeks later.',
      ],
    },
  },
};
