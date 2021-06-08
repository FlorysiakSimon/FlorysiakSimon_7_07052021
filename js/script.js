//DOM
const appareilsList = document.getElementById("appareilsList");
const searchBar = document.getElementById("searchbar");
const recipesSection = document.querySelector(".recette");
const ustensilesList = document.getElementById("ustensilesList");
const ingredientsList = document.getElementById("ingredientsList");
const buttons = document.getElementsByClassName('buttons');
const buttonsTag = document.getElementsByClassName('buttonsTag');
const searchListTextInput = document.querySelectorAll('.searchListTextInput');
const tags = document.getElementById('tags');
let data = []; // data
let appliance = []; //tableau appareils
let ingredients = []; //tableau ingredients
let ustensils = []; //tableau ustensiles
let filteredData =[]; 
let tagAppliance =[];
let tagIngredients = [];
let tagUstensiles = [];
//FILTER 
let uniq = unique => [...new Set(unique)];
const filtreTexte = (arr, requete) => {
  return arr.filter(el =>  el.toLowerCase().indexOf(requete.toLowerCase()) !== -1);
}
const arrayRemove = (arr, value) => {return arr.filter(function(ele){return ele != value;});}

//searchbar
searchBar.addEventListener('keyup', (e) => {
  if (searchBar.value.length > 2){
    const searchString = e.target.value.toLowerCase();
     filteredData = data.recipes.filter((recipe) => {
      return (
          recipe.name.toLowerCase().includes(searchString) ||
          recipe.ingredients.includes((ingredients) => ingredients.ingredient.toLowerCase().includes(tagIngredients)) ||
          recipe.description.toLowerCase().includes(searchString)
      );
    });
    displayAll(filteredData);
   }else{
    filteredData=[];
    loadData();
  }
});



//dropdown input
searchListTextInput.forEach(el => el.addEventListener('keyup', e => {
  const value = e.target.getAttribute("data-value") ;
  const searchString = e.target.value.toLowerCase();
  if(value === 'ingredients'){
    ingredientsList.innerHTML = '';
    if(!filteredData.length){
      data.recipes.map((recipe) => {ingredients.push(recipe.ingredients.map(ingredient => ingredient.ingredient))})
    }
    filteredData.map((recipe) => {ingredients.push(recipe.ingredients.map(ingredient => ingredient.ingredient))})
    ingredients = [].concat.apply([], ingredients); // fusionne array
    ingredients = uniq(ingredients); // filter duplicate
    ingredients = filtreTexte(ingredients,searchString);
    ingredients.forEach(list => {ingredientsList.innerHTML += `<li class="ingredientsListItem"><button data-category="ingredients" value="`+list+`"class="buttons">`+list+`</button></li>`})  
    ingredients = [];
  }
  if(value === 'appareils'){
    appareilsList.innerHTML = '';
    if(!filteredData.length){
      data.recipes.filter((recipe) => appliance.push(recipe.appliance));
    }
    filteredData.map((recipe) => {appliance.push(recipe.appliance)})
    appliance = [].concat.apply([], appliance); // fusionne array
    appliance = uniq(appliance); // filter duplicate
    appliance = filtreTexte(appliance,searchString);
    appliance.forEach(list => {appareilsList.innerHTML += `<li class="appareilsListItem"><button data-category="appareils" value="`+list+`"class="buttons">`+list+`</button></li>`})  
    appliance = [];
  }
  if(value === 'ustensiles'){
    ustensilesList.innerHTML = '';
    if(!filteredData.length){
      data.recipes.map((recipe) => {ustensils.push(recipe.ustensils)});
    }
    filteredData.map((recipe) => {ustensils.push(recipe.ustensils)}); //push data in array
    ustensils = [].concat.apply([], ustensils); // fusionne array
    ustensils = uniq(ustensils); // filter duplicate
    ustensils = filtreTexte(ustensils,searchString);
    ustensils.forEach(list => {ustensilesList.innerHTML += `<li class="ustensilesListItem"><button data-category="ustensiles" value="`+list+`"class="buttons">`+list+`</button></li>`})  
    ustensils = [];
  }
  eventButton();
}));

