import {
  IoAdd,
  IoAlbumsOutline,
  IoArrowBackOutline,
  IoBackspace,
  IoBagCheck,
  IoCart,
  IoRemove,
} from 'react-icons/io5';
import Image from 'next/image';
import { FaDollarSign } from 'react-icons/fa';
import { blurDataUrlImage } from '@/data/app-data';
import { NextRouter, useRouter } from 'next/router';
import { useAppContext } from '@/context/AppContext';
import { AnimatePresence, motion } from 'framer-motion';
import { CartContainer as Container } from '../../styles/modules/cart';
import { formatCurrency } from '@/lib/utils';

export default function Cart(): JSX.Element {
  const {
    state,
    cartModalController,
    removeProductFromCart,
    getCartProduct,
    updateCartProduct,
    loginPromptController,
  } = useAppContext();
  const router: NextRouter = useRouter();

  return (
    <AnimatePresence>
      {state.isCartModal && (
        <Container
          className='main'
          onClick={(e: any): void => {
            const target = (e as any).target.classList;
            if (target.contains('main')) {
              cartModalController();
            }
          }}>
          <motion.section
            className='dialog-modal'
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.3,
              },
            }}
            exit={{ opacity: 0, scale: 0 }}>
            <section className='main-container'>
              <section className='prompt-header'>
                <h3 className='prompt-title'>
                  <IoCart />
                  <span>Carrinho</span>
                </h3>
                <p>{state.cart.length} itens</p>
              </section>

              <section className='cart-items-container'>
                {state.cart.length > 0 &&
                  state.cart.map((product) => (
                    <div key={product.productId} className='item-container'>
                      <div className='item-details'>
                        <Image
                          width={320}
                          height={420}
                          src={product.previewImage?.url ?? blurDataUrlImage}
                          alt={'product preview image'}
                          onClick={() => {
                            router.push(
                              `/ecommerce/products/${product.productId}`
                            );
                            cartModalController();
                          }}
                        />
                        <div>
                          <h3>
                            <span>
                              {product.productName.length > 55
                                ? product.productName.slice(0, 55) + '...'
                                : product.productName}{' '}
                            </span>
                          </h3>
                          <p>
                            Preço: <span>{formatCurrency(product.price)}</span>
                          </p>
                          <p>
                            <>Subtotal: </>
                            <span>
                              {formatCurrency(product.price * product.quantity)}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className='item-actions-container'>
                        <div className='item-manage'>
                          <motion.button
                            whileTap={{ scale: 0.8 }}
                            whileHover={{ scale: 1.05 }}
                            onClick={() =>
                              updateCartProduct({
                                productId: product.productId,
                                quantity:
                                  getCartProduct(product.productId).quantity > 1
                                    ? getCartProduct(product.productId)
                                        .quantity - 1
                                    : 1,
                              })
                            }>
                            <IoRemove />
                          </motion.button>
                          <input
                            type='number'
                            title='Quantidade'
                            min={1}
                            aria-label='Quantidade'
                            value={getCartProduct(product.productId).quantity}
                            onChange={(e) =>
                              updateCartProduct({
                                productId: product.productId,
                                quantity: Number(e.target.value),
                              })
                            }
                          />
                          <motion.button
                            whileTap={{ scale: 0.8 }}
                            whileHover={{ scale: 1.05 }}
                            onClick={() =>
                              updateCartProduct({
                                productId: product.productId,
                                quantity:
                                  getCartProduct(product.productId).quantity +
                                  1,
                              })
                            }>
                            <IoAdd />
                          </motion.button>
                        </div>

                        <motion.button
                          whileTap={{ scale: 0.8 }}
                          whileHover={{ scale: 1.05 }}
                          className='remove-item'
                          onClick={() =>
                            removeProductFromCart(product.productId)
                          }>
                          <IoBackspace /> <span>Remover</span>
                        </motion.button>
                      </div>
                    </div>
                  ))}
              </section>

              {state.cart.length < 1 && (
                <div className='no-items-container'>
                  <h2>
                    <IoAlbumsOutline />
                    <span>Nada para mostrar no carrinho</span>
                  </h2>
                </div>
              )}

              {state.cart.length > 0 && (
                <section className='totals-container'>
                  <h3>
                    <FaDollarSign />
                    <span>Custo total</span>
                  </h3>
                  <p>
                    {formatCurrency(
                      state.cart.reduce(
                        (accumulator, currentProduct) =>
                          (accumulator +=
                            currentProduct.price * currentProduct.quantity),

                        0
                      )
                    )}
                  </p>
                </section>
              )}
              <div className='prompt-actions'>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  className='prompt-cancel'
                  onClick={cartModalController}>
                  <IoArrowBackOutline />
                  <span>Fechar o carrinho</span>
                </motion.button>

                {state.cart.length > 0 && (
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    className='prompt-checkout'
                    onClick={() => {
                      if (!state.auth.token) {
                        loginPromptController();
                        cartModalController();
                        return;
                      }
                      cartModalController();
                      router.push(`/ecommerce/products/purchase`);
                    }}>
                    <IoBagCheck />
                    <span>Comprar agora</span>
                  </motion.button>
                )}
              </div>
            </section>
          </motion.section>
        </Container>
      )}
    </AnimatePresence>
  );
}
