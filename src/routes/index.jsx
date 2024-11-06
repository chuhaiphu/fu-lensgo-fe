import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Auth/Login/Login'
import CustomerRegister from '../pages/Auth/CustomerRegister/CustomerRegister'
import PhotographerRegister from '../pages/Auth/PhotographerRegister/PhotographerRegister'
import PhotographerProfile from '../pages/PhotgrapherProfile/PhotographerProfile'
import PhotographerEditPage from '../pages/PhotographerEditPage/PhotographerEditPage'
import ChoosePhotographerPage from '../pages/ChoosePhotographerPage'
import ChoosePhotographerDetailsPage from '../pages/ChoosePhotographerDetailsPage'
import PhotoshootPackageChoosingPage from '../pages/PhotoshootPackageChoosingPage/PhotoshootPackageChoosingPage'
import BookingConfirmationPage from '../pages/BookingConfirmationPage/BookingConfirmationPage'
import PhotoshootDetailsPage from '../pages/PhotoshootDetailsPage/PhotoshootDetailsPage'



// // * for user
// const ProtectedRoute = () => {
//   const user = useUserStore((state) => state.user);

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   return <Outlet />;
// };

// const RestrictedRoute = () => {
//   const user = useUserStore((state) => state.user);

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (user.role?.toLowerCase() !== 'admin') {
//     return <Navigate to="/" replace />;
//   }

//   return <Outlet />;
// };

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <CustomerRegister />,
  },
  {
    path: '/photographer-register',
    element: <PhotographerRegister />,
  },
  {
    path: '/photographer',
    children: [
      {
        path: '/photographer/profile',
        element: <PhotographerProfile />
      },
      {
        path: '/photographer/edit',
        element: <PhotographerEditPage />
      },
    ]
  },
  {
    path: '/choose-photographer',
    children: [
      {
        path: '/choose-photographer',
        element: <ChoosePhotographerPage />,
      },
      {
        path: '/choose-photographer/details',
        element: <ChoosePhotographerDetailsPage />,
      },
    ]
  },
  {
    path: '/booking/photoshoot-package',
    element: <PhotoshootPackageChoosingPage />,
  },
  {
    path: '/booking/photoshoot-details',
    element:<PhotoshootDetailsPage/> 
  },
  {
    path: '/booking/confirmation',
    element: <BookingConfirmationPage />,
  }
  
]

const RouteElements = () => {
  const element = useRoutes(routes)
  return element
}

export default RouteElements
