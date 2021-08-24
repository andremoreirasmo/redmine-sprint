import Dashboard from "../pages/dashboard";
import Container from "@material-ui/core/Container";

import useStyles from "./styles";

export default function App() {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Dashboard />
    </Container>
  );
}
