import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCompany } from "../../store/companySlice";
import { useNavigate } from "react-router-dom";

export default function OnboardingStep1() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    company_name: "",
    industry_type: "",
    organizations_type: "",
    team_size: "",
    year_of_establishment: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = async () => {
    const result = await dispatch(createCompany(form));

    if (result.meta.requestStatus === "fulfilled") {
      navigate("/onboarding/step-2");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Step 1 — Company Basic Details
      </h1>

      <div className="grid grid-cols-1 gap-5">
        <input className="input" placeholder="Company Name"
          name="company_name" onChange={handleChange} />

        <select className="input" name="industry_type" onChange={handleChange}>
          <option>Select Industry</option>
          <option>Software Development</option>
          <option>Finance</option>
          <option>Healthcare</option>
          <option>Education</option>
        </select>

        <select className="input" name="organizations_type" onChange={handleChange}>
          <option>Private Limited</option>
          <option>Public Limited</option>
          <option>Partnership</option>
        </select>

        <input className="input" placeholder="Team Size"
          name="team_size" onChange={handleChange} />

        <input className="input" placeholder="Year of Establishment"
          name="year_of_establishment" onChange={handleChange} />
      </div>

      <button
        onClick={handleNext}
        className="mt-8 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Continue
      </button>
    </div>
  );
}
