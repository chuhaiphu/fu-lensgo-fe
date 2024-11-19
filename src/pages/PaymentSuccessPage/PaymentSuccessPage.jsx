import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPaymentByIdApi } from '../../apis/payment';
import { getBookingByIdApi } from '../../apis/booking';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

function PaymentSuccessPage() {
  const { paymentId, status } = useParams();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const paymentResponse = await getPaymentByIdApi(paymentId);
        setPaymentDetails(paymentResponse.content);

        const bookingResponse = await getBookingByIdApi(paymentResponse.content.bookingId);
        setBookingDetails(bookingResponse.content);
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [paymentId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        {status === 'success' ? (
          <div className="text-center">
            <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Payment Successful!</h2>
          </div>
        ) : (
          <div className="text-center">
            <XCircleIcon className="mx-auto h-16 w-16 text-red-500" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Payment Failed</h2>
          </div>
        )}

        <div className="mt-8 space-y-6">
          <div className="border-t border-gray-200 pt-6">
            <dl className="divide-y divide-gray-200">
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Order ID</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{paymentDetails?.payosOrderId}</dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Amount</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {paymentDetails?.amount?.toLocaleString()}đ
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Date</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {new Date(paymentDetails?.paymentDate).toLocaleDateString()}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Photoshoot Date</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {bookingDetails?.dateOfPhotoshoot}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Meeting Location</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {bookingDetails?.meetingLocation}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    paymentDetails?.status === 'PAID' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {paymentDetails?.status}
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          <div className="flex justify-center">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccessPage;
