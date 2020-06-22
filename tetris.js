//ADDING DIVS TO FORM THE GRID **DO NOT MOVE ON PAGE
    const grid = document.querySelector(".grid");
    const miniGrid = document.querySelector(".miniGrid");

    function addElements () { 
        for(var i = 0; i < 200; i++){
            let newDiv = document.createElement("div");
            grid.append(newDiv);
            newDiv.className = "square";
        } 
    } 
    addElements();

    function addTaken () {
        for(var i = 0; i < 10; i++){
            let newDiv = document.createElement("div");
            grid.append(newDiv);
            newDiv.className = "taken";
        } 
    }
    addTaken();

    function addMiniGrid () {
        for(var i = 0; i < 16; i++){
            let newDiv = document.createElement("div");
            miniGrid.append(newDiv);
            newDiv.className = "miniSquares";
        } 
    }
    addMiniGrid();
//END ADDING DIVS TO PAGE ** DO NOT MOVE ON PAGE

var square = document.querySelectorAll(".square");
var squares = Array.from(square);
var div = document.getElementsByTagName("div");
var taken = document.querySelectorAll(".taken");
const width = 10;
const scoreDisplay = document.querySelector("#score");
const startButton = document.querySelector("#startButton");
let nextRandom = 0
let timerId

//Tetrominoes
const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
]
const zTetromino = [
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1]
]

const tTetromino = [
    [1, width, width+1, width+2],
    [1, width+1, width+2, width*2+1],
    [width, width+1, width+2, width*2+1],
    [1, width, width+1, width*2+1]
]
const sTetromino = [
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1]
]
const iTetromino = [
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3]
]

const theTetrominoes = [lTetromino, zTetromino, tTetromino, sTetromino, iTetromino];
let currentPosition = 4;
let currentRotation = 0;
let random = Math.floor(Math.random()*theTetrominoes.length);
let current = theTetrominoes[random][currentRotation];

//draw first rotation in first tetromino
function draw() {
    current.forEach(index => {
        div[currentPosition + index].classList.add('tetromino')
    })
}
//undraw Tetromino
function undraw() {
    current.forEach(index => {
        div[currentPosition + index].classList.remove('tetromino')
    })
}
//make Tetromino move down every second
// timerId = setInterval(moveDown, 1000)

//assign keyCodes
function control(e) {
    if(e.keyCode === 37) {
        moveLeft()
    } else if (e.keyCode === 38) {
        rotate()
    } else if (e.keyCode === 39) {
        moveRight()
    } else if (e.keyCode === 40) {
        moveDown()
    }
}
document.addEventListener("keyup", control)

function moveDown() {
    undraw();
    currentPosition += width
    draw();
    freeze();
}

function freeze() {
    if(current.some(index => div[currentPosition + index + width].classList.contains('taken'))) {
        current.forEach(index => div[currentPosition + index].classList.add('taken'))
    //start new Tetromino falling
        random = nextRandom
        nextRandom = Math.floor(Math.random() * theTetrominoes.length)
        current = theTetrominoes[random][currentRotation]
        currentPosition = 4
        draw()
        displayShape()
    }
};

//move tetromino L, unless at edge or blocked
function moveLeft() {
    undraw();
    const leftEdge = current.some(index => (currentPosition + index) % width === 0)
    if(!leftEdge) currentPosition -= 1;
    if(current.some(index => div[currentPosition + index].classList.contains('taken'))) {
        currentPosition += 1;
    }
    draw();
}
//move tetromino R, unless at edge or blocked
function moveRight() {
    undraw()
    const rightEdge = current.some(index => (currentPosition + index) % width === width -1)
    if(!rightEdge) currentPosition += 1
    if(current.some(index => div[currentPosition + index].classList.contains('taken'))) {
        currentPosition -= 1;
    }
    draw()
}

//rotate Tetromino
function rotate() {
    undraw()
    currentRotation ++
    if(currentRotation === current.length) { //if rotation gets to 4, go back to 0
        currentRotation = 0
    }
    current = theTetrominoes[random][currentRotation]
    draw()
}

//display up-next tetromino in miniGrid
const displaySquares = document.querySelectorAll('.miniSquares')
const displayWidth = 4
let displayIndex = 0

//tetromino w/o rotations 
const upNext = [
    [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
    [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino
    [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
    [0, 1, displayWidth, displayWidth+1], //sTetromino
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino
]
//display shape in miniGrid
function displayShape () {
    displaySquares.forEach(displaySquare => {
        displaySquare.classList.remove('tetromino')
    })
    upNext[nextRandom].forEach (index => {
        displaySquares[displayIndex + index].classList.add('tetromino')
    })
}

//add functionality to button
startButton.addEventListener("click", () => {
    if(timerId) {
        clearInterval(timerId)
        timerId = null
    } else {
        draw()
        timerId = setInterval(moveDown, 1000)
        nextRandom = Math.floor(Math.random() * theTetrominoes.length)
        displayShape()
    }
})