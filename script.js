
function goSearch() {
  window.location.href = "search.html";
}
function goHome() {
  window.location.href = "index.html";
}
function search() {
  const keyword = document.getElementById("searchInput").value;
  if (keyword.trim() !== "") {
    window.location.href = "results.html";
  }
}
