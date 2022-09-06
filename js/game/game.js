import { Entity } from './entity.js';
import { Setting, displaySettings, settingsWrapper } from './settings.js';

const entitiesList = document.querySelector('.entities');
const saveSettingsButton = document.querySelector('.save');
const saveProjectButton = document.querySelector('.tojson');
const playGameButton = document.querySelector('.play');
const stopGameButton = document.querySelector('.stop');

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

        stopGameButton.addEventListener('click', () => {
            this._gameIsRunning = false;
        })

        saveSettingsButton.addEventListener('click', () => {
            settingsWrapper.querySelectorAll('input').forEach(input => {
                const key = input.dataset.key;
                this._entities[this._currentlyEditedEntity][key].value = input.value;
            });
            
            this.displayEntities();
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

        this._entities.push(
            new Entity("Test Setting 1"),
            new Entity("Test Setting 2"),
        )
        this.displayEntities();

        window.addEventListener('resize', () => {
            this._canvas.width = window.innerWidth / 2;
            this._canvas.height = window.innerHeight;
            this._context.fillStyle = "#000";
            this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
            this.updateCanvasAfterSave();
        });

        this._canvas.width = window.innerWidth / 2;
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
        console.log("test")
        if (this._gameIsRunning) {
            setTimeout(this.play.bind(this), 200);
        }
    }

    updateCanvasAfterSave() {
        this._context.fillStyle = "#000";
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
        
        for (const entity of this._entities) {
            if (entity._image.value === null || entity._image.value === "") {
                this._context.fillStyle = entity._colour.value;
                console.log(entity._colour.value);
                this._context.fillRect(
                    entity._startingX.value,
                    entity._startingY.value,
                    entity._width.value,
                    entity._height.value
                );
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