import React, { useState } from "react";

const ShowIngredients = ({ recipe }) => {
  const [scaledAmounts, setScaledAmounts] = useState(recipe.amounts);
  const [numberOfPersons, setNumberOfPersons] = useState(
    recipe.numberOfPersons
  );

  // The number of persons, i.e. the multiplier is parsed to a number.
  const parseMultiplier = (multiplier) => {
    multiplier = String(multiplier).replace(",", ".");
    multiplier.includes(".")
      ? (multiplier = parseFloat(multiplier))
      : (multiplier = parseInt(multiplier));
    return multiplier;
  };

  // The amounts needed are calculated based on the number of persons.
  const calculateAmounts = (multiplier) => {
    setNumberOfPersons(multiplier);
    multiplier = parseMultiplier(multiplier);
    if (!isNaN(multiplier)) {
      const newAmounts = recipe.amounts.map((amount) => {
        let jointAmounts = "";
        if (amount !== "") {
          const splitAmounts = amount.split(" ");
          if (splitAmounts[0].includes(",")) {
            const amountValue = parseFloat(splitAmounts[0].replace(",", "."));
            const newAmountValue =
              (amountValue * multiplier) / recipe.numberOfPersons;
            splitAmounts[0] = newAmountValue.toFixed(1).replace(".", ",");
            if (splitAmounts[0].includes(",0")) {
              const index = splitAmounts[0].indexOf(",");
              splitAmounts[0] = splitAmounts[0].slice(0, index);
            }
          } else if (multiplier % 1 !== 0) {
            splitAmounts[0] = String(
              (
                (parseInt(splitAmounts[0]) * multiplier) /
                recipe.numberOfPersons
              ).toFixed(1)
            ).replace(".", ",");
            if (splitAmounts[0].includes(",0")) {
              const index = splitAmounts[0].indexOf(",");
              splitAmounts[0] = splitAmounts[0].slice(0, index);
            }
          } else if (isNaN(Number(splitAmounts[0]))) {
          } else {
            splitAmounts[0] = String(
              (parseInt(splitAmounts[0]) * multiplier) / recipe.numberOfPersons
            ).replace(".", ",");
          }
          jointAmounts = splitAmounts.join(" ");
        }
        return jointAmounts;
      });
      setScaledAmounts(newAmounts);
    }
  };

  const numberOfPersonsLine = (
    <span>
      Zutaten für
      <input
        className="number-of-persons"
        onChange={(event) => {
          calculateAmounts(event.target.value);
        }}
        value={numberOfPersons}
      />
      {numberOfPersons === 1 || numberOfPersons === "1" ? "Person" : "Personen"}
    </span>
  );

  const amountsAndIngredientsTable = (
    <table>
      <tbody>
        {recipe.ingredients.map((ingredient, index) => (
          <tr key={`${recipe}_${ingredient}`}>
            <td className="align-right">{scaledAmounts[index]}</td>
            <td>
              {scaledAmounts[index] === "1" && ingredient.endsWith("n")
                ? ingredient.slice(0, -1)
                : ingredient}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="show-ingredients card container">
      {numberOfPersonsLine}
      {amountsAndIngredientsTable}
    </div>
  );
};

export default ShowIngredients;
