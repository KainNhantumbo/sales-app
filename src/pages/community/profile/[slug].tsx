import {
  IoAdd,
  IoBriefcase,
  IoLeaf,
  IoLocation,
  IoLockClosed,
  IoPlanet,
  IoStorefront,
} from 'react-icons/io5';
import Image from 'next/image';
import { BiUser } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { formatDate } from '@/lib/utils';
import { FaAd } from 'react-icons/fa';
import Link from 'next/link';
import { useEffect } from 'react';
import Layout from '@/components/Layout';
import fetch from '../../../config/client';
import { TPublicUser } from '../../../../@types';
import ErrorPage from '@/pages/error-page';
import { complements, formatSocialNetwork } from '@/data/app-data';
import { NextRouter, useRouter } from 'next/router';
import { ProfileContainer as Container } from '@/styles/common/community-user-profile';

type TProps = { user: TPublicUser };

export default function UserProfile({ user }: TProps): JSX.Element {
  const router: NextRouter = useRouter();

  if (!user) return <ErrorPage retryFn={() => router.reload()} />;

  useEffect(() => {
    console.info(user);
  }, []);

  return (
    <Layout
      metadata={{
        title: `${
          complements.defaultTitle
        } | Perfil de ${String.prototype.concat(
          user.first_name,
          ' ',
          user.last_name
        )}`,
        createdAt: user.createdAt,
        updatedAt: user.createdAt,
      }}>
      <Container>
        <div className='wrapper-container'>
          <aside>
            <section className='no-ads'>
              <FaAd className='ads-icon' />
              <h3>
                <span>Espaço reservado para anúncios</span>
              </h3>
              <Link href={`/users/dashboard/create-ad`}>
                <IoAdd />
                <span>Criar anúncio</span>
              </Link>
            </section>
          </aside>
          <article>
            <div className='cover-image-container'>
              {user.cover_image && user.cover_image.url && (
                <Image
                  width={620}
                  height={220}
                  className='cover-image'
                  src={user.cover_image.url}
                  title={`Imagem de capa de ${user.first_name} ${user.last_name}`}
                  aria-label={`Imagem de capa de ${user.first_name} ${user.last_name}`}
                  alt={`Imagem de capa de ${user.first_name} ${user.last_name}`}
                />
              )}
              {!user.cover_image ||
                (!user.cover_image.url && <IoLeaf className='no-image-icon' />)}
            </div>

            <section className='user-details-container'>
              <div className='profile-image-container'>
                {user.profile_image && user.profile_image.url && (
                  <Image
                    width={620}
                    height={220}
                    className='profile-image'
                    src={user.profile_image.url}
                    title={`Imagem de perfil de ${user.first_name} ${user.last_name}`}
                    aria-label={`Imagem de perfil de ${user.first_name} ${user.last_name}`}
                    alt={`Imagem de perfil de ${user.first_name} ${user.last_name}`}
                  />
                )}
                {!user.profile_image ||
                  (!user.profile_image?.url && (
                    <BiUser className='no-image-icon' />
                  ))}
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
                    {formatSocialNetwork({
                      ...user.social_network,
                    })?.map((option, index) => (
                      <motion.a
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        href={option?.url}
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
{/*               
              <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.8 }}
              className='store-anchor'>
              <Link href={`/community/store/${user.store}`}>
                    <IoStorefront />
                    <span>Visitar loja</span>
                  </Link>
                </motion.div> */}
              
             
            </section>
            <section className='description-container'>
              <p>
                <span>Biografia: </span>
                {user.bio}
              </p>

              <h5>
                <IoLockClosed />
                <i>
                  Conta ativa desde <span>{formatDate(user.createdAt)}</span>
                </i>
              </h5>
              {user.location?.country && user.location?.state && (
                <h5>
                  <IoLocation />
                  <i>
                    Vive em {user.location.state} - {user.location.country}.
                  </i>
                </h5>
              )}
            </section>
            <section className='professional-data-container'>
              {user.spoken_languages && user.spoken_languages.length > 0 && (
                <div className='spoken-languages'>
                  <h5>
                    <IoPlanet />
                    <span>Possui habilidades linguísticas em: </span>
                  </h5>
                  {user.spoken_languages.map((language, index) => (
                    <p key={String(index)}>{language}</p>
                  ))}
                </div>
              )}
              {user.professional_skills &&
                user.professional_skills.length > 0 && (
                  <div className='spoken-languages'>
                    <h5>
                      <IoBriefcase />
                      <span>
                        Possui habilidades profissionais relacionadas a{' '}
                      </span>
                    </h5>
                    {user.professional_skills.map((ability, index) => (
                      <p key={String(index)}>#{ability}</p>
                    ))}
                  </div>
                )}
            </section>
          </article>
        </div>
      </Container>
    </Layout>
  );
}

export async function getStaticPaths(): Promise<any> {
  const slugs = await fetch<TPublicUser[]>({
    method: 'get',
    url: '/api/v1/users/account?fields=name',
  }).then((res) => res.data.map((item) => ({ params: { slug: item._id } })));
  return { paths: slugs, fallback: false };
}

export async function getStaticProps({ params: { slug } }: any) {
  try {
    const { data: user } = await fetch<TPublicUser>({
      method: 'get',
      url: `/api/v1/users/account/public/${slug}`,
    });
    return { props: { user }, revalidate: 10 };
  } catch (error) {
    console.error(error);
    return { props: {}, revalidate: 10 };
  }
}
