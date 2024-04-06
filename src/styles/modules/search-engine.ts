import {
  BaseButton,
  BaseButtonOutline,
  ButtonMonoOutline,
  StyledInputs
} from '../defaults';
import styled from 'styled-components';

export const _searchEngine = styled.aside`
  width: 100%;
  max-width: 300px;
  position: relative;

  @media screen and (max-width: 830px) {
    z-index: 12000;
    position: fixed;
    width: 100vw;
    max-width: 100%;
    height: 100vh;
    background: rgba(${({ theme }) => theme.background}, 0.2);
    backdrop-filter: blur(2px);
    top: 0;
    left: 0;
    display: grid;
    place-content: center;
    user-select: none;
  }

  .wrapper-container {
    position: sticky;
    top: 60px;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 25px;
    background: rgb(${({ theme }) => theme.foreground});
    padding: 10px 20px;
    border-radius: 12px;

    @media screen and (max-width: 830px) {
      position: relative;
      width: 400px;
      box-shadow: 0 0 25px rgba(${({ theme }) => theme.black}, 0.08);
      border-radius: 12px;
      margin-bottom: -30px;
      padding-bottom: 40px;

      @media screen and (max-width: 430px) {
        width: 300px;
      }
    }

    * {
      ::selection {
        background: rgb(${({ theme }) => theme.background_shade});
        color: rgb(${({ theme }) => theme.primary_shade});
      }
    }

    .onDragCloseButton {
      width: 120px;
      height: 6px;
      background: rgb(${({ theme }) => theme.primary});
      position: absolute;
      top: 10px;
      left: calc(50% - 60px);
      z-index: 2200;
      border-radius: 10px;
      border: none;
      cursor: grab;

      @media screen and (min-width: 830px) {
        display: none;
      }
    }

    .show-results-btn {
      ${BaseButton}
      background: rgb(${({ theme }) => theme.black});
      color: rgb(${({ theme }) => theme.white});
      width: 100%;

      border-radius: 30px;
      margin-bottom: 30px;
      padding: 10px 0;

      :hover {
        background: rgb(${({ theme }) => theme.secondary});
      }

      @media screen and (min-width: 830px) {
        display: none;
      }
    }

    .header-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      margin-top: 12px;

      h3 {
        display: flex;
        flex-direction: row;
        gap: 5px;
        flex-wrap: nowrap;
        align-items: center;
        color: rgb(${({ theme }) => theme.primary_shade});
        span {
          padding-left: 3px;
          font-size: 1.1rem;
          font-weight: 500;
          line-height: 1.6rem;
        }
      }

      button {
        ${BaseButtonOutline}
        color: rgb(${({ theme }) => theme.secondary});
      }
    }

    .form-container {
      width: 100%;
      display: flex;
      flex-direction: row;

      form {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 10px;
        .form-element {
          position: relative;
          width: 100%;
          ${StyledInputs}

          svg {
            position: absolute;
            top: calc(50% - 10px);
            left: 10px;
            width: 20px;
            height: 20px;
            color: rgba(${({ theme }) => theme.font}, 0.5);
          }
        }

        button {
          ${ButtonMonoOutline}
          width: 41px;
          height: 41px;
          border: 1px solid rgba(${({ theme }) => theme.font}, 0.2);
        }
      }
    }

    .caret-container {
      display: flex;
      flex-direction: column;
      gap: 12px;

      h3 {
        display: flex;
        flex-direction: row;
        gap: 5px;
        flex-wrap: nowrap;
        align-items: center;

        span {
          padding-left: 3px;
        }
      }
    }
  }
`;
