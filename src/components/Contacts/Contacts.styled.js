import { Button } from '@mui/material';
import styled from 'styled-components';

export const ContactDelButton = styled(Button)`
  &:hover {
    background-color: darkgray;
  }
`;

export const Container = styled.div`
  display: 'flex';
  flex-direction: 'row';
  align-items: 'flex-start';
`;
