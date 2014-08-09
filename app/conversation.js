Conversation = (function() {
    var Conversation = function(game, message, cbYes, cbNo) {
        this.game = game;
        this.message = message;

        this.callbackYes = cbYes;

        this.callbackNo = cbNo;

        // Create group
        this.group = game.add.group();
        this.group.fixedToCamera = true
        // background for group


    };

    Conversation.prototype.show_message = function() {
        this.text = this.game.add.text(20, 20, this.message, {
            font: "16px Arial",
            fill: "#ff0044",
            align: "center"
        });

        this.group.add(this.text);
        buttonsPositionY = this.text.height + this.text.position.x;
        if (this.callbackYes !== undefined) {
            this.buttonYes = new LabelButton(this.game.camera.screenView.centerX - 100, buttonsPositionY, 'button', "YES", this.callbackYes, this, 2, 1, 0);
            this.group.add(this.buttonYes);
        }
        if (this.callbackNo !== undefined) {
            this.buttonNo = new LabelButton(this.game.camera.screenView.centerX + 100, buttonsPositionY, 'button', "NO", this.callbackYes, this, 2, 1, 0);
            this.group.add(this.buttonNo);
        }

    };
    return Conversation;
})()
