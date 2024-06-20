import React, { useState } from "react";
import Display from "./Display";
import Button from "./Button";
import "./Calculator.css";

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState("0");
  const [operator, setOperator] = useState(null);
  const [firstOperand, setFirstOperand] = useState(null);
  const [isWaitingForSecondOperand, setIsWaitingForSecondOperand] = useState(false);

  const handleButtonClick = (label) => {
    if (["+", "-", "*", "/", "sin", "cos", "tan", "sinh", "cosh", "tanh", "ln", "log10", "x^2", "x^3", "x^y", "e^x", "10^x", "2√x", "3√x", "y√x", "π"].includes(label)) {
      handleSpecialFunctionClick(label);
      return;
    }

    switch (label) {
      case "C":
        setDisplayValue("0");
        setOperator(null);
        setFirstOperand(null);
        setIsWaitingForSecondOperand(false);
        break;
      case "=":
        if (operator && firstOperand !== null) {
          const secondOperand = parseFloat(displayValue);
          const result = performCalculation(operator, firstOperand, secondOperand);
          setDisplayValue(result.toString());
          setFirstOperand(result);
          setOperator(null);
          setIsWaitingForSecondOperand(false);
        }
        break;
      case "+/-":
        setDisplayValue((prev) =>
          prev.charAt(0) === "-" ? prev.slice(1) : `-${prev}`
        );
        break;
      case ".":
        if (!displayValue.includes(".")) {
          setDisplayValue(displayValue + ".");
        }
        break;
      case "x!":
        handleFactorial();
        break;
      default:
        if (isWaitingForSecondOperand) {
          setDisplayValue(label);
          setIsWaitingForSecondOperand(false);
        } else {
          setDisplayValue((prev) => (prev === "0" ? label : prev + label));
        }
    }
  };

  const handleSpecialFunctionClick = (label) => {
    const currentInput = parseFloat(displayValue);

    switch (label) {
      case "sin":
        setDisplayValue(Math.sin(currentInput).toString());
        break;
      case "cos":
        setDisplayValue(Math.cos(currentInput).toString());
        break;
      case "tan":
        setDisplayValue(Math.tan(currentInput).toString());
        break;
      case "sinh":
        setDisplayValue(Math.sinh(currentInput).toString());
        break;
      case "cosh":
        setDisplayValue(Math.cosh(currentInput).toString());
        break;
      case "tanh":
        setDisplayValue(Math.tanh(currentInput).toString());
        break;
      case "ln":
        setDisplayValue(Math.log(currentInput).toString());
        break;
      case "log10":
        setDisplayValue(Math.log10(currentInput).toString());
        break;
      case "x^2":
        setDisplayValue(Math.pow(currentInput, 2).toString());
        break;
      case "x^3":
        setDisplayValue(Math.pow(currentInput, 3).toString());
        break;
      case "x^y":
        break;
      case "e^x":
        setDisplayValue(Math.exp(currentInput).toString());
        break;
      case "10^x":
        setDisplayValue(Math.pow(10, currentInput).toString());
        break;
      case "2√x":
        setDisplayValue(Math.sqrt(currentInput).toString());
        break;
      case "3√x":
        setDisplayValue(Math.cbrt(currentInput).toString());
        break;
      case "y√x":
        break;
      case "π":
        setDisplayValue(Math.PI.toString());
        break;
      default:
        break;
    }

    setIsWaitingForSecondOperand(true); 
  };

  const handleOperatorClick = (nextOperator) => {
    const currentInput = parseFloat(displayValue);

    if (operator && isWaitingForSecondOperand) {
      setOperator(nextOperator);
      return;
    }

    if (firstOperand === null) {
      setFirstOperand(currentInput);
    } else if (operator) {
      const result = performCalculation(operator, firstOperand, currentInput);
      setDisplayValue(result.toString());
      setFirstOperand(result);
    }

    setIsWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = (operator, firstOperand, secondOperand) => {
    switch (operator) {
      case "+":
        return firstOperand + secondOperand;
      case "-":
        return firstOperand - secondOperand;
      case "*":
        return firstOperand * secondOperand;
      case "/":
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  const handleFactorial = () => {
    const number = parseFloat(displayValue);
    if (number < 0) {
      setDisplayValue("Error"); 
      return;
    }
    let result = 1;
    for (let i = 2; i <= number; i++) {
      result *= i;
    }
    setDisplayValue(result.toString());
    setIsWaitingForSecondOperand(true);
  };

  const buttons = [
    '(', ')', 'mc', 'm+', 'm-', 'mr', 'C', '+/-', '%', '/',
    '2nd', 'x^2', 'x^3', 'x^y', 'e^x', '10^x', '7', '8', '9', '*',
    '1/x', '2√x', '3√x', 'y√x', 'ln', 'log10', '4', '5', '6', '-',
    'x!', 'sin', 'cos', 'tan','e', 'EE', '1', '2', '3', '+',
    'Rad', 'sinh', 'cosh', 'tanh', 'π', 'Rand', '0', '.', '='
  ];

  function getTheClassName(label) {
    let className = "";
  
    if (["+", "-", "*", "/"].includes(label)) {
      className += "operator yellow";
    }
  
    switch (label) {
      case "C":
        className += "clear"; 
        break;
      case "+/-":
        className += "plus-minus";
        break;
      case "0":
        className += "zero number";
        break;
      case "Rad":
        className += "rad-btm-lgt";
        break;
      case "=":
        className += "eql-btm-rgt yellow operator";
        break;
      default:
        if (!isNaN(label) || label === ".") {
          className += "number";
        }
        break;
    }
    return className;
  }

  return (
    <div className="calculator">
      <div className="dots">
        <div className="dot red"></div>
        <div className="dot yellow"></div>
        <div className="dot green"></div>
      </div>
      <Display value={displayValue} />
      <div className="buttons">
        {buttons.map((label, index) => (
          <Button
            key={index}
            label={label}
            className={getTheClassName(label)}
            onClick={handleButtonClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
