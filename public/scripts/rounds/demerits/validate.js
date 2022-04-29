function updateCloseButtons(modal) {
    const bsModal = bootstrap.Modal.getInstance(modal);
    if (!bsModal) return;
    let valid = true;
    for (const ruleSelect of modal.querySelectorAll('select[id*="-rule-"]')) {
        if (!validation.call(ruleSelect)) valid = false;
    };
    bsModal._isShown = valid;
};