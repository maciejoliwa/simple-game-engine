import { Entity } from './entity.js';
import { Setting, displaySettings, settingsWrapper } from './settings.js';

const entitiesList = document.querySelector('.entities');
const saveSettingsButton = document.querySelector('.save');
const saveProjectButton = document.querySelector('.tojson');
const playGameButton = document.querySelector('.play');
const stopGameButton = document.querySelector('.stop');
const addEntityButton = document.querySelector('.add-entity');

class Game {

    _canvas = document.querySelector('canvas');
    _context = this._canvas.getContext('2d');
    _entities = [];
    _currentlyEditedEntity = null;
    _gameIsRunning = false;

    constructor() {
        saveProjectButton.addEventListener('click', this.save.bind(this));
        playGameButton.addEventListener('click', () => {
            this._gameIsRunning = true;
            this.play();
        });

        addEntityButton.addEventListener('click', () => {
            this._entities.push(new Entity(`New Entity ${this._entities.length}`));
            this._currentlyEditedEntity = this._entities.length - 1;
            this.displayEntities();
            displaySettings(this._entities[this._currentlyEditedEntity]);
            entitiesList.value = `New Entity ${this._entities.length}`;
        });

        stopGameButton.addEventListener('click', () => {
            this._gameIsRunning = false;
        });

        saveSettingsButton.addEventListener('click', () => {
            settingsWrapper.querySelectorAll('input').forEach(input => {
                const key = input.dataset.key;
                if (input.type === "file") {
                    if (this._entities[this._currentlyEditedEntity][key].value === null) {
                        const image = new Image();
                        image.src = URL.createObjectURL(input.files[0]);
                        this._entities[this._currentlyEditedEntity][key].value = image;
                    }
                }
                else if (input.type === "checkbox") {
                    this._entities[this._currentlyEditedEntity][key].value = input.checked;
                } else {
                    this._entities[this._currentlyEditedEntity][key].value = input.value;
                }

                console.log(this._entities[this._currentlyEditedEntity][key].value);
            });
            
            this.displayEntities();
            this._entities[this._currentlyEditedEntity]._x = Number.parseInt(this._entities[this._currentlyEditedEntity]._startingX.value);
            this._entities[this._currentlyEditedEntity]._y = Number.parseInt(this._entities[this._currentlyEditedEntity]._startingY.value);
            entitiesList.value = this._entities[this._currentlyEditedEntity]["_name"].value;
            this.updateCanvasAfterSave();
        });

        entitiesList.addEventListener('change', () => {
            const pickedEntity = entitiesList.value;
            
            this._entities.forEach((entity, index) => {
                if (entity._name.value === pickedEntity) {
                    this._currentlyEditedEntity = index;
                    displaySettings(entity);
                }
            });
        });

        this.displayEntities();

        window.addEventListener('resize', () => {
            this._canvas.width = window.innerWidth - document.querySelector('.settings').clientWidth;
            this._canvas.height = window.innerHeight;
            this._context.fillStyle = "#000";
            this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
            this.updateCanvasAfterSave();
        });

        this._canvas.width = window.innerWidth - document.querySelector('.settings').clientWidth;
        this._canvas.height = window.innerHeight;

        this._context.fillStyle = "#000";
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
        this.updateCanvasAfterSave();
    }

    displayEntities() {
        entitiesList.innerHTML = null;

        for (const entity of this._entities) {
            const optionElemenet = document.createElement('option');
            optionElemenet.value = entity._name.value;
            optionElemenet.textContent = entity._name.value;

            entitiesList.appendChild(optionElemenet);
        }
    }

    play() {
        for (const entity of this._entities) {
            if (entity._isPlayer.value === true) {
                window.onkeydown = (event) => {
                    if (event.keyCode === 40) {
                        entity._y += 10;
                    }
                    if (event.keyCode === 38) {
                        entity._y -= 10;
                    }
                    if (event.keyCode === 39) {
                        entity._x += 10;
                    }
                    if (event.keyCode === 37) {
                        entity._x -= 10;
                    }
                }
            }
            this._context.fillStyle = "#000";
            this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
            this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
            if (entity._image.value === null || entity._image.value === "") {
                this._context.fillStyle = entity._colour.value;
                this._context.fillRect(
                    entity._x,
                    entity._y,
                    entity._width.value,
                    entity._height.value
                );
            } else {
                this._context.drawImage(entity._image.value, entity._x, entity._y, entity._width.value, entity._height.value);
            }
        }


        if (this._gameIsRunning) {
            requestAnimationFrame(this.play.bind(this));
        }
    }

    updateCanvasAfterSave() {
        this._context.fillStyle = "#000";
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
        
        for (const entity of this._entities) {
            if (entity._image.value === null || entity._image.value === "") {
                this._context.fillStyle = entity._colour.value;
                this._context.fillRect(
                    entity._x,
                    entity._y,
                    entity._width.value,
                    entity._height.value
                );
            } else {
                this._context.drawImage(entity._image.value, entity._x, entity._y, entity._width.value, entity._height.value);
            }

        }
    }

    static load() {

    }

    save() {
        const stringified = JSON.stringify(this._entities);
        localStorage.setItem("project", stringified);
    }

}

export {
    Game
}