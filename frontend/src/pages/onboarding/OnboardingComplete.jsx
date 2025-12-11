export default function OnboardingComplete() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg p-10 rounded-2xl text-center max-w-lg w-full">

        <h1 className="text-3xl font-bold text-green-600 mb-4">
          🎉 Onboarding Complete!
        </h1>

        <p className="text-gray-700 mb-6">
          Your company profile has been successfully created.
          You can now access your dashboard.
        </p>

        <a
          href="/dashboard"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}
