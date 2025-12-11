import CompanyLogoUpload from "../../components/CompanyLogoUpload";
import CompanyBannerUpload from "../../components/CompanyBannerUpload";
import { useNavigate } from "react-router-dom";

export default function OnboardingStep2() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Step 2 — Add Company Branding
      </h1>

      <CompanyLogoUpload />
      <div className="my-6"></div>
      <CompanyBannerUpload />

      <button
        onClick={() => navigate("/onboarding/step-3")}
        className="mt-10 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Continue
      </button>
    </div>
  );
}
