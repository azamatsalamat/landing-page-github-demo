let players = [];
let currentPlayer = null;

function addPlayer(){
    if (players.length < 2) {
        var nameInput = document.getElementById("playerName");
        let name = nameInput.value;

        if (players.some(p => p.name == name)){
            alert("Name already taken");
            return;
        }

        let sign = players.length == 0 ? "X" : "O";
        let newPlayer = createPlayer(name, sign);
        players.push(newPlayer);

        printPlayers();

        nameInput.value = '';
    }
    else {
        alert("There are already two players!");
    }
};

function createPlayer(name, sign) {
    this.name = name;
    this.score = 0;
    this.sign = sign;

    return {name, score, sign};
};

function printPlayers() {
    let scoreboard = document.getElementsByClassName("scoreboard")[0];
    scoreboard.innerHTML = '';
    players.forEach(p => {
        let scoreboardRow = document.createElement("p");
        scoreboardRow.innerHTML = `Player: ${p.name}. Wins: ${p.score}`;
        scoreboard.appendChild(scoreboardRow);
    });
};

function startGame(){
    if (players.length == 2){
        Gameboard.clearBoard();
        Gameboard.generateBoard();
        currentPlayer = players[0];
        Gameboard.announceMove();
    }
    else {
        alert("There must be 2 players");
    }
};

const Gameboard = (function() {
    let cells = [];

    const addCellOnBoard = (cell, board) => {
        let cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.id = cell.id;
        cellElement.addEventListener("click", makeMove);
        cell.cellElement = cellElement;
        board.appendChild(cellElement);
    };

    const generateBoard = () => {
        let board = document.getElementsByClassName("gameboard")[0];
        for (let i = 0; i < 9; i++) {
            let cell = createCell();
            cell.id = i;
            cells.push(cell);
            addCellOnBoard(cell, board);
          }
    };

    const clearBoard = () => {
        let board = document.getElementsByClassName("gameboard")[0];
        cells = [];
        board.innerHTML = '';
    }

    const announceMove = () => {
        let turnboard = document.getElementsByClassName("turnboard")[0];
        turnboard.innerHTML = `${currentPlayer.name} is making a move`;
    };

    const makeMove = function (event) {
        let selectedCell = cells[event.target.id];

        if (selectedCell.isTaken) {
            alert('Cell already taken');
            return;
        }
        else {
            selectedCell.isTaken = true;
            selectedCell.playerClicked = currentPlayer.name;
            selectedCell.cellElement.innerHTML = currentPlayer.sign;

            switchCurrentPlayer();
        }

        if (checkForWinner() == true){
            finishGame();
            return;
        }

        announceMove();
    };

    const checkForWinner = () => {
        if (cellsTakenBySamePlayer(cells[0], cells[4], cells[8]) ||
        cellsTakenBySamePlayer(cells[2], cells[4], cells[6]) ||
        cellsTakenBySamePlayer(cells[0], cells[1], cells[2]) ||
        cellsTakenBySamePlayer(cells[3], cells[4], cells[5]) ||
        cellsTakenBySamePlayer(cells[6], cells[7], cells[8]) ||
        cellsTakenBySamePlayer(cells[0], cells[3], cells[6]) ||
        cellsTakenBySamePlayer(cells[1], cells[4], cells[7]) ||
        cellsTakenBySamePlayer(cells[2], cells[5], cells[8])) {
            return true;
        }
        
        return false;
    };

    const switchCurrentPlayer = () => {
        if (currentPlayer == players[0]){
            currentPlayer = players[1];
        }
        else {
            currentPlayer = players[0];
        }
    }

    const finishGame = () => {
        cells.forEach(x => x.cellElement.removeEventListener("click", makeMove));
        switchCurrentPlayer();
        currentPlayer.score++;
        announceWinner();
        printPlayers();
        changePlayButtonText();
    }

    const announceWinner = () => {
        let turnboard = document.getElementsByClassName("turnboard")[0];
        turnboard.innerHTML = `Game over! ${currentPlayer.name} is the winner!`;
    }

    const cellsTakenBySamePlayer = (cell1, cell2, cell3) => {
        if (!(cell1.playerClicked && cell2.playerClicked && cell3.playerClicked)){
            return false;
        }

        return cell1.playerClicked == cell2.playerClicked && cell2.playerClicked == cell3.playerClicked;
    }

    const changePlayButtonText = () => {
        let playButton = document.getElementById("playButton");
        playButton.innerHTML = "Play again";
    }

    return {
        generateBoard,
        announceMove,
        clearBoard
    };
})();

function createCell(){
    this.isTaken = false;
    this.id = 0;
    this.playerClicked;
    this.cellElement = null;

    return {isTaken: this.isTaken, id: this.id, playerClicked: this.playerClicked};
}