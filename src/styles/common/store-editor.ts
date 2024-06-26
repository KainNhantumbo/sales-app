import styled from 'styled-components';
import {
  BaseButton,
  BaseButtonOutline,
  StyledCornerButton,
  StyledInputs,
  StyledLabels
} from '../defaults';

export const _storeEditor = styled.div`
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

  .fetching-state {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5000;
    background: rgba(${({ theme }) => theme.foreground}, 0.5);
    backdrop-filter: blur(10px);
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
    }
    p {
      color: rgb(${({ theme }) => theme.error});
      padding: 0 20px;
      line-height: 1.6rem;
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
      color: rgb(${({ theme }) => theme.primary_shade});
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

      .store-activation-container {
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
