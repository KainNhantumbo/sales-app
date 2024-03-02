import {
  BaseButton,
  BaseButtonOutline,
  StyledCornerButton,
  StyledInputs
} from '../defaults';
import styled from 'styled-components';

export const _commerceProduct = styled.div`
  position: relative;
  background: rgb(${({ theme }) => theme.background});
  width: 100%;
  height: 100%;
  min-height: 70vh;

  * {
    ::selection {
      background: rgba(${({ theme }) => theme.font}, 0.1);
      color: rgb(${({ theme }) => theme.primary_shade});
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

    @media screen and (max-width: 445px) {
      padding-top: 90px;
    }
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

          @media screen and (max-width: 550px) {
            font-size: 1.2rem;
            line-height: 1.8rem;
          }
        }

        p {
          line-height: 1.4rem;
          font-size: 0.9rem;

          i {
            color: rgb(${({ theme }) => theme.primary_shade});
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
              color: rgb(${({ theme }) => theme.error});
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
              color: rgb(${({ theme }) => theme.primary_shade});
            }
          }
        }

        .actions-container {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding-top: 12px;
          border-top: 1px solid rgba(${({ theme }) => theme.font}, 0.08);

          @media screen and (max-width: 390px) {
            flex-direction: column;
            gap: 12px;
          }

          .favorite-button {
            ${BaseButtonOutline}
            color: rgb(${({ theme }) => theme.primary_shade});
            :hover {
              color: rgb(${({ theme }) => theme.primary_shade});
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

            @media screen and (max-width: 445px) {
              flex-direction: column;
              justify-content: center;
            }
            h3 {
              font-weight: 500;
              display: flex;
              flex-direction: column;
              gap: 12px;

              i {
                font-weight: 400;
                font-size: 0.9rem;
              }

              @media screen and (max-width: 445px) {
                text-align: center;
              }
            }
          }

          .cart-manage {
            display: flex;
            flex-direction: row;
            gap: 8px;
            align-items: center;

            @media screen and (max-width: 430px) {
              gap: 20px;
            }

            ${StyledInputs}
            input {
              max-width: 80px;
            }

            button {
              ${StyledCornerButton}
              padding: 5px;
              background: rgb(${({ theme }) => theme.primary_shade});
              :hover {
                background: rgb(${({ theme }) => theme.secondary});
              }
              svg {
                width: 25px;
                height: 25px;
                color: rgb(${({ theme }) => theme.white});
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

            @media screen and (max-width: 430px) {
              flex-direction: column;
            }

            .add-to-cart_button {
              ${BaseButtonOutline}
              padding: 12px;
              color: rgb(${({ theme }) => theme.primary_shade});
              :hover {
                color: rgb(${({ theme }) => theme.primary_shade});
                background: rgba(${({ theme }) => theme.primary}, 0.2);
                transition: all 200ms ease-in-out;
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
          justify-content: space-between;
          align-items: center;

          @media screen and (max-width: 455px) {
            flex-direction: column-reverse;
            gap: 20px;
          }

          .description {
            display: flex;
            flex-direction: column;
            gap: 20px;

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

            h5 {
              display: flex;
              flex-direction: row;
              align-items: center;
              padding: 5px 12px;
              width: fit-content;
              gap: 5px;
              border-radius: 8px;
              background: rgb(${({ theme }) => theme.foreground});
              color: rgb(${({ theme }) => theme.primary_shade});
              font-size: 1rem;
              line-height: 1.6rem;
              font-weight: 500;

              svg {
                width: 22px;
                height: 22px;
              }
            }
            .error {
              border: 2px solid rgb(${({ theme }) => theme.error});
              color: rgb(${({ theme }) => theme.secondary});
            }
          }
        }
      }
    }

    .images-container {
      width: fit-content;
      width: 100%;

      @media screen and (max-width: 990px) {
        max-width: 480px;
      }

      @media screen and (max-width: 990px) {
        width: fit-content;
      }

      @media screen and (max-width: 445px) {
        padding: 0;
      }

      .no-image-icon {
        width: 100%;
        max-width: 380px;
        height: 420px;
        padding: 20px;
        border-radius: 20px;
        background: rgba(${({ theme }) => theme.primary}, 0.1);
      }

      .navigator {
        position: relative;

        @media screen and (max-width: 445px) {
          width: 100%;
          margin: 0;
          padding: 0;
        }

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
            color: rgba(${({ theme }) => theme.black}, 0.6);
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
            background: rgba(${({ theme }) => theme.black}, 0.6);
          }
          svg {
            width: 25px;
            height: 25px;
            color: rgb(${({ theme }) => theme.white});
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
            width: 25px;
            height: 25px;
          }
        }
      }

      .content-container {
        p {
          line-height: 1.6rem;
          margin-bottom: 12px;
        }
      }

      .meta-data {
        display: flex;
        flex-direction: column;
        text-transform: uppercase;

        i {
          font-weight: 500;
        }

        div {
          display: flex;
          flex-flow: row wrap;
          gap: 12px;
          line-height: 1.6rem;
        }
      }

      .denounce {
        display: flex;
        flex-direction: column;
        gap: 12px;

        h3 {
          font-size: 1.1rem;
          line-height: 1.6rem;
          font-weight: 500;
        }

        p {
          a {
            color: rgb(${({ theme }) => theme.secondary});
          }
        }

        div {
          width: 100%;
          display: flex;
          gap: 12px;
          align-items: center;
          justify-content: space-between;
          @media screen and (max-width: 485px) {
            flex-direction: column;
            align-items: start;
          }
        }

        .denounce-anchor {
          ${BaseButtonOutline}
          color: rgb(${({ theme }) => theme.primary_shade});
          background: rgba(${({ theme }) => theme.primary}, 0.2);
          text-overflow: clip;
          overflow: visible;

          :hover {
            transition: all 200ms ease;
            color: rgb(${({ theme }) => theme.error});
          }
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
      position: relative;

      @media screen and (max-width: 430px) {
        padding: 12px;
      }

      h2 {
        display: flex;
        font-size: 1rem;
        font-weight: 500;
        align-items: center;
        width: 100%;
        gap: 12px;

        color: rgb(${({ theme }) => theme.primary_shade});
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

        @media screen and (max-width: 430px) {
          padding-top: 45px;
        }

        .name,
        i {
          font-weight: 500;
        }

        a {
          ${BaseButton}
        }
      }
      h5 {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 5px 12px;
        gap: 5px;
        border-radius: 8px;
        background: rgb(${({ theme }) => theme.foreground});
        color: rgb(${({ theme }) => theme.primary_shade});
        font-size: 1rem;
        line-height: 1.6rem;
        font-weight: 500;
        position: absolute;
        top: 12px;
        right: 12px;
        z-index: 100;

        @media screen and (max-width: 430px) {
          top: 50px;
          left: 12px;
        }

        svg {
          width: 22px;
          height: 22px;
        }

        .error {
          color: rgb(${({ theme }) => theme.secondary});
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
