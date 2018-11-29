"use strict";
//TO DO:
//* Add function to update the "watched" field on a show

//INTRODUCTION
function introText() {
    if (document.querySelector("#introText").className === "hide") {
        document.querySelector("#introText").className = "active";
        document.querySelector("#readMore").innerHTML ="...hide text.";

    } else if (document.querySelector("#introText").className === "active") {
        document.querySelector("#introText").className = "hide";
        document.querySelector("#readMore").innerHTML ="...read more.";

    };
};

//INPUT STORAGE
function submit() {
    //Get input values and pass them to addNewShow function
    event.preventDefault();

    let titleVar = document.querySelector("#titleInp").value.toLowerCase();
    let genreVar = document.querySelector("#genreInp").value.toLowerCase();
    let watchedVar = document.querySelector("#watchedInp").checked;
    let typeFilmVar = document.querySelector("#filmInp").checked;
    let typeSeriesVar = document.querySelector("#seriesInp").checked;
    let typeVar;
    if (typeFilmVar === false && typeSeriesVar === false) {
        alert("Pick film or series.");
        return;
    } else if (typeFilmVar === false) {
        typeVar = "Series";
    } else {
        typeVar = "Film";
    };
    
    addNewShow(titleVar, typeVar, genreVar, watchedVar);
};

//Function to add a new show to LS
function addNewShow(titleArg, typeArg, genreArg, watchedArg) {
    //Get showList from storage, parse then store it or make a new array(for null/empty LS)
  let showList = JSON.parse(localStorage.getItem("showList") || "[]");
    //Make a new show object with passed variables
  let show = {
    title: titleArg,
    type: typeArg,
    genre: genreArg,
    watched: watchedArg
  };
  //push to showList array
  showList.push(show);
  //Stringify showList then set item as showList into LS
  localStorage.setItem("showList", JSON.stringify(showList));

  //Get form inputs/fields and run them through the clearForm function
  let formElements = inputForm.elements;
  clearForm(formElements);
};

function clearForm(elementsToClear) {
    for (let i = 0; i < elementsToClear.length; i++) {
        let inputType = elementsToClear[i].type.toLowerCase();

        switch (inputType) {
            case "text":
            case "password":
            case "textarea":
            case "hidden":
                elementsToClear[i].value = "";
                break;
            case "radio":
            case "checkbox":
                if (elementsToClear[i].checked) {
                    elementsToClear[i].checked = false;
                };
                break;
            case "select-one":
            case "select-multi":
                elementsToClear[i].selectedIndex = -1;
                break;
            default:
                break;
        };
    };
};
function clearResult() {
    document.querySelector("#resultTitle").innerHTML = "";
    document.querySelector("#resultGenre").innerHTML = "";
    document.querySelector("#resultType").innerHTML = "";
    document.querySelector("#resultWatched").innerHTML = "";
    //Give below hidden class to target all as one
    document.querySelector("#clearBtn").className = "hide";
    document.querySelector("#removeBtn").className = "hide";

    document.querySelector("#greetingText").className = "active";
}


//RETRIEVING AND PRINTING
function printToHTML(show) {
    document.querySelector("#resultTitle").innerHTML = show.title;
    document.querySelector("#resultGenre").innerHTML = "Genre:" + " " + show.genre;
    document.querySelector("#resultType").innerHTML = "Type:" + " " + show.type;
    document.querySelector("#resultWatched").innerHTML = "Seen it?" + " " + show.watched;
    //Give below hidden class to target all as one
    document.querySelector("#clearBtn").className = "inlineActive";
    document.querySelector("#removeBtn").className = "inlineActive";

    let showResultTab = document.querySelector("#resultTab");
    showResultTab.click();
}

function searchShow() {
    let resultTitle = document.querySelector("#resultTitle").innerHTML;

    let searchInput = document.querySelector("#searchInput").value.toLowerCase();
    //Get showList from LS, parse and store in variable - or alert empty
    let showList = JSON.parse(localStorage.getItem("showList"));

    //OR null isn't working
    //OR null isn't working
    if (showList === null) {
        alert("Show list is empty.")
    } else if (showList.length === 0) {
            alert("Show list is empty.")


    } else {
        for (let i = 0; i < showList.length; i++) {
            if (event.target === document.querySelector("#searchBtn")) {
                if (searchInput === showList[i].title) {
                    document.querySelector("#greetingText").className = "hide";
                    printToHTML(showList[i]);
                };

            } else if (event.target === document.querySelector("#randomBtn")) {
                document.querySelector("#greetingText").className = "hide";
                printToHTML(showList[Math.floor(Math.random()*showList.length)]);

            } else if (event.target === document.querySelector("#showAllBtn")) {
                const container = document.createElement("div");
                container.setAttribute("class", "showWrap");

                const h5 = document.createElement("h5");
                h5.textContent = "Title: " + showList[i].title;

                const showType = document.createElement("span");
                showType.textContent = "Type: " + showList[i].type;

                const showGenre = document.createElement("span");
                showGenre.textContent = "Genre: " + showList[i].genre;

                const showSeenIt = document.createElement("span");
                showGenre.textContent = "Seen it? " + showList[i].watched;

                container.appendChild(h5);
                container.appendChild(showType);
                container.appendChild(showGenre);
                container.appendChild(showSeenIt);
                let showListRoot = document.querySelector("#showListRoot");
                showListRoot.appendChild(container);

                document.querySelector("#showAllBtn").className = "hide";
                document.querySelector("#hideListBtn").className = "inlineActive";

            } else if (event.target === document.querySelector("#removeBtn")) {
                if (resultTitle === showList[i].title) {
                    let showIndex = showList.indexOf(showList[i]);
                    //Use filter to remove object and return new array
                    let showFiltered = showList.filter(function(value, index, array) {
                        return showIndex !== index;
                    });

                    localStorage.setItem("showList", JSON.stringify(showFiltered));

                    if (document.querySelector(".showWrap")) {
                        document.querySelector("#hideListBtn").click();
                    };
                };
            };
        };
    };
};

function hideList() {
    let allShows = document.querySelectorAll(".showWrap");

    for (let i=0; i < allShows.length; i++) {
        allShows[i].parentNode.removeChild(allShows[i])
    }

    document.querySelector("#showAllBtn").className = "inlineActive";
    document.querySelector("#hideListBtn").className = "hide";
};

function onDeviceReady(){
    document.addEventListener("backbutton", function(e){
        e.preventDefault();
        navigator.app.exitApp();
    }, false);
}


//Event Listeners
document.querySelector("#readMore").addEventListener("click", introText)
document.querySelector("#removeBtn").addEventListener("click", searchShow);
document.querySelector("#hideListBtn").addEventListener("click", hideList);
document.querySelector("#showAllBtn").addEventListener("click", searchShow);
document.querySelector("#clearBtn").addEventListener("click", clearResult);
document.querySelector("#randomBtn").addEventListener("click", searchShow);
document.querySelector("#searchBtn").addEventListener("click", searchShow);
document.querySelector("#searchInput").addEventListener("keyup", function(event) {
    event.preventDefault();
    if(event.keyCode === 13) {
        document.querySelector("#searchBtn").click();
    }
});
//Get form and add the event listener 'submit', for when form is submitted
document.querySelector("#inputForm").addEventListener("submit", submit);
document.addEventListener("deviceready", onDeviceReady, false);