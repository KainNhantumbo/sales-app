import {
  IoLogInOutline,
  IoLogOutOutline,
  IoStorefrontOutline,
} from 'react-icons/io5';
import Link from 'next/link';
import { BiUser } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import { HiViewList, HiX } from 'react-icons/hi';
import { NextRouter, useRouter } from 'next/router';
import { complements, urls } from '@/data/app-data';
import { useAppContext } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { HeaderContainer as Container } from '../styles/common/header';

export default function Header(): JSX.Element {
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const { asPath, push }: NextRouter = useRouter();
  const { state, logoutPromptController } = useAppContext();
  const toggleMenu = (): void => {
    setIsMenu(!isMenu);
  };

  const changeWidth = (): void => {
    if (window.innerWidth > 770) {
      setIsMenu(true);
    } else {
      setIsMenu(false);
    }
  };

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
            <span>{complements.defaultTitle}</span>
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
                {!state.userAuth.id || !state.userAuth.token ? (
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
                    title='Minha conta'
                    className='user-account'
                    onClick={() =>
                      push(`/users/dashboard/${state.userAuth.id}`)
                    }>
                    {state.userAuth.profile_image ? (
                      <img
                        src={state.userAuth.profile_image}
                        alt='user profile image'
                      />
                    ) : (
                      <BiUser />
                    )}
                    <span>Minha conta</span>
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
          title='Toggle menu panel'
          className='toggle-btn'
          onClick={toggleMenu}>
          {!isMenu ? <HiViewList /> : <HiX />}
        </motion.button>
      </div>
    </Container>
  );
}
