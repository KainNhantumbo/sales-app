import styled from 'styled-components';
import { BaseButton, BaseButtonOutline } from '../defaults';

export const ProfileContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 90vh;
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgb(${({ theme }) => theme.foreground});

  * {
    ::selection {
      background: rgba(${({ theme }) => theme.font}, 0.2);
      color: rgb(${({ theme }) => theme.primary_variant});
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
    max-width: 720px;
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

    .cover-image-container {
      width: 100%;
      display: flex;
      align-items: start;
      flex-direction: column;
      gap: 10px;
      justify-content: center;
      position: relative;
      height: fit-content;

      img {
        width: 100%;
        border-radius: 20px 20px 0 0;
        max-width: 1280px;
        max-height: 200px;
        object-fit: cover;

        @media screen and (max-width: 445px) {
          border-radius: 0;
        }
      }

      .cover-image-icon {
        width: 100%;
        height: 200px;
        border-radius: 20px 20px 0 0;
        margin: 0 auto;
        padding: 30px;
        background: rgba(${({ theme }) => theme.font}, 0.1);
      }
    }

    .user-details-container {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      gap: 20px;
      padding: 0 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid rgba(${({ theme }) => theme.font}, 0.08);

      @media screen and (max-width: 535px) {
        flex-direction: column;
      }

      .left-wrapper-container {
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 20px;

        .profile-image-container {
          img {
            width: 100%;
            max-width: 90px;
            max-height: 90px;
            border-radius: 12px;
            margin: 0 auto;
          }
          .no-image-icon {
            width: 90px;
            height: 90px;
            border-radius: 12px;
            margin: 0 auto;
            padding: 5px;
            background: rgba(${({ theme }) => theme.font}, 0.1);
          }
        }

        .details-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
          .author-name {
            font-size: 1.1rem;
            font-weight: 500;
            line-height: 1.6rem;
            align-items: center;
          }

          .email {
            font-weight: 500;
          }

          .network-buttons {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 10px;

            a {
              width: 30px;
              height: 30px;
              display: grid;
              place-items: center;
              background: rgba(${({ theme }) => theme.primary}, 0.2);
              border-radius: 10px;

              :hover {
                color: rgb(${({ theme }) => theme.primary_variant});
              }
            }
          }
        }
      }

      .right-wrapper-container {
        display: flex;
        flex-direction: column;
        gap: 20px;
        align-items: center;

        @media screen and (max-width: 535px) {
          flex-direction: row;
        }

        .store-anchor {
          a {
            ${BaseButtonOutline}
          }
        }

        .create-story-btn {
          ${BaseButton}
          background: rgba(${({ theme }) => theme.primary}, 0.2);
          color: rgb(${({ theme }) => theme.font});
          :hover {
            box-shadow: none;
            color: rgb(${({ theme }) => theme.primary_variant});
          }
        }
      }
    }

    .description-container {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 0 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid rgba(${({ theme }) => theme.font}, 0.08);

      span {
        font-weight: 500;
      }

      h5 {
        display: flex;
        flex-direction: row;
        gap: 5px;
        align-items: center;
        span {
          text-transform: uppercase;
        }
      }
    }

    .professional-data-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 0 20px;
      padding-bottom: 20px;

      .spoken-languages {
        display: flex;
        flex-flow: row wrap;
        gap: 12px;

        h5 {
          display: flex;
          flex-direction: row;
          gap: 5px;
          align-items: center;
        }

        p {
          padding: 8px 12px;
          background: rgba(${({ theme }) => theme.primary}, 0.2);
          border-radius: 5px;
        }
      }
    }
  }

  aside {
    width: 100%;
    height: fit-content;
    position: sticky;
    top: 90px;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    width: 320px;
    border: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
    padding: 20px;
    border-radius: 20px;
    background: rgb(${({ theme }) => theme.foreground});

    @media screen and (max-width: 755px) {
      width: 100%;
      position: static;
    }
    @media screen and (max-width: 445px) {
      border: none;
      border-radius: 0;
      padding-top: 40px;
      border-top: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
    }

    .no-ads {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      padding: 12px 5px;
      padding-bottom: 25px;
      border-bottom: 1px solid rgba(${({ theme }) => theme.font}, 0.08);

      .ads-icon {
        width: 30px;
        height: 30px;
        color: rgb(${({ theme }) => theme.primary});
      }

      h3 {
        text-align: center;
        font-size: 1.2rem;
        line-height: 1.6rem;
        font-weight: 500;
      }

      a {
        ${BaseButtonOutline}
      }
    }
  }
`;
