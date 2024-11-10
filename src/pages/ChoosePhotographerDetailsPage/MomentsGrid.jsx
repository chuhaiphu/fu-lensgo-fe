import React from "react";

const MomentsGrid = () => {
    const moments = [
        { title: "Family", imageUrl: "family-image-url" },
        { title: "Graduation", imageUrl: "graduation-image-url" },
        { title: "Maternity", imageUrl: "maternity-image-url" },
        { title: "Proposal", imageUrl: "proposal-image-url" },
        { title: "Birthday", imageUrl: "birthday-image-url" },
    ];

    return (
        <div className="max-w-screen-lg mx-auto px-4 py-10">
            <h2 className="text-center text-2xl font-semibold mb-8">Other Moments for You</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {moments.map((moment, index) => (
                    <div key={index} className="relative">
                        <img
                            src={moment.imageUrl}
                            alt={moment.title}
                            className="w-full h-64 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
                            <h3 className="text-white text-xl font-semibold">{moment.title}</h3>
                        </div>
                    </div>
                ))}
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
