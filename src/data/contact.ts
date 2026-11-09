// Contact page settings: the form service, the reply time we promise, and who answers what.

/**
 * Messages from the form are forwarded to site.email by Web3Forms (free, no server needed).
 * TODO (Helm): create the access key at https://web3forms.com with insight@estin.dz and paste it below.
 * The key is public by design (it only lets the form send to our inbox).
 * Until it is set, the form opens the visitor's email app with the message ready.
 */
export const contactForm = {
  web3formsKey: '',
  endpoint: 'https://api.web3forms.com/submit',
  /** The reply time we promise. TODO (Helm): confirm the club can keep it. */
  replyTime: '3 working days',
} as const;

/** "Who are you?" choices. Each one routes the message to the department that handles it (deck slides 9–13). */
export const contactTopics = [
  { id: 'student', label: 'Student', subject: 'Question from a student', department: 'hr', hint: 'Joining, membership and training.' },
  { id: 'researcher', label: 'Researcher or lab', subject: 'Collaboration with INSIGHT', department: 'external-relations', hint: 'Talks, mentoring and co-supervised projects.' },
  { id: 'company', label: 'Company or sponsor', subject: 'Partnering with INSIGHT', department: 'external-relations', hint: 'Partnerships and sponsoring.' },
  { id: 'club', label: 'Club', subject: 'Collaboration between clubs', department: 'external-relations', hint: 'Joint events and collaborations with other clubs.' },
  { id: 'other', label: 'Press or other', subject: 'Message to INSIGHT', department: 'communication', hint: 'Press, media and everything else.' },
] as const;

export type ContactTopic = (typeof contactTopics)[number];

/** Google Maps search for the school (a plain link: no embedded map, no tracking). */
export const mapUrl = 'https://www.google.com/maps/search/?api=1&query=ESTIN%2C%20Amizour%2C%20B%C3%A9ja%C3%AFa';
