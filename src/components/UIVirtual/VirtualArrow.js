import { VirtualControlComponent } from "../VirtualControlComponent";
import { HoldButton } from "../UIButton/HoldButton";
/**
 * @author Ahmad Arsyel
 * @description VirtualControlComponent VirtualArrow for interactable UI.
 */
export class VirtualArrow extends VirtualControlComponent {
    constructor(scene, x, y, spritesheetTexture, width, height, arrowConfig) {
        super(scene, x, y, null, 'VirtualArrow');
        this.isPhysics = false;
        this.setVisible(false);
        this.textures = spritesheetTexture;
        this.dimension = new Phaser.Structs.Size(width, height);
        this.buttons = new Map();
        this.controlSpeed = 200;
        arrowConfig = Object.assign({
            down: true,
            left: true,
            up: true,
            right: true
        }, arrowConfig);
        this.initButton(arrowConfig);
        return this;
    }
    /**
     * Initialize 4 or less direction HoldButton for `DPAD` or `Arrow` controller.
     * * DOWN
     * * LEFT
     * * UP
     * * RIGHT
     * @param {PhaserUIComponent.Virtual.Control.ArrowConfig} config Setup the available direction button.
     */
    initButton(config) {
        if (config.down) {
            const downBtn = new HoldButton(this.scene, this.x, this.y, this.textures, true)
                .setFrame(3);
            this.buttons.set('DOWN', downBtn);
        }
        if (config.left) {
            const leftBtn = new HoldButton(this.scene, this.x - this.dimension.width, this.y, this.textures, true)
                .setFrame(0);
            this.buttons.set('LEFT', leftBtn);
        }
        if (config.up) {
            const upBtn = new HoldButton(this.scene, this.x, this.y - this.dimension.height, this.textures, true)
                .setFrame(1);
            this.buttons.set('UP', upBtn);
        }
        if (config.right) {
            const rightBtn = new HoldButton(this.scene, this.x + this.dimension.width, this.y, this.textures, true)
                .setFrame(2);
            this.buttons.set('RIGHT', rightBtn);
        }
        this.interactiveControl();
    }
    /**
     * Object to simulate control movement with VirtualArrow.
     * @param button Selected HoldButton type for picking callback.
     * @param key Key for direction of arrow button.
     */
    simulateObjectToControl(button, key) {
        const delta = 0.015;
        button.setCallback(() => {
            if (this.controlled) {
                switch (key) {
                    case 'DOWN':
                        if (this.isPhysics) {
                            this.controlled.body.setVelocityY(this.controlSpeed);
                        }
                        else {
                            this.controlled.y += this.controlSpeed * delta;
                        }
                        break;
                    case 'LEFT':
                        if (this.isPhysics) {
                            this.controlled.body.setVelocityX(-this.controlSpeed);
                        }
                        else {
                            this.controlled.x -= this.controlSpeed * delta;
                        }
                        break;
                    case 'UP':
                        if (this.isPhysics) {
                            this.controlled.body.setVelocityY(-this.controlSpeed);
                        }
                        else {
                            this.controlled.y -= this.controlSpeed * delta;
                        }
                        break;
                    case 'RIGHT':
                        if (this.isPhysics) {
                            this.controlled.body.setVelocityX(this.controlSpeed);
                        }
                        else {
                            this.controlled.x += this.controlSpeed * delta;
                        }
                        break;
                }
                this.stopControlSimulate(button);
            }
        });
    }
    /**
     * Stop `controlled` object physics movement.
     * @param {HoldButton} button Specific button that on up.
     */
    stopControlSimulate(button) {
        if (!button.isPressed && this.isPhysics) {
            this.controlled.body.setVelocity(0);
        }
    }
    /**
     * @override
     */
    interactiveControl() {
        this.buttons.forEach((btn, key) => {
            this.simulateObjectToControl(btn, key);
        });
    }
    /**
     * @override
     */
    enableControl(active = true) {
        for (const button of this.buttons) {
            const value = button[1];
            if (active) {
                value.setInteractive();
            }
            else {
                value.disableInteractive();
            }
        }
        return this;
    }
    /**
     * @override
     */
    setControlled(controlledObject, isPhysics) {
        this.isPhysics = isPhysics;
        this.controlled = controlledObject;
        return this;
    }
    /**
     * @override
     */
    setOriginalPos(x, y) {
        this.setPosition(x, y);
        if (this.buttons) {
            this.buttons.forEach((btn, key) => {
                switch (key) {
                    case 'DOWN':
                        btn.setPosition(x, y);
                        break;
                    case 'LEFT':
                        btn.setPosition(x, y)
                            .setX(this.x - this.dimension.width);
                        break;
                    case 'UP':
                        btn.setPosition(x, y)
                            .setY(this.y - this.dimension.height);
                        break;
                    case 'RIGHT':
                        btn.setPosition(x, y)
                            .setX(this.x + this.dimension.width);
                        break;
                }
            });
        }
        return super.setOriginalPos(x, y);
    }
    /**
     * Override all callback function on button to this assigning callback.
     * @param {Function} callback Function that override main callback.
     * @param {any} argument Any argument that given. Has two default argument `arrowKey` and `controlled`.
     * @return This VirtualArrow object.
     */
    setCallback(callback, argument) {
        this.buttons.forEach((btn, key) => {
            const data = Object.assign({
                arrowKey: key,
                controlled: this.controlled
            }, argument);
            btn.setCallback(callback, data);
        });
        return this;
    }
}
