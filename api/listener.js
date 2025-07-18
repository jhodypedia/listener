export default async function handler(req, res) {
  const API_KEY = "cek123"; // Ganti dengan kunci API rahasia kamu

  // Hanya izinkan metode POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // Verifikasi API key dari header
  const receivedApiKey = req.headers['x-api-key'];
  if (receivedApiKey !== API_KEY) {
    return res.status(403).json({ message: "Unauthorized: Invalid API Key" });
  }

  // Ambil data dari body
  const { title, message, timestamp, amount } = req.body;

  if (!title || !message || !timestamp || !amount) {
    return res.status(400).json({ message: "Bad Request: Data tidak lengkap" });
  }

  // Tampilkan di log Vercel
  console.log("== Transaksi Masuk GoPay Merchant ==");
  console.log("Judul    :", title);
  console.log("Pesan    :", message);
  console.log("Waktu    :", timestamp);
  console.log("Nominal  : Rp" + amount);
  console.log("====================================");

  // Kirim respon ke aplikasi
  return res.status(200).json({
    success: true,
    message: "Notifikasi transaksi diterima",
    received: { title, message, timestamp, amount }
  });
}
