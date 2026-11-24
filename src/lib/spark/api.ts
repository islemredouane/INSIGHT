// SPARK 2026 · The Music Case — thin wrapper around the Supabase RPC functions.
// Every call here hits a SECURITY DEFINER Postgres function; the tables themselves
// are never reachable directly (see spark-2026/supabase/migration.sql).
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { sparkSupabase } from '../../data/spark';

let client: SupabaseClient | null = null;
export const sb = (): SupabaseClient => {
  if (!client) client = createClient(sparkSupabase.url, sparkSupabase.anonKey);
  return client;
};

/* ---- Local storage: which team/mentor this browser is signed in as ---- */
const TEAM_KEY = 'spark-team-code';
const MENTOR_KEY = 'spark-mentor-session';

export const getStoredTeamCode = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TEAM_KEY);
};
export const storeTeamCode = (code: string) => localStorage.setItem(TEAM_KEY, code);
export const clearTeamCode = () => localStorage.removeItem(TEAM_KEY);

export interface MentorSession {
  token: string;
  role: 'mentor' | 'admin';
  mentorName?: string;
}
export const getStoredMentor = (): MentorSession | null => {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(MENTOR_KEY);
  return raw ? (JSON.parse(raw) as MentorSession) : null;
};
export const storeMentor = (s: MentorSession) => localStorage.setItem(MENTOR_KEY, JSON.stringify(s));
export const clearMentor = () => localStorage.removeItem(MENTOR_KEY);

/* ---- Error helper: Supabase RPC errors land in `error.message` ---- */
async function rpc<T>(fn: string, args?: Record<string, unknown>): Promise<T> {
  const { data, error } = await sb().rpc(fn, args);
  if (error) throw new Error(error.message || 'Something went wrong. Try again.');
  return data as T;
}

/* ---- Types mirroring what the database functions return ---- */
export type Step1Status = 'draft' | 'pending' | 'approved';

export interface SessionState {
  unlocked_step: number;
  mission_revealed: boolean;
}

export interface Step1Answers {
  question_text: string | null;
  who: string | null;
  what: string | null;
  compared_to: string | null;
  measured_how: string | null;
  status: Step1Status;
  submitted_at: string | null;
  approved_at: string | null;
  approved_by: string | null;
  mentor_comment: string | null;
}

export interface Step2Answers {
  words_music: string | null;
  words_studying: string | null;
  words_silence: string | null;
  words_remembering: string | null;
  search_line: string | null;
  useful_title: string | null;
  ideas_opened?: boolean;
}

export interface TeamCaseFile {
  team: {
    id: string;
    code: string;
    name: string;
    members: string[];
    assigned_mentor?: string | null;
  };
  state: SessionState;
  mission_question: string | null;
  step1: Step1Answers | null;
  step2: Step2Answers | null;
  cards: Record<string, { choice: string; reason: string }>;
  step4: {
    hints_opened: number;
    found: boolean;
    attempts: { title: string; at: string; ok: boolean }[];
  } | null;
  key_card: {
    id: string;
    title: string;
    authors: string;
    year: number;
    journal: string;
    summary: string;
    official_link: string;
    free_copy_link?: string;
  } | null;
  step5: { surprised_text: string | null } | null;
  paper_views?: Record<string, number>;
}

export interface TrailInfo {
  locked: boolean;
  clue?: string;
  hints?: string[];
  hints_opened?: number;
  found?: boolean;
}

export interface MentorTeamRow {
  id: string;
  name: string;
  code: string;
  members: string[];
  assigned_mentor?: string | null;
  step1_status?: Step1Status;
  cards_sorted: number;
  key_paper_found: boolean;
  hints_opened: number;
  last_activity: string;
}

export interface MentorOverview {
  state: SessionState;
  teams: MentorTeamRow[];
}

