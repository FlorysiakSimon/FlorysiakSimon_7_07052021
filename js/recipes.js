/*switch (value) { 
    case 'ingredients':
     
    break;
    case 'appareils':
      
    break;
    case'ustensiles':
      
    break;
  }*/




  switch (value) { 
    case 'ingredients':
      ingredientsList.innerHTML = '';
      if(filteredData.length == 0){
        data.recipes.map((recipe) => {ingredients.push(recipe.ingredients.map(ingredient => ingredient.ingredient))})
      }
      filteredData.map((recipe) => {ingredients.push(recipe.ingredients.map(ingredient => ingredient.ingredient))})
      ingredients = [].concat.apply([], ingredients); // fusionne array
      ingredients = uniq(ingredients); // filter duplicate
      ingredientsFilter.push(filtreTexte(ingredients,searchString));
      ingredientsFilter = [].concat.apply([], ingredientsFilter); // fusionne array
      ingredientsFilter.forEach(list => {ingredientsList.innerHTML += `<li class="ingredientsListItem"><button data-category="ingredients" value="`+list+`"class="buttons">`+list+`</button></li>`})  
      ingredientsFilter = [];
      }
    break;
    case 'appareils':
      appareilsList.innerHTML = '';
      filteredData.map((recipe) => {appliance.push(recipe.appliance)})
      appliance = [].concat.apply([], appliance); // fusionne array
      appliance = uniq(appliance); // filter duplicate
      applianceFilter.push(filtreTexte(appliance,searchString));
      applianceFilter = [].concat.apply([], applianceFilter); // fusionne array
      applianceFilter.forEach(list => {appareilsList.innerHTML += `<li class="appareilsListItem"><button data-category="appareils" value="`+list+`"class="buttons">`+list+`</button></li>`})  
      applianceFilter = [];
    break;
    case'ustensiles':
      ustensilesList.innerHTML = '';
      filteredData.map((recipe) => {ustensils.push(recipe.ustensils)}); //push data in array
      ustensils = [].concat.apply([], ustensils); // fusionne array
      ustensils = uniq(ustensils); // filter duplicate
      ustensilsFilter.push(filtreTexte(ustensils,searchString));
      ustensilsFilter = [].concat.apply([], ustensilsFilter); // fusionne array
      ustensilsFilter.forEach(list => {ustensilesList.innerHTML += `<li class="ustensilesListItem"><button data-category="ustensiles" value="`+list+`"class="buttons">`+list+`</button></li>`})  
      ustensilsFilter = [];
    break;
  }