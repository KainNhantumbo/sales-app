import { DropzoneArea } from '@/components/dropzone';
import Layout from '@/components/layout';
import { useAppContext } from '@/context/AppContext';
import { constants } from '@/data/constants';
import { errorTransformer } from '@/lib/error-transformer';
import { _adEditor as Container } from '@/styles/common/advertisements-editor';
import { Ad, HttpError, InputEvents } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import { FaAd } from 'react-icons/fa';
import * as Io from 'react-icons/io5';
import { DotLoader, PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';

const initialAdState: Ad = { name: '', owner: '', notes: '', image: { id: '', url: '' } };

export default function Page() {
  const theme = useTheme();
  const router = useRouter();
  const { httpClient } = useAppContext();
  const [adData, setAdData] = React.useState<Ad>(initialAdState);
  const [coverImage, setCoverImage] = React.useState<string>('');

  const adId = React.useMemo(() => {
    const id = router.query['adId'];
    if (typeof id === 'string' && id.length > 0) return id;
    return '';
  }, [router.query]);

  const onChange = (e: InputEvents) => {
    setAdData((state) => ({
      ...state,
      [e.target.name]: e.target.value
    }));
  };

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['ads-editor'],
    queryFn: async () => {
      try {
        if (!adId) return initialAdState;
        const { data } = await httpClient<Ad>({
          method: 'get',
          url: `/api/v1/ads/${adId}`
        });
        return data;
      } catch (error) {
        const { message } = errorTransformer(error as HttpError);
        toast.error(message);
        console.error(error);
      }

    }
  });

  const { mutateAsync: createMutation, ...createMutationProps } = useMutation({
    mutationFn: async () => {
      try {
        await httpClient({
          method: 'post',
          url: '/api/v1/ads',
          data: { ...adData, image: coverImage }
        });
        setAdData(initialAdState);
        setCoverImage('');
        toast.success('Anúncio criado com sucesso.');
      } catch (error) {
        const { message } = errorTransformer(error as HttpError);
        toast.error(message);
        console.error(error);
      }
    },
    useErrorBoundary: true,
    networkMode: 'always'
  });

  const { mutateAsync: updateMutation, ...updateMutationProps } = useMutation({
    mutationFn: async () => {
      try {
        await httpClient({
          method: 'patch',
          url: `/api/v1/ads/${adId}`,
          data: { ...adData, rawImage: coverImage }
        });
        toast.success('Anúncio atualizado com sucesso.');
      } catch (error) {
        const { message } = errorTransformer(error as HttpError);
        toast.error(message);
        console.error(error);
      }
    },
    useErrorBoundary: true,
    networkMode: 'always'
  });


  React.useEffect(() => {
    if (typeof data !== 'undefined') setAdData(data);
  }, [data]);

  return (
    <Layout metadata={{ title: `${constants.defaultTitle} | Editor de  Anúncios` }}>
      <Container>
        <article>
          <section className='header-container'>
            <h2>
              <FaAd />
              <span>{adId ? 'Editar Anúncio' : 'Criar Novo Anúncio'}</span>
            </h2>
            <p>Nota: os anúncios expiram irrevogavelmente após 30 dias.</p>
          </section>

          <section className='data-container'>
            <section className='form-section'>
              <div className='image-container'>
                <div className='image'>
                  {adData.image.url && !coverImage ? (
                    <Image
                      width={500}
                      height={500}
                      src={adData.image.url}
                      alt={adData.name}
                      title={`Imagem do Anúncio de ${adData.name}`}
                    />
                  ) : null}
                  {coverImage ? (
                    <Image
                      width={500}
                      height={500}
                      src={coverImage}
                      alt={adData.name}
                      title={`Imagem do Anúncio de ${adData.name}`}
                    />
                  ) : null}
                  {coverImage || adData.image.url ? (
                    <button
                      title='Remover imagem'
                      className='image-remover-button'
                      onClick={() => {
                        setCoverImage('');
                        setAdData((state) => ({
                          ...state,
                          image: { ...state.image, url: '' }
                        }));
                      }}>
                      <Io.IoTrashOutline />
                    </button>
                  ) : null}
                </div>
                {!coverImage && !adData.image.url ? (
                  <div className='image-dropzone'>
                    <DropzoneArea
                      width={320}
                      height={320}
                      handler={(encodedImage) => {
                        setCoverImage(encodedImage);
                      }}
                    />
                  </div>
                ) : null}
              </div>
            </section>

            <section className='form-section'>
              <div className='form-element'>
                <label htmlFor='name'>
                  <Io.IoEllipsisHorizontal />
                  <span>Nome do Anúncio *</span>
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  autoComplete='off'
                  maxLength={128}
                  placeholder='Escreva o nome do anúncio'
                  aria-label='Escreva o nome do anúncio'
                  onChange={onChange}
                  value={adData.name}
                />
                <span className='counter'>{`${adData.name.length} / 128`}</span>
              </div>
              <div className='form-element'>
                <label htmlFor='owner'>
                  <Io.IoEllipsisHorizontal />
                  <span>Proprietário do Anúncio *</span>
                </label>
                <input
                  type='text'
                  id='owner'
                  name='owner'
                  autoComplete='off'
                  maxLength={128}
                  placeholder='Escreva o proprietário do anúncio'
                  aria-label='Escreva o proprietário do anúncio'
                  onChange={onChange}
                  value={adData.owner}
                />
                <span className='counter'>{`${adData.owner.length} / 128`}</span>
              </div>
            </section>

            <section className='form-section'>
              <div className='form-element'>
                <label htmlFor='notes'>
                  <Io.IoEllipsisHorizontal />
                  <span>Notas Adicionais</span>
                </label>

                <textarea
                  id='notes'
                  name='notes'
                  autoComplete='off'
                  placeholder='Notas adicionais'
                  aria-label='Notas adicionais'
                  onChange={onChange}
                  value={adData.notes}
                  maxLength={512}
                  rows={8}
                />
                <span className='counter'>{`${adData.notes.length} / 512`}</span>
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
                      Confirme se as informações introduzidas estão corretas antes de salvar
                      alterações. Caso não tenha alterado nada, não será atualizado, clique
                      em "Voltar".
                    </h3>
                    <p>
                      Todas as informações que introduzir nesta página são, por padrão,
                      públicas.
                    </p>
                  </div>
                )}

              {createMutationProps.isError && (
                <div className='error-message'>
                  {errorTransformer(createMutationProps.error as HttpError).message}
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
              <button className='cancel-button' onClick={(e) => router.back()}>
                <Io.IoArrowUndoOutline />
                <span>Voltar</span>
              </button>

              {!updateMutationProps.isLoading && !updateMutationProps.isError && adId ? (
                <button
                  className='save-button'
                  onClick={async () => await updateMutation()}>
                  <Io.IoSyncOutline />
                  <span>Atualizar</span>
                </button>
              ) : null}

              {!createMutationProps.isLoading && !createMutationProps.isError && !adId && (
                <button
                  className='save-button'
                  onClick={async () => await createMutation()}>
                  <Io.IoPush />
                  <span>Publicar</span>
                </button>
              )}
            </div>
          </section>

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
        </article>
      </Container>
    </Layout>
  );
}
