// import { VirtualJoystick } from "../../VirtualJoystick";
import { PhaserUIComponent } from "../../components/PhaserUIComponent";

let cursors;
let player;
let showDebug = false;

export default class GameplaySceneView{
	constructor(scene){
		this.scene = scene;		
	}

	init(){

	}

  create(){
    const map = this.scene.make.tilemap({ key: "map" });

    const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");

    const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
    const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
    const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

    this.treasure = this.scene.add.sprite(800, 400, 'treasure');
    this.treasure.setScale(0.3);

    this.fake_treasure = this.scene.add.sprite(120, 1100, 'treasure');
    this.fake_treasure.setScale(0.3);

    worldLayer.setCollisionByProperty({ collides: true });

    aboveLayer.setDepth(10);

    const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");

    player = this.scene.physics.add
      .sprite(spawnPoint.x, spawnPoint.y, "atlas", "misa-front")
      .setSize(30, 40)
      .setOffset(0, 24);

    this.scene.physics.add.collider(player, worldLayer);

    const joystickConfig = {
      type: 'Joystick',
      spritesheetTexture: 'vj',
      controlled: this.fake_treasure
    };

    const joystick = PhaserUIComponent.create.VirtualControl(this.scene, 90, 1132, joystickConfig);
    // joystick.setScrollFactor(0)

    const arowConfig = {
    };
    const dpadConfig = {
      type: 'DPAD',
      spritesheetTexture: 'btn_arrow',
      arrowConfig: arowConfig,
      width: 72,
      height: 72,
      controlled: this.fake_treasure
    };
    const dpad = PhaserUIComponent.create.VirtualControl(this.scene, 650, 1232, dpadConfig);
    dpad.setScrollFactor(0);
    
    this.up = this.scene.add.sprite(200, 450, 'up').setInteractive();
    this.up.setOrigin(0.5);
    this.up.setDepth(15);
    this.up.setScrollFactor(0);
    this._isUp;

    this.down = this.scene.add.sprite(200, 550, 'down').setInteractive();
    this.down.setOrigin(0.5);
    this.down.setDepth(15);
    this.down.setScrollFactor(0);
    this._isDown;

    this.left = this.scene.add.sprite(150, 500, 'left').setInteractive();
    this.left.setOrigin(0.5);
    this.left.setDepth(15);
    this.left.setScrollFactor(0);
    this._isLeft;

    this.right = this.scene.add.sprite(250, 500, 'right').setInteractive();
    this.right.setOrigin(0.5);
    this.right.setDepth(15);
    this.right.setScrollFactor(0);
    this._isRight;

    // anims
    const anims = this.scene.anims;
    anims.create({
      key: "misa-left-walk",
      frames: anims.generateFrameNames("atlas", {
        prefix: "misa-left-walk.",
        start: 0,
        end: 3,
        zeroPad: 3
      }),
      frameRate: 10,
      repeat: -1
    });
    anims.create({
      key: "misa-right-walk",
      frames: anims.generateFrameNames("atlas", {
        prefix: "misa-right-walk.",
        start: 0,
        end: 3,
        zeroPad: 3
      }),
      frameRate: 10,
      repeat: -1
    });
    anims.create({
      key: "misa-front-walk",
      frames: anims.generateFrameNames("atlas", {
        prefix: "misa-front-walk.",
        start: 0,
        end: 3,
        zeroPad: 3
      }),
      frameRate: 10,
      repeat: -1
    });
    anims.create({
      key: "misa-back-walk",
      frames: anims.generateFrameNames("atlas", {
        prefix: "misa-back-walk.",
        start: 0,
        end: 3,
        zeroPad: 3
      }),
      frameRate: 10,
      repeat: -1
    });

    const camera = this.scene.cameras.main;
    camera.startFollow(player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    cursors = this.scene.input.keyboard.createCursorKeys();
    }

  update(time, delta){
    const speed = 175;
    const prevVelocity = player.body.velocity.clone();

    // Stop any previous movement from the last frame
    player.body.setVelocity(0);

    this.up.on('pointerdown', () => {
      this._isUp = true;
    });

    this.up.on('pointerup', () => {
      this._isUp = false;
    });

    this.down.on('pointerdown', () => { 
        this._isDown = true;
    });

    this.down.on('pointerup', () => { 
        this._isDown = false;
    });

    this.left.on('pointerdown', () => { 
        this._isLeft = true;
    });

    this.left.on('pointerup', () => { 
        this._isLeft = false;
    });

    this.right.on('pointerdown', () => { 
        this._isRight = true;
    });

    this.right.on('pointerup', () => { 
        this._isRight = false;
    });

    if (this._isLeft) {
      player.body.setVelocityX(-speed);
    } else if (this._isRight) {
      player.body.setVelocityX(speed);
    }

    // Vertical movement
    if (this._isUp) {
      player.body.setVelocityY(-speed);
    } else if (this._isDown) {
      player.body.setVelocityY(speed);
    }

    // Normalize and scale the velocity so that player can't move faster along a diagonal
    player.body.velocity.normalize().scale(speed);

    if (this._isLeft) {
      player.anims.play("misa-left-walk", true);
    } else if (this._isRight) {
      player.anims.play("misa-right-walk", true);
    } else if (this._isUp) {
      player.anims.play("misa-back-walk", true);
    } else if (this._isDown) {
      player.anims.play("misa-front-walk", true);
    } else {
      player.anims.stop();

      // If we were moving, pick and idle frame to use
      if (prevVelocity.x < 0) player.setTexture("atlas", "misa-left");
      else if (prevVelocity.x > 0) player.setTexture("atlas", "misa-right");
      else if (prevVelocity.y < 0) player.setTexture("atlas", "misa-back");
      else if (prevVelocity.y > 0) player.setTexture("atlas", "misa-front");
    }

    if(Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), this.treasure.getBounds())){
      this.scene.scene.start('ResultScene');
      console.log('hit!');
      this.treasure.setAlpha(0);
    }
  }
}