import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Banner from "../../components/Banner";
import RentalInfo from "../../components/RentalInfo";
import OwnerInfo from "../../components/OwnerInfo";
import DetailsSection from "../../components/DetailsSection";
import { useNavigate } from "react-router-dom";
import Error from "../../components/Error";

function Logement() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { logementId } = useParams();
  const [rental, setRental] = useState({
    pictures: [],
    tags: [],
  });
  const [stars, setStars] = useState([]);

  useEffect(() => {
    if (!logementId || logementId === "") return;

    // Récupération des données du logement via l'API
    fetch(`http://localhost:8080/api/properties/${logementId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data || data === "Not found") {
          setError("Aucune donnée trouvée");
          setIsLoading(false);
          return;
        }
        setRental(data);
        const tempStars = [];
        for (let i = 0; i < 5; i++) {
          tempStars.push(
            i < data.rating ? "fa-solid fa-star" : "fa-solid fa-star empty"
          );
        }
        setStars(tempStars);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, [logementId, navigate]);
  if (isLoading) {
    return <p>Chargement...</p>;
  }
  console.log(error);
  console.log(rental);
  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="rental">
      <Banner images={rental.pictures} className="carousel-banner" />
      <section className="info">
        <RentalInfo title={rental.title} location={rental.location} />
        <OwnerInfo
          hostName={rental.host?.name}
          hostPicture={rental.host?.picture}
        />
      </section>

      <section className="stats">
        <div className="tags">
          {rental.tags.map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
        </div>
        <div className="stars">
          {stars.map((star, index) => (
            <i key={index} className={star}></i>
          ))}
        </div>
      </section>
      <section className="description_equipements">
        <DetailsSection
          title="Description"
          content={rental.description || "Description non disponible"}
        />
        <DetailsSection
          title="Équipements"
          content={
            rental.equipments?.length
              ? rental.equipments
              : ["Aucun équipement disponible"]
          }
        />
      </section>
    </div>
  );
}

export default Logement;
