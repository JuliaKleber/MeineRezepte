import React from 'react';
import pastaImage from '../images/pasta.jpg';
import potatoeImage from '../images/potatoe.jpg';
import lasagneImage from '../images/lasagne.jpg';
import pestoImage from '../images/pesto.jpg';
import homeImage from '../images/home.jpg';

const ShowImage = ({ recipe }) => {
  let image = homeImage;
  if (recipe.keywords.includes('Lasagne')) {
    image = lasagneImage;
  } else if (recipe.keywords.includes('Pesto')) {
    image = pestoImage;
  } else if (recipe.keywords.includes('Nudeln')) {
    image = pastaImage;
  } else if (recipe.keywords.includes('Kartoffeln')) {
    image = potatoeImage;
  } else {
    image = homeImage;
  }

  return (
    <img src={image} alt='recipe_picture' className='recipe-image'/>
  );
};

export default ShowImage;
