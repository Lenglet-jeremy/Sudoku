// src/utils/rulesChecker.js

export const checkRules = (event, setCellValues, setHighlightedCells, checkCompletion) => {
    const userInput = event.target.value;
    const dataKey = event.target.getAttribute('data-key');

    if (!/^[1-9]?$/.test(userInput)) return;

    setCellValues((prevValues) => {
        const Values = { ...prevValues, [dataKey]: userInput };
        const HighlightedCells = {};

        const getSquareTopLeft = (row, col) => {
            const topLeftRow = Math.floor((row - 1) / 3) * 3 + 1;
            const topLeftCol = Math.floor((col - 1) / 3) * 3 + 1;
            return [topLeftRow, topLeftCol];
        };

        // Si la valeur entrée par l'utilisateur...
        if (userInput) {
            const [inputRow, inputCol] = dataKey.split('-').map(Number);

            // ... A un doublon dans sa colonne
            for (let col = 1; col < 10; col++) {
                const rowKey = `${inputRow}-${col}`;
                if (Values[rowKey] === userInput && rowKey !== dataKey) {
                    HighlightedCells[rowKey] = true;
                    HighlightedCells[dataKey] = true;
                }
            }

            // A un doublon dans sa ligne
            for (let row = 1; row < 10; row++) {
                const colKey = `${row}-${inputCol}`;
                if (Values[colKey] === userInput && colKey !== dataKey) {
                    HighlightedCells[colKey] = true;
                    HighlightedCells[dataKey] = true;
                }
            }

            // A un doublon dans sa zone 3x3
            const [topLeftRow, topLeftCol] = getSquareTopLeft(inputRow, inputCol);
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    const squareKey = `${topLeftRow + i}-${topLeftCol + j}`;
                    if (Values[squareKey] === userInput && squareKey !== dataKey) {
                        HighlightedCells[squareKey] = true;
                        HighlightedCells[dataKey] = true;
                    }
                }
            }
        }

        setHighlightedCells(HighlightedCells);
        checkCompletion(Values);

        return Values;
    });
};
