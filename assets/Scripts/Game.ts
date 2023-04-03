const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    bulletPrefab: cc.Prefab= null;

    @property(cc.Prefab)
    chickenPrefab: cc.Prefab= null;

    @property(cc.Prefab)
    eggsPrefab: cc.Prefab= null;

    @property(cc.Prefab)
    heartPrefab: cc.Prefab= null;

    @property(cc.Node)
    player: cc.Node= null;

    @property(cc.Label)
    score: cc.Label = null;

    @property(cc.AudioClip)
    chicken_hit: cc.AudioClip = null;

    @property(cc.AudioClip)
    playerFire: cc.AudioClip = null;

    @property
    spawnTimerMax: number = 0;

    private spawnTimer: number =0;

    private playerScore =0;

    private chicken: Array<cc.Node> = [];
    private heart: Array<cc.Node> = [];

    private time: number =0;

    private count: number =0;
    //gain 5 score per chicken dead
    gainScore(){
        cc.NodePool
        this.playerScore += 5;
        this.score.string = this.playerScore.toString();
        cc.audioEngine.playEffect(this.chicken_hit,false);
    }

    onMouseDown(event: MouseEvent){
        cc.audioEngine.playEffect(this.playerFire,false);
        this.spawPl_bulet();
    }
    
    spawHeart(pos: cc.Vec3){
        if(!this.heartPrefab){
            return null;
        }

        let block: cc.Node|null = null;

        block = cc.instantiate(this.heartPrefab);

        this.node.addChild(block);

        block.setPosition(pos);

        return block;
    }

    drawHeart(){
        let pos = new cc.Vec3(-450,280,0);
        for(let i=0;i<3;i++){
            pos.x+=35*i;
            this.heart.push(this.spawHeart(pos));
            pos = new cc.Vec3(-450,280,0);
        }
    }
    //spaw bullet at player position
    spawPl_bulet(){
        if(!this.bulletPrefab){
            return null;
        }

        let block: cc.Node|null = null;

        block = cc.instantiate(this.bulletPrefab);

        this.node.addChild(block);

        //console.log(this.player.getPosition());
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

        return block;
    }

    drawChicken(){
        //spaw chicken
        let pos = new cc.Vec3(-150,250,0);
        for(let i=0;i<3;i++){
            for(let j=0;j<5;j++){
                pos.x+=75*j;
                pos.y-=75*i
                this.chicken.push(this.spawChicken(pos));
                pos = new cc.Vec3(-150,250,0);
            }
        }
    }

    spawEggs(pos: cc.Vec3){
        if(!this.eggsPrefab){
            return null;
        }

        let block: cc.Node|null = null;

        block = cc.instantiate(this.eggsPrefab);

        this.node.addChild(block);

        block.setPosition(pos);
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

    randSpawEggs(){
        this.spawnTimer += 0.1;
        if(this.spawnTimer > this.spawnTimerMax){
            this.count++;
            
            let rand = this.getRandomInt(this.chicken.length);
            //console.log(this.chicken[rand].isValid);
            if(this.chicken[rand].isValid){
                let ckPos = this.chicken[rand].getPosition();
                let pos = new cc.Vec3(ckPos.x,ckPos.y,0);
                this.spawEggs(pos);
                this.spawnTimer =0;
            }
        }
    }

    gameOver(){
        this.player.stopAllActions();
        cc.director.loadScene('menu');
    }

    checkHp(){
        let hp = this.player.getComponent('Player').hp;
        if(hp==2){
            this.heart[2].destroy();
        }
        if(hp==1){
            this.heart[1].destroy();
        }
        if(hp==0){
            this.heart[0].destroy();
            this.gameOver();
            return;
        }

    }
    onLoad(){
        this.drawChicken();
        this.drawHeart();

        cc.director.preloadScene('menu');
    }

    
    start(){
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        console.log(this.player.getComponent('Player').hp);
    }

    update(dt) {
        //spaw eggs
        this.randSpawEggs();
        this.checkHp()
    }
}
