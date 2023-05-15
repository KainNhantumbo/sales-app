import Link from 'next/link';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { HomeContainer as Container } from '@/styles/common/home';
import NewsLetter from '@/components/Newsletter';
import flying_paper from '../../public/assets/flying paper.png';
import { urls } from '@/data/app-data';
import Image from 'next/image';
import { IoStorefrontOutline } from 'react-icons/io5';

export default function Home(): JSX.Element {
  const router = useRouter();

  return (
    <Layout>
      <Container>
        <article>
          <section className='introduction'>
            <div>
              <h2>Monte a sua loja virtual sem pagar nada</h2>
              <p>
                Seu e-commerce virtual do seu jeito e com todas as
                funcionalidades que precisa de graça.
              </p>
              <Link href={'/auth/sign-in'}>
                <IoStorefrontOutline/>
                <span>Criar loja grátis</span>
              </Link>
              <span>* Não é necessário adicionar cartão de crédito</span>
            </div>
            <Image
              src={flying_paper}
              width={800}
              height={800}
              alt='flying paper image by freepick'
            />
          </section>
        </article>
        <NewsLetter />
      </Container>
    </Layout>
  );
}
