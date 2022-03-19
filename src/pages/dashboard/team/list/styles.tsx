import { Container } from '@material-ui/core';
import styled from 'styled-components';

export const Root = styled(Container)``;

export const DivHeaderPage = styled.div`
  padding-bottom: 40px;
`;

export const HeaderPage = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const DivNoData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DivCircularProgress = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;

  position: absolute;
  top: 50%;
  left: 50%;
`;
