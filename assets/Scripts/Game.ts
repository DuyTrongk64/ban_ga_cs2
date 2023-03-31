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

    spawChicken(pos: cc.Vec3){
        if(!this.chickenPrefab){
            return null;
        }

        let block: cc.Node|null = null;

        block = cc.instantiate(this.chickenPrefab);

        this.node.addChild(block);

        block.setPosition(pos);
    }
    onLoad(){
        let pos = new cc.Vec3(-150,250,0);
        let count = 0;
        for(let i=0;i<5;i++){
            for(let j=0;j<5;j++){
                pos.x+=75*j;
                pos.y-=75*i
                this.spawChicken(pos);
                pos = new cc.Vec3(-150,250,0);
            }
        }
    }

    start(){
        this.node.on(cc.Node.EventType.MOUSE_UP, this.onMouseUp, this);
    }
    update(dt) {
    }
}
