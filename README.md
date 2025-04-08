# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

=======================

NETLIFY : https://sudokujl.netlify.app/ 


=======================

TODO : 
# Fonctionnalités de l'application Sudoku

## 1. Fonctionnalités de base
- [ ] Génération dynamique de grilles valides de Sudoku
- [OK] Sélection de la difficulté (Facile, Moyen, Difficile)
- [OK] Génération aléatoire par difficultés (Facile, Moyen, Difficile)
- [ ] Affichage interactif de la grille de Sudoku
- [-] Saisie des chiffres de 1 à 9 par clic ou clavier
- [OK] Blocage des cellules pré-remplies
- [ ] Surlignage de la cellule active
- [ ] Surlignage des lignes, colonnes et régions de la cellule active
- [OK] Détection et signalement des erreurs de saisie
- [ ] Réinitialisation de la grille
- [ ] Lancement d'une nouvelle partie
- [OK] Minuteur de jeu (chronomètre)
- [ ] Validation manuelle de la solution par l'utilisateur

## 2. Fonctionnalités avancées
- [ ] Aide utilisateur (surlignage des conflits, indices)
- [ ] Révéler une case (indice)
- [ ] Annuler / Refaire les dernières actions
- [ ] Résolution automatique
- [ ] Sauvegarde de la progression en localStorage
- [ ] Reprise automatique de la dernière partie
- [ ] Authentification utilisateur (connexion, inscription)
- [ ] Sauvegarde des parties côté serveur
- [ ] Historique des parties et scores
- [ ] Classement global ou par difficulté
- [ ] Système de niveaux ou progression utilisateur

## 3. Frontend (React)
- [OK] Interface responsive (mobile, tablette, desktop)
- [ ] Composants React modulaires et réutilisables
- [ ] Gestion d’état avec Context API / Zustand / Redux
- [ ] Gestion des erreurs utilisateur (notifications)
- [ ] Design propre avec Tailwind CSS ou SCSS
- [ ] Mode sombre / clair
- [ ] Animations fluides avec Framer Motion

## 4. Backend (Node.js / Express)
- [ ] API REST :
    - [ ] Génération de grilles
    - [ ] Validation de grille
    - [ ] Résolution automatique
    - [ ] Gestion des utilisateurs et scores
- [ ] Gestion des erreurs et statuts HTTP
- [ ] Stockage des données utilisateurs et scores (ex : MongoDB)
- [ ] Sécurité : hash des mots de passe, JWT

## 5. Qualité et tests
- [ ] Tests unitaires (génération, validation, etc.)
- [ ] Tests des composants React
- [ ] Tests d’intégration backend (Jest + Supertest)
- [ ] Linter ESLint et formatage Prettier
- [ ] Intégration continue (GitHub Actions)

## 6. Déploiement
- [ ] Déploiement du frontend (Vercel, Netlify)
- [ ] Déploiement du backend (Render, Railway, etc.)
- [ ] Configuration d’un nom de domaine personnalisé
- [ ] Optimisation des performances
- [ ] Référencement SEO de base
