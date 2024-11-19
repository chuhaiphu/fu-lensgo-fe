import React, { useState, useEffect } from 'react'
import { createRecurringSchedule, getRecurringSchedulesByStudioId } from '../../apis/recurring-schedule'

function Calendar({ studio }) {
  const [schedules, setSchedules] = useState([])
  const [scheduleFormData, setScheduleFormData] = useState({
    dayOfWeek: 'MONDAY',
    startTime: '00:00:00.0',
    endTime: '00:00:00.0',
    status: 'ACTIVE'
  })

  const formatTime = (hour, minute) => {
    const paddedHour = hour.toString().padStart(2, '0');
    const paddedMinute = minute.toString().padStart(2, '0');
    return `${paddedHour}:${paddedMinute}:00.0`;
  }

  const daysOfWeek = [
    'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'
  ]

  useEffect(() => {
    const fetchSchedules = async () => {
      if (studio?.id) {
        try {
          const response = await getRecurringSchedulesByStudioId({ studioId: studio.id })
          setSchedules(response.content)
          console.log(response.content)
        } catch (error) {
          console.error('Error fetching schedules:', error)
        }
      }
    }
    fetchSchedules()
  }, [studio])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formattedData = {
        studioId: studio.id,
        dayOfWeek: scheduleFormData.dayOfWeek,
        startTime: scheduleFormData.startTime,
        endTime: scheduleFormData.endTime,
        status: scheduleFormData.status
      }

      const response = await createRecurringSchedule(formattedData)
      const updatedSchedules = await getRecurringSchedulesByStudioId({ studioId: studio.id })
      setSchedules(updatedSchedules.content)

      // Reset form
      setScheduleFormData({
        dayOfWeek: 'MONDAY',
        startTime: '00:00:00.0',
        endTime: '00:00:00.0',
        status: 'ACTIVE'
      })
    } catch (error) {
      console.error('Error creating schedule:', error)
    }
  }

  // Update the time input handlers
  const handleStartTimeChange = (type, value) => {
    const hour = type === 'hour' ? value : parseInt(scheduleFormData.startTime);
    const minute = type === 'minute' ? value : parseInt(scheduleFormData.startTime);
    setScheduleFormData({
      ...scheduleFormData,
      startTime: formatTime(hour, minute)
    });
  }

  const handleEndTimeChange = (type, value) => {
    const hour = type === 'hour' ? value : parseInt(scheduleFormData.endTime);
    const minute = type === 'minute' ? value : parseInt(scheduleFormData.endTime);
    setScheduleFormData({
      ...scheduleFormData,
      endTime: formatTime(hour, minute)
    });
  }

  return (
    <div className="flex gap-8 p-6">
      <div className="w-1/2 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Create New Schedule</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Day of Week</label>
            <select
              value={scheduleFormData.dayOfWeek}
              onChange={(e) => setScheduleFormData({ ...scheduleFormData, dayOfWeek: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black p-2 border"
            >
              {daysOfWeek.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Time (Hour : Minute)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={parseInt(scheduleFormData.startTime.split(':')[0])}
                  onChange={(e) => handleStartTimeChange('hour', parseInt(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black p-2 border"
                  placeholder="Hour"
                />
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={parseInt(scheduleFormData.startTime.split(':')[1])}
                  onChange={(e) => handleStartTimeChange('minute', parseInt(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black p-2 border"
                  placeholder="Minute"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">End Time (Hour : Minute)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={parseInt(scheduleFormData.endTime.split(':')[0])}
                  onChange={(e) => handleEndTimeChange('hour', parseInt(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black p-2 border"
                  placeholder="Hour"
                />
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={parseInt(scheduleFormData.endTime.split(':')[1])}
                  onChange={(e) => handleEndTimeChange('minute', parseInt(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black p-2 border"
                  placeholder="Minute"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300 ease-in-out"
          >
            Create Schedule
          </button>
        </form>
      </div>

      <div className="w-1/2">
        <h2 className="text-2xl font-bold mb-6">Existing Schedules</h2>
        <div className="space-y-4">
          {schedules.map((schedule) => (
            <div
              key={schedule.id}
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{schedule.dayOfWeek}</h3>
                <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                  {schedule.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-gray-600">
                <div>
                  <p>Start Time (Hour : Minute) {schedule.startTime}</p>
                </div>
                <div>
                  <p>End Time (Hour : Minute) {schedule.endTime}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Calendar