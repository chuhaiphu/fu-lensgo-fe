import { CameraIcon } from '@heroicons/react/24/outline'

function ImageArray() {
  const foodImage = 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg'
  const sportImage = 'https://storage.googleapis.com/pod_public/1300/167703.jpg'
  const portraitImage = 'https://res.cloudinary.com/dqzkirtbz/image/upload/w_auto/q_auto,f_auto,dpr_auto/v1698342290/Website/blog/female_portrait_postcrest.jpg'

  return (
    <div>
      <div className="grid grid-cols-4 my-10">
        {[foodImage, sportImage, portraitImage, foodImage].map((image, index) => (
          <div key={index} className="flex flex-col items-center">
            <img src={image} className="w-full h-64 object-cover mb-2" alt={`Image ${index + 1}`} />
            <div className="rounded-full border-2 border-black p-2">
              <CameraIcon className="h-6 w-6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageArray