import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { Theme } from '../types';
import { GlobalStyles } from '../styles/global';
import { ThemeProvider } from 'styled-components';
import { dark_default, light_default } from '../styles/themes';

interface IContext {
  slidePageUp: () => void;
  matchMediaTheme: () => void;
  setLightMode: () => void;
  setDarkMode: () => void;
  darkmode: boolean;
}

interface IProps {
  children: ReactNode;
}

interface ITheme {
  darkMode: boolean;
}

const context = createContext<IContext>({
  matchMediaTheme: () => {},
  setLightMode: () => {},
  setDarkMode: () => {},
  slidePageUp: () => {},
  darkmode: false,
});

export default function ThemeContext({ children }: IProps) {
  const [themeSettings, setThemeSettings] = useState<ITheme>({
    darkMode: false,
  });
  const [currentTheme, setCurrentTheme] = useState<Theme>(light_default);

  const setDarkMode = () => {
    setCurrentTheme(dark_default);
    setThemeSettings({ darkMode: true });
  };

  const setLightMode = () => {
    setCurrentTheme(light_default);
    setThemeSettings({ darkMode: false });
  };

  const matchMediaTheme = () => {
    const currentMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    if (currentMode) {
      setDarkMode();
    } else {
      setLightMode();
    }
  };

  // slides the page to the top
  const slidePageUp = () =>
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth',
    });

  useEffect(() => {
    matchMediaTheme();

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) =>
        e.matches ? setDarkMode() : setLightMode()
      );
    return () =>
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', (e) =>
          e.matches ? setDarkMode() : setLightMode()
        );
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <context.Provider
        value={{
          slidePageUp,
          darkmode: themeSettings.darkMode,
          setDarkMode,
          setLightMode,
          matchMediaTheme,
        }}>
        {children}
      </context.Provider>
    </ThemeProvider>
  );
}

export const useThemeContext = () => useContext(context);
