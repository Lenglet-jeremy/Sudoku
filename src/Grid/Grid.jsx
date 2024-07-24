import React, { useState, useEffect, useRef } from 'react';
import './Grid.css';

const patterns = [
    {
        // 985 321 764
        // 621 748 539
        // 374 956 281
        //
        // 132 564 978
        // 846 297 315
        // 759 813 426
        //
        // 417 639 852
        // 263 485 197
        // 598 172 643
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
        // 472 986 351
        // 851 743 629
        // 693 521 874
        //
        // 538 217 946
        // 926 458 137
        // 714 369 285
        //
        // 369 875 412
        // 147 632 598
        // 285 194 763
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
        // 152 879 463
        // 436 251 798
        // 987 364 512
        // 
        // 528 197 346
        // 349 526 187
        // 761 438 259
        // 
        // 214 683 975
        // 873 915 624
        // 695 742 831
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

const solutions = [
    {
        '1-1': '9', '1-2': '8', '1-3': '5', '1-4': '3', '1-5': '2', '1-6': '1', '1-7': '7', '1-8': '6', '1-9': '4',
        '2-1': '6', '2-2': '2', '2-3': '1', '2-4': '7', '2-5': '4', '2-6': '8', '2-7': '5', '2-8': '3', '2-9': '9',
        '3-1': '3', '3-2': '7', '3-3': '4', '3-4': '9', '3-5': '5', '3-6': '6', '3-7': '2', '3-8': '8', '3-9': '1',

        '4-1': '1', '4-2': '3', '4-3': '2', '4-4': '5', '4-5': '6', '4-6': '4', '4-7': '9', '4-8': '7', '4-9': '8',
        '5-1': '8', '5-2': '4', '5-3': '6', '5-4': '2', '5-5': '9', '5-6': '7', '5-7': '3', '5-8': '1', '5-9': '5',
        '6-1': '7', '6-2': '5', '6-3': '9', '6-4': '8', '6-5': '1', '6-6': '3', '6-7': '4', '6-8': '2', '6-9': '6',

        '7-1': '4', '7-2': '1', '7-3': '7', '7-4': '6', '7-5': '3', '7-6': '9', '7-7': '8', '7-8': '5', '7-9': '2',
        '8-1': '2', '8-2': '6', '8-3': '3', '8-4': '4', '8-5': '8', '8-6': '5', '8-7': '1', '8-8': '9', '8-9': '7',
        '9-1': '5', '9-2': '9', '9-3': '8', '9-4': '1', '9-5': '7', '9-6': '2', '9-7': '6', '9-8': '4', '9-9': '3'
    },
    {
        '1-1': '4', '1-2': '7', '1-3': '2', '1-4': '9', '1-5': '8', '1-6': '6', '1-7': '3', '1-8': '5', '1-9': '1',
        '2-1': '8', '2-2': '5', '2-3': '1', '2-4': '7', '2-5': '4', '2-6': '3', '2-7': '6', '2-8': '2', '2-9': '9',
        '3-1': '6', '3-2': '9', '3-3': '3', '3-4': '5', '3-5': '2', '3-6': '1', '3-7': '8', '3-8': '7', '3-9': '4',

        '4-1': '5', '4-2': '3', '4-3': '8', '4-4': '2', '4-5': '1', '4-6': '7', '4-7': '9', '4-8': '6', '4-9': '4',
        '5-1': '9', '5-2': '2', '5-3': '6', '5-4': '4', '5-5': '5', '5-6': '8', '5-7': '1', '5-8': '3', '5-9': '7',
        '6-1': '7', '6-2': '1', '6-3': '4', '6-4': '3', '6-5': '6', '6-6': '9', '6-7': '2', '6-8': '8', '6-9': '5',

        '7-1': '3', '7-2': '6', '7-3': '9', '7-4': '8', '7-5': '7', '7-6': '5', '7-7': '4', '7-8': '1', '7-9': '2',
        '8-1': '1', '8-2': '4', '8-3': '7', '8-4': '6', '8-5': '3', '8-6': '2', '8-7': '5', '8-8': '9', '8-9': '8',
        '9-1': '2', '9-2': '8', '9-3': '5', '9-4': '1', '9-5': '9', '9-6': '4', '9-7': '7', '9-8': '6', '9-9': '3'
    },
    {
        '1-1': '1', '1-2': '5', '1-3': '2', '1-4': '8', '1-5': '7', '1-6': '9', '1-7': '4', '1-8': '6', '1-9': '3',
        '2-1': '4', '2-2': '3', '2-3': '6', '2-4': '2', '2-5': '5', '2-6': '1', '2-7': '7', '2-8': '9', '2-9': '8',
        '3-1': '9', '3-2': '8', '3-3': '7', '3-4': '3', '3-5': '6', '3-6': '4', '3-7': '5', '3-8': '1', '3-9': '2',

        '4-1': '5', '4-2': '2', '4-3': '8', '4-4': '1', '4-5': '9', '4-6': '7', '4-7': '3', '4-8': '4', '4-9': '6',
        '5-1': '3', '5-2': '4', '5-3': '9', '5-4': '5', '5-5': '2', '5-6': '6', '5-7': '1', '5-8': '8', '5-9': '7',
        '6-1': '7', '6-2': '6', '6-3': '1', '6-4': '4', '6-5': '3', '6-6': '8', '6-7': '2', '6-8': '5', '6-9': '9',

        '7-1': '2', '7-2': '1', '7-3': '4', '7-4': '6', '7-5': '8', '7-6': '3', '7-7': '9', '7-8': '7', '7-9': '5',
        '8-1': '8', '8-2': '7', '8-3': '3', '8-4': '9', '8-5': '1', '8-6': '5', '8-7': '6', '8-8': '2', '8-9': '4',
        '9-1': '6', '9-2': '9', '9-3': '5', '9-4': '7', '9-5': '4', '9-6': '2', '9-7': '8', '9-8': '3', '9-9': '1'
    }
];

export default function Grid() {
    const [cellValues, setCellValues] = useState({});
    const [highlightedCells, setHighlightedCells] = useState({});
    const [initialValues, setInitialValues] = useState({});
    const [time, setTime] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const timerRef = useRef(null);  // Utiliser useRef pour stocker l'intervalle du timer
    const [patternIndex, setPatternIndex] = useState(0);

    useEffect(() => {
        loadPattern(patternIndex);

        startTimer();

        return () => stopTimer(); // Arrêter le timer lors du démontage du composant
    }, [patternIndex]);

    useEffect(() => {
        if (isCompleted) {
            stopTimer();
        }
    }, [isCompleted]);

    const startTimer = () => {
        if (timerRef.current) return;  // Éviter de démarrer un nouveau timer si un timer existe déjà
        timerRef.current = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
        }, 1000);
    };

    const stopTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    const resetTimer = () => {
        stopTimer();
        setTime(0);
        startTimer();
    };

    const loadPattern = (index) => {
        const selectedPattern = patterns[index];
        setPatternIndex(index);
        setCellValues(selectedPattern);
        setInitialValues(selectedPattern);
        setHighlightedCells({});
        setIsCompleted(false);
        resetTimer();  // Réinitialiser le timer lorsque le motif change
    };

    const loadSolution = (index) => {
        const selectedSolution = solutions[index];
        setCellValues(selectedSolution);
        setHighlightedCells({});
        setIsCompleted(true);
        stopTimer();  // Arrêter le timer lorsqu'on affiche la solution
    };

    const confirmAction = (message, action) => {
        if (window.confirm(message)) {
            action();
        }
    };

    const generateCellStyle = (isHighlighted, isInitialValue) => ({
        backgroundColor: isHighlighted ? "var(--highlighted-cell-color)" : "#000000",
        color: isInitialValue ? "var(--initial-value-color)" : "var(--text-color)",
        padding: 0,
        margin: 0,
        fontSize: "25px",
        textAlign: "center",
        boxSizing: "border-box"
    });

    const GenerateGrid = () => {
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
                        onChange={isInitialValue ? undefined : checkRules}
                        value={cellValues[dataKey] || ''}
                        readOnly={isInitialValue}
                        inputMode="numeric"
                    />
                );
            }
        }
        return tab;
    };

    const checkRules = (event) => {
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

            if (userInput) {
                const [inputRow, inputCol] = dataKey.split('-').map(Number);

                for (let col = 1; col < 10; col++) {
                    const rowKey = `${inputRow}-${col}`;
                    if (Values[rowKey] === userInput && rowKey !== dataKey) {
                        HighlightedCells[rowKey] = true;
                        HighlightedCells[dataKey] = true;
                    }
                }

                for (let row = 1; row < 10; row++) {
                    const colKey = `${row}-${inputCol}`;
                    if (Values[colKey] === userInput && colKey !== dataKey) {
                        HighlightedCells[colKey] = true;
                        HighlightedCells[dataKey] = true;
                    }
                }

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

    const checkCompletion = (values) => {
        const isComplete = Object.keys(values).length === 81 && !Object.values(values).includes('');
        if (isComplete) {
            const sound = document.getElementById("completion-sound");
            sound.play();
        }
        setIsCompleted(isComplete);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const grid = GenerateGrid();

    return (
        <div className="GridPage">
            <audio id="completion-sound" src="../../win.wav"></audio>
            <div className='SudokuArea'>
                <div className='Title'>
                    <h2>Sudoku</h2>
                    <div className="Timer700">
                        {formatTime(time)}
                    </div>
                </div>
                <div className='GlobaleGrid'>
                    <div className="GridControls">
                        <div className='Left'>
                            <button onClick={() => confirmAction("Êtes-vous sûr de vouloir changer de difficulté ?", () => loadPattern(0))}>Facile</button>
                            <button onClick={() => confirmAction("Êtes-vous sûr de vouloir changer de difficulté ?", () => loadPattern(1))}>Moyen</button>
                            <button onClick={() => confirmAction("Êtes-vous sûr de vouloir changer de difficulté ?", () => loadPattern(2))}>Difficile</button>
                        </div>
                        <div className='Right'>
                            <button onClick={() => confirmAction("Êtes-vous sûr de vouloir afficher la solution ?", () => loadSolution(patternIndex))}>Solution</button>
                        </div>
                        <div className="Timer701">
                            {formatTime(time)}
                        </div>
                    </div>
                    <div className="GridBody">
                        <div className='GridHimself'>
                            {grid}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}