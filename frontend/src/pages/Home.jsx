import { Link } from "react-router-dom";
import {
  FaSearch,
  FaCamera,
  FaClipboardList,
  FaExchangeAlt,
  FaShieldAlt,
  FaUniversity,
} from "react-icons/fa";

function Home() {
  return (
    <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 min-h-screen">

      {/* ================= HERO ================= */}

      <section className="max-w-7xl mx-auto px-6 py-24 text-center">

        <div className="inline-flex items-center gap-3 bg-white rounded-full shadow-lg px-6 py-3">

          <FaSearch className="text-green-700 text-lg" />

          <span className="font-semibold text-green-700">
            Welcome to Anveshi
          </span>

        </div>

        <h1 className="mt-10 text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight">

          Lost & Found

          <span className="block text-green-700">
            Made Simple
          </span>

        </h1>

        <p className="mt-8 text-xl text-gray-600 max-w-3xl mx-auto leading-8">

          A centralized Lost & Found portal built for
          <span className="font-semibold text-green-700">
            {" "}St. Joseph College of Engineering, Palai
          </span>.
          Report lost items, browse found items, and reconnect
          students with their belongings quickly and securely.

        </p>

        <div className="flex flex-wrap justify-center gap-6 mt-12">

          <Link to="/create">

            <button className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-xl shadow-lg transition duration-300 hover:scale-105">

              Report Item

            </button>

          </Link>

          <Link to="/reports">

            <button className="border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white px-8 py-4 rounded-xl transition duration-300 hover:scale-105">

              Browse Reports

            </button>

          </Link>

        </div>

      </section>

      {/* ================= FEATURES ================= */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="text-center mb-16">

          <h2 className="text-4xl font-bold text-gray-900">

            Why Choose Anveshi?

          </h2>

          <p className="mt-4 text-gray-600 text-lg">

            Everything you need to report and recover lost belongings on campus.

          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-3">

          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-2 transition duration-300">

            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">

              <FaCamera className="text-3xl text-green-700" />

            </div>

            <h3 className="text-2xl font-bold mb-4">

              Upload Photos

            </h3>

            <p className="text-gray-600 leading-7">

              Attach clear photos of lost or found items,
              making it easier for owners to recognize
              and claim them.

            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-2 transition duration-300">

            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">

              <FaSearch className="text-3xl text-green-700" />

            </div>

            <h3 className="text-2xl font-bold mb-4">

              Smart Search

            </h3>

            <p className="text-gray-600 leading-7">

              Quickly search reports using item title,
              category, location, and report type to
              find matching belongings.

            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-2 transition duration-300">

            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">

              <FaUniversity className="text-3xl text-green-700" />

            </div>

            <h3 className="text-2xl font-bold mb-4">

              Campus Exclusive

            </h3>

            <p className="text-gray-600 leading-7">

              Designed specifically for the SJCET
              community to provide a safe, trusted,
              and organized lost & found platform.

            </p>

          </div>

        </div>

      </section>

      {/* ================= HOW IT WORKS ================= */}

      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="text-center mb-16">

          <h2 className="text-4xl font-bold text-gray-900">

            How It Works

          </h2>

          <p className="mt-4 text-gray-600 text-lg">

            Recovering lost belongings takes only a few simple steps.

          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

            <FaClipboardList className="text-5xl text-green-700 mx-auto mb-6" />

            <h3 className="text-2xl font-bold mb-3">

              Report

            </h3>

            <p className="text-gray-600 leading-7">

              Submit details of a lost or found item,
              along with its location, description,
              and image.

            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

            <FaSearch className="text-5xl text-green-700 mx-auto mb-6" />

            <h3 className="text-2xl font-bold mb-3">

              Search

            </h3>

            <p className="text-gray-600 leading-7">

              Browse all reports and use powerful
              filters to locate matching items quickly.

            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

            <FaExchangeAlt className="text-5xl text-green-700 mx-auto mb-6" />

            <h3 className="text-2xl font-bold mb-3">

              Reconnect

            </h3>

            <p className="text-gray-600 leading-7">

              Contact the reporter and safely return
              the item to its rightful owner.

            </p>

          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="bg-green-700 py-20">

        <div className="max-w-5xl mx-auto text-center px-6">

          <FaShieldAlt className="text-5xl text-white mx-auto mb-6" />

          <h2 className="text-4xl font-bold text-white">

            Help Build a More Helpful Campus

          </h2>

          <p className="mt-6 text-green-100 text-lg leading-8">

            Every report increases the chance that
            someone gets their belongings back.
            Join the SJCET community in making
            Lost & Found easier for everyone.

          </p>

          <Link to="/create">

            <button className="mt-10 bg-white text-green-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition">

              Report an Item

            </button>

          </Link>

        </div>

      </section>

    </div>
  );
}

export default Home;