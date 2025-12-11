import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((s) => s.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
    full_name: "",
    mobile_no: "",
    gender: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(registerUser(form));

    if (result.meta.requestStatus === "fulfilled") {
      alert("Registration successful! Please login.");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Full Name"
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Email"
          type="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Mobile Number"
          onChange={(e) => setForm({ ...form, mobile_no: e.target.value })}
        />

        <select
          className="w-full border p-2 rounded mb-3"
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
        >
          <option value="">Select Gender</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <a href="/" className="text-blue-600 font-medium">Login</a>
        </p>
      </form>
    </div>
  );
}
