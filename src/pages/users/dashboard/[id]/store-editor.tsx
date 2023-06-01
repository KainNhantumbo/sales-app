import {
  IoAdd,
  IoArrowUndoOutline,
  IoCart,
  IoDocuments,
  IoEllipsisHorizontal,
  IoHomeOutline,
  IoImageOutline,
  IoLayersOutline,
  IoLocation,
  IoPencilOutline,
  IoPlanetOutline,
  IoRadioButtonOff,
  IoRadioButtonOn,
  IoReload,
  IoSave,
  IoStar,
  IoStorefront,
  IoSyncOutline,
  IoTrashOutline
} from 'react-icons/io5';
import Compressor from 'compressorjs';
import Layout from '@/components/Layout';
import { useState, useEffect } from 'react';
import { useTheme } from 'styled-components';
import { actions } from '@/data/actions';
import { NextRouter, useRouter } from 'next/router';
import { useAppContext } from '@/context/AppContext';
import { DotLoader, PulseLoader } from 'react-spinners';
import countries from '../../../../data/countries.json';
import { InputEvents } from '../../../../../@types';
import product_categories from '../../../../data/product-categories.json';
import { StoreEditorContainer as Container } from '@/styles/common/store-editor';
import { complements } from '@/data/app-data';
import Image from 'next/image';

