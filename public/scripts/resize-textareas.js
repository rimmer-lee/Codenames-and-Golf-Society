// https://stackoverflow.com/questions/7477/how-to-autosize-a-textarea-using-prototype

function onInput() {
    this.setAttribute('style', 'height:auto');
    this.setAttribute('style', `height:${this.scrollHeight}px`);
};

function updateTextAreas(addEventListener = false) {
    const textAreas = document.getElementsByTagName('textarea');
    for (const textArea of textAreas) {
        textArea.setAttribute('style', 'height:auto');
        textArea.setAttribute('style', `height:${textArea.scrollHeight}px;`);
        if (addEventListener) textArea.addEventListener('input', onInput, false);
    };
};

updateTextAreas(true);

window.addEventListener('resize', updateTextAreas);