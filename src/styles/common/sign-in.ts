import { BaseButton, BaseButtonOutline, StyledInputs, StyledLabels } from '../defaults';
import styled from 'styled-components';

export const _signIn = styled.div`
  position: relative;
  padding: 60px 0;
  width: 100%;
  padding-top: 90px;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgba(${({ theme }) => theme.background_shade}, 0.3);

  * {
    ::selection {
      background: rgb(${({ theme }) => theme.background_shade});
      color: rgb(${({ theme }) => theme.primary_shade});
    }
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: -1;
    object-fit: cover;
    filter: blur(3px);
  }

  article {
    z-index: 100;
    width: 100%;
    display: grid;
    place-content: center;
    place-items: center;
    padding: 5px;

    .form-container {
      width: 100%;
      height: auto;
      max-width: 430px;
      display: flex;
      gap: 16px;
      justify-content: flex-start;
      flex-direction: column;
      border-radius: 20px;
      padding: 30px 25px;
      margin: 25px;
      background: rgb(${({ theme }) => theme.foreground});
      box-shadow: 0 0 25px rgba(${({ theme }) => theme.black}, 0.09);
      border: 1px solid rgba(${({ theme }) => theme.font}, 0.15);

      @media screen and (min-width: 440px) {
        min-width: 400px;
      }

      h2 {
        text-align: center;
        font-weight: 500;
        line-height: 1.8rem;
        font-size: 1.4rem;
      }

      p {
        font-size: 0.92rem;
        font-weight: 500;
        line-height: 1.4rem;
        text-align: center;
      }

      form {
        display: flex;
        justify-content: flex-start;
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

        button {
          ${BaseButton}
          width: 100%;
          padding: 10px 0;
        }
      }

      .password-reset {
        a {
          color: rgb(${({ theme }) => theme.primary_shade});
          font-size: 0.9rem;
          font-weight: 500;
          line-height: 1.2rem;
          cursor: pointer;

          :hover {
            color: #24abf2;
            transition: all 200ms ease;
          }
        }
      }

      .sign-in-options {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;

        .login-btns {
          display: flex;
          flex-flow: row wrap;
          align-items: center;
          gap: 10px;

          a {
            ${BaseButtonOutline}
          }
        }
      }

      .signup-request {
        text-align: center;
        font-size: 0.92rem;
        font-weight: 500;
        line-height: 1.4rem;

        a {
          color: rgb(${({ theme }) => theme.primary_shade});
          cursor: pointer;
          :hover {
            color: #24abf2;
          }

          span {
            pointer-events: none;
          }
        }
      }
    }
  }

  .base-container {
    justify-self: flex-end;
    margin: 0 auto;
    font-size: 0.92rem;
    font-weight: 500;
    line-height: 1.4rem;
    background: rgba(${({ theme }) => theme.foreground}, 0.6);
    padding: 5px 10px;
    border-radius: 20px;
  }
`;
