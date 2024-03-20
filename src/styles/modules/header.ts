import styled from 'styled-components';
import { BaseButton, BaseButtonOutline } from '../defaults';

export const _header = styled.header`
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  backdrop-filter: blur(5px);
  background: rgba(${({ theme }) => theme.foreground}, 0.8);
  padding: 10px 8px;
  font-weight: 500;
  font-size: 0.98rem;
  z-index: 20000;

  .wrapper {
    margin: 0 auto;
    @media screen and (min-width: 1250px) {
      max-width: 1200px;
      left: calc(50% - 600px);

      .logo {
        left: calc(50% - 600px);
      }
    }
  }

  .logo {
    position: absolute;
    top: calc(50% - 14px);
    left: 30px;
    cursor: pointer;
    margin-right: 40px;

    a {
      position: relative;
    }

    img {
      width: 100%;
      max-width: 120px;
      height: 100%;
      object-fit: cover;
    }

    @media screen and (max-width: 600px) {
      left: 30px;
    }
  }

  nav {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    top: 65px;
    left: 180px;
    gap: 20px;

    .active {
      color: rgb(${({ theme }) => theme.primary_shade});
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
          color: rgb(${({ theme }) => theme.primary_shade});
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
            color: rgb(${({ theme }) => theme.primary_shade});
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
        justify-content: space-between;
        flex-direction: column;
        gap: 18px;
        margin-left: 20px;

        span {
          padding: 5px 8px;
          width: max-content;
          border-radius: 20px;

          :hover {
            cursor: pointer;
            background-color: rgb(${({ theme }) => theme.primary_shade});
            color: rgb(${({ theme }) => theme.white});
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

  .left-corner-container {
    display: flex;
    flex-direction: row;
    gap: 10px;
    font-size: 0.9rem;
    justify-self: flex-end;
    position: relative;
    left: -190px;

    .cart-button {
      position: relative;
      border: none;
      background: none;
      color: rgb(${({ theme }) => theme.font});
      width: fit-content;
      cursor: pointer;
      display: grid;
      place-content: center;
      padding: 8px;

      span {
        width: 18px;
        height: 18px;
        position: absolute;
        right: -5px;
        bottom: -2px;
        border-radius: 50%;
        background: rgb(${({ theme }) => theme.primary_shade});
        color: rgb(${({ theme }) => theme.white});
        display: grid;
        font-size: 0.98rem;
        place-content: center;
      }
      :hover {
        color: rgb(${({ theme }) => theme.primary_shade});
      }

      svg {
        pointer-events: none;
        width: 24px;
        height: 24px;
      }
    }

    .login-btn {
      ${BaseButtonOutline}
      border: none;

      span {
        position: relative;
        top: calc(50% - 7px);
      }
    }

    .sign-in-btn {
      ${BaseButton}

      span {
        position: relative;
        top: calc(50% - 7px);
      }
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
    position: fixed;
    top: 6px;
    right: 20px;
    border: none;
    border-radius: 12px;
    background: none;
    color: rgb(${({ theme }) => theme.font});
    width: fit-content;
    cursor: pointer;
    display: grid;
    place-content: center;
    padding: 8px;

    :hover {
      color: rgb(${({ theme }) => theme.primary_shade});
    }

    svg {
      pointer-events: none;
      width: 20px;
      height: 20px;
    }

    @media screen and (min-width: 770px) {
      display: none;
    }
  }
`;
