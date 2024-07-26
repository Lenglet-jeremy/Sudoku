// src/components/Modal/RulesModal.js

import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

// Modal d'affichage de regle
const RulesModal = ({ isOpen, onRequestClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="Modal"
            overlayClassName="Overlay"
        >
            <h2>Règles du Sudoku</h2>
            <p>Le but du Sudoku est de remplir une grille de 9x9 cases avec des chiffres de 1 à 9 de telle manière que chaque colonne, chaque ligne et chaque sous-grille de 3x3 contienne tous les chiffres de 1 à 9.</p>
            <p>Voici quelques règles de base :</p>
            <ul>
                <li>Chaque ligne doit contenir les chiffres de 1 à 9, sans répétition.</li>
                <li>Chaque colonne doit contenir les chiffres de 1 à 9, sans répétition.</li>
                <li>Chaque sous-grille de 3x3 doit contenir les chiffres de 1 à 9, sans répétition.</li>
            </ul>
            <button onClick={onRequestClose}>Fermer</button>
        </Modal>
    );
}

export default RulesModal;
