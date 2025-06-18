import React, { useState } from "react";

/**
 * Main container for BasicCalc.
 * Provides a basic calculator with addition, subtraction, multiplication, and division,
 * responsive layout, and a simple/minimalistic user interface.
 * Uses the specified color scheme: primary (#4CAF50), secondary (#FFC107), accent (#2196F3).
 *
 * PUBLIC_INTERFACE
 */
function BasicCalc() {
  // State for display value, held operand, pending operation, and flag for resetting input after op
  const [display, setDisplay] = useState("0");
  const [firstOperand, setFirstOperand] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  // Handle digit (0-9) and '.' button press
  // PUBLIC_INTERFACE
  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(digit === "." ? "0." : digit);
      setWaitingForOperand(false);
    } else {
      // Prevent multiple leading zeros, and only one decimal point
      if (digit === "." && display.includes(".")) return;
      if (display === "0" && digit !== ".") {
        setDisplay(digit);
      } else {
        setDisplay(display + digit);
      }
    }
  };

  // PUBLIC_INTERFACE
  const clearAll = () => {
    setDisplay("0");
    setFirstOperand(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  // PUBLIC_INTERFACE
  const inputOperation = (op) => {
    if (operation && waitingForOperand) {
      setOperation(op);
      return;
    }

    if (firstOperand === null) {
      setFirstOperand(parseFloat(display));
    } else if (operation) {
      const result = performCalculation();
      setFirstOperand(result);
      setDisplay(String(result));
    }
    setOperation(op);
    setWaitingForOperand(true);
  };

  // Evaluate the expression
  // PUBLIC_INTERFACE
  const evaluate = () => {
    if (operation && firstOperand !== null && !waitingForOperand) {
      const result = performCalculation();
      setDisplay(String(result));
      setFirstOperand(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  // Helper: performs calculation for current op
  const performCalculation = () => {
    const a = firstOperand;
    const b = parseFloat(display);
    let result = a;

    switch (operation) {
      case "+":
        result = a + b;
        break;
      case "-":
        result = a - b;
        break;
      case "×":
        result = a * b;
        break;
      case "÷":
        result = b === 0 ? "Error" : a / b;
        break;
      default:
        break;
    }
    // Only show up to 10 digits after decimal for floats
    if (typeof result === "number" && !Number.isInteger(result)) {
      result = parseFloat(result.toFixed(10));
    }
    return result;
  };

  // PUBLIC_INTERFACE
  const inputPercent = () => {
    const num = parseFloat(display);
    setDisplay(String(num / 100));
    setFirstOperand(null);
    setOperation(null);
    setWaitingForOperand(true);
  };

  // PUBLIC_INTERFACE
  const toggleSign = () => {
    if (display === "0" || display === "Error") return;
    setDisplay(display.charAt(0) === "-" ? display.slice(1) : "-" + display);
  };

  // Calculator buttons
  const buttons = [
    [
      { label: "C", action: clearAll, type: "secondary" },
      { label: "±", action: toggleSign, type: "secondary" },
      { label: "%", action: inputPercent, type: "secondary" },
      { label: "÷", action: () => inputOperation("÷"), type: "accent" },
    ],
    [
      { label: "7", action: () => inputDigit("7") },
      { label: "8", action: () => inputDigit("8") },
      { label: "9", action: () => inputDigit("9") },
      { label: "×", action: () => inputOperation("×"), type: "accent" },
    ],
    [
      { label: "4", action: () => inputDigit("4") },
      { label: "5", action: () => inputDigit("5") },
      { label: "6", action: () => inputDigit("6") },
      { label: "-", action: () => inputOperation("-"), type: "accent" },
    ],
    [
      { label: "1", action: () => inputDigit("1") },
      { label: "2", action: () => inputDigit("2") },
      { label: "3", action: () => inputDigit("3") },
      { label: "+", action: () => inputOperation("+"), type: "accent" },
    ],
    [
      { label: "0", action: () => inputDigit("0"), wide: true },
      { label: ".", action: () => inputDigit(".") },
      { label: "=", action: evaluate, type: "primary" },
    ],
  ];

  return (
    <div className="basiccalc-root">
      <div className="basiccalc-calc-container" role="main" aria-label="calculator">
        <div className="basiccalc-display" data-testid="calc-display">
          {display}
        </div>
        <div className="basiccalc-button-panel">
          {buttons.map((row, i) => (
            <div key={i} className="basiccalc-row">
              {row.map((btn, j) => (
                <button
                  key={btn.label}
                  className={
                    "basiccalc-btn" +
                    (btn.type ? " " + "basiccalc-btn-" + btn.type : "") +
                    (btn.wide ? " basiccalc-btn-wide" : "")
                  }
                  onClick={btn.action}
                  tabIndex={0}
                  aria-label={btn.label === "÷" ? "divide" : btn.label === "×" ? "multiply" : btn.label}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Internal styles for the calculator */}
      <style>{`
        .basiccalc-root {
          min-height: 100vh;
          background: #fafbfc;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 32px 8px;
        }
        .basiccalc-calc-container {
          box-shadow: 0 4px 24px rgba(33, 150, 243, 0.11), 0 1.5px 6px rgba(76, 175, 80, 0.08);
          background: #fff;
          border-radius: 16px;
          padding: 28px 16px 18px 16px;
          display: flex;
          flex-direction: column;
          min-width: 320px;
          width: 100%;
          max-width: 350px;
        }
        .basiccalc-display {
          background: #f5f5f5;
          color: #222;
          padding: 18px 14px 12px 14px;
          font-size: 2.3rem;
          border-radius: 10px;
          box-shadow: inset 0 2px 7px rgba(33,150,243,0.045);
          margin-bottom: 17px;
          min-height: 48px;
          text-align: right;
          word-break: break-all;
          letter-spacing: 0.08em;
          font-weight: 600;
          font-family: 'Menlo', 'Consolas', 'Roboto Mono', monospace;
        }
        .basiccalc-button-panel {
          width: 100%;
        }
        .basiccalc-row {
          display: flex;
          width: 100%;
          gap: 0.6em;
          margin-bottom: 0.57em;
        }
        .basiccalc-row:last-child {
          margin-bottom: 0;
        }
        .basiccalc-btn {
          flex: 1 1 0px;
          padding: 15px 0;
          font-size: 1.28rem;
          font-weight: 500;
          border-radius: 7px;
          border: none;
          background: #e9ecef;
          color: #222;
          margin: 0;
          outline: none;
          box-shadow: 0 2px 3px rgba(33,150,243,0.045);
          cursor: pointer;
          transition: background 0.13s, box-shadow 0.14s;
          user-select: none;
        }
        .basiccalc-btn:hover, .basiccalc-btn:focus {
          background: #c0e1e6;
        }
        .basiccalc-btn-primary {
          background: #4caf50;
          color: #fff;
          box-shadow: 0 2.5px 7px rgba(76,175,80,.11);
        }
        .basiccalc-btn-primary:hover,
        .basiccalc-btn-primary:focus {
          background: #388e3c;
        }
        .basiccalc-btn-secondary {
          background: #ffc107;
          color: #725205;
        }
        .basiccalc-btn-secondary:hover,
        .basiccalc-btn-secondary:focus {
          background: #ffe082;
        }
        .basiccalc-btn-accent {
          background: #2196f3;
          color: #fff;
        }
        .basiccalc-btn-accent:hover,
        .basiccalc-btn-accent:focus {
          background: #1769aa;
        }
        .basiccalc-btn-wide {
          flex: 2.1 1 0;
        }
        @media (max-width: 480px) {
          .basiccalc-calc-container {
            min-width: unset;
            width: 100%;
            max-width: 99vw;
            padding: 10vw 3vw;
          }
          .basiccalc-display {
            font-size: 1.6rem;
            padding: 9px 6px 7px 8px;
            min-height: 33px;
          }
          .basiccalc-row {
            gap: 0.17em;
          }
          .basiccalc-btn {
            padding: 10px 0;
            font-size: 1.08rem;
          }
        }
      `}</style>
    </div>
  );
}

export default BasicCalc;
