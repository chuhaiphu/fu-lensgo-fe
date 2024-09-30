import React from 'react'
import { Cog6ToothIcon } from '@heroicons/react/24/solid'
import ReviewComponent from './Review'

function Profile() {
  const backgroundImage = 'https://pangolinphoto.com/wp-content/uploads/2020/05/Guest-with-camera-gear-on-safari-in-Botswana-Pangolin-Photo-Safaris-scaled.webp'
  const profileImage = 'https://extendedstudies.ucsd.edu/getattachment/news-and-events/division-of-extended-studies-blog/April-2023/How-to-Take-Better-Photographs-in-2023-Understandi/800x567-G-Photography-1059413038.jpg.aspx?width=800&'
  const foodImage = 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg'
  const sportImage = 'https://storage.googleapis.com/pod_public/1300/167703.jpg'
  const portraitImage = 'https://res.cloudinary.com/dqzkirtbz/image/upload/w_auto/q_auto,f_auto,dpr_auto/v1698342290/Website/blog/female_portrait_postcrest.jpg'
  const userName = 'John Doe'

  return (
    <>
        <div className="relative flex flex-col mb-8">
      <div className="relative justify-center items-center mb-4">
        <img
          className="w-full h-96 2xl:h-128 shadow-lg object-cover opacity-90"
          src={backgroundImage}
          alt="user-background"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <img
              className="rounded-full w-32 h-32 shadow-xl object-cover mb-3"
              src={profileImage}
              alt="user-pic"
            />
            <div className="font-bold text-xl text-center text-white bg-black px-6 py-3 rounded-full mb-3">
              {userName}
            </div>
            <button
              type="button"
              className="rounded-full bg-[#D9D9D9] bg-opacity-40 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-opacity-60 transition duration-300 ease-in-out"
            >
              Edit Avatar
            </button>
          </div>
        </div>
        <div className="absolute top-2 left-2 outline-none shadow-md">
          <button
            type="button"
            className="rounded-full bg-[#D9D9D9] bg-opacity-40 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-opacity-60 transition duration-300 ease-in-out"
          >
            Update Background
          </button>
        </div>

        <button
          type="button"
          className="absolute top-4 right-4 cursor-pointer outline-none transition-all duration-300 ease-in-out hover:scale-125 hover:rotate-90"
        >
          <Cog6ToothIcon className="h-8 w-8 text-black" aria-hidden="true" />
        </button>
      </div>

      <div className='flex justify-evenly mx-8 pb-4 border-b-2 border-[#8A6F6F]'>
        <button
          type="button"
          className="bg-white p-2 text-lg font-semibold text-black shadow-sm border border-black transition duration-300 ease-in-out hover:bg-black hover:text-white"
        >
          Transaction History
        </button>
        <button
          type="button"
          className="bg-white p-2 text-lg font-semibold text-black shadow-sm border border-black transition duration-300 ease-in-out hover:bg-black hover:text-white"
        >
          Booked Calendar
        </button>
      </div>

      <div>
        <h1 className='mx-8 my-4 font-bold text-2xl'>My Album</h1>
        <div>
          <div className="grid grid-cols-4 grid-rows-3 w-full h-[80vh] relative">
            {['Food', 'Sport', 'Portrait'].map((category, rowIndex) => (
              <React.Fragment key={category}>
                <div className="absolute left-0 w-40 h-40 flex items-center justify-center transform -translate-x-1/2 scale-75" style={{ top: `${(rowIndex * 100 / 3) + 6}%` }}>
                  <div className="w-full h-full bg-gray-200 rounded-full flex flex-col items-center justify-center transform rotate-[-90deg]">
                    <span className="text-xl mt-16 font-bold">{category}</span>
                    <span className="text-xl font-bold">10$</span>
                  </div>
                </div>
                {[...Array(4)].map((_, index) => (
                  <img
                    key={`${category.toLowerCase()}-${index}`}
                    src={eval(`${category.toLowerCase()}Image`)}
                    className="w-full h-full object-cover"
                    alt={category}
                  />
                ))}
              </React.Fragment>
            ))}
          </div>

        </div>
      </div>
    </div>
    <ReviewComponent />
    </>

  )
}

export default Profile
