(function() {

    function toggleButtons() {
        const online = window.navigator.onLine;
        for (const button of document.querySelectorAll('#button-parent .btn')) {
            if (online) button.classList.remove('disabled');
            else button.classList.add('disabled');
        };        
    };

    window.addEventListener('online', toggleButtons);
    window.addEventListener('offline', toggleButtons);
    
    toggleButtons();

})();