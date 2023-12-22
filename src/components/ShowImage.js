import React, { useState, useEffect } from 'react';
import pastaImage from '../images/pasta.jpg';
import potatoeImage from '../images/potatoe.jpg';
import lasagneImage from '../images/lasagne.jpg';
import pestoImage from '../images/pesto.jpg';
import homeImage from '../images/home.jpg';

const ShowImage = ({ recipe }) => {
  const [image, setImage] = useState(null);
  const imagePath = `http://localhost:3001/fetchImage/${recipe.imageName}`;

  const defaultImage = () => {
    if (recipe.keywords.includes('Lasagne')) {
      setImage(lasagneImage);
    } else if (recipe.keywords.includes('Pesto')) {
      setImage(pestoImage);
    } else if (recipe.keywords.includes('Nudeln')) {
      setImage(pastaImage);
    } else if (recipe.keywords.includes('Kartoffeln')) {
      setImage(potatoeImage);
    } else {
      setImage(homeImage);
    }
  };

  useEffect(() => {
    if (recipe.imageName !== null) {
      setImage(imagePath);
    }
    else {
      defaultImage();
    }
  }, [recipe.imageName, imagePath]);

  return (
    <img src={image} alt='recipe_picture' className='recipe-image'/>
  );
};

export default ShowImage;
