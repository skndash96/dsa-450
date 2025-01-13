import React from 'react'
import { FaSpinner } from 'react-icons/fa6'
import { useNotes } from '../hooks/useNotes';
import { useAuth } from '../hooks/useAuth';

export default function Loading() {
  const { loading: notesLoading } = useNotes();
  const { loading: authLoading } = useAuth();

  return (
    (notesLoading || authLoading) && (
      <div id="screen" className='fixed inset-0 bg-black/70 z-1 flex justify-center items-center'>
        <FaSpinner className='animate-spin text-teal-400' size={40} />
      </div>
    )
  )
}
