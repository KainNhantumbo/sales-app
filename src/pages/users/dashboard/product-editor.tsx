import {
  IoAdd,
  IoArrowUndoOutline,
  IoBagHandle,
  IoCarOutline,
  IoCashOutline,
  IoChatbubblesOutline,
  IoEllipsisHorizontal,
  IoGiftOutline,
  IoImageOutline,
  IoLayersOutline,
  IoPencilOutline,
  IoPizzaOutline,
  IoPricetagsOutline,
  IoPush,
  IoReload,
  IoSave,
  IoSyncOutline,
  IoTrashOutline,
} from 'react-icons/io5';
import Compressor from 'compressorjs';
import { actions } from '@/data/actions';
import Layout from '@/components/Layout';
import { useState, useEffect } from 'react';
import { useTheme } from 'styled-components';
import { complements } from '@/data/app-data';
import { InputEvents } from '@/../@types';
import { NextRouter, useRouter } from 'next/router';
import { useAppContext } from '@/context/AppContext';
import { DotLoader, PulseLoader } from 'react-spinners';
import product_categories from '@/data/product-categories.json';
import { ProductEditorContainer as Container } from '@/styles/common/product-editor';

export default function ProductEditor(): JSX.Element {
  const theme = useTheme();
  const router: NextRouter = useRouter();
  const { state, fetchAPI, dispatch } = useAppContext();

  // --------------------states---------------------
  const [loading, setLoading] = useState<{
    status: boolean;
    key: 'product-data' | 'product-update';
  }>({ status: false, key: 'product-data' });
  const [error, setError] = useState<{
    status: boolean;
    msg: string;
    key: 'product-data' | 'product-update';
  }>({ status: false, msg: '', key: 'product-data' });

  const [imagesData, setImagesData] = useState({
    img_0: { id: '', data: '' },
    img_1: { id: '', data: '' },
    img_2: { id: '', data: '' },
    img_3: { id: '', data: '' },
  });

  // --------------------functions--------------------
  function handleFiles(index: string, value: FileList | null): void {
    const file: File | null | undefined = value?.item(0);
    if (file) {
      new Compressor(file, {
        quality: 0.8,
        width: 320,
        height: 420,
        resize: 'cover',
        success: (compressedImge: File | Blob): void => {
          const reader = new FileReader();
          reader.readAsDataURL(compressedImge);
          reader.onloadend = function (e: ProgressEvent<FileReader>): void {
            const encodedImage: string = e.target?.result as string;
            setImagesData((obj) => ({
              ...obj,
              [`img_${index}`]: {
                id: state.user.cover_image?.id || '',
                data: encodedImage,
              },
            }));
          };
        },
      });
    }
  }

  function handleChange(e: InputEvents): void {
    dispatch({
      type: actions.PRODUCT_DATA,
      payload: {
        ...state,
        product: {
          ...state.product,
          [e.target.name]: e.target.value,
        },
      },
    });
  }

  function deleteImage(id: string, index: string): void {
    if (!id) {
      return setImagesData((data) => ({
        ...data,
        [index]: { id: '', data: '' },
      }));
    }
    fetchAPI({
      method: 'delete',
      url: `/api/v1/users/product/assets`,
      data: { type: index, assetId: id },
    })
      .then(() => {
        setImagesData((data) => ({
          ...data,
          [index]: { id: '', data: '' },
        }));
        dispatch({
          type: actions.PRODUCT_DATA,
          payload: {
            ...state,
            product: { ...state.product, images: {} },
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function fetchProduct(): Promise<void> {
    try {
      setLoading({ status: true, key: 'product-data' });
      const productId: string = router.query.productId as string;
      if (!productId) return;
      const { data } = await fetchAPI({
        method: 'get',
        url: `/api/v1/users/products/${productId}?fields=-created_by,-favorites,-ivalidated`,
      });
      dispatch({
        type: actions.PRODUCT_DATA,
        payload: {
          ...state,
          product: { ...state.product, ...data },
        },
      });
    } catch (error: any) {
      console.log(error?.response?.data?.message);
      console.error(error);
      setError({
        status: true,
        msg:
          error?.response?.data?.message ||
          'Oops! Algo deu errado. Tente novamente.',
        key: 'product-data',
      });
    } finally {
      setLoading({ status: false, key: 'product-data' });
    }
  }

  async function handleUpdate(productId: string): Promise<void> {
    if (!productId) return;
    try {
      setLoading({ status: true, key: 'product-update' });
      await fetchAPI({
        method: 'patch',
        url: `/api/v1/users/products/${productId}`,
        data: {
          name: state.product.name,
          category: state.product.category,
          description: state.product.description,
          specifications: state.product.specifications,
          price: state.product.price,
          delivery_tax: state.product.delivery_tax,
          quantity: state.product.quantity,
          promotion: state.product.promotion,
          allow_comments: state.product.allow_comments,
          productImages: [
            ...Object.entries(imagesData).filter(([key, value]) =>
              value.data !== ''
                ? { [key]: { id: value.id, data: value.data } }
                : null
            ),
          ].reduce((accumulator, currentValue) => {
            const group = { [currentValue[0]]: currentValue[1] };
            return { ...accumulator, ...group };
          }, {}),
        },
      });
      router.back();
    } catch (error: any) {
      console.error(error);
      setError({
        status: true,
        msg:
          error?.response?.data?.message ||
          'Oops! Algo deu errado. Tente novamente.',
        key: 'product-update',
      });
    } finally {
      setLoading({ status: false, key: 'product-update' });
    }
  }

  async function handleCreate(): Promise<void> {
    try {
      setLoading({ status: true, key: 'product-update' });
      await fetchAPI({
        method: 'post',
        url: `/api/v1/users/products`,
        data: {
          name: state.product.name,
          category: state.product.category,
          description: state.product.description,
          specifications: state.product.specifications,
          price: state.product.price,
          delivery_tax: state.product.delivery_tax,
          quantity: state.product.quantity,
          promotion: state.product.promotion,
          store: state.auth.storeId,
          allow_comments: state.product.allow_comments,
          productImages: [
            ...Object.entries(imagesData).filter(([key, value]) =>
              value.data !== ''
                ? { [key]: { id: value.id, data: value.data } }
                : null
            ),
          ].reduce((accumulator, currentValue) => {
            const group = { [currentValue[0]]: currentValue[1] };
            return { ...accumulator, ...group };
          }, {}),
        },
      });
      router.back();
    } catch (error: any) {
      console.error(error);
      setError({
        status: true,
        msg:
          error?.response?.data?.message ||
          'Oops! Algo deu errado. Tente novamente.',
        key: 'product-update',
      });
    } finally {
      setLoading({ status: false, key: 'product-update' });
    }
  }

  // fetch product
  useEffect((): (() => void) | void => {
    const fetchTimer = setTimeout(() => {
      fetchProduct();
    }, 500);
    return () => {
      clearTimeout(fetchTimer);
      dispatch({
        type: actions.PRODUCT_DATA,
        payload: {
          ...state,
          product: {
            _id: '',
            name: '',
            category: product_categories[0],
            description: '',
            specifications: '',
            created_by: '',
            store: '',
            promotion: { status: false, percentage: 0 },
            price: 0,
            delivery_tax: 0,
            quantity: 0,
            images: {},
            createdAt: '',
            updatedAt: '',
            favorites: [],
            allow_comments: false,
          },
        },
      });
    };
  }, []);

  // clear errors
  useEffect((): (() => void) => {
    const desc = setTimeout(() => {
      if (error.status && error.key === 'product-update') {
        setError({ status: false, msg: '', key: 'product-data' });
      }
    }, 8000);
    return () => {
      clearTimeout(desc);
    };
  }, [error.status]);

  return (
    <Layout
      metadata={{ title: `${complements.defaultTitle} | Editor de Produto` }}>
      <Container>
        {loading.status && loading.key === 'product-data' && (
          <section className='fetching-state'>
            <div>
              <DotLoader size={50} color={`rgb(${theme.primary})`} />
              <p>Carregando os dados do produto</p>
            </div>
          </section>
        )}

        {!loading.status &&
          loading.key === 'product-data' &&
          error.status &&
          error.key === 'product-data' && (
            <section className='fetching-state'>
              <p>{error.msg}</p>
              <button onClick={() => router.reload()}>
                <IoReload />
                <span>Recarregar a página</span>
              </button>
            </section>
          )}

        <article>
          <section className='header'>
            <h2>
              <IoPencilOutline />
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
                          Nota: a primeira imagem carregada será principal. Não
                          é obrigatório carregar imagens.
                        </strong>
                      </p>
                    </div>
                    {Object.entries(imagesData).map(([key, value], index) => (
                      <div className='img-container' key={index.toString()}>
                        {value.data ? (
                          <img
                            className='cover-image'
                            src={value.data}
                            alt={`product image ${index.toString()}`}
                            title={`Imagem do Produto ${index.toString()}`}
                          />
                        ) : state.product.images[key]?.url ? (
                          <img
                            className='cover-image'
                            src={state.product.images[key].url}
                            alt={`Product image ${index.toString()}`}
                            title={`Imagem do Produto ${index.toString()}`}
                          />
                        ) : (
                          <IoImageOutline className='camera-icon' />
                        )}

                        <label
                          htmlFor={`cover${index}`}
                          title={`Carregar imagem ${index + 1}`}>
                          <IoAdd />
                        </label>
                        <button
                          title='Apagar imagem'
                          className='clear-image'
                          onClick={() => deleteImage(value.id, key)}>
                          <IoTrashOutline />
                        </button>
                        <input
                          type='file'
                          id={`cover${index}`}
                          accept='.jpg, .jpeg, .png'
                          multiple={false}
                          onChange={(e) =>
                            handleFiles(String(index), e.target.files)
                          }
                        />
                      </div>
                    ))}
                  </div>
                </section>

                <div className='data-section'>
                  <div className='description'>
                    <h2>
                      <IoBagHandle />
                      <span>Informações do Produto</span>
                    </h2>
                    <p>
                      Informações usadas para a descrição e identificação do
                      produto.
                    </p>
                  </div>

                  <div className='items-container'>
                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='name'>
                          <IoEllipsisHorizontal />
                          <span>Nome do Produto *</span>
                        </label>
                        <input
                          type='text'
                          id='name'
                          name='name'
                          autoComplete='off'
                          placeholder='Escreva o nome do produto'
                          aria-label='Escreva o nome do produto'
                          onChange={(e): void =>
                            e.target.value.length > 128
                              ? undefined
                              : handleChange(e)
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
                          <IoEllipsisHorizontal />
                          <span>Descrição do Produto *</span>
                        </label>

                        <textarea
                          id='description'
                          name='description'
                          autoComplete='off'
                          placeholder='Escreva a descrição do produto'
                          aria-label='Escreva a descrição do produto'
                          onChange={(e): void =>
                            e.target.value.length > 512
                              ? undefined
                              : handleChange(e)
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
                          <IoEllipsisHorizontal />
                          <span>Especificações do Produto</span>
                        </label>

                        <textarea
                          id='specifications'
                          name='specifications'
                          autoComplete='off'
                          placeholder='Coloque as especificações do produto'
                          aria-label='Coloque as especificações do produto'
                          onChange={(e): void =>
                            e.target.value.length > 2048
                              ? undefined
                              : handleChange(e)
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
                          <IoLayersOutline />
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
                                  category: e.target.value,
                                },
                              },
                            });
                          }}>
                          {product_categories
                            .sort((a, b) => (a > b ? 1 : -1))
                            .map((item, index) => (
                              <option key={index.toString()} value={item}>
                                {item}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className='form-element'>
                        <label htmlFor='quantity'>
                          <IoCashOutline />
                          <span>Quantidade em Estoque</span>
                        </label>
                        <input
                          type='number'
                          id='quantity'
                          name='quantity'
                          min={0}
                          placeholder='Quantidade do produto em estoque'
                          aria-label='Quantidade do produto em estoque'
                          onChange={(e): void => handleChange(e)}
                          value={state.product.quantity}
                        />
                      </div>
                    </section>

                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='price'>
                          <IoPricetagsOutline />
                          <span>Preço (em meticais e sem decimais) </span>
                        </label>
                        <input
                          type='number'
                          id='price'
                          name='price'
                          min={0}
                          placeholder='Preço do produto'
                          aria-label='Preço do produto'
                          onChange={(e): void => handleChange(e)}
                          value={state.product.price}
                        />
                      </div>
                      <div className='form-element'>
                        <label htmlFor='delivery_tax'>
                          <IoCarOutline />
                          <span>Taxa Base de Entrega (Meticais)</span>
                        </label>
                        <input
                          type='number'
                          id='delivery_tax'
                          name='delivery_tax'
                          min={0}
                          placeholder='Taxa base de entrega do produto'
                          aria-label='Taxa base de entrega do produto'
                          onChange={(e): void => handleChange(e)}
                          value={state.product.delivery_tax}
                        />
                      </div>
                    </section>

                    <section className='form-section'>
                      <div className='form-element check-box'>
                        <label htmlFor='promotion'>
                          <IoGiftOutline />
                          <span>Está em promoção?</span>
                        </label>
                        <input
                          type='checkbox'
                          id='promotion'
                          name='promotion'
                          onChange={(e): void => {
                            dispatch({
                              type: actions.PRODUCT_DATA,
                              payload: {
                                ...state,
                                product: {
                                  ...state.product,
                                  promotion: {
                                    ...state.product.promotion,
                                    status: e.target.checked,
                                  },
                                },
                              },
                            });
                          }}
                          checked={state.product.promotion.status}
                        />
                      </div>
                      <div className='form-element'>
                        <label htmlFor='percentage'>
                          <IoPizzaOutline />
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
                          onChange={(e): void => {
                            dispatch({
                              type: actions.PRODUCT_DATA,
                              payload: {
                                ...state,
                                product: {
                                  ...state.product,
                                  promotion: {
                                    ...state.product.promotion,
                                    percentage: Number(e.target.value),
                                  },
                                },
                              },
                            });
                          }}
                        />
                      </div>
                    </section>

                    <section className='form-section'>
                      <div className='form-element check-box'>
                        <label htmlFor='allow_comments'>
                          <IoChatbubblesOutline />
                          <span>Permitir comentários?</span>
                        </label>
                        <input
                          type='checkbox'
                          id='allow_comments'
                          name='allow_comments'
                          checked={state.product.allow_comments}
                          onChange={(e): void => {
                            dispatch({
                              type: actions.PRODUCT_DATA,
                              payload: {
                                ...state,
                                product: {
                                  ...state.product,
                                  allow_comments: e.target.checked,
                                },
                              },
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
                  <IoSave />
                  <span>Salvamento de Alterações</span>
                </h2>
                <p>Salve as alterações feitas.</p>
              </div>
              <div>
                {!loading.status && !error.status && (
                  <>
                    <h3>
                      Confirme se as informações introduzidas estão correctas
                      antes de salvar alterações. Caso não tenha alterado nada,
                      não será atualizado, clique em "Descartar e voltar".
                    </h3>
                    <p>
                      Todas as informações que introduzir nesta página são, por
                      padrão, públicas.
                    </p>
                  </>
                )}

                {error.status &&
                error.key === 'product-update' &&
                !loading.status &&
                error.msg.includes('.') ? (
                  error.msg
                    .split('.')
                    .map((phrase) => (
                      <div className='error-message'>{phrase}</div>
                    ))
                ) : (
                  <div className='error-message'>{error.msg}</div>
                )}

                {loading.status &&
                  loading.key === 'product-update' &&
                  !error.status && (
                    <div className='loading'>
                      <PulseLoader
                        color={`rgb(${theme.primary})`}
                        aria-placeholder='Processando...'
                        cssOverride={{
                          display: 'block',
                        }}
                      />
                      <span>Processando...</span>
                    </div>
                  )}
              </div>

              <div className='btns-container'>
                {!loading.status && !error.status && (
                  <>
                    <button
                      className='back'
                      onClick={(e): void => router.back()}>
                      <IoArrowUndoOutline />
                      <span>Descartar e voltar</span>
                    </button>
                    {state.product._id ? (
                      <button
                        className='save'
                        onClick={(): Promise<void> =>
                          handleUpdate(state.product._id)
                        }>
                        <IoSyncOutline />
                        <span>Salvar alterações</span>
                      </button>
                    ) : (
                      <button
                        className='save'
                        onClick={(): Promise<void> => handleCreate()}>
                        <IoPush />
                        <span>Publicar Produto</span>
                      </button>
                    )}
                  </>
                )}
              </div>
            </section>
          </section>
        </article>
      </Container>
    </Layout>
  );
}
