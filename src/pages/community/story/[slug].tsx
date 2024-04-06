import { DropzoneArea } from '@/components/dropzone';
import Layout from '@/components/layout';
import { SideBarAds } from '@/components/sidebar-ads';
import client from '@/config/client';
import { useAppContext } from '@/context/AppContext';
import { constants } from '@/data/constants';
import { useFetchState } from '@/hooks/use-fetch-state';
import { errorTransformer } from '@/lib/error-transformer';
import { _story as Container } from '@/styles/common/story';
import type { HttpError, Story } from '@/types';
import type { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsTrash } from 'react-icons/bs';
import { IoEllipsisHorizontal, IoHeart } from 'react-icons/io5';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';

const initialStoryState = { title: '', content: '', cover_image: { id: '', url: '' } };

export default function Page({ story }: { story?: Story & { _id: string } }) {
  const theme = useTheme();
  const router = useRouter();
  const { httpClient } = useAppContext();
  const { isLoading, setLoading } = useFetchState({ delay: 500 });
  const [coverImage, setCoverImage] = useState<string>('');
  const [formData, setFormData] = useState<typeof initialStoryState>(initialStoryState);

  async function onCreate() {
    try {
      setLoading(true);
      await httpClient({
        method: 'post',
        url: `/api/v1/users/stories`,
        data: { ...formData, coverImage }
      });
      router.back();
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function onUpdate() {
    setLoading(true);
    try {
      await httpClient({
        method: 'patch',
        url: `/api/v1/users/stories/${story?._id}`,
        data: { ...formData, coverImage }
      });
      router.back();
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (story) {
      const { _id, ...rest } = story;
      setFormData({ ...(rest as any) });
      setCoverImage(rest.cover_image?.url || '');
    }
  }, [story]);

  return (
    <Layout metadata={{ title: `${constants.defaultTitle} | Histórias` }}>
      <Container>
        <div className='wrapper-container'>
          <SideBarAds key={'story'} />
          <article>
            <section className='header-container'>
              <h2>
                <IoHeart />
                <span>{story?._id ? 'Atualização de História' : 'Nova História'}</span>
              </h2>
              <p>
                Escreva uma pequena história relacionada aos produtos que vende ou para
                compartilhar conhecimentos com a comunidade.
              </p>
              <p>
                Por favor, seja educado ao escrever as suas histórias e respeite o nosso{' '}
                <Link href={'/legal/code-of-conduct'}>
                  <span>código de conduta</span>
                </Link>{' '}
                e os nossos{' '}
                <Link href={'/legal/terms-of-use'}>
                  <span>termos e condições</span>
                </Link>
                .
              </p>
            </section>
            <section className='form-container'>
              <section className='form' spellCheck={'true'}>
                <section className='form-section'>
                  <div className='form-element'>
                    <label htmlFor='title'>
                      <IoEllipsisHorizontal />
                      <span>Título *</span>
                    </label>
                    <input
                      type='text'
                      id='title'
                      placeholder='Título da sua história'
                      aria-label='Título da sua história'
                      required={true}
                      maxLength={64}
                      onChange={(e) =>
                        setFormData((state) => ({ ...state, title: e.target.value }))
                      }
                      value={formData.title}
                    />
                    <span className='counter'>{`${formData.title.length || 0} / 64`}</span>
                  </div>
                </section>

                <section className='form-section'>
                  <div className='form-element'>
                    <label htmlFor='description'>
                      <IoEllipsisHorizontal />
                      <span>Conteúdo *</span>
                    </label>
                    <textarea
                      id='description'
                      placeholder='Conteúdo da história'
                      aria-label='Conteúdo da história'
                      rows={6}
                      maxLength={512}
                      onChange={(e) =>
                        setFormData((state) => ({ ...state, content: e.target.value }))
                      }
                      value={formData.content}
                    />
                    <span className='counter'>{`${
                      formData.content.length || 0
                    } / 512`}</span>
                  </div>
                </section>

                <div className='cover-image-container'>
                  {coverImage ? (
                    <>
                      <Image
                        width={420}
                        height={220}
                        priority
                        className='cover-image'
                        src={coverImage}
                        title={`Imagem de capa da história`}
                        aria-label={`Imagem de capa da história`}
                        alt={`Imagem de capa da história`}
                      />
                      <button className='clear-image' onClick={() => setCoverImage('')}>
                        <BsTrash />
                        <span>Remover imagem</span>
                      </button>
                    </>
                  ) : (
                    <div className='image-drop-container'>
                      <DropzoneArea
                        width={220}
                        height={420}
                        handler={(encodedImage) => setCoverImage(encodedImage)}
                      />
                    </div>
                  )}
                </div>

                <section className='actions-container'>
                  {isLoading && (
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

                  <div className='prompt-actions'>
                    {story?._id !== undefined ? (
                      <button
                        onClick={onUpdate}
                        disabled={isLoading}
                        className='prompt-accept'>
                        <span>Atualizar</span>
                      </button>
                    ) : (
                      <button
                        className='prompt-accept-btn'
                        disabled={isLoading}
                        onClick={onCreate}>
                        <span>Publicar</span>
                      </button>
                    )}
                  </div>
                </section>
              </section>
            </section>
          </article>
        </div>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps<
  T extends GetServerSidePropsContext<{ slug: string }>
>({ params }: T) {
  try {
    if (params?.slug === 'create-story') return { props: {} };
    const { data } = await client.get<Story>(`/api/v1/users/stories/${params?.slug}`);
    return { props: { story: { ...data } } };
  } catch (error) {
    console.error(error);
    return { props: {} };
  }
}
