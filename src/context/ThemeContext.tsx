import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { GlobalStyles } from '../styles/global';
import { ThemeProvider } from 'styled-components';
import { dark_default, light_default } from '../styles/themes';
import { Theme } from '../../@types';

interface IContext {
  themeSwitcher: () => void;
  slidePageUp: () => void;
  darkmode: boolean;
}
interface IProps {
  children: ReactNode;
}
interface ITheme {
  darkMode: boolean;
}

const context = createContext<IContext>({
  themeSwitcher: () => {},
  slidePageUp: () => {},
  darkmode: false,
});

export default function ThemeContext({ children }: IProps): JSX.Element {
  const [themeSettings, setThemeSettings] = useState<ITheme>({
    darkMode: false,
  });
  const [currentTheme, setCurrentTheme] = useState<Theme>(light_default);
  const THEME_STORAGE_KEY: string = 'THEME_SETTINGS';

  function themeSwitcher(): void {
    if (!themeSettings.darkMode) {
      setCurrentTheme(dark_default);
      setThemeSettings({ darkMode: true });
      localStorage.setItem(
        THEME_STORAGE_KEY,
        JSON.stringify({ darkMode: true })
      );
    } else {
      setCurrentTheme(light_default);
      setThemeSettings({ darkMode: false });
      localStorage.setItem(
        THEME_STORAGE_KEY,
        JSON.stringify({ darkMode: false })
      );
    }
  }

  // slides the page to the top
  function slidePageUp(): void {
    return window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth',
    });
  }

  useEffect(() => {
    const themeConfig: any = JSON.parse(
      localStorage.getItem(THEME_STORAGE_KEY) || `{"darkMode": true}`
    );
    setThemeSettings(themeConfig);
    themeConfig.darkMode
      ? setCurrentTheme(dark_default)
      : setCurrentTheme(light_default);
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <context.Provider
        value={{
          themeSwitcher,
          slidePageUp,
          darkmode: themeSettings.darkMode,
        }}>
        {children}
      </context.Provider>
    </ThemeProvider>
  );
}

export const useThemeContext = (): IContext => useContext(context);
