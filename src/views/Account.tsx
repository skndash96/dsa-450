import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Link, Redirect } from 'wouter';
import { supabase } from '../utils/supabase';
import { useNotifs } from '../hooks/useNotifs';
import { resetUserProgress } from '../services/dbService';

export default function Account() {
  const { user } = useAuth();
  const { addNotification } = useNotifs();

  const handleSignout = () => {
    supabase.auth.signOut()
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        addNotification("Failed to signout.", 'error')
        console.error(err)
      })
  }

  const handleReset = () => {
    if (window.confirm("Do you want to reset your progress?") && window.confirm("Are you sure you want to reset your Progress? Your NOTES, STARS will be DELETED!")) {
      resetUserProgress()
        .then(() => {
          addNotification("Progress reset successfully.", 'success')
        })
        .catch(err => {
          addNotification("Failed to reset progress.", 'error')
          console.error(err)
        })
    }
  }

  return (
    <div className='grow p-4 w-fit mx-auto'>
      <h1 className='text-2xl font-bold'>
        Account
      </h1>

      {user ? (
        <div>
          <div>
            <span>
              Email: {user?.email}
            </span>
          </div>

          <div className='mt-8 flex flex-col items-start gap-2'>
            <button className='hover:underline' onClick={handleSignout}>
              Signout
            </button>

            <button className='hover:underline' onClick={handleReset}>
              Reset progress
            </button>
          </div>
        </div>
      ) : (
        <Link href='/' className="hover-underline">
          Go Home
        </Link>
      )}

    </div>
  )
}
