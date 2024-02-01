import React, { useState, useEffect } from "react";
import pastaImage from "../images/pasta.jpg";
import potatoeImage from "../images/potatoe.jpg";
import lasagneImage from "../images/lasagne.jpg";
import pestoImage from "../images/pesto.jpg";
import homeImage from "../images/home.jpg";

const ShowImage = ({ recipe }) => {
  const [loaded, setLoaded] = useState(false);
  const [image, setImage] = useState(null);
  const imagePath = `http://localhost:3001/getFile/${recipe.imageName}`;

  const ImagePlaceholder = () => {
    return <div className="recipe-image recipe-image-placeholder"></div>;
  };

  const defaultImage = () => {
    if (recipe.keywords.includes("Lasagne")) {
      setImage(lasagneImage);
    } else if (recipe.keywords.includes("Pesto")) {
      setImage(pestoImage);
    } else if (recipe.keywords.includes("Nudeln")) {
      setImage(pastaImage);
    } else if (recipe.keywords.includes("Kartoffeln")) {
      setImage(potatoeImage);
    } else {
      setImage(homeImage);
    }
  };

  useEffect(() => {
    if (recipe.imageName !== null) {
      try {
        setImage(imagePath);
      } catch (error) {
        defaultImage();
      }
    } else {
      defaultImage();
    }
  }, [recipe.imageName, imagePath, defaultImage]);

  return (
    <>
      {!loaded && <ImagePlaceholder />}
      <img
        src={image}
        alt={loaded ? "recipe picture": undefined}
        className="recipe-image"
        onLoad={() => setLoaded(true)}
      />
    </>
  );
};

export default ShowImage;
