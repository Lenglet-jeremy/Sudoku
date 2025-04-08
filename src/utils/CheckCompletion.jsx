// ./src/utils/CheckCompletion.jsx


export const checkCompletion = (cellValues) => {
    if (!cellValues) {
        return false;
    }

    // Vérifiez que toutes les cellules sont remplies et qu'il n'y a pas de doublons
    for (let row = 1; row < 10; row++) {
        for (let col = 1; col < 10; col++) {
            const cellKey = `${row}-${col}`;
            if (!cellValues[cellKey]) {
                return false;
            }
        }
    }

    // Ajoutez ici une logique supplémentaire pour vérifier l'absence de doublons si nécessaire

    return true;
};
