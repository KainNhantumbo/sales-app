import styled from 'styled-components';
import { BaseButton, StyledInputs } from '../defaults';

export const HomeContainer = styled.div`
  position: relative;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgb(${({ theme }) => theme.foreground});

  * {
    ::selection {
      background: rgb(${({ theme }) => theme.background_variant});
      color: rgb(${({ theme }) => theme.secondary});
    }
  }

  article {
    width: 100%;
    margin-top: 90px;

    .introduction {
      width: 100%;
      max-width: 1280px;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 20px;
      background: rgb(${({ theme }) => theme.foreground});

      img {
        max-width: 500px;
        max-height: 500px;
      }

      div {
        display: flex;
        flex-direction: column;
        gap: 20px;
        h2 {
          font-size: 2.8rem;
          font-weight: 500;
          line-height: 3.2rem;
        }
        p {
          font-size: 1.4rem;
          line-height: 2rem;
        }

        a {
          ${BaseButton}
          padding: 12px;
        }
      }
    }

    .features {
      width: 100%;
      background: rgb(${({ theme }) => theme.background_variant});

      .wrapper {
        max-width: 1280px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        padding: 20px;
      }

      h2 {
        max-width: 1280px;
        font-size: 1.8rem;
        font-weight: 500;
        line-height: 2.6rem;
        margin-bottom: 10px;
        align-self: flex-start;

        i {
          color: rgb(${({ theme }) => theme.primary});
          display: block;
          padding-left: 30px;
        }
      }

      .cards-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 25px;
        align-items: center;
        justify-items: center;

        div {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 15px;
          width: 250px;
          height: 100%;
          border-radius: 20px;
          padding: 20px;
          background: rgb(${({ theme }) => theme.foreground});

          h3 {
            font-size: 1.4rem;
            line-height: 1.8rem;
            font-weight: 500;
          }

          svg {
            width: 30px;
            height: 30px;
            color: rgb(${({ theme }) => theme.primary});
          }

          p {
            line-height: 1.3rem;
          }
        }
      }
    }
  }
`;
