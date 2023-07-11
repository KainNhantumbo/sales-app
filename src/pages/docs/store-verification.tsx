import Link from 'next/link';
import Layout from '../../components/Layout';
import { complements } from '@/data/app-data';
import { LegalContainer as Container } from '@/styles/common/legal';

const StoreVerification = (): JSX.Element => (
  <Layout
    metadata={{ title: complements.defaultTitle + ' | Verificação de Loja' }}>
    <Container>
      <article className='code-of-conduct-container'>
        <section>
          <h1>Verificação de Loja</h1>
        </section>

        <h2>Obtenção do Selo de Verificação de Loja</h2>

        <p>
          O sistema de obtenção de selo de <strong>Verificação de Loja</strong>{' '}
          foi criado para garantir a oferta de melhores serviços com segurança e
          de confiança aos clientes e usuários da plataforma. Isso significa que
          ter uma loja verificada, transmitirá confiabilidade nos serviços
          oferecidos pela loja.
        </p>

        <p>
          Prefirimos não restringir a publicação de anúncios de produtos sem que
          haja a Verificação de Loja. Contudo, os usuários e potenciais verão um{' '}
          <strong>
            grande alerta de inconfiabidade do proprietário da loja, por isso,
            apelamos para que verifique a sua loja
          </strong>
          .
        </p>

        <h2>Procedimento</h2>

        <p>
          O Processo de Obtenção de Selo de Verificação de Loja é simples. Siga
          atentamente as instruções abaixo para prossegir corretamente com o
          processo de verifição.
        </p>

        <ol>
          <li>
            Passo 1: escreva um e-mail para <strong>{complements.email}</strong>{' '}
            com o assunto{' '}
            <strong>
              "Pedido de Verificação de Loja da {complements.defaultTitle}"
            </strong>
            ;
          </li>
          <li>
            Passo 2: coloque em anexo duas fotos do seu documento de
            identificação (frente e verso); uma foto do tipo selfie segurando o
            seu documento de identificação (frente), tendo a imagem, boa
            qualidade e nítidez;
          </li>
          <li>
            Passo 3: No corpo do e-mail, escreva o seu nome completo (que deve
            ser o mesmo usado na plataforma e no seu documento de identificação)
            e o nome da sua loja.
          </li>
          <li>Passo 4: envie o e-mail.</li>
        </ol>

        <p>
          Após o cumprimento dos passos acima citados, aguarde a resposta da
          plataforma em até 72 horas, que poderá ser a marcação como loja
          verificada ou revogação do pedido.{' '}
        </p>

        <h2>Notas complementares e importantes</h2>
        <ul>
          <li>
            As requisições enviadas cujo conteúdo não obedeceça aos requisitos
            abaixo, serão automaticamente ignoradas pelo sistema
          </li>
          <li>
            Os documentos de identificação aceites para cidadãos nacionais são
            BI, Passaporte, Carta de Condução e para cidadãos estrangeiros Dire.
            Todos documentos devem estar dentro do prazo de validade.
          </li>
          <li>
            Todo anúncio de produto tem, por padrão, a validade de 6 meses. Após
            este período, o anúncio será automaticamente removido da plataforma,
            sendo necessário atualizar regularmente a sua loja.
          </li>
          <li>
            {' '}
            Os anúncios de produtos que violrem o nosso{' '}
            <Link href={'/legal/code-of-conduct'}>
              <span>código de conduta</span>
            </Link>{' '}
            ou os nossos{' '}
            <Link href={'/legal/terms-of-use'}>
              <span>termos e condições</span>
            </Link>{' '}
            serão desativados e se não houver reclamação, serão posteriormente
            excluidos. Isso inclui, mas não está limitado a: anúncios de
            produtos fora de qualidade, imagens defeituosas, erros no preçário,
            categorização errada, descrições falsas, duplicações do mesmo
            anúncio, entre outros erros considerados danos a plataforma.
          </li>
        </ul>

        <h2>Precisa de ajuda?</h2>
        <p>
          Caso você tenha qualquer dúvida sobre a verificação de Loja, por
          favor, entre em contato pelo e-mail{' '}
          <strong>{complements.email}</strong>.
        </p>
      </article>
    </Container>
  </Layout>
);

export default StoreVerification;