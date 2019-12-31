export class VirtualJoystick extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, {texture, container, controlled}) {
        super(scene, x, y, container);
        scene.add.existing(this);

        this._touchStart = false;
        this._threshold = 45;
        this._startPos = { x: x, y: y };
        this._controller = scene.add.sprite(x, y, texture);
        this._controlled = controlled;
        this._controlSpeed = 125;
        this._currPointer = null;
        this._direction = {x: 0, y: 0};
        this._deltaPos = {x: 0, y: 0};

        this.setInteractiveControl();
    }

    /**
     * @param {number} value Set speed of object to control, will be div by 50 if not physics based
     */
    set controlSpeed(value){
        this._controlSpeed = value;
    }

    /**
     * Set x position
     * @override
     */
    setX(value){
        super.setX(value);
        this._controller.setX(value);
    }

    /**
     * Set y position
     * @override
     */
    setY(value){
        super.setY(value);
        this._controller.setY(value);
    }

    /**
     * Set (x, y | x) position
     * @override
     * @param {number} x 
     * @param {number} y 
     */
    setPosition(x, y = x){
        super.setPosition(x, y);
        if (this._controller){
            this._controller.setPosition(x, y);
        }
    }

    setInteractiveControl(){
        this._controller.setInteractive({useHandCursor: true, draggable: true});

        this.scene.input.on('dragstart', (pointer) => {
            this._touchStart = true;
            this._currPointer = pointer;
        })
        .on('drag', (pointer) => {
            this._currPointer = pointer;
        })
        .on('dragend', () => {
            this._touchStart = false;
            this._controller.setPosition(this._startPos.x, this._startPos.y);
        });
    }

    simulateObjectToControl(){
        this._controlled.x += this._direction.x * (this._controlSpeed / 50);
        this._controlled.y += this._direction.y * (this._controlSpeed / 50);
    }

    update(){
        if (this._touchStart){
            this._deltaPos = {
                x: this._currPointer.x - this._startPos.x,
                y: this._currPointer.y - this._startPos.y
            };
            this._direction = {x: this._deltaPos.x, y: this._deltaPos.y};

            const magnitude = Phaser.Geom.Point.GetMagnitude(this._deltaPos);
            Phaser.Geom.Point.SetMagnitude(this._direction, 1); // Normalized

            if (magnitude > this._threshold){
                Phaser.Geom.Point.SetMagnitude(this._deltaPos, this._threshold);
            }

            this._deltaPos.x += this._startPos.x;
            this._deltaPos.y += this._startPos.y;

            this._controller.setPosition(this._deltaPos.x, this._deltaPos.y);

            this.simulateObjectToControl();
        }
    }
}