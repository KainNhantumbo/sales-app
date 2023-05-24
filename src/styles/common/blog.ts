import styled from 'styled-components';
import { BaseButton, Button_Mono_B, StyledInputs } from '../defaults';

export const BlogContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 50vh;
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgb(${({ theme }) => theme.background});

  * {
    ::selection {
      background: rgb(${({ theme }) => theme.background_variant});
      color: rgb(${({ theme }) => theme.primary_variant});
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
        ${StyledInputs}

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
        ${Button_Mono_B}
        width: 41px;
        height: 41px;
      }
    }
  }

  .main-container {
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
        border-radius: 10px;
        background: rgb(${({ theme }) => theme.foreground});
        font-size: 0.95rem;
        line-height: 1.2rem;

        :hover {
          cursor: pointer;
          box-shadow: 0 0 20px rgba(${({ theme }) => theme.accent}, 0.09);
          transition: all 200ms ease-in-out;
        }

        @media screen and (max-width: 635px) {
          flex-direction: column;
        }

        img {
          width: 100%;
          max-width: 280px;
          object-fit: cover;
          border-radius: 10px 0 0 10px;
          @media screen and (max-width: 635px) {
            width: 100%;
            height: 100%;
            max-width: none;
            height: 280px;
            border-radius: 10px 10px 0 0;
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
            color: rgb(${({ theme }) => theme.primary_variant});
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
              color: rgb(${({ theme }) => theme.primary_variant});
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
    }
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
