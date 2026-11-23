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
   Public, spoiler-free UI metadata only.
   ALL expected answers, accepted facts, Table 1 ratings, model Reading Card,
   model verdict, accepted limits & bonus answers live strictly server-side
   in Supabase (`spark_secret_content`, gated by `spark_session2_answer_key`).
   ========================================================================= */

export interface SparkSession2Condition {
  id: 'quiet' | 'no_lyrics' | 'liked' | 'disliked';
  title: string;
  icon: string;
  shortDesc: string;
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
    easyPdfPath: '/events/spark-2026/Perham_Currie_2014_Easy_Copy.pdf',
  },
  mentorCue: 'Today you open the paper and check if it answers your questions.',
  paperParts: [
    {
      id: 'intro',
      name: '1. Introduction',
      description: 'What is known, the research gap, and the study’s competing predictions.',
      validPages: [1, 2, 279],
    },
    {
      id: 'method',
      name: '2. Method',
      description: 'Participants, study design, materials, and procedure.',
      validPages: [2, 3, 5, 280],
    },
    {
      id: 'results',
      name: '3. Results',
      description: 'Reading comprehension performance, students’ ratings, and Table 1.',
      validPages: [3, 8, 281],
    },
    {
      id: 'discussion',
      name: '4. Discussion',
      description: 'What the findings mean, explanation, study limits, and take-home message.',
      validPages: [3, 4, 10, 282],
    },
    {
      id: 'references',
      name: '5. References',
      description: 'Bibliographic citations of prior works referenced in the study.',
      validPages: [4, 15, 283, 284],
    },
  ],
  fourPartTrick: {
    who: {
      label: 'Who?',
      placeholder: 'Who took part in this study? (Check Abstract & Participants)',
    },
    what: {
      label: 'What are they testing?',
      placeholder: 'What sound conditions or activity are they testing?',
    },
    comparedTo: {
      label: 'Compared to what?',
      placeholder: 'What baseline condition is it compared against?',
    },
    measuredHow: {
      label: 'Measured how?',
      placeholder: 'How did they measure performance? (Tip: check Materials, not just the abstract!)',
    },
  },
  conditions: [
    {
      id: 'quiet',
      title: 'Quiet (Silence)',
      icon: '🤫',
      shortDesc: 'Silent room with no background music playing',
    },
    {
      id: 'no_lyrics',
      title: 'Music without lyrics',
      icon: '🎸',
      shortDesc: 'Instrumental music with no spoken or sung words',
    },
    {
      id: 'liked',
      title: 'Liked songs with lyrics',
      icon: '❤️',
      shortDesc: 'Participants’ own favourite songs with lyrics',
    },
    {
      id: 'disliked',
      title: 'Disliked songs with lyrics',
      icon: '💔',
      shortDesc: 'Unfamiliar songs with lyrics chosen by the researchers',
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
      placeholder: 'Write the main research question in your own words…',
    },
    {
      id: 'who',
      title: '3. Who',
      prompt: 'Who were the participants? (Sample size, age, background)',
      placeholder: 'Describe who took part in the experiment…',
    },
    {
      id: 'what_done',
      title: '4. What they did',
      prompt: 'Experimental task, conditions, and procedure.',
      placeholder: 'Summarize the task, conditions, and procedure in your own words…',
    },
    {
      id: 'main_result',
      title: '5. Main result',
      prompt: 'What were the actual empirical findings? (Which conditions did best/worst?)',
      placeholder: 'Summarize which conditions did best and worst, in your own words…',
    },
    {
      id: 'explanation',
      title: '6. Their explanation (Why?)',
      prompt: 'How do the authors explain why this happened?',
      placeholder: 'Write the authors’ explanation in plain words…',
    },
    {
      id: 'limits',
      title: '7. Limits',
      prompt: 'What limitations does the paper have or should a careful reader note?',
      placeholder: 'List at least one real limit from the paper or from your own critical reading…',
    },
    {
      id: 'our_questions',
      title: '8. Our questions',
      prompt: 'What follow-up questions does your team still have for future research?',
      placeholder: 'Write 1–2 follow-up questions your team would test next…',
    },
  ],
  caseFile2Questions: {
    homeworkCheck: {
      prompt: 'Did the paper answer your team’s homework questions?',
      options: ['Yes', 'Partly', 'No'],
      explanationPlaceholder: 'Explain in one line how the paper did or did not answer your questions…',
    },
    sentenceForYacine: {
      prompt: 'What would you tell Yacine now? (One sentence, based on the paper)',
      placeholder: 'Write one clear, precise sentence for Yacine based on what this study found…',
      tip: 'Name the specific kind of music (not just "all music") and stay faithful to the evidence.',
    },
    reasonToBeCareful: {
      prompt: 'One reason to be careful before applying this study everywhere:',
      placeholder: 'Write one limitation or reason not to treat this single study as the final answer…',
    },
  },
};

