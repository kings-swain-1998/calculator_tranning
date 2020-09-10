import React, { useState } from "react";
import "./App.css";
import { evaluate, re } from "mathjs";

function App() {
  const [firstNumber, setFirstNumber] = useState(0);
  const [secondNumber, setSecondNumber] = useState();
  const [active, setActive] = useState(false);
  const [result, setResult] = useState(false);
  const [cal, setCal] = useState();
  const number = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, "."];
  const calculation = ["/", "*", "-", "+"];

  const handleCal = (i) => {
    if (firstNumber.length > 1) {
      if (
        firstNumber.substr(firstNumber.length - 1) === "+" ||
        firstNumber.substr(firstNumber.length - 1) === "-" ||
        firstNumber.substr(firstNumber.length - 1) === "*" ||
        firstNumber.substr(firstNumber.length - 1) === "/"
      ) {
        if (firstNumber.substr(firstNumber.length - 1) !== i) {
          const number = firstNumber;
          const newNumber = number.split("");
          newNumber.pop();
          newNumber.push(i);
          setFirstNumber(newNumber.join(""));
          setResult(false);
        }
      } else {
        setFirstNumber(firstNumber + i);
        setResult(false);
      }
    } else {
      setFirstNumber(firstNumber + i);
      setResult(false);
    }
  };

  const handleNumber = (num) => {
    if (result === false) {
      if (firstNumber === 0) {
        setFirstNumber(num);
      } else {
        setFirstNumber(firstNumber + "" + num);
      }
    }
  };
  const clearNumber = () => {
    setFirstNumber(0);
    setActive(false);
    setCal("");
    setSecondNumber();
    setResult(false);
  };

  const showResult = () => {
    setSecondNumber(firstNumber);
    setFirstNumber(evaluate(firstNumber));
    setResult(true);
    if (evaluate(firstNumber) === Infinity) {
      setFirstNumber(0);
    }
  };

  const cancelNumber = () => {
    if (result === false && firstNumber !== 0) {
      let arrNumber = firstNumber.toString().split("");
      arrNumber.splice(arrNumber.length - 1, 1);
      setFirstNumber(arrNumber.join(""));
      console.log(arrNumber);
      if (arrNumber.length === 0) {
        setFirstNumber(0);
      }
    }
  };

  const showNumber = () => {
    return number.map((numberItem, i) => {
      return numberItem === 0 ? (
        <button
          className="keyboard_0"
          onClick={() => handleNumber(numberItem)}
          key={i}
        >
          {numberItem}
        </button>
      ) : (
        <button
          className="keyboard__number-btn"
          onClick={() => handleNumber(numberItem)}
          key={i}
        >
          {numberItem}
        </button>
      );
    });
  };

  const showCalculation = () => {
    return calculation.map((item, i) => {
      return <button onClick={() => handleCal(item)}>{item}</button>;
    });
  };

  return (
    <div className="App">
      <div className="main">
        <div className="result">
          <p>{secondNumber}</p>
          <p>{firstNumber}</p>
        </div>
        <div className="keyboard">
          <div className="keyboard__number">{showNumber()}</div>
          <button onClick={() => clearNumber()}>AC</button>
          <button onClick={() => cancelNumber()}>CE</button>
          <div className="keyboard__main">
            {showCalculation()}
            <button onClick={showResult}>=</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
