Player = (function() {
    function Player(game, cursors) {
        //  The base of our player
        this.game = game;
        this.sprite = this.game.add.sprite(0, 0, 'sprite', 'tank1');
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.animations.add('move', ['tank1', 'tank2', 'tank3', 'tank4', 'tank5', 'tank6'], 20, true);

        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.drag.set(0.2);
        this.sprite.body.maxVelocity.setTo(400, 400);
        this.sprite.body.collideWorldBounds = true;

        this.sprite.bringToTop();

        this.cursors = cursors;
        this.currentSpeed = 0;
    };

    Player.prototype.move = function() {
        if (this.cursors.left.isDown) {
            this.sprite.angle -= 4;
        } else if (this.cursors.right.isDown) {
            this.sprite.angle += 4;
        }

        if (this.cursors.up.isDown) {
            //  The speed we'll travel at
            this.currentSpeed = 200;
        } else {
            if (this.currentSpeed > 0) {
                this.currentSpeed -= 2;
            }
        }

        if (this.currentSpeed > 0) {
            this.game.physics.arcade.velocityFromRotation(this.sprite.rotation, this.currentSpeed, this.sprite.body.velocity);
        } else if (this.currentSpeed == 0) {
            this.game.physics.arcade.velocityFromRotation(this.sprite.rotation, 0, this.sprite.body.velocity);
        }

    };
    return Player;
})();
