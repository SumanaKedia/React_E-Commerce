import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="mb-0 text-center">
        <div className="d-flex align-items-center justify-content-center pb-5">
          <div className="col-md-6">
            <p className="mb-3 mb-md-0">Made Cloud Native by {" "}
              <a href="https://www.linkedin.com/in/sumana-kedia-72b60579" className="text-decoration-underline text-dark fs-5" target="_blank" rel="noreferrer">Sumana Kedia</a>
            </p>
            <a className="text-dark fs-4" href="https://github.com/SumanaKedia" target="_blank" rel="noreferrer">
              <i className="fa fa-github"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
