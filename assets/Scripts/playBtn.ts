const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    onLoad () {
        cc.director.preloadScene('round1');
        this.node.on('touchstart',function(){
            cc.director.loadScene('round1');
        });
    }

    start () {

    }

    //update (dt) {}
}
