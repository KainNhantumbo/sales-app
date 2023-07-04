import { actions } from '@/data/actions';
import type { TPaymentType } from '../../@types';
import { useAppContext } from '@/context/AppContext';
import { IoPhonePortraitOutline } from 'react-icons/io5';

const renderPaymentInputs = (option: TPaymentType): JSX.Element => {
  const { state, dispatch } = useAppContext();
  switch (option) {
    case 'm-pesa':
      return (
        <div className='m-pesa'>
          <section className='form-section'>
            <div className='form-element '>
              <label htmlFor='account-number'>
                <IoPhonePortraitOutline />
                <span>Número de Conta M-Pesa *</span>
              </label>
              <input
                id='account-number'
                name='account-number'
                type='number'
                placeholder='Número de telemóvel'
                aria-label='Número de telemóvel'
                inputMode='numeric'
                pattern='/^(84|85)[0-9]{7}/'
                min={0}
                value={state.checkout.payment.data?.mpesa_account}
                onChange={(e): void =>
                  e.target.value.length > 9
                    ? undefined
                    : dispatch({
                        type: actions.PURCHASE_CHECKOUT_DATA,
                        payload: {
                          ...state,
                          checkout: {
                            ...state.checkout,
                            payment: {
                              ...state.checkout.payment,
                              type: option,
                              data: {
                                ...state.checkout.payment.data,
                                mpesa_account: Number(e.target.value),
                              },
                            },
                          },
                        },
                      })
                }
              />
              <span className='counter'>{`${
                String(state.checkout.payment.data.mpesa_account).length || 0
              } / 9`}</span>
            </div>
          </section>
        </div>
      );
    case 'e-mola':
      return (
        <div className='e-mola'>
          <section className='form-section'>
            <div className='form-element '>
              <label htmlFor='account-number-1'>
                <IoPhonePortraitOutline />
                <span>Número de Conta E-mola *</span>
              </label>
              <input
                id='account-number-1'
                name='account-number-1'
                type='number'
                placeholder='Número de telemóvel'
                aria-label='Número de telemóvel'
                inputMode='numeric'
                pattern='/^(86|87)[0-9]{7}/'
                min={0}
                value={state.checkout.payment.data?.emola_account}
                onChange={(e): void =>
                  e.target.value.length > 9
                    ? undefined
                    : dispatch({
                        type: actions.PURCHASE_CHECKOUT_DATA,
                        payload: {
                          ...state,
                          checkout: {
                            ...state.checkout,
                            payment: {
                              ...state.checkout.payment,
                              type: option,
                              data: {
                                ...state.checkout.payment.data,
                                emola_account: Number(e.target.value),
                              },
                            },
                          },
                        },
                      })
                }
              />
              <span className='counter'>{`${
                String(state.checkout.payment.data.emola_account).length || 0
              } / 9`}</span>
            </div>
          </section>
        </div>
      );
    case 'ponto-24':
      return (
        <div className='ponto-24'>
          <section className='form-section'>
            <div className='form-element '>
              <label htmlFor='account-number-3'>
                <IoPhonePortraitOutline />
                <span>Número de Conta Móvel *</span>
              </label>
              <input
                id='account-number-3'
                name='account-number-3'
                type='number'
                placeholder='Número de telemóvel'
                aria-label='Número de telemóvel'
                inputMode='numeric'
                pattern='/^(84|85|86|87)[0-9]{7}/'
                min={0}
                value={state.checkout.payment.data?.ponto24_account}
                onChange={(e): void =>
                  e.target.value.length > 9
                    ? undefined
                    : dispatch({
                        type: actions.PURCHASE_CHECKOUT_DATA,
                        payload: {
                          ...state,
                          checkout: {
                            ...state.checkout,
                            payment: {
                              ...state.checkout.payment,
                              type: option,
                              data: {
                                ...state.checkout.payment.data,
                                ponto24_account: Number(e.target.value),
                              },
                            },
                          },
                        },
                      })
                }
              />
              <span className='counter'>{`${
                String(state.checkout.payment.data.ponto24_account).length || 0
              } / 9`}</span>
            </div>
          </section>
        </div>
      );
    case 'credit-card':
      return <div className='credit-card'></div>;
    case 'paypal':
      return <div className='paypal'></div>;
    default:
      return (
        <div className='void'>
          <h3>
            <span>Selecione o método de pagamento</span>
          </h3>
        </div>
      );
  }
};

export default renderPaymentInputs;
