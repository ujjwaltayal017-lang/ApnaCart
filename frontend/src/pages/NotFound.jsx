
import { Link } from "react-router-dom";
import { FiHome, FiArrowLeft, FiAlertCircle } from "react-icons/fi";

function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">

            <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-lg">

                {/* Icon */}
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
                    <FiAlertCircle className="text-4xl text-orange-500" />
                </div>

                {/* 404 */}
                <h1 className="mt-6 text-8xl font-extrabold text-orange-500">
                    404
                </h1>

                <h2 className="mt-3 text-2xl font-bold text-gray-800">
                    Page Not Found!
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                    Sorry, the page you are looking for does not exist
                    or may have been moved.
                </p>

                {/* Buttons */}
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
                    >
                        <FiArrowLeft />
                        Go Back
                    </button>

                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
                    >
                        <FiHome />
                        Back to Dashboard
                    </Link>

                </div>

                {/* Footer */}
                <p className="mt-8 text-xs text-gray-400">
                    © 2026 ApnaCart Admin Panel
                </p>

            </div>
        </div>
    );
}

export default NotFound;
