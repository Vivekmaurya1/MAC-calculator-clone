import React, { useState } from "react";
import Display from "./Display";
import Button from "./Button";
import "./Calculator.css";

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState("0");
  const [operator, setOperator] = useState(null);
  const [firstOperand, setFirstOperand] = useState(null);
  const [isWaitingForSecondOperand, setIsWaitingForSecondOperand] = useState(false);

  // Function to handle button clicks
  const handleButtonClick = (label) => {
    if (["+", "-", "*", "÷"].includes(label)) { // Include "÷" in the check for basic operators
      handleOperatorClick(label);
      return;
    }

    switch (label) {
      case "C":
        clearDisplay();
        break;
      case "=":
        handleEqualClick();
        break;
      case "+/-":
        toggleSign();
        break;
      case ".":
        appendDecimal();
        break;
      case "x!":
        handleFactorial();
        break;
      case "sin":
      case "cos":
      case "tan":
      case "sinh":
      case "cosh":
      case "tanh":
      case "ln":
      case "log10":
      case "x^2":
      case "x^3":
      case "x^y":
      case "e^x":
      case "10^x":
      case "2√x":
      case "3√x":
      case "y√x":
      case "π":
        handleSpecialFunctionClick(label);
        break;
      default:
        appendDigitOrSymbol(label);
        break;
    }
  };

  // Function to handle basic operator clicks (+, -, *, ÷)
  const handleOperatorClick = (nextOperator) => {
    const currentInput = parseFloat(displayValue);

    switch (nextOperator) {
      case "+":
      case "-":
      case "*":
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

        setOperator(nextOperator);
        setIsWaitingForSecondOperand(true);
        break;

      case "÷": // Handle division
        handleDivideClick();
        break;

      default:
        break;
    }
  };

  // Function to handle the "=" button click for calculation
  const handleEqualClick = () => {
    if (operator && firstOperand !== null) {
      const secondOperand = parseFloat(displayValue);
      const result = performCalculation(operator, firstOperand, secondOperand);
      setDisplayValue(result.toString());
      setFirstOperand(result);
      setOperator(null);
      setIsWaitingForSecondOperand(false);
    }
  };

  // Function to perform arithmetic calculations
  const performCalculation = (op, num1, num2) => {
    switch (op) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      case "÷":
        return num1 / num2;
      default:
        return num2;
    }
  };

  // Function to clear the display and reset state
  const clearDisplay = () => {
    setDisplayValue("0");
    setOperator(null);
    setFirstOperand(null);
    setIsWaitingForSecondOperand(false);
  };

  // Function to toggle the sign (+/-) of the current input
  const toggleSign = () => {
    setDisplayValue((prev) => (prev.charAt(0) === "-" ? prev.slice(1) : `-${prev}`));
  };

  // Function to append a decimal point to the current input
  const appendDecimal = () => {
    if (!displayValue.includes(".")) {
      setDisplayValue(displayValue + ".");
    }
  };

  // Function to handle factorial calculation
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

  // Function to handle special functions (sin, cos, tan, sinh, cosh, tanh, etc.)
  const handleSpecialFunctionClick = (label) => {
    const currentInput = parseFloat(displayValue);

    switch (label) {
      case "sin":
        setDisplayValue(Math.sin((currentInput * Math.PI) / 180).toFixed(8)); // Calculate sine in degrees
        break;
      case "cos":
        setDisplayValue(Math.cos((currentInput * Math.PI) / 180).toFixed(8)); // Calculate cosine in degrees
        break;
      case "tan":
        setDisplayValue(Math.tan((currentInput * Math.PI) / 180).toFixed(8)); // Calculate tangent in degrees
        break;
      case "sinh":
        setDisplayValue(Math.sinh(currentInput).toString()); // Calculate hyperbolic sine
        break;
      case "cosh":
        setDisplayValue(Math.cosh(currentInput).toString()); // Calculate hyperbolic cosine
        break;
      case "tanh":
        setDisplayValue(Math.tanh(currentInput).toString()); // Calculate hyperbolic tangent
        break;
      case "ln":
        setDisplayValue(Math.log(currentInput).toString()); // Natural logarithm
        break;
      case "log10":
        setDisplayValue(Math.log10(currentInput).toString()); // Base 10 logarithm
        break;
      case "x^2":
        setDisplayValue(Math.pow(currentInput, 2).toString()); // Square
        break;
      case "x^3":
        setDisplayValue(Math.pow(currentInput, 3).toString()); // Cube
        break;
      case "x^y":
        // Handle power of y function if needed
        break;
      case "e^x":
        setDisplayValue(Math.exp(currentInput).toString()); // Exponential function
        break;
      case "10^x":
        setDisplayValue(Math.pow(10, currentInput).toString()); // 10 to the power of x
        break;
      case "2√x":
        setDisplayValue(Math.sqrt(currentInput).toString()); // Square root
        break;
      case "3√x":
        setDisplayValue(Math.cbrt(currentInput).toString()); // Cube root
        break;
      case "y√x":
        // Handle nth root function if needed
        break;
      case "π":
        setDisplayValue(Math.PI.toString()); // Pi value
        break;
      default:
        break;
    }

    setIsWaitingForSecondOperand(true); // Set waiting for the second operand
  };

  // Function to append digits or symbols to the current display value
  const appendDigitOrSymbol = (label) => {
    if (isWaitingForSecondOperand) {
      setDisplayValue(label);
      setIsWaitingForSecondOperand(false);
    } else {
      setDisplayValue((prev) => (prev === "0" ? label : prev + label));
    }
  };

  // Function to handle the division click
  const handleDivideClick = () => {
    const currentInput = parseFloat(displayValue);

    if (operator && isWaitingForSecondOperand) {
      // If an operator is already set and waiting for the second operand, update the operator
      setOperator("÷");
      return;
    }

    if (firstOperand === null) {
      // Set the first operand if it's not already set
      setFirstOperand(currentInput);
    } else if (operator) {
      // If both operands and operator are set, perform the calculation
      const result = performCalculation(operator, firstOperand, currentInput);
      setDisplayValue(result.toString());
      setFirstOperand(result);
    }

    // Update operator and set state for waiting for the second operand
    setOperator("÷");
    setIsWaitingForSecondOperand(true);
  };

  // List of buttons with labels
  const buttons = [
    '(', ')', 'mc', 'm+', 'm-', 'mr', 'C', '+/-', '%', '÷', // Changed '/' to '÷'
    '2nd', 'x^2', 'x^3', 'x^y', 'e^x', '10^x', '7', '8', '9', '*',
    '1/x', '2√x', '3√x', 'y√x', 'ln', 'log10', '4', '5', '6', '-',
    'x!', 'sin', 'cos', 'tan', 'e', 'EE', '1', '2', '3', '+',
    'Rad', 'sinh', 'cosh', 'tanh', 'π', 'Rand', '0', '.', '='
  ];

  // Function to determine button classes based on label
  const getButtonClassName = (label) => {
    switch (label) {
      case "C":
        return "clear";
      case "+/-":
        return "plus-minus";
      case "0":
        return "zero number";
      case "Rad":
        return "rad-btm-lgt";
      case "=":
        return "eql-btm-rgt yellow operator";
      default:
        return !isNaN(label) || label === "." ? "number" : "";
    }
  };

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
            className={getButtonClassName(label)}
            onClick={() => handleButtonClick(label)}
          />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
