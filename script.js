//Gameboard represents the state of the board
const Gameboard = (function () {
    //empty array is used to hold the 3x3 grid
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;
    const setCell = (index, token) => {
        if(board[index] === ""){
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

