import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'

export default function NotFound() {
  return (
    <div className="grow text-center mt-12">
      <div className="mt-8 w-fit mx-auto text-amber-600 text-6xl">
        <FaExclamationTriangle />
      </div>
      <h1 className="mt-4 text-xl font-bold">
        404 - Page Not Found
      </h1>
      <p className="mt-4 text-lg">
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  )
}
