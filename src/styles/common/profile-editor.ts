import {
  BaseButton,
  BaseButtonOutline,
  ButtonMonoOutline,
  StyledCornerButton,
  StyledInputs,
  StyledLabels
} from '../defaults';
import styled from 'styled-components';

export const _userProfile = styled.div`
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
      color: rgb(${({ theme }) => theme.primary_shade});
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

          .working-data-container {
            display: flex;
            flex-direction: column;
            gap: 20px;
            padding-top: 10px;
            border-top: 1px solid rgba(${({ theme }) => theme.font}, 0.1);

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
                gap: 05px;
                flex-direction: column;
                padding: 10px;
                border-radius: 10px;
                background: rgb(${({ theme }) => theme.foreground});
                border: 1px solid rgba(${({ theme }) => theme.primary}, 0.2);

                .info {
                  display: flex;
                  flex-direction: column;
                  gap: 10px;

                  .item {
                    display: flex;
                    flex-direction: column;
                    gap: 3px;

                    h3 {
                      display: flex;
                      flex-direction: row;
                      align-items: center;
                      font-size: 1rem;
                      font-weight: 500;
                      color: rgb(${({ theme }) => theme.font});
                      span {
                        padding-left: 10px;
                      }
                    }

                    span,
                    p {
                      padding-left: 25px;
                      line-height: 1.2rem;
                    }
                  }
                }

                :hover {
                  border: 1px solid transparent;
                  box-shadow: 0 0 25px rgba(${({ theme }) => theme.black}, 0.09);
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
                      color: rgb(${({ theme }) => theme.error});
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

              .counter {
                align-self: end;
                font-size: 0.9rem;
              }
            }

            .cover-image-container {
              width: 100%;
              height: 220px;
              position: relative;
              margin-bottom: 20px;

              img {
                width: 100%;
                height: 220px;
                border-radius: 12px;
                object-fit: cover;
              }

              button {
                ${StyledCornerButton}
                width: 25px;
                height: 25px;
                position: absolute;
                top: 8px;
                right: 8px;
                background: rgb(${({ theme }) => theme.foreground});
                z-index: 50px;
              }

              .image-drop-container {
                width: 100%;
                height: 220px;
              }
            }

            .profile-image-container {
              width: 100%;
              max-width: 220px;
              height: 220px;
              position: relative;
              margin: 0 auto;
              margin-bottom: 20px;

              img {
                width: 100%;
                max-width: 220px;
                height: 220px;
                border-radius: 12px;
                object-fit: cover;
              }

              button {
                ${StyledCornerButton}
                width: 16px;
                height: 16px;
                position: absolute;
                top: 4px;
                right: 4px;
                background: rgb(${({ theme }) => theme.foreground});
                z-index: 50px;
                display: grid;
                place-content: center center;
                place-items: center center;
                svg {
                  position: static;
                  width: 16px;
                  height: auto;
                }
              }

              .image-drop-container {
                width: 100%;
                height: 220px;
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
                border-radius: 8px;
                gap: 10px;
                background: rgb(${({ theme }) => theme.foreground});
                box-shadow: 0 0 25px rgba(${({ theme }) => theme.black}, 0.1);
                border: 1px solid rgba(${({ theme }) => theme.font}, 0.1);

                button {
                  ${ButtonMonoOutline}
                  border: none;
                  :hover {
                    color: rgb(${({ theme }) => theme.error});
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
          color: rgb(${({ theme }) => theme.primary_shade});
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

      .delete-account {
        width: 100%;
        max-width: 1280px;
        padding: 20px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 20px;
        border-top: 1px solid rgba(${({ theme }) => theme.font}, 0.1);
        line-height: 1.4rem;

        section {
          span {
            line-height: 1.8rem;
            color: rgb(${({ theme }) => theme.error});
          }
        }

        .save {
          ${BaseButton}
        }
      }
    }
  }
`;
