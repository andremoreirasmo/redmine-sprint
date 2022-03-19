import styled from 'styled-components';

export const GlobalStyle = styled.div`
  /* Change the white to any color */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: ${props =>
      props.theme.palette.text.primary + ' !important'};
    caret-color: ${props => props.theme.palette.text.primary + ' !important'};
  }
`;
