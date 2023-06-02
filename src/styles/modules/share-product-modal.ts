import styled from 'styled-components';
import { BaseButton, BaseButtonOutline, StyledCornerButton } from '../defaults';

export const ShareProductContainer = styled.section`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(${({ theme }) => theme.background}, 0.2);
  backdrop-filter: blur(2px);
  z-index: 11000;
  top: 0;
  left: 0;
  display: grid;
  place-content: center;
  user-select: none;
  position: fixed;
  line-height: 1.4rem;

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    place-items: center;
    .quit {
      ${StyledCornerButton}
    }

    h2 {
      font-weight: 500;
      font-size: 1rem;
      display: flex;
      align-items: center;
      gap: 5px;
      color: rgb(${({ theme }) => theme.primary_variant});
    }
  }

  .dialog-prompt {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    border-radius: 10px;
    width: 100%;
    max-width: 500px;
    margin: 5px;
    background: rgb(${({ theme }) => theme.foreground});
    box-shadow: 0 0 25px rgba(${({ theme }) => theme.accent}, 0.1);
    

    .prompt-info {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 10px;

      a {
        width: 100%;
        position: relative;
        border: 1px solid rgba(${({ theme }) => theme.font}, 0.1);
        background: none;
        border-radius: 8px;
        position: relative;
        padding: 1px 5px;
        font-size: 0.9rem;
        cursor: pointer;

        :hover {
          background: rgba(${({ theme }) => theme.accent}, 0.9);
          border: 1px solid transparent;
          color: rgb(${({ theme }) => theme.neutral});
        }

        svg {
          position: absolute;
          left: 5px;
          top: calc(50% - 8px);
          width: 18px;
          height: 18px;
        }
        span {
          font-weight: 500;
          line-height: 1.8rem;
          padding-left: 25px;
        }
      }
    }

    .prompt-actions {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      gap: 10px;
      .prompt-cancel {
        ${BaseButtonOutline}
        border: none;
      }
      .prompt-accept {
        ${BaseButton}
        background: rgb(${({ theme }) => theme.alert});
        color: rgb(${({ theme }) => theme.neutral});
      }
    }
  }
`;
