Player = (function() {
    var bodies = 0;

    function Player(game, cursors) {
        //  The base of our player
        this.game = game;
        this.cursors = cursors;
        this.sprite = this.game.add.sprite(500, 980, 'player');
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.angle += 90;

        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.drag.set(0.2);
        this.sprite.body.maxVelocity.setTo(400, 400);
        this.sprite.body.collideWorldBounds = true;

        this.sprite.bringToTop();

        this.currentSpeed = 0;
        this.acceptedTiles = [26, 27, 33, 34, 35, 36, 37, 42, 44, 45]
    };

    Player.prototype.move = function() {
        var game = this.game;

        function collisionHandler(sprite, body) {
            bodies += 1;
            game.dead[game.dead.indexOf(body)].kill();
            game.dead.splice(game.dead.indexOf(body));
        }

        function theEnd() {
            alert("You finished simulation!");
            window.location.reload();
        }

        var tile = this.map.getTileWorldXY(this.sprite.x, this.sprite.y);
        if (this.acceptedTiles.indexOf(tile.index) === -1) {

            alert("Booom! You are dead! Don't drift away from road." + tile.index);
            window.location.reload();
        }
        if (bodies == 2) {
            this.game.physics.arcade.collide(this.sprite, game.hospital, theEnd);

        } else {

            for (var i = 0; i < this.game.dead.length; i++) {
                this.game.physics.arcade.collide(this.sprite, this.game.dead[i], collisionHandler);
            }
        }
        if (this.cursors.left.isDown) {
            this.sprite.angle -= 4;
        } else if (this.cursors.right.isDown) {
            this.sprite.angle += 4;
        }

        if (this.cursors.up.isDown) {
            //  The speed we'll travel at
            if (this.currentSpeed < 150) {
                this.currentSpeed += 10;
            }
        } else if (this.cursors.down.isDown) {
            if (this.currentSpeed > 0) {
                this.currentSpeed -= 5;
            }
            if (this.currentSpeed < 5) {
                this.currentSpeed = 0
            }
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
