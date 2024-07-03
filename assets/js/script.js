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
    let touchStartX = 0;
    let touchEndX = 0;

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

    gameArea.addEventListener('touchstart', function(event) {
        touchStartX = event.touches[0].clientX;
    });

    gameArea.addEventListener('touchmove', function(event) {
        touchEndX = event.touches[0].clientX;
        const deltaX = touchEndX - touchStartX;

        if (deltaX > 0) {
            moveRight = true;
            moveLeft = false;
        } else if (deltaX < 0) {
            moveLeft = true;
            moveRight = false;
        } else {
            moveLeft = false;
            moveRight = false;
        }

        touchStartX = touchX
    });

    gameArea.addEventListener('touchend', function() {
        moveLeft = false;
        moveRight = false;
    });

    shootButton.addEventListener('touchstart', function(event) {
        event.preventDefault(); // Prevent triggering mouse event
        shoot();
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
        const projectile = document.createElement('div');
        projectile.classList.add('projectile');
        projectile.style.left = `${spaceship.offsetLeft + spaceship.clientWidth / 2 - 2.5}px`;
        projectile.style.bottom = '60px';
        gameArea.appendChild(projectile);
        moveProjectile(projectile);
    }

    function moveProjectile(projectile) {
        const interval = setInterval(function() {
            const bottom = parseInt(window.getComputedStyle(projectile).bottom);
            if (bottom > gameArea.clientHeight) {
                clearInterval(interval);
                gameArea.removeChild(projectile);
            } else {
                projectile.style.bottom = `${bottom + 5}px`;
                checkCollision(projectile);
            }
        }, 20);
    }

    function createAlien() {
        const alien = document.createElement('div');
        alien.classList.add('alien');
        alien.style.left = `${Math.random() * (gameArea.clientWidth - 50)}px`;
        alien.style.top = '0px';
        gameArea.appendChild(alien);
        moveAlien(alien);
    }

    function moveAlien(alien) {
        const interval = setInterval(function() {
            const top = parseInt(window.getComputedStyle(alien).top);
            if (top > gameArea.clientHeight - 50) {
                clearInterval(interval);
                gameArea.removeChild(alien);
                loseLife();
            } else {
                alien.style.top = `${top + alienSpeed}px`;
            }
        }, 20);
    }

    function checkCollision(projectile) {
        const aliens = document.getElementsByClassName('alien');
        for (let i = 0; i < aliens.length; i++) {
            const alien = aliens[i];
            const alienRect = alien.getBoundingClientRect();
            const projectileRect = projectile.getBoundingClientRect();
            if (
                projectileRect.left < alienRect.left + alienRect.width &&
                projectileRect.left + projectileRect.width > alienRect.left &&
                projectileRect.top < alienRect.top + alienRect.height &&
                projectileRect.top + projectileRect.height > alienRect.top
            ) {
                gameArea.removeChild(projectile);
                gameArea.removeChild(alien);
                score++;
                scoreDisplay.textContent = score;
                if (score % 5 === 0) {
                    alienSpeed++;
                }
                return;
            }
        }
    }

    function loseLife() {
        lives--;
        livesDisplay.textContent = lives;
        if (lives === 0) {
            alert('Game Over! Final Score: ' + score);
            clearInterval(alienInterval);
            window.location.reload();
        }
    }

    function gameLoop() {
        moveSpaceship();
        requestAnimationFrame(gameLoop);
    }

    alienInterval = setInterval(createAlien, 3000);
    gameLoop();
});
