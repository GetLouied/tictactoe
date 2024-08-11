let GameBoard = (function() {
    const rows = 3;
    const columns = 3;
    const board = [];

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
    function boardMove(row, column, player) {
        if (board[row][column] === null) {
            board[row][column] = player;
            console.log(`Player ${player} placed their move in Row: ${row} and Column: ${column}`);

            updateCounters(row, column, player);

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

    // Check if there is a winner
    function endGameCheck() {
        const winLength = 3;

        // Check if any player has won
        for (const [player, counters] of [['X', player1Counters], ['O', player2Counters]]) {
            
            // Check rows
            if (counters.rows.includes(winLength)) {
                return player;
            }

            // Check columns
            if (counters.columns.includes(winLength)) {
                return player;
            }

            // Check diagonals
            if (counters.diagonal1 === winLength || counters.diagonal2 === winLength) {
                return player;
            }
        }

        // Check for a draw
        if (board.flat().every(cell => cell !== null)) {
            return "Draw";
        }

        return null; 
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
    }

    createBoard();

    return {
        boardMove,
        endGameCheck,
        showBoard,
        resetBoard,
    };
})();
