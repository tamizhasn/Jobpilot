import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getCompany } from "../store/companySlice";

export default function CompanyBannerUpload() {
  const dispatch = useDispatch();
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    try {
      setUploading(true);
      setError("");

      const fileInput = document.getElementById("bannerFile");
      const file = fileInput.files[0];

      if (!file) {
        setError("Please select a file first.");
        setUploading(false);
        return;
      }

      let formData = new FormData();
      formData.append("banner", file);

      const token = localStorage.getItem("token");

      const res = await axios.post(`${API_BASE}/company/upload-banner`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Banner uploaded successfully!");

      dispatch(getCompany()); // Refresh company profile

      setUploading(false);
    } catch (err) {
      console.error(err);
      setError("Upload failed");
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg mt-6">
      <h2 className="text-xl font-bold mb-4">Upload Company Banner</h2>

      <input
        type="file"
        id="bannerFile"
        accept="image/*"
        onChange={handleFileChange}
        className="border p-2 rounded w-full"
      />

      {preview && (
        <img
          src={preview}
          alt="Banner Preview"
          className="w-full h-40 object-cover mt-4 rounded-lg border"
        />
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
      >
        {uploading ? "Uploading..." : "Upload Banner"}
      </button>
    </div>
  );
}
