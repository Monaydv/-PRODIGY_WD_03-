document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const resetButton = document.getElementById("reset-button");
    const currentTurnDisplay = document.getElementById("current-turn");
    let currentPlayer = "X";
    let gameState = Array(9).fill("");
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    cells.forEach(cell => {
        cell.addEventListener("click", handleCellClick);
    });

    resetButton.addEventListener("click", resetGame);

    function handleCellClick(e) {
        const cell = e.target;
        const index = cell.dataset.index;

        if (gameState[index] !== "" || checkWinner()) {
            return;
        }

        gameState[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWinner()) {
            alert(`${currentPlayer} WINS!!`);
        } else if (gameState.every(cell => cell !== "")) {
            alert("It's a DRAW!");
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            updateCurrentTurnDisplay();
        }
    }

    function checkWinner() {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return gameState[index] === currentPlayer;
            });
        });
    }


    function resetGame() {
        gameState.fill("");
        currentPlayer = "X";
        cells.forEach(cell => {
            cell.textContent = "";
        });
        updateCurrentTurnDisplay();
    }
    function updateCurrentTurnDisplay() {
        currentTurnDisplay.textContent = `${currentPlayer}'s Turn`;
    }
});

function changeColor(element) {
    element.style.backgroundColor = 'lightblue';
}
function resetGame() {
    const randomColor = getRandomColor();
    const cells = document.querySelectorAll('.cell');

    cells.forEach(function (cell) {
        cell.style.backgroundColor = randomColor;
    });
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
