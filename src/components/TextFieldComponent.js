/**
 * @author Ahmad Arsyel
 * @description TextField event component for UI.
 * @abstract
 */
export class TextFieldComponent extends Phaser.GameObjects.Sprite {
    /**
     * An abstract class TextFieldComponent of event component.
     * @param scene Phaser scene that will be reference.
     * @param x Gameobject position in axis-x.
     * @param y Gameobject position in axis-y.
     * @param texture Key texture to make this base text field rendered.
     * @param name Object name or type.
     */
    constructor(scene, x, y, texture, name) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.setName(name);
    }
    /**
     * @override
     */
    setPosition(x, y, z, w) {
        super.setPosition(x, y, z, w);
        if (this.textFieldDOM) {
            this.textFieldDOM.setPosition(x, y, z, w);
        }
        return this;
    }
    /**
     * @override
     */
    setX(value) {
        super.setX(value);
        if (this.textFieldDOM) {
            this.textFieldDOM.x = value;
        }
        return this;
    }
    /**
     * @override
     */
    setY(value) {
        super.setY(value);
        if (this.textFieldDOM) {
            this.textFieldDOM.y = value;
        }
        return this;
    }
    /**
     * @override
     */
    destroy() {
        this.textFieldDOM.destroy();
        super.destroy();
    }
    /**
     * @override
     */
    setVisible(value) {
        super.setVisible(value);
        this.textFieldDOM.setVisible(value);
        return this;
    }
}
