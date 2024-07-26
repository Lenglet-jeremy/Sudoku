import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

// Modal de félicitation lors de la completion de la grille
const CongratulationModal = ({ isOpen, onRequestClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Félicitations"
            className="Modal"
            overlayClassName="Overlay"
        >
            <h2>Félicitations !</h2>
            <p>Vous avez complété le Sudoku sans erreurs !</p>
            <button onClick={onRequestClose}>Fermer</button>
        </Modal>
    );
};

export default CongratulationModal;
