import Layout from '@/components/layout';
import { SideBarAds } from '@/components/sidebar-ads';
import { useAppContext } from '@/context/AppContext';
import { constants, pricing_data } from '@/data/constants';
import { errorTransformer } from '@/lib/error-transformer';
import { formatDate } from '@/lib/utils';
import { _subsTransactions as Container } from '@/styles/common/transactions-subscriptions';
import type { HttpError, Subscription } from '@/types';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import * as Io from 'react-icons/io5';
import { IoCardOutline } from 'react-icons/io5';
import { DotLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';

export default function Page() {
  const { httpClient } = useAppContext();
  const router = useRouter();
  const theme = useTheme();

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['query-subscriptions'],
    queryFn: async () => {
      try {
        const { data } = await httpClient<Subscription>({
          method: 'get',
          url: `/api/v1/users/subscriptions`
        });
        return data;
      } catch (error) {
        const { message } = errorTransformer(error as HttpError);
        toast.error(message);
        console.error(error);
      }
    }
  });

  const pricing = useMemo(
    () => data && pricing_data.find(({ type }) => type === data?.model),
    [data]
  );

  return (
    <Layout metadata={{ title: `${constants.defaultTitle} | Pagamento de Subscrições` }}>
      <Container>
        <div className='wrapper-container'>
          <SideBarAds key={'subscriptions'} />
          <article>
            <section className='header-container'>
              <h2>
                <IoCardOutline />
                <span>Subscrições</span>
              </h2>
              <p>Sua Subscrição Ativa</p>
            </section>

            <section className='content-container'>
              <div className='content-header-container'>
                <h3>{data?.model}</h3>
                <div>
                  <div>Desde: {formatDate(data?.updatedAt)}</div>
                  <div>
                    Expira:{' '}
                    {formatDate(moment(data?.expiresIn || Date.now()).toISOString())}
                  </div>
                </div>
              </div>

              <div className='content-details-container'>
                <h3>Funcionalidades</h3>
                {pricing?.description.map((phrase, i) => <p key={i}>{phrase}</p>)}
              </div>

              <div className='content-actions-container'>
                <button>
                  <span>Fazer Upgrade</span>
                </button>
              </div>

              {!data?.trial.isConsumed ? (
                <div className='trial-card-container'>
                  <p>
                    Comece o seu período de teste e aproveite todas a funcionalidades por 15
                    dias!
                  </p>
                  <button>Começar</button>
                </div>
              ) : null}
            </section>
          </article>
        </div>

        {!isLoading && isError && (
          <section className='fetching-state'>
            <section className='wrapper'>
              <h3>{errorTransformer(error as HttpError).message}</h3>
              <div>
                <button onClick={() => router.reload()}>
                  <Io.IoReload />
                  <span>Recarregar a página</span>
                </button>
                <button onClick={() => router.back()}>
                  <Io.IoChevronBack />
                  <span>Voltar a página anterior</span>
                </button>
              </div>
            </section>
          </section>
        )}

        {!isError && isLoading && (
          <section className='loading-spinner'>
            <section className='wrapper'>
              <div className='center'>
                <DotLoader size={50} color={`rgb(${theme.primary})`} />
                <p>Carregando os dados do produto</p>
              </div>
            </section>
          </section>
        )}
      </Container>
    </Layout>
  );
}
