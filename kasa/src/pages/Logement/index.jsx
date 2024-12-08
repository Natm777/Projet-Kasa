import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Logement() {
  const { logementId } = useParams();
  const [rental, setRental] = useState({
    pictures: [],
    tags: [],
  });
  const [slideIndex, setSlideIndex] = useState(0);
  const [stars, setStars] = useState([]);

  // Boucle sur les pictures pour afficher les images
  useEffect(() => {
    fetch(`http://localhost:8080/api/properties/${logementId}`)
      .then((res) => res.json())
      .then((data) => {
        setRental(data);
        for (let i = 0; i < 5; i++) {
          if (i < data.rating) {
            setStars((current) => [...current, "fa-solid fa-star"]);
          } else {
            setStars((current) => [...current, "fa-solid fa-star empty"]);
          }
        }
      });
  }, [logementId]);

  // Fonction pour passer à la photo suivante
  const nextSlide = () => {
    if (slideIndex < rental.pictures.length - 1) {
      setSlideIndex(slideIndex + 1);
    } else {
      setSlideIndex(0);
    }
  };

  // Fonction pour passer à la photo précédente
  const previousSlide = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    } else {
      setSlideIndex(rental.pictures.length - 1);
    }
  };

  return (

    <div className="rental">

    {/* Affichage Carousel */}
    
      <div className="slideshow-container">
        <div className="numbertext"></div>
        <img className="img_slide" src={rental.pictures[slideIndex]} alt="" />
        <div className="text">
          {slideIndex + 1} / {rental.pictures.length}
        </div>

        {/* <!-- Boutons suivant & precedent --> */}
         <button className="prev" onClick={previousSlide}>
          &#10094; {/* Code HTML pour une flèche gauche */}
        </button>
        <button className="next" onClick={nextSlide}>
          &#10095; {/* Code HTML pour une flèche droite */}
        </button>
        </div>
      {/* Fin affichage Carousel */}

      <section className="info">
        <div className="titles">
          <h1>{rental.title}</h1>
          <p>{rental.location}</p>
        </div>
        <div className="owner">
          <h2>{rental.host?.name}</h2>
          <img src={rental.host?.picture} alt={rental.host?.name} />
        </div>
      </section>
      <section className="stats">
        <div className="tags">
          {rental.tags.map((tag) => (
            <span>{tag}</span>
          ))}
        </div>
        <div className="stars">
          {stars.map((star) => (
            <i className={star}></i>
          ))}
        </div>
      </section>

      <section className="description_equipements">
        <details>
          <summary>Description</summary>
          
          <p>{rental.description}</p>
        </details>
      
        <details>
          <summary>Equipements</summary>

          {rental.equipments?.map((equipment) => (
            <li> {equipment}</li>
          ))}
        </details>


  
      </section>

    </div>
  );
}



export default Logement;