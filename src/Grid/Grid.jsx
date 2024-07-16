import React, { useState } from 'react';
import './Grid.css';

export default function Grid() {
    const [cellValues, setCellValues] = useState({});
    const [highlightedCells, setHighlightedCells] = useState({});

    const GenerateGrid = () => {
        const tab = [];

        const CenterLeftColStyle = {
            borderLeft: '3px solid #FFFFFF',
        };
        const CenterRightColStyle = {
            borderRight: '3px solid #FFFFFF',
        };
        const CenterTopRowStyle = {
            borderTop: '3px solid #FFFFFF',
        };
        const CenterBottomRowStyle = {
            borderBottom: '3px solid #FFFFFF',
        };

        //Génération de toutes les cellules
        for (let row = 1; row < 10; row++) {
            for (let col = 1; col < 10; col++) {
                const dataKey = `${row}-${col}`;
                const isHighlighted = highlightedCells[dataKey] || false;
                const cellStyle = {
                    backgroundColor: isHighlighted ? "#FF444444" : "#000000",
                    color: "#FFFFFF",
                    padding: 0,
                    margin: 0,
                    fontSize: "25px",
                    border: "1px solid #FFFFFF",
                    textAlign: "center"
                };

                //Délimitation des carré 3x3
                if (col === 3 || col === 6) {
                    cellStyle.borderRight = CenterRightColStyle.borderRight;
                }
                if (col === 4 || col === 7) {
                    cellStyle.borderLeft = CenterLeftColStyle.borderLeft;
                }
                if (row === 3 || row === 6) {
                    cellStyle.borderBottom = CenterBottomRowStyle.borderBottom;
                }
                if (row === 4 || row === 7) {
                    cellStyle.borderTop = CenterTopRowStyle.borderTop;
                }

                tab.push(
                    <input
                        className={`Cell${row}-${col}`}
                        key={dataKey}
                        data-key={dataKey}
                        style={cellStyle}
                        onChange={checkRules}
                        value={cellValues[dataKey] || ''}
                        // placeholder={`${row}-${col}`}
                    />
                );
            }
        }
        return tab;
    };

    const checkRules = (event) => {
        const userInput = event.target.value;
        const dataKey = event.target.getAttribute('data-key');

        // Ignorer toutes les valeurs autres qu'un chiffre seul
        if (!/^\d?$/.test(userInput)) {
            return;
        }

        setCellValues((prevValues) => {
            const Values = { ...prevValues, [dataKey]: userInput };
            const HighlightedCells = {};

            // Fonction qui permet de déterminer la cellule haut-gauche
            const getSquareTopLeft = (row, col) => {
                const topLeftRow = Math.floor((row - 1) / 3) * 3 + 1;
                const topLeftCol = Math.floor((col - 1) / 3) * 3 + 1;
                return [topLeftRow, topLeftCol];
            };

            // Verification de tout les cellule pour doublons
            for (let row = 1; row < 10; row++) {
                for (let col = 1; col < 10; col++) {
                    const key = `${row}-${col}`;
                    const value = Values[key];

                    if (value) {
                        // Vérification des lignes avec doublons
                        for (let col_ = 1; col_ < 10; col_++) {
                            const rowKey = `${row}-${col_}`;
                            if (col_ !== col && Values[rowKey] === value) {
                                for (let i = 1; i < 10; i++) {
                                    HighlightedCells[`${row}-${i}`] = true;
                                }
                            }
                        }

                        // Vérification des colonne avec doublons
                        for (let row_ = 1; row_ < 10; row_++) {
                            const colKey = `${row_}-${col}`;
                            if (row_ !== row && Values[colKey] === value) {
                                for (let i = 1; i < 10; i++) {
                                    HighlightedCells[`${i}-${col}`] = true;
                                }
                            }
                        }

                        // Vérification des carré 3x3 avec doublons
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
            <div className="GridBody">
                <div className='GridHimself'>
                    {grid}
                </div>
            </div>
        </div>
    );
}
