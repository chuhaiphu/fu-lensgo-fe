import React, { useState, useEffect } from 'react'
import { createConcept, createStudioConcept, getStudioConceptsByStudioId, getConceptByConceptId } from '../../apis/concept'

function Concept({studio}) {
  const [concepts, setConcepts] = useState([])
  const [conceptFormData, setConceptFormData] = useState({
    name: '',
    description: '',
    status: 'ACTIVE'
  })

  const fetchConcepts = async () => {
    if (studio?.id) {
      try {
        const studioConcepts = await getStudioConceptsByStudioId({ studioId: studio.id })
        const conceptPromises = studioConcepts.content.map(studioConcept => 
          getConceptByConceptId(studioConcept.conceptId)
        )
        const conceptDetails = await Promise.all(conceptPromises)
        const combinedData = studioConcepts.content.map((studioConcept, index) => ({
          ...studioConcept,
          conceptDetails: conceptDetails[index]
        }))
        setConcepts(combinedData)
      } catch (error) {
        console.error('Error fetching concepts:', error)
      }
    }
  }

  useEffect(() => {
    fetchConcepts()
  }, [studio])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const createdConcept = await createConcept({
        name: conceptFormData.name,
        description: conceptFormData.description,
        status: "ACTIVE"
      })
      
      await createStudioConcept({
        studioId: studio.id,
        conceptId: createdConcept.content.id,
        price: conceptFormData.price,
        status: "ACTIVE"
      })
      
      await fetchConcepts()
      setConceptFormData({
        name: '',
        description: '',
        price: 0,
        status: 'ACTIVE'
      })
    } catch (error) {
      console.error('Error creating concept:', error)
    }
  }

  return (
    <div className="flex gap-8 p-6">
      <div className="w-1/2 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Create New Concept</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Concept Name</label>
            <input
              type="text"
              value={conceptFormData.name}
              onChange={(e) => setConceptFormData({...conceptFormData, name: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black p-2 border"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={conceptFormData.description}
              onChange={(e) => setConceptFormData({...conceptFormData, description: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black p-2 border"
              rows="4"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              value={conceptFormData.price}
              onChange={(e) => setConceptFormData({...conceptFormData, price: parseInt(e.target.value)})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black p-2 border"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300 ease-in-out"
          >
            Create Concept
          </button>
        </form>
      </div>

      <div className="w-1/2">
        <h2 className="text-2xl font-bold mb-6">Existing Concepts</h2>
        <div className="space-y-4">
          {concepts.map((concept) => (
            <div 
              key={concept.id} 
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{concept.conceptDetails.content.name}</h3>
                <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                  {concept.status}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{concept.conceptDetails.content.description}</p>
              <p className="font-semibold text-black">
                Price: {concept.price} vnđ
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Concept