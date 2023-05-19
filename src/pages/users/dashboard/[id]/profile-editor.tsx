import {
  IoAdd,
  IoBookmarkOutline,
  IoCalendarNumberOutline,
  IoClipboardOutline,
  IoCloseCircle,
  IoConstructOutline,
  IoCreateOutline,
  IoEarthOutline,
  IoEllipsisHorizontal,
  IoHeartHalfOutline,
  IoHomeOutline,
  IoImageOutline,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoWhatsapp,
  IoPencil,
  IoPencilOutline,
  IoPhonePortraitOutline,
  IoPlanetOutline,
  IoReload,
  IoStar,
  IoTrashOutline,
} from 'react-icons/io5';
import Layout from '@/components/Layout';
import { useAppContext } from '@/context/AppContext';
import { actions } from '@/data/reducer-actions';
import { UserProfileContainer as Container } from '@/styles/common/user-profile';
import { NextRouter, useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { DotLoader } from 'react-spinners';
import { useTheme } from 'styled-components';
import { InputEvents, SubmitEvent } from '../../../../../@types';
import Notification from '../../../../components/PushNotification';
import UserWorkingData from '../../../../components/modals/UserWorkingData';
import Compressor from 'compressorjs';
import countries from '../../../../data/countries.json';
import user_skills from '../../../../data/professional-skills.json';
import user_languages from '../../../../data/languages.json';
import { FaBlog, FaLinkedinIn } from 'react-icons/fa';

export default function ProfileEditor() {
  const theme = useTheme();
  const router: NextRouter = useRouter();
  const { state, fetchAPI, dispatch, userWorkingDataController } =
    useAppContext();

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
  const [countryStates, setCountryStates] = useState<string[]>([]);
  const [coverImageFile, setCoverImageFile] = useState<FileList | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<FileList | null>(
    null
  );
  const [coverImageData, setCoverImageData] = useState({
    id: '',
    data: '',
    blurhash: '',
  });
  const [profileImageData, setProfileImageData] = useState({
    id: '',
    data: '',
    blurhash: '',
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
              blurhash: '',
            });
          };
        },
      });
    }
  }

  function handleProfileImageFile(): void {
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
              blurhash: '',
            });
          };
        },
      });
    }
  }

  function deleteProfileImage() {
    fetchAPI({
      method: 'delete',
      url: `/api/v1/users/account/assets`,
      data: { image: state.user.profile_image?.id },
    })
      .then(() => {
        setProfileImageData({
          id: '',
          data: '',
          blurhash: '',
        });
        dispatch({
          type: actions.USER_DATA,
          payload: {
            ...state,
            user: {
              ...state.user,
              profile_image: {
                id: '',
                url: '',
                blurhash: '',
              },
            },
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function deleteCoverImage() {
    fetchAPI({
      method: 'delete',
      url: `/api/v1/users/account/assets`,
      data: { image: state.user.cover_image?.id },
    })
      .then(() => {
        setCoverImageData({
          id: '',
          data: '',
          blurhash: '',
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
                blurhash: '',
              },
            },
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getUserData(): void {
    setLoading({ status: true, key: 'user-data' });
    fetchAPI({
      method: 'get',
      url: `/api/v1/users/account/${router.query?.id || state.userAuth.id}`,
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
  }

  // function handleNotifications(message: string): void {
  //   setFeedBackMessage(() => {
  //     if (message.includes('. '))
  //       return message.split('.').join('.\n');
  //     return message;
  //   });
  //   setIsPushNotifierActive(true);
  //   setTimeout(() => {
  //     setIsPushNotifierActive(false);
  //     setFeedBackMessage('');
  //   }, 1000 * 60 * 5);
  // }

  async function handleSubmit(e: SubmitEvent): Promise<void> {
    e.preventDefault();
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
      const { data } = await fetchAPI({
        method: 'patch',
        url: `/api/v1/users/account`,
        data: {
          first_name: state.user.first_name,
          last_name: state.user.last_name,
          main_phone_number: state.user.main_phone_number,
          alternative_phone_number: state.user.alternative_phone_number,
          gender: state.user.gender,
          birth_date: state.user.birth_date,
          bio: state.user.bio,
          cover_image: coverImageData,
          profile_image: profileImageData,
          professional_skills: state.user.professional_skills,
          spoken_languages: state.user.spoken_languages,
          location: state.user.location,
          social_network: state.user.social_network,
          working_experience: state.user.working_experience,
        },
      });
      dispatch({
        type: actions.USER_DATA,
        payload: {
          ...state,
          user: { ...data },
        },
      });
      console.log(data);
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
  }

  useEffect((): void => {
    handleCoverImageFile();
    return () => {
      setCoverImageData({ id: '', data: '', blurhash: '' });
      setCoverImageFile(null);
    };
  }, [coverImageFile]);

  useEffect((): void => {
    handleProfileImageFile();
    return () => {
      setProfileImageData({ id: '', data: '', blurhash: '' });
      setProfileImageFile(null);
    };
  }, [profileImageFile]);

  useEffect(() => {
    const fetch_data = setTimeout(() => {
      getUserData();
    }, 10);
    return () => clearTimeout(fetch_data);
  }, []);

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

  function createWorkingData(): void {
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
  }

  function updateWorkingData(id: string): void {
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
  }

  function editWorkingData(id: string) {
    setWorkingExperienceData(() => {
      return state.user.working_experience.filter((item) => {
        if (item.id === id) return item;
      })[0];
    });
    userWorkingDataController();
  }

  function removeWorkingData(id: string) {
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
  }

  // -----------educational experience functions-----------------

  return (
    <Layout>
      <Container>
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

        <UserWorkingData
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
              <p>Preencha as informações</p>
            </h2>
            <span>Edite e salve as alterações</span>
          </section>

          <section className='data-container'>
            <section className='wrapper'>
              <section className='form' onSubmit={handleSubmit}>
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
                      <span>Selecionar imagem de capa</span>
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

                <section className='form-section'>
                  <div className='image-container profile-image'>
                    {profileImageData.data ? (
                      <img src={profileImageData.data} alt='profile image' />
                    ) : state.user.profile_image?.url ? (
                      <img
                        src={state.user.profile_image?.url}
                        alt='profile image'
                      />
                    ) : (
                      <IoImageOutline className='camera-icon' />
                    )}
                    <label htmlFor='avatar' title='Change profile picture'>
                      <span>Selecionar imagem de perfil</span>
                      <IoAdd />
                    </label>
                    <button
                      title='Apagar imagem de perfil'
                      className='clear-image'
                      onClick={deleteProfileImage}>
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
                  </div>
                </section>

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
                      onChange={(e): void => handleChange(e)}
                      value={state.user.first_name}
                    />
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
                      onChange={(e): void => handleChange(e)}
                    />
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
                  <div className='form-element'>
                    <label htmlFor='birth_date'>
                      <IoCalendarNumberOutline />
                      <span>Data de Nascimento</span>
                    </label>
                    <input
                      type='date'
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
                      onChange={(e): void => handleChange(e)}
                      value={state.user.bio}
                    />
                  </div>
                </section>

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
                    <label htmlFor='main_phone_number'>
                      <IoStar />
                      <span>Provícia / Estado</span>
                    </label>
                    <select
                      name='country'
                      id='country'
                      value={state.user.location?.state}
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
                  <div className='form-element'>
                    <label htmlFor='zip_code'>
                      <IoBookmarkOutline />
                      <span>Código Postal</span>
                    </label>
                    <input
                      type='text'
                      id='zip_code'
                      name='zip_code'
                      maxLength={5}
                      placeholder='Escreva o seu código postal'
                      aria-label='Escreva o seu código postal'
                      value={state.user.location?.zip_code}
                      onChange={(e): void => {
                        dispatch({
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
                        });
                      }}
                    />
                  </div>
                </section>

                <section className='form-section'>
                  <div className='form-element'>
                    <label htmlFor='whatsapp'>
                      <IoLogoWhatsapp />
                      <span>Whatsapp</span>
                    </label>
                    <input
                      type='text'
                      id='whatsapp'
                      placeholder='Contacto do Whatsapp'
                      aria-label='Whatsapp'
                      value={state.user.social_network?.whatsapp}
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
                      type='text'
                      id='facebook'
                      placeholder='Link do perfil de facebook'
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
                      type='text'
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
                      type='text'
                      id='instagram'
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

                <section className={'working-data-container'}>
                  <h2>
                    <span>Experiência Profissional</span>
                  </h2>
                  <section className='cards-container'>
                    {state.user.working_experience.length > 0 ? (
                      state.user.working_experience.map((item) => (
                        <div className='card' key={item?.id}>
                          <div className='info'>
                            {item.carrer && (
                              <div className='item'>
                                <h3>
                                  <span>Carreira Profissional</span>
                                </h3>
                                <p>{item.carrer}</p>
                              </div>
                            )}
                            {item.company_name && (
                              <div className='item'>
                                <h3>
                                  <span>Empresa ou Entidade Empregadora</span>
                                </h3>
                                <p>{item.company_name}</p>
                              </div>
                            )}
                            {item.start_date && (
                              <div className='item dates'>
                                <h3>
                                  <span>Período de Trabalho</span>
                                </h3>
                                <span>
                                  De {item.start_date} à {item.start_date}
                                </span>
                              </div>
                            )}
                            {item.portfolio_url && (
                              <div className='item'>
                                <h3>
                                  <span>Endereço do Portifólio</span>
                                </h3>
                                <p>{item.portfolio_url}</p>
                              </div>
                            )}
                            {item.description && (
                              <div className='item'>
                                <h3>
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
          </section>
        </article>
      </Container>
    </Layout>
  );
}
