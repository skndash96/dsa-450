import React, { useEffect, useMemo, useState } from "react";
import { createContext, useContext } from "react";
import { getUserNotes, Note, setUserNote, UpdateNote } from "../services/dbService";
import { useTopics } from "./useTopics";
import { useNotifs } from "./useNotifs";

interface NotesContextType {
  total: number;
  done: number;
  loading: boolean;
  notes: Record<string, Record<string, Note>>,
  setNotes: (
    tid: string,
    qid: string,
    updateNote: UpdateNote
  ) => void
}

export const NotesContext = createContext<NotesContextType>({
  total: 0,
  done: 0,
  loading: true,
  notes: {},
  setNotes: () => { }
});

export const useNotes = () => {
  const data = useContext(NotesContext);

  if (!data) {
    throw new Error('useNotes must be used within a NotesProvider');
  }

  return data;
}

export const useTopicNotes = (tid: string) => {
  const data = useNotes();

  if (!data) {
    throw new Error('useTopicNotes must be used within a NotesProvider');
  }

  return data.notes[tid] ?? {};
}

export const NotesProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const data = useTopics();
  const { addNotification } = useNotifs();

  const [notes, _setNotes] = useState<Record<string, Record<string, Note>>>({});
  
  const [loading, setLoading] = useState(true);

  const [total, done] = useMemo(() => {
    let total = 0, done = 0;

    Object.values(data).forEach(topic => {
      total += topic.questions.length
      done += notes[topic.id]
        ? Object.values(notes[topic.id]).filter((note) => note.done).length
        : 0
    })

    return [total, done];
  }, [notes])

  useEffect(() => {
    getUserNotes()
    .then(data => {
      _setNotes(data);
    })
    .catch(error => {
      addNotification("Failed to fetch notes", 'error');
      console.error(error);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  const setNotes = (
    qid: string,
    tid: string,
    updateNote: UpdateNote
  ) => {
    setUserNote(qid, tid, updateNote)
      .then(data => {
        if (data === null) {
          addNotification("Please Log in first", 'info');
          return;
        }

        _setNotes({
          ...notes,
          [tid]: {
            ...(notes.hasOwnProperty(tid) ? notes[tid] : {}),
            [qid]: data
          }
        });
      })
      .catch(error => {
        addNotification("Failed to update note", 'error');
        console.error(error);
      });
  }

  return (
    <NotesContext.Provider value={{
      notes,
      setNotes,
      total,
      loading,
      done
    }}>
      {children}
    </NotesContext.Provider>
  )
}