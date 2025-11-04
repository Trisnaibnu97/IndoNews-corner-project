// api/news.js

// API Key Anda yang TERSEMBUNYI
const NEWS_API_KEY = 'b42c036d5c88427e8efda293efccd1e4'; 

module.exports = async (req, res) => {
  // Ambil query category dari frontend (e.g., /api/news?category=business)
  const { category } = req.query; 

  if (!category) {
    return res.status(400).send({ error: 'Parameter category dibutuhkan.' });
  }

  // Tentukan query dan endpoint yang Anda inginkan
  const query = category === 'general' ? 'indonesia news' : `${category} indonesia`;
  
  // Endpoint NewsAPI yang Anda gunakan sebelumnya
  const apiUrl = `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&language=en&pageSize=12&apiKey=${NEWS_API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Pastikan server proxy mengembalikan status yang benar
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy Error:', error);
    res.status(500).send({ error: 'Gagal mengambil data dari NewsAPI melalui proxy.' });
  }
};