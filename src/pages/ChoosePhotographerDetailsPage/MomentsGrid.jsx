// Update MomentsGrid.jsx to use real album data:

const MomentsGrid = ({ albums, albumPhotos }) => {
    return (
        <div className="max-w-screen-lg mx-auto px-4 py-10">
            <h2 className="text-center text-2xl font-semibold mb-8">Other Moments for You</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {albums.map((album) => {
                    const firstPhoto = albumPhotos.find(photo => album.albumPhotosIds?.includes(photo.id));
                    return (
                        <div key={album.id} className="relative">
                            <img
                                src={firstPhoto?.pictureLink}
                                alt={album.name}
                                className="w-full h-64 object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
                                <h3 className="text-white text-xl font-semibold">{album.name}</h3>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="text-center mt-8">
                <a href="#more-moments" className="text-teal-600 font-semibold hover:underline">
                    Explore other moments
                </a>
            </div>
        </div>
    );
};

export default MomentsGrid;
