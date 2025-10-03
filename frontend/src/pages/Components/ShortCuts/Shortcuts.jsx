import "./Shortcuts.css";
import { useState } from "react";
const Shortcuts = ({ appear , setAppear }) => {
  function close(){
    setAppear(false);
  }
  return (
    <div
      className="shortcut-info-window"
      style={{ display: appear ? "inline" : "none" }}
    >
      <div className="shortcut-info-container">
        <div className="shortcut-info-title">
          <span className="shortcut-title">Shortcuts</span>{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="cancel-btn"
            onClick={ close }
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <div className="shortcut-info-list">
          <table>
            <thead>
              <tr>
                <th>Shortcut Key</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>Shift + Enter</code></td>
                <td><code>Add a new line</code></td>
              </tr>
              <tr>
                <td><code>Enter</code></td>
                <td><code>Send the message</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Shortcuts;
