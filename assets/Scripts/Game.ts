const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    bulletPrefab: cc.Prefab= null;

    @property(cc.Prefab)
    chickenPrefab: cc.Prefab= null;

    @property(cc.Prefab)
    eggsPrefab: cc.Prefab= null;

    @property(cc.Node)
    player: cc.Node= null;

    onMouseUp(event: MouseEvent){
        this.spawPl_bulet();
    }
    
    spawPl_bulet(){
        if(!this.bulletPrefab){
            return null;
        }

        let block: cc.Node|null = null;

        block = cc.instantiate(this.bulletPrefab);

        this.node.addChild(block);

        console.log(this.player.getPosition());
        block.setPosition(this.player.getPosition());

    }

    start(){
        this.node.on(cc.Node.EventType.MOUSE_UP, this.onMouseUp, this);
    }
    update(dt) {
    }
}
