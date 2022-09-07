const mousePreview = document.querySelector('.mouse-preview'); 

class MouseCoordsPreview {

    constructor() {
        document.querySelector('canvas').addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            mousePreview.textContent = `x: ${clientX - document.querySelector('.settings').clientWidth}, y: ${clientY}`;

            mousePreview.style.marginLeft = clientX + 5 + "px";
            mousePreview.style.marginTop = clientY + 5 + "px";
        });
    }

}

export {
    MouseCoordsPreview
}