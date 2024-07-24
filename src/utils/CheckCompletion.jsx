// src/utils/checkCompletion.js

export const checkCompletion = (values, setIsCompleted) => {
    const isComplete = Object.keys(values).length === 81 && !Object.values(values).includes('');
    if (isComplete) {
        const sound = document.getElementById("completion-sound");
        sound.play();
        alert("Félicitation ! Vous avez gagné ! ")
    }
    setIsCompleted(isComplete);
};
