// app.js
let currentSearchResults = [];

async function searchPatents(page = 1) {
  try {
    showLoading(true);
    clearResults();
    hideError();

    const query = buildQuery(page);
    const data = await searchPatentsApi(query);

    currentSearchResults = data.patents || [];
    displayResults(data);
    updateStats(data.total_patent_count);
    updatePagination(
      page,
      Math.ceil(data.total_patent_count / RESULTS_PER_PAGE)
    );
  } catch (error) {
    showError(`An error occurred while searching patents: ${error.message}`);
    console.error("Search error:", error);
  } finally {
    showLoading(false);
  }
}

function exportResults() {
  if (!currentSearchResults.length) {
    showError("No results to export");
    return;
  }

  downloadCSV(
    currentSearchResults,
    `patent_results_${getCurrentDateString()}.csv`
  );
}

// Initialize the application when the DOM is ready
document.addEventListener("DOMContentLoaded", () => initializeSearch());

// Expose functions needed by HTML
// window.searchPatents = searchPatents;
// window.exportResults = exportResults;
// window.toggleAdvancedFilters = toggleAdvancedFilters;
// window.toggleSection = toggleSection;
