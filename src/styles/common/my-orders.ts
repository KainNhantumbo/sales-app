import {
  BaseButtonOutline,
  StyledInputs,
  _endMarkStyles,
  statsContainerStyles,
} from '../defaults';
import styled from 'styled-components';

export const _myOrders = styled.div`
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

    .main-container {
      display: flex;
      flex-direction: column;
      padding: 25px 10px;
      gap: 10px;

      .order-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 20px;
        background: rgb(${({ theme }) => theme.foreground});
        border-radius: 12px;
        border: 1px solid rgba(${({ theme }) => theme.font}, 0.08);

        .top-container {
          display: flex;
          flex-direction: column;
          gap: 15px;
          border-bottom: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
          padding-bottom: 15px;

          .header {
            display: flex;
            flex-flow: row wrap;
            gap: 10px;
            align-items: center;
            h2 {
              font-weight: 500;
              line-height: 2rem;
              font-size: 1.6rem;
            }

            h3 {
              text-transform: uppercase;
            }

            .invalidated {
              padding: 5px 8px;
              border-radius: 12px;
              color: rgb(${({ theme }) => theme.white});
              background: rgb(${({ theme }) => theme.black});
            }
            .validated {
              padding: 5px 8px;
              border-radius: 12px;
              color: rgb(${({ theme }) => theme.white});
              background: rgb(${({ theme }) => theme.primary});
            }
          }

          .identity-container {
            width: 100%;
            display: flex;
            flex-direction: row;
            gap: 20px;
            padding: 0 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid rgba(${({ theme }) => theme.font}, 0.08);

            img {
              width: 100%;
              width: 50px;
              height: 50px;
              border-radius: 50%;
            }
            .no-image-icon {
              width: 50px;
              height: 50px;
              border-radius: 50%;
              padding: 5px;
              background: rgba(${({ theme }) => theme.font}, 0.1);
            }

            div {
              display: flex;
              flex-direction: column;
              gap: 3px;
              .author-name {
                font-size: 1.1rem;
                font-weight: 500;
                line-height: 1.6rem;
              }

              .email {
                font-weight: 500;
              }
            }
          }

          .details-container {
            display: flex;
            flex-direction: column;
            gap: 12px;
            padding: 0 20px;

            a {
              max-width: 80%;
              word-wrap: break-word;
            }

            .content {
              width: 100%;
              padding: 12px 20px;
              background: rgb(${({ theme }) => theme.background});
              border-radius: 12px;
              line-height: 1.6rem;

              h3 {
                font-weight: 500;
                margin-bottom: 10px;
                font-size: 1.1rem;
              }
            }

            .time-stamps {
              display: flex;
              flex-flow: row wrap;
              gap: 12px;
              line-height: 1.2rem;
              font-size: 0.9rem;
              text-transform: uppercase;
              color: rgb(${({ theme }) => theme.secondary});
            }

            p {
              display: flex;
              flex-direction: row;
              gap: 8px;
              align-items: center;
              span {
                color: rgb(${({ theme }) => theme.primary});
              }
            }
          }
        }
        .base-container {
          display: flex;
          flex-flow: row wrap;
          gap: 12px;

          button,
          a {
            ${BaseButtonOutline}
            border: 1px solid rgba(${({ theme }) => theme.font}, 0.1);
            border-radius: 25px;
            padding: 5px 12px;
            span {
              padding: 0;
            }
          }
        }
      }
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

    .query-container {
      display: flex;
      flex-flow: row wrap;
      gap: 12px;
      align-items: center;
      width: 100%;
      justify-self: center;
      padding: 20px;
      padding-top: 0;
      border-bottom: 1px solid rgba(${({ theme }) => theme.font}, 0.08);

      .clear-filters {
        ${BaseButtonOutline}
      }
      .search {
        position: relative;
        ${StyledInputs}

        input {
          padding: 14px;
          padding-left: 40px;
          background: rgba(${({ theme }) => theme.background}, 0.7);
        }

        svg {
          position: absolute;
          top: calc(50% - 10px);
          left: 10px;
          width: 20px;
          height: 20px;
          color: rgba(${({ theme }) => theme.font}, 0.5);
        }
      }
    }

    .empty-data_container {
      width: 100%;
      min-height: 400px;
      display: grid;
      place-content: center;
      user-select: none;

      .content {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        line-height: 1.6rem;
        padding: 50px 30px;

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

    .container-items__end-mark {
      ${_endMarkStyles}
    }

    .stats-container {
      ${statsContainerStyles}
    }
  }
`;
