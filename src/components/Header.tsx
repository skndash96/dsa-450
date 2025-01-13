import React, { useEffect } from 'react'
import { FaSun } from "react-icons/fa";
import { supabase } from '../utils/supabase';
import { useAuth } from '../hooks/useAuth';
import { useNotifs } from '../hooks/useNotifs';
import { Link } from 'wouter';

export default function Header() {
  const { user } = useAuth();
  const { addNotification } = useNotifs();
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light')

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'

    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  useEffect(() => {
    const prevTheme = localStorage.getItem('theme') as 'light' | 'dark'
    setTheme(prevTheme ?? 'light')

    if (theme === 'light') {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }, [theme])

  const handleLogin = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google'
    })
    .catch(err => {
      addNotification("Could not open Google Oauth Screen. Failed to login.", 'error')
      console.error(err)
    });
  }

  return (
    <header className='p-2 flex justify-between w-full max-w-5xl mx-auto'>
      <h1 className='text-lg sm:text-2xl font-bold text-center'>
        <Link to='/' className="hover:underline">
          450 DSA Cracker
        </Link>
      </h1>

      <div className='flex mx-4 gap-4'>
        <button className='flex gap-2 items-center group' onClick={toggleTheme}>
          <FaSun className='text-teal-500' size={20} />
          <span className='max-sm:hidden group-hover:underline'>Theme</span>
        </button>

        {user ? (
          <Link href="/account" className="self-center hover:underline">
            Account
          </Link>
        ) : (
          <button className='flex gap-2 items-center hover:underline' onClick={handleLogin}>
            Login
          </button>
        )}
      </div>
    </header>
  )
}
