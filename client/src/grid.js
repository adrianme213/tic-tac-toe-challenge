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

Grid.prototype.insertMove = function(row, col, value) {
  if ((row < 0 || row > 2) || (col < 0 || col > 3) || this.grid[row][col] !== 0) {
    return false; // False signifies insert went wrong
  }
  this.grid[row][col] = value;
  return true; // True signifies successful insert
}

Grid.prototype.rowSum = function() {
  for (let ii = 0; ii < this.grid.length; ii++) {
    const totalForRow = this.grid[i].reduce((total, value) => {
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
    const totalForCol = 0;
    this.grid.forEach((row, index) => {
      totalForCol += this.grid[index][row];
    });
    if (totalForCol === 3 || totalForCol === -3) {
      // Positive or Negative player has won so we return that value
      return totalForCol;
    }
  }
  return false;
}
