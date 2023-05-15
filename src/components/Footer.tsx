import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiDotsHorizontal } from 'react-icons/hi';
import { complements, urls } from '@/data/app-data';
import { FooterContainer as Container } from '../styles/common/footer';
import { IoNewspaperOutline, IoPaperPlaneOutline } from 'react-icons/io5';

export default function Footer(): JSX.Element {
  return (
    <Container>
      <section className='navigation'>
        <nav>
          <section>
            <h3>
              <IoPaperPlaneOutline/>
              <span>Navegação</span>
            </h3>
            <div className='elements'>
              {urls.map((item, index) => (
                <Link key={index.toString()} href={item.url}>
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </section>
          <section>
            <h3>
              <IoNewspaperOutline/>
              <span>Legal e Contacto</span>
            </h3>
            <div className='elements'>
              <Link href={'/legal/privacy-policy'}>
                <span>Política de Privacidade</span>
              </Link>
              <Link href={'/legal/terms-and-conditions'}>
                <span>Termos e Condições</span>
              </Link>
              <Link href={'/contact'}>
                <span>Contacto</span>
              </Link>
            </div>
          </section>
        </nav>
      </section>

      <div className='social-container'>
        <div className='logo'>
          <span>{complements.defaultTitle}</span>
        </div>
        <div className='social-media'>
          {complements.socialMedia.map((option) => (
            <motion.a
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              href={option.url}
              title={option.name}
              target={'_blank'}
              rel={'noreferrer noopener'}
              key={option.name}>
              {<option.icon />}
            </motion.a>
          ))}
        </div>
      </div>

      <section>
        <div className='copyright'>
          <span>&copy; {complements.copyrightSentence}</span>
        </div>
      </section>
    </Container>
  );
}
