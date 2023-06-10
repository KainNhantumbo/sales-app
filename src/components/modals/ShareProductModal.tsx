import {
  FaFacebook,
  FaLinkedinIn,
  FaPinterest,
  FaTwitter,
} from 'react-icons/fa';
import fetch from '../../config/client';
import { Product } from '../../../@types';
import { useEffect, useState } from 'react';
import { complements } from '@/data/app-data';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import { IoClose, IoCloseCircle, IoShareSocial } from 'react-icons/io5';
import { ShareProductContainer as Container } from '../../styles/modules/share-product-modal';

type TProps = {
  productId: string;
};

export default function ShareProducts(props: TProps): JSX.Element {
  const { state, shareProductController } = useAppContext();
  const [data, setData] = useState<Product>();
  const [isError, setIsError] = useState<boolean>(false);

  const getResource = async (productId: string) => {
    try {
      const { data } = await fetch<Product>({
        method: 'get',
        url: `/api/v1/users/products/public/${productId}`,
      });
      setData(data);
    } catch (err: any) {
      setIsError(true);
      console.error(err?.response?.data?.message ?? err);
    }
  };

  useEffect(() => {
    getResource(props.productId);
    return () => setIsError(false);
  }, []);

  const getProductdata = () => [
    {
      name: 'Compartilhe no LinkedIn',
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${complements.websiteUrl}/ecommerce/products/${data?._id}&title=${data?.name}&summary=${data?.category}`,
      icon: FaLinkedinIn,
    },
    {
      name: 'Compartilhe no Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${complements.websiteUrl}/ecommerce/products/${data?._id}`,
      icon: FaFacebook,
    },
    {
      name: 'Compartilhe no Twitter',
      url: `https://twitter.com/intent/tweet?text=${complements.websiteUrl}/ecommerce/products/${data?._id}`,
      icon: FaTwitter,
    },
    {
      name: 'Compartilhe no Pinterest',
      url: `https://pinterest.com/pin/create/button/?url=${complements.websiteUrl}/ecommerce/products/${data?._id}&media=${complements.websiteUrl}/ecommerce/products/${data?._id}&description=${data?.name}`,
      icon: FaPinterest,
    },
  ];

  const options = getProductdata();

  return (
    <AnimatePresence>
      {state.isShareProductModal && (
        <Container
          className='main'
          onClick={(e: any): void => {
            const target = (e as any).target.classList;
            if (target.contains('main')) {
              shareProductController();
            }
          }}>
          <motion.section
            className='dialog-modal'
            initial={{ y: 500 }}
            animate={{
              y: 0,
              transition: {
                duration: 0.45,
              },
            }}
            exit={{
              y: 500,
              transition: {
                duration: 0.45,
              },
            }}>
            <div className='dialog-prompt'>
              <div className='top'>
                <h2>
                  <IoShareSocial />
                  <span>Compartilhar o produto</span>
                </h2>
                <button
                  className='quit'
                  title='Close'
                  onClick={shareProductController}>
                  <IoClose />
                </button>
              </div>
              <section className='prompt-info'>
                {options.length > 0 &&
                  !isError &&
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
              {isError && (
                <div className='static-error-message'>
                  <IoCloseCircle />
                  <span>Erro ao carregar informações. Tente novamente.</span>
                </div>
              )}
              <div className='prompt-actions'>
                <button
                  className='prompt-cancel'
                  onClick={shareProductController}>
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
