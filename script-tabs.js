"use strict";
// Arguement only for when show is searched and user isnt on result tab already
function tabClick(clickedTab) {
    //get existing elements with .active class
    let activeTabs = document.querySelectorAll(".active");

    //Iterate over activeTabs
    for (let i=0; i < activeTabs.length; i++){
        //replace .active class with no class
        activeTabs[i].className = activeTabs[i].className.replace(" active", "");
    }

    //Add active calss to clicked tab
    event.target.className += " active"
    //Add active class to clicked tab's content. Find content ID through splitting event target URL, then give active class
    document.getElementById(event.target.href.split("#")[1]).classList += " active";
};

//Get tabs and add event listener for click, then run tabCLick
const tabsVar = document.querySelector("#tabWrap");
tabsVar.addEventListener("click", tabClick);