import {
  BaseButton,
  BaseButtonOutline,
  StyledInputs,
  StyledLabels,
} from '../defaults';
import styled from 'styled-components';

export const _purchase = styled.div`
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
    position: relative;

    @media screen and (max-width: 1080px) {
      flex-direction: column;
      align-items: center;
    }

    @media screen and (max-width: 640px) {
      padding: 110px 8px;
    }
  }

  aside {
    position: sticky;
    top: 110px;
    right: 0;
    width: 100%;
    max-width: 410px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 30px;

    @media screen and (max-width: 1080px) {
      max-width: 620px;
    }

    .payment-details {
      display: flex;
      flex-direction: column;
      gap: 10px;
      border: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
      border-radius: 12px;
      padding: 12px 18px;
      user-select: none;

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
          top: -2px;
          width: 25px;
          height: 25px;
          color: rgb(${({ theme }) => theme.primary});
        }
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

      .payment-method-preview-container {
        width: 100%;
        padding: 20px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          max-width: 200px;
          max-height: 85px;
          border-radius: 5px;
          position: relative;
          left: calc(50% - 110px);
        }

        .paypal {
          height: 50px;
          width: 150px;
          left: calc(50% - 75px);
        }
      }

      .payment-method-inputs {
        padding: 20px 0;
        border-top: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
        .m-pesa {
          .form-section {
            display: flex;
            flex-direction: row;
            width: 100%;
            gap: 10px;

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
        }
      }

      .payment-finalization-container {
        padding-top: 20px;
        border-top: 1px solid rgba(${({ theme }) => theme.font}, 0.08);

        .actions-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;

          .pay-button {
            ${BaseButton}
            width: 100%;
            max-width: 280px;
            border-radius: 20px;

            span {
              padding: 0;
            }
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

        @media screen and (max-width: 640px) {
          flex-direction: column;
        }

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

        .item-details {
          display: flex;
          width: 100%;
          flex-direction: row;
          align-items: center;
          gap: 8px;
          position: relative;

          @media screen and (max-width: 640px) {
            flex-direction: column;
          }

          img {
            width: 100%;
            max-width: 60px;
            max-height: 60px;
            border-radius: 50%;
            object-fit: cover;

            @media screen and (max-width: 640px) {
              max-width: 100%;
              max-height: 220px;
              border-radius: 12px;
            }
          }

          h3,
          p {
            align-self: start;
            font-size: 0.95rem;
            font-weight: 500;
            line-height: 1.2rem;
            width: 120px;

            @media screen and (max-width: 640px) {
              width: 100%;
            }
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
              @media screen and (max-width: 640px) {
                color: rgb(${({ theme }) => theme.neutral});
              }
            }
          }

          div {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 12px;
            @media screen and (max-width: 640px) {
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              min-width: 200px;
              border-radius: 12px;
              flex-direction: column;
              background: rgba(${({ theme }) => theme.accent}, 0.5);
              color: rgb(${({ theme }) => theme.neutral});
              padding: 20px;
              backdrop-filter: blur(20px);
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

          @media screen and (max-width: 600px) {
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
      }
    }
  }
`;
