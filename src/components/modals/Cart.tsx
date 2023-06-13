import {} from 'react';
import { useAppContext } from '@/context/AppContext';
import {
  IoAdd,
  IoArrowBackOutline,
  IoBackspace,
  IoRemove,
} from 'react-icons/io5';
import { AnimatePresence, motion } from 'framer-motion';
import { CartContainer as Container } from '../../styles/modules/cart';

export default function Cart() {
  const {
    state,
    cartModalController,
    removeProductFromCart,
    getCartProduct,
    updateCartProduct,
    dispatch,
  } = useAppContext();

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
            <div className='dialog-prompt'>
              <div className='prompt-info'>
                <span className='prompt-title'>Carrinho</span>
              </div>
              <section className='cart-items-container'>
                {state.cart.map((product) => (
                  <div key={product.productId} className='product'>
                    <h3>
                      <span>{product.productName}</span>
                    </h3>
                    <h3>
                      <span>{product.price}</span>
                    </h3>
                    <div className='cart-manage'>
                      <button
                        onClick={() =>
                          updateCartProduct({
                            productId: product.productId,
                            quantity:
                              getCartProduct(product.productId).quantity > 1
                                ? getCartProduct(product.productId).quantity - 1
                                : 1,
                          })
                        }>
                        <IoRemove />
                      </button>
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
                      <button
                        onClick={() =>
                          updateCartProduct({
                            productId: product.productId,
                            quantity:
                              getCartProduct(product.productId).quantity + 1,
                          })
                        }>
                        <IoAdd />
                      </button>
                    </div>
                    <div className='actions-container'>
                      <button className='remove-product'>
                        <IoBackspace /> <span>Remover</span>
                      </button>
                    </div>
                  </div>
                ))}
              </section>
              <section className='totals-container'>
                <h3>
                  <span>
                    {state.cart.reduce(
                      (accumulator, currentProduct) =>
                        (accumulator += currentProduct.price),

                      0
                    )}
                  </span>
                </h3>
              </section>
              <div className='prompt-actions'>
                <button className='prompt-cancel' onClick={cartModalController}>
                  <IoArrowBackOutline />
                  <span>Fechar o carrinho</span>
                </button>
              </div>
            </div>
          </motion.section>
        </Container>
      )}
    </AnimatePresence>
  );
}
