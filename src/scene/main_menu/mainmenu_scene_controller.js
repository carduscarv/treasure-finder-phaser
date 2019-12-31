import MainmenuSceneView from './mainmenu_scene_view';
import btnStart from '../../assets/images/6.png';
import btnSound from '../../assets/images/7.png';
import btnSoundOff from '../../assets/images/8.png';
import bg from '../../assets/images/background.jpg';

export default class MainmenuSceneController extends Phaser.Scene {
    constructor() {
        super('MainmenuScene');
    }

    preload () {
        this.load.image('background', bg);
        this.load.image('btn_start', btnStart);
        this.load.image('btn_sound', btnSound);
        this.load.audio('mainmenu_sound','/src/assets/audio/mainmenu.mp3');
    }
    
    create () {

        this.mainmenu_sound = this.sound.add('mainmenu_sound', {
            volume: 1,
            loop: true
        });

        this.isActive = true;
        this.mainmenu_sound.play();

        this.view = new MainmenuSceneView(this);    
        this.view.init();

        // this.sound = AudioController.getInstance(this);
        // this.sound.mainmenuSoundPlay();
                
        this.view.setEvent(() => {
            console.log('button play is pressed');
            this.goToGameplay();
        }, () => {
            console.log('button sound is pressed');
            if(this.isActive){
                this.isActive = false;
            }else{
                this.isActive = true;
            }
            this.setSound(this.isActive);
        });
        
    }    

    goToGameplay() {
        // this.sound.mainmenuSoundStop();
        this.scene.start('GameplayScene');
        this.mainmenu_sound.stop();      
    }

    setSound(active){
        if(active){
            this.mainmenu_sound.play();
        }else{
            this.mainmenu_sound.stop();
        }
    }
}