import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Banner from "../../components/Banner";
import RentalInfo from "../../components/RentalInfo";
import OwnerInfo from "../../components/OwnerInfo";
import DetailsSection from "../../components/DetailsSection";
import Error from "../../components/Error";
import Tags from "../../components/Tags";
import Stars from "../../components/Stars";
import Starsmobile from "../../components/Starsmobile";
import Owner from "../../components/Owner";

function Logement() {
  const navigate = useNavigate(); // Hook pour la navigation
  const [isLoading, setIsLoading] = useState(true); // État pour indiquer le chargement des données
  const [error, setError] = useState(null); // État pour gérer les erreurs
  const { logementId } = useParams(); // Récupération du paramètre dynamique logementId depuis l'URL
  const [rental, setRental] = useState({
    pictures: [],
    tags: [],
  }); // État pour stocker les données du logement
  const [stars, setStars] = useState([]); // État pour stocker les étoiles de notation

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
        for (let i = 0; i < 5; i++) { // Boucle pour remplir le tableau 
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
      }, [logementId, navigate]); // Exécuté à chaque changement de logementId ou navigate

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
    if (error) return <Error message={error} />; // Si une erreur s'est produite, afficher un composant Error avec le message d'erreur

    return (
    <div className="rental">
      {/* Affichage du carrousel de photos */}
      <Banner images={rental.pictures} className="carousel-banner" />{" "}
      {/* Conteneur pour les informations */}
      <section className="info-container">
        <div className="rental-info">
          {/* Informations sur le logement */}
          <RentalInfo title={rental.title} location={rental.location} />{" "}
        </div>
        <div className="owner-info">
          {/* Informations sur le propriétaire */}
          <OwnerInfo
            hostName={rental.host?.name}
            hostPicture={rental.host?.picture}
          />{" "}
        </div>
      </section>
      {/* Section pour les tags et étoiles */}
      <section className="stats">
        <Tags tags={rental.tags} /> {/* Affichage des tags */}
        <Stars stars={stars} /> {/* Affichage des étoiles de notation */}
        {/* Section pour les étoiles et propriétaire pour mobile*/}
        <div className="stars-owner-row">
          <div className="stars-mobile">
            <Starsmobile stars={stars} />{" "}
            {/* Affichage des étoiles pour mobile */}
          </div>
          <div className="owner">
            {/* Affichage des informations du propriétaire pour mobile */}
            <Owner
              hostName={rental.host?.name}
              hostPicture={rental.host?.picture}
            />{" "}
          </div>
        </div>
      </section>
      {/* Section Description et Équipements */}
      <section className="description_equipements">
        {/* Affichage de la description du logement */}
        <DetailsSection
          title="Description"
          content={rental.description || "Description non disponible"} // Affichage de la description ou d'un message par défaut
        />{" "}
        {/* Affichage des équipements du logement */}
        <DetailsSection
          title="Équipements"
          content={getEquipmentContent()}
        />{" "}
      </section>
    </div>
  );
}

export default Logement;
