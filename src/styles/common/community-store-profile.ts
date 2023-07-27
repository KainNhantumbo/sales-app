import styled from 'styled-components';
import { BaseButton, BaseButtonOutline, StyledCornerButton } from '../defaults';

export const _store = styled.div`
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

    .image-container {
      width: 100%;
      display: flex;
      align-items: start;
      flex-direction: column;
      gap: 10px;
      justify-content: center;
      position: relative;
      height: fit-content;

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

      .no-image-icon {
        width: 100%;
        height: 200px;
        border-radius: 20px 20px 0 0;
        margin: 0 auto;
        padding: 30px;
        background: rgba(${({ theme }) => theme.font}, 0.1);
      }

      h5 {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 3px 12px;
        gap: 5px;
        border-radius: 8px;
        background: rgb(${({ theme }) => theme.foreground});
        color: rgb(${({ theme }) => theme.primary_variant});
        font-size: 1.1rem;
        line-height: 1.6rem;
        font-weight: 500;
        position: absolute;
        bottom: 12px;
        right: 12px;
        z-index: 100;

        svg {
          width: 22px;
          height: 22px;
        }

        .alert {
          color: rgb(${({ theme }) => theme.secondary});
        }
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
              line-height: 1.4rem;
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

        .description {
          text-align: center;
          font-size: 0.96rem;
        }

        .location {
          width: 100%;
          align-self: center;
          max-width: 700px;
          text-align: center;
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
          user-select: none;
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
    }

    .docs-container {
      padding: 0 20px;

      .data-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding-bottom: 12px;
        border-bottom: 1px solid rgba(${({ theme }) => theme.font}, 0.08);

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

        .content {
          p {
            line-height: 1.6rem;
            margin-bottom: 12px;
          }
        }
      }

      .data-container_last {
        border-bottom: none;
        padding-bottom: 0;
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
            border-radius: 20px;
            background: rgba(${({ theme }) => theme.font}, 0.1);
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
      min-height: 300px;
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

    .profile-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      padding-bottom: 25px;
      border-bottom: 1px solid rgba(${({ theme }) => theme.font}, 0.08);

      .image-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        img {
          width: 100%;
          max-width: 90px;
          max-height: 90px;
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

      .email {
        font-weight: 500;
        color: rgb(${({ theme }) => theme.primary_variant});
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

      .profile-anchor {
        margin-top: 20px;
        a {
          ${BaseButton}
          background: rgba(${({ theme }) => theme.primary}, 0.2);
          color: rgb(${({ theme }) => theme.font});
          :hover {
            box-shadow: none;
            color: rgb(${({ theme }) => theme.primary_variant});
          }
        }
      }
    }
  }
`;
