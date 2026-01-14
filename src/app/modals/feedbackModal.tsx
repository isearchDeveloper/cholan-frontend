"use client";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { XPublicToken } from "../urls/apiUrls";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "../context/FormContext";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  duration?: number;
  slug: string;
}

interface FeedbackPayload {
  rating: number;
  customer_name: string;
  comment: string;
  hotel_slug?: string;
  package_slug?: string;
}

export default function FeedbackModal({
  isOpen,
  onClose,
  slug,
}: FeedbackModalProps) {
  const [form, setForm] = useState({
    name: "",
    rating: 0,
    review: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  let route = useRouter();
  const { setHasValidSubmission } = useForm();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleStarClick = (index: number) => {
    const rating = index + 1; // Full star only
    setForm((prev) => ({ ...prev, rating }));
  };

  const handleStarHover = (index: number) => {
    setHoveredRating(index + 1); // Full star hover
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };
  useEffect(() => {
    if (isOpen) {
      setForm({
        name: "",
        rating: 0,
        review: "",
      });
      setErrors({});
    }
  }, [isOpen]);
  const validate = () => {
    let newErrors: { [key: string]: string } = {};
    const nameValue = form.name.trim();
    if (!nameValue) {
      newErrors.name = "Name is required";
    } else if (nameValue.length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    } else if (!/^[A-Za-z\s]+$/.test(nameValue)) {
      newErrors.name = "Name can only contain letters and spaces";
    }

    if (form.rating === 0) newErrors.rating = "Please select a star rating";

    if (!form.review.trim()) newErrors.review = "Review cannot be empty";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const payload: FeedbackPayload = {
        rating: form.rating,
        customer_name: form.name,
        comment: form.review,
      };

      // Determine the slug key based on URL
      if (typeof window !== "undefined") {
        const path = window.location.pathname;

        if (path.includes("/luxury-hotels/")) {
          payload.hotel_slug = slug;
        } else if (path.includes("/packages/")) {
          payload.package_slug = slug;
        }
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/review`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Public-Token": XPublicToken,
          },
        }
      );

      if (response.data.success) {
        // toast.success(response.data.message || "Thank you for your feedback!");
        setHasValidSubmission(true);
        route.push("/thank-you");
        setTimeout(() => {
          onClose();
          setForm({
            name: "",
            rating: 0,
            review: "",
          });
          setErrors({});
        }, 3000);
      } else {
        // toast.error("Something went wrong. Please try again.");
      }
    } catch (err) {
      // toast.error("Error submitting feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div
        className="modal fade show d-block"
        tabIndex={-1}
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        onClick={onClose}
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <button
              type="button"
              className="btn-close btn-close-dark"
              onClick={onClose}
              aria-label="Close"
            ></button>

            <div className="modal-body p-4">
              <div className="row g-4">
                <div className="col-md-4 d-none d-md-flex flex-column justify-content-center">
                  <div className="rounded-3 p-4 text-center h-100 modal-left-bg custom-hover text-white">
                    <div className="banner-overlay"></div>
                    <div className="banner-content-left">
                      <h4 className="fw-bold text-white">Enjoyed your trip?</h4>
                      <p className="text-white">
                        Let us craft your perfect journey.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-8">
                  <div className="mb-4">
                    <h3 className="fw-bold mb-1">Share your thoughts</h3>
                    <p className="mb-0">Share your experience with us!</p>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3 mb-4">
                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          className={`form-control ${
                            errors.name ? "is-invalid" : ""
                          }`}
                          placeholder="Name"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                        />
                        {errors.name && (
                          <div className="invalid-feedback">{errors.name}</div>
                        )}
                      </div>

                      <div className="col-12">
                        <textarea
                          className={`form-control ${
                            errors.review ? "is-invalid" : ""
                          }`}
                          placeholder="Your Review"
                          name="review"
                          value={form.review}
                          onChange={handleChange}
                          rows={4}
                        ></textarea>
                        {errors.review && (
                          <div className="invalid-feedback">
                            {errors.review}
                          </div>
                        )}
                      </div>
                      <div className="col-12">
                        <div className="d-flex gap-2">
                          {[...Array(5)].map((_, index) => (
                            <div
                              key={index}
                              style={{ cursor: "pointer" }}
                              onClick={() => handleStarClick(index)}
                              onMouseEnter={() => handleStarHover(index)}
                              onMouseLeave={() => setHoveredRating(0)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="36"
                                height="36"
                                viewBox="0 0 36 36"
                                fill="none"
                              >
                                <path
                                  d="M17.1033 2.71738C17.4701 1.97413 18.5299 1.97413 18.8967 2.71738L23.0574 11.1478C23.2031 11.4429 23.4846 11.6475 23.8103 11.6948L33.1139 13.0467C33.9341 13.1659 34.2616 14.1739 33.6681 14.7524L26.936 21.3146C26.7003 21.5443 26.5927 21.8753 26.6484 22.1997L28.2376 31.4656C28.3777 32.2825 27.5203 32.9055 26.7867 32.5198L18.4653 28.145C18.174 27.9919 17.826 27.9919 17.5347 28.145L9.21334 32.5198C8.47971 32.9055 7.62228 32.2825 7.76239 31.4656L9.35162 22.1997C9.40726 21.8753 9.29971 21.5443 9.06402 21.3146L2.33193 14.7524C1.73841 14.1739 2.06593 13.1659 2.88615 13.0467L12.1897 11.6948C12.5154 11.6475 12.7969 11.4429 12.9426 11.1478L17.1033 2.71738Z"
                                  fill={
                                    hoveredRating >= index + 0.5 ||
                                    form.rating >= index + 0.5
                                      ? "#FFD700"
                                      : "#E5E7EB"
                                  }
                                />
                              </svg>
                            </div>
                          ))}
                        </div>
                        {errors.rating && (
                          <div className="text-danger mt-1">
                            {errors.rating}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="d-flex justify-content-end mt-5">
                      <button
                        type="submit"
                        className="btn blue-btn"
                        disabled={loading}
                      >
                        {loading ? "Submitting..." : "Submit Review"}

                        <span>
                          <Image
                            width={23}
                            height={23}
                            src="/images/button-arrow.png"
                            alt="icon"
                          />
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
