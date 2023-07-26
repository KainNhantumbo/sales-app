import {
  IoAdd,
  IoArrowUndoOutline,
  IoBookmarkOutline,
  IoBriefcase,
  IoCalendarNumberOutline,
  IoClipboardOutline,
  IoCloseCircle,
  IoConstructOutline,
  IoCreateOutline,
  IoEarthOutline,
  IoEllipsisHorizontal,
  IoExtensionPuzzleOutline,
  IoFlowerOutline,
  IoHeartHalfOutline,
  IoHomeOutline,
  IoImageOutline,
  IoKey,
  IoLinkOutline,
  IoLocation,
  IoLockClosedOutline,
  IoLockOpenOutline,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoWhatsapp,
  IoPencil,
  IoPencilOutline,
  IoPhonePortraitOutline,
  IoPlanetOutline,
  IoReload,
  IoShareSocial,
  IoStar,
  IoSyncOutline,
  IoTrash,
  IoTrashOutline,
  IoWatchOutline,
} from 'react-icons/io5';
import moment from 'moment';
import Image from 'next/image';
import { NextPage } from 'next';
import Compressor from 'compressorjs';
import Layout from '@/components/Layout';
import { actions } from '@/data/actions';
import { useState, useEffect } from 'react';
import { useTheme } from 'styled-components';
import countries from '@/data/countries.json';
import { complements } from '@/data/app-data';
import { InputEvents, User } from '@/../@types';
import user_languages from '@/data/languages.json';
import { NextRouter, useRouter } from 'next/router';
import { useAppContext } from '@/context/AppContext';
import { FaBlog, FaLinkedinIn } from 'react-icons/fa';
import { DotLoader, PulseLoader } from 'react-spinners';
import user_skills from '@/data/professional-skills.json';
import WorkCapturer from '@/components/modals/WorkCapturer';
import { BiUser, BiUserCheck, BiUserX } from 'react-icons/bi';
import DeleteAccountPrompt from '@/components/modals/DeleteAccountPrompt';
import { UserProfileContainer as Container } from '@/styles/common/profile-editor';

