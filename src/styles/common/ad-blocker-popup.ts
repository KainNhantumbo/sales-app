import styled from 'styled-components';
import { BaseButton_Alter } from '../defaults';

export const AdBlockerPopupContainer = styled.div`
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

    .cookie-icon {
      position: absolute;
      width: 50px;
      height: 50px;
      left: calc(50% - 25px);
      top: -35px;
      color: rgb(${({ theme }) => theme.secondary});
    }

    strong {
      color: rgb(${({ theme }) => theme.secondary});
      cursor: pointer;
    }

    button {
      ${BaseButton_Alter}
    }
  }
`;
