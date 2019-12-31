import Phaser from "phaser";
import MainmenuScene from './scene/main_menu/mainmenu_scene_controller';
import GameplayScene from './scene/gameplay/gameplay_scene_controller';
import ResultScene from './scene/result/result_scene_controller';


const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  pixelArt: true,
  dom: {
        createContainer: true
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: [MainmenuScene, GameplayScene, ResultScene]
};

const game = new Phaser.Game(config);

