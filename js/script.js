//IMPORT
//import {recipes} from "./recipes.js"
//DOM
const appareilsList = document.getElementById("appareilsList");
const searchBar = document.getElementById("searchbar")
const recipesSection = document.querySelector(".recette");
const ustensilesList = document.getElementById("ustensilesList");
const ingredientsList = document.getElementById("ingredientsList")
const buttons = document.getElementsByClassName('buttons')
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
  displayAppliance(filteredData)
  displayIngredients(filteredData)
});
  
//event buttons
console.log(buttons)

const loadData = async () => {
  try {
      const res = await fetch('./js/data.js');
      data = await res.json();
      const recettes = data.recipes
      displayRecettes(recettes);
      displayAppliance(recettes)
      displayIngredients(recettes)

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
  if(article.length==0){
    recipesSection.innerHTML= `<p class="recetteEmpty">Aucune recette ne correspond à votre critère... Vous pouvez chercher « tarte aux pommes », « poisson », etc</p>`
  }else{
  recipesSection.innerHTML = htmlString;
  }
}

const displayAppliance = (list) => {
  list.map((recipe) => {appliance.push(recipe.appliance)});
  appliance = uniq(appliance);
  console.log(appliance)
  //appliance.forEach(list => {appareilsList.innerHTML += `<li class="appareilsListItem"><button class="button">`+list+`</button></li>`});
  const htmlAppliance = list
  .map((list) =>{
    return `<li class="appareilsListItem"><button class="buttons" value="${list.appliance}">${list.appliance}</button></li>`})
  .join('');
  appareilsList.innerHTML = htmlAppliance
}

const displayIngredients = (list) => {
   const htmlIngredients = list
    .map((list) =>{
     return `${list.ingredients.map(ingredient => `<li class="ingredientsListItem"><button class="buttons">${ingredient.ingredient}</button></li>`).join('')}`})
    .join('');
   ingredientsList.innerHTML = htmlIngredients
 }

loadData();    

    