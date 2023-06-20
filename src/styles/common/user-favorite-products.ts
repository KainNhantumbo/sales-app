import styled from 'styled-components';
import { BaseButton, BaseButtonOutline, StyledCornerButton } from '../defaults';

export const FavoriteProductsContainer = styled.div`
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
      color: rgb(${({ theme }) => theme.primary_variant});
    }
  }

  .wrapper-container {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    gap: 5px;
    max-width: 1280px;
    align-self: center;
    margin: 0 auto;
    padding: 90px 20px;
    gap: 20px;
    position: relative;

    @media screen and (max-width: 755px) {
      flex-direction: column-reverse;
      align-items: center;
    }

    @media screen and (max-width: 445px) {
      padding: 80px 0;
      gap: 0;
    }
  }

  article {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
    border-radius: 20px;
    background: rgb(${({ theme }) => theme.foreground});

    @media screen and (max-width: 445px) {
      border: none;
      border-radius: 0;
      padding-bottom: 40px;
    }

    .header-container {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 20px;
      border-bottom: 1px solid rgba(${({ theme }) => theme.font}, 0.08);

      h2 {
        display: flex;
        font-size: 1.2rem;
        font-weight: 500;
        align-items: center;
        width: 100%;
        gap: 8px;
        padding: 10px 0;
        text-transform: capitalize;
        line-height: 1.6rem;

        svg {
          width: 25px;
          height: 25px;
          color: rgb(${({ theme }) => theme.primary});
        }
      }

      p {
        line-height: 1.6rem;
      }
    }

    .products-container {
      padding: 12px;
      width: 100%;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      place-content: center center;
      place-items: center center;

      @media screen and (max-width: 1130px) {
        grid-template-columns: 1fr;
      }
      @media screen and (max-width: 445px) {
        padding: 0;
      }

      .product-container {
        width: 100%;
        display: flex;
        border-radius: 10px;
        background: rgb(${({ theme }) => theme.foreground});
        height: 200px;
        flex-direction: row;
        border-radius: 20px;
        padding: 12px;
        gap: 5px;
        border: 1px solid rgba(${({ theme }) => theme.font}, 0.08);

        @media screen and (max-width: 445px) {
          padding: 0;
          border: none;
          border-radius: 0;
          border-bottom: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
          border-top: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
        }

        .product-image {
          position: relative;

          .promotion {
            position: absolute;
            top: 8px;
            left: 8px;
            border-radius: 12px;
            background: rgba(${({ theme }) => theme.neutral}, 0.9);
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
            background: rgba(${({ theme }) => theme.neutral}, 0.9);
            border: 1px solid rgba(${({ theme }) => theme.font}, 0.2);

            svg {
              color: rgb(${({ theme }) => theme.secondary});
            }
          }

          .cart-button {
            left: 8px;
          }

          img {
            object-fit: cover;
            height: 100%;
            border-radius: 20px;
            width: 150px;
            min-width: 150px;
            @media screen and (max-width: 1130px) {
              width: 180px;
              min-width: 180px;
            }
            @media screen and (max-width: 445px) {
              border-radius: 0;
            }
          }

          .no-image-icon {
            width: 100%;
            height: 100%;
            max-width: 230px;
            padding: 30px;
            border-radius: 10px 10px 0 0;

            @media screen and (max-width: 400px) {
              width: 180px;
              min-width: 180px;
            }
          }
        }

        .product-details {
          width: 100%;
          display: flex;
          gap: 8px;
          padding: 12px;
          height: 100%;
          cursor: pointer;
          flex-direction: column-reverse;
          justify-content: space-between;

          @media screen and (max-width: 445px) {
            align-items: center;
          }

          h3 {
            line-height: 1.3rem;
            font-size: 0.98rem;

            @media screen and (max-width: 445px) {
              text-align: center;
            }
          }

          .item {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 3px;
            line-height: 1.2rem;
            @media screen and (max-width: 445px) {
              text-align: center;
            }

            .actual-price {
              font-weight: 500;
              color: rgb(${({ theme }) => theme.primary_variant});
            }
          }

          .buy-mobile-button {
            ${BaseButton}
            overflow: visible;
            pointer-events: none;
          }

          .promo-price {
            .old-price {
              font-weight: 500;
              text-decoration: line-through;
              color: rgb(${({ theme }) => theme.alert});
            }
          }
        }
      }
    }

    .empty-data_container {
      width: 100%;
      min-height: 400px;
      display: grid;
      place-content: center;
      user-select: none;

      .content {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        line-height: 1.6rem;
        padding: 50px 30px;

        svg {
          width: 70px;
          height: 70px;
          color: rgb(${({ theme }) => theme.primary_variant});
        }

        h3 {
          text-align: center;
          font-size: 1.2rem;
          font-weight: 500;
          margin-top: 20px;
        }
      }
    }
  }

  aside {
    width: 100%;
    height: fit-content;
    position: sticky;
    top: 90px;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    width: 320px;
    border: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
    padding: 20px;
    border-radius: 20px;
    background: rgb(${({ theme }) => theme.foreground});

    @media screen and (max-width: 755px) {
      width: 100%;
      position: static;
    }
    @media screen and (max-width: 445px) {
      border: none;
      border-radius: 0;
      padding-top: 40px;
      border-top: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
    }

    .no-ads {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      padding: 12px 5px;
      padding-bottom: 25px;
      border-bottom: 1px solid rgba(${({ theme }) => theme.font}, 0.08);

      .ads-icon {
        width: 30px;
        height: 30px;
        color: rgb(${({ theme }) => theme.primary});
      }

      h3 {
        text-align: center;
        font-size: 1.2rem;
        line-height: 1.6rem;
        font-weight: 500;
      }

      a {
        ${BaseButtonOutline}
      }
    }
  }
`;
