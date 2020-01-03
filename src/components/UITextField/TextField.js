import { TextFieldComponent } from "../TextFieldComponent";
/**
 * @author Ahmad Arsyel
 * @description TextFieldComponent TextField for interactable UI.
 */
export class TextField extends TextFieldComponent {
    constructor(scene, x, y, config) {
        super(scene, x, y, config.texture, 'TextField');
        this.initializeElement(x, y, config);
        this.id = config.id;
        this.registerBlur();
        return this;
    }
    /**
     * Register blur in input when the mouse up.
     * @param id Set blur input on this id.
     */
    registerBlur() {
        this.scene.input
            .on('pointerdown', () => {
            this.inputElement.blur();
        })
            .on('pointerup', () => {
            this.inputElement.blur();
        });
    }
    /**
     * @override
     */
    initializeElement(x, y, config) {
        config = Object.assign({
            texture: '',
            placeholder: '',
            inputWidth: '10'
        }, config);
        this.inputElement = document.createElement('input');
        this.inputElement.setAttribute('id', config.id);
        this.inputElement.setAttribute('size', config.inputWidth);
        this.inputElement.setAttribute('placeholder', config.placeholder);
        this.textFieldDOM = this.scene.add
            .dom(x, y, this.inputElement)
            .setOrigin(0.5);
    }
    /**
     * @override
     */
    setStyle(style) {
        style = Object.assign({
            padding: 6,
            bgColor: 'white',
            textAlign: 'left',
            textColor: 'black',
            height: '',
        }, style);
        this.textFieldDOM.setX(this.textFieldDOM.x - style.padding);
        const styleElement = document.createElement('style');
        styleElement.setAttribute('type', 'text/css');
        styleElement.innerHTML = `
			#${this.id} {
				padding: ${style.padding}px;
				box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.33);
				border: 1px solid #000;
				border-radius: 6px;
				text-align: ${style.textAlign};
				color: ${style.textColor};
				line-height: ${style.height}px;
				font-size: ${style.fontSize}px;
				background-color: ${style.bgColor};
			}`;
        document.getElementsByTagName('head')[0].appendChild(styleElement);
        return this;
    }
    /**
     * @override
     */
    resetValue() {
        this.inputElement.value = "";
        return this;
    }
    /**
     * @override
     */
    getValue() {
        return this.inputElement.value ? this.inputElement.value : "";
    }
    /**
     * @override
     */
    onFocus() {
        return document.activeElement === this.inputElement;
    }
}
