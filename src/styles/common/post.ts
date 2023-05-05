import styled, { css } from 'styled-components';
import { BaseButton } from '../defaults';

const ShareLinksStyles = css`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  align-items: center;

  .title {
    font-weight: 600;
  }

  .options {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;

    a {
      padding: 10px;
      background: rgba(${({ theme }) => theme.secondary}, 0.1);
      border-radius: 3px;

      :hover {
        color: rgb(${({ theme }) => theme.secondary});
      }
    }
  }
`;

export const PostContainer = styled.div`
  margin-top: 90px;
  position: relative;

  * {
    ::selection {
      background: rgba(${({ theme }) => theme.secondary}, 0.2);
      color: rgb(${({ theme }) => theme.primary});
    }
  }

  .main-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 5px;
    justify-items: center;
    max-width: 980px;
    align-self: center;
    margin: 0 auto;
  }

  article {
    padding: 30px 40px;

    @media screen and (max-width: 620px) {
      padding: 30px 20px;
    }

    .article-header-container {
      display: flex;
      flex-direction: column;
      gap: 18px;

      .reading-props {
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

      .author-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-flow: row wrap;
        gap: 18px;

        .author {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding: 10px 0;
          gap: 18px;

          img {
            width: 30px;
            border-radius: 50%;
          }

          div {
            display: flex;
            justify-content: flex-start;
            flex-flow: row wrap;
            font-size: 0.98rem;
            line-height: 1.4rem;
            .description {
              font-weight: 500;
            }
          }
        }

        .share-options {
          ${ShareLinksStyles}
        }
      }

      h1 {
        line-height: 2.6rem;
        font-size: 2rem;
        margin: 0;
        strong {
          font-weight: 600;
        }
        @media screen and (max-width: 420px) {
          font-size: 1.8rem;
          line-height: 2.4rem;
        }
      }

      .article-image {
        width: 100%;
        height: 100%;
        max-width: 900px;
        max-height: 480px;
        object-fit: cover;
        border-radius: 5px;
        margin: 0 auto;
      }

      .tags-container {
        display: flex;
        justify-content: flex-start;
        gap: 12px;
        align-items: center;
        margin: 12px 0;
        .title {
          font-weight: 600;
        }
        .tags {
          display: flex;
          justify-content: flex-start;
          gap: 8px;
          flex-flow: row wrap;
          max-width: 70%;

          span {
            padding: 10px;
            border-radius: 5px;
            background: rgba(${({ theme }) => theme.secondary}, 0.1);
          }
        }
      }

      h4 {
        line-height: 1.6rem;
        margin: 0 auto;
        font-size: 1rem;
        max-width: 1000px;
      }
    }

    #content {
      max-width: 1000px;
      margin: 0 auto;
      font-size: 1rem;
      line-height: 1.8rem;

      a {
        color: rgb(0, 133, 255);
        text-decoration: underline;
        text-underline-offset: 2px;
      }

      p {
        margin-bottom: 16px;
      }

      h3,
      h2 {
        margin-bottom: 10px;
        font-size: 1.2rem;
        font-weight: 500;
      }

      h2 {
        font-size: 1.5rem;
        line-height: 2.2rem;
        color: rgb(${({ theme }) => theme.primary});
      }

      ul,
      ol {
        margin-bottom: 1.4rem;
        li {
          list-style: disc;
          margin-left: 2rem;
        }
      }

      img {
        width: 100%;
        height: 100%;
        max-width: 900px;
        max-height: 480px;
        object-fit: cover;
        border-radius: 5px;
        margin: 0 auto;
        margin-top: 10px;
      }
    }
  }

  .base-container {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .share-options {
      ${ShareLinksStyles}
      justify-content: center;
      flex-direction: column;
      .options {
        gap: 10px;
      }
    }

    .author-container {
      display: flex;
      flex-direction: row;
      gap: 18px;
      background: rgb(${({ theme }) => theme.foreground});
      border-radius: 15px;
      padding: 20px;
      line-height: 1.6rem;
      align-items: center;

      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
      h3 {
        font-weight: 500;
        font-size: 1.1rem;
      }
      @media screen and (max-width: 440px) {
        flex-direction: column;
        text-align: center;
      }
    }
  }

  .featured-posts-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 30px;

    h2 {
      font-size: 1rem;
      text-decoration: underline;
      text-underline-offset: 2px;
      text-align: center;
      text-transform: uppercase;
      color: rgb(${({ theme }) => theme.secondary});
    }

    .posts-container {
      width: 100%;
      display: flex;
      gap: 12px;
      justify-content: flex-start;

      @media screen and (max-width: 770px) {
        flex-direction: column;
      }

      .post {
        width: fit-content;
        display: flex;
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
`;
