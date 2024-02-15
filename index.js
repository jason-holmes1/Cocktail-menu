// ! Fetch for the cocktail api. Link is https://www.thecocktaildb.com/api.php

const displayCocktail = () =>{
  fetch ('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
  .then(res => res.json())
  .then((cocktailData) => {
    cocktailData.forEach(displayCocktailImage)
  })
}
const displayCocktailImage = (cocktail) => {
  const cocktailname = document.querySelector('#cocktail-names')
  const cocktailImages = document.createElement('img')
  cocktailImages.src
} 