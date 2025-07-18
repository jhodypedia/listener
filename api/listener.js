// Simpan data dalam memori (tidak persist)
let transactionList = [];

export default function handler(req, res) {
  const apiKey = req.headers['x-api-key'];
  const validApiKey = '4rc0d3';

  if (apiKey !== validApiKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const { title, message, timestamp, amount } = req.body;

    if (!title || !message || !timestamp || !amount) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    // Simpan ke array
    const data = { title, message, timestamp, amount };
    transactionList.unshift(data); // data terbaru di atas

    return res.status(200).json({ success: true });
  }

  if (req.method === 'GET') {
    return res.status(200).json(transactionList);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
