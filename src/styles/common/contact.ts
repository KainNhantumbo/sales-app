import styled from 'styled-components';
import { BaseButton, StyledInputs, StyledLabels } from '@/styles/defaults';

export const ContactContainer = styled.div`
  margin-top: 50px;
  display: grid;
  align-items: center;
  justify-items: center;
  line-height: 1.6rem;
  background: rgb(${({ theme }) => theme.background});

  h2,
  h3 {
    font-weight: 500;
  }

  a {
    color: rgb(${({ theme }) => theme.secondary_shade});
    font-weight: 500;
  }

  h3 {
    position: relative;
    padding-left: 20px;

    svg {
      color: rgb(${({ theme }) => theme.font});
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
    background: rgb(${({ theme }) => theme.foreground});
    box-shadow: 0 0 25px rgba(${({ theme }) => theme.black}, 0.09);
    border: 1px solid rgba(${({ theme }) => theme.font}, 0.08);

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
      color: rgb(${({ theme }) => theme.error});
      font-size: 0.9rem;
      font-weight: 500;
    }
  }
`;
