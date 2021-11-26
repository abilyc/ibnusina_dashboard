import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
import DashboardLayout from '../layouts/dashboard';
// guards
// import GuestGuard from '../guards/GuestGuard';
// import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense
      fallback={
        <LoadingScreen />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Navigate to="app" replace /> },
        { path: 'app', element: <GeneralApp /> },
        { path: 'blog', element: <BlogPosts />}
      ]
    },
  ])
}

// IMPORT COMPONENTS
// Dashboard
const GeneralApp = Loadable(lazy(() => import('../pages/GeneralApp')));
const BlogPosts = Loadable(lazy(() => import('../pages/BlogPosts')));
// const BlogPost = Loadable(lazy(() => import('../pages/dashboard/BlogPost')));
// const BlogNewPost = Loadable(lazy(() => import('../pages/dashboard/BlogNewPost')));
