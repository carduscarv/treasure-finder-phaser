import { PhaserUIComponent } from "../../components/PhaserUIComponent";

let text_name;
export default class ResultSceneView{
	constructor(scene){
		this.scene = scene;	
	}

	init(){
		this.bg = this.scene.add.sprite(0, 0, 'background');
        this.bg.setOrigin(0,0);

        this.title_text = this.scene.add.text(400, 100, 'Game Clear', {fontSize: '50px', fill:'#FFFFFF'});
        this.title_text.setOrigin(0.5);
        this.text_name = this.scene.add.text(400, 200, 'Please enter your name', {fontSize: '55px', fill:'#FFFFFF'});
        this.text_name.setOrigin(0.5);
        // this.element = this.scene.add.dom(400, 400).createFromCache('nameform');

        // this.element.addListener('click');

        const tfConfig = {
            id: 'name',
            placeholder: 'Input Name',
        };

        this.textField = PhaserUIComponent.create.TextField(this.scene, 400, 400, tfConfig, {fontSize: 30});
        // this.element.on('click', function (event) {

        //     if (event.target.name === 'playButton')
        //     {
        //         let inputText = this.getChildByName('nameField');

        //         if (inputText.value !== '')
        //         {
        //             this.removeListener('click');
        //             this.setVisible(false);
        //             text_name.setText('Nice Game ' + inputText.value + '!');
        //             this.scene.tweens.add({
        //                 targets: text_name,
        //                 y: 300,
        //                 scale: 1.2,
        //                 duration: 3000,
        //                 ease: 'Power3'
        //             });
        //             this.scene.newStart();
        //         }
        //         else
        //         {
        //             text_name.setText('Please fill the input field!');
        //         }
        //     }

        // });
	}

    update(time, delta){
        if (this.textField.onFocus()) {
            this.scene.input.keyboard.disableGlobalCapture();
        }
        const enterKey = this.scene.input.keyboard.addKey('ENTER');

        if (Phaser.Input.Keyboard.JustDown(enterKey) && this.textField.onFocus()) {
            console.log('enter!');
            if (this.textField.getValue().length > 0) {
                console.log(this.textField.getValue());

                this.text_name.setText('Nice Game ' + this.textField.getValue() + '!');
                this.textField.resetValue();
                this.scene.tweens.add({
                    targets: this.text_name,
                    y: 300,
                    scale: 1.2,
                    duration: 3000,
                    ease: 'Power3'
                });
                
                this.scene.newStart();
            }else{
                console.log('enter name');
            }
        }
    }
}