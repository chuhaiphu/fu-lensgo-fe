import React from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import ImageArray from './ImageArray'
import EditForm from './EditForm'

function PhotographerEditPage() {
  return (
    <>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl justify-center'>
        <div className="my-10">
          <h2 className="text-2xl font-semibold leading-7 text-gray-900">Edit your album</h2>
        </div>
        <EditForm />
        <ImageArray />
        <EditForm />
        <ImageArray />
      </div>

    </>
  )
}

export default PhotographerEditPage