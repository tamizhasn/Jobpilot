const pool = require("../config/db");

/**
 * ================================================
 *  UTIL — Clean & Normalize Company Data
 * ================================================
 */
function normalizeCompanyData(data) {
  const cleaned = {};

  for (let key in data) {
    let value = data[key];

    // Empty strings → NULL
    if (value === "" || value === undefined) {
      value = null;
    }

    // Convert year-only (e.g. "2019") → full date "2019-01-01"
    if (key === "year_of_establishment" && value) {
      const yearOnly = value.toString().match(/^\d{4}$/);
      if (yearOnly) {
        value = `${value}-01-01`;
      }
    }

    // Parse JSON field for social_links
    if (key === "social_links" && value) {
      try {
        if (typeof value === "string") {
          value = JSON.parse(value);
        }
      } catch (err) {
        throw new Error("Invalid JSON format for social_links");
      }
    }

    cleaned[key] = value;
  }

  return cleaned;
}

/**
 * ================================================
 *  CREATE COMPANY PROFILE
 * ================================================
 */
const createCompanyProfile = async (data) => {
  const d = normalizeCompanyData(data);

  const query = `
    INSERT INTO company_profile (
      company_logo_url,
      company_banner_url,
      company_name,
      about_company,
      organizations_type,
      industry_type,
      team_size,
      year_of_establishment,
      company_website,
      company_app_link,
      company_vision,
      headquarter_phone_no,
      social_links,
      map_location_url,
      careers_link,
      owner_id,
      is_claimed,
      headquarter_mail_id
    )
    VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18
    )
    RETURNING *;
  `;

  const values = [
    d.company_logo_url || null,
    d.company_banner_url || null,
    d.company_name,
    d.about_company || null,
    d.organizations_type || null,
    d.industry_type || null,
    d.team_size || null,
    d.year_of_establishment || null,
    d.company_website || null,
    d.company_app_link || null,
    d.company_vision || null,
    d.headquarter_phone_no || null,
    d.social_links || null,
    d.map_location_url || null,
    d.careers_link || null,
    d.owner_id,
    false, // default is_claimed
    d.headquarter_mail_id || null,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

/**
 * ================================================
 *  GET COMPANY PROFILE BY OWNER ID
 * ================================================
 */
const getCompanyProfile = async (owner_id) => {
  const result = await pool.query(
    `SELECT * FROM company_profile WHERE owner_id = $1 LIMIT 1;`,
    [owner_id]
  );

  return result.rows[0] || null;
};

/**
 * ================================================
 *  UPDATE COMPANY PROFILE — Partial Dynamic Update
 * ================================================
 */
const updateCompanyProfile = async (owner_id, data) => {
  const d = normalizeCompanyData(data);

  const fields = [];
  const values = [];
  let index = 1;

  for (const key in d) {
    fields.push(`${key} = $${index}`);
    values.push(d[key]);
    index++;
  }

  values.push(owner_id);

  const query = `
    UPDATE company_profile
    SET ${fields.join(", ")},
        updated_at = NOW()
    WHERE owner_id = $${index}
    RETURNING *;
  `;

  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = {
  createCompanyProfile,
  getCompanyProfile,
  updateCompanyProfile,
};
