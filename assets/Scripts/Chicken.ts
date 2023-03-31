// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    speed = 0;

    onLoad () {
        //set collider
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        manager.enabledDrawBoundingBox = true; 
    }

    start () {

    }

    //set collision with ullet
    onCollisionEnter(other: cc.PhysicsCollider, self: cc.PhysicsCollider){
        //console.log(`Collided with ${other.node.name}!`);
        if(other.node.name == 'pl_bullet'){
            this.node.destroy();
        }
    }

    update (dt) {
        // let direction = new cc.Vec3(0, -1, 0);
        // let newPosition = this.node.position.add(direction.multiplyScalar(this.speed * dt));
        // this.node.setPosition(newPosition);
    }
}
