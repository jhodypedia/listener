// /api/qris/listener.js

import { createClient } from '@supabase/supabase-js';

// === GANTI DENGAN DATA PUNYAMU ===
const SUPABASE_URL = "https://YOUR_PROJECT.supabase.co";
const SUPABASE_KEY = "YOUR_SUPABASE_SERVICE_ROLE_KEY";
const API_KEY = "your_custom_apikey_123"; // HARUS cocok dengan di Android

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Validasi API Key
  const authHeader = req.headers['x-api-key'];
  if (authHeader !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized - Invalid API Key' });
  }

  const { title, message, amount, timestamp } = req.body;

  // Validasi data wajib
  if (!message || !amount) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Simpan ke Supabase
  const { error } = await supabase.from('transactions').insert([
    {
      title: title || '',
      message,
      amount: parseInt(amount),
      timestamp: timestamp || new Date().toISOString()
    }
  ]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ success: true });
}
