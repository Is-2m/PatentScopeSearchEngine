// domUtils.js
function showLoading(show) {
  document.getElementById("loading").style.display = show ? "block" : "none";
}

function showError(message) {
  const errorDiv = document.getElementById("error");
  errorDiv.textContent = message;
  errorDiv.style.display = "block";
}

function hideError() {
  document.getElementById("error").style.display = "none";
}

function clearResults() {
  document.getElementById("results").innerHTML = "";
  document.getElementById("pagination").innerHTML = "";
  document.getElementById("stats").innerHTML = "";
}

function toggleAdvancedFilters() {
  const filters = document.getElementById("advancedFilters");
  const toggle = document.querySelector(".toggle-filters");
  filters.classList.toggle("show");
  toggle.textContent = filters.classList.contains("show")
    ? "Hide Advanced Filters ▲"
    : "Show Advanced Filters ▼";
}
