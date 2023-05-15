import styled from 'styled-components';
import { BaseButton, Button_Mono_B } from '../defaults';

export const HeaderContainer = styled.header`
  width: 100%;
  height: 70px;
  position: fixed;
  top: 0;
  left: 0;
  backdrop-filter: blur(5px);
  background: rgba(${({ theme }) => theme.foreground}, 0.6);
  box-shadow: 0 0 20px rgba(${({ theme }) => theme.primary}, 0.1);
  padding: 20px 8px;
  font-weight: 500;
  font-size: 1.1rem;
  z-index: 10000;

  .logo {
    position: absolute;
    top: calc(50% - 12px);
    left: 30px;
    cursor: pointer;

    @media screen and (max-width: 600px) {
      left: 30px;
    }

    span {
      font-size: 1.4rem;
      font-weight: 500;
      color: rgb(${({ theme }) => theme.font});
      font-family: 'Roboto Slab', 'Roboto';
      i {
        color: rgb(${({ theme }) => theme.secondary});
      }
    }

    .theme-switcher-btn {
      ${Button_Mono_B}
      padding: 1px;
      border: 2px solid rgb(${({ theme }) => theme.secondary});
      border-radius: 50%;
      position: absolute;
      top: calc(50% - 14px);
      right: -35px;
      cursor: pointer;
      z-index: 2000;
    }
  }

  nav {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    position: relative;
    left: 220px;

    section {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      font-size: 0.96rem;

      @media screen and (max-width: 600px) {
        gap: 10px;
      }

      span {
        padding: 5px;
        :hover {
          cursor: pointer;
          color: rgb(${({ theme }) => theme.primary_variant});
        }
      }
    }

    @media screen and (max-width: 770px) {
      position: absolute;
      top: 20px;
      left: 0;
      height: auto;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      margin-top: 50px;
      background: rgba(${({ theme }) => theme.foreground}, 0.95);
      border-bottom: 5px solid rgba(${({ theme }) => theme.secondary}, 0.6);
      backdrop-filter: blur(30px);
      padding: 20px;

      section {
        width: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: start;
        flex-direction: column;
        gap: 18px;
        margin-left: 20px;

        span {
          padding: 5px;
          width: max-content;
          border-radius: 3px;

          :hover {
            cursor: pointer;
            background-color: rgb(${({ theme }) => theme.secondary});
            color: #fff;
          }
        }
        button {
          ${BaseButton}
          background: rgb(${({ theme }) => theme.primary});
        }
      }
    }
  }

  .toggle-btn {
    ${Button_Mono_B}
    border-radius: 3px;
    position: fixed;
    top: 18px;
    right: 20px;
    @media screen and (min-width: 770px) {
      display: none;
    }
  }
`;
