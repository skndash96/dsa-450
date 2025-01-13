import React, { useState } from 'react'
import { PiStickerDuotone, PiStickerFill } from 'react-icons/pi'
import { getImageOfProblem } from '../utils/functions'
import { Note, Question } from '../services/dbService'
import { useNotes } from '../hooks/useNotes'
import { IoIosStar, IoIosStarOutline } from 'react-icons/io'

export default function ProblemRow({
  question,
  tid,
  notes
}: {
  question: Question,
  tid: string,
  notes: Note | undefined
}) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(notes?.text);
  const { setNotes } = useNotes()

  const handleDoneClick = () => {
    setNotes(question.id, tid, {
      done: !notes?.done,
    })
  }

  const handleStarClick = () => {
    setNotes(question.id, tid, {
      starred: !notes?.starred,
    })
  }

  const handleNoteClick = () => {
    setEditing(!editing)
  }

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }
  
  const handleNoteCancel = () => {
    setText(notes?.text)
    setEditing(false)
  }

  const handleNoteSave = () => {
    setNotes(question.id, tid, {
      text: text,
    })
    setEditing(false)
  }

  return (
    <>
      <tr className={`*:p-1 sm:*:p-2 *:border-2 *:border-neutral-500 border-collapse ${notes?.done ? 'bg-green-100 dark:bg-green-900' : ''}`}>
        <td>
          <input checked={notes?.done ?? false} onChange={handleDoneClick} type="checkbox" />
        </td>
        <td>
          {question.position}
        </td>
        <td className='max-w-32 sm:max-w-72 md:max-w-lg lg:max-w-2xl xl:max-w-4xl'>
          <a href={question.links[0]} target='_blank' rel='noreferrer' className='text-blue-700 dark:text-blue-500 hover:underline'>
            {question.problem}
          </a>
        </td>
        <td>
          {question.links.map((l, i) => (
            <a key={i} href={l} className='mr-2 last:mr-0 underline inline-block' target='_blank' rel='noreferrer'>
              <img
                width={20}
                height={20}
                src={getImageOfProblem(l)}
                alt={l.split(".")[l.split(".").length - 2]}
              />
            </a>
          ))}
        </td>
        <td className='text-xl text-teal-800 dark:text-teal-600'>
          <button className='mx-auto ml-2 mr-2' onClick={handleStarClick}>
            {notes?.starred ? <IoIosStar /> : <IoIosStarOutline />}
          </button>
          <button onClick={handleNoteClick} className=''>
            {notes?.text ? <PiStickerFill /> : <PiStickerDuotone />}
          </button>
        </td>
      </tr>

      {editing && (
        <tr>
          <td></td>
          <td></td>
          <td className=''>
            <textarea onChange={handleNoteChange} placeholder='What you learnt?' className='p-2 w-full h-20 bg-neutral-200' defaultValue={notes?.text}>
            </textarea>
            <div className='mb-4 w-fit ml-auto'>
              <button onClick={handleNoteCancel} className='mr-4 hover:underline'>
                cancel
              </button>
              <button onClick={handleNoteSave} className='hover:underline'>
                save
              </button>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}
