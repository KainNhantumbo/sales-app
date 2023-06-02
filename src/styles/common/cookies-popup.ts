import styled from 'styled-components';
import { BaseButton } from '../defaults';

export const CookiesPopupContainer = styled.div`
  width: 100%;
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 12000;

  div {
    position: absolute;
    left: 20px;
    bottom: 20px;
    background: rgba(${({ theme }) => theme.foreground}, 0.8);
    border-radius: 20px;
    padding: 20px;
    max-width: 350px;
    display: flex;
    flex-direction: column;
    backdrop-filter: blur(10px);
    align-items: center;
    gap: 10px;
    line-height: 1.4rem;
    font-size: 0.9rem;
    box-shadow: 0 0 25px rgba(${({ theme }) => theme.accent}, 0.1);

    ::before {
      content: '';
      position: absolute;
      width: 1px;
      height: 1px;
      left: calc(50% - 10px);
      bottom: 30px;
      border-radius: 50%;
      z-index: -999;
      transform: rotate(180);
      backdrop-filter: blur(10px);
      box-shadow: 0 0 100px 60px rgba(${({ theme }) => theme.primary}, 0.8);
    }

    @media screen and (max-width: 435px) {
      flex-direction: column;
    }
    strong {
      color: rgb(${({ theme }) => theme.secondary_variant});
      cursor: pointer;
    }

    button {
      ${BaseButton}
    }
  }
`;
