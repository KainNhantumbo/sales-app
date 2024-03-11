import buyingWomenImg from '@/../public/assets/buying_women.png';
import Layout from '@/components/Layout';
import NewsLetter from '@/components/Newsletter';
import SearchStores from '@/components/SearchPublicStores';
import { useAppContext } from '@/context/AppContext';
import { blurDataUrlImage, constants } from '@/data/constants';
import { geStoresData } from '@/lib/queries';
import { formatDate } from '@/lib/utils';
import { actions } from '@/shared/actions';
import { _stores as Container } from '@/styles/common/stores';
import { PublicStoreList } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { IoMdCalendar } from 'react-icons/io';
import {
  IoAlbumsOutline,
  IoArrowForwardOutline,
  IoEllipsisHorizontal,
  IoGridOutline,
  IoReload,
  IoStorefrontOutline
} from 'react-icons/io5';
import { useInView } from 'react-intersection-observer';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

export default function Stores() {
  const LIMIT: number = 8;
  const theme = useTheme();
  const router = useRouter();
  const { state, dispatch } = useAppContext();
  const { ref, inView } = useInView();

  const fetchData = async ({
    pageParam = 0
  }): Promise<{ data: PublicStoreList; currentOffset: number }> => {
    const { data } = await geStoresData<PublicStoreList>({
      offset: pageParam * LIMIT,
      limit: LIMIT
    });
    return { data, currentOffset: pageParam + 1 };
  };

  const { data, fetchNextPage, hasNextPage, isFetching, isError } = useInfiniteQuery({
    queryKey: ['stores-data'],
    queryFn: fetchData,
    getNextPageParam: (lastPage) =>
      lastPage?.data?.length >= LIMIT ? lastPage.currentOffset : undefined
  });

  useEffect(() => {
    if (data) {
      const reducedData = data?.pages
        .map((page) => {
          return page.data;
        })
        .reduce((accumulator, currentObj) => [...accumulator, ...currentObj]);

      dispatch({
        type: actions.PUBLIC_STORES_LIST_DATA,
        payload: {
          ...state,
          publicStoresList: [...reducedData]
        }
      });
    }

    return () => {
      dispatch({
        type: actions.PUBLIC_STORES_LIST_DATA,
        payload: { ...state, publicStoresList: [] }
      });
    };
  }, [data]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <Layout metadata={{ title: constants.defaultTitle + ' | Lojas Integradas' }}>
      <Container>
        <section className='banner-container'>
          <div className='wrapper'>
            <div className='title'>
              <h1>Lojas Integradas</h1>
              <p>
                <strong>
                  Conheça as lojas por trás dos produtos encontrados na nossa plataforma.
                </strong>{' '}
                Ainda não tem uma loja? Monte hoje mesmo uma loja virtual do seu jeito e com
                todas funcionalidades que você precisa de graça!
              </p>
              <Link href={'/auth/sign-in'}>
                <IoStorefrontOutline />
                <span>Criar loja grátis</span>
              </Link>
            </div>

            <Image
              src={buyingWomenImg}
              blurDataURL={blurDataUrlImage}
              alt='buying women art from freepick.com'
              priority
            />
          </div>
        </section>
        <article>
          <SearchStores />

          {!isFetching && !isError && state.publicStoresList.length < 1 && (
            <div className='empty-data_container'>
              <section className='content'>
                <div className='icon'>
                  <IoGridOutline />
                </div>
                <div className='message'>
                  <h3>Nenhuma loja para mostrar.</h3>
                </div>
              </section>
            </div>
          )}

          {state.publicStoresList.length > 0 && (
            <section className='stores-container'>
              {state.publicStoresList.map((store, index) => (
                <Link
                  key={store._id}
                  className={'store'}
                  href={`/community/store/${store._id}`}
                  ref={state.publicStoresList.length === index + 1 ? ref : undefined}>
                  <>
                    <h2 className='store-name'>
                      <strong>{store.name}</strong>
                    </h2>
                    {store.slogan && (
                      <h3 className='slogan'>
                        <strong>{store.slogan}</strong>
                      </h3>
                    )}

                    <div className='details'>
                      <div>
                        <IoAlbumsOutline />
                        <span>{store.category}</span>
                      </div>
                      <div>
                        <IoMdCalendar />
                        <span>Ativa desde {formatDate(store.createdAt)}</span>
                      </div>
                    </div>

                    <p>{store.description}</p>
                    <button onClick={() => router.push(`/community/store/${store._id}`)}>
                      <div>
                        <IoArrowForwardOutline />
                        <span>Visitar Loja</span>
                      </div>
                    </button>
                  </>
                </Link>
              ))}
            </section>
          )}
          <div className='stats-container'>
            {isError && !isFetching && (
              <div className=' fetch-error-message '>
                <h3>Erro ao carregar dados</h3>
                <button onClick={() => fetchNextPage()}>
                  <IoReload />
                  <span>Tentar novamente</span>
                </button>
              </div>
            )}

            {isFetching && !isError && (
              <div className='loading'>
                <PulseLoader
                  size={20}
                  color={`rgb(${theme.primary_shade})`}
                  aria-placeholder='Processando...'
                  cssOverride={{
                    display: 'block'
                  }}
                />
              </div>
            )}

            {!hasNextPage &&
              !isFetching &&
              !isError &&
              state.publicStoresList.length > 0 && <p>Chegou ao fim</p>}
          </div>

          {state.publicStoresList.length > 0 && (
            <div className='stores-container__end-mark'>
              <IoEllipsisHorizontal />
            </div>
          )}
        </article>
        <NewsLetter />
      </Container>
    </Layout>
  );
}
