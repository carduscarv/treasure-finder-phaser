import { ButtonComponent } from "../ButtonComponent";
/**
 * @author Ahmad Arsyel
 * @description ButtonComponent HoldButton for interactable UI.
 */
export class HoldButton extends ButtonComponent {
    constructor(scene, x, y, texture, allowCallbackOnUp = false) {
        super(scene, x, y, texture, 'HoldButton');
        this.tap = false;
        this.interactiveEvent();
        this.allowCallbackOnUp = allowCallbackOnUp;
        return this;
    }
    onTap() {
        if (!this.tap) {
            this.tap = true;
            this.setAlpha(0.8);
        }
    }
    onUp() {
        if (this.tap) {
            this.tap = false;
            this.setAlpha(1);
            if (this.allowCallbackOnUp) {
                this.callback(this.argument);
            }
        }
    }
    /**
     * @override
     */
    interactiveEvent() {
        this.setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
            this.pressed = true;
            this.onTap();
        })
            .on('pointerup', () => {
            this.pressed = false;
            this.onUp();
        })
            .on('pointerout', () => {
            this.pressed = false;
            this.onUp();
        });
    }
    /**
     * @override
     */
    onClick() {
        this.callback(this.argument);
    }
    /**
     * @override
     */
    preUpdate(time, delta) {
        if (!this.deactive && this.pressed) {
            this.onClick();
        }
    }
}
