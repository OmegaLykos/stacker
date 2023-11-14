const grid = document.querySelector('.grid');
const stackBtn = document.querySelector('.stack');
const scoreCounter = document.querySelector('.score-counter');

const endGameScreen = document.querySelector('.end-game-screen');
const endGameText = document.querySelector('.end-game-text');
const playAgainButton = document.querySelector('.play-again');


// 0 - cella vuota, 
// 1 - barra

const gridMatrix = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0]
];

let currentRowIndex = gridMatrix.length - 1;
let barDirection = 'right';
let barSize = 3;
let isGameOver = false;
let score = 0;
let t;


//console.table(gridMatrix)

function draw() {
    grid.innerHTML = '';
    gridMatrix.forEach(function (rowContent, rowIndex) {

        //console.log(rowIndex, rowContent);

        rowContent.forEach(function (cellContent, cellIndex) {

            //console.log(cellContent);

            const cell = document.createElement('div');
            cell.classList.add('cell');
            //cell.innerText = cellContent; FACEVA APPARIRE I NUMERINI NELLA SCACCHIERA

            const isRowEven = rowIndex % 2 === 0;
            const isCellEven = cellIndex % 2 === 0;

            if ((isRowEven && isCellEven) || (!isRowEven && !isCellEven)) {
                cell.classList.add('cell-dark');
            }

            if (cellContent === 1) {
                cell.classList.add('bar');
            }

            grid.appendChild(cell);

        })
    })
}

function moveRight(row) {

    row.pop();
    row.unshift(0);
    console.log(row);
}

function moveLeft(row) {
    row.shift();
    row.push(0);
    console.log(row);
}

function isRightEdge(row) {
    const lastElement = row[row.length - 1];
    return lastElement === 1;
}

function isLeftEdge(row) {
    const firstElement = row[0];
    return firstElement === 1;


}

function moveBar() {
    const currentRow = gridMatrix[currentRowIndex];

    if (barDirection === 'right') {
        moveRight(currentRow);

        if (isRightEdge(currentRow)) {
            barDirection = 'left';
        }


    } else if (barDirection === 'left') {
        moveLeft(currentRow);

        if (isLeftEdge(currentRow)) {
            barDirection = 'right';
        }
    }
}

function checkLost() {
    const currentRow = gridMatrix[currentRowIndex];
    const prevRow = gridMatrix[currentRowIndex + 1];

    if (!prevRow) return;

    for (let i = 0; i < currentRow.length; i++) {
        if (currentRow[i] === 1 && prevRow[i] === 0) {
            currentRow[i] = 0;
            barSize--;
        }
    }

    if (barSize === 0) {
        isGameOver = true;
        clearInterval(t);
        scoreCounter.innerText = '00000';
        //window.alert('hai perso!');
        endGame(false);
    }
}

function checkWin() {
    if (currentRowIndex === 0) {
        isGameOver = true;
        clearInterval(t);
        //window.alert('hai vinto!');
        endGame(true);
        // total score SPOSTATO
        //const finalBlock = document.querySelectorAll('.bar');
        //console.log('total score', finalBlock.length);

    }
}

function onStack() {

    //check lost
    checkLost();

    //check win
    checkWin();

    //aggiorno il punteggio
    updateScore();
    if (isGameOver) return;

    //cambio riga
    currentRowIndex--;
    barDirection = 'right';
    for (let i = 0; i < barSize; i++) {
        gridMatrix[currentRowIndex][i] = 1;
    }
    draw();
}

function updateScore() {
    //score++;
    //scoreCounter.innerText = score.toString().padStart(5, '0');

    //total score
    const finalBlock = document.querySelectorAll('.bar');
    scoreCounter.innerText = finalBlock.length.toString().padStart(5, '0');


}

function endGame(isVictory) {
    if (isVictory) {
        endGameText.innerHTML = 'YOU<br>WON';
        endGameScreen.classList.add('win');
    }
    endGameScreen.classList.remove('hidden');
}

draw();

function main() {
    // update
    moveBar();
    // disegno
    draw();
    //console.log('ciao')
}
stackBtn.addEventListener('click', onStack);
playAgainButton.addEventListener('click', function () {
    location.reload();
})
t = setInterval(main, 600);


//console.log(gridMatrix)