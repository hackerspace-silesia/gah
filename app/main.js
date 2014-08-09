var background;
var player;
var currentSpeed = 0;
var cursors;

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', {
    preload: preload,
    create: create,
    update: update,
});

function preload() {
    game.load.atlas('player', 'assets/games/tanks/tanks.png', 'assets/games/tanks/tanks.json');
    game.load.image('background', 'assets/games/tanks/scorched_earth.png');
}

function create() {

    //  Resize our game world to be a 2000 x 2000 square
    game.world.setBounds(-1000, -1000, 2000, 2000);

    //  Our tiled scrolling background
    background = game.add.tileSprite(0, 0, 800, 600, 'earth');
    background.fixedToCamera = true;

    //  The base of our player
    player = game.add.sprite(0, 0, 'player', 'tank1');
    player.anchor.setTo(0.5, 0.5);
    player.animations.add('move', ['tank1', 'tank2', 'tank3', 'tank4', 'tank5', 'tank6'], 20, true);

    //  This will force it to decelerate and limit its speed
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.drag.set(0.2);
    player.body.maxVelocity.setTo(400, 400);
    player.body.collideWorldBounds = true;


    player.bringToTop();

    game.camera.follow(player);
    game.camera.deadzone = new Phaser.Rectangle(150, 150, 500, 300);
    game.camera.focusOnXY(0, 0);

    cursors = game.input.keyboard.createCursorKeys();

}

function update() {

    if (cursors.left.isDown) {
        player.angle -= 4;
    } else if (cursors.right.isDown) {
        player.angle += 4;
    }

    if (cursors.up.isDown) {
        //  The speed we'll travel at
        currentSpeed = 300;
    } else {
        if (currentSpeed > 0) {
            currentSpeed -= 4;
        }
    }

    if (currentSpeed > 0) {
        game.physics.arcade.velocityFromRotation(player.rotation, currentSpeed, player.body.velocity);
    }

    background.tilePosition.x = -game.camera.x;
    background.tilePosition.y = -game.camera.y;

    //  Position all the parts and align rotations
    shadow.x = player.x;
    shadow.y = player.y;
    shadow.rotation = player.rotation;

    turret.x = player.x;
    turret.y = player.y;
}
