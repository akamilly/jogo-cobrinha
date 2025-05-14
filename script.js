//Play Board = tela ou tabuleiro
const playBoard = document.querySelector(".play-board");

//Pontuação do jogo
const scoreElement = document.querySelector(".score");

//Recorde de maior pontuação
const highScoreElement = document.querySelector(".high-score");

//Controles de movimento
const controls = document.querySelectorAll(".controls i");

//Cadastro de Variaveis 
let gameOver = false;

//Ordenar X e Y para comida
let foodX, foodY;

//Ordenar X e Y da cabeça da cobra (posição inicial do jogo)
let snakeX = 5, snakeY = 5;

//Velocidade da cobrinha
let velocityX = 0, velocityY = 0;

//Tamanho da cobra (quanto mais comia, mais ela cresce)
let snakeBody = [];


let setIntervalId;

//Ordenar o controle da pontuação, atualizada do jogador 
let score = 0;



//Armazena a pontuação maxíma do placar. EX: Placar maxímo 10.
let highScore = localStorage.getItem("high-score") || 0;

//Posição aleatoria para a comida
const updateFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

//Função fim de jogo
const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Fim de Jogo! Click em OK para recomeçar");
    location.reload();
}

//Função para mudar a direção da cobrinha 
const changeDirection = e => {
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

controls.forEach(button => button.addEventListener ("click", () => changeDirection({ key: button.dataset.key})));

//Iniciar o game = initgame
const initGame = () => {
    if (gameOver) return handleGameOver();
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    //Quando a cobra se alimenta
    if (snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();
        snakeBody.push([foodY, foodX]);
        score++;
        highScore = score >= highScore ? score : highScore;

        localStorage.setItem("high-score", highScore);
        scoreElement.innerHTML = `Score: ${score}`;
        highScoreElement.innerHTML = `High Score: ${highScore}`;
    }

    snakeX += velocityX;
    snakeY += velocityY;

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY];

    if (snakeX <= 0 || snakeX > 30 || snakeY <=0 || snakeY <= 0 || snakeY > 30) {
        return gameOver = true; 
    }

    //add div para cada parte do corpo da cobra 
    for (let i = 0; i <snakeBody.length; i++) {
        html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

        //Verifica se a cabeça da cobra atingiu ou colidiu a cabeça com o corpo
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        } 
        playBoard.innerHTML = html;
    }
}

updateFoodPosition();
setIntervalId = setInterval(initGame, 100);
document.addEventListener("keyup", changeDirection);