import React from 'react';
import './Grid.css';

export default function Grid() {
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

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const cellStyle = {};
                
                // Ajouter les styles de bordure pour les lignes et colonnes centrales
                if (col === 2 || col === 5) {
                    cellStyle.borderRight = CenterRightColStyle.borderRight;
                }
                if (col === 3 || col === 6) {
                    cellStyle.borderLeft = CenterLeftColStyle.borderLeft;
                }
                if (row === 2 || row === 5) {
                    cellStyle.borderBottom = CenterBottomRowStyle.borderBottom;
                }
                if (row === 3 || row === 6) {
                    cellStyle.borderTop = CenterTopRowStyle.borderTop;
                }

                tab.push(
                    <span key={`${row}-${col}`} style={cellStyle}>
                        <input
                            className="Cell"
                            placeholder={`${row}-${col}`}
                        />
                    </span>
                );
            }
        }
        return tab;
    };

    const grid = GenerateGrid();

    return (
        <div className="GridPage">
            <h2>Sudoku</h2>
            <div className="GridBody">
                {grid}
            </div>
        </div>
    );
}
