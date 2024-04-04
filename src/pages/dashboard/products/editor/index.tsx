import { DropzoneArea } from '@/components/dropzone';
import Layout from '@/components/layout';
import { useAppContext } from '@/context/AppContext';
import { DEFAULT_ERROR_MESSAGE, constants } from '@/data/constants';
import Categories from '@/data/product-categories.json';
import { errorTransformer } from '@/lib/error-transformer';
import { initialState } from '@/lib/reducer';
import { actions } from '@/shared/actions';
import { _productEditor as Container } from '@/styles/common/product-editor';
import type { HttpError, InputEvents, Product } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import * as Io from 'react-icons/io5';
import { DotLoader, PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';

export default function Page() {
  const theme = useTheme();
  const router = useRouter();
  const { state, httpClient, dispatch } = useAppContext();

  const { data, isLoading, isError, error } = useQuery({
    queryFn: async () => {
      try {
        const productId = router.query['productId'];
        if (!productId) return initialState.product;

        const { data } = await httpClient<Product>({
          method: 'get',
          url: `/api/v1/users/products/${productId}?fields=-created_by,-favorites`
        });
        return data;
      } catch (error) {
        const { message } = errorTransformer(error as HttpError);
        toast.error(message);
        console.error(error);
      }
    },
    queryKey: [`product-editor-query`]
  });

  useEffect(() => {
    if (data) {
      dispatch({
        type: actions.PRODUCT_DATA,
        payload: {
          ...state,
          product: { ...state.product, ...data }
        }
      });
    }
  }, [data]);

  const handleChange = (e: InputEvents) =>
    dispatch({
      type: actions.PRODUCT_DATA,
      payload: {
        ...state,
        product: { ...state.product, [e.target.name]: e.target.value }
      }
    });

  const { mutateAsync: createMutation, ...createMutationProps } = useMutation({
    mutationFn: async () => {
      try {
        await httpClient({
          method: 'post',
          url: `/api/v1/users/products`,
          data: { ...state.product }
        });
        router.back();
      } catch (error) {
        const { message } = errorTransformer(error as HttpError);
        toast.error(message);
        console.error(error);
      }
    },
    networkMode: 'always',
    onError(error) {
      return error;
    }
  });

  const { mutateAsync: updateMutation, ...updateMutationProps } = useMutation({
    mutationFn: async (productId: string) => {
      if (!productId) return;
      try {
        await httpClient({
          method: 'patch',
          url: `/api/v1/users/products/${productId}`,
          data: { ...state.product }
        });
        router.back();
      } catch (error) {
        const { message } = errorTransformer(error as HttpError);
        toast.error(message);
        console.error(error);
      }
    },
    networkMode: 'always',
    useErrorBoundary: true
  });

  return (
    <Layout metadata={{ title: `${constants.defaultTitle} | Editor de Produto` }}>
      <Container>
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

        <article>
          <section className='header'>
            <h2>
              <Io.IoPencilOutline />
              <span>Detalhes do Produto</span>
            </h2>
            <span className='details'>Salve após fazer alterações!</span>
          </section>

          <section className='data-container'>
            <section className='wrapper'>
              <section className='form'>
                <section className='form-section'>
                  <div className='images-container'>
                    <div className='images-container_header'>
                      <h2>
                        <span>Carregue as imagens do produto</span>
                      </h2>
                      <p>Dimensões: 320 x 420 pixels. Máx. 512Kb.</p>
                      <p>
                        <strong>
                          Nota: a primeira imagem carregada será principal. Não é
                          obrigatório carregar imagens.
                        </strong>
                      </p>
                    </div>
                    <div className='images-container_items'>
                      {state.product.images.length > 0
                        ? state.product.images.map((image, index) => (
                            <div key={image.id}>
                              <Image
                                width={500}
                                height={500}
                                src={image.url}
                                alt={`product image ${index.toString()}`}
                                title={`Imagem do Produto ${index.toString()}`}
                              />
                              <button
                                title='Apagar imagem'
                                onClick={() =>
                                  dispatch({
                                    type: actions.PRODUCT_DATA,
                                    payload: {
                                      ...state,
                                      product: {
                                        ...state.product,
                                        images: state.product.images.filter(
                                          (item) => image.id !== item.id
                                        )
                                      }
                                    }
                                  })
                                }>
                                <Io.IoCloseOutline />
                              </button>
                            </div>
                          ))
                        : null}

                      {state.product.images.length < 4 ? (
                        <div className='image-dropzone'>
                          <DropzoneArea
                            width={320}
                            height={420}
                            handler={(encodedImage) => {
                              dispatch({
                                type: actions.PRODUCT_DATA,
                                payload: {
                                  ...state,
                                  product: {
                                    ...state.product,
                                    images: state.product.images.concat({
                                      id: crypto.randomUUID(),
                                      url: encodedImage
                                    })
                                  }
                                }
                              });
                            }}
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </section>

                <div className='data-section'>
                  <div className='description'>
                    <h2>
                      <Io.IoBagHandle />
                      <span>Informações do Produto</span>
                    </h2>
                    <p>Informações usadas para a descrição e identificação do produto.</p>
                  </div>

                  <div className='items-container'>
                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='name'>
                          <Io.IoEllipsisHorizontal />
                          <span>Nome do Produto *</span>
                        </label>
                        <input
                          type='text'
                          id='name'
                          name='name'
                          autoComplete='off'
                          placeholder='Escreva o nome do produto'
                          aria-label='Escreva o nome do produto'
                          onChange={(e) =>
                            e.target.value.length > 128 ? undefined : handleChange(e)
                          }
                          value={state.product.name}
                        />
                        <span className='counter'>{`${
                          state.product.name?.length || 0
                        } / 128`}</span>
                      </div>
                    </section>

                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='description'>
                          <Io.IoEllipsisHorizontal />
                          <span>Descrição do Produto *</span>
                        </label>

                        <textarea
                          id='description'
                          name='description'
                          autoComplete='off'
                          placeholder='Escreva a descrição do produto'
                          aria-label='Escreva a descrição do produto'
                          onChange={(e) =>
                            e.target.value.length > 512 ? undefined : handleChange(e)
                          }
                          value={state.product.description}
                          maxLength={512}
                          rows={8}
                        />
                        <span className='counter'>{`${
                          state.product.description?.length || 0
                        } / 512`}</span>
                      </div>
                    </section>

                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='specifications'>
                          <Io.IoEllipsisHorizontal />
                          <span>Especificações do Produto</span>
                        </label>

                        <textarea
                          id='specifications'
                          name='specifications'
                          autoComplete='off'
                          placeholder='Coloque as especificações do produto'
                          aria-label='Coloque as especificações do produto'
                          onChange={(e) =>
                            e.target.value.length > 2048 ? undefined : handleChange(e)
                          }
                          value={state.product.specifications}
                          maxLength={2048}
                          rows={12}
                        />
                        <span className='counter'>{`${
                          state.product.specifications?.length || 0
                        } / 2048`}</span>
                      </div>
                    </section>

                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='category'>
                          <Io.IoLayersOutline />
                          <span>Categoria do Produto</span>
                        </label>
                        <select
                          name='category'
                          id='category'
                          value={state.product.category}
                          onChange={(e) => {
                            dispatch({
                              type: actions.PRODUCT_DATA,
                              payload: {
                                ...state,
                                product: {
                                  ...state.product,
                                  category: e.target.value
                                }
                              }
                            });
                          }}>
                          {Categories.sort((a, b) => (a > b ? 1 : -1)).map(
                            (item, index) => (
                              <option key={index.toString()} value={item}>
                                {item}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      <div className='form-element'>
                        <label htmlFor='quantity'>
                          <Io.IoCashOutline />
                          <span>Quantidade em Estoque</span>
                        </label>
                        <input
                          type='number'
                          id='quantity'
                          name='quantity'
                          min={0}
                          placeholder='Quantidade do produto em estoque'
                          aria-label='Quantidade do produto em estoque'
                          onChange={(e) => handleChange(e)}
                          value={state.product.quantity}
                        />
                      </div>
                    </section>

                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='price'>
                          <Io.IoPricetagsOutline />
                          <span>Preço (em meticais e sem decimais) </span>
                        </label>
                        <input
                          type='number'
                          id='price'
                          name='price'
                          min={0}
                          placeholder='Preço do produto'
                          aria-label='Preço do produto'
                          onChange={(e) => handleChange(e)}
                          value={state.product.price}
                        />
                      </div>
                      <div className='form-element'>
                        <label htmlFor='delivery_tax'>
                          <Io.IoCarOutline />
                          <span>Taxa Base de Entrega (Meticais)</span>
                        </label>
                        <input
                          type='number'
                          id='delivery_tax'
                          name='delivery_tax'
                          min={0}
                          placeholder='Taxa base de entrega do produto'
                          aria-label='Taxa base de entrega do produto'
                          onChange={(e) => handleChange(e)}
                          value={state.product.delivery_tax}
                        />
                      </div>
                    </section>

                    <section className='form-section'>
                      <div className='form-element check-box'>
                        <label htmlFor='promotion'>
                          <Io.IoGiftOutline />
                          <span>Está em promoção?</span>
                        </label>
                        <input
                          type='checkbox'
                          id='promotion'
                          name='promotion'
                          onChange={(e) => {
                            dispatch({
                              type: actions.PRODUCT_DATA,
                              payload: {
                                ...state,
                                product: {
                                  ...state.product,
                                  promotion: {
                                    ...state.product.promotion,
                                    status: e.target.checked
                                  }
                                }
                              }
                            });
                          }}
                          checked={state.product.promotion.status}
                        />
                      </div>
                      <div className='form-element'>
                        <label htmlFor='percentage'>
                          <Io.IoPizzaOutline />
                          <span>Percentagem de Desconto</span>
                        </label>
                        <input
                          type='number'
                          id='Percentagem de Desconto'
                          name='percentage'
                          placeholder='Escreva o seu número de telemóvel'
                          aria-label='Escreva o seu número de telemóvel'
                          min={1}
                          max={100}
                          disabled={!state.product.promotion.status}
                          value={state.product.promotion.percentage}
                          onChange={(e) => {
                            dispatch({
                              type: actions.PRODUCT_DATA,
                              payload: {
                                ...state,
                                product: {
                                  ...state.product,
                                  promotion: {
                                    ...state.product.promotion,
                                    percentage: Number(e.target.value)
                                  }
                                }
                              }
                            });
                          }}
                        />
                      </div>
                    </section>

                    <section className='form-section'>
                      <div className='form-element check-box'>
                        <label htmlFor='allow_comments'>
                          <Io.IoChatbubblesOutline />
                          <span>Permitir comentários?</span>
                        </label>
                        <input
                          type='checkbox'
                          id='allow_comments'
                          name='allow_comments'
                          checked={state.product.allow_comments}
                          onChange={(e) => {
                            dispatch({
                              type: actions.PRODUCT_DATA,
                              payload: {
                                ...state,
                                product: {
                                  ...state.product,
                                  allow_comments: e.target.checked
                                }
                              }
                            });
                          }}
                        />
                      </div>
                    </section>
                  </div>
                </div>
              </section>
            </section>

            <section className='actions-container'>
              <div className='description'>
                <h2>
                  <Io.IoSave />
                  <span>Salvamento de Alterações</span>
                </h2>
                <p>Salve as alterações feitas.</p>
              </div>
              <div>
                {!updateMutationProps.isLoading &&
                  !createMutationProps.isLoading &&
                  !updateMutationProps.isError &&
                  !createMutationProps.isError && (
                    <div className='caution-message'>
                      <h3>
                        Confirme se as informações introduzidas estão corretas antes de
                        salvar alterações. Caso não tenha alterado nada, não será
                        atualizado, clique em "Descartar e voltar".
                      </h3>
                      <p>
                        Todas as informações que introduzir nesta página são, por padrão,
                        públicas.
                      </p>
                    </div>
                  )}

                {createMutationProps.isError && (
                  <div className='error-message'>
                    {(createMutationProps.error as HttpError)?.response?.data?.message ||
                      DEFAULT_ERROR_MESSAGE}
                  </div>
                )}

                {!updateMutationProps.isLoading && updateMutationProps.isError && (
                  <div className='error-message'>
                    {(updateMutationProps.error as HttpError)?.response?.data?.message ||
                      DEFAULT_ERROR_MESSAGE}
                  </div>
                )}

                {createMutationProps.isLoading ||
                  (updateMutationProps.isLoading &&
                  !createMutationProps.isError &&
                  !createMutationProps.isError ? (
                    <div className='loading'>
                      <PulseLoader
                        color={`rgb(${theme.primary})`}
                        aria-placeholder='Processando...'
                        cssOverride={{
                          display: 'block'
                        }}
                      />
                      <span>Processando...</span>
                    </div>
                  ) : null)}
              </div>

              <div className='btns-container'>
                <button className='back' onClick={(e) => router.back()}>
                  <Io.IoArrowUndoOutline />
                  <span>Voltar</span>
                </button>

                {!updateMutationProps.isLoading &&
                !updateMutationProps.isError &&
                state.product._id ? (
                  <button
                    className='save'
                    onClick={async () => await updateMutation(state.product._id)}>
                    <Io.IoSyncOutline />
                    <span>Salvar alterações</span>
                  </button>
                ) : null}

                {!createMutationProps.isLoading &&
                  !createMutationProps.isError &&
                  !state.product._id && (
                    <button className='save' onClick={async () => await createMutation()}>
                      <Io.IoPush />
                      <span>Publicar Produto</span>
                    </button>
                  )}
              </div>
            </section>
          </section>
        </article>
      </Container>
    </Layout>
  );
}
