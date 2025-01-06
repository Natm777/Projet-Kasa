// Importation des fichiers CSS et des bibliothèques nécessaires
import './index.css'; // Importation du fichier de styles CSS global
import React from 'react'; // Importation de la bibliothèque React
import ReactDOM from 'react-dom'; // Importation de ReactDOM pour manipuler le DOM
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importation des composants de React Router

// Importation des composants et des pages de l'application
import Home from './pages/Home'; // Page d'accueil
import Logement from './pages/Logement'; // Page de détail d'un logement
import Apropos from './pages/Apropos'; // Page "À propos"
import Header from './components/Header'; // Composant d'en-tête
import Error from './pages/Error' // Page d'erreur 
import Footer from './components/Footer'; // Composant de pied de page

// Rendu de l'application React dans le DOM
ReactDOM.render(
  <React.StrictMode>
    {/* Configuration du routeur pour l'application */}
    <Router>
      {/* Composant d'en-tête affiché sur toutes les pages */}
      <Header />
      {/* Définition des routes de l'application */}
      <Routes>
        {/* Route pour la page d'accueil */}
        <Route path="/" element={<Home />} />
        {/* Route pour la page de détail d'un logement avec un paramètre dynamique */}
        <Route path="/logement/:logementId" element={<Logement />} />
        {/* Route pour la page "À propos" */}
        <Route path="/apropos" element={<Apropos />} />
        {/* Route pour gérer les pages non trouvées */}
        <Route path="*" element={<Error />} />
      </Routes>
      {/* Composant de pied de page affiché sur toutes les pages */}
      <Footer />
    </Router>
  </React.StrictMode>,
  document.getElementById('root') // Point de montage de l'application dans le DOM
);