import { FC } from 'react';
import { motion } from 'framer-motion';
import { HiPlus } from 'react-icons/hi';
import { useAppContext } from '@/context/AppContext';
import { BiSortAlt2, BiSearch } from 'react-icons/bi';
import { NextRouter, useRouter } from 'next/router';
import { _toolbar as Container } from '@/styles/modules/tool-bar';

const ToolBox: FC = () => {
  const router: NextRouter = useRouter();
  const { state, sortBoxController, searchBoxController } = useAppContext();

  return (
    <Container>
      <section className='left-container'>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title='Adicionar novo produto'
          className='descripted'
          onClick={() => router.push(`/users/dashboard/product-editor`)}>
          <HiPlus />
          <span>Novo Produto</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title='Sort'
          className='descripted'
          onClick={sortBoxController}>
          <BiSortAlt2 />
          <span>Ordenar</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title='Search for anything'
          className='descripted'
          onClick={searchBoxController}>
          <BiSearch />
          <span>Pesquisar</span>
        </motion.button>
      </section>

      <section className='right-container'>
        <div className='count'>
          <span>{state.productList.length} itens</span>
        </div>
      </section>
    </Container>
  );
};

export default ToolBox;
