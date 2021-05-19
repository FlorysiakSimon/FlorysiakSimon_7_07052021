//IMPORT
import {recipes} from "./recipes.js"
//DOM
const appareilsList = document.getElementById("appareilsList");
var appliance = []; //tableau appareils
var ingredients = []; //tableau ingredients
var ustensils = [] //tableau ustensiles
var article = undefined
//FILTER DUPLICATE
let uniq = unique => [...new Set(unique)];
//GET JSON FILE
let myRequest = new Request("./js/data.js") ;
fetch(myRequest)
    .then(function(resp){
        return resp.json();
    })
    //display homepage data
    .then((data) => {
      const recettes = data.recipes;
      console.log(recettes)
     
      for (let i in recettes) {
        article = new recipes(recettes[i]);
        article.toHTML(); // recettes
        article.toHTMLList();

        appliance.push(article.appliance)
        ingredients.push(article.ingredients)
        ustensils.push(article.ustensils)
      }
      
      
      
     
      appliance = uniq(appliance); // filtre appareils
      //console.log(appliance)
      /* ingredients = uniq(ingredients)
      */
      appliance.forEach(list => {console.log(list);});
      //appareilsList.innerHTML += `<li class="appareilsListItem"><button class="button">`+list+`</button></li>`
      article.ingredients


      //add event listener
      article.dropdown();
      article.search();
    });
    