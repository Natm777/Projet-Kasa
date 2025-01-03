import { useState, useEffect } from "react";
import Banner from "../../components/Banner";
import Card from "../../components/Card";

function Home() {
  const [logements, setLogements] = useState([]); // État pour stocker les logements
  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const [error, setError] = useState(null); // Gestion des erreurs
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // État initial basé sur la taille d'écran

   useEffect(() => {
    // Fonction pour mettre à jour l'état isMobile en fonction de la taille de l'écran
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Mettre à jour si l'écran est mobile (largeur <= 768px)
    };
  
    // Ajoute un écouteur d'événements pour les changements de taille de la fenêtre
    window.addEventListener("resize", handleResize);
  
    // Nettoyage de l'écouteur d'événements lors du démontage du composant
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Exécuté une fois au montage du composant
  
   // Utilisation de l'API locale via Docker
  useEffect(() => {
    // Envoie une requête pour récupérer les données des logements depuis l'API locale
    fetch("http://localhost:8080/api/properties")
      .then((res) => {
        // Vérifie si la réponse est correcte (statut HTTP 200-299)
        if (!res.ok) {
          // Si la réponse n'est pas correcte, lance une erreur
          throw new Error("Erreur lors du chargement des données");
        }
        // Convertit la réponse en format JSON
        return res.json();
      })
      .then((data) => {
        // Stocke les données des logements dans l'état
        setLogements(data);
        // Indique que le chargement est terminé
        setLoading(false);
      })
      .catch((err) => {
        // Stocke le message d'erreur dans l'état
        setError(err.message);
        // Indique que le chargement est terminé même en cas d'erreur
        setLoading(false);
      });
  }, []); // signifie que l'effet est exécuté une seule fois (au montage du composant).

  return (
    <div className="homepage">
      <Banner
        imageSrc="/image_1.png"
        text={
          isMobile ? (
            <>
              Chez vous,
              <br />
              partout et ailleurs
            </>
          ) : (
            "Chez vous, partout et ailleurs"
          )
        }
      />
      
      {/* // Affiche un message de chargement si les données sont en cours de chargement et qu'il n'y a pas d'erreur*/}
      {loading && !error && <p>Chargement des logements...</p>}
      {/*// Affiche un message d'erreur si une erreur s'est produite et que le chargement est terminé*/}
      {error && !loading && <p>Erreur : {error}</p>}
      
      {/*// Affiche les cartes des logements si les données sont chargées avec succès et qu'il n'y a pas d'erreur*/}
      {logements && !loading && !error && (
        <div className="cards">
          {logements.map((logement) => (
            <Card
              key={logement.id} // Clé unique pour chaque carte, basée sur l'ID du logement
              id={logement.id}  // ID du logement
              cover={logement.cover} // Image de couverture du logement
              title={logement.title} //// Titre du logement
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
