import Layout from '@/components/Layout';
import { constants, pricing_data } from '@/data/constants';
import { formatCurrency } from '@/lib/utils';
import { _pricing as Container } from '@/styles/common/pricing';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { IoBalloonOutline } from 'react-icons/io5';
import { useTheme } from 'styled-components';

export default function Pricing() {
  const theme = useTheme();

  return (
    <Layout
      metadata={{
        title: String.prototype.concat(constants.defaultTitle, ' | Preçário')
      }}>
      <Container>
        <article>
          <section className='introdution-container'>
            <h1>Quanto custa ter uma loja integrada na {constants.defaultTitle}?</h1>
            <p>Confira nossos planos e preços e, comece o seu negócio em poucos minutos.</p>
          </section>

          <section className='pricing'>
            <div className='wrapper'>
              <div className='pricing-container'>
                <div className='plans-container'>
                  {pricing_data.map((plan, index) => (
                    <motion.div
                      key={index.toString()}
                      whileHover={{
                        boxShadow: `0 0 25px rgba(${theme.black}, 0.09)`,
                        border: '1px solid transparent'
                      }}>
                      <h4>{plan.type}</h4>
                      <h3>{plan.title}</h3>

                      <h5>
                        <strong>{formatCurrency(plan.amount)}</strong>
                      </h5>

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

          <section className='body-container'>
            <h2>
              <span>Por que escolher a {constants.defaultTitle}?</span>
            </h2>
            <p>
              A {constants.defaultTitle} é uma ótima opção de plataforma de e-commerce
              estável, segura e completa que oferece toda a estrutura necessária para
              estabelecer o seu espaço comercial na internet. Além disso, tem outras
              vantagens. Confira a seguir:
            </p>

            <div>
              <h3>Sem limite de visitas, produtos ou vendas</h3>
              <p>
                Monte a sua loja virtual integrada sem pagar mensalidade e sem custos por
                venda.
              </p>
            </div>
            <div>
              <h3>É fácil de configurar</h3>
              <p>
                São apenas alguns passos para você começar a vender: crie a sua conta,
                configure a sua loja, adicione os seus produtos e escolha o plano de
                subscrição (Gratuito para começar). E já está: tudo preparado para começar a
                vender.
              </p>
            </div>
            <div>
              <h3>Todas as suas vendas em um único lugar</h3>
              <p>
                Acompanhe as suas vendas e seus resultados pelo nosso painel de controle e
                entenda o que está indo bem e o que precisa de mais atenção na sua loja.
              </p>
            </div>
            <div>
              <h3>A ajuda que você precisa</h3>
              <p>
                Conte com o nosso suporte humanizado no momento que você precisar ou então
                explore os nossos tutoriais em nosso blog para satisfazer todas as suas
                dúvidas.
              </p>
            </div>
          </section>
        </article>
      </Container>
    </Layout>
  );
}
