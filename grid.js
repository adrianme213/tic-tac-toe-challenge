/*
Tic Tac Toe
Premise is to place 1's and -1's on the board. The board will have
checkers to sum up the values across rows, columns, and diagonals to
see if a player has won the game.

If any checks return 3 || -3 then victory for either the "Positive"
or "Negative" player.
*/

const Grid = function() {
  this.grid = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
}

Grid.prototype.insertValidMove = function(row, col, value) {
  if ((row < 0 || row > 2) || (col < 0 || col > 3) || this.grid[row][col] !== 0) {
    return false; // False signifies insert went wrong
  }
  this.grid[row][col] = value;
  return true; // True signifies successful insert
}

Grid.prototype.rowSum = function() {
  for (let ii = 0; ii < this.grid.length; ii++) {
    const totalForRow = this.grid[ii].reduce((total, value) => {
      return total + value;
    }, 0);
    if (totalForRow === 3 || totalForRow === -3) {
      // Positive or Negative player has won so we return that value
      return totalForRow;
    }
  }
  return false;
}

Grid.prototype.colSum = function() {
  for (let ii = 0; ii < this.grid.length; ii++) {
    let totalForCol = 0;
    this.grid.forEach((row, index) => {
      totalForCol += this.grid[index][ii];
    });
    if (totalForCol === 3 || totalForCol === -3) {
      // Positive or Negative player has won so we return that value
      return totalForCol;
    }
  }
  return false;
}

Grid.prototype.majorDiagonal = function() {
  let total = 0;
  for (let ii = 0; ii < this.grid.length; ii++) {
    total += this.grid[ii][ii];
  }
  if (total === 3 || total === -3) {
    // Positive or Negative player has won so we return that value
    return total;
  }
  return false;
}


Grid.prototype.minorDiagonal = function() {
  let total = 0;
  for (let ii = 0; ii < this.grid.length; ii++) {
    total += this.grid[ii][(this.grid.length - 1) - ii];
  }
  if (total === 3 || total === -3) {
    // Positive or Negative player has won so we return that value
    return total;
  }
  return false;
}

Grid.prototype.checkAllFuncs = function() {
  const a1 = this.rowSum();
  if (!!a1) {
    return a1;
  }
  const a2 = this.colSum();
  if (!!a2) {
    return a2;
  }
  const a3 = this.majorDiagonal();
  if (!!a3) {
    return a3;
  }
  const a4 = this.minorDiagonal();
  if (!!a4) {
    return a4;
  }
  return false;
}
Grid.prototype.printBoard = function() {
  console.log('Current Grid\n', this.grid[0]);
  console.log(this.grid[1]);
  console.log(this.grid[2]);
}
/*
To run program, players alternate turns and then run the helper functions
to check if anyone has one. If insertValidMove is not valid, same player is asked
to enter a row and column.
*/

const prompt = require('prompt-sync')();

const insertMove = function(valid = true, val, grid, p1, p2) {
  while (valid) {
    const row = prompt('What row? ');
    const col = prompt('What column? ');
    if (grid.insertValidMove(row, col, val)) {
      valid = false;
      const result = grid.checkAllFuncs();
      if (!!result) {
        const winner = result > 0 ? `Player 1 ${p1} wins` : `Player 2 ${p2} wins`;
        console.log(winner);
        return winner;
      }
      return valid;
    } else {
      console.log(`That was an invalid move. Try again\n`)
    }
  }
}

const startGameSync = () => {
  let game = new Grid();
  var p1 = prompt('Player 1, enter your name: ');
  var p2 = prompt('Player 2, enter your name: ');
  const welcome = `
  Tic Tac Toe
  Premise is to place 1's and -1's on the board. The board will have
  checkers to sum up the values across rows, columns, and diagonals to
  see if a player has won the game. Welcome player 1 ${p1} and player 2 ${p2}.
  `
  console.log(welcome);
  let count = 0;
  let turn = 1;
  while (count < 9) {
    game.printBoard();
    let instructions = turn > 0 ? 'Player 1 Turn: ' : 'Player 2 Turn: ';
    console.log(instructions);
    const pMove = insertMove(true, turn, game, p1, p2)
    count++;
    const pResult = game.checkAllFuncs();
    if (typeof pResult !== 'boolean') {
      return pResult;
    }
    // Switch player's turn
    turn *= -1;
  }
  console.log('GAME OVER. No one won. Try again.')
}

startGameSync();
