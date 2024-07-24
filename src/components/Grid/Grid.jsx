// src/components/Grid.js

import React, { useState, useEffect } from 'react';
import './Grid.css';

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

    const { startTimer, stopTimer, resetTimer } = useTimer(setTime);

    useEffect(() => {
        loadPattern(patternIndex);
        startTimer();
        return () => stopTimer();
    }, [patternIndex]);

    useEffect(() => {
        if (isCompleted) {
            stopTimer();
        }
    }, [isCompleted]);

    const loadPattern = (index) => {
        const selectedPattern = patterns[index];
        setPatternIndex(index);
        setCellValues(selectedPattern);
        setInitialValues(selectedPattern);
        setHighlightedCells({});
        setIsCompleted(false);
        resetTimer();
    };

    const loadSolution = (index) => {
        const selectedSolution = solutions[index];
        setCellValues(selectedSolution);
        setHighlightedCells({});
        setIsCompleted(true);
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
            checkCompletion={(values) => checkCompletion(values, setIsCompleted)}
        />
    );

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
