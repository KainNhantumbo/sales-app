import styled from 'styled-components';
import { BaseButton, BaseButtonOutline, StyledInputs } from '../defaults';

export const SignInContainer = styled.div`
  position: relative;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgb(${({ theme }) => theme.foreground});

  * {
    ::selection {
      background: rgb(${({ theme }) => theme.background_variant});
      color: rgb(${({ theme }) => theme.secondary});
    }
  }

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
        gap: 20px;

        ${StyledInputs}

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
          .register {
            ${BaseButtonOutline}
          }
        }
      }
      .links {
        color: rgb(${({ theme }) => theme.secondary});
        font-size: 0.9rem;
        font-weight: 500;
        line-height: 1.2rem;
        cursor: pointer;

        :hover {
          color: rgb(${({ theme }) => theme.background_variant});
          transition: all 200ms ease;
        }
      }
    }
  }

  footer {
    justify-self: flex-end;
    margin: 0 auto;
    font-size: 0.92rem;
    font-weight: 500;
    line-height: 1.4rem;
  }
`;
