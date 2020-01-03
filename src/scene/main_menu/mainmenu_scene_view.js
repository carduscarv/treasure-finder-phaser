import { PhaserUIComponent } from "../../components/PhaserUIComponent";

export default class MainmenuSceneView{
	constructor(scene){
		this.scene = scene;
		
	}

	init() {
		this.bg = this.scene.add.sprite(0, 0, 'background');
        this.bg.setOrigin(0,0);

        this.mainmenu_sound = this.scene.sound.add('mainmenu_sound', {
            volume: 1,
            loop: true
        });

        this.mainmenu_sound.play();

        this.title_text = this.scene.add.text(400, 200, 'Treasure Finder', {fontSize: '50px', fill:'#FFFFFF'});
        this.title_text.setOrigin(0.5);

        const btnConfig = {
            type: 'Button',
            spritesheetTexture: 'btn_ui',
            callback: () => this.scene.scene.start('GameplayScene')
        };
        const button = PhaserUIComponent.create.Button(this.scene, 250, 400, btnConfig);

        const btn_play_text = this.scene.add.text(button.x, button.y, 'Play', {fontSize: '40px', fill:'#FFFFFF'});
        btn_play_text.setOrigin(0.5);

        const radioButton = PhaserUIComponent.create.Button(this.scene, 550, 400, {
            type: 'Radio',
            texture: 'btn_sound',
            onToggleTexture: 'btn_sound_off',
            isToggleActive: false,
            callback: (isOn) => {
                if(isOn){
                    this.mainmenu_sound.stop()
                    btn_sound_text.setText('Sound: Off')
                }else{
                    this.mainmenu_sound.play()
                    btn_sound_text.setText('Sound: On')
                }
            }
        });

        const btn_sound_text = this.scene.add.text(radioButton.x, radioButton.y, 'Sound: On', {fontSize: '30px', fill:'#FFFFFF'});
        btn_sound_text.setOrigin(0.5);
		
	}

}