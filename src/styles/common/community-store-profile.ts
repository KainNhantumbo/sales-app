import styled from 'styled-components';
import { BaseButton, BaseButtonOutline, StyledCornerButton } from '../defaults';

export const StoreContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 90vh;
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgb(${({ theme }) => theme.foreground});

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

    @media screen and (max-width: 755px) {
      flex-direction: column-reverse;
      align-items: center;
    }

    @media screen and (max-width: 445px) {
      padding: 80px 0;
    }
  }

  article {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
    border-radius: 20px;

    @media screen and (max-width: 445px) {
      border: none;
      border-radius: 0;
    }

    .image-container {
      width: 100%;
      display: flex;
      align-items: start;
      flex-direction: column;
      gap: 10px;
      justify-content: center;
      position: relative;

      img {
        width: 100%;
        border-radius: 20px 20px 0 0;
        max-width: 1280px;
        max-height: 200px;
        object-fit: cover;

        @media screen and (max-width: 445px) {
          border-radius: 0;
        }
      }

      svg {
        width: 100%;
        height: 200px;
        border-radius: 20px 20px 0 0;
        margin: 0 auto;
        padding: 30px;
        background: rgba(${({ theme }) => theme.font}, 0.1);
      }
    }

    .store-data {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 12px;

      p {
        line-height: 1.6rem;
      }

      .store-details {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 0 20px;
        gap: 12px;

        .title-slogan {
          width: 100%;
          display: flex;
          flex-direction: column;
          place-items: center center;
          place-content: center center;
          padding-bottom: 12px;
          text-align: center;

          h2 {
            width: 100%;
            line-height: 1.6rem;
            font-size: 1.1rem;
            font-weight: 500;
            gap: 5px;
            margin: 0;
            padding: 0;
            padding: 12px 0;
            position: relative;

            svg {
              position: absolute;
              top: calc(50% - 11px);
              left: 8px;
              width: 22px;
              height: 22px;
              color: rgb(${({ theme }) => theme.primary});
            }
          }

          h4 {
            span {
              padding: 0 8px;
            }
          }
        }

        .category {
          font-weight: 500;
          text-align: center;

          i {
            color: rgb(${({ theme }) => theme.primary_variant});
          }
        }
      }

      .tab-buttons-container {
        border-top: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
        border-bottom: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        button {
          width: 100%;
          border: none;
          outline: none;
          background: rgb(${({ theme }) => theme.foreground});
          display: flex;
          flex-direction: row;
          gap: 8px;
          align-items: center;
          justify-content: center;
          color: rgb(${({ theme }) => theme.primary_variant});
          cursor: pointer;
          font-weight: 500;
          padding: 12px;

          :hover {
            color: rgb(${({ theme }) => theme.primary_variant});
            background: rgba(${({ theme }) => theme.primary}, 0.2);
            transition: all 200ms ease-in-out;
          }
        }

        .docs {
          border-right: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
        }
      }

      .docs-container {
        padding: 0 20px;
      }
      .products-container {
        padding: 12px;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
        place-content: center center;
        place-items: center center;

        @media screen and (max-width: 1070px) {
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

          :hover {
            border: none;
          }

          @media screen and (max-width: 445px) {
            padding: 0;
            border: none;
            border-radius: 0;
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
              @media screen and (max-width: 445px) {
                border-radius: 0;
              }
            }

            .no-image-icon {
              border-radius: 20px;
              width: 150px;
              min-width: 150px;
            }
          }

          .product-details {
            display: flex;
            gap: 8px;
            padding: 12px;
            height: 100%;
            cursor: pointer;
            flex-direction: column-reverse;
            justify-content: space-between;

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
    }
  }

  aside {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    width: 320px;
    border: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
    padding: 20px;
    border-radius: 20px;
    /* @media screen and (max-width: 1080px) {
      max-width: 620px;
    } */

    .profile-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;

      .image-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        img {
          width: 100%;
          max-width: 120px;
          max-height: 120px;
          border-radius: 50%;
          margin: 0 auto;
        }
        .camera-icon {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          margin: 0 auto;
          padding: 5px;
          background: rgba(${({ theme }) => theme.font}, 0.1);
        }
      }

      .author-name {
        font-size: 1.1rem;
        font-weight: 500;
        line-height: 1.6rem;
        align-items: center;
      }

      .network-buttons {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;

        a {
          width: 30px;
          height: 30px;
          display: grid;
          place-items: center;
          background: rgba(${({ theme }) => theme.primary}, 0.2);
          border-radius: 10px;

          :hover {
            color: rgb(${({ theme }) => theme.primary_variant});
          }
        }
      }
    }
  }
`;
