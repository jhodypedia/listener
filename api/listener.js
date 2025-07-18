// File: api/qris/listener.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Ambil API key dari header
  const apiKey = req.headers['x-api-key'];
  const serverApiKey = process.env.API_KEY;

  if (!apiKey || apiKey !== serverApiKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { title, message, timestamp, amount } = req.body;

    if (!title || !message || !timestamp || !amount) {
      return res.status(400).json({ error: 'Missing data' });
    }

    const log = {
      title,
      message,
      timestamp,
      amount,
      receivedAt: new Date().toISOString(),
    };

    console.log('✅ Data diterima:', log);

    // Contoh menyimpan ke memori sementara (Vercel stateless, jadi hanya bisa log ke console)
    // Kalau butuh simpan ke DB atau file permanen, gunakan Firestore, Supabase, atau MongoDB Atlas

    return res.status(200).json({ success: true, log });
  } catch (err) {
    console.error('❌ Error saat proses data:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
