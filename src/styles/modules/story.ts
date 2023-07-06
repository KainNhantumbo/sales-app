import {
  BaseButton,
  BaseButtonOutline,
  StyledInputs,
  StyledLabels,
} from '../defaults';
import styled from 'styled-components';

export const StoryContainer = styled.div`
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
    max-width: 680px;
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

    .header-container {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 20px;
      border-bottom: 1px solid rgba(${({ theme }) => theme.font}, 0.08);

      h2 {
        display: flex;
        font-size: 1.2rem;
        font-weight: 500;
        align-items: center;
        width: 100%;
        gap: 8px;
        padding: 10px 0;
        text-transform: capitalize;
        line-height: 1.6rem;

        svg {
          width: 25px;
          height: 25px;
          color: rgb(${({ theme }) => theme.primary});
        }
      }

      p {
        line-height: 1.6rem;
        a {
          color: rgb(${({ theme }) => theme.primary_variant});
        }
      }
    }

    .form-container {
      padding: 12px 20px;
      width: 100%;

      .cover-image-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 12px;

        img {
          width: 100%;
          border-radius: 12px;
          object-fit: cover;
        }

        .clear-image {
          ${BaseButton}
          align-self: flex-end;
        }
      }

      .form {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        gap: 10px;

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
            align-items: center;
            gap: 8px;
            margin: 5px 0;
            flex-flow: row wrap;

            input[type='checkbox'] {
              position: relative;
              width: 50px;
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
              top: -2px;
              cursor: pointer;

              :checked {
                background: rgba(${({ theme }) => theme.primary});
              }

              ::after {
                content: '';
                position: absolute;
                width: 20px;
                height: 20px;
                transform: scale(1.1);
                border-radius: 50%;
                top: 0;
                left: 0;
                background: rgba(${({ theme }) => theme.font});
                transition: all 0.2s ease;

                :hover {
                  box-shadow: 0 0 10px 5px
                    rgba(${({ theme }) => theme.accent}, 0.5);
                }
              }

              :checked::after {
                transform: scale(1.1) translateX(25px);
                background: rgba(${({ theme }) => theme.primary_variant});
              }
            }
          }
        }

        .image-drop-container {
          width: 100%;
          background: rgb(${({ theme }) => theme.background});
          border-radius: 12px;
          padding: 20px;
          user-select: none;

          .content {
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            gap: 20px;

            .download-icon {
              width: 60px;
              height: 60px;
            }

            h3 {
              text-align: center;
              font-size: 1.1rem;
              padding: 0;
              margin: 0;
              line-height: 1.6rem;
              font-weight: 500;
            }

            label {
              ${BaseButton}
            }

            input {
              display: none;
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

          .prompt-actions {
            margin-top: 12px;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            gap: 10px;

            .prompt-accept-btn {
              ${BaseButton}
              width: 100%;
              max-width: 380px;
              margin: 0 auto;
              span {
                padding: 0;
              }
            }
          }
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

    .no-ads {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      padding: 12px 5px;
      padding-bottom: 25px;
      border-bottom: 1px solid rgba(${({ theme }) => theme.font}, 0.08);

      .ads-icon {
        width: 30px;
        height: 30px;
        color: rgb(${({ theme }) => theme.primary});
      }

      h3 {
        text-align: center;
        font-size: 1.2rem;
        line-height: 1.6rem;
        font-weight: 500;
      }

      a {
        ${BaseButtonOutline}
      }
    }
  }
`;
