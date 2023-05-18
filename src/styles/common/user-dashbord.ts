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

    .header {
      max-width: 1280px;
      padding: 0 20px;
      margin: 0 auto;
      width: 100%;
      background: rgba(${({ theme }) => theme.foreground}, 0.8);
      backdrop-filter: blur(5px);
      z-index: 5000;
      display: flex;
      justify-content: space-between;
      flex-flow: row nowrap;
      align-items: center;

      h2 {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        gap: 10px;
        align-items: center;

        svg {
          width: 20px;
          height: 20px;
        }

        @media screen and (max-width: 460px) {
          margin-bottom: 20px;
        }
      }

      .user-container {
        width: fit-content;
        position: relative;
        padding: 10px;
        line-height: 1.2rem;
        cursor: pointer;
        border-radius: 5px;
        gap: 5px;

        @media screen and (max-width: 460px) {
          display: none;
        }

        .status-container {
          padding-left: 50px;
          h3 {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            font-weight: 500;
            margin-bottom: 5px;
            margin-right: 20px;
          }
          p {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            font-size: 0.9rem;
            color: rgb(${({ theme }) => theme.secondary});
          }
        }

        .avatar-container {
          overflow: hidden;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          position: absolute;
          top: calc(50% - 20px);
          display: grid;
          place-content: center;
          place-items: center;

          svg {
            width: inherit;
            height: inherit;
          }
          img {
            width: inherit;
            height: inherit;
            object-fit: cover;
          }
        }
      }
    }

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
        border-top: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
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
          }

          svg {
            width: 30px;
            height: 30px;
            color: rgb(${({ theme }) => theme.primary});
          }
        }
      }
    }
  }
`;