export interface MentorQuestionItem {
  team_id: string;
  team_name: string;
  team_code: string;
  members: string[];
  assigned_mentor: string | null;
  question_text: string | null;
  who: string | null;
  what: string | null;
  compared_to: string | null;
  measured_how: string | null;
  status: Step1Status;
  submitted_at: string | null;
  approved_at: string | null;
  approved_by: string | null;
  mentor_comment: string | null;
  last_activity: string;
}

export interface MentorCardComparison {
  card_id: string;
  title: string;
  authors: string;
  year: number;
  team_choice: string | null;
  team_reason: string | null;
  expected_choice: string;
  note_why: string;
  match: boolean | null;
  view_count: number;
}

export interface MentorTeamDetail {
  header: {
    id: string;
    code: string;
    name: string;
    members: string[];
    assigned_mentor?: string | null;
    current_step: number;
    unlocked_step: number;
    last_activity: string;
    created_at: string;
  };
  step1: Step1Answers | null;
  step2: Step2Answers | null;
  step3: {
    total_sorted: number;
    cards: MentorCardComparison[];
  } | null;
  step4: {
    found: boolean;
    found_at: string | null;
    attempts: Array<{ title: string; at: string; ok: boolean }>;
    hints_opened: number;
    key_card: TeamCaseFile['key_card'] | null;
    key_views: number;
  } | null;
  step5: {
    surprised_text: string | null;
    updated_at: string | null;
  } | null;
}

/* ---- Team-facing calls ---- */
export const createTeam = (name: string, members: string[]) =>
  rpc<string>('spark_create_team', { p_name: name, p_members: members });

export const getTeam = (code: string) => rpc<TeamCaseFile | null>('spark_get_team', { p_code: code });

export const saveStep1Draft = (
  code: string,
  fields: {
    question: string;
    who?: string;
    what?: string;
    comparedTo?: string;
    measuredHow?: string;
  }
) =>
  rpc<void>('spark_save_step1', {
    p_code: code,
    p_question: fields.question,
    p_who: fields.who || null,
    p_what: fields.what || null,
    p_compared_to: fields.comparedTo || null,
    p_measured_how: fields.measuredHow || null,
  });

export const submitStep1 = (
  code: string,
  fields: {
    question: string;
    who: string;
    what: string;
    comparedTo: string;
    measuredHow: string;
  }
) =>
  rpc<void>('spark_submit_step1', {
    p_code: code,
    p_question: fields.question,
    p_who: fields.who,
    p_what: fields.what,
    p_compared_to: fields.comparedTo,
    p_measured_how: fields.measuredHow,
  });

export const saveStep2 = (
  code: string,
  fields: {
    wordsMusic: string;
    wordsStudying: string;
    wordsSilence: string;
    wordsRemembering: string;
    searchLine: string;
    usefulTitle: string;
    ideasOpened?: boolean;
  }
) =>
  rpc<void>('spark_save_step2', {
    p_code: code,
    p_words_music: fields.wordsMusic,
    p_words_studying: fields.wordsStudying,
    p_words_silence: fields.wordsSilence,
    p_words_remembering: fields.wordsRemembering,
    p_search_line: fields.searchLine,
    p_useful_title: fields.usefulTitle,
    p_ideas_opened: fields.ideasOpened ?? false,
  });

export const chooseCard = (code: string, cardId: string, choice: string, reason: string) =>
  rpc<void>('spark_choose_card', { p_code: code, p_card_id: cardId, p_choice: choice, p_reason: reason });

export const getTrail = (code: string) => rpc<TrailInfo>('spark_get_trail', { p_code: code });
export const openHint = (code: string) =>
  rpc<{ hints_opened: number; hint: string }>('spark_open_hint', { p_code: code });
export const checkTrail = (code: string, title: string) =>
  rpc<{ found: boolean; key_card?: TeamCaseFile['key_card'] }>('spark_check_trail', {
    p_code: code,
    p_title: title,
  });

export const saveStep5 = (code: string, text: string) =>
  rpc<void>('spark_save_step5', { p_code: code, p_text: text });

