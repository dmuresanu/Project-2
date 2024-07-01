document.addEventListener('DOMContentLoaded', function() {
    const gameArea = document.getElementById('game-area');
    const spaceship = document.getElementById('spaceship');
    const scoreDisplay = document.getElementById('score');
    const livesDisplay = document.getElementById('lives');
    let score = 0;
    let lives = 3;
    let alienSpeed = 2; // Initial speed of aliens
    let alienInterval;
    let moveLeft = false;
    let moveRight = false;

    // Move spaceship left and right
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

    function moveSpaceship() {
        const left = parseInt(window.getComputedStyle(spaceship).left);
        if (moveLeft && left > 0) {
            spaceship.style.left = `${left - 5}px`;
        }
        if (moveRight && left < gameArea.clientWidth - spaceship.clientWidth) {
            spaceship.style.left = `${left + 5}px`;
        }
    }

    function shoot() {
        
    }

    function moveProjectile(projectile) {
        
    }

    function createAlien() {
      
    }

    function moveAlien(alien) {
       
    }

    function checkCollision(projectile) {
        
    }

    function loseLife() {
       
    }

    function gameLoop() {
        moveSpaceship();
        requestAnimationFrame(gameLoop);
    }

    alienInterval = setInterval(createAlien, 500);
    gameLoop();
});
