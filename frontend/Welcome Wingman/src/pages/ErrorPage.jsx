import '../css/ErrorPage.css'
import {useNavigate} from 'react-router-dom'


function ErrorPage({ message, onRetry }) {
  const navigate = useNavigate()
  return (
    <div className="page error-page">
      <div className="error-content">
        <h1 className="title error-title">Something went wrong</h1>
        <p className="error-message">
            {message + " for assistance please contact 318-456-3666"|| "We ran into an unexpected error. Please try again. Or contact 318-456-3666"}
            <button onClick={() => navigate('/login')}> Login Here </button>
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