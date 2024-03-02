import Link from 'next/link';
import { FaAd } from 'react-icons/fa';
import { IoAdd } from 'react-icons/io5';
import { _sidebarAds as Container } from '@/styles/modules/sidebar-ads';

export default function SideBarAds() {
  return (
    <Container>
      <section className='no-ads'>
        <FaAd className='ads-icon' />
        <h3>
          <span>Espaço reservado para anúncios</span>
        </h3>
        <Link href={`/dashboard/create-ad`}>
          <IoAdd />
          <span>Criar anúncio</span>
        </Link>
      </section>
    </Container>
  );
}
