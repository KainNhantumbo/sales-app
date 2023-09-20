import {
  IoCartOutline,
  IoClose,
  IoFilter,
  IoGift,
  IoLayersOutline,
  IoPricetags,
} from 'react-icons/io5';
import Slider from 'rc-slider';
import Select from 'react-select';
import actions from '@/shared/actions';
import { BiSortAlt2 } from 'react-icons/bi';
import { FC, useEffect, useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { renderReactSelectCSS } from '@/styles/modules/select';
import { AnimatePresence, motion } from 'framer-motion';
import { useThemeContext } from '@/context/ThemeContext';
import { DefaultTheme, useTheme } from 'styled-components';
import product_categories from '../shared/product-categories.json';
import { _seachEngine as Container } from '../styles/modules/search-engine';

const SearchEngine: FC = () => {
  const theme: DefaultTheme = useTheme();
  const { slidePageUp } = useThemeContext();
  const { state, dispatch } = useAppContext();
  const [innerWidth, setInnerWidth] = useState<number>(0);

  const toggleMenu = (): void => {
    dispatch({
      type: actions.PUBLIC_PRODUCTS_FILTERS_MENU,
      payload: {
        ...state,
        isPublicProductsFilters: !state.isPublicProductsFilters,
      },
    });
  };

  const changeWidth = (): void => {
    setInnerWidth(window.innerWidth);
    if (window.innerWidth > 830) {
      dispatch({
        type: actions.PUBLIC_PRODUCTS_FILTERS_MENU,
        payload: {
          ...state,
          isPublicProductsFilters: true,
        },
      });
    } else {
      dispatch({
        type: actions.PUBLIC_PRODUCTS_FILTERS_MENU,
        payload: {
          ...state,
          isPublicProductsFilters: false,
        },
      });
    }
  };

  useEffect((): (() => void) => {
    changeWidth();
    window.addEventListener('resize', changeWidth);
    return (): void => {
      window.removeEventListener('resize', changeWidth);
    };
  }, []);

  const categoryOptions = product_categories.map((category) => ({
    value: category,
    label: category,
  }));

  const sortOptions = [
    { value: 'createdAt', label: 'Adicionado Recentemente' },
    { value: '-createdAt', label: 'Adicionado Antigamente' },
    { value: '-name', label: 'Nome' },
    { value: 'name', label: 'Nome (Invertido)' },
    { value: '-category', label: 'Categoria' },
    { value: 'category', label: 'Categoria (Invertido)' },
    { value: 'price', label: 'Preço (Alto para Baixo)' },
    { value: '-price', label: 'Preço (Baixo para Alto)' },
  ];

  const promotionOptions = [
    { value: undefined, label: 'Todos os produtos' },
    { value: 'true', label: 'Somente produtos com promoção' },
    { value: 'false', label: 'Somente produtos sem promoção' },
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
              price_range: NaN,
              promotion: undefined,
              query: '',
              sort: '',
            },
          },
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
          onClick={(e: any): void => {
            const target = (e as any).target.classList;
            if (target[0]?.includes('search-engine')) {
              dispatch({
                type: actions.PUBLIC_PRODUCTS_FILTERS_MENU,
                payload: {
                  ...state,
                  isPublicProductsFilters: false,
                },
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
                    isPublicProductsFilters: false,
                  },
                });
              }
            }}
            style={{ display: state.isPublicProductsFilters ? 'flex' : 'none' }}
            initial={
              innerWidth > 830 ? { translateX: -720 } : { translateY: 720 }
            }
            animate={innerWidth > 830 ? { translateX: 0 } : { translateY: 0 }}
            transition={{ duration: 0.38 }}
            exit={
              innerWidth > 830
                ? {
                    opacity: 0,
                    translateX: -720,
                    transition: { duration: 0.4 },
                  }
                : {
                    opacity: 0,
                    translateY: 720,
                    transition: { duration: 0.38 },
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
                onSubmit={(e): void => {
                  e.preventDefault();
                }}>
                <div className='form-element' title='Search'>
                  <input
                    type='text'
                    placeholder='Pesquisar produtos...'
                    value={state.queryPublicProducts.query}
                    onChange={(e): void => {
                      dispatch({
                        type: actions.QUERY_PUBLIC_PRODUCTS_LIST,
                        payload: {
                          ...state,
                          queryPublicProducts: {
                            ...state.queryPublicProducts,
                            query: e.target.value,
                          },
                        },
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
              <Select
                options={categoryOptions}
                placeholder={'Selecione uma categoria'}
                styles={renderReactSelectCSS(theme)}
                onChange={(option: any): void => {
                  dispatch({
                    type: actions.QUERY_PUBLIC_PRODUCTS_LIST,
                    payload: {
                      ...state,
                      queryPublicProducts: {
                        ...state.queryPublicProducts,
                        category: String(option?.value),
                      },
                    },
                  });
                }}
              />
            </div>

            <div className='caret-container'>
              <h3>
                <BiSortAlt2 />
                <span>Ordenar por</span>
              </h3>
              <Select
                options={sortOptions}
                placeholder={'Selecione a opção'}
                styles={renderReactSelectCSS(theme)}
                value={
                  state.queryPublicProducts.sort
                    ? {
                        label: sortOptions.filter(
                          (element) =>
                            element.value === state.queryPublicProducts.sort
                        )[0].label,
                        value: state.queryPublicProducts.sort,
                      }
                    : undefined
                }
                onChange={(option: any): void => {
                  dispatch({
                    type: actions.QUERY_PUBLIC_PRODUCTS_LIST,
                    payload: {
                      ...state,
                      queryPublicProducts: {
                        ...state.queryPublicProducts,
                        sort: String(option?.value),
                      },
                    },
                  });
                }}
              />
            </div>
            <div className='caret-container'>
              <h3>
                <IoGift />
                <span>Promoções</span>
              </h3>
              <Select
                options={promotionOptions}
                placeholder={'Selecione a opção'}
                styles={renderReactSelectCSS(theme)}
                value={
                  state.queryPublicProducts.promotion
                    ? promotionOptions[1]
                    : state.queryPublicProducts.promotion === false
                    ? promotionOptions[2]
                    : promotionOptions[0]
                }
                onChange={(option: any): void => {
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
                            : undefined,
                      },
                    },
                  });
                }}
              />
            </div>

            <div className='caret-container'>
              <h3>
                <IoPricetags />
                <span>Faixa de Preço</span>
              </h3>
              <div className='price-range'>
                <div className='prices'>
                  <p>De: MZN 0.00</p>
                  <p>
                    Até: MZN{' '}
                    {(state.queryPublicProducts.price_range &&
                      Number(state.queryPublicProducts.price_range).toFixed(
                        2
                      )) ||
                      Number(0).toFixed(2)}
                  </p>
                </div>

                <Slider
                  min={0}
                  step={50}
                  max={75000}
                  value={
                    Number.isNaN(state.queryPublicProducts.price_range)
                      ? 0
                      : state.queryPublicProducts.price_range
                  }
                  onChange={(value) => {
                    dispatch({
                      type: actions.QUERY_PUBLIC_PRODUCTS_LIST,
                      payload: {
                        ...state,
                        queryPublicProducts: {
                          ...state.queryPublicProducts,
                          price_range: Number(value),
                        },
                      },
                    });
                  }}
                />
              </div>

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
                        isPublicProductsFilters: false,
                      },
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
};

export default SearchEngine;
