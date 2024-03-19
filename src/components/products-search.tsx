import { useAppContext } from '@/context/AppContext';
import { slidePageUp } from '@/lib/utils';
import { actions } from '@/shared/actions';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BiSortAlt2 } from 'react-icons/bi';
import { IoCartOutline, IoClose, IoFilter, IoGift, IoLayersOutline } from 'react-icons/io5';
import Categories from '../data/product-categories.json';
import { _searchEngine as Container } from '../styles/modules/search-engine';
import { SelectContainer } from './select';

export function ProductsSearch() {
  const { state, dispatch } = useAppContext();
  const [innerWidth, setInnerWidth] = useState<number>(0);

  const toggleMenu = () => {
    dispatch({
      type: actions.PUBLIC_PRODUCTS_FILTERS_MENU,
      payload: {
        ...state,
        isPublicProductsFilters: !state.isPublicProductsFilters
      }
    });
  };

  const changeWidth = () => {
    setInnerWidth(window.innerWidth);
    if (window.innerWidth > 830) {
      dispatch({
        type: actions.PUBLIC_PRODUCTS_FILTERS_MENU,
        payload: {
          ...state,
          isPublicProductsFilters: true
        }
      });
    } else {
      dispatch({
        type: actions.PUBLIC_PRODUCTS_FILTERS_MENU,
        payload: {
          ...state,
          isPublicProductsFilters: false
        }
      });
    }
  };

  useEffect(() => {
    changeWidth();
    window.addEventListener('resize', changeWidth);
    return () => window.removeEventListener('resize', changeWidth);
  }, []);

  const categoryOptions = Categories.map((category) => ({
    value: category,
    label: category
  }));

  const sortOptions = [
    { value: 'createdAt', label: 'Adicionado Recentemente' },
    { value: '-createdAt', label: 'Adicionado Antigamente' },
    { value: '-name', label: 'Nome' },
    { value: 'name', label: 'Nome (Invertido)' },
    { value: '-category', label: 'Categoria' },
    { value: 'category', label: 'Categoria (Invertido)' },
    { value: 'price', label: 'Preço (Alto para Baixo)' },
    { value: '-price', label: 'Preço (Baixo para Alto)' }
  ];

  const promotionOptions = [
    { value: undefined, label: 'Todos os produtos' },
    { value: 'true', label: 'Somente produtos com promoção' },
    { value: 'false', label: 'Somente produtos sem promoção' }
  ];

  const renderClearButton = () => (
    <button
      onClick={() => {
        dispatch({
          type: actions.QUERY_PUBLIC_PRODUCTS_LIST,
          payload: {
            ...state,
            queryPublicProducts: {
              category: undefined,
              promotion: undefined,
              query: '',
              sort: ''
            }
          }
        });
      }}>
      <IoClose />
      <span>Limpar filtros</span>
    </button>
  );

  return (
    <AnimatePresence>
      {state.isPublicProductsFilters && (
        <Container
          onClick={(e: any) => {
            const target = (e as any).target.classList;
            if (target[0]?.includes('search-engine')) {
              dispatch({
                type: actions.PUBLIC_PRODUCTS_FILTERS_MENU,
                payload: {
                  ...state,
                  isPublicProductsFilters: false
                }
              });
            }
          }}>
          <motion.div
            className='wrapper-container'
            drag={innerWidth > 830 ? false : 'y'}
            dragElastic={{ top: 0.12, bottom: 0.1 }}
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={(event, info) => {
              event.preventDefault();
              event.stopImmediatePropagation();
              if (info.offset.y > 350) {
                dispatch({
                  type: actions.PUBLIC_PRODUCTS_FILTERS_MENU,
                  payload: {
                    ...state,
                    isPublicProductsFilters: false
                  }
                });
              }
            }}
            style={{ display: state.isPublicProductsFilters ? 'flex' : 'none' }}
            initial={innerWidth > 830 ? { translateX: -720 } : { translateY: 720 }}
            animate={innerWidth > 830 ? { translateX: 0 } : { translateY: 0 }}
            transition={{ duration: 0.38 }}
            exit={
              innerWidth > 830
                ? {
                    opacity: 0,
                    translateX: -720,
                    transition: { duration: 0.4 }
                  }
                : {
                    opacity: 0,
                    translateY: 720,
                    transition: { duration: 0.38 }
                  }
            }>
            <button
              onTouchEnd={toggleMenu}
              onClick={toggleMenu}
              className='onDragCloseButton'
              title='Fechar aba'
            />

            <section className='header-container'>
              <h3>
                <IoFilter />
                <span>Filtros</span>
              </h3>

              {Object.values(state.queryPublicProducts)
                .map((value) => (value ? true : false))
                .some((value) => value === true) && renderClearButton()}
            </section>
            <div className='form-container'>
              <form
                className='form-search'
                onSubmit={(e) => {
                  e.preventDefault();
                }}>
                <div className='form-element' title='Search'>
                  <input
                    type='text'
                    placeholder='Pesquisar produtos...'
                    value={state.queryPublicProducts.query}
                    onChange={(e) => {
                      dispatch({
                        type: actions.QUERY_PUBLIC_PRODUCTS_LIST,
                        payload: {
                          ...state,
                          queryPublicProducts: {
                            ...state.queryPublicProducts,
                            query: e.target.value
                          }
                        }
                      });
                    }}
                  />
                </div>
              </form>
            </div>

            <div className='caret-container'>
              <h3>
                <IoLayersOutline />
                <span>Filtrar por</span>
              </h3>
              <SelectContainer
                options={categoryOptions}
                placeholder={'Selecione uma categoria'}
                onChange={(option: any) => {
                  dispatch({
                    type: actions.QUERY_PUBLIC_PRODUCTS_LIST,
                    payload: {
                      ...state,
                      queryPublicProducts: {
                        ...state.queryPublicProducts,
                        category: String(option?.value)
                      }
                    }
                  });
                }}
              />
            </div>

            <div className='caret-container'>
              <h3>
                <BiSortAlt2 />
                <span>Ordenar por</span>
              </h3>
              <SelectContainer
                options={sortOptions}
                placeholder={'Selecione a opção'}
                value={
                  state.queryPublicProducts.sort
                    ? {
                        label: sortOptions.filter(
                          (element) => element.value === state.queryPublicProducts.sort
                        )[0].label,
                        value: state.queryPublicProducts.sort
                      }
                    : undefined
                }
                onChange={(option: any) => {
                  dispatch({
                    type: actions.QUERY_PUBLIC_PRODUCTS_LIST,
                    payload: {
                      ...state,
                      queryPublicProducts: {
                        ...state.queryPublicProducts,
                        sort: String(option?.value)
                      }
                    }
                  });
                }}
              />
            </div>
            <div className='caret-container'>
              <h3>
                <IoGift />
                <span>Promoções</span>
              </h3>
              <SelectContainer
                options={promotionOptions}
                placeholder={'Selecione a opção'}
                value={
                  state.queryPublicProducts.promotion
                    ? promotionOptions[1]
                    : state.queryPublicProducts.promotion === false
                      ? promotionOptions[2]
                      : promotionOptions[0]
                }
                onChange={(option: any) => {
                  dispatch({
                    type: actions.QUERY_PUBLIC_PRODUCTS_LIST,
                    payload: {
                      ...state,
                      queryPublicProducts: {
                        ...state.queryPublicProducts,
                        promotion:
                          option?.value === 'true'
                            ? true
                            : option?.value === 'false'
                              ? false
                              : undefined
                      }
                    }
                  });
                }}
              />
            </div>

            <div className='caret-container'>
              {Object.values(state.queryPublicProducts)
                .map((value) => (value ? true : false))
                .some((value) => value === true) && (
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  className='show-results-btn'
                  onClick={() => {
                    dispatch({
                      type: actions.PUBLIC_PRODUCTS_FILTERS_MENU,
                      payload: {
                        ...state,
                        isPublicProductsFilters: false
                      }
                    });

                    if (innerWidth < 830) slidePageUp();
                  }}>
                  <IoCartOutline />
                  <span>Mostrar {state.publicProducts.length} resultados</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        </Container>
      )}
    </AnimatePresence>
  );
}