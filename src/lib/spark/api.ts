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

export const getStoredTeamCode = (): string | null => localStorage.getItem(TEAM_KEY);
export const storeTeamCode = (code: string) => localStorage.setItem(TEAM_KEY, code);
export const clearTeamCode = () => localStorage.removeItem(TEAM_KEY);

export interface MentorSession { token: string; role: 'mentor' | 'admin' }
export const getStoredMentor = (): MentorSession | null => {
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
export interface SessionState { unlocked_step: number; mission_revealed: boolean }
export interface TeamCaseFile {
  team: { id: string; code: string; name: string; members: string[] };
  state: SessionState;
  mission_question: string | null;
  step1: { question_text: string | null; checklist: boolean[] } | null;
  step2: {
    words_music: string | null; words_studying: string | null; words_silence: string | null;
    words_remembering: string | null; search_line: string | null; useful_title: string | null;
  } | null;
  cards: Record<string, { choice: string; reason: string }>;
  step4: { hints_opened: number; found: boolean; attempts: { title: string; at: string; ok: boolean }[] } | null;
  key_card: { id: string; title: string; authors: string; year: number; journal: string; summary: string; official_link: string; free_copy_link?: string } | null;
  step5: { surprised_text: string | null } | null;
}
export interface TrailInfo { locked: boolean; clue?: string; hints?: string[]; hints_opened?: number; found?: boolean }
export interface MentorTeamRow {
  id: string; name: string; code: string; members: string[];
  cards_sorted: number; key_paper_found: boolean; hints_opened: number; last_activity: string;
}
export interface MentorOverview { state: SessionState; teams: MentorTeamRow[] }

/* ---- Team-facing calls ---- */
export const createTeam = (name: string, members: string[]) =>
  rpc<string>('spark_create_team', { p_name: name, p_members: members });

export const getTeam = (code: string) => rpc<TeamCaseFile | null>('spark_get_team', { p_code: code });

export const saveStep1 = (code: string, question: string, checklist: boolean[]) =>
  rpc<void>('spark_save_step1', { p_code: code, p_question: question, p_checklist: checklist });

export const saveStep2 = (code: string, fields: {
  wordsMusic: string; wordsStudying: string; wordsSilence: string; wordsRemembering: string;
  searchLine: string; usefulTitle: string;
}) =>
  rpc<void>('spark_save_step2', {
    p_code: code,
    p_words_music: fields.wordsMusic, p_words_studying: fields.wordsStudying,
    p_words_silence: fields.wordsSilence, p_words_remembering: fields.wordsRemembering,
    p_search_line: fields.searchLine, p_useful_title: fields.usefulTitle,
  });

export const chooseCard = (code: string, cardId: string, choice: string, reason: string) =>
  rpc<void>('spark_choose_card', { p_code: code, p_card_id: cardId, p_choice: choice, p_reason: reason });

export const getTrail = (code: string) => rpc<TrailInfo>('spark_get_trail', { p_code: code });
export const openHint = (code: string) => rpc<{ hints_opened: number; hint: string }>('spark_open_hint', { p_code: code });
export const checkTrail = (code: string, title: string) =>
  rpc<{ found: boolean; key_card?: TeamCaseFile['key_card'] }>('spark_check_trail', { p_code: code, p_title: title });

export const saveStep5 = (code: string, text: string) => rpc<void>('spark_save_step5', { p_code: code, p_text: text });

/* ---- Mentor-facing calls ---- */
export const mentorLogin = (password: string) => rpc<MentorSession>('spark_mentor_login', { p_password: password });
export const mentorOverview = (token: string) => rpc<MentorOverview>('spark_mentor_overview', { p_token: token });
export const mentorSetStep = (token: string, step: number) => rpc<void>('spark_mentor_set_step', { p_token: token, p_step: step });
export const mentorRevealMission = (token: string, revealed: boolean) =>
  rpc<void>('spark_mentor_reveal_mission', { p_token: token, p_revealed: revealed });
export const mentorCaseFile = (token: string, teamId: string) =>
  rpc<TeamCaseFile>('spark_mentor_case_file', { p_token: token, p_team_id: teamId });
export const mentorNotes = (token: string) =>
  rpc<{ card: string; fit: string; why: string }[]>('spark_mentor_notes', { p_token: token });
export const mentorExport = (token: string) => rpc<Record<string, unknown>[]>('spark_mentor_export', { p_token: token });
export const adminReset = (token: string) => rpc<void>('spark_admin_reset', { p_token: token });

/* ---- Live session state: Realtime with a 5 s poll fallback ---- */
export function watchSessionState(onChange: (s: SessionState) => void): () => void {
  let stopped = false;
  const poll = async () => {
    if (stopped) return;
    try {
      const { data } = await sb().from('spark_session_state').select('unlocked_step, mission_revealed').eq('session_number', 1).single();
      if (data) onChange(data as SessionState);
    } catch { /* network hiccup: next poll (or the realtime push) will catch up */ }
  };
  poll();
  const interval = setInterval(poll, 5000);
  const channel = sb()
    .channel('spark-session-state')
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'spark_session_state' }, (payload) => {
      onChange(payload.new as SessionState);
    })
    .subscribe();
  return () => {
    stopped = true;
    clearInterval(interval);
    sb().removeChannel(channel);
  };
}

/** Friendly text for RPC errors (they already carry plain-English messages from the database). */
export const friendlyError = (e: unknown) => (e instanceof Error ? e.message : 'Something went wrong. Try again.');
