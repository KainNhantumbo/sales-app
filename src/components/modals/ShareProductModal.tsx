import {
  FaFacebook,
  FaLinkedinIn,
  FaPinterest,
  FaTwitter
} from 'react-icons/fa';
import { complements } from '@/data/app-data';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import {
  IoArrowBackOutline,
  IoArrowUndo,
  IoClose,
  IoShare,
  IoShareSocial,
  IoStop
} from 'react-icons/io5';
import { ShareProductContainer as Container } from '../../styles/modules/share-product-modal';

export default function ShareProducts(): JSX.Element {
  const { state, shareProductController } = useAppContext();

  const getProductdata = () => {
    const productId = state.isShareProductModal.productId;
    if (productId) {
      const [foundProduct] = state.productList.filter(
        (product) => product._id === productId
      );

      return [
        {
          name: 'Compartilhe no LinkedIn',
          url: `https://www.linkedin.com/shareArticle?mini=true&url=${complements.websiteUrl}/ecommerce/products/${foundProduct._id}&title=${foundProduct.name}&summary=${foundProduct.category}`,
          icon: FaLinkedinIn
        },
        {
          name: 'Compartilhe no Facebook',
          url: `https://www.facebook.com/sharer/sharer.php?u=${complements.websiteUrl}/ecommerce/products/${foundProduct._id}`,
          icon: FaFacebook
        },
        {
          name: 'Compartilhe no Twitter',
          url: `https://twitter.com/intent/tweet?text=${complements.websiteUrl}/ecommerce/products/${foundProduct._id}`,
          icon: FaTwitter
        },
        {
          name: 'Compartilhe no Pinterest',
          url: `https://pinterest.com/pin/create/button/?url=${complements.websiteUrl}/ecommerce/products/${foundProduct._id}&media=${complements.websiteUrl}/ecommerce/products/${foundProduct._id}&description=${foundProduct.category}`,
          icon: FaPinterest
        }
      ];
    }
    return [];
  };

  const options = getProductdata();

  return (
    <AnimatePresence>
      {state.isShareProductModal.status && (
        <Container
          className='main'
          onClick={(e: any): void => {
            const target = (e as any).target.classList;
            if (target.contains('main')) {
              shareProductController(false, '');
            }
          }}>
          <motion.section
            className='dialog-modal'
            initial={{ y: 500 }}
            animate={{
              y: 0,
              transition: {
                duration: 0.45
              }
            }}
            exit={{
              y: 500,
              transition: {
                duration: 0.45
              }
            }}>
            <div className='dialog-prompt'>
              <div className='top'>
                <h2>
                  <IoShareSocial />
                  <span>Compartilhar na Produto </span>
                </h2>
                <button
                  className='quit'
                  title='Close'
                  onClick={() => shareProductController(false, '')}>
                  <IoClose />
                </button>
              </div>
              <section className='prompt-info'>
                {options.length > 0 &&
                  options.map((option, index) => (
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
                <button
                  className='prompt-cancel'
                  onClick={() => shareProductController(false, '')}>
                  <IoArrowUndo />
                  <span>Cancelar</span>
                </button>
              </div>
            </div>
          </motion.section>
        </Container>
      )}
    </AnimatePresence>
  );
}
