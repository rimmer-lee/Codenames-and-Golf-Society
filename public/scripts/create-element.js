function createElement(options) {
    const newElement = document.createElement(options.type || 'div');
    options.classList && newElement.classList.add( ...options.classList );
    if (options.attributes) for (const attribute of options.attributes) newElement.setAttribute(attribute.id, attribute.value);
    if (options.innerText) newElement.innerText = options.innerText;
    if (options.addEventListener) for (const eventListener of options.addEventListener) newElement.addEventListener(eventListener.type || 'click', eventListener.listener, eventListener.options)
    if (options.children) for (const child of options.children) newElement.appendChild(createElement(child));
    return newElement;
};