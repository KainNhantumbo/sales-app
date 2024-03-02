import {
  BaseButton,
  BaseButtonOutline,
  StyledCornerButton,
  StyledInputs
} from '../defaults';
import styled from 'styled-components';

export const _cart = styled.section`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(${({ theme }) => theme.background}, 0.2);
  backdrop-filter: blur(2px);
  z-index: 11000;
  top: 0;
  left: 0;
  display: grid;
  place-content: center;
  place-items: center;
  user-select: none;
  line-height: 1.4rem;

  .main-container {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    border-radius: 10px;
    background: rgb(${({ theme }) => theme.foreground});
    width: 100%;
    max-width: 500px;
    box-shadow: 0 0 25px rgba(${({ theme }) => theme.black}, 0.1);
    margin: 0 auto;

    @media screen and (max-width: 465px) {
      gap: 10px;
    }

    .prompt-header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .prompt-title {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;
        color: rgb(${({ theme }) => theme.primary_shade});
        font-weight: 500;

        svg {
          width: 25px;
          height: 25px;
        }
      }
    }

    .cart-items-container {
      width: 100%;
      height: 100%;
      max-height: 400px;
      display: flex;
      flex-direction: column;
      overflow-y: scroll;
      padding: 12px 3px;

      @media screen and (max-width: 465px) {
        padding: 5px 3px;
      }

      .item-container {
        display: flex;
        flex-direction: row;
        gap: 12px;
        align-items: center;
        justify-content: space-between;
        padding: 12px 0;
        border-top: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
        border-bottom: 1px solid rgba(${({ theme }) => theme.font}, 0.08);

        @media screen and (max-width: 470px) {
          flex-direction: column;
        }

        .item-actions-container {
          display: flex;
          gap: 12px;
          flex-direction: column;
          align-items: center;

          @media screen and (max-width: 470px) {
            flex-direction: row;
          }

          .remove-item {
            ${BaseButtonOutline}

            :hover {
              color: rgb(${({ theme }) => theme.error});
            }
          }
        }
      }

      .item-details {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;
        img {
          width: 100%;
          max-width: 60px;
          max-height: 60px;
          border-radius: 50%;
          object-fit: cover;
          cursor: pointer;
        }

        h3,
        p {
          font-size: 0.95rem;
          font-weight: 500;
          line-height: 1.2rem;
        }

        h3 {
          width: 100%;
          max-width: 220px;
        }
        p {
          color: rgb(${({ theme }) => theme.primary_shade});
          span {
            color: rgb(${({ theme }) => theme.font});
          }
        }
      }

      .item-manage {
        display: flex;
        flex-direction: row;
        gap: 8px;
        align-items: center;

        ${StyledInputs}
        input {
          max-width: 60px;
          padding: 10px;
        }

        button {
          ${StyledCornerButton}
          background: rgb(${({ theme }) => theme.primary_shade});
          padding: 2px;
          :hover {
            background: rgb(${({ theme }) => theme.secondary});
          }
          svg {
            width: 20px;
            height: 20px;
            color: rgb(${({ theme }) => theme.white});
          }
        }
      }
    }

    .totals-container {
      display: flex;
      flex-flow: row wrap;
      gap: 20px;
      justify-content: space-between;
      line-height: 1.6rem;
      align-items: center;
      font-weight: 500;

      h3 {
        display: flex;
        flex-direction: row;
        gap: 5px;
        align-items: center;
      }
    }

    .no-items-container {
      width: 100%;
      height: 100%;
      display: grid;
      place-content: center;
      place-items: center;
      font-size: 1.4rem;
      line-height: 1.8rem;

      h2 {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        padding: 50px 20px;
        line-height: 1.8rem;
        font-size: 1.2rem;
        font-weight: 500;
        svg {
          width: 50px;
          height: 50px;
          color: rgb(${({ theme }) => theme.primary_shade});
        }
      }
    }

    .prompt-actions {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      gap: 12px;
      .prompt-cancel {
        ${BaseButtonOutline}
      }

      .prompt-checkout {
        ${BaseButton}
      }
    }
  }
`;
