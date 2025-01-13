import React from 'react'
import { useNotes } from '../hooks/useNotes'
import dataFinal from '../dataFinal'
import TopicCard from '../components/TopicCard'
import Footer from '../components/Footer'
import { Link } from 'wouter'
import { getTopicKeyFromName } from '../utils/functions'

export default function Home() {
  const {
    done,
    total
  } = useNotes()

  return (
    <div className='p-8 pt-2'>
      <div className='w-fit mx-auto'>
        <h2 className='text-2xl text-center font-semibold'>
          Your Gateway to crack DSA 🔥
        </h2>

        <div className='mt-4'>
          {done > 0 ? (
            <p className='text-lg text-center'>
              Total Questions Solved : {done} ({Math.ceil(done * 100 / total)}% Done)
            </p>
          ) : (
            <p className='text-lg text-center'>
              Not Started Yet
            </p>
          )}
        </div>
      </div>

      <ul className='mt-8 grid sm:grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto gap-6'>
        {dataFinal.map(topic => (
          <li className='flex-1 flex justify-stretch' key={topic.id}>
            <Link to={`/topics/${getTopicKeyFromName(topic.name)}`} className="w-full">
              <TopicCard topic={topic} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
