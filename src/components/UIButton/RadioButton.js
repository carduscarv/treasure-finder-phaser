import { ButtonComponent } from "../ButtonComponent";
/**
 * @author Ahmad Arsyel
 * @description ButtonComponent HoldButton for interactable UI.
 */
export class RadioButton extends ButtonComponent {
    constructor(scene, x, y, isActive, texture, responseTexture) {
        super(scene, x, y, texture, 'RadioButton');
        this.isToggleActive = false;
        this.isToggleActive = isActive;
        this.interactiveEvent();
        if (isActive) {
            this.textures = {
                ON: texture,
                OFF: responseTexture
            };
        }
        else {
            this.textures = {
                ON: responseTexture,
                OFF: texture
            };
        }
        return this;
    }
    /**
     *
     */
    toggleAction() {
        this.isToggleActive = !this.isToggleActive;
        const texture = this.isToggleActive ? this.textures.ON : this.textures.OFF;
        this.setTexture(texture);
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
            .on('pointerout', () => {
            if (this.pressed) {
                this.onClick();
            }
            else {
                this.pressed = false;
            }
        });
    }
    /**
     * @override
     */
    onClick() {
        this.toggleAction();
        this.callback(this.isToggleActive, this.argument);
        this.pressed = false;
    }
}
