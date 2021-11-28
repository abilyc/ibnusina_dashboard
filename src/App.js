// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// hooks
import { useAuth } from './contexts/useAuth';
// components
import RtlLayout from './components/RtlLayout';
// import ScrollToTop from './components/ScrollToTop';
import NotistackProvider from './components/NotistackProvider';
import ThemePrimaryColor from './components/ThemePrimaryColor';
import LoadingScreen, { ProgressBarStyle } from './components/LoadingScreen';
import { AuthProvider } from './contexts/useAuth';

// ----------------------------------------------------------------------

export default function App() {
  // const { isInitialized } = useAuth();

  return (
    <ThemeConfig>
      <ThemePrimaryColor>
          <RtlLayout>
            <NotistackProvider>
              <GlobalStyles />
              <ProgressBarStyle />
              {/* <ScrollToTop /> */}
              {/* {isInitialized ? <Router /> : <LoadingScreen />} */}
              <AuthProvider>
                <Router />
              </AuthProvider>
            </NotistackProvider>
          </RtlLayout>
      </ThemePrimaryColor>
    </ThemeConfig>
  );
}
