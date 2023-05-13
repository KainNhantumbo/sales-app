import {
  useState,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import type { AppContext } from '../../@types/index';
import ThemeContext from './ThemeContext';
import reducer from '@/lib/reducer';

interface IContext {
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
    <ThemeContext>
      <context.Provider
        value={{
          pageProps,
          setPageProps,
          searchValue,
          setSearchValue,
        }}>
        {props.children}
      </context.Provider>
    </ThemeContext>
  );
}

export function useAppContext(): IContext {
  return useContext(context);
}
