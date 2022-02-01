import React from "react";
import Container from "./components/container";
import CalculatorPanel from "./components/container/calculator";

const App = (props) => {
  return (
    <Container>
      <CalculatorPanel></CalculatorPanel>
    </Container>
  );
};

export default App;
