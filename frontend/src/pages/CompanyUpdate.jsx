import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCompany, updateCompany } from "../store/companySlice";
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

export default function CompanyUpdate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { company, loading, error } = useSelector((s) => s.company);

  const [ready, setReady] = useState(false);
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
  });

  useEffect(() => {
    // fetch existing company if not present
    dispatch(getCompany());
  }, [dispatch]);

  useEffect(() => {
    if (company) {
      // populate form with company data
      setForm({
        company_name: company.company_name || "",
        about_company: company.about_company || "",
        industry_type: company.industry_type || "",
        organizations_type: company.organizations_type || "",
        team_size: company.team_size || "",
        year_of_establishment: company.year_of_establishment ? company.year_of_establishment.substring(0,10) : "",
        company_website: company.company_website || "",
        company_app_link: company.company_app_link || "",
        company_vision: company.company_vision || "",
        headquarter_phone_no: company.headquarter_phone_no || "",
        social_links: company.social_links?.linkedin || "",
        map_location_url: company.map_location_url || "",
        careers_link: company.careers_link || "",
        headquarter_mail_id: company.headquarter_mail_id || "",
      });
      setReady(true);
    }
  }, [company]);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    let socialObj = null;
    if (form.social_links && form.social_links.trim() !== "") {
      socialObj = { linkedin: form.social_links.trim() };
    }

    const payload = {
      ...form,
      social_links: socialObj,
    };

    const result = await dispatch(updateCompany(payload));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/company/profile");
    }
  };

  if (!ready) return <p className="text-center mt-10">Loading company data...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Company Profile</h2>

        {/* Uploaders */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 border rounded">
            <h3 className="font-medium mb-2">Update Banner</h3>
            <CompanyBannerUpload />
          </div>

          <div className="bg-gray-50 p-4 border rounded">
            <h3 className="font-medium mb-2">Update Logo</h3>
            <CompanyLogoUpload />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Company Name *</label>
            <input name="company_name" value={form.company_name} onChange={handleChange} required className="mt-1 w-full border rounded px-3 py-2" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Organization Type</label>
              <select name="organizations_type" value={form.organizations_type} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2 bg-white">
                <option value="">Select</option>
                {ORG_TYPE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Industry Type</label>
              <select name="industry_type" value={form.industry_type} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2 bg-white">
                <option value="">Select</option>
                {INDUSTRY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Team Size</label>
              <input name="team_size" value={form.team_size} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Year of Establishment</label>
              <input name="year_of_establishment" value={form.year_of_establishment} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" placeholder="YYYY or YYYY-MM-DD" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input name="headquarter_phone_no" value={form.headquarter_phone_no} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Website</label>
            <input name="company_website" value={form.company_website} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">LinkedIn (or Social)</label>
            <input name="social_links" value={form.social_links} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">About Company *</label>
            <textarea name="about_company" value={form.about_company} onChange={handleChange} required rows="4" className="mt-1 w-full border rounded px-3 py-2" />
          </div>

          <div className="flex justify-end">
            <button type="submit" disabled={loading} className="bg-blue-600 text-white px-5 py-2 rounded">
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
}
