'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShow(false);
  };

  const rejectCookies = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      className="position-fixed bottom-0 start-0 end-0 bg-white border-top"
      style={{
        zIndex: 1050,
        boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
      }}
    >
      <div className="container py-3">
        <div className="row align-items-center g-3">
     
          <div className="col-lg-8 col-md-7 col-12">
            <p className="mb-0 text-dark small">
              We use cookies to improve your experience, analyze traffic, and personalize content. By continuing, you agree to our use of cookies.{' '}
              <Link
                href="/privacy-policy"
                className="text-primary text-decoration-none fw-semibold"
                style={{ textDecoration: 'underline' }}
              >
                Learn more
              </Link>
              .
            </p>
          </div>


          <div className="col-lg-4 col-md-5 col-12 text-md-end">
            <div className="d-flex gap-2 justify-content-end flex-wrap">
              <button
                onClick={rejectCookies}
                className="btn btn-outline-secondary btn-sm px-3"
                style={{ minWidth: '80px' }}
              >
                Reject
              </button>

    
              <button
                onClick={acceptCookies}
                className="btn btn-sm px-4 text-white"
                style={{
                  backgroundColor: '#05164d',
                  borderColor: '#05164d',
                  minWidth: '80px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#04113d';
                  e.currentTarget.style.borderColor = '#04113d';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#05164d';
                  e.currentTarget.style.borderColor = '#05164d';
                }}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}