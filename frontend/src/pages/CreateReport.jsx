import { useState } from "react";
import api from "../services/api";
import { FaUpload } from "react-icons/fa";

function CreateReport() {
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
      await api.post("/reports", data);

      alert("Report submitted successfully!");

      setFormData({
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

      setImage(null);
      setPreview(null);

    } catch (err) {
      console.error(err);
      console.log(err.response);
      console.log(err.response?.data);

      alert(
        err.response?.data?.detail
          ? JSON.stringify(err.response.data.detail)
          : "Failed to submit report."
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-4xl font-bold text-green-700 mb-8">
          Report Lost / Found Item
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

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

          {/* Grid */}

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

          {/* Upload */}

          <div>

            <label className="font-semibold block mb-3">
              Upload Image
            </label>

            <label
              htmlFor="imageUpload"
              className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-xl cursor-pointer"
            >
              <FaUpload />
              Choose File
            </label>

            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImage}
            />

            {image && (
              <p className="mt-3 text-green-700">
                {image.name}
              </p>
            )}

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-5 w-64 rounded-xl shadow"
              />
            )}

          </div>

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white py-4 rounded-xl text-lg font-semibold"
          >
            Submit Report
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreateReport;