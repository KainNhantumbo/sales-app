import styled from 'styled-components';
import {
  BaseButton,
  BaseButtonOutline,
  StyledInputs,
  StyledLabels,
} from '../defaults';

export const StoryContainer = styled.section`
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
  user-select: none;
  position: fixed;
  line-height: 1.4rem;

  .dialog-prompt {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    border-radius: 10px;
    background: rgb(${({ theme }) => theme.foreground});
    max-width: 500px;
    margin: 25px;
    box-shadow: 0 0 25px rgba(${({ theme }) => theme.accent}, 0.1);

    .prompt-info {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 10px;

      .prompt-info {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 10px;
        span {
          font-weight: 500;
          color: rgb(${({ theme }) => theme.primary_variant});
        }
        p {
          line-height: 1.6rem;
          font-size: 0.9rem;
        }
      }

      .cover-image-container {
        img {
          width: 100%;
          border-radius: 12px;
          object-fit: cover;
        }

        .camera-icon {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          margin: 0 auto;
          padding: 5px;
          background: rgba(${({ theme }) => theme.font}, 0.1);
        }
      }

      .form {
        width: 100%;
        max-width: 760px;
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
        }

        .prompt-actions {
          margin-top: 8px;
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          gap: 10px;
          .prompt-cancel {
            ${BaseButtonOutline}
            border: none;
          }
          .prompt-accept {
            ${BaseButton}
          }
        }
      }
    }
  }
`;
