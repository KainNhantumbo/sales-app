import styled from 'styled-components';
import { BaseButtonOutline } from '../defaults';

export const UserDashboardContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 90vh;
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
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-items: center;
    margin: auto 0;
    font-size: 1.2rem;
    p {
      color: rgb(${({ theme }) => theme.alert});
    }
    button {
      ${BaseButtonOutline}
    }
  }

  article {
    width: 100%;
    margin-top: 90px;


    .actions {
      width: 100%;
      user-select: none;

      .wrapper {
        max-width: 1280px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        padding: 20px;
        border-top: 1px solid rgba(${({ theme }) => theme.font}, .1);
      }

      .cards-container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 25px;
        align-items: center;
        justify-items: center;

        @media screen and (max-width: 850px) {
          grid-template-columns: repeat(2, 1fr);
        }
        @media screen and (max-width: 570px) {
          grid-template-columns: 1fr;
        }

        div {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 15px;
          width: 150px;
          height: 100%;
          border-radius: 20px;
          padding: 20px;
          background: rgb(${({ theme }) => theme.foreground});
          cursor: pointer;

          h3 {
            font-size: 1rem;
            line-height: 1.2rem;
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
