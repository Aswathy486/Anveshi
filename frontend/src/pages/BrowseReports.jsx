import { useEffect, useState } from "react";
import api from "../services/api";
import ReportCard from "../components/ReportCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";

function BrowseReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [reportType, setReportType] = useState("All");

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    try {
      const response = await api.get("/reports");
      setReports(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(search.toLowerCase()) ||
      report.location.toLowerCase().includes(search.toLowerCase()) ||
      report.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "" || report.category === category;

    const matchesType =
      reportType === "All" || report.report_type === reportType;

    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-4xl font-bold">
          Browse Reports
        </h1>

        <p className="text-gray-600 mt-2">
          Search and filter lost & found reports.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mt-8">

          <SearchBar
            searchTerm={search}
            setSearchTerm={setSearch}
          />

          <CategoryFilter
            category={category}
            setCategory={setCategory}
          />

        </div>

        {/* Report Type Filter */}

        <div className="flex gap-3 mt-6">

          {["All", "Lost", "Found"].map((type) => (

            <button
              key={type}
              onClick={() => setReportType(type)}
              className={`px-5 py-2 rounded-full transition ${
                reportType === type
                  ? "bg-green-700 text-white"
                  : "bg-white border hover:bg-green-50"
              }`}
            >
              {type}
            </button>

          ))}

        </div>

        {loading ? (

          <div className="text-center py-20">

            Loading...

          </div>

        ) : filteredReports.length === 0 ? (

          <div className="text-center py-20">

            <h2 className="text-2xl font-semibold">
              No reports found
            </h2>

            <p className="text-gray-500 mt-3">
              Try another search or filter.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">

            {filteredReports.map((report) => (

              <ReportCard
                key={report.id}
                report={report}
              />

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default BrowseReports;