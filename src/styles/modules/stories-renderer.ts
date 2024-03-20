import styled from 'styled-components';
import { BaseButton } from '../defaults';

export const _storiesRender = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  padding: 0 20px;
  padding-bottom: 20px;
  margin: 0 auto;
  position: relative;

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

  .empty-data_container {
    width: 100%;
    background: rgb(${({ theme }) => theme.background});
    display: grid;
    place-content: center;
    user-select: none;
    padding: 80px 0;
    border-radius: 12px;

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

  .stories-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    position: relative;

    .story-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 12px 12px 0 12px;
      border-radius: 12px;
      border: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
      :hover {
        transition: all 200ms ease;
        background: rgb(${({ theme }) => theme.background});
      }

      .header-container {
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 20px;

        .profile-image-container {
          cursor: pointer;
          img {
            width: 100%;
            max-width: 50px;
            max-height: 50px;
            border-radius: 50%;
            margin: 0 auto;
          }
          .no-image-icon {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin: 0 auto;
            padding: 5px;
            background: rgba(${({ theme }) => theme.font}, 0.1);
          }
        }

        .details-container {
          display: flex;
          flex-direction: column;
          gap: 5px;
          .author-name {
            font-size: 1.1rem;
            font-weight: 500;
            line-height: 1.6rem;
            align-items: center;
          }

          .time {
            text-transform: uppercase;
            font-size: 0.9rem;
            font-weight: 500;
          }
        }
      }

      .title {
        font-size: 1.1rem;
        font-weight: 500;
        line-height: 1.6rem;
      }

      .content-container {
        line-height: 1.6rem;
      }

      .cover-image {
        width: 100%;
        height: 100%;
        max-height: 420px;
        border-radius: 12px;
        object-fit: cover;
      }

      .information-container {
        border-top: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
        padding: 0 12px;
        padding-top: 12px;
        color: rgb(${({ theme }) => theme.primary_shade});

        p {
          font-weight: 500;
        }
      }

      .actions-container {
        border-top: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        padding: 12px 0;
        gap: 20px;

        button {
          width: 100%;
          border: none;
          user-select: none;
          background: rgb(${({ theme }) => theme.foreground});
          display: flex;
          flex-direction: row;
          gap: 8px;
          align-items: center;
          justify-content: center;
          color: rgb(${({ theme }) => theme.primary_shade});
          cursor: pointer;
          font-weight: 500;
          padding: 12px;
          border-radius: 8px;

          :hover {
            color: rgb(${({ theme }) => theme.primary_shade});
            background: rgba(${({ theme }) => theme.primary}, 0.2);
          }
        }
      }
    }
  }
`;
