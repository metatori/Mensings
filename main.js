
function searchProduct() {
    const keyword = document.getElementById("searchInput").value;
    console.log("검색 버튼이 눌렸습니다. 검색어:", keyword);
    document.getElementById("result").innerText = "검색어: " + keyword + " (API 연동은 아직 테스트 중)";
}
