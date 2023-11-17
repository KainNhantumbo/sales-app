import styled from 'styled-components';
import {
  BaseButton,
  StyledCornerButton,
  _endMarkStyles,
  statsContainerStyles
} from '../defaults';

export const _home = styled.div`
  position: relative;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  /* min-height: 50vh; */
  background: rgb(${({ theme }) => theme.background});

  * {
    ::selection {
      background: rgba(${({ theme }) => theme.font}, 0.1);
      color: rgb(${({ theme }) => theme.primary_shade});
    }
  }

  .content-wrapper {
    width: 100%;
    max-width: 1440px;
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 30px;
    padding: 0 10px;
    padding-bottom: 50px;
    padding-top: 100px;
    margin: 0 auto;

    .openFluentFilters {
      ${BaseButton}
      width: 300px;
      border-radius: 30px;
      position: fixed;
      bottom: 20px;
      left: calc(50% - 150px);
      z-index: 12000;
      backdrop-filter: blur(10px);
      background: rgba(${({ theme }) => theme.primary}, 0.8);
      box-shadow: 0 0 25px rgba(${({ theme }) => theme.black}, 0.1);

      @media screen and (min-width: 830px) {
        display: none;
      }
    }
  }

  article {
    width: 100%;
    min-height: 100px;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 12px;

    .empty-data_container {
      width: 100%;
      height: 100%;
      background: rgb(${({ theme }) => theme.background});
      display: grid;
      place-content: center;
      user-select: none;
      margin-top: 200px;

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

        p {
          text-align: center;
          line-height: 1.2rem;
        }
      }
    }

    .banner-container {
      width: 100%;
      max-width: 100%;

      @media screen and (max-width: 990px) {
        max-width: 480px;
      }

      @media screen and (max-width: 990px) {
        width: fit-content;
      }

      @media screen and (max-width: 445px) {
        padding: 0;
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
          object-fit: cover;
          :hover {
            border: 3px solid rgba(${({ theme }) => theme.primary}, 0.9);
            transition: all 500ms ease;
          }
        }

        .nav-left,
        .nav-right {
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
      }
    }

    .products-container {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      place-content: center center;
      place-items: center center;

      @media screen and (max-width: 1350px) {
        grid-template-columns: repeat(3, 230px);
      }
      @media screen and (max-width: 1060px) {
        grid-template-columns: repeat(2, 230px);
      }
      @media screen and (max-width: 830px) {
        grid-template-columns: repeat(3, 230px);
        justify-content: center;
        justify-items: center;
      }

      @media screen and (max-width: 750px) {
        grid-template-columns: repeat(2, 230px);
      }
      @media screen and (max-width: 500px) {
        grid-template-columns: repeat(1, 1fr);
      }

      .product-container {
        width: 100%;
        max-width: 230px;
        height: 350px;
        display: flex;
        flex-direction: column;
        border-radius: 10px;
        background: rgb(${({ theme }) => theme.foreground});

        @media screen and (max-width: 500px) {
          max-width: 100%;
          height: 200px;
          flex-direction: row;
          border-radius: 20px;
          padding: 12px;
          gap: 5px;
        }

        .product-image {
          position: relative;

          .promotion {
            position: absolute;
            top: 8px;
            left: 8px;

            border-radius: 12px;
            background: rgba(${({ theme }) => theme.white}, 0.9);
            border: 1px solid rgba(${({ theme }) => theme.font}, 0.2);
            padding: 3px 8px;
            color: rgb(${({ theme }) => theme.secondary});
          }

          .favorite-button,
          .cart-button {
            ${StyledCornerButton}
            position: absolute;
            bottom: 8px;
            right: 8px;
            background: rgba(${({ theme }) => theme.white}, 0.9);
            border: 1px solid rgba(${({ theme }) => theme.font}, 0.2);

            svg {
              color: rgb(${({ theme }) => theme.secondary});
            }
          }

          .cart-button {
            left: 8px;
          }

          img {
            width: 100%;
            height: 100%;
            height: 215px;
            object-fit: cover;
            border-radius: 10px 10px 0 0;

            @media screen and (max-width: 500px) {
              width: 240px;
              min-width: 240px;
              height: 100%;
              border-radius: 20px;
            }
            @media screen and (max-width: 470px) {
              width: 180px;
              min-width: 180px;
            }
            @media screen and (max-width: 400px) {
              width: 150px;
              min-width: 150px;
            }
          }

          .no-image-icon {
            width: 100%;
            height: 100%;
            max-width: 230px;
            padding: 30px;
            border-radius: 10px 10px 0 0;
            background: rgba(${({ theme }) => theme.font}, 0.1);
            @media screen and (max-width: 500px) {
              width: 240px;
              min-width: 240px;
              height: 100%;
              border-radius: 20px;
            }
            @media screen and (max-width: 460px) {
              width: 180px;
              min-width: 180px;
            }
            @media screen and (max-width: 400px) {
              width: 150px;
              min-width: 150px;
            }
          }
        }

        .product-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 12px;
          height: 100%;
          cursor: pointer;

          @media screen and (max-width: 500px) {
            flex-direction: column-reverse;
          }

          h3 {
            line-height: 1.3rem;
            font-size: 0.98rem;
          }

          .item {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 3px;
            line-height: 1.2rem;

            .actual-price {
              font-weight: 500;
              color: rgb(${({ theme }) => theme.primary_shade});
            }
          }

          .buy-mobile-button {
            display: none;
            @media screen and (max-width: 500px) {
              display: flex;
              ${BaseButton}
              overflow: visible;
              pointer-events: none;
            }
          }

          .promo-price {
            .old-price {
              font-weight: 500;
              text-decoration: line-through;
              color: rgb(${({ theme }) => theme.error});
            }
          }
        }
      }
    }
  }

  .stats-container {
    ${statsContainerStyles}
  }
  .posts-container__end-mark {
    ${_endMarkStyles}
  }
`;
