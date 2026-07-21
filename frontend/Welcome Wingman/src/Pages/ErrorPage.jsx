import '../css/ErrorPage.css'

function ErrorPage({ message, onRetry }) {
  return (
    <div className="error-screen">
      <div className="error-content">
        <h1 className="error-title">Something went wrong</h1>
        <p className="error-message">
          {message || "We ran into an unexpected error. Please try again."}
        </p>
        {onRetry && (
          <button className="error-retry-btn" onClick={onRetry}>
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorPage;