import styled from 'styled-components';
import { BaseButton, BaseButtonOutline, Button_Mono_B } from '../defaults';

export const HeaderContainer = styled.header`
  width: 100%;
  height: 70px;
  position: fixed;
  top: 0;
  left: 0;
  backdrop-filter: blur(5px);
  background: rgba(${({ theme }) => theme.foreground}, 0.6);
  padding: 20px 8px;
  font-weight: 500;
  font-size: 1.1rem;
  z-index: 10000;

  .wrapper {
    margin: 0 auto;
    @media screen and (min-width: 1200px) {
      max-width: 1200px;
      left: calc(50% - 600px);

      .logo {
        left: calc(50% - 600px);
      }
    }
  }

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
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    position: relative;
    top: -4px;
    left: 180px;
    gap: 20px;

    .active {
      color:  rgb(${({ theme }) => theme.primary_variant});
    }

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

    @media screen and (max-width: 990px) {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      position: relative;
      left: 180px;
      width: 100%;
      gap: 20px;

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
      border-bottom: 5px solid rgba(${({ theme }) => theme.primary}, 0.6);
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
            background-color: rgb(${({ theme }) => theme.primary_variant});
            color: rgb(${({ theme }) => theme.neutral});
          }
        }
        button {
          ${BaseButton}
          background: rgb(${({ theme }) => theme.primary});
        }
      }
    }
  }

  .auth-btns {
    display: flex;
    flex-direction: row;
    gap: 10px;
    font-size: 0.9rem;
    justify-self: flex-end;
    position: relative;
    left: -190px;

    .login-btn {
      ${BaseButtonOutline}
      border: none;
    }

    .sign-in-btn {
      ${BaseButton}
    }

    .user-account, .user-logout{
      ${BaseButtonOutline}
      border: none;
    }

    @media screen and (max-width: 770px) {
      left: 0;
    }
  }

  .toggle-btn {
    ${Button_Mono_B}
    position: fixed;
    top: 18px;
    right: 20px;
    @media screen and (min-width: 770px) {
      display: none;
    }
  }
`;
