const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const size = {
    width: 1024,
    height: 576
};

canvas.width = size.width;
canvas.height = size.height;

context.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.2;

class Sprite {
    constructor( { position, velocity} ) {
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
        this.lastKey; 
    }

    draw() {
        context.fillStyle = 'red';
        context.fillRect(this.position.x, this.position.y, 50, this.height);
    }

    update() {
        this.draw();

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity;
        }
    }
}

const player = new Sprite({
    position : {
        x: 0, 
        y : 0
    },
    velocity : {
        x: 0, 
        y : 0
    }
});

const enemy = new Sprite({
    position : {
        x: 500, 
        y : 100
    },
    velocity : {
        x: 0, 
        y : 0
    }
});

const keys = {
    a : {
        pressed : false
    },
    d : {
        pressed : false
    },
    w : {
        pressed : false
    },
    arrowLeft : {
        pressed : false
    },
    arrowRight : {
        pressed : false
    },
    arrowUp : {
        pressed : false
    }
}

function animate() {
    window.requestAnimationFrame(animate);

    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -2.5;
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 2.5;
    }

    if (keys.arrowLeft.pressed && enemy.lastKey === 'arrowLeft') {
        enemy.velocity.x = -2.5;
    } else if (keys.arrowRight.pressed && enemy.lastKey === 'arrowRight') {
        enemy.velocity.x = 2.5;
    }
}

animate();

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd';
            break;

        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a';
            break;

        case 'w':
            player.velocity.y = -10;
            break;

        case 'ArrowRight':
            keys.arrowRight.pressed = true;
            enemy.lastKey = 'arrowRight';
            break;
    
        case 'ArrowLeft':
            keys.arrowLeft.pressed = true;
            enemy.lastKey = 'arrowLeft';
            break;
    
        case 'ArrowUp':
            enemy.velocity.y = -10;
            break;

        default:
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            break;

        case 'a':
            keys.a.pressed = false;
            break;
            
        case 'ArrowRight':
            keys.arrowRight.pressed = false;
            break;
    
        case 'ArrowLeft':
            keys.arrowLeft.pressed = false;
            break;

        default:
            break;
    }
});