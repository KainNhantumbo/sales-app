import styled from 'styled-components';
import { BaseButton, StyledInputs } from '../defaults';

export const NewsletterContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: fit-content;
  background: rgb(${({ theme }) => theme.foreground});
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 25px rgba(${({ theme }) => theme.accent}, 0.09);
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 40px auto;

  @media screen and (max-width: 820px) {
    max-width: 95%;
  }

  .error-message {
    color: rgb(${({ theme }) => theme.alert});
    font-weight: 500;
    font-size: 0.96rem;
    max-width: 320px;
    line-height: 1.4rem;
  }

  h3 {
    text-align: center;
    margin-top: 30px;
    font-size: 1.6rem;
    font-weight: 500;

    @media screen and (max-width: 665px) {
      font-size: 1.4rem;
    }
  }

  svg {
    width: 80px;
    height: 80px;
    position: absolute;
    top: -40px;
    left: calc(50% - 40px);
    color: rgb(${({ theme }) => theme.primary});
  }

  section {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 10px;
    width: 100%;

    @media screen and (max-width: 665px) {
      flex-direction: column;
    }
    img {
      width: 100%;
      max-width: 300px;
      height: 100%;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;

    p {
      line-height: 1.8rem;
    }
    form {
      width: 100%;
      display: flex;
      flex-direction: row;
      gap: 10px;
      align-items: center;
      width: fit-content;

      ${StyledInputs}

      @media screen and (max-width: 390px) {
        flex-direction: column;
      }

      button {
        width: 100%;
        min-width: 140px;
        ${BaseButton}
      }
    }
  }
`;
