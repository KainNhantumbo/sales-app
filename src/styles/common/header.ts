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
      sup {
        position: relative;
        top: -10px;
        font-size: 0.8rem;
        color: rgb(${({ theme }) => theme.primary_variant});
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
      color: rgb(${({ theme }) => theme.primary_variant});
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
          padding: 5px 8px;
          width: max-content;
          border-radius: 20px;

          :hover {
            cursor: pointer;
            background-color: rgb(${({ theme }) => theme.primary_variant});
            color: rgb(${({ theme }) => theme.neutral});
            transition: all 200ms ease-in-out;
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

    .user-account,
    .user-logout {
      ${BaseButtonOutline}
      border: none;
      img {
        object-fit: cover;
        border-radius: 50%;
        width: 28px;
        height: 28px;
        position: absolute;
        top: calc(50% - 14px);
        right: -6px;
        pointer-events: none;
      }
    }

    .user-account {
      overflow: visible;
      span {
        padding-left: 0;
        padding-right: 20px;
      }

      svg {
        position: absolute;
        top: calc(50% - 11px);
        right: 0;
        margin-left: 50px;
        width: 22px;
        height: 22px;
      }
    }

    @media screen and (max-width: 770px) {
      left: 0;
    }
  }

  .toggle-btn {
    border: none;
    border-radius: 8px;
    background: none;
    color: rgb(${({ theme }) => theme.font});
    border: 1px solid rgba(${({ theme }) => theme.accent}, 0.07);
    position: relative;
    width: fit-content;
    cursor: pointer;
    display: grid;
    place-content: center;
    padding: 10px;
    outline: none;

    :hover {
      color: rgb(${({ theme }) => theme.primary_variant});
    }

    svg {
      pointer-events: none;
      width: 20px;
      height: 20px;
    }
    position: fixed;
    top: 13px;
    right: 20px;

    @media screen and (min-width: 770px) {
      display: none;
    }
  }
`;
