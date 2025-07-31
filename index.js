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
function drawBall() {
    context.beginPath(); // inicia un dibujo 
    context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    context.fillStyle = '#fff';
    context.fill();
    context.closePath();
}
function drawPaddle() {
    context.fillStyle = '#fff';
    context.fillRect(paddelX, paddelY, paddleWidth, paddleHeight);

}
function drawBricks() {}

function ballMovement() {
    if(ballX + directionX > canvas.width - ballRadius || ballX + directionX < ballRadius){
        directionX = -directionX;
    }
    if(ballY + directionY < ballRadius){
        directionY = -directionY;
    }
    const isBallInPaddle = ballY + directionY > paddelY &&
        ballY + directionY < paddelY + paddleHeight &&
        ballX + directionX > paddelX &&
        ballX + directionX < paddelX + paddleWidth;
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