/* ---- Paper access & short-lived signed URLs ---- */
export async function getPaperSignedUrl(
  cardId: string,
  opts: { code?: string | null; token?: string | null; expiresInSeconds?: number }
): Promise<string> {
  const normCard = cardId.toUpperCase();
  // 1. Gated verification & view tracking in DB
  await rpc('spark_track_paper_open', {
    p_code: opts.code || null,
    p_card_id: normCard,
    p_token: opts.token || null,
  });

  // 2. Generate short-lived signed URL from private bucket
  const expiry = opts.expiresInSeconds || 180; // 3 minutes
  const { data, error } = await sb()
    .storage.from('spark-papers')
    .createSignedUrl(`${normCard}.pdf`, expiry);

  if (error || !data?.signedUrl) {
    throw new Error(error?.message || 'Could not generate secure paper link.');
  }

  return data.signedUrl;
}

/* ---- Mentor-facing calls ---- */
export const mentorLogin = (password: string) =>
  rpc<MentorSession>('spark_mentor_login', { p_password: password });

export const mentorOverview = (token: string) =>
  rpc<MentorOverview>('spark_mentor_overview', { p_token: token });

export const mentorQuestions = (token: string) =>
  rpc<MentorQuestionItem[]>('spark_mentor_questions', { p_token: token });

export const mentorApproveStep1 = (
  token: string,
  teamId: string,
  mentorName?: string,
  comment?: string
) =>
  rpc<void>('spark_approve_step1', {
    p_token: token,
    p_team_id: teamId,
    p_mentor_name: mentorName || null,
    p_comment: comment || null,
  });

export const mentorTeamDetail = (token: string, teamId: string) =>
  rpc<MentorTeamDetail>('spark_mentor_team_detail', { p_token: token, p_team_id: teamId });

export const mentorAssignTeam = (token: string, teamId: string, mentorName: string) =>
  rpc<void>('spark_mentor_assign_team', {
    p_token: token,
    p_team_id: teamId,
    p_mentor_name: mentorName,
  });

export const mentorSetStep = (token: string, step: number) =>
  rpc<void>('spark_mentor_set_step', { p_token: token, p_step: step });

export const mentorRevealMission = (token: string, revealed: boolean) =>
  rpc<void>('spark_mentor_reveal_mission', { p_token: token, p_revealed: revealed });

export const mentorCaseFile = (token: string, teamId: string) =>
  rpc<TeamCaseFile>('spark_mentor_case_file', { p_token: token, p_team_id: teamId });

export interface Session2AnswerKey {
  step0: {
    sampleHomeworkQuestions: string[];
  };
  step1: {
    pageMap: { name: string; expected: string }[];
    fourPartTrick: { label: string; expected: string; where: string }[];
    mentorTip: string;
  };
  step2: {
    yellowFacts: string[];
    blueFacts: string[];
    commonMistake: string;
    essentialTerms: { term: string; definition: string }[];
    wordJar: { term: string; pageHint: string; definition: string }[];
  };
  step3: {
    ranking: { rank: string; icon: string; title: string; note: string; tone: 'good' | 'bad' }[];
    surprises: { title: string; body: string; tone: 'amber' | 'emerald' }[];
    table1: {
      distracting: { disliked: string; liked: string; noLyrics: string; quiet: string };
      perceived: { disliked: string; liked: string; noLyrics: string; quiet: string };
      bonusAnswer: string;
    };
  };
  step4: {
    boxes: { title: string; answer: string }[];
    approvalRule: string;
  };
  step5: {
    typicalHomeworkAnswers: { q: string; a: string }[];
    modelVerdict: string;
    acceptedLimits: string[];
    bonusChallenge: {
      title: string;
      prompt: string;
      answer: string;
      detectiveExtra: string;
    };
  };
}

export const mentorNotes = (token: string) =>
  rpc<{ card: string; fit: string; why: string }[]>('spark_mentor_notes', { p_token: token });

