import React, { useState } from "react";
import "./App.css";
import { evaluate } from "mathjs";

function App() {
  const [firstNumber, setFirstNumber] = useState(0);
  const [secondNumber, setSecondNumber] = useState();
  const [active, setActive] = useState(false);
  const [result, setResult] = useState(false);
  const [cal, setCal] = useState();

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

  const handelDisable = (i) => {
    if (i === cal) {
      return true;
    } else {
      return false;
    }
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

  return (
    <div className="App">
      <div className="main">
        <div className="result">
          <p>{secondNumber}</p>
          <p>{firstNumber}</p>
        </div>
        <div className="keyboard">
          <button onClick={() => clearNumber()}>AC</button>
          <button onClick={() => cancelNumber()}>CE</button>
          <button onClick={() => handleCal("/")} disabled={handelDisable("/")}>
            /
          </button>
          <button onClick={() => handleCal("*")} disabled={handelDisable("*")}>
            *
          </button>
          <button onClick={() => handleNumber(7)}>7</button>
          <button onClick={() => handleNumber(8)}>8</button>
          <button onClick={() => handleNumber(9)}>9</button>
          <button onClick={() => handleCal("-")} disabled={handelDisable("-")}>
            -
          </button>
          <button onClick={() => handleNumber(4)}>4</button>
          <button onClick={() => handleNumber(5)}>5</button>
          <button onClick={() => handleNumber(6)}>6</button>
          <button onClick={() => handleCal("+")} disabled={handelDisable("+")}>
            +
          </button>
          <button onClick={() => handleNumber(1)}>1</button>
          <button onClick={() => handleNumber(2)}>2</button>
          <button onClick={() => handleNumber(3)}>3</button>
          <button onClick={showResult}>=</button>
          <button className="keyboard_0" onClick={() => handleNumber(0)}>
            0
          </button>
          <button onClick={() => handleNumber(".")}>.</button>
        </div>
      </div>
    </div>
  );
}

export default App;
