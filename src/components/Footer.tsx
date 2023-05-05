import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiDotsHorizontal } from 'react-icons/hi';
import { footerProps, urls } from '@/data/app-data';
import { FooterContainer as Container } from '../styles/common/footer';

export default function Footer(): JSX.Element {
  return (
    <Container>
      <section className='navigation'>
        <h2>
          <HiDotsHorizontal />
          <span>{footerProps.blogName} blog</span>
        </h2>
        <nav>
          <section>
            {urls.map((item, index) => (
              <Link key={index.toString()} href={item.url}>
                <span>{item.name}</span>
              </Link>
            ))}
          </section>
          <section>
            <Link href={'/legal/privacy-policy'}>
              <span>Política de Privacidade</span>
            </Link>
            <Link href={'/legal/terms-and-conditions'}>
              <span>Termos e Condições</span>
            </Link>
            <Link href={'/contact'}>
              <span>Contacto</span>
            </Link>
          </section>
        </nav>
      </section>

      <div className='social-container'>
        <div className='logo'>
          <span>
            Travel<i>Sketchpad</i>
          </span>
        </div>
        <div className='social-media'>
          {footerProps.socialMedia.map((option) => (
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
          <span>&copy; {footerProps.copyrightSentence}</span>
        </div>
      </section>
    </Container>
  );
}
