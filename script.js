//DOM elements
const gameboardContainer = document.getElementById('gameboard');
const winnerSound = document.getElementById('winnerSound');

function renderBoard(board) {
    for (let i = 0; i < board.length; i++) {
        const cell = document.getElementById(`cell-${i}`);
        cell.textContent = board[i];
    }
}

function initializeEventListeners() {
    for (let i = 0; i < 9; i++) { // the board will always have 9 cells
        const cell = document.getElementById(`cell-${i}`);
        cell.addEventListener('click', () => {
            console.log("Cell " + i + " selected");
            GameController.playRound(i);
        });
    }
}

//Gameboard represents the state of the board
const Gameboard = (function () {
    //empty array is used to hold the 3x3 grid
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;
    const setCell = (index, token) => {
        if (board[index] === "") {
            board[index] = token;
            return true;
        }
        return false;
    };
    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    }

    return { getBoard, setCell, resetBoard };
})();

// createPlayer will create a new player for the game
const CreatePlayer = (name, token) => {
    return { name, token };
};

//GameController will be responsible for controlling the flow and state of the game
const GameController = (function () {
    const players = [];
    let currentPlayer = 0;
    let isGameOver = false; //flag used to check if the game has ended

    const addPlayer = (player) => players.push(player);
    const getCurrentPlayer = () => players[currentPlayer];
    const switchPlayer = () => {
        //switch between player 1(0) or player 2(1)
        if (currentPlayer === 0) {
            currentPlayer = 1;
        } else {
            currentPlayer = 0;
        };
    };

    const playRound = (index) => {
        if(isGameOver) return; //prevent actions if the game is over

        const player = getCurrentPlayer();
        console.log(`${player.name} is picking cell ${index}`);
        if (Gameboard.setCell(index, player.token)) {
            renderBoard(Gameboard.getBoard());
            if (CheckWin(Gameboard.getBoard())) {
                winnerSound.play();
                endGame(`${player.name} wins!`);
                return;
            }
            if (CheckTie(Gameboard.getBoard())) {
                endGame("It's a tie!");
                return;
            }
            switchPlayer();
        } else {
            console.log(`Cell ${index} is already taken, ${player.name} must choose another cell!`);
        }
    };

    const startGame = () => {
        Gameboard.resetBoard();
        currentPlayer = 0;
        isGameOver = false;
        renderBoard(Gameboard.getBoard());
        initializeEventListeners();
    };

    const endGame = (message) => {
        console.log(message);
        isGameOver = true;
        setTimeout(() => {
            Gameboard.resetBoard();
            renderBoard(Gameboard.getBoard());
            isGameOver = false; // Allow clicks again
        }, 3000); // Delay for 3 seconds (3000 milliseconds)
    };

    return { addPlayer, getCurrentPlayer, switchPlayer, playRound, startGame, endGame};
})();

//If the board matches a winPattern they win
const CheckWin = (board) => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        //if both conditions are true, three positions have the same player marker indicating a win
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
};

//If there is at least 1 empty cell its a not a tie
const CheckTie = (board) => {
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            return false;
        }
    }
    return true;
};

//used for testing:

// initialize players and start the game
const player1 = CreatePlayer("Player 1", "X");
const player2 = CreatePlayer("Player 2", "O");

GameController.addPlayer(player1);
GameController.addPlayer(player2);

GameController.startGame();

