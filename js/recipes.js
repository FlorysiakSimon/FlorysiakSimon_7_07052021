export class recipes {
    constructor(data){
        //this.recettes = data;
        this.id = data.id;
        this.name = data.name;
        this.servings = data.servings;
        this.ingredients = data.ingredients
        this.time = data.time;
        this.description = data.description;
        this.appliance = data.appliance;
        this.ustensils = data.ustensils

        this.appareilsList = document.getElementById("appareilsList");
        this.ingredientsList = document.getElementById("ingredientsList"); 
        this.ustensilesList = document.getElementById("ustensilesList");
        this.recipesSection = document.querySelector(".recette");

    }

    dropdown(){
        
        const searchList = document.querySelectorAll(".searchList");
        const searchListText = document.querySelectorAll(".searchListText");
        for (let i = 0; i < searchList.length; i++) {
            searchList[i].addEventListener('click', () => {
				//console.log(searchList[i].childNodes)
                //console.log(searchListText[i].childNodes)
                searchList[i].classList.toggle('open');
                if  (searchList[i].classList.contains('open')){
                    searchListText[i].childNodes[1].style.display = "block";
                    searchListText[i].childNodes[1].focus();
                    searchListText[i].childNodes[3].style.display = "none";
                    searchListText[i].childNodes[5].style.transform = "rotate(180deg)";
                    searchList[i].childNodes[3].style.display = "grid";
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

    search(){
        
        const searchBar = document.getElementById("searchbar")
        searchBar.addEventListener("keypress", myFunction);

        function myFunction() {
            if (searchBar.value.length > 1){
            console.log('test');
            }
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
    toHTMLList(){
        /*const ustensiles = document.getElementById("ustensilesList");
        const appareils = document.getElementById("appareilsList");
        const ingredients = document.getElementById("ingredientsList");
        console.log(ustensiles,appareils,ingredients)*/

        this.appareilsList.innerHTML += `<li class="appareilsListItem">
                                        <button class="button">${this.appliance}</button>
                                    </li>`

        this.ingredientsList.innerHTML += `${this.ingredients.map(ingredient => `<li class="ingredientsListItem"><button class="button">${ingredient.ingredient}</button></li>`).join('')}`
		
       this.ustensilesList.innerHTML += `${this.ustensils.map(ustensil => `<li class="ustensilesListItem"><button class="button">${ustensil}</button></li>`).join('')}`

    }

    filterDuplicate(media,value) {
        this.media = media;
        this.cleanGallery();
        switch (value)
            {
                case "Popularity":
                this.media.sort((a, b) => b.likes - a.likes); // trie par like
                break
                case "Date":
                this.media.sort((a,b) =>  new Date(b.date) - new Date(a.date)); // trie selon la date 
                break
                case "Title":
                this.media.sort((a, b) => a.alt.localeCompare(b.alt, 'fr', {ignorePunctuation: true})); //trie par titre
            }
    }
}