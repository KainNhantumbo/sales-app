import styled from 'styled-components';
import { BaseButton, StyledInputs, StyledLabels } from '../defaults';

export const _signUp = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 60px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  background: rgba(${({ theme }) => theme.background_variant}, 0.3);

  * {
    ::selection {
      background: rgb(${({ theme }) => theme.background_variant});
      color: rgb(${({ theme }) => theme.primary_variant});
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
    padding: 25px;

    .form-container {
      width: 100%;
      height: auto;
      max-width: 500px;
      display: flex;
      gap: 20px;
      justify-content: flex-start;
      flex-direction: column;
      border-radius: 20px;
      padding: 30px 25px;
      margin: 25px;
      background: rgb(${({ theme }) => theme.foreground});
      box-shadow: 0 0 25px rgba(${({ theme }) => theme.accent}, 0.09);

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
            width: 100%;
            label {
              ${StyledLabels};
            }
            ${StyledInputs}
          }
        }

        .error-message {
          color: rgb(${({ theme }) => theme.alert});
          font-weight: 500;
          font-size: 0.8rem;
          line-height: 1.4rem;
        }

        button {
          ${BaseButton}
          align-self: center;
          width: 100%;
        }
      }

      .signup-request {
        text-align: center;
        font-size: 0.92rem;
        font-weight: 500;
        line-height: 1.4rem;

        a {
          color: rgb(${({ theme }) => theme.primary_variant});
          cursor: pointer;
          :hover {
            color: rgb(${({ theme }) => theme.accent});
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
