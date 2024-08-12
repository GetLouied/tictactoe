let GameUI = (function() {
    const cells = Array.from(document.getElementsByClassName('cell'));
    const resetButton = document.getElementById('resetBtn');
    const display = document.getElementById('display');
    const playAgainButton = document.getElementById('playAgainBtn');

    function initialize() {
        cells.forEach((cell, index) => {
            cell.addEventListener('click', () => handleCellClick(cell, index));
        });
    
        resetButton.addEventListener('click', resetGame);
        setupPlayAgainButton(); 
    }

    function handleCellClick(cell, index) {
        if (cell.textContent === '' && !GameBoard.isGameOver()) {
            const currentPlayer = GameBoard.getCurrentPlayer();
            cell.textContent = currentPlayer; 
            const row = Math.floor(index / 3);
            const col = index % 3;
    
            const moveSuccessful = GameBoard.boardMove(row, col); 
            if (!moveSuccessful) return; 
    
            const result = GameBoard.endGameCheck(); 
            if (result) {
                display.textContent = result === 'Draw' ? "It's a draw! Click 'Play Again' to start a new game." : `Winner: ${result}! Click 'Play Again' to start a new game.`;
                playAgainButton.style.display = 'block'; 
            } else {
                GameBoard.switchPlayer(); 
                updateDisplay(); 
            }
        }
    }
    
    
    function setupPlayAgainButton() {
        playAgainButton.addEventListener('click', resetGame);
    }
    
    function resetGame() {
        cells.forEach(cell => cell.textContent = '');
        GameBoard.resetBoard();
        updateDisplay();
        playAgainButton.style.display = 'none'; 
    }
    
    function updateDisplay() {
        const currentPlayer = GameBoard.getCurrentPlayer();
        display.textContent = `Player ${currentPlayer}'s Turn`;
    }

    initialize();

})();



let GameBoard = (function() {
    const rows = 3;
    const columns = 3;
    const board = [];
    const player1 = 'X';
    const player2 = 'O';
    let gameOver = false;

    let currentPlayer = player1;

    function initializeCounters() {
        return {
            rows: Array(rows).fill(0),
            columns: Array(columns).fill(0),
            diagonal1: 0,
            diagonal2: 0
        };
    }

    let player1Counters = initializeCounters();
    let player2Counters = initializeCounters();

    function createBoard() {
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                board[i].push(null);
            }
        }
    }

    function boardMove(row, column) {
        if (board[row][column] === null) {
            board[row][column] = currentPlayer;
            console.log(`Player ${currentPlayer} placed their move in Row: ${row} and Column: ${column}`);
    
            updateCounters(row, column, currentPlayer);
            showBoard();
    
            const result = endGameCheck();
            if (result) {
                gameOver = true; 
            }
    
            return true; 
        }
        console.log(`Can only place a move in an empty square`);
        return false; 
    }

    function updateCounters(row, column, player) {
        const counters = player === 'X' ? player1Counters : player2Counters;

        counters.rows[row]++;
        counters.columns[column]++;

        if (row === column) {
            counters.diagonal1++;
        }
        if (row + column === rows - 1) {
            counters.diagonal2++;
        }
    }

    function endGameCheck() {
        const winLength = 3;

        for (const [player, counters] of [['X', player1Counters], ['O', player2Counters]]) {
            if (counters.rows.includes(winLength)) {
                return player;
            }

            if (counters.columns.includes(winLength)) {
                return player;
            }

            if (counters.diagonal1 === winLength || counters.diagonal2 === winLength) {
                return player;
            }
        }

        if (board.flat().every(cell => cell !== null)) {
            return "Draw";
        }

        return null; 
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        console.log(`It's now ${currentPlayer}'s turn`);
    }

    function getCurrentPlayer() {
        return currentPlayer;
    }

    function showBoard() {
        console.log(board);
    }

    function isGameOver() {
        return gameOver;
    }

    function resetBoard() {
        createBoard();
        player1Counters = initializeCounters();
        player2Counters = initializeCounters();
        currentPlayer = player1; 
        gameOver = false; 
        console.log('The board has been reset.')
    }
    

    createBoard();

    return {
        boardMove,
        endGameCheck,
        showBoard,
        resetBoard,
        getCurrentPlayer,
        switchPlayer,
        isGameOver,
    };
})();


