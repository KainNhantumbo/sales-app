import styled from 'styled-components';
import {
  BaseButton,
  BaseButtonOutline,
  StyledCornerButton,
  StyledInputs,
} from '../defaults';

export const EcommerceProductContainer = styled.div`
  position: relative;
  background: rgb(${({ theme }) => theme.background});
  width: 100%;
  height: 100%;
  min-height: 70vh;

  * {
    ::selection {
      background: rgba(${({ theme }) => theme.font}, 0.1);
      color: rgb(${({ theme }) => theme.primary_variant});
    }
  }

  .wrapper-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 5px;
    justify-items: center;
    max-width: 980px;
    align-self: center;
    margin: 0 auto;
    padding-top: 110px;
  }

  aside {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 30px;

    @media screen and (max-width: 990px) {
      flex-direction: column;
      align-items: center;
      margin: 0 auto;
      padding: 0 20px;
    }

    .product-container {
      width: 100%;
      max-width: 500px;
      display: flex;
      flex-direction: column;
      gap: 20px;

      @media screen and (max-width: 990px) {
        max-width: 980px;
        margin: 0 auto;
      }

      .product-name {
        display: flex;
        flex-direction: column;
        gap: 12px;

        h1 {
          font-size: 1.6rem;
          font-weight: 500;
          line-height: 2rem;
          margin: 0;
          padding: 0;
        }

        p {
          line-height: 1.4rem;
          font-size: 0.9rem;

          i {
            color: rgb(${({ theme }) => theme.primary_variant});
          }
        }
      }

      .front-container {
        display: flex;
        flex-direction: column;
        gap: 20px;

        .product-details {
          display: flex;
          flex-direction: row;
          gap: 8px;

          .price-container {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 10px;

            .promo-alert {
              font-weight: 500;
              color: rgb(${({ theme }) => theme.alert});
              display: flex;
              flex-direction: row;
              gap: 3px;
              align-items: center;
              border-radius: 12px;
              padding: 8px 10px;
              background: rgba(${({ theme }) => theme.primary}, 0.2);

              svg {
                width: 20px;
                height: 20px;
              }
            }

            .actual-price {
              font-size: 1.4rem;
              line-height: 1.2rem;
              font-weight: 500;
              color: rgb(${({ theme }) => theme.primary_variant});
            }
          }
        }

        .actions-container {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding-top: 12px;
          border-top: 1px solid rgba(${({ theme }) => theme.font}, 0.08);

          .favorite-button {
            ${BaseButtonOutline}
            color: rgb(${({ theme }) => theme.primary_variant});
            :hover {
              color: rgb(${({ theme }) => theme.primary_variant});
              background: rgba(${({ theme }) => theme.primary}, 0.2);
            }
          }

          .share-button {
            ${BaseButtonOutline}
          }
        }

        .cart-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding-top: 18px;
          border-top: 1px solid rgba(${({ theme }) => theme.font}, 0.08);

          .cart-quantity {
            display: flex;
            flex-direction: row;
            gap: 18px;
            justify-content: space-between;
            align-items: center;
            h3 {
              font-weight: 500;
              display: flex;
              flex-direction: column;
              gap: 12px;

              i {
                font-weight: 400;
                font-size: 0.9rem;
              }
            }
          }

          .cart-manage {
            display: flex;
            flex-direction: row;
            gap: 8px;
            align-items: center;

            ${StyledInputs}
            input {
              max-width: 80px;
            }

            button {
              ${StyledCornerButton}
              padding: 5px;
              background: rgb(${({ theme }) => theme.primary_variant});
              :hover {
                background: rgb(${({ theme }) => theme.secondary});
              }
              svg {
                width: 25px;
                height: 25px;
                color: rgb(${({ theme }) => theme.neutral});
              }
            }
          }

          .cart-actions {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 20px;
            padding-top: 18px;
            border-top: 1px solid rgba(${({ theme }) => theme.font}, 0.08);

            .add-to-cart_button {
              ${BaseButtonOutline}
              padding: 12px;
              color: rgb(${({ theme }) => theme.primary_variant});
              :hover {
                color: rgb(${({ theme }) => theme.primary_variant});
                background: rgba(${({ theme }) => theme.primary}, 0.2);
              }
            }
            .buy_button {
              ${BaseButton}
            }
          }
        }
        .qr-code-container {
          padding-top: 12px;
          border-top: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
          display: flex;
          flex-direction: row;
          gap: 20px;
          justify-content: space-between;
          align-items: center;

          .description {
            display: flex;
            flex-direction: row;
            gap: 18px;
            justify-content: space-between;
            align-items: center;
            h3 {
              font-weight: 500;
              display: flex;
              flex-direction: column;
              gap: 12px;

              i {
                font-weight: 400;
                font-size: 0.9rem;
              }
            }
          }
        }
      }
    }

    .images-container {
      width: fit-content;

      @media screen and (max-width: 990px) {
        width: 100%;
        max-width: 480px;
      }

      @media screen and (max-width: 990px) {
        width: fit-content;
      }

      .no-image-icon {
        width: 100%;
        max-width: 420px;
        height: 420px;
      }

      .navigator {
        position: relative;
        .image-gallery-image {
          border-radius: 12px;
          border: 3px solid transparent;
          :hover {
            border: 3px solid rgba(${({ theme }) => theme.primary}, 0.9);
            transition: all 500ms ease;
          }
        }

        .image-gallery-thumbnail {
          border-radius: 12px;
          border: 3px solid transparent;
          cursor: pointer;

          :hover {
            border: 3px solid rgba(${({ theme }) => theme.primary}, 0.9);
          }
          .image-gallery-thumbnail-image {
            border-radius: 10px;
            color: rgba(${({ theme }) => theme.accent}, 0.6);
            :hover {
              border: none;
            }
            :active {
              border: none;
            }
          }
        }

        .nav-left,
        .nav-right,
        .nav-fullscreen {
          ${StyledCornerButton}
          position: absolute;
          right: 10px;
          top: calc(50% - 25px);
          z-index: 300;
          backdrop-filter: blur(10px);
          padding: 5px;
          outline: none;

          :hover {
            background: rgba(${({ theme }) => theme.accent}, 0.6);
          }
          svg {
            width: 25px;
            height: 25px;
            color: rgb(${({ theme }) => theme.neutral});
          }
        }

        .nav-left {
          left: 10px;
        }

        .nav-fullscreen {
          left: 12px;
          top: calc(50% + 165px);
        }
      }
    }
  }

  article {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 30px 20px;

    .data-section {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding-top: 10px;
      border-top: 1px solid rgba(${({ theme }) => theme.font}, 0.08);

      .description {
        h3 {
          display: flex;
          font-size: 1.1rem;
          font-weight: 500;
          align-items: center;
          width: 100%;
          gap: 12px;
          padding: 10px 0;
          svg {
            width: 30px;
            height: 30px;
          }
        }
      }

      .content-container {
        p {
          line-height: 1.6rem;
          margin-bottom: 12px;
        }
      }
    }

    .store-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 16px 20px;
      border-radius: 12px;
      border: 3px solid rgba(${({ theme }) => theme.primary}, 0.8);

      h2 {
        display: flex;
        font-size: 1rem;
        font-weight: 500;
        align-items: center;
        width: 100%;
        gap: 12px;

        color: rgb(${({ theme }) => theme.primary_variant});
        svg {
          width: 25px;
          height: 25px;
        }
      }

      p {
        line-height: 1.6rem;
      }

      .contents-container {
        display: flex;
        justify-content: space-between;
        flex-flow: row wrap;
        gap: 20px;
        align-items: center;

        .name,
        i {
          font-weight: 500;
        }

        a {
          ${BaseButton}
        }
      }
    }

    .no-comments-message {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding-top: 18px;
      border-top: 1px solid rgba(${({ theme }) => theme.font}, 0.08);

      h3 {
        display: flex;
        font-size: 1rem;
        font-weight: 500;
        align-items: center;
        width: 100%;
        gap: 12px;

        svg {
          width: 25px;
          height: 25px;
        }
      }
    }
  }
`;
