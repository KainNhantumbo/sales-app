import styled from 'styled-components';
import { BaseButton, BaseButtonOutline, StyledCornerButton } from '../defaults';

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
    gap: 50px;

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

      h1 {
        font-size: 1.6rem;
        font-weight: 500;
        line-height: 2rem;
        margin: 0;
        padding: 0;
      }

      .description {
        line-height: 1.4rem;
        font-size: 0.96rem;
      }

      .tags-container {
        display: flex;
        flex-direction: row;
        gap: 20px;

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
        max-width: 320px;
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

        .name, i {
          font-weight: 500;
        }

        a {
          ${BaseButton}
        }
      }
    }
  }
`;
