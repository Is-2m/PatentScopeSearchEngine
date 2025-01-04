class SearchView {
    static initialize() {
        this.addEventListeners();
    }

    static addEventListeners() {
        document.querySelectorAll('input').forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    App.searchPatents(1);
                }
            });
        });

        document.querySelector('.toggle-filters')
            .addEventListener('click', DOMUtils.toggleAdvancedFilters);
    }
}