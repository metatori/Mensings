const fetch = require('node-fetch');
const crypto = require('crypto');

exports.handler = async function(event) {
  const keyword = event.queryStringParameters.query || '';
  const accessKey = process.env.accessKey;
  const secretKey = process.env.secretKey;
  const apiUrl = `https://api-gateway.coupang.com/v2/providers/affiliate_open_api/apis/openapi/v1/products/search?keyword=${encodeURIComponent(keyword)}&limit=5`;

  const datetime = new Date().toISOString().replace(/[-:]/g, '').split('.')[0];
  const method = 'GET';
  const path = `/v2/providers/affiliate_open_api/apis/openapi/v1/products/search`;

  const message = `${method} ${path}
${datetime}
${accessKey}`;
  const signature = crypto.createHmac('sha256', secretKey).update(message).digest('hex');

  const headers = {
    'Authorization': `CEA algorithm=HmacSHA256, access-key=${accessKey}, signed-date=${datetime}, signature=${signature}`,
    'Content-Type': 'application/json'
  };

  const response = await fetch(apiUrl, { headers });
  const result = await response.json();

  const items = result.productData.map(product => ({
    title: product.productName,
    price: product.productPrice,
    link: product.productUrl
  }));

  return {
    statusCode: 200,
    body: JSON.stringify(items)
  };
};
