import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Auth/Login/Login'
import CustomerRegister from '../pages/Auth/CustomerRegister/CustomerRegister'
import CompleteRegister from '../pages/Auth/CustomerRegister/CompleteRegister'
import PhotographerRegister from '../pages/Auth/PhotographerRegister/PhotographerRegister'
import Profile from '../pages/Photographer/Profile/Profile'
import PhotographerEditPage from '../pages/Photographer/PhotographerEditPage/PhotographerEditPage'


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
  }
]

const RouteElements = () => {
  const element = useRoutes(routes)
  return element
}

export default RouteElements
