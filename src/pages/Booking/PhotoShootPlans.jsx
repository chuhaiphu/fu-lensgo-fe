import React from "react";

const packages = [
    {
        title: "1 Hour Photo Shot",
        duration: "1 Hour Duration",
        editedPhotos: "50+ Edited Photos",
        downloadablePhotos: "20 Downloadable Photos",
        price: "299k",
        oldPrice: "399k",
    },
    {
        title: "2 Hour Photo Shot",
        duration: "2 Hour Duration",
        editedPhotos: "100+ Edited Photos",
        downloadablePhotos: "40 Downloadable Photos",
        price: "399k",
        oldPrice: "599k",
    },
];

const PhotoShootPlans = () => {
    return (
        <div>
            <div className="bg-yellow-100 p-2 justify-center items-center">
                <h2 className="text-2xl font-semibold mb-8 bg-yellow-100 ml-14 mt-5">Let’s plan your photo shoot</h2>
            </div>

            <div className="max-w-screen-lg mx-auto py-10 px-4 bg-gray-400">

                {/* Progress Steps */}
                <div className="flex justify-center mb-8">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <div className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full">
                                1
                            </div>
                            <span className="ml-2 font-semibold">Choose Package</span>
                        </div>
                        <div className="flex items-center text-gray-400">
                            <div className="w-8 h-8 flex items-center justify-center bg-gray-300 text-white rounded-full">
                                2
                            </div>
                            <span className="ml-2 text-gray-700">Photo Shoot Details</span>
                        </div>
                        <div className="flex items-center text-gray-400">
                            <div className="w-8 h-8 flex items-center justify-center bg-gray-300 text-white rounded-full">
                                3
                            </div>
                            <span className="ml-2  text-gray-700">Confirmation</span>
                        </div>
                    </div>
                </div>

                {/* Package Options */}
                <div className="bg-gray-100 p-6 rounded-lg">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 list-none">
                        {packages.map((pkg, index) => (
                            <li key={index} className="bg-white rounded-lg shadow-lg p-6">
                                <h3 className="text-xl font-semibold mb-4">{pkg.title}</h3>
                                <ul className="mb-4 space-y-2">
                                    <li>{pkg.duration}</li>
                                    <li>{pkg.editedPhotos}</li>
                                    <li>{pkg.downloadablePhotos}</li>
                                </ul>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-yellow-500">{pkg.price}</span>
                                    <span className="text-gray-400 line-through">{pkg.oldPrice}</span>
                                </div>
                                <button className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600">
                                    Select
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default PhotoShootPlans;
