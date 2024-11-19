export default function Footer() {
  return (
    <footer className="footer bg-primary text-white-50 py-3">
      <div className="container-fluid text-center">
        <h6 className="p-2">
          &copy; {new Date().getFullYear()}{" "}
          <a
            href="https://github.com/TEMPTAG/DevDemand/blob/main/README.md"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white-50 text-decoration-none"
          >
            DevDemand Team
          </a>
          . All Rights Reserved
        </h6>
      </div>
    </footer>
  );
}
