import {
  BaseButton,
  BaseButtonOutline,
  StyledInputs,
  StyledLabels,
} from '../defaults';
import styled from 'styled-components';

export const PurchaseContainer = styled.div`
  position: relative;
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 5px;
    max-width: 1080px;
    align-self: center;
    margin: 0 auto;
    padding: 110px 20px;
    gap: 20px;

    @media screen and (max-width: 445px) {
      padding-top: 90px;
    }
  }

  aside {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 30px;
    max-width: 420px;

    .payment-details {
      display: flex;
    }

    .payment-options-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 12px;

      .payment-option {
        width: 100%;
        padding: 12px;
        border-radius: 12px;
        position: relative;
        border: 1px solid rgba(${({ theme }) => theme.font}, 0.08);

        label {
          padding-left: 30px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          line-height: 1.4rem;
          font-weight: 500;
  
        }

        input[type='radio'] {
          position: absolute;
          top: calc(50% - 10px);
          left: 12px;
          appearance: none;
          -moz-appearance: none;
          margin: 0;
          background: rgb(${({ theme }) => theme.background});
          width: 20px;
          height: 20px;
          border: 2px solid rgb(${({ theme }) => theme.font});
          border-radius: 50%;
          display: grid;
          place-content: center;

          :hover {
            cursor: pointer;
          }
          :checked::before {
            content: '';
            width: 8px;
            height: 8px;
            background: rgb(${({ theme }) => theme.font});
            border-radius: 50%;
            margin: auto;
          }
        }
      }
    }
  }

  article {
    width: 100%;
    max-width: 620px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .checkout-summary-container {
      display: flex;
      flex-direction: column;
      border: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
      border-radius: 12px;
      padding: 12px 18px;
      user-select: none;

      .header-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
        padding-bottom: 8px;

        .title {
          display: flex;
          flex-direction: row;
          align-items: center;
          line-height: 1.6rem;
          font-size: 1.1rem;
          font-weight: 500;
          gap: 5px;
          padding: 12px;
          svg {
            position: relative;
            top: -2px;
            width: 25px;
            height: 25px;
            color: rgb(${({ theme }) => theme.primary});
          }
        }

        .open-cart-button {
          ${BaseButtonOutline}
          padding: 12px;
          color: rgb(${({ theme }) => theme.primary_variant});
          :hover {
            color: rgb(${({ theme }) => theme.primary_variant});
            background: rgba(${({ theme }) => theme.primary}, 0.2);
            transition: all 200ms ease-in-out;
          }
        }
      }

      .item-container {
        display: flex;
        flex-direction: row;
        gap: 12px;
        align-items: center;
        justify-content: space-between;
        padding: 12px 0;
        border-bottom: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
        /* 
        @media screen and (max-width: 470px) {
          flex-direction: column;
        } */

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
              color: rgb(${({ theme }) => theme.alert});
            }
          }
        }

        .item-details {
          display: flex;
          width: 100%;
          flex-direction: row;
          align-items: center;
          gap: 8px;
          img {
            width: 100%;
            max-width: 60px;
            max-height: 60px;
            border-radius: 50%;
            object-fit: cover;
          }

          h3,
          p {
            align-self: start;
            font-size: 0.95rem;
            font-weight: 500;
            line-height: 1.2rem;
            width: 120px;
          }

          h3 {
            width: 100%;
            max-width: 120px;
          }
          p {
            text-align: end;
            color: rgb(${({ theme }) => theme.primary_variant});
            span {
              color: rgb(${({ theme }) => theme.font});
            }
          }

          div {
            display: flex;
            flex-direction: row;
            align-items: center;

            gap: 12px;
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
        padding-top: 12px;

        h3 {
          display: flex;
          flex-direction: row;
          gap: 5px;
          align-items: center;
        }
      }
    }

    .form-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
      border: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
      border-radius: 12px;
      padding: 12px 18px;

      .header-container {
        display: flex;
        flex-direction: column;
        gap: 12px;
        h2 {
          display: flex;
          flex-direction: row;
          align-items: center;
          line-height: 1.6rem;
          font-size: 1.1rem;
          font-weight: 500;
          gap: 5px;
          padding: 12px;
          svg {
            position: relative;
            top: -1px;
            width: 25px;
            height: 25px;
            color: rgb(${({ theme }) => theme.primary});
          }
        }

        p {
          color: rgb(${({ theme }) => theme.secondary});
          line-height: 1.4rem;
        }
      }

      .form {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        gap: 18px;
        .form-section {
          display: flex;
          flex-direction: row;
          width: 100%;
          gap: 10px;

          @media screen and (max-width: 655px) {
            flex-direction: column;
          }

          .form-element {
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;
            label {
              ${StyledLabels};
            }
            ${StyledInputs}

            .counter {
              align-self: end;
              font-size: 0.9rem;
            }
          }
        }
        .phone-container {
          flex-direction: column;
        }
      }
    }
  }
`;