const ProfileEditor: NextPage = (): JSX.Element => {
  const theme = useTheme();
  const router: NextRouter = useRouter();
  const {
    state,
    fetchAPI,
    dispatch,
    userWorkingDataController,
    deleteAccountPromptController,
  } = useAppContext();

  const [loading, setLoading] = useState<{
    status: boolean;
    key: 'user-data' | 'user-update';
  }>({ status: false, key: 'user-data' });
  const [error, setError] = useState<{
    status: boolean;
    msg: string;
    key: 'user-data' | 'user-update';
  }>({ status: false, msg: '', key: 'user-data' });

  // --------------------states---------------------
  const [countryStates, setCountryStates] = useState<string[]>([
    state.user.location?.state,
  ]);
  const [coverImageFile, setCoverImageFile] = useState<FileList | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<FileList | null>(
    null
  );
  const [coverImageData, setCoverImageData] = useState({
    id: '',
    data: '',
  });
  const [profileImageData, setProfileImageData] = useState({
    id: '',
    data: '',
  });

  const [passwords, setPasswords] = useState({
    password: '',
    confirm_password: '',
  });

  // --------------------functions------------------
  const handleChange = (e: InputEvents): void => {
    dispatch({
      type: actions.USER_DATA,
      payload: {
        ...state,
        user: {
          ...state.user,
          [e.target.name]: e.target.value,
        },
      },
    });
  };

  const handlePasswordsChange = (e: InputEvents): void => {
    setPasswords((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCoverImageFile = (): void => {
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
  };

  const handleProfileImageFile = (): void => {
    const imageData: File | null | undefined = profileImageFile?.item(0);
    if (imageData) {
      new Compressor(imageData, {
        quality: 0.8,
        width: 150,
        height: 150,
        resize: 'cover',
        success: (compressedImge: File | Blob): void => {
          const reader = new FileReader();
          reader.readAsDataURL(compressedImge);
          reader.onloadend = function (e: ProgressEvent<FileReader>): void {
            const encodedImage: string = e.target?.result as string;
            setProfileImageData({
              id: state.user.profile_image?.id || '',
              data: encodedImage,
            });
          };
        },
      });
    }
  };

  const deleteAsset = (assetType: 'cover_image' | 'profile_image'): void => {
    fetchAPI({
      method: 'delete',
      url: `/api/v1/users/account/assets`,
      data: { type: assetType, assetId: state.user[assetType]?.id },
    })
      .then(() => {
        assetType === 'cover_image' && setCoverImageData({ id: '', data: '' });
        assetType === 'profile_image' &&
          setProfileImageData({ id: '', data: '' });
        dispatch({
          type: actions.USER_DATA,
          payload: {
            ...state,
            user: {
              ...state.user,
              [assetType]: { id: '', url: '' },
            },
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getUserData = (): void => {
    setLoading({ status: true, key: 'user-data' });
    fetchAPI({
      method: 'get',
      url: `/api/v1/users/account/${router.query?.id || state.auth.id}`,
    })
      .then(({ data }) => {
        const formattedData = Array.isArray(data) ? data[0] : data;
        dispatch({
          type: actions.USER_DATA,
          payload: { ...state, user: formattedData },
        });
      })
      .catch((error) => {
        console.error(error);
        setError({
          status: true,
          msg:
            error?.response?.data?.message ||
            'Oops! Algo deu errado. Tente novamente.',
          key: 'user-data',
        });
      })
      .finally(() => {
        setLoading({ status: false, key: 'user-data' });
      });
  };

  const handleSubmitUpdate = async (): Promise<void> => {
    if (passwords.confirm_password !== '') {
      if (passwords.password !== passwords.confirm_password)
        return setError({
          status: true,
          msg: 'A as senhas devem ser iguais e maiores que 8 carácteres.',
          key: 'user-update',
        });
    }

    try {
      setLoading({ status: true, key: 'user-update' });
      const {
        updatedAt,
        _id,
        createdAt,
        cover_image,
        profile_image,
        social_network,
        ...user
      } = state.user;

      const serializedObj = Object.entries(social_network ?? {})
        .map(([key, value]) => (value ? { [key]: value } : undefined))
        .reduce((acc, value) => ({ ...acc, ...value }), {});

      const { data } = await fetchAPI<User>({
        method: 'patch',
        url: `/api/v1/users/account`,
        data: {
          ...user,
          coverImageData,
          profileImageData,
          social_network: serializedObj,
        },
      });

      dispatch({
        type: actions.USER_DATA,
        payload: {
          ...state,
          user: { ...data },
        },
      });
    } catch (error: any) {
      console.error(error);
      setError({
        status: true,
        msg:
          error?.response?.data?.message ||
          'Oops! Algo deu errado. Tente novamente.',
        key: 'user-update',
      });
    } finally {
      setLoading({ status: false, key: 'user-update' });
    }
  };

  useEffect((): (() => void) => {
    handleCoverImageFile();
    return () => {
      setCoverImageData({ id: '', data: '' });
      setCoverImageFile(null);
    };
  }, [coverImageFile]);

  useEffect((): (() => void) => {
    handleProfileImageFile();
    return () => {
      setProfileImageData({ id: '', data: '' });
      setProfileImageFile(null);
    };
  }, [profileImageFile]);

  useEffect((): (() => void) => {
    const fetch_data = setTimeout(() => {
      getUserData();
    }, 10);
    return () => clearTimeout(fetch_data);
  }, []);

  useEffect((): (() => void) => {
    const desc = setTimeout(() => {
      if (error.status && error.key === 'user-update') {
        setError({ status: false, msg: '', key: 'user-data' });
      }
    }, 5000);
    return () => {
      clearTimeout(desc);
    };
  }, [error.status]);

  // -------------working experience functions----------------
  const [workingExperienceData, setWorkingExperienceData] = useState({
    id: '',
    carrer: '',
    end_date: '',
    start_date: '',
    description: '',
    portfolio_url: '',
    company_name: '',
  });

  const createWorkingData = (): void => {
    const generatedId = crypto.randomUUID();
    dispatch({
      type: actions.USER_DATA,
      payload: {
        ...state,
        user: {
          ...state.user,
          working_experience: [
            ...state.user.working_experience,
            { ...workingExperienceData, id: generatedId },
          ],
        },
      },
    });
    setWorkingExperienceData({
      id: '',
      carrer: '',
      end_date: '',
      start_date: '',
      description: '',
      portfolio_url: '',
      company_name: '',
    });
    userWorkingDataController();
  };

  const updateWorkingData = (id: string): void => {
    dispatch({
      type: actions.USER_DATA,
      payload: {
        ...state,
        user: {
          ...state.user,
          working_experience: state.user?.working_experience.map((item) =>
            item.id === id ? { ...item, ...workingExperienceData } : item
          ),
        },
      },
    });
    userWorkingDataController();
    setWorkingExperienceData({
      id: '',
      carrer: '',
      end_date: '',
      start_date: '',
      description: '',
      portfolio_url: '',
      company_name: '',
    });
  };

  const editWorkingData = (id: string): void => {
    setWorkingExperienceData(() => {
      return state.user.working_experience.filter((item) => {
        if (item.id === id) return item;
      })[0];
    });
    userWorkingDataController();
  };

  const removeWorkingData = (id: string) => {
    dispatch({
      type: actions.USER_DATA,
      payload: {
        ...state,
        user: {
          ...state.user,
          working_experience: state.user?.working_experience.filter(
            (item) => item.id !== id
          ),
        },
      },
    });
  };

  return (
    <Layout
      metadata={{
        title: `${complements.defaultTitle} | Editor de Perfil de Usuário`,
        updatedAt: state.user.updatedAt,
        createdAt: state.user.createdAt,
      }}>
      <Container>
        <DeleteAccountPrompt />

        {loading.status && loading.key === 'user-data' && (
          <section className='fetching-state'>
            <div>
              <DotLoader size={50} color={`rgb(${theme.primary})`} />
            </div>
            <span>Carregando...</span>
          </section>
        )}

        {!loading.status &&
          loading.key === 'user-data' &&
          error.status &&
          error.key === 'user-data' && (
            <section className='fetching-state'>
              <p>{error.msg}</p>
              <button onClick={() => router.reload()}>
                <IoReload />
                <span>Recarregar a página</span>
              </button>
            </section>
          )}

        <WorkCapturer
          setStateFn={setWorkingExperienceData}
          initialData={workingExperienceData}
          updateFn={updateWorkingData}
          saveFn={createWorkingData}
        />

        <article>
          <section className='header'>
            <h2>
              <IoPencilOutline />
              <span>Detalhes pessoais</span>
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
                    ) : state.user.cover_image?.url ? (
                      <Image
                        width={620}
                        height={220}
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
                      onClick={() => deleteAsset('cover_image')}>
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
                      Dimensões: 620 x 220 pixels.
                    </span>
                  </div>
                </section>

                <section className='form-section'>
                  <div className='image-container profile-image'>
                    {profileImageData.data ? (
                      <Image
                        width={150}
                        height={150}
                        src={profileImageData.data}
                        alt='profile image'
                      />
                    ) : state.user.profile_image?.url ? (
                      <Image
                        width={150}
                        height={150}
                        src={state.user.profile_image?.url}
                        alt='profile image'
                      />
                    ) : (
                      <IoImageOutline className='camera-icon' />
                    )}
                    <label htmlFor='avatar' title='Change profile picture'>
                      <span>Imagem de perfil</span>
                      <IoAdd />
                    </label>
                    <button
                      title='Apagar imagem de perfil'
                      className='clear-image'
                      onClick={() => deleteAsset('profile_image')}>
                      <IoTrashOutline />
                    </button>
                    <input
                      type='file'
                      id='avatar'
                      name='avatar'
                      accept='.jpg, .jpeg, .png'
                      multiple={false}
                      onChange={(e) => setProfileImageFile(e.target.files)}
                    />
                    <span className='description'>
                      Dimensões: 150 x 150 pixels.
                    </span>
                  </div>
                </section>

                <div className='data-section'>
                  <div className='description'>
                    <h2>
                      <BiUser />
                      <span>Informações Pessoais</span>
                    </h2>
                    <p>
                      Informações usadas para identificação e contato. Por
                      favor, inserir informações reais e verdadeiras para evitar
                      bloqueio de conta.
                    </p>
                  </div>

                  <div className='items-container'>
                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='first_name'>
                          <IoEllipsisHorizontal />
                          <span>Nome</span>
                        </label>
                        <input
                          type='text'
                          id='first_name'
                          name='first_name'
                          autoComplete='off'
                          placeholder='Escreva o seu nome'
                          aria-label='Escreva o seu nome'
                          required={true}
                          onChange={(e): void =>
                            e.target.value.length > 32
                              ? undefined
                              : handleChange(e)
                          }
                          value={state.user.first_name}
                        />
                        <span className='counter'>{`${
                          state.user.first_name?.length || 0
                        } / 32`}</span>
                      </div>
                      <div className='form-element'>
                        <label htmlFor='last_name'>
                          <IoEllipsisHorizontal />
                          <span>Apelido</span>
                        </label>
                        <input
                          type='text'
                          id='last_name'
                          name='last_name'
                          autoComplete='off'
                          placeholder='Escreva o seu apelido'
                          aria-label='Escreva o seu apelido'
                          value={state.user.last_name}
                          required={true}
                          onChange={(e): void =>
                            e.target.value.length > 32
                              ? undefined
                              : handleChange(e)
                          }
                        />
                        <span className='counter'>{`${
                          state.user.last_name?.length || 0
                        } / 32`}</span>
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
                          min={0}
                          inputMode='numeric'
                          id='main_phone_number'
                          name='main_phone_number'
                          placeholder='Escreva o seu número de telemóvel'
                          aria-label='Escreva o seu número de telemóvel'
                          value={state.user.main_phone_number}
                          onChange={(e): void =>
                            e.target.value.length > 9
                              ? undefined
                              : handleChange(e)
                          }
                        />
                        <span className='counter'>{`${
                          state.user.main_phone_number?.length || 0
                        } / 9`}</span>
                      </div>
                      <div className='form-element'>
                        <label htmlFor='alternative_phone_number'>
                          <IoPhonePortraitOutline />
                          <span>Número de telemóvel (Alternativo)</span>
                        </label>
                        <input
                          type='number'
                          min={0}
                          inputMode='numeric'
                          id='alternative_phone_number'
                          name='alternative_phone_number'
                          placeholder='Escreva o seu número de telemóvel'
                          aria-label='Escreva o seu número de telemóvel'
                          value={state.user.alternative_phone_number}
                          onChange={(e): void =>
                            e.target.value.length > 9
                              ? undefined
                              : handleChange(e)
                          }
                        />
                        <span className='counter'>{`${
                          state.user.alternative_phone_number?.length || 0
                        } / 9`}</span>
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
                      <div className='form-element'>
                        <label htmlFor='birth_date'>
                          <IoCalendarNumberOutline />
                          <span>Data de Nascimento</span>
                        </label>
                        <input
                          type='date'
                          min={'1950-01-01'}
                          max={'2013-01-01'}
                          id='birth_date'
                          name='birth_date'
                          onChange={(e): void => handleChange(e)}
                        />
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
                          value={state.user.bio}
                          onChange={(e): void =>
                            e.target.value.length > 128
                              ? undefined
                              : handleChange(e)
                          }
                        />
                        <span className='counter'>{`${
                          state.user.bio?.length || 0
                        } / 128`}</span>
                      </div>
                    </section>
                  </div>
                  <section className='form-section' id='genres-section'>
                    {state.user.spoken_languages.length > 0 && (
                      <div className='genres-container'>
                        {state.user.spoken_languages.map((language, index) => (
                          <div className='genre' key={index.toString()}>
                            <span>{language}</span>
                            <button
                              onClick={(): void => {
                                dispatch({
                                  type: actions.USER_DATA,
                                  payload: {
                                    ...state,
                                    user: {
                                      ...state.user,
                                      spoken_languages:
                                        state.user.spoken_languages.filter(
                                          (item) => item !== language
                                        ),
                                    },
                                  },
                                });
                              }}>
                              <IoCloseCircle />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className='form-element'>
                      <label htmlFor='spoken_languages'>
                        <IoEarthOutline />
                        <span>Línguas (máx. 5)</span>
                      </label>
                      <select
                        title='Selecione a língua'
                        onChange={(e) => {
                          dispatch({
                            type: actions.USER_DATA,
                            payload: {
                              ...state,
                              user: {
                                ...state.user,
                                spoken_languages: ((): string[] => {
                                  const value = e.target.value;
                                  const languages = state.user.spoken_languages;
                                  if (
                                    languages.some((item) => item === value) ||
                                    languages.length >= 5
                                  )
                                    return languages;
                                  return [...languages, value];
                                })(),
                              },
                            },
                          });
                        }}>
                        {user_languages
                          .sort((a, b) => (a > b ? 1 : -1))
                          .map((item, index) => (
                            <option value={item} key={index}>
                              {item}
                            </option>
                          ))}
                      </select>
                    </div>
                  </section>

                  <section className='form-section' id='genres-section'>
                    {state.user.professional_skills.length > 0 && (
                      <div className='genres-container'>
                        {state.user.professional_skills.map((skill, index) => (
                          <div className='genre' key={index.toString()}>
                            <span>{skill}</span>
                            <button
                              onClick={(): void => {
                                dispatch({
                                  type: actions.USER_DATA,
                                  payload: {
                                    ...state,
                                    user: {
                                      ...state.user,
                                      professional_skills:
                                        state.user.professional_skills.filter(
                                          (item) => item !== skill
                                        ),
                                    },
                                  },
                                });
                              }}>
                              <IoCloseCircle />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className='form-element'>
                      <label htmlFor='professional_skills'>
                        <IoConstructOutline />
                        <span>Habilidades Profissionais (máx. 10)</span>
                      </label>
                      <select
                        title='Selecione a habilidade'
                        onChange={(e) => {
                          dispatch({
                            type: actions.USER_DATA,
                            payload: {
                              ...state,
                              user: {
                                ...state.user,
                                professional_skills: ((): string[] => {
                                  const value = e.target.value;
                                  const skills = state.user.professional_skills;
                                  if (
                                    skills.some((item) => item === value) ||
                                    skills.length >= 10
                                  )
                                    return skills;
                                  return [...skills, value];
                                })(),
                              },
                            },
                          });
                        }}>
                        {user_skills
                          .sort((a, b) => (a > b ? 1 : -1))
                          .map((item, index) => (
                            <option value={item} key={index}>
                              {item}
                            </option>
                          ))}
                      </select>
                    </div>
                  </section>
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
                          onChange={(e): void =>
                            e.target.value.length > 128
                              ? undefined
                              : dispatch({
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
                                })
                          }
                        />
                        <span className='counter'>{`${
                          state.user.location?.adress?.length || 0
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
                          value={state.user.location?.zip_code}
                          onChange={(e): void =>
                            e.target.value.length > 3
                              ? undefined
                              : dispatch({
                                  type: actions.USER_DATA,
                                  payload: {
                                    ...state,
                                    user: {
                                      ...state.user,
                                      location: {
                                        ...state.user.location,
                                        zip_code: e.target.value,
                                      },
                                    },
                                  },
                                })
                          }
                        />
                        <span className='counter'>{`${
                          state.user.location?.zip_code?.length || 0
                        } / 3`}</span>
                      </div>
                    </section>
                  </div>
                </div>

                <div className='data-section'>
                  <div className='description'>
                    <h2>
                      <IoShareSocial />
                      <span>Redes e Mídias Sociais</span>
                    </h2>
                    <p>
                      Informações destacadas no seu perfil de usuário, loja e
                      compartilhada com o público para aumentar a sua audiência.
                    </p>
                  </div>

                  <div className='items-container'>
                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='whatsapp'>
                          <IoLogoWhatsapp />
                          <span>Whatsapp</span>
                        </label>
                        <input
                          type='url'
                          id='whatsapp'
                          placeholder='Contacto do Whatsapp'
                          aria-label='Whatsapp'
                          value={state.user.social_network?.whatsapp}
                          autoComplete='off'
                          onChange={(e): void => {
                            dispatch({
                              type: actions.USER_DATA,
                              payload: {
                                ...state,
                                user: {
                                  ...state.user,
                                  social_network: {
                                    ...state.user.social_network,
                                    whatsapp: e.target.value,
                                  },
                                },
                              },
                            });
                          }}
                        />
                      </div>
                      <div className='form-element'>
                        <label htmlFor='facebook'>
                          <IoLogoFacebook />
                          <span>Facebook</span>
                        </label>
                        <input
                          type='url'
                          id='facebook'
                          placeholder='Link do perfil de facebook'
                          autoComplete='off'
                          aria-label='facebook'
                          value={state.user.social_network?.facebook}
                          onChange={(e): void => {
                            dispatch({
                              type: actions.USER_DATA,
                              payload: {
                                ...state,
                                user: {
                                  ...state.user,
                                  social_network: {
                                    ...state.user.social_network,
                                    facebook: e.target.value,
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
                        <label htmlFor='website'>
                          <FaBlog />
                          <span>Website</span>
                        </label>
                        <input
                          type='url'
                          autoComplete='off'
                          id='website'
                          placeholder='Link do website ou blog'
                          aria-label='website'
                          value={state.user.social_network?.website}
                          onChange={(e): void => {
                            dispatch({
                              type: actions.USER_DATA,
                              payload: {
                                ...state,
                                user: {
                                  ...state.user,
                                  social_network: {
                                    ...state.user.social_network,
                                    website: e.target.value,
                                  },
                                },
                              },
                            });
                          }}
                        />
                      </div>
                      <div className='form-element'>
                        <label htmlFor='instagram'>
                          <IoLogoInstagram />
                          <span>Instagram</span>
                        </label>
                        <input
                          type='url'
                          id='instagram'
                          autoComplete='off'
                          placeholder='Link do perfil do instagram'
                          aria-label='instagram'
                          value={state.user.social_network?.instagram}
                          onChange={(e): void => {
                            dispatch({
                              type: actions.USER_DATA,
                              payload: {
                                ...state,
                                user: {
                                  ...state.user,
                                  social_network: {
                                    ...state.user.social_network,
                                    instagram: e.target.value,
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
                        <label htmlFor='linkedin'>
                          <FaLinkedinIn />
                          <span>Linkedin</span>
                        </label>
                        <input
                          type='text'
                          id='linkedin'
                          placeholder='Link do perfil do linkedin'
                          autoComplete='off'
                          aria-label='linkedin'
                          value={state.user.social_network?.linkedin}
                          onChange={(e): void => {
                            dispatch({
                              type: actions.USER_DATA,
                              payload: {
                                ...state,
                                user: {
                                  ...state.user,
                                  social_network: {
                                    ...state.user.social_network,
                                    linkedin: e.target.value,
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

                <div className='data-section'>
                  <div className='description'>
                    <h2>
                      <IoKey />
                      <span>Atualização de Senhas</span>
                    </h2>
                    <p>
                      Por favor, evite usar senhas fracas e já utilizadas
                      anteriormente em outros sites para melhorar a segurança da
                      sua conta.
                    </p>
                  </div>

                  <div className='items-container'>
                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='password'>
                          <IoLockOpenOutline />
                          <span>Nova senha</span>
                        </label>
                        <input
                          type='password'
                          id='password'
                          name='password'
                          minLength={8}
                          aria-hidden='true'
                          autoComplete='off'
                          placeholder='Escreva a sua nova senha'
                          aria-label='Escreva a sua nova senha'
                          onChange={(e): void => handlePasswordsChange(e)}
                        />
                      </div>
                      <div className='form-element'>
                        <label htmlFor='confirm_password'>
                          <IoLockClosedOutline />
                          <span>Confirme a senha</span>
                        </label>
                        <input
                          type='password'
                          id='confirm_password'
                          name='confirm_password'
                          aria-hidden='true'
                          autoComplete='off'
                          minLength={8}
                          placeholder='Confirme a sua senha'
                          aria-label='Confirme a sua senha'
                          onChange={(e): void => handlePasswordsChange(e)}
                        />
                      </div>
                    </section>
                  </div>
                </div>

                <section className={'working-data-container'}>
                  <div className='description'>
                    <h2>
                      <IoBriefcase />
                      <span>Experiência Profissional</span>
                    </h2>
                    <p>
                      Adicione informações relativas a sua experiência ou campo
                      de atuação profissional.
                    </p>
                  </div>
                  <section className='cards-container'>
                    {state.user.working_experience.length > 0 ? (
                      state.user.working_experience.map((item) => (
                        <div className='card' key={item?.id}>
                          <div className='info'>
                            {item.carrer && (
                              <div className='item'>
                                <h3>
                                  <IoConstructOutline />
                                  <span>Carreira Profissional</span>
                                </h3>
                                <p>{item.carrer}</p>
                              </div>
                            )}
                            {item.company_name && (
                              <div className='item'>
                                <h3>
                                  <IoExtensionPuzzleOutline />
                                  <span>Empresa ou Entidade Empregadora</span>
                                </h3>
                                <p>{item.company_name}</p>
                              </div>
                            )}
                            {item.start_date && (
                              <div className='item dates'>
                                <h3>
                                  <IoWatchOutline />
                                  <span>Período de Trabalho</span>
                                </h3>
                                <span>
                                  De {moment(item.start_date).format('LL')} à{' '}
                                  {moment(item.end_date).format('LL')}
                                </span>
                              </div>
                            )}
                            {item.portfolio_url && (
                              <div className='item'>
                                <h3>
                                  <IoLinkOutline />
                                  <span>Endereço do Portifólio</span>
                                </h3>
                                <p>{item.portfolio_url}</p>
                              </div>
                            )}
                            {item.description && (
                              <div className='item'>
                                <h3>
                                  <IoFlowerOutline />
                                  <span>Anotações</span>
                                </h3>
                                <p>{item.description}</p>
                              </div>
                            )}
                          </div>
                          <div className='actions'>
                            <button
                              onClick={(e): void => {
                                e.preventDefault();
                                editWorkingData(item.id);
                              }}>
                              <IoPencil />
                              <span>Editar</span>
                            </button>
                            <button
                              className='delete-btn'
                              onClick={(): void => removeWorkingData(item.id)}>
                              <IoCloseCircle />
                              <span>Eliminar</span>
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className='no-data-container'>
                        <IoClipboardOutline />
                        <h3>
                          <span>Sem experiência profissional</span>
                        </h3>
                      </div>
                    )}
                  </section>
                  <button
                    className='add-url'
                    onClick={(e) => {
                      e.preventDefault();
                      userWorkingDataController();
                    }}>
                    <IoAdd />
                    <span>Adicionar Experiência Profissional</span>
                  </button>
                </section>
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
                      padrão, públicas, exceto as suas senhas, dados de
                      localização e algumas informações pessoais como gênero,
                      data de nascimento e seu endereço exato (utilizado apenas
                      para entregas).
                    </p>
                  </>
                )}

                {error.status &&
                  error.key === 'user-update' &&
                  !loading.status && (
                    <h3 className='error-message'>{error.msg}</h3>
                  )}

                {loading.status &&
                  loading.key === 'user-update' &&
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
                  <span>Remoção de Dados e Conta</span>
                </h2>
                <p>Remover todos os seus dados e apagar a conta.</p>
              </div>
              <section>
                <span> Cuidado, essa ação é irreversível.</span>
              </section>
              <button className='save' onClick={deleteAccountPromptController}>
                <IoTrash />
                <span>Apagar dados</span>
              </button>
            </section>
          </section>
        </article>
      </Container>
    </Layout>
  );
};

export default ProfileEditor;
