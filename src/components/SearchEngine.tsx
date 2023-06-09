import {
  IoClose,
  IoFilter,
  IoGift,
  IoLayersOutline,
  IoPricetags,
} from 'react-icons/io5';
import Select from 'react-select';
import { actions } from '@/data/actions';
import { BiSortAlt2 } from 'react-icons/bi';
import { useTheme } from 'styled-components';
import { useAppContext } from '@/context/AppContext';
import { renderReactSelectCSS } from '@/styles/select';
import product_categories from '../data/product-categories.json';
import { SeachEngineContainer as Container } from '../styles/modules/search-engine';
import Slider from 'rc-slider';

export default function SearchEngine(): JSX.Element {
  const { state, dispatch } = useAppContext();
  const theme = useTheme();

  const categoryOptions = product_categories.map((category) => ({
    value: category,
    label: category,
  }));

  const sortOptions = [
    { value: 'createdAt', label: 'Adicionado Recentemente' },
    { value: '-createdAt', label: 'Adicionado Antigamente' },
    { value: 'name', label: 'Nome' },
    { value: '-name', label: 'Nome (Invertido)' },
    { value: 'category', label: 'Categoria' },
    { value: '-category', label: 'Categoria (Invertido)' },
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
    <Container>
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
          <span>Filtrar por categoria</span>
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
          <span>Organizar por</span>
        </h3>
        <Select
          options={sortOptions}
          placeholder={'Selecione a opção'}
          styles={renderReactSelectCSS(theme)}
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
          defaultInputValue={promotionOptions[0].value}
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
                Number(state.queryPublicProducts.price_range).toFixed(2)) ||
                Number(0).toFixed(2)}
            </p>
          </div>

          <Slider
            min={0}
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
      </div>
    </Container>
  );
}
