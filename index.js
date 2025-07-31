const canvas = document.querySelector('canvas');
// Renderizamos el contexto del canvas (cómo va a dibuajar los elementos)
const context = canvas.getContext('2d'); 
canvas.width = 440;
canvas.height = 400;

// variables de la pelota
const ballRadius = 4; 
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let directionX = 2; 
let directionY = -2;
// variables de la paleta
const paddleHeight = 10;
const paddleWidth = 50;
let paddelX = (canvas.width - paddleWidth) / 2;
let paddelY = canvas.height - paddleHeight - 10 ;
let rightPressed = false;
let leftPressed = false;
const PADEL_SPEED = 7;
const $sprite = document.querySelector('#sprite');
const $bricks = document.querySelector('#bricks');

// variables de los ladrillos 
const bricksRows = 6;
const bricksColumns = 13;
const brickWidth = 30;
const brickHeight = 14;
const brickPadding = 2;
const brickOffsetTop = 80;
const brickOffsetLeft = 16;
const bricks = [];
const BRICK_STATUS = {
    ACTIVE: 1,
    DESTROYED: 0
}

for(let c = 0; c < bricksColumns; c++){
    bricks[c] = [];
    for(let r = 0; r < bricksRows; r++){
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        //asignar un color aleatorio por cada ladrillo
        const random = Math.floor(Math.random() * 7);
        bricks[c][r] = {   
            x : brickX,
            y : brickY,
            status: BRICK_STATUS.ACTIVE, // 1 significa que el ladrillo está activo
            color: random
        };
    }
}


function drawBall() {
    context.beginPath(); // inicia un dibujo 
    context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    context.fillStyle = '#fff';
    context.fill();
    context.closePath();
}
function drawPaddle() {
    context.drawImage($sprite,29,174,paddleWidth, paddleHeight,paddelX,paddelY,paddleWidth,paddleHeight);
}
function drawBricks() {
    for(let c = 0; c < bricksColumns; c++){
        for(let r = 0; r < bricksRows; r++){
            const currentBrick = bricks[c][r];
            if(currentBrick.status === BRICK_STATUS.DESTROYED){
               continue; 
            }
             
            const clipX = currentBrick.color * 32; 
            context.drawImage($bricks, clipX, 0, 31, 14, currentBrick.x, currentBrick.y, brickWidth, brickHeight); 

            
        }
    }
}
function ballMovement() {
    if(ballX + directionX > canvas.width - ballRadius || ballX + directionX < ballRadius){
        directionX = -directionX;
    }
    if(ballY + directionY < ballRadius){
        directionY = -directionY;
    }
    const isBallInPaddle = ballY + directionY > paddelY &&
        ballX + directionX > paddelX &&
        directionX < paddelX + paddleWidth;
    if(isBallInPaddle){
       directionY = -directionY; 
    }
    else if(ballY + directionY > canvas.height - ballRadius){
        // Aquí podrías reiniciar el juego o restar vidas
        console.log('Game Over');
        document.location.reload(); // Recargar la página para reiniciar el juego
    }
    ballX += directionX;
    ballY += directionY;
}
function paddelMovement() {
    if(rightPressed && paddelX < canvas.width - paddleWidth){
        paddelX += PADEL_SPEED;
    }else if(leftPressed && paddelX > 0){
        paddelX -= PADEL_SPEED;
    }
}

function cleanCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}
function initEvaents(){
    document.addEventListener('keydown', keyDownhandler);
    document.addEventListener('keyup', keyUphandler);

    function keyDownhandler(event){
        const {key} = event; 
    
        if(key === 'Right' || key === 'ArrowRight'){
            rightPressed = true;
        }
        else if(key === 'Left' || key === 'ArrowLeft'){
            leftPressed = true;
        }
    }
    function keyUphandler(event){
        const {key} = event; 
        if(key === 'Right' || key === 'ArrowRight'){
            rightPressed = false;
        }
        else if(key === 'Left' || key === 'ArrowLeft'){
            leftPressed = false;
        }
    }
}

function draw() {
    initEvaents();
    //Aquí programas el juego, dibujas los elementos, etc.
    cleanCanvas();
    drawBall();
    drawPaddle();
    drawBricks();
    //colisiones y movimientos
    ballMovement(); 
    paddelMovement();
    
    //requestAnimationFrame nos permite llamar a una función antes de que 
    //el navegador vuelva a dibujar la pantalla y esta sincronizado con el 
    //refresco de tu pantalla. Ideal para animaciones. 
    window.requestAnimationFrame(draw);

}


draw(); 

