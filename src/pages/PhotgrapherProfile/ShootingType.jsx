import React, { useState, useEffect } from 'react'
import { createShootingType, getShootingTypeByStudioId } from '../../apis/shooting-type-api'

function ShootingType({ studio }) {
  const [shootingTypes, setShootingTypes] = useState([])
  const [shootingTypeFormData, setShootingTypeFormData] = useState({
    shootingType: 'OUTDOOR',
    price: 0,
    studioId: ''
  })

  useEffect(() => {
    const fetchShootingTypes = async () => {
      if (studio?.id) {
        try {
          const response = await getShootingTypeByStudioId(studio.id)
          setShootingTypes(response.content)
        } catch (error) {
          console.error('Error fetching shooting types:', error)
        }
      }
    }
    fetchShootingTypes()
  }, [studio])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await createShootingType({ ...shootingTypeFormData, studioId: studio.id })
      console.log('Shooting Type created:', response)
      // Refresh shooting types list
      const updatedTypes = await getShootingTypeByStudioId(studio.id)
      setShootingTypes(updatedTypes.content)
      // Reset form
      setShootingTypeFormData({
        shootingType: 'OUTDOOR',
        price: 0,
        studioId: ''
      })
    } catch (error) {
      console.error('Error creating shooting type:', error)
    }
  }

  return (
    <div className="flex gap-8 p-6">
      <div className="w-1/2 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Create New Shooting Type</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Shooting Type</label>
            <select
              value={shootingTypeFormData.shootingType}
              onChange={(e) => setShootingTypeFormData({...shootingTypeFormData, shootingType: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black p-2 border"
              required
            >
              <option value="OUTDOOR">Outdoor</option>
              <option value="INDOOR">Indoor</option>
              <option value="EVENT">Event</option>
              <option value="ART">Art</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              value={shootingTypeFormData.price}
              onChange={(e) => setShootingTypeFormData({...shootingTypeFormData, price: parseInt(e.target.value)})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black p-2 border"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300 ease-in-out"
          >
            Create Shooting Type
          </button>
        </form>
      </div>

      <div className="w-1/2">
        <h2 className="text-2xl font-bold mb-6">Existing Shooting Types</h2>
        <div className="space-y-4">
          {shootingTypes.map((type) => (
            <div 
              key={type.id} 
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">{type.shootingType}</h3>
                <p className="font-semibold text-black">
                  Price: ${type.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ShootingType