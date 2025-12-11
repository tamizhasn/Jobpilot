const pool = require("../config/db");

const createUser = async (data) => {
  const query = `
    INSERT INTO users (
      email, password, full_name, gender, mobile_no,
      signup_type, ac_status, preference, role,
      is_mail_verified, is_mo_verified
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
    RETURNING id, email, full_name;
  `;

  const values = [
    data.email,                       
    data.password,                    
    data.full_name,
    data.gender || null,              
    data.mobile_no,                   
    data.signup_type || "e",          
    data.ac_status || 1,              
    data.preference || 1,             
    data.role || 1,                   
    false,                           
    false                             
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1 LIMIT 1`,
    [email]
  );
  return result.rows[0];
};

module.exports = { createUser, getUserByEmail };

