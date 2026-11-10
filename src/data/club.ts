// Fixed club copy, taken from the Welcome Day 2026 deck. Used by Home, About, Research and Training.
// Content that grows over time (people, events, researchers…) lives in src/content/ instead.

export const vision = {
  quote: 'A crew of ESTIN students who read, question and contribute to science.',
  directions: [
    { title: 'Spark curiosity', text: 'Make asking questions a habit.' },
    { title: 'Open the door to research', text: 'Introduce students to academic research.' },
    { title: 'Sharpen the mind', text: 'Develop research and critical-thinking skills.' },
    { title: 'Build bridges', text: 'Connect students with researchers, labs and the scientific community.' },
  ],
};

export const pillars = [
  { title: 'Student-led', text: 'Run by students, free and open to everyone.' },
  { title: 'Why we set sail', text: 'To give students a place to discover research together.' },
  { title: 'Curiosity first', text: 'No experience required, only curiosity.' },
];

export const activities = [
  { title: 'Research projects', text: 'Teams explore real research questions.', icon: 'search' },
  { title: 'Paper reading', text: 'We read scientific papers, the records of discovery.', icon: 'book', highlight: 'Start here · Rookie level' },
  { title: 'Workshops & training', text: 'Hands-on technical sessions.', icon: 'terminal' },
  { title: 'Writing & publishing', text: 'Academic writing, from first draft to paper.', icon: 'pen' },
  { title: 'Events & collaborations', text: 'Research events with other clubs and labs.', icon: 'network' },
  { title: 'Guest talks', text: 'Meet researchers and ask them anything.', icon: 'mic' },
] as const;

/** "Every research project is a journey" */
export const journey = {
  steps: [
    { title: 'Set sail', text: 'Start with a question' },
    { title: 'Read the records', text: 'Study what is known' },
    { title: 'Plot the course', text: 'Choose a method' },
    { title: 'Explore', text: 'Run the experiments' },
    { title: 'Write the log', text: 'Write the paper' },
    { title: 'Bring the treasure', text: 'Share and publish' },
  ],
  destination: { title: 'The One Paper', text: "Your first research publication. It's real, and it's waiting for you." },
  takePart: [
    { title: 'Join the crew', text: 'Become a member and pick a pole.' },
    { title: 'Join a project team', text: 'Work with your pole and its leads.' },
    { title: 'Contribute', text: 'Read, experiment, write, present.' },
  ],
};

/** Training path: "From rookie to captain" */
export const trainingLevels = [
  { level: 'I', rank: 'Rookie', title: 'Paper reading', text: 'Read and discuss scientific papers.' },
  { level: 'II', rank: 'Navigator', title: 'Research methodology', text: 'How research is designed and done.' },
  { level: 'III', rank: 'Scholar', title: 'Academic writing', text: 'Write and publish your work.' },
  { level: 'IV', rank: 'Captain', title: 'Technical workshops', text: 'Hands-on skills for your pole.' },
];

/** "The shipyard and the journey" */
export const shipyard = {
  training: { label: 'Training', title: 'The shipyard', text: 'builds the skills' },
  research: { label: 'Research', title: 'The journey', text: 'puts them to work' },
  loop: ['Skills feed projects', 'Projects show what to learn next'],
  motto: 'Learn by doing. Do by learning.',
};

/** Key numbers. Only real figures (update when they change). */
export const stats = [
  { value: 28, label: 'Crew members' },
  { value: 7, label: 'Departments' },
  { value: 4, label: 'Research poles' },
  { value: 1, label: 'Guest from IBM Research' },
];

export const closingLines = {
  discovery: 'Every great discovery begins with a question.',
  setSail: 'Set sail. Explore the unknown.',
  sideEffects: 'Side effects may include reading papers at 2 a.m.',
};
