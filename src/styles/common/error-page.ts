import styled from 'styled-components';
import { BaseButtonOutline } from '../defaults';

export const errorPage = styled.article`
  margin-top: 70px;
  display: grid;
  align-items: center;
  justify-items: center;
  line-height: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 50px;

  .content-container {
    text-align: center;
    font-size: 1.2rem;
    font-weight: 500;
    h1 {
      font-weight: 600;
      font-size: 8rem;
    }

    button {
      margin-top: 20px;
      ${BaseButtonOutline}
      color: rgb(${({ theme }) => theme.font});
    }
  }

  .logo-container {
    span {
      font-size: 2.6rem;
      font-weight: 600;
      color: rgb(${({ theme }) => theme.font});
      font-family: 'Grand Hotel', 'Roboto Mono';
    }
  }
`;
