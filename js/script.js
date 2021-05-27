//DOM
const appareilsList = document.getElementById("appareilsList");
const searchBar = document.getElementById("searchbar");
const recipesSection = document.querySelector(".recette");
const ustensilesList = document.getElementById("ustensilesList");
const ingredientsList = document.getElementById("ingredientsList");
const buttons = document.getElementsByClassName('buttons');
const searchListTextInput = document.querySelectorAll('.searchListTextInput');
let data = []; // data
let appliance = []; //tableau appareils
let ingredients = []; //tableau ingredients
let ingredientsFilter= []; //tableau ingredients filtré
let ustensils = []; //tableau ustensiles
let ustensilsFilter = []; //tableau ustensiles filtré

//FILTER 
let uniq = unique => [...new Set(unique)];
const filtreTexte = (arr, requete) => {
  return arr.filter(el =>  el.toLowerCase().indexOf(requete.toLowerCase()) !== -1);
}

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
  displayRecettes(filteredData);
  displayAppliance(filteredData);
  displayIngredients(filteredData);
  displayUstensiles(filteredData);
});

//dropdown input
searchListTextInput.forEach(el => el.addEventListener('keyup', e => {
  const value = e.target.getAttribute("data-value") ;
  const searchString = e.target.value.toLowerCase();  
  if(value === 'ingredients'){
    ingredientsList.innerHTML = '';
    data.recipes.map((recipe) => {ingredients.push(recipe.ingredients.map(ingredient => ingredient.ingredient))})
    var merged = [].concat.apply([], ingredients); // fusionne array
    merged = uniq(merged); // filter duplicate
    ingredientsFilter.push(filtreTexte(merged,searchString));
    merged = [].concat.apply([], ingredientsFilter); // fusionne array
    merged = uniq(merged); // filter duplicate
    merged.forEach(list => {ingredientsList.innerHTML += `<li class="appareilsListItem"><button class="button">`+list+`</button></li>`})  
    ingredientsFilter = [];
  }
  if(value === 'appareils'){
    const filteredData = data.recipes.filter((recipe) =>recipe.appliance.toLowerCase().includes(searchString));
    displayAppliance(filteredData)
  }
  if(value === 'ustensiles'){
    ustensilesList.innerHTML = '';
    data.recipes.map((recipe) => {ustensils.push(recipe.ustensils)}); //push data in array
    var mergedUstentils = [].concat.apply([], ustensils); // fusionne array
    mergedUstentils = uniq(mergedUstentils); // filter duplicate
    ustensilsFilter.push(filtreTexte(mergedUstentils,searchString));
    mergedUstentils = [].concat.apply([], ustensilsFilter); // fusionne array
    mergedUstentils = uniq(mergedUstentils); // filter duplicate
    mergedUstentils.forEach(list => {ustensilesList.innerHTML += `<li class="appareilsListItem"><button class="button">`+list+`</button></li>`})  
    ustensilsFilter = [];
  }
}));

//event buttons
console.log(buttons)

const loadData = async () => {
  try {
      const res = await fetch('./js/data.js');
      data = await res.json();
      const recettes = data.recipes
      displayRecettes(recettes);
      displayAppliance(recettes);
      displayIngredients(recettes);
      displayUstensiles(recettes);

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
  list.map((recipe) => {appliance.push(recipe.appliance)}); //push data in array
  appliance = uniq(appliance); // filter duplicate
  const htmlAppliance = appliance.map((list) =>{return `<li class="appareilsListItem"><button class="buttons" value="${list}">${list}</button></li>`}).join('');
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