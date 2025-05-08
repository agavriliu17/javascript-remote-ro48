class Player {
  constructor(name, color, symbol) {
    this.name = name;
    this.color = color;
    this.symbol = symbol;
    this.score = 0;
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
      let patternComplete = true;

      for (const index of pattern) {
        if (this.cells[index].value !== player.symbol) {
          patternComplete = false;
          break;
        }
      }

      if (patternComplete) {
        return true;
      }

      return false;
    }
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
  }

  start() {
    this.board.cells.forEach((cell) => {
      cell.getElement().addEventListener("click", () => this.handleCellClick(cell), { once: true });
    });
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
      //
    } else if (this.board.isFull()) {
      //
    } else {
      console.log("switchPlayer");
      this.switchPlayer();
    }
  }

  switchPlayer() {
    console.log(this.currentPlayer);
    if (this.currentPlayer === this.playerX) {
      this.currentPlayer = this.playerO;
    } else {
      this.currentPlayer = this.playerX;
    }
  }
}

const game = new TicTacToeGame();

document.addEventListener("DOMContentLoaded", () => {
  game.start();
});
