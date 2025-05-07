//Play Board = tela ou tabuleiro
const playBoard = documento.querySelector(".play-board");

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
const updataFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

//Função fim de jogo
const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Fim de Jogo! Click em OK para recomeçar");
    location.reload();
}