import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStudiosApi } from '../../apis/studio-api';
import { getAlbumPhotosApi, getAlbumsApi } from '../../apis/album-api';

const photoData = [
    {
        src: '/image/ChoosePhotoGrapher/trip.jpg', // Add correct path for images
        alt: 'Da Lat Trip Photos',
        title: 'Da Lat Trip Photos',
    },
    {
        src: '/image/ChoosePhotoGrapher/trip.jpg',
        alt: 'London couple photos',
        title: 'London couple photos',
    },
    {
        src: '/image/ChoosePhotoGrapher/trip.jpg',
        alt: 'London couple photos',
        title: 'London couple photos',
    },
    {
        src: '/image/ChoosePhotoGrapher/trip.jpg',
        alt: 'London couple photos',
        title: 'London couple photos',
    },
];


export default function ViewPhotographer() {
    const [studios, setStudios] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [albumPhotos, setAlbumPhotos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all data in parallel
                const [studiosResponse, albumsResponse, photosResponse] = await Promise.all([
                    getStudiosApi(),
                    getAlbumsApi(),
                    getAlbumPhotosApi()
                ]);

                setStudios(studiosResponse.content);
                setAlbums(albumsResponse.content);
                setAlbumPhotos(photosResponse.content);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const getStudioAlbumPhotos = (studioId) => {
        const studioAlbums = albums.filter(album => album.studioId === studioId);
        const photos = [];

        studioAlbums.forEach(album => {
            const albumPhotosForStudio = albumPhotos.filter(photo => photo.albumId === album.id);
            photos.push(...albumPhotosForStudio);
        });

        return photos;
    };


    return (
        <div className="bg-white">
            {/*---------------------------------- Choose photographer------------------------------------------ */}
            <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8 justify-center">
                <div>
                    <h2 className="w-full text-[24px] font-bold tracking-tight text-black bg-[#91A797] h-[58px] text-center flex items-center justify-center">
                        Choose Your Studio
                    </h2>
                </div>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {studios.map((studio) => {
                        const studioPhotos = getStudioAlbumPhotos(studio.id)
                        const mainPhoto = studioPhotos[0]?.pictureLink || '/default-image.jpg'
                        const smallPhotos = studioPhotos.slice(1, 4)
                        const studioAlbum = albums.find(album => album.studioId === studio.id)

                        return (
                            <Link key={studio.id} to={`/choose-photographer/details/${studio.id}`}>
                                <div className="group relative flex flex-col items-center bg-[#D9D9D9] p-4 rounded-lg">
                                    {/* Big image */}
                                    <div className="w-full aspect-square mb-4">
                                        <img
                                            alt={`${studio.name} main`}
                                            src={mainPhoto}
                                            className="w-full h-full object-cover object-center rounded-xl"
                                        />
                                    </div>

                                    {/* Small images row */}
                                    <div className="flex justify-between w-full gap-2 mb-4">
                                        {smallPhotos.map((photo, index) => (
                                            <img
                                                key={index}
                                                alt={`${studio.name} thumbnail ${index + 1}`}
                                                src={photo.pictureLink}
                                                className="w-1/3 aspect-square object-cover object-center rounded-xl"
                                            />
                                        ))}
                                    </div>

                                    {/* Studio information */}
                                    <div className="flex justify-between w-full">
                                        <div>
                                            <h3 className="font-sans font-bold">{studio.name}</h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {studioAlbum?.name || 'No album available'}
                                            </p>
                                        </div>
                                        <p className="w-24 text-[#3B2C2C] font-bold text-center bg-[#ffffff] my-auto">
                                            {studioAlbum ? (studioAlbum.price / 1000000).toFixed(3) : 0}M
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>

            {/*---------------------------------- Button View More------------------------------------------ */}
            <div className="flex justify-center mb-6">
                <button
                    type="button"
                    className="inline-flex items-center justify-center w-[297px] h-[50px] rounded-md bg-[#91A797] px-3.5 py-2.5 text-[24px] font-extrabold italic text-white shadow-sm hover:bg-[#819287] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#91A797]"
                >
                    View more
                    <span> &rarr;</span> {/* Replace with your arrow icon or text */}
                </button>
            </div>
            {/*----------------------------------  Iconic Newport Beach Photo Shoot------------------------------------------ */}
            <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
                {/* Replace custom Card with a div */}
                <div className="relative z-[1] rounded-md overflow-hidden" >
                    <div className="absolute left-0 top-0 w-full h-full rounded-md z-[-1]">
                        <img
                            src="/image/ChoosePhotoGrapher/beach2.jpg" // Correct path
                            alt="Card Background"
                            className="block w-full h-full object-cover rounded-md"
                        />
                    </div>
                    <div className="p-6">
                        <header className="mb-5">
                            <div className="card-title text-white">Card Title</div>
                        </header>

                        <div className="text-white mt-[70px]">
                            <div className="text-white text-sm mb-2">This is a subtitle</div>
                            <div className="text-sm">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.
                            </div>
                        </div>

                        <div className="mt-[71px]">
                            {/* Replace custom Button with a standard button */}
                            <a href="#" className="btn bg-white text-slate-800 p-2 rounded-md">
                                Learn more
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/*---------------------------------- Moment Capture------------------------------------------ */}
            <div className="w-4/5 bg-pink-100 p-8 mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
                {/* Heading Section */}
                <h1 className="text-4xl font-serif text-[#A26B63] mb-8">Moments We Capture</h1>

                {/* Photo Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {photoData.map((photo, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="rounded-full overflow-hidden h-60 w-60">
                                <img
                                    src={photo.src}
                                    alt={photo.alt}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <p className="text-lg font-semibold text-gray-700 mt-4">{photo.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
