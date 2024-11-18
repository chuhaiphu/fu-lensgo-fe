import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from "react-icons/fa";
import { getBookingByIdApi } from '../../apis/booking';
import { useParams } from 'react-router-dom';

const BookingConfirmationPage = () => {
    const { bookingId } = useParams();
    const [bookingDetails, setBookingDetails] = useState(null);

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await getBookingByIdApi(bookingId);
                setBookingDetails(response.content);
            } catch (error) {
                console.error("Error fetching booking details:", error);
            }
        };
        fetchBookingDetails();
    }, [bookingId]);

    return (
        <div >
            <div className="px-20 py-5">
                {/*Step process */}
                <div className="max-w-screen-lg mx-auto pb-10 px-4">
                    <div className="flex justify-center mb-8">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center text-gray-400">
                                <div className="w-8 h-8 flex items-center justify-center bg-gray-300 text-white rounded-full">
                                    1
                                </div>
                                <span className="ml-2  text-gray-700">Confirmation</span>
                            </div>
                            <div className="flex items-center text-gray-400">
                                <div className="w-8 h-8 flex items-center justify-center bg-gray-300 text-white rounded-full">
                                    2
                                </div>
                                <span className="ml-2  text-gray-700">Photo Shoot Details</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full">
                                    3
                                </div>
                                <span className="ml-2 font-semibold">Confirmation</span>
                            </div>
                        </div>
                    </div>

                </div>
                {/*camera and confirmation word */}
                <div className="flex items-center justify-between  rounded-lg shadow-lg max-w-full overflow-hidden">
                    {/* Left Image */}
                    <div className="w-3/12 h-3/12  flex-shrink-0">
                        <img
                            src="/public/image/Booking/leftCam.jpg"
                            alt="Left Camera"
                            className="w-full h-full object-cover shadow-lg"
                        />
                    </div>

                    {/* Middle Text */}
                    <div className="flex-grow mt-12 justify-center items-center">
                        <h2 className="text-center font-semibold text-4xl text-gray-800 font-sans">
                            Confirmation
                        </h2>
                    </div>

                    {/* Right Image */}
                    <div className="w-3/12 h-3/12 flex-shrink-0">
                        <img
                            src="/public/image/Booking/rightCam.jpg"
                            alt="Right Camera"
                            className="w-full h-full object-cover shadow-lg"
                        />
                    </div>
                </div>

                {/*Confirmation */}
                <div className="mt-10">
                    <div className="flex w-full h-2/4">
                        {/* Left Div - 55% */}
                        <div className="w-3/5 p-4  ">
                            <div className=" pl-40">
                                <h1 className="text-3xl font-bold">Booked !</h1> {/* Adjust size and weight here */}
                            </div>

                            <div className="flex p-4">

                                {/* Content Section */}
                                <div className="flex p-10 "> {/* Increased padding */}
                                    {/* Left: Image */}
                                    <div className="flex-shrink-0">
                                        <img
                                            src="https://via.placeholder.com/200" // Increased image size (adjust as needed)
                                            alt="Photographer"
                                            className="rounded-full mb-6" // Increased bottom margin
                                        />
                                    </div>

                                    {/* Right: Text Information */}
                                    <div className="flex flex-col justify-center ml-8"> {/* Increased left margin */}
                                        <div className="flex mb-6"> {/* Increased bottom margin */}
                                            <span className="font-bold text-2xl">Photographer:</span> {/* Bold and increased font size */}
                                            <span className="ml-4 bg-black text-white font-bold px-4 py-3 rounded-3xl text-xl">Elsa</span> {/* Increased padding and font size */}
                                        </div>
                                        <div className="flex mb-6"> {/* Increased bottom margin */}
                                            <span className="font-bold text-2xl">Time:</span> {/* Bold and increased font size */}
                                            <span className="ml-4 bg-black text-white font-bold px-4 py-3 rounded-3xl text-xl">4PM - 5PM</span> {/* Increased padding and font size */}
                                        </div>
                                        <div className="flex"> {/* Increased bottom margin */}
                                            <span className="font-bold text-2xl">Day:</span> {/* Bold and increased font size */}
                                            <span className="ml-4 bg-black text-white font-bold px-4 py-3 rounded-3xl text-xl">7/7/2024</span> {/* Increased padding and font size */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex  p-4">

                                {/* Content Section */}
                                <div className="flex p-10 "> {/* Increased padding */}
                                    {/* Left: Image */}
                                    <div className="flex mb-6 mr-20"> {/* Increased bottom margin */}
                                        <span className="font-bold text-2xl">Concept:</span> {/* Bold and increased font size */}

                                    </div>


                                    {/* Right: Text Information */}
                                    <div className="flex flex-col justify-center ml-8"> {/* Increased left margin */}
                                        <div className="flex mb-6"> {/* Increased bottom margin */}
                                            <span className="ml-4 bg-black text-white font-bold px-4 py-3 rounded-3xl text-xl">Food 100k</span> {/* Increased padding and font size */}
                                        </div>
                                        <div className="flex mb-6"> {/* Increased bottom margin */}
                                            <span className="ml-4 bg-black text-white font-bold px-4 py-3 rounded-3xl text-xl">Sport 150k</span> {/* Increased padding and font size */}
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="flex  p-4">

                                {/* Content Section */}
                                <div className="flex p-10 "> {/* Increased padding */}
                                    {/* Left: Image */}
                                    <div className="flex mb-6 mr-17"> {/* Increased bottom margin */}
                                        <span className="font-bold text-2xl">Combo:</span> {/* Bold and increased font size */}

                                    </div>


                                    {/* Right: Text Information */}
                                    <div className="flex flex-col justify-center ml-8"> {/* Increased left margin */}
                                        <div className="flex mb-6"> {/* Increased bottom margin */}
                                            <span className="ml-4 bg-black text-white font-bold px-4 py-3 rounded-3xl text-xl">1 hour photo shoot 299k</span> {/* Increased padding and font size */}
                                        </div>


                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Center Line */}
                        <div className="flex items-center p-2">
                            <div className="w-2 border-2 border-black h-full "></div>
                        </div>

                        {/* Right Div - 45% */}
                        <div className="w-2/5 p-4">
                            <div className="flex p-4">

                                {/* Content Section */}
                                <div className="flex p-5 justify-center items-center"> {/* Increased padding */}
                                    {/* Left: Image */}
                                    <div className="flex mb-6 mr-17"> {/* Increased bottom margin */}
                                        <span className="font-bold text-2xl">Customer Name:</span> {/* Bold and increased font size */}

                                    </div>


                                    {/* Right: Text Information */}
                                    <div className="flex flex-col justify-center ml-8"> {/* Increased left margin */}
                                        <div className="flex mb-6"> {/* Increased bottom margin */}
                                            <span className="ml-4 bg-black text-white font-bold px-4 py-3 rounded-3xl text-xl">Phuc Loc</span> {/* Increased padding and font size */}
                                        </div>


                                    </div>
                                </div>
                            </div>

                            <div className="flex  p-4">

                                {/* Content Section */}
                                <div className="flex p-5 justify-center items-center"> {/* Increased padding */}
                                    {/* Left: Image */}
                                    <div className="flex mb-6 mr-17"> {/* Increased bottom margin */}
                                        <span className="font-bold text-2xl">Phone Number:</span> {/* Bold and increased font size */}

                                    </div>


                                    {/* Right: Text Information */}
                                    <div className="flex flex-col justify-center ml-8"> {/* Increased left margin */}
                                        <div className="flex mb-6"> {/* Increased bottom margin */}
                                            <span className="ml-4 bg-black text-white font-bold px-4 py-3  text-xl">012358685</span> {/* Increased padding and font size */}
                                        </div>


                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center p-4">

                                {/* Content Section */}
                                <div className="flex p-5 justify-center items-center "> {/* Increased padding */}
                                    {/* Left: Image */}
                                    <div className="flex mb-6 mr-17"> {/* Increased bottom margin */}
                                        <FaMapMarkerAlt className=" mr-2 text-5xl" /> {/* Location Icon */}
                                    </div>


                                    {/* Right: Text Information */}
                                    <div className="flex flex-col justify-center ml-8"> {/* Increased left margin */}
                                        <div className="flex mb-6"> {/* Increased bottom margin */}
                                            <span className="ml-4 text-black font-bold px-4 py-3  text-xl">Sai Gon, Viet Nam</span> {/* Increased padding and font size */}
                                        </div>


                                    </div>
                                </div>
                            </div>

                            <div className="flex  p-4">

                                {/* Content Section */}
                                <div className="flex justify-center items-center p-5 "> {/* Increased padding */}
                                    {/* Left: Image */}
                                    <div className="flex mb-6 mr-17"> {/* Increased bottom margin */}
                                        <span className="font-bold text-2xl">Status:</span> {/* Bold and increased font size */}

                                    </div>


                                    {/* Right: Text Information */}
                                    <div className="flex flex-col justify-center ml-8"> {/* Increased left margin */}
                                        <div className="flex mb-6"> {/* Increased bottom margin */}
                                            <span className="ml-4 text-black font-bold px-4 py-3  text-2xl">Booked</span> {/* Increased padding and font size */}
                                        </div>


                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className=" mx-auto bg-white shadow-md rounded-lg p-6">
                        <form>
                            {/* Meeting Location */}
                            <div className="mb-4">
                                <label className="block text-lg font-semibold mb-2">Meeting location:</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-400 p-2 rounded-lg"
                                    placeholder="Enter location"
                                />
                            </div>

                            {/* Additional Info */}
                            <div className="mb-4">
                                <label className="block text-lg font-semibold mb-2">Additional Info:</label>
                                <textarea
                                    className="w-full border border-gray-400 p-2 rounded-lg"
                                    rows="4"
                                    placeholder="Provide additional information"
                                ></textarea>
                            </div>

                            {/* Total Payment */}
                            <div className="flex items-center justify-between mb-4">
                                {/* Total Payment Section */}
                                <div className="flex items-center">
                                    <label className="text-lg font-semibold">Total Payment:</label>
                                    <span className="text-lg font-semibold border border-gray-400 p-2 ml-2 rounded-lg">
                                        599k
                                    </span>
                                </div>

                                {/* Buttons */}
                                <div className="ml-4">
                                    <button
                                        type="button"
                                        className="bg-teal-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-teal-700"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>


            </div >
        </div>
    );
};

export default BookingConfirmationPage;