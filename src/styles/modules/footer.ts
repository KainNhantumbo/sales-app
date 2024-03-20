import styled from 'styled-components';

export const _footer = styled.footer`
  width: 100%;
  font-weight: 500;
  font-size: 1rem;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: rgba(${({ theme }) => theme.foreground_shade}, 0.5);
  backdrop-filter: blur(10px);
  position: relative;

  ::before {
    content: '';
    position: absolute;
    width: 1px;
    height: 1px;
    right: 50%;
    bottom: 80px;
    border-radius: 50%;
    z-index: -999;
    backdrop-filter: blur(10px);
    box-shadow: 0 0 100px 60px rgba(${({ theme }) => theme.primary}, 0.8);
  }

  * {
    ::selection {
      background: rgb(${({ theme }) => theme.background_shade});
      color: rgb(${({ theme }) => theme.primary_shade});
    }
  }

  .featured-container {
    padding: 0 20px;
    display: flex;
    flex-flow: row wrap;
    gap: 40px;
    justify-content: space-evenly;
    border-bottom: 1px solid rgba(${({ theme }) => theme.font}, 0.1);
    padding: 20px;
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    @media screen and (max-width: 490px) {
      gap: 12px;
    }

    h3 {
      display: flex;
      align-items: center;
      font-weight: 500;
      font-size: 1.1rem;
      @media screen and (max-width: 410px) {
        font-size: 1rem;
        line-height: 1.6rem;
      }
      svg {
        width: 20px;
        height: 20px;
        color: rgb(${({ theme }) => theme.primary_shade});
      }
      span {
        padding-left: 5px;
      }
    }
  }

  .navigation {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 20px;
    padding: 0 20px;

    nav {
      width: 100%;
      max-width: 1280px;
      display: flex;
      flex-flow: row wrap;
      gap: 40px;
      justify-content: flex-start;
      margin: 0 auto;

      section {
        display: flex;
        flex-direction: column;
        gap: 15px;
        h3 {
          display: flex;
          align-items: center;
          font-weight: 500;
          font-size: 1.1rem;
          margin: 0 auto;
          line-height: 1.6rem;

          svg {
            width: 20px;
            height: 20px;
            color: rgb(${({ theme }) => theme.primary_shade});
          }
          span {
            padding-left: 5px;
          }
        }

        .elements {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-left: 25px;

          a {
            font-size: 0.98rem;
            span {
              line-height: 1.2rem;
              :hover {
                cursor: pointer;
                color: rgb(${({ theme }) => theme.primary_shade});
              }
            }
          }
        }
      }
    }
  }

  .base-container {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1280px;
    position: relative;
    padding: 30px;
    margin: 0 auto;

    @media screen and (max-width: 470px) {
      flex-direction: column-reverse;
      gap: 30px;
    }

    .base-container_presentation {
      @media screen and (max-width: 680px) {
        padding-bottom: 40px;
      }

      .logo {
        p {
          line-height: 1.4rem;
          font-weight: 400;
          text-align: center;
        }
      }

      .sharer-button {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
        padding-top: 10px;

        @media screen and (max-width: 470px) {
          justify-content: center;
        }

        a {
          width: 30px;
          height: 30px;
          display: grid;
          place-items: center;
          border-radius: 10px;

          :hover {
            color: rgb(${({ theme }) => theme.primary_shade});
          }

          svg {
            width: 20px;
            height: 20px;
          }
        }
      }
    }

    .theme-fluent-buttons {
      background: none;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      gap: 2px;
      border: 1px solid rgba(${({ theme }) => theme.font}, 0.3);
      border-radius: 20px;
      padding: 3px;

      .active {
        background: rgba(${({ theme }) => theme.font}, 0.2);
      }

      button {
        display: grid;
        place-content: center;
        place-items: center;
        border: none;
        background: none;
        padding: 8px;
        border-radius: 50%;
        user-select: none;

        :hover {
          cursor: pointer;
          background: rgba(${({ theme }) => theme.font}, 0.2);
        }

        svg {
          color: rgb(${({ theme }) => theme.font});
        }
      }

      @media screen and (max-width: 680px) {
        position: relative;
        bottom: 20px;
      }

      @media screen and (max-width: 470px) {
        bottom: 0;
      }
    }
  }
`;
