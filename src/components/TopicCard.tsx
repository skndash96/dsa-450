import { Topic } from "../services/dbService";
import React, { useMemo } from "react";
import { useNotes } from "../hooks/useNotes";

export default function TopicCard({
  topic
}: {
  topic: Topic
}) {
  const { notes } = useNotes();

  const [total, done] = useMemo(() => {
    const total = topic.questions.length;
    const questions = notes[topic.id] ?? {};
    const done = Object.values(questions).filter(note => note.done).length;

    return [total, done];
  }, [notes]);

  return (
    <div className={`px-6 py-4 w-full h-full flex flex-col justify-between cursor-pointer rounded-xl duration-200 hover:scale-105 shadow-sm hover:shadow-lg text-neutral-800 dark:text-neutral-700 ${done > 0 ? "bg-[#aad6b9]" : "bg-[#aad0f6]"}`}>
      <div>
        <h1 className="text-2xl font-bold">
          {topic.name}
        </h1>

        <div className="mt-2">
          <span>
            Total Questions {total}
          </span>
        </div>

        {done > 0 && (
          <span>
            {total - done} More to go
          </span>
        )}
      </div>

      {done > 0 ? (
        <div className="mt-4">
          <span>
            {Math.floor(done * 100 / total)}% Done
          </span>

          <div className="w-full relative h-4 rounded-xl overflow-hidden bg-slate-100">
            <div style={{
              width: `${done * 100 / total}%`
            }} className={`h-full bg-emerald-600`} />
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <span>
            Not Started Yet
          </span>
        </div>
      )}

    </div>
  )
}