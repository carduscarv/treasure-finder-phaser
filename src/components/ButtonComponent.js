/**
 * @author Ahmad Arsyel
 * @description Button event component for UI.
 * @abstract
 */
export class ButtonComponent extends Phaser.GameObjects.Sprite {
    /**
     * An abstract class ButtonComponent of event component.
     * @param {Phaser.Scene} scene Phaser scene that will be reference.
     * @param {number} x Gameobject position in axis-x.
     * @param {number} y Gameobject position in axis-y.
     * @param {string} texture Key for rendered texture in scene.
     * @param {string} name Object name or type.
     */
    constructor(scene, x, y, texture, name) {
        super(scene, x, y, texture);
        this._isDeactive = false;
        this.pressed = false;
        scene.add.existing(this);
        this.setName(name);
    }
    /**
     * Check if the callback is function.
     * @return Boolean value of callback-function comparison.
     */
    isAnyCallback() {
        return (typeof this.callback === 'function');
    }
    /**
     * Set the callback event for button.
     * @param {Function} callback Event that fire after clicked.
     * @param {any} arg Parameter or argument to be passed.
     * @return This button component instance.
     */
    setCallback(callback, arg) {
        this.callback = (typeof callback !== 'function') ? () => { console.log('Clicked button'); } : callback;
        this.argument = arg;
        return this;
    }
    /**
     * Get event interactive status.
     */
    get deactive() {
        return this._isDeactive;
    }
    /**
     * Set interactive mode to deactive.
     * @param {boolean} value The value of active or deactive event.
     */
    set deactive(value) {
        if (value) {
            this.disableInteractive();
            this._isDeactive = true;
        }
        else if (value !== this._isDeactive) {
            this.interactiveEvent();
            this._isDeactive = false;
        }
    }
    /**
     * Get a status of this pressed button.
     * @return Boolean pressed value.
     */
    get isPressed() {
        return this.pressed;
    }
}
