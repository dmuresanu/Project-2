document.addEventListener('DOMContentLoaded', function() {
    const gameArea = document.getElementById('game-area');
    const spaceship = document.getElementById('spaceship');
    const scoreDisplay = document.getElementById('score');
    const livesDisplay = document.getElementById('lives');
    const shootButton = document.getElementById('shoot-button');
    const startButton = document.getElementById('start-button'); // Add start button
    const pauseButton = document.getElementById('pause-button'); // Add pause button
    const gameOverScreen = document.getElementById('game-over-screen'); // Game over screen element
    const gameOverMessage = document.getElementById('game-over-message'); // Game over message element
    
    let score = 0;
    let lives = 3;
    let alienSpeed = 2; // Initial speed of aliens
    let alienInterval;
    let moveLeft = false;
    let moveRight = false;
    let touchStartX = 0;
    let gameRunning = false; // Track if game is running
    let paused = false; // Track if game is paused

    // Move spaceship left and right
    document.addEventListener('keydown', function(event) {
        if (gameRunning && !paused) {
            if (event.key === 'ArrowLeft') {
                moveLeft = true;
            } else if (event.key === 'ArrowRight') {
                moveRight = true;
            }
        }
        if (event.key === ' ') {
            event.preventDefault(); // Prevent default spacebar action (like page scroll)
            if (!paused) {
                shoot();
            }
        }
    });

    document.addEventListener('keyup', function(event) {
        if (gameRunning && !paused) {
            if (event.key === 'ArrowLeft') {
                moveLeft = false;
            } else if (event.key === 'ArrowRight') {
                moveRight = false;
            }
        }
    });

    gameArea.addEventListener('touchstart', function(event) {
        if (gameRunning && !paused) {
            touchStartX = event.touches[0].clientX;
        }
    });

    gameArea.addEventListener('touchmove', function(event) {
        if (gameRunning && !paused) {
            const touchX = event.touches[0].clientX;
            const deltaX = touchX - touchStartX;

            if (deltaX > 0) {
                moveRight = true;
                moveLeft = false;
            } else if (deltaX < 0) {
                moveLeft = true;
                moveRight = false;
            }

            touchStartX = touchX;
        }
    });

    gameArea.addEventListener('touchend', function() {
        if (gameRunning && !paused) {
            moveLeft = false;
            moveRight = false;
        }
    });

    shootButton.addEventListener('touchstart', function(event) {
        if (gameRunning && !paused) {
            event.preventDefault(); // Prevent triggering mouse event
            shoot();
        }
    });

    startButton.addEventListener('click', function() {
        if (!gameRunning) {
            startGame();
        }
    });

    pauseButton.addEventListener('click', function() {
        if (gameRunning) {
            togglePause();
        }
    });

    endGameButton.addEventListener('click', function() {
        endGame();
    });

    function startGame() {
        gameRunning = true;
        startButton.disabled = true;
        pauseButton.disabled = false;
        alienInterval = setInterval(gameLoop, 20);
    }

    function togglePause() {
        paused = !paused;
        if (paused) {
            pauseButton.textContent = 'Resume';
        } else {
            pauseButton.textContent = 'Pause';
        }
    }

    function moveSpaceship() {
        const left = parseInt(window.getComputedStyle(spaceship).left);
        if (moveLeft && left > 0) {
            spaceship.style.left = `${left - 10}px`;
        }
        if (moveRight && left < gameArea.clientWidth - spaceship.clientWidth) {
            spaceship.style.left = `${left + 10}px`;
        }
    }

    function shoot() {
        const leftProjectile = document.createElement('div');
        leftProjectile.classList.add('projectile');
        leftProjectile.style.left = `${spaceship.offsetLeft}px`;
        leftProjectile.style.bottom = '60px';
        gameArea.appendChild(leftProjectile);

        const rightProjectile = document.createElement('div');
        rightProjectile.classList.add('projectile');
        rightProjectile.style.left = `${spaceship.offsetLeft + spaceship.clientWidth - 5}px`;
        rightProjectile.style.bottom = '60px';
        gameArea.appendChild(rightProjectile);

        moveProjectile(leftProjectile);
        moveProjectile(rightProjectile);
    }

    function moveProjectile(projectile) {
        const interval = setInterval(function() {
            if (gameRunning && !paused) {
                const bottom = parseInt(window.getComputedStyle(projectile).bottom);
                if (bottom > gameArea.clientHeight) {
                    clearInterval(interval);
                    gameArea.removeChild(projectile);
                } else {
                    projectile.style.bottom = `${bottom + 5}px`;
                    checkCollision(projectile);
                }
            }
        }, 20);
    }

    function createAlien() {
        if (gameRunning && !paused) {
            const alien = document.createElement('div');
            alien.classList.add('alien');
            alien.style.left = `${Math.random() * (gameArea.clientWidth - 50)}px`;
            alien.style.top = '0px';
            gameArea.appendChild(alien);
            moveAlien(alien);
        }
    }

    function moveAlien(alien) {
        const interval = setInterval(function() {
            if (gameRunning && !paused) {
                const top = parseInt(window.getComputedStyle(alien).top);
                if (top > gameArea.clientHeight - 50) {
                    clearInterval(interval);
                    gameArea.removeChild(alien);
                    loseLife();
                } else {
                    alien.style.top = `${top + alienSpeed}px`;
                }
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

    function endGame() {
        gameRunning = false;
        clearInterval(alienInterval);
        gameOverMessage.textContent = `Game Over! Final Score: ${score}`;
        gameOverScreen.style.display = 'block';
    }

 function resetGame() {
    score = 0;
    lives = 3;
    alienSpeed = 2;
    scoreDisplay.textContent = score;
    livesDisplay.textContent = lives;
    startButton.disabled = false;
    pauseButton.disabled = true;
    gameArea.innerHTML = ''; // Clear game area
    gameOverScreen.style.display = 'none'; // Hide game over screen

    // Reset spaceship position and display it
    spaceship.style.left = 'calc(50% - 25px)'; 
    spaceship.style.bottom = '10px'; 
    gameArea.appendChild(spaceship);
}

    function gameLoop() {
        moveSpaceship();
        if (gameRunning && !paused && Math.random() < 0.02) {
            createAlien();
        }
    }
});
