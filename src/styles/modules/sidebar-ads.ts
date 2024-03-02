import styled from 'styled-components';
import { BaseButtonOutline } from '../defaults';

export const _sidebarAds = styled.aside`
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
`;
