const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    speed = 0;
    // onLoad () {}

    start () {

    }

    update (dt) {
        let direction = new cc.Vec3(0, -1, 0);
        let newPosition = this.node.position.add(direction.multiplyScalar(this.speed * dt));
        this.node.setPosition(newPosition);
    }
}
