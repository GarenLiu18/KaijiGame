class Align{

    static GetCenterX(){
        var result = game.config.width / 2;
        return result;
    }

    static GetCenterY(){
        var result = game.config.height / 2;
        return result;
    }

    static CenterDown(obj){
        obj.x = this.game.renderer.width / 2;
        obj.y = this.game.renderer.height / 2;
    }
}