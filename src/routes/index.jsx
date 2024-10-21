import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Auth/Login/Login'
import CustomerRegister from '../pages/Auth/CustomerRegister/CustomerRegister'
import CompleteRegister from '../pages/Auth/CustomerRegister/CompleteRegister'
import PhotographerRegister from '../pages/Auth/PhotographerRegister/PhotographerRegister'
import Profile from '../pages/Photographer/Profile/Profile'
import PhotographerEditPage from '../pages/Photographer/PhotographerEditPage/PhotographerEditPage'
import ViewPhotographer from '../pages/ChoosePhotographer/ViewPhotoGrapher'
import ChoosePhotographer from '../pages/BookingPhotoPage'
import PhotoShootPlans from '../pages/Booking/PhotoShootPlans'
import PhotoShootDetail from '../pages/Booking/PhotoShootDetail'
import ConfirmationBooking from '../pages/Booking/ConfirmationBooking'


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
    path: '/complete-register',
    element: <CompleteRegister />,
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
        element: <Profile />
      },
      {
        path: '/photographer/edit',
        element: <PhotographerEditPage />
      },
    ]
  },
  {
    path: '/choose-photographer',
    element: <ViewPhotographer />,
  }
  ,
  {
    path: '/view-photographer',
    element: <ChoosePhotographer />,
  },
  {
    path: '/photo-combo',
    element: <PhotoShootPlans />,
  },
  {
    path: '/booking-photo-details',
    element:<PhotoShootDetail /> 
  },
  {
    path: '/confirmation-booking',
    element: <ConfirmationBooking />,
  }
  
]

const RouteElements = () => {
  const element = useRoutes(routes)
  return element
}

export default RouteElements
