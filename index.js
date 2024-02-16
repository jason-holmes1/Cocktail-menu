document.addEventListener("DOMContentLoaded", () => {
import("node-fetch").then((module) => {
  const fetch = module.default;
  // Your code using fetch goes here
});
let menu = document.getElementById("cocktail-detail");
let dropDown = document.getElementById("category");
let ingredient =  document.querySelector(".ingredients");
let drink = document.querySelector(".name");
//Function to randomly display one of the Cocktails, along with its accompanying ingredients
function displayRandom(fetchedData) {
  const randomIndex = Math.floor(Math.random() * fetchedData.length);
  const randomCocktail = fetchedData[randomIndex];

  // Update HTML content with the random cocktail and its ingredients
  menu.textContent = `Cocktail: ${randomCocktail.strDrink}`;
  ingredient.textContent = `Ingredients: ${randomCocktail.getIngredients}`;
  menu.addEventListener("mouseover", () => {
    const ingredients = getIngredients(randomCocktail);
    menu.textContent = `Ingredients: ${ingredients}`;
  });

  
  menu.addEventListener("mouseout", () => {
    menu.textContent = `Cocktail: ${randomCocktail.strDrink}`;
  });
}
//!checks for a match in the dropdown menu
function matchDrink(fetchedData){
      for (const cocktail of fetchedData) {
    if (cocktail.strDrink == selectedDrink) {
    
      detailImage.src = cocktail.strDrinkThumb;
      menu.textContent = `Cocktail: ${cocktail.strDrink}`;
      rating.textContent = `Alcoholic: ${cocktail.strAlcoholic}`;
      return; // Exit loop once match is found
    }
  }
}
//! stores all of the ingredients in an array
function getIngredients(cocktail) {
  let ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail[`strIngredient${i}`];
    const measure = cocktail[`strMeasure${i}`];
    if (ingredient && measure) {
      ingredients.push(`${measure.trim()} ${ingredient}`);
    } else if (ingredient) {
      ingredients.push(ingredient);
    }
  }
  return ingredients.join(", ");
}
//! Function to fetch data from the API and store it as a variable
const fetchData = async () => {
  try {
    const response = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data from the API");
    }
    const data = await response.json();
    return data; // Return the fetched data
  } catch (error) {
    console.error(error);
    return null; // Return null in case of error
  }
};

//! Function to demonstrate fetching data and storing it as a variable
const main = async () => {
  const fetchedData = await fetchData(); // Fetch data
  displayRandom(fetchedData);
  console.log(fetchedData); 
  matchDrink(fetchedData);
};


main();
});