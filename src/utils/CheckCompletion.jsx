// Verification de la completion de la grille
export const checkCompletion = (values, highlightedCells, setIsCompleted) => {
    const isComplete = Object.keys(values).length === 81 && !Object.values(values).includes('');
    const noHighlightedCells = Object.keys(highlightedCells).length === 0;

    if (isComplete && noHighlightedCells) {
        const sound = document.getElementById("completion-sound");
        sound.play();
    }
    setIsCompleted(isComplete && noHighlightedCells);
};