export const mentorSession2Key = (token: string) =>
  rpc<Session2AnswerKey>('spark_session2_answer_key', { p_token: token });

/* ---- Session 2 Live Types & RPCs ---- */
export interface Session2RoomState {
  unlocked_step: number;
  revealed_steps: Record<string, boolean>;
  updated_at?: string;
}

export interface Session2TeamAnswers {
  team_id?: string;
  hw_q1: string;
  hw_q2: string;
  pages: Record<string, number>;
  trick: { who: string; what: string; compared: string; measured: string };
  yellow: string[];
  blue: string[];
  jar_words: string[];
  prediction: string[];
  prediction_locked: boolean;
  results_real_text: string;
  results_bonus_text: string;
  reading_card: Record<string, string>;
  card_status: 'draft' | 'pending' | 'approved';
  card_submitted_at?: string | null;
  card_approved_at?: string | null;
  card_approved_by?: string | null;
  card_mentor_comment?: string | null;
  cf2: {
    choice: string;
    explanation: string;
    sentenceYacine: string;
    reasonCareful: string;
  };
  cf2_saved: boolean;
  updated_at?: string;
}

export interface Session2TeamPayload {
  team: { id: string; code: string; name: string; members: string[] } | null;
  state: Session2RoomState;
  answers: Session2TeamAnswers | null;
  revealed_keys: Partial<Session2AnswerKey>;
}

export interface MentorS2TeamRow extends Session2TeamAnswers {
  id: string;
  code: string;
  name: string;
  members: string[];
  last_activity: string;
  s2_updated_at?: string | null;
}

export interface MentorS2Overview {
  state: Session2RoomState;
  teams: MentorS2TeamRow[];
  word_jar: { word: string; count: number }[];
}

export const getSession2State = (code?: string | null) =>
  rpc<Session2TeamPayload | null>('spark_s2_get_state', { p_code: code || null });

export const getSession2RevealedKeys = () =>
  rpc<Partial<Session2AnswerKey>>('spark_s2_revealed_keys');

export const saveSession2Progress = (code: string, patch: Record<string, unknown>) =>
  rpc<Session2TeamAnswers>('spark_s2_save', { p_code: code, p_patch: patch });

export const submitSession2Card = (code: string, readingCard: Record<string, string>) =>
  rpc<Session2TeamAnswers>('spark_s2_submit_card', { p_code: code, p_reading_card: readingCard });

export const mentorS2Overview = (token: string) =>
  rpc<MentorS2Overview>('spark_mentor_s2_overview', { p_token: token });

export const mentorS2SetStep = (token: string, step: number) =>
  rpc<void>('spark_mentor_s2_set_step', { p_token: token, p_step: step });

export const mentorS2SetReveal = (token: string, step: number, revealed: boolean) =>
  rpc<Record<string, boolean>>('spark_mentor_s2_set_reveal', {
    p_token: token,
    p_step: step,
    p_revealed: revealed,
  });

export const mentorS2ApproveCard = (
  token: string,
  teamId: string,
  mentorName?: string,
  comment?: string
) =>
  rpc<void>('spark_mentor_s2_approve_card', {
    p_token: token,
    p_team_id: teamId,
    p_mentor_name: mentorName || null,
    p_comment: comment || null,
  });

export const mentorS2Export = (token: string) =>
  rpc<Record<string, unknown>[]>('spark_mentor_s2_export', { p_token: token });

export const adminS2Reset = (token: string) =>
  rpc<void>('spark_admin_s2_reset', { p_token: token });

export function watchSession2State(onChange: (s: Session2RoomState) => void): () => void {
  let stopped = false;
  const poll = async () => {
    if (stopped) return;
    try {
      const { data } = await sb()
        .from('spark_session2_state')
        .select('unlocked_step, revealed_steps, updated_at')
        .eq('id', true)
        .single();
      if (data) onChange(data as Session2RoomState);
    } catch {
      /* network hiccup */
    }
  };
  poll();
  const interval = setInterval(poll, 4000);
  const channel = sb()
    .channel('spark-session2-state')
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'spark_session2_state' },
      (payload) => {
        onChange(payload.new as Session2RoomState);
      }
    )
    .subscribe();

  return () => {
    stopped = true;
    clearInterval(interval);
    sb().removeChannel(channel);
  };
}

