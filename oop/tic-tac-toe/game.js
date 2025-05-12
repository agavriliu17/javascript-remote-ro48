class Player {
  constructor(name, color, symbol) {
    this.name = name;
    this.color = color;
    this.symbol = symbol;
    this.score = 0;
    this.scoreElement = null;
  }

  incrementScore() {
    this.score++;
  }

  // This to be implemented by AiPlayer
  makeMove() {
    return false;
  }
}

class AIPlayer extends Player {
  constructor(name, color, symbol) {
    super("AI", color, symbol);
  }

  makeMove() {
    // To be implemented
    return false;
  }
}

class Cell {
  constructor(index) {
    this.index = index;
    this.value = null;
    this.element = null;
  }

  setElement(element) {
    this.element = element;
  }

  getElement() {
    return this.element;
  }

  setValue(player) {
    if (this.isEmpty()) {
      this.value = player.symbol;
      this.element.textContent = this.value;
      this.element.style.color = player.color;

      return true;
    }

    return false;
  }

  isEmpty() {
    return this.value === null;
  }

  clear() {
    this.value = null;
    this.element.textContent = "";
    this.element.style.color = "";
    this.element.classList.remove("winning-cell");
  }
}

class GameBoard {
  constructor() {
    this.cells = [];
    this.winningPatterns = [
      [0, 1, 2], // Top row
      [3, 4, 5], // Middle row
      [6, 7, 8], // Bottom row
      [0, 3, 6], // Left column
      [1, 4, 7], // Middle column
      [2, 5, 8], // Right column
      [0, 4, 8], // Diagonal top-left to bottom-right
      [2, 4, 6], // Diagonal top-right to bottom-left
    ];
  }

  initialise() {
    const cellElements = document.querySelectorAll(".cell");
    cellElements.forEach((element, index) => {
      const cell = new Cell(index);
      cell.setElement(element);
      this.cells.push(cell);
    });
  }

  isFull() {
    return this.cells.every((cell) => !cell.isEmpty());
  }

  makeMove(index, player) {
    return this.cells[index].setValue(player);
  }

  hasWinner(player) {
    for (const pattern of this.winningPatterns) {
      let isWinningPattern = true;

      for (const index of pattern) {
        if (this.cells[index].value !== player.symbol) {
          isWinningPattern = false;
          break;
        }
      }

      if (isWinningPattern) {
        return pattern.map((index) => this.cells[index]);
      }
    }

    return null;
  }

  reset() {
    this.cells.forEach((cell) => cell.clear());
  }
}

// Main Game Controller
class TicTacToeGame {
  constructor(gameMode = "pvp") {
    // Create players
    this.playerX = new Player("Player X", "#e74c3c", "X");
    this.playerO = new Player("Player O", "#3498db", "O");
    this.currentPlayer = this.playerX;

    this.board = new GameBoard();
    this.board.initialise();
    this.isGameActive = true;
    this.gameMode = gameMode;

    // Get UI elements
    this.statusDisplay = document.getElementsByClassName("status")[0];
    this.restartButton = document.getElementById("restartButton");
    this.modeButton = document.getElementById("switchMode");

    this.playerX.scoreElement = document.getElementsByClassName("score-value-x")[0];
    this.playerO.scoreElement = document.getElementsByClassName("score-value-0")[0];
  }

  start() {
    this.board.cells.forEach((cell) => {
      cell.getElement().addEventListener("click", () => this.handleCellClick(cell), { once: true });
    });

    this.restartButton.addEventListener("click", () => this.restartGame());
    this.modeButton.addEventListener("click", () => this.switchMode());
  }

  handleCellClick(cell) {
    if (!cell.isEmpty() || !this.isGameActive) {
      return;
    }

    if (this.board.makeMove(cell.index, this.currentPlayer)) {
      this.checkGameState();
    }
  }

  checkGameState() {
    if (this.board.hasWinner(this.currentPlayer)) {
      this.handleWin();
    } else if (this.board.isFull()) {
      this.handleDraw();
    } else {
      this.switchPlayer();
    }
  }

  switchPlayer() {
    if (this.currentPlayer === this.playerX) {
      this.currentPlayer = this.playerO;
    } else {
      this.currentPlayer = this.playerX;
    }

    console.log(this.statusDisplay.textContent);
    this.statusDisplay.textContent = `${this.currentPlayer.name}'s turn`;
  }

  handleWin() {
    this.isGameActive = false;
    this.currentPlayer.incrementScore();
    this.statusDisplay.textContent = `${this.currentPlayer.name} have won!`;

    const winningCells = this.board.hasWinner(this.currentPlayer);
    if (winningCells) {
      winningCells.forEach((cell) => {
        cell.getElement().classList.add("winning-cell");
      });
    }
  }

  handleDraw() {
    this.isGameActive = false;
    this.statusDisplay.textContent = "Draw!";
  }

  restartGame() {
    this.board.reset();
    this.currentPlayer = this.playerX;
    this.isGameActive = true;

    this.statusDisplay.textContent = `${this.currentPlayer.name}'s turn`;

    // Re-add event listener
    this.board.cells.forEach((cell) => {
      cell.getElement().addEventListener("click", () => this.handleCellClick(cell), { once: true });
    });
  }

  switchMode() {
    console.log("mode switched");
  }
}

const game = new TicTacToeGame();

document.addEventListener("DOMContentLoaded", () => {
  game.start();
});
