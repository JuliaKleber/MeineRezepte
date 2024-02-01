import React from "react";

const CategoryKeywords = ({
  recipe,
  setRecipe,
  keywordCategory,
  listOfKeywords,
}) => {
  const areKeywordsSelected = listOfKeywords.map((keyword) =>
    recipe.keywords.includes(keyword)
  );

  const handleKeywordClick = (index) => {
    areKeywordsSelected[index]
      ? removeKeyword(listOfKeywords[index])
      : addKeyword(listOfKeywords[index]);
  };

  const addKeyword = (keyword) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      keywords: [...prevRecipe.keywords, keyword],
    }));
  };

  const removeKeyword = (keyword) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      keywords: [...prevRecipe.keywords.filter((k) => k !== keyword)],
    }));
  };

  const keywords = (
    <div className="container-vertical-alignment">
      {listOfKeywords.map((keyword, index) => (
        <button
          key={keyword}
          className={
            areKeywordsSelected[index]
              ? "keyword-is-chosen"
              : "keyword-is-not-chosen white-black-button"
          }
          onClick={() => handleKeywordClick(index)}
        >
          {keyword}
        </button>
      ))}
    </div>
  );

  return (
    <div className="container">
      <p className="bold secondary-color">{keywordCategory}</p>
      {keywords}
    </div>
  );
};

export default CategoryKeywords;
