import React, { useState, useEffect } from 'react'
import { Cog6ToothIcon } from '@heroicons/react/24/solid'
import ReviewComponent from './Review'
import Combo from './Combo'
import { jwtDecode } from 'jwt-decode'
import { getAccountByEmail } from '../../apis/user-api'
import { getStudioByIdApi } from '../../apis/studio-api'
import ShootingType from './ShootingType'
import Concept from './Concept'
import Calendar from './Calendar'
import ClientBookingHistory from './ClientBookingHistory'
import { getBookingsByStudioId } from '../../apis/booking'
import Album from './Album/Album'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

function PhotographerProfile() {
  const [selectedSection, setSelectedSection] = useState(null)
  const [studio, setStudio] = useState(null)
  const backgroundImage = 'https://pangolinphoto.com/wp-content/uploads/2020/05/Guest-with-camera-gear-on-safari-in-Botswana-Pangolin-Photo-Safaris-scaled.webp'
  const profileImage = 'https://extendedstudies.ucsd.edu/getattachment/news-and-events/division-of-extended-studies-blog/April-2023/How-to-Take-Better-Photographs-in-2023-Understandi/800x567-G-Photography-1059413038.jpg.aspx?width=800&'
  const userName = 'John Doe'

  const menuItems = [
    { id: 'concept', label: 'Manage Concept' },
    { id: 'combo', label: 'Manage Combo' },
    { id: 'shootingType', label: 'Manage Shooting Type' },
    { id: 'calendar', label: 'Manage Calendar' },
    { id: 'album', label: 'Manage Album' },
    { id: 'bookingHistory', label: 'View Booking History' }
  ]

  const [bookings, setBookings] = useState([])
  const navigate = useNavigate()
  const handleBackHome = () => {
    navigate('/')
  }
  
  useEffect(() => {
    const fetchStudioData = async () => {
      const accessToken = localStorage.getItem('access_token')
      if (accessToken) {
        const decodedToken = jwtDecode(JSON.parse(accessToken))
        const email = decodedToken.sub
        try {
          const accountResponse = await getAccountByEmail(email)
          const studioId = accountResponse.content.studioId
          if (studioId) {
            const studioResponse = await getStudioByIdApi(studioId)
            setStudio(studioResponse.content)
            const bookingsResponse = await getBookingsByStudioId(studioResponse.content.id)
            setBookings(bookingsResponse)
          }
        } catch (error) {
          console.error("Error fetching studio data:", error)
        }
      }
    }
    fetchStudioData()
  }, [])

  const handleMenuClick = (sectionId) => {
    setSelectedSection(selectedSection === sectionId ? null : sectionId)
  }

  return (
    <>
      <div className="p-4">
        <Button
          onClick={handleBackHome}
          variant="outlined"
          size="md"
          styleClass="mb-4"
        >
          Back to Home
        </Button>
      </div>
      <div className="relative flex flex-col mb-8">
        {/* <div className="relative justify-center items-center mb-4">
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
        </div> */}

        <div className='flex justify-evenly mx-8 pb-4 border-b-2 border-[#8A6F6F]'>
          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`p-2 text-lg font-semibold shadow-sm border transition duration-300 ease-in-out
    ${selectedSection === item.id
                  ? 'bg-black text-white hover:bg-gray-800 hover:text-gray-200'
                  : 'bg-white text-black hover:bg-gray-200 hover:text-black'
                } border-black`}
              onClick={() => handleMenuClick(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {selectedSection === 'combo' && <Combo studio={studio} />}
      {selectedSection === 'shootingType' && <ShootingType studio={studio} />}
      {selectedSection === 'concept' && <Concept studio={studio} />}
      {selectedSection === 'calendar' && <Calendar studio={studio} />}
      {selectedSection === 'album' && <Album />}
      {selectedSection === 'bookingHistory' && <ClientBookingHistory bookings={bookings} />}
    </>
  )
}

export default PhotographerProfile