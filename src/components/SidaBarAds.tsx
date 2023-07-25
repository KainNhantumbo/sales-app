import Link from 'next/link';
import { FC } from 'react';
import { FaAd } from 'react-icons/fa';
import { IoAdd } from 'react-icons/io5';
import { SideBarAdsContainer as Container } from '@/styles/modules/sidebar-ads';

const SideBarAds: FC = (): JSX.Element => {
  return (
    <Container>
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
    </Container>
  );
};

export default SideBarAds;
