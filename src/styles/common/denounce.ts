import styled from 'styled-components';
import {
  BaseButton,
  BaseButtonOutline,
  StyledInputs,
  StyledLabels,
} from '../defaults';

export const DenounceContainer = styled.div`
  position: relative;
  background: rgb(${({ theme }) => theme.foreground});
  width: 100%;
  height: 100%;
  * {
    ::selection {
      background: rgba(${({ theme }) => theme.font}, 0.1);
      color: rgb(${({ theme }) => theme.primary_variant});
    }
  }

  .main-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 5px;
    justify-items: center;
    max-width: 980px;
    align-self: center;
    margin: 0 auto;
    padding-top: 50px;
  }

  article {
    padding: 30px 40px;

    @media screen and (max-width: 620px) {
      padding: 30px 20px;
    }

    h1 {
      display: flex;
      flex-direction: row;
      gap: 10px;
      font-weight: 500;

      @media screen and (max-width: 620px) {
        line-height: 1.8rem;
        font-size: 1.6rem;
      }
    }

    a {
      color: rgb(${({ theme }) => theme.primary_variant});
    }

    p {
      max-width: 800px;
      line-height: 1.6rem;
        font-size: 1rem;
    }

    .error-message {
      color: rgb(${({ theme }) => theme.primary_variant});
      font-weight: 500;
    }

    .form-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .form {
      width: 100%;
      max-width: 760px;
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      gap: 12px;

      .form-section {
        display: flex;
        flex-direction: row;
        width: 100%;
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
      }

      .prompt-actions {
        margin-top: 8px;
        display: flex;
        flex-direction: row-reverse;
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
`;
