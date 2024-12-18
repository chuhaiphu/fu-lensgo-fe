
import { useForm } from 'react-hook-form';
import { getAllConcepts } from '../../../apis/concept';
import { addStudio } from '../../../apis/studio-api';
import { registerApi } from '../../../apis/user-api';
import { addNewStudioConcept } from '../../../apis/concept';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';


export default function PhotographerRegister() {
    // const navigate = useNavigate();
    // const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [concepts, setConcepts] = useState([]);
    const [selectedConcepts, setSelectedConcepts] = useState([]);

    const shootingTypes = ['OUTDOOR', 'EVENT', 'STUDIO', 'ART'];
    const [selectedShootingTypes, setSelectedShootingTypes] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors }, watch,
    } = useForm();


    const handleCheckboxChangeOfShootingType = (type) => {
        setSelectedShootingTypes((prevSelected) =>
            prevSelected.includes(type)
                ? prevSelected.filter((item) => item !== type)
                : [...prevSelected, type]
        );
    };


    // Fetch all concepts when component mounts
    useEffect(() => {
        const fetchConcepts = async () => {
            try {
                const response = await getAllConcepts();
                setConcepts(Array.isArray(response.content) ? response.content : []);
            } catch (error) {
                console.error('Error fetching concepts:', error);
                setConcepts([]); // Set to an empty array in case of error
            }
        };
        fetchConcepts();
    }, []);

    const handleCheckboxChange = (conceptId) => {
        setSelectedConcepts((prevSelected) =>
            prevSelected.includes(conceptId)
                ? prevSelected.filter((id) => id !== conceptId)
                : [...prevSelected, conceptId]
        );
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
    
        try {
            // Prepare new studio data
            const newStudioData = {
                name: data.name,
                camera: data.camera,
                overview: "new studio",
                bankAccount: data.bankAccount,
                bankName: data.bankName,
                language: "Vietnamese",
                shootingTypes: selectedShootingTypes,
                availableCity: data.availableCity,
                status: "active"
            };
    
            // Create new studio
            const responseStudio = await addStudio(newStudioData);
            console.log('Studio created:', responseStudio);
            
            // Get the studioId from the response
            const studioId = responseStudio.content.id;
    
            // Prepare signup data
            const signupData = {
                studioId: studioId,
                email: data.email,
                phone: data.phone,
                password: data.password,
                username: data.email,
                fullName: data.fullName,
                address: data.address,
                dob: data.dob,
                gender: data.gender,
                nationality: "Vietnam",
                instagram: data.instagram,
                status: "active"
            };
    
            console.log("Auth request: ", signupData);
    
            // Register the user
            const response = await registerApi(signupData);
    
            // Handle adding studio concepts
            const studioConceptPromises = selectedConcepts.map(async (conceptId) => {
                const newStudioConceptData = {
                    studioId: studioId,
                    conceptId: conceptId,
                    status: "active",
                    price: 0
                };
                console.log("New Studio Concept:", newStudioConceptData);
                const responseStudioConceptCreated = await addNewStudioConcept(newStudioConceptData);
                console.log("Studio Concept Created:", responseStudioConceptCreated);
            });
    
            // Wait for all concept creation requests to finish
            await Promise.all(studioConceptPromises);
    
            // Show success message
            toast.success('Registration successful! Redirecting...', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
    
            // Optionally, redirect after successful registration
            setTimeout(() => {
                window.location.href = '/dashboard'; // Redirect to the desired page
            }, 3000); // Adjust time as needed
    
        } catch (error) {
            console.error("Registration error:", error);
            
            // Display error message to the user
            toast.error(error?.data?.message || 'Registration failed. Please try again.', {
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
        <div className="h-screen overflow-auto px-24 flex flex-col space-y-10 divide-y divide-gray-900/10">

            <div className="flex">
                {/* Image section */}
                <div className="w-1/3 bg-gray-200 flex items-center justify-center">
                    <img src="/public/image/Auth/takePhoto.jpg" alt="Description" className="w-full h-full object-cover" />
                </div>
                {/* Text section */}
                <div className="w-2/3 flex flex-col items-center justify-center p-8">
                    <h1 className="text-3xl font-bold mb-4 text-center">Let's get started</h1>
                    <p className="text-center text-lg">
                        We are excited to start working with you as a photographer! Please fill in this form with your details. Don't worry, it will only take less than 5 minutes of your time!
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 pb-10 pt-10 pl-10">
                <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
                    <div className="px-4 sm:px-0">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Please fill in your personal details</p>
                    </div>

                    <div className="px-4 py-6 sm:p-8">
                        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                            {/* Studio Name */}
                            <div className="sm:col-span-8">
                                <label htmlFor="name" className="block text-sm font-bold leading-6 text-gray-900">
                                    Studio Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        {...register('name', { required: 'Studio name is required' })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                                </div>
                            </div>

                            {/* Email Address */}
                            <div className="sm:col-span-8">
                                <label htmlFor="email" className="block text-sm font-bold leading-6 text-gray-900">
                                    Email Address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                message: 'Please enter a valid email address',
                                            },
                                        })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                </div>
                            </div>

                            {/* Full Name */}
                            <div className="sm:col-span-8">
                                <label htmlFor="fullName" className="block text-sm font-bold leading-6 text-gray-900">
                                    Full Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        {...register('fullName', { required: 'Full name is required' })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
                                </div>
                            </div>

                            {/* Password */}
                            <div className="sm:col-span-8">
                                <label htmlFor="password" className="block text-sm font-bold leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        {...register('password', {
                                            required: 'Password is required',
                                            minLength: { value: 8, message: 'Password must be at least 8 characters' },
                                            pattern: {
                                                value:   /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                                message: 'Password must contain at least 8 characters, one uppercase, one number, and one special character',
                                            },
                                        })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="sm:col-span-8">
                                <label htmlFor="confirm-password" className="block text-sm font-bold leading-6 text-gray-900">
                                    Confirm Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="confirm-password"
                                        name="confirm-password"
                                        type="password"
                                        {...register('confirmPassword', {
                                            required: 'Confirm password is required',
                                            validate: value =>
                                                value === password || 'Passwords do not match',
                                        })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                                </div>
                            </div>

                            {/* Phone Number */}
                            <div className="sm:col-span-8">
                                <label htmlFor="phone" className="block text-sm font-bold leading-6 text-gray-900">
                                    Phone Number
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        {...register('phone', {
                                            required: 'Phone number is required',
                                            pattern: {
                                                value: /^\+84\d{9}$/,
                                                message: 'Phone number must start with +84 and followed by 9 digits',
                                            },
                                        })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                                </div>
                            </div>

                            {/* Address */}
                            <div className="sm:col-span-8">
                                <label htmlFor="address" className="block text-sm font-bold leading-6 text-gray-900">
                                    Address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="address"
                                        name="address"
                                        type="text"
                                        {...register('address', { required: 'Address is required' })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                                </div>
                            </div>

                            {/* Gender */}
                            <div className="sm:col-span-8">
                                <label htmlFor="gender" className="block text-sm font-bold leading-6 text-gray-900">
                                    Gender
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="gender"
                                        name="gender"
                                        {...register('gender', {
                                            required: 'Gender is required',
                                            validate: value => ['MALE', 'FEMALE', 'OTHER'].includes(value) || 'Gender must be one of: MALE, FEMALE, OTHER',
                                        })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                    {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
                                </div>

                                <div className="sm:col-span-8">
                                    <label htmlFor="bankName" className="block text-sm font-bold leading-6 text-gray-900">
                                        Bank Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="bankName"
                                            name="bankName"
                                            type="text"
                                            {...register('bankName', { required: 'bank name is required' })}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors.bankName && <p className="text-red-500 text-sm">{errors.bankName.message}</p>}
                                    </div>
                                </div>

                                <div className="sm:col-span-8">
                                    <label htmlFor="bankAccount" className="block text-sm font-bold leading-6 text-gray-900">
                                        Bank Account
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="bankAccount"
                                            name="bankAccount"
                                            type="text"
                                            {...register('bankAccount', { required: 'bank account is required' })}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors.bankAccount && <p className="text-red-500 text-sm">{errors.bankAccount.message}</p>}
                                    </div>
                                </div>



                            </div>
                        </div>

                    </div>
                </div>
                <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
                    <div className="px-4 sm:px-0">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Let us take a look at your portfolio!</h2>
                    </div>

                    <div className="px-4 py-6 sm:p-8">
                        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-8">
                                <label htmlFor="instagramLink" className="block text-sm font-bold leading-6 text-gray-900">
                                    Instagram Handle (Optional)
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="instagramLink"
                                        name="instagramLink"
                                        type="text"
                                        placeholder='@sweet.escape'
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='m-3'>
                            <p className="mt-1 text-sm leading-6 text-gray-600">Please make sure your Instagram account is not protected.</p>
                        </div>
                    </div>

                </div>

                <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
                    <div className="px-4 sm:px-0">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">What type(s) of camera do you use to shoot?</h2>
                    </div>

                    <div className="px-4 py-6 sm:p-8">
                        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-8">
                                <label htmlFor="camera" className="block text-sm font-bold leading-6 text-gray-900">
                                    Camera
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="camera"
                                        name="camera"
                                        type="text"
                                        placeholder='e.g. Canon EOS 5D Mark IV, Fujifilm XT10'
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='m-3'>
                                <p className="mt-1 text-sm leading-6 text-gray-600">Use coma to separate your cameras.</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
                    <div className="px-4 sm:px-0">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">In which cities can you do the photoshoots?</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Please only add cities where you are available in most of the time, preferably where you reside. Do not add cities where you are only available in a few days in a year.</p>
                        <p className="mt-1 text-sm leading-6 text-gray-600">We do not cover any travel expenses, unless previously agreed upon or in case of special assignment(s).</p>

                    </div>

                    <div className="px-4 py-6 sm:p-8">
                        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-8">
                                <label htmlFor="availableCity" className="block text-sm font-bold leading-6 text-gray-900">
                                    Available City
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="availableCity"
                                        name="availableCity"
                                        type="text"
                                        placeholder='You can add maximum 3 cities, e.g. Ha Noi'
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='m-3'>
                                <p className="mt-1 text-sm leading-6 text-gray-600">Use coma to separate your cameras.</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
                    <div className="px-4 sm:px-0">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            What are your preferred concepts?
                        </h2>
                    </div>

                    <div className="px-4 py-6 sm:p-8">
                        <div className="max-w-2xl space-y-10">
                            <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-gray-900">
                                    Concept
                                </legend>
                                <div className="mt-6 space-y-6">
                                    {concepts.length > 0 ? (
                                        concepts.map((concept) => (
                                            <div key={concept.id} className="relative flex gap-x-3">
                                                <div className="flex h-6 items-center">
                                                    <input
                                                        id={`concept-${concept.id}`}
                                                        type="checkbox"
                                                        checked={selectedConcepts.includes(concept.id)}
                                                        onChange={() => handleCheckboxChange(concept.id)}
                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                </div>
                                                <div className="text-sm leading-6">
                                                    <label htmlFor={`concept-${concept.id}`} className="font-medium text-gray-900">
                                                        {concept.name}
                                                    </label>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500">No concepts available</p>
                                    )}
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
                    <div className="px-4 sm:px-0">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            What are your preferred photoshoot types?
                        </h2>
                    </div>

                    <div className="px-4 py-6 sm:p-8">
                        <div className="max-w-2xl space-y-10">
                            <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-gray-900">Shooting Type</legend>
                                <div className="mt-6 space-y-6">
                                    {shootingTypes.map((type) => (
                                        <div key={type} className="relative flex gap-x-3">
                                            <div className="flex h-6 items-center">
                                                <input
                                                    id={`shooting-type-${type}`}
                                                    name="shootingTypes"
                                                    type="checkbox"
                                                    checked={selectedShootingTypes.includes(type)}
                                                    onChange={() => handleCheckboxChangeOfShootingType(type)}
                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                            </div>
                                            <div className="text-sm leading-6">
                                                <label htmlFor={`shooting-type-${type}`} className="font-medium text-gray-900">
                                                    {type}
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </fieldset>
                        </div>
                    </div>

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

        </div>
    )
}