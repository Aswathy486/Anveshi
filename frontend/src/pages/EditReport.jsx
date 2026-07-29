import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../services/api";
import { FaArrowLeft, FaUpload } from "react-icons/fa";

function EditReport() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    report_type: "Lost",
    title: "",
    category: "",
    description: "",
    location: "",
    specific_location: "",
    date: "",
    time: "",
    reporter_name: "",
    programme: "",
    semester: "",
    contact_number: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetchReport();
  }, []);

  async function fetchReport() {
  try {
    const response = await api.get(`/reports/${id}`);

    const report = response.data;

    setFormData({
      report_type: report.report_type || "Lost",
      title: report.title || "",
      category: report.category || "",
      description: report.description || "",
      location: report.location || "",
      specific_location: report.specific_location || "",
      date: report.date || "",
      time: report.time || "",
      reporter_name: report.reporter_name || "",
      programme: report.programme || "",
      semester: report.semester || "",
      contact_number: report.contact_number || "",
    });

    if (report.image_url) {
      setPreview(`http://127.0.0.1:8000/${report.image_url}`);
    }
  } catch (err) {
    console.error(err);

    console.log("Status:", err.response?.status);
    console.log("Data:", err.response?.data);

    toast.error("Failed to load report.");
  } finally {
    setLoading(false);
  }
}

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleImage(e) {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (image) {
      data.append("image", image);
    }

    try {
      await api.put(`/reports/${id}`, data);

      toast.success("Report updated successfully!");

      navigate(`/reports/${id}`);
    } catch (err) {
      console.error(err);

      toast.error("Failed to update report.");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <Link
          to={`/reports/${id}`}
          className="inline-flex items-center gap-2 text-green-700 font-semibold mb-8"
        >
          <FaArrowLeft />
          Back
        </Link>

        <h1 className="text-4xl font-bold text-green-700 mb-8">
          Edit Report
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
                  {/* Report Type */}

          <div>
            <label className="font-semibold block mb-3">
              Report Type
            </label>

            <div className="flex gap-4">

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="report_type"
                  value="Lost"
                  checked={formData.report_type === "Lost"}
                  onChange={handleChange}
                />
                Lost
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="report_type"
                  value="Found"
                  checked={formData.report_type === "Found"}
                  onChange={handleChange}
                />
                Found
              </label>

            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="text"
              name="title"
              placeholder="Item Title"
              value={formData.title}
              onChange={handleChange}
              className="border rounded-xl p-3"
              required
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border rounded-xl p-3"
              required
            >
              <option value="">Select Category</option>
              <option>Academic Items</option>
              <option>Electronics</option>
              <option>Accessories</option>
              <option>Bags</option>
              <option>Wallets</option>
              <option>Keys</option>
              <option>ID Cards</option>
              <option>Others</option>
            </select>

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="border rounded-xl p-3"
              required
            />

            <input
              type="text"
              name="specific_location"
              placeholder="Specific Location"
              value={formData.specific_location}
              onChange={handleChange}
              className="border rounded-xl p-3"
            />

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border rounded-xl p-3"
              required
            />

            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="border rounded-xl p-3"
            />

            <input
              type="text"
              name="reporter_name"
              placeholder="Your Name"
              value={formData.reporter_name}
              onChange={handleChange}
              className="border rounded-xl p-3"
              required
            />

            <select
              name="programme"
              value={formData.programme}
              onChange={handleChange}
              className="border rounded-xl p-3"
              required
            >
              <option value="">Select Programme</option>
              <option>CSE</option>
              <option>CSE (AI)</option>
              <option>ECE</option>
              <option>EEE</option>
              <option>ME</option>
              <option>CE</option>
            </select>

            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="border rounded-xl p-3"
              required
            >
              <option value="">Select Semester</option>
              <option>S1</option>
              <option>S2</option>
              <option>S3</option>
              <option>S4</option>
              <option>S5</option>
              <option>S6</option>
              <option>S7</option>
              <option>S8</option>
            </select>

            <input
              type="text"
              name="contact_number"
              placeholder="Contact Number"
              value={formData.contact_number}
              onChange={handleChange}
              className="border rounded-xl p-3"
              required
            />

          </div>

          <textarea
            name="description"
            rows="5"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
            required
          />

          {/* Image Upload */}

          <div>

            <label className="font-semibold block mb-3">
              Replace Image (Optional)
            </label>

            <label
              htmlFor="imageUpload"
              className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-xl cursor-pointer"
            >
              <FaUpload />
              Choose New Image
            </label>

            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImage}
            />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-5 w-64 rounded-xl shadow-lg"
              />
            )}

          </div>

          <div className="flex flex-col sm:flex-row gap-4">

            <button
              type="submit"
              className="flex-1 bg-green-700 hover:bg-green-800 text-white py-4 rounded-xl font-semibold transition"
            >
              Update Report
            </button>

            <button
              type="button"
              onClick={() => navigate(`/reports/${id}`)}
              className="flex-1 border border-gray-300 hover:bg-gray-100 py-4 rounded-xl font-semibold transition"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditReport;