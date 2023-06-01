import styled from 'styled-components';
import { BaseButton } from '../defaults';

export const HomeContainer = styled.div`
  position: relative;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgb(${({ theme }) => theme.foreground});

  * {
    ::selection {
      background: rgba(${({ theme }) => theme.font}, 0.1);
      color: rgb(${({ theme }) => theme.primary_variant});
    }
  }

  .banner-container {
    width: 100%;
    background: rgba(${({ theme }) => theme.foreground}, 0.8);
    backdrop-filter: blur(10px);
    padding: 0 20px;
    padding-top: 100px;
    padding-bottom: 40px;

    .wrapper {
      width: 100%;
      max-width: 1080px;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 50px;
      justify-content: center;
      margin: 0 auto;
    }

    .banner-title {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: 0 auto;
      position: relative;
      gap: 10px;
      h1 {
        font-size: 2.8rem;
        font-weight: 500;
        line-height: 3.2rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
      }
      h3 {
        font-size: 1.4rem;
        line-height: 2rem;
      }

      ::before {
        content: '';
        position: absolute;
        width: 1px;
        height: 1px;
        left: 40px;
        top: 60px;
        border-radius: 50%;
        z-index: -999;
        transform: rotate(180);
        backdrop-filter: blur(10px);
        box-shadow: 0 0 100px 60px rgba(${({ theme }) => theme.primary}, 0.8);
      }

      @media screen and (max-width: 900px) {
        h1 {
          font-size: 1.8rem;
          font-weight: 500;
          line-height: 2.2rem;
        }
      }

      @media screen and (max-width: 420px) {
        h1, h3 {
          line-height: 1.6rem;
          font-size: 1.3rem;
          svg {
            display: none;
          }
        }
      }
    }

    img {
      width: 100%;
      height: 100%;
      max-width: 200px;
      max-height: 300px;
      object-fit: cover;

      @media screen and (max-width: 650px) {
        display: none;
      }
    }
  }

  article {
  }
`;
