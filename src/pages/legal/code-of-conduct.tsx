import Layout from '@/components/Layout';
import { complements } from '@/shared/data';
import { _legal as Container } from '@/styles/common/legal';

export default function CodeOfConduct() {
  return (
    <Layout
      metadata={{ title: complements.defaultTitle + ' | Código de Conduta' }}>
      <Container>
        <article className='code-of-conduct-container'>
          <section>
            <h1>Código de Conduta</h1>
          </section>

          <h2>Sumário</h2>
          <div className='resumo'>
            <p>
              A noosa plataforma online é dedicada a fornecer uma experiência
              livre de assédio para todos, independentemente de gênero e
              identidade de gênero, idade, orientação sexual, deficiência,
              aparência física, tamanho do corpo, raça ou religião (ou falta
              dela). Não toleramos qualquer forma de assédio aos ou dos usuários
              e clientes.
            </p>

            <p>
              Linguagem e imagens sexuais nunca são apropriadas. Os
              participantes que violarem essas regras podem ser sancionados ou
              expulsos a critério dos administradores.
            </p>
          </div>

          <h2>Nosso compromisso</h2>
          <p>
            No interesse de promover um ambiente aberto e acolhedor, nós, como
            colaboradores e administradores, nos comprometemos a tornar a
            participação em nosso projeto e em nossa comunidade uma experiência
            livre de assédio para todos, independentemente de idade, tamanho
            corporal, deficiência, etnia, características sexuais, identidade de
            gênero e expressão, nível de experiência, educação, status
            socioeconômico, nacionalidade, aparência pessoal, raça, religião ou
            identidade e orientação sexual.
          </p>

          <h2>A conduta a ser seguida</h2>

          <p>
            A {complements.defaultTitle} se dedica a fornecer uma experiência
            livre de assédio para todos. Não toleramos qualquer forma de assédio
            ou abuso aos nossos usuários e clientes. Este código de conduta se
            aplica a todos os espaços da {complements.defaultTitle}, tanto
            online quanto offline. Quem infringir este código de conduta poderá
            ser sancionado ou expulso destes espaços a critério do dos
            administradores da plataforma.
          </p>

          <p>
            Alguns espaços da {complements.defaultTitle} podem ter regras
            adicionais em vigor, que serão claramente disponibilizadas aos
            usuários e clientes. Os usuários e clientes são responsáveis ​​por
            conhecer e cumprir estas regras.
          </p>

          <h2>
            Nossos padrões e exemplos de comportamento que contribuem para criar
            um ambiente positivo e saudável incluem, mas não são limitados a:
          </h2>

          <ul>
            <li>O uso de uma linguagem acolhedora e inclusiva;</li>
            <li>
              Ser respeitoso com os diferentes pontos de vista e experiências
            </li>
            <li>Aceitando graciosamente críticas construtivas;</li>
            <li>Foco no que é melhor para a comunidade;</li>
            <li>Mostrar empatia para com outros membros da comunidade.</li>
          </ul>

          <h2>As formas de assédio incluem, mas não são limitadas a:</h2>

          <ul>
            <li>
              Comentários ofensivos relacionados a gênero, identidade e
              expressão de gênero, orientação sexual, deficiência, doença
              mental, neuro(a)tipicidade, aparência física, tamanho do corpo,
              idade, raça ou religião;
            </li>
            <li>
              Comentários indesejados sobre as escolhas e práticas de estilo de
              vida de uma pessoa, incluindo aqueles relacionados a alimentação,
              saúde, paternidade, drogas e emprego;
            </li>
            <li>
              Erro deliberado de gênero ou uso de nomes 'mortos' ou rejeitados;
            </li>
            <li>
              Imagens ou comportamentos sexuais gratuitos ou fora do assunto em
              espaços onde não são apropriados;
            </li>
            <li>
              Contato físico e contato físico simulado (por exemplo, descrições
              textuais como "abraço" ou "massagem nas costas") sem consentimento
              ou após um pedido para parar;
            </li>
            <li>Ameaças de violência física ou intelectual;</li>
            <li>
              Incitação à violência contra qualquer indivíduo, incluindo
              encorajar uma pessoa a cometer suicídio ou se automutilar;
            </li>
            <li>Intimidação deliberada;</li>
            <li>Perseguir ou seguir;</li>
            <li>
              Fotografia ou gravação de assédio, incluindo registro de
              atividades online para fins de assédio;
            </li>
            <li>Interrupção sustentada da discussão;</li>
            <li>Atenção sexual indesejada;</li>
            <li>
              Padrão de contato social inadequado, como solicitar/assumir níveis
              inadequados de intimidade com outras pessoas;
            </li>
            <li>
              Comunicação individual contínua após a cessação dos pedidos;
            </li>
            <li>
              "Exibição" deliberada de qualquer aspecto da identidade de uma
              pessoa sem seu consentimento, exceto quando necessário para
              proteger pessoas vulneráveis ​​de abuso intencional;
            </li>
            <li>Publicação de comunicação privada sem assédio.</li>
          </ul>

          <h2>
            A {complements.defaultTitle} prioriza a segurança das pessoas
            marginalizadas em detrimento do conforto das pessoas privilegiadas
            e, portanto, não iremos agir sobre reclamações relacionadas a:
          </h2>
          <ul>
            <li>
              <em>'Reversos'-ismos</em>, incluindo 'racismo reverso', 'sexismo
              reverso' e 'cisfobia';
            </li>
            <li>
              Comunicação razoável de limites, como "me deixe em paz", "vá
              embora" ou "não estou discutindo isso com você";
            </li>
            <li>Comunicar em um 'tom' que você não acha agradável;</li>
            <li>
              Criticar comportamentos ou suposições racistas, sexistas,
              cissexistas ou de outra forma opressivas.
            </li>
          </ul>

          <h2>Precisa de ajuda?</h2>
          <p>
            Caso você tenha qualquer dúvida sobre o nosso Código de Conduta, por
            favor, entre em contato pelo e-mail{' '}
            <strong>{complements.email}</strong>.
          </p>
          <p>
            Todas as reclamações serão analisadas e investigadas e resultarão em
            uma resposta que se julgue necessária e adequada às circunstâncias.
            A equipe do projeto é obrigada a manter a confidencialidade em
            relação ao relator de um incidente. Mais detalhes sobre políticas de
            execução específicas podem ser publicados separadamente.
          </p>

          <div className='attribution'>
            <p>
              Algumas partes deste Código de Conduta foi adaptado do{' '}
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://www.contributor-covenant.org/version/1/4/code-of-conduct'>
                Contributor Covenant
              </a>
              , versão 1.4.
            </p>
          </div>
        </article>
      </Container>
    </Layout>
  );
}
