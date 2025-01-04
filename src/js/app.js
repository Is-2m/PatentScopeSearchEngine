class App {
    static currentSearchResults = [];

    static async initialize() {
        SearchView.initialize();
    }

    static async searchPatents(page = 1) {
        try {
            DOMUtils.showLoading(true);
            DOMUtils.clearResults();
            DOMUtils.hideError();

            const query = QueryBuilder.build(page);
            const data = await PatentAPI.searchPatents(query);
            
            this.currentSearchResults = data.patents || [];
            ResultsView.displayResults(data);
            ResultsView.updateStats(data.total_patent_count);
            PaginationView.update(
                page,
                Math.ceil(data.total_patent_count / PatentAPI.RESULTS_PER_PAGE)
            );
        } catch (error) {
            DOMUtils.showError(`An error occurred while searching patents: ${error.message}`);
            console.error('Search error:', error);
        } finally {
            DOMUtils.showLoading(false);
        }
    }

    static exportResults() {
        if (!this.currentSearchResults.length) {
            DOMUtils.showError('No results to export');
            return;
        }

        ExportService.downloadCSV(
            this.currentSearchResults,
            `patent_results_${DateFormatter.getCurrentDateString()}.csv`
        );
    }
}

// Initialize the application when the DOM is ready
document.addEventListener('DOMContentLoaded', () => App.initialize());