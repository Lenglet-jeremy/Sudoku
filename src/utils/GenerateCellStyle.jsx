// src/utils/generateCellStyle.js

export const generateCellStyle = (isHighlighted, isInitialValue) => ({
    backgroundColor: isHighlighted ? "var(--highlighted-cell-color)" : "#000000",
    color: isInitialValue ? "var(--initial-value-color)" : "var(--text-color)",
    padding: 0,
    margin: 0,
    fontSize: "25px",
    textAlign: "center",
    boxSizing: "border-box"
});
