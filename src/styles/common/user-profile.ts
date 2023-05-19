import styled from 'styled-components';
import {
  BaseButton,
  BaseButtonOutline,
  Button_Mono_A,
  Button_Mono_B,
  StyledInputs,
  StyledLabels,
} from '../defaults';

export const UserProfileContainer = styled.div`
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
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5000;
    background: rgba(${({ theme }) => theme.foreground}, 0.5);
    backdrop-filter: blur(10px);
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    p {
      color: rgb(${({ theme }) => theme.alert});
      padding: 0 20px;
      line-height: 1.6rem;
      text-align: center;
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
      margin-bottom: 10px;

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
        }
      }
    }

    .data-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;

      .wrapper {
        width: 100%;
        max-width: 1280px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        padding: 20px;
        border-top: 1px solid rgba(${({ theme }) => theme.font}, 0.08);

        form {
          width: 100%;
          max-width: 640px;
          display: flex;
          justify-content: flex-start;
          flex-direction: column;
          gap: 18px;

          .form-section {
            display: flex;
            flex-direction: row;
            width: 100%;
            gap: 10px;

            @media screen and (max-width: 655px) {
              flex-direction: column;
            }
            .form-element {
              display: flex;
              flex-direction: column;
              gap: 10px;
              width: 100%;
              label {
                ${StyledLabels};
              }
              ${StyledInputs}

              input[type='date'] {
                padding-top: 20px;
              }
            }

            .image-container {
              width: 100%;
              display: flex;
              align-items: center;
              flex-direction: column;
              gap: 10px;
              justify-content: center;
              position: relative;
              margin-bottom: 20px;

              input {
                display: none;
              }
            }

            .cover-image {
              img {
                width: 100%;
                border-radius: 10px;
                max-width: 1280px;
                max-height: 150px;
                object-fit: cover;
              }

              .camera-icon {
                width: 680px;
                height: 150px;
                border-radius: 12px;
                margin: 0 auto;
                padding: 5px;
                background: rgba(${({ theme }) => theme.font}, 0.1);
              }

              label {
                ${BaseButton}
                width: fit-content;
                height: fit-content;
                position: absolute;
                top: 3px;
                left: 3px;
                background: rgba(${({ theme }) => theme.primary}, 0.8);
                padding: 8px;
              }

              .clear-image {
                ${Button_Mono_A}
                position: absolute;
                bottom: 50px;
                right: calc(50% - 120px);
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: rgb(${({ theme }) => theme.font});
                :hover {
                  background: rgb(${({ theme }) => theme.alert});
                }
              }
            }

            .profile-image {
              img {
                border-radius: 50%;
                max-width: 220px;
                max-height: 220px;
                object-fit: none;
              }

              .camera-icon {
                width: 150px;
                height: 150px;
                border-radius: 50%;
                margin: 0 auto;
                padding: 5px;
                background: rgba(${({ theme }) => theme.font}, 0.1);
              }
              label {
                ${BaseButton}
                width: fit-content;
                height: fit-content;
              }

              .clear-image {
                ${Button_Mono_A}
                position: absolute;
                bottom: 50px;
                right: calc(50% - 120px);
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: rgb(${({ theme }) => theme.font});
                :hover {
                  background: rgb(${({ theme }) => theme.alert});
                }
              }
            }
          }

          .error-message {
            color: rgb(${({ theme }) => theme.alert});
            font-weight: 500;
            font-size: 0.8rem;
            line-height: 1.4rem;
          }

          button {
            ${BaseButton}
            align-self: center;
            width: 100%;
          }
        }
      }
    }
  }
`;
