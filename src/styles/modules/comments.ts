import styled from 'styled-components';
import { BaseButton, BaseButtonOutline, StyledInputs } from '../defaults';

export const CommentsContainer = styled.div`
  .comments-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 50px 0;
    width: 100%;
    height: fit-content;

    .title {
      h2 {
        font-size: 1.2rem;
        font-weight: 500;
        line-height: 1.6rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;

        svg {
          width: 25px;
          height: 25px;
        }
      }

      p {
        margin-top: 10px;
        line-height: 1.6rem;
        a {
          color: rgb(${({ theme }) => theme.primary_variant});
        }
      }
    }

    .comments-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 20px;

      .current-comment,
      .sub-coment {
        display: flex;
        flex-direction: row;
        gap: 10px;
        background: rgb(${({ theme }) => theme.foreground});
        border-radius: 15px;
        padding: 20px;

        @media screen and (max-width: 480px) {
          flex-wrap: wrap;
        }

        .comment-swapper {
          display: flex;
          flex-flow: row nowrap;
          gap: 20px;
          width: 100%;
        }

        img,
        svg {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          pointer-events: none;
        }

        img {
          object-fit: cover;
        }

        svg {
          border-radius: 50%;
          padding: 5px;
          border: 1px solid rgba(${({ theme }) => theme.accent}, 0.09);
        }

        ${StyledInputs}

        button {
          ${BaseButton}
          height: fit-content;
          min-width: 110px;
          span {
            padding: 0;
          }
          @media screen and (max-width: 480px) {
            width: 100%;
          }
        }
      }

      .reply-comment {
        margin-top: 10px;
        border-left: 3px solid rgb(${({ theme }) => theme.primary_variant});
      }

      .sub-coment {
        padding: 0;
        margin: 0;

        @media screen and (max-width: 700px) {
          margin-bottom: 30px;
        }
      }

      .comments-container {
        display: flex;
        flex-direction: column;
        gap: 20px;
        font-size: 0.96rem;

        .comment {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 8px;
          background: rgb(${({ theme }) => theme.foreground});
          border-radius: 15px;
          padding: 20px;

          .header {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            .props {
              display: flex;
              align-items: center;
              gap: 10px;

              img,
              .user-icon {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                pointer-events: none;
              }

              img {
                object-fit: cover;
              }

              .user-icon {
                padding: 5px;
                border: 1px solid rgba(${({ theme }) => theme.accent}, 0.09);
              }

              h3 {
                font-weight: 500;
              }

              span {
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 5px;

                .dot {
                  width: 7px;
                  height: 7px;
                }
              }
            }

            .actions {
              .like,
              .delete,
              .denounce,
              .edit,
              .reply {
                ${BaseButtonOutline}
                svg {
                  width: 16px;
                  height: 16px;
                  top: calc(50% - 8px);
                }
              }

              .delete:hover {
                color: rgb(${({ theme }) => theme.alert});
              }

              @media screen and (max-width: 700px) {
                position: absolute;
                bottom: 8px;
                right: 20px;
              }
            }
          }

          .body {
            margin-left: 40px;
            line-height: 1.4rem;

            @media screen and (max-width: 700px) {
              margin-bottom: 30px;
            }
          }
        }
      }
    }
  }
`;
