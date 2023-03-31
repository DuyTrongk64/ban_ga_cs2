const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property()
    speed = 0;

    onCollisionEnter(other: cc.PhysicsCollider, self: cc.PhysicsCollider){
        //console.log(`Collided with ${other.node.name}!`);
        if(other.node.name == 'chicken'){
            this.node.destroy();
        }
    }

    // onLoad () {}

    start () {

    }

    update(dt) {
        let direction = new cc.Vec3(0, 1, 0);
        let newPosition = this.node.position.add(direction.multiplyScalar(this.speed * dt));
        this.node.setPosition(newPosition);

    }
}
