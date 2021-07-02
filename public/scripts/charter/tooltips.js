let tooltipElements;

function enableTooltips() {
    tooltipElements = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(tooltipElement => new bootstrap.Tooltip(tooltipElement));
};

function disposeTooltips() {
    if (!tooltipElements) enableTooltips();
    for (const tooltipElement of tooltipElements) tooltipElement.dispose();
    tooltipElements = null;
};