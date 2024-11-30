import Footer from "../../components/Footer/Footer"
import Hero from "../../components/Hero/Hero"
import { PhotoIcon, CameraIcon, ArrowPathRoundedSquareIcon, BellAlertIcon, HandThumbUpIcon, ArrowUpOnSquareStackIcon } from '@heroicons/react/24/outline'
import ImagePhographer from "/image/Home/photographer-left-side.jpg"
import { Link, useParams } from "react-router-dom";

const features = [
  {
    name: 'Build your portfolio',
    description:
      'Get exposed to a wide array of projects from families to events and even, food. Start building an attractive portfolio with us for your career!',
    icon: PhotoIcon,
  },
  {
    name: 'You shoot, we edit',
    description:
      'Focus on why you became a photographer, taking amazing photos! Just upload the photos and our dedicated editors will handle the rest from sorting, curating to editing.',
    icon: CameraIcon,
  },
  {
    name: 'Flexible hours',
    description:
      'Take on projects based on your availability and maximize your free-time by taking on shoots',
    icon: ArrowPathRoundedSquareIcon,
  },
]

const features2 = [
  {
    name: 'Get notified',
    description:
      'We will notify you of an assigned session directly through the dedicated app.',
    icon: BellAlertIcon,
  },
  {
    name: 'Enjoy your shoot',
    description:
      'Meet new people, take them to the best spots of your city, and have a great time capturing their moments!',
    icon: HandThumbUpIcon,
  },
  {
    name: 'Upload the photos',
    description:
      'Simply upload your photos to our system and we will handle everything from sorting, editing, to delivering the best photos to the clients!',
    icon: ArrowUpOnSquareStackIcon,
  },
]


function Home() {
  return (
    <>
      <Hero />
      <div className="relative bg-white">
        <div className="relative h-80 overflow-hidden bg-gray-100 md:absolute md:left-0 md:h-full w-1/3">
          <img
            alt=""
            src={ImagePhographer}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative mx-auto max-w-7xl py-24 sm:py-32 lg:px-8 lg:py-40">
          <div className="pl-6 pr-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-2/3 lg:pl-16 lg:pr-0 xl:pl-24">
            <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-4xl">GET PAID FOR YOUR PHOTOGRAPHY PASSION</p>
            <p className="mt-6 text-lg leading-7 text-gray-800">
              Join thousands of SweetEscape photographers and start getting clients, for any kind of photography.
            </p>
            <div className="mt-8">
              <Link to={`/photographer-register`}>
              <a
                href="#"
                className="inline-flex rounded-md bg-yellow-500 px-10 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
              >
                JOIN AS A PHOTOGRAPHER
              </a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
              Why
              <a href="#" className="-m-1.5 p-3.5">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">LensGo</span>
                  <span className="text-6xl font-island-moments text-[#dd8181]">LensGo</span>
                </a>
              </a>
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-2xl sm:mt-10 lg:mt-12 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col items-center">
                  <feature.icon aria-hidden="true" className="h-12 w-12 flex-none text-[#dd8181] mb-4" />
                  <dt className="text-xl font-semibold leading-7 text-gray-900 mb-2">
                    {feature.name}
                  </dt>
                  <dd className="mt-2 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto text-center">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
              How does
              <a href="#" className="m-1.5 p-2.5">
                <span className="sr-only">LensGo</span>
                <span className="text-7xl font-island-moments text-[#dd8181]">LensGo</span>
              </a>
              works?
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-2xl sm:mt-20 lg:mt-12 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features2.map((feature) => (
                <div key={feature.name} className="flex flex-col bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105">
                  <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 text-gray-900 mb-4">
                    <feature.icon aria-hidden="true" className="h-8 w-8 flex-none text-orange-500" />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <Footer />
    </>

  )
}

export default Home