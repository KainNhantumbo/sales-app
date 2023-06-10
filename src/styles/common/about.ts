import styled from 'styled-components';
import { BaseButton } from '../defaults';

export const AboutContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 90vh;
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  background: rgb(${({ theme }) => theme.foreground});

  * {
    ::selection {
      background: rgba(${({ theme }) => theme.font}, 0.1);
      color: rgb(${({ theme }) => theme.primary_variant});
    }
  }

  a {
    color: rgb(${({ theme }) => theme.secondary_variant});
    font-weight: 500;
  }

  article {
    padding: 30px 40px;
    margin: 0 auto;
    width: 100%;
    max-width: 1280px;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    gap: 30px;

    @media screen and (max-width: 450px) {
      padding: 20px 10px;
    }

    .mozambique-colors {
      width: 100%;
      height: 20px;
      background: #010005;
      position: relative;
      margin-top: 50px;

      ::before {
        content: '';
        width: 100%;
        height: 20px;
        background: #77c64e;
        position: absolute;
        top: -30px;
        left: 0;
        border-radius: 5px 5px 0 0;
        border-bottom: 10px solid #fff;
      }
      ::after {
        content: '';
        width: 100%;
        height: 20px;
        background: #fed024;
        position: absolute;
        bottom: -30px;
        left: 0;
        border-radius: 0 0 5px 5px;
        border-top: 10px solid #fff;
      }
    }

    .introdution {
      margin-top: 20px;
      text-align: justify;

      p {
        margin-bottom: 15px;
      }
    }

    h1 {
      line-height: 3.2rem;
      font-size: 2.8rem;
      font-weight: 500;
      max-width: 800px;

      @media screen and (max-width: 450px) {
        font-size: 1.8rem;
        line-height: 2.2rem;
      }
    }

    h2 {
      font-weight: 500;
      font-size: 1.8rem;
      line-height: 2rem;

      @media screen and (max-width: 450px) {
        font-size: 1.2rem;
        line-height: 1.6rem;
      }
    }

    p {
      line-height: 1.8rem;
      font-size: 1.1rem;
    }

    blockquote {
      width: 100%;
      max-width: 900px;
      margin: 0 auto;
      p {
        text-align: center;
        font-style: italic;
        font-weight: 500;
        font-size: 1.4rem;
        line-height: 2rem;
      }
    }

    .mission-container {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      gap: 40px;
      margin: 0 auto;
      padding: 40px 0;

      @media screen and (max-width: 850px) {
        flex-direction: column;
      }

      .motto {
        max-width: 680px;
        p {
          margin-bottom: 15px;
        }
        h3 {
          font-size: 1.2rem;
          font-weight: 500;
          line-height: 1.6rem;
          margin-bottom: 10px;
          span {
            text-decoration-line: underline;
            text-decoration-color: rgb(${({ theme }) => theme.primary});
            text-underline-offset: 8px;
          }
        }
      }

      .corner-motto {
        padding: 40px;
        font-size: 2.8rem;
        line-height: 4rem;
        font-weight: 600;
        min-width: 435px;

        i {
          color: rgb(${({ theme }) => theme.primary_variant});
        }

        @media screen and (max-width: 400px) {
          min-width: fit-content;
          width: 100%;
          font-weight: 500;
          font-size: 1.8rem;
          line-height: 2rem;
        }
      }
    }

    .core-habits-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 40px 0;
      border-radius: 20px;

      @media screen and (max-width: 450px) {
        padding: 20px 10px;
      }

      h3 {
        font-size: 1.2rem;
        font-weight: 500;
        line-height: 1.6rem;
        margin-bottom: 10px;
        span {
          text-decoration-line: underline;
          text-decoration-color: rgb(${({ theme }) => theme.primary});
          text-underline-offset: 8px;
        }
      }

      .core-habits-container_items {
        display: flex;
        gap: 25px;
        flex-flow: row wrap;
        align-items: center;
        justify-content: center;
      }

      .core-habit {
        display: flex;
        flex-direction: column;
        gap: 24px;
        padding: 50px 30px;
        border-radius: 20px;
        width: fit-content;
        background: rgb(${({ theme }) => theme.background});
        box-shadow: 0 0 30px 10px rgba(${({ theme }) => theme.accent}, 0.1);
        border-right: 4px solid transparent;
        cursor: grab;
        h3 {
          font-size: 1.8rem;
          font-weight: 500;
        }

        p {
          font-weight: 500;
          font-size: 1.6rem;
          line-height: 2.4rem;
          width: fit-content;
        }

        span {
          line-height: 1.4rem;
        }

        :nth-child(n + 1) {
          border-right: 4px solid rgb(${({ theme }) => theme.primary});
          max-width: 300px;
          strong {
            color: rgb(${({ theme }) => theme.font});
          }
        }
        :nth-child(2n + 2) {
          border-right: 4px solid rgb(${({ theme }) => theme.secondary_variant});
          strong {
            color: rgb(${({ theme }) => theme.secondary_variant});
          }
        }
        :nth-child(3n + 1) {
          border-right: 4px solid rgb(${({ theme }) => theme.secondary});
          strong {
            color: rgb(${({ theme }) => theme.secondary});
          }
        }
      }
    }

    .our-motto-container {
      margin: 0 auto;
      padding: 40px 0;
      display: flex;
      flex-direction: column;
      gap: 10px;

      h3 {
        font-size: 1.2rem;
        font-weight: 500;
        line-height: 1.6rem;
        margin-bottom: 10px;
        span {
          text-decoration-line: underline;
          text-decoration-color: rgb(${({ theme }) => theme.primary});
          text-underline-offset: 8px;
        }
      }

      a {
        ${BaseButton}
        padding: 12px;
        margin: 20px 0;
      }
    }
  }
`;
