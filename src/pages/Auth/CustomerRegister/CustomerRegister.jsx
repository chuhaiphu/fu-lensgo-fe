import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { registerApi } from '../../../apis/user-api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EnvelopeIcon, LockClosedIcon, UserIcon, PhoneIcon, CalendarIcon, UserGroupIcon } from '@heroicons/react/24/outline'


export default function CustomerRegister() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const onSubmit = async (data) => {
        try {
            const phoneNumber = data.phone.startsWith('0') 
            ? '+84' + data.phone.substring(1) 
            : data.phone;

            const signupData = {
                email: data.email,
                phone: phoneNumber,
                password: data.password,
                username: data.email,
                fullName: data.name,
                address: "",
                dob: data.dob,
                gender: data.gender,
                nationality: "Vietnam",
                instagram: null,
                status: "active"
            };

            const response = await registerApi(signupData);
            
            toast.success('Registration successful! Redirecting...', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });

            // Redirect after 3 seconds
            setTimeout(() => {
                navigate('/login');
            }, 3000);

        } catch (error) {
            console.log(error);
            toast.error(error?.data ?.message || 'Registration failed. Please try again.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    };

    const password = watch("password");

    return (
        <>
            <ToastContainer />
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign up to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <div className="mt-2 mb-7">
                                    <div className="relative">
                                        <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2" />
                                        <input
                                            {...register("email", {
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Invalid email address"
                                                }
                                            })}
                                            type="email"
                                            placeholder="Email"
                                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                                </div>

                                <div className="mt-2 mb-7">
                                    <div className="relative">
                                        <LockClosedIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2" />
                                        <input
                                            {...register("password", {
                                                required: "Password is required",
                                                minLength: {
                                                    value: 8,
                                                    message: "Password must be at least 8 characters"
                                                }
                                            })}
                                            type="password"
                                            placeholder="Password"
                                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                                </div>

                                <div className="mt-2 mb-7">
                                    <div className="relative">
                                        <LockClosedIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2" />
                                        <input
                                            {...register("confirmPassword", {
                                                required: "Please confirm your password",
                                                validate: value =>
                                                    value === password || "Passwords do not match"
                                            })}
                                            type="password"
                                            placeholder="Confirm Password"
                                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                                </div>

                                <div className="mt-2 mb-7">
                                    <div className="relative">
                                        <UserIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2" />
                                        <input
                                            {...register("name", { required: "Name is required" })}
                                            type="text"
                                            placeholder="Name"
                                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                                </div>
                                <div className="mt-2 mb-7">
                                    <div className="relative">
                                        <PhoneIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2" />
                                        <input
                                            {...register("phone", { required: "Phone is required" })}
                                            type="text"
                                            placeholder="Phone"
                                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                                </div>

                                <div className="mt-2 mb-7 flex items-center gap-4">
                                    <div className="w-1/2">
                                        <label htmlFor="dob" className="block text-sm font-medium leading-6 text-gray-500 mb-2">
                                            Date of Birth
                                        </label>
                                        <div className="relative">
                                            <CalendarIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2" />
                                            <input
                                                {...register("dob", { required: "Date of Birth is required" })}
                                                type="date"
                                                placeholder="Date of Birth"
                                                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>}
                                    </div>

                                    <div className="w-1/2">
                                        <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-500 mb-2">
                                            Gender
                                        </label>
                                        <div className="relative">
                                            <UserGroupIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2" />
                                            <select
                                                {...register("gender", { required: "Gender is required" })}
                                                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                                <option value="" disabled selected>
                                                    Select Gender
                                                </option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                        {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">

                            </div>
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="flex w-1/3 justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                >
                                    Register
                                </button>
                            </div>
                        </form>

                        <div>
                            <div className="relative mt-10">
                                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center text-sm font-medium leading-6">
                                    <span className="bg-white px-6 text-gray-900">Or continue with</span>
                                </div>
                            </div>

                            <div className="flex justify-center mt-6 grid-cols-2 gap-4">
                                <a
                                    href="#"
                                    className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                                >
                                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                                        <path
                                            d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                                            fill="#EA4335"
                                        />
                                        <path
                                            d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                                            fill="#34A853"
                                        />
                                    </svg>
                                    <span className="text-sm font-semibold leading-6">Google</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
