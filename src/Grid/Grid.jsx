import React, { useState } from 'react';
import './Grid.css';

export default function Grid() {
    const [showError, setShowError] = useState(false);

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

        for (let row = 1; row < 10; row++) {
            for (let col = 1; col < 10; col++) {
                const cellStyle = {};
                
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

                tab.push(<input className="Cell"
                                key={`${row}-${col}`}
                                data-key={`${row}-${col}`} 
                                style={cellStyle}
                                onChange={checkRules}
                                placeholder={`${row}-${col}`
                            }/>
                );
            }
        }
        return tab;
    };

    const checkRules = (event) => {
        const userInput = event.target.value;
        const dataKey = event.target.getAttribute('data-key');

        console.log(`Data-key: ${dataKey}, User Input: ${userInput}`); 

        if (isNaN(userInput)) {
            setShowError(true);
        } else {
            setShowError(false);
        }
    }

    const grid = GenerateGrid();

    return (
        <div className="GridPage">
            <h2>Sudoku</h2>
            <p className='inputError' style={{ display: showError ? 'block' : 'none' }}>
                Ta saisie est à l'image des Ornithorynques. Incohérent !
            </p>
            <div className="GridBody">
                <div className='GridHimself'>
                    {grid}
                </div>
                <img src="ornithorynque.webp" alt="ornithorynque" className='Ornithorynque' style={{ display: showError ? 'block' : 'none' }}/>
            </div>
        </div>
    );
}
