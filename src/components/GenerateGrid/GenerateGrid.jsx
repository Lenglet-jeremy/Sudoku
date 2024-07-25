// src/components/GenerateGrid/GenerateGrid.jsx

import React from 'react';
import { generateCellStyle } from '../../utils/GenerateCellStyle';

const GenerateGrid = ({ cellValues, initialValues, highlightedCells, checkRules, setCellValues, setHighlightedCells, checkCompletion, setIsCompleted }) => {
    const tab = [];

    for (let row = 1; row < 10; row++) {
        for (let col = 1; col < 10; col++) {
            const dataKey = `${row}-${col}`;
            const isHighlighted = highlightedCells[dataKey] || false;
            const isInitialValue = initialValues[dataKey] !== undefined;
            let cellClassName = '';

            if (col === 3 || col === 6) cellClassName += 'thick-border-right ';
            if (col === 4 || col === 7) cellClassName += 'thick-border-left ';
            if (row === 3 || row === 6) cellClassName += 'thick-border-bottom ';
            if (row === 4 || row === 7) cellClassName += 'thick-border-top ';

            tab.push(
                <input
                    key={dataKey}
                    className={`Cell${row}-${col} ${cellClassName}`}
                    data-key={dataKey}
                    style={generateCellStyle(isHighlighted, isInitialValue)}
                    onChange={isInitialValue ? undefined : (event) => checkRules(event, setCellValues, setHighlightedCells, checkCompletion, setIsCompleted)}
                    value={cellValues[dataKey] || ''}
                    readOnly={isInitialValue}
                    inputMode="numeric"
                />
            );
        }
    }
    return tab;
};

export default GenerateGrid;
