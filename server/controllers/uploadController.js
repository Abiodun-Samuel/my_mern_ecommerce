import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "my_ecommerce",
    });
    res.json(uploadResponse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "Error", message: "Something went wrong" });
  }
};

export { uploadToCloudinary };
