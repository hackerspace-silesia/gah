function initialize() {
    var map_element = document.getElementById('map');
    map_element.style.width = window.outerWidth;
    map_element.style.height = window.outerHeight;

    var map_canvas = map_element;
    var map_options = {
        center: new google.maps.LatLng(31.5869047, 64.3101938),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.HYBRID
    };

    var map = new google.maps.Map(map_canvas, map_options);
}

google.maps.event.addDomListener(window, 'load', initialize);

$('#start').click(function() {
    $('#splash').remove();

    StartGame();
});


function StartGame() {
    var map;
    var layer;
    var player;
    var currentSpeed = 0;
    var cursors;
    var game_bounds = {
        'width': window.innerWidth,
        'height': window.innerHeight
    }

    var game = new Phaser.Game(game_bounds.width, game_bounds.height, Phaser.AUTO, 'phaser-example', {
        preload: preload,
        create: create,
        update: update
    });

    function preload() {
        game.load.tilemap('gah_map', 'assets/maps/enter-city.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('Desert', 'assets/maps/tmw_desert_spacing.png');
        game.load.image('Road', 'assets/maps/roads.png');
        game.load.spritesheet('player', 'assets/images/car.png', 100, 50);
        game.load.spritesheet('button', 'assets/images/button_sprite_sheet.png', 193, 71);
    }

    function create() {

        //  Resize our game world to be a 2000 x 2000 square
        game.world.setBounds(-1000, -1000, 2000, 2000);
        map = game.add.tilemap('gah_map');
        map.addTilesetImage('Desert', 'Desert');
        map.addTilesetImage('Roads', 'Road');

        layer = map.createLayer('Ground');
        layer.resizeWorld();

        cursors = game.input.keyboard.createCursorKeys();
        player = new Player(game, cursors);

        //  This will force it to decelerate and limit its speed
        game.camera.follow(player.sprite);
        game.camera.deadzone = new Phaser.Rectangle(150, 150, 500, 300);
        game.camera.focusOnXY(0, 0);
        conv = new Conversation(game, "moj tekst", function() {}, function() {});
        conv.show_message();
    }

    function update() {
        player.move()
    }
}
