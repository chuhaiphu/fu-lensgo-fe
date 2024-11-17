import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getShootingTypeByStudioId } from "../../apis/shooting-type-api";

const PhotoshootPackageChoosingPage = () => {
    const { studioId, comboId } = useParams();
    const [shootingTypes, setShootingTypes] = useState([]);

    useEffect(() => {
        const fetchShootingTypes = async () => {
            try {
                const response = await getShootingTypeByStudioId(studioId);
                setShootingTypes(response.content);
            } catch (error) {
                console.error("Error fetching shooting types:", error);
            }
        };
        fetchShootingTypes();
    }, [studioId]);

    return (
        <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
                <div className="sm:text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Choose Your Shooting Type</h2>
                    <p className="mt-4 text-lg leading-8 text-gray-600">Select the package that best suits your photography needs</p>
                </div>

                {/* Progress Steps */}
                <div className="mt-12 mb-16">
                    <div className="flex justify-center items-center gap-4">
                        <div className="flex items-center">
                            <div className="w-10 h-10 flex items-center justify-center bg-teal-600 text-white rounded-full font-semibold">
                                1
                            </div>
                            <span className="ml-3 font-medium text-teal-600">Package</span>
                        </div>
                        <div className="w-16 h-0.5 bg-gray-200"></div>
                        <div className="flex items-center">
                            <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full font-semibold">
                                2
                            </div>
                            <span className="ml-3 font-medium text-gray-500">Details</span>
                        </div>
                        <div className="w-16 h-0.5 bg-gray-200"></div>
                        <div className="flex items-center">
                            <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full font-semibold">
                                3
                            </div>
                            <span className="ml-3 font-medium text-gray-500">Confirm</span>
                        </div>
                    </div>
                </div>

                {/* Package Cards */}
                <div className="flex flex-wrap justify-center gap-8 mb-16">
                    {shootingTypes.map((type) => (
                        <div key={type.id} className="relative flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-lg w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] max-w-md">
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-gray-900">{type.shootingType}</h3>
                                <p className="mt-4 text-sm text-gray-500">Professional photography session with expert guidance</p>
                            </div>

                            <div className="mb-6">
                                <p className="text-4xl font-bold tracking-tight text-teal-600">
                                    {type.price.toLocaleString()}đ
                                </p>
                            </div>

                            <ul className="mb-8 space-y-4 text-sm text-gray-600">
                                <li className="flex items-center">
                                    <svg className="h-5 w-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="ml-3">Professional Photography</span>
                                </li>
                                <li className="flex items-center">
                                    <svg className="h-5 w-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="ml-3">50+ Edited Photos</span>
                                </li>
                                <li className="flex items-center">
                                    <svg className="h-5 w-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="ml-3">20 Downloadable Photos</span>
                                </li>
                            </ul>

                            <Link to={`/booking/photoshoot-details/${studioId}/${comboId}/${type.id}`} className="mt-auto">
                                <button className="w-full rounded-lg bg-teal-600 py-3 text-md font-semibold text-white shadow-sm hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2">
                                    Select
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PhotoshootPackageChoosingPage;
