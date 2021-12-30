
const player = (playerName) => {
    let currentPos = [];
    let won = false;
    let name = playerName;
    const winningPos =
        [['a1', 'a2', 'a3'],
        ['b1', 'b2', 'b3'],
        ['c1', 'c2', 'c3'],
        ['a1', 'b2', 'c3'],
        ['a3', 'b2', 'c1'],
        ['a1', 'b1', 'c1'],
        ['a2', 'b2', 'c2'],
        ['a3', 'b3', 'c3']];

    const checkWinning = () => {
        winningPos.forEach(arr => {
            if (currentPos.includes(arr[0]) && currentPos.includes(arr[1]) && currentPos.includes(arr[2])) {
                won = true;
            }
        });
        console.log(won);
    };
    const getName = () => name;
    const setName = (newName) => {
        name = newName;
    };

    const getWon = () => won;
    const setPos = (pos) => {
        currentPos.push(pos);
    };
    const getPos = () => currentPos;
    const checkPos = (pos) => currentPos.includes(pos);
    const reset = () => {
        currentPos = [];
        won = false;
    };
    return { setPos, getPos, reset: reset, checkPos, checkWinning, getWon, getName, setName };
}
const playerOne = player("Player X");
const playerTwo = player("Player O");

const gameBoard = (() => {
    let _board = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];
    const getBoard = () => {
        return _board;
    }
    return { getBoard };
})();

const displayController = (() => {
    let PlayerOneTurn = true;
    let tieCounter = 0;
    const boardEl = document.getElementById("GameBoard");
    const resetButton = document.getElementById("restartButton");
    const gameINFO = document.getElementById("info");
    const resetBoard = () => {
        let boardNodes = [...document.getElementsByClassName("square")]
        boardNodes.forEach(el => {
            el.textContent = "";
        });
        playerOne.reset();
        playerTwo.reset();
        tieCounter = 0;
        if (playerOne.getName() == "") {
            playerOne.setName("Player X");
        }
        if (playerTwo.getName() == "") {
            playerTwo.setName("Player O");
        }
    };

    resetButton.addEventListener("click", () => {
        const player1Input = document.getElementById("Player1");
        const player2Input = document.getElementById("Player2");
        playerOne.setName(player1Input.value);
        playerTwo.setName(player2Input.value);
        player1Input.value = "";
        player2Input.value = "";
        resetBoard();
    });
    gameBoard.getBoard().forEach(el => {
        let currentEl = document.createElement("div")
        currentEl.setAttribute("id", el);
        currentEl.setAttribute("class", "square")
        currentEl.addEventListener("click", function () {
            if (PlayerOneTurn) {
                if (!(playerOne.checkPos(el) || playerTwo.checkPos(el))) {
                    playerOne.setPos(el);
                    document.getElementById(el).textContent = "x"
                    PlayerOneTurn = false;
                    playerOne.checkWinning();
                    tieCounter++;
                }
            } else {
                if (!(playerOne.checkPos(el) || playerTwo.checkPos(el))) {
                    playerTwo.setPos(el);
                    document.getElementById(el).textContent = "o"
                    PlayerOneTurn = true;
                    playerTwo.checkWinning();
                    tieCounter++;
                }
            }
            if (playerOne.getWon()) {
                gameINFO.textContent = playerOne.getName() + " Won";
                resetBoard();
            } else if (playerTwo.getWon()) {
                gameINFO.textContent = playerTwo.getName() + " Won";
                resetBoard();
            } else if (tieCounter == 9) {
                gameINFO.textContent = "It was tied";
                resetBoard();
            }
        });
        boardEl.appendChild(currentEl);
    });
})();