/* ---- Session 3 Live Types & RPCs ---- */
export interface Session3RoomState {
  unlocked_step: number;
  revealed_steps: Record<string, boolean>;
  updated_at?: string;
}

export interface PeelDraft {
  p: string;
  e: string;
  explain: string;
  l: string;
  ref: string;
}

export interface PeerReviewSubmission {
  target_team_id?: string | null;
  target_team_code?: string | null;
  checks: string[];
  star: string;
  wish: string;
  submitted_at?: string | null;
}

export interface PeerFeedbackReceived {
  reviewer_code: string;
  checks: string[];
  star: string;
  wish: string;
  submitted_at: string;
}

export interface Session3TeamAnswers {
  team_id?: string;
  step1_spots: Record<string, string>;
  step2_p1: string;
  step2_p2: string;
  step2_peek1: number;
  step2_peek2: number;
  peel: PeelDraft;
  peel_saved: boolean;
  peer_review: PeerReviewSubmission;
  improved_peel: PeelDraft;
  cf3_status: 'draft' | 'pending' | 'approved';
  cf3_submitted_at?: string | null;
  cf3_approved_at?: string | null;
  cf3_approved_by?: string | null;
  cf3_mentor_comment?: string | null;
  updated_at?: string;
}

export interface Session3AnswerKey {
  step0: {
    message: string;
    fourPillars: { title: string; desc: string }[];
  };
  step1: {
    badAnswer: string;
    mistakes: { id: string; text: string; label: string; category: string; why: string }[];
  };
  step2: {
    sentences: { original: string; keyCheck: string; modelAnswer: string }[];
  };
  step3: {
    peelModel: PeelDraft;
    mentorNotes: string;
  };
  step4: {
    sixChecks: { id: string; title: string; desc: string }[];
    peerAdvice: string;
  };
  step5: {
    modelVerdict: string;
    approvalCriteria: string[];
  };
}

export interface Session3TeamPayload {
  team: { id: string; code: string; name: string; members: string[] } | null;
  state: Session3RoomState;
  answers: Session3TeamAnswers | null;
  s2_reading_card: Record<string, string> | null;
  peer_feedback_received: PeerFeedbackReceived | null;
  revealed_keys: Partial<Session3AnswerKey>;
}

export interface PeerTargetPayload {
  is_fallback?: boolean;
  target_team_id: string | null;
  target_team_code: string;
  peer_code?: string;
  peel: PeelDraft;
  paragraph?: PeelDraft;
}

export interface MentorS3TeamRow {
  id: string;
  code: string;
  name: string;
  members: string[];
  last_activity: string;
  step1_spots: Record<string, string>;
  step2_p1: string;
  step2_p2: string;
  step2_peek1: number;
  step2_peek2: number;
  peel: PeelDraft;
  peel_saved: boolean;
  peer_review: PeerReviewSubmission;
  improved_peel: PeelDraft;
  cf3_status: 'draft' | 'pending' | 'approved';
  cf3_submitted_at?: string | null;
  cf3_approved_at?: string | null;
  cf3_approved_by?: string | null;
  cf3_mentor_comment?: string | null;
  s3_updated_at?: string | null;
}

export interface MentorS3Overview {
  state: Session3RoomState;
  teams: MentorS3TeamRow[];
}

export const getSession3State = (code?: string | null) =>
  rpc<Session3TeamPayload | null>('spark_s3_get_state', { p_code: code || null });

export const getSession3RevealedKeys = () =>
  rpc<Partial<Session3AnswerKey>>('spark_s3_revealed_keys');

