document.getElementById('searchBtn').addEventListener('click', async () => {
  const query = document.getElementById('searchInput').value;
  const response = await fetch(`/.netlify/functions/searchCoupang?query=${encodeURIComponent(query)}`);
  const data = await response.json();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  if (data.length === 0) {
    resultsDiv.innerHTML = '<p>결과가 없습니다.</p>';
    return;
  }

  data.forEach(item => {
    const div = document.createElement('div');
    div.innerHTML = `<a href="${item.link}" target="_blank">${item.title}</a> - ${item.price}원`;
    resultsDiv.appendChild(div);
  });
});
