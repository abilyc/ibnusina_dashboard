import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// components
import LoadingScreen from '../components/LoadingScreen';;

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks

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
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        // { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    {
      path: '/',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { path: '/', element: <Navigate to="app" replace /> },
        { path: 'app', element: <GeneralApp /> },
        { path: 'blog', element: <BlogPosts />},
        { path: 'ct', element: <p>category n tag</p>},
        { path: 'blog/new', element: <BlogNewPost />},
        { path: 'blog/edit', element: <EditPost />}
      ]
    },
    {
      path: 'login',
      element: (
        <GuestGuard>
          <Login/>
        </GuestGuard>
      )
    }
  ])
}

// IMPORT COMPONENTS
// Dashboard
const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
const GeneralApp = Loadable(lazy(() => import('../pages/GeneralApp')));
const BlogPosts = Loadable(lazy(() => import('../pages/BlogPosts')));
const BlogNewPost = Loadable(lazy(() => import('../pages/BlogNewPost')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
const EditPost = Loadable(lazy(() => import('../pages/BlogEditPost')));
