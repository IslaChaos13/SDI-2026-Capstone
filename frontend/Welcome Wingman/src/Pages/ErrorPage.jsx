import '../css/ErrorPage.css'

function ErrorPage({ message, onRetry }) {
  return (
    <div className="page error-page">
      <div className="error-content">
        <h1 className="title error-title">Something went wrong</h1>
        <p className="error-message">
            {message || "We ran into an unexpected error. Please try again. Or contact 318-456-3666"}
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