import React from 'react'

function NoFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-7xl font-extrabold text-red-500">404</h1>
      <p className="mt-4 text-2xl font-semibold">Page Not Found</p>
      <p className="mt-2 text-gray-600">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => window.location.href = '/'}
        className="mt-6 px-6 py-3 text-lg font-medium text-white bg-blue-500 rounded-md shadow hover:bg-blue-600 transition-all"
      >
        Go Back Home
      </button>
    </div>
  )
}

export default NoFoundPage