export default function StoreEditor(): JSX.Element {
  const theme = useTheme();
  const router: NextRouter = useRouter();
  const { state, fetchAPI, dispatch } = useAppContext();

  const [loading, setLoading] = useState<{
    status: boolean;
    key: 'store-data' | 'store-update';
  }>({ status: false, key: 'store-data' });
  const [error, setError] = useState<{
    status: boolean;
    msg: string;
    key: 'store-data' | 'store-update';
  }>({ status: false, msg: '', key: 'store-data' });

  // --------------------states---------------------
  const [countryStates, setCountryStates] = useState<string[]>([
    state.store.location?.state
  ]);
  const [coverImageFile, setCoverImageFile] = useState<FileList | null>(null);

  const [coverImageData, setCoverImageData] = useState({
    id: '',
    data: ''
  });

  // --------------------functions------------------
  function handleChange(e: InputEvents): void {
    dispatch({
      type: actions.STORE_DATA,
      payload: {
        ...state,
        store: {
          ...state.store,
          [e.target.name]: e.target.value
        }
      }
    });
  }

  function handleCoverImageFile(): void {
    const imageData: File | null | undefined = coverImageFile?.item(0);
    if (imageData) {
      new Compressor(imageData, {
        quality: 0.8,
        width: 620,
        height: 220,
        resize: 'cover',
        success: (compressedImge: File | Blob): void => {
          const reader = new FileReader();
          reader.readAsDataURL(compressedImge);
          reader.onloadend = function (e: ProgressEvent<FileReader>): void {
            const encodedImage: string = e.target?.result as string;
            setCoverImageData({
              id: state.user.cover_image?.id || '',
              data: encodedImage
            });
          };
        }
      });
    }
  }

  function deleteCoverImage(): void {
    fetchAPI({
      method: 'delete',
      url: `/api/v1/users/account/assets`,
      data: { image: state.store.cover_image?.id }
    })
      .then(() => {
        setCoverImageData({
          id: '',
          data: ''
        });
        dispatch({
          type: actions.USER_DATA,
          payload: {
            ...state,
            store: {
              ...state.store,
              cover_image: {
                id: '',
                url: ''
              }
            }
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getStoreData(): void {
    setLoading({ status: true, key: 'store-data' });
    fetchAPI({
      method: 'get',
      url: `/api/v1/users/store`
    })
      .then(({ data }) => {
        dispatch({
          type: actions.STORE_DATA,
          payload: {
            ...state,
            store: { ...state.store, ...data }
          }
        });
      })
      .catch((error) => {
        console.error(error);
        setError({
          status: true,
          msg:
            error?.response?.data?.message ||
            'Oops! Algo deu errado. Tente novamente.',
          key: 'store-data'
        });
      })
      .finally(() => {
        setLoading({ status: false, key: 'store-data' });
      });
  }

  async function handleSubmitUpdate(): Promise<void> {
    try {
      setLoading({ status: true, key: 'store-update' });
      await fetchAPI({
        method: 'patch',
        url: '/api/v1/users/store',
        data: {
          name: state.store.name,
          category: state.store.category,
          description: state.store.description,
          slogan: state.store.slogan,
          privacy_policy: state.store.privacy_policy,
          terms_policy: state.store.terms_policy,
          delivery_policy: state.store.delivery_policy,
          location: state.store.location,
          active: state.store.active,
          coverImageData
        }
      });
    } catch (error: any) {
      console.error(error);
      setError({
        status: true,
        msg:
          error?.response?.data?.message ||
          'Oops! Algo deu errado. Tente novamente.',
        key: 'store-update'
      });
    } finally {
      setLoading({ status: false, key: 'store-update' });
    }
  }

  useEffect((): (() => void) => {
    handleCoverImageFile();
    return () => {
      setCoverImageData({ id: '', data: '' });
      setCoverImageFile(null);
    };
  }, [coverImageFile]);

  useEffect((): (() => void) => {
    const fetch_data = setTimeout(() => {
      getStoreData();
    }, 10);
    return () => clearTimeout(fetch_data);
  }, []);

  useEffect((): (() => void) => {
    const desc = setTimeout(() => {
      if (error.status && error.key === 'store-update') {
        setError({ status: false, msg: '', key: 'store-data' });
      }
    }, 5000);
    return () => {
      clearTimeout(desc);
    };
  }, [error.status]);

  return (
    <Layout
      metadata={{
        title: `${complements.defaultTitle} | Editor de Loja`,
        updatedAt: state.store.updatedAt,
        createdAt: state.store.createdAt
      }}>
      <Container>
        {loading.status && loading.key === 'store-data' && (
          <section className='fetching-state'>
            <div>
              <DotLoader size={50} color={`rgb(${theme.primary})`} />
            </div>
            <span>Carregando...</span>
          </section>
        )}

        {!loading.status &&
          loading.key === 'store-data' &&
          error.status &&
          error.key === 'store-data' && (
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
              <span>Detalhes da Loja</span>
            </h2>
            <span className='details'>Salve após fazer alterações!</span>
          </section>

          <section className='data-container'>
            <section className='wrapper'>
              <section className='form'>
                <section className='form-section'>
                  <div className='image-container cover-image'>
                    {coverImageData.data ? (
                      <Image
                        width={620}
                        height={220}
                        className='cover-image'
                        src={coverImageData.data}
                        alt='cover image'
                      />
                    ) : state.store.cover_image?.url ? (
                      <Image
                        width={620}
                        height={220}
                        className='cover-image'
                        src={state.store.cover_image?.url}
                        alt='cover image'
                      />
                    ) : (
                      <IoImageOutline className='camera-icon' />
                    )}
                    <label htmlFor='cover' title='Selecionar imagem de capa'>
                      <span>Imagem de capa</span>
                      <IoAdd />
                    </label>
                    <button
                      title='Apagar imagem de capa'
                      className='clear-image'
                      onClick={deleteCoverImage}>
                      <IoTrashOutline />
                    </button>
                    <input
                      type='file'
                      id='cover'
                      name='cover'
                      accept='.jpg, .jpeg, .png'
                      multiple={false}
                      onChange={(e) => setCoverImageFile(e.target.files)}
                    />
                    <span className='description'>
                      Dimensões: 620 x 220 pixels. Máx. 800Kb.
                    </span>
                  </div>
                </section>

                <div className='data-section'>
                  <div className='description'>
                    <h2>
                      <IoStorefront />
                      <span>Informações da Loja</span>
                    </h2>
                    <p>
                      Informações usadas para perfil da loja. Por favor, inserir
                      informações correctas, reais e verdadeiras para evitar a
                      suspensão da loja.
                    </p>
                  </div>

                  <div className='items-container'>
                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='name'>
                          <IoEllipsisHorizontal />
                          <span>Nome da Loja *</span>
                        </label>
                        <input
                          type='text'
                          id='name'
                          name='name'
                          autoComplete='off'
                          placeholder='Escreva o nome da loja'
                          aria-label='Escreva o nome da loja'
                          onChange={(e): void =>
                            e.target.value.length > 64
                              ? undefined
                              : handleChange(e)
                          }
                          value={state.store.name}
                        />
                        <span className='counter'>{`${
                          state.store.name?.length || 0
                        } / 64`}</span>
                      </div>
                      <div className='form-element'>
                        <label htmlFor='category'>
                          <IoLayersOutline />
                          <span>Categoria Principal dos Produtos *</span>
                        </label>
                        <select
                          name='category'
                          id='category'
                          value={state.store.category}
                          onChange={(e) => {
                            dispatch({
                              type: actions.STORE_DATA,
                              payload: {
                                ...state,
                                store: {
                                  ...state.store,
                                  category: e.target.value
                                }
                              }
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
                    </section>
                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='slogan'>
                          <IoEllipsisHorizontal />
                          <span>Slogan da Loja</span>
                        </label>
                        <input
                          type='text'
                          id='slogan'
                          name='slogan'
                          autoComplete='off'
                          placeholder='Escreva o slogan de sua loja'
                          aria-label='Escreva o slogan de sua loja'
                          onChange={(e): void =>
                            e.target.value.length > 64
                              ? undefined
                              : handleChange(e)
                          }
                          value={state.store.slogan}
                          maxLength={64}
                        />
                        <span className='counter'>{`${
                          state.store.slogan?.length || 0
                        } / 64`}</span>
                      </div>
                    </section>

                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='description'>
                          <IoEllipsisHorizontal />
                          <span>Descrição da Loja *</span>
                        </label>

                        <textarea
                          id='description'
                          name='description'
                          autoComplete='off'
                          placeholder='Escreva a descrição de sua loja'
                          aria-label='Escreva a descrição de sua loja'
                          onChange={(e): void =>
                            e.target.value.length > 256
                              ? undefined
                              : handleChange(e)
                          }
                          value={state.store.description}
                          maxLength={256}
                          rows={5}
                        />
                        <span className='counter'>{`${
                          state.store.description?.length || 0
                        } / 256`}</span>
                      </div>
                    </section>
                  </div>
                </div>

                <div className='data-section'>
                  <div className='description'>
                    <h2>
                      <IoLocation />
                      <span>Localização e Endereço</span>
                    </h2>
                    <p>
                      Localização e endereço da sua loja física (caso exista) ou
                      a sua localização de partida (casa, armazém dos produtos,
                      etc.).
                    </p>
                  </div>

                  <div className='items-container'>
                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='country'>
                          <IoPlanetOutline />
                          <span>País</span>
                        </label>
                        <select
                          name='country'
                          id='country'
                          value={state.store.location?.country}
                          onChange={(e): void => {
                            countries.forEach((obj) => {
                              if (obj.country === e.target.value) {
                                setCountryStates([...obj.states]);
                              }
                            });
                            dispatch({
                              type: actions.STORE_DATA,
                              payload: {
                                ...state,
                                store: {
                                  ...state.store,
                                  location: {
                                    ...state.store.location,
                                    country: e.target.value
                                  }
                                }
                              }
                            });
                          }}>
                          {countries
                            .sort((a, b) => (a.country > b.country ? 1 : -1))
                            .map((item, index) => (
                              <option value={item.country} key={index}>
                                {item.country}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div className='form-element'>
                        <label htmlFor='state'>
                          <IoStar />
                          <span>Provícia / Estado</span>
                        </label>
                        <select
                          name='state'
                          id='state'
                          value={state.store.location?.state}
                          onChange={(e): void => {
                            dispatch({
                              type: actions.STORE_DATA,
                              payload: {
                                ...state,
                                store: {
                                  ...state.store,
                                  location: {
                                    ...state.store.location,
                                    state: e.target.value
                                  }
                                }
                              }
                            });
                          }}>
                          {countryStates
                            .sort((a, b) => (a > b ? 1 : -1))
                            .map((item, index) => (
                              <option value={item} key={index}>
                                {item}
                              </option>
                            ))}
                        </select>
                      </div>
                    </section>
                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='adress'>
                          <IoHomeOutline />
                          <span>Endereço</span>
                        </label>
                        <input
                          type='text'
                          id='adress'
                          placeholder='Localidade, bairro, rua, quarteirão, número da casa, etc.'
                          aria-label='Localidade, bairro, rua, quarteirão, número da casa, etc.'
                          maxLength={256}
                          value={state.store.location?.adress}
                          onChange={(e): void =>
                            e.target.value.length > 256
                              ? undefined
                              : dispatch({
                                  type: actions.STORE_DATA,
                                  payload: {
                                    ...state,
                                    store: {
                                      ...state.store,
                                      location: {
                                        ...state.store.location,
                                        adress: e.target.value
                                      }
                                    }
                                  }
                                })
                          }
                        />
                        <span className='counter'>{`${
                          state.store.location?.adress?.length || 0
                        } / 256`}</span>
                      </div>
                    </section>
                  </div>
                </div>

                <div className='data-section'>
                  <div className='description'>
                    <h2>
                      <IoDocuments />
                      <span>Políticas da Loja</span>
                    </h2>

                    <p>
                      Documentação e regras de conduta endereçada aos clientes
                      que visitam a sua loja.
                    </p>
                  </div>

                  <div className='items-container'>
                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='terms_policy'>
                          <IoEllipsisHorizontal />
                          <span>Termos e Condições</span>
                        </label>
                        <textarea
                          id='terms_policy'
                          name='terms_policy'
                          autoComplete='off'
                          placeholder='Escreva os termos e condições da sua loja'
                          aria-label='Escreva os termos e condições da sua loja'
                          rows={12}
                          onChange={(e): void =>
                            e.target.value.length > 2048
                              ? undefined
                              : handleChange(e)
                          }
                          value={state.store.terms_policy}
                        />
                        <span className='counter'>{`${
                          state.store.terms_policy?.length || 0
                        } / 2048`}</span>
                      </div>
                    </section>
                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='privacy_policy'>
                          <IoEllipsisHorizontal />
                          <span>Política de Privacidade</span>
                        </label>
                        <textarea
                          id='privacy_policy'
                          name='privacy_policy'
                          autoComplete='off'
                          placeholder='Escreva a política de privacidade da sua loja'
                          aria-label='Escreva a política de privacidade da sua loja'
                          rows={12}
                          onChange={(e): void =>
                            e.target.value.length > 2048
                              ? undefined
                              : handleChange(e)
                          }
                          value={state.store.privacy_policy}
                        />
                        <span className='counter'>{`${
                          state.store.privacy_policy?.length || 0
                        } / 2048`}</span>
                      </div>
                    </section>
                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='delivery_policy'>
                          <IoEllipsisHorizontal />
                          <span>Política de Entregas ao Cliente</span>
                        </label>
                        <textarea
                          id='delivery_policy'
                          name='delivery_policy'
                          autoComplete='off'
                          placeholder='Escreva a política de entrega de encomendas ao cliente da sua loja'
                          aria-label='Escreva a política de entrega de encomendas ao cliente da sua loja'
                          rows={12}
                          onChange={(e): void =>
                            e.target.value.length > 1024
                              ? undefined
                              : handleChange(e)
                          }
                          value={state.store.delivery_policy}
                        />
                        <span className='counter'>{`${
                          state.store.delivery_policy?.length || 0
                        } / 1024`}</span>
                      </div>
                    </section>
                  </div>
                </div>
              </section>
            </section>

            <section className='delete-account'>
              <div className='description'>
                <h2>
                  <IoCart />
                  <span>Activação da Loja</span>
                </h2>
                <p>
                  Por padrão, a loja está desativada, isso significa que os a
                  loja e os seus produtos não aprecerão ao público ou nas
                  pesquisas feitas pelos usuários da plataforma. Active após o
                  preenchimento correcto das informações acima.
                </p>
                <p className='p-bottom'>
                  Clique no botão abaixo para activar ou desactivar a loja.
                </p>
              </div>
              <button
                className='save'
                onClick={() =>
                  dispatch({
                    type: actions.STORE_DATA,
                    payload: {
                      ...state,
                      store: {
                        ...state.store,
                        active: !state.store.active
                      }
                    }
                  })
                }>
                {!state.store.active ? (
                  <>
                    <IoRadioButtonOff color={`rgb(${theme.alert})`} />
                    <span>Loja Desactivada</span>
                  </>
                ) : (
                  <>
                    <IoRadioButtonOn color={`rgb(${theme.secondary})`} />
                    <span>Loja Activada</span>
                  </>
                )}
              </button>
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
                  error.key === 'store-update' &&
                  !loading.status && (
                    <h3 className='error-message'>{error.msg}</h3>
                  )}

                {loading.status &&
                  loading.key === 'store-update' &&
                  !error.status && (
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
                    <button
                      className='save'
                      onClick={(): Promise<void> => handleSubmitUpdate()}>
                      <IoSyncOutline />
                      <span>Salvar alterações</span>
                    </button>
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
