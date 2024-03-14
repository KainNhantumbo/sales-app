import { useAppContext } from '@/context/AppContext';
import { _toolbar as Container } from '@/styles/modules/tool-bar';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { BiSearch, BiSortAlt2 } from 'react-icons/bi';
import { HiPlus } from 'react-icons/hi';

export function ToolBox() {
  const router = useRouter();
  const { state, sortBoxController, searchBoxController } = useAppContext();

  return (
    <Container>
      <section className='left-container'>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title='Adicionar novo produto'
          className='described'
          onClick={() => router.push(`/dashboard/products/editor`)}>
          <HiPlus />
          <span>Novo Produto</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title='Sort'
          className='described'
          onClick={sortBoxController}>
          <BiSortAlt2 />
          <span>Ordenar</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title='Search for anything'
          className='described'
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
}
