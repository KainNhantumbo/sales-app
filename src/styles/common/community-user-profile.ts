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

  article {
    width: 100%;
    margin-top: 90px;
  }
`;
