import React from 'react'

function EditForm() {
  return (
    <div className="grid grid-cols-1 gap-y-8 pt-10 w-2/5 mx-auto">
      <form className="bg-white shadow-sm ring-1 ring-black md:col-span-2">
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-y-8">
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Album name
              </label>
              <div className="mt-2">
                <input
                  className="block w-full border-2 border-black py-1.5 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Concept
              </label>
              <div className="mt-2">
                <input
                  className="block w-full border-2 border-black py-1.5 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Price
              </label>
              <div className="mt-2">
                <input
                  className="block w-full border-2 border-black py-1.5 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <button type="button" className="px-3 py-2 text-sm font-semibold text-white bg-gray-500">
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-2 text-sm font-semibold text-white bg-black"
          >
            Save
          </button>
        </div>
      </form>

    </div>
  )
}

export default EditForm