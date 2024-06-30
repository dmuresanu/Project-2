// Wait for the DOM to finish loading before running the game
document.addEventListener('DOMContentLoaded', function(){
    
}

//Move spaceship left and right
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        moveLeft = true;
    } else if (event.key === 'ArrowRight') {
        moveRight = true;
    } else if (event.key === ' ') {
        shoot();
    }
});

document.addEventListener('keyup', function(event) {
    if (event.key === 'ArrowLeft') {
        moveLeft = false;
    } else if (event.key === 'ArrowRight') {
        moveRight = false;
    }
});

)
function moveSpaceship() {

}

function shoot() {

}

function moveProkectile() {

}

function createAlien() {

}

function moveAlien() {

}

function checkCollision() {

}

function loseLife() {

}

function gameLoop() {

}