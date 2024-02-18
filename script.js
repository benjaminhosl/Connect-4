const rows = 6;
const cols = 7;
const board = [];
let currentPlayer = 1; // Player 1 starts
const gameBoard = document.getElementById('gameBoard');
const gameStatus = document.getElementById('gameStatus');

// Initialize game board
function initGame() {
    for (let row = 0; row < rows; row++) {
        const rowArr = [];
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('click', () => placePiece(row, col));
            gameBoard.appendChild(cell);
            rowArr.push(0);
        }
        board.push(rowArr);
    }
    updateGameStatus();
}

// Place a piece on the board and handle player/computer turns
function placePiece(row, col) {
    if (currentPlayer !== 1) return; // Ignore clicks if it's not player 1's turn

    for (let i = rows - 1; i >= 0; i--) {
        if (board[i][col] === 0) {
            board[i][col] = currentPlayer;
            updateBoard();
           if (checkWin()) {
    gameStatus.innerHTML = `Player ${currentPlayer} wins! <a href='invitation.html'>Click here for an enchanted invitation!</a>`;
    return;
}
            currentPlayer = 2; // Switch to computer player
            updateGameStatus();
            setTimeout(computerMove, 500); // Delay computer move for better UX
            return;
        }
    }
}

// Computer makes a move
function computerMove() {
    let col;
    let validMove = false;

    while (!validMove) {
        col = Math.floor(Math.random() * cols);
        for (let row = rows - 1; row >= 0; row--) {
            if (board[row][col] === 0) {
                board[row][col] = currentPlayer;
                validMove = true;
                break;
            }
        }
    }

    updateBoard();
    if (checkWin()) {
    gameStatus.innerHTML = `Player ${currentPlayer} wins! <a href='invitation.html'>Click here for an enchanted invitation!</a>`;
    return;
}
    currentPlayer = 1; // Switch back to player 1
    updateGameStatus();
}

// Update the visual board
function updateBoard() {
    let cellIdx = 0;
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = gameBoard.children[cellIdx++];
            cell.classList.remove('player1', 'player2');
            if (board[row][col] === 1) {
                cell.classList.add('player1');
            } else if (board[row][col] === 2) {
                cell.classList.add('player2');
            }
        }
    }
}

// Check for a win
function checkWin() {
    // Check horizontal
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols - 3; col++) {
            if (board[row][col] > 0 &&
                board[row][col] === board[row][col + 1] &&
                board[row][col] === board[row][col + 2] &&
                board[row][col] === board[row][col + 3]) {
                return true;
            }
        }
    }

    // Check vertical
    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows - 3; row++) {
            if (board[row][col] > 0 &&
                board[row][col] === board[row + 1][col] &&
                board[row][col] === board[row + 2][col] &&
                board[row][col] === board[row + 3][col]) {
                return true;
            }
        }
    }

    return false; // No win found
}

// Update game status message
function updateGameStatus() {
    gameStatus.innerText = `Player ${currentPlayer}'s turn`;
}

initGame(); // Initialize the game
