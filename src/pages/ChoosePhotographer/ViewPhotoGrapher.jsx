import { CheckCircleIcon } from '@heroicons/react/20/solid'
const photographers = [
    {
        id: 1,
        name: 'Ten Photographer 1',
        href: '#',
        imageSrc: 'https://allimages.sgp1.digitaloceanspaces.com/wikilaptopcom/2021/01/Hinh-nen-phong-canh-dep-nhat.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '999',
        color: 'Concept',
    },
    // More photographers...
]

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
    return (
        <div className="bg-white">
            {/*---------------------------------- Choose photographer------------------------------------------ */}
            <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8 justify-center">
                <div>
                    <h2 className="w-full text-[24px] font-bold tracking-tight text-black bg-[#91A797] h-[58px] text-center flex items-center justify-center">
                        Choose your studio
                    </h2>
                </div>

                <div className="mt-10">
                    {photographers.map((photographer) => (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-12 gap-y-10">
                            <div className=" w-72 h-auto">
                                <div key={photographer.id} className="group relative flex flex-col items-center bg-[#D9D9D9] ">
                                    {/* Big image */}
                                    <div className="w-3/4 p-2" >
                                        <img
                                            alt={photographer.imageAlt}
                                            src={photographer.imageSrc}
                                            className="w-full h-auto object-cover object-center rounded-xl"
                                        />
                                    </div>

                                    {/* Small images in a row below the big one */}
                                    <div className="flex justify-center mt-2 w-full">
                                        <img
                                            alt={photographer.imageAlt}
                                            src={photographer.imageSrc}
                                            className="w-1/3 h-auto object-cover object-center p-2 rounded-xl"
                                        />
                                        <img
                                            alt={photographer.imageAlt}
                                            src={photographer.imageSrc}
                                            className="w-1/3 h-auto object-cover object-center p-2 rounded-xl"
                                        />
                                        <img
                                            alt={photographer.imageAlt}
                                            src={photographer.imageSrc}
                                            className="w-1/3 h-auto object-cover object-center p-2 rounded-xl"
                                        />
                                    </div>

                                    {/* Photographer information */}
                                    <div className="mt-4 flex justify-between w-full p-2">
                                        <div>
                                            <h3 className="font-sans font-bold">
                                                <a href={photographer.href}>
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    {photographer.name}
                                                </a>
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">{photographer.color}</p>
                                        </div>
                                        <p className="w-24 text-[#3B2C2C] font-bold text-center bg-[#ffffff] my-auto">
                                            {photographer.price}k
                                        </p>

                                    </div>
                                </div>
                            </div>
                            <div className=" w-72 h-auto">
                                <div key={photographer.id} className="group relative flex flex-col items-center bg-[#D9D9D9] ">
                                    {/* Big image */}
                                    <div className="w-3/4 p-2" >
                                        <img
                                            alt={photographer.imageAlt}
                                            src={photographer.imageSrc}
                                            className="w-full h-auto object-cover object-center rounded-xl"
                                        />
                                    </div>

                                    {/* Small images in a row below the big one */}
                                    <div className="flex justify-center mt-2 w-full">
                                        <img
                                            alt={photographer.imageAlt}
                                            src={photographer.imageSrc}
                                            className="w-1/3 h-auto object-cover object-center p-2 rounded-xl"
                                        />
                                        <img
                                            alt={photographer.imageAlt}
                                            src={photographer.imageSrc}
                                            className="w-1/3 h-auto object-cover object-center p-2 rounded-xl"
                                        />
                                        <img
                                            alt={photographer.imageAlt}
                                            src={photographer.imageSrc}
                                            className="w-1/3 h-auto object-cover object-center p-2 rounded-xl"
                                        />
                                    </div>

                                    {/* Photographer information */}
                                    <div className="mt-4 flex justify-between w-full p-2">
                                        <div>
                                            <h3 className="font-sans font-bold">
                                                <a href={photographer.href}>
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    {photographer.name}
                                                </a>
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">{photographer.color}</p>
                                        </div>
                                        <p className="w-24 text-[#3B2C2C] font-bold text-center bg-[#ffffff] my-auto">
                                            {photographer.price}k
                                        </p>

                                    </div>
                                </div>
                            </div>
                            <div className=" w-72 h-auto">
                                <div key={photographer.id} className="group relative flex flex-col items-center bg-[#D9D9D9] ">
                                    {/* Big image */}
                                    <div className="w-3/4 p-2" >
                                        <img
                                            alt={photographer.imageAlt}
                                            src={photographer.imageSrc}
                                            className="w-full h-auto object-cover object-center rounded-xl"
                                        />
                                    </div>

                                    {/* Small images in a row below the big one */}
                                    <div className="flex justify-center mt-2 w-full">
                                        <img
                                            alt={photographer.imageAlt}
                                            src={photographer.imageSrc}
                                            className="w-1/3 h-auto object-cover object-center p-2 rounded-xl"
                                        />
                                        <img
                                            alt={photographer.imageAlt}
                                            src={photographer.imageSrc}
                                            className="w-1/3 h-auto object-cover object-center p-2 rounded-xl"
                                        />
                                        <img
                                            alt={photographer.imageAlt}
                                            src={photographer.imageSrc}
                                            className="w-1/3 h-auto object-cover object-center p-2 rounded-xl"
                                        />
                                    </div>

                                    {/* Photographer information */}
                                    <div className="mt-4 flex justify-between w-full p-2">
                                        <div>
                                            <h3 className="font-sans font-bold">
                                                <a href={photographer.href}>
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    {photographer.name}
                                                </a>
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">{photographer.color}</p>
                                        </div>
                                        <p className="w-24 text-[#3B2C2C] font-bold text-center bg-[#ffffff] my-auto">
                                            {photographer.price}k
                                        </p>

                                    </div>
                                </div>
                            </div>
                            <div className=" w-72 h-auto">
                                <div key={photographer.id} className="group relative flex flex-col items-center bg-[#D9D9D9] ">
                                    {/* Big image */}
                                    <div className="w-3/4 p-2" >
                                        <img
                                            alt={photographer.imageAlt}
                                            src={photographer.imageSrc}
                                            className="w-full h-auto object-cover object-center rounded-xl"
                                        />
                                    </div>

                                    {/* Small images in a row below the big one */}
                                    <div className="flex justify-center mt-2 w-full">
                                        <img
                                            alt={photographer.imageAlt}
                                            src={photographer.imageSrc}
                                            className="w-1/3 h-auto object-cover object-center p-2 rounded-xl"
                                        />
                                        <img
                                            alt={photographer.imageAlt}
                                            src={photographer.imageSrc}
                                            className="w-1/3 h-auto object-cover object-center p-2 rounded-xl"
                                        />
                                        <img
                                            alt={photographer.imageAlt}
                                            src={photographer.imageSrc}
                                            className="w-1/3 h-auto object-cover object-center p-2 rounded-xl"
                                        />
                                    </div>

                                    {/* Photographer information */}
                                    <div className="mt-4 flex justify-between w-full p-2">
                                        <div>
                                            <h3 className="font-sans font-bold">
                                                <a href={photographer.href}>
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    {photographer.name}
                                                </a>
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">{photographer.color}</p>
                                        </div>
                                        <p className="w-24 text-[#3B2C2C] font-bold text-center bg-[#ffffff] my-auto">
                                            {photographer.price}k
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>


                    ))}
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
