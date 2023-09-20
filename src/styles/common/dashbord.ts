import styled from 'styled-components';
import { BaseButtonOutline } from '../defaults';

export const _dashboard = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 90vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: rgb(${({ theme }) => theme.foreground});

  * {
    ::selection {
      background: rgb(${({ theme }) => theme.background_shade});
      color: rgb(${({ theme }) => theme.primary_shade});
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
      color: rgb(${({ theme }) => theme.error});
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
          border-radius: 8px;
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

    .actions-container {
      width: 100%;
      padding-bottom: 20px;
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

        h2 {
          align-self: start;
          display: flex;
          flex-direction: row;
          gap: 8px;
          font-size: 1.3rem;
          line-height: 1.8rem;
          align-items: center;
          font-weight: 500;
          padding-top: 12px;
          color: rgb(${({ theme }) => theme.font});
        }
      }

      .cards-container {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 25px;

        @media screen and (max-width: 570px) {
          grid-template-columns: 1fr;
        }

        .cards-container_element {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 20px;
          border-radius: 12px;
          padding: 20px;
          background: rgb(${({ theme }) => theme.foreground});
          border: 1px solid rgba(${({ theme }) => theme.font}, 0.08);

          h3 {
            display: flex;
            flex-direction: row;
            gap: 8px;
            align-items: center;
            font-weight: 500;
            color: rgb(${({ theme }) => theme.primary_shade});
            font-size: 1.2rem;
            line-height: 1.6rem;
          }

          .paths-container {
            width: 100%;
            display: flex;
            flex-flow: row wrap;
            gap: 12px;
            align-items: center;

            .action {
              border-radius: 12px;

              a {
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 8px;
                padding: 20px;
                border-radius: 12px;
                background: rgb(${({ theme }) => theme.foreground});
                font-size: 1.1rem;
                line-height: 1.4rem;

                :hover {
                  color: rgb(${({ theme }) => theme.primary_shade});
                }
              }
            }
          }
        }
      }
    }
  }

  .metrics-data {
    width: 100%;
    padding-bottom: 20px;
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
  }

  .app-meta {
    align-self: flex-end;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
    gap: 8px;
    font-size: 0.9rem;
    line-height: 1rem;
    padding-bottom: 10px;
  }
`;
