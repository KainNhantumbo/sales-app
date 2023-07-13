import styled from 'styled-components';
import { BaseButton } from '../defaults';

export const StoriesRenderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  padding: 0 20px;
  padding-bottom: 20px;
  margin: 0 auto;

  .stories-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;

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
          img {
            width: 100%;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin: 0 auto;
            cursor: pointer;
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
        border-radius: 12px;
        object-fit: cover;
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
          outline: none;
          user-select: none;
          background: rgb(${({ theme }) => theme.foreground});
          display: flex;
          flex-direction: row;
          gap: 8px;
          align-items: center;
          justify-content: center;
          color: rgb(${({ theme }) => theme.primary_variant});
          cursor: pointer;
          font-weight: 500;
          padding: 12px;
          border-radius: 12px;

          :hover {
            color: rgb(${({ theme }) => theme.primary_variant});
            background: rgba(${({ theme }) => theme.primary}, 0.2);
            transition: all 200ms ease-in-out;
          }
        }
      }
    }
  }

  .empty-data_container {
    width: 100%;
    min-height: 200px;
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
        color: rgb(${({ theme }) => theme.primary_variant});
      }

      h3 {
        text-align: center;
        font-size: 1.2rem;
        font-weight: 500;
        margin-top: 20px;
      }
    }
  }
`;
