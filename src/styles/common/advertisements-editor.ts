import styled from 'styled-components';
import {
  BaseButton,
  BaseButtonOutline,
  StyledCornerButton,
  StyledInputs,
  StyledLabels
} from '../defaults';

export const _adEditor = styled.div`
  position: relative;
  width: 100%;
  min-height: 90vh;
  padding: 70px 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgb(${({ theme }) => theme.background});

  * {
    ::selection {
      background: rgba(${({ theme }) => theme.font}, 0.2);
      color: rgb(${({ theme }) => theme.primary_shade});
    }
  }

  .loading-spinner {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 12000;
    background: rgba(${({ theme }) => theme.foreground}, 0.8);
    backdrop-filter: blur(20px);
    width: 100%;
    height: 100%;

    .wrapper {
      position: relative;
      top: 300px;
    }

    .center {
      padding-top: 20px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    p {
      padding-top: 40px;
      font-size: 1.1rem;
      line-height: 1.6rem;
      font-weight: 500;
      text-align: center;
    }
  }

  .fetching-state {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 12000;
    background: rgba(${({ theme }) => theme.foreground}, 0.8);
    backdrop-filter: blur(20px);
    width: 100%;
    height: 100%;
    .wrapper {
      position: relative;
      top: 300px;
    }

    div {
      padding-top: 20px;
      width: 100%;
      display: flex;
      flex-flow: row-reverse wrap;
      gap: 12px;
      justify-content: center;
    }
    p,
    h3 {
      font-size: 1.4rem;
      line-height: 2rem;
      font-weight: 500;
      text-align: center;
    }
    button {
      ${BaseButtonOutline}
    }
  }

  article {
    width: 100%;
    max-width: 980px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
    border-radius: 20px;
    background: rgb(${({ theme }) => theme.foreground});

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
      }
    }

    .data-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 12px;
      align-self: center;
      margin: 0 auto;
      gap: 20px;
      position: relative;
      padding: 0 20px;

      .form-section {
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 12px;

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

        .image-container {
          width: 100%;
          margin: 12px 0;

          .image-dropzone,
          img {
            width: 100%;
            max-width: 320px;
            height: 320px;
            margin: 0 auto;
          }

          img {
            width: 100%;
            border-radius: 12px;
            object-fit: cover;
          }

          .image {
            width: 100%;
            max-width: 320px;
            margin: 0 auto;
            position: relative;

            .image-remover-button {
              ${StyledCornerButton}
              background: rgb(${({ theme }) => theme.foreground});
              position: absolute;
              right: 5px;
              top: 5px;
              border-radius: 50px;
            }
          }
        }
      }
    }

    .actions-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 18px;
      padding: 20px;
      border-top: 1px solid rgba(${({ theme }) => theme.font}, 0.1);

      .description {
        display: flex;
        flex-direction: column;
        gap: 12px;

        h2 {
          display: flex;
          flex-flow: row wrap;
          gap: 8px;
          align-items: center;
          font-size: 1.1rem;
          font-weight: 500;
        }
      }

      .error-message {
        color: rgb(${({ theme }) => theme.error});
        font-weight: 500;
        font-size: 1.1rem;
        line-height: 1.4rem;
        align-self: flex-end;
      }

      .caution-message {
        line-height: 1.4rem;

        p {
          margin-top: 8px;
        }
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

        .cancel-button {
          ${BaseButtonOutline}
          border: none;
        }

        .save-button {
          ${BaseButton}
        }
      }
    }
  }
`;
