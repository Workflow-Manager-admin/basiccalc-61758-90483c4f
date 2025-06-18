import React, { useState } from "react";

/**
 * Main container for BasicCalc.
 * PUBLIC_INTERFACE
 * Lightweight, modern, single-mode calculator UI—no edit mode, only basic arithmetic operations.
 */
function BasicCalc() {
  // Calculator state
  const [display, setDisplay] = useState("0");
  const [firstOperand, setFirstOperand] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  // PUBLIC_INTERFACE
  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(digit === "." ? "0." : digit);
      setWaitingForOperand(false);
    } else {
      // Prevent duplicate decimal, leading zeros
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

  // Calculation helper
  const performCalculation = () => {
    const a = firstOperand;
    const b = parseFloat(display);
    let result = a;
    switch (operation) {
      case "+":
        result = a + b; break;
      case "-":
        result = a - b; break;
      case "×":
        result = a * b; break;
      case "÷":
        result = b === 0 ? "Error" : a / b; break;
      default: break;
    }
    // Limit decimals for float display
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

  // Button grid description
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

  // Color scheme
  const theme = {
    primary: "#4CAF50",
    secondary: "#FFC107",
    accent: "#2196F3",
    text: "#11181C",
    background: "#FAFBFC",
    surface: "#fff",
    white: "#fff",
    shadowStrong: "0 8px 32px rgba(33, 150, 243, 0.21), 0 3px 12px rgba(76, 175, 80, 0.13)",
    shadowSoft: "0 2px 7px rgba(33,150,243,0.06)",
    borderRadius: "20px",
    btnRadius: "14px",
    focusRing: "#1769aa33",
    buttonFlatShadow: "0 2px 5px rgba(76,175,80,.06)",
  };

  return (
    <div className="basiccalc-ui-root" style={{
      minHeight: '100vh',
      background: theme.background,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '32px 0',
      transition: 'background 0.28s'
    }}>
      <div
        className="basiccalc-modern-container"
        role="main"
        aria-label="calculator"
        style={{
          background: theme.surface,
          borderRadius: theme.borderRadius,
          boxShadow: theme.shadowStrong,
          minWidth: 312,
          maxWidth: 375,
          width: '100%',
          padding: '38px 20px 26px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
          alignItems: 'stretch',
          transition: 'box-shadow 0.22s cubic-bezier(.4,0,.2,1)'
        }}
      >
        {/* Display */}
        <div
          className="basiccalc-modern-display"
          data-testid="calc-display"
          style={{
            background: "#F7F8FA",
            color: display === "Error" ? "#F44336" : theme.text,
            borderRadius: "12px",
            fontSize: '2.5rem',
            fontFamily: 'Menlo, Consolas, Roboto Mono, monospace',
            padding: '24px 18px 12px 15px',
            minHeight: 60,
            fontWeight: 700,
            letterSpacing: ".09em",
            boxShadow: theme.shadowSoft + ',inset 0 2px 9px rgba(33,150,243,.07)',
            textAlign: 'right',
            marginBottom: 6,
            wordBreak: 'break-all',
            transition: 'color 0.17s'
          }}
        >
          <span
            style={{
              opacity: display === "Error" ? 0.8 : 1,
              fontWeight: display === "Error" ? 800 : 700
            }}>
            {display}
          </span>
        </div>

        {/* Button Panel */}
        <div className="basiccalc-modern-buttons" style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.74em',
        }}>
          {buttons.map((row, i) => (
            <div key={i} className="basiccalc-row" style={{
              display: 'flex',
              gap: '0.74em'
            }}>
              {row.map((btn, j) => {
                let style = {
                  flex: btn.wide ? 2.2 : 1,
                  border: 'none',
                  outline: 'none',
                  borderRadius: theme.btnRadius,
                  padding: btn.wide ? "16px 0" : "16px 0",
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  fontFamily: "'Inter', 'Roboto', 'Arial', sans-serif",
                  background: '#F2F4F7',
                  color: theme.text,
                  margin: 0,
                  cursor: 'pointer',
                  boxShadow: theme.buttonFlatShadow,
                  userSelect: 'none',
                  transition: 'background 0.16s, box-shadow 0.17s, color 0.14s',
                  position: 'relative',
                  minWidth: 0,
                };
                // Button type color
                if (btn.type === "primary") {
                  style.background = theme.primary;
                  style.color = theme.white;
                  style.boxShadow = "0 2.5px 10px rgba(76,175,80,0.11)";
                } else if (btn.type === "secondary") {
                  style.background = theme.secondary;
                  style.color = "#775205";
                  style.fontWeight = 700;
                  style.boxShadow = "0 2px 7px rgba(255,193,7,0.08)";
                } else if (btn.type === "accent") {
                  style.background = theme.accent;
                  style.color = theme.white;
                  style.boxShadow = "0 2.5px 12px rgba(33,150,243,.10)";
                }

                // Button hover/focus color (using inline or CSS :hover for fallback)
                const hoverStyle = {};
                if (btn.type === "primary") {
                  hoverStyle.background = "#388E3C";
                } else if (btn.type === "secondary") {
                  hoverStyle.background = "#FFE082";
                  hoverStyle.color = "#7d5a07";
                } else if (btn.type === "accent") {
                  hoverStyle.background = "#1769aa";
                } else {
                  hoverStyle.background = "#E3EEFA";
                }
                hoverStyle.boxShadow = "0 3px 13px 0 rgba(33,150,243,0.14)";

                return (
                  <button
                    key={btn.label}
                    className={
                      "basiccalc-modern-btn"
                        + (btn.type ? " basiccalc-modern-btn-" + btn.type : "")
                        + (btn.wide ? " basiccalc-modern-btn-wide" : "")
                    }

                    onClick={btn.action}
                    tabIndex={0}
                    aria-label={
                      btn.label === "÷"
                        ? "divide"
                        : btn.label === "×"
                          ? "multiply"
                          : btn.label
                    }
                    onMouseOver={e => {
                      Object.assign(e.currentTarget.style, hoverStyle);
                    }}
                    onFocus={e => {
                      Object.assign(e.currentTarget.style, hoverStyle, {
                        boxShadow: `${hoverStyle.boxShadow}, 0 0 0 3px ${theme.focusRing}`
                      });
                    }}
                    onMouseOut={e => {
                      Object.assign(e.currentTarget.style, style);
                    }}
                    onBlur={e => {
                      Object.assign(e.currentTarget.style, style);
                    }}
                    style={style}
                  >
                    {btn.label}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        {/* Calculator Label for modern look */}
        <span style={{
          fontFamily: "'Inter','Roboto','Arial',sans-serif",
          color: "#7A869A",
          opacity: 0.70,
          textAlign: "center",
          fontSize: "1rem",
          marginTop: 18,
          fontWeight: 400,
          letterSpacing: ".1em",
          lineHeight: "1.3"
        }}>
          <span style={{ color: theme.accent, fontWeight: 600, fontSize: "1rem" }}>BASIC CALC</span>
        </span>
      </div>
      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 480px) {
          .basiccalc-modern-container {
            min-width: unset !important;
            width: 99vw !important;
            max-width: 100vw !important;
            padding: 5vw 2vw 7vw 2vw !important;
          }
          .basiccalc-modern-display {
            font-size: 1.4rem !important;
            min-height: 36px !important;
            padding: 13px 7px 7px 7px !important;
          }
          .basiccalc-modern-btn,
          .basiccalc-btn {
            padding: 11px 0 !important;
            font-size: 1.02rem !important;
          }
        }
      `}</style>
    </div>
  );
}

export default BasicCalc;
