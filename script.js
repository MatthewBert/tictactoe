//Gameboard represents the state of the board
const Gameboard = (function () {
    //empty array is used to hold the 3x3 grid
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    return { getBoard };
})();

// createPlayer will create a new player for the game
const CreatePlayer = (name, token) => {
    return { name, token };
};

// creating some temp players for testing
const player1 = CreatePlayer("Alice", "X");
const player2 = CreatePlayer("Bob", "O");


//GameController will be responsible for controlling the flow and state of the game
const GameController = (function () {
    const players = [];
    let currentPlayer = 0;

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

    return { addPlayer, getCurrentPlayer, switchPlayer };
})();

// adding players to gameController
GameController.addPlayer(player1);
GameController.addPlayer(player2);

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
    for(let i = 0; i < board.length; i++){
        if(board[i] === ""){
            return false; 
        }
    }
    return true; 
};

// Usage:
const board = Gameboard.getBoard();
board[0] = "X";
board[1] = "O";
board[2] = "X";
board[3] = "O";
board[4] = "X";
board[5] = "X";
board[6] = "O";
board[7] = "X";
board[8] = "O";

console.log(CheckWin(board)); // Should log true if there is a win
console.log(CheckTie(board)); // Should log true if it's a tie


