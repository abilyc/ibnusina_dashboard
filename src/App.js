// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import RtlLayout from './components/RtlLayout';
import NotistackProvider from './components/NotistackProvider';
import ThemePrimaryColor from './components/ThemePrimaryColor';
import { ProgressBarStyle } from './components/LoadingScreen';
import { AuthProvider } from './contexts/useAuth';

// ----------------------------------------------------------------------

export default function App() {

  return (
    <ThemeConfig>
      <ThemePrimaryColor>
          <RtlLayout>
            <NotistackProvider>
              <GlobalStyles />
              <ProgressBarStyle />
              <AuthProvider>
                <Router />
              </AuthProvider>
            </NotistackProvider>
          </RtlLayout>
      </ThemePrimaryColor>
    </ThemeConfig>
  );
}
