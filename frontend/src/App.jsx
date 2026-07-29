import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import BrowseReports from "./pages/BrowseReports";
import CreateReport from "./pages/CreateReport";
import ReportDetails from "./pages/ReportDetails";
import EditReport from "./pages/EditReport";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            background: "#ffffff",
            color: "#111827",
            fontSize: "15px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          },
          success: {
            iconTheme: {
              primary: "#16a34a",
              secondary: "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#dc2626",
              secondary: "#ffffff",
            },
          },
        }}
      />

      <Navbar />

      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reports" element={<BrowseReports />} />
          <Route path="/create" element={<CreateReport />} />
          <Route path="/reports/:id" element={<ReportDetails />} />
          <Route path="/reports/:id/edit" element={<EditReport />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;