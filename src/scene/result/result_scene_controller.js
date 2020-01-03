import ResultSceneView from './result_scene_view';

export default class ResultSceneController extends Phaser.Scene {
    constructor() {
        super('ResultScene');
    }

    preload(){
        this.load.html('nameform', 'src/dom/nameform.html');
    }
    
    create() {

        this.view = new ResultSceneView(this);    
        this.view.init();

        // this.newStart();
    }

    update(time, delta){
        this.view.update(time, delta);
    }

    // Game over function
    newStart() {
      // restart the game
      this.time.delayedCall(3000, function(){
        this.scene.start('MainmenuScene');
      }, [], this);
    }
}