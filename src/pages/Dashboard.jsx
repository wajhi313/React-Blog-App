export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">
            Logout
          </button>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2">
          <p className="text-gray-700"><span className="font-semibold">Name:</span> User Name</p>
          <p className="text-gray-700"><span className="font-semibold">Email:</span> user@example.com</p>
        </div>
      </div>
    </div>
  );
}