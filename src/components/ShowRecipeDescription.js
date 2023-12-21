import React from 'react';

const ShowRecipeDescription = ({ recipeDescription }) => {
  return (
    <div className='show-recipe-description'>
      <div className={recipeDescription === '' ? 'display-none' : 'card'}>
        {recipeDescription.split('\n\n').map((paragraph, index) => (
          <span key={index}>
            {paragraph.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
            <br />
          </span>
        ))}
      </div>
    </div>
  );
}

export default ShowRecipeDescription;
