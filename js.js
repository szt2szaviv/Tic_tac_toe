let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleClick(index) {
    if (board[index] === '' && gameActive) {
        board[index] = currentPlayer;
        document.getElementById('board').children[index].innerText = currentPlayer;
        if (checkWin()) {
            document.getElementById('result').innerText = `${currentPlayer} nyert!`;
            gameActive = false;
        } else if (board.every(cell => cell !== '')) {
            document.getElementById('result').innerText = 'Döntetlen';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (currentPlayer === 'O') {
                computerMove();
            }
        }
    }
}

function computerMove() {
    const emptyCells = board.reduce((acc, cell, index) => {
        if (cell === '') {
            acc.push(index);
        }
        return acc;
    }, []);

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const computerChoice = emptyCells[randomIndex];

    setTimeout(() => {
        handleClick(computerChoice);
    }, 1000);
}

function checkWin() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] !== '' && board[a] === board[b] && board[a] === board[c];
    });
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    document.getElementById('result').innerText = '';
    Array.from(document.getElementById('board').children).forEach(cell => {
        cell.innerText = '';
    });
}

const boardContainer = document.getElementById('board');
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.addEventListener('click', () => handleClick(i));
    boardContainer.appendChild(cell);
}
