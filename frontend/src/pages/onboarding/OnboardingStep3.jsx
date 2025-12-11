import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCompany } from "../../store/companySlice";
import { useNavigate } from "react-router-dom";

export default function OnboardingStep3() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    company_website: "",
    headquarter_phone_no: "",
    headquarter_mail_id: "",
    social_links: JSON.stringify({ linkedin: "", website: "" }),
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const finishSetup = async () => {
    const result = await dispatch(updateCompany(form));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/dashboard");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Step 3 — Contact & Confirmation
      </h1>

      <input className="input" placeholder="Company Website"
        name="company_website" onChange={handleChange} />
      
      <input className="input mt-4" placeholder="Phone Number"
        name="headquarter_phone_no" onChange={handleChange} />

      <input className="input mt-4" placeholder="Official Email"
        name="headquarter_mail_id" onChange={handleChange} />

      <button
        onClick={finishSetup}
        className="mt-8 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
      >
        Finish Setup
      </button>
    </div>
  );
}
