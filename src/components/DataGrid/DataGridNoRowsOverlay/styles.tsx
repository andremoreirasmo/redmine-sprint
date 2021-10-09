import styled from 'styled-components';
import { GridOverlay } from '@mui/x-data-grid';

export const Overlay = styled(GridOverlay)`
  flex-direction: column;

  & .ant-empty-img-1 {
    fill: ${props =>
      props.theme.palette.type === 'light' ? '#aeb8c2' : '#262626'};
  }

  & .ant-empty-img-2 {
    fill: ${props =>
      props.theme.palette.type === 'light' ? '#f5f5f7' : '#595959'};
  }

  & .ant-empty-img-3 {
    fill: ${props =>
      props.theme.palette.type === 'light' ? '#dce0e6' : '#434343'};
  }

  & .ant-empty-img-4 {
    fill: ${props =>
      props.theme.palette.type === 'light' ? '#fff' : '#1c1c1c'};
  }

  & .ant-empty-img-5 {
    fill-opacity: ${props =>
      props.theme.palette.type === 'light' ? '0.8' : '0.08'};
    fill: ${props =>
      props.theme.palette.type === 'light' ? '#f5f5f5' : '#fff'};
  }

  div {
    margin-top: 10px;
  }
`;
