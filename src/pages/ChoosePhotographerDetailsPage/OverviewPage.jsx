import React from "react";
import { Camera, Heart, Share2, Instagram } from 'lucide-react'
import { Link } from "react-router-dom";

const OverviewPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Pricing Card - Now positioned as a floating card */}
            <div className="fixed top-16 right-8 z-10 w-80">
                <div className="p-6 border rounded-lg shadow-lg bg-white backdrop-blur-sm bg-opacity-90">
                    <div className="flex justify-between items-center border-b pb-4 mb-4">
                        <h2 className="text-xl font-bold text-gray-700">Just</h2>
                        <span className="text-orange-500 text-lg font-semibold">150k</span>
                    </div>
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-gray-600 mb-2">What's included</h3>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>Up to 100 edited photos</li>
                            <li>Up to 40 downloadable photos</li>
                        </ul>
                    </div>
                    <Link to="/booking/photoshoot-package">
                        <button className="w-full py-3 bg-teal-600 text-white font-bold rounded-md hover:bg-teal-700 transition duration-300">
                            Book Now
                        </button>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="pt-20 pb-16 text-center">
                    <Camera className="mx-auto h-12 w-12 text-blue-600" />
                    <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                        Wedding's Photo Album
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                        Capturing timeless moments and creating lasting memories for couples in love.
                    </p>
                </div>

                {/* Gallery Grid - Adjusted width to accommodate floating card */}
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
                        {/* Image Card 1 */}
                        <div className="group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
                            <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-100"></div>
                            <img
                                src="/api/placeholder/800/600"
                                alt="Mountain wedding"
                                className="h-[400px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 transition-opacity group-hover:opacity-100">
                                <h3 className="text-xl font-semibold">Mountain Romance</h3>
                                <p className="mt-2 text-sm">Captured at sunset in the majestic Alps</p>
                                <div className="mt-4 flex space-x-4">
                                    <button className="flex items-center space-x-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm transition-colors hover:bg-white/30">
                                        <Heart className="h-4 w-4" />
                                        <span className="text-sm">Save</span>
                                    </button>
                                    <button className="flex items-center space-x-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm transition-colors hover:bg-white/30">
                                        <Share2 className="h-4 w-4" />
                                        <span className="text-sm">Share</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Image Card 2 */}
                        <div className="group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
                            <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-100"></div>
                            <img
                                src="/api/placeholder/800/600"
                                alt="Beach wedding"
                                className="h-[400px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 transition-opacity group-hover:opacity-100">
                                <h3 className="text-xl font-semibold">Seaside Love</h3>
                                <p className="mt-2 text-sm">Eternal moments by the ocean</p>
                                <div className="mt-4 flex space-x-4">
                                    <button className="flex items-center space-x-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm transition-colors hover:bg-white/30">
                                        <Heart className="h-4 w-4" />
                                        <span className="text-sm">Save</span>
                                    </button>
                                    <button className="flex items-center space-x-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm transition-colors hover:bg-white/30">
                                        <Share2 className="h-4 w-4" />
                                        <span className="text-sm">Share</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Image Card 3 */}
                        <div className="group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
                            <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-100"></div>
                            <img
                                src="/api/placeholder/800/600"
                                alt="Garden wedding"
                                className="h-[400px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 transition-opacity group-hover:opacity-100">
                                <h3 className="text-xl font-semibold">Garden Ceremony</h3>
                                <p className="mt-2 text-sm">Blossoming love in nature's embrace</p>
                                <div className="mt-4 flex space-x-4">
                                    <button className="flex items-center space-x-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm transition-colors hover:bg-white/30">
                                        <Heart className="h-4 w-4" />
                                        <span className="text-sm">Save</span>
                                    </button>
                                    <button className="flex items-center space-x-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm transition-colors hover:bg-white/30">
                                        <Share2 className="h-4 w-4" />
                                        <span className="text-sm">Share</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Image Card 4 */}
                        <div className="group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
                            <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-100"></div>
                            <img
                                src="/api/placeholder/800/600"
                                alt="Chapel wedding"
                                className="h-[400px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 transition-opacity group-hover:opacity-100">
                                <h3 className="text-xl font-semibold">Chapel Dreams</h3>
                                <p className="mt-2 text-sm">Timeless elegance in sacred spaces</p>
                                <div className="mt-4 flex space-x-4">
                                    <button className="flex items-center space-x-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm transition-colors hover:bg-white/30">
                                        <Heart className="h-4 w-4" />
                                        <span className="text-sm">Save</span>
                                    </button>
                                    <button className="flex items-center space-x-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm transition-colors hover:bg-white/30">
                                        <Share2 className="h-4 w-4" />
                                        <span className="text-sm">Share</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="py-20 text-center">
                    <h2 className="text-2xl font-semibold text-blue-600">
                        Explore All Albums
                    </h2>
                    <div className="mt-6 flex justify-center space-x-6">
                        <button className="rounded-full bg-blue-600 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                            View Gallery
                        </button>
                        <button className="flex items-center space-x-2 rounded-full border border-blue-600 px-8 py-3 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50">
                            <Instagram className="h-4 w-4" />
                            <span>Follow Us</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewPage;