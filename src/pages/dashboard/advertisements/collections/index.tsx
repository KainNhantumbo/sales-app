import Layout from '@/components/layout';
import { motion } from 'framer-motion';
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
import { FaAd } from 'react-icons/fa';
import * as Io from 'react-icons/io5';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';

const sortOptions = [
  { label: 'Nome', value: 'name' },
  { label: 'Nome (invertido)', value: '-name' },
  { label: 'Data de Expiração', value: 'expires_in' },
  { label: 'Data de Expiração (invertido)', value: '-expires_in' }
].concat(orderSortOptions);

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
            } finally {
              dispatch({
                type: actions.PROMPT,
                payload: { ...state, prompt: { ...state.prompt, status: false } }
              });
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
              <FaAd />
              <span>Suas Coleções de Anúncios</span>
            </h2>
            <p>Aparecerão aqui os anúncios que for publicar na plataforma.</p>
          </section>

          <section className='query-container'>
            <div className='search'>
              <input
                type='search'
                placeholder='Pesquisar...'
                value={urlQueryString.search}
                onChange={(e) =>
                  setUrlQueryString((state) => ({ ...state, search: e.target.value }))
                }
              />
              <Io.IoSearch />
            </div>
            <div className='seletor'>
              <SelectContainer
                placeholder='Ordenar anúncios por...'
                options={sortOptions}
                onChange={({ value }: any) =>
                  setUrlQueryString((state) => ({ ...state, sort: String(value) }))
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
                  <motion.div
                    key={item._id}
                    className='ad-container'
                    initial={{ scale: 0 }}
                    drag={true}
                    dragElastic={0.3}
                    whileTap={{ scale: 0.98 }}
                    dragConstraints={{ top: 0, left: 0, bottom: 0, right: 0 }}
                    whileInView={{ scale: 1, transition: { duration: 0.5, bounce: 1 } }}
                    whileHover={{
                      translateY: -8,
                      boxShadow: `0px 12px 25px 10px rgba(${theme.black}, 0.09)`
                    }}>
                    <section>
                      <div>
                        <h2>{item.name}</h2>
                        <h3>{item.owner}</h3>
                      </div>
                      <h4>
                        Expira em: {formatDate(moment(item.expires_in).toISOString())}
                      </h4>
                    </section>
                    <div className='timestamps-container'>
                      <p>Publicado: {formatDate(item.createdAt)}</p>
                      <p>Atualizado: {formatDate(item.updatedAt)}</p>
                    </div>

                    <div className='actions-container'>
                      <Link href={`/dashboard/advertisements/editor?adId=${item._id}`}>
                        <Io.IoEyeOutline />
                        <span>Ver Detalhes</span>
                      </Link>
                      <button onClick={() => onDelete(item._id)}>
                        <Io.IoTrashOutline />
                        <span>Apagar</span>
                      </button>
                    </div>
                  </motion.div>
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
          {state.ads.length < 1 && !isLoading && !isError ? (
            <div className='empty-data_container'>
              <section className='content'>
                <Io.IoNewspaperOutline />
                <h3>
                  <span>Sem anúncios para mostrar</span>
                  <p>Publique anúncios para começar</p>
                </h3>
              </section>
            </div>
          ) : null}
        </article>
      </Container>
    </Layout>
  );
}
