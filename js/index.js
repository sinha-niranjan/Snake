// Game constants & variable.............................................
let highScore = localStorage.getItem("highScore")
let highScoreBox = document.getElementById("highScoreBox")
let highScoreVal = 0
if(highScore === null)
{
    highScoreVal = 0
    localStorage.setItem("highScore",JSON.stringify(highScoreVal))
}
else{
    highScoreVal = parseInt(highScore)
    highScoreBox.innerHTML = "High Score : " + highScoreVal;
}
const direction = { x: 0, y: 0 };
const foodSound = new Audio('../music/food.mp3');
const gameOverSound = new Audio('../music/gameover.mp3');
const moveSound = new Audio('../music/move.mp3');
const musicSound = new Audio('../music/music.mp3');
let board = document.getElementById('board')
let Score = document.getElementById('score')
let speed = 5;
let lastPaintTime = 0;
let score = 0;
let snakeArr = [
    {
        x: 10, y: 15
    }
]
let food = {
    x: 6, y: 7
}
let inputDir = { x: 0, y: 0 }
// let tempDir = {x: 0 ,y: 0}
//console.log(music.play())


// Game Functions........................................................
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake)
{
    // If you bump into your self
    for(let i = 1;i<snakeArr.length;i++)
    {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
        {
            return true;
        } 
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

    return false;
}







function gameEngine() {
    // part 1: Updating the snake array and food......=
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game over press any key to play again !");
        snakeArr = [{ x: 10, y: 15 }];
        musicSound.play();
        score = 0;
    }

    // If you have eaten the food increament the score and regenrate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        speed = (score/4)*2 + 5;
        if(score>highScoreVal){
            highScoreVal = score;
            localStorage.setItem("highScore", JSON.stringify(highScoreVal))
            highScoreBox.innerHTML = "High Score : " + highScoreVal;
        }
        Score.innerHTML = "score : " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };

    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        //const element = snakeArr[i];
        snakeArr[i + 1] = { ...snakeArr[i] };
        //    snakeArr[i+1].x = snakeArr[i].x;
        //    snakeArr[i+1].y = snakeArr[i].y;   

    }
    if((inputDir.x=== 1 && inputDir.y === 0) || (inputDir.x == -1))
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // part 2: Display the snake and food.....
    // Displaying the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index == 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

    });
    // Displaying the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}






// Main logics Starts here...................................................

window.requestAnimationFrame(main);
musicSound.play();
window.addEventListener('keydown', (e) => {
    inputDir = { x: 0, y: 1 } // start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
           // console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            //console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowRight":
            //console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        case "ArrowLeft":
            //console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});