import {
  blurDataUrlImage,
  complements,
  payment_options,
  states,
} from '@/data/app-data';
import {
  IoBagHandle,
  IoBookmarkOutline,
  IoCartOutline,
  IoEllipsisHorizontal,
  IoHomeOutline,
  IoInformationCircle,
  IoPhonePortraitOutline,
  IoPlanetOutline,
  IoStar,
} from 'react-icons/io5';
import Image from 'next/image';
import { useEffect } from 'react';
import Select from 'react-select';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { actions } from '@/data/actions';
import { FaDollarSign } from 'react-icons/fa';
import { InputEvents } from '../../../../@types';
import NewsLetter from '@/components/Newsletter';
import { NextRouter, useRouter } from 'next/router';
import { useAppContext } from '@/context/AppContext';
import { renderReactSelectCSS } from '@/styles/select';
import { DefaultTheme, useTheme } from 'styled-components';
import { PurchaseContainer as Container } from '@/styles/common/purchase';

export default function Purchase(): JSX.Element {
  const theme: DefaultTheme = useTheme();
  const router: NextRouter = useRouter();
  const { state, dispatch, fetchAPI, cartModalController } = useAppContext();

  function handleChange(e: InputEvents): void {
    dispatch({
      type: actions.PURCHASE_CHECKOUT_DATA,
      payload: {
        ...state,
        checkout: {
          ...state.checkout,
          [e.target.name]: e.target.value,
        },
      },
    });
  }

  useEffect((): void => {}, []);

  return (
    <Layout
      metadata={{
        title: `${complements.defaultTitle} | Pagamento de Produtos`,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
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
                  <IoCartOutline />
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
                    <div>
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
                        Preço{' '}
                        <span>
                          {new Intl.NumberFormat('pt-BR', {
                            currency: 'MZN',
                            style: 'currency',
                            useGrouping: true,
                          }).format(product.price)}
                        </span>
                      </p>
                      <p>
                        <>Subtotal </>
                        <span>
                          {new Intl.NumberFormat('pt-BR', {
                            currency: 'MZN',
                            style: 'currency',
                            useGrouping: true,
                          }).format(product.price * product.quantity)}
                        </span>
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
                  {new Intl.NumberFormat('pt-BR', {
                    currency: 'MZN',
                    style: 'currency',
                    useGrouping: true,
                  }).format(
                    state.cart.reduce(
                      (accumulator, currentProduct) =>
                        (accumulator +=
                          currentProduct.price * currentProduct.quantity),

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
                    Por favor, tenha cautela e atenção ao inserir as
                    informações, de modo a evitar invalidação de encomenda
                    (taxada) ou complicações na entrega da sua encomenda.
                  </strong>
                </p>
              </div>

              <section className='form'>
                <section className='form-section phone-container'>
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
                      min={0}
                      value={state.checkout.main_phone_number}
                      onChange={(e): void =>
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
                      <span>Número de telemóvel (Alternativo)</span>
                    </label>
                    <input
                      type='number'
                      id='alternative_phone_number'
                      name='alternative_phone_number'
                      min={0}
                      placeholder='Número de telemóvel alternativo'
                      inputMode='numeric'
                      aria-label='Número de telemóvel alternativo'
                      value={state.checkout.alternative_phone_number}
                      onChange={(e): void =>
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
                      <span>Provícia / Estado *</span>
                    </label>

                    <Select
                      options={states}
                      placeholder={'Selecione a sua província'}
                      styles={renderReactSelectCSS(theme)}
                      onChange={(option: any): void => {
                        dispatch({
                          type: actions.PURCHASE_CHECKOUT_DATA,
                          payload: {
                            ...state,
                            checkout: {
                              ...state.checkout,
                              location: {
                                ...state.checkout.location,
                                state: String(option.value),
                              },
                            },
                          },
                        });
                      }}
                    />
                  </div>
                </section>
                <section className='form-section'>
                  <div className='form-element'>
                    <label htmlFor='adress'>
                      <IoHomeOutline />
                      <span>Endereço *</span>
                    </label>
                    <input
                      type='text'
                      id='adress'
                      placeholder='Endereço'
                      aria-label='Endereço'
                      maxLength={128}
                      value={state.checkout.location.adress}
                      onChange={(e): void =>
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
                                    adress: e.target.value,
                                  },
                                },
                              },
                            })
                      }
                    />
                    <span className='counter'>{`${
                      state.checkout.location.adress.length || 0
                    } / 128`}</span>
                  </div>
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
                      onChange={(e): void =>
                        e.target.value.length > 5
                          ? undefined
                          : dispatch({
                              type: actions.PURCHASE_CHECKOUT_DATA,
                              payload: {
                                ...state,
                                checkout: {
                                  ...state.checkout,
                                  location: {
                                    ...state.checkout.location,
                                    zip_code: e.target.value,
                                  },
                                },
                              },
                            })
                      }
                    />
                    <span className='counter'>{`${
                      state.checkout.location.zip_code.length || 0
                    } / 5`}</span>
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
                      onChange={(e): void =>
                        e.target.value.length > 512
                          ? undefined
                          : handleChange(e)
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
                <span>Detalhes de Pagamento</span>
              </h2>
              <section className='content-container'>
                <section className='payment-options-container'>
                  {payment_options.map((option, index) => (
                    <motion.div
                      key={String(index)}
                      className='payment-option'
                      drag={true}
                      dragElastic={0.3}
                      whileTap={{ scale: 0.98 }}
                      dragConstraints={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                      }}
                      whileHover={{
                        boxShadow: `0px 12px 25px 10px rgba(${theme.accent}, 0.09)`,
                      }}>
                      <label htmlFor={String(index)}>
                        <span>Pagar com {option.label}</span>
                      </label>
                      <input
                        type='radio'
                        name={option.type}
                        id={String(index)}
                        value={option.type}
                        checked={
                          state.checkout.payment.type === option.type
                            ? true
                            : false
                        }
                        defaultChecked={
                          state.checkout.payment.type === option.type
                            ? true
                            : false
                        }
                        onChange={(e) =>
                          dispatch({
                            type: actions.PURCHASE_CHECKOUT_DATA,
                            payload: {
                              ...state,
                              checkout: {
                                ...state.checkout,
                                payment: {
                                  ...state.checkout.payment,
                                  type: e.target.value as any,
                                },
                              },
                            },
                          })
                        }
                      />
                    </motion.div>
                  ))}
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
