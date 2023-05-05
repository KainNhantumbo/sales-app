import styled from 'styled-components';
import { BaseButton, BaseButton_Alter } from '../defaults';

export const HomeContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgb(${({ theme }) => theme.foreground});

  * {
    ::selection {
      background: rgba(${({ theme }) => theme.secondary}, 0.2);
      color: rgb(${({ theme }) => theme.primary});
    }
  }
  .search-container {
    width: 100%;
    margin: 0 auto;
    max-width: 980px;
    margin-top: 100px;
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    padding: 0 40px;

    form {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 10px;
      .form-element {
        position: relative;
        width: 100%;
        input {
          width: 100%;
          height: fit-content;
          border: none;
          padding: 10px;
          padding-left: 40px;
          line-height: 1.2rem;
          font-weight: 400;
          outline: none;
          border-radius: 3px;
          background: rgb(${({ theme }) => theme.background});
          border: 1px solid transparent;

          :focus {
            transition: all 300ms ease;
            border: 1px solid rgba(${({ theme }) => theme.primary}, 0.1);
          }
          ::placeholder {
            color: rgba(${({ theme }) => theme.font}, 0.8);
            font-size: 0.9rem;
          }
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
      button {
        ${BaseButton}
        background: rgb(${({ theme }) => theme.background});
        color: rgb(${({ theme }) => theme.font});
        border: none;

        :hover {
          color: rgb(${({ theme }) => theme.secondary});
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
      height: 70vh;
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

    /* ============Home page============= */
    .featured-posts-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;

      .header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        gap: 15px;
        font-size: 0.92rem;
        font-weight: 500;
        text-transform: uppercase;
        color: rgb(${({ theme }) => theme.secondary});
        border-bottom: 1px solid rgba(${({ theme }) => theme.primary}, 0.1);
        padding-bottom: 3px;
        margin-top: 20px;
        h2,
        a {
          display: flex;
          flex-flow: row nowrap;
          gap: 8px;
          align-items: center;
        }
      }

      .category-posts-container {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        @media screen and (max-width: 810px) {
          grid-template-columns: repeat(2, 1fr);
        }
        @media screen and (max-width: 545px) {
          grid-template-columns: repeat(1, 1fr);
        }

        .post {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          flex-direction: column;
          border-radius: 3px;
          border: 1px solid rgba(${({ theme }) => theme.primary}, 0.1);
          font-size: 0.95rem;
          line-height: 1.2rem;

          :hover {
            cursor: pointer;
            box-shadow: 0 0 20px rgba(${({ theme }) => theme.primary}, 0.1);
            transition: all 200ms ease-in-out;
          }

          img {
            width: 100%;
            height: 100%;
            height: 210px;
            object-fit: cover;
            border-radius: 3px 3px 0 0;
          }

          .content-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 20px;
            .details {
              display: flex;
              justify-content: flex-start;
              gap: 12px;
              font-size: 0.9rem;
              font-weight: 400;
              align-items: center;

              div {
                display: flex;
                align-items: center;
                gap: 5px;
                text-transform: uppercase;
              }
            }

            h3 {
              font-weight: 500;
              font-size: 1rem;
              line-height: 1.4rem;
              color: rgb(${({ theme }) => theme.primary});
            }

            button {
              ${BaseButton}
              font-size: 0.9rem;
              padding-left: 0;
              border: none;
              color: rgb(${({ theme }) => theme.secondary});
              text-transform: uppercase;
              justify-self: flex-end;
            }
          }
        }
      }
    }

    /* ================other pages != Home================ */
    .posts-container {
      display: flex;
      min-height: 50vh;
      flex-direction: column;
      justify-content: flex-start;
      gap: 12px;

      .post {
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        border-radius: 3px;
        border: 1px solid rgba(${({ theme }) => theme.primary}, 0.1);
        font-size: 0.95rem;
        line-height: 1.2rem;

        :hover {
          cursor: pointer;
          box-shadow: 0 0 20px rgba(${({ theme }) => theme.primary}, 0.1);
          transition: all 200ms ease-in-out;
        }

        @media screen and (max-width: 635px) {
          flex-direction: column;
        }

        img {
          width: 100%;
          max-width: 280px;
          object-fit: cover;
          border-radius: 3px 0 0 3px;
          @media screen and (max-width: 635px) {
            width: 100%;
            height: 100%;
            max-width: none;
            height: 280px;
            border-radius: 3px 3px 0 0;
          }
        }

        .content-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 20px;
          .details {
            display: flex;
            justify-content: flex-start;
            gap: 12px;
            font-size: 0.9rem;
            font-weight: 500;
            align-items: center;

            div {
              display: flex;
              align-items: center;
              gap: 5px;
              text-transform: uppercase;
            }
          }

          h3 {
            font-weight: 500;
            font-size: 1rem;
            line-height: 1.4rem;
            color: rgb(${({ theme }) => theme.primary});
          }

          button {
            ${BaseButton}
            font-size: 0.9rem;
            padding-left: 0;
            border: none;
            color: rgb(${({ theme }) => theme.secondary});
            text-transform: uppercase;
          }
        }
      }
    }
  }

  .load-posts-container {
    margin: 20px auto;

    button {
      ${BaseButton_Alter}

      :disabled {
        border: none;
        box-shadow: none;
      }
    }
  }
`;
