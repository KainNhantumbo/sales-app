import {
  BaseButton,
  BaseButtonOutline,
  StyledInputs,
  StyledLabels
} from '../defaults';
import styled from 'styled-components';

export const _deleteAccount = styled.section`
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
      span {
        font-weight: 500;
        color: rgb(${({ theme }) => theme.primary_shade});
      }
      p {
        line-height: 1.6rem;
        font-size: 0.9rem;
      }
    }

    .form-container {
      width: 100%;
      display: flex;
      gap: 16px;
      justify-content: flex-start;
      flex-direction: column;
      margin: 0 auto;

      h2 {
        font-weight: 500;
        line-height: 1.8rem;
        font-size: 1.2rem;
      }

      form {
        display: flex;
        justify-content: center;
        flex-direction: column;
        gap: 20px;

        .input-field {
          display: flex;
          flex-direction: column;
          gap: 10px;
          label {
            ${StyledLabels};
          }
          ${StyledInputs}
        }

        .error-message {
          color: rgb(${({ theme }) => theme.error});
          font-weight: 500;
          font-size: 0.96rem;
          line-height: 1.4rem;
        }
      }
    }

    .prompt-actions {
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
        background: rgb(${({ theme }) => theme.error});
        color: rgb(${({ theme }) => theme.white});
      }
    }
  }
`;
