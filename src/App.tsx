function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            🥖 Capital District Food Scout
          </h1>
          <p className="mt-2 text-gray-600">
            Track and compare your favorite local bakeries
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-700">
            Setup complete! Ready to start building features.
          </p>
          <div className="mt-4 p-4 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>Next steps:</strong>
            </p>
            <ul className="mt-2 text-sm text-blue-700 list-disc list-inside space-y-1">
              <li>Set up your Supabase database using the SQL schema</li>
              <li>Add your Supabase credentials to .env file</li>
              <li>Start building the bakery management features</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
