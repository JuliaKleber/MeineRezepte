import React, { useState, useEffect } from "react";
import pastaImage from "../images/pasta.jpg";
import potatoeImage from "../images/potatoe.jpg";
import lasagneImage from "../images/lasagne.jpg";
import pestoImage from "../images/pesto.jpg";
import curryImage from "../images/curry.jpg";
import riceImage from "../images/rice.jpg";
import homeImage from "../images/home.jpg";

const ShowImage = ({ recipe }) => {
  const [loaded, setLoaded] = useState(false);
  const [image, setImage] = useState(null);
  const imagePath = `http://localhost:3001/getFile/${recipe.imageName}`;

  // A placeholder is shown when the image has not yet been loaded.
  const ImagePlaceholder = () => {
    return <div className="recipe-image recipe-image-placeholder"></div>;
  };

  // Either the image is loaded from the server
  // or if this is not possible a default image is shown
  useEffect(() => {
    // If no image for a recipe is available, one of seven default images is used.
    const defaultImage = () => {
      if (recipe.keywords.includes("Lasagne")) {
        setImage(lasagneImage);
      } else if (recipe.keywords.includes("Pesto")) {
        setImage(pestoImage);
      } else if (recipe.keywords.includes("Nudeln")) {
        setImage(pastaImage);
      } else if (recipe.keywords.includes("Kartoffeln")) {
        setImage(potatoeImage);
      } else if (recipe.keywords.includes("Curry")) {
        setImage(curryImage);
      } else if (recipe.keywords.includes("Reis")) {
        setImage(riceImage);
      } else {
        setImage(homeImage);
      }
    };

    if (recipe.imageName !== null) {
      try {
        setImage(imagePath);
      } catch (error) {
        defaultImage();
      }
    } else {
      defaultImage();
    }
  }, [recipe.imageName, imagePath, recipe.keywords]);

  return (
    <>
      {!loaded && <ImagePlaceholder />}
      <img
        src={image}
        alt={loaded ? "recipe picture" : undefined}
        className="recipe-image"
        onLoad={() => setLoaded(true)}
      />
    </>
  );
};

export default ShowImage;
