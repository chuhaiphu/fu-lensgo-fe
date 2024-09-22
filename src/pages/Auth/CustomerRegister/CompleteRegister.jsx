import { Link } from 'react-router-dom';

export default function CompleteRegister() {
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 className="font-serif mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 ">
                        Complete your registration
                    </h1>

                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                        <form action="#" method="POST" className="space-y-6">
                            <div>

                                <div className="mt-2 mb-7">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        required
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                <div className="mt-2 mb-7">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Name"
                                        required
                                        autoComplete="name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                <div className="mt-2 mb-7">
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        placeholder="Phone"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>

                                <div className="mt-2 mb-7 flex items-center">
                                    <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-500 mr-4" style={{ minWidth: '100px' }}>
                                        Gender
                                    </label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        required
                                        className="block w-3/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    >
                                        <option value="" disabled selected>
                                            Select Gender
                                        </option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="mt-2 mb-7 flex items-center">
                                    <label htmlFor="dob" className="block text-sm font-medium leading-6 text-gray-500 mr-4" style={{ minWidth: '100px' }}>
                                        Date of Birth
                                    </label>
                                    <input
                                        id="dob"
                                        name="dob"
                                        type="date"
                                        placeholder="Date of Birth"
                                        required
                                        className="block w-3/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
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

                       
                    </div>


                </div>

            </div>
        </>
    )
}