import Layout from '@/components/Layout';
import NewsLetter from '@/components/Newsletter';
import { constants } from '@/data/constants';
import { _about as Container } from '@/styles/common/about';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { IoIosQuote } from 'react-icons/io';
import { IoStorefrontOutline } from 'react-icons/io5';
import { useTheme } from 'styled-components';

const core_habits: Array<{ phrase: string; paragraph: string }> = [
  {
    phrase: 'Entregar o melhor período de experiência aos usuários e clientes.',
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
    phrase: 'Faça as tarefas de uma vez e vá se divertir aos montes.',
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

export default function About() {
  const theme = useTheme();
  return (
    <Layout metadata={{ title: constants.defaultTitle + ' | Sobre nós' }}>
      <Container>
        <article>
          <section>
            <h1>
              Não somos os melhores, mas queremos dar o nosso melhor para o nosso
              maravilhoso Moçambique.
            </h1>
            <h2>
              Projecto feito por jovens empreendedores moçambicanos para contribuir o
              desenvolvimento da economia e do espaço tecnológico moçambicano.
            </h2>
            <div className='mozambique-colors' />
          </section>

          <section className='introdution'>
            <p>
              Acreditamos que o nosso país é um mar de oportunidades económicas e
              empresariais, ainda mais com a promissora população jovem que compoe a nossa
              nação. O nosso contributo é ajudar a impulsionar e nutrir a espírito de
              empreendedorismo em nossos corações, construindo com cada passo dado a nossa
              liberdade em criar soluções digitais que facilitam o nosso dia-a-dia.
            </p>
            <p>
              No entanto, um dos nossos maiores pilares é a produtividade e desempenho no
              trabalho. Enquanto nós amamos a produtividade, percebemos que a produtividade
              está em si, inalcansável. Tem tantas ferramentas para auxiliar no
              gerenciamento dos nossos negócios e vendas, mas tudo em diferentes
              ecossistemas. Deve haver uma maneira melhor de se trabalhar com mais
              eficiência - por isso, criamos a {constants.defaultTitle}, uma ferramenta mais
              moderna, cá da terra, agora como uma maneira de tornar a nossa visão de fazer
              as coisas de forma mais produtiva.
            </p>
            <p>
              Claramente, o nosso objectivo é ajudar a crescer e dar maior visibilidade aos
              negócios, vendas e campanhas de marketing dos usuários e, fazendo com que as
              suas actividades de laborais sejam gerenciadas na nossa plataforma, ajudando
              as pessoas serem mais produtivas e retornando pelo menos 20% do seu tempo de
              volta para dedicar a vida a outras coisas. Uma ferramenta para substituir
              todas. Nós estamos apenas começando e somos muito gratos pelo apoio da
              comunidade que está com a nossa equipe nesta jornada.
            </p>
          </section>

          <blockquote>
            <p>
              "Um bom espaço de trabalho combina pessoas excepcionais e problemas
              desafiadores." - Kain Nhantumbo
            </p>
          </blockquote>

          <section className='mission-container'>
            <div className='motto'>
              <h3>
                ❤ <span>Nossa</span> missão
              </h3>
              <p>
                Os pequenos e médios negócios contribuem significativamente e fortalecem a
                economia moçambicana. Sua tenacidade, perceverança e sonhos representam a
                espinha dorsal da nossa força de trabalho.
              </p>

              <p>
                Mas esses negócios enfrentam desafios desproporcionais ao seu tamanho e
                recursos. E os provedores de tecnologia se concentram principalmente nas
                atividade das grandes empreendimentos, criando serviços fora do contato e
                fora do alcance de pequenos e médios negócios.
              </p>
              <p>
                Na {constants.defaultTitle}, nossa missão é nivelar o campo de jogo para os
                pequenos e médios empreendimentos que alimentam a nossa economia.
              </p>
            </div>
            <div className='corner-motto'>
              <i>Economizar mais tempo </i> fazendo com que sejamos mais produtivos...
            </div>
          </section>

          <section className='core-habits-container'>
            <h3>
              ❤ <span>Hábitos</span> que apoiam a nossa visão
            </h3>
            <div className='core-habits-container_items'>
              {core_habits.map((habit, index) => (
                <motion.div
                  key={index.toString()}
                  initial={{ scale: 0 }}
                  drag={true}
                  dragConstraints={{ top: 0, left: 0, bottom: 0, right: 0 }}
                  dragElastic={0.3}
                  whileInView={{
                    scale: 1,
                    transition: { duration: 0.5, bounce: 1 }
                  }}
                  whileHover={{
                    translateY: -8,
                    boxShadow: `0px 20px 30px 10px rgba(${theme.black}, 0.09)`
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
              ❤ <span>Nosso</span> lema
            </h3>
            <h2>
              Cresça e produza mais conosco <IoIosQuote />{' '}
            </h2>

            <p>
              A nossa equipe é energética e apaixonada pelo mercado dos pequenos e médios
              negócios e quer ajudar na sua evolução. Queremos que desenvolva relações
              prósperas com a comunidade {constants.defaultTitle} e alcance os seus
              objetivos.
            </p>
            <Link href={'/auth/sign-in'}>
              <IoStorefrontOutline />
              <span>Junte-se a nós!</span>
            </Link>
          </section>
        </article>
        <NewsLetter />
      </Container>
    </Layout>
  );
}
