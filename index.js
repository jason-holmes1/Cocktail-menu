import("node-fetch").then((module) => {
  const fetch = module.default;
  // Your code using fetch goes here
});
let menu = document.getElementById("cocktail-menu");
let rating = document.getElementById("rating-display");
let dropDown = document.getElementById("category");
//Function to randomly display one of the Cocktails, along with its accompanying ingredients
function displayRandom(fetchedData) {
  const randomIndex = Math.floor(Math.random() * fetchedData.length);
  const randomCocktail = fetchedData[randomIndex];

  // Update HTML content with the random cocktail and its ingredients
  menu.textContent = `Cocktail: ${randomCocktail.strDrink}`;
  rating.textContent = `Alcoholic: ${randomCocktail.strAlcoholic}`;
  dropDown.textContent = `Glass: ${randomCocktail.strGlass}`;

  menu.append()
}

// Function to fetch data from the API and store it as a variable
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

// Function to demonstrate fetching data and storing it as a variable
const main = async () => {
  const fetchedData = await fetchData(); // Fetch data
  displayRandom(fetchedData);
  console.log(fetchedData); // Log the fetched data
  // You can further process or manipulate the fetched data here
};

// Call the main function to execute the code
main();
