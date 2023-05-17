import styled from 'styled-components';
import { StyledCornerButton } from '../defaults';

export const PushNotificationContainer = styled.section`
  position: fixed;
  z-index: 10000;
  display: flex;
  justify-content: flex-end;
  top: 7vh;
  right: 0;
  position: fixed;

  .dialog-prompt {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    border-radius: 8px;
    background: rgb(${({ theme }) => theme.foreground});
    max-width: 500px;
    margin: 20px;
    box-shadow: 0 0 25px rgba(${({ theme }) => theme.accent}, 0.15);
    position: relative;

    @media screen and (max-width: 430px) {
      gap: 5px;
    }

    .box-btn_close {
      ${StyledCornerButton}
      position: absolute;
      top: 15px;
      right: 15px;
    }

    .prompt-info {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 10px;

      .prompt-title {
        font-weight: 500;
        line-height: 1.6rem;
        font-size: 0.8rem;
        text-transform: uppercase;
        color: rgb(${({ theme }) => theme.primary});
      }
      .prompt-message {
        line-height: 1.4rem;
        font-size: 0.92rem;
      }
    }
  }
`;
