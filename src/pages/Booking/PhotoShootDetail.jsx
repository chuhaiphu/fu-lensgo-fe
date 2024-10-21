import React, { useState } from 'react';

const PhotoShootDetail = () => {


    const [date, setDate] = useState('25 June 2024');
    const [time, setTime] = useState('');
    const [concept, setConcept] = useState('');

    return (
        <div>
            <div className="bg-yellow-100 p-2 justify-center items-center ">
                <h2 className="text-2xl font-semibold mb-8 bg-yellow-100 ml-14 mt-5">Let’s plan your photo shoot</h2>
            </div>
            {/* step view */}
            <div className="max-w-screen-lg mx-auto py-10 px-4">
                <div className="flex justify-center mb-8">
                    <div className="flex items-center space-x-4">
                    <div className="flex items-center text-gray-400">
                            <div className="w-8 h-8 flex items-center justify-center bg-gray-300 text-white rounded-full">
                                1
                            </div>
                            <span className="ml-2  text-gray-700">Confirmation</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full">
                                2
                            </div>
                            <span className="ml-2 font-semibold">Photo Shoot Details</span>
                        </div>
                        <div className="flex items-center text-gray-400">
                            <div className="w-8 h-8 flex items-center justify-center bg-gray-300 text-white rounded-full">
                                3
                            </div>
                            <span className="ml-2  text-gray-700">Confirmation</span>
                        </div>
                    </div>
                </div>

            </div>
            {/* Form  */}
            <div className="min-h-screen flex justify-center bg-gray-50">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full">
                    {/* Left Side - Fill Photo Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
                        <div>
                            <div className="border border-black font-bold mb-10">
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold mb-4">Fill Your Photo Details</h2>
                                    {/* Date Input */}
                                    <div className="mb-10">
                                        <label className="block font-medium text-gray-700  mb-4">Date*</label>
                                        <div className="relative mt-1">
                                            <input
                                                type="text"
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                placeholder="25 June 2024"
                                            />
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 4h10m2 0a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h1zm4 4h6m-6 4h6" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Time Input */}
                                    <div className="mb-10">
                                        <label className="block font-medium text-gray-700 mb-4">Time*</label>
                                        <select
                                            value={time}
                                            onChange={(e) => setTime(e.target.value)}
                                            className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="" disabled>What time do you want to shoot?</option>
                                            <option value="9 AM">9 AM</option>
                                            <option value="11 AM">11 AM</option>
                                            <option value="1 PM">1 PM</option>
                                            <option value="3 PM">3 PM</option>
                                        </select>
                                    </div>

                                    {/* Concept Input */}
                                    <div className="mb-10">
                                        <label className="block font-medium text-gray-700  mb-4">Concept*</label>
                                        <select
                                            value={concept}
                                            onChange={(e) => setConcept(e.target.value)}
                                            className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="" disabled>Which concept do you want?</option>
                                            <option value="Portrait">Portrait</option>
                                            <option value="Nature">Nature</option>
                                            <option value="Fashion">Fashion</option>
                                        </select>
                                    </div>

                                </div>
                            </div>

                            <div className="border border-black font-bold">
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold mb-4">More Details of Your Photo Details</h2>


                                    {/* Meeting Location Input */}
                                    <div className="mb-10">
                                        <label className="block font-medium text-gray-700  mb-4">Meeting Location*</label>
                                        <input
                                            type="text"
                                            placeholder="Where do you want to meet?"
                                            id="location"
                                            name="location"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        >
                                        </input>
                                    </div>

                                    {/* Additional Input */}
                                    <div className="mb-10">
                                        <label className="block font-medium text-gray-700  mb-4">Additional Infor*</label>
                                        <textarea
                                            placeholder="Tell us more about your photo shoot. (Eg: A family of 4 with 2 kids, this our first time visiting Da Lat)"
                                            id="location"
                                            name="location"
                                            required
                                            rows="4"
                                            className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Booking Details */}
                        <div>
                            <div className="bg-gray-100  p-6 border border-black font-bold">
                                <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
                                <div className="mb-4">
                                    <p className="text-gray-800 font-medium">Customer: Phuc Loc</p>
                                    <p className="text-gray-500">Sai Gon, Viet Nam</p>
                                    <p className="flex items-center text-gray-500">
                                        <svg className="h-5 w-5 text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 4h10m2 0a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h1zm4 4h6m-6 4h6" />
                                        </svg>
                                        1 hour Photo Shoot
                                    </p>
                                </div>

                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span className="text-2xl font-bold text-yellow-600">299k</span>
                                </div>

                                <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Checkout
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PhotoShootDetail;