module.exports = async function handler(request, response) {
  const targetUrl = request.query.url;
  
  if (!targetUrl) {
    return response.status(400).json({ error: 'URL parameter is required' });
  }
  
  try {
    const fetchResponse = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept-Language': 'ru-RU,ru;q=0.9,en;q=0.8',
      }
    });
    
    const html = await fetchResponse.text();
    
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.setHeader('X-Frame-Options', 'ALLOWALL');
    response.setHeader('Content-Security-Policy', "frame-ancestors 'self' *");
    
    return response.status(200).send(html);
    
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
};
