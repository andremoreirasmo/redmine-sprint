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

const heightForm = '600px';
export const PaperForm = styled(Paper)`
  display: flex;
  flex-direction: column;
  padding: 30px;
  height: ${heightForm};
  position: relative;

  form {
    margin-bottom: 35px;
    height: ${heightForm};
    overflow-y: auto;
    overflow-x: hidden;
  }

  /* .MuiTextField-root {
    margin: 10px;
  }

  .MuiAutocomplete-root {
    margin-right: 20px;
  } */
`;

export const DivBtnCreate = styled.div`
  display: flex;

  position: absolute;
  bottom: 0;
  right: 0;
  margin: 20px;

  /* justify-content: flex-end; */
  /* margin-top: 20px; */

  /* margin-left: 15px; */
`;
