"use client";
import Image from "next/image";
import { useState } from "react";

interface Review {
    customer_name: string;
    rating: number;
    comment: string;
    days?: string;
}

interface Props {
    reviews: Review[];
}

export default function Reviews({ reviews }: Props) {
    const [visibleCount, setVisibleCount] = useState(5);
    const [ratingFilter, setRatingFilter] = useState<number | "">("");
    const [sortOption, setSortOption] = useState<string>("");

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 3);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setRatingFilter(value === "" ? "" : Number(value));
        setVisibleCount(5);
    };

    const filteredReviews =
        ratingFilter === "" ? reviews : reviews.filter((r) => r.rating === ratingFilter);

    const sortedReviews = [...filteredReviews].sort((a, b) => {
        switch (sortOption) {
            case "highest":
                return b.rating - a.rating;
            case "lowest":
                return a.rating - b.rating;
            case "newest":
                return new Date(b.days || "").getTime() - new Date(a.days || "").getTime();
            case "oldest":
                return new Date(a.days || "").getTime() - new Date(b.days || "").getTime();
            default:
                return 0;
        }
    });

    const averageRating =
        filteredReviews.length > 0
            ? (filteredReviews.reduce((sum, r) => sum + r.rating, 0) / filteredReviews.length).toFixed(1)
            : "0";

    return (
        <section className="bg-grey py-5 review-list">
            <div className="container">
                {/* Average Rating */}

                {/* Filters & Sort */}
                <div className="d-lg-flex align-items-center justify-content-between">
                    <div className="mb-3 mb-lg-0">
                        <h1 className="fs-2 text-center text-lg-start">How customers rated us</h1>
                    </div>
                    <div className="d-flex align-items-center sort-rev">
                        <div>
                            <select className="form-select" value={ratingFilter} onChange={handleFilterChange}>
                                <option value="">All Ratings</option>
                                <option value="5">5 Stars</option>
                                <option value="4">4 Stars</option>
                                <option value="3">3 Stars</option>
                                <option value="2">2 Stars</option>
                                <option value="1">1 Star</option>
                            </select>
                        </div>
                    </div>
                </div>
                <hr className="my-3" />

                <div className="row mt-5">
                    <div className="col-lg-3">
                        <div className="col-auto text-center bg-light tourCard mb-4 mb-lg-0 shadow-none">
                            <h4 className="fw-bold mb-1">Customer Rating</h4>

                            <h3 className="display-2 fw-bold">{averageRating}</h3>

                            <span className="fs-6 d-flex justify-content-center">
                                {[...Array(5)].map((_, i) => {
                                    const ratingVal = +averageRating;
                                    if (i + 1 <= ratingVal) {
                                        // full star
                                        return (
                                            <svg
                                                key={i}
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
                                                fill="currentColor"
                                                className="text-warning mb-2"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                            </svg>
                                        );
                                    } else if (i < ratingVal) {
                                        // half star (same yellow)
                                        return (
                                            <svg
                                                key={i}
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
                                                className="mb-2"
                                                viewBox="0 0 16 16"
                                            >
                                                <defs>
                                                    <linearGradient id={`halfGrad${i}`}>
                                                        <stop offset="50%" stopColor="#ffc107" />
                                                        <stop offset="50%" stopColor="#ffc107" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <path
                                                    fill={`url(#halfGrad${i})`}
                                                    stroke="#ffc107"
                                                    strokeWidth="1"
                                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                                                />
                                            </svg>
                                        );
                                    } else {
                                        // empty star
                                        return (
                                            <svg
                                                key={i}
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
                                                fill="lightgray"
                                                className="mb-2"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M2.866 14.85c-.078.444.36.791.746.593L8 13.187l4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.158-.888-.283-.95l-4.898-.696L8 .792l-2.184 4.327-4.898.696c-.441.062-.612.636-.282.95l3.522 3.356-.83 4.73z" />
                                            </svg>
                                        );
                                    }
                                })}
                            </span>

                            <p className="mb-0 fs-6">(Based on {filteredReviews.length} reviews)</p>
                        </div>
                    </div>

                    <div className="col-lg-9">
                        {/* Reviews List */}
                        {sortedReviews.length > 0 ? (
                            sortedReviews.slice(0, visibleCount).map((r, i) => (
                                <div key={i} className="d-flex align-items-start border p-4 mb-4 rounded-4">
                                    <img
                                        width={40}
                                        height={40}
                                        src="/avatar.png"
                                        alt={`${r.customer_name}'s avatar`}
                                        className="rounded-circle avatar-lg"
                                    />
                                    <div className="ms-3 w-100">
                                        <h6 className="mt-2 d-flex gap-4 align-items-center justify-content-between">
                                            {r.customer_name} <p className="mt-1 text-muted">{r.days ? r.days : "Just now"}</p>
                                        </h6>
                                        <div className="mb-2 mt-3">
                                            {[...Array(5)].map((_, j) => (
                                                <svg
                                                    key={j}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    fill="currentColor"
                                                    className={`bi bi-star-fill ${j < r.rating ? "text-warning" : "text-light"}`}
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                </svg>
                                            ))}
                                        </div>
                                        {r.rating > 3 && <h6 className="fw-semibold">Outstanding Experience!!!</h6>}
                                        <p>{r.comment}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-5">
                                <p className="text-muted fs-5">No reviews found for this rating.</p>
                            </div>
                        )}

                        {/* Load More Button */}
                        {visibleCount < sortedReviews.length && (
                            <div className="text-center mt-5">
                                <button className="btn blue-btn" onClick={handleLoadMore}>
                                    Load More
                                    <span>
                                        <Image
                                            width={23}
                                            height={23}
                                            sizes="100vw"
                                            src="/images/button-arrow.png"
                                            alt=""
                                            className="ms-2"
                                        />
                                    </span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
