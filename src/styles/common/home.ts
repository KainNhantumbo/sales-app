import styled from 'styled-components';
import { BaseButton, StyledCornerButton } from '../defaults';

export const HomeContainer = styled.div`
  position: relative;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgb(${({ theme }) => theme.background});

  * {
    ::selection {
      background: rgba(${({ theme }) => theme.font}, 0.1);
      color: rgb(${({ theme }) => theme.primary_variant});
    }
  }

  .banner-container {
    width: 100%;
    background: rgba(${({ theme }) => theme.foreground}, 0.8);
    backdrop-filter: blur(10px);
    padding: 0 20px;
    padding-top: 100px;
    padding-bottom: 40px;
    margin-bottom: 20px;
    border-radius: 0 0 20px 20px;

    .wrapper {
      width: 100%;
      max-width: 1080px;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 50px;
      justify-content: center;
      margin: 0 auto;
    }

    .banner-title {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: 0 auto;
      position: relative;
      gap: 10px;
      h1 {
        font-size: 2.8rem;
        font-weight: 500;
        line-height: 3.2rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
      }
      h3 {
        font-size: 1.4rem;
        line-height: 2rem;
      }

      ::before {
        content: '';
        position: absolute;
        width: 1px;
        height: 1px;
        left: 40px;
        top: 60px;
        border-radius: 50%;
        z-index: -999;
        transform: rotate(180);
        backdrop-filter: blur(10px);
        box-shadow: 0 0 100px 60px rgba(${({ theme }) => theme.primary}, 0.8);
      }

      @media screen and (max-width: 900px) {
        h1 {
          font-size: 1.8rem;
          font-weight: 500;
          line-height: 2.2rem;
        }
      }

      @media screen and (max-width: 420px) {
        h1,
        h3 {
          line-height: 1.6rem;
          font-size: 1.3rem;
          svg {
            display: none;
          }
        }
      }
    }

    img {
      width: 100%;
      height: 100%;
      max-width: 200px;
      max-height: 300px;
      object-fit: cover;

      @media screen and (max-width: 650px) {
        display: none;
      }
    }
  }

  .content-wrapper {
    width: 100%;
    max-width: 1480px;
    display: flex;
    flex-direction: row;
    gap: 20px;
    padding: 0 20px;
    margin: 0 auto;
    padding-bottom: 50px;
  }

  aside {
    width: 100%;
    max-width: 400px;
    position: relative;
  }

  article {
    width: 100%;
    .products-container {
      display: flex;
      flex-flow: row wrap;
      gap: 12px;
      padding: 0 20px;

      .product-container {
        width: 100%;
        max-width: 230px;
        height: 350px;
        display: flex;
        flex-direction: column;
        border-radius: 10px;
        background: rgb(${({ theme }) => theme.foreground});

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

          .favorite-button {
            ${StyledCornerButton}
            position: absolute;
            top: 8px;
            right: 8px;
            background: rgba(${({ theme }) => theme.neutral}, 0.9);
            border: 1px solid rgba(${({ theme }) => theme.font}, 0.2);

            svg {
              color: rgb(${({ theme }) => theme.secondary});
            }
          }
          img {
            width: 100%;
            height: 100%;
            height: 230px;
            object-fit: cover;
            border-radius: 10px 10px 0 0;
          }

          .no-image-icon {
            width: 100%;
            height: 100%;
            max-width: 230px;
            padding: 30px;
            border-radius: 10px 10px 0 0;
          }
        }

        .product-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 12px;
          height: 100%;
          cursor: pointer;

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

            i {
              font-weight: 500;
              color: rgb(${({ theme }) => theme.primary_variant});
            }
          }

          .promo-price {
            .percentage {
              font-weight: 500;
              text-decoration: line-through;
              color: rgb(${({ theme }) => theme.alert});
            }
          }
        }
      }
    }
  }
`;
