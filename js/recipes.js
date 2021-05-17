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

    dropdown(){
        const searchList = document.querySelectorAll(".searchList");
        const searchListText = document.querySelectorAll(".searchListText");
        for (let i = 0; i < searchList.length; i++) {
            searchList[i].addEventListener('click', () => {
				console.log(searchList[i].childNodes)
                console.log(searchListText[i].childNodes)

                searchList[i].classList.toggle('open');
                if  (searchList[i].classList.contains('open')){
                    searchListText[i].childNodes[1].style.display = "block";
                    searchListText[i].childNodes[3].style.display = "none";
                    searchListText[i].childNodes[5].style.transform = "rotate(180deg)";
                    searchList[i].childNodes[3].style.display = "block";
                }
                else {
                    searchListText[i].childNodes[1].style.display = "none";
                    searchListText[i].childNodes[3].style.display = "block";
                    searchListText[i].childNodes[5].style.transform = "rotate(360deg)";
                    searchList[i].childNodes[3].style.display = "none";
                }
			});
          }

       
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