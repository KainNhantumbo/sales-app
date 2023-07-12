import styled from 'styled-components';
import { BaseButton } from '../defaults';

export const PricingContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: rgb(${({ theme }) => theme.background});

  * {
    ::selection {
      background: rgb(${({ theme }) => theme.background_variant});
      color: rgb(${({ theme }) => theme.primary_variant});
    }
  }

  article {
    width: 100%;
    margin-top: 110px;

    .introdution-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;

      h1 {
        font-weight: 500;
      }
      p {
        line-height: 1.6rem;
        max-width: max(700px);
        font-size: 1.1rem;
        font-weight: 500;
      }
    }

    .pricing {
      width: 100%;
      background: rgb(${({ theme }) => theme.background});

      .wrapper {
        max-width: 1280px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        padding: 30px 20px;
      }

      .plans-container {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        gap: 25px;
        margin-top: 20px;
        user-select: none;

        div {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 15px;
          width: 280px;
          height: 100%;
          border-radius: 10px;
          padding: 20px;
          background: rgb(${({ theme }) => theme.foreground});
          border: 1px solid rgba(${({ theme }) => theme.font}, 0.1);

          h3 {
            font-size: 1.4rem;
            line-height: 1.8rem;
            font-weight: 500;
          }

          h4 {
            font-weight: 500;
            color: rgb(${({ theme }) => theme.primary});
          }

          h5 {
            font-size: 1.8rem;
            line-height: 2rem;
            color: rgb(${({ theme }) => theme.primary_variant});
          }

          ul {
            li {
              font-size: 0.96rem;
              line-height: 1.4rem;
              margin-bottom: 5px;
            }
          }

          a {
            ${BaseButton}
            padding: 12px;
            align-self: center;
          }
        }
      }
    }

    .body-container {
      font-size: 1rem;
      line-height: 1.6rem;
      text-align: justify;
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      gap: 10px;
      width: 100%;
      max-width: 1080px;
      padding: 30px 0;
      margin: 0 auto;

      border-top: 3px solid rgb(${({ theme }) => theme.primary});
      border-style: dashed;

      h2 {
        font-weight: 500;
        line-height: 2rem;
        margin-top: 5px;
        font-size: 1.4rem;
      }

      h3 {
        font-weight: 500;
        font-size: 1.2rem;
        padding-top: 10px;
      }

      div {
        padding-top: 12px;
        border-top: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
      }
    }
  }
`;
