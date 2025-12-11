import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCompany } from "../store/companySlice";
import { Link } from "react-router-dom";

export default function CompanyProfile() {
  const dispatch = useDispatch();
  const { company, loading, error } = useSelector((s) => s.company);

  useEffect(() => {
    dispatch(getCompany());
  }, [dispatch]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!company) return <p className="text-center mt-10">No company profile found.</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="relative">
          {company.company_banner_url ? (
            <img src={company.company_banner_url} alt="banner" className="w-full h-56 object-cover rounded-t-lg" />
          ) : (
            <div className="w-full h-56 bg-gray-200 rounded-t-lg" />
          )}

          <div className="absolute -bottom-12 left-6">
            {company.company_logo_url ? (
              <img src={company.company_logo_url} alt="logo" className="w-28 h-28 rounded-full object-cover border-4 border-white shadow" />
            ) : (
              <div className="w-28 h-28 rounded-full bg-gray-300 border-4 border-white shadow" />
            )}
          </div>
        </div>

        <div className="pt-16 px-6 pb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{company.company_name}</h1>
              <p className="text-gray-600 mt-1">{company.industry_type}</p>
            </div>

            <div className="flex items-center gap-3">
              <Link to="/dashboard/company/update" className="px-4 py-2 bg-blue-600 text-white rounded">Edit</Link>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-6">
            <Detail label="Organization Type" value={company.organizations_type} />
            <Detail label="Team Size" value={company.team_size} />
            <Detail label="Established" value={company.year_of_establishment?.substring(0,10)} />
            <Detail label="Website" value={company.company_website} isLink />
            <Detail label="Phone" value={company.headquarter_phone_no} />
            <Detail label="Email" value={company.headquarter_mail_id} />
            {company.social_links?.linkedin && <Detail label="LinkedIn" value={company.social_links.linkedin} isLink />}
            {company.map_location_url && <Detail label="Location" value="View on Maps" isLink url={company.map_location_url} />}
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">About Company</h3>
            <p className="text-gray-700 mt-2">{company.about_company}</p>
          </div>

          {company.company_vision && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800">Company Vision</h3>
              <p className="text-gray-700 mt-2">{company.company_vision}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value, isLink, url }) {
  if (!value) return <div><h4 className="font-semibold text-gray-700">{label}</h4><p className="text-gray-600">—</p></div>;

  if (isLink) {
    return (
      <div>
        <h4 className="font-semibold text-gray-700">{label}</h4>
        <a href={url || value} target="_blank" rel="noreferrer" className="text-blue-600 underline">
          {value}
        </a>
      </div>
    );
  }

  return (
    <div>
      <h4 className="font-semibold text-gray-700">{label}</h4>
      <p className="text-gray-600">{value}</p>
    </div>
  );
}
