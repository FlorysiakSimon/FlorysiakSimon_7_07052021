const searchList = document.querySelectorAll(".searchList");
const searchListText = document.querySelectorAll(".searchListText");
const arrow = document.querySelectorAll(".arrow")
for (let i = 0; i < searchList.length; i++) {
    searchList[i].addEventListener('click', () => {
        searchList[i].classList.toggle('open');
        if  (searchList[i].classList.contains('open')){
            searchListText[i].childNodes[1].style.display = "block";
            searchListText[i].childNodes[1].focus();
            searchListText[i].childNodes[3].style.display = "none";
            arrow[i].style.transform = "rotate(180deg)";
            searchList[i].childNodes[3].style.display = "grid";
        }
        else {
            searchListText[i].childNodes[1].style.display = "none";
            searchListText[i].childNodes[3].style.display = "block";
            arrow[i].style.transform = "rotate(360deg)";
            searchList[i].childNodes[3].style.display = "none";
        }
	});
}