import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Auth/Login/Login'
import CustomerRegister from '../pages/Auth/CustomerRegister/CustomerRegister'
import PhotographerRegister from '../pages/Auth/PhotographerRegister/PhotographerRegister'
import DashboardLayout from '../components/layouts/dashboard-layout'
import { ADMIN_ROUTES } from '../constants/routes'
import HomePage from '../components/overview'
import ViewDetailPage from '../pages/ViewDetailStudio'

import PhotographerProfile from '../pages/PhotgrapherProfile/PhotographerProfile'
import ChoosePhotographerPage from '../pages/ChoosePhotographerPage'
import ChoosePhotographerDetailsPage from '../pages/ChoosePhotographerDetailsPage'
import PhotoshootPackageChoosingPage from '../pages/PhotoshootPackageChoosingPage/PhotoshootPackageChoosingPage'
import BookingConfirmationPage from '../pages/BookingConfirmationPage/BookingConfirmationPage'
import PhotoshootDetailsPage from '../pages/PhotoshootDetailsPage/PhotoshootDetailsPage'
import PaymentSuccessPage from '../pages/PaymentSuccessPage/PaymentSuccessPage'
import VerifyOTPPage from '../pages/Auth/VerifyOTPPage/VerifyOTPPage'
import UserProfile from '../pages/UserProfile/UserProfile'
import ViewDetailPageCustomer from '../pages/ViewDetailCustomer'
import ViewDetailPageStudio from '../pages/ViewDetailStudio'
import ViewDetailPageOrder from '../pages/ViewDetailOrder'




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
    path: '/login/',
    element: <Login />,
  },
  {
    path: 'verify-otp/:email',
    element: <VerifyOTPPage />,
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
    path: '/user',
    children: [
      {
        path: '/user/profile',
        element: <UserProfile />
      },
    ]
  },
  {
    path: '/photographer',
    children: [
      {
        path: '/photographer/profile',
        element: <PhotographerProfile />
      }
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
        path: '/choose-photographer/details/:studioId',
        element: <ChoosePhotographerDetailsPage />,
      },
    ]
  },
  {
    path: '/booking',
    children: [
      {
        path: '/booking/photoshoot-package/:studioId/:comboId',
        element: <PhotoshootPackageChoosingPage />,
      },
      {
        path: '/booking/photoshoot-details/:studioId/:comboId/:shootingTypeId',
        element: <PhotoshootDetailsPage />,
      },
      {
        path: '/booking/confirmation/:bookingId',
        element: <BookingConfirmationPage />,
      },
      {
        path: '/booking/confirmation/:paymentId/status/:status',
        element: <PaymentSuccessPage />,
      }
    ]
  },
  {
    path: ADMIN_ROUTES.ADMIN,
    element: <DashboardLayout />,
    children: [
      {
        path: ADMIN_ROUTES.OVERVIEW,
        element: <HomePage />,
      },
      {
        path: ADMIN_ROUTES.CUSTOMER,
        element: <ViewDetailPageCustomer />,
      },
      {
        path: ADMIN_ROUTES.BOOKING,
        element: <ViewDetailPageOrder />,
      },
      {
        path: ADMIN_ROUTES.STUDIO,
        element: <ViewDetailPageStudio />,
      },
    ],
  }
]

const RouteElements = () => {
  const element = useRoutes(routes)
  return element
}

export default RouteElements
