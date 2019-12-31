
export default class MainmenuSceneView{
	constructor(scene){
		this.scene = scene;
		
	}

	init() {
		this.bg = this.scene.add.sprite(0, 0, 'background');
        this.bg.setOrigin(0,0);

        this.title_text = this.scene.add.text(400, 200, 'Treasure Finder', {fontSize: '50px', fill:'#FFFFFF'});
        this.title_text.setOrigin(0.5);

        this.button_start = this.scene.add.sprite(250, 400, 'btn_start').setInteractive();
        this.button_sound = this.scene.add.sprite(550, 400, 'btn_sound').setInteractive();
		
	}

    setEvent(onButtonPlayPressed, onButtonSoundPressed) {
    	this.button_start.on('pointerdown', () => { 
            this.button_start.setScale(0.8);
            this.scene.time.delayedCall(100, function(){
                onButtonPlayPressed();
            }, [], this);
            
        });

        this.button_sound.on('pointerdown', () => { 
            this.scene.time.delayedCall(100, function(){
                onButtonSoundPressed();
            }, [], this);
            
        });
	}

}