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
