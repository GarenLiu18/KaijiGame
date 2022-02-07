let choosingTitle;
let nameKaiji;
let nameYukio;

let chKaijiImage;
let chYukioImage;

let coverBG;

let playerSite;
let playerCardStatus = 4;
let gameTurn = 1;

var handCard = [];
var enemyCard = [];
var enemyHandCard = [];
var arr = [0, 1, 2, 3, 4];

let playerChoosingNo;
let enemyChoosingNo = -1;

class SceneMain extends Phaser.Scene {
    constructor() {
        super("SceneMain");
    }

    create() {
        choosingTitle = this.add.text(
            this.game.renderer.width / 2,
            this.game.renderer.height / 2 - 150,
            '選擇你的角色',
            { fontSize: '30px', fill: 'white', align: 'left' }
        ).setOrigin(0.5);

        chKaijiImage = this.add.image(
            this.game.renderer.width / 2 - 100,
            this.game.renderer.height / 2,
            'chKaiji'
        ).setInteractive();
        chYukioImage = this.add.image(
            this.game.renderer.width / 2 + 100,
            this.game.renderer.height / 2,
            'chYukio'
        ).setInteractive();

        nameKaiji = this.add.text(
            this.game.renderer.width / 2 - 100,
            this.game.renderer.height / 2 + 135,
            '開司くん',
            { fontSize: '30px', fill: 'white', align: 'center' }
        ).setOrigin(0.5);
        nameYukio = this.add.text(
            this.game.renderer.width / 2 + 100,
            this.game.renderer.height / 2 + 135,
            '利根川さま',
            { fontSize: '30px', fill: 'white', align: 'center' }
        ).setOrigin(0.5);


        chKaijiImage.on("pointerover", () => {
            chKaijiImage.setTint(0xff0000);
        })
        chKaijiImage.on("pointerout", () => {
            chKaijiImage.setTint(0xFFFFFF);
        })
        chKaijiImage.on("pointerdown", () => {
            this.startWithKaiji();
            playerSite = 'Kaiji';
        })

        chYukioImage.on("pointerover", () => {
            chYukioImage.setTint(0xff0000);
        })
        chYukioImage.on("pointerout", () => {
            chYukioImage.setTint(0xFFFFFF);
        })
        chYukioImage.on("pointerdown", () => {
            this.startWithYukio();
            playerSite = 'Yukio';
        })


    }


    iniChoosingPage() {
        chKaijiImage.destroy();
        chYukioImage.destroy();
        choosingTitle.destroy()
        nameKaiji.destroy();
        nameYukio.destroy();
    }

    startWithKaiji() {
        this.iniChoosingPage();
        this.drawCard('Kaiji');
    }

    startWithYukio() {
        this.iniChoosingPage();
        this.drawCard('Yukio');
    }

    drawCard(whichCha) {
        coverBG = this.add.image(
            400, 300,
            'alpha0'
        ).setDepth(0).setInteractive();
        let lX = Align.GetCenterX() - 200;
        let rX = Align.GetCenterX() + 100;
        let y = 400;
        let enemyCardOffset = -380; //400out


        for (let index = 0; index < 2; index++) {
            //const element = array[index];
            handCard.push(this.add.image(
                lX,
                Align.GetCenterY() + y,
                'cCitizen'
            ).setInteractive());
            lX += 100;

        }

        if (whichCha == "Kaiji") {
            handCard.push(this.add.image(
                Align.GetCenterX(),
                Align.GetCenterY() + y - 20,
                'cSlave'
            ).setInteractive());
        }
        else if (whichCha == "Yukio") {
            handCard.push(this.add.image(
                Align.GetCenterX(),
                Align.GetCenterY() + y - 20,
                'cEmperor'
            ).setInteractive());
        }

        for (let index = 0; index < 2; index++) {
            handCard.push(this.add.image(
                rX,
                Align.GetCenterY() + y,
                'cCitizen'
            ).setInteractive());
            rX += 100;
        }



        for (let index = 0; index < 5; index++) {
            enemyCard.push(this.add.image(
                Align.GetCenterX(),
                Align.GetCenterY() + enemyCardOffset,
                'cBack'
            ));
        }


        this.CreateOtherSiteHandCard();

        this.SortRotCard(handCard);
        this.FlyHandCardIn(handCard, true);
        this.SortRotCard(enemyCard);
        this.FlyHandCardIn(enemyCard, false);

        //賦予監聽
        for (let index = 0; index < handCard.length; index++) {
            handCard[index].on("pointerover", () => {
                this.ChoosingCard(handCard[index], true);
            })
            handCard[index].on("pointerout", () => {
                this.ChoosingCard(handCard[index], false);
            })
            handCard[index].on("pointerdown", () => {
                this.ReleaseCard(handCard[index], index);
                gameTurn++;
            })
        }




        /*
        handCard.forEach(element => {
            element.on("pointerover", () => {
                this.ChoosingCard(element, true);
            })
            element.on("pointerout", () => {
                this.ChoosingCard(element, false);
            })
        });
        */
    }



