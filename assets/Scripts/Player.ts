const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    speed = 0;
    
    private goLeft: boolean;
    private goRight: boolean;
    private goUp: boolean;
    private goDown: boolean;

    private screenSize: cc.Size = cc.view.getFrameSize();

    onKeyDown(event) {
        // set a flag when key pressed
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.goLeft = true;
                break;
            case cc.macro.KEY.d:
                this.goRight = true;
                break;
            case cc.macro.KEY.w:
                this.goUp = true;
                break;
            case cc.macro.KEY.s:
                this.goDown = true;
                break;
        }
    }

    onKeyUp(event) {
        // unset a flag when key released
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.goLeft = false;
                break;
            case cc.macro.KEY.d:
                this.goRight = false;
                break;
            case cc.macro.KEY.w:
                this.goUp = false;
                break;
            case cc.macro.KEY.s:
                this.goDown = false;
                break;
        }
    }

    collidingWithEdge(){
        let worldRect = this.node.getBoundingBoxToWorld();
        let screenSize = cc.view.getVisibleSize();
        let curPos = this.node.getPosition();

        if (worldRect.xMin < 0){
            this.goLeft = false;
        }

        if (worldRect.xMax > screenSize.width){
            this.goRight = false;
        }

        if (worldRect.yMin < 0){
            this.goDown = false;
        }

        if (worldRect.yMax > screenSize.height){
            this.goUp = false;
        }
    }

    //move player
    moveAround(dt){
        let direction = new cc.Vec3(0, 0, 0);
        this.collidingWithEdge();
        if (this.goLeft) {
            direction.x -= 1;
        } 
        if (this.goRight) {
            direction.x += 1;
        }
        if (this.goUp) {
            direction.y += 1;
        }
        if (this.goDown) {
            direction.y -= 1;
        }
        if (direction.magSqr() > 0) {
            direction.normalize();
            let newPosition = this.node.position.add(direction.multiplyScalar(this.speed * dt));
            this.node.setPosition(newPosition);
        }
    }

    
    //set collision with aggs 
    onCollisionEnter(other: cc.PhysicsCollider, self: cc.PhysicsCollider){
        // if(other.node.name == 'ground'){
            
        // }
    }

    onLoad(){
    }
    
    start() {

        this.goLeft = false;
        this.goRight = false;
        this.goUp = false;
        this.goDown = false;

        //this.phys.gravity = cc.v2(0, -20);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp, this);
    }

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    update(dt) {
        this.moveAround(dt);
    }
}
