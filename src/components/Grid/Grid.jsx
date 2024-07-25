import React, { useState, useEffect } from 'react';
import './Grid.css';
import '../Modal/CongratulationModal.css';
import CongratulationModal from '../Modal/CongratulationModal';
import RulesModal from '../Modal/RulesModal'; // Import the RulesModal

import { patterns } from "../Datas/Patterns";
import { solutions } from "../Datas/Solutions";

import { checkRules } from '../../utils/checkRules';

import { useTimer, formatTime } from '../../utils/TimerUtils';
import { checkCompletion } from '../../utils/CheckCompletion';

import GenerateGrid from '../GenerateGrid/GenerateGrid';

export default function Grid() {
    const [cellValues, setCellValues] = useState({});
    const [highlightedCells, setHighlightedCells] = useState({});
    const [initialValues, setInitialValues] = useState({});
    const [time, setTime] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [patternIndex, setPatternIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRulesModalOpen, setIsRulesModalOpen] = useState(false); // State for rules modal
    const [isSolutionShown, setIsSolutionShown] = useState(false); // State for solution

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
        setIsSolutionShown(false);  // Reset isSolutionShown
        resetTimer();
    };

    const loadSolution = (index) => {
        const selectedSolution = solutions[index];
        setCellValues(selectedSolution);
        setHighlightedCells({});
        setIsCompleted(true);
        setIsSolutionShown(true);  // Set isSolutionShown
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
        />
    );

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
        </div>
    );
}
