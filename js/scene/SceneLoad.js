class SceneLoad extends Phaser.Scene {
    constructor() {
        super("SceneLoad");
    }

    preload() {
        this.bar = new Bar({
            scene: this,
            x: game.config.width / 2,
            y: game.config.height / 2,
        });
        this.progText = this.add.text(
            game.config.width / 2,
            game.config.height / 2,
            "0%",
            { color: "#ffffff", fontSize: game.config.width / 20 }
        );
        this.progText.setOrigin(0.5, 0.5);
        this.load.on("progress", this.onProgress, this);

        this.load.image('alpha0', 'Assets/alphaZero.png');

        this.load.image('chKaiji', 'Assets/Kaiji.jpg');
        this.load.image('chYukio', 'Assets/Yukio.png');

        this.load.image('cCitizen', 'Assets/Card_Citizen.jpg');
        this.load.image('cEmperor', 'Assets/Card_Emperor.jpg');
        this.load.image('cSlave', 'Assets/Card_Slave.jpg');
        this.load.image('cBack', 'Assets/CardBack.jpg');
        this.load.image('buttonStart', 'Assets/Start-Button-Vector-PNG.png')

        this.load.image('Win_1', 'Assets/Win1.gif');
        this.load.image('Win_2', 'Assets/Win2.gif');
        this.load.image('Win_3', 'Assets/Win3.gif');
        this.load.image('Lose_1', 'Assets/Lose1.gif');
        this.load.image('Lose_2', 'Assets/Lose2.gif');
        this.load.image('Lose_3', 'Assets/Lose3.gif');
        this.load.image('Final_1', 'Assets/Final1.gif');
        this.load.image('Final_2', 'Assets/Final2.gif');
    }

    create() {
        //this.add.image(0,0, 'cCitizen');
        this.scene.start("SceneTitle");
    }

    onProgress(value) {
        this.bar.setPercentX(value);
        var per = Math.floor(value * 100);
        var outPer = per + "%";
        this.progText.setText(outPer);
    }
}