export const saveSession3Progress = (code: string, patch: Record<string, unknown>) =>
  rpc<Session3TeamAnswers>('spark_s3_save', { p_code: code, p_patch: patch });

export const getPeerTargetSession3 = (code: string) =>
  rpc<PeerTargetPayload>('spark_s3_get_peer_target', { p_code: code });

export const submitPeerReviewSession3 = (code: string, review: Record<string, unknown>) =>
  rpc<Session3TeamAnswers>('spark_s3_submit_peer_review', { p_code: code, p_review: review });

export const submitCaseFile3 = (code: string, improvedPeel: PeelDraft) =>
  rpc<Session3TeamAnswers>('spark_s3_submit_cf3', {
    p_code: code,
    p_cf3: improvedPeel,
    p_improved_peel: improvedPeel,
  });

export const mentorS3Overview = (token: string) =>
  rpc<MentorS3Overview>('spark_mentor_s3_overview', { p_token: token });

export const mentorS3SetStep = (token: string, step: number) =>
  rpc<void>('spark_mentor_s3_set_step', { p_token: token, p_step: step });

export const mentorS3SetReveal = (token: string, step: number, revealed: boolean) =>
  rpc<Record<string, boolean>>('spark_mentor_s3_set_reveal', {
    p_token: token,
    p_step: step,
    p_revealed: revealed,
  });

export const mentorS3ApproveCaseFile = (
  token: string,
  teamId: string,
  mentorName?: string,
  comment?: string
) =>
  rpc<void>('spark_mentor_s3_approve_cf3', {
    p_token: token,
    p_team_id: teamId,
    p_mentor_name: mentorName || null,
    p_comment: comment || null,
  });

export const mentorS3Export = (token: string) =>
  rpc<Record<string, unknown>[]>('spark_mentor_s3_export', { p_token: token });

export const adminS3Reset = (token: string) =>
  rpc<void>('spark_admin_s3_reset', { p_token: token });

/* ---- Session 4 Live Types & RPCs ---- */
export interface Session4RoomState {
  unlocked_step: number;
  revealed_steps: Record<string, boolean>;
  updated_at?: string;
}

export interface IntroMovesDraft {
  move1: string;
  move2: string;
  move3: string;
  move4: string;
}

export interface AbstractDraft {
  a1: string;
  a2: string;
  a3: string;
  a4: string;
  a5: string;
}

export interface PeerReviewS4Submission {
  target_team_id?: string | null;
  target_team_code?: string | null;
  checks: string[];
  star: string;
  wish: string;
  submitted_at?: string | null;
}

export interface PeerFeedbackS4Received {
  reviewer_code: string;
  checks: string[];
  star: string;
  wish: string;
  submitted_at: string;
}

export interface Session4TeamAnswers {
  team_id?: string;
  step1_sort: Record<string, string>; // cardId -> 'I' | 'M' | 'R' | 'D'
  step1_saved?: boolean;
  step2_title: string;
  step2_final_title: string;
  step2_checks: string[];
  step2_saved?: boolean;
  step3_moves: IntroMovesDraft;
  step3_saved?: boolean;
  step4_result: string;
  step4_discussion: string;
  step4_saved?: boolean;
  step5_abstract: AbstractDraft;
  step5_saved?: boolean;
  step5_peer_review: PeerReviewS4Submission;
  step5_improved_abstract: AbstractDraft;
  cf4_hardest?: string;
  cf4_status: 'draft' | 'pending' | 'approved';
  cf4_submitted_at?: string | null;
  cf4_approved_at?: string | null;
  cf4_approved_by?: string | null;
  cf4_mentor_comment?: string | null;
  s4_updated_at?: string;
}

export interface Session4AnswerKey {
  step1: Record<string, { correct: string; reason: string }>;
  step2: { realTitle: string; analysis: string; examples: string[] };
  step3: { moves: { num: number; model: string }[] };
  step4: { resultModel: string; discussionModel: string };
  step5: { abstractModel: string[]; checkCriteria: string[] };
}

