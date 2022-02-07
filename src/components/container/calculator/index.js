import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const CalculatorPanelContainer = styled("div")`
  width: 400px;
  height: 250px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  border: 2px solid #000000;
  justify-content: space-between;
  background-color: #ffffff;
`;

const CalculatorKeys = styled("div")`
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 10px 10px;

  & > button {
    text-align: center;
    border: 2px solid #000000;
    background-color: #ffffff;
    border-radius: 5px;
    font-size: 13px;
    cursor: pointer;
  }
`;

const clearCalculator = () => {
  return {
    currentNumber: "",
    previousNumber: "",
    result: "",
    operation: undefined,
    isEqualBtnClick: false,
  };
};

const ButtonKey = ({ button: { style, content, value, onClick } }) => {
  return (
    <button
      value={value}
      css={style ? style : ""}
      onClick={(e) => onClick(e.target.value)}
    >
      <span>{content ? content : value}</span>
    </button>
  );
};

const CalculatorPanel = () => {
  const [calculator, setCalculator] = useState(() => clearCalculator());

  const handleKeyPress = (event) => {
    console.log(event.key);

    const patternForNumbers = /^[0-9]/g;
    const patternForOperators = /[+\-*\/]/g;

    if (event.key.match(patternForNumbers)) {
      event.preventDefault();
      handleNumberClick(event.key);
    }
    if (event.key === ".") {
      event.preventDefault();
      handleNumberClick(event.key);
    }
    if (event.key === "%") {
      event.preventDefault();
      handleNumberClick(event.key);
    }
    if (event.key.match(patternForOperators)) {
      event.preventDefault();
      handleOperationClick(event.key);
    }
    if (event.key === "Enter" || event.key === "=") {
      event.preventDefault();
      handleEqualClick();
    }
    if (event.key === "Backspace") {
      event.preventDefault();
      sliceInput();
    }
    if (event.key == "Delete" || event.key == "Escape") {
      event.preventDefault();
      handleClearDisplay();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [calculator]);

  const sliceInput = () => {
    setCalculator({
      ...calculator,
      currentNumber: calculator.currentNumber.toString().slice(0, -1),
    });
  };

  const isNoOperation = () => {
    return (
      calculator.currentNumber === "" &&
      calculator.previousNumber === "" &&
      calculator.operation === undefined
    );
  };

  const handleNumberClick = (inputNumber) => {
    console.log(inputNumber);

    // if (inputNumber === "+-") {
    //   let currentParseFloatNumber = parseFloat(calculator.currentNumber) * -1;
    //   let resultParseFloatNumber = parseFloat(calculator.result) * -1;

    //   if (isNaN(currentParseFloatNumber) && isNaN(resultParseFloatNumber))
    //     return;

    //   setCalculator({
    //     ...calculator,
    //     currentNumber: isNaN(currentParseFloatNumber)
    //       ? calculator.currentNumber
    //       : currentParseFloatNumber.toString(),
    //     result: isNaN(resultParseFloatNumber)
    //       ? calculator.result
    //       : resultParseFloatNumber.toString(),
    //   });

    //   return;
    // }

    // if (inputNumber === "." && calculator.currentNumber.includes(".")) return;
    // if (inputNumber === "%" && calculator.currentNumber === "") return;
    // if (inputNumber === "%" && calculator.currentNumber.includes("%")) return;

    // if (calculator.isEqualBtnClick) {
    //   setCalculator({
    //     currentNumber: inputNumber,
    //     previousNumber: "",
    //     result: "",
    //     operation: undefined,
    //     isEqualBtnClick: false,
    //   });
    //   return;
    // }

    // if (calculator.result !== "") {
    //   setCalculator({
    //     ...calculator,
    //     previousNumber: calculator.result,
    //     currentNumber: `${inputNumber}`,
    //     result: "",
    //   });

    //   return;
    // }

    // setCalculator({
    //   ...calculator,
    //   currentNumber: `${calculator.currentNumber}${inputNumber}`,
    // });
  };

  const handleOperationClick = (inputOperation) => {
    console.log(inputOperation);

  //   // Ussing previous result to continute operate
  //   if (calculator.result !== "") {
  //     console.log("Ussing previous result to continute operate");
  //     setCalculator({
  //       ...calculator,
  //       previousNumber: calculator.result,
  //       operation: inputOperation,
  //       isEqualBtnClick: false,
  //     });
  //     return;
  //   }

  //   if (calculator.previousNumber !== "") {
  //     // Compute  operation
  //     const result = computeResult();
  //     if (result === undefined) return;

  //     setCalculator({
  //       ...calculator,
  //       operation: inputOperation,
  //       result: result,
  //     });

  //     return;
  //   }
  //   // Inpui new operation
  //   setCalculator({
  //     ...calculator,
  //     previousNumber: calculator.currentNumber,
  //     currentNumber: "",
  //     operation: inputOperation,
  //   });
  // };

  // const computeResult = () => {
  //   let newCalculator = { ...calculator };
  //   let result;

  //   const resultRegex = /(0+$|\.$)/gi;

  //   // 80% + 120 = 80*0.01 + 120 = 120.8
  //   if (newCalculator.previousNumber.toString().includes("%")) {
  //     newCalculator = {
  //       ...newCalculator,
  //       previousNumber: parseFloat(newCalculator.previousNumber) * 0.01,
  //     };
  //   }

  //   if (newCalculator.currentNumber.toString().includes("%")) {
  //     if (newCalculator.previousNumber === "") {
  //       // 80% = 80*0.01 = 120.8
  //       newCalculator = {
  //         ...newCalculator,
  //         previousNumber: 1,
  //         operation: "*",
  //         currentNumber: parseFloat(newCalculator.currentNumber) * 0.01,
  //       };
  //     } else if (newCalculator.previousNumber !== "") {
  //       // 120 + 80% = 120 + 80*0.01*120 = 120.8 =216
  //       newCalculator = {
  //         ...newCalculator,
  //         currentNumber:
  //           parseFloat(newCalculator.currentNumber) *
  //           0.01 *
  //           newCalculator.previousNumber,
  //       };
  //     }
  //   }

  //   const previousParseFloatNumber = parseFloat(newCalculator.previousNumber);
  //   const currentParseFloatNumber = parseFloat(newCalculator.currentNumber);

  //   if (isNaN(previousParseFloatNumber) || isNaN(currentParseFloatNumber))
  //     return;

  //   switch (newCalculator.operation) {
  //     case "+":
  //       result = previousParseFloatNumber + currentParseFloatNumber;
  //       break;
  //     case "-":
  //       result = previousParseFloatNumber - currentParseFloatNumber;
  //       break;
  //     case "*":
  //       result = previousParseFloatNumber * currentParseFloatNumber;
  //       break;
  //     case "/":
  //       result = previousParseFloatNumber / currentParseFloatNumber;
  //       break;
  //     default:
  //       return;
  //   }

  //   console.log(result);

  //   result = result.toFixed(12).toString();
  //   // remove end '0'
  //   // result = 9.012300000000 => result = 9.0123
  //   // result = 9.000000000000 => result = 9.
  //   result = result.replaceAll(resultRegex, "");

  //   // remove end '.'
  //   // result = 9.0123 => result = 9.0123
  //   // result = 9. => result = 9
  //   result = result.replaceAll(resultRegex, "");

  //   return result;
  };

  const handleClearDisplay = () => {
    console.log("handleClearDisplay");
   // setCalculator(clearCalculator());
  };

  const handleEqualClick = () => {
    console.log("handleEqualClick");
    // const result = computeResult();

    // setCalculator({
    //   ...calculator,
    //   result: result === undefined ? "" : result,
    //   isEqualBtnClick: true,
    // });
  };

  console.log(calculator);
  console.log(isNoOperation());
  console.log(calculator.result === "");
  console.log(isNoOperation() && calculator.result);
  return (
    <CalculatorPanelContainer>
      <div
        css={css`
          text-align: center;
          font-size: 20px;
          font-family: "Tahoma", sans-serif;
        `}
      >
        Calculator App
      </div>

      <div
        css={css`
          text-align: right;
          font-family: "Tahoma", sans-serif;
          font-size: 15px;
        `}
      >
        <span>{`${calculator.previousNumber}  

        ${calculator.operation}
        
        `}</span>

        <span>{`${calculator.currentNumber} `}</span>
      </div>

      <CalculatorKeys>
        {[
          { value: "C", onClick: handleClearDisplay },
          { value: "+-", onClick: handleNumberClick },
          { value: "%", onClick: handleNumberClick },
          { value: "/", onClick: handleOperationClick },
          { value: "7", onClick: handleNumberClick },
          { value: "8", onClick: handleNumberClick },
          { value: "9", onClick: handleNumberClick },
          { value: "*", onClick: handleOperationClick, content: "x" },
          { value: "4", onClick: handleNumberClick },
          { value: "5", onClick: handleNumberClick },
          { value: "6", onClick: handleNumberClick },
          { value: "-", onClick: handleOperationClick },
          { value: "1", onClick: handleNumberClick },
          { value: "2", onClick: handleNumberClick },
          { value: "3", onClick: handleNumberClick },
          { value: "+", onClick: handleOperationClick },
          {
            value: "0",
            onClick: handleNumberClick,
            style: css`
              grid-column-start: 1;
              grid-column-end: 3;
            `,
          },
          { value: ".", onClick: handleNumberClick },
          { value: "=", onClick: handleEqualClick },
        ].map((button) => (
          <ButtonKey button={button} />
        ))}
      </CalculatorKeys>
    </CalculatorPanelContainer>
  );
};

export default CalculatorPanel;
