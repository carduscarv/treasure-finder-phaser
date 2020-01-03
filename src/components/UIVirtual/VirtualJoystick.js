import { VirtualControlComponent } from "../VirtualControlComponent";
/**
 * @author Ahmad Arsyel
 * @description VirtualControlComponent VirtualJoystick for interactable UI.
 */
export class VirtualJoystick extends VirtualControlComponent {
    constructor(scene, x, y, config) {
        super(scene, x, y, config.container, "VirtualJoystick");
        this.touchStart = false;
        this.threshold = 45;
        this.selected = false;
        this.controller = scene.add.sprite(x, y, config.texture);
        this.controlled = config.controlled;
        this.isPhysics = config.isPhysics || false;
        this.controlSpeed = 200;
        this.touchConfig = {
            useHandCursor: true,
            draggable: true
        };
        this.interactiveControl();
        return this;
    }
    /**
     * Object to simulate control movement with VirtualJoystick.
     * @param {number} delta Delta time value is get from preUpdate.
     */
    simulateObjectToControl(delta) {
        if (this.controlled) {
            if (this.isPhysics) {
                this.controlled.body.setVelocityX(this.direction.x * this.controlSpeed);
                this.controlled.body.setVelocityY(this.direction.y * this.controlSpeed);
            }
            else {
                const dt = delta / 1000;
                this.controlled.x += this.direction.x * (this.controlSpeed * dt);
                this.controlled.y += this.direction.y * (this.controlSpeed * dt);
            }
        }
    }
    /**
     * Stop controlled object physics movement.
     */
    stopControlSimulate() {
        if (this.controlled && this.isPhysics) {
            this.controlled.body.setVelocity(0);
        }
    }
    /**
     * @override
     */
    interactiveControl() {
        this.controller.setInteractive(this.touchConfig)
            .on('pointerdown', () => { this.selected = true; })
            .on('pointerout', () => { this.selected = false; });
        this.scene.input.on('dragstart', (pointer) => {
            this.touchStart = true;
            this.currentPointer = new Phaser.Geom.Point(pointer.x, pointer.y);
        })
            .on('drag', (pointer) => {
            if (this.selected) {
                this.currentPointer = new Phaser.Geom.Point(pointer.x, pointer.y);
            }
        })
            .on('dragend', () => {
            this.touchStart = false;
            this.stopControlSimulate();
            this.controller.setPosition(this.originalPos.x, this.originalPos.y);
        });
    }
    /**
     * @override
     */
    preUpdate(time, delta) {
        if (this.touchStart && this.selected) {
            let deltaPos = {
                x: this.currentPointer.x - this.originalPos.x,
                y: this.currentPointer.y - this.originalPos.y
            };
            this.direction = new Phaser.Geom.Point(deltaPos.x, deltaPos.y);
            Phaser.Geom.Point.SetMagnitude(this.direction, 1); // Normalized
            const magnitude = Phaser.Geom.Point.GetMagnitude(deltaPos);
            if (magnitude > this.threshold) {
                Phaser.Geom.Point.SetMagnitude(deltaPos, this.threshold);
            }
            deltaPos = {
                x: deltaPos.x + this.originalPos.x,
                y: deltaPos.y + this.originalPos.y
            };
            this.controller.setPosition(deltaPos.x, deltaPos.y);
            this.simulateObjectToControl(delta);
        }
    }
    /**
     * @override
     */
    enableControl(active = true) {
        if (active) {
            this.controller.setInteractive();
        }
        else {
            this.controller.disableInteractive();
        }
        return this;
    }
    /**
     * @override
     */
    setControlled(controlledObject, isPhysics = false) {
        this.isPhysics = isPhysics;
        this.controlled = controlledObject;
        return this;
    }
    /**
     * @override
     */
    setOriginalPos(x, y) {
        this.setPosition(x, y);
        if (this.controller) {
            this.controller.setPosition(x, y);
        }
        return super.setOriginalPos(x, y);
    }
    /**
     * Set the sprite from spritesheet- zero for controller, one for base -in Virtual Joystick.
     * @param {string} key Key texture for Virtual Joystick.
     * @return This Virtual Joystick instance.
     */
    setSpritesheetTexture(key) {
        super.setTexture(key);
        if (this.texture.frameTotal > 2) {
            this.setFrame(1);
            this.controller.setTexture(key, 0);
            this.scene.input.setHitArea(this.controller, this.touchConfig);
        }
        return this;
    }
}
