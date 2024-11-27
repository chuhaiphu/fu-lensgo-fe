import React, { useEffect, useState } from 'react'
import { getReviewsByStudioIdApi } from '../../apis/review-api';

function ReviewSection({studioId}) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reviewsResponse] = await Promise.all([
          getReviewsByStudioIdApi(studioId)
        ]);
        setReviews(reviewsResponse.content);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [studioId]);
  return (
    <div className="max-w-4xl mx-auto my-16">
      <h2 className="text-2xl font-bold mb-8 text-gray-900">Customer Reviews</h2>
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="h-10 w-10 rounded-full bg-teal-500 flex items-center justify-center">
                    <span className="text-white font-medium">
                      {review.createdBy.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{review.createdBy}</h3>
                  <time className="text-sm text-gray-500">
                    {new Date(review.createdDate).toLocaleDateString()}
                  </time>
                </div>
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`h-5 w-5 ${index < review.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-gray-700 text-sm">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReviewSection