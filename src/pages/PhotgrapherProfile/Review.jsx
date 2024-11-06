import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid'

const ReviewStarsAndBar = ({ rating }) => {
  return (
    <div className="flex items-center mt-1">
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <span key={index}>
            {index < rating ? (
              <StarIcon className="mr-1 w-8 h-8 text-yellow-400" />
            ) : (
              <StarIcon className="mr-1 w-8 h-8 text-gray-300" />
            )}
          </span>
        ))}
      </div>
      <div className="w-full h-2 ml-2 bg-gray-200 rounded">
        <div className="h-full bg-gray-400 rounded" style={{ width: `${rating * 20}%` }}></div>
      </div>
    </div>
  )
}

const UserComment = ({ user, rating, comment }) => (
  <div className="mt-4">
    <div className="flex items-center mb-2">
      <span className="font-semibold mr-2 pt-2">{user}</span>
      <ReviewStarsAndBar rating={rating} />
    </div>
    <p className="p-2 bg-white rounded-lg">{comment}</p>
  </div>
)

const Review = () => {
  return (
    <>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Review</h2>
        <div className="mb-8">
          {[5, 4, 3, 2, 1].map((count) => (
            <ReviewStarsAndBar key={count} rating={count} />
          ))}
        </div>
      </div>
      <div className='bg-gray-100 p-8'>
        <div className='max-w-2xl mx-auto'>
          <h3 className="text-lg font-semibold">Comment</h3>
          <UserComment user="User1" rating={5} comment="blablablablabla" />
          <UserComment user="User2" rating={4} comment="blablablablabla" />
        </div>
      </div>
    </>
  );
};

export default Review