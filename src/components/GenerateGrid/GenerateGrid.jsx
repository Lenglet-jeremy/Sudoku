// ./src/components/GenerateGrid/GenerateGrid.jsx

import React from 'react';
import { generateCellStyle } from '../../utils/GenerateCellStyle';

const GenerateGrid = ({
    cellValues,
    initialValues,
    highlightedCells,
    checkRules,
    setCellValues,
    setHighlightedCells,
    checkCompletion,
    setIsCompleted,
    setSelectedCell,
    selectedCell
}) => {
    const tab = [];

    for (let row = 1; row < 10; row++) {
        for (let col = 1; col < 10; col++) {
            const dataKey = `${row}-${col}`;
            const isHighlighted = highlightedCells[dataKey] || false;
            const isInitialValue = initialValues[dataKey] !== undefined;
            let cellClassName = '';
            const isSelected = selectedCell?.row === row && selectedCell?.col === col;

            if (col === 3 || col === 6) cellClassName += 'thick-border-right ';
            if (col === 4 || col === 7) cellClassName += 'thick-border-left ';
            if (row === 3 || row === 6) cellClassName += 'thick-border-bottom ';
            if (row === 4 || row === 7) cellClassName += 'thick-border-top ';

            if (isSelected) {
                cellClassName += ' selected-cell ';
            }

            tab.push(
                <input
                    key={dataKey}
                    className={`Cell${row}-${col} ${cellClassName}`}
                    data-key={dataKey}
                    style={generateCellStyle(isHighlighted, isInitialValue)}
                    onClick={() => setSelectedCell({ row, col })}
                    onChange={isInitialValue ? undefined : (event) => {
                        const newValues = { ...cellValues, [dataKey]: event.target.value };
                        const isValid = checkRules(newValues);
                        setHighlightedCells(isValid ? {} : { [dataKey]: true });
                        const completed = checkCompletion(newValues);
                        setIsCompleted(completed);
                        setCellValues(newValues);
                    }}
                    
                                        value={cellValues[dataKey] || ''}
                    readOnly={isInitialValue}
                />
            );
        }
    }

    return tab;
};

export default GenerateGrid;
