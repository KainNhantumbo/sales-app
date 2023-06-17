import { actions } from '@/data/actions';
import type { TPaymentType } from '../../@types';
import { useAppContext } from '@/context/AppContext';
import { IoEllipsisHorizontal, IoPhonePortraitOutline } from 'react-icons/io5';

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
                <span>Número de Conta *</span>
              </label>
              <input
                id='account-number'
                name='account-number'
                type='number'
                placeholder='Número de telemóvel'
                aria-label='Número de telemóvel'
                inputMode='numeric'
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
                <span>Número de Conta *</span>
              </label>
              <input
                id='account-number-1'
                name='account-number-1'
                type='number'
                placeholder='Número de telemóvel'
                aria-label='Número de telemóvel'
                inputMode='numeric'
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
      return <div className='ponto-24'></div>;
    case 'credit-card':
      return (
        <div className='credit-card'>
          <section className='form-section'>
            <div className='form-element '>
              <label htmlFor='card_holder_name'>
                <IoEllipsisHorizontal />
                <span>Nome do Proprietário *</span>
              </label>
              <input
                type='text'
                id='card_holder_name'
                placeholder='Nome do proprietário do cartão'
                aria-label='Nome do proprietário do cartão'
                value={state.checkout.payment.data?.card_holder_name}
                onChange={(e): void =>
                  e.target.value.length > 32
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
                                card_holder_name: e.target.value,
                              },
                            },
                          },
                        },
                      })
                }
              />
              <span className='counter'>{`${
                String(state.checkout.payment.data?.card_holder_name).length ||
                0
              } / 32`}</span>
            </div>
          </section>
          <section className='form-section'>
            <div className='form-element '>
              <label htmlFor='card_number'>
                <IoEllipsisHorizontal />
                <span>Número do cartão *</span>
              </label>
              <input
                type='number'
                id='card_number'
                name='card_number'
                placeholder='Número do cartão de crédito'
                aria-label='Número do cartão de crédito'
                value={state.checkout.payment.data.card_number}
                onChange={(e): void =>
                  e.target.value.length > 16
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
                                card_number: Number(e.target.value),
                              },
                            },
                          },
                        },
                      })
                }
              />
              <span className='counter'>{`${
                String(state.checkout.payment.data.card_number).length || 0
              } / 16`}</span>
            </div>
          </section>
          <section className='form-section'>
            <div className='form-element '>
              <label htmlFor='exp_date'>
                <IoEllipsisHorizontal />
                <span>Data de Expiração *</span>
              </label>
              <input
                type='text'
                id='exp_date'
                name='exp_date'
                placeholder='MM/YY'
                aria-label='MM/YY'
                value={state.checkout.payment.data.expire_date}
                onChange={(e): void =>
                  e.target.value.length > 5
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
                                expire_date: e.target.value,
                              },
                            },
                          },
                        },
                      })
                }
              />
              <span className='counter'>{`${
                state.checkout.payment.data.expire_date.length || 0
              } / 5`}</span>
            </div>
            <div className='form-element '>
              <label htmlFor='cvc'>
                <IoEllipsisHorizontal />
                <span>CVC *</span>
              </label>
              <input
                type='number'
                id='cvc'
                name='cvc'
                placeholder='000'
                aria-label='000'
                value={state.checkout.payment.data.cvc_code}
                onChange={(e): void =>
                  e.target.value.length > 3
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
                                cvc_code: Number(e.target.value),
                              },
                            },
                          },
                        },
                      })
                }
              />
              <span className='counter'>{`${
                String(state.checkout.payment.data.cvc_code).length || 0
              } / 3`}</span>
            </div>
          </section>
        </div>
      );
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
