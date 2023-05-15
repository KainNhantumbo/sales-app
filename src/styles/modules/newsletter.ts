import styled from 'styled-components';
import { BaseButton, StyledInputs } from '../defaults';

export const NewsletterContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: fit-content;
  margin: 0 auto;
  background: rgb(${({ theme }) => theme.foreground});
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 25px rgba(${({ theme }) => theme.accent}, 0.09);
  position: relative;
  width: 100%;
  max-width: 800px;

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

    p {
      line-height: 1.8rem;
    }
    form {
      display: flex;
      flex-direction: row;
      gap: 10px;
      align-items: center;
      width: fit-content;
      ${StyledInputs}

      button {
        ${BaseButton}
      }
    }
  }
`;
