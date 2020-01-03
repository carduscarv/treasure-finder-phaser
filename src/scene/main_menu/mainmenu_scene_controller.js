import MainmenuSceneView from './mainmenu_scene_view';
import btnStart from '../../assets/images/6.png';
import btnUI from '../../assets/images/btn_ui.png';
import btnSound from '../../assets/images/btn_ui_flat.png';
import btnSoundOff from '../../assets/images/btn_ui_flat_on.png';
import bg from '../../assets/images/background.jpg';
import { PhaserUIComponent } from "../../components/PhaserUIComponent";

export default class MainmenuSceneController extends Phaser.Scene {
    constructor() {
        super('MainmenuScene');
    }

    preload () {
        this.load.image('background', bg);
        this.load.image('btn_start', btnStart);
        this.load.image('btn_sound', btnSound);
        this.load.image('btn_sound_off', btnSoundOff);
        this.load.audio('mainmenu_sound','/src/assets/audio/mainmenu.mp3');
        this.load.spritesheet('btn_ui', btnUI,{frameWidth:276,frameHeight:72});

    }
    
    create () {
        this.view = new MainmenuSceneView(this);    
        this.view.init();
    }    
}