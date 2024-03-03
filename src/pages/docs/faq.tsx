import Layout from '@/components/Layout';
import { complements } from '@/data/data';
import { _legal as Container } from '@/styles/common/legal';
import { BsCreditCard2Front, BsTruck } from 'react-icons/bs';
import { IoBulb, IoCogOutline, IoFootsteps } from 'react-icons/io5';

export default function FAQ() {
  return (
    <Layout
      metadata={{
        title: complements.defaultTitle + ' | Perguntas Frequêntes'
      }}>
      <Container>
        <article className='faq-container'>
          <section className='introdution-container'>
            <h1>Perguntas Frequêntes</h1>
            <p>
              O que é a {complements.defaultTitle}? Como crio minha loja com a{' '}
              {complements.defaultTitle}? Responderemos todas suas perguntas
              para que possa vender pela internet de forma fácil e profissional.
            </p>
          </section>

          <h2>
            <IoFootsteps />
            <span>Primeiros passos</span>
          </h2>

          <p>
            A {complements.defaultTitle} oferece uma solução tecnológica de
            e-commerce pensada para que micro, pequenas, médias e grandes
            empresas possam criar sua própria loja online autogerenciável, sem a
            necessidade de conhecimentos técnicos.
          </p>

          <p>
            Criar uma loja virtual com a {complements.defaultTitle} é como ter
            uma loja física ou um <em>showroom</em>, mas na internet.
          </p>

          <p>
            A partir do painel de controle, os usuários podem gerenciar as suas
            informações e colocar seus produtos à venda. A solução também os
            ajuda a aumentar sua visibilidade por meio de aplicativos e
            ferramentas de marketing online integrados
          </p>

          <div className='section-container'>
            <h3>
              <strong>
                <span>Como instalo a {complements.defaultTitle}?</span>
              </strong>
            </h3>
            <p>
              Não precisa necessariamente instalar nada! Basta cadastrar-se e
              ativar a sua loja funcionando. A {complements.defaultTitle} se
              encarrega dos detalhes, para que você não precise instalar ou
              atualizar qualquer coisa e possa manter seu foco em seu negócio e
              não em coisas técnicas.
            </p>
          </div>
          <div className='section-container'>
            <h3>
              <strong>
                <span>O que preciso para começar a vender?</span>
              </strong>
            </h3>
            <p>Você vai precisar de:</p>
            <ul>
              <li>
                um endereço de e-mail (para registrar-se e receber
                notificações);
              </li>
              <li>algo para vender;</li>
              <li>fotografias interessantes do que você vende.</li>
            </ul>
            <p>E, isso é tudo.</p>
          </div>
          <div className='section-container'>
            <h3>
              <strong>
                <span>
                  A {complements.defaultTitle} se responsabiliza por gerar
                  visitas? O que as pessoas precisam fazer para achar minha loja
                  e os meus produtos?
                </span>
              </strong>
            </h3>
            <p>
              Não, a {complements.defaultTitle} não se encarrega totalmentede
              gerar visitas em sua loja. Isto é uma responsabilidade
              compartilhada entre a {complements.defaultTitle} e você.
            </p>
            <p>
              Do nosso lado, te damos algumas ferramentas necessárias para que
              possa gerar visitas (integração com redes sociais, promoção de
              anúncios, etc.), oferecemos acesso ao nosso blog, com recursos que
              irão te guiar para que possa usar as ferramentas da melhor forma.
            </p>
            <p>
              Da sua parte, é preciso investir tempo e aprender a usar as
              ferramentas (se ainda não as conhece), usufruindo da{' '}
              {complements.defaultTitle} para que possa vender. Os clientes que
              mais investem na loja terminam obtendo canais muito mais
              rentáveis.
            </p>
          </div>
          <div className='section-container'>
            <h3>
              <strong>
                <span>
                  Em quais países e moedas a {complements.defaultTitle} pode ser
                  usada?
                </span>
              </strong>
            </h3>
            <p>
              Atualmente, a {complements.defaultTitle} pode ser usada Moçambique
              e com o metical como moeda de compra, venda e pagamento de
              serviços.
            </p>
          </div>
          <div className='section-container'>
            <h3>
              <strong>
                <span>
                  Em quais idiomas posso usar a {complements.defaultTitle}?
                </span>
              </strong>
            </h3>
            <p>
              A plataforma está, por padrão, em lingua portuguesa. Em breve
              teremos outras linguas disponíveis, mas enquanto isso, poderá
              utilizar o <em>Google Tradutor</em> disponível em seu navegador
              para obter traduções automáticas, caso prefira visualizar em outro
              idioma ainda não suportado.
            </p>
          </div>
          <div className='section-container'>
            <h3>
              <strong>
                <span>
                  Eu vendo pelo WhatsApp, Instagram ou Facebook e quero ter
                  minha própria loja. Como faço?
                </span>
              </strong>
            </h3>
            <p>
              Hoje em dia é realmente importante você ter sua loja virtual, com
              sua marca exposta do seu jeito, mas é importante manter integração
              com todos esses canais. Por isso, aqui na{' '}
              {complements.defaultTitle} damos a possibilidade de você manter
              seus produtos conectados com o Instagram e Facebook, além de
              facilitar a comunicação do seu cliente através do centro de
              mensagens.
            </p>
          </div>
          <div className='section-container'>
            <h3>
              <strong>
                <span>
                  Já vendo/vendi por outras plataformas e agora decidi ter minha
                  própria loja. Como prosseguir?
                </span>
              </strong>
            </h3>
            <p>
              Se você vem do de outras plataformas, já sabe muito bem como
              funciona o mundo de vendas online. Aqui na{' '}
              {complements.defaultTitle} você pode abrir uma loja com sua
              própria marca e até pode continuar vendendo pelo de outras
              plataformas, sincronizando seus produtos entre as duas
              plataformas.
            </p>
          </div>

          <h2>
            <BsCreditCard2Front />
            <span>Pagamentos</span>
          </h2>
          <div className='section-container'>
            <h3>
              <strong>
                <span>De que maneira posso cobrar por minhas vendas?</span>
              </strong>
            </h3>
            <p>
              A {complements.defaultTitle} oferece integração com vários{' '}
              <em>gateways de pagamentos</em> (como o M-PESA), que permitem
              cobrar pelas suas vendas. Mas, você ainda pode cobrar suas vendas
              de maneira manual (offline, do seu jeito) se assim deseja.
            </p>
          </div>
          <div className='section-container'>
            <h3>
              <strong>
                <span>O que é um gateway de pagamento?</span>
              </strong>
            </h3>

            <p>
              <em>Gateways de pagamento</em> são plataformas que permitem
              realizar transações monetárias entre duas pessoas na internet.
              Para operar com elas, você precisará de um e-mail e, se possível,
              uma conta bancária para retirar o dinheiro logo. Alguns desses
              serviços pedem para apresentar alguma documentação ao habilitar a
              conta.
            </p>

            <p>
              O melhor dos gateways de pagamento é que eles simplificaram todo o
              processo de cobrança, tanto para o comprador quanto para vendedor.
            </p>
            <p>
              Atualmente, o M-PESA é meio de pagamento com o qual a{' '}
              {complements.defaultTitle} trabalha.
            </p>
          </div>

          <div className='section-container'>
            <h3>
              <strong>
                <span>
                  Posso aceitar pagamentos fora da {complements.defaultTitle}?
                </span>
              </strong>
            </h3>
            <p>
              Sim, claro. Você pode aceitar os pagamentos da maneira que
              preferir, de forma presencial ou pelo gateway de pagamento. Poderá
              também combiná-lo com o cliente e coordenando por e-mail ou
              telefone os detalhes de pagamento e envio.
            </p>
          </div>

          <h2>
            <BsTruck />
            <span>Entrega de Produtos</span>
          </h2>

          <div className='section-container'>
            <h3>
              <strong>
                <span>Como cobro pelos envios?</span>
              </strong>
            </h3>
            <p>
              Na internet é comum que o comprador fique encarregado dos custos
              de envio. Uma boa forma para cobrar o valor do frete, é incluir a
              taxa de envio no montante do produto.
            </p>
            <p>
              O valor do frete precisa ser é calculado de acordo com a
              localização do seu cliente e o peso da compra.
            </p>
            <p>
              Também há a flexibilidade para escolher a opção de oferecer frete
              grátis quando desejar, a partir de um certo valor de compra, para
              todas as vendas ou sob a condição que escolher.
            </p>
          </div>
          <div className='section-container'>
            <h3>
              <strong>
                <span>Como realizo as entregas?</span>
              </strong>
            </h3>
            <p>
              Recomendamos ter uma logística preparada para suas entregas antes
              de realizar a primeira venda. Para isso, o ideal é buscar maneiras
              de fazer envios enquanto ainda estiver montando sua loja.
            </p>
          </div>

          <h2>
            <IoCogOutline />
            <span>Sua conta</span>
          </h2>

          <div className='section-container'>
            <h3>
              <strong>
                <span>Quanto custa uma {complements.defaultTitle}?</span>
              </strong>
            </h3>
            <p>
              Temos vários planos para que você escolha aquele que melhor se
              adequa à natureza e o tamanho do seu negócio. A qualquer momento
              você poderá migrar de plano, à medida em que seu negócio for
              crescendo.
            </p>
          </div>
          <div className='section-container'>
            <h3>
              <strong>
                <span>
                  Como pago pelos serviços da {complements.defaultTitle}?
                </span>
              </strong>
            </h3>
            <p>
              Assim como é possível cobrar por suas vendas com um gateway de
              pagamento, o pagamento dos planos pode ser feito da mesma maneira.
            </p>
            <p>
              No painel de controle, acesse a seccção{' '}
              <strong>"Transações"</strong> para pagar pelo serviço desejado.
            </p>
          </div>
          <div className='section-container'>
            <h3>
              <strong>
                <span>Como é a cobrança pela {complements.defaultTitle}?</span>
              </strong>
            </h3>
            <p>
              A {complements.defaultTitle} funciona de modo pré-pago, ou seja,
              paga-se adiantado o tempo que se deseja utilizar. Uma vez que
              acaba o crédito da sua loja, você pode realizar um novo pagamento
              para continuar vendendo.
            </p>
            <p>
              Para experimentar nosso serviço, você contrá com 15 dias de uso
              gratuitos. Passado esse período, receberá um lembrete de pagamento
              e poderá decidir se quer continuar ou não com sua loja.
            </p>
          </div>
          <div className='section-container'>
            <h3>
              <strong>
                <span>Como faço para cancelar as minhas subscrições?</span>
              </strong>
            </h3>
            <p>
              Não precisa cancelar: ao não pagar por um novo período em sua
              loja, a mesma se desabilita (depois de alguns dias) e você não
              fica com nenhuma dívida.
            </p>
          </div>

          <h2>
            <IoBulb />
            <span>Precisa de Suporte?</span>
          </h2>
          <p>
            Caso você tenha qualquer dúvida sobre os nossos produtos e serviços,
            por favor, entre em contato pelo e-mail{' '}
            <strong>{complements.email}</strong>.
          </p>
        </article>
      </Container>
    </Layout>
  );
}
