/**
 * @author Ahmad Arsyel
 * @description VirtualControl event component for UI.
 * @abstract
 */
export class VirtualControlComponent extends Phaser.GameObjects.Sprite {
    /**
     * An abstract class VirtualControlComponent of event component.
     * @param {Phaser.Scene} scene Phaser scene that will be reference.
     * @param {number} x Gameobject position in axis-x.
     * @param {number} y Gameobject position in axis-y.
     * @param {string} texture Key texture to make this base Virtual Control rendered.
     * @param {string} name Object name or type.
     */
    constructor(scene, x, y, texture, name) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.setName(name);
        this.setOriginalPos(x, y);
    }
    /**
     * Set position of Virtual Control component.
     * @param x Set x-axis Virtual Control original position.
     * @param y Set y-axis Virtual Control original position.
     * @return This Virtual Control instance.
     */
    setOriginalPos(x, y) {
        this.originalPos = new Phaser.Geom.Point(x, y);
        return this;
    }
    /**
     * Set the speed of controlled object.
     * @param value The value of relative speed to object.
     * @return This Virtual Control instance.
     */
    setControlSpeed(value) {
        this.controlSpeed = value;
        return this;
    }
}
