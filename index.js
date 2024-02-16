document.addEventListener("DOMContentLoaded", () => {
  let menu = document.getElementById("cocktail-detail");
  let dropDown = document.getElementById("category");
  let ingredient = document.querySelector(".ingredients");
  let drink = document.querySelector(".name");
  //Function to randomly display one of the Cocktails, along with its accompanying ingredients
  function displayRandom(drinksArray) {
    console.log(drinksArray)
    if (!drink || drinksArray.length === 0) {
      console.error("Fetched data is empty or invalid");
      return;
    }
     const randomIndex = Math.floor(Math.random() * drinksArray.length);
    const randomCocktail = drinksArray[randomIndex];
    // console.log(randomCocktail);
    // // Update HTML content with the random cocktail and its ingredients
    // menu.textContent = `Cocktail: ${randomCocktail.strDrink}`;
    // menu.src = randomCocktail.strDrinkThumb;
    // ingredient.textContent = `Ingredients: ${randomCocktail.getIngredients}`;
    menu.addEventListener("mousover", () => {
      const ingredients = getIngredients(randomCocktail);
      menu.textContent = `Ingredients: ${ingredients}`;
    });

    menu.addEventListener("mouseout", () => {
      menu.textContent = `Cocktail: ${randomCocktail.strDrink}`;
    });
  }
  //!checks for a match in the dropdown menu
  function matchDrink(drinksArray, selectedDrink) {
    for (const cocktail of drinksArray) {
      if (cocktail.strDrink == selectedDrink) {
        detailImage.src = cocktail.strDrinkThumb;
        menu.textContent = `Cocktail: ${cocktail.strDrink}`;
        rating.textContent = `Alcoholic: ${cocktail.strAlcoholic}`;
        return;
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
      console.log(data);
      return data; // Return the fetched data
    } catch (error) {
      console.error(error);
      return null; // Return null in case of error
    }
  };

  //! Function to demonstrate fetching data and storing it as a variable
  const main = async () => {
   try {
    const fetchedData = await fetchData();
    if (fetchedData) {
      const drinksArray = fetchedData.drinks;
      displayRandom(drinksArray);
      console.log(drinksArray);
      matchDrink(drinksArray);
    } else {
      console.error("Error: Fetch data is empty or invalid");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
  
 main();
 
});
