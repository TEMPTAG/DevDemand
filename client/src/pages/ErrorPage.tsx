import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <div className="p-4 bg-white rounded shadow">
        <h1 className="display-4 mb-3">404: Page Not Found</h1>
        <p className="lead mb-4">Oops! It seems you've taken a wrong turn...</p>
        <h1 className="fs-1 mb-4">¯\_(ツ)_/¯</h1>
        <Link to="/" className="btn btn-primary btn-lg">
          Go Back Home
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
