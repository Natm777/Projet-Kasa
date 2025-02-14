import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import Carrousel from "../../components/Carrousel";
import RentalInfo from "../../components/RentalInfo";
import OwnerInfo from "../../components/OwnerInfo";
import DetailsSection from "../../components/DetailsSection";
import Tags from "../../components/Tags";
import Stars from "../../components/Stars";

function Logement() {
  const [isLoading, setIsLoading] = useState(true); // État pour indiquer le chargement des données
  const [error, setError] = useState(null); // État pour gérer les erreurs
  const { logementId } = useParams(); // Récupération du paramètre dynamique logementId depuis l'URL
  const [rental, setRental] = useState({
    pictures: [],
    tags: [],
  }); // État pour stocker les données du logement
  const [stars, setStars] = useState([]); // État pour stocker les étoiles de notation
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // État initial basé sur la taille d'écran

  // Gère la détection de l'écran mobile
  useEffect(() => {
    // Fonction pour mettre à jour l'état isMobile en fonction de la taille de l'écran
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);// Mettre à jour si l'écran est mobile (largeur <= 768px)
    };
  
    // Ajoute un écouteur d'événements pour les changements de taille de la fenêtre
    window.addEventListener("resize", handleResize);
  
    // Fonction de nettoyage pour retirer l'écouteur d'événements lors du démontage du composant
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Exécuté une seule fois au montage du composant

  useEffect(() => {
    // Vérifie si le logementId est valide et non vide avant de faire la requête
    if (!logementId || logementId === "") return;
    // Récupération des données du logement via l'API
    fetch(`http://localhost:8080/api/properties/${logementId}`)
      .then((res) => res.json())
      .then((data) => {
        // Vérifie si les données sont valides
        if (!data || data === "Not found") {
          setError("Aucune donnée trouvée");
          setIsLoading(false);
          return;
        }
        setRental(data); // Mise à jour des données du logement
        const tempStars = []; // Initialisation d'un tableau temporaire pour les étoiles de notation
        for (let i = 0; i < 5; i++) {
          // Boucle pour remplir le tableau
          tempStars.push(
            i < data.rating ? "fa-solid fa-star" : "fa-solid fa-star empty" // Si l'index est inférieur à la note (rating), ajouter une étoile pleine, sinon une étoile vide
          );
        }
        setStars(tempStars); // Mise à jour des étoiles de notation avec le tableau temporaire
        setIsLoading(false); // Fin du chargement
      })
      .catch((error) => {
        setError(error.message); // Gestion des erreurs
        setIsLoading(false); // Fin du chargement
      });
  }, [logementId]); // Exécuté à chaque changement de logementId

  // Fonction pour obtenir le contenu des équipements
  function getEquipmentContent() {
    // Vérifie si rental.equipments existe et contient un ou plusieurs éléments
    if (rental.equipments && rental.equipments.length > 0) {
      // Si oui, retourne le tableau des équipements
      return rental.equipments;
    }
    return ["Aucun équipement disponible"]; // Sinon, retourne un tableau avec un message indiquant qu'aucun équipement n'est disponible
  }

  if (isLoading) return <p>Chargement...</p>; // Si les données sont en cours de chargement, afficher un message de chargement
  if (error) return <Navigate to="/error" />; // Si une erreur s'est produite, rediriger vers la page d'erreur 404

  return (
    <div className="rental">
      {/* Affichage du carrousel de photos */}
      <Carrousel images={rental.pictures} className="carousel" />
      <section className="info-container"> {/* Conteneur pour les informations */}
        <div className="rental-info">
          {/* Composant RentalInfo pour afficher le titre et la localisation du logement */}
          <RentalInfo title={rental.title} location={rental.location} />
        </div>
        {/* Affiche les informations du propriétaire uniquement si l'écran n'est pas mobile */}
        {!isMobile && (
          <div className="owner-info">
            {/* Composant OwnerInfo pour afficher le nom et la photo du propriétaire */}
            <OwnerInfo
              hostName={rental.host?.name}
              hostPicture={rental.host?.picture}
            />
          </div>
        )}
      </section>
      <section className="stats">
        {/* Composant Tags pour afficher les tags associés au logement */}
        <Tags tags={rental.tags} />

        <div className="stars-owner-row">
          {/* Composant Stars pour afficher les étoiles de notation */}
          <Stars stars={stars} />

          {/* Affiche les informations du propriétaire uniquement si l'écran est mobile */}
          {isMobile && (
            <div className="owner-info">
              {/* Composant OwnerInfo pour afficher le nom et la photo du propriétaire */}
              <OwnerInfo
                hostName={rental.host?.name}
                hostPicture={rental.host?.picture}
              />
            </div>
          )}
        </div>
      </section>
      {/* Section Description et Équipements */}
      <section className="description_equipements">
        {/* Affichage de la description du logement */}
        <DetailsSection
          title="Description"
          content={rental.description || "Description non disponible"}
        />
        <DetailsSection title="Équipements" content={getEquipmentContent()} />
      </section>
    </div>
  );
}

export default Logement;
