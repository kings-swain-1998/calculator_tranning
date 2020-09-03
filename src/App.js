import React, { useState } from "react";
import "./App.css";
import { evaluate } from "mathjs";

function App() {
  const [firstNumber, setFirstNumber] = useState(0);
  const [secondNumber, setSecondNumber] = useState(0);
  const [active, setActive] = useState(false);
  const [result, setResult] = useState(0);
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
        }
      } else {
        setFirstNumber(firstNumber + i);
      }
    } else {
      setFirstNumber(firstNumber + i);
    }
  };

  const handleNumber = (num) => {
    if (firstNumber === 0) {
      setFirstNumber(num);
    } else {
      setFirstNumber(firstNumber + "" + num);
    }
  };
  const clearNumber = () => {
    setFirstNumber(0);
    setActive(false);
    setCal("");
  };

  const handelDisable = (i) => {
    if (i === cal) {
      return true;
    } else {
      return false;
    }
  };

  const showResult = () => {
    console.log(evaluate(firstNumber));
    setSecondNumber(firstNumber);
    setFirstNumber(evaluate(firstNumber));
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
          <button>CE</button>
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
          <button onClick={() => handleCal(".")}>.</button>
        </div>
      </div>
    </div>
  );
}

export default App;
