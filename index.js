document.addEventListener("DOMContentLoaded", () => {
  let menu = document.getElementById("cocktail-detail");
  let image = document.querySelector(".detail-image");
  let dropDown = document.getElementById("category");
  let ingredient = document.querySelector(".ingredients");
  let drink = document.querySelector(".name");
  //Function to randomly display one of the Cocktails, along with its accompanying ingredients
  function displayIngredients(drinksArray) {
    console.log(drinksArray);

    const randomIndex = Math.floor(Math.random() * drinksArray.length);
    const randomCocktail = drinksArray[randomIndex];
    menu.addEventListener("mouseover", () => {
      const ingredients = getIngredients(randomCocktail);
      menu.textContent = `Ingredients: 1 oz Campari,1 oz Red Sweet Vermouth, Twist of Lemon peel, Twist of Orange peel,`;
    });
    dropDown.addEventListener("change", () => {
      const selectedDrink = dropDown.value;

      const selectedCocktail = drinksArray.find(
        (cocktail) => cocktail.strDrink === selectedDrink
      );

      if (selectedCocktail) {
        image.src = selectedCocktail.strDrinkThumb;

        drink.textContent = selectedCocktail.strDrink;

        const ingredients = getIngredients(selectedCocktail);
        ingredient.textContent = `Ingredients: ${ingredients}`;

        menu.textContent = selectedCocktail.strInstructions;
      } else {
        console.error(`Cocktail '${selectedDrink}' not found in the data`);
      }
    });
    menu.addEventListener("mouseout", () => {
      image.src =
        "https://www.foodandwine.com/thmb/d7VXAa1cezTsQ37pS6jYY2YX3YQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Americano-Cocktail-FT-RECIPE0123-4130dd6c79394106a8fb5948057a2bc5.jpg";
      menu.textContent =
        "Pour the Campari and vermouth over ice into glass, add a splash of soda water and garnish with half orange slice.";
      drink.textContent = "Americano";
      menu.append(image);
      menu.append(drink);
    });
  }
  //!checks for a match in the dropdown menu
  function matchDrink(drinksArray, dropDown) {
    for (const cocktail of drinksArray) {
      if (cocktail.strDrink == dropDown.textContent) {
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
  const fetchData = async (startindex,limit) => {
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
      const fetchedData = await fetchData(1,1000);
      if (fetchedData) {
        const drinksArray = fetchedData.drinks;
        displayIngredients(drinksArray);
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
