import Layout from '@/components/Layout';
import { complements } from '@/data/app-data';
import { motion } from 'framer-motion';
import { useTheme } from 'styled-components';
import { AboutContainer as Container } from '../../styles/common/about';
import { IoIosQuote } from 'react-icons/io';
import NewsLetter from '@/components/Newsletter';

export default function About(): JSX.Element {
  const theme = useTheme();
  const core_habits = [
    {
      phrase:
        'Entregar o melhor período de experiência aos usuários e clientes.',
      paragraph: 'Detalhes importam, adicione valor a cada interação.'
    },
    {
      phrase: 'A normalidade é tediosa e irritante.',
      paragraph: 'Procure novos desafios a cada momento.'
    },
    {
      phrase: 'Sem políticas burocráticas.',
      paragraph: 'Seja direto. Vá direto.'
    },
    {
      phrase: 'Faça a p*rra de uma vez e vá se divertir aos montes.',
      paragraph: 'Trabalhe seriamente nas coisas certas com urgência.'
    },
    {
      phrase: 'Cresça 1% todos os dias.',
      paragraph:
        'Interaja e faça progresso almejando a perfeição. Adote uma mentalidade de sucesso.'
    },
    {
      phrase: 'Actos aleatórios de bondade',
      paragraph: 'Seja um líquido positivo.'
    }
  ];
  return (
    <Layout metadata={{ title: complements.defaultTitle + ' | Sobre nós' }}>
      <Container>
        <article>
          <section>
            <h1>
              Não somos os melhores, mas queremos dar o nosso melhor para o
              nosso maravilhoso Moçambique.
            </h1>
            <h2>
              Projecto feito por jovens empreendedores moçambicanos para
              contribuir o desenvolvimento da economia e do espaço tecnológico
              moçambicano.
            </h2>
            <div className='mozambique-colors' />
          </section>

          <section className='introdution'>
            <p>
              Acreditamos que o nosso país é um mar de oportunidades económicas
              e empresariais, ainda mais com a promissora população jovem que
              compoe a nossa nação. O nosso contributo é ajudar a impulsionar e
              nutrir a espírito de empreendedorismo em nossos corações,
              construindo com cada passo dado a nossa liberdade em criar
              soluções digitais que facilitam o nosso dia-a-dia.
            </p>
          </section>

          <blockquote>
            <p>
              "Um bom espaço de trabalho combina pessoas excepcionais e
              problemas desafiadores" - Kain Nhantumbo
            </p>
          </blockquote>

          <section className='mission-container'>
            <div className='motto'>
              <h3>
                <span>Nossa</span> missão
              </h3>
              <p>
                Enquanto nós amamos a produtividade no nosso dia-a-dia,
                percebemos que a produtividade está em si, inalcansável. Tem
                tantas ferramentas para auxiliar no gerenciamento dos nossos
                negócios e vendas, mas tudo em diferentes ecossistemas. Deve
                haver uma maneira melhor de se trabalhar com mais eficiência -
                por isso, criamos a {complements.defaultTitle}, uma ferramenta
                mais moderna, cá da terra, agora como uma maneira de tornar a
                nossa visão de fazer as coisas de forma mais produtiva.
              </p>
              <p>
                Eventualmente, o nosso objectivo é ajudar a crescer e dar maior
                visibilidade aos negócios, vendas e campanhas de marketing dos
                usuários e, fazendo com que as suas actividades de laborais
                sejam gerenciadas na nossa plataforma, ajudando as pessoas serem
                mais produtivas e retornando pelo menos 20% do seu tempo de
                volta para dedicar a vida a outras coisas. Uma ferramenta para
                substituir todas. Nós estamos apenas começando e somos muito
                gratos pelo apoio da comunidade que está com a nossa equipe
                nesta jornada.
              </p>
            </div>
            <div className='corner-motto'>
              <i>Economizar mais tempo </i> fazendo com que sejamos mais
              produtivos...
            </div>
          </section>

          <section className='core-habits-container'>
            <h2>Hábitos Essenciais ❤</h2>
            <div className='core-habits-container_items'>
              {core_habits.map((habit, index) => (
                <motion.div
                  key={index.toString()}
                  initial={{ scale: 0 }}
                  whileInView={{
                    scale: 1,
                    transition: { duration: 0.5, bounce: 1 }
                  }}
                  whileHover={{
                    translateY: -8,
                    boxShadow: `0px 20px 25px rgba(${theme.accent}, 0.09)`
                  }}
                  className={`core-habit ${'item' + index.toString()}`}>
                  <h3>{'0'.concat(Number(index + 1).toString())}</h3>
                  <p>{habit.phrase}</p>

                  <strong>Hábitos essenciais</strong>
                  <span>{habit.paragraph}</span>
                </motion.div>
              ))}
            </div>
          </section>

          <section className='our-motto-container'>
            <h3>
              <span>Nosso</span> lema
            </h3>
            <h2>
              Cresça e produza mais conosco <IoIosQuote />{' '}
            </h2>

            <p>
              A nossa equipe é energética e apaixonada pelo mercado dos grandes
              negócios. Queremos que desenvolva relações prósperas com a
              comunidade {complements.defaultTitle} e alcance os seus objetivos.
            </p>
          </section>
        </article>
        <NewsLetter />
      </Container>
    </Layout>
  );
}
