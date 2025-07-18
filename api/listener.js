// Simpan data sementara (non-persistent, hilang setelah restart)
let logs = [];

const API_KEY = '4rc0d3'; // Ganti sesuai kebutuhan

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const clientKey = req.headers['x-api-key'];
  if (clientKey !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { title, message, timestamp, amount } = req.body;

    if (!message || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Simpan ke memori (log sementara)
    logs.push({ title, message, timestamp, amount });

    console.log('✅ New Transaction:', { title, message, amount });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('❌ Error:', err.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
