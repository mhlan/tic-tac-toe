//**********************//
//***** Modules ******//
//******************//

//toggles element's display state by ID
const toggleDisplay = (function() {
  const hideElement = function(elementID) {
    document.getElementById(elementID).style.display = "none";
  };
  const showElement = function(elementID) {
    document.getElementById(elementID).style.display = "";
  };
  return {
    callHideElement: function(elementID) {
      hideElement(elementID);
      console.log(`${elementID} has been hidden.`);
    },
    callShowElement: function(elementID) {
      showElement(elementID);
      console.log(`${elementID} is being displayed`);
    }
  };
})();

//generate HTML for the start page
const startPage = (function() {
  const createHTML = function() {
    const start = document.createElement("div");
    const header = document.createElement("header");
    const h1 = document.createElement("h1");
    h1.innerText = "Tic Tac Toe";
    const a = document.createElement("a");
    a.setAttribute("href", "#");
    a.className = "button";
    a.innerText = "Start game";
    start.classList.add("screen", "screen-start");
    start.id = "start";
    start.appendChild(header);
    header.appendChild(h1);
    header.appendChild(a);
    document.body.appendChild(start);
  };

  return {
    callCreateHTML: function() {
      createHTML();
      console.log("start page HTML generated.");
    }
  };
})();

//sets current player by adding/removing "active" class
const currentPlayer = (function() {
  const player1 = document.querySelector("#player1");
  const player2 = document.querySelector("#player2");

  const makeActive = function() {
    if (
      !player1.classList.contains("active") &&
      !player2.classList.contains("active")
    ) {
      player1.classList.add("active");
    } else if (player1.classList.contains("active")) {
      player1.classList.remove("active");
      player2.classList.add("active");
    } else {
      player2.classList.remove("active");
      player1.classList.add("active");
    }
  };
  return {
    player1: player1,
    player2: player2,
    callMakeActive: function() {
      makeActive();
    }
  };
})();

//self executing function that hides/generates relevant elements on page load
const init = (function() {
  toggleDisplay.callHideElement("board");
  startPage.callCreateHTML();
})();

//*****************************//
//***** Event Listeners *****//
//*************************//

//hides start page, displays board page upon clicking the start button
const startGame = (function() {
  const startButton = document.querySelector(".button");
  startButton.addEventListener("click", () => {
    toggleDisplay.callHideElement("start");
    toggleDisplay.callShowElement("board");
    currentPlayer.callMakeActive();
  });
})();

const playGame = (function() {
  const gameBoxes = document.querySelector(".boxes");
  //displays relevant symbol ("x" or "o") upon mouse hovering over boxes
  gameBoxes.addEventListener("mouseover", e => {
    if (currentPlayer.player1.classList.contains("active")) {
      e.target.style.backgroundImage = "url(img/o.svg)";
    } else {
      e.target.style.backgroundImage = "url(img/x.svg)";
    }
  });
  //removes the displayed symbol applied from hover event
  gameBoxes.addEventListener("mouseout", e => {
    e.target.style.backgroundImage = "";
  });
})();
