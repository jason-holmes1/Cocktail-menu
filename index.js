// ! Fetch for the cocktail api. Link is https://www.thecocktaildb.com/api.php
 const displayCocktail = () =>{
fetch("www.thecocktaildb.com/api/json/v1/1/search.php?f=a")
.then((response) => response.json())
.then((cocktail) => main(cocktail)  
)
 }

 function main(json){

    

 }
// ! Need to populate all of the cocktails, along with their menus, ingredients, etc.

//