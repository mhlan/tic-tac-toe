(function() {
  //HTML to be generated to the page
  const HTML = {
    startPage: `<div class="screen screen-start" id="start">
              <header>
                <h1>Tic Tac Toe</h1>
                <a href="#" class="button">Start game</a>
              </header>
            </div>`,

    winPage: `<div class="screen screen-win" id="finish">
                <header>
                  <h1>Tic Tac Toe</h1>
                  <p class="message"></p>
                  <a href="#" class="button">New game</a>
                </header>
              </div>`
  };

  //hides or shows page elements
  const toggleDisplay = {
    hide: elementID => {
      document.getElementById(elementID).style.display = "none";
      console.log(`${elementID} has been hidden.`);
    },
    show: elementID => {
      document.getElementById(elementID).style.display = "";
      console.log(`${elementID} is being displayed`);
    }
  };

  //hides gameboard, then loads start page on load
  const init = (() => {
    toggleDisplay.hide("board");
    document.write(HTML.startPage);
    console.log("Start Page HTML Generated");
  })();

  //constant variables
  const startButton = document.querySelector(".button");
  const player1 = document.querySelector("#player1");
  const player2 = document.querySelector("#player2");
  const gameBoxes = document.querySelector(".boxes");
  const boxes = gameBoxes.querySelectorAll("li");
  const winningCombos = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];
  const player1Boxes = [];
  const player2Boxes = [];

  //keeps count of total number of moves
  let moveCount = 0;

  //gives each box a numeric ID
  const addBoxIDs = (function() {
    for (let i = 0; i < boxes.length; i++) {
      let box = boxes[i];
      box.id = i + 1;
    }
  })();

  //makes appropriate player active
  const switchPlayer = () => {
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

  //applies current players symbol upon mouseover
  const hoverImage = (selection, image) => {
    if (
      !selection.classList.contains("box-filled-1") &&
      !selection.classList.contains("box-filled-2")
    ) {
      selection.style.backgroundImage = image;
    }
  };

  //marks box with player symbol
  const markBox = (selection, className) => {
    if (
      !selection.classList.contains("box-filled-1") &&
      !selection.classList.contains("box-filled-2")
    ) {
      selection.classList.add(className);
      countMoves();
      switchPlayer();
    }
  };

  //incriment move counter
  const countMoves = () => {
    moveCount++;
    console.log(moveCount);
  };

  //begins game upon clicking start
  startButton.addEventListener("click", () => {
    toggleDisplay.hide("start");
    toggleDisplay.show("board");
    switchPlayer();
  });

  //temporarily display relevant symbol over boxes on mouse over
  gameBoxes.addEventListener("mouseover", e => {
    let selection = e.target;
    if (player1.classList.contains("active")) {
      hoverImage(selection, "url(img/o.svg)");
    } else {
      hoverImage(selection, "url(img/x.svg)");
    }
  });

  //removes symbol on mouse out
  gameBoxes.addEventListener("mouseout", e => {
    e.target.style.backgroundImage = "";
  });

  //applies symbol to box on click, changes current player
  gameBoxes.addEventListener("click", e => {
    let selection = e.target;
    if (player1.classList.contains("active")) {
      markBox(selection, "box-filled-1");
    } else {
      markBox(selection, "box-filled-2");
    }
  });
})();
