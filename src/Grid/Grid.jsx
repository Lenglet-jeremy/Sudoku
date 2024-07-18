import React, { useState, useEffect } from 'react';
import './Grid.css';

export default function Grid() {
    // Définir plusieurs grilles de départ
    const patterns = [
        {
            // Pattern 1
            '1-1': '5', '1-2': '3', '1-5': '7',
            '2-1': '6', '2-4': '1', '2-5': '9', '2-6': '5',
            '3-2': '9', '3-3': '8', '3-8': '6',
            '4-1': '8', '4-5': '6', '4-9': '3',
            '5-1': '4', '5-4': '8', '5-6': '3', '5-9': '1',
            '6-1': '7', '6-5': '2', '6-9': '6',
            '7-2': '6', '7-7': '2', '7-8': '8',
            '8-4': '4', '8-5': '1', '8-6': '9', '8-9': '5',
            '9-5': '8', '9-8': '7', '9-9': '9'
            // Solution 1
            // 5 3 4 | 6 7 8 | 9 1 2
            // 6 7 2 | 1 9 5 | 3 4 8
            // 1 9 8 | 3 4 2 | 5 6 7
            // ---------------------
            // 8 5 9 | 7 6 1 | 4 2 3
            // 4 2 6 | 8 5 3 | 7 9 1
            // 7 1 3 | 9 2 4 | 8 5 6
            // ---------------------
            // 9 6 1 | 5 3 7 | 2 8 4
            // 2 8 7 | 4 1 9 | 6 3 5
            // 3 4 5 | 2 8 6 | 1 7 9


        },
        // {

        // },
        // {

        // }
    ];
    

    const [cellValues, setCellValues] = useState({});
    const [highlightedCells, setHighlightedCells] = useState({});
    const [initialValues, setInitialValues] = useState({});

    useEffect(() => {
        // Sélectionner un pattern aléatoire
        const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
        setCellValues(randomPattern);
        setInitialValues(randomPattern);
    }, []);

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

        // Génération de toutes les cellules
        for (let row = 1; row < 10; row++) {
            for (let col = 1; col < 10; col++) {
                const dataKey = `${row}-${col}`;
                const isHighlighted = highlightedCells[dataKey] || false;
                const initialValueStyle = {
                    backgroundColor: isHighlighted ? "#FF444444" : "#000000",
                    color: "#AAAAAA",
                    padding: 0,
                    margin: 0,
                    fontSize: "20px",
                    // border: "1px solid #FFFFFF",
                    textAlign: "center"
                }
                const cellStyle = {
                    backgroundColor: isHighlighted ? "#FF444444" : "#000000",
                    color: "#FFFFFF",
                    padding: 0,
                    margin: 0,
                    fontSize: "20px",
                    // border: "1px solid #FFFFFF",
                    textAlign: "center"
                };

                // Délimitation des carrés 3x3
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

                // Vérifiez si la cellule a une valeur initiale et la rendre non modifiable
                const isInitialValue = initialValues[dataKey] !== undefined;

                tab.push(
                    <input
                        key={dataKey}
                        className={`Cell${row}-${col}`}
                        data-key={dataKey}
                        style={ isInitialValue ? initialValueStyle : cellStyle}
                        onChange={isInitialValue ? undefined : checkRules}
                        value={cellValues[dataKey] || ''}
                        readOnly={isInitialValue}
                        
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

            // Vérification de toutes les cellules pour doublons
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

                        // Vérification des colonnes avec doublons
                        for (let row_ = 1; row_ < 10; row_++) {
                            const colKey = `${row_}-${col}`;
                            if (row_ !== row && Values[colKey] === value) {
                                for (let i = 1; i < 10; i++) {
                                    HighlightedCells[`${i}-${col}`] = true;
                                }
                            }
                        }

                        // Vérification des carrés 3x3 avec doublons
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
