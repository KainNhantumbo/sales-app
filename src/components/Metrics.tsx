import { useAppContext } from '@/context/AppContext';
import { formatCurrency } from '@/lib/utils';
import actions from '@/shared/actions';
import { _metrics as Container } from '@/styles/modules/metrics';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { BiStats } from 'react-icons/bi';
import { TMetrics } from '../types';

export default function Metrics() {
  const { state, dispatch, httpClient } = useAppContext();

  const getMetrics = async (): Promise<TMetrics> => {
    const { data } = await httpClient<TMetrics>({
      method: 'get',
      url: `/api/v1/metrics/public`
    });
    return data;
  };

  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ['metrics'],
    queryFn: getMetrics
  });

  useEffect(() => {
    if (data) {
      dispatch({
        type: actions.METRICS_DATA,
        payload: { ...state, metrics: { ...data } }
      });
    }
  }, [data]);

  useEffect(() => {
    refetch({ queryKey: ['metrics'] });
  }, [state.auth, state.store, state.productList]);

  return (
    <Container id='metrics'>
      <h2>
        <BiStats />
        <span>Estatísticas</span>
      </h2>

      {!isLoading && isError ? (
        <section className='error-container'>
          <div className='fetch-error-message '>
            <h3>Erro ao carregar estatísticas.</h3>
            <button onClick={() => refetch({ queryKey: ['metrics'] })}>
              <span>Tentar novamente</span>
            </button>
          </div>
        </section>
      ) : null}

      {!isLoading && !isError ? (
        <section className='metrics-container'>
          <section className='data-container'>
            <h3>
              <span>Produtos</span>
            </h3>
            <div className='data'>
              <div className='element'>
                <h4>Total</h4>
                <span>- {state.metrics.products.count}</span>
              </div>
              <div className='element'>
                <h4>Bloqueados </h4>
                <span>- {state.metrics.products.blocked}</span>
              </div>
              <div className='element'>
                <h4>Valor em total em produtos</h4>
                <span>
                  -{' '}
                  {formatCurrency(
                    state.metrics.products.total_price_amount_value
                  )}
                </span>
              </div>
              <div className='element'>
                <h4>Valor de produtos em promoção</h4>
                <span>
                  - {state.metrics.products.total_promotional_products}
                </span>
              </div>
            </div>
          </section>
          <section className='data-container'>
            <h3>
              <span>Pedidos</span>
            </h3>
            <div className='data'>
              <div className='element'>
                <h4>Total</h4>
                <span>- {state.metrics.orders.count}</span>
              </div>
              <div className='element'>
                <h4>Pedidos reconhecidos</h4>
                <span>- {state.metrics.orders.status.aknowledged}</span>
              </div>
              <div className='element'>
                <h4>Pedidos entregues</h4>
                <span>- {state.metrics.orders.status.delivered}</span>
              </div>
              <div className='element'>
                <h4>Pedidos retornados</h4>
                <span>- {state.metrics.orders.status.returned}</span>
              </div>
              <div className='element'>
                <h4>Pedidos cancelados</h4>
                <span>- {state.metrics.orders.status.cancelled}</span>
              </div>
              <div className='element'>
                <h4>Pedidos em progresso</h4>
                <span>- {state.metrics.orders.status.progress}</span>
              </div>
              <div className='element'>
                <h4>Pedidos aguardando pagamento</h4>
                <span>- {state.metrics.orders.status.pending_payment}</span>
              </div>
            </div>
          </section>
          <section className='data-container'>
            <h3>
              <span>Estado da Loja</span>
            </h3>
            <div className='data'>
              <div className='element'>
                <h4>Bloqueada: </h4>
                <span>{state.metrics.store.blocked ? 'Sim' : 'Não'}</span>
              </div>
              <div className='element'>
                <h4>Loja em atividade: </h4>
                <span>{state.metrics.store.active_status ? 'Sim' : 'Não'}</span>
              </div>
              <div className='element'>
                <h4>Loja verificada: </h4>
                <span>
                  {state.metrics.store.verified_status ? 'Sim' : 'Não'}
                </span>
              </div>
            </div>
          </section>
        </section>
      ) : null}
    </Container>
  );
}
