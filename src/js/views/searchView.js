// searchView.js
function initializeSearch() {
  addSearchEventListeners();
}

function addSearchEventListeners() {
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        searchPatents(1);
      }
    });
  });

  // document
  //   .querySelector(".toggle-filters")
  //   .addEventListener("click", toggleAdvancedFilters);
}
