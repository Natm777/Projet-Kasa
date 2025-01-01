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

      {loading && !error && <p>Chargement des logements...</p>}
      {error && !loading && <p>Erreur : {error}</p>}
      {logements && !loading && !error && (
        <div className="cards">
          {logements.map((logement) => (
            <Card
              key={logement.id}
              id={logement.id}
              cover={logement.cover}
              title={logement.title}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
