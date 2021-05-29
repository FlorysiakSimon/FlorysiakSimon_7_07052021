//DOM
const appareilsList = document.getElementById("appareilsList");
const searchBar = document.getElementById("searchbar");
const recipesSection = document.querySelector(".recette");
const ustensilesList = document.getElementById("ustensilesList");
const ingredientsList = document.getElementById("ingredientsList");
const buttons = document.getElementsByClassName('buttons');
const searchListTextInput = document.querySelectorAll('.searchListTextInput');
const tags = document.getElementById('tags');
let data = []; // data
let allAppliance = []; //tableau tous les appareils
let appliance = []; //tableau appareils
let applianceFilter = []; //tableau appareils filtré
let allIngredients= [];
let ingredients = []; //tableau ingredients
let ingredientsFilter= []; //tableau ingredients filtré
let allUstensils = []
let ustensils = []; //tableau ustensiles
let ustensilsFilter = []; //tableau ustensiles filtré
let filteredData = undefined
//FILTER 
let uniq = unique => [...new Set(unique)];
const filtreTexte = (arr, requete) => {
  return arr.filter(el =>  el.toLowerCase().indexOf(requete.toLowerCase()) !== -1);
}
//searchbar
searchBar.addEventListener('keyup', (e) => {
  if (searchBar.value.length > 2){
    const searchString = e.target.value.toLowerCase();
     filteredData = data.recipes.filter((recipe) => {
      return (
          recipe.name.toLowerCase().includes(searchString) ||
          allIngredients.includes(searchString) ||
          recipe.description.toLowerCase().includes(searchString)
      );
    });
    displayRecettes(filteredData);
    displayAppliance(filteredData);
    displayIngredients(filteredData);
    displayUstensiles(filteredData);
  }else{
    loadData();
  }
});

//dropdown input
searchListTextInput.forEach(el => el.addEventListener('keyup', e => {
  const value = e.target.getAttribute("data-value") ;
  const searchString = e.target.value.toLowerCase();  
  if(value === 'ingredients'){
    ingredientsList.innerHTML = '';
    filteredData.map((recipe) => {ingredients.push(recipe.ingredients.map(ingredient => ingredient.ingredient))})
    ingredients = [].concat.apply([], ingredients); // fusionne array
    ingredients = uniq(ingredients); // filter duplicate
    ingredientsFilter.push(filtreTexte(ingredients,searchString));
    ingredientsFilter = [].concat.apply([], ingredientsFilter); // fusionne array
    ingredientsFilter.forEach(list => {ingredientsList.innerHTML += `<li class="ingredientsListItem"><button value="`+list+`"class="buttons">`+list+`</button></li>`})  
    ingredientsFilter = [];
  }
  if(value === 'appareils'){
    //const filteredData = data.recipes.filter((recipe) =>recipe.appliance.toLowerCase().includes(searchString));
    //displayAppliance(filteredData)
    appareilsList.innerHTML = '';
    filteredData.map((recipe) => {appliance.push(recipe.appliance)})
    appliance = [].concat.apply([], appliance); // fusionne array
    appliance = uniq(appliance); // filter duplicate
    applianceFilter.push(filtreTexte(appliance,searchString));
    applianceFilter = [].concat.apply([], applianceFilter); // fusionne array
    applianceFilter.forEach(list => {appareilsList.innerHTML += `<li class="appareilsListItem"><button value="`+list+`"class="buttons">`+list+`</button></li>`})  
    applianceFilter = [];
  }
  if(value === 'ustensiles'){
    ustensilesList.innerHTML = '';
    filteredData.map((recipe) => {ustensils.push(recipe.ustensils)}); //push data in array
    ustensils = [].concat.apply([], ustensils); // fusionne array
    ustensils = uniq(ustensils); // filter duplicate
    ustensilsFilter.push(filtreTexte(ustensils,searchString));
    ustensilsFilter = [].concat.apply([], ustensilsFilter); // fusionne array
    ustensilsFilter.forEach(list => {ustensilesList.innerHTML += `<li class="ustensilesListItem"><button value="`+list+`"class="buttons">`+list+`</button></li>`})  
    ustensilsFilter = [];
  }
}));

//event buttons


//console.log(buttons)




const loadData = async () => {
  try {
      const res = await fetch('./js/data.js');
      data = await res.json();
      const recettes = data.recipes
      displayRecettes(recettes);
      displayAppliance(recettes);
      displayIngredients(recettes);
      displayUstensiles(recettes);
      allArray(recettes)
      eventButton()
  } catch (err) {
      console.error(err);
  }
};

const eventButton = () => {

  for (let button of buttons) {
    button.addEventListener("click", function () {
      tags.innerHTML += `<button class="buttonsTag" type="button">${this.value}<i class="far fa-times-circle close"></i></button>`;

    });
    
  }
}
const allArray = (array) => {
  array.map((recipe) => {allIngredients.push(recipe.ingredients.map(ingredient => ingredient.ingredient))}); //push data in array
  allIngredients = [].concat.apply([], allIngredients); 
  allIngredients = uniq(allIngredients); // filter duplicate
  array.map((recipe) => {allAppliance.push(recipe.appliance)}); //push data in array
  allAppliance = uniq(allAppliance); // filter duplicate
  array.map((recipe) => {allUstensils.push(recipe.ustensils)}); //push data in array   
  allUstensils = [].concat.apply([], allUstensils); 
  allUstensils = uniq(allUstensils); // filter duplicate
 }

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
  list.map((recipe) => {appliance.push(recipe.appliance)}); //push data in array
  appliance = uniq(appliance); // filter duplicate
  const htmlAppliance = appliance.map((list) =>{return `<li class="appareilsListItem"><button onclick="" class="buttons" value="${list}">${list}</button></li>`}).join('');
  appareilsList.innerHTML = htmlAppliance;
  appliance = []; //reset array
}

const displayIngredients = (list) => {
  list.map((recipe) => {ingredients.push(recipe.ingredients.map(ingredient => ingredient.ingredient))}); //push data in array
  var merged = [].concat.apply([], ingredients); // fusionne array
  merged = uniq(merged); // filter duplicate
  const htmlIngredients = merged.map((merged) =>{return `<li class="appareilsListItem"><button class="buttons" value="${merged}">${merged}</button></li>`}).join('');
   ingredientsList.innerHTML = htmlIngredients;
   ingredients = []; //reset array
 }

 const displayUstensiles = (list) => {
  list.map((recipe) => {ustensils.push(recipe.ustensils)}); //push data in array
  var merged = [].concat.apply([], ustensils); // fusionne array
  merged = uniq(merged); // filter duplicate
  const htmlUstensiles = merged.map((merged) =>{return `<li class="appareilsListItem"><button class="buttons" value="${merged}">${merged}</button></li>`}).join('');
  ustensilesList.innerHTML = htmlUstensiles;
  ustensils = []; //reset array
 }

loadData();

