export default async function handler(request, response) {
  // Получаем URL из запроса
  const targetUrl = request.query.url;
  
  // Проверяем, что URL передан
  if (!targetUrl) {
    return response.status(400).json({ error: 'URL parameter is required' });
  }
  
  try {
    // Скачиваем страницу
    const fetchResponse = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'ru-RU,ru;q=0.9,en;q=0.8',
      }
    });
    
    // Получаем HTML
    const html = await fetchResponse.text();
    
    // Устанавливаем заголовки (разрешаем iframe)
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.setHeader('X-Frame-Options', 'ALLOWALL');
    response.setHeader('Content-Security-Policy', "frame-ancestors 'self' *");
    
    // Отдаем HTML
    return response.status(200).send(html);
    
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
