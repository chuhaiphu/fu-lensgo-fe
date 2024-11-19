import React, { useState, useEffect } from 'react';
import { createCombo, getCombosByStudioIdApi } from '../../apis/combo';

function Combo({ studio }) {
  const [combos, setCombos] = useState([]);
  const [comboFormData, setComboFormData] = useState({
    name: '',
    editedPhotos: 0,
    downloadablePhotos: 0,
    duration: 0,
    price: 0,
    status: 'ACTIVE'
  });

  useEffect(() => {
    const fetchCombos = async () => {
      if (studio?.id) {
        try {
          const response = await getCombosByStudioIdApi({ studioId: studio.id });
          setCombos(response.content);
        } catch (error) {
          console.error('Error fetching combos:', error);
        }
      }
    };
    fetchCombos();
  }, [studio]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createCombo({...comboFormData, studioId: studio.id});
      console.log('Combo created:', response);
      // Refresh combos list
      const updatedCombos = await getCombosByStudioIdApi({ studioId: studio.id });
      setCombos(updatedCombos.content);
      // Reset form
      setComboFormData({
        name: '',
        editedPhotos: 0,
        downloadablePhotos: 0,
        duration: 0,
        price: 0,
        status: 'ACTIVE'
      });
    } catch (error) {
      console.error('Error creating combo:', error);
    }
  };

  return (
    <div className="flex gap-8 p-6">
      <div className="w-1/2 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Create New Combo</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Combo Name</label>
            <input
              type="text"
              value={comboFormData.name}
              onChange={(e) => setComboFormData({...comboFormData, name: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black p-2 border"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Edited Photos</label>
              <input
                type="number"
                value={comboFormData.editedPhotos}
                onChange={(e) => setComboFormData({...comboFormData, editedPhotos: parseInt(e.target.value)})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black p-2 border"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Downloadable Photos</label>
              <input
                type="number"
                value={comboFormData.downloadablePhotos}
                onChange={(e) => setComboFormData({...comboFormData, downloadablePhotos: parseInt(e.target.value)})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black p-2 border"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
              <input
                type="number"
                value={comboFormData.duration}
                onChange={(e) => setComboFormData({...comboFormData, duration: parseInt(e.target.value)})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black p-2 border"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                value={comboFormData.price}
                onChange={(e) => setComboFormData({...comboFormData, price: parseInt(e.target.value)})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black p-2 border"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300 ease-in-out"
          >
            Create Combo
          </button>
        </form>
      </div>

      <div className="w-1/2">
        <h2 className="text-2xl font-bold mb-6">Existing Combos</h2>
        <div className="space-y-4">
          {combos.map((combo) => (
            <div 
              key={combo.id} 
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{combo.name}</h3>
                <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                  {combo.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-gray-600">
                <div>
                  <p>Edited Photos: {combo.editedPhotos}</p>
                  <p>Downloadable: {combo.downloadablePhotos}</p>
                </div>
                <div>
                  <p>Duration: {combo.duration} mins</p>
                  <p className="font-semibold text-black">
                    Price: ${combo.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Combo;
