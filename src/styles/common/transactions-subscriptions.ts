import styled from 'styled-components';
import { BaseButton, statsContainerStyles } from '../defaults';

export const _subsTransactions = styled.div`
  position: relative;
  width: 100%;
  min-height: 90vh;
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgb(${({ theme }) => theme.background});

  * {
    ::selection {
      background: rgba(${({ theme }) => theme.font}, 0.2);
      color: rgb(${({ theme }) => theme.primary_shade});
    }
  }

  .stats-container {
    ${statsContainerStyles}
  }

  .wrapper-container {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    gap: 5px;
    max-width: 1280px;
    align-self: center;
    margin: 0 auto;
    padding: 90px 20px;
    gap: 20px;
    position: relative;

    @media screen and (max-width: 755px) {
      flex-direction: column-reverse;
      align-items: center;
    }

    @media screen and (max-width: 445px) {
      padding: 80px 0;
      gap: 0;
    }
  }

  article {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
    border-radius: 20px;
    background: rgb(${({ theme }) => theme.foreground});

    @media screen and (max-width: 445px) {
      border: none;
      border-radius: 0;
      padding-bottom: 40px;
    }

    .header-container {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 20px;
      border-bottom: 1px solid rgba(${({ theme }) => theme.font}, 0.08);

      h2 {
        display: flex;
        font-size: 1.2rem;
        font-weight: 500;
        align-items: center;
        width: 100%;
        gap: 8px;
        padding: 10px 0;
        text-transform: capitalize;
        line-height: 1.6rem;

        svg {
          width: 25px;
          height: 25px;
          color: rgb(${({ theme }) => theme.primary});
        }
      }

      p {
        line-height: 1.6rem;
      }
    }

    .content-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 25px 18px;
      gap: 10px;

      .content-header-container {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        gap: 5px;
        align-items: center;

        h3 {
          font-size: 1.6rem;
          line-height: 1.4rem;
          font-weight: 600;
          color: rgb(${({ theme }) => theme.primary_shade});
        }

        .timestamps {
          display: flex;
          flex-direction: column;
          gap: 5px;
          font-size: 0.96rem;
          font-weight: 500;
        }
      }

      .content-details-container {
        display: flex;
        flex-direction: column;
        gap: 12px;

        h3 {
          font-weight: 500;
          font-size: 1.1rem;
          line-height: 1.6rem;
        }

        div {
          display: flex;
          flex-direction: column;
          gap: 5px;
          p {
            line-height: 1.6rem;
          }
        }
      }

      .content-actions-container {
        button {
          ${BaseButton}
        }
      }

      .trial-card-container {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 12px 8px;
        margin-top: 12px;
        border: 2px solid rgba(${({ theme }) => theme.primary}, 0.8);
        border-radius: 12px;
        border-style: dashed;

        h3 {
          font-weight: 600;
          font-size: 1.1rem;
          line-height: 1.6rem;
          color: rgb(${({ theme }) => theme.primary_shade});
        }

        button {
          ${BaseButton}
        }
      }
    }
  }
`;
