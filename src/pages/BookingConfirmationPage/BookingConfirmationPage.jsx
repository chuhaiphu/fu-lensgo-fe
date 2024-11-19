import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookingByIdApi } from '../../apis/booking';
import { getStudioConceptByStudioConceptId, getConceptByConceptId } from '../../apis/concept';
import { getStudioByIdApi } from '../../apis/studio-api';
import { getAccountById } from '../../apis/user-api';
// Add these imports
import { createPaymentApi } from '../../apis/payment';
import { Modal } from 'antd';

const BookingConfirmationPage = () => {
    const { bookingId } = useParams();
    const [bookingDetails, setBookingDetails] = useState(null);
    const [conceptDetails, setConceptDetails] = useState(null);
    const [studioDetails, setStudioDetails] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchAllDetails = async () => {
            try {
                const bookingResponse = await getBookingByIdApi(bookingId);
                setBookingDetails(bookingResponse.content);

                const studioResponse = await getStudioByIdApi(bookingResponse.content.studioId);
                setStudioDetails(studioResponse.content);

                const userResponse = await getAccountById(bookingResponse.content.accountId);
                setUserDetails(userResponse.content);

                const studioConceptResponse = await getStudioConceptByStudioConceptId(bookingResponse.content.studioConceptId);
                const conceptResponse = await getConceptByConceptId(studioConceptResponse.content.conceptId);
                setConceptDetails(conceptResponse.content);
            } catch (error) {
                console.error("Error fetching details:", error);
            }
        };
        fetchAllDetails();
    }, [bookingId]);

    // Add this function to handle payment
    const handlePayment = async () => {
        try {
            const paymentData = {
                bookingId: bookingId,
                amount: bookingDetails?.price,
                paymentDate: new Date().toISOString()
            };

            const response = await createPaymentApi(paymentData);
            if (response.content.paymentPageLink) {
                window.location.href = response.content.paymentPageLink;
            }
        } catch (error) {
            console.error("Payment error:", error);
        }
    };

    return (
        <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
                <div className="sm:text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Booking Confirmation</h2>
                    <p className="mt-4 text-lg leading-8 text-gray-600">Your photoshoot session has been booked successfully</p>
                </div>

                {/* Progress Steps */}
                <div className="mt-12 mb-16">
                    <div className="flex justify-center items-center gap-4">
                        <div className="flex items-center">
                            <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full font-semibold">1</div>
                            <span className="ml-3 font-medium text-gray-500">Package</span>
                        </div>
                        <div className="w-16 h-0.5 bg-gray-200"></div>
                        <div className="flex items-center">
                            <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full font-semibold">2</div>
                            <span className="ml-3 font-medium text-gray-500">Details</span>
                        </div>
                        <div className="w-16 h-0.5 bg-gray-200"></div>
                        <div className="flex items-center">
                            <div className="w-10 h-10 flex items-center justify-center bg-teal-600 text-white rounded-full font-semibold">3</div>
                            <span className="ml-3 font-medium text-teal-600">Confirm</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {/* Booking Details */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Studio Information</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Studio Name</span>
                                    <span className="font-medium">{studioDetails?.name}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Location</span>
                                    <span className="font-medium">{studioDetails?.availableCity}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Equipment</span>
                                    <span className="font-medium">{studioDetails?.camera}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Booking Details</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Date</span>
                                    <span className="font-medium">{bookingDetails?.dateOfPhotoshoot}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Time</span>
                                    <span className="font-medium">
                                        {new Date(bookingDetails?.startTime).toLocaleTimeString()}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Concept</span>
                                    <span className="font-medium">{conceptDetails?.name}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Meeting Location</span>
                                    <span className="font-medium">{bookingDetails?.meetingLocation}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Additional Information</h3>
                            <p className="text-gray-600">{bookingDetails?.additionalInfo}</p>
                        </div>
                    </div>

                    {/* Booking Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm p-8 sticky top-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Customer Information</h3>

                            <div className="mb-6">
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Name</span>
                                    <span className="font-medium">{userDetails?.fullName}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Phone</span>
                                    <span className="font-medium">{userDetails?.phoneNumber}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Address</span>
                                    <span className="font-medium">{userDetails?.address}</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-medium">Total</span>
                                    <span className="text-2xl font-bold text-teal-600">
                                        {bookingDetails?.price?.toLocaleString()}đ
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full rounded-lg bg-red-600 py-3 text-md font-semibold text-white shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                            >
                                Book Now
                            </button>

                            {/* Add this Modal component */}
                            <Modal
                                title="Confirm Payment"
                                open={isModalOpen}
                                onOk={handlePayment}
                                onCancel={() => setIsModalOpen(false)}
                                okText="Proceed to Payment"
                                cancelText="Cancel"
                                okButtonProps={{
                                    className: 'bg-red-600 hover:bg-red-500'
                                }}
                            >
                                <div className="py-4">
                                    <p className="text-gray-600">Are you sure you want to proceed with the payment of {bookingDetails?.price?.toLocaleString()}đ?</p>
                                    <p className="text-gray-500 mt-2 text-sm">By clicking "Proceed to Payment", you will be redirected to our payment partner's secure payment page.</p>
                                </div>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingConfirmationPage;