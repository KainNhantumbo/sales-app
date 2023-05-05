import Layout from '../../components/Layout';
import { NextPage } from 'next';
import { LegalContainer as Container } from '@/styles/common/legal';
import { complements } from '@/data/app-data';

const TermsPage: NextPage = (): JSX.Element => (
  <Layout metadata={{ title: 'Terms and Conditions' }}>
    <Container>
      <article>
        <section>
          <h1>Terms and Conditions</h1>
        </section>
        <p>
          When accessing the website{' '}
          <a href='/'>
            <strong>{complements.defaultTitle}</strong>
          </a>
          , you agree to abide by these terms of service, all laws and
          applicable regulations and agree that you are responsible for
          compliance with all applicable local laws. If you do not agree to any
          of these terms, you are prohibited from using or accessing this site.
          The materials contained on this site are protected by the applicable
          copyright and trademark laws.
        </p>
        <h2>2. License Usage</h2>
        <p>
          Permission is granted to temporarily download a copy of the materials
          (information or software) from our website for transient viewing only
          personal and non-commercial. This is the granting of a license, not a
          transfer of title and under this license you may not:{' '}
        </p>
        <ol>
          <li>modify or copy the materials;</li>
          <li>
            use the materials for any commercial purpose or to public viewing
            (commercial or non-commercial);
          </li>
          <li>
            attempt to decompile or reverse engineer any software contained on
            our website;
          </li>
          <li>
            remove any copyright or other notations from property of materials;
            or transfer the materials to another person or 'mirror' the
            materials on any other server.
          </li>
        </ol>
        <p>
          This license will automatically terminate if you violate any of these
          restrictions and may be terminated by{' '}
          <strong>{complements.defaultTitle}</strong> anytime. When closing the
          viewing these materials or upon termination of this license, you must
          delete all downloaded materials in your possession, whether in
          electronic or printed format.
        </p>

        <h2>3. Disclaimer</h2>
        <p>
          The materials on our website are provided 'as is'. No we make
          warranties, express or implied, and hereby disclaims and disclaims all
          other warranties, including, without limitation, implied warranties or
          conditions of merchantability, fitness for a specific purpose or
          non-infringement of intellectual property or other rights violation.
        </p>
        <p>
          In addition, we do not warrant or make any representations concerning
          the accuracy, likely results, or reliability of the use of the
          materials on your website or otherwise related to these materials or
          on sites linked to this site.
        </p>

        <h2>4. Limitations</h2>
        <p>
          In no event will we or our suppliers be responsible for any damages
          (including, without limitation, damages for loss of data or profit or
          due to business interruption) arising from the use or the inability to
          use the materials on our website, even if the{' '}
          <strong>{complements.defaultTitle}</strong> or an authorized
          representative has been notified orally or in writing of the
          possibility of such damage. As some jurisdictions do not allow
          limitations on warranties implied, or limitations of liability for
          consequential damages or incidentally, these limitations may not apply
          to you.
        </p>
        <h2>5. Precision of materials</h2>
        <p>
          Materials displayed on the <strong>{complements.defaultTitle}</strong>{' '}
          website may include technical, typographical or photographic errors.{' '}
          <strong>{complements.defaultTitle}</strong> does not warrant that any
          material on its website is accurate, complete or current.{' '}
          {complements.defaultTitle} can do changes to the materials contained
          on its website at any time, Without previous warning. However,{' '}
          <strong>{complements.defaultTitle}</strong> does not undertakes to
          update the materials.
        </p>
        <h2>6. Links</h2>
        <p>
          <strong>{complements.defaultTitle}</strong> has not analyzed all
          linked sites to its website and is not responsible for the content of
          any website linked. The inclusion of any link does not imply
          endorsement by <strong>{complements.defaultTitle}</strong> of the
          site. Use of any website linked is at the user's own risk.
        </p>
        <h3>Modifications</h3>
        <p>
          We may revise these terms of service website at any time without
          notice. When using this website, you agree to be bound by the current
          version of these terms of service.
        </p>
        <h3>Applicable law</h3>
        <p>
          These terms and conditions are governed by and construed in accordance
          with the laws of the <strong>Republic of Mozambique</strong> and you
          irrevocably submits to the exclusive jurisdiction of our courts state
          and locality.
        </p>
      </article>
    </Container>
  </Layout>
);

export default TermsPage;
