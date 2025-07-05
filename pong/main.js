const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.canvas.width = 600;
ctx.canvas.height = 480;


const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 50;
const BALL_RADIUS = 8;
const PADDLE_SPEED = 5;
const BALL_SPEED = 5;
let aiScore = 0;
let playerscore = 0;



function clearAll(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function setColor(color){
    ctx.fillStyle = color;
}

class Paddle{
    x;
    y;
    color;
    direction;

    constructor(x, color){
        this.x = x;
        this.y = canvas.height / 2 - PADDLE_HEIGHT / 2;
        this.color = color;
        this.direction = 0;
    }

    draw(){
        setColor(this.color);
        ctx.fillRect(this.x, this.y, PADDLE_WIDTH, PADDLE_HEIGHT);
    }



    move(){
        this.y = Math.max(
            0,
            Math.min(
                canvas.height - PADDLE_HEIGHT,
                this.y + PADDLE_SPEED * this.direction
            )
        )
    }

    moveAi(ballY){
        const center = this.y + PADDLE_HEIGHT / 2;
        if (center < ballY - PADDLE_HEIGHT / 2){
            this.y += PADDLE_SPEED;
        }
        else if(center > ballY + PADDLE_HEIGHT / 2){
            this.y -= PADDLE_SPEED;
        }
    }

    collision(ballX, ballY){
        const closestX = Math.max(this.x, Math.min(ballX, this.x + PADDLE_WIDTH));
        const closestY = Math.max(this.y, Math.min(ballY, this.y + PADDLE_HEIGHT));

        const dx = ballX - closestX;
        const dy = ballY - closestY;

        return dx * dx + dy * dy <= BALL_RADIUS * BALL_RADIUS
    }


}

class Ball {
    x;
    y;
    angle;

    constructor(){
        this.reset();
    }

    reset() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        const angles = [
            (Math.random() * Math.PI) / 2 - Math.PI / 4,
            Math.PI + (Math.random() * Math.PI) / 2 - Math.PI / 4,
        ];
        this.angle = angles[Math.floor(Math.random() * 2)]
    }

    draw(){
        setColor("black");
        ctx.beginPath();
        ctx.arc(this.x, this.y, BALL_RADIUS, 0, Math.PI * 2);
        ctx.fill();
    }

    move() {
        this.x += Math.cos(this.angle) * BALL_SPEED;
        this.y += Math.sin(this.angle) * BALL_SPEED;

        if (this.y <= BALL_RADIUS || this.y >= canvas.height - BALL_RADIUS){
            this.angle = -this.angle
        }
    }

    bounceHorizont(dy){
        this.angle = Math.PI - this.angle;

        if(dy){
            const da = (dy / PADDLE_HEIGHT) * (Math.PI / 3)
            this.angle += da;
        } 
    }
}



const player = new Paddle(canvas.width - 30, "slateblue");
const ai = new Paddle(30 - PADDLE_WIDTH, "red");
const ball = new Ball();

function animate(){
    clearAll();
    player.draw();
    ai.draw();
    ball.draw();
    update();
    requestAnimationFrame(animate);
}

function update(){
    ball.move();
    player.move();
    ai.moveAi(ball.y);
    if(player.collision(ball.x , ball.y)){
        ball.bounceHorizont(ball.y - player.y - PADDLE_HEIGHT / 2);
        ball.x = player.x - BALL_RADIUS - 1;
    }
    if(ai.collision(ball.x , ball.y)){
        ball.bounceHorizont();
        ball.x = ai.x + PADDLE_WIDTH + BALL_RADIUS + 1;
    }

    if(ball.x < 0){
        ball.reset();
        playerscore++;
        document.getElementById("playerScore").innerHTML = playerscore;
    }

    if(ball.x >= canvas.width){
        ball.reset();
        playerscore++;
        document.getElementById("aiScore").innerHTML = playerscore;
    }
}

// window.addEventListener("keydown", (event) =>{
//     console.log(event.keyCode);
//     if(event.key == "ArrowUp"){
//         player.moveUp();
//     }
//     if(event.key == "ArrowDown"){
//         player.moveDown();
//     }
// })
window.addEventListener("keydown", (event) => {
    console.log(event.key);
    if (event.key == "ArrowUp"){
        player.direction = -1;
    }
    if(event.key == "ArrowDown"){
        player.direction = 1
    }
})
window.addEventListener("keyup", (event) => {
    console.log(event.key);
    if (event.key == "ArrowUp"){
        player.direction = 0;
    }
    if(event.key == "ArrowDown"){
        player.direction = 0;
    }
})
animate();