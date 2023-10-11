let players = [];

function addPlayer(){
    if (players.length < 2) {
        let name = document.getElementById("playerName").value;

        if (players.some(p => p.name == name)){
            alert("Name already taken");
            return;
        }

        let sign = players.length == 0 ? "X" : "O";
        let newPlayer = createPlayer(name, sign);
        players.push(newPlayer);

        printPlayers();
    }
    else {
        alert("There are already two players!");
    }
}

function createPlayer(name, sign) {
    this.name = name;
    this.score = 0;
    this.sign = sign;

    return {name, score, sign};
}

function printPlayers() {
    let scoreboard = document.getElementsByClassName("scoreboard")[0];
    scoreboard.innerHTML = '';
    players.forEach(p => {
        let scoreboardRow = document.createElement("p");
        scoreboardRow.innerHTML = `Player: ${p.name}. Wins: ${p.score}`;
        scoreboard.appendChild(scoreboardRow);
    });
}

const Gameboard = (function() {
    con
})();