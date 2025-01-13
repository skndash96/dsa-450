import { supabase } from '../utils/supabase';

export interface Note {
  id: string;
  uid: string;
  tid: string;
  qid: string;
  done: boolean;
  starred: boolean;
  text: string;
}

export interface UpdateNote {
  done?: boolean;
  starred?: boolean;
  text?: string;
}

export interface Topic {
  id: string;
  position: number;
  name: string;
  questions: Question[];
}

export interface Question {
  id: string;
  position: number;
  problem: string;
  links: string[];
}

const NOTES_TABLE = 'notes'

export async function getUserNotes() {
  const notes = await supabase
    .from(NOTES_TABLE)
    .select<any, Note>('*') //RLS enabled
    .then(({ data, error }) => {
      if (error) {
        throw error;
      }

      return data ?? [];
    });
  
  const output: Record<string, Record<string, Note>> = {}

  notes.forEach((note: Note) => {
    if (!output[note.tid]) {
      output[note.tid] = {}
    }

    output[note.tid][note.qid] = note
  })

  return output
}

export async function setUserNote(qid: string, tid: string, updateNote: {
  text?: string;
  done?: boolean;
  starred?: boolean;
}) {
  const user = await supabase.auth.getUser()
  const uid = user.data.user?.id

  if (!uid) return null

  const res = await supabase
    .from(NOTES_TABLE)
    .upsert({
      uid,
      qid,
      tid,
      ...updateNote
    }, {
      onConflict: 'uid,qid'
    })
    .select()
    .single<Note>()
    .then(({ data, error }) => {
      if (error) {
        throw error;
      }

      return data
    });

  return res
}

export async function resetUserProgress() {
  const user = await supabase.auth.getUser()
  const uid = user.data.user?.id

  if (!uid) return null

  await supabase
    .from(NOTES_TABLE)
    .delete()
    .match({ uid })
    .then(({ error }) => {
      if (error) {
        throw error;
      }
    });
}