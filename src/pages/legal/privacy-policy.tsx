import { NextPage } from 'next';
import Layout from '../../components/Layout';
import { LegalContainer as Container } from '../../styles/common/legal';
import { complements } from '@/data/app-data';

const PrivacyPolicy: NextPage = (): JSX.Element => (
  <Layout metadata={{ title: 'TravelSketchpad Privacy Policy' }}>
    <Container>
      <article>
        <section>
          <h1>Privacy Policy</h1>
        </section>
        <p>
          Your privacy is important to us. It is {complements.defaultTitle}{' '}
          policy respect your privacy in relation to any information about you
          that we can collect on the site{' '}
          <a href={complements.websiteUrl}>{complements.defaultTitle}</a>, and
          others websites we own and operate.
        </p>
        <p>
          We only ask for personal information when we really need it them to
          provide you with a service. We do it by fair means and law, with your
          knowledge and consent. We also inform why we are collecting it and how
          it will be used.
        </p>
        <p>
          We only retain collected information for as long as necessary to
          provide the requested service. When we store data, we protect within
          commercially acceptable means to avoid loss and theft, as well as
          access, disclosure, copying, use or modification not authorized.
        </p>
        <p>
          We do not share personally identifiable information publicly. or with
          third parties, except as required by law.
        </p>
        <p>
          Our site may have <em>links</em> to external sites that are not
          operated by us. Please be aware that we have no control over the
          content and practices of these sites and we cannot accept
          responsibility for their respective{' '}
          <a
            href='https://politicaprivacidade.com'
            target='_BLANK'
            rel='noreferrer'>
            privacy policies
          </a>
          .
        </p>
        <p>
          You are free to refuse our request for information. personal
          information, with the understanding that we may not be able to provide
          some of the desired services.
        </p>
        <p>
          Your continued use of our website will be considered acceptance of our
          practices around privacy and personal information. if you have any
          questions about how we handle user data and personal information,
          please contact us.
        </p>
        <h2>{complements.defaultTitle} Cookie Policy</h2>
        <h3>What are cookies?</h3>
        <p>
          As is common practice on almost all professional websites, this
          website uses cookies, which are small files downloaded to your
          computer to improve your experience. This page describes what
          information they collect, how we use it and why sometimes we need to
          store these cookies. We will also share how you can prevent these
          cookies from being stored, however, this can downgrade or 'break'
          certain elements of the website functionality.
        </p>
        <h3>How do we use cookies?</h3>
        <p>
          We use cookies for a variety of reasons, detailed below.
          Unfortunately, in most cases, there are no default options for the
          sector to disable cookies without completely disabling the
          functionality and features they add to this site. IT IS recommended
          that you leave all cookies if you are not sure whether whether or not
          you need them if they are used to provide a service that you use.
        </p>
        <h3>Disable cookies</h3>
        <p>
          You can prevent cookies from being set by adjusting the your browser
          settings (see browser Help for know how to do it). Please be aware
          that disabling cookies will affect the functionality of this and many
          other websites that you visit. Disabling cookies will generally result
          in deactivation of certain functionality and features of this website.
          Therefore, it is recommended that you do not disable cookies.
        </p>
        <h3>Cookies we set:</h3>
        <ul>
          <li>
            <strong>Account-related cookies</strong>
            <br></br> If you create an account with us, we will use cookies to
            management of the application process and general administration.
            These cookies will generally be deleted when you leave the system,
            however, in some cases, they may remain later to remember your site
            preferences when you exit.
            <br></br>
          </li>
          <li>
            <strong>Login related cookies</strong>
            <br></br> We use cookies when you are logged in, so that we can
            remember this action. This saves you from having to do login
            whenever you visit a new page. These cookies are normally removed or
            cleared when you log out to ensure that you can only access
            resources and areas restricted when logging in.
            <br></br>
          </li>
          <li>
            <strong>Email newsletter related cookies</strong>
            <br></br> This site offers newsletter subscription services
            newsletter or email and cookies may be used to remember if you are
            already registered and whether to show certain notifications only
            valid for subscribed / non-subscribed users registered.<br></br>
          </li>
          <li>
            <strong>Orders processing related cookies</strong>
            <br></br> This site offers e-commerce facilities or payment and some
            cookies are essential to ensure that your order is remembered
            between pages so that we can process it properly.<br></br>
          </li>
          <li>
            <strong>Search-related cookies</strong>
            <br></br> Periodically, we offer surveys and questionnaires to
            provide interesting information, useful tools or to understand our
            user base more accurately. These surveys may use cookies to remember
            who has already participated in a survey or to provide accurate
            results after changing pages.
            <br></br>
          </li>
          <li>
            <strong>Form-related cookies</strong>
            <br></br> When you submit data through a form like those found on
            the contact pages or in the registration forms comments, cookies can
            be set to remember the User details for future correspondence.
            <br></br>
          </li>
          <li>
            <strong>Site Preference Cookies</strong>
            <br></br> To provide you with a great experience on this site, we
            provide the functionality to set your preferences for how that
            website runs when you use it. To remember your preferences, we need
            to set cookies so that these information can be called up whenever
            you interact with a page is affected by your preferences.
            <br></br>
          </li>
        </ul>
        <h3>Third Party Cookies</h3>
        <p>
          In some special cases, we also use cookies provided by trusted third
          parties. The following section details which cookies from third
          parties you can find through this website.
        </p>
        <ul>
          <li>
            This website uses Google Analytics, which is one of the most
            widespread and trusted analytics on the Web to help us understand
            how you use the site and how we can improve your experience. These
            cookies can track things like how long you spend on the site and the
            pages you visit, so that we can keep producing compelling content.
          </li>
        </ul>
        <p>
          For more information about Google Analytics cookies, see the official
          Google Analytics page.
        </p>
        <ul>
          <li>
            Third-party analytics are used to track and measure usage of this
            site, so that we can continue to produce content attractive. These
            cookies can track things like the time you passes on the website or
            the pages visited, which helps us to understand how we can improve
            the site for you.
          </li>
          <li>
            We periodically test new features and make changes subtle in the way
            the site presents itself. when we are still testing new features,
            these cookies may be used to ensure you receive a consistent
            experience while is on the site, while we understand what
            optimizations our users appreciate most.
          </li>
          <li>
            As we sell products, it is important that we understand the
            statistics on how many visitors to our site actually buy and so this
            is the type of data these cookies will track. This is important to
            you as it means that we can make accurate business predictions that
            allow us to analyze our advertising and product costs to ensure the
            best possible price.
          </li>
        </ul>
        <h3>User Commitment</h3>
        <p>
          The user undertakes to make proper use of the contents and information
          that <strong>{complements.defaultTitle}</strong> offers on the site
          and with enunciative character, but not limiting:
        </p>
        <ul>
          <li>
            A) Not to engage in activities that are illegal or contrary to the
            good faith and public order;
          </li>
          <li>
            B) Not to disseminate ads or content of a racist nature, xenophobic,{' '}
            <a href='https://ondeapostar.pt/onde-da-a-bola/'>Onde dá a Bola</a>{' '}
            or bad luck, any kind of illegal pornography, in support of
            terrorism or against human rights;
          </li>
          <li>
            C) Do not cause damage to physical (hardware) and logical systems
            (software) from <strong>{complements.defaultTitle}</strong>, its
            suppliers or third parties, to introduce or disseminate computer
            viruses or any other hardware or software systems that are capable
            of causing the aforementioned damage.
          </li>
        </ul>
        <h3>More information</h3>
        <p>
          Let's hope it's clarified and, as mentioned earlier, if there's
          something you're not sure you need or not, it is generally safer to
          leave cookies enabled in case you interact with one of the features
          you use on our website.
        </p>
        <p>
          This policy is effective as of <strong>April 2023</strong>.
        </p>
      </article>
    </Container>
  </Layout>
);

export default PrivacyPolicy;
