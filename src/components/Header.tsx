import rubymart_logo from '@/../public/rubymart_logo.png';
import { useAppContext } from '@/context/AppContext';
import { useModulesContext } from '@/context/Modules';
import { urls } from '@/shared/data';
import { _header as Container } from '@/styles/modules/header';
import { AnimatePresence, m as motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BiUser } from 'react-icons/bi';
import {
  IoCartOutline,
  IoClose,
  IoLogInOutline,
  IoLogOutOutline,
  IoMenu,
  IoStorefrontOutline
} from 'react-icons/io5';

export default function Header() {
  const { asPath, push } = useRouter();
  const { logoutUser } = useModulesContext();
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const { state, cartModalController } = useAppContext();

  const toggleMenu = () => setIsMenu(!isMenu);

  const changeWidth = () =>
    window.innerWidth > 770 ? setIsMenu(true) : setIsMenu(false);

  useEffect(() => {
    changeWidth();
    window.addEventListener('resize', changeWidth);
    return () => {
      window.removeEventListener('resize', changeWidth);
    };
  }, []);

  return (
    <Container>
      <div className='wrapper'>
        <div className='logo'>
          <Link href={'/'}>
            <Image
              alt='Rubymart'
              src={rubymart_logo}
              width={600}
              height={134}
            />{' '}
          </Link>
        </div>
        <AnimatePresence>
          {isMenu && (
            <motion.nav
              initial={{ translateY: -70 }}
              animate={{ translateY: 0 }}
              transition={{ duration: 0.25 }}
              exit={{
                opacity: 0,
                translateY: -70,
                transition: { duration: 0.25 }
              }}
              style={{ display: isMenu ? 'flex' : 'none' }}>
              <section>
                {urls.map((item, index) => (
                  <Link
                    key={index.toString()}
                    href={item.url}
                    className={asPath.includes(item.alias) ? 'active' : ''}>
                    <motion.span whileHover={{ scale: 1.1 }}>
                      {item.name}
                    </motion.span>
                  </Link>
                ))}
              </section>

              <div className='left-corner-container'>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  title='Abrir ou fechar o carrinho'
                  aria-label='Abrir ou fechar o carrinho'
                  className='cart-button'
                  onClick={() => {
                    if (window.innerWidth < 770) {
                      toggleMenu();
                    }
                    cartModalController();
                  }}>
                  <IoCartOutline />
                  <span>
                    <i>{state.cart.length}</i>
                  </span>
                </motion.button>

                {!state.auth.id || !state.auth.token ? (
                  <>
                    <Link href={'/auth/sign-in'} className='login-btn'>
                      <IoLogInOutline />
                      <span>Acessar</span>
                    </Link>
                    <Link href={'/auth/sign-up'} className='sign-in-btn'>
                      <IoStorefrontOutline />
                      <span>Cadastrar-se</span>
                    </Link>
                  </>
                ) : !asPath.includes('dashboard') ? (
                  <button
                    title='Painel de Controle e Conta'
                    className='user-account'
                    onClick={() => push(`/dashboard`)}>
                    {state.auth.profile_image ? (
                      <Image
                        width={1000}
                        height={1000}
                        loading='lazy'
                        decoding='async'
                        src={state.auth.profile_image}
                        alt='User profile image'
                      />
                    ) : (
                      <BiUser />
                    )}
                    <span>Conta</span>
                  </button>
                ) : (
                  <button
                    title='Sair'
                    className='user-logout'
                    onClick={logoutUser}>
                    <IoLogOutOutline />
                    <span>Terminar sessão</span>
                  </button>
                )}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

        <motion.button
          whileTap={{ scale: 0.8 }}
          title='Abrir ou fechar o menu'
          aria-label='Abrir ou fechar o menu'
          className='toggle-btn'
          onClick={toggleMenu}>
          {!isMenu ? <IoMenu /> : <IoClose />}
        </motion.button>
      </div>
    </Container>
  );
}
