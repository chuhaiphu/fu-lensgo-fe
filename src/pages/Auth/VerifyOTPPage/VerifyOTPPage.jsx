import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { verifyMailOtpApi, sendMailOtpApi } from '../../../apis/user-api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const { email } = useParams();

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      await verifyMailOtpApi(email, otp);
      toast.success('Email verified successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate('/login');
    } catch (error) {
      toast.error(error?.data?.message || 'Verification failed', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleResendOTP = async () => {
    try {
      await sendMailOtpApi(email);
      toast.success('OTP resent successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to resend OTP', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="font-serif mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Verify Your Email
          </h1>
          <p className="font-sans mt-2 text-center text-sm text-gray-600">
            We've sent a verification code to {email}
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleVerifyOTP} className="space-y-6">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium leading-6 text-gray-900">
                Enter Verification Code
              </label>
              <div className="mt-2">
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Enter OTP"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                Verify Email
              </button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={handleResendOTP}
              className="text-sm font-semibold text-gray-600 hover:text-gray-500"
            >
              Didn't receive code? Resend
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
