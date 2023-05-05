import styled from 'styled-components';
import { BaseButton, StyledInputs, StyledLabels } from '@/styles/defaults';

export const ContactContainer = styled.div`
  margin-top: 50px;
  display: grid;
  align-items: center;
  justify-items: center;
  line-height: 1.6rem;

  h2,
  h3 {
    font-weight: 500;
  }

  a {
    color: rgb(${({ theme }) => theme.secondary});
    font-weight: 500;
  }

  h3 {
    position: relative;
    padding-left: 20px;

    svg {
      color: rgb(${({ theme }) => theme.secondary});
      position: absolute;
      width: 18px;
      height: 18px;
      top: 3px;
      left: 0;
    }
  }

  .intro {
    p {
      padding-top: 10px;
    }
    svg {
      position: absolute;
      width: 30px;
      height: 30px;
      left: 130px;
      top: 0px;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .container {
    background: rgb(${({ theme }) => theme.background});
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: 900px;
    padding: 40px;

    @media screen and (max-width: 520px) {
      padding: 40px 20px;
    }
    @media screen and (max-width: 370px) {
      padding: 30px 10px;
    }
  }

  form {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    border-radius: 5px;
    border: 1px solid rgba(${({ theme }) => theme.primary}, 0.1);
    background: rgb(${({ theme }) => theme.foreground});

    .form-control {
      display: flex;
      gap: 10px;

      @media screen and (max-width: 520px) {
        flex-flow: row wrap;
      }

      .form-item {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
    }
    label {
      ${StyledLabels}
      margin-bottom: 10px;
    }
    ${StyledInputs}
    textarea {
      margin-top: -5px;
    }
    button {
      ${BaseButton}
    }

    .errorMessage {
      color: rgb(${({ theme }) => theme.secondary});
      font-size: 0.9rem;
      font-weight: 500;
    }
  }
`;
