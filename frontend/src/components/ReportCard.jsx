import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

function ReportCard({ report }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-2">

      <img
        src={
          report.image_url
            ? `http://127.0.0.1:8000/${report.image_url}`
            : "https://placehold.co/600x400?text=No+Image"
        }
        alt={report.title}
        className="w-full h-56 object-cover"
      />

      <div className="p-6">

        <span
          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
            report.report_type === "Lost"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {report.report_type}
        </span>

        <h2 className="text-2xl font-bold mt-4">
          {report.title}
        </h2>

        <p className="flex items-center gap-2 text-gray-600 mt-3">
          <FaMapMarkerAlt />
          {report.location}
        </p>

        <p className="flex items-center gap-2 text-gray-500 mt-2">
          <FaCalendarAlt />
          {report.date}
        </p>

        <p className="mt-2 text-green-700 font-medium">
          {report.category}
        </p>

        <Link
          to={`/reports/${report.id}`}
          className="mt-5 inline-block w-full text-center bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl transition"
        >
          View Details
        </Link>

      </div>

    </div>
  );
}

export default ReportCard;