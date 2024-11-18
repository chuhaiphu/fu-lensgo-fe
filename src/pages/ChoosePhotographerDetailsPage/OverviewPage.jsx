import React, { useState, useEffect } from "react";
import { Camera, Heart, Share2, Instagram } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { getStudioByIdApi } from "../../apis/studio-api";
import { getAlbumsByStudioId, getAlbumPhotosByAlbumIdApi } from "../../apis/album-api";
import { getCombosByStudioIdApi } from "../../apis/combo";
import { toast } from 'react-toastify';

const OverviewPage = ({ studioId }) => {
    const [isCardVisible, setIsCardVisible] = useState(true);
    const [studioData, setStudioData] = useState(null);
    const [albums, setAlbums] = useState([]);
    const [albumPhotos, setAlbumPhotos] = useState([]); 
    const [combos, setCombos] = useState([]);
    const [selectedCombo, setSelectedCombo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch studio data and combos
                const [studioResponse, albumsResponse, combosResponse] = await Promise.all([
                    getStudioByIdApi(studioId),
                    getAlbumsByStudioId({ studioId }),
                    getCombosByStudioIdApi({ studioId })
                ]);

                setStudioData(studioResponse.content);
                setAlbums(albumsResponse.content);
                setCombos(combosResponse.content);
                setSelectedCombo(combosResponse.content[0]);

                // Fetch photos for each album
                const photosPromises = albumsResponse.content.map(album => 
                    getAlbumPhotosByAlbumIdApi({ albumId: album.id })
                );

                const photosResponses = await Promise.all(photosPromises);
                const allPhotos = photosResponses.flatMap(response => response.content);
                setAlbumPhotos(allPhotos);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [studioId]);

    const FloatingToggle = () => (
        <button
            onClick={() => setIsCardVisible(!isCardVisible)}
            className={`fixed top-128 ${isCardVisible ? 'right-[340px]' : 'right-8'} z-20 
            p-3 rounded-full shadow-lg transition-all duration-300
            bg-teal-600 hover:bg-teal-700 text-white
            flex items-center gap-2`}
        >
            {isCardVisible ? (
                <>
                    <ChevronRight className="h-5 w-5" />
                </>
            ) : (
                <>
                    <span className="text-lg font-semibold">Book here</span>
                </>
            )}
        </button>
    );

    const PricingCard = () => {
        const handleBookNow = (e) => {
            e.preventDefault();
            const accessToken = localStorage.getItem("access_token");
            
            if (!accessToken) {
                toast.warning("Please login to book a photoshoot session!", {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                return;
            }
            
            // If logged in, proceed with navigation
            window.location.href = `/booking/photoshoot-package/${studioId}/${selectedCombo?.id}`;
        };

        return (
            <div className={`fixed top-96 right-8 z-10 w-80 transition-transform duration-300 ${isCardVisible ? 'translate-x-0' : 'translate-x-[120%]'}`}>
                <div className="p-6 border rounded-lg shadow-lg bg-white backdrop-blur-sm bg-opacity-90">
                    <div className="space-y-4">
                        {combos.map((combo) => (
                            <div key={combo.id}
                                onClick={() => setSelectedCombo(combo)}
                                className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedCombo?.id === combo.id ? 'border-teal-600 bg-teal-50' : 'border-gray-200'
                                    }`}>
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-lg font-bold text-gray-700">{combo.name}</h3>
                                    <span className="text-orange-500 font-semibold">{combo.price.toLocaleString()} VND</span>
                                </div>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• {combo.editedPhotos} edited photos</li>
                                    <li>• {combo.downloadablePhotos} downloadable photos</li>
                                    <li>• {combo.duration} minutes session</li>
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div onClick={handleBookNow} className="block mt-6">
                        <button className="w-full py-3 bg-teal-600 text-white font-bold rounded-md hover:bg-teal-700 transition duration-300">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <FloatingToggle />
            <PricingCard />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="pt-20 pb-16 text-center">
                    <Camera className="mx-auto h-12 w-12 text-blue-600" />
                    <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                        {studioData?.name || "Wedding's Photo Album"}
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                        {studioData?.overview || "Capturing timeless moments and creating lasting memories"}
                    </p>
                </div>

                {/* Display albums and their photos */}
                <div className="max-w-6xl mx-auto">
                    {albums.map((album) => (
                        <div key={album.id} className="mb-12">
                            <h2 className="text-2xl font-bold mb-6">{album.name}</h2>
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
                                {albumPhotos
                                    .filter(photo => album.albumPhotosIds?.includes(photo.id))
                                    .map((photo, index) => (
                                        <div key={photo.id} className="group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
                                            <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-100"></div>
                                            <img
                                                src={photo.pictureLink}
                                                alt={`Album photo ${index + 1}`}
                                                className="h-[400px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 transition-opacity group-hover:opacity-100">
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
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="py-20 text-center">
                    <div className="mt-6 flex justify-center space-x-6">
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