const loadData = async () => {
  try {
      const res = await fetch('./js/data.js');
      data = await res.json();
      const recettes = data.recipes;
      displayAll(recettes);
  } catch (err) {
      console.error(err);
  }
};
const eventButton = () => {
  for (let button of buttons) {
    const category = button.getAttribute("data-category") ;
    if(!filteredData.length){ filteredData = data.recipes }
    button.addEventListener("click", function () {
      switch (category) { 
        case 'ingredients':
          tags.innerHTML += `<button class="buttonsTag buttonsTagIngredients" data-category="ingredients" value="${this.value}" type="button">${this.value}<i class="far fa-times-circle close"></i></button>`;
          tagIngredients.push(this.value);
          filteredData = filteredData.filter((recipe) => {return recipe.ingredients.some((ingredients) => tagIngredients.some((el) => ingredients.ingredient.includes(el)))})
          break;
        case 'appareils':
          tags.innerHTML += `<button class="buttonsTag buttonsTagAppareils" data-category="appareils" value="${this.value}" type="button">${this.value}<i class="far fa-times-circle close"></i></button>`;
          tagAppliance.push(this.value);
          filteredData = filteredData.filter((recipe) => {return recipe.appliance.includes(tagAppliance)});
          break;
        case 'ustensiles':
          tags.innerHTML += `<button class="buttonsTag buttonsTagUstensiles" data-category="ustensiles" value="${this.value}" type="button">${this.value}<i class="far fa-times-circle close"></i></button>`;
          tagUstensiles.push(this.value);  
          filteredData = filteredData.filter((recipe) => {return recipe.ustensils.some((ustensils) => tagUstensiles.some((el) => ustensils.includes(el)))})
        break;
      }
      displayAll(filteredData);
      removeTag();
    });
  }
}

const removeTag = () =>{
  for (let buttonTag of buttonsTag) {
    const category = buttonTag.getAttribute("data-category") ;
    buttonTag.addEventListener('click', function () {
      switch (category) { 
        case 'ingredients':
          tagIngredients = arrayRemove(tagIngredients,this.value)
          buttonTag.parentNode.removeChild(buttonTag)
          break;
        case 'appareils':
          tagAppliance = arrayRemove(tagAppliance,this.value)
          buttonTag.parentNode.removeChild(buttonTag)
          break;
        case 'ustensiles':
          tagUstensiles = arrayRemove(tagUstensiles,this.value)
          buttonTag.parentNode.removeChild(buttonTag)
        break;
      }
      filteredData = data.recipes.filter((recipe) => {
        return (
          
            recipe.ingredients.some((ingredients) => ingredients.ingredient.includes(tagIngredients)) &&
            recipe.appliance.includes(tagAppliance) &&
            recipe.ustensils.some((ustensils) => ustensils.includes(tagUstensiles))
            );
      });
      displayAll(filteredData);
    });
  }
}

//display all data
const displayAll = (array) => {
  displayRecettes(array);
  displayAppliance(array);
  displayIngredients(array);
  displayUstensiles(array);
  eventButton();
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
  const htmlAppliance = appliance.map((list) =>{return `<li class="appareilsListItem"><button data-category="appareils" class="buttons" value="${list}">${list}</button></li>`}).join('');
  appareilsList.innerHTML = htmlAppliance;
  appliance = []; //reset array
}

const displayIngredients = (list) => {
  list.map((recipe) => {ingredients.push(recipe.ingredients.map(ingredient => ingredient.ingredient))}); //push data in array
  var merged = [].concat.apply([], ingredients); // fusionne array
  merged = uniq(merged); // filter duplicate
  const htmlIngredients = merged.map((merged) =>{return `<li class="ingredientsListItem"><button data-category="ingredients" class="buttons" value="${merged}">${merged}</button></li>`}).join('');
   ingredientsList.innerHTML = htmlIngredients;
   ingredients = []; //reset array
 }

 const displayUstensiles = (list) => {
  list.map((recipe) => {ustensils.push(recipe.ustensils)}); //push data in array
  var merged = [].concat.apply([], ustensils); // fusionne array
  merged = uniq(merged); // filter duplicate
  const htmlUstensiles = merged.map((merged) =>{return `<li class="ustensilesListItem"><button data-category="ustensiles" class="buttons" value="${merged}">${merged}</button></li>`}).join('');
  ustensilesList.innerHTML = htmlUstensiles;
  ustensils = []; //reset array
 }

loadData();