export interface Session4TeamPayload {
  team: { id: string; code: string; name: string; members: string[] } | null;
  state: Session4RoomState;
  answers: Session4TeamAnswers | null;
  s3_peel: PeelDraft | null;
  s2_reading_card: Record<string, string> | null;
  peer_feedback_received: PeerFeedbackS4Received | null;
  revealed_keys: Partial<Session4AnswerKey>;
}

export interface PeerTargetS4Payload {
  is_fallback?: boolean;
  target_team_id: string | null;
  target_team_code: string;
  peer_code?: string;
  abstract: AbstractDraft;
}

export interface MentorS4TeamRow {
  id: string;
  code: string;
  name: string;
  members: string[];
  last_activity: string;
  step1_sort: Record<string, string>;
  step1_saved?: boolean;
  step2_title: string;
  step2_final_title: string;
  step2_checks: string[];
  step3_moves: IntroMovesDraft;
  step4_result: string;
  step4_discussion: string;
  step5_abstract: AbstractDraft;
  step5_peer_review: PeerReviewS4Submission;
  step5_improved_abstract: AbstractDraft;
  cf4_hardest?: string;
  cf4_status: 'draft' | 'pending' | 'approved';
  cf4_submitted_at?: string | null;
  cf4_approved_at?: string | null;
  cf4_approved_by?: string | null;
  cf4_mentor_comment?: string | null;
  s4_updated_at?: string | null;
}

export interface MentorS4Overview {
  state: Session4RoomState;
  teams: MentorS4TeamRow[];
}

export const getSession4State = (code?: string | null) =>
  rpc<Session4TeamPayload | null>('spark_s4_get_state', { p_code: code || null });

export const getSession4RevealedKeys = () =>
  rpc<Partial<Session4AnswerKey>>('spark_s4_revealed_keys');

export const saveSession4Progress = (code: string, patch: Record<string, unknown>) =>
  rpc<Session4TeamAnswers>('spark_s4_save', { p_code: code, p_patch: patch });

export const getPeerTargetSession4 = (code: string) =>
  rpc<PeerTargetS4Payload>('spark_s4_get_peer_target', { p_code: code });

export const submitPeerReviewSession4 = (code: string, review: Record<string, unknown>) =>
  rpc<Session4TeamAnswers>('spark_s4_submit_peer_review', { p_code: code, p_review: review });

export const submitCaseFile4 = (
  code: string,
  payload: { hardest?: string; improved_abstract?: AbstractDraft }
) =>
  rpc<Session4TeamAnswers>('spark_s4_submit_cf4', {
    p_code: code,
    p_hardest: payload.hardest || null,
    p_improved_abstract: payload.improved_abstract || null,
  });

export const mentorS4Overview = (token: string) =>
  rpc<MentorS4Overview>('spark_mentor_s4_overview', { p_token: token });

export const mentorS4SetStep = (token: string, step: number) =>
  rpc<void>('spark_mentor_s4_set_step', { p_token: token, p_step: step });

export const mentorS4SetReveal = (token: string, step: number, revealed: boolean) =>
  rpc<Record<string, boolean>>('spark_mentor_s4_set_reveal', {
    p_token: token,
    p_step: step,
    p_revealed: revealed,
  });

export const mentorS4ApproveCaseFile = (
  token: string,
  teamId: string,
  mentorName?: string,
  comment?: string
) =>
  rpc<void>('spark_mentor_s4_approve_cf4', {
    p_token: token,
    p_team_id: teamId,
    p_mentor_name: mentorName || null,
    p_comment: comment || null,
  });

export const mentorS4Export = (token: string) =>
  rpc<Record<string, unknown>[]>('spark_mentor_s4_export', { p_token: token });

export const adminS4Reset = (token: string) =>
  rpc<void>('spark_admin_s4_reset', { p_token: token });

