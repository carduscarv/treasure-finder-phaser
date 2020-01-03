import { ButtonComponent } from "../ButtonComponent";
/**
 * @author Ahmad Arsyel
 * @description ButtonComponent FlatButton for interactable UI.
 */
export class FlatButton extends ButtonComponent {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture, 'FlatButton');
        this.interactiveEvent();
        return this;
    }
    /**
     * @override
     */
    interactiveEvent() {
        this.setInteractive({ useHandCursor: true })
            .on('pointerdown', () => { this.pressed = true; })
            .on('pointerup', () => {
            if (this.pressed) {
                this.onClick();
            }
        })
            .on('pointerout', () => { this.pressed = false; });
    }
    /**
     * @override
     */
    onClick() {
        this.scene.tweens.add({
            targets: [this],
            scale: 0.9,
            ease: 'Expo.easeOut',
            duration: 50,
            yoyo: true,
            onComplete: () => {
                if (this.isAnyCallback()) {
                    this.callback(this.argument);
                }
                this.setScale(1);
            }
        });
    }
}
