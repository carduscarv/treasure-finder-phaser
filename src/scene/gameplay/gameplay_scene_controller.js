import Phaser from 'phaser';
import GameplaySceneView from './gameplay_scene_view';
import tile from "../../assets/tilesets/tuxmon-sample-32px-extruded.png";
import treasure from "../../assets/images/treasure.png";
import vjoystick from "../../assets/images/virtualjoystick.png";
import btnArrow from "../../assets/images/btn_arrow.png";
import tileMap from "../../assets/tilemaps/tuxemon-town.json";
import atlasPng from "../../assets/atlas/atlas.png";
import atlasJson from "../../assets/atlas/atlas.json";
import up from "../../assets/images/Up.png";
import down from "../../assets/images/Down.png";
import left from "../../assets/images/Left.png";
import right from "../../assets/images/Right.png";


export default class GameplaySceneController extends Phaser.Scene {
  constructor(){
        super({ key: 'GameplayScene' });    
    }

  preload() {
    this.load.image("tiles", tile);
    this.load.tilemapTiledJSON("map", tileMap);
    this.load.atlas("atlas", atlasPng, atlasJson);
    this.load.image('treasure', treasure);
    this.load.image('up', up);
    this.load.image('down', down);
    this.load.image('left', left);
    this.load.image('right', right);
    this.load.spritesheet('vj', vjoystick,{frameWidth:96,frameHeight:96});
    this.load.spritesheet('btn_arrow', btnArrow,{frameWidth:72,frameHeight:72});

  }

  create() {
    this.view = new GameplaySceneView(this);    
    this.view.create();
  }

  update(time, delta) {
    this.view.update(time, delta);
  }
}