//IMPORT
import {recipes} from "./recipes.js"
//DOM
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
        var article = new recipes(recettes[i]);
        
        article.toHTML();
        
      }
      article.dropdown();
    });
    