import client from '@/config/client';
import { errorTransformer } from '@/lib/error-transformer';
import { _sidebarAds as Container } from '@/styles/modules/sidebar-ads';
import { HttpError } from '@/types';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaAd } from 'react-icons/fa';
import { IoAdd } from 'react-icons/io5';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';

type PublicAds = Array<{ _id: string; name: string; image: { id: string; url: string } }>;

export function SideBarAds() {
  const theme = useTheme();
  const [list, setList] = React.useState<PublicAds>([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['public-random-ads'],
    queryFn: async () => {
      try {
        await client.get('/api/v1/ads/public');
      } catch (error) {
        const { message } = errorTransformer(error as HttpError);
        toast.error(message);
        console.error(error);
      }
    }
  });

  React.useEffect(() => {
    if (typeof data !== 'undefined' && Array.isArray(data)) {
      setList(data);
    }
  }, [data]);

  return (
    <Container>
      <section className='list-container'>
        {list.length > 0
          ? list.map(({ _id, name, image }) => (
              <div key={_id} className='image-container'>
                <Image width={320} height={320} src={image.url} alt={`Imagem ${name}`} />
              </div>
            ))
          : null}
      </section>

      {isLoading && !isError && (
        <div className='loader-container'>
          <PulseLoader
            size={20}
            color={`rgb(${theme.primary_shade})`}
            aria-placeholder='Processando...'
            cssOverride={{
              display: 'block'
            }}
          />
        </div>
      )}

      {!isError && !isLoading && list.length < 1 ? (
        <section className='no-ads'>
          <FaAd className='ads-icon' />
          <h3>
            <span>Espaço reservado para anúncios</span>
          </h3>
          <Link href={`/dashboard/advertisements/editor`}>
            <IoAdd />
            <span>Criar anúncio</span>
          </Link>
        </section>
      ) : null}
    </Container>
  );
}
