class SceneTitle extends Phaser.Scene{
    constructor(){
        super("SceneTitle");
    }
    

    create(){
        var emitter;
        emitter = new Phaser.Events.EventEmitter();
        emitter.on("startGame", this.startGame, this);

        let btnStart = this.add.image(
            this.game.renderer.width / 2,
            this.game.renderer.height / 2,
            "buttonStart"
        ).setDepth(1).setScale(0.15);
        btnStart.setInteractive();

        //滑鼠經過
        /*
        btnStart.on("pointerover", ()=>{
            console.log("DAMN")
        })
        */
        btnStart.on("pointerdown", ()=>{
            this.startGame();
        })
    }

    startGame() {
        //console.log("Start");
        this.scene.start("SceneMain");
    }
}