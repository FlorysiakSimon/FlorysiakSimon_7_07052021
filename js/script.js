//IMPORT
//import {recipes} from "./recipes.js"
//DOM
const appareilsList = document.getElementById("appareilsList");
const searchBar = document.getElementById("searchbar")
const recipesSection = document.querySelector(".recette");
let data = []; // data
var appliance = []; //tableau appareils
var ingredients = []; //tableau ingredients
var ustensils = []; //tableau ustensiles
//var article = undefined;
var recettes = undefined;
var inputVal = undefined;

//FILTER DUPLICATE
let uniq = unique => [...new Set(unique)];




//searchbar
searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredData = data.recipes.filter((recipe) => {
    return (
        recipe.name.toLowerCase().includes(searchString) ||
        //recipe.ingredients.toLowerCase().includes(searchString) ||
        recipe.description.toLowerCase().includes(searchString)
    );
  });
  
  displayRecettes(filteredData)
});
  


const loadData = async () => {
  try {
      const res = await fetch('./js/data.js');
      data = await res.json();
      displayRecettes(data.recipes)
      //console.log(data)
  } catch (err) {
      console.error(err);
  }
};

const displayRecettes = (article) => {
  const htmlString = article
  .map((recipe) => {
      return `
      <article class="recetteArticle">
        <div class="recetteImg"></div>
        <div class="recetteText">
          <div class="recetteTextTitle">
            <h3>${recipe.name}</h3>
            <p class="recetteTextTitleTime"><i class="far fa-clock"></i> ${recipe.time} min</p>
          </div>
          <div class="recetteTextDetails">
            <ul class="recetteTextDetailsIngredients">
              ${recipe.ingredients.map(ingredient => `<li class="ingredient">${ingredient.ingredient}: <span class="quantity">${ingredient.quantity} ${ingredient.unit}</span></li>`).join('')}
            </ul>
            <p class="recetteTextDetailsDescription">${recipe.description}</p>
          </div>
        </div>
      </article>`;
  })
  .join('');
  recipesSection.innerHTML = htmlString;
};

    
loadData();    

    