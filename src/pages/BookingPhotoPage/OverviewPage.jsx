import React from "react";

const OverviewPage = () => {
    return (
        <div className="flex">
            <div className="w-[65%]">
                <div className="p-4 px-10 justify-center ">
                    <p>Lorem, ipsum dolor sit amet
                        consectetur adipisicing elit. Tenetur officiis aut doloribus qui nesciunt deserunt,
                        non quam velit tempore necessitatibus nam.
                        Assumenda, amet! Obcaecati blanditiis possimus omnis sed sint voluptas!
                    </p>
                </div>

                <div className="flex flex-col items-center p-5 mr-10">
                    {/* Image container */}
                    <div className="flex space-x-4">
                        {/* First image */}
                        <div className="w-45 h-45 rounded-lg overflow-hidden">
                            <img
                                src="https://via.placeholder.com/500x500" // Replace with actual image source
                                alt="Photo 1"
                                className="object-cover w-full h-full"
                            />
                        </div>

                        {/* Second image */}
                        <div className="w-45 h-45 rounded-lg overflow-hidden relative">
                            <img
                                src="https://via.placeholder.com/500x500" // Replace with actual image source
                                alt="Photo 2"
                                className="object-cover w-full h-full"
                            />
                            {/* Right arrow */}
                            <div className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow-md cursor-pointer">
                                →
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4 pl-4">
                    <a href="#more-photos" className="text-blue-500 hover:underline">
                        See more photos
                    </a>
                </div>
                <div className="p-5  bg-blue-200" >
                    <h2>
                        <span className="text-2xl font-bold">Photo Gallery</span>
                    </h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.  dolores quidem distinctio.</p>

                    <div className="flex flex-col items-center mt-5 mr-10">
                        <div className="flex space-x-4">
                            {/* First image */}
                            <div className="w-45 h-45 rounded-lg overflow-hidden">
                                <img
                                    src="https://via.placeholder.com/500x500" // Replace with actual image source
                                    alt="Photo 1"
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            {/* Second image */}
                            <div className="w-45 h-45 rounded-lg overflow-hidden relative">
                                <img
                                    src="https://via.placeholder.com/500x500" // Replace with actual image source
                                    alt="Photo 2"
                                    className="object-cover w-full h-full"
                                />
                                {/* Right arrow */}
                                <div className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow-md cursor-pointer">
                                    →
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="w-[35%] mx-auto mt-5 pl-14">
                <div className="max-w-sm p-6 border rounded-lg shadow-lg bg-slate-200">
                    {/* Header with title and price */}
                        <div className="flex justify-between items-center border-b pb-4 mb-4 ">
                            <h2 className="text-xl font-bold text-gray-700 ">Just</h2>
                            <span className="text-orange-500 text-lg font-semibold">150k</span>
                        </div>
                  

                    {/* What's included */}
                    <div className="mb-6 ">
                        <h3 className="text-lg font-bold text-gray-600 mb-2">What’s included</h3>
                        <ul className="list-none space-y-2 text-gray-700">
                            <li>Up to 100 edited photos</li>
                            <li>Up to 40 downloadable photos</li>
                        </ul>
                    </div>

                    {/* Book Now Button */}
                    <button className="w-full py-3 bg-teal-600 text-white font-bold rounded-md hover:bg-teal-700 transition duration-300">
                        Book Now
                    </button>
                </div>
            </div>

        </div>
    );
};

export default OverviewPage;
