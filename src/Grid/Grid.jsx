import React, { useState, useEffect } from 'react';
import './Grid.css';

export default function Grid() {
    const patterns = [
        {
            // Pattern 1
            '1-3': '5', '1-4': '3', '1-5': '2', '1-8': '6',
            '2-3': '1', '2-7': '5', '2-8': '3',
            '3-3': '4', '3-4': '9', '3-6': '6', '3-8': '8', '3-9': '1',
            '4-2': '3', '4-4': '5', '4-6': '4', '4-8': '7', '4-9': '8',
            '5-4': '2', '5-6': '7',
            '6-1': '7', '6-2': '5', '6-4': '8', '6-6': '3', '6-8': '2',
            '7-1': '4', '7-2': '1', '7-4': '6', '7-6': '9', '7-7': '8',
            '8-2': '6', '8-3': '3', '8-7': '1',
            '9-2': '9', '9-5': '7', '9-6': '2', '9-7': '6',
        },
        {
            // Pattern 2
            '1-2': '7', '1-7': '3', '1-9': '1',
            '2-3': '1', '2-4': '7', '2-5': '4', '2-9': '9',
            '3-3': '3', '3-6': '1', '3-7': '8',
            '4-3': '8', '4-5': '1', '4-7': '9', '4-9': '6',
            '5-2': '2', '5-8': '3',
            '6-1': '7', '6-3': '4', '6-5': '6', '6-7': '2',
            '7-3': '9', '7-4': '8', '7-7': '4',
            '8-1': '1', '8-5': '3', '8-6': '2', '8-7': '5',
            '9-1': '2', '9-3': '5', '9-8': '6',
        },
        {
            // Pattern 3
            '1-3': '2', '1-6': '9',
            '2-1': '4', '2-2': '3', '2-4': '2', '2-6': '1',
            '3-3': '7', '3-4': '3', '3-6': '4', '3-8': '1',
            '4-1': '5', '4-3': '8', '4-8': '4',
            '5-4': '5', '5-6': '6',
            '6-2': '6', '6-7': '2', '6-9': '9',
            '7-2': '1', '7-4': '6', '7-6': '3', '7-7': '9',
            '8-4': '9', '8-6': '5', '8-8': '2', '8-9': '4',
            '9-4': '7', '9-7': '8',
        }
    ];

    const [cellValues, setCellValues] = useState({});
    const [highlightedCells, setHighlightedCells] = useState({});
    const [initialValues, setInitialValues] = useState({});

    const loadPattern = (patternIndex) => {
        const selectedPattern = patterns[patternIndex];
        setCellValues(selectedPattern);
        setInitialValues(selectedPattern);
    };

    useEffect(() => {
        loadPattern(0); 
    }, []);

    const GenerateGrid = () => {
        const tab = [];

        for (let row = 1; row < 10; row++) {
            for (let col = 1; col < 10; col++) {
                const dataKey = `${row}-${col}`;
                const isHighlighted = highlightedCells[dataKey] || false;
                const isInitialValue = initialValues[dataKey] !== undefined;

                const baseCellStyle = {
                    backgroundColor: isHighlighted ? "#FF444433" : "#000000",
                    color: isInitialValue ? "#AAAAAA" : "#FFFFFF",
                    padding: 0,
                    margin: 0,
                    fontSize: "25px",
                    border: "1px solid #FFFFFF",
                    textAlign: "center",
                    boxSizing: "border-box"
                };

                let cellClassName = '';
                if (col === 3 || col === 6) {
                    cellClassName += 'thick-border-right ';
                }
                if (col === 4 || col === 7) {
                    cellClassName += 'thick-border-left ';
                }
                if (row === 3 || row === 6) {
                    cellClassName += 'thick-border-bottom ';
                }
                if (row === 4 || row === 7) {
                    cellClassName += 'thick-border-top ';
                }

                tab.push(
                    <input
                        key={dataKey}
                        className={`Cell${row}-${col} ${cellClassName}`}
                        data-key={dataKey}
                        style={baseCellStyle}
                        onChange={isInitialValue ? undefined : checkRules}
                        value={cellValues[dataKey] || ''}
                        readOnly={isInitialValue}
                        inputmode="numeric"
                    />
                );
            }
        }
        return tab;
    };

    const checkRules = (event) => {
        const userInput = event.target.value;
        const dataKey = event.target.getAttribute('data-key');

        if (!/^\d?$/.test(userInput)) {
            return;
        }

        setCellValues((prevValues) => {
            const Values = { ...prevValues, [dataKey]: userInput };
            const HighlightedCells = {};

            const getSquareTopLeft = (row, col) => {
                const topLeftRow = Math.floor((row - 1) / 3) * 3 + 1;
                const topLeftCol = Math.floor((col - 1) / 3) * 3 + 1;
                return [topLeftRow, topLeftCol];
            };

            for (let row = 1; row < 10; row++) {
                for (let col = 1; col < 10; col++) {
                    const key = `${row}-${col}`;
                    const value = Values[key];

                    if (value) {
                        for (let col_ = 1; col_ < 10; col_++) {
                            const rowKey = `${row}-${col_}`;
                            if (col_ !== col && Values[rowKey] === value) {
                                for (let i = 1; i < 10; i++) {
                                    HighlightedCells[`${row}-${i}`] = true;
                                }
                            }
                        }

                        for (let row_ = 1; row_ < 10; row_++) {
                            const colKey = `${row_}-${col}`;
                            if (row_ !== row && Values[colKey] === value) {
                                for (let i = 1; i < 10; i++) {
                                    HighlightedCells[`${i}-${col}`] = true;
                                }
                            }
                        }

                        const [squareTopLeftRow, squareTopLeftCol] = getSquareTopLeft(row, col);
                        for (let squarerow = squareTopLeftRow; squarerow < squareTopLeftRow + 3; squarerow++) {
                            for (let squarecol = squareTopLeftCol; squarecol < squareTopLeftCol + 3; squarecol++) {
                                const squareKey = `${squarerow}-${squarecol}`;
                                if ((squarerow !== row || squarecol !== col) && Values[squareKey] === value) {
                                    for (let squarerow2 = squareTopLeftRow; squarerow2 < squareTopLeftRow + 3; squarerow2++) {
                                        for (let squarecol2 = squareTopLeftCol; squarecol2 < squareTopLeftCol + 3; squarecol2++) {
                                            HighlightedCells[`${squarerow2}-${squarecol2}`] = true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            setHighlightedCells(HighlightedCells);
            return Values;
        });
    };

    const grid = GenerateGrid();

    return (
        <div className="GridPage">
            <h2>Sudoku</h2>
            <div className="GridControls">
                <div className='Left'>
                    <button onClick={() => loadPattern(0)}>Facile</button>
                    <button onClick={() => loadPattern(1)}>Moyen</button>
                    <button onClick={() => loadPattern(2)}>Difficile</button>
                </div>
                <div className='Right'>
                    <button style={{ float: 'right' }} onClick={() => window.location.reload()}>Rafraîchir</button>
                </div>
            </div>
            <div className="GridBody">
                <div className='GridHimself'>
                    {grid}
                </div>
            </div>
        </div>
    );
}
