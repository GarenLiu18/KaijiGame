class CardAI {
    static SimpleAIDrawKeyCard() {
        var randomValue = Phaser.Math.Between(1, 10);
        if (playerSite == 'Kaiji') {
            //一開始出王的機率：10%
            if (gameTurn == 1) {
                if (randomValue == 1) {
                    return true;
                }
                else {
                    return false;
                }
            }
            //每Draw一次出王的機率提高30%
            if (gameTurn == 2) {
                if (randomValue <= 4) {
                    return true;
                }
                else {
                    return false;
                }
            }
            if (gameTurn == 3) {
                if (randomValue <= 7) {
                    return true;
                }
                else {
                    return false;
                }
            }
            //剩下兩張牌時出王的機率是50%
            if (gameTurn == 4) {
                if (randomValue <= 5) {
                    return true
                }
                else {
                    return false;
                }
            }

            if (gameTurn == 5) {
                return true;
            }
        }

        else if (playerSite == 'Yukio') {

        }
    }

    static PopupEmoji(scene, status) {
        var randomValue = Phaser.Math.Between(1, 3);
        var emojiImage;
        switch (status) {
            case 'Win':
                if (randomValue == 1)
                    emojiImage = scene.add.image(400, 300, 'Win_1');
                else if (randomValue == 2)
                    emojiImage = scene.add.image(400, 300, 'Win_2');
                else
                    emojiImage = scene.add.image(400, 300, 'Win_3');

                emojiImage.alpha = 0;
                break;

            default:
                break;
        }
        scene.tweens.add({
            targets: emojiImage,
            duration: 2000,
            alpha: 1
        });

        /*
                scene.time.addEvent({
                    delay: 2000,// ms
                    callback: () => {
                        scene.tweens.add({
                            targets: emojiImage,
                            duration: 2000,
                            alpha: 0
                        });
                        scene.time.addEvent({
                            delay: 2000,// ms
                            callback: () => {
                                //emojiImage.destoy();
                            },
                        });
                    },
                });
                */
    }
}