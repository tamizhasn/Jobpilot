import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCompany } from "../store/companySlice";
import { useNavigate } from "react-router-dom";
import CompanyLogoUpload from "../components/CompanyLogoUpload";
import CompanyBannerUpload from "../components/CompanyBannerUpload";

const INDUSTRY_OPTIONS = [
  "Software Development",
  "Information Technology",
  "E-Commerce",
  "Healthcare",
  "Finance & Banking",
  "Ed-Tech",
  "Manufacturing",
  "Automobile",
  "Hospitality",
  "Digital Marketing",
  "Cybersecurity",
  "AI & Machine Learning",
  "Cloud Computing",
  "Telecommunications",
  "Other",
];

const ORG_TYPE_OPTIONS = [
  "Private Limited",
  "Public Limited",
  "Self-Owned",
  "Partnership",
  "Government",
  "NGO",
  "Startup",
  "MNC",
  "Other",
];

export default function CompanyRegister() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s) => s.company);

  const [form, setForm] = useState({
    company_name: "",
    about_company: "",
    industry_type: "",
    organizations_type: "",
    team_size: "",
    year_of_establishment: "",
    company_website: "",
    company_app_link: "",
    company_vision: "",
    headquarter_phone_no: "",
    social_links: "",
    map_location_url: "",
    careers_link: "",
    headquarter_mail_id: "",
    company_logo_url: null,
    company_banner_url: null,
  });

  const [showCustomIndustry, setShowCustomIndustry] = useState(false);
  const [showCustomOrg, setShowCustomOrg] = useState(false);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // convert social_links string to object if present
    let socialObj = null;
    if (form.social_links && form.social_links.trim() !== "") {
      socialObj = { linkedin: form.social_links.trim() };
    }

    const payload = {
      ...form,
      social_links: socialObj,
    };

    const result = await dispatch(createCompany(payload));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/company/profile");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 flex justify-center px-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Company Profile</h2>

        {/* Uploads section */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 border rounded">
            <h3 className="font-medium mb-2">Company Banner</h3>
            <CompanyBannerUpload />
            <p className="text-xs text-gray-500 mt-2">Recommended size: wide horizontal image</p>
          </div>

          <div className="bg-gray-50 p-4 border rounded">
            <h3 className="font-medium mb-2">Company Logo</h3>
            <CompanyLogoUpload />
            <p className="text-xs text-gray-500 mt-2">Recommended: square logo (less than 2MB)</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Company Name *</label>
            <input
              name="company_name"
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded px-3 py-2 bg-white"
              placeholder="Acme Pvt Ltd"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Organization Type</label>
              <select
                name="organizations_type"
                onChange={(e) => {
                  handleChange(e);
                  setShowCustomOrg(e.target.value === "Other");
                }}
                className="mt-1 w-full border rounded px-3 py-2 bg-white"
              >
                <option value="">Select</option>
                {ORG_TYPE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
              {showCustomOrg && (
                <input
                  name="organizations_type"
                  onChange={handleChange}
                  className="mt-2 w-full border rounded px-3 py-2"
                  placeholder="Enter custom organization type"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Industry Type</label>
              <select
                name="industry_type"
                onChange={(e) => {
                  handleChange(e);
                  setShowCustomIndustry(e.target.value === "Other");
                }}
                className="mt-1 w-full border rounded px-3 py-2 bg-white"
              >
                <option value="">Select</option>
                {INDUSTRY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
              {showCustomIndustry && (
                <input
                  name="industry_type"
                  onChange={handleChange}
                  className="mt-2 w-full border rounded px-3 py-2"
                  placeholder="Enter custom industry"
                />
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Team Size</label>
              <input name="team_size" onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" placeholder="10-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Year of Establishment</label>
              <input name="year_of_establishment" onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" placeholder="YYYY or YYYY-MM-DD" />
              <p className="text-xs text-gray-500 mt-1">Example: 2019 or 2019-01-01</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input name="headquarter_phone_no" onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" placeholder="+91-9000000000" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Website</label>
            <input name="company_website" onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" placeholder="https://yourcompany.com" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">LinkedIn (or Social)</label>
            <input name="social_links" onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" placeholder="https://linkedin.com/company/your-company" />
            <p className="text-xs text-gray-500 mt-1">We store this as social_links JSON (linkedin)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">About Company *</label>
            <textarea name="about_company" onChange={handleChange} required rows="4" className="mt-1 w-full border rounded px-3 py-2" placeholder="Describe your company..."></textarea>
          </div>

          <div className="flex justify-end">
            <button type="submit" disabled={loading} className="bg-blue-600 text-white px-5 py-2 rounded">
              {loading ? "Creating..." : "Create Company"}
            </button>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
}
