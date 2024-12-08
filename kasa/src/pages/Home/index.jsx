import { useState, useEffect } from "react";
import Banner from '../../components/Banner';
import Card from '../../components/Card';

function Home() {
  const [logements, setLogements] = useState([]); // État pour stocker les logements
  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const [error, setError] = useState(null); // Gestion des erreurs

  // Utilisation de l'API locale via Docker
  useEffect(() => {
    fetch("http://localhost:8080/api/properties")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur lors du chargement des données");
        }
        return res.json();
      })
      .then((data) => {
        setLogements(data); // Stocker les données des logements
        setLoading(false); // Terminer le chargement
      })
      .catch((err) => {
        setError(err.message); // Stocker l'erreur
        setLoading(false); // Terminer le chargement
      });
  }, []); // Exécuté une fois au montage du composant

  return (
    <div className="homepage">
      <Banner
        imageSrc="/image_1.png"
        text="Chez vous, partout et ailleurs"
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
