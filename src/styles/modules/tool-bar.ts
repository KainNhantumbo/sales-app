import styled from 'styled-components';
import { BaseButtonOutline, Button_Mono_B } from '../defaults';

export const _toolbar = styled.section`
  position: fixed;
  left: 0;
  top: 70px;
  padding: 5px 10px;
  width: 100%;
  height: 35px;
  backdrop-filter: blur(5px);
  background: rgba(${({ theme }) => theme.foreground}, 0.6);
  border-top: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
  border-bottom: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
  z-index: 5000;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  gap: 5px;

  @media screen and (max-width: 350px) {
    justify-content: center;
  }

  .left-container,
  .right-container {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    gap: 16px;
    @media screen and (max-width: 420px) {
      gap: 10px;
      font-size: 0.9rem;
    }
  }

  @media screen and (max-width: 380px) {
    .right-container {
      display: none;
    }
  }

  .mono {
    ${Button_Mono_B}
    padding: 0;
    border: none;

    svg {
      width: 28px;
      height: 28px;
    }
  }

  .descripted {
    ${BaseButtonOutline}
    padding: 3px;
    border: none;
    border-radius: 0px;

    span {
      padding: 0;
      padding-left: 20px;
      @media screen and (max-width: 350px) {
        padding: 0;
        color: rgb(${({ theme }) => theme.primary_variant});
      }
    }

    svg {
      width: 18px;
      height: 18px;
      left: 0;
      top: calc(50% - 9px);
      color: rgb(${({ theme }) => theme.primary_variant});

      @media screen and (max-width: 350px) {
        top: calc(50% - 9px);
        display: none;
      }
    }
  }
`;
