// src/ImageCarousel.js
import React, { useState } from 'react';

const ImageCarousel = () => {
    const images = [
        'https://via.placeholder.com/1920x600?text=Image+1',
        'https://via.placeholder.com/1920x600?text=Image+2',
        'https://via.placeholder.com/1920x600?text=Image+3'
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="relative w-full h-full overflow-hidden">
            <img
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
            />
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-200"
            >
                ❮
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-200"
            >
                ❯
            </button>
        </div>
    );
};

export default ImageCarousel;
