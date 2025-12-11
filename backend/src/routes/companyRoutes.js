const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const {
  registerCompany,
  getMyCompanyProfile,
  updateCompanyProfile,
  uploadCompanyLogo,
  uploadCompanyBanner,
} = require("../controllers/companyController");

// Protected routes — all require login
router.post("/register", authMiddleware, registerCompany);

router.get("/profile", authMiddleware, getMyCompanyProfile);

router.put("/update", authMiddleware, updateCompanyProfile);

// FIXED: Correct field name "logo"
router.post(
  "/upload-logo",
  authMiddleware,
  upload.single("logo"),
  uploadCompanyLogo
);

// FIXED: Correct field name "banner"
router.post(
  "/upload-banner",
  authMiddleware,
  upload.single("banner"),
  uploadCompanyBanner
);

module.exports = router;
