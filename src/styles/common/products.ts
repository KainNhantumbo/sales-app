import {
  BaseButton,
  BaseButtonOutline,
  _endMarkStyles,
  statsContainerStyles
} from '../defaults';
import styled from 'styled-components';

export const _productList = styled.div`
  position: relative;
  width: 100%;
  min-height: 90vh;
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgb(${({ theme }) => theme.background});

  * {
    ::selection {
      background: rgba(${({ theme }) => theme.font}, 0.2);
      color: rgb(${({ theme }) => theme.primary_shade});
    }
  }

  .stats-container {
    ${statsContainerStyles}
  }

  .products-list_container__end-mark {
    ${_endMarkStyles}
  }

  .error-message {
    height: 70vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding: 0 20px;
    gap: 10px;
    .icon {
      width: 70px;
      height: 70px;
    }
    p {
      font-size: 1.4rem;
      text-align: center;
      line-height: 2rem;
      max-width: 600px;
    }

    button {
      ${BaseButton}
    }
  }

  article {
    width: 100%;
    max-width: 980px;
    margin: 0 auto;
    margin-top: 90px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .main-container {
      .empty-data_container {
        width: 100%;
        height: 100%;
        background: rgb(${({ theme }) => theme.background});
        top: 95px;
        left: 0;
        display: grid;
        place-content: center;
        user-select: none;
        position: fixed;

        .content {
          position: relative;
          top: -100px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          line-height: 1.6rem;
          margin: 0 10px;

          svg {
            width: 70px;
            height: 70px;
            color: rgb(${({ theme }) => theme.primary_shade});
          }

          h3 {
            text-align: center;
            font-size: 1.2rem;
            font-weight: 500;
            margin-top: 20px;
          }
        }
      }

      .products-list_container {
        display: flex;
        flex-direction: column;
        padding: 25px 10px;
        gap: 10px;

        .products-list_item {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 20px;
          background: rgb(${({ theme }) => theme.foreground});
          border-radius: 12px;
          border: 1px solid rgba(${({ theme }) => theme.font}, 0.08);

          .products-list_item_primary {
            display: flex;
            flex-direction: column;
            gap: 15px;
            border-bottom: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
            padding-bottom: 15px;

            .top-side,
            .bottom-side {
              display: flex;
              flex-flow: row wrap;
              gap: 10px;
              align-items: center;
            }

            .top-side {
              font-weight: 500;
              .name {
                color: rgb(${({ theme }) => theme.primary_shade});
              }
              .id {
                text-transform: uppercase;
              }

              .promotion {
                border-radius: 18px;
                background: rgb(${({ theme }) => theme.background});
                border: 2px solid rgba(${({ theme }) => theme.secondary}, 0.5);
                padding: 3px 8px;
                color: rgb(${({ theme }) => theme.secondary});
              }
            }

            .bottom-side {
              .item {
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 3px;
                line-height: 1.2rem;
              }

              .promo-price {
                i {
                  font-weight: 500;
                  text-decoration: line-through;
                  color: rgb(${({ theme }) => theme.error});
                }
              }

              .date {
                text-transform: capitalize;
              }
            }
          }
          .products-list_item_secondary {
            display: flex;
            flex-flow: row wrap;
            gap: 12px;

            button,
            a {
              ${BaseButtonOutline}
              border: 1px solid rgba(${({ theme }) => theme.font}, 0.1);
              border-radius: 25px;
              padding: 5px 12px;
              span {
                padding: 0;
              }
            }
          }
        }
      }
    }
  }
`;
