// dateFormatter.js
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString();
}

function getCurrentDateString() {
  return new Date().toISOString().split("T")[0];
}