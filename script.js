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
