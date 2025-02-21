const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "diagnostic_app/uploads",
    format: async (req, file) => "png", 
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only PNG, JPG, and JPEG are allowed."), false);
  }
};


const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});


const fetchImageData = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const uploadedImage = await cloudinary.uploader.explicit(req.file.filename, {
      resource_type: "image",
    });

    req.cloudinaryData = {
      url: uploadedImage.secure_url,
      format: uploadedImage.format,
      width: uploadedImage.width,
      height: uploadedImage.height,
      size: uploadedImage.bytes, 
    };

    next();
  } catch (error) {
    console.error("Error fetching Cloudinary image data:", error);
    return res.status(500).json({ error: "Failed to retrieve image data" });
  }
};

module.exports = { upload, fetchImageData };
