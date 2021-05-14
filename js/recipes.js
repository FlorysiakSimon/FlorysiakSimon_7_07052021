export class recipes {
    constructor(data){
        this.id = data.id;
        this.name = data.name;
        this.servings = data.servings;
        this.ingredients = data.ingredients
        this.time = data.time;
        this.description = data.description;
        this.appliance = data.appliance;
        this.ustensils = data.ustensils

        this.recipesSection = document.querySelector(".recette"); // photographes  index.html

    }

    toHTML(){
        this.recipesSection.innerHTML += ` <article class="recetteArticle">
                    <div class="recetteImg"></div>
		            <div class="recetteText">
			            <div class="recetteTextTitle">
				            <h3>${this.name}</h3>
				            <p class="recetteTextTitleTime"><i class="far fa-clock"></i> ${this.time} min</p>
			            </div>
			            <div class="recetteTextDetails">
				            <ul class="recetteTextDetailsIngredients">
                                ${this.ingredients.map(ingredient => `<li class="ingredient">${ingredient.ingredient}: <span class="quantity">${ingredient.quantity} ${ingredient.unit}</span></li>`).join('')}
                            </ul>
				            <p class="recetteTextDetailsDescription">${this.description}</p>
			            </div>
		            </div>
                </article>
        `

    }
}