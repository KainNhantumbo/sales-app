import actions from '@/shared/actions';
import type { TPaymentType } from '../types';
import { useAppContext } from '@/context/AppContext';
import { IoPhonePortraitOutline } from 'react-icons/io5';

export default function renderPaymentInputs(option: TPaymentType) {
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
                type='number'
                id='account-number'
                name='account-number'
                placeholder='Número de telemóvel'
                aria-label='Número de telemóvel'
                inputMode='numeric'
                pattern='/^(84|85)[0-9]{7}/'
                min={0}
                maxLength={9}
                value={state.checkout.payment.data.mpesa_account}
                onChange={(e) =>
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
                                mpesa_account: e.target.value
                              }
                            }
                          }
                        }
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
      return <div className='e-mola'></div>;
    case 'ponto-24':
      return <div className='ponto-24'></div>;
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
}
