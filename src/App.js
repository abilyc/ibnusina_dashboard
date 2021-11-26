// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// hooks
// import useAuth from './hooks/useAuth';
// components
import RtlLayout from './components/RtlLayout';
import ScrollToTop from './components/ScrollToTop';
import NotistackProvider from './components/NotistackProvider';
import ThemePrimaryColor from './components/ThemePrimaryColor';
import LoadingScreen, { ProgressBarStyle } from './components/LoadingScreen';

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
              <ScrollToTop />
              {/* {isInitialized ? <Router /> : <LoadingScreen />} */}
              <Router /> 
            </NotistackProvider>
          </RtlLayout>
      </ThemePrimaryColor>
    </ThemeConfig>
  );
}
