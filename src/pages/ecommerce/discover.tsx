import {
  IoBalloonOutline,
  IoHeartOutline,
  IoStorefrontOutline
} from 'react-icons/io5';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { NextRouter, useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { useTheme } from 'styled-components';
import NewsLetter from '@/components/Newsletter';
import { DiscoverContainer as Container } from '@/styles/common/home';
import flying_paper from '../../public/assets/flying paper.png';
import africa_culture from '../../public/assets/africa-culture.png';
import { store_features, pricing_data, complements } from '@/data/app-data';

export default function Discover(): JSX.Element {
  const router: NextRouter = useRouter();
  const theme = useTheme();

  return (
    <Layout
      metadata={{
        title: `${complements.defaultTitle} | Página Inicial`
      }}>
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
              priority={true}
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
                      boxShadow: `0px 20px 25px rgba(${theme.accent}, 0.09)`
                    }}>
                    <card.icon />
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className='presentation'>
            <div>
              <h2>Relaxe e sinta-se em casa</h2>
              <p>
                Plataforma feita de jovens moçambicanos para todos moçambicanos
                com o objectivo de desenvolver e nutrir o espírito de
                empreendedorismo a nível nacional.
              </p>
              <span>
                Precisa de ajuda nos primeiros passos? Pode contar conosco, veja
                a secção de contacto no rodapé ou acesse o nosso blog para
                aprender mais sobre o e-commerce e vendas em lojas virtuais.
              </span>
              <Link href={'/legal/about'}>
                <IoHeartOutline />
                <span>Saiba mais</span>
              </Link>
            </div>
            <Image
              src={africa_culture}
              width={600}
              height={600}
              alt='africa culture image'
            />
          </section>

          <section className='pricing'>
            <div className='wrapper'>
              <div className='pricing-container'>
                <h2>
                  <span>
                    Encontre ferramentas ideais para a jornada do seu negócio
                  </span>
                </h2>

                <h3>
                  Adira ao programa beta e crie a sua loja, não se preocupando
                  com limites de vendas, produtos ou visitas:{' '}
                </h3>

                <div className='plans-container'>
                  {pricing_data.map((plan, index) => (
                    <motion.div
                      key={index.toString()}
                      whileHover={{
                        boxShadow: `0 0 25px rgba(${theme.accent}, 0.09)`,
                        border: '1px solid transparent'
                      }}>
                      <h4>{plan.type}</h4>
                      <h3>{plan.title}</h3>
                      <ul>
                        {plan.description.map((phrase, index) => (
                          <li key={index.toString()}>• {phrase};</li>
                        ))}
                      </ul>
                      <Link href={plan.url}>
                        <IoBalloonOutline />
                        <span>{plan.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </article>
        <NewsLetter />
      </Container>
    </Layout>
  );
}
