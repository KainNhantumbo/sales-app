import styled from 'styled-components';
import { BaseButton } from '../defaults';

export const CookiesPopupContainer = styled.div`
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  box-shadow: 0 0 20px rgba(${({ theme }) => theme.primary}, 0.1);
  z-index: 3000;

  div {
    background: rgb(${({ theme }) => theme.foreground});
    border-radius: 5px 5px 0 0;
    padding: 12px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    line-height: 1.4rem;
    font-size: 0.9rem;
    
    @media screen and (max-width: 435px ) {
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
