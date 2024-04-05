import styled from 'styled-components';
import {
  BaseButton,
  BaseButtonOutline,
  StyledInputs,
  _endMarkStyles,
  statsContainerStyles
} from '../defaults';

export const _adCollections = styled.div`
  position: relative;
  width: 100%;
  min-height: 90vh;
  position: relative;
  padding: 0 12px;
  display: flex;
  flex-direction: column;
  background: rgb(${({ theme }) => theme.background});

  * {
    ::selection {
      background: rgba(${({ theme }) => theme.font}, 0.2);
      color: rgb(${({ theme }) => theme.primary_shade});
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

  article {
    width: 100%;
    margin: 70px auto;
    max-width: 980px;
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

    .ads-list-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 0 12px;

      .ad-container {
        display: flex;
        flex-direction: column;
        gap: 8px;
        border-radius: 12px;
        padding: 8px 12px;

        section {
          display: flex;
          flex-flow: row wrap;
          justify-content: space-between;
          gap: 8px;

          div {
            h2 {
              font-weight: 500;
              font-size: 1.2rem;
              line-height: 2rem;
            }

            h3 {
              font-weight: 500;
              color: rgb(${({ theme }) => theme.primary_shade});
            }
          }

          h4 {
            font-size: 0.9rem;
            line-height: 1.8rem;
            font-weight: 500;
            text-transform: uppercase;
            color: rgb(${({ theme }) => theme.error});
          }
        }

        .timestamps-container {
          display: flex;
          flex-flow: row wrap;
          gap: 8px;
          align-items: center;
          font-size: 0.8rem;
          font-weight: 500;
          text-transform: uppercase;
        }

        .actions-container {
          display: flex;
          flex-flow: row wrap;
          align-items: center;
          gap: 8px;

          a {
            ${BaseButton}
          }

          button {
            ${BaseButton}
            background: rgb(${({ theme }) => theme.error});
            color: rgb(${({ theme }) => theme.white});
          }
        }
      }
    }
  }
`;
