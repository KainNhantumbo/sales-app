import styled from 'styled-components';
import { BaseButton, BaseButtonOutline } from '../defaults';

export const FeedContainer = styled.div`
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

    @media screen and (max-width: 445px) {
      border: none;
      border-radius: 0;
      padding-bottom: 40px;
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
