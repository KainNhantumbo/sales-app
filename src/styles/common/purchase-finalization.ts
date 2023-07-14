import styled from 'styled-components';
import { BaseButton, BaseButtonOutline } from '../defaults';

export const PurchaseFinalizationContainer = styled.div`
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

  .fetching-state {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 12000;
    background: rgba(${({ theme }) => theme.foreground}, 0.8);
    backdrop-filter: blur(20px);
    width: 100%;
    height: 100%;
    display: grid;
    place-content: center center;
    place-items: center center;

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 30px;
      font-size: 1.2rem;
      padding: 60px 30px;
      width: fit-content;
      margin: 0 auto;
    }
    p,
    h3 {
      font-size: 1.4rem;
      line-height: 2rem;
      font-weight: 500;
      text-align: center;
    }
    button {
      ${BaseButtonOutline}
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
      gap: 18px;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border-radius: 20px;
      padding: 30px 25px;
      margin: 25px;
      background: rgb(${({ theme }) => theme.foreground});

      @media screen and (min-width: 440px) {
        min-width: 400px;
      }

      .title {
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

      .order-summary {
        display: flex;
        text-align: start;
        justify-content: start;
        flex-direction: column;
        border-radius: 12px;
        background: rgba(${({ theme }) => theme.primary}, 0.2);

        i {
          text-transform: uppercase;
        }

        h2 {
          text-align: center;
          font-weight: 500;
          line-height: 1.8rem;
          font-size: 1.4rem;
        }

        p {
          text-align: start;
          font-size: 1rem;
        }
        svg {
          width: 60px;
          height: 60px;
          color: rgb(${({ theme }) => theme.primary_variant});
        }
      }

      .icon {
        width: 120px;
        height: 120px;
        display: grid;
        place-items: center;
        place-content: center;
        border-radius: 10px;
        background: rgba(${({ theme }) => theme.primary}, 0.2);

        svg {
          width: 60px;
          height: 60px;
          color: rgb(${({ theme }) => theme.primary_variant});
        }
      }

      .a-open-mail {
        ${BaseButton}
        span {
          padding-left: 25px;
        }
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
