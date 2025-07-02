/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const startButton = document.createElement('button')
startButton.textContent = 'Start'
const startSession = document.querySelector('#start-game')
startSession.append(startButton)

const HEIGHT = 6;
const WIDTH = 7;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])
let gameOver = false;

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
// TODO: set "board" to empty HEIGHT x WIDTH matrix array
for(let i = 0; i < HEIGHT; i++){
  board[i] = [];
  // console.log((board[i]))
  
  for(let j = 0; j < WIDTH; j++){
    board[i][j] = null;
  }
}
// console.log(board)
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector('#board')
  // TODO: add comment for this code
  // this is creating a var called top which is creating the top row of a table for the game
  // the goal is to create a table row where the users can click to place their pieces in a column on the game board.
  const top = document.createElement("tr");
  // this is setting the id attribute of the table row equal to "column-top"
  top.setAttribute("id", "column-top");
  // this is adding an event listener so that when you click a cell in the top row the fuction handleClick is executed.
  top.addEventListener("click", handleClick);

  // this for loop is setting each cell in the top row to have an id equal to a number between
  // 0 and whatever number the var WIDTH - 1 is set to. 
  for (let x = 0; x < WIDTH; x++) {
    // this is placing a table data tag inside of the table row for the var top so that you can define how many cells are needed in each row.
    // ie create a <td> for each cloumn in the top row <tr>. 
    // this defines each data cell which allows you to add an id to each individual cell within the table row.
    const headCell = document.createElement("td");
    // this is setting this id of each individual cell equal to the numbers 0 through WIDTH - 1.
    headCell.setAttribute("id", x);
    // this is appending the table data to the table row top
    top.append(headCell);
  }
  // this is appending the var top which now is a table row with table data within each cell to the game board. 
  htmlBoard.append(top);

  // TODO: add comment for this code
  // this is a for loop that is adding rows and table data cells to create the game board where the pieces will be placed. 
  // HEIGHT is being used first as you want to make the rows so that you can then add the data cells to each row.
  for (let y = 0; y < HEIGHT; y++) {
    // this is adding the table rows which the number of rows will be between 0 and whatever the var HEIGHT - 1 is set to.
    const row = document.createElement("tr");
    // this loop is now adding each table data cell to each of the table rows.
    for (let x = 0; x < WIDTH; x++) {
      // this is creating a var called cell which has the table data cells.
      const cell = document.createElement("td");
      // this is setting the id for the var cell to the numbers from the loops 
      cell.setAttribute("id", `${y}-${x}`);
      // this is appending the table data which is the var cell to the table row which is the var row.
      row.append(cell);
    }
    // this append is what is adding all of the rows and data cells to the HTML table element with the id of board.
    // this is what makes the game board where the players 'pieces' are shown after they are played. 
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  // console.log(x);
  // this for loop is looping through the arrays in the var board from the bottom to the top. 
  // so when handleClick(evt) is executed by clicking one of the cells in the var top it assigns x = (a number 0 through 6) or (WIDTH - 1).
  // this is handled through findSpotForCol(x) which if you click on the first column it will set x = 0.
  // then the for loop runs with y = (HEIGHT -1) which in this case 6 - 1 = 5;
  for(let y = HEIGHT - 1; y >= 0; y--){
    // console.log(board[y][x])
    // this if statement will then run where if the stored value of board at y = 5 and x = 0 is equal to null.
    if(board[y][x] === null){
        return y;
    }
  }
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
    // console.log(y,x) // checking to make sure the correct
  let piecePosition = document.getElementById(`${y}-${x}`)
  let piece = document.createElement("div")
  if(currPlayer === 1){
    piece.classList.add("piece","player1")
    piecePosition.append(piece)
  }
    if(currPlayer === 2){
    piece.classList.add("piece","player2")
    piecePosition.append(piece)
  }
  
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  const endGameBanner = document.getElementById('end-game')
  const endGameText = document.createElement('h2')
  endGameText.textContent = msg
  const restartbutton = document.createElement('button')
  restartbutton.textContent = 'Restart Game'
  restartbutton.addEventListener('click', function(){
  gameOnOff = false;
  window.location.reload()
  
  }) 
  gameOver = true;
  endGameBanner.append(endGameText, restartbutton)
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  if(gameOver){
    return
  }
  // get x from ID of clicked cell
  let x = +evt.target.id;
  // console.log(x)

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  // console.log(y)
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if(checkForTie()){
    return endGame(`The Game Board is full, players tie, please restart`);
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  if(currPlayer === 1){
    currPlayer = 2;
  }
  else {
    currPlayer = 1;
  }
  console.log(currPlayer)
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

function checkForTie(){
    for(let i = 0; i < HEIGHT; i++){        
      for(let j = 0; j < WIDTH; j++){
        if(board[i][j] === null){
          return false
        }
      }
    }
    return true
}

gameOnOff = false 
startButton.addEventListener('click', function(){
  if(!gameOnOff){
    gameOnOff = true
    startButton.remove();
    makeBoard();
    makeHtmlBoard();
  }
})
