import Layout from '@/components/Layout';
import { useAppContext } from '@/context/AppContext';
import { actions } from '@/data/reducer-actions';
import { ProductListContainer as Container } from '@/styles/common/products';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import { IoAdd, IoSearch } from 'react-icons/io5';
import { useTheme } from 'styled-components';

export default function Products() {
  const { state, dispatch } = useAppContext();
  const theme = useTheme();
  const router: NextRouter = useRouter();

  return (
    <Layout metadata={{ title: 'Lista de Produtos' }}>
      <Container>
        <article>
          <section className='filters-container'>
            <Link
              href={`/users/dashboard/${state.userAuth.id}/products/product-editor`}
              className='add-product'>
              <IoAdd />
              <span>Adicionar produto</span>
            </Link>
          </section>
          <section className='search-container'>
            <form
              onSubmit={(e): void => {
                e.preventDefault();
              }}>
              <div className='form-element' title='Search'>
                <input
                  type='text'
                  placeholder='Procurar produtos...'
                  value={state.search}
                  onChange={(e): void => {
                    dispatch({
                      type: actions.SEARCH,
                      payload: {
                        ...state,
                        search: e.target.value,
                      },
                    });
                  }}
                />
              </div>

              <button
                onClick={(): void => {
                  if (state.search.length < 1) return;
                  router.push(`/blog/search?q=${state.search}`);
                }}>
                <IoSearch />
              </button>
            </form>
          </section>
        </article>
      </Container>
    </Layout>
  );
}
