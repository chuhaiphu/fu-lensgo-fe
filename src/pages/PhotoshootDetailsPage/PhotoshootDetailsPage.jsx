import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getRecurringSchedulesByStudioId } from '../../apis/recurring-schedule';
import { getStudioConceptsByStudioId, getConceptByConceptId } from '../../apis/concept';
import { jwtDecode } from 'jwt-decode';
import { getAccountByEmail } from '../../apis/user-api';
import { createBookingApi } from '../../apis/booking';

const PhotoshootDetailsPage = () => {
    const navigate = useNavigate();
    const { studioId, comboId, shootingTypeId } = useParams();
    const [schedules, setSchedules] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedStudioConcept, setSelectedStudioConcept] = useState('');
    const [studioConcepts, setStudioConcepts] = useState([]);
    const [conceptDetails, setConceptDetails] = useState([]);
    const [meetingLocation, setMeetingLocation] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const accessToken = localStorage.getItem('access_token');

            if (accessToken) {
                const decodedToken = jwtDecode(JSON.parse(accessToken));
                const email = decodedToken.sub;

                try {
                    const response = await getAccountByEmail(email);
                    setUser(response.content);
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            }
        };

        fetchUserDetails();
    }, []);
    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const response = await getRecurringSchedulesByStudioId({ studioId });
                setSchedules(response.content);
            } catch (error) {
                console.error("Error fetching schedules:", error);
            }
        };
        fetchSchedules();
    }, [studioId]);

    useEffect(() => {
        const fetchStudioConcepts = async () => {
            try {
                const response = await getStudioConceptsByStudioId({ studioId });
                const conceptsData = response.content;
                setStudioConcepts(conceptsData);

                // Fetch details for each concept
                const conceptDetailsPromises = conceptsData.map(concept =>
                    getConceptByConceptId(concept.conceptId)
                );
                const conceptDetailsResponses = await Promise.all(conceptDetailsPromises);
                const details = conceptDetailsResponses.map(response => response.content);
                setConceptDetails(details);
            } catch (error) {
                console.error("Error fetching studio concepts:", error);
            }
        };
        fetchStudioConcepts();
    }, [studioId]);

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setSelectedDate(selectedDate);

        // Get day of week from selected date using correct weekday format
        const dayOfWeek = new Date(selectedDate).toLocaleString('en-US', { weekday: 'long' }).toUpperCase();

        // Find matching schedule for the day
        const daySchedule = schedules.find(schedule => schedule.dayOfWeek === dayOfWeek);

        if (daySchedule) {
            const timeSlots = generateTimeSlots(daySchedule.startTime, daySchedule.endTime);
            setAvailableTimeSlots(timeSlots);
        } else {
            setAvailableTimeSlots([]);
        }
    };

    const generateTimeSlots = (startTime, endTime) => {
        const slots = [];
        const start = new Date(`2000-01-01T${startTime}`);
        const end = new Date(`2000-01-01T${endTime}`);

        // Generate slots in 1-hour intervals
        while (start < end) {
            slots.push(start.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }));
            start.setHours(start.getHours() + 1);
        }
        return slots;
    };

    const handleSubmit = async () => {
        try {
            const bookingData = {
                studioConceptId: selectedStudioConcept, // From concept state
                comboId: comboId,
                shootingTypeId: shootingTypeId,
                accountId: user?.id,
                studioId: studioId,
                startTime: `${selectedDate}T${selectedTime}`, // Combine date and time
                duration: 1, // Set default duration or get from combo details
                dateOfPhotoshoot: selectedDate,
                meetingLocation: meetingLocation,
                additionalInfo: additionalInfo,
                photosLink: "abc", // Empty initially
                status: "PENDING" // Initial status
            };
            console.log(bookingData);
            const response = await createBookingApi(bookingData);
            navigate(`/booking/confirmation/${response.content.id}`);
        } catch (error) {
            console.error("Error creating booking:", error);
        }
    };

    return (
        <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
                <div className="sm:text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Plan Your Photo Shoot</h2>
                    <p className="mt-4 text-lg leading-8 text-gray-600">Fill in the details for your perfect photography session</p>
                </div>

                {/* Progress Steps - Updated to match the style */}
                <div className="mt-12 mb-16">
                    <div className="flex justify-center items-center gap-4">
                        <div className="flex items-center">
                            <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full font-semibold">1</div>
                            <span className="ml-3 font-medium text-gray-500">Package</span>
                        </div>
                        <div className="w-16 h-0.5 bg-gray-200"></div>
                        <div className="flex items-center">
                            <div className="w-10 h-10 flex items-center justify-center bg-teal-600 text-white rounded-full font-semibold">2</div>
                            <span className="ml-3 font-medium text-teal-600">Details</span>
                        </div>
                        <div className="w-16 h-0.5 bg-gray-200"></div>
                        <div className="flex items-center">
                            <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full font-semibold">3</div>
                            <span className="ml-3 font-medium text-gray-500">Confirm</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {/* Left Panel - Details Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Photo Shoot Details</h3>

                            {/* Date Input */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>

                            {/* Time Input */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                                <select
                                    value={selectedTime}
                                    onChange={(e) => setSelectedTime(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                >
                                    <option value="">Select a time slot</option>
                                    {availableTimeSlots.map((slot) => (
                                        <option key={slot} value={slot}>{slot}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Concept Input */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Concept</label>
                                <select
                                    value={selectedStudioConcept}
                                    onChange={(e) => setSelectedStudioConcept(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                >
                                    <option value="">Select a concept</option>
                                    {studioConcepts.map((concept) => (
                                        <option key={concept.id} value={concept.id}>
                                            {conceptDetails.find(c => c.id === concept.conceptId)?.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Additional Information</h3>

                            {/* Meeting Location */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Location</label>
                                <input
                                    type="text"
                                    value={meetingLocation}
                                    onChange={(e) => setMeetingLocation(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    placeholder="Enter meeting location"
                                />
                            </div>

                            {/* Additional Info */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Information</label>
                                <textarea
                                    value={additionalInfo}
                                    onChange={(e) => setAdditionalInfo(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    rows="4"
                                    placeholder="Any special requests or notes?"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Booking Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm p-8 sticky top-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Booking Summary</h3>

                            <div className="mb-6">
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Customer</span>
                                    <span className="font-medium">{user?.fullName}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Duration</span>
                                    <span className="font-medium">1 hour</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Location</span>
                                    <span className="font-medium">{user?.address}</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-medium">Total</span>
                                    <span className="text-2xl font-bold text-teal-600">299,000đ</span>
                                </div>
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="w-full rounded-lg bg-teal-600 py-3 text-md font-semibold text-white shadow-sm hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
                            >
                                Proceed to Confirmation
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PhotoshootDetailsPage;