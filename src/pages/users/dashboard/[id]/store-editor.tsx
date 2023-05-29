import {
  IoAdd,
  IoArrowUndoOutline,
  IoCreateOutline,
  IoEllipsisHorizontal,
  IoHeartHalfOutline,
  IoHomeOutline,
  IoImageOutline,
  IoLocation,
  IoPencilOutline,
  IoPhonePortraitOutline,
  IoPlanetOutline,
  IoReload,
  IoStar,
  IoStorefront,
  IoSyncOutline,
  IoTrash,
  IoTrashOutline,
} from 'react-icons/io5';
import Compressor from 'compressorjs';
import Layout from '@/components/Layout';
import { BiUserCheck, BiUserX } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import { useTheme } from 'styled-components';
import { actions } from '@/data/reducer-actions';
import { NextRouter, useRouter } from 'next/router';
import { useAppContext } from '@/context/AppContext';
import { DotLoader, PulseLoader } from 'react-spinners';
import countries from '../../../../data/countries.json';
import { StoreEditorContainer as Container } from '@/styles/common/store-editor';
import { InputEvents } from '../../../../../@types';
import product_categories from '../../../../data/product-categories.json'

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
  const [countryStates, setCountryStates] = useState<string[]>([]);
  const [coverImageFile, setCoverImageFile] = useState<FileList | null>(null);

  const [coverImageData, setCoverImageData] = useState({
    id: '',
    data: '',
  });

  // const [img0File, setImg0File] = useState<FileList | null>(null);
  // const [img1File, setImg1File] = useState<FileList | null>(null);
  // const [img2File, setImg2File] = useState<FileList | null>(null);
  // const [img3File, setImg3File] = useState<FileList | null>(null);

  // --------------------functions------------------
  function handleChange(e: InputEvents): void {
    dispatch({
      type: actions.USER_DATA,
      payload: {
        ...state,
        store: {
          ...state.store,
          [e.target.name]: e.target.value,
        },
      },
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
              data: encodedImage,
            });
          };
        },
      });
    }
  }

  function deleteCoverImage(): void {
    fetchAPI({
      method: 'delete',
      url: `/api/v1/users/account/assets`,
      data: { image: state.user.cover_image?.id },
    })
      .then(() => {
        setCoverImageData({
          id: '',
          data: '',
        });
        dispatch({
          type: actions.USER_DATA,
          payload: {
            ...state,
            user: {
              ...state.user,
              cover_image: {
                id: '',
                url: '',
              },
            },
          },
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
      url: `/api/v1/users/store`,
    })
      .then(({ data }) => {
        dispatch({
          type: actions.STORE_DATA,
          payload: {
            ...state,
            store: { ...data },
          },
        });
      })
      .catch((error) => {
        console.error(error);
        setError({
          status: true,
          msg:
            error?.response?.data?.message ||
            'Oops! Algo deu errado. Tente novamente.',
          key: 'store-data',
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
          description: state.store.description,
          slogan: state.store.slogan,
          category: state.store.category,
          privacy_policy: state.store.privacy_policy,
          terms_policy: state.store.terms_policy,
          delivery_policy: state.store.delivery_policy,
          mission_and_values: state.store.mission_and_values,
          location: state.store.location,
          coverImageData,
        },
      });
    } catch (error: any) {
      console.error(error);
      setError({
        status: true,
        msg:
          error?.response?.data?.message ||
          'Oops! Algo deu errado. Tente novamente.',
        key: 'store-update',
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
    <Layout>
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
            <span>Salve após fazer alterações!</span>
          </section>

          <section className='data-container'>
            <section className='wrapper'>
              <section className='form'>
                <section className='form-section'>
                  <div className='image-container cover-image'>
                    {coverImageData.data ? (
                      <img
                        className='cover-image'
                        src={coverImageData.data}
                        alt='cover image'
                      />
                    ) : state.user.cover_image?.url ? (
                      <img
                        className='cover-image'
                        src={state.user.cover_image?.url}
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
                  </div>
                </section>

                <div className='data-section'>
                  <div className='description'>
                    <h2>
                      <IoStorefront />
                      <span>Informações da Loja</span>
                    </h2>
                    <p>
                      Informações usadas para identificação e contato. Por
                      favor, inserir informações reais e verdadeiras para evitar
                      a suspensão da loja.
                    </p>
                  </div>

                  <div className='items-container'>
                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='first_name'>
                          <IoEllipsisHorizontal />
                          <span>Nome da Loja</span>
                        </label>
                        <input
                          type='text'
                          id='first_name'
                          name='first_name'
                          autoComplete='off'
                          placeholder='Escreva o seu nome'
                          aria-label='Escreva o seu nome'
                          required={true}
                          onChange={(e): void => handleChange(e)}
                          value={state.user.first_name}
                        />
                      </div>
                      <div className='form-element'>
                        <label htmlFor='last_name'>
                          <IoEllipsisHorizontal />
                          <span>Apelido</span>
                        </label>
                        <select name="category" id="category">
                          {}
                        </select>
                      </div>
                    </section>
                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='main_phone_number'>
                          <IoPhonePortraitOutline />
                          <span>Número de telemóvel (Principal)</span>
                        </label>
                        <input
                          type='number'
                          id='main_phone_number'
                          name='main_phone_number'
                          placeholder='Escreva o seu número de telemóvel'
                          aria-label='Escreva o seu número de telemóvel'
                          onChange={(e): void => handleChange(e)}
                          value={state.user.main_phone_number}
                        />
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
                          placeholder='Escreva o seu número de telemóvel'
                          aria-label='Escreva o seu número de telemóvel'
                          onChange={(e): void => handleChange(e)}
                          value={state.user.alternative_phone_number}
                        />
                      </div>
                    </section>
                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='main_phone_number'>
                          <IoHeartHalfOutline />
                          <span>Gênero</span>
                        </label>
                        <select
                          name='gender'
                          id='gender'
                          value={state.user.gender}
                          onChange={(e): void => handleChange(e)}>
                          <option value='Masculino'>Masculino</option>
                          <option value='Femenino'>Femenino</option>
                          <option value='Outro'>Outro</option>
                        </select>
                      </div>
                    </section>

                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='bio'>
                          <IoCreateOutline />
                          <span>Biografia</span>
                        </label>
                        <input
                          type='text'
                          id='bio'
                          name='bio'
                          maxLength={128}
                          placeholder='Escreva uma breve biografia para o seu perfil'
                          aria-label='Escreva uma breve biografia para o seu perfil'
                          onChange={(e): void => handleChange(e)}
                          value={state.user.bio}
                        />
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
                      Informações usadas para entregas de compras feitas nas
                      lojas.
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
                          value={state.user.location?.country}
                          onChange={(e): void => {
                            countries.forEach((obj) => {
                              if (obj.country === e.target.value) {
                                setCountryStates([...obj.states]);
                              }
                            });
                            dispatch({
                              type: actions.USER_DATA,
                              payload: {
                                ...state,
                                user: {
                                  ...state.user,
                                  location: {
                                    ...state.user.location,
                                    country: e.target.value,
                                  },
                                },
                              },
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
                          value={state.user.location?.state}
                          defaultValue={state.user.location?.state}
                          onChange={(e): void => {
                            dispatch({
                              type: actions.USER_DATA,
                              payload: {
                                ...state,
                                user: {
                                  ...state.user,
                                  location: {
                                    ...state.user.location,
                                    state: e.target.value,
                                  },
                                },
                              },
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
                          placeholder='Endereço'
                          aria-label='Endereço'
                          maxLength={128}
                          value={state.user.location?.adress}
                          onChange={(e): void => {
                            dispatch({
                              type: actions.USER_DATA,
                              payload: {
                                ...state,
                                user: {
                                  ...state.user,
                                  location: {
                                    ...state.user.location,
                                    adress: e.target.value,
                                  },
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
                  <BiUserCheck />
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
            <section className='delete-account'>
              <div className='description'>
                <h2>
                  <BiUserX />
                  <span>Activação da Loja</span>
                </h2>
                <p>
                  Por padrão a loja está desativada. Active após o preenchimento
                  das informações acima.
                </p>
              </div>
              <button className='save' onClick={() => {}}>
                <IoTrash />
                <span>Activar</span>
              </button>
            </section>
          </section>
        </article>
      </Container>
    </Layout>
  );
}
