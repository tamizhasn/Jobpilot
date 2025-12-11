const {
  createCompanyProfile,
  getCompanyProfile,
  updateCompanyProfile,
} = require("../models/companyModel");

const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// ===== CLOUDINARY CONFIG =====
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});


// =====================================================
//   POST /api/company/register
// =====================================================
exports.registerCompany = async (req, res) => {
  try {
    const owner_id = req.user.id;
    const data = req.body;

    data.owner_id = owner_id;

    // Prevent duplicate profiles
    const existing = await getCompanyProfile(owner_id);
    if (existing) {
      return res.status(400).json({
        error: "Company profile already exists for this user",
      });
    }

    const company = await createCompanyProfile(data);

    res.json({
      success: true,
      message: "Company profile created successfully",
      data: company,
    });

  } catch (err) {
    console.error("REGISTER COMPANY ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};



// =====================================================
//   GET /api/company/profile
// =====================================================
exports.getMyCompanyProfile = async (req, res) => {
  try {
    const owner_id = req.user.id;

    const company = await getCompanyProfile(owner_id);

    if (!company) {
      return res.status(404).json({ error: "Company profile not found" });
    }

    res.json({
      success: true,
      data: company,
    });

  } catch (err) {
    console.error("GET COMPANY ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};



// =====================================================
//   PUT /api/company/update  (Dynamic Update)
// =====================================================
exports.updateCompanyProfile = async (req, res) => {
  try {
    const owner_id = req.user.id;
    const data = req.body;

    const existing = await getCompanyProfile(owner_id);
    if (!existing) {
      return res.status(404).json({
        error: "Company profile not found. Create one first.",
      });
    }

    const updated = await updateCompanyProfile(owner_id, data);

    res.json({
      success: true,
      message: "Company profile updated successfully",
      data: updated,
    });

  } catch (err) {
    console.error("UPDATE COMPANY ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};



// =====================================================
//   POST /api/company/upload-logo (AUTO UPDATE + CLEANUP)
// =====================================================
exports.uploadCompanyLogo = async (req, res) => {
  try {
    const owner_id = req.user.id;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "company_logos",
    });

    // DELETE TEMP FILE
    fs.unlink(file.path, () => {});

    // Update Company Profile
    const updated = await updateCompanyProfile(owner_id, {
      company_logo_url: result.secure_url,
    });

    res.json({
      success: true,
      message: "Company logo uploaded successfully",
      logo_url: result.secure_url,
      data: updated,
    });

  } catch (err) {
    console.error("UPLOAD LOGO ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};



// =====================================================
//   POST /api/company/upload-banner (AUTO UPDATE + CLEANUP)
// =====================================================
exports.uploadCompanyBanner = async (req, res) => {
  try {
    const owner_id = req.user.id;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "company_banners",
    });

    // DELETE TEMP FILE
    fs.unlink(file.path, () => {});

    // Update Company Profile
    const updated = await updateCompanyProfile(owner_id, {
      company_banner_url: result.secure_url,
    });

    res.json({
      success: true,
      message: "Company banner uploaded successfully",
      banner_url: result.secure_url,
      data: updated,
    });

  } catch (err) {
    console.error("UPLOAD BANNER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
