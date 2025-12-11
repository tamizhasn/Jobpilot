import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome to JobPilot</h1>

      <p className="text-gray-600 mb-8 text-lg">
        A smarter way to manage hiring and your company profile.
      </p>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
