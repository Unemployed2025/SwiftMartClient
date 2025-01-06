// src/Pages/NotFoundPage.jsx
function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col justify-center items-center animate-fadeIn p-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-4 animate-bounce">
          404
        </h1>
        <p className="text-4xl text-gray-700 mb-8 font-light">
          Oops! Page Not Found
        </p>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <a 
          href="/home" 
          className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Return Home
        </a>
      </div>
    </div>
  );
}

export default NotFoundPage;