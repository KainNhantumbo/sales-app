import Layout from '@/components/layout';
import { SideBarAds } from '@/components/sidebar-ads';
import { StoriesRenderer } from '@/components/stories-renderer';
import fetch from '@/config/client';
import { constants } from '@/data/constants';
import { createSocialPaths } from '@/lib/url-transformers';
import { formatDate } from '@/lib/utils';
import ErrorPage from '@/pages/error-page';
import { _profile as Container } from '@/styles/common/community-user-profile';
import { PublicUser } from '@/types';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BiUser } from 'react-icons/bi';
import { BsWind } from 'react-icons/bs';
import * as Io from 'react-icons/io5';

export default function Page({ user }: { user?: PublicUser }) {
  const router = useRouter();

  if (!user)
    return (
      <ErrorPage message='Conta de usuário indisponível.' onRetry={router.reload} />
    );

  return (
    <Layout
      metadata={{
        title: `${constants.defaultTitle} | Perfil de ${user.first_name} ${user.last_name}`,
        createdAt: user.createdAt,
        updatedAt: user.createdAt
      }}>
      <Container>
        <div className='wrapper-container'>
          <SideBarAds key={'user-profile'} />

          <article>
            <div className='cover-image-container'>
              {user?.cover_image && user?.cover_image?.url ? (
                <Image
                  width={620}
                  height={220}
                  className='cover-image'
                  src={user.cover_image.url}
                  title={`Imagem de capa de ${user.first_name} ${user.last_name}`}
                  aria-label={`Imagem de capa de ${user.first_name} ${user.last_name}`}
                  alt={`Imagem de capa de ${user.first_name} ${user.last_name}`}
                />
              ) : (
                <BsWind className='cover-image-icon' />
              )}
            </div>

            <section className='user-details-container'>
              <div className='left-wrapper-container'>
                <div className='profile-image-container'>
                  {user.profile_image && user.profile_image.url && (
                    <Image
                      width={220}
                      height={220}
                      className='profile-image'
                      src={user.profile_image.url}
                      title={`Imagem de perfil de ${user.first_name} ${user.last_name}`}
                      aria-label={`Imagem de perfil de ${user.first_name} ${user.last_name}`}
                      alt={`Imagem de perfil de ${user.first_name} ${user.last_name}`}
                    />
                  )}
                  {!user.profile_image && <BiUser className='no-image-icon' />}
                </div>
                <div className='details-container'>
                  <h3 className='author-name'>
                    <span>{`${user.first_name} ${user.last_name}`}</span>
                  </h3>
                  <h5 className='email'>
                    <span>
                      <strong>E-mail: </strong>
                      {user.email}
                    </span>
                  </h5>
                  {user.social_network && (
                    <div className='network-buttons'>
                      {createSocialPaths(user.social_network)?.map((option, index) => (
                        <motion.a
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                          href={String(option?.url)}
                          title={option?.name}
                          aria-label={option?.name}
                          target={'_blank'}
                          rel={'noreferrer noopener'}
                          key={String(index)}>
                          {option?.icon && <option.icon />}
                        </motion.a>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className='right-wrapper-container'>
                <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.8 }}>
                  <button
                    className='create-story-btn'
                    onClick={() => router.push(`/community/story/create-story`)}>
                    <Io.IoCreateOutline />
                    <span>Nova história</span>
                  </button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.8 }}
                  className='store-anchor'>
                  <Link href={`/community/store/${user.store}`}>
                    <Io.IoOpenOutline />
                    <span>Visitar loja</span>
                  </Link>
                </motion.div>
              </div>
            </section>
            <section className='description-container'>
              <p>
                <span>Biografia: </span>
                {user.bio}
              </p>

              <h5>
                <Io.IoLockClosed />
                <i>
                  Conta ativa desde <span>{formatDate(user.createdAt)}</span>
                </i>
              </h5>
              {user.location?.country && user.location?.state && (
                <h5>
                  <Io.IoLocation />
                  <i>
                    Vive em {user.location.state} - {user.location.country}.
                  </i>
                </h5>
              )}
            </section>
            {user.spoken_languages.length > 0 && user.professional_skills.length > 0 && (
              <section className='professional-data-container'>
                {user.spoken_languages.length > 0 && (
                  <div className='spoken-languages'>
                    <h5>
                      <Io.IoPlanet />
                      <span>Possui habilidades linguísticas em: </span>
                    </h5>
                    {user.spoken_languages.map((language, index) => (
                      <p key={String(index)}>{language}</p>
                    ))}
                  </div>
                )}
                {user.professional_skills.length > 0 && (
                  <div className='spoken-languages'>
                    <h5>
                      <Io.IoBriefcase />
                      <span>Possui habilidades profissionais relacionadas a </span>
                    </h5>
                    {user.professional_skills.map((ability, index) => (
                      <p key={String(index)}>#{ability}</p>
                    ))}
                  </div>
                )}
              </section>
            )}

            <StoriesRenderer key={user._id} userId={user._id} />
          </article>
        </div>
      </Container>
    </Layout>
  );
}

export async function getStaticPaths(): Promise<any> {
  const slugs = await fetch<PublicUser[]>({
    method: 'get',
    url: '/api/v1/users/account/public'
  }).then((res) => res.data.map((item) => ({ params: { slug: item._id } })));
  return { paths: slugs, fallback: false };
}

export async function getStaticProps({ params: { slug } }: any) {
  try {
    const { data: user } = await fetch<PublicUser>({
      method: 'get',
      url: `/api/v1/users/account/public/${slug}`
    });
    return { props: { user }, revalidate: 10 };
  } catch (error) {
    console.error(error);
    return { props: {}, revalidate: 10 };
  }
}
