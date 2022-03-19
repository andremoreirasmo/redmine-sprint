import { CircularProgress } from '@material-ui/core';
import styled, { css } from 'styled-components';

type Props = {
  $isLoading: boolean;
};

export const DivButton = styled.div<Props>`
  display: inline-block;

  .MuiButton-label {
    ${props =>
      props.$isLoading &&
      css`
        visibility: hidden;
      `}
  }
`;

export const CircularProgressButton = styled(CircularProgress)`
  position: absolute;
  visibility: visible;
`;
