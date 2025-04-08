// ./src/utils/checkRules.jsx
export const checkRules = (cellValues) => {
    const getSquareTopLeft = (row, col) => {
        const topLeftRow = Math.floor((row - 1) / 3) * 3 + 1;
        const topLeftCol = Math.floor((col - 1) / 3) * 3 + 1;
        return [topLeftRow, topLeftCol];
    };

    // Fonction pour vérifier les doublons dans les lignes, colonnes et carrés
    const checkForDuplicates = (currentValues) => {
        const highlightCells = {};

        for (let row = 1; row < 10; row++) {
            for (let col = 1; col < 10; col++) {
                const cellKey = `${row}-${col}`;
                const cellValue = currentValues[cellKey];

                if (cellValue) {
                    // Vérifier la colonne
                    for (let c = 1; c < 10; c++) {
                        const rowKey = `${row}-${c}`;
                        if (currentValues[rowKey] === cellValue && rowKey !== cellKey) {
                            highlightCells[rowKey] = true;
                            highlightCells[cellKey] = true;
                        }
                    }

                    // Vérifier la ligne
                    for (let r = 1; r < 10; r++) {
                        const colKey = `${r}-${col}`;
                        if (currentValues[colKey] === cellValue && colKey !== cellKey) {
                            highlightCells[colKey] = true;
                            highlightCells[cellKey] = true;
                        }
                    }

                    // Vérifier le carré 3x3
                    const [topLeftRow, topLeftCol] = getSquareTopLeft(row, col);
                    for (let i = 0; i < 3; i++) {
                        for (let j = 0; j < 3; j++) {
                            const squareKey = `${topLeftRow + i}-${topLeftCol + j}`;
                            if (currentValues[squareKey] === cellValue && squareKey !== cellKey) {
                                highlightCells[squareKey] = true;
                                highlightCells[cellKey] = true;
                            }
                        }
                    }
                }
            }
        }

        return highlightCells;
    };

    const highlightedCells = checkForDuplicates(cellValues);
    return Object.keys(highlightedCells).length === 0;
};
