import styled from 'styled-components';

export const Root = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  justify-content: center;

  .MuiTypography-h5 {
    font-weight: 700;
  }
`;

export const DivSentSvg = styled.div`
  display: flex;
  justify-content: center;

  img {
    height: 160px;
  }
`;

export const DivInformation = styled.div`
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .MuiTypography-root {
    margin-top: 15px;
    text-align: center;
  }
`;

export const DivBack = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5px;

  .MuiTypography-colorPrimary {
    margin-left: 3px;
  }
`;
