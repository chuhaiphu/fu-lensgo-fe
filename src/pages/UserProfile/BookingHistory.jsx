import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/solid'
import { getStudioByIdApi } from '../../apis/studio-api'
import { getCombosByStudioIdApi } from '../../apis/combo'
import { getStudioConceptByStudioConceptId, getConceptByConceptId } from '../../apis/concept'
import { Modal, Rate, Input } from 'antd'
import { creatReviewApi } from '../../apis/review-api'

const statusColors = {
  PAID: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    icon: CheckCircleIcon
  },
  PENDING: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    icon: ClockIcon
  },
  CANCELLED: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    icon: XCircleIcon
  }
}

export default function BookingHistory({ bookings }) {
  const [enrichedBookings, setEnrichedBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [reviewForm, setReviewForm] = useState({
    content: '',
    rating: 0
  })

  useEffect(() => {
    const enrichBookingsData = async () => {
      if (!bookings?.content) return
      setIsLoading(true)
      try {
        const enrichedData = await Promise.all(
          bookings.content.map(async (booking) => {
            const studioData = await getStudioByIdApi(booking.studioId)
            const combosData = await getCombosByStudioIdApi({ studioId: booking.studioId })
            const combo = combosData.content.find(c => c.id === booking.comboId)
            const studioConcept = await getStudioConceptByStudioConceptId(booking.studioConceptId)
            const concept = await getConceptByConceptId(studioConcept.content.conceptId)
            
            return {
              ...booking,
              studioName: studioData.content.name,
              comboName: combo?.name,
              conceptName: concept.content.name
            }
          })
        )
        console.log(enrichedData);
        setEnrichedBookings(enrichedData)
      } finally {
        setIsLoading(false)
      }
    }

    enrichBookingsData()
  }, [bookings])

  const handleReviewSubmit = async () => {
    try {
      const reviewData = {
        bookingId: selectedBooking.id,
        studioId: selectedBooking.studioId,
        content: reviewForm.content,
        rating: reviewForm.rating,
        status: 'ACTIVE'
      }
      
      await creatReviewApi(reviewData)
      setIsReviewModalOpen(false)
      setReviewForm({ content: '', rating: 0 })
      // Optional: Add success message or refresh bookings
    } catch (error) {
      console.error('Failed to submit review:', error)
    }
  }

  const renderLoader = () => (
    <div className="mt-8 space-y-4 animate-pulse">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="bg-gray-100 rounded-lg p-4">
          <div className="grid grid-cols-9 gap-4">
            {[...Array(9)].map((_, colIndex) => (
              <div key={colIndex} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Booking History</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all your photo shoot bookings including status, date, and details.
          </p>
        </div>
      </div>
      
      {isLoading ? renderLoader() : (
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Studio</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Combo</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Concept</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Time</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Duration</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Location</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Price</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {enrichedBookings.map((booking) => {
                      const StatusIcon = statusColors[booking.status]?.icon
                      return (
                        <tr key={booking.id}>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {booking.studioName}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {booking.comboName}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {booking.conceptName}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {format(new Date(booking.dateOfPhotoshoot), 'MMM dd, yyyy')}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {format(new Date(booking.startTime), 'HH:mm')}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {booking.duration}h
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {booking.meetingLocation}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            ${booking.price.toLocaleString()}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium
                              ${statusColors[booking.status]?.bg} 
                              ${statusColors[booking.status]?.text}`}>
                              {StatusIcon && <StatusIcon className="mr-1 h-4 w-4" />}
                              {booking.status}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            {booking.status === 'PAID' && (
                              <button
                                onClick={() => {
                                  setSelectedBooking(booking)
                                  setIsReviewModalOpen(true)
                                }}
                                className="bg-blue text-white px-3 py-1 rounded-md text-sm"
                              >
                                Add Review
                              </button>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal
        title="Write a Review"
        open={isReviewModalOpen}
        onOk={handleReviewSubmit}
        onCancel={() => setIsReviewModalOpen(false)}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Rating</label>
            <Rate 
              value={reviewForm.rating}
              onChange={(value) => setReviewForm(prev => ({...prev, rating: value}))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Review</label>
            <Input.TextArea
              value={reviewForm.content}
              onChange={(e) => setReviewForm(prev => ({...prev, content: e.target.value}))}
              rows={4}
              placeholder="Write your review here..."
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}