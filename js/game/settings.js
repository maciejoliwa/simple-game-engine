const settingsWrapper = document.querySelector('.inputs');

class Setting {

    key = null;
    type = null;
    name = "setting";
    value = null;

    constructor(settingType, name, defaultValue, key) {
        this.type = settingType;
        this.name = name;
        this.key = key;
        this.value = defaultValue;
    }

}

function displaySettings(entity) {
    settingsWrapper.innerHTML = null;
    const keys = Object.keys(entity);

    for(const key of keys) {
        if(entity[key] instanceof Setting) {
            const settingInputElementWrapper = document.createElement('div');
            const template = `
            <label class="text-white text-xl">${entity[key].name}</label><br>
            <input data-key='${entity[key].key}' class="border-2 mt-1 border-gray-300 px-2 py-1 text-gray-700"  value="${entity[key].value}" type=${entity[key].type}>
            `;
            settingInputElementWrapper.innerHTML = template;
            settingInputElementWrapper.className = "mt-4"

            if (entity[key].type === "checkbox") {
                settingInputElementWrapper.querySelector('input').checked = entity[key].value;
            }

            settingsWrapper.appendChild(settingInputElementWrapper);
        }
    }
}

export {
    displaySettings,
    Setting,
    settingsWrapper
}