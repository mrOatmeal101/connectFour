/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

// adding a start button to the DOM. 
const startButton = document.createElement('button')
startButton.textContent = 'Start'
const startSession = document.querySelector('#start-game')
startSession.append(startButton)

const HEIGHT = 6;
const WIDTH = 7;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])
let gameOver = false; // make a var called gameOver = false so that if the game is over it can be set to true and not allow any 
// of the functions inside of handleClick() after if(gameOver) to execute, therefore not allowing any more clicking.

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
function makeBoard() {
// TODO: set "board" to empty HEIGHT x WIDTH matrix array
// this for loop is making the rows inside of board which will be equal to Height - 1. 
for(let i = 0; i < HEIGHT; i++){
  // setting the rows to be empty arrays
  board[i] = [];
  // console.log((board[i]))
  // then this loop is setting how many columns there are going to be inside of the game board.
  for(let j = 0; j < WIDTH; j++){
    // this is how you get your empty cells inside of board.
    // So on the first loop you will get board[0][0] = null 
    // then board[0][1] = null and so on. 
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

  // these for loops are adding table data rows and cells to create the game board so that you can set the ids equal to their position in board
  // HEIGHT is being used first as you want to align with the loops in makeBoard() so the ids accuratly match their positions in board.
  // these loops are how you visually get the board to appear in the browser. 
  for (let y = 0; y < HEIGHT; y++) {
    // this is creating the element of table rows which will loop and create HEIGHT - 1. 
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
  // piecePosition is getting the id of the cell which is grabbed from handleClickEvent and findSpotForCol and then used as the args
  // for placeInTable. After selecting the cell that matches the id that is generated from makeHtlmBoard in the for loops.
  let piecePosition = document.getElementById(`${y}-${x}`)
  // creating a div so that you can give properties to it so that it shows up visually in the DOM.
  let piece = document.createElement("div")
  // if statement where if currPlayer = 1 then append the div piece to that cell
  // also adding a classlist so that you can set different colors for the different players. 
  if(currPlayer === 1){
    piece.classList.add("piece","player1")
    piecePosition.append(piece)
  }
  // same as above but for the 2nd player. 
    if(currPlayer === 2){
    piece.classList.add("piece","player2")
    piecePosition.append(piece)
  }
  
}

/** endGame: announce game end */
function endGame(msg) {
  // creating a variable to capture the div with the id of end-game for the ability to append elements to it anouncing the end of the game
  const endGameBanner = document.getElementById('end-game')
  // creating a variable that holds an h2 tag so that you can add text showing the players that the game is over
  const endGameText = document.createElement('h2')
  // setting the textContent of the newly created h2 equal to the argument from the function
  endGameText.textContent = msg
  // creating a restart button so that users can restart the game without having to click the reload window button in the browers
  const restartbutton = document.createElement('button')
  // changing the textContent of the button to make it clear as to what it is
  restartbutton.textContent = 'Restart Game'
  // adding the event listener to the restart button so that it actually preforms the actions disired of it.
  restartbutton.addEventListener('click', function(){
  // setting the gameOnOff var to false so that the start button will appear.
  gameOnOff = false;
  // making it so that when the button is clicked it reloads the browser. 
  window.location.reload()
  }) 
  // setting the gameOver var equal to true so that the users can no longer click on the top row to play pieces
  gameOver = true;
  // appending the end game h2 and restartbutton to the div with the id of end-game so that the users can see that the game is over.
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

  // another way to write this is:
  // return cells.every(function(cell){
  // let y = cell[0]
  // let x = cell[1]
  // return(
        // y >= 0 && y < HEIGHT &&
        // x >= 0 && x < WIDTH &&
        // board[y][x] === currPlayer
   // )
// })

// so on the first loop of the values listed below, and checking the first if(_win(horiz)), it would look like:
// [[0,0], [0,1], [0,2], [0,3]].every(function(cell){
  // let y = cell[0] which would be equal to 0 as this is the zero index of the 1st array that is inputed
  // let x = cell[1] which would be equal to 0 as this is the one index of the 1st array that is inputed
  // return(
        // y >= 0 && y < HEIGHT && this will input true
        // x >= 0 && x < WIDTH && this will return true
        // board[y][x] === currPlayer this will grab what is stored in the board array which will be null, 1 or 2
        // if the stored value is 1 and the currPlayer is set to 1 it will return true and move to the next index in the array which is [0,1]
        // if the stored value is 1 and the currPlayer is set to 2 it will return false which will cause if(checkForWin) in handleClick
        //  to be false, so this will then exit the fuction and the next function checkForTie() will execute.
   // )
// })

  // TODO: read and understand this code. Add comments to help you.
  // this for loop is looping the length of the var Height - 1 which is set to 6 so this will loop from 0 to 5.
  for (let y = 0; y < HEIGHT; y++) {
    // this internal loop is looping the length of the var Width - 1 which is set to 7 so this will loop from 0 to 6. 
    for (let x = 0; x < WIDTH; x++) {
      // is this creating a variable called horiz which is equal to an array with nested arrays.
      // So the first loop will be [[0,0], [0,1], [0,2], [0,3]]
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      // this is creating a variable called vert which is equal to an array with nested arrays.
      // So the first loop will be [[0,0], [1,0], [2,0], [3,0]]
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      // this is creating a variable called diagDR which is equal to an array with nested arrays.
      // So the first loop will be [[0,0], [1,1], [2,2], [3,3]]
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      // this is creating a variable called diagDL which is equal to an array with nested arrays.
      // So the first loop will be [[0,0], [1,-1], [2,-2], [3,-3]]
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      // this is an if statement saying that if (_win(horiz) or _win(vert) or _win(diagDR) or _win(diagDL))
      // returns true then return true for the function checkForWin
      // so for the first one _win(horiz) it plugs the variable horiz into the function _win with the argument cells being equal to horiz
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

function checkForTie(){
  // these are two loops which are being used to loop through all of the cells in the board by providing indexes for board[i][j]
  // so on the first loop board[i][j] will be equal to board[0][0] which will be either null, 1 or 2.
    for(let i = 0; i < HEIGHT; i++){        
      for(let j = 0; j < WIDTH; j++){
        // if the index position of board[0][0] is equal to null it will return false
        if(board[i][j] === null){
          // this false will be inputed into the if(checkForTie) inside of handleClick() then the if statements handling currPlayer will be run
          return false
        }
      }
    }
    // if the if statement above never returns true in that none of the coordinates from board[i][j] are equal to null 
    // then it will return true to the if(checkForTie) which will return the endGame() function.
    return true
}

// adding the event listener to the start button so that the inital functions run and the game begins. 
gameOnOff = false 
startButton.addEventListener('click', function(){
  if(!gameOnOff){
    gameOnOff = true
    startButton.remove();
    makeBoard();
    makeHtmlBoard();
  }
})
