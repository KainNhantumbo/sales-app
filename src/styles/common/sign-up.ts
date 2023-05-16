import styled from 'styled-components';
import {
  BaseButton,
  BaseButtonOutline,
  StyledInputs,
  StyledLabels,
} from '../defaults';

export const SignUpContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  background: rgb(${({ theme }) => theme.background});

  article {
    width: 100%;
    display: grid;
    place-content: center;
    place-items: center;
    padding: 25px;

    .form-container {
      width: 100%;
      height: auto;
      max-width: 500px;
      display: flex;
      gap: 20px;
      justify-content: flex-start;
      flex-direction: column;
      border-radius: 10px;
      padding: 35px 20px;
      margin: 25px;
      border: 1px solid rgba(${({ theme }) => theme.accent}, 0.1);
      @media screen and (min-width: 440px) {
        min-width: 400px;
      }

      h2 {
        text-align: center;
        font-weight: 600;
        line-height: 2rem;
        font-size: 1.4rem;
      }

      form {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        gap: 18px;

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
            label {
              ${StyledLabels};
            }
            ${StyledInputs}
          }
        }

        .error-message {
          color: rgb(${({ theme }) => theme.secondary});
          font-weight: 500;
          font-size: 0.8rem;
          max-width: 320px;
          line-height: 1.4rem;
        }

        .actions {
          display: flex;
          flex-flow: row wrap;
          justify-content: flex-start;
          gap: 10px;

          .login {
            ${BaseButton}
          }
          .next {
            ${BaseButtonOutline}
          }
        }
      }
    }
  }

  footer {
    justify-self: flex-end;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 0.92rem;
    font-weight: 500;
    margin: 0 10px;
    margin-bottom: 10px;
    line-height: 1.4rem;

    i {
      color: rgb(${({ theme }) => theme.primary});
    }
  }
`;
