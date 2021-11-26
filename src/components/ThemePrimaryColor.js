import PropTypes from 'prop-types';
import { useMemo } from 'react';
// material
import { alpha, ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
// hooks
// import useSettings from '../hooks/useSettings';
//
import componentsOverride from '../theme/overrides';
import palette from '../theme/palette';

// ----------------------------------------------------------------------

ThemePrimaryColor.propTypes = {
  children: PropTypes.node
};

export default function ThemePrimaryColor({ children }) {
  const defaultTheme = useTheme();
  // const { setColor } = useSettings();
  const setColor = {
    name: 'orange',
    lighter: '#FEF4D4',
    light: '#FED680',
    main: '#fda92d',
    dark: '#B66816',
    darker: '#793908',
    contrastText: palette.light.grey[800]
  }

  const themeOptions = useMemo(
    () => ({
      ...defaultTheme,
      palette: {
        ...defaultTheme.palette,
        // primary: setColor
        primary: setColor
      },
      customShadows: {
        ...defaultTheme.customShadows,
        primary: `0 8px 16px 0 ${alpha(setColor.main, 0.24)}`
      }
    }),
    [setColor, defaultTheme]
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
