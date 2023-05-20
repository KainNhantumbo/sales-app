import styled from 'styled-components';
import {
  BaseButton,
  BaseButtonOutline,
  Button_Mono_A,
  Button_Mono_B,
  StyledInputs,
  StyledLabels,
} from '../defaults';

export const UserProfileContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 90vh;
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgb(${({ theme }) => theme.foreground});

  * {
    ::selection {
      background: rgb(${({ theme }) => theme.background_variant});
      color: rgb(${({ theme }) => theme.primary_variant});
    }
  }

  .fetching-state {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5000;
    background: rgba(${({ theme }) => theme.foreground}, 0.5);
    backdrop-filter: blur(10px);
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    p {
      color: rgb(${({ theme }) => theme.alert});
      padding: 0 20px;
      line-height: 1.6rem;
      text-align: center;
    }
    button {
      ${BaseButtonOutline}
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

        @media screen and (max-width: 460px) {
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
          max-width: 640px;
          display: flex;
          justify-content: flex-start;
          flex-direction: column;
          gap: 18px;

          .working-data-container {
            display: flex;
            flex-direction: column;
            gap: 10px;

            h2 {
              text-align: center;
              font-size: 1.1rem;
              font-weight: 500;
              color: rgb(${({ theme }) => theme.primary_variant});
            }

            .add-url {
              ${BaseButton}
              align-self: center;
            }

            .no-data-container {
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              gap: 35px;
              padding: 20px;
              border-radius: 10px;
              border: 1px solid rgba(${({ theme }) => theme.font}, 0.1);

              span {
                display: grid;
                place-items: center;
                place-content: center;
              }

              h3 {
                line-height: 2rem;
                font-size: 0.92rem;
                font-weight: 500;
                text-align: center;
                text-transform: uppercase;
              }
              svg {
                width: 60px;
                height: 60px;
              }
            }

            .cards-container {
              display: flex;
              justify-content: flex-start;
              flex-direction: column;
              gap: 8px;

              .card {
                display: flex;
                justify-content: flex-start;
                gap: 5px;
                flex-direction: column;
                padding: 10px;
                border-radius: 10px;
                background: rgb(${({ theme }) => theme.foreground});
                border: 1px solid rgba(${({ theme }) => theme.primary}, 0.2);

                :hover {
                  border: 1px solid transparent;
                  box-shadow: 0 0 25px
                    rgba(${({ theme }) => theme.accent}, 0.09);
                  transition: all 300ms ease-in-out;
                }

                span {
                  line-height: 1.6rem;
                  i {
                    font-weight: 500;
                    color: rgb(${({ theme }) => theme.primary});
                  }
                }

                .actions {
                  display: flex;
                  flex-direction: row;
                  justify-content: flex-end;
                  gap: 10px;
                  button {
                    ${BaseButtonOutline}
                    padding: 0;
                    border: none;
                    box-shadow: none;
                    span {
                      padding-left: 30px;
                    }
                  }
                  .delete-btn {
                    :hover {
                      color: rgb(${({ theme }) => theme.alert});
                    }
                  }
                }
              }
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
            }

            .image-container {
              width: 100%;
              display: flex;
              align-items: center;
              flex-direction: column;
              gap: 10px;
              justify-content: center;
              position: relative;
              margin-bottom: 20px;

              input {
                display: none;
              }
            }

            .cover-image {
              img {
                width: 100%;
                border-radius: 10px;
                max-width: 1280px;
                max-height: 150px;
                object-fit: cover;
              }

              .camera-icon {
                width: 680px;
                height: 150px;
                border-radius: 12px;
                margin: 0 auto;
                padding: 5px;
                background: rgba(${({ theme }) => theme.font}, 0.1);
              }

              label {
                ${BaseButton}
                width: fit-content;
                height: fit-content;
                position: absolute;
                top: 3px;
                left: 3px;
                background: rgba(${({ theme }) => theme.primary}, 0.8);
                padding: 8px;
              }

              .clear-image {
                ${Button_Mono_A}
                position: absolute;
                top: 3px;
                right: 3px;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background: rgba(${({ theme }) => theme.primary}, 0.8);
                :hover {
                  background: rgb(${({ theme }) => theme.alert});
                }
              }
            }

            .profile-image {
              img {
                border-radius: 50%;
                max-width: 220px;
                max-height: 220px;
                object-fit: none;
              }

              .camera-icon {
                width: 150px;
                height: 150px;
                border-radius: 50%;
                margin: 0 auto;
                padding: 5px;
                background: rgba(${({ theme }) => theme.font}, 0.1);
              }
              label {
                ${BaseButton}
                width: fit-content;
                height: fit-content;
              }

              .clear-image {
                ${Button_Mono_A}
                position: absolute;
                bottom: 50px;
                right: calc(50% - 120px);
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: rgb(${({ theme }) => theme.font});
                :hover {
                  background: rgb(${({ theme }) => theme.alert});
                }
              }
            }
          }

          #genres-section {
            flex-direction: column-reverse;
            .genres-container {
              display: flex;
              justify-content: flex-start;

              flex-flow: row wrap;
              gap: 10px;

              .genre {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px;
                border-radius: 3px;
                gap: 10px;
                background: rgb(${({ theme }) => theme.foreground});
                box-shadow: 0 0 25px rgba(${({ theme }) => theme.accent}, 0.1);

                button {
                  ${Button_Mono_B}
                  border: none;
                  :hover {
                    color: rgb(${({ theme }) => theme.alert});
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
