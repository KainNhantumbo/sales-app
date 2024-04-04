import Layout from '@/components/layout';
import { useAppContext } from '@/context/AppContext';
import { DEFAULT_ERROR_MESSAGE, constants } from '@/data/constants';
import { errorTransformer } from '@/lib/error-transformer';
import { _adEditor as Container } from '@/styles/common/advertisements-editor';
import * as Io from 'react-icons/io5';
import { Ad, HttpError, InputEvents } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import * as React from 'react';
import { DotLoader, PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';
import Image from 'next/image';
import { DropzoneArea } from '@/components/dropzone';

const initialAdState: Ad = {
  name: '',
  owner: '',
  notes: '',
  image: { id: '', url: '' }
};

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

  const { mutateAsync: updateMutation, ...updateMutationProps } = useMutation({
    mutationFn: async () => {
      try {
        await httpClient({
          method: 'patch',
          url: `/api/v1/ads/${adId}`,
          data: { ...adData }
        });
      } catch (error) {
        const { message } = errorTransformer(error as HttpError);
        toast.error(message);
        console.error(error);
      }
    },
    useErrorBoundary: true,
    networkMode: 'always'
  });

  const { mutateAsync: createMutation, ...createMutationProps } = useMutation({
    mutationFn: async () => {
      try {
        await httpClient({
          method: 'post',
          url: '/api/v1/ads',
          data: { ...adData, image: adData.image.url }
        });
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
          <section className='data-container'>
            <section className='wrapper'>
              <section className='form-section'>
                <div className='images-container'>
                  <div className='images-container_header'>
                    <h2>
                      <span>Carregue a imagen do anúncio</span>
                    </h2>
                  </div>

                  <div className='image-container'>
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
                        src={adData.image.url}
                        alt={adData.name}
                        title={`Imagem do Anúncio de ${adData.name}`}
                      />
                    ) : null}

                    {!coverImage && !adData.image.url ? (
                      <div className='image-dropzone'>
                        <DropzoneArea
                          width={320}
                          height={320}
                          handler={(encodedImage) => {
                            setCoverImage(encodedImage);
                          }}
                        />

                        <button
                          title='Remover imagem'
                          className='image-remover-button'
                          onClick={() => setCoverImage('')}>
                          <Io.IoTrashOutline />
                        </button>
                      </div>
                    ) : null}
                  </div>
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
              {!updateMutationProps.isLoading ||
                (!createMutationProps.isLoading && !updateMutationProps.isError) ||
                (!createMutationProps.isError && (
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
                ))}

              {createMutationProps.isError && (
                <div className='error-message'>
                  {(createMutationProps.error as HttpError)?.response?.data?.message ||
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

              {!updateMutationProps.isLoading && !updateMutationProps.isError && adId ? (
                <button className='save' onClick={async () => await updateMutation()}>
                  <Io.IoSyncOutline />
                  <span>Salvar alterações</span>
                </button>
              ) : null}

              {!createMutationProps.isLoading && !createMutationProps.isError && !adId && (
                <button className='save' onClick={async () => await createMutation()}>
                  <Io.IoPush />
                  <span>Publicar Produto</span>
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