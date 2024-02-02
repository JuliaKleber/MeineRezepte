import React, { useState } from "react";

const ShowIngredients = ({ recipe }) => {
  const [scaledAmounts, setScaledAmounts] = useState(recipe.amounts);
  const [numberOfPersons, setNumberOfPersons] = useState(
    recipe.numberOfPersons
  );

  // The number of persons, i.e. the multiplier is parsed to a number.
  const parseMultiplier = (multiplier) => {
    multiplier = String(multiplier).replace(",", ".");
    return multiplier.includes(".")
      ? parseFloat(multiplier)
      : parseInt(multiplier);
  };

  // The number part of the amount is converted to the new number
  const convertNumber = (amount, multiplier) => {
    return String(
      (parseFloat(amount) * multiplier) / recipe.numberOfPersons
    ).replace(".", ",");
  };

  // The amounts needed are calculated based on the number of persons.
  const calculateAmounts = (multiplierString) => {
    setNumberOfPersons(multiplierString);
    const multiplier = parseMultiplier(multiplierString);
    if (!isNaN(multiplier)) {
      const newAmounts = recipe.amounts.map((amount) => {
        if (amount === "") return "";
        const [number, ...rest] = amount.split(" ");
        const parsedNumber = number.replace(',', '.');
        const convertedNumber = isNaN(Number(parsedNumber)) ? number :
          convertNumber(parsedNumber, multiplier);
        return `${convertedNumber} ${rest.join(" ")}`;
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
