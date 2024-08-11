/*** TODO LIST
 * Add a function in the GameBoard to switch between players after turn
 * Add a function in gameboard to getCurrentPlayer
 * Add a Module Pattern for the GameUI
 *  - Beofre hand I need to build the UI via HTML / CSS
 *  - Start with empty grid (class = empty)
 *  - Upon user click, grid changes to class=Xplayer or class=Oplayer)
 *  - Upon user click it also changes innerText to X or O. 
 *  - Counter display for How many wins a player has X or O
 *  - Display messaage after win or tie and prompt for board reset
 *  - Include baord reset button in UI to start game over
 * Add a Module patter for gamecontroller that resets board & UI
 * 
 ***/


let GameUI = (function() {

})();


let GameBoard = (function() {
    const rows = 3;
    const columns = 3;
    const board = [];
    const player1 = 'X';
    const player2 = 'O';

    // Track the current player
    let currentPlayer = player1;

    // Function to create and reset counters
    function initializeCounters() {
        return {
            rows: Array(rows).fill(0),
            columns: Array(columns).fill(0),
            diagonal1: 0,
            diagonal2: 0
        };
    }

    // Track counters for each player
    let player1Counters = initializeCounters();
    let player2Counters = initializeCounters();

    // Board Creation
    function createBoard() {
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                board[i].push(null);
            }
        }
    }

    // Board Move
    function boardMove(row, column) {
        if (board[row][column] === null) {
            board[row][column] = currentPlayer;
            console.log(`Player ${currentPlayer} placed their move in Row: ${row} and Column: ${column}`);

            updateCounters(row, column, currentPlayer);

            const result = endGameCheck();
            if (result) {
                console.log(`Game over! ${result === 'Draw' ? 'It\'s a draw!' : 'Winner: ' + result}`);
                resetBoard();
                return;
            } else {
                switchPlayer(); 
            }
            showBoard();
            return true;
        }
        console.log(`Can only place a move in an empty square`);
        return false;
    }

    // Update counters for the player
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

    // Check for a winner
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

    // Switch Players
    function switchPlayer() {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        console.log(`It's now ${currentPlayer}'s turn`);
    }

    // Get current player
    function getCurrentPlayer() {
        return currentPlayer;
    }

    // Show board, for console testing use
    function showBoard() {
        console.log(board);
    }

    // Reset Gameboard
    function resetBoard() {
        createBoard();
        player1Counters = initializeCounters();
        player2Counters = initializeCounters();
        currentPlayer = player1; // Reset to player X
        console.log('The board has been reset.')
    }

    createBoard();

    return {
        boardMove,
        endGameCheck,
        showBoard,
        resetBoard,
        getCurrentPlayer,

    };
})();