export function watchSession4State(onChange: (s: Session4RoomState) => void): () => void {
  let stopped = false;
  const poll = async () => {
    if (stopped) return;
    try {
      const { data } = await sb()
        .from('spark_session4_state')
        .select('unlocked_step, revealed_steps, updated_at')
        .eq('id', true)
        .single();
      if (data) onChange(data as Session4RoomState);
    } catch {
      /* network hiccup */
    }
  };
  poll();
  const interval = setInterval(poll, 4000);
  const channel = sb()
    .channel('spark-session4-state')
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'spark_session4_state' },
      (payload) => {
        onChange(payload.new as Session4RoomState);
      }
    )
    .subscribe();

  return () => {
    stopped = true;
    clearInterval(interval);
    sb().removeChannel(channel);
  };
}

export function watchSession3State(onChange: (s: Session3RoomState) => void): () => void {
  let stopped = false;
  const poll = async () => {
    if (stopped) return;
    try {
      const { data } = await sb()
        .from('spark_session3_state')
        .select('unlocked_step, revealed_steps, updated_at')
        .eq('id', true)
        .single();
      if (data) onChange(data as Session3RoomState);
    } catch {
      /* network hiccup */
    }
  };
  poll();
  const interval = setInterval(poll, 4000);
  const channel = sb()
    .channel('spark-session3-state')
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'spark_session3_state' },
      (payload) => {
        onChange(payload.new as Session3RoomState);
      }
    )
    .subscribe();

  return () => {
    stopped = true;
    clearInterval(interval);
    sb().removeChannel(channel);
  };
}

export const mentorExport = (token: string) =>
  rpc<Record<string, unknown>[]>('spark_mentor_export', { p_token: token });

export const adminReset = (token: string) => rpc<void>('spark_admin_reset', { p_token: token });

/* ---- Live session state: Realtime with a 5 s poll fallback ---- */
export function watchSessionState(onChange: (s: SessionState) => void): () => void {
  let stopped = false;
  const poll = async () => {
    if (stopped) return;
    try {
      const { data } = await sb()
        .from('spark_session_state')
        .select('unlocked_step, mission_revealed')
        .eq('session_number', 1)
        .single();
      if (data) onChange(data as SessionState);
    } catch {
      /* network hiccup */
    }
  };
  poll();
  const interval = setInterval(poll, 5000);
  const channel = sb()
    .channel('spark-session-state')
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'spark_session_state' },
      (payload) => {
        onChange(payload.new as SessionState);
      }
    )
    .subscribe();

  return () => {
    stopped = true;
    clearInterval(interval);
    sb().removeChannel(channel);
  };
}

/* ---- Live Step 1 watcher: Realtime + poll fallback for question approval ---- */
export function watchTeamStep1(
  teamId: string,
  onUpdate: (s1: Step1Answers) => void
): () => void {
  let stopped = false;
  const poll = async () => {
    if (stopped) return;
    try {
      const { data } = await sb()
        .from('spark_step1_answers')
        .select('question_text, who, what, compared_to, measured_how, status, submitted_at, approved_at, approved_by, mentor_comment')
        .eq('team_id', teamId)
        .single();
      if (data) onUpdate(data as Step1Answers);
    } catch {
      /* network hiccup */
    }
  };

  const interval = setInterval(poll, 3000);
  const channel = sb()
    .channel(`spark-step1-${teamId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'spark_step1_answers',
        filter: `team_id=eq.${teamId}`,
      },
      (payload) => {
        onUpdate(payload.new as Step1Answers);
      }
    )
    .subscribe();

  return () => {
    stopped = true;
    clearInterval(interval);
    sb().removeChannel(channel);
  };
}

/** Friendly text for RPC errors (they already carry plain-English messages from the database). */
export const friendlyError = (e: unknown) =>
  e instanceof Error ? e.message : 'Something went wrong. Try again.';

/** Escape untrusted text before interpolating into HTML strings (prevents Stored XSS). */
export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
