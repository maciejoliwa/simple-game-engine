import { Setting } from './settings.js';

class Entity {

    _name;
    _startingX;
    _startingY;
    _x;
    _y;
    _width;
    _height;
    _image;

    constructor(name) {
        this._name = new Setting("text", "Name", name, "_name");
        this._startingX = new Setting("number", "Starting X", 0, "_startingX");
        this._startingY = new Setting("number", "Starting Y", 0, "_startingY");
        this._x = 0;
        this._y = 0;
        this._width = new Setting("number", "Width", 32, "_width");
        this._height = new Setting("number", "Height", 32, "_height");
        this._image = new Setting("file", "Image", null, "_image");
        this._visible = new Setting("radio", "Is Visible", true, "_visible");
        this._colour = new Setting("color", "Colour", "#f00", "_colour");
    }

}

export {
    Entity,
};