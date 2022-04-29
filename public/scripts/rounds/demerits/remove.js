function removeDemerit() {
    const modal = this.closest('.modal');
    const [ , player, hole ] = modal.id.split('|');
    const parentRow = this.closest('.modal-body > .row');
    this.closest('.border').remove();
    updateDemeritButtons(player, hole, parentRow.children.length > 1);
    updateReferences();
    updateCloseButtons(modal);
};