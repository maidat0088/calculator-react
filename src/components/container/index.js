import React from "react";
import styled from "@emotion/styled";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "#fffff")};
`;

export default Container;
