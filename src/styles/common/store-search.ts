import styled from 'styled-components';
import { BaseButton, _endMarkStyles } from '../defaults';

export const _storeSeach = styled.div`
  position: relative;
  width: 100%;
  min-height: 40vh;
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgb(${({ theme }) => theme.background});

  * {
    ::selection {
      background: rgb(${({ theme }) => theme.background_shade});
      color: rgb(${({ theme }) => theme.primary_shade});
    }
  }

  .main-container {
    padding-top: 90px;
    .fetching-state {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 5000;
      background: rgba(${({ theme }) => theme.foreground}, 0.5);
      backdrop-filter: blur(10px);
      width: 100%;
      height: 100%;
      .center {
        position: relative;
        top: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 30px;
        font-size: 1.2rem;
      }
    }

    .empty-data_container {
      width: 100%;
      background: rgb(${({ theme }) => theme.background});
      display: grid;
      place-content: center;
      user-select: none;
      padding: 80px 0;

      .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        line-height: 1.6rem;
        margin: 0 10px;

        svg {
          width: 70px;
          height: 70px;
          color: rgb(${({ theme }) => theme.primary_shade});
        }

        h3 {
          text-align: center;
          font-size: 1.2rem;
          font-weight: 500;
          margin-top: 20px;
        }
      }
    }
  }

  article {
    width: 100%;
    max-width: 1080px;
    margin: 0 auto;
    padding: 30px 15px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 12px;
    position: relative;

    @media screen and (max-width: 620px) {
      padding: 30px 20px;
    }

    .error-message {
      height: 50vh;
      font-size: 1.6rem;
      text-align: center;
      line-height: 2.2rem;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      gap: 10px;
      svg {
        width: 70px;
        height: 70px;
      }
    }

    .stores-container {
      padding-top: 12px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;

      @media screen and (max-width: 660px) {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 12px;
      }

      .store {
        width: 100%;
        display: flex;
        flex-direction: column;
        border-radius: 10px;
        background: rgb(${({ theme }) => theme.foreground});
        font-size: 0.95rem;
        line-height: 1.2rem;
        border: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
        padding: 20px;
        gap: 12px;

        :hover {
          cursor: pointer;
          box-shadow: 0 0 20px rgba(${({ theme }) => theme.black}, 0.09);
          transition: all 200ms ease-in-out;
        }

        .store-name {
          font-size: 1.2rem;
        }

        .details {
          display: flex;
          justify-content: flex-start;
          gap: 12px;
          font-size: 0.9rem;
          font-weight: 500;
          align-items: center;
          flex-flow: row wrap;

          div {
            display: flex;
            align-items: center;
            gap: 5px;
            text-transform: uppercase;
            position: relative;
            svg {
              position: absolute;
              top: calc(50% - 11px);
              left: 0;
              width: 20px;
              height: 20px;
            }

            span {
              padding-left: 23px;
            }
          }
        }

        h3 {
          font-weight: 500;
          font-size: 1rem;
          line-height: 1.4rem;
          color: rgb(${({ theme }) => theme.primary_shade});
        }

        button {
          border: none;
          background: none;
          border-radius: 10px;
          position: relative;
          padding: 10px 10px 10px 0;
          color: rgb(${({ theme }) => theme.font});
          width: fit-content;
          cursor: pointer;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          :hover {
            color: rgb(${({ theme }) => theme.primary_shade});
          }
          svg {
            width: 20px;
            height: 20px;
            position: absolute;
            top: calc(50% - 10px);
            right: 7px;
            pointer-events: none;
          }
          span {
            padding-right: 20px;
            font-weight: 500;
            pointer-events: none;
          }
        }
      }
    }

    .stats-container {
      width: 100%;
      height: 100%;
      display: grid;
      place-content: center;
      place-items: center;

      .fetch-error-message {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        margin: 20px 0;
        color: rgb(${({ theme }) => theme.error});
        font-weight: 500;
        font-size: 1.1rem;
        line-height: 1.4rem;
        align-self: flex-end;

        button {
          ${BaseButton}
        }
      }
      p {
        margin-top: 10px;
        font-size: 1.2rem;
        font-weight: 500;
        line-height: 1.6rem;
        color: rgb(${({ theme }) => theme.primary_shade});
      }

      .loading {
        width: 100%;
        height: 100%;
        align-self: flex-end;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-weight: 500;
        font-size: 1.1rem;
        gap: 10px;
        padding: 20px;
        margin: 0 auto;
        color: rgb(${({ theme }) => theme.primary_shade});
      }
    }
  }

  .stores-container__end-mark {
    ${_endMarkStyles}
  }

  .load-posts-container {
    margin: 20px auto;

    button {
      ${BaseButton}

      :disabled {
        border: none;
        box-shadow: none;
      }
    }
  }
`;
