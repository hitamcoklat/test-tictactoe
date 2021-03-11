var empty = "&nbsp;",
  boxes = [],
  turn = "X",
  score,
  moves;

var dsize = prompt("Please input how many rows/column do you need", "");

//   init
function init() {
  
  let board = document.createElement("table");
  board.setAttribute("border", 1);
  board.setAttribute("cellspacing", 0);

  let identifier = 1;
  for (let i = 0; i < dsize; i++) {
    let row = document.createElement("tr");
    board.appendChild(row);
    for (let j = 0; j < dsize; j++) {
      let cell = document.createElement("td");
      cell.setAttribute("height", 120);
      cell.setAttribute("width", 120);
      cell.setAttribute("align", "center");
      cell.setAttribute("valign", "center");
      cell.classList.add("col" + j, "row" + i);
      if (i == j) {
        cell.classList.add("diagonal0");
      }
      if (j == dsize - i - 1) {
        cell.classList.add("diagonal1");
      }
      cell.identifier = identifier;
      cell.addEventListener("click", setClick);
      row.appendChild(cell);
      boxes.push(cell);
      identifier += identifier;
    }
  }

  document.getElementById("tictactoe").appendChild(board);
  startNewGame();
}

/* start new game */
function startNewGame() {
  score = {
    X: 0,
    O: 0,
  };
  moves = 0;
  turn = "X";
  boxes.forEach((arr) => {
    arr.innerHTML = empty;
  });
}

/* check if win */
function win(click) {
  let member = click.className.split(/\s+/);
  for (let i = 0; i < member.length; i++) {
    let testClass = "." + member[i];
    let items = contains("#tictactoe " + testClass, turn);
    // if win
    if (items.length == dsize) {
      return true;
    }
  }
  return false;
}

/* check if text is exist */
function contains(selector, text) {
  let elements = document.querySelectorAll(selector);
  return [].filter.call(elements, (el) => {
    return RegExp(text).test(el.textContent);
  });
}

/* get click square */
function setClick() {
  if (this.innerHTML !== empty) {
    return;
  }
  this.innerHTML = turn;
  moves += 1;
  score[turn] += this.identifier;
  if (win(this)) {
    alert(`The Winner is: Player ${turn}`);
    startNewGame();
  } else if (moves === dsize * dsize) {
    alert("It's Draw");
    startNewGame();
  } else {
    turn = turn === "X" ? "O" : "X";
    document.getElementById("turn").textContent = "Player " + turn;
  }
}

init();
