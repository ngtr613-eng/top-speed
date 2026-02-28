import express from 'express';
import cloudinary from 'cloudinary';

const router = express.Router();

// configure Cloudinary using env variable or individual keys
if (process.env.CLOUDINARY_URL) {
  cloudinary.config({ url: process.env.CLOUDINARY_URL });
} else {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

// POST /api/upload  - expects { dataUrl }
router.post('/', async (req, res) => {
  try {
    const { dataUrl } = req.body || {};
    if (!dataUrl) return res.status(400).json({ error: 'Missing dataUrl' });

    const result = await cloudinary.uploader.upload(dataUrl, {
      folder: 'top-speed/car-gallery',
      resource_type: 'image',
      overwrite: false,
    });

    return res.json({ url: result.secure_url, raw: result });
  } catch (err) {
    console.error('Upload error', err);
    res.status(500).json({ error: 'Upload failed', details: err.message });
  }
});

export default router;
