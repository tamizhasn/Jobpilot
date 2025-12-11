const bcrypt = require("bcrypt");
const { createUser, getUserByEmail } = require("../models/userModel");
const { generateToken } = require("../utils/jwt");

//
// ===== VALIDATION HELPERS =====
//

const validateGender = (gender) => {
  if (!gender) return null;
  const g = gender.toString().toUpperCase();
  return g === "M" || g === "F" ? g : null;
};

const validateSignupType = (type) => {
  const allowed = ["e", "g", "m", "t"];
  return allowed.includes(type) ? type : "e";
};

const validatePreference = (p) => {
  const n = Number(p);
  return [1, 2, 3].includes(n) ? n : 1;
};

const validateRole = (r) => {
  const n = Number(r);
  return [1, 2, 3].includes(n) ? n : 1;
};

//
// ===== REGISTER CONTROLLER =====
//

exports.register = async (req, res) => {
  try {
    const { email, password, full_name, gender, mobile_no } = req.body;

    // Gender must be 'M' or 'F' or NULL
    const formattedGender = validateGender(gender);

    if (!mobile_no) {
      return res.status(400).json({ error: "Mobile number is required" });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Insert user into DB
    const user = await createUser({
      email,
      password: hashed,
      full_name,
      gender: formattedGender,
      mobile_no,
      signup_type: "e",
      ac_status: 1,
      preference: 1,
      role: 1,
    });

    res.json({
      success: true,
      message: "User registered successfully",
      data: user,
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(400).json({ error: err.message });
  }
};

//
// ===== LOGIN CONTROLLER =====
//

exports.login = async (req, res) => {
  try {
    console.log("LOGIN BODY:", req.body);

    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await getUserByEmail(email);
    console.log("DB USER:", user);

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // 2. Compare password
    console.log("PASSWORD TO CHECK:", password);
    console.log("HASHED PASSWORD FROM DB:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("PASSWORD MATCH RESULT:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // 3. Generate 90-day JWT
    const token = generateToken(user);
    console.log("GENERATED TOKEN:", token);

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        ac_status: user.ac_status,
      },
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);  
    res.status(500).json({ error: "Server error" });
  }
};