    CreateOtherSiteHandCard() {
        for (let index = 0; index < 4; index++) {
            enemyHandCard.push(this.add.image(
                Align.GetCenterX(),
                -100,
                'cCitizen'
            ));
        }
        if (playerSite = 'Kaiji') {
            enemyHandCard.push(this.add.image(
                Align.GetCenterX(),
                -100,
                'cEmperor'
            ));
        }
        else if (playerSite = 'Yukio') {
            enemyHandCard.push(this.add.image(
                Align.GetCenterX(),
                -100,
                'cSlave'
            ));
        }
        console.log(enemyHandCard.length);

    }


    SortRotCard(handcard) {
        let iniRot = -0.3;
        for (let index = 0; index < handcard.length; index++) {
            if (index != 2) {
                handcard[index].rotation += iniRot;
                iniRot += 0.2;
            }
        }
    }

    FlyHandCardIn(handCard, self) {
        if (self) {
            let offsetA = -200;

            for (let index = 0; index < handCard.length; index++) {
                this.tweens.add({
                    targets: handCard[index],
                    x: Align.GetCenterX() + offsetA, y: this.game.renderer.height - 20,
                    duration: 200,
                    ease: 'Power2'
                });
                offsetA += 100;
            }
        }
        else {
            let offsetB = -200;
            for (let index = 4; index >= 0; index--) {
                this.tweens.add({
                    targets: handCard[index],
                    x: Align.GetCenterX() + offsetB, y: 0,
                    duration: 200,
                    ease: 'Power2'
                });
                offsetB += 100;
            }
        }
    }

    ChoosingCard(card, display) {
        if (display) {
            this.tweens.add({
                targets: card,
                x: card.x, y: card.y - 30,
                duration: 200,
                ease: 'Power2'
            });
        }
        else {
            this.tweens.add({
                targets: card,
                x: card.x, y: 580,
                duration: 200,
                ease: 'Power2'
            });

        }
    }

    ReleaseCard(card, index) {
        this.tweens.add({
            targets: card,
            x: Align.GetCenterX, y: card.y - 175,
            duration: 200,
            ease: 'Power2'
        });
        this.tweens.add({
            targets: card,
            duration: 100,
            rotation: 0
        });

        card.removeInteractive();
        playerChoosingNo = index;
        this.OtherSideReleaseCard();
    }

    OtherSideReleaseCard() {
        //need write AI to get cardNo
        //enemyChoosingNo = Phaser.Math.Between(0, 4);
        if (CardAI.SimpleAIDrawKeyCard()) {
            enemyChoosingNo = 4;
        }
        else {
            enemyChoosingNo++;
        }

        /*Random抽取但從陣列中刪除遇到一些問題
        var enemyChoosingNo = Math.floor(Math.random() * arr.length);
        console.log("teki:" + enemyChoosingNo);
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === enemyChoosingNo) {
                arr.splice(i, 1);
            }
        }
        console.log(arr);
        */

        //console.log(enemyChoosingNo);
        this.tweens.add({
            targets: enemyCard[enemyChoosingNo],
            duration: 400,
            alpha: 0
        });

        this.tweens.add({
            targets: enemyHandCard[enemyChoosingNo],
            x: enemyHandCard[enemyChoosingNo].x,
            y: enemyHandCard[enemyChoosingNo].y + 275,
            duration: 200,
            ease: 'Power2'
        });
        this.CompareResult();
    }





    CompareResult() {
        this.Controlller(false);
        this.time.addEvent({
            delay: 1000,// ms
            callback: () => {
                this.Controlller(true);
            },
            //args: [],
            //loop: true
        });
        this.CardRule();
    }

    CardRule() {
        if (playerChoosingNo == 2) {
            if (enemyChoosingNo == 4) {
                if (playerSite == 'Kaiji') {
                    CardAI.PopupEmoji(this, 'Win');
                    console.log("WIN");
                }
                else if (playerSite == 'Yukio') {
                    console.log("LOSE");
                }
            }
            else {
                if (playerSite == 'Kaiji') {
                    console.log("LOSE");
                }
                else if (playerSite == 'Yukio') {
                    console.log("WIN");
                }
            }
        }
        else {
            if (enemyChoosingNo != 4) {
                //continue Game...
                console.log("DRAW");
                this.time.addEvent({
                    delay: 500,// ms
                    callback: () => {
                        this.FadeOutCard(enemyHandCard[enemyChoosingNo]);
                        this.FadeOutCard(handCard[playerChoosingNo]);
                    },
                });
            }
            else {
                if (playerSite == 'Kaiji') {
                    console.log("LOSE");
                }
                else if (playerSite == 'Yukio') {
                    console.log("WIN");
                }
            }
        }
    }

    Controlller(status) {
        if (!status) {
            coverBG.setDepth(2);
        }
        else {
            coverBG.setDepth(-1);
        }
    }

    FadeOutCard(card) {
        this.tweens.add({
            targets: card,
            duration: 400,
            alpha: 0
        });
    }


}