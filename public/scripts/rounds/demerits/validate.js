function updateCloseButtons(modal) {
    const bsModal = bootstrap.Modal.getInstance(modal);
    if (!bsModal) return;
    for (const ruleSelect of modal.querySelectorAll('select[id*="-rule-"]')) {
        if (!validation.call(ruleSelect)) return bsModal._isShown = false;
    };
    bsModal._isShown = true;
};