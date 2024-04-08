import { DropzoneArea } from '@/components/dropzone';
import Layout from '@/components/layout';
import { DeleteAccountPrompt } from '@/components/modals/delete-account-prompt';
import {
  WorkDataPrompt,
  initialExperienceState
} from '@/components/modals/work-data-prompt';
import { useAppContext } from '@/context/AppContext';
import { constants } from '@/data/constants';
import Countries from '@/data/countries.json';
import Languages from '@/data/languages.json';
import Skills from '@/data/professional-skills.json';
import { errorTransformer } from '@/lib/error-transformer';
import { actions } from '@/shared/actions';
import { _userProfile as Container } from '@/styles/common/profile-editor';
import type { HttpError, InputEvents, User } from '@/types';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import { BiUser, BiUserCheck, BiUserX } from 'react-icons/bi';
import { FaBlog, FaLinkedinIn } from 'react-icons/fa';
import * as Io from 'react-icons/io5';
import { DotLoader, PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';

type TLoading = { status: boolean; key: 'user-data' | 'user-update' };

const initialUserState: User = {
  _id: '',
  first_name: '',
  last_name: '',
  email: '',
  main_phone_number: '',
  alternative_phone_number: '',
  gender: 'Masculino',
  birth_date: '',
  bio: '',
  cover_image: { id: '', url: '' },
  profile_image: { id: '', url: '' },
  professional_skills: [],
  spoken_languages: [],
  working_experience: [],
  location: { country: '', state: '', address: '', zip_code: '' },
  social_network: { website: '', whatsapp: '', instagram: '', facebook: '', linkedin: '' },
  createdAt: '',
  updatedAt: ''
};

export default function Page() {
  const {
    state,
    httpClient,
    dispatch,
    userWorkingDataController,
    deleteAccountPromptController
  } = useAppContext();
  const theme = useTheme();
  const router = useRouter();
  const [passwords, setPasswords] = React.useState({ password: '', confirm_password: '' });
  const [formData, setFormData] = React.useState<User>(initialUserState);
  const [coverImage, setCoverImage] = React.useState<string>('');
  const [profileImage, setProfileImage] = React.useState<string>('');
  const [loading, setLoading] = React.useState<TLoading>({
    status: false,
    key: 'user-data'
  });

  const currentCountryStates = React.useMemo(() => {
    for (const { country, states } of Countries) {
      if (country === formData.location.country) {
        return states.sort((a, b) => (a > b ? 1 : -1));
      }
    }
    return [];
  }, [formData.location.country]);

  const handleChange = (e: InputEvents) => {
    setFormData((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const handlePasswordsChange = (e: InputEvents) => {
    setPasswords((state) => ({
      ...state,
      [e.target.name]: e.target.value
    }));
  };
[({})]
  const getUserData = React.useCallback(async () => {
    setLoading({ status: true, key: 'user-data' });
    try {
      const { data } = await httpClient<User>({
        method: 'get',
        url: `/api/v1/users/account/${router.query['id'] || state.auth.id}`
      });
      setFormData((state) => ({ ...state, ...data }));
      setProfileImage(data.profile_image.url);
      setCoverImage(data.cover_image.url);
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message);
      console.error(error);
    } finally {
      setLoading({ status: false, key: 'user-data' });
    }
  }, [router.query]);

  const onUpdate = async () => {
    try {
      setLoading({ status: true, key: 'user-update' });
      if (passwords.confirm_password !== '') {
        if (passwords.confirm_password !== passwords.password) {
          return toast.error('A as senhas devem ser iguais e maiores que 8 carácteres.');
        }
      }

      // delete undesired data and make some transformations
      const { social_network, ...rest }: Partial<User> = formData;
      delete rest._id;
      delete rest.createdAt;
      delete rest.updatedAt;
      delete rest.cover_image;
      delete rest.profile_image;

      const { data } = await httpClient<User>({
        method: 'patch',
        url: `/api/v1/users/account`,
        data: {
          ...rest,
          coverImage,
          profileImage,
          password: passwords.password || undefined,
          social_network: Object.entries(social_network ?? {})
            .map(([key, value]) => (value ? { [key]: value } : undefined))
            .reduce((acc, value) => ({ ...acc, ...value }), {})
        }
      });

      setFormData((state) => ({ ...state, ...data }));
      setProfileImage(data.profile_image.url);
      setCoverImage(data.cover_image.url);
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message);
      console.error(error);
    } finally {
      setLoading({ status: false, key: 'user-update' });
    }
  };

  React.useEffect(() => {
    const instance = setTimeout(() => {
      getUserData();
    }, 100);
    return () => clearTimeout(instance);
  }, []);

  // -------working capturer functions--------
  const [workingExperienceData, setWorkingExperienceData] =
    React.useState(initialExperienceState);

  const createWorkingData = () => {
    const generatedId = crypto.randomUUID();
    dispatch({
      type: actions.USER_DATA,
      payload: {
        ...state,
        user: {
          ...state.user,
          working_experience: [
            ...state.user.working_experience,
            { ...workingExperienceData, id: generatedId }
          ]
        }
      }
    });
    setWorkingExperienceData(initialExperienceState);
    userWorkingDataController();
  };

  const updateWorkingData = (id: string) => {
    dispatch({
      type: actions.USER_DATA,
      payload: {
        ...state,
        user: {
          ...state.user,
          working_experience: state.user.working_experience.map((item) =>
            item.id === id ? { ...item, ...workingExperienceData } : item
          )
        }
      }
    });
    userWorkingDataController();
    setWorkingExperienceData(initialExperienceState);
  };

  const editWorkingData = (id: string) => {
    setWorkingExperienceData(
      () => state.user.working_experience.filter((item) => item.id === id)[0]
    );
    userWorkingDataController();
  };

  const removeWorkingData = (id: string) => {
    dispatch({
      type: actions.USER_DATA,
      payload: {
        ...state,
        user: {
          ...state.user,
          working_experience: state.user.working_experience.filter((item) => item.id !== id)
        }
      }
    });
  };

  return (
    <Layout
      metadata={{
        title: `${constants.defaultTitle} | Perfil de Usuário`,
        updatedAt: formData.updatedAt,
        createdAt: formData.createdAt
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

        <WorkDataPrompt
          setStateFn={setWorkingExperienceData}
          initialData={workingExperienceData}
          updateFn={updateWorkingData}
          saveFn={createWorkingData}
        />

        <article>
          <section className='header'>
            <h2>
              <Io.IoPencilOutline />
              <span>Detalhes pessoais</span>
            </h2>
            <span className='details'>Salve após fazer alterações!</span>
          </section>

          <section className='data-container'>
            <section className='wrapper'>
              <section className='form'>
                <section className='form-section'>
                  <div className='cover-image-container'>
                    {coverImage ? (
                      <>
                        <Image
                          width={620}
                          height={220}
                          className='cover-image'
                          src={coverImage}
                          alt='cover image'
                        />
                        <button
                          title='Apagar Imagem de Capa'
                          onClick={() => setCoverImage('')}>
                          <Io.IoCloseOutline />
                        </button>
                      </>
                    ) : (
                      <div className='cover-image-drop-container'>
                        <DropzoneArea
                          width={620}
                          height={220}
                          handler={(encodedImage) => setCoverImage(encodedImage)}
                        />
                      </div>
                    )}
                  </div>
                </section>

                <section className='form-section'>
                  <div className='profile-image-container'>
                    {profileImage ? (
                      <>
                        <Image
                          width={150}
                          height={150}
                          src={profileImage}
                          alt='Imagem de perfil do usuário'
                        />
                        <button
                          title='Apagar Imagem de Perfil'
                          onClick={() => setProfileImage('')}>
                          <Io.IoCloseOutline />
                        </button>
                      </>
                    ) : (
                      <div className='profile-image-drop-container'>
                        <DropzoneArea
                          width={150}
                          height={150}
                          handler={(encodedImage) => setProfileImage(encodedImage)}
                        />
                      </div>
                    )}
                  </div>
                </section>

                <div className='data-section'>
                  <div className='description'>
                    <h2>
                      <BiUser />
                      <span>Informações Pessoais</span>
                    </h2>
                    <p>
                      Informações usadas para identificação e contato. Por favor, inserir
                      informações reais e verdadeiras para evitar bloqueio de conta.
                    </p>
                  </div>

                  <div className='items-container'>
                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='first_name'>
                          <Io.IoEllipsisHorizontal />
                          <span>Nome</span>
                        </label>
                        <input
                          type='text'
                          id='first_name'
                          name='first_name'
                          placeholder='Escreva o seu nome'
                          required={true}
                          onChange={handleChange}
                          value={formData.first_name}
                        />
                        <span className='counter'>{`${formData.first_name.length} / 32`}</span>
                      </div>
                      <div className='form-element'>
                        <label htmlFor='last_name'>
                          <Io.IoEllipsisHorizontal />
                          <span>Apelido</span>
                        </label>
                        <input
                          type='text'
                          id='last_name'
                          name='last_name'
                          placeholder='Escreva o seu apelido'
                          required={true}
                          value={formData.last_name}
                          onChange={handleChange}
                        />
                        <span className='counter'>{`${
                          formData.last_name?.length || 0
                        } / 32`}</span>
                      </div>
                    </section>
                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='main_phone_number'>
                          <Io.IoPhonePortraitOutline />
                          <span>Número de telemóvel (Principal)</span>
                        </label>
                        <input
                          minLength={0}
                          maxLength={9}
                          inputMode='tel'
                          type='tel'
                          id='main_phone_number'
                          name='main_phone_number'
                          placeholder='Escreva o seu número de telemóvel'
                          value={formData.main_phone_number}
                          onChange={handleChange}
                        />
                        <span className='counter'>{`${formData.main_phone_number.length} / 9`}</span>
                      </div>
                      <div className='form-element'>
                        <label htmlFor='alternative_phone_number'>
                          <Io.IoPhonePortraitOutline />
                          <span>Número de telemóvel (Alternativo)</span>
                        </label>
                        <input
                          minLength={0}
                          maxLength={9}
                          type='tel'
                          inputMode='tel'
                          id='alternative_phone_number'
                          name='alternative_phone_number'
                          placeholder='Escreva o seu número de telemóvel'
                          value={formData.alternative_phone_number}
                          onChange={handleChange}
                        />
                        <span className='counter'>{`${formData.alternative_phone_number.length} / 9`}</span>
                      </div>
                    </section>
                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='main_phone_number'>
                          <Io.IoHeartHalfOutline />
                          <span>Gênero</span>
                        </label>
                        <select
                          id='gender'
                          name='gender'
                          value={formData.gender}
                          onChange={handleChange}>
                          <option value='Masculino'>Masculino</option>
                          <option value='Feminino'>Feminino</option>
                          <option value='Outro'>Outro</option>
                        </select>
                      </div>
                      <div className='form-element'>
                        <label htmlFor='birth_date'>
                          <Io.IoCalendarNumberOutline />
                          <span>Data de Nascimento</span>
                        </label>
                        <input
                          type='date'
                          id='birth_date'
                          name='birth_date'
                          min={'1950-01-01'}
                          max={'2013-01-01'}
                          onChange={handleChange}
                        />
                      </div>
                    </section>

                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='bio'>
                          <Io.IoCreateOutline />
                          <span>Biografia</span>
                        </label>
                        <input
                          type='text'
                          id='bio'
                          name='bio'
                          minLength={0}
                          maxLength={128}
                          placeholder='Escreva uma breve biografia para o seu perfil'
                          value={formData.bio}
                          onChange={handleChange}
                        />
                        <span className='counter'>{`${formData.bio.length} / 128`}</span>
                      </div>
                    </section>
                  </div>
                  <section className='form-section' id='genres-section'>
                    {formData.spoken_languages.length > 0 && (
                      <div className='genres-container'>
                        {formData.spoken_languages.map((language, i) => (
                          <div className='genre' key={i}>
                            <span>{language}</span>
                            <button
                              onClick={() =>
                                setFormData((state) => ({
                                  ...state,
                                  spoken_languages: state.spoken_languages.filter(
                                    (item) => item !== language
                                  )
                                }))
                              }>
                              <Io.IoCloseCircle />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className='form-element'>
                      <label htmlFor='spoken_languages'>
                        <Io.IoEarthOutline />
                        <span>Línguas (máx. 5)</span>
                      </label>
                      <select
                        title='Selecione a língua'
                        onChange={(e) => {
                          setFormData((state) => ({
                            ...state,
                            spoken_languages: ((): string[] => {
                              const value = e.target.value;
                              const languages = state.spoken_languages;
                              const isPicked = languages.some((item) => item === value);
                              if (isPicked || languages.length >= 5) return languages;
                              return [...languages, value];
                            })()
                          }));
                        }}>
                        {Languages.sort((a, b) => (a > b ? 1 : -1)).map((item, i) => (
                          <option value={item} key={i}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  </section>

                  <section className='form-section' id='genres-section'>
                    {formData.professional_skills.length > 0 && (
                      <div className='genres-container'>
                        {formData.professional_skills.map((skill, i) => (
                          <div className='genre' key={i}>
                            <span>{skill}</span>
                            <button
                              onClick={() =>
                                setFormData((state) => ({
                                  ...state,
                                  professional_skills: state.professional_skills.filter(
                                    (item) => item !== skill
                                  )
                                }))
                              }>
                              <Io.IoCloseCircle />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className='form-element'>
                      <label htmlFor='professional_skills'>
                        <Io.IoConstructOutline />
                        <span>Habilidades Profissionais (máx. 10)</span>
                      </label>
                      <select
                        title='Selecione a habilidade'
                        onChange={(e) => {
                          setFormData((state) => ({
                            ...state,
                            professional_skills: ((): string[] => {
                              const value = e.target.value;
                              const skills = state.professional_skills;
                              const isPicked = skills.some((item) => item === value);
                              if (isPicked || skills.length >= 10) return skills;
                              return [...skills, value];
                            })()
                          }));
                        }}>
                        {Skills.sort((a, b) => (a > b ? 1 : -1)).map((item, i) => (
                          <option value={item} key={i}>
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
                      <Io.IoLocation />
                      <span>Localização e Endereço</span>
                    </h2>
                    <p>Informações usadas para entregas de compras feitas nas lojas.</p>
                  </div>

                  <div className='items-container'>
                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='country'>
                          <Io.IoPlanetOutline />
                          <span>País</span>
                        </label>
                        <select
                          name='country'
                          id='country'
                          value={formData.location.country}
                          onChange={(e) =>
                            setFormData((state) => ({
                              ...state,
                              location: { ...state.location, country: e.target.value }
                            }))
                          }>
                          {Countries.sort((a, b) => (a.country > b.country ? 1 : -1)).map(
                            ({ country }, i) => (
                              <option value={country} key={i}>
                                {country}
                              </option>
                            )
                          )}
                        </select>
                      </div>

                      <div className='form-element'>
                        <label htmlFor='state'>
                          <Io.IoStar />
                          <span>Província / Estado</span>
                        </label>
                        <select
                          name='state'
                          id='state'
                          value={formData.location.state}
                          defaultValue={formData.location.state}
                          onChange={(e) =>
                            setFormData((state) => ({
                              ...state,
                              location: { ...state.location, state: e.target.value }
                            }))
                          }>
                          {currentCountryStates.map((item, i) => (
                            <option value={item} key={i}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>
                    </section>
                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='address'>
                          <Io.IoHomeOutline />
                          <span>Endereço</span>
                        </label>
                        <input
                          type='text'
                          id='address'
                          placeholder='Endereço'
                          maxLength={128}
                          value={formData.location?.address}
                          onChange={(e) =>
                            setFormData((state) => ({
                              ...state,
                              location: { ...state.location, address: e.target.value }
                            }))
                          }
                        />
                        <span className='counter'>{`${formData.location?.address?.length} / 128`}</span>
                      </div>
                      <div className='form-element'>
                        <label htmlFor='zip_code'>
                          <Io.IoBookmarkOutline />
                          <span>Código Postal</span>
                        </label>
                        <input
                          type='text'
                          id='zip_code'
                          name='zip_code'
                          placeholder='Escreva o seu código postal'
                          value={formData.location?.zip_code}
                          minLength={0}
                          maxLength={3}
                          onChange={(e) =>
                            setFormData((state) => ({
                              ...state,
                              location: { ...state.location, zip_code: e.target.value }
                            }))
                          }
                        />
                        <span className='counter'>{`${formData.location?.zip_code?.length} / 3`}</span>
                      </div>
                    </section>
                  </div>
                </div>

                <div className='data-section'>
                  <div className='description'>
                    <h2>
                      <Io.IoShareSocial />
                      <span>Redes e Mídias Sociais</span>
                    </h2>
                    <p>
                      Informações destacadas no seu perfil de usuário, loja e compartilhada
                      com o público para aumentar a sua audiência.
                    </p>
                  </div>

                  <div className='items-container'>
                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='whatsapp'>
                          <Io.IoLogoWhatsapp />
                          <span>Whatsapp</span>
                        </label>
                        <input
                          type='url'
                          id='whatsapp'
                          placeholder='Contacto do Whatsapp'
                          value={formData.social_network?.whatsapp}
                          onChange={(e) => {
                            setFormData((state) => ({
                              ...state,
                              social_network: {
                                ...state.social_network,
                                whatsapp: e.target.value
                              }
                            }));
                          }}
                        />
                      </div>
                      <div className='form-element'>
                        <label htmlFor='facebook'>
                          <Io.IoLogoFacebook />
                          <span>Facebook</span>
                        </label>
                        <input
                          type='url'
                          id='facebook'
                          placeholder='Link do perfil de facebook'
                          value={formData.social_network?.facebook}
                          onChange={(e) => {
                            setFormData((state) => ({
                              ...state,
                              social_network: {
                                ...state.social_network,
                                facebook: e.target.value
                              }
                            }));
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
                          id='website'
                          placeholder='Link do website ou blog'
                          value={formData.social_network?.website}
                          onChange={(e) => {
                            setFormData((state) => ({
                              ...state,
                              social_network: {
                                ...state.social_network,
                                website: e.target.value
                              }
                            }));
                          }}
                        />
                      </div>
                      <div className='form-element'>
                        <label htmlFor='instagram'>
                          <Io.IoLogoInstagram />
                          <span>Instagram</span>
                        </label>
                        <input
                          type='url'
                          id='instagram'
                          placeholder='Link do perfil do instagram'
                          value={formData.social_network?.instagram}
                          onChange={(e) => {
                            setFormData((state) => ({
                              ...state,
                              social_network: {
                                ...state.social_network,
                                instagram: e.target.value
                              }
                            }));
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
                          value={formData.social_network?.linkedin}
                          onChange={(e) => {
                            setFormData((state) => ({
                              ...state,
                              social_network: {
                                ...state.social_network,
                                linkedin: e.target.value
                              }
                            }));
                          }}
                        />
                      </div>
                    </section>
                  </div>
                </div>

                <div className='data-section'>
                  <div className='description'>
                    <h2>
                      <Io.IoKey />
                      <span>Atualização de Senhas</span>
                    </h2>
                    <p>
                      Por favor, evite usar senhas fracas e já utilizadas anteriormente em
                      outros sites para melhorar a segurança da sua conta.
                    </p>
                  </div>

                  <div className='items-container'>
                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='password'>
                          <Io.IoLockOpenOutline />
                          <span>Nova senha</span>
                        </label>
                        <input
                          type='password'
                          id='password'
                          name='password'
                          minLength={8}
                          placeholder='Escreva a sua nova senha'
                          onChange={handlePasswordsChange}
                        />
                      </div>
                      <div className='form-element'>
                        <label htmlFor='confirm_password'>
                          <Io.IoLockClosedOutline />
                          <span>Confirme a senha</span>
                        </label>
                        <input
                          type='password'
                          id='confirm_password'
                          name='confirm_password'
                          minLength={8}
                          placeholder='Confirme a sua senha'
                          onChange={handlePasswordsChange}
                        />
                      </div>
                    </section>
                  </div>
                </div>

                <section className={'working-data-container'}>
                  <div className='description'>
                    <h2>
                      <Io.IoBriefcase />
                      <span>Experiência Profissional</span>
                    </h2>
                    <p>
                      Adicione informações relativas a sua experiência ou campo de atuação
                      profissional.
                    </p>
                  </div>
                  <section className='cards-container'>
                    {formData.working_experience.length > 0 ? (
                      formData.working_experience.map((item) => (
                        <div className='card' key={item.id}>
                          <div className='info'>
                            {item.career && (
                              <div className='item'>
                                <h3>
                                  <Io.IoConstructOutline />
                                  <span>Carreira Profissional</span>
                                </h3>
                                <p>{item.career}</p>
                              </div>
                            )}
                            {item.company_name && (
                              <div className='item'>
                                <h3>
                                  <Io.IoExtensionPuzzleOutline />
                                  <span>Empresa ou Entidade Empregadora</span>
                                </h3>
                                <p>{item.company_name}</p>
                              </div>
                            )}
                            {item.start_date && (
                              <div className='item dates'>
                                <h3>
                                  <Io.IoWatchOutline />
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
                                  <Io.IoLinkOutline />
                                  <span>Endereço do Portfólio</span>
                                </h3>
                                <p>{item.portfolio_url}</p>
                              </div>
                            )}
                            {item.description && (
                              <div className='item'>
                                <h3>
                                  <Io.IoFlowerOutline />
                                  <span>Anotações</span>
                                </h3>
                                <p>{item.description}</p>
                              </div>
                            )}
                          </div>
                          <div className='actions'>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                editWorkingData(item.id);
                              }}>
                              <Io.IoPencil />
                              <span>Editar</span>
                            </button>
                            <button
                              className='delete-btn'
                              onClick={() => removeWorkingData(item.id)}>
                              <Io.IoCloseCircle />
                              <span>Eliminar</span>
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className='no-data-container'>
                        <Io.IoClipboardOutline />
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
                    <Io.IoAdd />
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
                {!loading.status && (
                  <>
                    <h3>
                      Confirme se as informações introduzidas estão corretas antes de salvar
                      alterações. Caso não tenha alterado nada, não será atualizado, clique
                      em "Descartar e voltar".
                    </h3>
                    <p>
                      Todas as informações que introduzir nesta página são, por padrão,
                      públicas, exceto as suas senhas, dados de localização e algumas
                      informações pessoais como gênero, data de nascimento e seu endereço
                      exato (utilizado apenas para entregas).
                    </p>
                  </>
                )}

                {loading.status && loading.key === 'user-update' && (
                  <div className='loading'>
                    <PulseLoader
                      color={`rgb(${theme.primary})`}
                      aria-placeholder='Processando...'
                      cssOverride={{ display: 'block' }}
                    />
                    <span>Processando...</span>
                  </div>
                )}
              </div>

              <div className='btns-container'>
                <button disabled={loading.status} className='back' onClick={router.back}>
                  <Io.IoArrowUndoOutline />
                  <span>Descartar e voltar</span>
                </button>
                <button disabled={loading.status} className='save' onClick={onUpdate}>
                  <Io.IoSyncOutline />
                  <span>Salvar alterações</span>
                </button>
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
                <Io.IoTrash />
                <span>Apagar dados</span>
              </button>
            </section>
          </section>
        </article>
      </Container>
    </Layout>
  );
}
