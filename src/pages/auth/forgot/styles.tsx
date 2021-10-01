import styled from "styled-components";

export const Root = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;

  .MuiTypography-h5 {
    font-weight: 700;
  }
`;

export const DivInformation = styled.div`
  margin-bottom: 5px;

  .MuiTypography-root {
    margin-top: 15px;
  }
`;

export const DivTextField = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 20px;

  .MuiTextField-root {
    margin-top: 10px;
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
