
async function searchProduct() {
  const keyword = document.getElementById("searchInput").value;
  document.getElementById("result").innerText = "검색 중...";

  try {
    const response = await fetch(`/.netlify/functions/searchCoupang?query=${encodeURIComponent(keyword)}`);
    const data = await response.json();

    if (!data || !data.length) {
      document.getElementById("result").innerText = "검색 결과 없음.";
      return;
    }

    const resultBox = document.getElementById("result");
    resultBox.innerHTML = "";
    data.forEach(item => {
      const html = `
        <div class="item">
          <img src="${item.image}" width="100"><br>
          <strong>${item.title}</strong><br>
          가격: ${item.price}원<br>
          <a href="${item.link}" target="_blank">상품 보기</a>
        </div>`;
      resultBox.innerHTML += html;
    });

  } catch (error) {
    console.error("API 호출 실패:", error);
    document.getElementById("result").innerText = "API 호출 실패";
  }
}
