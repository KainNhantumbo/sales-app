import Link from 'next/link';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { HomeContainer as Container } from '@/styles/common/home';
import NewsLetter from '@/components/Newsletter';
import flying_paper from '../../public/assets/flying paper.png';
import { store_features } from '@/data/app-data';
import Image from 'next/image';
import { IoStorefrontOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { useTheme } from 'styled-components';

export default function Home(): JSX.Element {
  const router = useRouter();
  const theme = useTheme();

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
                <IoStorefrontOutline />
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

          <section className='features'>
            <div className='wrapper'>
              <h2>
                <span>
                  Tudo o que a <i>sua loja precisa</i>
                </span>
              </h2>
              <div className='cards-container'>
                {store_features.map((card, index) => (
                  <motion.div
                    key={index.toString()}
                    whileHover={{
                      translateY: -8,
                      boxShadow: `0px 20px 25px rgba(${theme.accent}, 0.09)`,
                    }}>
                    <card.icon />
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </article>
        <NewsLetter />
      </Container>
    </Layout>
  );
}
