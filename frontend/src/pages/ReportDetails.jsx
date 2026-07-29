import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../services/api";

import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaEdit,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaPhone,
  FaTag,
  FaTrash,
  FaUser,
  FaTimes,
} from "react-icons/fa";

function ReportDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchReport();
  }, []);

  async function fetchReport() {
    try {
      setLoading(true);

      const response = await api.get(`/reports/${id}`);

      setReport(response.data);
    } catch (err) {
      console.error(err);
      setError("Unable to load report.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    try {
      await api.delete(`/reports/${id}`);

      toast.success("Report deleted successfully!");

      navigate("/reports");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete report.");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-10">

        <div className="max-w-6xl mx-auto px-6">

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2 animate-pulse">

            <div className="bg-gray-300 h-[500px]" />

            <div className="p-10">

              <div className="h-8 bg-gray-300 rounded w-28 mb-6"></div>

              <div className="h-10 bg-gray-300 rounded w-2/3 mb-8"></div>

              <div className="space-y-4">

                <div className="h-5 bg-gray-300 rounded"></div>
                <div className="h-5 bg-gray-300 rounded"></div>
                <div className="h-5 bg-gray-300 rounded"></div>

              </div>

              <div className="space-y-3 mt-10">

                <div className="h-5 bg-gray-300 rounded"></div>
                <div className="h-5 bg-gray-300 rounded"></div>
                <div className="h-5 bg-gray-300 rounded"></div>
                <div className="h-5 bg-gray-300 rounded"></div>

              </div>

            </div>

          </div>

        </div>

      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">

        <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-md">

          <h1 className="text-3xl font-bold text-red-600">

            Oops!

          </h1>

          <p className="mt-4 text-gray-600">

            {error || "Report not found."}

          </p>

          <Link
            to="/reports"
            className="inline-block mt-8 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl"
          >
            Back to Reports
          </Link>

        </div>

      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-10">

        <div className="max-w-6xl mx-auto px-6">

          <Link
            to="/reports"
            className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 font-semibold mb-8"
          >
            <FaArrowLeft />
            Back to Reports
          </Link>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid lg:grid-cols-2">

            {/* IMAGE */}

            <div className="bg-gray-200">

              <img
                src={
                  report.image_url
                    ? `http://127.0.0.1:8000/${report.image_url}`
                    : "https://placehold.co/700x700?text=No+Image"
                }
                alt={report.title}
                className="w-full h-full min-h-[450px] object-cover"
              />

            </div>

            {/* DETAILS */}

            <div className="p-8 lg:p-10">

              <div className="flex flex-wrap items-center gap-3">

                <span
                  className={`px-4 py-2 rounded-full font-semibold ${
                    report.report_type === "Lost"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {report.report_type}
                </span>

                <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full">

                  {report.category}

                </span>

              </div>

              <h1 className="text-4xl font-bold mt-6">

                {report.title}

              </h1>

              <div className="mt-8 space-y-4 text-gray-700">

                <div className="flex items-center gap-3">

                  <FaMapMarkerAlt className="text-green-700" />

                  <span>{report.location}</span>

                </div>

                {report.specific_location && (

                  <div className="flex items-center gap-3">

                    📍

                    <span>{report.specific_location}</span>

                  </div>

                )}

                <div className="flex items-center gap-3">

                  <FaCalendarAlt className="text-green-700" />

                  <span>{report.date}</span>

                </div>

                {report.time && (

                  <div className="flex items-center gap-3">

                    <FaClock className="text-green-700" />

                    <span>{report.time}</span>

                  </div>

                )}

              </div>

              <div className="mt-10">

                <h2 className="text-2xl font-bold mb-3">

                  Description

                </h2>

                <p className="text-gray-600 leading-8">

                  {report.description}

                </p>

              </div>

              <div className="mt-10 border-t pt-8">

                <h2 className="text-2xl font-bold mb-5">

                  Reporter Details

                </h2>

                <div className="space-y-4">

                  <div className="flex items-center gap-3">

                    <FaUser className="text-green-700" />

                    {report.reporter_name}

                  </div>

                  <div className="flex items-center gap-3">

                    <FaGraduationCap className="text-green-700" />

                    {report.programme}

                  </div>

                  <div className="flex items-center gap-3">

                    📚

                    {report.semester}

                  </div>

                  <div className="flex items-center gap-3">

                    <FaPhone className="text-green-700" />

                    {report.contact_number}

                  </div>

                </div>

              </div>
                            <div className="flex flex-col sm:flex-row gap-4 mt-10">

                <Link
                  to={`/reports/${report.id}/edit`}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
                >
                  <FaEdit />
                  Edit Report
                </Link>

                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition"
                >
                  <FaTrash />
                  Delete Report
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* DELETE CONFIRMATION MODAL */}

      {showDeleteModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">

          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-[fadeIn_.2s_ease]">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold text-red-600">
                Delete Report
              </h2>

              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-500 hover:text-black text-xl"
              >
                <FaTimes />
              </button>

            </div>

            <p className="text-gray-600 leading-7">

              Are you sure you want to permanently delete this report?

            </p>

            <p className="mt-3 text-sm text-red-600 font-medium">

              This action cannot be undone.

            </p>

            <div className="flex gap-4 mt-8">

              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition font-medium"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white transition font-medium"
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
}

export default ReportDetails;