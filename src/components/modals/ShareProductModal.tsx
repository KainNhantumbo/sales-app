import { FaFacebook, FaLinkedinIn, FaPinterest, FaTwitter } from 'react-icons/fa';

import { useAppContext } from '@/context/AppContext';
import { constants } from '@/data/constants';
import { _shareProduct as Container } from '@/styles/modules/share-product-modal';
import { AnimatePresence, motion } from 'framer-motion';
import { IoClose, IoShareSocial } from 'react-icons/io5';

type Props = {
  name: string;
  category: string;
  productId: string;
};

export default function ShareProducts({ name, category, productId }: Props) {
  const { state, shareProductController } = useAppContext();

  const options = [
    {
      name: 'Compartilhe no LinkedIn',
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${constants.websiteUrl}/ecommerce/products/${productId}&title=${name}&summary=${category}`,
      icon: FaLinkedinIn
    },
    {
      name: 'Compartilhe no Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${constants.websiteUrl}/ecommerce/products/${productId}`,
      icon: FaFacebook
    },
    {
      name: 'Compartilhe no Twitter',
      url: `https://twitter.com/intent/tweet?text=${constants.websiteUrl}/ecommerce/products/${productId}`,
      icon: FaTwitter
    },
    {
      name: 'Compartilhe no Pinterest',
      url: `https://pinterest.com/pin/create/button/?url=${constants.websiteUrl}/ecommerce/products/${productId}&media=${constants.websiteUrl}/ecommerce/products/${productId}&description=${name}`,
      icon: FaPinterest
    }
  ];

  return (
    <AnimatePresence>
      {state.isShareProductModal && (
        <Container
          className='main'
          onClick={(e: any) => {
            const target = (e as any).target.classList;
            if (target.contains('main')) {
              shareProductController();
            }
          }}>
          <motion.section
            className='dialog-modal'
            initial={{ y: 700 }}
            animate={{ y: 0, transition: { duration: 0.45 } }}
            exit={{ y: 700, transition: { duration: 0.45 } }}>
            <div className='dialog-prompt'>
              <div className='top'>
                <h2>
                  <IoShareSocial />
                  <span>Compartilhar o produto</span>
                </h2>
                <button className='quit' title='Close' onClick={shareProductController}>
                  <IoClose />
                </button>
              </div>
              <section className='prompt-info'>
                {options.map((option, index) => (
                  <motion.a
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.8 }}
                    key={index.toString()}
                    target={'_blank'}
                    aria-label={option.name}
                    href={option.url}
                    rel={'noreferrer noopener'}>
                    <option.icon />
                    <span>{option.name}</span>
                  </motion.a>
                ))}
              </section>
              <div className='prompt-actions'>
                <button className='prompt-cancel' onClick={shareProductController}>
                  <IoClose />
                  <span>Fechar</span>
                </button>
              </div>
            </div>
          </motion.section>
        </Container>
      )}
    </AnimatePresence>
  );
}
