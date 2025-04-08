// ./src/components/Grid/Grid.jsx


import React, { useState, useEffect } from 'react';
import './Grid.css';
import '../Modal/CongratulationModal.css';
import CongratulationModal from '../Modal/CongratulationModal';
import RulesModal from '../Modal/RulesModal';

import { patterns } from "../Datas/Patterns";
import { solutions } from "../Datas/Solutions";

import { checkRules } from '../../utils/checkRules';

import { useTimer, formatTime } from '../../utils/TimerUtils';
import { checkCompletion } from '../../utils/CheckCompletion';

import GenerateGrid from '../GenerateGrid/GenerateGrid';
import NumericKeyboard from '../NumericKeyboard/NumericKeyboard';

export default function Grid() {
    const [cellValues, setCellValues] = useState({});
    const [highlightedCells, setHighlightedCells] = useState({});
    const [initialValues, setInitialValues] = useState({});
    const [time, setTime] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [patternIndex, setPatternIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
    const [isSolutionShown, setIsSolutionShown] = useState(false);
    const [selectedCell, setSelectedCell] = useState(null);

    const { startTimer, stopTimer, resetTimer } = useTimer(setTime);

    useEffect(() => {
        loadPattern(patternIndex);
        startTimer();
        return () => stopTimer();
    }, [patternIndex]);

    useEffect(() => {
        if (isCompleted && !isSolutionShown) {
            stopTimer();
            setIsModalOpen(true);
        }
    }, [isCompleted, isSolutionShown]);

    const loadPattern = (index) => {
        const selectedPattern = patterns[index];
        setPatternIndex(index);
        setCellValues(selectedPattern);
        setInitialValues(selectedPattern);
        setHighlightedCells({});
        setIsCompleted(false);
        setIsSolutionShown(false);
        resetTimer();
    };

    const loadSolution = (index) => {
        const selectedSolution = solutions[index];
        setCellValues(selectedSolution);
        setHighlightedCells({});
        setIsCompleted(true);
        setIsSolutionShown(true);
        stopTimer();
    };

    const confirmAction = (message, action) => {
        if (window.confirm(message)) {
            action();
        }
    };

    const grid = (
        <GenerateGrid
            cellValues={cellValues}
            initialValues={initialValues}
            highlightedCells={highlightedCells}
            checkRules={checkRules}
            setCellValues={setCellValues}
            setHighlightedCells={setHighlightedCells}
            checkCompletion={checkCompletion}
            setIsCompleted={setIsCompleted}
            setSelectedCell={setSelectedCell}
            selectedCell={selectedCell}
        />
    );

    const handleKeyPress = (key) => {
        if (!selectedCell) return;
    
        const { row, col } = selectedCell;
    
        setCellValues((prevValues) => {
            const newValues = { ...prevValues };
            const cellKey = `${row}-${col}`;
    
            if (key === "Clear") {
                newValues[cellKey] = "";
            } else {
                newValues[cellKey] = key;
            }
    
            const isValid = checkRules(newValues);
            setHighlightedCells(isValid ? {} : { [cellKey]: true });
    
            const completed = checkCompletion(newValues);
            setIsCompleted(completed);
    
            return newValues;
        });
    };
    
    

    return (
        <div className="GridPage">
            <audio id="completion-sound" src="../../win.wav"></audio>
            <CongratulationModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} />
            <RulesModal isOpen={isRulesModalOpen} onRequestClose={() => setIsRulesModalOpen(false)} />
            <div className='SudokuArea'>
                <div className='Title'>
                    <div className='TitleAndRules'>
                        <h2>Sudoku</h2>
                        <button className='InfoButton' onClick={() => setIsRulesModalOpen(true)}>?</button>
                    </div>
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
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <NumericKeyboard onKeyPress={handleKeyPress} />
            </div>
        </div>
    );
}
