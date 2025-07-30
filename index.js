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

function drawBall() {
    context.beginPath();
    context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    context.fillStyle = '#fff';
    context.fill();
    context.closePath();
}
function drawPaddle() {}
function drawBricks() {}

function ballMovement() {
    if(ballX + directionX > canvas.width - ballRadius || ballX + directionX < ballRadius){
        directionX = -directionX;
    }
    if(ballY + directionY < ballRadius){
        directionY = -directionY;
    }
    if(ballY + directionY > canvas.height - ballRadius){
        // Aquí podrías reiniciar el juego o restar vidas
        console.log('Game Over');
        document.location.reload(); // Recargar la página para reiniciar el juego
    }
    ballX += directionX;
    ballY += directionY;
}

function cleanCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}
function draw() {
    //Aquí programas el juego, dibujas los elementos, etc.
    cleanCanvas();
    drawBall();
    drawPaddle();
    drawBricks();
    //colisiones y movimientos 
    ballMovement(); 
    //requestAnimationFrame nos permite llamar a una función antes de que 
    //el navegador vuelva a dibujar la pantalla y esta sincronizado con el 
    //refresco de tu pantalla. Ideal para animaciones. 
    window.requestAnimationFrame(draw);

}


draw(); 