export const sparkSession3 = {
  number: 3,
  title: 'The Music Case — Part 3: "Write for Yacine"',
  subtitle: 'From reading to writing · 60 minutes · PEEL Paragraph & Peer Review',
  mentorCue:
    'Today you’re the researchers who answer him. "Something he can trust" means: clear, your own words, a source, and careful words.',
  yacineMessage:
    'My sister found that paper about music. I don\'t have time to read research. Just tell me in one paragraph: should I stop listening to music when I study? And please, make it something I can trust.',
  fourPillars: [
    {
      title: '1. Clear & Neutral Style',
      desc: 'Short sentences, one idea at a time, no emotional drama or exclamation marks.',
    },
    {
      title: '2. Real Paraphrase',
      desc: 'Written in your team’s own words, never copied sentence structure from the paper.',
    },
    {
      title: '3. Precise & Sourced',
      desc: 'Includes empirical details (30 students, 4 sound conditions) and APA citation (Perham & Currie, 2014).',
    },
    {
      title: '4. Careful Words',
      desc: 'Uses cautious verbs ("suggests", "found", "may"). Never claims a single study "proves".',
    },
  ],
  badAnswer:
    'Music is really bad for studying!! Perham and Currie proved that listening to music is always distracting. In their study, songs with lyrics made reading worse, and the songs students liked were just as bad as the songs they disliked. So Yacine should never listen to any music. Lots of students did the test.',
  mistakeLabels: [
    'Not neutral',
    'Too strong',
    'Wrong',
    'Copied',
    'Vague',
    'Missing citation',
  ] as const,
  badAnswerMistakes: [
    {
      id: 'm1',
      text: 'Music is really bad for studying!!',
      expectedLabel: 'Not neutral',
      hint: 'Notice the emotional feeling and the dramatic "!!".',
    },
    {
      id: 'm2',
      text: 'Perham and Currie',
      expectedLabel: 'Missing citation',
      hint: 'No publication year (2014) and no formal APA in-text format.',
    },
    {
      id: 'm3',
      text: 'proved',
      expectedLabel: 'Too strong',
      hint: 'Can one single laboratory study ever "prove" human cognition universally?',
    },
    {
      id: 'm4',
      text: 'listening to music is always distracting',
      expectedLabel: 'Wrong',
      hint: 'Was music without lyrics distracting, or did they score just as well as quiet silence?',
    },
    {
      id: 'm5',
      text: 'songs with lyrics made reading worse, and the songs students liked were just as bad as the songs they disliked.',
      expectedLabel: 'Copied',
      hint: 'This sentence is lifted almost verbatim from the abstract with zero paraphrasing.',
    },
    {
      id: 'm6',
      text: 'So Yacine should never listen to any music.',
      expectedLabel: 'Wrong / too strong',
      hint: 'Does the study forbid all music or only background songs with lyrical speech?',
    },
    {
      id: 'm7',
      text: 'Lots of students',
      expectedLabel: 'Vague',
      hint: 'How many people actually took part? Be mathematically precise.',
    },
  ],
  paraphraseSentences: [
    {
      id: 'p1',
      title: 'Sentence 1 · The Findings',
      original:
        'Students understood the texts best in quiet and with music without lyrics, and worst with the two kinds of songs with lyrics.',
      hint: 'Focus on contrast: silence & instrumental vs. lyric songs (liked or disliked).',
      example:
        'Reading was easiest in silence or with instrumental music, and hardest with any songs that had lyrics (Perham & Currie, 2014).',
    },
    {
      id: 'p2',
      title: 'Sentence 2 · The Mechanism (Why?)',
      original:
        'The brain has to block the lyrics so that they do not mix with the text, and this effort makes understanding the text less efficient.',
      hint: 'Focus on cognitive interference: ignoring vocal words drains mental resources needed for reading.',
      example:
        'Because the mind must work to ignore the words of a song, less effort is left for understanding the text (Perham & Currie, 2014).',
    },
  ],
  peelGuide: [
    {
      id: 'p',
      letter: 'P',
      name: 'Point',
      role: 'Direct answer to Yacine’s question in one clear topic sentence.',
      prompt: 'State your main answer directly: does listening to music with lyrics hurt reading comprehension?',
      placeholder: 'e.g. Listening to songs with lyrics while reading may make it harder to understand the text, even when the songs are your favourites…',
    },
    {
      id: 'e',
      letter: 'E',
      name: 'Evidence',
      role: ' empirical data from Perham & Currie (2014) with sample size and conditions.',
      prompt: 'Insert your paraphrased finding from Step 2 with the in-text citation (Perham & Currie, 2014).',
      placeholder: 'e.g. In one study, 30 university students understood texts best in quiet and with instrumental music, but scored significantly lower with vocal music (Perham & Currie, 2014)…',
    },
    {
      id: 'explain',
      letter: 'E',
      name: 'Explain',
      role: 'Why this happens cognitively (interference of lyrics with text processing).',
      prompt: 'Insert your paraphrased mechanism from Step 2: why do vocal lyrics interfere with reading?',
      placeholder: 'e.g. The researchers suggest that processing words from song lyrics competes for the brain’s language resources, leaving less mental capacity for reading comprehension…',
    },
    {
      id: 'l',
      letter: 'L',
      name: 'Link',
      role: 'Connect back to Yacine’s specific study habits with careful limits.',
      prompt: 'Apply the insight to Yacine’s daily studying: what should he actually do when reading?',
      placeholder: 'e.g. Although this was a small laboratory experiment, it suggests Yacine should study in silence or listen only to instrumental music when reading challenging material…',
    },
  ],
  apaReference:
    'Perham, N., & Currie, H. (2014). Does listening to preferred music improve reading comprehension performance? Applied Cognitive Psychology, 28(2), 279–284. https://doi.org/10.1002/acp.2994',
  sixChecks: [
    { id: 'one_idea', label: '1. One single idea', desc: 'Answers Yacine’s question in one focused paragraph without rambling.' },
    { id: 'cited', label: '2. In-text citation', desc: 'Properly cites (Perham & Currie, 2014) when stating the experimental results.' },
    { id: 'own_words', label: '3. Own words', desc: 'True paraphrase throughout — zero copied sentences from the paper’s abstract.' },
    { id: 'precise', label: '4. Precise details', desc: 'Names conditions (quiet, instrumental, liked/disliked lyrical) or sample size (30 students).' },
    { id: 'careful', label: '5. Careful verbs', desc: 'Uses cautious scientific language ("suggests", "may", "found") instead of "proves".' },
    { id: 'reference', label: '6. Full APA reference', desc: 'Includes the complete APA reference at the bottom with DOI or journal details.' },
  ],
  steps: [
    { id: 0, title: 'Yacine’s message', time: '3 min', desc: 'Read his request & discover what a trusted answer requires' },
    { id: 1, title: 'Spot the problems', time: '10 min', desc: 'The detective step: find 7 mistakes in a bad answer' },
    { id: 2, title: 'Paraphrase the result', time: '8 min', desc: 'Close the paper trick: rewrite 2 key sentences from memory' },
    { id: 3, title: 'Build the PEEL paragraph', time: '15 min', desc: 'Assemble Point, Evidence, Explain, Link + APA reference' },
    { id: 4, title: 'Swap and review', time: '12 min', desc: 'Anonymous peer review: 6 checks, 1 star, and 1 wish' },
    { id: 5, title: 'Case File #3', time: '8 min', desc: 'Final paragraph ready for Yacine, read aloud & mentor approval' },
  ],
};

