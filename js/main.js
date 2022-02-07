var game;

window.onload = function(){
    var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: "Phaser_game",
        scene: [SceneLoad, SceneTitle, SceneMain],
    }

    game = new Phaser.Game(config);
}