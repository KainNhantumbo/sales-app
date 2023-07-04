import styled from 'styled-components';
import { BaseButton } from '../defaults';

export const ResetPassordConfirmation = styled.div`
  position: relative;
  padding: 60px 0;
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgb(${({ theme }) => theme.foreground});

  * {
    ::selection {
      background: rgb(${({ theme }) => theme.background_variant});
      color: rgb(${({ theme }) => theme.primary_variant});
    }
  }

  main {
    display: flex;
    flex-direction: column;
    gap: 50px;
    align-items: center;
  }

  article {
    z-index: 100;
    width: 100%;
    display: grid;
    place-content: center;
    place-items: center;
    padding: 5px;

    section {
      width: 100%;
      height: auto;
      max-width: 430px;
      display: flex;
      gap: 35px;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border-radius: 20px;
      padding: 50px 25px;
      margin: 25px;
      background: rgb(${({ theme }) => theme.foreground});

      @media screen and (min-width: 440px) {
        min-width: 400px;
      }

      h2 {
        text-align: center;
        font-weight: 500;
        line-height: 1.8rem;
        font-size: 1.4rem;
      }

      p {
        font-size: 0.92rem;
        font-weight: 500;
        line-height: 1.4rem;
        text-align: center;
      }

      div {
        width: 120px;
        height: 120px;
        display: grid;
        place-items: center;
        place-content: center;
        border-radius: 10px;
        background: rgba(${({ theme }) => theme.primary}, .2);

        svg {
          width: 60px;
          height: 60px;
          color: rgb(${({ theme }) => theme.primary_variant});
        }

      }

      .a-open-mail {
       ${BaseButton}
      }

      .a-back {
        color: rgb(${({ theme }) => theme.primary_variant});
          cursor: pointer;
          :hover {
            color: rgb(${({ theme }) => theme.accent});
          }

          span {
            pointer-events: none;
          }
      }
    }
  }
`;
