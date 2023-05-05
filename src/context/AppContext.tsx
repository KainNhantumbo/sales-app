import { colors } from '@/styles/colors';
import { GlobalStyles } from '@/styles/global';
import { ThemeProvider } from 'styled-components';
import {
  useState,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import type { AppContext, Theme } from '../../@types/index';

interface IContext {
  colors: Theme;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  pageProps: {
    offset: number;
    limit: number;
  };
  setPageProps: Dispatch<
    SetStateAction<{
      offset: number;
      limit: number;
    }>
  >;
}

const context = createContext<IContext>({
  colors,
  pageProps: {
    offset: 10,
    limit: 10,
  },
  searchValue: '',
  setPageProps: () => {},
  setSearchValue: () => {},
});

export default function AppContext(props: AppContext): JSX.Element {
  const [pageProps, setPageProps] = useState({
    offset: 10,
    limit: 10,
  });
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <ThemeProvider theme={colors}>
      <GlobalStyles />
      <context.Provider
        value={{
          colors,
          pageProps,
          setPageProps,
          searchValue,
          setSearchValue,
        }}>
        {props.children}
      </context.Provider>
    </ThemeProvider>
  );
}

export function useAppContext(): IContext {
  return useContext(context);
}
