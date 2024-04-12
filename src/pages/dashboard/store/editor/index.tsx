import { DropzoneArea } from '@/components/dropzone';
import Layout from '@/components/layout';
import { useAppContext } from '@/context/app-context';
import { constants } from '@/data/constants';
import Countries from '@/data/countries.json';
import Categories from '@/data/product-categories.json';
import { errorTransformer } from '@/lib/error-transformer';
import { actions } from '@/shared/actions';
import { _storeEditor as Container } from '@/styles/common/store-editor';
import type { HttpError, InputEvents, Store } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import * as Io from 'react-icons/io5';
import { DotLoader, PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';

type Loading = { status: boolean; key: 'store-data' | 'store-update' };

const initialStoreState: Store = {
  _id: '',
  name: '',
  active: false,
  description: '',
  slogan: '',
  category: Categories[0],
  cover_image: { id: '', url: '' },
  privacy_policy: '',
  terms_policy: '',
  delivery_policy: '',
  createdAt: '',
  updatedAt: '',
  location: { country: 'Moçambique', state: 'Maputo', address: '' },
  created_by: {
    profile_image: '',
    first_name: '',
    last_name: '',
    email: '',
    main_phone_number: 0,
    alternative_phone_number: 0,
    social_network: { website: '', whatsapp: '', instagram: '', facebook: '', linkedin: '' }
  }
};

export default function Page() {
  const theme = useTheme();
  const router = useRouter();
  const { state, httpClient, dispatch } = useAppContext();
  const [formData, setFormData] = React.useState<Store>(initialStoreState);
  const [coverImage, setCoverImage] = React.useState<string>('');
  const [loading, setLoading] = React.useState<Loading>({
    status: false,
    key: 'store-data'
  });

  // --------------------functions------------------
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

  const getStoreData = async () => {
    try {
      setLoading({ status: true, key: 'store-data' });
      const { data } = await httpClient<Store>({
        method: 'get',
        url: `/api/v1/users/store`
      });
      setFormData(data);
      setCoverImage(data.cover_image?.url || '');
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message);
      console.error(error);
    } finally {
      setLoading({ status: false, key: 'store-data' });
    }
  };

  const handleSubmitUpdate = async () => {
    try {
      setLoading({ status: true, key: 'store-update' });
      await httpClient({
        method: 'patch',
        url: `/api/v1/users/store/${formData._id}`,
        data: { ...formData, coverImage }
      });
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message);
      console.error(error);
    } finally {
      setLoading({ status: false, key: 'store-update' });
    }
  };

  const handleDeactivateStore = () => {
    dispatch({
      type: actions.PROMPT,
      payload: {
        ...state,
        prompt: {
          ...state.prompt,
          status: true,
          title: 'Desativação de Loja',
          actionButtonMessage: 'Confirmar',
          message:
            'Deseja desativar a sua loja? Os seus produtos e loja serão restritos ao público.',
          handleFunction: () => {
            setFormData((state) => ({ ...state, active: !state.active }));
            dispatch({
              type: actions.PROMPT,
              payload: { ...state, prompt: { ...state.prompt, status: false } }
            });
          }
        }
      }
    });
  };

  React.useEffect(() => {
    const instance = setTimeout(() => {
      if (state.auth.storeId) getStoreData();
    }, 120);
    return () => clearTimeout(instance);
  }, [state.auth]);

  return (
    <Layout
      metadata={{
        title: `${constants.defaultTitle} | Editor de Loja`,
        updatedAt: formData.updatedAt,
        createdAt: formData.createdAt
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

        <article>
          <section className='header'>
            <h2>
              <Io.IoPencilOutline />
              <span>Detalhes da Loja</span>
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
                          alt='Imagem de Capa do Perfil da Loja'
                        />
                        <button
                          title='Apagar Imagem de Capa'
                          onClick={() => setCoverImage('')}>
                          <Io.IoCloseOutline />
                        </button>
                      </>
                    ) : (
                      <div className='image-drop-container'>
                        <DropzoneArea
                          width={620}
                          height={220}
                          handler={(encodedImage) => setCoverImage(encodedImage)}
                        />
                      </div>
                    )}
                  </div>
                </section>

                <div className='data-section'>
                  <div className='description'>
                    <h2>
                      <Io.IoStorefront />
                      <span>Informações da Loja</span>
                    </h2>
                    <p>
                      Informações usadas para perfil da loja. Por favor, inserir informações
                      corretas, reais e verdadeiras para evitar a suspensão da loja.
                    </p>
                  </div>

                  <div className='items-container'>
                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='name'>
                          <Io.IoEllipsisHorizontal />
                          <span>Nome da Loja *</span>
                        </label>
                        <input
                          type='text'
                          id='name'
                          name='name'
                          placeholder='Escreva o nome da loja'
                          onChange={handleChange}
                          value={formData.name}
                        />
                        <span className='counter'>{`${
                          formData.name?.length || 0
                        } / 64`}</span>
                      </div>
                      <div className='form-element'>
                        <label htmlFor='category'>
                          <Io.IoLayersOutline />
                          <span>Categoria Principal dos Produtos *</span>
                        </label>
                        <select
                          id='category'
                          name='category'
                          value={formData.category}
                          onChange={handleChange}>
                          {Categories.sort((a, b) => (a > b ? 1 : -1)).map((item, i) => (
                            <option key={i} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>
                    </section>
                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='slogan'>
                          <Io.IoEllipsisHorizontal />
                          <span>Slogan da Loja</span>
                        </label>
                        <input
                          type='text'
                          id='slogan'
                          name='slogan'
                          placeholder='Escreva o slogan de sua loja'
                          maxLength={64}
                          value={formData.slogan}
                          onChange={handleChange}
                        />
                        <span className='counter'>{`${
                          formData.slogan?.length || 0
                        } / 64`}</span>
                      </div>
                    </section>

                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='description'>
                          <Io.IoEllipsisHorizontal />
                          <span>Descrição da Loja *</span>
                        </label>
                        <textarea
                          id='description'
                          name='description'
                          placeholder='Escreva a descrição de sua loja'
                          maxLength={256}
                          rows={5}
                          onChange={handleChange}
                          value={formData.description}
                        />
                        <span className='counter'>{`${formData.description.length} / 256`}</span>
                      </div>
                    </section>
                  </div>
                </div>

                <div className='data-section'>
                  <div className='description'>
                    <h2>
                      <Io.IoLocation />
                      <span>Localização e Endereço</span>
                    </h2>
                    <p>
                      Localização e endereço da sua loja física (caso exista) ou a sua
                      localização de partida (casa, armazém dos produtos, etc.).
                    </p>
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
                          value={formData.location?.country}
                          onChange={(e) =>
                            setFormData((state) => ({
                              ...state,
                              location: { ...state.location, country: e.target.value }
                            }))
                          }>
                          {Countries.sort((a, b) => (a.country > b.country ? 1 : -1)).map(
                            (item, index) => (
                              <option value={item.country} key={index}>
                                {item.country}
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
                          value={formData.location?.state}
                          onChange={(e) =>
                            setFormData((state) => ({
                              ...state,
                              location: { ...state.location, state: e.target.value }
                            }))
                          }>
                          {currentCountryStates.map((item, i) => (
                            <option key={i} value={item}>
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
                          placeholder='Localidade, bairro, rua, quarteirão, número da casa, etc.'
                          maxLength={256}
                          value={formData.location?.address}
                          onChange={(e) =>
                            setFormData((state) => ({
                              ...state,
                              location: { ...state.location, address: e.target.value }
                            }))
                          }
                        />
                        <span className='counter'>{`${formData.location?.address?.length} / 256`}</span>
                      </div>
                    </section>
                  </div>
                </div>

                <div className='data-section'>
                  <div className='description'>
                    <h2>
                      <Io.IoDocuments />
                      <span>Políticas da Loja</span>
                    </h2>
                    <p>
                      Documentação e regras de conduta endereçada aos clientes que visitam a
                      sua loja.
                    </p>
                  </div>

                  <div className='items-container'>
                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='terms_policy'>
                          <Io.IoEllipsisHorizontal />
                          <span>Termos e Condições</span>
                        </label>
                        <textarea
                          id='terms_policy'
                          name='terms_policy'
                          placeholder='Escreva os termos e condições da sua loja'
                          rows={12}
                          onChange={handleChange}
                          value={formData.terms_policy}
                        />
                        <span className='counter'>{`${formData.terms_policy.length} / 2048`}</span>
                      </div>
                    </section>
                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='privacy_policy'>
                          <Io.IoEllipsisHorizontal />
                          <span>Política de Privacidade</span>
                        </label>
                        <textarea
                          id='privacy_policy'
                          name='privacy_policy'
                          placeholder='Escreva a política de privacidade da sua loja'
                          rows={12}
                          onChange={handleChange}
                          value={formData.privacy_policy}
                        />
                        <span className='counter'>{`${formData.privacy_policy.length} / 2048`}</span>
                      </div>
                    </section>
                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='delivery_policy'>
                          <Io.IoEllipsisHorizontal />
                          <span>Política de Entregas ao Cliente</span>
                        </label>
                        <textarea
                          id='delivery_policy'
                          name='delivery_policy'
                          placeholder='Escreva a política de entrega de encomendas ao cliente da sua loja'
                          rows={12}
                          onChange={handleChange}
                          value={formData.delivery_policy}
                        />
                        <span className='counter'>{`${formData.delivery_policy?.length} / 1024`}</span>
                      </div>
                    </section>
                  </div>
                </div>
              </section>
            </section>

            <section className='store-activation-container'>
              <div className='description'>
                <h2>
                  <Io.IoCart />
                  <span>Ativação da Loja</span>
                </h2>
                <p>
                  Por padrão, a loja está desativada, isso significa que os a loja e os seus
                  produtos não aparecerão ao público ou nas pesquisas feitas pelos usuários
                  da plataforma. Active após o preenchimento correto das informações acima.
                </p>
                <p className='p-bottom'>
                  Clique no botão abaixo para ativar ou desativar a loja.
                </p>
              </div>

              {!formData.active ? (
                <button
                  className='save'
                  onClick={() =>
                    setFormData((state) => ({ ...state, active: !state.active }))
                  }>
                  <Io.IoRadioButtonOff color={`rgb(${theme.error})`} />
                  <span>Loja Desativada</span>
                </button>
              ) : (
                <button className='save' onClick={handleDeactivateStore}>
                  <Io.IoRadioButtonOn color={`rgb(${theme.secondary})`} />
                  <span>Loja Ativada</span>
                </button>
              )}
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
                {!loading.status && (
                  <>
                    <h3>
                      Confirme se as informações introduzidas estão corretas antes de salvar
                      alterações. Caso não tenha alterado nada, não será atualizado, clique
                      em "Descartar e voltar".
                    </h3>
                    <p>
                      Todas as informações que introduzir nesta página são, por padrão,
                      públicas.
                    </p>
                  </>
                )}

                {loading.status && loading.key === 'store-update' && (
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
                <button
                  disabled={loading.status}
                  className='save'
                  onClick={handleSubmitUpdate}>
                  <Io.IoSyncOutline />
                  <span>Salvar alterações</span>
                </button>
              </div>
            </section>
          </section>
        </article>
      </Container>
    </Layout>
  );
}
