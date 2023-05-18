import styled from 'styled-components';
import { StyledCornerButton } from '../defaults';

export const AppInfoContainer = styled.section`
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

  .dialog-box {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    border-radius: 10px;
    background: rgb(${({ theme }) => theme.foreground});
    min-width: 300px;
    max-width: 500px;
    margin: 25px;
    box-shadow: 0 0 25px rgba(${({ theme }) => theme.accent}, 0.1);
    position: relative;

    button {
      ${StyledCornerButton}
      position: absolute;
      top: 15px;
      right: 15px;
    }

    .box-info {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 10px;
      span {
        font-weight: 500;
        color: rgb(${({ theme }) => theme.primary});
      }
      h2 {
        margin: 0 auto;
        margin-top: 20px;
        font-size: 1.2rem;
        font-weight: 600;
        display: flex;
        flex-flow: row nowrap;
        line-height: 1.6rem;
        align-items: center;
        gap: 8px;

        span {
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        svg {
          width: 28px;
          height: 28px;
          color: rgb(${({ theme }) => theme.primary});
        }
      }

      h3 {
        margin: 0 auto;
        margin-top: 12px;
        font-size: 0.92rem;
        font-weight: 500;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 5px;

        span {
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        i {
          color: rgb(${({ theme }) => theme.secondary});
        }

        svg {
          width: 18px;
          height: 18px;
          color: rgb(${({ theme }) => theme.secondary});
        }
      }
    }

    .contacts {
      font-size: 0.92rem;
      .contact {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 8px;

        span {
          white-space: nowrap;
          text-overflow: ellipsis;
          color: rgb(${({ theme }) => theme.font});
          font-weight: 500;
        }

        svg {
          width: 18px;
          height: 18px;
          color: rgb(${({ theme }) => theme.secondary});
        }
      }
    }

    .legal {
      margin: 0 auto;
      font-size: 0.92rem;
      
      h3 {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: center;
        gap: 8px;

        span {
          white-space: nowrap;
          text-overflow: ellipsis;
          color: rgb(${({ theme }) => theme.font});
          font-weight: 500;
        }

        svg {
          width: 18px;
          height: 18px;
          color: rgb(${({ theme }) => theme.secondary});
        }
      }
    }
  }
`;
