'use client'

import { useEffect, useState } from 'react'
import {
  CreditCardIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import Header from '../../components/Header/Header'
import ProfileGeneral from './ProfileGeneral'
import BookingHistory from './BookingHistory'
import { jwtDecode } from 'jwt-decode'
import { getAccountByEmail } from '../../apis/user-api'
import { getBookingsByAccountIdApi } from '../../apis/booking'

const secondaryNavigation = [
  { name: 'General', icon: UserCircleIcon },
  { name: 'Booking History', icon: CreditCardIcon },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function UserProfile() {
  const [activeTab, setActiveTab] = useState('General')
  const [bookings, setBookings] = useState([])
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = localStorage.getItem('access_token')
      if (accessToken) {
        const decodedToken = jwtDecode(JSON.parse(accessToken))
        const email = decodedToken.sub
        try {
          const accountResponse = await getAccountByEmail(email)
          setUserData(accountResponse)
          const bookingsResponse = await getBookingsByAccountIdApi(accountResponse.content.id)
          setBookings(bookingsResponse)
        } catch (error) {
          console.error("Error fetching data:", error)
        }
      }
    }
    fetchUserData()
  }, [])

  const renderContent = () => {
    switch(activeTab) {
      case 'General':
        return <ProfileGeneral userData={userData} />
      case 'Booking History':
        return <BookingHistory bookings={bookings} />
      default:
        return <ProfileGeneral userData={userData} />
    }
  }
  return (
    <>
      <Header />
      <div className="mx-auto max-w-7xl lg:flex lg:gap-x-16 lg:px-8">
        <h1 className="sr-only">General Settings</h1>

        <aside className="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
          <nav className="flex-none px-4 sm:px-6 lg:px-0">
            <ul role="list" className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
              {secondaryNavigation.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => setActiveTab(item.name)}
                    className={classNames(
                      activeTab === item.name
                        ? 'bg-gray-50 text-indigo-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                      'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm/6 font-semibold w-full',
                    )}
                  >
                    <item.icon
                      aria-hidden="true"
                      className={classNames(
                        activeTab === item.name ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                        'size-6 shrink-0',
                      )}
                    />
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        {renderContent()}
      </div>
    </>
  )
}
