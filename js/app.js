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
    },
    show: elementID => {
      document.getElementById(elementID).style.display = "";
    }
  };

  //hides gameboard, then loads start page on load
  const init = (() => {
    toggleDisplay.hide("board");
    document.write(HTML.startPage);
    document.write(HTML.winPage);
    toggleDisplay.hide("finish");
  })();

  //constant variables
  const startButton = document.querySelector(".button");
  const newGameButton = document.querySelector("#finish .button");
  const player1 = document.querySelector("#player1");
  const player2 = document.querySelector("#player2");
  const gameBoxes = document.querySelector(".boxes");
  const boxes = gameBoxes.querySelectorAll("li");
  const winningCombos = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["3", "6", "9"],
    ["1", "5", "9"],
    ["3", "5", "7"]
  ];

  let player1Boxes = [];
  let player2Boxes = [];

  //keeps count of total number of moves
  let moveCount = 0;

  //gives each box a numeric ID
  const addBoxIDs = (function() {
    for (let i = 0; i < boxes.length; i++) {
      let box = boxes[i];
      box.id = i + 1;
    }
  })();

  //stores each player's selection's id numbers, in ascending order
  //in each respective player's array
  function fillPlayerBoxesArray() {
    for (let i = 0; i < boxes.length; i++) {
      let box = boxes[i];
      if (box.classList.contains("box-filled-1")) {
        if (player1Boxes.indexOf(boxes[i].id) === -1) {
          player1Boxes.push(boxes[i].id);
          player1Boxes.sort((a, b) => a - b);
          if (checkWin(player1Boxes)) {
            toggleDisplay.hide("board");
            toggleDisplay.show("finish");
            document.querySelector("#finish").classList.add("screen-win-one");
          }
        }
      } else if (box.classList.contains("box-filled-2")) {
        if (player2Boxes.indexOf(boxes[i].id) === -1) {
          player2Boxes.push(boxes[i].id);
          player2Boxes.sort((a, b) => a - b);
          if (checkWin(player2Boxes)) {
            toggleDisplay.hide("board");
            toggleDisplay.show("finish");
            document.querySelector("#finish").classList.add("screen-win-two");
          }
        }
      }
    }
  }

  function clearBoxes() {
    for (let i = 0; i < boxes.length; i++) {
      let box = boxes[i];
      if (box.classList.contains("box-filled-1")) {
        box.classList.remove("box-filled-1");
      } else if (box.classList.contains("box-filled-2")) {
        box.classList.remove("box-filled-2");
      }
    }
  }

  //checks is player has entered a winning combination
  function checkWin(player) {
    for (let i = 0; i < winningCombos.length; i++) {
      if (winningCombos[i].some(element => player.indexOf(element) >= 0)) {
        if (winningCombos[i].every(element => player.indexOf(element) >= 0)) {
          return true;
        }
      }
    }
  }

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
  };

  //begins game upon clicking start
  startButton.addEventListener("click", () => {
    toggleDisplay.hide("start");
    toggleDisplay.show("board");
    switchPlayer();
  });

  //restarts game upon clicking new game
  newGameButton.addEventListener("click", () => {
    toggleDisplay.hide("finish");
    toggleDisplay.show("start");
    moveCount = 0;
    player1Boxes = [];
    player2Boxes = [];
    clearBoxes();
    checkWin(player1Boxes);
    checkWin(player2Boxes);
    player1.classList.remove("active");
    player2.classList.remove("active");
    document.querySelector("#finish").classList.remove("screen-win-one");
    document.querySelector("#finish").classList.remove("screen-win-two");
    document.querySelector("#finish").classList.remove("screen-win-tie");
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

    if (moveCount >= 4) {
      fillPlayerBoxesArray();
    }
    if (moveCount === 9) {
      toggleDisplay.hide("board");
      toggleDisplay.show("finish");
      document.querySelector("#finish").classList.add("screen-win-tie");
    }
  });
})();
