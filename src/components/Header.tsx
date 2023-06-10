import {
  IoAppsOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoStorefrontOutline,
} from 'react-icons/io5';
import Link from 'next/link';
import Image from 'next/image';
import { urls } from '@/data/app-data';
import { BiUser } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import { HiViewList, HiX } from 'react-icons/hi';
import { NextRouter, useRouter } from 'next/router';
import { useAppContext } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import rubymart_logo from '../../public/rubymart_logo.png';
import { HeaderContainer as Container } from '../styles/common/header';

export default function Header(): JSX.Element {
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const { asPath, push }: NextRouter = useRouter();
  const { state, logoutPromptController } = useAppContext();

  function toggleMenu(): void {
    setIsMenu(!isMenu);
  }

  function changeWidth(): void {
    if (window.innerWidth > 770) {
      setIsMenu(true);
    } else {
      setIsMenu(false);
    }
  }

  useEffect((): (() => void) => {
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
                transition: { duration: 0.25 },
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
              <div className='auth-btns'>
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
                    onClick={() => push(`/users/dashboard`)}>
                    {state.auth.profile_image ? (
                      <img
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
                    onClick={logoutPromptController}>
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
          className='toggle-btn'
          onClick={toggleMenu}>
          {!isMenu ? <IoAppsOutline /> : <HiX />}
        </motion.button>
      </div>
    </Container>
  );
}
