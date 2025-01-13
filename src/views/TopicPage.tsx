import React, { useEffect, useMemo } from 'react'
import { Link, Redirect, useRoute } from 'wouter'
import { useTopic } from '../hooks/useTopics'
import { getTopicNameFromKey } from '../utils/functions'
import { useNotes, useTopicNotes } from '../hooks/useNotes'
import ProblemRow from '../components/ProblemRow'
import { useNotifs } from '../hooks/useNotifs'

export default function TopicPage() {
  const { addNotification } = useNotifs();
  const [match, params] = useRoute('/topics/:key')
  const topic = useTopic(params?.key ?? "")
  const notes = useTopicNotes(topic.id)
  
  const [doneQuestions, undoneQuestions] = useMemo(() => {
    const doneQuestions = [];
    const undoneQuestions = [];

    for (const q of topic.questions) {
      if (notes[q.id]?.done) {
        doneQuestions.push(q);
      } else {
        undoneQuestions.push(q);
      }
    }

    return [doneQuestions, undoneQuestions];
  }, [notes]);

  if (!match || !topic) {
    return <Redirect to='/404' />
  }

  const handleRandom = () => {
    if (undoneQuestions.length === 0) {
      addNotification('No more questions to do!', 'info');
      return
    } 

    const randomIdx = Math.floor(Math.random() * undoneQuestions.length);

    window.open(undoneQuestions[randomIdx].links[0], '_blank');
  }

  return (
    <div className='grow min-w-max max-w-5xl mx-auto'>
      <h1 className='text-center text-3xl'>
        <Link to="/">
          <span className='text-blue-500'>
            Topics
          </span>
        </Link>
        /{getTopicNameFromKey(params.key)}
      </h1>

      <div className='flex flex-row gap-4 w-fit'>
        <button onClick={handleRandom} className='px-2 border-2 border-white/50'>
          Pick Random
        </button>

        <div className='p-2 bg-green-300 text-neutral-700 font-bold'>
          <span>
            {doneQuestions.length}/{topic.questions.length} done ✅
          </span>
        </div>
      </div>
      
      <table className='mt-4 p-4'>
        <thead className='*:p-2'>
          <tr>
            <th>
              done
            </th>
            <th>
              id
            </th>
            <th>
              problem
            </th>
            <th>
              links
            </th>
            <th>
              actions
            </th>
          </tr>
        </thead>
        <tbody>
          {undoneQuestions.map(q => (
            <ProblemRow key={q.id} tid={topic.id} question={q} notes={notes[q.id]} />
          ))}
          {doneQuestions.map(q => (
            <ProblemRow key={q.id} tid={topic.id} question={q} notes={notes[q.id]} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
