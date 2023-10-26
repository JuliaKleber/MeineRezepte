import React, { useState } from "react";

function ShowIngredients({ recipe }) {
  const [scaledAmounts, setScaledAmounts] = useState(recipe.amounts);
  const [numberOfPersons, setNumberOfPersons] = useState(1);

  // Die benötigten Mengen werden anhand der Personenzahl berechnet.
  const calculateAmounts = (multiplier) => {
    setNumberOfPersons(multiplier);
    multiplier = String(multiplier).replace(",", ".");
    multiplier.includes(".")
      ? (multiplier = parseFloat(multiplier))
      : (multiplier = parseInt(multiplier));
    if (!isNaN(multiplier) && multiplier !== "") {
      const newAmounts = [];
      for (let i = 0; i < recipe.amounts.length; i++) {
        let jointAmounts = "";
        if (recipe.amounts[i] !== "") {
          const splitAmounts = recipe.amounts[i].split(" ");
          if (splitAmounts[0].includes(",")) {
            const amountValue = parseFloat(splitAmounts[0].replace(",", "."));
            const newAmountValue = amountValue * multiplier;
            splitAmounts[0] = newAmountValue.toFixed(1).replace(".", ",");
            if (splitAmounts[0].includes(",0")) {
              const index = splitAmounts[0].indexOf(",");
              splitAmounts[0] = splitAmounts[0].slice(0, index);
            }
          } else if (multiplier % 1 !== 0) {
            splitAmounts[0] = String(
              (parseInt(splitAmounts[0]) * multiplier).toFixed(1)
            ).replace(".", ",");
            if (splitAmounts[0].includes(",0")) {
              const index = splitAmounts[0].indexOf(",");
              splitAmounts[0] = splitAmounts[0].slice(0, index);
            }
          } else {
            splitAmounts[0] = parseInt(splitAmounts[0]) * multiplier;
          }
          jointAmounts = splitAmounts.join(" ");
        }
        newAmounts.push(jointAmounts);
      }
      setScaledAmounts(newAmounts);
    }
  };

  return (
    <div className="recipe-box container">
      <span>
        Zutaten für
        <input
          id="number-of-persons"
          onChange={(event) => {
            calculateAmounts(event.target.value);
          }}
          value={numberOfPersons}
        />
        {numberOfPersons === 1 || numberOfPersons === "1"
          ? "Person"
          : "Personen"}
      </span>
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
    </div>
  );
}

export default ShowIngredients;
