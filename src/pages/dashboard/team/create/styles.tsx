import { Container, Paper } from '@material-ui/core';
import styled from 'styled-components';

export const Root = styled(Container)``;

export const DivHeaderPage = styled.div`
  padding-bottom: 40px;
`;

export const HeaderPage = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PaperForm = styled(Paper)`
  display: flex;
  flex-direction: column;
  padding: 30px;
  min-height: 500px;

  /* .MuiTextField-root {
    margin: 10px;
  }

  .MuiAutocomplete-root {
    margin-right: 20px;
  } */
`;

export const DivBtnCreate = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;

  .MuiButton-root {
    margin-left: 15px;
  }
`;
