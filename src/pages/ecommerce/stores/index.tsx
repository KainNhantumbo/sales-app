import Layout from '@/components/layout';
import { NewsLetter } from '@/components/newsletter';
import { StoreSearch } from '@/components/store-search';
import { useAppContext } from '@/context/app-context';
import { blurDataUrlImage, constants } from '@/data/constants';
import { getStoresData } from '@/lib/queries';
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

export default function Page() {
  const LIMIT: number = 8;
  const theme = useTheme();
  const router = useRouter();
  const { state, dispatch } = useAppContext();
  const { ref, inView } = useInView();

  const fetchData = async ({
    pageParam = 0
  }): Promise<{ data: PublicStoreList; currentOffset: number }> => {
    const { data } = await getStoresData<PublicStoreList>({
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
        .map(({ data }) => data)
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
  }, [inView, hasNextPage]);

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
              width={1000}
              height={1000}
              src={`/assets/buying_women.png`}
              blurDataURL={blurDataUrlImage}
              alt='buying women art from freepick.com'
              priority
            />
          </div>
        </section>
        <article>
          <StoreSearch />

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
