const AuthFailure = () => {
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const errorMessage = params.get("error");
    setError(errorMessage || "An unknown error occurred");
  }, []);

  const handleRetry = () => {
    // Redirect to the signup page
    window.location.href = "/signup";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          Authentication Failed
        </h2>
        <div className="flex flex-col items-center space-y-4">
          <XCircle className="h-16 w-16 text-red-500" />
          <p className="text-center text-gray-600">{error}</p>
        </div>
        <div className="mt-6 space-y-2">
          <button
            onClick={handleRetry}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
          >
            Retry Authentication
          </button>
          <a
            href="/"
            className="block w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthFailure;
