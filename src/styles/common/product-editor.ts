import styled from 'styled-components';
import {
  BaseButton,
  BaseButtonOutline,
  Button_Mono_A,
  StyledInputs,
  StyledLabels,
} from '../defaults';

export const ProductEditorContainer = styled.div`
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

  .fetching-state {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5000;
    background: rgba(${({ theme }) => theme.foreground}, 0.8);
    backdrop-filter: blur(20px);
    width: 100%;
    height: 100%;
    div {
      position: relative;
      top: 300px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 30px;
      font-size: 1.2rem;
      padding: 60px 30px;
      width: fit-content;
      margin: 0 auto;
    }
    p {
      font-size: 1.2rem;
      line-height: 2rem;
      font-weight: 500;
      text-align: center;
    }
    button {
      ${BaseButtonOutline}
    }
  }

  .description {
    h2 {
      display: flex;
      font-size: 1.4rem;
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

    p {
      line-height: 1.4rem;
    }

    .p-bottom {
      color: rgb(${({ theme }) => theme.primary_variant});
      margin-top: 5px;
    }
  }

  article {
    width: 100%;
    margin-top: 90px;

    .header {
      max-width: 1280px;
      padding: 0 20px;
      margin: 0 auto;
      width: 100%;
      background: rgba(${({ theme }) => theme.foreground}, 0.8);
      backdrop-filter: blur(5px);
      z-index: 5000;
      display: flex;
      justify-content: space-between;
      flex-flow: row nowrap;
      align-items: center;
      margin-bottom: 10px;
      z-index: 0;

      h2 {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        gap: 10px;
        align-items: center;

        svg {
          width: 20px;
          height: 20px;
        }
      }

      .details {
        @media screen and (max-width: 460px) {
          display: none;
        }
      }
    }

    .data-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;

      .wrapper {
        width: 100%;
        max-width: 1280px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        padding: 20px;
        border-top: 1px solid rgba(${({ theme }) => theme.font}, 0.08);

        .form {
          width: 100%;
          max-width: 740px;
          display: flex;
          justify-content: flex-start;
          flex-direction: column;
          gap: 18px;

          .data-section {
            display: flex;
            flex-direction: column;
            gap: 25px;
            padding-top: 10px;
            border-top: 1px solid rgba(${({ theme }) => theme.font}, 0.08);

            .items-container {
              display: flex;
              flex-direction: column;
              gap: 20px;
            }
          }

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

              input[type='date'] {
                padding-top: 20px;
              }

              .counter {
                align-self: end;
                font-size: 0.9rem;
              }
            }

            .check-box {
              width: 100%;
              display: flex;
              justify-content: flex-start;
              align-items: flex-start;
              gap: 8px;
              margin: 5px 0;

              input[type='checkbox'] {
                position: relative;
                width: 60px;
                height: 20px;
                appearance: none;
                left: 25px;
                -moz-appearance: none;

                outline: none;
                border-radius: 15px;
                box-shadow: inset 0 0 5px
                  rgba(${({ theme }) => theme.accent}, 0.2);
                transition: 0.5s ease;
                margin-top: 0.4em;
                margin-right: 0.2em;

                :checked {
                  background: rgba(${({ theme }) => theme.primary});
                }

                ::after {
                  content: '';
                  position: absolute;
                  width: 24px;
                  height: 24px;
                  transform: scale(1.1);
                  border-radius: 50%;
                  top: -2px;
                  left: 0;
                  background: rgba(${({ theme }) => theme.font});
                  box-shadow: 0 0 20px rgba(${({ theme }) => theme.accent}, 0.5);
                  transition: all 0.2s ease;
                }

                :checked::after {
                  transform: scale(1.1) translateX(35px);
                  background: rgba(${({ theme }) => theme.primary_variant});
                }
              }
            }

            .images-container {
              width: 100%;
              display: flex;
              flex-flow: row wrap;
              justify-content: center;
              gap: 20px;
              margin: 0 auto;

              .images-container_header {
                display: flex;
                flex-direction: column;
                gap: 10px;
                justify-content: start;

                h2 {
                  font-size: 1.2rem;
                  font-weight: 500;
                  line-height: 1.6rem;
                }
              }

              .img-container {
                display: flex;
                align-items: start;
                flex-flow: row wrap;
                gap: 10px;
                justify-content: center;
                position: relative;
                margin-bottom: 20px;

                input {
                  display: none;
                }

                .description {
                  line-height: 1.2rem;
                }

                img {
                  width: 100%;
                  border-radius: 10px;
                  width: 320px;
                  height: 420px;
                  object-fit: cover;
                }

                .camera-icon {
                  width: 320px;
                  height: 420px;
                  border-radius: 12px;
                  margin: 0 auto;
                  padding: 5px;
                  background: rgba(${({ theme }) => theme.font}, 0.1);
                }

                label {
                  ${Button_Mono_A}
                  width: 30px;
                  height: 30px;
                  position: absolute;
                  border-radius: 50%;
                  top: 5px;
                  left: calc(0% + 5px);
                  background: rgba(${({ theme }) => theme.primary}, 0.8);
                  padding: 8px;
                  :hover {
                    background: rgba(${({ theme }) => theme.primary}, 0.6);
                  }
                }

                .clear-image {
                  ${Button_Mono_A}
                  position: absolute;
                  top: 5px;
                  right: 5px;
                  width: 30px;
                  height: 30px;
                  border-radius: 50%;
                  background: rgba(${({ theme }) => theme.primary}, 0.8);
                  :hover {
                    background: rgba(${({ theme }) => theme.alert}, 0.6);
                  }
                }
              }
            }
          }

          button {
            ${BaseButton}
            align-self: center;
            width: 100%;
          }
        }
      }

      .actions-container {
        width: 100%;
        max-width: 1280px;
        padding: 20px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 20px;
        border-top: 1px solid rgba(${({ theme }) => theme.font}, 0.1);
        line-height: 1.4rem;

        .error-message {
          color: rgb(${({ theme }) => theme.alert});
          font-weight: 500;
          font-size: 1.1rem;
          line-height: 1.4rem;
          align-self: flex-end;
        }

        p {
          margin-top: 10px;
        }

        .loading {
          width: 100%;
          height: 100%;
          align-self: flex-end;
          display: flex;
          flex-direction: row;
          align-items: center;
          font-weight: 500;
          font-size: 1.1rem;
          gap: 10px;
          padding: 20px;
          color: rgb(${({ theme }) => theme.primary_variant});
        }

        .btns-container {
          display: flex;
          flex-flow: row wrap;
          gap: 20px;
          align-self: flex-end;

          .back {
            ${BaseButtonOutline}
            border: none;
          }

          .save {
            ${BaseButton}
          }
        }
      }
    }
  }
`;
