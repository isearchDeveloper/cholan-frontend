"use client";


import Link from "next/link";
import { useEffect } from "react";

export default function Custom404() {
  useEffect(() => {
    document.body.classList.add("page-not-found");

    return () => {
      document.body.classList.remove("page-not-found");
    };
  }, []);

  return (
    <section className="custom-404">
      {/* <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <div className="container d-flex flex-column justify-content-center align-items-center vh-100 text-center">
        <h1 className="display-1 fw-bold color-blue animate-bounce">404</h1>
        <h2 className="display-4 mb-4">Oops! Page Not Found</h2>
        <p className="lead mb-5">
          The page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.
        </p>
        <Link href="/" className="btn blue-btn btn-lg animate-pulse">
          Go Back Home
        </Link>
      </div> */}

      <div className="container">
        <div className="errorr">
          <p className="p">4</p>
          <span className="dracula">
            <div className="con">
              <div className="hair"></div>
              <div className="hair-r"></div>
              <div className="head"></div>
              <div className="eye"></div>
              <div className="eye eye-r"></div>
              <div className="mouth"></div>
              <div className="blod"></div>
              <div className="blod blod2"></div>
            </div>
          </span>
         
          <p className="p">4</p>

          <div className="page-ms">
            <h1 className="page-msg"> Oops, Page Not Found</h1>
            <p className="lead mb-4">
              The page you&apos;re looking for doesn&apos;t exist. It might have
              been moved or deleted.
            </p>
            <Link href="/" className="btn btn-outline-primary btn-lg rounded-pill px-5 shadow-sm ">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}