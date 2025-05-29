
async function searchProduct() {
  const keyword = document.getElementById("searchInput").value;
  document.getElementById("result").innerText = "검색 중...";

  try {
    const response = await fetch(`https://api-gateway.coupang.com/v2/providers/affiliate_open_api/apis/openapi/v1/products/search?keyword=${encodeURIComponent(keyword)}&limit=3`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": getAuthorizationHeader(),
        "X-Coupang-Partner": "affiliate"
      }
    });

    const data = await response.json();
    if (!data || !data.data || !data.data.productData) {
      document.getElementById("result").innerText = "검색 결과 없음.";
      return;
    }

    const resultBox = document.getElementById("result");
    resultBox.innerHTML = "";
    data.data.productData.forEach(item => {
      const html = `
        <div class="item">
          <img src="${item.productImage}" width="100"><br>
          <strong>${item.productName}</strong><br>
          가격: ${item.productPrice}원<br>
          <a href="${item.productUrl}" target="_blank">상품 보기</a>
        </div>`;
      resultBox.innerHTML += html;
    });

  } catch (error) {
    console.error("API 호출 실패:", error);
    document.getElementById("result").innerText = "API 호출 실패";
  }
}

function getAuthorizationHeader() {
  const accessKey = import.meta.env.VITE_COUPANG_ACCESS_KEY || '';
  const secretKey = import.meta.env.VITE_COUPANG_SECRET_KEY || '';
  return `CEA ${accessKey}:${secretKey}`;
}
