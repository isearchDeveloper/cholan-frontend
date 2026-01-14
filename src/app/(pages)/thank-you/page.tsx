'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Sparkles, MapPin, Train, Calendar } from 'lucide-react';
import { useForm } from '@/app/context/FormContext';
import { useRouter } from 'next/navigation';

export default function ThankYouPage() {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const { hasValidSubmission, setHasValidSubmission } = useForm(); // Get context values

  // useEffect(() => {
  //   // Check if we have a valid submission via context
  //   if (!hasValidSubmission) {
  //     // No valid submission - redirect to home
  //     router.push('/');
  //     return;
  //   }

  //   // Valid submission - reset the flag after user sees the page
  //   const resetFlag = setTimeout(() => {
  //     setHasValidSubmission(false);
  //   }, 7000); // Reset after 5 seconds

  //   // Your existing timeout code
  //   const stopTimeout = setTimeout(() => {
  //     if (intervalRef.current) clearInterval(intervalRef.current);
  //   }, 3000);

  //   return () => {
  //     clearTimeout(resetFlag);
  //     if (intervalRef.current) clearInterval(intervalRef.current);
  //     clearTimeout(stopTimeout);
  //   };
  // }, [hasValidSubmission, router, setHasValidSubmission]);
  useEffect(() => {
    // If user tries to access Thank You page directly → redirect to home
    if (!hasValidSubmission) {
      router.push('/');
      return;
    }

    // No reset, user stays on Thank You page permanently after valid submit
  }, [hasValidSubmission, router]);

  // If no valid submission, don't render anything (will redirect)
  if (!hasValidSubmission) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <>


      <section className="min-vh-100 d-flex align-items-center position-relative overflow-hidden bg-gradient-custom py-5">


        <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10 pointer-events-none">
          <div
            className="position-absolute bg-pink-200 rounded-circle filter blur-3xl"
            style={{ width: '500px', height: '500px', top: '10%', left: '5%' }}
          ></div>
          <div
            className="position-absolute bg-yellow-200 rounded-circle filter blur-3xl"
            style={{ width: '600px', height: '600px', bottom: '10%', right: '5%' }}
          ></div>
        </div>

        <div className="container position-relative" style={{ zIndex: 10 }}>
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">


              <div className="d-inline-block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-75 h-auto"
                  style={{ maxWidth: '200px' }}
                  aria-hidden="true"
                >
                  <defs>
                    <style>
                      {`.st7{fill:#ffdbc5}`}
                    </style>
                  </defs>
                  <g>
                    <path className="st7" d="m294 273.5 58.2 23.2-23.7 59.5-58.2-23.2c-12-4.8-19.2-17.5-15.3-27.5l9.2-23.1c4.1-10 17.8-13.6 29.8-8.9z" />
                    <path className="st7" d="M223.5 315.4c-4-8.2-.6-18.1 7.6-22.1l41.5-21.8c8.2-4 18.1-.6 22.1 7.6s.6 18.1-7.6 22.1L245.6 323c-8.3 4-18.1.6-22.1-7.6z" />
                    <path className="st7" d="M202.7 338.1c-4.2-10.9 1.3-23.1 12.2-27.3l55.4-23.1c10.9-4.2 23.1 1.3 27.3 12.2 4.2 10.9-1.3 23.1-12.2 27.3L230 350.3c-10.9 4.2-23.1-1.3-27.3-12.2z" />
                    <path className="st7" d="M211.9 237.2c-4.6 6.8-2.7 16 4.1 20.6l58.7 38.5c6.8 4.6 16 2.7 20.6-4.1 4.6-6.8 2.7-16-4.1-20.6l-58.7-38.5c-6.8-4.5-16.1-2.7-20.6 4.1z" />
                    <path transform="rotate(-68.297 334.92 324.27)" style={{ fill: '#e8b494' }} d="M302.9 302.1h64v44.3h-64z" />
                    <path d="m365 394.3-36.9-14.7c-11.3-4.5-16.8-17.3-12.3-28.6l25.1-63.2c4.5-11.3 17.3-16.8 28.6-12.3l36.9 14.7L365 394.3z" style={{ fill: '#efefef' }} />
                    <path d="M289.3 160.8c-.2-23.9-19.8-43.1-43.7-42.9-19.7.2-36.1 13.4-41.3 31.4-5.4-17.9-22.2-30.8-41.8-30.7-23.9.2-43.1 19.8-42.9 43.7.1 13.2 6.2 25 15.6 32.9.3.4.7.9 1.1 1.4l49.8 59.2c11 13 28.7 12.9 39.5-.3l48.8-60.1c1.1-1.4 2.1-2.8 2.9-4.1 7.4-8 12.1-18.7 12-30.5z" style={{ fill: '#db4646' }} />
                    <path d="M160.7 129.8c-15.1 3-25.6 15-27.5 30.1-.7 5.9 8.5 5.8 9.2 0 1.4-11.2 10-19.1 20.8-21.3 5.8-1.1 3.3-10-2.5-8.8z" style={{ fill: '#e7ad84' }} />
                    <path className="st7" d="M113.4 272.2c3.3-6.4 11.3-9 17.7-5.6l90.2 35.7c6.5 3.3 9 11.3 5.6 17.7-3.4 6.4-11.3 9-17.7 5.6L119 289.9c-6.5-3.4-9-11.3-5.6-17.7z" />
                    <path className="st7" d="M185.7 303.4c.1-.2.2-.5.2-.7l36.9 4.7c9 4.4 15.4 24.9 11.2 33.4-4.2 8.5-15 12.1-24 7.7l-35.8-17.7c4.2-9 8.1-18.1 11.5-27.4z" />
                    <path className="st7" d="M177.4 242.7c-4.7 19.2.2 37.4 12.2 52.8 11.6 14.8 30.1 22.9 48.4 24.6 6.8.6 12.6-6.2 12.6-12.6 0-7.4-5.8-12-12.6-12.6-3.4-.3-11.1-2.5-14.6-4.2-6.4-3.1-9.6-5.7-14.4-11-1.8-2-2.3-2.9-4.2-6-.2-.4-2.2-4.5-1.6-2.9-.7-1.6-1.2-3.3-1.7-5-1.5-5.1-1.4-10.9 0-16.4 4.1-15.8-20.2-22.5-24.1-6.7z" />
                    <path className="st7" d="M95.4 283.2c3.3-6.4 11.3-9 17.7-5.6l90.2 35.7c6.5 3.3 9 11.3 5.6 17.7-3.4 6.4-11.3 9-17.7 5.6L101 300.9c-6.5-3.4-9-11.3-5.6-17.7z" />
                  </g>
                </svg>
              </div>

              <h1 className="display-3 fw-bold text-gradient mb-3">
                Thank You!
              </h1>


              <p className="fs-4 fw-semibold text-dark mb-3">
                We’ve received your travel enquiry!
              </p>

              <p className="fs-6 text-muted mb-5 col-lg-10 mx-auto">
                <span className="d-none d-md-inline">
                  You're one step closer to your dream getaway!{' '}
                </span>
                Our dedicated travel advisor will reach out within{' '}
                <strong className="text-danger">24 hours</strong> to craft your perfect journey.
              </p>

              <p className="text-dark fw-medium mb-4">
                While you wait, explore our curated experiences:
              </p>


              <div className="row g-4 justify-content-center mb-5">
                <div className="col-md-4">
                  <Link href="/international-holidays" className="text-decoration-none">
                    <div className="card border-0 shadow-sm h-100 text-center p-4 rounded-3 bg-white transition-all hover-shadow-lg hover-translate-y-n1">
                      <div className="bg-danger bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '48px', height: '48px' }}>
                        <MapPin className="text-danger" style={{ width: '24px', height: '24px' }} />
                      </div>
                      <h3 className="fs-6 fw-bold text-dark mb-1">Explore Destinations</h3>
                      <p className="text-muted small">Discover hidden gems worldwide</p>
                    </div>
                  </Link>
                </div>

                <div className="col-md-4">
                  <Link href="/luxury-trains" className="text-decoration-none">
                    <div className="card border-0 shadow-sm h-100 text-center p-4 rounded-3 bg-white transition-all hover-shadow-lg hover-translate-y-n1">
                      <div className="bg-warning bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '48px', height: '48px' }}>
                        <Train className="text-warning" style={{ width: '24px', height: '24px' }} />
                      </div>
                      <h3 className="fs-6 fw-bold text-dark mb-1">Luxury Trains</h3>
                      <p className="text-muted small">Journey in timeless elegance</p>
                    </div>
                  </Link>
                </div>

                <div className="col-md-4">
                  <Link href="/customized-holidays" className="text-decoration-none">
                    <div className="card border-0 shadow-sm h-100 text-center p-4 rounded-3 bg-white transition-all hover-shadow-lg hover-translate-y-n1">
                      <div className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '48px', height: '48px' }}>
                        <Calendar className="text-success" style={{ width: '24px', height: '24px' }} />
                      </div>
                      <h3 className="fs-6 fw-bold text-dark mb-1">Customized Holidays</h3>
                      <p className="text-muted small">Tailor-made just for you</p>
                    </div>
                  </Link>
                </div>
              </div>


              <div className="pt-4">
                <Link
                  href="/"
                  className="btn btn-outline-primary btn-lg rounded-pill px-5 shadow-sm"
                >
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}