import Layout from '@/components/layout';
import { SelectContainer } from '@/components/select';
import { useAppContext } from '@/context/AppContext';
import { constants, orderSortOptions } from '@/data/constants';
import { useAdsQuery } from '@/hooks/use-ads-query';
import { errorTransformer } from '@/lib/error-transformer';
import { formatDate } from '@/lib/utils';
import { actions } from '@/shared/actions';
import { _adCollections as Container } from '@/styles/common/advertisements-collections';
import { HttpError } from '@/types';
import moment from 'moment';
import Link from 'next/link';
import * as Io from 'react-icons/io5';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';

const sortOptions = [
  { label: 'Nome', value: 'name' },
  { label: 'Nome (invertido)', value: '-name' },
  { label: 'Data de Expiração', value: 'expires_in' },
  { label: 'Data de Expiração (invertido)', value: '-expires_in' },
  ...orderSortOptions
];

export default function Page() {
  const theme = useTheme();
  const { state, dispatch, httpClient } = useAppContext();
  const {
    error,
    isError,
    urlQueryString,
    isLoading,
    refetch,
    setUrlQueryString,
    isAnyFilterActive
  } = useAdsQuery();

  const onDelete = (id: string) => {
    dispatch({
      type: actions.PROMPT,
      payload: {
        ...state,
        prompt: {
          ...state.prompt,
          title: 'Remoção de anúncio',
          status: true,
          actionButtonMessage: 'Apagar Permanentemente',
          message:
            'Deseja remover este anúncio? Esta ação é irreversível e irá remover permanentemente o anúncio publicado.',
          handleFunction: async () => {
            try {
              await httpClient({ method: 'delete', url: `/api/v1/ads/${id}` });
              refetch({ queryKey: ['private-ads'] });
              toast.success('Anúncio Removido.');
            } catch (error) {
              const { message } = errorTransformer(error as HttpError);
              toast.error(message);
              console.error(error);
            }
          }
        }
      }
    });
  };

  return (
    <Layout metadata={{ title: `${constants.defaultTitle} | Anúncios` }}>
      <Container>
        <article>
          <section className='header-container'>
            <h2>
              <Io.IoHeart />
              <span>Seus produtos favoritos</span>
            </h2>
            <p>Aparecerão aqui os produtos que for adicionar a sua lista de favoritos.</p>
          </section>

          <section className='query-container'>
            <div className='search'>
              <input
                type='search'
                placeholder='Pesquisar...'
                value={urlQueryString.search}
                onChange={(e) =>
                  setUrlQueryString((state) => ({
                    ...state,
                    search: e.target.value
                  }))
                }
              />
              <Io.IoSearch />
            </div>
            <div className='seletor'>
              <SelectContainer
                placeholder='Ordenar por...'
                options={sortOptions}
                onChange={(option: unknown) =>
                  setUrlQueryString((state) => ({
                    ...state,
                    sort: String(option)
                  }))
                }
              />
            </div>

            {isAnyFilterActive && (
              <button
                className='clear-filters'
                onClick={() => setUrlQueryString({ search: '', sort: '' })}>
                <Io.IoClose />
                <span>Limpar filtros</span>
              </button>
            )}
          </section>

          <section className='ads-list-container'>
            {state.ads.length > 0
              ? state.ads.map((item) => (
                  <div key={item._id} className='ad-container'>
                    <h3>{item.name}</h3>
                    <h3>{item.owner}</h3>
                    <h4>Expires In: {formatDate(moment(item.expires_in).toISOString())}</h4>
                    <div className='timestamps-container'>
                      <p>Published: {formatDate(item.createdAt)}</p>
                      <p>Last update: {formatDate(item.updatedAt)}</p>
                    </div>

                    <div className='actions-container'>
                      <Link href={`/dashboard/advertisements/editor?adId=${item._id}`}>
                        <span>View Details</span>
                      </Link>
                      <button onClick={() => onDelete(item._id)}>Remover</button>
                    </div>
                  </div>
                ))
              : null}
          </section>

          {!isLoading && isError && (
            <section className='error-message'>
              <Io.IoWarningOutline className='icon' />
              <p>{errorTransformer(error as HttpError).message}</p>
              <button onClick={() => refetch({ queryKey: ['private-ads'] })}>
                <Io.IoReload />
                <span>Tentar novamente</span>
              </button>
            </section>
          )}

          <div className='stats-container'>
            {isError && !isLoading && state.ads.length > 0 && (
              <div className=' fetch-error-message '>
                <h3>Erro ao carregar os dados</h3>
                <button onClick={() => refetch()}>
                  <Io.IoReload />
                  <span>Tentar novamente</span>
                </button>
              </div>
            )}

            {isLoading && !isError && (
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
          </div>
        </article>
      </Container>
    </Layout>
  );
}
