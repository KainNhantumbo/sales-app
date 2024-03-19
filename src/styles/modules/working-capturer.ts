import { BaseButton, BaseButtonOutline, StyledInputs, StyledLabels } from '../defaults';
import styled from 'styled-components';

export const _capturer = styled.section`
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
    box-shadow: 0 0 25px rgba(${({ theme }) => theme.black}, 0.1);

    .prompt-info {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 10px;

      .prompt-header {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 10px;
        span {
          font-weight: 500;
          color: rgb(${({ theme }) => theme.primary_shade});
        }
        p {
          line-height: 1.6rem;
          font-size: 0.9rem;
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
