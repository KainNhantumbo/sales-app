import Layout from '@/components/layout';
import { NewsLetter } from '@/components/newsletter';
import { PaymentGatewayRenderer } from '@/components/payment-gateway-renderer';
import { SelectContainer } from '@/components/select';
import { useAppContext } from '@/context/AppContext';
import { blurDataUrlImage, constants, payment_options, states } from '@/data/constants';
import { useCartStore } from '@/hooks/use-cart-store';
import { initialState } from '@/lib/reducer';
import { formatCurrency } from '@/lib/utils';
import { actions } from '@/shared/actions';
import { _purchase as Container } from '@/styles/common/purchase';
import { HttpError, InputEvents } from '@/types';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaDollarSign } from 'react-icons/fa';
import {
  IoBagHandle,
  IoBookmarkOutline,
  IoCard,
  IoCreateOutline,
  IoEllipsisHorizontal,
  IoHomeOutline,
  IoInformationCircle,
  IoPhonePortraitOutline,
  IoPlanetOutline,
  IoStar
} from 'react-icons/io5';
import { useTheme } from 'styled-components';

// TODO: set errors and display them to user for this page
const initialErrorState = new Error();

export default function Page() {
  const theme = useTheme();
  const router = useRouter();
  const [error, setError] = useState(initialErrorState);
  const { state, dispatch, httpClient } = useAppContext();
  const { cartModalController } = useCartStore();

  const handleChange = (e: InputEvents) => {
    dispatch({
      type: actions.PURCHASE_CHECKOUT_DATA,
      payload: {
        ...state,
        checkout: { ...state.checkout, [e.target.name]: e.target.value }
      }
    });
  };

  const handlePayment = async () => {
    try {
      await httpClient<{ order_id: string; order_code: string }>({
        method: 'post',
        url: `/api/v1/checkout/orders`,
        data: {
          ...state.checkout,
          cart: state.cart.map((product) => ({
            product_id: product.productId,
            quantity: product.quantity
          })),
          payment: {
            type: state.checkout.payment.type,
            account: state.checkout.payment.data.mpesa_account
          }
        }
      });
      dispatch({
        type: actions.PRODUCTS_CART,
        payload: { ...state, cart: initialState.cart }
      });
      router.push(`/ecommerce/products/checkout-success`);
    } catch (error) {
      console.error((error as HttpError).response?.data?.message || error);
    }
  };

  return (
    <Layout
      metadata={{
        title: `${constants.defaultTitle} | Pagamento de Produtos`,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString()
      }}>
      <Container>
        <div className='wrapper-container'>
          <article>
            <section className='checkout-summary-container'>
              <div className='header-container'>
                <h2 className='title'>
                  <IoBagHandle />
                  <span>Detalhes da Faturação</span>
                </h2>

                <motion.button
                  whileTap={{ scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  className='open-cart-button'
                  onClick={cartModalController}>
                  <IoCreateOutline />
                  <span>Fazer alterações</span>
                </motion.button>
              </div>
              {state.cart.map((product) => (
                <div key={product.productId} className='item-container'>
                  <div className='item-details'>
                    <Image
                      width={320}
                      height={420}
                      src={product.previewImage?.url ?? blurDataUrlImage}
                      alt={'product preview image'}
                    />
                    <div className='product-cost-container'>
                      <h3>
                        <span>
                          {product.productName.length > 55
                            ? product.productName.slice(0, 55) + '...'
                            : product.productName}{' '}
                        </span>
                      </h3>
                      <p>
                        Quant. <span>{product.quantity}</span>
                      </p>
                      <p>
                        Preço <span>{formatCurrency(product.price)}</span>
                      </p>
                      <p>
                        <>Subtotal </>
                        <span>{formatCurrency(product.price * product.quantity)}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <section className='totals-container'>
                <h3>
                  <FaDollarSign />
                  <span>Custo total</span>
                </h3>
                <p>
                  {formatCurrency(
                    state.cart.reduce(
                      (accumulator, currentProduct) =>
                        (accumulator += currentProduct.price * currentProduct.quantity),

                      0
                    )
                  )}
                </p>
              </section>
            </section>

            <section className='form-container'>
              <div className='header-container'>
                <h2>
                  <IoInformationCircle />
                  <span>Informações Adicionais</span>
                </h2>
                <p>
                  <strong>
                    Por favor, tenha cautela e atenção ao inserir as informações, de modo a
                    evitar invalidação de encomenda (taxada) ou complicações na entrega da
                    sua encomenda.
                  </strong>
                </p>
              </div>

              <section className='form'>
                <section className='form-section'>
                  <div className='form-element '>
                    <label htmlFor='main_phone_number'>
                      <IoPhonePortraitOutline />
                      <span>Número de telemóvel *</span>
                    </label>
                    <input
                      type='number'
                      id='main_phone_number'
                      name='main_phone_number'
                      placeholder='Número de telemóvel'
                      aria-label='Número de telemóvel'
                      inputMode='numeric'
                      maxLength={9}
                      value={state.checkout.main_phone_number}
                      onChange={(e) =>
                        e.target.value.length > 9 ? undefined : handleChange(e)
                      }
                    />
                    <span className='counter'>{`${
                      state.checkout.main_phone_number.length || 0
                    } / 9`}</span>
                  </div>
                  <div className='form-element'>
                    <label htmlFor='alternative_phone_number'>
                      <IoPhonePortraitOutline />
                      <span>Número de telemóvel (Alt.)</span>
                    </label>
                    <input
                      type='number'
                      id='alternative_phone_number'
                      name='alternative_phone_number'
                      placeholder='Número de telemóvel alternativo'
                      inputMode='numeric'
                      aria-label='Número de telemóvel alternativo'
                      value={state.checkout.alternative_phone_number}
                      maxLength={9}
                      onChange={(e) =>
                        e.target.value.length > 9 ? undefined : handleChange(e)
                      }
                    />
                    <span className='counter'>{`${
                      state.checkout.alternative_phone_number.length || 0
                    } / 9`}</span>
                  </div>
                </section>

                <section className='form-section'>
                  <div className='form-element'>
                    <label htmlFor='country'>
                      <IoPlanetOutline />
                      <span>País</span>
                    </label>
                    <select name='country' id='country' disabled={true}>
                      <option value='Moçambique'>Moçambique</option>
                    </select>
                  </div>

                  <div className='form-element'>
                    <label htmlFor='state'>
                      <IoStar />
                      <span>Província / Estado *</span>
                    </label>

                    <SelectContainer
                      options={states}
                      placeholder={'Selecione a sua província'}
                      onChange={(option: any) => {
                        dispatch({
                          type: actions.PURCHASE_CHECKOUT_DATA,
                          payload: {
                            ...state,
                            checkout: {
                              ...state.checkout,
                              location: {
                                ...state.checkout.location,
                                state: String(option.value)
                              }
                            }
                          }
                        });
                      }}
                    />
                  </div>
                </section>
                <section className='form-section'>
                  <div className='form-element'>
                    <label htmlFor='zip_code'>
                      <IoBookmarkOutline />
                      <span>Código Postal</span>
                    </label>
                    <input
                      type='text'
                      id='zip_code'
                      name='zip_code'
                      placeholder='Escreva o seu código postal'
                      aria-label='Escreva o seu código postal'
                      value={state.checkout.location.zip_code}
                      maxLength={3}
                      onChange={(e) =>
                        e.target.value.length > 3
                          ? undefined
                          : dispatch({
                              type: actions.PURCHASE_CHECKOUT_DATA,
                              payload: {
                                ...state,
                                checkout: {
                                  ...state.checkout,
                                  location: {
                                    ...state.checkout.location,
                                    zip_code: e.target.value
                                  }
                                }
                              }
                            })
                      }
                    />
                    <span className='counter'>{`${
                      state.checkout.location.zip_code.length || 0
                    } / 3`}</span>
                  </div>
                </section>
                <section className='form-section'>
                  <div className='form-element'>
                    <label htmlFor='address'>
                      <IoHomeOutline />
                      <span>Endereço *</span>
                    </label>
                    <textarea
                      rows={4}
                      id='address'
                      placeholder='Escreva detalhes como o bairro, avenida/rua, quarteirão, número da casa, referências, etc.'
                      aria-label='Escreva detalhes como o bairro, avenida/rua, quarteirão, número da casa, referências, etc.'
                      value={state.checkout.location.address}
                      maxLength={128}
                      onChange={(e) =>
                        e.target.value.length > 128
                          ? undefined
                          : dispatch({
                              type: actions.PURCHASE_CHECKOUT_DATA,
                              payload: {
                                ...state,
                                checkout: {
                                  ...state.checkout,
                                  location: {
                                    ...state.checkout.location,
                                    address: e.target.value
                                  }
                                }
                              }
                            })
                      }
                    />
                    <span className='counter'>{`${
                      state.checkout.location.address.length || 0
                    } / 128`}</span>
                  </div>
                </section>

                <section className='form-section'>
                  <div className='form-element'>
                    <label htmlFor='order_notes'>
                      <IoEllipsisHorizontal />
                      <span>Notas de Encomenda</span>
                    </label>
                    <textarea
                      id='order_notes'
                      name='order_notes'
                      autoComplete='off'
                      placeholder='Quaisquer informações complementares ou relativas a sua encomenda'
                      aria-label='Quaisquer informações complementares ou relativas a sua encomenda'
                      onChange={(e) =>
                        e.target.value.length > 512 ? undefined : handleChange(e)
                      }
                      value={state.checkout.order_notes}
                      maxLength={512}
                      rows={8}
                    />
                    <span className='counter'>{`${
                      state.checkout.order_notes.length || 0
                    } / 512`}</span>
                  </div>
                </section>
              </section>
            </section>
          </article>
          <aside>
            <section className='payment-details'>
              <h2>
                <IoCard />
                <span>Detalhes de Pagamento</span>
              </h2>
              <section className='content-container'>
                <section className='payment-options-container'>
                  {payment_options.map((option, index) => (
                    <motion.div
                      key={String(index)}
                      className='payment-option'
                      whileTap={{ scale: 0.98 }}
                      whileHover={{
                        boxShadow: `0px 12px 25px 10px rgba(${theme.black}, 0.09)`
                      }}>
                      <label htmlFor={String(index)}>
                        <span>Pagar com {option.label}</span>
                      </label>
                      <input
                        type='radio'
                        name={option.type}
                        id={String(index)}
                        value={option.type}
                        checked={state.checkout.payment.type === option.type ? true : false}
                        onChange={(e) =>
                          dispatch({
                            type: actions.PURCHASE_CHECKOUT_DATA,
                            payload: {
                              ...state,
                              checkout: {
                                ...state.checkout,
                                payment: {
                                  ...state.checkout.payment,
                                  type: e.target.value as any
                                }
                              }
                            }
                          })
                        }
                      />
                    </motion.div>
                  ))}
                </section>
                <section className='payment-method-preview-container'>
                  {payment_options.map(
                    (option, index) =>
                      option.type === state.checkout.payment.type && (
                        <Image
                          key={String(index)}
                          src={option.image}
                          className={option.type}
                          alt={String.prototype.concat(option.label, ' ', 'logo')}
                          width={600}
                          height={85}
                        />
                      )
                  )}
                </section>

                <section className='payment-method-inputs'>
                  {PaymentGatewayRenderer(state.checkout.payment.type)}
                </section>

                <section className='payment-finalization-container'>
                  <div className='actions-container'>
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      whileHover={{ scale: 1.05 }}
                      className='pay-button'
                      onClick={handlePayment}>
                      <span>Prosseguir</span>
                    </motion.button>
                  </div>
                </section>
              </section>
            </section>
          </aside>
        </div>
        <NewsLetter />
      </Container>
    </Layout>
  );
}
