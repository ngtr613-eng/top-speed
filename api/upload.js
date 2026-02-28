const cloudinary = require('cloudinary').v2;

// Configure cloudinary using CLOUDINARY_URL env var or individual env vars
if (process.env.CLOUDINARY_URL) {
  cloudinary.config({ url: process.env.CLOUDINARY_URL });
} else {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { dataUrl } = req.body || {};
    if (!dataUrl) return res.status(400).json({ error: 'Missing dataUrl' });

    // Upload using Cloudinary directly from data URL
    const result = await cloudinary.uploader.upload(dataUrl, {
      folder: 'top-speed/car-gallery',
      resource_type: 'image',
      overwrite: false,
    });

    return res.status(200).json({ url: result.secure_url, raw: result });
  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ error: 'Upload failed', details: err.message });
  }
};
