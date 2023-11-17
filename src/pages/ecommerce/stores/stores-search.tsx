import {
  IoAlbumsOutline,
  IoArrowForwardOutline,
  IoEllipsisHorizontal,
  IoGridOutline,
  IoLibraryOutline,
  IoReload
} from 'react-icons/io5';
import Link from 'next/link';
import { useEffect } from 'react';
import { formatDate } from '@/lib/utils';
import Layout from '@/components/Layout';
import actions from '@/shared/actions';
import { useRouter } from 'next/router';
import { getStoresData } from '@/lib/queries';
import { IoMdCalendar } from 'react-icons/io';
import { complements } from '@/shared/data';
import { PublicStoreList } from '@/types';
import NewsLetter from '@/components/Newsletter';
import { useTheme } from 'styled-components';
import { useAppContext } from '@/context/AppContext';
import { DotLoader, PulseLoader } from 'react-spinners';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import SearchComponent from '@/components/SearchBlogPosts';
import { _storeSeach as Container } from '@/styles/common/store-search';

export default function StoresSearch() {
  const LIMIT: number = 8;
  const theme = useTheme();
  const router = useRouter();
  const { state, dispatch } = useAppContext();
  const { ref, inView } = useInView();

  const fetchPosts = async ({ pageParam = 0 }) => {
    const { data } = await getStoresData<PublicStoreList>({
      offset: pageParam * LIMIT,
      limit: LIMIT,
      search: String(router.query['q'])
    });
    return { data, currentOffset: pageParam + 1 };
  };

  const {
    data,
    refetch,
    fetchNextPage,
    error,
    hasNextPage,
    isFetching,
    isLoading,
    isError
  } = useInfiniteQuery({
    queryKey: ['public-stores-search'],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage) =>
      lastPage?.data?.length >= LIMIT ? lastPage.currentOffset : undefined
  });

  useEffect(() => {
    if (data) {
      const reducedPosts = data?.pages
        .map((page) => {
          return page.data;
        })
        .reduce((accumulator, currentObj) => [...accumulator, ...currentObj]);

      dispatch({
        type: actions.PUBLIC_STORES_LIST_DATA,
        payload: {
          ...state,
          publicStoresList: [...reducedPosts]
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
    const fetchTimer = setTimeout(() => {
      if (router.query['q']) {
        refetch({ queryKey: ['public-stores-search'] });
      }
    }, 500);
    return () => {
      clearTimeout(fetchTimer);
    };
  }, [router.query]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <Layout
      metadata={{
        title: `${complements.defaultTitle} | Pesquisa de Lojas Integradas da Plataforma`
      }}>
      <Container>
        <div className='main-container'>
          <SearchComponent />

          {isFetching ||
            (isLoading && !isError && (
              <section className='fetching-state'>
                <div className='center'>
                  <DotLoader size={60} color={`rgb(${theme.primary})`} />
                  <span>Pesquisando...</span>
                </div>
              </section>
            ))}

          <article>
            <section
              style={{
                fontWeight: '400',
                fontSize: '1.4rem',
                lineHeight: '1.8rem'
              }}>
              Pesquisou por: {router.query['q']}
            </section>

            {!isLoading ||
              (!isFetching && isError && (
                <section className='error-message'>
                  <IoLibraryOutline />
                  <p>
                    {(error as any).response?.data?.message ||
                      'Erro ao processar a sua requisição.'}
                  </p>
                </section>
              ))}

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
                    ref={
                      state.publicStoresList.length === index + 1
                        ? ref
                        : undefined
                    }>
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
                      <button
                        onClick={() =>
                          router.push(`/community/store/${store._id}`)
                        }>
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
        </div>
      </Container>
    </Layout>
  );
}
